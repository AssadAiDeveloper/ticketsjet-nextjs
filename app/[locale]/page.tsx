import { isRtl } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SearchTabs from "@/components/SearchTabs";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { CARS_LINK } from "@/lib/config";
import { posts } from "@/lib/posts";
import { getFares, searchCode } from "@/lib/fares";
import { cityName as locCity } from "@/lib/cityName";
import DestinationCards, { type Dest } from "@/components/DestinationCards";
import { POPULAR } from "@/lib/destinations";
import { countryName } from "@/lib/format";

export const revalidate = 21600; // refresh the fare board every 6 hours

async function loadBoard(locale: string) {
  try {
    const fares = await getFares("AMS");
    if (!fares) return null;
    const toDest = (p: (typeof fares.points)[number]): Dest => {
      const code = searchCode(fares.origin.code, p);
      return {
        code: p.code,
        name: locCity(p.code, locale, p.name),
        country: countryName(p.country, locale),
        price: p.price,
        depart: p.depart,
        href: code ? `/flights?flightSearch=${code}` : "/flights",
      };
    };
    // Popular destinations that have a fare right now, topped up with the cheapest others.
    const popular = POPULAR.map((c) => fares.points.find((p) => p.code === c)).filter((p): p is NonNullable<typeof p> => !!p);
    const used = new Set(popular.map((p) => p.code));
    const seen = new Set(popular.map((p) => p.country));
    const extra = fares.points.filter((p) => !used.has(p.code) && !seen.has(p.country) && (seen.add(p.country), true));
    const items = [...popular, ...extra].slice(0, 8).map(toDest);
    return items.length >= 4 ? { origin: { ...fares.origin, name: locCity(fares.origin.code, locale, fares.origin.name) }, items } : null;
  } catch {
    return null;
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const board = await loadBoard(locale);
  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const tb = await getTranslations("blog");
  const tpost = await getTranslations("post");
  const faq = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`faq${n}q`), a: t(`faq${n}a`) }));
  const arrow = isRtl(locale) ? "←" : "→";
  return (
    <>
      {/* ============ HERO — night flight ============ */}
      <section className="relative bg-ink pb-4 pt-8 sm:pb-8 sm:pt-12">
        {/* flight-path arcs */}
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="flight-arc" d="M-50 480 C 250 120, 700 80, 1250 260" stroke="#FFB703" strokeWidth="1.5" />
          <path className="flight-arc" d="M-50 560 C 350 320, 800 380, 1250 140" stroke="#3d5a75" strokeWidth="1.5" style={{ animationDuration: "20s" }} />
          <circle cx="1020" cy="205" r="3" fill="#FFB703" />
          <circle cx="180" cy="430" r="3" fill="#3d5a75" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <h1 className="font-display mt-2 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {t("h1")}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("sub")}
          </p>

          <div className="relative z-30 mt-6">
            <SearchTabs />
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-6 sm:mt-8 mx-auto max-w-5xl px-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-mist bg-white p-4 shadow-sm sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" /></svg>
            </span>
            <span className="text-sm font-medium text-ink sm:text-base">{t("check1")}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-mist bg-white p-4 shadow-sm sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>
            </span>
            <span className="text-sm font-medium text-ink sm:text-base">{t("check2")}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-mist bg-white p-4 shadow-sm sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </span>
            <span className="text-sm font-medium text-ink sm:text-base">{t("check3")}</span>
          </div>
        </div>
      </section>

      <AdSlot slot="1111111111" className="mt-10" />

      {board && <DestinationCards origin={board.origin} items={board.items} />}

      {/* ============ EXPLORE TEASER ============ */}
      <section className="mx-auto max-w-5xl px-4 pt-10 sm:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-mist bg-white px-6 py-7 sm:px-9">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">{t("exploreKicker")}</p>
            <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {t("exploreTitle")}
            </h2>
            <p className="mt-2 text-sm text-slate">
              {t("exploreText")}
            </p>
          </div>
          <Link href="/explore" className="rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-2">
            {t("exploreCta")} {arrow}
          </Link>
        </div>
      </section>

      {/* ============ CARS ============ */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="overflow-hidden rounded-3xl bg-ink px-6 py-12 text-white sm:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber">{t("carsKicker")}</p>
              <h2 className="font-display mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {t("carsTitle")}
              </h2>
              <p className="mt-4 text-white/70">
                {t("carsText")}
              </p>
              <Link
                href={CARS_LINK}
                className="mt-7 inline-block rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep"
              >
                {t("carsCta")} {arrow}
              </Link>
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              {[t("cf1"), t("cf2"), t("cf3"), t("cf4")].map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <span className="mt-0.5 text-signal">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AdSlot slot="2222222222" />

      {/* ============ GUIDES ============ */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">{t("guidesKicker")}</p>
        <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {t("guidesTitle")}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-mist bg-white p-6 transition hover:border-amber hover:shadow-lg">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">{tb("minutes", { n: p.minutes })}</p>
              <h3 className="font-display mt-2 text-lg font-bold leading-snug text-ink group-hover:text-amber-deep">{tpost(`${p.slug}.title`)}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{tpost(`${p.slug}.desc`)}</p>
              <p className="mt-4 text-sm font-semibold text-amber-deep">{t("readGuide")} {arrow}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {t("faqTitle")}
          </h2>
          <p className="mt-3 text-slate">{t("faqSub")}</p>
          <div className="mt-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
