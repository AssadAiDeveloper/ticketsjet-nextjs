// scripts/build-destination-photos.mjs
// Run manually: node scripts/build-destination-photos.mjs [--limit N]
// Requires UNSPLASH_ACCESS_KEY in .env.local. Idempotent + resumable.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

// Load .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY is missing in .env.local. Add it and re-run. (No data faked.)");
  process.exit(0);
}

const PHOTOS_PATH = path.join(process.cwd(), "data", "destination-photos.json");
let photos = {};
if (existsSync(PHOTOS_PATH)) {
  try { photos = JSON.parse(readFileSync(PHOTOS_PATH, "utf8")); } catch { photos = {}; }
}

// Derive city list from codebase
function deriveCities() {
  const set = new Set();
  // lib/destinations.ts PHOTOS keys + POPULAR + DESTS
  const destSrc = readFileSync(path.join(process.cwd(), "lib", "destinations.ts"), "utf8");
  for (const m of destSrc.matchAll(/'([A-Z]{3})'/g)) set.add(m[1]);
  for (const m of destSrc.matchAll(/"([A-Z]{3})"/g)) set.add(m[1]);
  // lib/routes.ts
  const routeSrc = readFileSync(path.join(process.cwd(), "lib", "routes.ts"), "utf8");
  for (const m of routeSrc.matchAll(/'([A-Z]{3})'/g)) set.add(m[1]);
  for (const m of routeSrc.matchAll(/"([A-Z]{3})"/g)) set.add(m[1]);
  // common hubs
  const hubs = ["AMS","LON","PAR","ROM","IST","DXB","CAI","CMN","RUH","TLV","THR","MOW","WAW","BER","MAD","LIS","NYC","BKK","TYO","SIN","BCN","MIL","VIE","PRG","BUD","CPH","STO","OSL","HEL","ATH","BRU","GVA","ZRH","DUS","HAM","CGN","DUB","EDI","MAN","LED","IEV","BUH","SOF","BEG","ZAG","SPU","DBV","AGP","SVQ","VLC","PMI","IBZ","TFS","LPA","FAO","OPO","NCE","MRS","LYS","TLS","BOD","KRK","GDN","RIX","TLL","VNO","REK","MLA","LCA","AYT","IZM","ANK","AUH","SHJ","DOH","JED","MED","DMM","KWI","BAH","MCT","AMM","BEY","HRG","SSH","ALY","LXR","RAK","TNG","TUN","ALG","TIP","KRT","ADD","NBO","LOS","ACC","JNB","CPT","BGW","KHI","LHE","ISB","DEL","BOM","BLR","CMB","MLE","DAC","KTM","HKT","KUL","JKT","DPS","MNL","CEB","HAN","SGN","HKG","BJS","SHA","CAN","OSA","SEL","TPE","SYD","MEL","AKL","LAX","SFO","CHI","MIA","WAS","BOS","YTO","YVR","YMQ","MEX","CUN","HAV","BOG","LIM","SCL","BUE","SAO","RIO","RTM","EIN","LUX","FRA","MUC","AMS"];
  for (const c of hubs) set.add(c);
  return [...set];
}

// English name lookup from TP data
async function fetchJson(url) {
  const res = await fetch(url, { headers: { "Accept-Version": "v1", "Authorization": `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error("fetch " + res.status);
  return res.json();
}

const cities = deriveCities();
const limit = parseInt(process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1] || "40", 10);
const todo = cities.filter((c) => !photos[c]).slice(0, limit);
console.log(`Total cities: ${cities.length}, already have: ${Object.keys(photos).length}, to process: ${todo.length}`);

// We need English names for search. Load from TP en data (cached).
let enMap = {};
try {
  const tp = await fetch("https://api.travelpayouts.com/data/en/cities.json").then((r) => r.json());
  for (const c of tp) if (c.code && c.name) enMap[c.code] = c.name;
} catch {}

// Country lookup
let countryMap = {};
try {
  const tp = await fetch("https://api.travelpayouts.com/data/en/cities.json").then((r) => r.json());
  for (const c of tp) if (c.code) countryMap[c.code] = c.country_code;
} catch {}

const CC_NAMES = {};
try {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=cca2,name");
  const j = await res.json();
  for (const c of j) CC_NAMES[c.cca2] = c.name?.common;
} catch {}

let processed = 0;
for (const code of todo) {
  const name = enMap[code] || code;
  const country = CC_NAMES[countryMap[code]] || "";
  const query = `${name} ${country} skyline OR landmark OR cityscape`.trim();
  console.log(`[${processed+1}/${todo.length}] ${code} (${name})...`);
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&per_page=10`;
    const data = await fetchJson(searchUrl);
    const results = data.results || [];
    // choose first result with width >= 1600 and city/landmark-looking description
    let chosen = null;
    for (const r of results) {
      if ((r.width || 0) < 1600) continue;
      const desc = (r.description || r.alt_description || "").toLowerCase();
      // skip unrelated
      if (/food|animal|portrait|interior|abstract/i.test(desc)) continue;
      chosen = r;
      break;
    }
    if (!chosen && results.length) chosen = results.find((r) => (r.width || 0) >= 1600) || results[0];
    if (chosen) {
      // call download_location once
      try { await fetch(chosen.links.download_location + `?client_id=${KEY}`); } catch {}
      const authorUrl = `${chosen.user.links.html}?utm_source=ticketsjet&utm_medium=referral`;
      const photoUrl = `${chosen.links.html}?utm_source=ticketsjet&utm_medium=referral`;
      photos[code] = {
        id: chosen.id,
        url: chosen.urls.raw.split("?")[0],
        blur_hash: chosen.blur_hash || null,
        color: chosen.color || null,
        alt: chosen.alt_description || chosen.description || name,
        width: chosen.width,
        height: chosen.height,
        author: chosen.user.name,
        authorUrl,
        photoUrl,
        downloadLocation: chosen.links.download_location,
      };
      console.log(`  -> ${chosen.user.name} (${chosen.width}x${chosen.height})`);
    } else {
      console.log(`  -> no result`);
    }
  } catch (e) {
    console.error(`  error: ${e.message}`);
  }
  processed++;
  // rate limit: small delay
  await new Promise((r) => setTimeout(r, 1200));
}
writeFileSync(PHOTOS_PATH, JSON.stringify(photos, null, 2));
console.log(`\nCoverage: ${Object.keys(photos).length}/${cities.length} cities have photos.`);
const missing = cities.filter((c) => !photos[c]);
if (missing.length) console.log("Missing:", missing.slice(0, 50).join(", ") + (missing.length > 50 ? "..." : ""));
if (todo.length >= limit) console.log("\nRun again in an hour to continue (rate limit: 50 req/hour).");
