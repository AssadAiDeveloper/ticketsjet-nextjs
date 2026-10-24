import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { alternatesFor } from "@/lib/i18nPages";
import { countryName } from "@/lib/format";
import { DEST_CC } from "@/lib/richPrice";

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
              <Link href={`/destinations/${c.slug}`} className="block h-full rounded-2xl border border-mist bg-white p-5 hover:border-amber">
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
