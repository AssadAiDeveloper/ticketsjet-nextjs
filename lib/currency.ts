// Currencies the visitor can choose (73). Prices are fetched in USD and converted in the browser with live rates,
// so any code the rates service knows works here; names and symbols come from Intl in the visitor's language.
export const CURRENCIES = ["USD", "EUR", "GBP", "AED", "SAR", "EGP", "KWD", "QAR", "TRY", "MAD", "AUD", "CAD", "CHF", "JPY", "CNY", "INR", "RUB", "PLN", "ILS", "BRL", "MXN", "SEK", "NOK", "DKK", "CZK", "HUF", "RON", "BGN", "ISK", "UAH", "KZT", "GEL", "AMD", "AZN", "PKR", "BDT", "LKR", "NPR", "THB", "MYR", "SGD", "IDR", "PHP", "VND", "KRW", "HKD", "TWD", "NZD", "ZAR", "NGN", "KES", "GHS", "TZS", "ETB", "DZD", "TND", "LYD", "JOD", "LBP", "OMR", "BHD", "IQD", "IRR", "ARS", "CLP", "COP", "PEN", "UYU", "DOP", "UZS", "BYN", "MDL", "KGS"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const isCurrency = (c: string | null | undefined): c is Currency => !!c && (CURRENCIES as readonly string[]).includes(c);
export const DEFAULT_CURRENCY: Currency = "USD";

const BY_LOCALE: Record<string, Currency> = { nl: "EUR", de: "EUR", fr: "EUR", es: "EUR", it: "EUR", pt: "EUR", tr: "TRY", pl: "PLN", he: "ILS" };
export const defaultCurrencyFor = (locale: string): Currency => BY_LOCALE[locale] ?? DEFAULT_CURRENCY;
export const CURRENCY_KEY = "tj-currency";
