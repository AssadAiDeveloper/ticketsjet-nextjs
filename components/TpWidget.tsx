"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";

function clearTpwlLocaleCookie() {
  for (const domain of ["", "ticketsjet.com", "www.ticketsjet.com"]) {
    const d = domain ? `; Domain=${domain}` : "";
    document.cookie = `tpwl_locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
  }
}

export default function TpWidget({ src, minHeight = 220 }: { src: string; minHeight?: number }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === "true") return;
    try { clearTpwlLocaleCookie(); document.cookie = `tpwl_locale=${locale}; path=/; SameSite=Lax`; } catch {}
    el.dataset.loaded = "true";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    el.appendChild(script);
  }, [src, locale]);

  return <div ref={ref} className="tp-widget" style={{ minHeight }} aria-label={t("travelSearch")} />;
}
