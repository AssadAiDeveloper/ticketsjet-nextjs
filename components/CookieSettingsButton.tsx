"use client";

import { useTranslations } from "next-intl";

type GoogleFc = {
  callbackQueue?: { CONSENT_DATA_READY: () => void }[];
  showRevocationMessage?: () => void;
};

declare global {
  interface Window {
    googlefc?: GoogleFc;
  }
}

export default function CookieSettingsButton() {
  const t = useTranslations("cookie");

  const openCookieSettings = () => {
    const gf = window.googlefc;
    if (!gf) return;
    gf.callbackQueue?.push({
      CONSENT_DATA_READY: () => gf.showRevocationMessage?.(),
    });
  };

  return (
    <button type="button" onClick={openCookieSettings} className="underline hover:text-white">
      {t("settings")}
    </button>
  );
}
