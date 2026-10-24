import { NextResponse } from "next/server";

// Approximate visitor city from the hosting platform's request headers. Nothing is stored.
export async function GET(req: Request) {
  const raw = req.headers.get("x-vercel-ip-city");
  let city = "";
  try {
    city = raw ? decodeURIComponent(raw) : "";
  } catch {
    city = "";
  }
  return NextResponse.json({ city }, { headers: { "Cache-Control": "private, no-store" } });
}
