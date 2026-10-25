import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.SMOKE_BASE || "http://localhost:3100";
const OUT = process.env.SMOKE_OUT || "C:/Users/sAssa/AppData/Local/Temp/smoke";
mkdirSync(OUT, { recursive: true });

const locales = ["en","ar","nl","es","fr","de","it","pt","tr","ru","pl","fa","he"];
const rtl = new Set(["ar","fa","he"]);
const paths = ["/","/flights","/stays","/cars","/explore","/blog","/help","/privacy-policy","/destinations"];
const viewports = [{w:375,h:800},{w:1280,h:800}];

const IGNORE_HOSTS = ["travelpayouts","google-analytics","googletagmanager","doubleclick","adservice","facebook","hotjar","sentry","avsplow"];

const browser = await chromium.launch();
const failures = [];
let total = 0;

for (const locale of locales) {
  for (const p of paths) {
    for (const vp of viewports) {
      total++;
      const url = locale === "en" ? `${BASE}${p}` : `${BASE}/${locale}${p === "/" ? "" : p}`;
      const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];
      page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
      page.on("requestfailed", (r) => {
        const u = r.url();
        if (IGNORE_HOSTS.some((h) => u.includes(h))) return;
        if (u.includes("_rsc=")) return;
        failedRequests.push(`${r.failure()?.errorText || "?"} ${u}`);
      });
      page.on("response", (r) => {
        if (r.status() >= 400) {
          const u = r.url();
          if (IGNORE_HOSTS.some((h) => u.includes(h))) return;
          if (u.includes("_rsc=")) return;
          failedRequests.push(`HTTP ${r.status()} ${u}`);
        }
      });

      let status = 0;
      let lang = "";
      let dir = "";
      let overflow = false;
      try {
        const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        status = resp ? resp.status() : 0;
        await page.waitForTimeout(2000);
        const body = await resp.text();
        const lm = body.match(/<html[^>]*lang="([^"]*)"/);
        lang = lm ? lm[1] : "";
        const dm = body.match(/<html[^>]*dir="([^"]*)"/);
        dir = dm ? dm[1] : "";
        const clientLang = await page.evaluate(() => document.documentElement.lang);
        const clientDir = await page.evaluate(() => document.documentElement.dir || "ltr");
        const expectRtl = (locale === "ar" || locale === "fa" || locale === "he");
        overflow = await page.evaluate(() => { if (document.documentElement.scrollWidth <= document.documentElement.clientWidth) return false; return Array.from(document.querySelectorAll("*")).some((el) => { const r = el.getBoundingClientRect(); return r.right > window.innerWidth + 2 && r.left > -100; }); });
        // Destinations: ensure localized names are used (not English) when available
        const issues0 = [];
        if (clientLang !== locale) issues0.push(`client lang=${clientLang} (expected ${locale})`);
        if (expectRtl && clientDir !== "rtl") issues0.push(`client dir=${clientDir} (expected rtl)`);
        if (!expectRtl && clientDir === "rtl") issues0.push(`client dir=rtl (expected ltr)`);
        if (p === "/destinations" && locale !== "en") {
          const html = await page.content();
          for (const enName of ["Amsterdam", "London", "Paris"]) {
            if (html.includes(enName)) issues0.push(`destinations contains English "${enName}"`);
          }
        }
        // store for later
        var extraIssues = issues0;
      } catch (e) {
        consoleErrors.push(`goto failed: ${e.message}`);
        var extraIssues = [];
      }

      const safePath = p === "/" ? "root" : p.replace(/^\//, "").replace(/\//g, "-");
      const shot = path.join(OUT, `${locale}-${safePath}-${vp.w}.png`);
      try { await page.screenshot({ path: shot, fullPage: false }); } catch {}

      const issues = [];
      if (status !== 200) issues.push(`HTTP ${status}`);
      if (lang !== locale) issues.push(`lang=${lang} (expected ${locale})`);
      const expectRtl = (locale === "ar" || locale === "fa" || locale === "he");
      if (expectRtl && dir !== "rtl") issues.push(`dir=${dir} (expected rtl)`);
      if (!expectRtl && dir === "rtl") issues.push(`dir=rtl (expected ltr)`);
      if (overflow) issues.push("horizontal overflow");
      if (consoleErrors.length) issues.push(`console: ${consoleErrors.slice(0,2).join(" | ")}`);
      if (failedRequests.length) issues.push(`requests: ${failedRequests.slice(0,2).join(" | ")}`);
      if (typeof extraIssues !== "undefined") issues.push(...extraIssues);

      if (issues.length) {
        failures.push({ locale, path: p, w: vp.w, url, issues });
        console.log(`FAIL ${locale} ${p} ${vp.w}: ${issues.join("; ")}`);
      } else {
        console.log(`ok   ${locale} ${p} ${vp.w}`);
      }
      await context.close();
    }
  }
}

// BUG 1: locale reset after navigation within same context
const bug1Paths = ["/flights", "/stays", "/", "/destinations"];
for (const first of ["/fa", "/he", "/ar"]) {
  for (const p of bug1Paths) {
    total++;
    const context = await browser.newContext({ viewport: { width: 375, height: 800 } });
    const page = await context.newPage();
    let issues = [];
    try {
      await page.goto(`${BASE}${first}${p === "/" ? "" : p}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1000);
      await page.goto(`${BASE}${p === "/" ? "/" : p}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(4000);
      const lang = await page.evaluate(() => document.documentElement.lang);
      const dir = await page.evaluate(() => document.documentElement.dir || "ltr");
      if (lang !== "en") issues.push(`after nav lang=${lang} (expected en)`);
      if (dir !== "ltr") issues.push(`after nav dir=${dir} (expected ltr)`);
    } catch (e) {
      issues.push(`goto failed: ${e.message}`);
    }
    if (issues.length) {
      failures.push({ locale: "en", path: `nav ${first}->${p}`, w: 375, url: `${BASE}${p}`, issues });
      console.log(`FAIL nav ${first} -> ${p}: ${issues.join("; ")}`);
    } else {
      console.log(`ok   nav ${first} -> ${p}`);
    }
    await context.close();
  }
}

await browser.close();
console.log(`\nTotal: ${total}, Failures: ${failures.length}`);
if (failures.length) {
  console.log("\n=== FAILURE TABLE ===");
  console.table(failures.map((f) => ({ locale: f.locale, path: f.path, w: f.w, issues: f.issues.join("; ") })));
  process.exit(1);
} else {
  console.log("ALL SMOKE TESTS PASSED");
}
