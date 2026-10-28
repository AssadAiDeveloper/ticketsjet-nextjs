import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.SMOKE_BASE || "http://localhost:3100";
const OUT = process.env.SMOKE_OUT || "C:/Users/sAssa/AppData/Local/Temp/smoke";
mkdirSync(OUT, { recursive: true });

const locales = ["en","ar","nl","es","fr","de","it","pt","tr","ru","pl","fa","he"];
const rtl = new Set(["ar","fa","he"]);
const promotedCities = ["LON","PAR","ROM","BCN","AMS","MAD","IST","LIS","DXB","NYC","ATH","BKK","CAI"];
// load city-names data for fallback table
import fs from "node:fs";
const cityNames = {};
for (const loc of locales) {
  if (loc === "en") continue;
  try { cityNames[loc] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "city-names", loc + ".json"), "utf8")); } catch { cityNames[loc] = {}; }
}
// English city names for promoted cities (from messages/en.json place.*.name)
const enMessages = JSON.parse(fs.readFileSync(path.join(process.cwd(), "messages", "en.json"), "utf8"));
const enCityNames = {};
for (const code of promotedCities) {
  const key = code.toLowerCase();
  enCityNames[code] = enMessages.place && enMessages.place[key] ? enMessages.place[key].name : code;
}
// print fallback table
console.log("\n=== City name fallback table ===");
console.log("locale | promoted | fallback to English");
for (const loc of locales) {
  if (loc === "en") continue;
  let fallback = 0;
  for (const c of promotedCities) {
    const locName = cityNames[loc][c];
    if (!locName || locName === c || locName.toUpperCase() === c) fallback++;
  }
  console.log(`${loc} | ${promotedCities.length} | ${fallback}`);
}
console.log("");
const paths = ["/", "/flights", "/stays", "/cars", "/explore", "/blog", "/help", "/privacy-policy", "/destinations", "/cheap-flights", "/activities", "/services", "/about-us", "/terms-and-conditions", "/affiliate-disclosure", "/trip-finder"];
const viewports = [{w:375,h:800},{w:1280,h:800}];

const IGNORE_HOSTS = ["travelpayouts","google-analytics","googletagmanager","doubleclick","adservice","facebook","hotjar","sentry","avsplow","fonts.googleapis.com","fonts.gstatic.com","economybookings.com","targetcircle.com"];

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
      await page.route("**fonts.googleapis.com**", (route) => route.abort());
      await page.route("**fonts.gstatic.com**", (route) => route.abort());
      page.on("requestfailed", (r) => {
        const u = r.url();
        if (IGNORE_HOSTS.some((h) => u.includes(h))) return;
        if (u.includes("_rsc=")) return;
        if (u.includes("/api/map-prices")) {
          console.log(`SKIPPED (no token): ${u}`);
          return;
        }
        failedRequests.push(`${r.failure()?.errorText || "?"} ${u}`);
      });
      page.on("response", (r) => {
        if (r.status() >= 400) {
          const u = r.url();
          if (IGNORE_HOSTS.some((h) => u.includes(h))) return;
          if (u.includes("_rsc=")) return;
          if (r.status() === 503 && u.includes("/api/map-prices")) {
            console.log(`SKIPPED (no token): ${u}`);
            return;
          }
          failedRequests.push(`HTTP ${r.status()} ${u}`);
        }
      });

      let status = 0;
      let lang = "";
      let dir = "";
      let overflow = false;
      let overflowDetail = "";
      let extraIssues = [];
      let body = "";
      try {
        const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        status = resp ? resp.status() : 0;
        await page.waitForTimeout(2000);
        body = resp ? await resp.text() : "";
        const lm = body.match(/<html[^>]*lang="([^"]*)"/);
        lang = lm ? lm[1] : "";
        const dm = body.match(/<html[^>]*dir="([^"]*)"/);
        dir = dm ? dm[1] : "";
        const clientLang = await page.evaluate(() => document.documentElement.lang);
        const clientDir = await page.evaluate(() => document.documentElement.dir || "ltr");
        const expectRtl = (locale === "ar" || locale === "fa" || locale === "he");
        const ow = await page.evaluate(() => {
          if (document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1) return null;
          const offs = [];
          document.querySelectorAll("*").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.right > window.innerWidth + 2 || r.left < -2) offs.push(`${el.tagName}[${(el.id || (el.className && el.className.toString) ? el.className.toString().slice(0,30) : "")}] left=${Math.round(r.left)} right=${Math.round(r.right)}`);
          });
          return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, offenders: offs.slice(0,5) };
        });
        overflow = !!ow;
        if (ow) extraIssues.push(`overflow: scrollWidth=${ow.scrollWidth} clientWidth=${ow.clientWidth} :: ${ow.offenders.join("; ")}`);
        if (clientLang !== locale) extraIssues.push(`client lang=${clientLang} (expected ${locale})`);
        if (expectRtl && clientDir !== "rtl") extraIssues.push(`client dir=${clientDir} (expected rtl)`);
        if (!expectRtl && clientDir === "rtl") extraIssues.push(`client dir=rtl (expected ltr)`);
        const nonLatinLocales = new Set(["ar", "fa", "he", "ru"]);
        if ((p === "/destinations" || p === "/") && locale !== "en") {
          const html = await page.content();
          const golden = JSON.parse(fs.readFileSync(path.join(process.cwd(), "scripts", "city-names-golden.json"), "utf8"));
          for (const [code, names] of Object.entries(golden)) {
            const expected = names[locale];
            if (!expected) continue;
            // check if the English name leaked (when localized differs)
            const enName = enCityNames[code];
            if (expected !== enName) {
              const re = new RegExp("(?<!Europe/)" + enName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
              if (re.test(html)) extraIssues.push(`${p} golden mismatch: "${enName}" found (expected "${expected}")`);
            }
          }
        }
        if (p === "/stays" && locale !== "en") {
          const html = await page.content();
          for (const enHeading of ["Find a place to stay", "Find your perfect stay", "Popular hotel destinations", "Explore more cities", "Stays FAQ", "More travel options"]) {
            if (html.includes(enHeading)) extraIssues.push(`stays contains English heading "${enHeading}"`);
          }
        }
        if (p.startsWith("/destinations/") && locale !== "en") {
          const html = await page.content();
          if (/\d{4}-\d{2}-\d{2}\s*\?\s*\d{4}-\d{2}-\d{2}/.test(html)) extraIssues.push("destinations page contains literal ? between dates");
          if (html.includes("\uFFFD")) extraIssues.push("destinations page contains U+FFFD");
          const staysLinks = (html.match(/booking\.com\/searchresults/g) || []).length;
          if (staysLinks !== 1) extraIssues.push(`destinations page has ${staysLinks} stays CTA links (expected 1)`);
        }
        if (p === "/cars") {
          const html = await page.content();
          if (html.includes("tpwgts.com")) extraIssues.push("old car widget still present");
          if (html.includes("<iframe")) extraIssues.push("cars page should not have iframe");
          if (!html.includes('id="eb-widget"') && !html.includes("id='eb-widget'")) extraIssues.push("cars page missing #eb-widget");
          if (!html.includes("sponsored")) extraIssues.push("cars fallback link missing sponsored rel");
          // anchor bar
          if (!html.includes("anchorDest") && !html.includes("Popular destinations")) {} 
          if (!html.match(/href="#destinations"/)) extraIssues.push("cars page missing anchor bar");
          // FAQ JSON-LD
          if (!html.includes("application/ld+json")) extraIssues.push("cars page missing JSON-LD");
          // destination cards: exactly 9 (rendered DOM, not RSC payload)
          await page.waitForTimeout(1000);
          const prefix = locale === "en" ? "" : "/" + locale;
          const domCards = await page.evaluate((pfx) => document.querySelectorAll(`a[href^="${pfx}/destinations/"]`).length, prefix);
          if (domCards !== 9) extraIssues.push(`cars page has ${domCards} destination cards (expected 9)`);
          // rendered FAQ count
          const domFaq = await page.evaluate(() => document.querySelectorAll('details.faq').length);
          // FAQPage JSON-LD question count must equal rendered FAQ count
          const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
          let faqLdCount = 0;
          for (const m of ldMatch) {
            try {
              const o = JSON.parse(m.replace(/<script[^>]*>/, '').replace(/<\/script>/, ''));
              if (o && o['@type'] === 'FAQPage' && Array.isArray(o.mainEntity)) faqLdCount = o.mainEntity.length;
            } catch (e) {}
          }
          if (faqLdCount !== domFaq) extraIssues.push(`cars FAQPage JSON-LD has ${faqLdCount} questions but rendered ${domFaq}`);
          // disclosure appears exactly once (rendered DOM)
          const domDisc = await page.evaluate(() => document.querySelectorAll('[data-disclosure]').length);
          if (domDisc !== 1) extraIssues.push(`disclosure appears ${domDisc} times (expected 1)`);
          // fallback check for undefined/?
          if (/(?<!\$)undefined\b/.test(html)) extraIssues.push("cars page contains undefined");
          if (/\?\s*\?/.test(html)) extraIssues.push("cars page contains ?? garbage");
          // try to wait for widget render
          try {
            await page.waitForSelector("#eb-widget", { timeout: 10000 });
            const hasShadow = await page.evaluate(() => {
              const el = document.querySelector("#eb-widget");
              return !!(el && el.shadowRoot && (el.shadowRoot.querySelector("input") || el.shadowRoot.querySelector("button")));
            });
            if (!hasShadow) console.log("WARNING: #eb-widget has no shadowRoot with input/button (CDN may be unreachable)");
          } catch (e) {
            console.log("WARNING: #eb-widget not found within 10s (CDN may be unreachable)");
          }
        }
        if (p === "/" && (locale === "en" || (locale === "he" && vp.w === 375))) {
          // Everywhere flow: type a from city, set To=Everywhere, leave dates empty, submit -> /explore?origin=XXX
          try {
            // dismiss cookie banner
            const accept = page.getByRole("button", { name: /accept all/i });
            if (await accept.isVisible().catch(() => false)) { await accept.click(); await page.waitForTimeout(500); }
            // type from city
            const fromInput = page.locator('input[placeholder="City or airport"]').first();
            await fromInput.click();
            await fromInput.type("Amsterdam", { delay: 80 });
            await page.waitForTimeout(800);
            const firstSugg = page.locator('ul li button').first();
            if (await firstSugg.isVisible().catch(() => false)) await firstSugg.click();
            await page.waitForTimeout(500);
            // set To = Everywhere
            const toInput = page.locator('input[placeholder="City or airport"]').nth(1);
            await toInput.click();
            await page.waitForTimeout(400);
            const everywhereBtn = page.locator('[data-everywhere]').first();
            if (await everywhereBtn.isVisible().catch(() => false)) await everywhereBtn.click();
            await page.waitForTimeout(300);
            // submit
            await page.getByRole("button", { name: /search flights/i }).first().click();
            await page.waitForURL(/\/explore/, { timeout: 15000 }).catch(() => {});
            const url = page.url();
            if (!url.includes("/explore")) extraIssues.push(`Everywhere submit did not land on /explore (url=${url})`);
            if (!/[?&]origin=[A-Z]{3}/.test(url)) extraIssues.push(`origin missing in URL (url=${url})`);
            const noErr = !(await page.getByText("Pick your travel dates").isVisible().catch(() => false));
            if (!noErr) extraIssues.push("date error shown for Everywhere flow");
          } catch (e) {
            extraIssues.push(`Everywhere flow error: ${e}`);
          }
        }
        if (p === "/") {
          const html = await page.content();
          const SITE_URL = "https://ticketsjet.com";
          const canonMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
          if (canonMatch && !canonMatch[1].startsWith(SITE_URL)) extraIssues.push(`canonical=${canonMatch[1]} (expected ${SITE_URL}*)`);
          const ogMatch = html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]*)"/);
          if (ogMatch && !ogMatch[1].startsWith(SITE_URL)) extraIssues.push(`og:url=${ogMatch[1]} (expected ${SITE_URL}*)`);
          for (const m of html.matchAll(/<link[^>]*rel="alternate"[^>]*href="([^"]*)"/g)) {
            if (!m[1].startsWith(SITE_URL)) { extraIssues.push(`hreflang=${m[1]} (expected ${SITE_URL}*)`); break; }
          }
        }
      } catch (e) {
        consoleErrors.push(`goto failed: ${e.message}`);
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
      if (body.includes("MISSING_MESSAGE")) issues.push("MISSING_MESSAGE found");
      const keyMatches = body.match(/(?:^|>)([a-z][a-zA-Z]*(?:\.[a-zA-Z]+)+)(?:<|$)/g);
      if (keyMatches && keyMatches.length > 0) issues.push(`raw key in HTML: ${keyMatches.slice(0,3).join(", ")}`);
      if (failedRequests.length) issues.push(`requests: ${failedRequests.slice(0,2).join(" | ")}`);
      issues.push(...extraIssues);

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

// Legacy redirect test
const legacyRedirects = [
  { from: "/hotels", to: "/stays" },
  { from: "/stay", to: "/stays" },
  { from: "/contact-us", to: "/help" },
  { from: "/privacy-policy-2", to: "/privacy-policy" },
  { from: "/guides", to: "/blog" },
  { from: "/travel-guide", to: "/blog" },
  { from: "/airfare-refund", to: "/help" },
  { from: "/cruise", to: "/" },
  { from: "/bike-bookings", to: "/" },
  { from: "/author/webmaster", to: "/" },
];
for (const { from, to } of legacyRedirects) {
  total++;
  let issues = [];
  try {
    const resp = await fetch(`${BASE}${from}`, { redirect: "manual" });
    if (resp.status !== 308 && resp.status !== 301) issues.push(`status=${resp.status} (expected 301/308)`);
    const loc = resp.headers.get("location");
    if (loc !== to && loc !== `${BASE}${to}`) issues.push(`location=${loc} (expected ${to})`);
  } catch (e) {
    issues.push(`fetch failed: ${e.message}`);
  }
  if (issues.length) {
    failures.push({ locale: "en", path: `redirect ${from}`, w: 0, url: `${BASE}${from}`, issues });
    console.log(`FAIL redirect ${from}: ${issues.join("; ")}`);
  } else {
    console.log(`ok   redirect ${from} -> ${to}`);
  }
}
// /stay -> /stays -> 200
total++;
{
  let issues = [];
  try {
    const r1 = await fetch(`${BASE}/stay`, { redirect: "manual" });
    if (r1.status !== 308 && r1.status !== 301) issues.push(`status=${r1.status}`);
    const r2 = await fetch(`${BASE}/stays`, { redirect: "manual" });
    if (r2.status !== 200) issues.push(`/stays status=${r2.status}`);
  } catch (e) { issues.push(`fetch failed: ${e.message}`); }
  if (issues.length) { failures.push({ locale: "en", path: "redirect /stay->/stays", w: 0, url: `${BASE}/stay`, issues }); console.log(`FAIL /stay->/stays: ${issues.join("; ")}`); }
  else console.log("ok   /stay -> /stays -> 200");
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



