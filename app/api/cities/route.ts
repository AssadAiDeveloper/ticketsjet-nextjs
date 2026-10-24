import { NextResponse } from "next/server";
import { getCities } from "@/lib/places";
import { cityAliases, cityName, norm } from "@/lib/cityNames";
import { isLocale } from "@/i18n/routing";
import { intlTag } from "@/lib/format";

// GET /api/cities?q=ams&locale=ar → up to 6 matching cities, matched by English, Arabic or Dutch name and returned in the visitor's language
export async function GET(req: Request) {
  const url = new URL(req.url);
  const asked = url.searchParams.get("locale") ?? "";
  const locale = isLocale(asked) ? asked : "en";
  const raw = (url.searchParams.get("q") ?? "").trim();
  const q = norm(raw);
  if (q.length < 2) return NextResponse.json({ cities: [] });
  try {
    const all = await getCities();
    const names = (c: { code: string; name: string }) => cityAliases(c.code, c.name).map(norm);
    const starts = all.filter((c) => names(c).some((n) => n.startsWith(q)) || c.code.toLowerCase() === q);
    const rest = all.filter((c) => !starts.includes(c) && names(c).some((n) => n.includes(q)));
    let cities: Array<{ code: string; name: string; country: string; kind?: "country" }> = [...starts, ...rest]
      .slice(0, 6)
      .map(({ code, name, country }) => ({ code, name: cityName(code, name, locale), country }));
    if (url.searchParams.get("countries") === "1") {
      const en = new Intl.DisplayNames(["en"], { type: "region" });
      const loc = new Intl.DisplayNames([intlTag(locale)], { type: "region" });
      const codes = [...new Set(all.map((c) => c.country).filter((c) => /^[A-Z]{2}$/.test(c)))];
      const hit = codes
        .map((code) => ({ code, en: en.of(code) ?? code, name: loc.of(code) ?? code }))
        .filter((c) => norm(c.en).startsWith(q) || norm(c.name).startsWith(q))
        .slice(0, 2)
        .map((c) => ({ code: c.code, name: c.name, country: c.code, kind: "country" as const }));
      cities = [...hit, ...cities].slice(0, 7);
    }
    return NextResponse.json({ cities }, { headers: { "Cache-Control": "public, s-maxage=86400" } });
  } catch {
    return NextResponse.json({ cities: [] }, { status: 502 });
  }
}
