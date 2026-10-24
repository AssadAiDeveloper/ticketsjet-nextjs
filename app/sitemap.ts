import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { posts } from "@/lib/posts";
import { ROUTES, slug } from "@/lib/routes";
import { ACTIVITY_CITIES } from "@/lib/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/flights", "/explore", "/cheap-flights", "/services", "/activities", "/destinations", "/trip-finder", "/services/esim", "/services/airport-transfers", "/services/flight-compensation", "/cars", "/blog", "/help", "/about-us", "/privacy-policy", "/terms-and-conditions", "/affiliate-disclosure"];
  return [
    ...pages.map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: now,
      changeFrequency: (p === "" ? "daily" : "weekly") as "daily" | "weekly",
      priority: p === "" ? 1 : 0.8,
    })),
    ...ROUTES.map(([o, d]) => ({
      url: `${SITE.url}/cheap-flights/${slug(o, d)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...ACTIVITY_CITIES.map((c) => ({
      url: `${SITE.url}/activities/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...ACTIVITY_CITIES.map((c) => ({
      url: `${SITE.url}/destinations/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
