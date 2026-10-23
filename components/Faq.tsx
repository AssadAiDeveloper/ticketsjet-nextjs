export type QA = { q: string; a: string };

export default function Faq({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-mist overflow-hidden rounded-2xl border border-mist bg-white">
      {items.map((item) => (
        <details key={item.q} className="faq group">
          <summary className="flex items-center justify-between gap-4 px-5 py-4 font-medium text-ink hover:bg-cloud">
            <span>{item.q}</span>
            <svg className="faq-chevron h-4 w-4 shrink-0 text-slate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
