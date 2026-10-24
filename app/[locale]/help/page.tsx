import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Faq from "@/components/Faq";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/help") };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("help");
  const faq = Array.from({ length: 10 }, (_, i) => ({ q: t(`q${i + 1}`), a: t(`a${i + 1}`) }));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">
            {t("h1")}
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <Faq items={faq} />
        <p className="mt-8 text-sm text-slate">
          {t("booked")}
        </p>
      </section>
    </>
  );
}
