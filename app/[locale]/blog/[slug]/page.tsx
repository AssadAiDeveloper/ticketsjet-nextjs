import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/config";
import AdSlot from "@/components/AdSlot";
import { alternatesFor } from "@/lib/i18nPages";
import { fullDate } from "@/lib/format";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const tp = await getTranslations({ locale, namespace: "post" });
  const title = tp(`${slug}.title`);
  const description = tp(`${slug}.desc`);
  return {
    title,
    description,
    alternates: alternatesFor(locale, `/blog/${post.slug}`),
    openGraph: { type: "article", title, description, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tp = await getTranslations("post");
  const title = tp(`${slug}.title`);
  const description = tp(`${slug}.desc`);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}${prefix}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-4 py-14">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
          {fullDate(post.date, locale)} · {t("minutes", { n: post.minutes })}
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate">{description}</p>
        <div className="prose-tj mt-9">
          {Array.from({ length: post.paragraphs }, (_, i) => (
            <p key={i}>{tp(`${slug}.p${i + 1}`)}</p>
          ))}
        </div>
        <AdSlot slot="6666666666" className="my-10 !px-0" />
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
