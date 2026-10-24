import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { goHref } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Travel eSIM — Mobile Data Abroad Without Roaming Fees",
  description: "How a travel eSIM works, who it suits, and what to check before you buy. Compare it with roaming and local SIM cards.",
  alternates: { canonical: "/services/esim" },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ServicePage
      path="/services/esim"
      slot="4444444444"
      eyebrow="Travel eSIM"
      title="Mobile data abroad, without roaming bills"
      intro="A travel eSIM is a data plan you install on your phone before you fly. You land connected — no airport SIM queue, no surprise roaming charges."
      cta={{ label: "See eSIM plans", href: goHref("airalo") }}
      steps={[
        { t: "Check your phone", d: "Your phone must support eSIM and be network-unlocked. Most phones from the last few years do." },
        { t: "Pick a plan", d: "Choose your country or region and a data amount that fits your trip length." },
        { t: "Install and switch on", d: "Scan the QR code on Wi-Fi before you leave, then turn on the plan when you land." },
      ]}
      sections={[
        { h: "eSIM vs roaming vs local SIM", p: "Roaming is the easiest but often the most expensive, and charges vary a lot by carrier and country. A local SIM is usually cheapest per gigabyte but means finding a shop, showing ID and swapping your physical SIM. A travel eSIM sits between the two: you set it up in advance and keep your own number active for calls and texts." },
        { h: "What to check before buying", p: "Confirm your phone is eSIM-compatible and unlocked, make sure the plan covers every country you will visit, and check how long the plan is valid after installation. Data-only plans don't include a phone number, so calls go through apps like WhatsApp." },
        { h: "How much data do you need?", p: "Maps, messaging and email use little data. Video calls, streaming and hotspot sharing use much more. If you are unsure, pick a plan one size larger or one that can be topped up." },
      ]}
      faq={[
        { q: "Will I keep my WhatsApp number?", a: "Yes. Your normal SIM stays active in your phone; the eSIM only provides mobile data. WhatsApp and similar apps keep working with your usual number." },
        { q: "When should I install it?", a: "Install it on Wi-Fi before you leave, then switch the data plan on when you land. Many plans start counting from first use, but check the validity on the plan page." },
        { q: "Can I use my phone as a hotspot?", a: "That depends on the plan. Some allow tethering and some don't, so check the details of the plan you choose." },
        { q: "What if my phone doesn't support eSIM?", a: "Then an eSIM won't work. Check your phone settings or the manufacturer's site, or consider a local SIM or pocket Wi-Fi instead." },
      ]}
    />
  );
}
