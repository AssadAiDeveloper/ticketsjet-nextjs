"use client";

import { resetConsent } from "@/lib/consent";

export default function CookieSettingsButton() {
  return (
    <button type="button" onClick={resetConsent} className="underline hover:text-white">
      Cookie settings
    </button>
  );
}
