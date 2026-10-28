import type { MetadataRoute } from "next";

import { SITE } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const blocked = ["Bytespider", "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot", "Amazonbot"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/go/", "/api/"] },
      ...blocked.map((ua) => ({ userAgent: ua, disallow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}