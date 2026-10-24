"use client";

import { useLocale } from "next-intl";
import { useCurrency } from "@/components/CurrencyProvider";

/** Format a USD amount in the visitor's currency and language. Renders USD until rates are loaded. */
export function useFormatPrice() {
  const locale = useLocale();
  const { currency, rate } = useCurrency();
  return (usd: number) => {
    const intl = locale === "ar" ? "ar-u-nu-latn" : locale === "nl" ? "nl-NL" : "en-US";
    try {
      return new Intl.NumberFormat(intl, { style: "currency", currency, maximumFractionDigits: 0 }).format(usd * rate);
    } catch {
      return `$${Math.round(usd)}`;
    }
  };
}

export default function Price({ usd, className }: { usd: number; className?: string }) {
  const f = useFormatPrice();
  return <span className={className} dir="ltr">{f(usd)}</span>;
}
