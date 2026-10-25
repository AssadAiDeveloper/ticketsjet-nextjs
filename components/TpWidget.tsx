"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * Travelpayouts widget loader.
 */
export default function TpWidget({ src, minHeight = 220 }: { src: string; minHeight?: number }) {
  const t = useTranslations("common");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === "true") return;
    el.dataset.loaded = "true";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    el.appendChild(script);
  }, [src]);

  return <div ref={ref} className="tp-widget" style={{ minHeight }} aria-label={t("travelSearch")} />;
}
