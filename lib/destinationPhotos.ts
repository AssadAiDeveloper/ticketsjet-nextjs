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

export function allPhotos(): Record<string, DestinationPhoto> {
  return data;
}
