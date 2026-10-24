import Link from "next/link";
import SearchTabs from "@/components/SearchTabs";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { CARS_LINK } from "@/lib/config";
import { posts } from "@/lib/posts";
import { getFares, searchCode } from "@/lib/fares";
import DestinationCards, { type Dest } from "@/components/DestinationCards";
import { POPULAR } from "@/lib/destinations";

export const revalidate = 3600; // refresh the fare board hourly

const regionName = new Intl.DisplayNames(["en"], { type: "region" });
async function loadBoard() {
  try {
    const fares = await getFares("AMS");
    if (!fares) return null;
    const toDest = (p: (typeof fares.points)[number]): Dest => {
      const code = searchCode(fares.origin.code, p);
      return {
        code: p.code,
        name: p.name,
        country: regionName.of(p.country) ?? p.country,
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
    return items.length >= 4 ? { origin: fares.origin, items } : null;
  } catch {
    return null;
  }
}

const faq = [
  { q: "How does TicketsJet work?", a: "We search airlines and travel agents to find the best flight options. We don't charge booking fees — you book directly with the provider at their price." },
  { q: "How can I find the cheapest flight?", a: "Search flexible dates and try 'Everywhere' to explore the lowest-cost destinations. Mid-week departures and 3–8 week advance booking usually surface the best fares on short-haul routes." },
  { q: "Do I book my flight with TicketsJet?", a: "No. TicketsJet is strictly a search engine. You complete the booking directly with the airline or travel agent on their own platform, at the exact price shown." },
  { q: "Does TicketsJet do hotels too?", a: "Flights and car rentals are our focus. For hotels, our Stays search opens Booking.com in a new tab, where you compare and book. TicketsJet doesn't compare hotel prices yet." },
  { q: "What about car rentals?", a: "We compare leading rental companies for competitive prices, free cancellation options and fair full-to-full fuel policies." },
  { q: "What happens after I book?", a: "Your confirmation email comes directly from the airline or provider you booked with. For changes or support, contact them directly — they hold your reservation." },
];

export default async function HomePage() {
  const board = await loadBoard();
  return (
    <>
      {/* ============ HERO — night flight ============ */}
      <section className="relative bg-ink pb-24 pt-16 sm:pt-24">
        {/* flight-path arcs */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="flight-arc" d="M-50 480 C 250 120, 700 80, 1250 260" stroke="#FFB703" strokeWidth="1.5" />
          <path className="flight-arc" d="M-50 560 C 350 320, 800 380, 1250 140" stroke="#3d5a75" strokeWidth="1.5" style={{ animationDuration: "20s" }} />
          <circle cx="1020" cy="205" r="3" fill="#FFB703" />
          <circle cx="180" cy="430" r="3" fill="#3d5a75" />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">
            Flights · Cars — one search
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Cheap flights, compared in one search.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            TicketsJet searches airlines and travel agencies for you —
            then sends you straight to the provider to book. We add no fees or markup.
          </p>

          <div className="mt-10">
            <SearchTabs />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/50">
            <span>✓ Airlines &amp; agencies compared</span>
            <span>✓ Prices shown before you leave</span>
            <span>✓ Book directly with the provider</span>
          </div>
        </div>
      </section>

      <AdSlot slot="1111111111" className="mt-10" />

      {board && <DestinationCards origin={board.origin} items={board.items} />}

      {/* ============ EXPLORE TEASER ============ */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-mist bg-white px-6 py-7 sm:px-9">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">Explore</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Not sure where to go? Start from the price.
            </h2>
            <p className="mt-2 text-sm text-slate">
              Pick your departure city and see the cheapest fares to destinations around the world, on one map.
            </p>
          </div>
          <Link href="/explore" className="rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-2">
            Open the price map →
          </Link>
        </div>
      </section>

      {/* ============ CARS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="overflow-hidden rounded-3xl bg-ink px-6 py-12 text-white sm:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber">Car rentals</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Freedom on four wheels, minus the surprises
              </h2>
              <p className="mt-4 text-white/70">
                Search cars from local and international rental companies and filter by deposit,
                insurance, new cars and free cancellation.
              </p>
              <Link
                href={CARS_LINK}
                className="mt-7 inline-block rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep"
              >
                Search rental cars →
              </Link>
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              {[
                "Filter by no deposit or low deposit",
                "Full-insurance and free-cancellation filters",
                "No credit card required on selected cars",
                "Real photos and city delivery options",
              ].map((f) => (
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
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">Travel smarter</p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Guides from the TicketsJet blog
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-mist bg-white p-6 transition hover:border-amber hover:shadow-lg">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">{p.readingTime}</p>
              <h3 className="font-display mt-2 text-lg font-bold leading-snug text-ink group-hover:text-amber-deep">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{p.description}</p>
              <p className="mt-4 text-sm font-semibold text-amber-deep">Read guide →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Booking with TicketsJet
          </h2>
          <p className="mt-3 text-slate">Everything you need to know before you search.</p>
          <div className="mt-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
