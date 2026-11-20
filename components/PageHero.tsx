import Image from "next/image";
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
  return (
    <section className="relative z-20 isolate overflow-x-clip bg-ink">
      {p && (
        <Image
          src={`${p.url}?w=1600&q=80&auto=format&fit=crop&crop=entropy`}
          alt={p.alt || ""}
          fill
          priority
          fetchPriority="high"
          decoding="sync"
          sizes="(min-width: 768px) 100vw, 50vw"
          quality={70}
          className="object-cover"
          style={{ backgroundColor: p.color || undefined, objectPosition: "center 35%" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col justify-end px-4 pb-16 pt-12 sm:min-h-[260px] sm:pb-20 sm:pt-16">
        <h1 className="font-display max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </section>
  );
}
