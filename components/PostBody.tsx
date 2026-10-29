import type { Block } from "@/lib/blog/types";

function slugifyText(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  const h2s = blocks.filter((b) => b.t === "h2");
  const showToc = h2s.length >= 3;
  return (
    <div className="prose-tj mt-9">
      {showToc && (
        <nav className="mb-8 rounded-2xl border border-mist bg-cloud p-5">
          <p className="font-display text-sm font-bold text-ink">In this article</p>
          <ul className="mt-2 space-y-1 text-sm">
            {h2s.map((b, i) => {
              const bb = b as { t: "h2"; text: string; id?: string };
              const id = bb.id || slugifyText(bb.text);
              return (
                <li key={i}>
                  <a href={`#${id}`} className="text-slate hover:text-amber-deep">{bb.text}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      {blocks.map((b, i) => {
        if (b.t === "p") return <p key={i}>{b.text}</p>;
        if (b.t === "h2" || b.t === "h3") {
          const bb = b as { t: "h2" | "h3"; text: string; id?: string };
          const id = bb.id || slugifyText(bb.text);
          const Tag = bb.t === "h2" ? "h2" : "h3";
          return <Tag key={i} id={id} className={bb.t === "h2" ? "font-display mt-8 text-2xl font-bold text-ink" : "font-display mt-6 text-xl font-bold text-ink"}>{bb.text}</Tag>;
        }
        if (b.t === "ul" || b.t === "ol") {
          const Tag = b.t === "ul" ? "ul" : "ol";
          return (
            <Tag key={i} className="ms-6 list-disc space-y-1">
              {b.items.map((it, j) => <li key={j}>{it}</li>)}
            </Tag>
          );
        }
        if (b.t === "table") {
          return (
            <div key={i} className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {b.head.map((h, j) => <th key={j} className="border border-mist bg-cloud px-3 py-2 text-start font-semibold text-ink">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => <td key={c} className="border border-mist px-3 py-2 text-slate">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (b.t === "callout") {
          return (
            <div key={i} className="my-6 rounded-2xl border border-amber/30 bg-amber/10 p-5">
              {b.title && <p className="font-display text-lg font-bold text-ink">{b.title}</p>}
              <p className="mt-2 text-sm leading-relaxed text-slate">{b.text}</p>
            </div>
          );
        }
        if (b.t === "image") {
          return (
            <figure key={i} className="my-6">
              <img src={b.src} alt={b.alt} loading="lazy" className="w-full rounded-2xl" />
              {b.caption && <figcaption className="mt-2 text-xs text-slate">{b.caption}</figcaption>}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
