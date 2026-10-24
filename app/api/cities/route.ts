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
    let cities: Array<{ code: string; name: string; country: string; kind?: "country" }> = [...starts, ...rest].slice(0, 6).map(({ code, name, country }) => ({ code, name, country }));
    if (new URL(req.url).searchParams.get("countries") === "1") {
      const names = new Intl.DisplayNames(["en"], { type: "region" });
      const codes = [...new Set(all.map((c) => c.country).filter((c) => /^[A-Z]{2}$/.test(c)))];
      const hit = codes
        .map((code) => ({ code, name: names.of(code) ?? code }))
        .filter((c) => c.name.toLowerCase().startsWith(q))
        .slice(0, 2)
        .map((c) => ({ code: c.code, name: c.name, country: c.code, kind: "country" as const }));
      cities = [...hit, ...cities].slice(0, 7);
    }
    return NextResponse.json({ cities }, { headers: { "Cache-Control": "public, s-maxage=86400" } });
  } catch {
    return NextResponse.json({ cities: [] }, { status: 502 });
  }
}
