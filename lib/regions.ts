/** Country/region helpers shared by PriceMap and the explore page. */

export type Region = "europe" | "middleeast" | "asia" | "africa" | "northamerica" | "southamerica" | "oceania" | "other";

/** Derive a region from lat/lng (no paid API). Matches the chips used on /explore. */
export function regionOf(lat: number, lng: number): Region {
  if (lat > 35 && lng > -30 && lng < 60) return "europe";
  if (lat > 10 && lng >= 30 && lng < 60) return "middleeast";
  if (lat > 0 && lng >= 60 && lng < 180) return "asia";
  if (lat >= -35 && lat <= 35 && lng >= -20 && lng <= 55) return "africa";
  if (lat > 0 && lng < -30) return "northamerica";
  if (lat < 0 && lng < -30) return "southamerica";
  if (lat < 0 && lng >= 100) return "oceania";
  return "other";
}

/** Coarse 6-block region used by the "Browse by region" section (Americas = north+south). */
export function regionBlock(region: Region): "europe" | "middleeast" | "asia" | "africa" | "americas" | "oceania" | "other" {
  if (region === "northamerica" || region === "southamerica") return "americas";
  return region as "europe" | "middleeast" | "asia" | "africa" | "oceania" | "other";
}

/** Country ISO code -> coarse region block (for future use). */
export const REGION_CODES: Record<string, string> = {};
