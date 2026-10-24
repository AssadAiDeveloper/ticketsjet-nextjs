import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { goHref } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Flight Delay & Cancellation Compensation — Check Your Claim",
  description: "Were you delayed or cancelled? Learn how EU flight compensation rules work and how to check whether you can claim.",
  alternates: { canonical: "/services/flight-compensation" },
};

export default function Page() {
  return (
    <ServicePage
      path="/services/flight-compensation"
      slot="7777777777"
      eyebrow="Flight compensation"
      title="Delayed or cancelled flight? Check if you can claim"
      intro="Under EU and UK rules, passengers can be owed up to €600 when a flight is cancelled or badly delayed. Check your flight in a couple of minutes."
      cta={{ label: "Check my flight", href: goHref("airhelp") }}
      steps={[
        { t: "Enter your flight", d: "You need the flight number, date and the reason you were told for the delay or cancellation." },
        { t: "Get an eligibility check", d: "The service tells you whether your flight is likely to qualify under the rules." },
        { t: "Let them file the claim", d: "If it qualifies, a claims company can handle the airline for you, usually for a share of any payout." },
      ]}
      sections={[
        { h: "When you may be entitled", p: "EU Regulation 261/2004 can apply to flights departing from an EU airport, or arriving in the EU on an EU airline. Fixed compensation of €250, €400 or €600 depends on the distance. Common qualifying cases are cancellations with short notice, arrivals three or more hours late, and denied boarding. The UK has a similar scheme." },
        { h: "When you are usually not entitled", p: "No compensation is due for extraordinary circumstances outside the airline's control, such as severe weather or air traffic control strikes. You may still be entitled to meals, hotel and rebooking in those cases." },
        { h: "Claim yourself or use a service", p: "You can claim directly from the airline for free, but it can take time and letters back and forth. Claims services handle the process in return for a fee that is normally taken only if the claim succeeds. Read the fee before you sign." },
      ]}
      faq={[
        { q: "How long do I have to claim?", a: "Time limits depend on the country where you claim and range from one to several years. Claim as soon as you can, while you still have your documents." },
        { q: "What documents do I need?", a: "Your booking confirmation, boarding pass and any messages from the airline help. A claims service can often start with just the flight details." },
        { q: "Is it free to check?", a: "Checking eligibility is normally free. If you use a claims service, the fee is taken from the compensation, so read the terms first." },
        { q: "Does TicketsJet handle the claim?", a: "No. We link to a third-party claims service. TicketsJet isn't a party to your claim and doesn't give legal advice." },
      ]}
    />
  );
}
