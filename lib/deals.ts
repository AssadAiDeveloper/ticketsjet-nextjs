// Server-only: deal cards for a departure city, with a visitor-city guess.
import { headers } from "next/headers";
import { getFares, searchCode } from "@/lib/fares";
import { getCities } from "@/lib/places";
import { POPULAR } from "@/lib/destinations";
import { countryName } from "@/lib/format";
import { cityName as locCity } from "@/lib/cityName";

export type Deal = { code: string; name: string; country: string; price: number; stops: number; depart: string | null; month: string | null; href: string };
export type Deals = { origin: { code: string; name: string }; items: Deal[] };

/** Visitor's departure city from the hosting platform's IP header, defaulting to Amsterdam. */
async function guessOrigin(): Promise<string> {
  try {
    const raw = (await headers()).get("x-vercel-ip-city");
    if (!raw) return "AMS";
    const city = decodeURIComponent(raw).toLowerCase();
    const hit = (await getCities()).find((c) => c.name.toLowerCase() === city);
    return hit?.code ?? "AMS";
  } catch {
    return "AMS";
  }
}

export async function getDeals(locale = "en"): Promise<Deals | null> {
  let code = await guessOrigin();
  let fares = await getFares(code);
  if ((!fares || fares.points.length < 8) && code !== "AMS") {
    code = "AMS";
    fares = await getFares(code);
  }
  if (!fares || fares.points.length < 4) return null;
  const pop = new Set(POPULAR);
  const ordered = [...fares.points.filter((p) => pop.has(p.code)), ...fares.points.filter((p) => !pop.has(p.code))].slice(0, 24);
  const items = ordered.map((p) => {
    const sc = searchCode(code, p);
    return {
      code: p.code,
      name: locCity(p.code, locale, p.name),
      country: countryName(p.country, locale),
      price: p.price,
      stops: p.stops,
      depart: p.depart,
      month: p.depart ? p.depart.slice(0, 7) : null,
      href: sc ? `/flights?flightSearch=${sc}` : "/flights",
    };
  });
  return { origin: { code, name: locCity(code, locale, fares.origin.name) }, items };
}
