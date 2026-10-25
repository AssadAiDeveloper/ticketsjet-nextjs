import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/about-us") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">{t("h1")}</h1>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <p>{t("p1")}</p>
        <h2>{t("h2")}</h2>
        <p>{t("p2")}</p>\n        <h2>{t("creditsH")}</h2>\n        <p>{t.rich("credits", { a: (chunks) => <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-deep underline">{chunks}</a> })}</p>
        <h2>{t("h3")}</h2>
        <p>
          {t.rich("p3", { a: (chunks) => <Link href="/affiliate-disclosure" className="font-semibold text-amber-deep underline">{chunks}</Link> })}
        </p>
        <h2>{t("h4")}</h2>
        <ul>
          <li>{t("l1")}</li>
          <li>{t("l2")}</li>
          <li>{t("l3")}</li>
        </ul>
      </section>
    </>
  );
}
