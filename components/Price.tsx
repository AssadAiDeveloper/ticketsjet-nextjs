"use client";

import { useLocale } from "next-intl";
import { intlTag } from "@/lib/format";
import { useCurrency } from "@/components/CurrencyProvider";

/** Format a USD amount in the visitor's currency and language. Renders USD until rates are loaded. */
export function useFormatPrice() {
  const locale = useLocale();
  const { priceCurrency: currency, rate } = useCurrency();
  return (usd: number) => {
    const intl = locale === "en" ? "en-US" : intlTag(locale);
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
