"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type SearchType = "flights" | "stays" | "cars";

const isSearchType = (value: string | null): value is SearchType =>
  value === "flights" || value === "stays" || value === "cars";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onGoClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href^="/go/"]');
      if (!anchor) return;
      const partner = anchor.getAttribute("href")?.match(/^\/go\/([^/?#]+)/)?.[1];
      if (partner) track("go_click", { partner });
    };

    const onSubmit = (event: SubmitEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.tagName === "TP-CASCOON") {
        track("search_submit", { type: "cars" });
        return;
      }
      const type = target.getAttribute("data-analytics-search");
      if (isSearchType(type)) track("search_submit", { type });
    };

    document.addEventListener("click", onGoClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onGoClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
