"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { ECONOMYBOOKINGS_WIDGET_URL, ECONOMYBOOKINGS_FALLBACK_URL } from "@/lib/affiliates";

const SUPPORTED_LANGS = new Set(["en", "pl"]);

export default function EconomyBookingsWidget() {
  const t = useTranslations("cars");
  const locale = useLocale();
  const widgetLang = SUPPORTED_LANGS.has(locale) ? locale : "en";
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const initialized = useRef(false);

  const initWidget = () => {
    if (initialized.current) return;
    const EB = (window as any).EBWidget;
    if (!EB || !containerRef.current) return;
    try {
      EB.init({
        container: "#eb-widget",
        trackingLink: ECONOMYBOOKINGS_FALLBACK_URL,
        defaults: { lang: widgetLang },
        theme: {
          layout: "horizontal",
          backgroundColor: "#ffffff",
          borderColor: "#e2e8f0",
          borderRadius: "12px",
          textColor: "#0b1b2b",
          textFontFamily: "Inter, sans-serif",
          textFontWeight: "400",
          textFontSize: "14px",
          fieldTextColor: "#0b1b2b",
          fieldBackgroundColor: "#ffffff",
          fieldBorderColor: "#e2e8f0",
          fieldBorderRadius: "12px",
          fieldFontFamily: "Inter, sans-serif",
          buttonTextColor: "#0b1b2b",
          buttonBackgroundColor: "#fbbf24",
          buttonBorderColor: "#fbbf24",
          buttonBorderRadius: "8px",
          buttonFontFamily: "Inter, sans-serif",
          buttonFontWeight: "700",
        },
      });
      initialized.current = true;
      setLoaded(true);
    } catch (e) {
      console.warn("[EconomyBookingsWidget] init failed:", e);
      setFailed(true);
    }
  };

  useEffect(() => {
    // handle case where script already loaded (client-side nav)
    if ((window as any).EBWidget) initWidget();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Script
        src="https://cdn.targetcircle.com/vendors/economybookings/eb-widget.js"
        strategy="afterInteractive"
        onLoad={() => initWidget()}
        onReady={() => initWidget()}
        onError={() => { console.warn("[EconomyBookingsWidget] script failed to load"); setFailed(true); }}
      />
      <div
        id="eb-widget"
        ref={containerRef}
        className="w-full max-w-[900px] min-h-[430px] md:min-h-[230px]"
      />
      {!loaded && !failed && (
        <div className="w-full max-w-[900px] min-h-[430px] md:min-h-[230px] animate-pulse rounded-xl bg-cloud" />
      )}
      <a
        href={ECONOMYBOOKINGS_FALLBACK_URL}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="mt-4 text-sm font-semibold text-amber-deep underline"
      >
        {t("widgetFallback")}
      </a>
    </div>
  );
}