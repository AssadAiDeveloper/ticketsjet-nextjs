import { NextResponse } from "next/server";
import { hotelTargetUrl } from "@/lib/config";

// إحالة داخلية: الزائر يرى /go/hotels/rome فقط
export async function GET(_req: Request, { params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const name = decodeURIComponent(city).replace(/-/g, " ").slice(0, 60);
  const res = NextResponse.redirect(hotelTargetUrl(name), 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Referrer-Policy", "origin");
  return res;
}
