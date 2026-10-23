import { NextResponse } from "next/server";
import { getCities } from "@/lib/places";

type Row = {
  destination?: string;
  price?: number;
  transfers?: number;
  departure_at?: string;
  return_at?: string;
};

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

// GET /api/map-prices?origin=AMS
// Cheapest recent fares from one city to many destinations, joined with coordinates.
// The Travelpayouts API token stays on the server (env var TP_API_TOKEN) and is never sent to the browser.
export async function GET(req: Request) {
  const origin = (new URL(req.url).searchParams.get("origin") ?? "AMS").toUpperCase();
  if (!/^[A-Z]{3}$/.test(origin)) return NextResponse.json({ error: "bad_origin" }, { status: 400 });

  const token = process.env.TP_API_TOKEN;
  if (!token) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const cities = await getCities();
    let rows = await fromPricesForDates(origin, token);
    if (rows.length === 0) rows = await fromCityDirections(origin, token);
    if (rows.length === 0) return NextResponse.json({ error: "upstream" }, { status: 502 });

    const byCode = new Map(cities.map((c) => [c.code, c]));
    const from = byCode.get(origin);

    const points = rows
      .map((d) => {
        const city = d.destination ? byCode.get(d.destination) : undefined;
        if (!city || typeof d.price !== "number" || d.destination === origin) return null;
        return {
          code: city.code,
          name: city.name,
          lat: city.lat,
          lng: city.lng,
          price: Math.round(d.price),
          stops: d.transfers ?? 0,
          depart: d.departure_at?.slice(0, 10) ?? null,
          back: d.return_at?.slice(0, 10) ?? null,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .sort((a, b) => a.price - b.price)
      .filter((p, i, arr) => arr.findIndex((q) => q.code === p.code) === i); // keep cheapest per city

    return NextResponse.json(
      { origin: { code: origin, name: from?.name ?? origin, lat: from?.lat ?? 52.37, lng: from?.lng ?? 4.9 }, points },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
