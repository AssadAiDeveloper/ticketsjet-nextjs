import type { PostMeta, PostContent } from "./types";

// Registry of post metadata (one per slug).
import { meta as m1 } from "../../content/posts/how-to-find-cheap-flights/meta";
import { meta as m2 } from "../../content/posts/hotel-booking-mistakes/meta";
import { meta as m3 } from "../../content/posts/car-rental-guide/meta";
import { meta as m4 } from "../../content/posts/flight-delay-compensation-eu261/meta";
import { meta as m5 } from "../../content/posts/esim-vs-local-sim-vs-roaming/meta";
import { meta as m6 } from "../../content/posts/schiphol-airport-guide/meta";

export const POST_SLUGS = ["how-to-find-cheap-flights", "hotel-booking-mistakes", "car-rental-guide", "flight-delay-compensation-eu261", "esim-vs-local-sim-vs-roaming", "schiphol-airport-guide"] as const;

const METAS: Record<string, PostMeta> = {
  "how-to-find-cheap-flights": m1,
  "hotel-booking-mistakes": m2,
  "car-rental-guide": m3,
  "flight-delay-compensation-eu261": m4,
  "esim-vs-local-sim-vs-roaming": m5,
  "schiphol-airport-guide": m6,
};

// Content registry: slug -> locale -> PostContent
import { content as c1_en } from "../../content/posts/how-to-find-cheap-flights/en";

import { content as c2_en } from "../../content/posts/hotel-booking-mistakes/en";

import { content as c3_en } from "../../content/posts/car-rental-guide/en";

import { content as c4_en } from "../../content/posts/flight-delay-compensation-eu261/en";

import { content as c5_en } from "../../content/posts/esim-vs-local-sim-vs-roaming/en";

import { content as c6_en } from "../../content/posts/schiphol-airport-guide/en";

const CONTENT: Record<string, Record<string, PostContent>> = {
  "how-to-find-cheap-flights": { en: c1_en },
  "hotel-booking-mistakes": { en: c2_en },
  "car-rental-guide": { en: c3_en },
  "flight-delay-compensation-eu261": { en: c4_en },
  "esim-vs-local-sim-vs-roaming": { en: c5_en },
  "schiphol-airport-guide": { en: c6_en },
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
