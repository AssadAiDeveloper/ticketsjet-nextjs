import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const LOCALES = ["en","ar","nl","es","fr","de","it","pt","tr","ru","pl","fa","he"];
const OUT_DIR = path.join(process.cwd(), "data", "city-names");
mkdirSync(OUT_DIR, { recursive: true });

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("fetch " + res.status);
  return res.json();
}

function loadManual() {
  try {
    const src = readFileSync(path.join(process.cwd(), "lib", "cityNames.ts"), "utf8");
    const m = src.match(/const NAMES: Record<string, \[string, string\]> = (\{[\s\S]*?\n\});/);
    if (!m) return {};
    // eslint-disable-next-line no-eval
    return eval("(" + m[1] + ")");
  } catch { return {}; }
}
const manual = loadManual();

async function main() {
  const enData = await fetchJson("https://api.travelpayouts.com/data/en/cities.json");
  const enMap = new Map(enData.map((c) => [c.code, c.name]));

  for (const loc of LOCALES) {
    console.log("Fetching", loc);
    const data = await fetchJson("https://api.travelpayouts.com/data/" + loc + "/cities.json");
    const out = {};
    for (const c of data) {
      if (!c.code) continue;
      if (!c.has_flightable_airport) continue;
      const enName = enMap.get(c.code) || c.code;
      let name = (c.name && c.name !== null) ? c.name : enName;
      const man = manual[c.code];
      if (man) {
        if (loc === "ar" && man[0]) name = man[0];
        if (loc === "nl" && man[1]) name = man[1];
      }
      if (!name) name = enName;
      out[c.code] = name;
    }
    writeFileSync(path.join(OUT_DIR, loc + ".json"), JSON.stringify(out));
    console.log("  wrote", Object.keys(out).length, "entries");
  }
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
