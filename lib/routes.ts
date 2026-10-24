// Curated route list for SEO pages: /cheap-flights/ams-to-lon
export type Place = { code: string; name: string; country: string; blurb: string };

export const ORIGINS: Record<string, string> = {
  ams: "Amsterdam", lon: "London", par: "Paris", dxb: "Dubai", ruh: "Riyadh", cai: "Cairo", ist: "Istanbul",
};

export const DESTS: Record<string, Place> = {
  lon: { code: "LON", name: "London", country: "United Kingdom", blurb: "Europe's busiest city break, with five airports and dozens of daily flights from most hubs." },
  par: { code: "PAR", name: "Paris", country: "France", blurb: "Short, frequent flights make Paris one of the easiest weekend trips in Europe." },
  bcn: { code: "BCN", name: "Barcelona", country: "Spain", blurb: "Beach, architecture and food in one city, served by both full-service and low-cost airlines." },
  rom: { code: "ROM", name: "Rome", country: "Italy", blurb: "Flights reach Fiumicino and Ciampino; low-cost carriers often fly to Ciampino." },
  mad: { code: "MAD", name: "Madrid", country: "Spain", blurb: "A major hub for flights onward to Latin America as well as a destination in its own right." },
  ist: { code: "IST", name: "Istanbul", country: "Türkiye", blurb: "Straddles two continents, with two main airports and many direct routes from Europe and the Gulf." },
  dxb: { code: "DXB", name: "Dubai", country: "United Arab Emirates", blurb: "A global transit hub with long-haul routes in every direction." },
  cai: { code: "CAI", name: "Cairo", country: "Egypt", blurb: "Direct flights from many European and Gulf cities; popular year-round." },
  ruh: { code: "RUH", name: "Riyadh", country: "Saudi Arabia", blurb: "The capital's King Khalid airport is well connected to Europe, Asia and the Gulf." },
  jed: { code: "JED", name: "Jeddah", country: "Saudi Arabia", blurb: "Gateway to Makkah and the Red Sea coast, with busy seasonal demand." },
  cmn: { code: "CMN", name: "Casablanca", country: "Morocco", blurb: "Morocco's main hub, with many direct flights from Europe." },
  nyc: { code: "NYC", name: "New York", country: "United States", blurb: "Flights serve JFK, Newark and LaGuardia — compare all three in one search." },
  bkk: { code: "BKK", name: "Bangkok", country: "Thailand", blurb: "A common first stop for travel across Southeast Asia." },
  mnl: { code: "MNL", name: "Manila", country: "Philippines", blurb: "Long-haul routes usually include one stop; compare duration as well as price." },
  ams: { code: "AMS", name: "Amsterdam", country: "Netherlands", blurb: "Schiphol is one of Europe's largest hubs, with excellent connections." },
  dub: { code: "DUB", name: "Dublin", country: "Ireland", blurb: "Frequent short flights from the UK and continental Europe." },
  lis: { code: "LIS", name: "Lisbon", country: "Portugal", blurb: "A compact capital with direct flights from most major European cities." },
  ath: { code: "ATH", name: "Athens", country: "Greece", blurb: "Gateway to the Greek islands; summer schedules add many extra routes." },
  vie: { code: "VIE", name: "Vienna", country: "Austria", blurb: "Well served by full-service carriers from across Europe." },
  fra: { code: "FRA", name: "Frankfurt", country: "Germany", blurb: "A major connecting hub, often the cheapest way to reach long-haul destinations." },
};

// Which origin -> destination pages exist (each becomes a URL).
export const ROUTES: Array<[string, string]> = [
  ["ams", "lon"], ["ams", "par"], ["ams", "bcn"], ["ams", "rom"], ["ams", "mad"], ["ams", "ist"], ["ams", "dxb"],
  ["ams", "cai"], ["ams", "cmn"], ["ams", "nyc"], ["ams", "bkk"], ["ams", "mnl"], ["ams", "lis"], ["ams", "ath"], ["ams", "dub"],
  ["lon", "par"], ["lon", "bcn"], ["lon", "dxb"], ["lon", "nyc"], ["lon", "ist"],
  ["par", "lon"], ["par", "bcn"], ["par", "ist"],
  ["dxb", "lon"], ["dxb", "cai"], ["dxb", "ist"], ["dxb", "bkk"],
  ["ruh", "cai"], ["ruh", "dxb"], ["ruh", "ist"], ["ruh", "lon"],
  ["cai", "dxb"], ["cai", "ist"], ["cai", "jed"], ["cai", "ruh"],
  ["ist", "lon"], ["ist", "cai"], ["ist", "ams"],
];

export const slug = (o: string, d: string) => `${o}-to-${d}`;

export function parseRoute(s: string): { o: string; d: string } | null {
  const m = /^([a-z]{3})-to-([a-z]{3})$/.exec(s);
  if (!m) return null;
  return ROUTES.some(([o, d]) => o === m[1] && d === m[2]) ? { o: m[1], d: m[2] } : null;
}

export const originName = (o: string) => ORIGINS[o] ?? DESTS[o]?.name ?? o.toUpperCase();
