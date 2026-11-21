// Local country fallback for the city autocomplete. The places feed only has city
// entities, so a country match expands to a small, verified list of city codes.
import { norm } from "@/lib/cityName";
import { intlTag } from "@/lib/format";

/** Looser than norm(): folds Arabic hamza/ya forms and Persian letter variants. */
export const countryNorm = (s: string) =>
  norm(s)
    .replace(/[أإآءئ]/g, "ا")
    .replace(/ؤ/g, "و")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/پ/g, "ب")
    .replace(/چ/g, "ج")
    .replace(/ژ/g, "ز")
    .replace(/گ/g, "ک")
    .replace(/ی/g, "ي");

// Every code below was checked against https://api.travelpayouts.com/data/en/cities.json
// and belongs to the country shown in its key. No invented codes.
export const COUNTRY_CITIES: Record<string, string[]> = {
  AE: ["DXB", "AUH", "SHJ", "RKT", "AAN", "FJR"],
  AR: ["BUE", "COR", "MDZ", "ROS", "SLA", "IGR"],
  AU: ["SYD", "MEL", "BNE", "PER", "ADL", "CNS"],
  BH: ["BAH"],
  BR: ["SAO", "RIO", "BSB", "POA", "REC", "FOR"],
  CA: ["YTO", "YMQ", "YVR", "YYC", "YHZ", "YOW"],
  CN: ["BJS", "SHA", "CAN", "CTU", "HGH", "SZX"],
  DE: ["FRA", "MUC", "HAM", "CGN", "DUS", "BER"],
  DZ: ["ALG", "AAE", "ORN", "CZL", "TMR", "BJA"],
  EG: ["CAI", "HRG", "SSH", "LXR", "ALY", "ASW"],
  ES: ["MAD", "BCN", "AGP", "PMI", "ALC", "SVQ"],
  FR: ["PAR", "LYS", "MRS", "NCE", "TLS", "BOD"],
  GB: ["LON", "MAN", "EDI", "BRS", "BHX", "GLA"],
  GR: ["ATH", "SKG", "CFU", "RHO", "HER", "ZTH"],
  HR: ["ZAG", "SPU", "DBV", "RJK", "ZAD", "OSI"],
  ID: ["JKT", "DPS", "SUB", "MES", "BPN", "UPG"],
  IN: ["BOM", "DEL", "BLR", "MAA", "CCU", "HYD"],
  IT: ["ROM", "MIL", "NAP", "VCE", "BLQ", "PMO"],
  JO: ["AMM", "AQJ", "OMF", "MPQ"],
  JP: ["TYO", "OSA", "NGO", "FUK", "OKA", "SPK"],
  KE: ["NBO", "MBA", "KIS", "NUU", "MYD", "NYK"],
  KR: ["SEL", "CJU", "PUS", "TAE", "KWJ", "KPO"],
  KW: ["KWI"],
  LB: ["BEY"],
  MA: ["CMN", "RAK", "TNG", "AGA", "OZZ", "FEZ"],
  MX: ["MEX", "CUN", "GDL", "MTY", "PVR", "MID"],
  MY: ["KUL", "PEN", "KCH", "ZWR", "LGK", "JHB"],
  NG: ["LOS", "ABV", "PHC", "KAN", "ENU", "QOW"],
  NL: ["AMS", "RTM", "EIN", "MST", "GRQ", "HAG"],
  OM: ["MCT", "SLL", "KHS", "SUH", "MNH"],
  PL: ["WAW", "KTW", "GDN", "WRO", "POZ", "KRK"],
  PT: ["LIS", "OPO", "FNC", "FAO", "PDL", "TER"],
  QA: ["DOH"],
  RU: ["MOW", "LED", "SVX", "KZN", "AER", "OVB"],
  SA: ["RUH", "JED", "DMM", "MED", "AHB", "TUU"],
  SG: ["SIN"],
  TH: ["BKK", "CNX", "HKT", "CEI", "USM", "SNO"],
  TN: ["TUN", "MIR", "DJE", "SFA", "GAE", "NBE"],
  TR: ["IST", "AYT", "IZM", "TZX", "DLM", "ADA"],
  US: ["NYC", "LAX", "CHI", "MIA", "SFO", "BOS"],
  ZA: ["JNB", "CPT", "DUR", "PLZ", "BFN", "GRJ"],
};

/** Names people type that Intl.DisplayNames does not cover in every locale. */
const ALIASES: Record<string, string[]> = {
  AE: ["uae", "u a e", "vae", "emirates"],
  DE: ["deutschland"],
  GB: ["uk", "great britain", "england"],
  KR: ["korea"],
  NL: ["holland"],
  TR: ["turkey", "turkiye"],
  US: ["usa", "america"],
};

const TAGS = ["en-GB", "nl-NL", "ar", "es-ES", "fr-FR", "de-DE", "it-IT", "pt-PT", "tr-TR", "ru-RU", "pl-PL", "fa", "he-IL"] as const;
const displays = new Map<string, Intl.DisplayNames>();
const nameCache = new Map<string, string[]>();

function display(tag: string) {
  let d = displays.get(tag);
  if (!d) {
    d = new Intl.DisplayNames([tag], { type: "region" });
    displays.set(tag, d);
  }
  return d;
}

/** Normalized names from every supported locale plus common aliases. */
function namesFor(code: string) {
  let names = nameCache.get(code);
  if (!names) {
    const set = new Set<string>();
    for (const tag of TAGS) {
      const name = display(tag).of(code);
      if (name) set.add(countryNorm(name));
    }
    for (const alias of ALIASES[code] ?? []) set.add(countryNorm(alias));
    set.add(countryNorm(code));
    names = [...set];
    nameCache.set(code, names);
  }
  return names;
}

/** Country name shown to the visitor, in their language. */
export function countryLabel(code: string, locale: string) {
  return display(intlTag(locale)).of(code) ?? display("en-GB").of(code) ?? code;
}

export type CountryMatch = { code: string; name: string; codes: string[] };

/** Finds a country by name in any supported locale, with case and accent folding. */
export function findCountry(raw: string, locale: string): CountryMatch | null {
  const needle = countryNorm(raw);
  if (needle.length < 2) return null;
  let best: { code: string; score: number } | null = null;
  for (const [code, codes] of Object.entries(COUNTRY_CITIES)) {
    const names = namesFor(code);
    const score = names.some((n) => n === needle) ? 0 : names.some((n) => n.startsWith(needle)) ? 1 : null;
    if (score === null) continue;
    if (!best || score < best.score) best = { code, score };
  }
  if (!best) return null;
  return { code: best.code, name: countryLabel(best.code, locale), codes: COUNTRY_CITIES[best.code] };
}
