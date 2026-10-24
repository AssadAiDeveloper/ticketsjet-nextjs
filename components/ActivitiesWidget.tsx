"use client";

import { useLocale } from "next-intl";
import TpWidget from "@/components/TpWidget";
import { useCurrency } from "@/components/CurrencyProvider";
import { activitiesWidget } from "@/lib/config";

// The activities partner widget is only known to support these; anything else falls back (Arabic -> English, other currencies -> USD).
const LANGS = new Set(["en", "nl"]);
const CURRENCIES = new Set(["USD", "EUR", "GBP"]);

/** Things-to-do widget in the visitor's language and currency (when the partner supports them). */
export default function ActivitiesWidget({ cityId, cards, minHeight }: { cityId: number; cards: number; minHeight: number }) {
  const locale = useLocale();
  const { currency, ready } = useCurrency();
  if (!ready) return <div style={{ minHeight }} aria-hidden="true" />;
  const language = LANGS.has(locale) ? locale : "en";
  const cur = CURRENCIES.has(currency) ? currency : "USD";
  return <TpWidget key={`${language}-${cur}`} src={activitiesWidget(cityId, cards, language, cur)} minHeight={minHeight} />;
}
