import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aff" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/affiliate-disclosure") };
}

export default async function AffiliateDisclosurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aff");
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">{t("h1")}</h1>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <p>{t("p1")}</p>
        <h2>{t("h2")}</h2>
        <p>{t.rich("p2", { b: (c) => <strong>{c}</strong> })}</p>
        <h2>{t("h3")}</h2>
        <p>{t("p3")}</p>
        <h2>{t("h4")}</h2>
        <p>{t("p4")}</p>
      </section>
    </>
  );
}
