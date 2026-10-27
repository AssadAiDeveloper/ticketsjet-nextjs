import { readFileSync, writeFileSync, createReadStream } from "node:fs";
import path from "node:path";
import readline from "node:readline";

const GEO_DIR = "C:/Users/sAssa/AppData/Local/Temp/opencode/geonames";
const OUT = path.join(process.cwd(), "data", "city-names", "wikidata.json");
const DELAY_MS = 1100;
const UA = "TicketsJet-city-names/1.0 (https://ticketsjet.com)";
const LIMIT = 50; // process N per run

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// Load GeoNames ID mapping from alternateNamesV2.txt
async function loadGeoMapping() {
  const mapping = new Map();
  const rl = readline.createInterface({ input: createReadStream(path.join(GEO_DIR, "alternateNamesV2.txt"), { encoding: "utf8" }), crlfDelay: Infinity });
  for await (const line of rl) {
    const parts = line.split("\t");
    if (parts.length < 5) continue;
    const [altId, geonameid, isolanguage, altName] = parts;
    if (isolanguage === "iata" && !mapping.has(altName)) {
      mapping.set(altName, geonameid);
    }
  }
  return mapping;
}

async function queryWikidata(geonameid) {
  const sparql = 'SELECT ?ar ?fa WHERE { ?item wdt:P1566 "' + geonameid + '" . OPTIONAL { ?item rdfs:label ?ar . FILTER(LANG(?ar) = "ar") } OPTIONAL { ?item rdfs:label ?fa . FILTER(LANG(?fa) = "fa") } OPTIONAL { ?item rdfs:label ?he . FILTER(LANG(?he) = "he") } } LIMIT 1';
  const url = "https://query.wikidata.org/sparql?query=" + encodeURIComponent(sparql) + "&format=json";
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/sparql-results+json" } });
    if (!res.ok) return null;
    const json = await res.json();
    const b = json.results?.bindings?.[0];
    if (!b) return null;
    const result = {};
    for (const lang of ["ar", "fa", "he"]) {
      const val = b[lang]?.value;
      if (val) result[lang] = val;
    }
    return Object.keys(result).length > 0 ? result : null;
  } catch (e) {
    return null;
  }
}

function isBad(name, english) {
  if (!name || name === english) return true;
  if (/[A-Za-z]/.test(name)) return true; // Latin letters
  // mixed scripts: Hebrew should not contain Arabic/Cyrillic
  if (/[\u0600-\u06FF]/.test(name) && /[\u0590-\u05FF]/.test(name)) return true; // mixed Arabic+Hebrew
  if (/[\u0400-\u04FF]/.test(name)) return true; // Cyrillic in non-Russian
  return false;
}

async function main() {
  const en = JSON.parse(readFileSync(path.join(process.cwd(), "data", "city-names", "en.json"), "utf8"));
  const he = JSON.parse(readFileSync(path.join(process.cwd(), "data", "city-names", "he.json"), "utf8"));
  const fa = JSON.parse(readFileSync(path.join(process.cwd(), "data", "city-names", "fa.json"), "utf8"));

  let data = {};
  try { data = JSON.parse(readFileSync(OUT, "utf8")); } catch { data = {}; }

  const geoMap = await loadGeoMapping();
  console.log("GeoNames mapping:", geoMap.size);

  // Find codes where he or fa equals English
  const todo = Object.keys(en).filter((code) => {
    if (data[code]) return false; // already processed
    return he[code] === en[code] || fa[code] === en[code];
  });
  console.log("To process:", todo.length, " (limit", LIMIT, ")");
  const batch = todo.slice(0, LIMIT);

  let accepted = 0, rejected = 0, skipped = 0;
  for (const code of batch) {
    const geoId = geoMap.get(code);
    if (!geoId) { skipped++; console.log(code, "no GeoNames ID, skip"); continue; }
    const res = await queryWikidata(geoId);
    if (!res) { console.log(code, "no Wikidata result"); await sleep(DELAY_MS); continue; }
    const english = en[code];
    const acceptedNames = {};
    for (const [lang, name] of Object.entries(res)) {
      if (lang === "he" && he[code] !== en[code]) continue; // only fix if needed
      if (lang === "fa" && fa[code] !== en[code]) continue;
      if (isBad(name, english)) { console.log(code, lang, "rejected:", name); rejected++; continue; }
      acceptedNames[lang] = name;
    }
    if (Object.keys(acceptedNames).length > 0) {
      data[code] = acceptedNames;
      accepted++;
      console.log(code, "accepted:", JSON.stringify(acceptedNames));
    }
    await sleep(DELAY_MS);
  }

  // Restructure: locale -> code -> name
  const byLocale = {};
  for (const code of Object.keys(data)) {
    const r = data[code];
    if (!r) continue;
    for (const [lang, name] of Object.entries(r)) {
      byLocale[lang] = byLocale[lang] || {};
      byLocale[lang][code] = name;
    }
  }

  writeFileSync(OUT, JSON.stringify(byLocale, null, 2) + "\n");
  console.log("Accepted:", accepted, "Rejected:", rejected, "Skipped (no GeoID):", skipped);
  console.log("Total in file:", Object.keys(data).length);
}

main().catch((e) => { console.error(e); process.exit(1); });