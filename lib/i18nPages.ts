import { LOCALES } from "@/i18n/routing";
import { INDEXED_LOCALES } from "@/lib/seo";

/** Pages (paths without the language prefix) that are fully translated. Others show English until translated. */
const EXACT = ["/", "/flights", "/trip-finder", "/cheap-flights", "/destinations", "/activities", "/services", "/stays", "/cars", "/explore", "/blog", "/help", "/about-us", "/privacy-policy", "/terms-and-conditions", "/affiliate-disclosure", "/contact", "/eu261-calculator"];
const PREFIXES: string[] = ["/cheap-flights/", "/destinations/", "/activities/", "/services/", "/blog/"];

export const isTranslated = (path: string) => EXACT.includes(path) || PREFIXES.some((p) => path.startsWith(p));

const withLocale = (locale: string, path: string) => (locale === "en" ? path : path === "/" ? `/${locale}` : `/${locale}${path}`);

/** canonical + hreflang alternates for a path. Untranslated pages point everyone at the English URL. */
export function alternatesFor(locale: string, path: string) {
  if (!isTranslated(path)) return { canonical: path };
  const languages: Record<string, string> = Object.fromEntries((INDEXED_LOCALES as readonly string[]).map((l) => [l, withLocale(l, path)]));
  languages["x-default"] = path;
  return { canonical: withLocale(locale, path), languages };
}
