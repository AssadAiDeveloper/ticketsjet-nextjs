"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useConsent, writeConsent } from "@/lib/consent";

/** Cookie notice. Until the visitor accepts, no advertising scripts are loaded. */
export default function CookieConsent() {
  const t = useTranslations("cookie");
  const consent = useConsent();
  if (consent !== null) return null; // undefined (not hydrated) or already chosen

  return (
    <div
      role="dialog"
      aria-label={t("aria")}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-ink p-5 text-white shadow-2xl ring-1 ring-white/10 sm:inset-x-auto sm:bottom-5 sm:start-5 sm:mx-0"
    >
      <p className="font-display text-base font-bold">{t("title")}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-white/75">
        {t("body")}{" "}
        <Link href="/privacy-policy" className="underline hover:text-white">{t("privacy")}</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-amber-deep"
        >
          {t("acceptAll")}
        </button>
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className="rounded-xl border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {t("onlyEssential")}
        </button>
      </div>
    </div>
  );
}
