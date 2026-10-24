"use client";

import { useTranslations } from "next-intl";
import { resetConsent } from "@/lib/consent";

export default function CookieSettingsButton() {
  const t = useTranslations("cookie");
  return (
    <button type="button" onClick={resetConsent} className="underline hover:text-white">
      {t("settings")}
    </button>
  );
}
