import { defineRouting } from "next-intl/routing";

export const LOCALES = ["en", "ar", "nl"] as const;
export type Locale = (typeof LOCALES)[number];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "as-needed", // English has no prefix: /flights, /ar/flights, /nl/flights
  localeDetection: false,
});

export const LOCALE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية", nl: "Nederlands" };
export const isLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);
