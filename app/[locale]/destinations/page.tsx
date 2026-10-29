import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { alternatesFor } from "@/lib/i18nPages";
import { countryName } from "@/lib/format";
import { DEST_CC } from "@/lib/richPrice";
import DestPhoto from "@/components/DestPhoto";
import { allPhotos } from "@/lib/destinationPhotos";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dpi" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/destinations") };
}

export default async function DestinationsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dpi");
  const tp = await getTranslations("place");
  const photos = allPhotos();
  const ta = await getTranslations("act");
  return (
    <>
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1")}</h1>
          <p className="mt-4 max-w-xl text-white/70">{t("lead")}</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITY_CITIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/destinations/${c.slug}`} className="flex h-full flex-col rounded-2xl border border-mist bg-white p-5 hover:border-amber">
              {photos[c.iata] ? (
                <div className="relative -mx-5 -mt-5 mb-4 aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <DestPhoto code={c.iata} photo={photos[c.iata]} sizes="(min-width: 1024px) 25vw, 50vw, 100vw" alt={tp(`${c.iata.toLowerCase()}.name`)} className="z-0" />
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />
                </div>
              ) : (
                <div className="relative -mx-5 -mt-5 mb-4 aspect-[16/9] overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#16324a] to-[#0b1b2b] flex flex-col items-center justify-center">
                  <span className="font-display text-xl font-bold text-white/80">{tp(`${c.iata.toLowerCase()}.name`)}</span>
                  <span className="text-sm text-white/60">{countryName(DEST_CC[c.iata.toLowerCase()], locale)}</span>
                </div>
              )}
                <p className="font-display text-xl font-bold text-ink">{tp(`${c.iata.toLowerCase()}.name`)}</p>
                <p className="text-sm text-slate">{countryName(DEST_CC[c.iata.toLowerCase()], locale)}</p>
                <p className="mt-3 line-clamp-3 text-sm text-slate">{ta(`${c.slug}.blurb`)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
