import photos from "../data/destination-photos.json";

export type DestinationPhoto = {
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
  downloadLocation?: string;
};

const data = photos as Record<string, DestinationPhoto>;

export function getPhoto(code: string): DestinationPhoto | null {
  return data[code.toUpperCase()] || null;
}

/** Build a sized Unsplash URL (keeps existing query params, sets w/h/fit/q/auto). */
export function unsplashSized(url: string, w: number, h?: number): string {
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(w));
    if (h) u.searchParams.set("h", String(h));
    u.searchParams.set("fit", "crop");
    u.searchParams.set("q", "80");
    u.searchParams.set("auto", "format");
    return u.toString();
  } catch {
    const sep = url.includes("?") ? "&" : "?";
    let out = `${url}${sep}w=${w}`;
    if (h) out += `&h=${h}`;
    out += "&fit=crop&q=80&auto=format";
    return out;
  }
}

export function allPhotos(): Record<string, DestinationPhoto> {
  return data;
}
