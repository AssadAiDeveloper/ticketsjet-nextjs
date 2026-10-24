import { setRequestLocale } from "next-intl/server";
import ServicePage, { serviceMetadata } from "@/components/ServicePage";
import { goHref } from "@/lib/partners";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return serviceMetadata((await params).locale, "comp", "/services/flight-compensation");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePage ns="comp" path="/services/flight-compensation" slot="7777777777" ctaHref={goHref("airhelp")} />;
}
