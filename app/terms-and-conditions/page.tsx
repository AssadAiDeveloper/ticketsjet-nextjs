import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the TicketsJet comparison service.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">Terms of service</h1>
          <p className="mt-3 font-mono text-xs text-white/50">Last updated: July 2026</p>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <h2>1. The service</h2>
        <p>
          TicketsJet is a comparison search engine for flights, accommodation and car rentals. We
          aggregate offers from third-party providers. We are not a travel agent, airline, hotel
          or rental company, and we are not a party to any booking you make.
        </p>
        <h2>2. Bookings and payments</h2>
        <p>
          All bookings are made directly with third-party providers, on their platforms and under
          their terms. Prices, availability, changes, cancellations and refunds are governed by
          the provider&apos;s own conditions. Always review the final price and terms on the
          provider&apos;s site before paying.
        </p>
        <h2>3. Accuracy of information</h2>
        <p>
          Prices and availability are sourced live from providers and can change between search
          and booking. We work to keep information accurate but cannot guarantee it, and we are
          not liable for discrepancies confirmed at the provider&apos;s checkout.
        </p>
        <h2>4. Acceptable use</h2>
        <p>
          You may use TicketsJet for personal, non-commercial travel planning. Scraping,
          automated querying or reselling of our service is not permitted.
        </p>
        <h2>5. Liability</h2>
        <p>
          To the fullest extent permitted by law, TicketsJet is not liable for any loss arising
          from bookings made with third-party providers, including cancellations, schedule changes
          or service quality.
        </p>
        <h2>6. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes
          constitutes acceptance of the updated terms.
        </p>
      </section>
    </>
  );
}
