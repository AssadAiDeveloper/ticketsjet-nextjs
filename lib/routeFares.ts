// Server-only: real fares for one route (many departure dates).
export type DateFare = { depart: string; back: string | null; price: number; stops: number };

type Row = { price?: number; transfers?: number; departure_at?: string; return_at?: string };

export async function getRouteFares(origin: string, dest: string): Promise<DateFare[] | null> {
  const token = process.env.TP_API_TOKEN;
  if (!token) return null;
  const url =
    `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin.toUpperCase()}` +
    `&destination=${dest.toUpperCase()}&unique=false&sorting=price&one_way=false&limit=60&currency=usd`;
  try {
    const res = await fetch(url, { headers: { "X-Access-Token": token }, next: { revalidate: 21600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: Row[] };
    const seen = new Set<string>();
    const out: DateFare[] = [];
    for (const r of json.data ?? []) {
      if (typeof r.price !== "number" || !r.departure_at) continue;
      const depart = r.departure_at.slice(0, 10);
      if (seen.has(depart)) continue; // one fare per departure day
      seen.add(depart);
      out.push({ depart, back: r.return_at?.slice(0, 10) ?? null, price: Math.round(r.price), stops: r.transfers ?? 0 });
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}

/** Cheapest fare per departure day for one month (YYYY-MM). Returns {} when unavailable. */
export async function getMonthFares(origin: string, dest: string, month: string): Promise<Record<string, { p: number; b: string | null }>> {
  const token = process.env.TP_API_TOKEN;
  if (!token) return {};
  const url =
    `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin.toUpperCase()}` +
    `&destination=${dest.toUpperCase()}&departure_at=${month}&unique=false&sorting=price&one_way=false&limit=1000&currency=usd`;
  try {
    const res = await fetch(url, { headers: { "X-Access-Token": token }, next: { revalidate: 21600 } });
    if (!res.ok) return {};
    const json = (await res.json()) as { data?: Row[] };
    const out: Record<string, { p: number; b: string | null }> = {};
    for (const r of json.data ?? []) {
      if (typeof r.price !== "number" || !r.departure_at) continue;
      const d = r.departure_at.slice(0, 10);
      if (!d.startsWith(month)) continue;
      const p = Math.round(r.price);
      if (out[d] === undefined || p < out[d].p) out[d] = { p, b: r.return_at?.slice(0, 10) ?? null };
    }
    return out;
  } catch {
    return {};
  }
}
