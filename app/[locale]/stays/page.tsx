import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import StaysForm from "@/components/StaysForm";
import Faq from "@/components/Faq";
import { bookingUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Hotels & Stays — Search on Booking.com",
  description: "Find a place to stay for your trip. Pick a city and dates and continue to Booking.com to compare rooms and book.",
  alternates: { canonical: "/stays" },
  robots: { index: false, follow: true },
};

const cities = ["Rome", "Dubai", "Barcelona", "Amsterdam", "New York", "London", "Paris", "Istanbul"];

const faq = [
  { q: "Do you compare hotel prices?", a: "Not yet. Our Stays search takes you to Booking.com with your city, dates and guests filled in. You compare and book there." },
  { q: "Is free cancellation worth a higher rate?", a: "If your plans could change, usually yes. A refundable rate lets you rebook if prices drop, so it often ends up cheaper in practice." },
  { q: "Are taxes and fees included?", a: "The final total, including local taxes and any resort fees, is shown on the provider's checkout page before you pay." },
];

export default async function StaysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink pb-16 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Stays</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Find a place to stay</h1>
          <p className="mt-4 max-w-xl text-white/70">Pick your city and dates. We&apos;ll open the results on Booking.com.</p>
          <div className="boarding-pass mt-9 px-5 py-6 sm:px-7">
            <StaysForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Popular hotel destinations</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <a key={c} href={bookingUrl({ city: c })} target="_blank" rel="nofollow noopener" className="group rounded-2xl border border-mist bg-white p-5 transition hover:border-amber hover:shadow-lg">
              <p className="font-display text-lg font-bold text-ink">Hotels in {c}</p>
              <p className="mt-3 text-sm font-semibold text-amber-deep group-hover:underline">Search on Booking.com →</p>
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
