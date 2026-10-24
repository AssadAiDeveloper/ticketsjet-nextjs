"use client";

import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/config";
import { useConsent } from "@/lib/consent";

/** Loads the AdSense script only after the visitor has accepted advertising cookies. */
export default function AdSenseLoader() {
  const consent = useConsent();
  if (!ADSENSE_CLIENT || consent !== "granted") return null;
  return (
    <Script
      id="adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
