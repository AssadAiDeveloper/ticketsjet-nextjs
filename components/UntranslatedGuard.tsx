"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { isTranslated } from "@/lib/i18nPages";

/** Until a page is translated, show it in English (left-to-right) with a short note, instead of broken mixed text. */
export default function UntranslatedGuard({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("notice");
  const base = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const plain = locale === "en" || isTranslated(base);
  if (plain) return <>{children}</>;
  return (
    <>
      <p className="bg-amber/15 px-4 py-2 text-center text-sm text-ink">{t("untranslated")}</p>
      <div dir="ltr" lang="en">{children}</div>
    </>
  );
}
