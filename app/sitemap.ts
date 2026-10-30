import type { MetadataRoute } from "next";
import { SITE, SITE_UPDATED } from "@/lib/config";
import { ROUTES, slug } from "@/lib/routes";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { LOCALES } from "@/i18n/routing";
import { INDEXED_LOCALES } from "@/lib/seo";
import { isTranslated } from "@/lib/i18nPages";
import { allPosts, localesForPost, getPostMeta } from "@/lib/blog";

const UPDATED = new Date(SITE_UPDATED);

const loc = (l: string, p: string) => (l === "en" ? p : p === "" ? `/${l}` : `/${l}${p}`);
/** One entry per language for translated pages (with hreflang links), a single English entry otherwise. */
function entry(p: string, freq: "daily" | "weekly" | "monthly", priority: number, lastModified: Date) {
  const path = p === "" ? "/" : p;
  if (!isTranslated(path)) return [{ url: `${SITE.url}${p}`, lastModified, changeFrequency: freq, priority }];
  const languages = Object.fromEntries(INDEXED_LOCALES.map((l) => [l, `${SITE.url}${loc(l, p)}`]));
  return INDEXED_LOCALES.map((l) => ({ url: `${SITE.url}${loc(l, p)}`, lastModified, changeFrequency: freq, priority, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = UPDATED;
  const pages = ["", "/flights", "/explore", "/cheap-flights", "/services", "/activities", "/destinations", "/trip-finder", "/services/esim", "/services/airport-transfers", "/services/flight-compensation", "/cars", "/blog", "/help", "/about-us", "/privacy-policy", "/terms-and-conditions", "/affiliate-disclosure", "/contact", "/eu261-calculator"];
  return [
    ...pages.flatMap((p) => entry(p, p === "" ? "daily" : "weekly", p === "" ? 1 : 0.8, now)),
    ...ROUTES.flatMap(([o, d]) => entry(`/cheap-flights/${slug(o, d)}`, "daily", 0.7, now)),
    ...ACTIVITY_CITIES.flatMap((c) => entry(`/activities/${c.slug}`, "weekly", 0.7, now)),
    ...ACTIVITY_CITIES.flatMap((c) => entry(`/destinations/${c.slug}`, "weekly", 0.7, now)),
    ...allPosts().flatMap((post) => {
      const locs = localesForPost(post.slug);
      const path = `/blog/${post.slug}`;
      const lastModified = new Date(post.updated ?? post.published);
      const languages = Object.fromEntries(locs.map((l) => [l, `${SITE.url}${loc(l, path)}`]));
      return locs.map((l) => ({ url: `${SITE.url}${loc(l, path)}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages } }));
    }),
  ];
}
