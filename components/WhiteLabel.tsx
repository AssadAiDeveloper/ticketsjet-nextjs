"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { WL_WEB } from "@/lib/config";

function clearTpwlLocaleCookie() {
  for (const domain of ["", "ticketsjet.com", "www.ticketsjet.com"]) {
    const d = domain ? `; Domain=${domain}` : "";
    document.cookie = `tpwl_locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
  }
}

function bootWlScript() {
  const existing = document.getElementById("tpwl-embed");
  if (existing) {
    try {
      const last = Number(sessionStorage.getItem("tpwl_reload") || 0);
      if (Date.now() - last > 4000) {
        sessionStorage.setItem("tpwl_reload", String(Date.now()));
        window.location.reload();
      }
    } catch {
      /* sessionStorage unavailable */
    }
    return;
  }
  const s = document.createElement("script");
  s.id = "tpwl-embed";
  s.async = true;
  s.type = "module";
  s.src = WL_WEB.src;
  document.head.appendChild(s);
}

export function WlSearchForm() {
  const t = useTranslations("common");
  return (
    <div style={{ position: "relative", overflow: "hidden", contain: "paint" }}>
      <div id="tpwl-search" style={{ minHeight: 120 }} aria-label={t("flightSearch")} />
    </div>
  );
}

export function WlResults() {
  const locale = useLocale();
  useEffect(() => {
    try { clearTpwlLocaleCookie(); document.cookie = `tpwl_locale=${locale}; path=/; SameSite=Lax`; } catch {}
    bootWlScript();
  }, [locale]);
  return <div id="tpwl-tickets" />;
}
