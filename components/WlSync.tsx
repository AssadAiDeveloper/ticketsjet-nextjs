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

function clearTpwlLocaleCookie() {
  for (const domain of ["", "ticketsjet.com", "www.ticketsjet.com"]) {
    const d = domain ? `; Domain=${domain}` : "";
    document.cookie = `tpwl_locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
  }
}

export default function WlSync() {
  const locale = useLocale();
  const { currency, setCurrency, ready } = useCurrency();

  useEffect(() => {
    try {
      clearTpwlLocaleCookie();
      document.cookie = `tpwl_locale=${locale}; path=/; SameSite=Lax`;
      for (const k of ["__wlcc", "__wlsh"]) {
        try { localStorage.removeItem(k); } catch {}
        try { sessionStorage.removeItem(k); } catch {}
      }
    } catch {}
    window.tpwlCurrencyChange = (code) => {
      const c = code.toUpperCase();
      if (isCurrency(c)) setCurrency(c);
    };
    return () => {
      delete window.tpwlCurrencyChange;
    };
  }, [locale, setCurrency]);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    const want: Record<string, string | null> = { language: locale, currency: WL_CURRENCIES.has(currency) ? currency : null };
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
    const mark = `${locale}|${currency}|${window.location.search}`;
    try {
      if (sessionStorage.getItem("tj-wlsync") === mark) return;
      sessionStorage.setItem("tj-wlsync", mark);
    } catch {}
    window.location.replace(url.toString());
  }, [locale, currency, ready]);

  return null;
}
