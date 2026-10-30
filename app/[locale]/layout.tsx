import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/i18nPages";
import { robotsFor } from "@/lib/seo";
import UntranslatedGuard from "@/components/UntranslatedGuard";
import { LOCALES, isLocale } from "@/i18n/routing";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import HtmlLang from "@/components/HtmlLang";
import AdSenseLoader from "@/components/AdSenseLoader";
import CookieConsent from "@/components/CookieConsent";
import PartnerRedirect from "@/components/PartnerRedirect";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/config";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = `${SITE.name} - ${t("tagline")}`;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s - ${SITE.name}` },
    description: t("description"),
    keywords: ["cheap flights", "flight comparison", "hotel deals", "car rental", "travel search engine"],
    alternates: alternatesFor(locale, "/"),
    openGraph: { type: "website", siteName: SITE.name, title, description: t("description"), locale: locale === "ar" ? "ar_AR" : locale === "nl" ? "nl_NL" : "en_US" },
    other: { "google-adsense-account": "ca-pub-6572349186702622" },
    twitter: { card: "summary_large_image", title, description: t("description") },
    robots: robotsFor(locale) ?? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  logo: `${SITE.url}/icon.svg`,
  description: SITE.description,
  sameAs: ["https://www.facebook.com/profile.php?id=61565939300853", "https://www.instagram.com/ticketsjet/", "https://www.linkedin.com/company/ticketsjet/"],
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE.email },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === "ar" || locale === "fa" || locale === "he" ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </head>
      <body suppressHydrationWarning>
        <HtmlLang locale={locale} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CurrencyProvider>
            <AdSenseLoader />
            <Header />
            <main><UntranslatedGuard>{children}</UntranslatedGuard></main>
            <Footer />
            <CookieConsent />
            <PartnerRedirect />
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
