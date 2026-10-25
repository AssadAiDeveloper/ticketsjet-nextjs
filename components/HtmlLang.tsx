"use client";

import { useEffect } from "react";
import { isLocale } from "@/i18n/routing";

const RTL = new Set(["ar", "fa", "he"]);

export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    if (!isLocale(locale)) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL.has(locale) ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
