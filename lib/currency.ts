// Currencies the visitor can choose. Prices are fetched in USD and converted in the browser.
export const CURRENCIES = ["USD", "EUR", "GBP", "SAR", "AED", "EGP", "KWD", "QAR", "TRY", "MAD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const isCurrency = (c: string | null | undefined): c is Currency => !!c && (CURRENCIES as readonly string[]).includes(c);
export const DEFAULT_CURRENCY: Currency = "USD";
export const defaultCurrencyFor = (locale: string): Currency => (locale === "nl" ? "EUR" : "USD");
export const CURRENCY_KEY = "tj-currency";
