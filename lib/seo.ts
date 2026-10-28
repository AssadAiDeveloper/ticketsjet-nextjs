import { LOCALES } from "@/i18n/routing";

/** Locales that are indexed by search engines. All 13 locales still work for visitors. */
export const INDEXED_LOCALES = ["en", "ar", "nl"] as const;
export type IndexedLocale = (typeof INDEXED_LOCALES)[number];

export const isIndexed = (locale: string): boolean =>
  (INDEXED_LOCALES as readonly string[]).includes(locale);

/** robots metadata for a locale: noindex,follow for non-indexed locales. */
export function robotsFor(locale: string): { index: boolean; follow: boolean } | undefined {
  if (isIndexed(locale)) return undefined;
  return { index: false, follow: true };
}

/** Filtered locale list for hreflang/alternates: only indexed locales. */
export const indexedLocales = (): string[] => [...INDEXED_LOCALES];
