// Server-only: cheapest recent fares from one city, joined with city names/coordinates.
// Used by the /api/map-prices route and by the home page fare board.
import { getCities } from "@/lib/places";

export type FarePoint = {
  code: string;
  name: string;
  country: string; // ISO country code
  lat: number;
  lng: number;
  price: number;
  stops: number;
  depart: string | null; // YYYY-MM-DD
  back: string | null;
};

export type Fares = { origin: { code: string; name: string; lat: number; lng: number }; points: FarePoint[] };

type Row = { destination?: string; price?: number; transfers?: number; departure_at?: string; return_at?: string };

const API = "https://api.travelpayouts.com";

// Current API: cheapest fare per destination, up to 1000 rows (unique=true).
async function fromPricesForDates(origin: string, token: string): Promise<Row[]> {
  const url = `${API}/aviasales/v3/prices_for_dates?origin=${origin}&unique=true&sorting=price&one_way=false&limit=1000&currency=usd`;
  const res = await fetch(url, { headers: { "X-Access-Token": token }, next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const json = (await res.json()) as { data?: Row[] };
  return Array.isArray(json.data) ? json.data : [];
}

// Older, deprecated endpoint (shorter list) — only used as a fallback.
async function fromCityDirections(origin: string, token: string): Promise<Row[]> {
  const res = await fetch(`${API}/v1/city-directions?origin=${origin}&currency=usd`, {
    headers: { "X-Access-Token": token },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { data?: Record<string, Row> };
  return Object.values(json.data ?? {});
}

/** Returns null when the token is missing or the API has nothing for this origin. */
export async function getFares(origin: string): Promise<Fares | null> {
  const token = process.env.TP_API_TOKEN;
  if (!token) return null;

  const cities = await getCities();
  let rows = await fromPricesForDates(origin, token);
  if (rows.length === 0) rows = await fromCityDirections(origin, token);
  if (rows.length === 0) return null;

  const byCode = new Map(cities.map((c) => [c.code, c]));
  const from = byCode.get(origin);

  const points = rows
    .map((d) => {
      const city = d.destination ? byCode.get(d.destination) : undefined;
      if (!city || typeof d.price !== "number" || d.destination === origin) return null;
      return {
        code: city.code,
        name: city.name,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
        price: Math.round(d.price),
        stops: d.transfers ?? 0,
        depart: d.departure_at?.slice(0, 10) ?? null,
        back: d.return_at?.slice(0, 10) ?? null,
      };
    })
    .filter((p): p is FarePoint => p !== null)
    .sort((a, b) => a.price - b.price)
    .filter((p, i, arr) => arr.findIndex((q) => q.code === p.code) === i); // cheapest per city

  return {
    origin: { code: origin, name: from?.name ?? origin, lat: from?.lat ?? 52.37, lng: from?.lng ?? 4.9 },
    points,
  };
}

/** Search code in the flight widget's own format: ORIGIN DDMM DEST [DDMM] 1 (one adult). */
export function searchCode(origin: string, p: Pick<FarePoint, "code" | "depart" | "back">): string | null {
  if (!p.depart) return null;
  const dm = (iso: string) => iso.slice(8, 10) + iso.slice(5, 7);
  return `${origin}${dm(p.depart)}${p.code}${p.back ? dm(p.back) : ""}1`;
}
