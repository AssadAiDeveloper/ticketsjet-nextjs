import { NextResponse } from "next/server";
import { PARTNERS } from "@/lib/partners";

export async function GET(_req: Request, { params }: { params: Promise<{ partner: string }> }) {
  const url = PARTNERS[(await params).partner];
  if (!url) return new NextResponse("Not found", { status: 404 });
  const res = NextResponse.redirect(url, 307);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
