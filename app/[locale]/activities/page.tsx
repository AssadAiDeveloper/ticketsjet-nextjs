import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { alternatesFor } from "@/lib/i18nPages";
import { countryName } from "@/lib/format";
import { DEST_CC } from "@/lib/richPrice";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aci" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/activities") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aci");
  const tp = await getTranslations("place");
  const tc = await getTranslations("common");
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-deep">{t("kicker")}</p>
      <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-ink">{t("h1")}</h1>
      <p className="mt-3 max-w-xl text-slate">{t("lead")}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIVITY_CITIES.map((c) => (
          <li key={c.slug}>
            <Link href={`/activities/${c.slug}`} className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#16324a] to-[#0b1b2b] p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <span className="font-display absolute end-4 top-3 text-5xl font-extrabold text-white/10 group-hover:text-amber/30" aria-hidden="true">{c.iata}</span>
              <span className="font-display text-2xl font-bold">{tp(`${c.iata.toLowerCase()}.name`)}</span>
              <span className="text-sm text-white/60">{countryName(DEST_CC[c.iata.toLowerCase()], locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    <p className="mt-6 text-xs text-slate">{tc("affiliateNote")} <Link href="/affiliate-disclosure" className="underline hover:text-ink">{tc("learnMore")}</Link>.</p>
    </div>
  );
}
