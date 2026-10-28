import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PriceMap from "@/components/PriceMap";
import { cityName as locCity } from "@/lib/cityName";
import { getCities } from "@/lib/places";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { alternatesFor } from "@/lib/i18nPages";
import PageHero from "@/components/PageHero";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "exp" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/explore") };
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("exp");
  const faq = [1, 2, 3, 4].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  const cities = await getCities();
  const names = Object.fromEntries(cities.map((c) => [c.code, locCity(c.code, locale, c.name)]));
  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} photoKey="explore" />

      <section className="mx-auto -mt-6 max-w-6xl px-4">
        <div className="boarding-pass p-2 sm:p-3">
          <PriceMap names={names} />
        </div>
        <p className="mt-3 text-xs text-slate">
          {t("note")}
        </p>
      </section>

      <AdSlot slot="7777777777" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("three")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => ({ t: t(`c${n}t`), d: t(`c${n}d`) })).map((c) => (
            <div key={c.t} className="rounded-2xl border border-mist bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          {t("ready")}{" "}
          <Link href="/flights" className="font-semibold text-amber-deep underline">{t("open")}</Link>
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
