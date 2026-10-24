import type { Metadata } from "next";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description: "Answers to common questions about searching and booking flights and car rentals with TicketsJet.",
  alternates: { canonical: "/help" },
};

const faq = [
  { q: "How does TicketsJet work?", a: "We search airlines and travel agents to find the best flight options. We don't charge booking fees — you book directly with the provider." },
  { q: "How can I find the cheapest flight using TicketsJet?", a: "Try searching 'Everywhere' to explore lowest-cost destinations, use the flexible-date calendar, and compare mid-week departures which are usually cheapest." },
  { q: "Where should I book a flight to right now?", a: "Check the fare board on our homepage or run an 'Everywhere' search from your home airport to see the current budget deals across Europe, the US and Asia." },
  { q: "Do I book my flight with TicketsJet?", a: "No — you book directly with the airline or travel agent on their platform. TicketsJet acts strictly as a search engine showing you the aggregated choices." },
  { q: "Does TicketsJet do hotels too?", a: "Flights and car rentals are our focus. For hotels, our Stays search opens Booking.com in a new tab, where you compare and book. TicketsJet doesn't compare hotel prices yet." },
  { q: "What about car rentals?", a: "TicketsJet compares leading car rental companies to bring you competitive prices, free-cancellation options and clear fuel policies." },
  { q: "What happens after I've booked my flight?", a: "You will receive a confirmation email directly from the vendor or airline you purchased from. Reach out to them directly for any support questions — they hold your reservation." },
  { q: "Can I book a flexible flight ticket?", a: "Yes. Many airlines provide tickets that allow date changes without fees. Look for the flexible filter during your search." },
  { q: "Does TicketsJet charge any fees?", a: "Never. Our service is free for travellers. We earn a commission from providers when you book through our links — at no extra cost to you." },
  { q: "Is my payment handled by TicketsJet?", a: "No. All payments are made directly on the provider's secure platform. We never see or store your payment details." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Help centre</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">
            How can we help?
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <Faq items={faq} />
        <p className="mt-8 text-sm text-slate">
          Booked already? Your reservation is held by the airline or provider you booked with —
          contact them directly for changes, cancellations or refunds.
        </p>
      </section>
    </>
  );
}
