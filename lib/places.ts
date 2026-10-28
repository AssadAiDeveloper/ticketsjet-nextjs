// Server-only: city list with coordinates (public Travelpayouts data file), cached in memory.
export type City = { code: string; name: string; country: string; lat: number; lng: number };

let cache: { at: number; list: City[] } | null = null;
const DAY = 24 * 60 * 60 * 1000;

export async function getCities(): Promise<City[]> {
  if (cache && Date.now() - cache.at < DAY) return cache.list;
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("https://api.travelpayouts.com/data/en/cities.json");
      if (!res.ok) throw new Error("cities_unavailable");
      const raw = (await res.json()) as Array<{
        code?: string;
        name?: string;
        country_code?: string;
        coordinates?: { lat?: number; lon?: number } | null;
      }>;
      const list: City[] = [];
      for (const c of raw) {
        if (!c.code || !c.name || !c.coordinates) continue;
        const { lat, lon } = c.coordinates;
        if (typeof lat !== "number" || typeof lon !== "number") continue;
        list.push({ code: c.code, name: c.name, country: c.country_code ?? "", lat, lng: lon });
      }
      cache = { at: Date.now(), list };
      return list;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("cities_unavailable");
}
