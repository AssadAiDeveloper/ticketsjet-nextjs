import type { PostMeta, PostContent } from "./types";

// Registry of post metadata (one per slug).
import { meta as m1 } from "../../content/posts/how-to-find-cheap-flights/meta";
import { meta as m2 } from "../../content/posts/hotel-booking-mistakes/meta";
import { meta as m3 } from "../../content/posts/car-rental-guide/meta";
import { meta as m4 } from "../../content/posts/flight-delay-compensation-eu261/meta";
import { meta as m5 } from "../../content/posts/esim-vs-local-sim-vs-roaming/meta";
import { meta as m6 } from "../../content/posts/schiphol-airport-guide/meta";
import { meta as m7 } from "../../content/posts/baggage-fees-cabin-bag-guide/meta";
import { meta as m8 } from "../../content/posts/train-vs-flight-europe/meta";
import { meta as m9 } from "../../content/posts/multi-city-open-jaw-flights/meta";
import { meta as m10 } from "../../content/posts/first-hour-after-landing/meta";

export const POST_SLUGS = ["how-to-find-cheap-flights", "hotel-booking-mistakes", "car-rental-guide", "flight-delay-compensation-eu261", "esim-vs-local-sim-vs-roaming", "schiphol-airport-guide", "baggage-fees-cabin-bag-guide", "train-vs-flight-europe", "multi-city-open-jaw-flights", "first-hour-after-landing"] as const;

export const HOME_SLUGS = ["how-to-find-cheap-flights", "baggage-fees-cabin-bag-guide", "flight-delay-compensation-eu261"] as const;

const METAS: Record<string, PostMeta> = {
  "how-to-find-cheap-flights": m1,
  "hotel-booking-mistakes": m2,
  "car-rental-guide": m3,
  "flight-delay-compensation-eu261": m4,
  "esim-vs-local-sim-vs-roaming": m5,
  "schiphol-airport-guide": m6,
  "baggage-fees-cabin-bag-guide": m7,
  "train-vs-flight-europe": m8,
  "multi-city-open-jaw-flights": m9,
  "first-hour-after-landing": m10,
};

// Content registry: slug -> locale -> PostContent
import { content as c1_en } from "../../content/posts/how-to-find-cheap-flights/en";
import { content as c1_ar } from "../../content/posts/how-to-find-cheap-flights/ar";
import { content as c1_nl } from "../../content/posts/how-to-find-cheap-flights/nl";

import { content as c2_en } from "../../content/posts/hotel-booking-mistakes/en";
import { content as c2_ar } from "../../content/posts/hotel-booking-mistakes/ar";
import { content as c2_nl } from "../../content/posts/hotel-booking-mistakes/nl";

import { content as c3_en } from "../../content/posts/car-rental-guide/en";
import { content as c3_ar } from "../../content/posts/car-rental-guide/ar";
import { content as c3_nl } from "../../content/posts/car-rental-guide/nl";

import { content as c4_en } from "../../content/posts/flight-delay-compensation-eu261/en";
import { content as c4_ar } from "../../content/posts/flight-delay-compensation-eu261/ar";
import { content as c4_nl } from "../../content/posts/flight-delay-compensation-eu261/nl";

import { content as c5_en } from "../../content/posts/esim-vs-local-sim-vs-roaming/en";
import { content as c5_ar } from "../../content/posts/esim-vs-local-sim-vs-roaming/ar";
import { content as c5_nl } from "../../content/posts/esim-vs-local-sim-vs-roaming/nl";

import { content as c6_en } from "../../content/posts/schiphol-airport-guide/en";
import { content as c6_ar } from "../../content/posts/schiphol-airport-guide/ar";
import { content as c6_nl } from "../../content/posts/schiphol-airport-guide/nl";

import { content as c7_en } from "../../content/posts/baggage-fees-cabin-bag-guide/en";
import { content as c7_ar } from "../../content/posts/baggage-fees-cabin-bag-guide/ar";
import { content as c7_nl } from "../../content/posts/baggage-fees-cabin-bag-guide/nl";

import { content as c8_en } from "../../content/posts/train-vs-flight-europe/en";
import { content as c8_ar } from "../../content/posts/train-vs-flight-europe/ar";
import { content as c8_nl } from "../../content/posts/train-vs-flight-europe/nl";

import { content as c9_en } from "../../content/posts/multi-city-open-jaw-flights/en";
import { content as c9_ar } from "../../content/posts/multi-city-open-jaw-flights/ar";
import { content as c9_nl } from "../../content/posts/multi-city-open-jaw-flights/nl";

import { content as c10_en } from "../../content/posts/first-hour-after-landing/en";
import { content as c10_ar } from "../../content/posts/first-hour-after-landing/ar";
import { content as c10_nl } from "../../content/posts/first-hour-after-landing/nl";

const CONTENT: Record<string, Record<string, PostContent>> = {
  "how-to-find-cheap-flights": { en: c1_en, ar: c1_ar, nl: c1_nl },
  "hotel-booking-mistakes": { en: c2_en, ar: c2_ar, nl: c2_nl },
  "car-rental-guide": { en: c3_en, ar: c3_ar, nl: c3_nl },
  "flight-delay-compensation-eu261": { en: c4_en, ar: c4_ar, nl: c4_nl },
  "esim-vs-local-sim-vs-roaming": { en: c5_en, ar: c5_ar, nl: c5_nl },
  "schiphol-airport-guide": { en: c6_en, ar: c6_ar, nl: c6_nl },
  "baggage-fees-cabin-bag-guide": { en: c7_en, ar: c7_ar, nl: c7_nl },
  "train-vs-flight-europe": { en: c8_en, ar: c8_ar, nl: c8_nl },
  "multi-city-open-jaw-flights": { en: c9_en, ar: c9_ar, nl: c9_nl },
  "first-hour-after-landing": { en: c10_en, ar: c10_ar, nl: c10_nl },
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
