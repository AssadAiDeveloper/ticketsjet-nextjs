"use client";

import { useEffect } from "react";

/**
 * Applies "Direct only" / "Baggage included" in the results widget once its results have loaded,
 * by pressing the widget's own quick-filter buttons (matched by their text). If the widget's
 * markup ever changes, nothing happens and the visitor can still use the filters in the results.
 */
export default function FilterBridge({ direct, bags }: { direct: boolean; bags: boolean }) {
  useEffect(() => {
    if (!direct && !bags) return;
    // The widget's own button texts in each language it is shown in.
    const LABELS = {
      direct: ["No layovers", "ممنوع التوقف المؤقت", "Geen tussenstops"],
      bags: ["Baggage included", "تشمل الأمتعة", "Inclusief bagage"],
    };
    const wanted = [direct && "direct", bags && "bags"].filter(Boolean) as ("direct" | "bags")[];
    const done = new Set<string>();
    const started = Date.now();
    const timer = setInterval(() => {
      const root = document.getElementById("tpwl-tickets")?.shadowRoot;
      if (root) {
        const buttons = [...root.querySelectorAll("button")];
        for (const key of wanted) {
          if (done.has(key)) continue;
          const btn = buttons.find((b) => LABELS[key].includes(b.textContent?.trim() ?? "") && /Popular/.test(b.parentElement?.className ?? ""));
          if (btn) {
            btn.click();
            done.add(key);
          }
        }
      }
      if (done.size === wanted.length || Date.now() - started > 45000) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, [direct, bags]);
  return null;
}
