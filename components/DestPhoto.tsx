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

function buildSrc(src: string, w: number) {
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}w=${w}&q=70&auto=format&fit=crop&crop=entropy`;
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
  if (!photo || !photo.url) return null;
  const altText = alt || photo.alt || code;
  const widths = [400, 640, 960];
  const srcSet = widths.map((w) => `${buildSrc(photo.url, w)} ${w}w`).join(", ");
  const src = buildSrc(photo.url, 640);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={altText}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      width={photo.width || 1600}
      height={photo.height || 900}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ backgroundColor: photo.color || undefined }}
      decoding="async"
    />
  );
}

export type { Photo };
