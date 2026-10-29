import type { Photo } from "@/components/DestPhoto";
import heroPhotos from "../data/hero-photos.json";

export default function PageHero({
  title,
  photoKey,
  children,
}: {
  title: string;
  photoKey?: keyof typeof heroPhotos;
  children?: React.ReactNode;
}) {
  const p = (photoKey ? (heroPhotos as any)[photoKey] : null) as (Photo & { author?: string; authorUrl?: string; photoUrl?: string }) | null;
  const widths = [640, 960, 1280];
  const buildSrc = (src: string, w: number) => {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${w}&q=70&auto=format&fit=crop&crop=entropy`;
  };
  const srcSet = p ? widths.map((w) => `${buildSrc(p.url, w)} ${w}w`).join(", ") : "";
  const src = p ? buildSrc(p.url, 960) : "";
  return (
    <section className="relative isolate overflow-x-clip bg-ink">
      {p && (
        <img
          src={src}
          srcSet={srcSet}
          sizes="100vw"
          alt={p.alt || ""}
          width={p.width || 1600}
          height={p.height || 900}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundColor: p.color || undefined, objectPosition: "center 35%" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col justify-end px-4 pb-16 pt-12 sm:min-h-[260px] sm:pb-20 sm:pt-16">
        <h1 className="font-display max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
        {children && <div className="mt-4">{children}</div>}
      </div>
      {p && p.author && (
        <a
          href={p.photoUrl || p.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 end-2 z-10 rounded-md bg-black/40 px-2 py-1 text-[10px] text-white/80 backdrop-blur hover:text-white"
          title={`Photo by ${p.author} on Unsplash`}
        >
          {p.author}
        </a>
      )}
    </section>
  );
}
