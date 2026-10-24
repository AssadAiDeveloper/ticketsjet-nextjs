import { isRtl } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Price from "@/components/Price";
import { dayMonth } from "@/lib/format";
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

export default async function DestinationCards({ origin, items }: { origin: { code: string; name: string }; items: Dest[] }) {
  const t = await getTranslations("dest");
  const locale = await getLocale();
  const arrow = isRtl(locale) ? "←" : "→";
  const when = (iso: string | null) => (iso ? dayMonth(iso, locale) : null);
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">{t("trending")}</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("title", { city: origin.name })}</h2>
          <p className="mt-2 text-sm text-slate">{t("sub")}</p>
        </div>
        <Link href="/explore" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          {t("seeMap")} {arrow}
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
                    <span dir="ltr">{origin.code} → {d.code}</span>
                  </span>
                  <span className="font-display mt-1 block text-2xl font-bold leading-tight">{d.name}</span>
                  <span className="block text-sm text-white/60">{d.country}</span>
                  <span className="mt-3 flex items-end justify-between border-t border-white/15 pt-3">
                    <span>
                      <span className="block text-[11px] text-white/50">{t("from")}</span>
                      <Price usd={d.price} className="font-display text-2xl font-extrabold text-amber" />
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
