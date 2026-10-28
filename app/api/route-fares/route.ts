import { NextResponse } from "next/server";
import { getRouteFares, getMonthFares } from "@/lib/routeFares";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = (url.searchParams.get("origin") ?? "").toUpperCase();
  const dest = (url.searchParams.get("dest") ?? "").toUpperCase();
  if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(dest)) {
    return NextResponse.json({ error: "bad_params" }, { status: 400 });
  }
  const month = url.searchParams.get("month");
  try {
    if (month) {
      const prices = await getMonthFares(origin.toLowerCase(), dest.toLowerCase(), month);
      return NextResponse.json({ prices }, { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
    }
    const fares = await getRouteFares(origin.toLowerCase(), dest.toLowerCase());
    return NextResponse.json({ fares }, { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}