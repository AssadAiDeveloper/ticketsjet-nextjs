"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function TpWidget({ src, minHeight = 220 }: { src: string; minHeight?: number }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === "true") return;
    try { document.cookie = `tpwl_locale=${locale}; path=/; SameSite=Lax`; } catch {}
    el.dataset.loaded = "true";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    el.appendChild(script);
  }, [src, locale]);

  return <div ref={ref} className="tp-widget" style={{ minHeight }} aria-label={t("travelSearch")} />;
}
