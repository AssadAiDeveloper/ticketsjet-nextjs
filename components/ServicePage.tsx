import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Faq from "@/components/Faq";

import { SITE } from "@/lib/config";
import { alternatesFor } from "@/lib/i18nPages";
import { robotsFor } from "@/lib/seo";

type Ns = "esim" | "tr" | "comp";

/** Shared metadata for the service pages (copy lives in messages under the same namespace). */
export async function serviceMetadata(locale: string, ns: Ns, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: ns });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, path), robots: robotsFor(locale) };
}

/** Server component: every string comes from messages[ns] (eyebrow, title, intro, cta, s1-3, h/p 1-3, q/a 1-4). */
export default async function ServicePage({ ns, ctaHref, path, slot, qualifyHref }: { ns: Ns; ctaHref: string; path: string; slot: string; qualifyHref?: string }) {
  const locale = await getLocale();
  const t = await getTranslations(ns);
  const c = await getTranslations("svc");
  const nav = await getTranslations("flights");
  const steps = [1, 2, 3].map((i) => ({ t: t(`s${i}t`), d: t(`s${i}d`) }));
  const sections = [1, 2, 3].map((i) => ({ h: t(`h${i}`), p: t(`p${i}`) }));
  const faq = [1, 2, 3, 4].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  const prefix = locale === "en" ? "" : `/${locale}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: nav("home"), item: `${SITE.url}${prefix}` },
        { "@type": "ListItem", position: 2, name: c("crumb"), item: `${SITE.url}${prefix}/services` },
        { "@type": "ListItem", position: 3, name: t("eyebrow"), item: `${SITE.url}${prefix}${path}` },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 max-w-xl text-white/70">{t("intro")}</p>
          <a href={ctaHref} target="_blank" rel="sponsored nofollow noopener" className="mt-6 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:brightness-95">
            {t("cta")}
          </a>
          <p className="mt-3 text-xs text-white/50">{c("disclosure")}</p>
          {qualifyHref && (
            <p className="mt-4 text-sm">
              <a href={qualifyHref} className="font-semibold text-amber underline">Check if you qualify</a>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">{c("how")}</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-mist bg-white p-5">
                <span className="font-mono text-xs text-amber">0{i + 1}</span>
                <h3 className="mt-2 font-semibold text-ink">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 max-w-3xl space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-bold text-ink">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-slate">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="my-10">

        </div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">{(await getTranslations("route"))("questions")}</h2>
          <Faq items={faq} />
        </section>

        <p className="mt-10 text-sm text-slate">
          {c("lookingFlights")} <Link href="/flights" className="font-medium text-ink underline">{c("searchFlights")}</Link> {c("or")}{" "}
          <Link href="/cheap-flights" className="font-medium text-ink underline">{c("byRoute")}</Link>.
        </p>
      </div>
    </>
  );
}
