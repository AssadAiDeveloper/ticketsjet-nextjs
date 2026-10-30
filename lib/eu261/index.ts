import type { Eu261Content } from "./types";
import { en } from "./en";
import { ar } from "./ar";
import { nl } from "./nl";

const CONTENT: Record<string, Eu261Content> = { en, ar, nl };

/** Calculator copy for a locale; other languages show English until translated. */
export const eu261Content = (locale: string): Eu261Content => CONTENT[locale] ?? en;
