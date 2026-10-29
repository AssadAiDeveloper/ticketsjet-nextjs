import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18nPages";
import { SITE } from "@/lib/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "priv" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/privacy-policy") };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("priv");
  const l = await getTranslations("legal");
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display break-words text-4xl font-extrabold tracking-tight text-white">{t("h1")}</h1>
          <p className="mt-3 font-mono text-xs text-white/50">{l("updated")}</p>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <h2>{t("h2a")}</h2>
        <p>{t("p1")}</p>
        <h2>{t("h2b")}</h2>
        <ul>
          <li>{t.rich("l1", { b: (c) => <strong>{c}</strong> })}</li>
          <li>{t.rich("l2", { b: (c) => <strong>{c}</strong> })}</li>
          <li>{t.rich("l3", { b: (c) => <strong>{c}</strong> })}</li>
        </ul>
        <h2>{t("h2c")}</h2>
        <p>{t("p2")}</p>
        <h2>{t("h2d")}</h2>
        <p>{t("p3")}</p>
        <h2>{t("h2e")}</h2>
        <p>{t("p4")}</p>
        <p>{t("unsplash")}</p>
        <p className="mt-6 text-sm text-slate">
          {t("contactLine")}{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-amber-deep underline">{SITE.email}</a>
        </p>
      </section>
    </>
  );
}
