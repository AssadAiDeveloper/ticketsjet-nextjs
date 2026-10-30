"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/config";
import { useConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * خانة إعلان AdSense - لا تعرض شيئًا حتى يتم ضبط NEXT_PUBLIC_ADSENSE_CLIENT.
 * slot: معرّف الوحدة الإعلانية من لوحة AdSense.
 */
export default function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const pushed = useRef(false);
  const consent = useConsent();

  useEffect(() => {
    if (!ADSENSE_CLIENT || consent !== "granted" || /^(\d)\1{9}$/.test(slot) || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsense not ready */
    }
  }, [consent]);

  // Placeholder slot ids (1111111111, 2222222222 …) are not real ad units: render nothing so no empty gap appears.
  const isPlaceholder = /^(\d)\1{9}$/.test(slot);
  if (!ADSENSE_CLIENT || consent !== "granted" || isPlaceholder) return null;

  return (
    <div className={`mx-auto w-full max-w-5xl px-4 ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
