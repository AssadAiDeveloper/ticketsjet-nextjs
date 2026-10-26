import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

const KEY = process.env.UNSPLASH_ACCESS_KEY;
const PHOTOS_PATH = path.join(process.cwd(), "data", "destination-photos.json");
const CANDIDATES_PATH = path.join(process.cwd(), "data", "photo-candidates.json");
const QUERIES_PATH = path.join(process.cwd(), "data", "photo-queries.json");

const candidatesMode = process.argv.includes("--candidates");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : 45;

if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY is missing in .env.local. Add it and re-run. (No data faked.)");
  process.exit(0);
}

let photos = {};
if (existsSync(PHOTOS_PATH)) {
  try { photos = JSON.parse(readFileSync(PHOTOS_PATH, "utf8")); } catch { photos = {}; }
}
let candidates = {};
if (existsSync(CANDIDATES_PATH)) {
  try { candidates = JSON.parse(readFileSync(CANDIDATES_PATH, "utf8")); } catch { candidates = {}; }
}
const queries = existsSync(QUERIES_PATH) ? JSON.parse(readFileSync(QUERIES_PATH, "utf8")) : {};

const BAD_WORDS = ["sign", "text", "letters", "poster", "crowd", "selfie", "woman", "man", "people", "portrait", "couple", "food"];

function isBad(desc) {
  const d = (desc || "").toLowerCase();
  return BAD_WORDS.some((w) => d.includes(w));
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error("fetch " + res.status);
  return res.json();
}

// Derive city list
function deriveCities() {
  const set = new Set();
  const destSrc = readFileSync(path.join(process.cwd(), "lib", "destinations.ts"), "utf8");
  for (const m of destSrc.matchAll(/'([A-Z]{3})'/g)) set.add(m[1]);
  for (const m of destSrc.matchAll(/"([A-Z]{3})"/g)) set.add(m[1]);
  const routeSrc = readFileSync(path.join(process.cwd(), "lib", "routes.ts"), "utf8");
  for (const m of routeSrc.matchAll(/'([A-Z]{3})'/g)) set.add(m[1]);
  for (const m of routeSrc.matchAll(/"([A-Z]{3})"/g)) set.add(m[1]);
  const hubs = ["AMS","LON","PAR","ROM","IST","DXB","CAI","CMN","RUH","TLV","THR","MOW","WAW","BER","MAD","LIS","NYC","BKK","TYO","SIN","FRA","MUC","BCN","MIL","VIE","PRG","BUD","CPH","STO","OSL","HEL","ATH","BRU","GVA","ZRH","DUS","HAM","CGN","DUB","EDI","MAN","LED","IEV","BUH","SOF","BEG","ZAG","SPU","DBV","AGP","SVQ","VLC","PMI","IBZ","TFS","LPA","FAO","OPO","NCE","MRS","LYS","TLS","BOD","KRK","GDN","RIX","TLL","VNO","REK","MLA","LCA","AYT","IZM","ANK","AUH","SHJ","DOH","JED","MED","DMM","KWI","BAH","MCT","AMM","BEY","HRG","SSH","ALY","LXR","RAK","TNG","TUN","ALG","TIP","KRT","ADD","NBO","LOS","ACC","JNB","CPT","BGW","KHI","LHE","ISB","DEL","BOM","BLR","CMB","MLE","DAC","KTM","HKT","KUL","JKT","DPS","MNL","CEB","HAN","SGN","HKG","BJS","SHA","CAN","OSA","SEL","TPE","SYD","MEL","AKL","LAX","SFO","CHI","MIA","WAS","BOS","YTO","YVR","YMQ","MEX","CUN","HAV","BOG","LIM","SCL","BUE","SAO","RIO","RTM","EIN","LUX"];
  for (const c of hubs) set.add(c);
  return [...set];
}

// English name lookup
let enMap = {}, countryMap = {};
try {
  const tp = await fetch("https://api.travelpayouts.com/data/en/cities.json").then((r) => r.json());
  for (const c of tp) { if (c.code && c.name) enMap[c.code] = c.name; if (c.code) countryMap[c.code] = c.country_code; }
} catch {}
let CC_NAMES = {};
try {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=cca2,name");
  const j = await res.json();
  for (const c of j) CC_NAMES[c.cca2] = c.name?.common;
} catch {}

const cities = deriveCities();
const todo = cities.filter((c) => !candidates[c]).slice(0, LIMIT);
console.log(`Total cities: ${cities.length}, candidates done: ${Object.keys(candidates).length}, to process: ${todo.length}`);

let processed = 0;
for (const code of todo) {
  const name = enMap[code] || code;
  const country = CC_NAMES[countryMap[code]] || "";
  const query = queries[code] ? queries[code] : `${name} ${country} landmark`.trim();
  console.log(`[${processed + 1}/${todo.length}] ${code} (${name}) -> query: "${query}"`);
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&per_page=10&order_by=relevant`;
    const data = await fetchJson(searchUrl);
    const results = (data.results || []).filter((r) => (r.width || 0) >= 2400 && !isBad(r.description || r.alt_description || ""));
    const chosen = results.slice(0, 6).map((r) => ({
      id: r.id,
      url: r.urls.raw.split("?")[0],
      blur_hash: r.blur_hash || null,
      color: r.color || null,
      alt: r.alt_description || r.description || name,
      width: r.width,
      height: r.height,
      author: r.user.name,
      authorUrl: `${r.user.links.html}?utm_source=ticketsjet&utm_medium=referral`,
      photoUrl: `${r.links.html}?utm_source=ticketsjet&utm_medium=referral`,
      downloadLocation: r.links.download_location,
    }));
    candidates[code] = chosen;
    console.log(`  -> ${chosen.length} candidates`);
    if (chosen.length < 3) console.log(`  ? fewer than 3 candidates`);
  } catch (e) {
    console.error(`  error: ${e.message}`);
    candidates[code] = [];
  }
  processed++;
  await new Promise((r) => setTimeout(r, 1200));
  // Save progress every 10
  if (processed % 10 === 0) writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2));
}
writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2));
const withCands = Object.keys(candidates).filter((c) => candidates[c].length > 0).length;
console.log(`\nCoverage: ${withCands}/${cities.length} cities have candidates.`);
const few = Object.keys(candidates).filter((c) => candidates[c].length > 0 && candidates[c].length < 3);
if (few.length) console.log("Fewer than 3 candidates:", few.join(", "));
if (todo.length >= LIMIT) console.log("\nRun again in an hour to continue (rate limit: 50 req/hour).");
