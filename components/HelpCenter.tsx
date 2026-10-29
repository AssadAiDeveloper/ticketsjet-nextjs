"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { HelpContent } from "@/lib/help/types";

export default function HelpCenter({ content }: { content: HelpContent }) {
  const { ui, cats, items } = content;
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => (cat === "all" || i.c === cat) && (!q || i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)));
  }, [items, query, cat]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-amber bg-amber text-ink" : "border-mist bg-white text-slate hover:border-amber"}`;

  return (
    <div>
      <div className="relative">
        <svg className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.search}
          aria-label={ui.search}
          className="w-full rounded-full border border-mist bg-white py-3.5 pe-4 ps-12 text-ink shadow-sm outline-none focus:border-amber"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className={chip(cat === "all")} onClick={() => setCat("all")}>{ui.all}</button>
        {cats.map((c) => (
          <button key={c.id} type="button" className={chip(cat === c.id)} onClick={() => setCat(c.id)}>{c.title}</button>
        ))}
      </div>

      {query.trim() && <p className="mt-4 text-sm text-slate" aria-live="polite">{shown.length} {ui.results}</p>}

      <div className="mt-6 space-y-8">
        {shown.length === 0 && <p className="rounded-2xl border border-mist bg-white p-6 text-slate">{ui.none}</p>}
        {cats.map((c) => {
          const list = shown.filter((i) => i.c === c.id);
          if (!list.length) return null;
          return (
            <section key={c.id} aria-labelledby={`hc-${c.id}`}>
              <h2 id={`hc-${c.id}`} className="font-display mb-3 text-xl font-bold text-ink">{c.title}</h2>
              <div className="divide-y divide-mist overflow-hidden rounded-2xl border border-mist bg-white">
                {list.map((item) => (
                  <details key={item.q} className="faq group">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 font-medium text-ink hover:bg-cloud">
                      <span>{item.q}</span>
                      <svg className="faq-chevron h-4 w-4 shrink-0 text-slate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-slate">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-mist bg-cloud p-6">
        <h2 className="font-display text-lg font-bold text-ink">{ui.stillTitle}</h2>
        <p className="mt-1 text-sm text-slate">{ui.stillText}</p>
        <Link href="/about-us" className="mt-4 inline-flex rounded-full bg-amber px-5 py-2 text-sm font-semibold text-ink hover:opacity-90">{ui.contactLink}</Link>
      </div>
    </div>
  );
}
