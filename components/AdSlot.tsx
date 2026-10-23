"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * خانة إعلان AdSense — لا تعرض شيئًا حتى يتم ضبط NEXT_PUBLIC_ADSENSE_CLIENT.
 * slot: معرّف الوحدة الإعلانية من لوحة AdSense.
 */
export default function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsense not ready */
    }
  }, []);

  if (!ADSENSE_CLIENT) return null;

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
