import { readFileSync, writeFileSync, createReadStream } from "node:fs";
import path from "node:path";
import readline from "node:readline";

const GEO_DIR = "C:/Users/sAssa/AppData/Local/Temp/opencode/geonames";
const OUT_DIR = path.join(process.cwd(), "data", "city-names");

async function main() {
  // Load IATA -> geonameid mapping
  const iataToGeo = new Map();
  const geoNames = new Map(); // geonameid -> { he: [], fa: [] }
  const rl = readline.createInterface({ input: createReadStream(path.join(GEO_DIR, "alternateNamesV2.txt"), { encoding: "utf8" }), crlfDelay: Infinity });
  for await (const line of rl) {
    const parts = line.split("\t");
    if (parts.length < 5) continue;
    const [altId, geonameid, isolanguage, altName, isPreferred, isShort, isColloquial, isHistoric] = parts;
    if (isolanguage === "iata") {
      if (!iataToGeo.has(altName)) iataToGeo.set(altName, geonameid);
      continue;
    }
    if (isolanguage !== "he" && isolanguage !== "fa") continue;
    if (isHistoric === "1") continue;
    if (isColloquial === "1") continue;
    if (/\d/.test(altName)) continue;
    if (!geoNames.has(geonameid)) geoNames.set(geonameid, { he: [], fa: [] });
    const g = geoNames.get(geonameid);
    g[isolanguage].push({ name: altName, preferred: isPreferred === "1", short: isShort === "1" });
  }

  // Load TP en data for our codes
  const enData = JSON.parse(readFileSync(path.join(process.cwd(), "data", "city-names", "en.json"), "utf8"));
  const ourCodes = Object.keys(enData);

  // For each locale, find he/fa names
  for (const loc of ["he", "fa"]) {
    const out = {};
    let found = 0;
    for (const code of ourCodes) {
      const geoId = iataToGeo.get(code);
      if (!geoId) continue;
      const g = geoNames.get(geoId);
      if (!g || !g[loc] || g[loc].length === 0) continue;
      const candidates = g[loc];
      const preferred = candidates.filter(c => c.preferred);
      const pool = preferred.length ? preferred : candidates;
      // Prefer non-short names
      const nonShort = pool.filter(c => !c.short);
      const chosen = (nonShort.length ? nonShort : pool)[0];
      if (chosen) {
        out[code] = chosen.name;
        found++;
      }
    }
    writeFileSync(path.join(OUT_DIR, "geonames-alt." + loc + ".json"), JSON.stringify(out, null, 2) + "\n");
    console.log(loc + ": found " + found + " names out of " + ourCodes.length);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });