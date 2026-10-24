import { setRequestLocale } from "next-intl/server";
import ServicePage, { serviceMetadata } from "@/components/ServicePage";
import { goHref } from "@/lib/partners";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return serviceMetadata((await params).locale, "tr", "/services/airport-transfers");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePage ns="tr" path="/services/airport-transfers" slot="5555555555" ctaHref={goHref("kiwitaxi")} />;
}
