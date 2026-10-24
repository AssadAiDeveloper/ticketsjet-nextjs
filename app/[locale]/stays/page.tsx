import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import StaysForm from "@/components/StaysForm";
import Faq from "@/components/Faq";
import { bookingUrl } from "@/lib/config";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stays" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/stays"), robots: { index: false, follow: true } };
}

// [English name for the Booking.com query, key in messages "place"]
const cities: [string, string][] = [["Rome", "rom"], ["Dubai", "dxb"], ["Barcelona", "bcn"], ["Amsterdam", "ams"], ["New York", "nyc"], ["London", "lon"], ["Paris", "par"], ["Istanbul", "ist"]];

export default async function StaysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("stays");
  const tp = await getTranslations("place");
  const faq = [1, 2, 3].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  return (
    <>
      <section className="bg-ink pb-16 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1")}</h1>
          <p className="mt-4 max-w-xl text-white/70">{t("lead")}</p>
          <div className="boarding-pass mt-9 px-5 py-6 sm:px-7">
            <StaysForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("popular")}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map(([c, k]) => (
            <a key={c} href={bookingUrl({ city: c })} target="_blank" rel="nofollow noopener" className="group rounded-2xl border border-mist bg-white p-5 transition hover:border-amber hover:shadow-lg">
              <p className="font-display text-lg font-bold text-ink">{t("hotelsIn", { city: tp(`${k}.name`) })}</p>
              <p className="mt-3 text-sm font-semibold text-amber-deep group-hover:underline">{t("searchBooking")}</p>
            </a>
          ))}
        </div>
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
