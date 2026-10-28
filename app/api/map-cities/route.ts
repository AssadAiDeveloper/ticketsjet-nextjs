import { NextResponse } from "next/server";
import { getCities } from "@/lib/places";

// GET /api/map-cities - compact list of every city with coordinates, [code, name, lat, lng].
// Used by the explore map to show destinations that have no recent fare as grey pins.
export async function GET() {
  try {
    const cities = await getCities();
    const out = cities.map((c) => [c.code, c.name, Math.round(c.lat * 100) / 100, Math.round(c.lng * 100) / 100]);
    return NextResponse.json(out, { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
  } catch {
    return NextResponse.json([], { status: 502 });
  }
}
