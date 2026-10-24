import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ACTIVITY_CITIES } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Plan a Trip — Destination Guides",
  description: "One page per destination: flights, a place to stay, things to do and travel essentials, all in one place.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Plan a trip</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Pick a destination, plan the whole trip</h1>
          <p className="mt-4 max-w-xl text-white/70">Flights, hotels, things to do and travel essentials for each city, gathered on one page.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITY_CITIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/destinations/${c.slug}`} className="block h-full rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                <p className="font-display text-xl font-bold text-ink">{c.name}</p>
                <p className="text-sm text-slate">{c.country}</p>
                <p className="mt-3 line-clamp-3 text-sm text-slate">{c.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
