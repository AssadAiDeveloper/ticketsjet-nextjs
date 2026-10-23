import { NextResponse } from "next/server";
import { getCities } from "@/lib/places";

type Direction = {
  destination?: string;
  price?: number;
  airline?: string;
  transfers?: number;
  departure_at?: string;
  return_at?: string;
};

// GET /api/map-prices?origin=AMS
// Cheapest recent fares from one city to many destinations, joined with coordinates.
// The Travelpayouts API token stays on the server (env var TP_API_TOKEN) and is never sent to the browser.
export async function GET(req: Request) {
  const origin = (new URL(req.url).searchParams.get("origin") ?? "AMS").toUpperCase();
  if (!/^[A-Z]{3}$/.test(origin)) return NextResponse.json({ error: "bad_origin" }, { status: 400 });

  const token = process.env.TP_API_TOKEN;
  if (!token) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const [res, cities] = await Promise.all([
      fetch(`https://api.travelpayouts.com/v1/city-directions?origin=${origin}&currency=usd`, {
        headers: { "X-Access-Token": token },
        next: { revalidate: 3600 },
      }),
      getCities(),
    ]);
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });

    const json = (await res.json()) as { data?: Record<string, Direction> };
    const byCode = new Map(cities.map((c) => [c.code, c]));
    const from = byCode.get(origin);

    const points = Object.values(json.data ?? {})
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
      .sort((a, b) => a.price - b.price);

    return NextResponse.json(
      { origin: { code: origin, name: from?.name ?? origin, lat: from?.lat ?? 52.37, lng: from?.lng ?? 4.9 }, points },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
