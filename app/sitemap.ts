import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/flights", "/explore", "/cars", "/blog", "/help", "/about-us", "/privacy-policy", "/terms-and-conditions", "/affiliate-disclosure"];
  return [
    ...pages.map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: now,
      changeFrequency: (p === "" ? "daily" : "weekly") as "daily" | "weekly",
      priority: p === "" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
