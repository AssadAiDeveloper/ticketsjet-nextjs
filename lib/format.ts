// Locale-aware date helpers (Latin digits for Arabic, so numbers match the booking widgets).
export const intlTag = (locale: string) => (locale === "ar" ? "ar-u-nu-latn" : locale === "nl" ? "nl-NL" : "en-GB");

const utc = (iso: string) => new Date(iso.slice(0, 10) + "T00:00:00Z");

/** "12 Dec" in the visitor's language. */
export const dayMonth = (iso: string, locale: string) => utc(iso).toLocaleDateString(intlTag(locale), { day: "numeric", month: "short", timeZone: "UTC" });
/** "Mon" in the visitor's language. */
export const weekday = (iso: string, locale: string) => utc(iso).toLocaleDateString(intlTag(locale), { weekday: "short", timeZone: "UTC" });
/** "December 2026". */
export const monthYear = (iso: string, locale: string) => utc(iso).toLocaleDateString(intlTag(locale), { month: "long", year: "numeric", timeZone: "UTC" });
/** Local-time date for pickers: "Mon, 12 Dec". */
export const pickerDate = (d: Date, locale: string) => d.toLocaleDateString(intlTag(locale), { weekday: "short", day: "numeric", month: "short" });
/** Localised country name from an ISO code. */
export const countryName = (code: string, locale: string) => {
  try { return new Intl.DisplayNames([intlTag(locale)], { type: "region" }).of(code) ?? code; } catch { return code; }
};
/** "December". */
export const monthName = (iso: string, locale: string) => utc(iso).toLocaleDateString(intlTag(locale), { month: "long", timeZone: "UTC" });
