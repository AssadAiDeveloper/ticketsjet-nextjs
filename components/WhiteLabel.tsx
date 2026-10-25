"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { WL_WEB } from "@/lib/config";

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
  return <div id="tpwl-search" style={{ minHeight: 120 }} aria-label={t("flightSearch")} />;
}

export function WlResults() {
  useEffect(() => {
    bootWlScript();
  }, []);
  return <div id="tpwl-tickets" />;
}
