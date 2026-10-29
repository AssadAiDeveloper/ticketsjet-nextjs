import type { PostMeta, PostContent } from "./types";

// Registry of post metadata (one per slug).
import { meta as m1 } from "../../content/posts/how-to-find-cheap-flights/meta";
import { meta as m2 } from "../../content/posts/hotel-booking-mistakes/meta";
import { meta as m3 } from "../../content/posts/car-rental-guide/meta";

export const POST_SLUGS = ["how-to-find-cheap-flights", "hotel-booking-mistakes", "car-rental-guide"] as const;

const METAS: Record<string, PostMeta> = {
  "how-to-find-cheap-flights": m1,
  "hotel-booking-mistakes": m2,
  "car-rental-guide": m3,
};

// Content registry: slug -> locale -> PostContent
import { content as c1_en } from "../../content/posts/how-to-find-cheap-flights/en";

import { content as c2_en } from "../../content/posts/hotel-booking-mistakes/en";

import { content as c3_en } from "../../content/posts/car-rental-guide/en";

const CONTENT: Record<string, Record<string, PostContent>> = {
  "how-to-find-cheap-flights": { en: c1_en },
  "hotel-booking-mistakes": { en: c2_en },
  "car-rental-guide": { en: c3_en },
};

export function allPosts() {
  return Object.values(METAS).sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return METAS[slug];
}

export function getPostContent(slug: string, locale: string): { content: PostContent; locale: string } {
  const map = CONTENT[slug];
  if (!map) return { content: {} as PostContent, locale: "en" };
  if (map[locale]) return { content: map[locale], locale };
  return { content: map.en, locale: "en" };
}

export function localesForPost(slug: string): string[] {
  const map = CONTENT[slug];
  return map ? Object.keys(map) : ["en"];
}
