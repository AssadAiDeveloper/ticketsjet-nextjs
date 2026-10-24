import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import TpWidget from "@/components/TpWidget";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WIDGETS } from "@/lib/config";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cars" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/cars") };
}

export default async function CarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cars");
  const faq = [1, 2, 3, 4, 5].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  return (
    <>
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t("h1")}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-6xl px-4">
        <div className="boarding-pass p-3 sm:p-5">
          <TpWidget src={WIDGETS.carsWl} minHeight={640} />
        </div>
      </section>

      <AdSlot slot="5555555555" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("moreTitle")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate">
          {t("moreText")}
        </p>
        <div className="mt-6 rounded-2xl border border-mist bg-white p-4 sm:p-6">
          <TpWidget src={WIDGETS.carsSearch} minHeight={220} />
        </div>
        <p className="mt-8 text-sm text-slate">
          {t("guideLead")}{" "}
          <Link href="/blog/car-rental-guide" className="font-semibold text-amber-deep underline">
            {t("guideLink")}
          </Link>
        </p>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("faqTitle")}</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>
    </>
  );
}
