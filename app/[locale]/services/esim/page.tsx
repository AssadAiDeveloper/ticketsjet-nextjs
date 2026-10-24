import { setRequestLocale } from "next-intl/server";
import ServicePage, { serviceMetadata } from "@/components/ServicePage";
import { goHref } from "@/lib/partners";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return serviceMetadata((await params).locale, "esim", "/services/esim");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePage ns="esim" path="/services/esim" slot="4444444444" ctaHref={goHref("airalo")} />;
}
