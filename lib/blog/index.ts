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
import { content as c2_ar } from "../../content/posts/hotel-booking-mistakes/ar";
import { content as c2_nl } from "../../content/posts/hotel-booking-mistakes/nl";
import { content as c2_es } from "../../content/posts/hotel-booking-mistakes/es";
import { content as c2_fr } from "../../content/posts/hotel-booking-mistakes/fr";
import { content as c2_de } from "../../content/posts/hotel-booking-mistakes/de";
import { content as c2_it } from "../../content/posts/hotel-booking-mistakes/it";
import { content as c2_pt } from "../../content/posts/hotel-booking-mistakes/pt";
import { content as c2_tr } from "../../content/posts/hotel-booking-mistakes/tr";
import { content as c2_ru } from "../../content/posts/hotel-booking-mistakes/ru";
import { content as c2_pl } from "../../content/posts/hotel-booking-mistakes/pl";
import { content as c2_fa } from "../../content/posts/hotel-booking-mistakes/fa";
import { content as c2_he } from "../../content/posts/hotel-booking-mistakes/he";

import { content as c3_en } from "../../content/posts/car-rental-guide/en";
import { content as c3_ar } from "../../content/posts/car-rental-guide/ar";
import { content as c3_nl } from "../../content/posts/car-rental-guide/nl";
import { content as c3_es } from "../../content/posts/car-rental-guide/es";
import { content as c3_fr } from "../../content/posts/car-rental-guide/fr";
import { content as c3_de } from "../../content/posts/car-rental-guide/de";
import { content as c3_it } from "../../content/posts/car-rental-guide/it";
import { content as c3_pt } from "../../content/posts/car-rental-guide/pt";
import { content as c3_tr } from "../../content/posts/car-rental-guide/tr";
import { content as c3_ru } from "../../content/posts/car-rental-guide/ru";
import { content as c3_pl } from "../../content/posts/car-rental-guide/pl";
import { content as c3_fa } from "../../content/posts/car-rental-guide/fa";
import { content as c3_he } from "../../content/posts/car-rental-guide/he";

const CONTENT: Record<string, Record<string, PostContent>> = {
  "how-to-find-cheap-flights": { en: c1_en },
  "hotel-booking-mistakes": { en: c2_en, ar: c2_ar, nl: c2_nl, es: c2_es, fr: c2_fr, de: c2_de, it: c2_it, pt: c2_pt, tr: c2_tr, ru: c2_ru, pl: c2_pl, fa: c2_fa, he: c2_he },
  "car-rental-guide": { en: c3_en, ar: c3_ar, nl: c3_nl, es: c3_es, fr: c3_fr, de: c3_de, it: c3_it, pt: c3_pt, tr: c3_tr, ru: c3_ru, pl: c3_pl, fa: c3_fa, he: c3_he },
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
