import { NextResponse } from "next/server";
import { CURRENCIES } from "@/lib/currency";

// GET /api/rates → { base: "USD", rates: { EUR: 0.92, ... } } for the currencies we offer. Cached for 12 hours.
export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 43200 } });
    if (!res.ok) throw new Error("rates");
    const json = (await res.json()) as { rates?: Record<string, number> };
    const rates: Record<string, number> = { USD: 1 };
    for (const c of CURRENCIES) if (typeof json.rates?.[c] === "number") rates[c] = json.rates[c];
    return NextResponse.json({ base: "USD", rates }, { headers: { "Cache-Control": "public, s-maxage=43200" } });
  } catch {
    return NextResponse.json({ base: "USD", rates: { USD: 1 } }, { status: 502 });
  }
}
