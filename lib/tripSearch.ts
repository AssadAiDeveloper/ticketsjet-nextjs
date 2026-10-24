// Server-only: "trip finder" — cheapest return fares for a city or a whole country,
// for a flexible month or exact dates, optionally limited to a trip length.
import { getCities } from "@/lib/places";

export type Offer = { dest: string; destName: string; depart: string; back: string | null; price: number; stops: number; nights: number | null };
export type TripQuery = { from: string; to: string; month?: string; dep?: string; ret?: string; len?: number };
export type TripResult = { offers: Offer[]; relaxed: boolean };

type Row = { destination?: string; price?: number; transfers?: number; departure_at?: string; return_at?: string };
const API = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates";
const dayDiff = (a: string, b: string) => Math.round((Date.parse(b.slice(0, 10)) - Date.parse(a.slice(0, 10))) / 86400000);

async function rows(token: string, q: TripQuery, dest: string | null, unique: boolean): Promise<Row[]> {
  const p = new URLSearchParams({ origin: q.from, currency: "usd", one_way: "false", sorting: "price", limit: unique ? "1000" : "300", unique: String(unique) });
  if (dest) p.set("destination", dest);
  if (q.dep) {
    p.set("departure_at", q.dep);
    if (q.ret) p.set("return_at", q.ret);
  } else if (q.month) p.set("departure_at", q.month);
  try {
    const res = await fetch(`${API}?${p}`, { headers: { "X-Access-Token": token }, next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: Row[] };
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export async function searchTrips(q: TripQuery): Promise<TripResult | null> {
  const token = process.env.TP_API_TOKEN;
  if (!token) return null;
  let names = new Map<string, { name: string; country: string }>();
  try {
    names = new Map((await getCities()).map((c) => [c.code, { name: c.name, country: c.country }]));
  } catch {}

  // Which airports/cities to query: one city, or the cheapest few in a country.
  let dests: string[];
  if (q.to.length === 2) {
    const all = await rows(token, q, null, true);
    dests = all
      .filter((r) => r.destination && names.get(r.destination)?.country === q.to)
      .map((r) => r.destination as string)
      .filter((d, i, a) => a.indexOf(d) === i)
      .slice(0, 4);
  } else dests = [q.to];
  if (!dests.length) return { offers: [], relaxed: false };

  const sets = await Promise.all(dests.map((d) => rows(token, q, d, false)));
  const all: Offer[] = [];
  sets.forEach((set, i) => {
    for (const r of set) {
      if (typeof r.price !== "number" || !r.departure_at) continue;
      const depart = r.departure_at.slice(0, 10);
      const back = r.return_at?.slice(0, 10) ?? null;
      all.push({
        dest: dests[i],
        destName: names.get(dests[i])?.name ?? dests[i],
        depart,
        back,
        price: Math.round(r.price),
        stops: r.transfers ?? 0,
        nights: back ? dayDiff(depart, back) : null,
      });
    }
  });

  const tol = q.len && q.len > 14 ? 3 : 2;
  let pool = all;
  let relaxed = false;
  if (q.len && !q.ret) {
    const fit = all.filter((o) => o.nights !== null && Math.abs(o.nights - q.len!) <= tol);
    if (fit.length) pool = fit;
    else relaxed = all.length > 0;
  }
  const seen = new Set<string>();
  const offers = pool
    .sort((a, b) => a.price - b.price)
    .filter((o) => {
      const k = o.dest + o.depart;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 10);
  return { offers, relaxed };
}
