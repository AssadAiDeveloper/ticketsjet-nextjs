"use client";

import { useEffect } from "react";
import { isLocale } from "@/i18n/routing";

const RTL = new Set(["ar", "fa", "he"]);

export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    if (!isLocale(locale)) return;
    const apply = () => {
      if (document.documentElement.lang !== locale) document.documentElement.lang = locale;
      const dir = RTL.has(locale) ? "rtl" : "ltr";
      if (document.documentElement.dir !== dir) document.documentElement.dir = dir;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
    return () => observer.disconnect();
  }, [locale]);
  return null;
}
