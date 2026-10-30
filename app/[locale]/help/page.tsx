import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HelpCenter from "@/components/HelpCenter";
import { helpContent } from "@/lib/help";
import { alternatesFor } from "@/lib/i18nPages";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/help") };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("help");
  const th = await getTranslations("home");
  const content = helpContent(locale);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">{t("h1")}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <HelpCenter content={content} />
        <p className="mt-8 text-sm text-slate">{t("booked")}</p>
        <p className="mt-4 text-sm">
          <Link href="/eu261-calculator" className="font-semibold text-amber-deep underline">{th("eu261Title")}</Link>
        </p>
      </section>
    </>
  );
}
