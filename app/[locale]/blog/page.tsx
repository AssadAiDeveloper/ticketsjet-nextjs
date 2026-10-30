import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { allPosts, getPostContent } from "@/lib/blog";
import { SITE } from "@/lib/config";
import { getPhoto } from "@/lib/destinationPhotos";
import { alternatesFor } from "@/lib/i18nPages";
import { fullDate } from "@/lib/format";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/blog") };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const th = await getTranslations("home");
  const posts = allPosts();
  const items = posts.map((p) => ({ meta: p, content: getPostContent(p.slug, locale).content }));
  const prefix = locale === "en" ? "" : `/${locale}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: t("h1"), item: `${SITE.url}${prefix}/blog` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">
            {t("h1")}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            {t("lead")}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <p className="text-sm text-slate">
          <Link href="/eu261-calculator" className="font-semibold text-amber-deep underline">{th("eu261Title")}</Link>
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ meta, content }) => {
            const photo = meta.heroPhoto ? getPhoto(meta.heroPhoto) : null;
            return (
            <Link key={meta.slug} href={`/blog/${meta.slug}`} className="group flex flex-col rounded-2xl border border-mist bg-white p-6 transition hover:border-amber hover:shadow-lg">
              {photo && photo.url && (
                <div className="mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-cloud">
                  <img src={`${photo.url}?w=400&q=60&auto=format&fit=crop`} alt={photo.alt || content.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
                {fullDate(meta.published, locale)} · {t("minutes", { n: meta.minutes })}
              </p>
              <h2 className="font-display mt-2 text-lg font-bold leading-snug text-ink group-hover:text-amber-deep">{content.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{content.description}</p>
              <p className="mt-4 text-sm font-semibold text-amber-deep">{t("read")}</p>
            </Link>
          );
          })}
        </div>
      </section>
    </>
  );
}
