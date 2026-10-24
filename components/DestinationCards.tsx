import Link from "next/link";
import { PHOTOS } from "@/lib/destinations";

export type Dest = { code: string; name: string; country: string; price: number; href: string; depart: string | null };

const GRADS = [
  "from-[#16324a] to-[#0b1b2b]",
  "from-[#3b2f5c] to-[#0b1b2b]",
  "from-[#0f4a55] to-[#0b1b2b]",
  "from-[#5a3a1c] to-[#0b1b2b]",
  "from-[#1f4d3a] to-[#0b1b2b]",
  "from-[#4a2438] to-[#0b1b2b]",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const when = (iso: string | null) => (iso ? `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}` : null);

export default function DestinationCards({ origin, items }: { origin: { code: string; name: string }; items: Dest[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">Trending</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Popular trips from {origin.name}</h2>
          <p className="mt-2 text-sm text-slate">Lowest return fares found recently. Prices change often — the search shows today&apos;s price.</p>
        </div>
        <Link href="/explore" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          See every destination on the map →
        </Link>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((d, i) => {
          const photo = PHOTOS[d.code];
          return (
            <li key={d.code}>
              <Link
                href={d.href}
                className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${GRADS[i % GRADS.length]} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl`}
                style={photo ? { backgroundImage: `linear-gradient(to top, rgba(11,27,43,.85), rgba(11,27,43,.1)), url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                <span className="font-display select-none text-6xl font-extrabold leading-none tracking-tight text-white/10 transition group-hover:text-amber/30" aria-hidden="true">
                  {d.code}
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {origin.code} → {d.code}
                  </span>
                  <span className="font-display mt-1 block text-2xl font-bold leading-tight">{d.name}</span>
                  <span className="block text-sm text-white/60">{d.country}</span>
                  <span className="mt-3 flex items-end justify-between border-t border-white/15 pt-3">
                    <span>
                      <span className="block text-[11px] text-white/50">from</span>
                      <span className="font-display text-2xl font-extrabold text-amber">${d.price}</span>
                    </span>
                    {when(d.depart) && <span className="text-xs text-white/60">{when(d.depart)}</span>}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
