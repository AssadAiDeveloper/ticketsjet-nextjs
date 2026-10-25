import Image from "next/image";

type Photo = {
  id: string;
  url: string;
  blur_hash?: string | null;
  color?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  author?: string;
  authorUrl?: string;
  photoUrl?: string;
};

function loader({ src, width }: { src: string; width: number }) {
  // Unsplash imgix params (WebP/AVIF via auto=format). No Vercel optimization.
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}w=${width}&q=70&auto=format&fit=crop&crop=entropy`;
}

export default function DestPhoto({
  code,
  photo,
  className = "",
  sizes = "100vw",
  priority = false,
  alt,
  locale,
  country,
}: {
  code: string;
  photo?: Photo | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
  locale?: string;
  country?: string;
}) {
  if (!photo || !photo.url) {
    // Fallback: gradient is handled by parent; render nothing.
    return null;
  }
  const altText = alt || photo.alt || code;
  return (
    <Image
      loader={loader}
      src={photo.url}
      alt={altText}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={`object-cover ${className}`}
      style={{ backgroundColor: photo.color || undefined }}
      unoptimized
    />
  );
}

export type { Photo };
