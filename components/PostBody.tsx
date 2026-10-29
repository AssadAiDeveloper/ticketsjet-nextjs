import type { Block } from "@/lib/blog/types";

function slugifyText(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-tj mt-9">
      {blocks.map((b, i) => {
        if (b.t === "p") return <p key={i}>{b.text}</p>;
        if (b.t === "h2" || b.t === "h3") {
          const id = b.id || slugifyText(b.text);
          const Tag = b.t === "h2" ? "h2" : "h3";
          return <Tag key={i} id={id} className={b.t === "h2" ? "font-display mt-8 text-2xl font-bold text-ink" : "font-display mt-6 text-xl font-bold text-ink"}>{b.text}</Tag>;
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
