import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3100";
const OUT = path.join(process.cwd(), "smoke-report");
mkdirSync(OUT, { recursive: true });

const locales = ["de","ru","pl","fr","ar","he"];
const paths = ["/", "/flights"];
const vps = [{w:375,h:800},{w:768,h:800}];

const browser = await chromium.launch();
const entries = [];
for (const loc of locales) {
  for (const p of paths) {
    for (const vp of vps) {
      const url = loc === "en" ? `${BASE}${p}` : `${BASE}/${loc}${p === "/" ? "" : p}`;
      const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1000);
      const name = `${loc}-${p === "/" ? "home" : "flights"}-${vp.w}.png`;
      await page.screenshot({ path: path.join(OUT, name), fullPage: true });
      entries.push({ loc, path: p, w: vp.w, name });
      console.log("saved", name);
      await context.close();
    }
  }
}
await browser.close();

const cards = entries.map((e) => `<div class="card"><div class="label">${e.loc} ${e.path} @${e.w}px</div><img src="${e.name}" loading="lazy"></div>`).join("\n");
const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Smoke Report</title><style>body{font-family:sans-serif;background:#111;color:#eee;margin:0;padding:20px}h1{margin:0 0 20px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}.card{background:#222;border-radius:8px;overflow:hidden}.label{padding:8px 12px;font-size:12px;font-weight:600;background:#333}img{width:100%;display:block}</style></head><body><h1>Smoke Report (needs human review)</h1><div class="grid">${cards}</div></body></html>`;
writeFileSync(path.join(OUT, "index.html"), html);
console.log("index.html written");
