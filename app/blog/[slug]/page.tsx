import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/config";
import AdSlot from "@/components/AdSlot";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-4 py-14">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readingTime}
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-slate">{post.description}</p>
        <div className="prose-tj mt-9">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <AdSlot slot="6666666666" className="my-10 !px-0" />
        <div className="mt-10 rounded-2xl bg-ink p-7 text-white">
          <h2 className="font-display text-xl font-bold">Ready to put it into practice?</h2>
          <p className="mt-2 text-sm text-white/70">Compare airlines and travel agencies in one search. We add no fees.</p>
          <Link href="/flights" className="mt-5 inline-block rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink hover:bg-amber-deep">
            Search flights →
          </Link>
        </div>
      </article>
    </>
  );
}
