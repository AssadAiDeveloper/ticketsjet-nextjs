import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { posts } from "@/lib/posts";
import { ROUTES, slug } from "@/lib/routes";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { LOCALES } from "@/i18n/routing";
import { isTranslated } from "@/lib/i18nPages";

const loc = (l: string, p: string) => (l === "en" ? p : p === "" ? `/${l}` : `/${l}${p}`);
/** One entry per language for translated pages (with hreflang links), a single English entry otherwise. */
function entry(p: string, freq: "daily" | "weekly" | "monthly", priority: number, lastModified: Date) {
  const path = p === "" ? "/" : p;
  if (!isTranslated(path)) return [{ url: `${SITE.url}${p}`, lastModified, changeFrequency: freq, priority }];
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}${loc(l, p)}`]));
  return LOCALES.map((l) => ({ url: `${SITE.url}${loc(l, p)}`, lastModified, changeFrequency: freq, priority, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/flights", "/explore", "/cheap-flights", "/services", "/activities", "/destinations", "/trip-finder", "/services/esim", "/services/airport-transfers", "/services/flight-compensation", "/cars", "/blog", "/help", "/about-us", "/privacy-policy", "/terms-and-conditions", "/affiliate-disclosure"];
  return [
    ...pages.flatMap((p) => entry(p, p === "" ? "daily" : "weekly", p === "" ? 1 : 0.8, now)),
    ...ROUTES.flatMap(([o, d]) => entry(`/cheap-flights/${slug(o, d)}`, "daily", 0.7, now)),
    ...ACTIVITY_CITIES.flatMap((c) => entry(`/activities/${c.slug}`, "weekly", 0.7, now)),
    ...ACTIVITY_CITIES.flatMap((c) => entry(`/destinations/${c.slug}`, "weekly", 0.7, now)),
    ...posts.flatMap((post) => entry(`/blog/${post.slug}`, "monthly", 0.6, new Date(post.date))),
  ];
}
