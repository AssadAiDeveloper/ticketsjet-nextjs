import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How TicketsJet earns commissions through affiliate partnerships, and what that means for you.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default async function AffiliateDisclosurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">Affiliate disclosure</h1>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <p>
          TicketsJet is a free comparison service. To keep it free, we participate in affiliate
          programs with airlines, online travel agencies, hotel booking platforms and car
          rental companies.
        </p>
        <h2>What this means in practice</h2>
        <p>
          When you click a link on TicketsJet and complete a booking on a provider&apos;s site, that
          provider may pay us a commission. This commission comes out of the provider&apos;s
          marketing budget — <strong>it is never added to your price</strong>. You pay exactly what
          you would pay going to the provider directly.
        </p>
        <h2>Our editorial independence</h2>
        <p>
          Commissions do not influence the order or content of search results, which are driven by
          price and relevance. Our guides and recommendations reflect what we genuinely believe
          helps travellers, regardless of commercial relationships.
        </p>
        <h2>Identifying affiliate links</h2>
        <p>
          Outbound links to booking providers on this site should be assumed to be affiliate links.
          They are additionally marked with sponsored link attributes for transparency.
        </p>
      </section>
    </>
  );
}
