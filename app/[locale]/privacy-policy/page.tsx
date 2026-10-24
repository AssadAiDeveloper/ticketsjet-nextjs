import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TicketsJet collects, uses and protects your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">Privacy policy</h1>
          <p className="mt-3 font-mono text-xs text-white/50">Last updated: July 2026</p>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <h2>Who we are</h2>
        <p>
          TicketsJet (&quot;we&quot;) operates ticketsjet.com, a travel comparison search engine. We do not
          process bookings or payments — those happen directly with the providers you book with.
        </p>
        <h2>Data we collect</h2>
        <ul>
          <li><strong>Search data</strong> — routes, dates and destinations you search, used to display results.</li>
          <li><strong>Usage data</strong> — anonymous analytics such as pages visited and device type, used to improve the site.</li>
          <li><strong>Cookies</strong> — used for site functionality, analytics and advertising (including Google AdSense) and affiliate tracking by our travel partners.</li>
        </ul>
        <h2>What we never collect</h2>
        <p>
          We never see or store your payment details, passport information or booking records.
          These are handled entirely by the airline, hotel or rental provider you book with.
        </p>
        <h2>Third parties</h2>
        <p>
          Our search tools and outbound links are provided together with travel partners who may set cookies
          to attribute bookings. Advertising on this site may be served by Google AdSense, which
          uses cookies to show relevant ads. You can manage ad personalisation in your Google
          settings and cookies in your browser settings.
        </p>
        <h2>Your rights</h2>
        <p>
          Under the GDPR and similar regulations, you may request access to or deletion of any
          personal data we hold. Contact us via the details on this website and we will respond
          within 30 days.
        </p>
      </section>
    </>
  );
}
