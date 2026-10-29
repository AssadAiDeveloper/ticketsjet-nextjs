import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getPostMeta, getPostContent, localesForPost } from "@/lib/blog";
import { SITE, AUTHOR } from "@/lib/config";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import PostBody from "@/components/PostBody";
import { alternatesFor } from "@/lib/i18nPages";
import { fullDate } from "@/lib/format";
import { isIndexed } from "@/lib/seo";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = ["how-to-find-cheap-flights", "hotel-booking-mistakes", "car-rental-guide"];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return {};
  const { content, locale: actualLocale } = getPostContent(slug, locale);
  const title = content.title;
  const description = content.description;
  const isFallback = actualLocale !== locale;
  const locs = localesForPost(slug);
  const languages = Object.fromEntries(locs.map((l) => [l, l === "en" ? `/blog/${slug}` : `/${l}/blog/${slug}`]));
  languages["x-default"] = `/blog/${slug}`;
  return {
    title,
    description,
    alternates: isFallback
      ? { canonical: `/${actualLocale === "en" ? "" : actualLocale + "/"}blog/${slug}`.replace("//", "/"), languages }
      : { canonical: `/${locale === "en" ? "" : locale + "/"}blog/${slug}`.replace("//", "/"), languages },
    robots: isFallback ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title, description, publishedTime: meta.published, modifiedTime: meta.updated ?? meta.published },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const meta = getPostMeta(slug);
  if (!meta) notFound();

  const { content, locale: actualLocale } = getPostContent(slug, locale);
  const t = await getTranslations("blog");
  const title = content.title;
  const description = content.description;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalPrefix = actualLocale === "en" ? "" : `/${actualLocale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: actualLocale,
    datePublished: meta.published,
    dateModified: meta.updated ?? meta.published,
    author: { "@type": "Person", name: AUTHOR.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}${canonicalPrefix}/blog/${slug}`,
    ...(meta.image ? { image: meta.image.src } : {}),
  };
  const faqLd = content.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  const relatedSlugs = meta.related && meta.related.length ? meta.related : (await import("@/lib/blog")).allPosts().filter((p) => p.slug !== slug).slice(0, 2).map((p) => p.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <article className="mx-auto max-w-3xl px-4 py-14">
        {meta.image && (
          <img src={meta.image.src} alt={meta.image.alt} width={1200} height={630} className="mb-6 w-full rounded-2xl" loading="eager" />
        )}
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
          {fullDate(meta.published, locale)}
          {meta.updated && ` · ${t("updated", { date: fullDate(meta.updated, locale) })}`}
          {" · "}
          {t("minutes", { n: meta.minutes })}
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate">{description}</p>
        <PostBody blocks={content.blocks} />
        {content.faq && content.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-ink">{t("faqTitle")}</h2>
            <div className="mt-4"><Faq items={content.faq.map((f) => ({ q: f.q, a: f.a }))} /></div>
          </section>
        )}
        <AdSlot slot="6666666666" className="my-10 !px-0" />
        <div className="mt-10 rounded-2xl bg-cloud p-6">
          <p className="font-display text-lg font-bold text-ink">{t("authorName", { name: AUTHOR.name })}</p>
          <p className="mt-1 text-sm text-slate">{AUTHOR.bio}</p>
          <p className="mt-2 text-xs text-slate">{AUTHOR.role}</p>
        </div>
        <p className="mt-6 text-xs text-slate">
          {t("affiliateLine")}{" "}
          <Link href="/affiliate-disclosure" className="font-semibold text-amber-deep underline">{t("affiliateLink")}</Link>
        </p>
        {relatedSlugs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-ink">{t("relatedTitle")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedSlugs.map((rs) => {
                const rm = getPostMeta(rs);
                if (!rm) return null;
                const rc = getPostContent(rs, locale).content;
                return (
                  <Link key={rs} href={`/blog/${rs}`} className="group rounded-2xl border border-mist bg-white p-5 transition hover:border-amber">
                    <p className="font-display text-base font-bold text-ink group-hover:text-amber-deep">{rc.title}</p>
                    <p className="mt-2 text-xs text-slate">{rc.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        <div className="mt-10 rounded-2xl bg-ink p-7 text-white">
          <h2 className="font-display text-xl font-bold">{t("ctaTitle")}</h2>
          <p className="mt-2 text-sm text-white/70">{t("ctaText")}</p>
          <Link href="/flights" className="mt-5 inline-block rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink hover:bg-amber-deep">
            {t("ctaBtn")}
          </Link>
        </div>
      </article>
    </>
  );
}
