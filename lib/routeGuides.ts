// Static route facts used alongside the live fare feed.
// Distances are great-circle estimates between city centres, not airport-to-airport figures.

export type RouteTipKey =
  | "airports"
  | "nonstop"
  | "bags"
  | "months"
  | "arrival"
  | "selfTransfer"
  | "nearby"
  | "localTransport";

export type RouteGuide = {
  distanceKm: number;
  durationMinutes: number;
  operators: string[];
  months: number[];
  tips: RouteTipKey[];
};

const CITY_COORDS: Record<string, [number, number]> = {
  ams: [52.3676, 4.9041],
  lon: [51.5072, -0.1276],
  par: [48.8566, 2.3522],
  bcn: [41.3874, 2.1686],
  rom: [41.9028, 12.4964],
  mad: [40.4168, -3.7038],
  ist: [41.0082, 28.9784],
  dxb: [25.2048, 55.2708],
  cai: [30.0444, 31.2357],
  ruh: [24.7136, 46.6753],
  jed: [21.4858, 39.1925],
  cmn: [33.5731, -7.5898],
  nyc: [40.7128, -74.006],
  bkk: [13.7563, 100.5018],
  mnl: [14.5995, 120.9842],
  dub: [53.3498, -6.2603],
  lis: [38.7223, -9.1393],
  ath: [37.9838, 23.7275],
};

type GuideData = Omit<RouteGuide, "distanceKm">;

const GUIDES: Record<string, GuideData> = {
  "ams-lon": { durationMinutes: 75, operators: ["KLM", "British Airways", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
  "ams-par": { durationMinutes: 75, operators: ["KLM", "Air France", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["nonstop", "nearby", "bags"] },
  "ams-bcn": { durationMinutes: 125, operators: ["KLM", "Transavia", "Vueling"], months: [1, 2, 3, 10, 11], tips: ["months", "airports", "bags"] },
  "ams-rom": { durationMinutes: 135, operators: ["KLM", "ITA Airways", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
  "ams-mad": { durationMinutes: 150, operators: ["KLM", "Iberia", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["nonstop", "months", "bags"] },
  "ams-ist": { durationMinutes: 210, operators: ["KLM", "Turkish Airlines"], months: [1, 2, 3, 10, 11], tips: ["arrival", "nonstop", "bags"] },
  "ams-dxb": { durationMinutes: 390, operators: ["KLM", "Emirates"], months: [5, 6, 9, 10], tips: ["arrival", "nonstop", "bags"] },
  "ams-cai": { durationMinutes: 255, operators: ["KLM", "EgyptAir"], months: [1, 2, 3, 10, 11], tips: ["arrival", "airports", "bags"] },
  "ams-cmn": { durationMinutes: 165, operators: ["KLM", "Royal Air Maroc", "Transavia"], months: [1, 2, 3, 10, 11], tips: ["months", "localTransport", "bags"] },
  "ams-nyc": { durationMinutes: 435, operators: ["KLM", "Delta Air Lines", "United Airlines"], months: [1, 2, 9, 10], tips: ["arrival", "nonstop", "selfTransfer"] },
  "ams-bkk": { durationMinutes: 660, operators: ["KLM", "Thai Airways"], months: [5, 6, 9, 10], tips: ["arrival", "nonstop", "selfTransfer"] },
  "ams-mnl": { durationMinutes: 750, operators: ["KLM", "Philippine Airlines"], months: [2, 3, 5, 9], tips: ["arrival", "selfTransfer", "bags"] },
  "ams-lis": { durationMinutes: 165, operators: ["KLM", "TAP Air Portugal", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["airports", "months", "localTransport"] },
  "ams-ath": { durationMinutes: 180, operators: ["KLM", "Aegean Airlines", "Transavia"], months: [3, 4, 10, 11], tips: ["airports", "months", "localTransport"] },
  "ams-dub": { durationMinutes: 75, operators: ["KLM", "Aer Lingus", "Ryanair"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
  "lon-par": { durationMinutes: 80, operators: ["British Airways", "Air France", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
  "lon-bcn": { durationMinutes: 125, operators: ["British Airways", "Vueling", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["months", "airports", "bags"] },
  "lon-dxb": { durationMinutes: 410, operators: ["Emirates", "British Airways"], months: [5, 6, 9, 10], tips: ["arrival", "nonstop", "bags"] },
  "lon-nyc": { durationMinutes: 465, operators: ["British Airways", "Virgin Atlantic", "Delta Air Lines"], months: [1, 2, 9, 10], tips: ["arrival", "selfTransfer", "bags"] },
  "lon-ist": { durationMinutes: 240, operators: ["Turkish Airlines", "British Airways"], months: [1, 2, 3, 10, 11], tips: ["arrival", "nonstop", "bags"] },
  "par-lon": { durationMinutes: 80, operators: ["Air France", "British Airways", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
  "par-bcn": { durationMinutes: 110, operators: ["Air France", "Vueling", "easyJet"], months: [1, 2, 3, 10, 11], tips: ["months", "airports", "bags"] },
  "par-ist": { durationMinutes: 210, operators: ["Turkish Airlines", "Air France"], months: [1, 2, 3, 10, 11], tips: ["arrival", "nonstop", "bags"] },
  "dxb-lon": { durationMinutes: 415, operators: ["Emirates", "British Airways"], months: [5, 6, 9, 10], tips: ["arrival", "nonstop", "bags"] },
  "dxb-cai": { durationMinutes: 190, operators: ["Emirates", "EgyptAir"], months: [5, 6, 9, 10], tips: ["airports", "months", "bags"] },
  "dxb-ist": { durationMinutes: 250, operators: ["Emirates", "Turkish Airlines"], months: [5, 6, 9, 10], tips: ["arrival", "nonstop", "bags"] },
  "dxb-bkk": { durationMinutes: 390, operators: ["Emirates", "Thai Airways"], months: [5, 6, 9, 10], tips: ["arrival", "selfTransfer", "bags"] },
  "ruh-cai": { durationMinutes: 120, operators: ["Saudi Arabian Airlines", "EgyptAir"], months: [5, 6, 9, 10], tips: ["airports", "months", "bags"] },
  "ruh-dxb": { durationMinutes: 110, operators: ["Saudi Arabian Airlines", "Emirates"], months: [5, 6, 9, 10], tips: ["airports", "nearby", "bags"] },
  "ruh-ist": { durationMinutes: 240, operators: ["Turkish Airlines", "Saudi Arabian Airlines"], months: [5, 6, 9, 10], tips: ["arrival", "nonstop", "bags"] },
  "ruh-lon": { durationMinutes: 400, operators: ["Saudi Arabian Airlines", "British Airways"], months: [5, 6, 9, 10], tips: ["arrival", "selfTransfer", "bags"] },
  "cai-dxb": { durationMinutes: 190, operators: ["EgyptAir", "Emirates"], months: [5, 6, 9, 10], tips: ["airports", "months", "bags"] },
  "cai-ist": { durationMinutes: 120, operators: ["Turkish Airlines", "EgyptAir"], months: [1, 2, 3, 10, 11], tips: ["arrival", "nonstop", "bags"] },
  "cai-jed": { durationMinutes: 105, operators: ["Saudi Arabian Airlines", "EgyptAir"], months: [1, 2, 3, 10, 11], tips: ["airports", "months", "bags"] },
  "cai-ruh": { durationMinutes: 120, operators: ["EgyptAir", "Saudi Arabian Airlines"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
  "ist-lon": { durationMinutes: 240, operators: ["Turkish Airlines", "British Airways"], months: [1, 2, 3, 10, 11], tips: ["arrival", "nonstop", "bags"] },
  "ist-cai": { durationMinutes: 120, operators: ["Turkish Airlines", "EgyptAir"], months: [1, 2, 3, 10, 11], tips: ["airports", "months", "bags"] },
  "ist-ams": { durationMinutes: 210, operators: ["Turkish Airlines", "KLM"], months: [1, 2, 3, 10, 11], tips: ["airports", "nearby", "bags"] },
};

function distanceKm(a: [number, number], b: [number, number]) {
  const toRad = (n: number) => (n * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

export function getRouteGuide(origin: string, dest: string): RouteGuide | null {
  const data = GUIDES[`${origin}-${dest}`];
  const from = CITY_COORDS[origin];
  const to = CITY_COORDS[dest];
  if (!data || !from || !to) return null;
  return { ...data, distanceKm: distanceKm(from, to) };
}
