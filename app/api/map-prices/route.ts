import { NextResponse } from "next/server";
import { getFares } from "@/lib/fares";

// GET /api/map-prices?origin=AMS
// The Travelpayouts API token stays on the server (env var TP_API_TOKEN) and is never sent to the browser.
export async function GET(req: Request) {
  const origin = (new URL(req.url).searchParams.get("origin") ?? "AMS").toUpperCase();
  if (!/^[A-Z]{3}$/.test(origin)) return NextResponse.json({ error: "bad_origin" }, { status: 400 });
  if (!process.env.TP_API_TOKEN) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const fares = await getFares(origin);
    if (!fares) return NextResponse.json({ error: "upstream" }, { status: 502 });
    return NextResponse.json(fares, { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
