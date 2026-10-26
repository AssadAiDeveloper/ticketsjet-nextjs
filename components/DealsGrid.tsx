"use client";

import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Price from "@/components/Price";
import { dayMonth, monthName } from "@/lib/format";
import { PHOTOS } from "@/lib/destinations";
import DestPhoto from "@/components/DestPhoto";
import PhotoCredit from "@/components/PhotoCredit";
import { allPhotos } from "@/lib/destinationPhotos";
import type { Deal } from "@/lib/deals";

const GRADS = ["from-[#16324a] to-[#0b1b2b]", "from-[#3b2f5c] to-[#0b1b2b]", "from-[#0f4a55] to-[#0b1b2b]", "from-[#5a3a1c] to-[#0b1b2b]", "from-[#1f4d3a] to-[#0b1b2b]", "from-[#4a2438] to-[#0b1b2b]"];

export default function DealsGrid({ origin, items }: { origin: { code: string; name: string }; items: Deal[] }) {
  const t = useTranslations("deals");
  const td = useTranslations("dest");
  const tc = useTranslations("common");
  const locale = useLocale();
  const photos = allPhotos();
  const when = (iso: string | null) => (iso ? dayMonth(iso, locale) : null);
  const [filter, setFilter] = useState<string>("all");
  const months = useMemo(() => [...new Set(items.map((d) => d.month).filter((m): m is string => !!m))].sort().slice(0, 3), [items]);
  const shown = items.filter((d) => (filter === "all" ? true : filter === "direct" ? d.stops === 0 : d.month === filter));
  const chips = [
    { id: "all", label: t("all") },
    { id: "direct", label: t("directOnly") },
    ...months.map((m) => ({ id: m, label: monthName(m + "-01", locale) })),
  ];

  return (
    <section aria-label={t("aria", { city: origin.name })}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("title", { city: origin.name })}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate">{td("sub")}</p>

      <div role="group" aria-label={t("filter")} className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${filter === c.id ? "border-ink bg-ink text-white" : "border-mist bg-white text-slate hover:border-amber hover:text-ink"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-mist bg-white p-6 text-sm text-slate">{t("none")}</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((d, i) => {
            const photo = PHOTOS[d.code];
            const hasPhoto = !!photos[d.code];
            return (
              <li key={d.code} className="relative">
                <Link
                  href={d.href}
                  className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl ${hasPhoto ? "" : `bg-gradient-to-br ${GRADS[i % GRADS.length]}`}`}
                  style={!hasPhoto && photo ? { backgroundImage: `linear-gradient(to top, rgba(11,27,43,.85), rgba(11,27,43,.1)), url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                >
                  {hasPhoto && <DestPhoto code={d.code} photo={photos[d.code]} sizes="(min-width: 1024px) 25vw, 50vw, 100vw" alt={`${d.name}, ${d.country}`} className="z-0" />}
                  {hasPhoto && <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />}
                  {hasPhoto && (
                    <span className="absolute start-3 top-3 z-10 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                      {d.code}
                    </span>
                  )}
                  {!hasPhoto && (
                    <span className="font-display select-none text-5xl font-extrabold leading-none tracking-tight text-white/10 transition group-hover:text-amber/30" aria-hidden="true">{d.code}</span>
                  )}
                  {d.stops === 0 && <span className="absolute end-3 top-3 z-10 rounded-full bg-signal/20 px-2.5 py-1 text-[11px] font-semibold text-signal">{tc("direct")}</span>}
                  {photos[d.code]?.author && <PhotoCredit author={photos[d.code].author || ""} authorUrl={photos[d.code].photoUrl || ""} photoUrl={photos[d.code].photoUrl || ""} />}
                  <span className="relative z-10 mt-auto">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60"><span dir="ltr">{origin.code} ? {d.code}</span></span>
                    <span className="font-display mt-1 block text-2xl font-bold leading-tight drop-shadow"><bdi>{d.name}</bdi></span>
                    <span className="block text-sm text-white/60 drop-shadow">{d.country}</span>
                    <span className="mt-3 flex items-end justify-between border-t border-white/15 pt-3">
                      <span>
                        <span className="block text-[11px] text-white/50">{td("from")}</span>
                        <Price usd={d.price} className="font-display text-2xl font-extrabold text-amber drop-shadow" />
                      </span>
                      {when(d.depart) && <span className="text-xs text-white/60">{when(d.depart)}</span>}
                    </span>
                  </span>
                </Link>
                {photos[d.code]?.author && (
                  <span className="absolute bottom-2 end-2 z-20 text-[10px] text-white/70 opacity-70">
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
