import type { PostContent } from "./blog/types";

import { content as amsterdam_en } from "../content/destinations/amsterdam/en";
import { content as amsterdam_nl } from "../content/destinations/amsterdam/nl";
import { content as amsterdam_ar } from "../content/destinations/amsterdam/ar";
import { content as london_en } from "../content/destinations/london/en";
import { content as london_nl } from "../content/destinations/london/nl";
import { content as london_ar } from "../content/destinations/london/ar";
import { content as paris_en } from "../content/destinations/paris/en";
import { content as paris_nl } from "../content/destinations/paris/nl";
import { content as paris_ar } from "../content/destinations/paris/ar";
import { content as barcelona_en } from "../content/destinations/barcelona/en";
import { content as barcelona_nl } from "../content/destinations/barcelona/nl";
import { content as barcelona_ar } from "../content/destinations/barcelona/ar";
import { content as madrid_en } from "../content/destinations/madrid/en";
import { content as madrid_nl } from "../content/destinations/madrid/nl";
import { content as madrid_ar } from "../content/destinations/madrid/ar";
import { content as rome_en } from "../content/destinations/rome/en";
import { content as rome_nl } from "../content/destinations/rome/nl";
import { content as rome_ar } from "../content/destinations/rome/ar";
import { content as dubai_en } from "../content/destinations/dubai/en";
import { content as dubai_nl } from "../content/destinations/dubai/nl";
import { content as dubai_ar } from "../content/destinations/dubai/ar";
import { content as istanbul_en } from "../content/destinations/istanbul/en";
import { content as istanbul_nl } from "../content/destinations/istanbul/nl";
import { content as istanbul_ar } from "../content/destinations/istanbul/ar";
import { content as lisbon_en } from "../content/destinations/lisbon/en";
import { content as lisbon_nl } from "../content/destinations/lisbon/nl";
import { content as lisbon_ar } from "../content/destinations/lisbon/ar";
import { content as athens_en } from "../content/destinations/athens/en";
import { content as athens_nl } from "../content/destinations/athens/nl";
import { content as athens_ar } from "../content/destinations/athens/ar";

// Destinations promoted on the home page (only those that currently have a fare are shown).
export const POPULAR = ["LON", "PAR", "BCN", "ROM", "IST", "DXB", "NYC", "MAD", "LIS", "ATH", "BKK", "CAI"];

// Optional photos: add "IATA": "https://…/photo.jpg" once you have images you are licensed to use
// (for example your own, or Unsplash with attribution). Cards fall back to a gradient without one.
export const PHOTOS: Record<string, string> = {};

const CONTENT: Record<string, Record<string, PostContent>> = {
  amsterdam: { en: amsterdam_en, nl: amsterdam_nl, ar: amsterdam_ar },
  london: { en: london_en, nl: london_nl, ar: london_ar },
  paris: { en: paris_en, nl: paris_nl, ar: paris_ar },
  barcelona: { en: barcelona_en, nl: barcelona_nl, ar: barcelona_ar },
  madrid: { en: madrid_en, nl: madrid_nl, ar: madrid_ar },
  rome: { en: rome_en, nl: rome_nl, ar: rome_ar },
  dubai: { en: dubai_en, nl: dubai_nl, ar: dubai_ar },
  istanbul: { en: istanbul_en, nl: istanbul_nl, ar: istanbul_ar },
  lisbon: { en: lisbon_en, nl: lisbon_nl, ar: lisbon_ar },
  athens: { en: athens_en, nl: athens_nl, ar: athens_ar },
};

export function getDestinationContent(slug: string, locale: string): { content: PostContent; locale: string } {
  const map = CONTENT[slug];
  if (!map) return { content: { title: "", description: "", blocks: [] }, locale: "en" };
  if (map[locale]) return { content: map[locale], locale };
  return { content: map.en, locale: "en" };
}
