import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ACTIVITY_CITIES } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Things to Do — Tours, Tickets & Activities by City",
  description: "Find popular tours, attraction tickets and activities in top travel cities, with tips for booking ahead.",
  alternates: { canonical: "/activities" },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-deep">Activities</p>
      <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-ink">Things to do</h1>
      <p className="mt-3 max-w-xl text-slate">Pick a city to see popular tours and tickets, plus tips for planning your visit.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIVITY_CITIES.map((c) => (
          <li key={c.slug}>
            <Link href={`/activities/${c.slug}`} className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#16324a] to-[#0b1b2b] p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <span className="font-display absolute right-4 top-3 text-5xl font-extrabold text-white/10 group-hover:text-amber/30" aria-hidden="true">{c.iata}</span>
              <span className="font-display text-2xl font-bold">{c.name}</span>
              <span className="text-sm text-white/60">{c.country}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
