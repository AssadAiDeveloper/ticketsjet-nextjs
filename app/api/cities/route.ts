import { NextResponse } from "next/server";
import { getCities } from "@/lib/places";

// GET /api/cities?q=ams → up to 6 matching cities for the departure picker
export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim().toLowerCase();
  if (q.length < 2) return NextResponse.json({ cities: [] });
  try {
    const all = await getCities();
    const starts = all.filter((c) => c.name.toLowerCase().startsWith(q) || c.code.toLowerCase() === q);
    const rest = all.filter((c) => !starts.includes(c) && c.name.toLowerCase().includes(q));
    const cities = [...starts, ...rest].slice(0, 6).map(({ code, name, country }) => ({ code, name, country }));
    return NextResponse.json({ cities }, { headers: { "Cache-Control": "public, s-maxage=86400" } });
  } catch {
    return NextResponse.json({ cities: [] }, { status: 502 });
  }
}
