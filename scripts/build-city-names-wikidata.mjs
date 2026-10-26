import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "data", "city-names", "wikidata.json");
const DELAY_MS = 1100;
const UA = "TicketsJet-city-names/1.0 (https://ticketsjet.com)";

const codes = ["AMS","ATH","BCN","BKK","CAI","CMN","DUB","DXB","FRA","IST","JED","LIS","LON","MAD","MNL","NYC","PAR","ROM","RUH","VIE"];

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function queryCode(code) {
  // Get city labels via P131 (located in) from airport, or direct city code P954
  const sparql = `
    SELECT ?city ?ar ?fa ?he ?ru WHERE {
      {
        ?city wdt:P954 "${code}" .
      } UNION {
        ?airport wdt:P238 "${code}" .
        ?airport wdt:P131+ ?city .
      }
      OPTIONAL { ?city rdfs:label ?ar . FILTER(LANG(?ar) = "ar") }
      OPTIONAL { ?city rdfs:label ?fa . FILTER(LANG(?fa) = "fa") }
      OPTIONAL { ?city rdfs:label ?he . FILTER(LANG(?he) = "he") }
      OPTIONAL { ?city rdfs:label ?ru . FILTER(LANG(?ru) = "ru") }
    }
    LIMIT 5
  `;
  const url = "https://query.wikidata.org/sparql?query=" + encodeURIComponent(sparql) + "&format=json";
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/sparql-results+json" } });
    if (!res.ok) { console.log(code, "HTTP", res.status); return null; }
    const json = await res.json();
    const bindings = json.results?.bindings || [];
    if (bindings.length === 0) { console.log(code, "no results"); return null; }
    // Pick binding with most language labels
    let best = bindings[0];
    let bestCount = 0;
    for (const b of bindings) {
      const cnt = (b.ar?1:0)+(b.fa?1:0)+(b.he?1:0)+(b.ru?1:0);
      if (cnt > bestCount) { best = b; bestCount = cnt; }
    }
    const result = {};
    for (const lang of ["ar", "fa", "he", "ru"]) {
      const val = best[lang]?.value;
      if (val) result[lang] = val;
    }
    console.log(code, "->", JSON.stringify(result));
    return Object.keys(result).length > 0 ? result : null;
  } catch (e) {
    console.log(code, "error:", e.message);
    return null;
  }
}

async function main() {
  let data = {};
  try { data = JSON.parse(readFileSync(OUT, "utf8")); } catch { data = {}; }

  for (const code of codes) {
    if (data[code] && Object.keys(data[code]).length > 0) {
      console.log(code, "already done, skip");
      continue;
    }
    const res = await queryCode(code);
    if (res) data[code] = res;
    await sleep(DELAY_MS);
  }

  // Restructure: locale -> code -> name
  const byLocale = {};
  for (const code of codes) {
    const r = data[code];
    if (!r) continue;
    for (const [lang, name] of Object.entries(r)) {
      byLocale[lang] = byLocale[lang] || {};
      byLocale[lang][code] = name;
    }
  }

  writeFileSync(OUT, JSON.stringify(byLocale, null, 2) + "\n");
  console.log("Written", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });