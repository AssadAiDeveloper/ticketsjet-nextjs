import type { Metadata } from "next";
import Link from "next/link";
import { DESTS, ROUTES, originName, slug } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Cheap Flights by Route",
  description: "Browse popular flight routes and see recent low fares and the cheapest dates for each.",
  alternates: { canonical: "/cheap-flights" },
};

export default function RoutesIndex() {
  const groups = new Map<string, string[]>();
  for (const [o, d] of ROUTES) groups.set(o, [...(groups.get(o) ?? []), d]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">Cheap flights by route</h1>
      <p className="mt-3 max-w-xl text-slate">Pick a route to see recent low fares and the cheapest dates.</p>
      {[...groups].map(([o, ds]) => (
        <section key={o} className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">From {originName(o)}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ds.map((d) => (
              <li key={d}>
                <Link href={`/cheap-flights/${slug(o, d)}`} className="block rounded-xl border border-mist bg-white px-4 py-3 text-sm font-medium text-ink hover:border-amber">
                  {originName(o)} to {DESTS[d].name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
