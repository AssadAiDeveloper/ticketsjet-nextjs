import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.SMOKE_BASE || "http://localhost:3100";
const OUT = process.env.SMOKE_OUT || "C:/Users/sAssa/AppData/Local/Temp/smoke";
mkdirSync(OUT, { recursive: true });

const locales = ["en","ar","nl","es","fr","de","it","pt","tr","ru","pl","fa","he"];
const rtl = new Set(["ar","fa","he"]);
const paths = ["/","/flights","/stays","/cars","/explore","/blog","/help","/privacy-policy"];
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
        if (u.includes("_rsc=")) return; failedRequests.push(`${r.failure()?.errorText || "?"} ${u}`);
      });
      page.on("response", (r) => {
        if (r.status() >= 400) {
          const u = r.url();
          if (IGNORE_HOSTS.some((h) => u.includes(h))) return;
          if (u.includes("_rsc=")) return; failedRequests.push(`HTTP ${r.status()} ${u}`);
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
        overflow = await page.evaluate(() => { if (document.documentElement.scrollWidth <= document.documentElement.clientWidth) return false; // ignore intentionally off-screen helpers const bad = Array.from(document.querySelectorAll("*")).some((el) => { const r = el.getBoundingClientRect(); return r.right > window.innerWidth + 2 && r.left > -100; }); return bad; });
      } catch (e) {
        consoleErrors.push(`goto failed: ${e.message}`);
      }

      const safePath = p === "/" ? "root" : p.replace(/^\//, "").replace(/\//g, "-");
      const shot = path.join(OUT, `${locale}-${safePath}-${vp.w}.png`);
      try { await page.screenshot({ path: shot, fullPage: false }); } catch {}

      const issues = [];
      if (status !== 200) issues.push(`HTTP ${status}`);
      if (lang !== locale) issues.push(`lang=${lang} (expected ${locale})`);
      const expectRtl = rtl.has(locale);
      if (expectRtl && dir !== "rtl") issues.push(`dir=${dir} (expected rtl)`);
      if (!expectRtl && dir === "rtl") issues.push(`dir=rtl (expected ltr)`);
      if (overflow) issues.push("horizontal overflow");
      if (consoleErrors.length) issues.push(`console: ${consoleErrors.slice(0,2).join(" | ")}`);
      if (failedRequests.length) issues.push(`requests: ${failedRequests.slice(0,2).join(" | ")}`);

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

await browser.close();
console.log(`\nTotal: ${total}, Failures: ${failures.length}`);
if (failures.length) {
  console.log("\n=== FAILURE TABLE ===");
  console.table(failures.map((f) => ({ locale: f.locale, path: f.path, w: f.w, issues: f.issues.join("; ") })));
  process.exit(1);
} else {
  console.log("ALL SMOKE TESTS PASSED");
}



