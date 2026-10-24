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
    const wanted = [direct && "No layovers", bags && "Baggage included"].filter(Boolean) as string[];
    const done = new Set<string>();
    const started = Date.now();
    const timer = setInterval(() => {
      const root = document.getElementById("tpwl-tickets")?.shadowRoot;
      if (root) {
        const buttons = [...root.querySelectorAll("button")];
        for (const label of wanted) {
          if (done.has(label)) continue;
          const btn = buttons.find((b) => b.textContent?.trim() === label && /Popular/.test(b.parentElement?.className ?? ""));
          if (btn) {
            btn.click();
            done.add(label);
          }
        }
      }
      if (done.size === wanted.length || Date.now() - started > 45000) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, [direct, bags]);
  return null;
}
