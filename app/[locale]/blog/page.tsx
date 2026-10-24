import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Travel Guides & Tips — The TicketsJet Blog",
  description: "Practical guides on finding cheap flights, booking smarter stays and renting cars without surprises.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Blog</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white">
            Travel smarter, spend less
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Practical, no-nonsense guides from the TicketsJet team.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-mist bg-white p-6 transition hover:border-amber hover:shadow-lg">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
                {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readingTime}
              </p>
              <h2 className="font-display mt-2 text-lg font-bold leading-snug text-ink group-hover:text-amber-deep">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{p.description}</p>
              <p className="mt-4 text-sm font-semibold text-amber-deep">Read guide →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
