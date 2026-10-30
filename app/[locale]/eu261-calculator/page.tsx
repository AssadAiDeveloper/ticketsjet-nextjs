import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Eu261Calculator from "@/components/Eu261Calculator";
import { eu261Content } from "@/lib/eu261";
import { alternatesFor } from "@/lib/i18nPages";
import { robotsFor } from "@/lib/seo";
import { goHref } from "@/lib/partners";
import { SITE } from "@/lib/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = eu261Content(locale);
  return { title: c.title, description: c.description, alternates: alternatesFor(locale, "/eu261-calculator"), robots: robotsFor(locale) };
}

export default async function Eu261Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = eu261Content(locale);
  const { t } = c;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.h1,
    description: c.description,
    url: `${SITE.url}${prefix}/eu261-calculator`,
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    inLanguage: locale,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{c.kicker}</p>
          <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{c.h1}</h1>
          <p className="mt-4 text-lg leading-relaxed text-white/80">{c.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Eu261Calculator content={c} locale={locale} claimHref={goHref("airhelp")} />
        <p className="mt-6 text-xs leading-relaxed text-slate">{t.disclaimer}</p>
        <p className="mt-2 text-xs text-slate">
          <Link href="/affiliate-disclosure" className="underline">{t.affiliate}</Link>
        </p>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{t.howTitle}</h2>
          <div className="mt-6 space-y-6">
            {c.how.map((s) => (
              <div key={s.h}>
                <h3 className="font-display text-lg font-bold text-ink">{s.h}</h3>
                <p className="mt-2 leading-relaxed text-slate">{s.p}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display mt-12 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{t.faqTitle}</h2>
          <div className="mt-6 divide-y divide-mist overflow-hidden rounded-2xl border border-mist bg-white">
            {c.faq.map((f) => (
              <details key={f.q} className="faq group">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 font-medium text-ink hover:bg-cloud">
                  <span>{f.q}</span>
                  <svg className="faq-chevron h-4 w-4 shrink-0 text-slate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>

          <h2 className="font-display mt-12 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{t.relatedTitle}</h2>
          <ul className="mt-4 space-y-2 text-amber-deep">
            <li><Link href="/blog/flight-delay-compensation-eu261" className="underline">{t.relArticle}</Link></li>
            <li><Link href="/services/flight-compensation" className="underline">{t.relService}</Link></li>
            <li><Link href="/help" className="underline">{t.relHelp}</Link></li>
            <li><Link href="/contact" className="underline">{t.contact}</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
