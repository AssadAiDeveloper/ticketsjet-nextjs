"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

const PREFIX = "https://tpwgts.com/wl/redirect";

/** Sends every "Buy" click from the search results through our own branded /redirecting page. */
export default function PartnerRedirect() {
  const locale = useLocale();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const a = e.composedPath().find((n) => n instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
      if (!a || !a.href.startsWith(PREFIX)) return;
      e.preventDefault();
      const base = locale === "en" ? "" : `/${locale}`;
      const w = window.open(`${base}/redirecting?u=${encodeURIComponent(a.href)}`, "_blank");
      if (!w) window.location.href = a.href;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [locale]);
  return null;
}
