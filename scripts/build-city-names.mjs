import { writeFileSync, mkdirSync, readFileSync, createReadStream } from "node:fs";
import path from "node:path";
import readline from "node:readline";

const GEO_DIR = "C:/Users/sAssa/AppData/Local/Temp/opencode/geonames";
const OUT_DIR = path.join(process.cwd(), "data", "city-names");
mkdirSync(OUT_DIR, { recursive: true });

const LOCALES = ["en","ar","nl","es","fr","de","it","pt","tr","ru","pl","fa","he"];
const GEO_LANG = { en:"en", ar:"ar", nl:"nl", es:"es", fr:"fr", de:"de", it:"it", pt:"pt", tr:"tr", ru:"ru", pl:"pl", fa:"fa", he:"he" };

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
  console.log("Loading TP en data...");
  const enData = await fetchJson("https://api.travelpayouts.com/data/en/cities.json");
  const enMap = new Map(enData.filter(c=>c.code).map((c) => [c.code, { name: c.name, lat: c.coordinates?.lat, lon: c.coordinates?.lon, country: c.country_code }]));
  const allFlightable = [...enMap.keys()].filter(c => enMap.get(c).lat != null && enData.find(x=>x.code===c)?.has_flightable_airport);
  const ourCodes = allFlightable.sort().slice(0, 3000);
  console.log("Our cities:", ourCodes.length);

  console.log("Parsing alternateNamesV2.txt...");
  const iataToGeo = new Map();
  const geoNames = new Map();
  const rl = readline.createInterface({ input: createReadStream(path.join(GEO_DIR, "alternateNamesV2.txt"), { encoding: "utf8" }), crlfDelay: Infinity });
  let count = 0;
  for await (const line of rl) {
    const parts = line.split("\t");
    if (parts.length < 5) continue;
    const [altId, geonameid, isolanguage, altName, isPreferred, isShort, isColloquial, isHistoric] = parts;
    if (isolanguage === "iata") {
      if (!iataToGeo.has(altName)) iataToGeo.set(altName, geonameid);
      continue;
    }
    if (!LOCALES.includes(isolanguage)) continue;
    if (isHistoric === "1") continue;
    if (isColloquial === "1") continue;
    if (/\d/.test(altName)) continue;
    const entry = { name: altName, isPreferred: isPreferred === "1", isShort: isShort === "1" };
    if (!geoNames.has(geonameid)) geoNames.set(geonameid, {});
    const g = geoNames.get(geonameid);
    if (!g[isolanguage]) g[isolanguage] = [];
    g[isolanguage].push(entry);
    count++;
  }
  console.log("Parsed alternate names:", count);
  console.log("IATA->geonameid mappings:", iataToGeo.size);

  const codeToGeo = new Map();
  for (const code of ourCodes) {
    if (iataToGeo.has(code)) codeToGeo.set(code, iataToGeo.get(code));
  }
  console.log("Our codes matched to geonameid:", codeToGeo.size, "of", ourCodes.length);

  // Coordinate fallback
  console.log("Parsing cities15000.txt for coordinate fallback...");
  const cityLines = readFileSync(path.join(GEO_DIR, "cities15000.txt"), "utf8").split("\n");
  const geoByCoord = new Map();
  for (const line of cityLines) {
    const parts = line.split("\t");
    if (parts.length < 19) continue;
    const [geonameid, name, asciiname, alternatenames, lat, lon, featureClass, featureCode, countryCode] = parts;
    const key = countryCode + ":" + (Math.round(parseFloat(lat)*10)/10) + ":" + (Math.round(parseFloat(lon)*10)/10);
    if (!geoByCoord.has(key)) geoByCoord.set(key, geonameid);
  }
  let coordMatched = 0;
  for (const code of ourCodes) {
    if (codeToGeo.has(code)) continue;
    const info = enMap.get(code);
    if (!info || info.lat == null) continue;
    const key = info.country + ":" + (Math.round(info.lat*10)/10) + ":" + (Math.round(info.lng*10)/10);
    if (geoByCoord.has(key)) {
      codeToGeo.set(code, geoByCoord.get(key));
      coordMatched++;
    }
  }
  console.log("Coordinate-matched:", coordMatched);

  const sources = {};

  for (const loc of LOCALES) {
    const tpData = await fetchJson("https://api.travelpayouts.com/data/" + loc + "/cities.json").catch(() => []);
    const tpMap = new Map(tpData.filter(c=>c.code).map((c) => [c.code, c.name]));
    const out = {};
    const src = {};
    for (const code of ourCodes) {
      const enName = enMap.get(code)?.name || code;
      let name = enName;
      let source = "fallback";
      // 1. Manual override (highest priority) for ar/nl
      if (manual[code]) {
        if (loc === "ar" && manual[code][0]) { name = manual[code][0]; source = "manual"; }
        if (loc === "nl" && manual[code][1]) { name = manual[code][1]; source = "manual"; }
      }
      // 2. Travelpayouts
      if (source === "fallback") {
        const tpName = tpMap.get(code);
        if (tpName && tpName !== null && tpName !== enName) {
          name = tpName;
          source = "TP";
        }
      }
      // 3. GeoNames (skip for en)
      if (loc !== "en" && source === "fallback" && name === enName) {
        const geo = codeToGeo.get(code);
        if (geo && geoNames.has(geo)) {
          const g = geoNames.get(geo);
          const lang = GEO_LANG[loc];
          const candidates = g[lang] || [];
          const preferred = candidates.filter(c => c.isPreferred);
          const pool = preferred.length ? preferred : candidates;
          const filtered = pool.filter(c => c.name.toUpperCase() !== code.toUpperCase());
          const final = filtered.length ? filtered : pool;
          if (final.length) {
            const nonShort = final.filter(c => !c.isShort);
            const chosen = (nonShort.length ? nonShort : final)[0];
            if (chosen) {
              name = chosen.name;
              source = "GeoNames";
            }
          }
        }
      }
      out[code] = name;
      src[code] = source;
    }
    for (const code of ourCodes) {
      if (!sources[code]) sources[code] = {};
      sources[code][loc] = src[code];
    }
    writeFileSync(path.join(OUT_DIR, loc + ".json"), JSON.stringify(out));
    const tpCount = Object.values(src).filter(s => s === "TP").length;
    const geoCount = Object.values(src).filter(s => s === "GeoNames").length;
    const manCount = Object.values(src).filter(s => s === "manual").length;
    const fbCount = Object.values(src).filter(s => s === "fallback").length;
    console.log(loc + ": TP=" + tpCount + " GeoNames=" + geoCount + " manual=" + manCount + " fallback=" + fbCount + " total=" + ourCodes.length);
  }

  writeFileSync(path.join(OUT_DIR, "_sources.json"), JSON.stringify(sources, null, 2));
  console.log("Wrote _sources.json");
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });

