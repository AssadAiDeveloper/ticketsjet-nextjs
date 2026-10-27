"use client";

import { useTranslations } from "next-intl";
import { ECONOMYBOOKINGS_WIDGET_URL, ECONOMYBOOKINGS_FALLBACK_URL } from "@/lib/affiliates";

export default function EconomyBookingsWidget() {
  const t = useTranslations("cars");
  return (
    <div className="flex flex-col items-center">
      <iframe
        src={ECONOMYBOOKINGS_WIDGET_URL}
        title={t("widgetTitle")}
        loading="lazy"
        width="100%"
        height="800"
        style={{ maxWidth: "400px", border: 0, borderRadius: "0.75rem" }}
        className="w-full max-w-[400px] h-[720px] sm:h-[800px]"
      />
      <a
        href={ECONOMYBOOKINGS_FALLBACK_URL}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="mt-4 text-sm font-semibold text-amber-deep underline"
      >
        {t("widgetFallback")}
      </a>
      <p className="mt-2 text-xs text-slate">{t("affiliateNote")}</p>
    </div>
  );
}