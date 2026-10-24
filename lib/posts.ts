// Post copy (title, description, paragraphs) lives in messages under "post.<slug>.*"; this file holds only structure.
export type Post = { slug: string; date: string; minutes: number; paragraphs: number };

export const posts: Post[] = [
  { slug: "how-to-find-cheap-flights", date: "2026-07-01", minutes: 6, paragraphs: 4 },
  { slug: "hotel-booking-mistakes", date: "2026-06-24", minutes: 5, paragraphs: 4 },
  { slug: "car-rental-guide", date: "2026-06-15", minutes: 5, paragraphs: 4 },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
