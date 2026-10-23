import type { Metadata } from "next";
import TpWidget from "@/components/TpWidget";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WIDGETS, hotelCityLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Hotel Deals & Stays — Compare Room Rates Across Providers",
  description:
    "Compare hotels, resorts and villas across booking providers. Free-cancellation filters, total-price comparison and zero fees on TicketsJet.",
  alternates: { canonical: "/stays" },
  robots: { index: false, follow: true },
};

const cities = ["Rome", "Dubai", "Barcelona", "Amsterdam", "New York", "London", "Paris", "Tokyo"];

const faq = [
  { q: "Why do prices differ between booking sites?", a: "Providers negotiate different rates and run separate promotions for identical rooms. Comparing across them routinely saves 10–25% per night — that comparison is exactly what TicketsJet does." },
  { q: "Is free cancellation worth a higher rate?", a: "If your plans could change, usually yes. A refundable rate lets you rebook if prices drop, so it often ends up cheaper in practice." },
  { q: "Are taxes and fees included?", a: "We surface the rates providers publish; the final total including local taxes and any resort fees is always confirmed on the provider's checkout page before payment." },
];

export default function StaysPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Stays</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            The same room, the best price
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Boutique resorts, cozy villas and premium hotels — compared side by side
            across the world&apos;s biggest booking providers.
          </p>
          <div className="boarding-pass mt-9 px-5 py-6 sm:px-7">
            <TpWidget src={WIDGETS.hotelsSearch} minHeight={240} />
          </div>
        </div>
      </section>

      <AdSlot slot="4444444444" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Popular hotel destinations</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <a
              key={c}
              href={hotelCityLink(c)}
              target="_blank"
              rel="nofollow sponsored"
              className="group rounded-2xl border border-mist bg-white p-5 transition hover:border-amber hover:shadow-lg"
            >
              <p className="font-display text-lg font-bold text-ink">Hotels in {c}</p>
              <p className="mt-3 text-sm font-semibold text-amber-deep group-hover:underline">Compare rates →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Stays FAQ</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>
    </>
  );
}
