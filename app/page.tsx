import Link from "next/link";
import SearchTabs from "@/components/SearchTabs";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { CARS_LINK } from "@/lib/config";
import { posts } from "@/lib/posts";

const routes = [
  { code: "JFK", city: "New York", country: "United States", note: "from $312 return" },
  { code: "LHR", city: "London", country: "United Kingdom", note: "from $89 return" },
  { code: "CDG", city: "Paris", country: "France", note: "from $74 return" },
  { code: "HND", city: "Tokyo", country: "Japan", note: "from $540 return" },
  { code: "DXB", city: "Dubai", country: "United Arab Emirates", note: "from $210 return" },
  { code: "BCN", city: "Barcelona", country: "Spain", note: "from $58 return" },
];


const faq = [
  { q: "How does TicketsJet work?", a: "We search hundreds of airlines and travel agents to find the best flight options. We don't charge booking fees — you book directly with the provider at their price." },
  { q: "How can I find the cheapest flight?", a: "Search flexible dates and try 'Everywhere' to explore the lowest-cost destinations. Mid-week departures and 3–8 week advance booking usually surface the best fares on short-haul routes." },
  { q: "Do I book my flight with TicketsJet?", a: "No. TicketsJet is strictly a search engine. You complete the booking directly with the airline or travel agent on their own platform, at the exact price shown." },
  { q: "Does TicketsJet do hotels too?", a: "Not yet. Right now we focus on flights and car rentals, and we are working on adding hotels." },
  { q: "What about car rentals?", a: "We compare leading rental companies for competitive prices, free cancellation options and fair full-to-full fuel policies." },
  { q: "What happens after I book?", a: "Your confirmation email comes directly from the airline or provider you booked with. For changes or support, contact them directly — they hold your reservation." },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO — night flight ============ */}
      <section className="relative overflow-hidden bg-ink pb-24 pt-16 sm:pt-24">
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
            Millions of cheap flights. One simple search.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            TicketsJet compares hundreds of airlines and agencies in seconds —
            then sends you straight to the provider to book. Zero fees, zero markup.
          </p>

          <div className="mt-10">
            <SearchTabs />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/50">
            <span>✓ 100+ airlines &amp; agencies compared</span>
            <span>✓ Real prices — no hidden fees</span>
            <span>✓ Book directly with the provider</span>
          </div>
        </div>
      </section>

      <AdSlot slot="1111111111" className="mt-10" />

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

      {/* ============ DEPARTURE BOARD ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">Departures</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Where fares are dropping right now
            </h2>
            <p className="mt-4 text-slate">
              Popular routes our travellers are searching this week. Prices are indicative
              return fares — run a live search for today&apos;s exact price.
            </p>
            <Link
              href="/flights"
              className="mt-6 inline-block rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-2"
            >
              Search all destinations →
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl bg-ink shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">Live · fare board</p>
              <p className="font-mono text-[11px] text-white/40">UTC {new Date().getUTCFullYear()}</p>
            </div>
            {routes.map((r) => (
              <Link key={r.code} href="/flights" className="board-row text-white">
                <span className="flap text-amber">{r.code}</span>
                <span>
                  <span className="block text-sm font-semibold">{r.city}</span>
                  <span className="block text-xs text-white/50">{r.country}</span>
                </span>
                <span className="font-mono text-xs text-signal">{r.note}</span>
              </Link>
            ))}
          </div>
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
