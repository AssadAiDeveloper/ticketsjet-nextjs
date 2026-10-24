import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { goHref } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Airport Transfers — Book a Pickup Before You Fly",
  description: "Pre-booked airport transfers: how they work, when they beat taxis and public transport, and what to check before you book.",
  alternates: { canonical: "/services/airport-transfers" },
};

export default function Page() {
  return (
    <ServicePage
      path="/services/airport-transfers"
      slot="5555555555"
      eyebrow="Airport transfers"
      title="A driver waiting when you land"
      intro="Book a private or shared transfer before you travel. You see the price up front and avoid haggling or queuing for a taxi after a long flight."
      cta={{ label: "Book an airport transfer", href: goHref("kiwitaxi") }}
      steps={[
        { t: "Enter your trip", d: "Add the airport, your destination and the number of passengers and bags." },
        { t: "Compare vehicles", d: "Choose between standard cars, minivans and larger vehicles based on group size." },
        { t: "Book and travel", d: "Add your flight number so the driver can track delays, then meet them in arrivals." },
      ]}
      sections={[
        { h: "When a transfer beats a taxi", p: "Pre-booking is most useful when you arrive late at night, travel with children or lots of luggage, or land somewhere you don't know the local taxi rules. You know the price before you go, and the driver is expecting you." },
        { h: "When public transport is better", p: "Many big cities have fast, cheap train or metro links from the airport. For solo travellers with light bags and daytime arrivals, that is often the best value. Compare the door-to-door time and cost for your own trip." },
        { h: "What to check before you book", p: "Look at the free-waiting time, how the driver finds you, what the cancellation terms are and whether child seats are available. Giving your flight number lets the driver adjust if you are delayed." },
      ]}
      faq={[
        { q: "What if my flight is delayed?", a: "If you give your flight number when booking, the provider can usually track your arrival. Check the waiting-time policy shown on the booking page." },
        { q: "Can I book a return transfer?", a: "Most providers let you add a return journey when booking. Check the pickup time and place for the way back." },
        { q: "Are child seats available?", a: "Many providers offer them on request. Add them when you book, as they can't always be arranged on the day." },
        { q: "Where do I pay?", a: "You pay the provider when you book. TicketsJet doesn't take payments or add fees." },
      ]}
    />
  );
}
