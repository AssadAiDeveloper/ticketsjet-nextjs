import type { HelpContent } from "./types";
import { en } from "./en";
import { ar } from "./ar";
import { nl } from "./nl";

const CONTENT: Record<string, HelpContent> = { en, ar, nl };

/** Full help-centre content for a locale; other languages show English until translated. */
export const helpContent = (locale: string): HelpContent => CONTENT[locale] ?? en;
