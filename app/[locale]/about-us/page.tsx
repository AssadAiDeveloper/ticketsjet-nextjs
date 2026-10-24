import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "About Us",
  description: "TicketsJet is an independent travel search engine comparing flights and car rentals across many providers.",
  alternates: { canonical: "/about-us" },
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">About</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">
            A search engine that works for travellers
          </h1>
        </div>
      </section>
      <section className="prose-tj mx-auto max-w-3xl px-4 py-14">
        <p>
          TicketsJet is an independent travel search engine. We compare flights across many
          of airlines and travel agents, and car rentals across leading rental companies, with
          more travel tools on the way.
        </p>
        <h2>What we do — and what we don&apos;t</h2>
        <p>
          We show you the market, side by side, and send you directly to the provider to book at
          their exact price. We never add booking fees, never mark up prices and never handle your
          payment. Your reservation always lives with the airline or rental company you
          book with.
        </p>
        <h2>How we make money</h2>
        <p>
          When you book through links on TicketsJet, the provider may pay us a commission. This
          costs you nothing extra and never affects the prices you see. Read our{" "}
          <Link href="/affiliate-disclosure" className="font-semibold text-amber-deep underline">affiliate disclosure</Link>{" "}
          for the full picture.
        </p>
        <h2>Our promise</h2>
        <ul>
          <li>Prices sourced from airlines and travel agencies</li>
          <li>No booking fees or markups added by us</li>
          <li>Clear, honest guidance — even when it earns us nothing</li>
        </ul>
      </section>
    </>
  );
}
