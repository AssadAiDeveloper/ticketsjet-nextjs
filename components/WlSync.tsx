"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useCurrency } from "@/components/CurrencyProvider";
import { WL_CURRENCIES } from "@/lib/wlCurrencies";
import { isCurrency } from "@/lib/currency";

declare global {
  interface Window {
    tpwlCurrencyChange?: (code: string) => void;
  }
}

/**
 * Keeps the booking-results widget in the visitor's language and currency.
 * The widget reads `language` and `currency` from the page URL when it starts, so when they differ
 * from the visitor's choice we reload once with them added. If the visitor changes the currency
 * inside the widget itself, we adopt it for the rest of the site too.
 */
export default function WlSync() {
  const locale = useLocale();
  const { currency, setCurrency, ready } = useCurrency();

  useEffect(() => {
    window.tpwlCurrencyChange = (code) => {
      const c = code.toUpperCase();
      if (isCurrency(c)) setCurrency(c);
    };
    return () => {
      delete window.tpwlCurrencyChange;
    };
  }, [setCurrency]);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    const want: Record<string, string | null> = { language: locale, currency: WL_CURRENCIES.has(currency) ? currency : null };
    // The widget removes these parameters after reading them, so compare with what it stored.
    const stored = Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=") as [string, string]));
    const have: Record<string, string | undefined> = { language: stored["tpwl_locale"], currency: stored["tpwl_currency"] };
    let changed = false;
    for (const [k, v] of Object.entries(want)) {
      if (v && (have[k] ?? "").toLowerCase() !== v.toLowerCase() && url.searchParams.get(k) !== v) {
        url.searchParams.set(k, v);
        changed = true;
      }
    }
    if (!changed) return;
    // Try once per language+currency pair, so a blocked cookie can never cause a reload loop.
    const mark = `${locale}|${currency}|${window.location.search}`;
    try {
      if (sessionStorage.getItem("tj-wlsync") === mark) return;
      sessionStorage.setItem("tj-wlsync", mark);
    } catch {}
    window.location.replace(url.toString());
  }, [locale, currency, ready]);

  return null;
}
