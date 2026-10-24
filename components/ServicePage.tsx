import Link from "next/link";
import Faq, { type QA } from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/config";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: { label: string; href: string };
  steps: { t: string; d: string }[];
  sections: { h: string; p: string }[];
  faq: QA[];
  path: string;
  slot: string;
};

export default function ServicePage({ eyebrow, title, intro, cta, steps, sections, faq, path, slot }: Props) {
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
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: eyebrow, item: `${SITE.url}${path}` },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{eyebrow}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-white/70">{intro}</p>
          <a href={cta.href} target="_blank" rel="sponsored nofollow noopener" className="mt-6 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:brightness-95">
            {cta.label}
          </a>
          <p className="mt-3 text-xs text-white/50">Opens the provider&apos;s site. Affiliate link — it costs you nothing extra.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">How it works</h2>
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
          <AdSlot slot={slot} />
        </div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">Questions</h2>
          <Faq items={faq} />
        </section>

        <p className="mt-10 text-sm text-slate">
          Looking for flights? <Link href="/flights" className="font-medium text-ink underline">Search flights</Link> or browse{" "}
          <Link href="/cheap-flights" className="font-medium text-ink underline">flights by route</Link>.
        </p>
      </div>
    </>
  );
}
