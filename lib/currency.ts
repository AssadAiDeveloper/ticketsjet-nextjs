// Currencies the visitor can choose (78, official Travelpayouts White Label list).
// Prices are fetched in USD and converted in the browser with live rates from /api/rates.
export const CURRENCIES = ["AED", "ALL", "AMD", "ARS", "AUD", "AZN", "BAM", "BDT", "BGN", "BHD", "BRL", "BYN", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "DZD", "EGP", "EUR", "GBP", "GEL", "GHS", "HKD", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JOD", "JPY", "KES", "KGS", "KRW", "KWD", "KZT", "LKR", "LYD", "MDL", "MNT", "MUR", "MXN", "MYR", "MZN", "NGN", "NOK", "NPR", "NZD", "OMR", "PEN", "PHP", "PKR", "PLN", "QAR", "RON", "RSD", "RUB", "SAR", "SEK", "SGD", "THB", "TJS", "TND", "TRY", "TWD", "UAH", "UZS", "VES", "VND", "XOF", "ZAR", "ZMW", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const isCurrency = (c: string | null | undefined): c is Currency => !!c && (CURRENCIES as readonly string[]).includes(c);
export const DEFAULT_CURRENCY: Currency = "USD";

const BY_LOCALE: Record<string, Currency> = { nl: "EUR", de: "EUR", fr: "EUR", es: "EUR", it: "EUR", pt: "EUR", tr: "TRY", pl: "PLN", he: "ILS" };
export const defaultCurrencyFor = (locale: string): Currency => BY_LOCALE[locale] ?? DEFAULT_CURRENCY;
export const CURRENCY_KEY = "tj-currency";
