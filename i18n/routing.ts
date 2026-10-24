import { defineRouting } from "next-intl/routing";

export const LOCALES = ["en", "ar", "nl", "es", "fr", "de", "it", "pt", "tr", "ru", "pl", "fa", "he"] as const;
export type Locale = (typeof LOCALES)[number];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "as-needed", // English has no prefix: /flights, /ar/flights, /nl/flights
  localeDetection: false,
});

/** Each language written in itself, as shown in the language list. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English", ar: "العربية", nl: "Nederlands", es: "Español", fr: "Français", de: "Deutsch", it: "Italiano", pt: "Português",
  tr: "Türkçe", ru: "Русский", pl: "Polski", fa: "فارسی", he: "עברית",
};
/** Right-to-left languages. */
export const RTL_LOCALES: readonly string[] = ["ar", "fa", "he"];
export const isRtl = (l: string) => RTL_LOCALES.includes(l);
/** Open Graph locale for each language. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US", ar: "ar_AR", nl: "nl_NL", es: "es_ES", fr: "fr_FR", de: "de_DE", it: "it_IT", pt: "pt_PT", tr: "tr_TR", ru: "ru_RU", pl: "pl_PL", fa: "fa_IR", he: "he_IL",
};
export const isLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);
