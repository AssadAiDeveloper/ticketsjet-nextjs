"use client";

import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/config";

/** Loads the AdSense script. Google's consent message handles advertising choices. */
export default function AdSenseLoader() {
  return (
    <Script
      id="adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
