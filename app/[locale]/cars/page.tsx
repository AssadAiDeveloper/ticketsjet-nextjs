import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import TpWidget from "@/components/TpWidget";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WIDGETS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Car Rental Comparison — Compare Deposits, Insurance and Cancellation",
  description:
    "Search rental cars from local and international companies. Filter by deposit, insurance, new cars and free cancellation — all on TicketsJet.",
  alternates: { canonical: "/cars" },
};

const faq = [
  { q: "What does full-to-full mean?", a: "You collect the car with a full tank and return it full. It's usually the fairest fuel policy — you only pay pump prices for the fuel you actually use." },
  { q: "Do I need a credit card?", a: "Many rental desks require a credit card in the main driver's name for the security deposit. Some offers are marked as not requiring one — use the filter in the search above." },
  { q: "Should I buy extra insurance?", a: "Basic rates usually include a damage waiver with a high excess. Compare what each offer includes, and consider full-insurance options if you want a lower excess." },
  { q: "Can I cancel for free?", a: "Many offers include free cancellation. The exact conditions are shown on each offer before you book, so check them before you pay." },
  { q: "Where do I pay?", a: "Booking is completed with the rental provider. TicketsJet is a search tool and never takes payment or adds fees." },
];

export default async function CarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Cars</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Rental cars, compared
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Search cars from local and international rental companies and filter by deposit,
            insurance and free cancellation.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-6xl px-4">
        <div className="boarding-pass p-3 sm:p-5">
          <TpWidget src={WIDGETS.carsWl} minHeight={640} />
        </div>
      </section>

      <AdSlot slot="5555555555" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Compare more rental offers</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate">
          Want another point of comparison? Search a second set of rental companies below.
        </p>
        <div className="mt-6 rounded-2xl border border-mist bg-white p-4 sm:p-6">
          <TpWidget src={WIDGETS.carsSearch} minHeight={220} />
        </div>
        <p className="mt-8 text-sm text-slate">
          New to renting abroad? Read our guide:{" "}
          <Link href="/blog/car-rental-guide" className="font-semibold text-amber-deep underline">
            The no-surprises car rental guide
          </Link>
        </p>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Car rental FAQ</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>
    </>
  );
}
