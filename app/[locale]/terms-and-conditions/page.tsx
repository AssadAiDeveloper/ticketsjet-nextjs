import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/terms-and-conditions") };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
  const l = await getTranslations("legal");
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">{t("h1")}</h1>
          <p className="mt-3 font-mono text-xs text-white/50">{l("updated")}</p>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <h2>{t("h1a")}</h2>
        <p>{t("p1")}</p>
        <h2>{t("h2a")}</h2>
        <p>{t("p2")}</p>
        <h2>{t("h3a")}</h2>
        <p>{t("p3")}</p>
        <h2>{t("h4a")}</h2>
        <p>{t("p4")}</p>
        <h2>{t("h5a")}</h2>
        <p>{t("p5")}</p>
        <h2>{t("h6a")}</h2>
        <p>{t("p6")}</p>
      </section>
    </>
  );
}
