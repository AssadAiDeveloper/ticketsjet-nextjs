"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { CURRENCY_KEY, DEFAULT_CURRENCY, defaultCurrencyFor, isCurrency, type Currency } from "@/lib/currency";

type Ctx = { currency: Currency; setCurrency: (c: Currency) => void; rate: number; ready: boolean };
const CurrencyCtx = createContext<Ctx>({ currency: DEFAULT_CURRENCY, setCurrency: () => {}, rate: 1, ready: false });

let ratesPromise: Promise<Record<string, number>> | null = null;
function loadRates() {
  ratesPromise ??= fetch("/api/rates").then((r) => r.json()).then((j: { rates?: Record<string, number> }) => j.rates ?? { USD: 1 }).catch(() => ({ USD: 1 }));
  return ratesPromise;
}

/** Holds the visitor's chosen currency (remembered in this browser) and the live exchange rates. */
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const [currency, setCur] = useState<Currency>(DEFAULT_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(CURRENCY_KEY); } catch {}
    setCur(isCurrency(saved) ? saved : defaultCurrencyFor(locale));
    setReady(true);
    loadRates().then(setRates);
  }, [locale]);

  const setCurrency = useCallback((c: Currency) => {
    setCur(c);
    try { localStorage.setItem(CURRENCY_KEY, c); } catch {}
  }, []);

  const value = useMemo(() => ({ currency, setCurrency, rate: rates[currency] ?? 1, ready }), [currency, setCurrency, rates, ready]);
  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

export const useCurrency = () => useContext(CurrencyCtx);
