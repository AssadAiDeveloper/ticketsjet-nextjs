import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import RedirectScreen from "@/components/RedirectScreen";

export const metadata: Metadata = {
  title: "TicketsJet",
  robots: { index: false, follow: false },
};

export default async function RedirectingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RedirectScreen />;
}
