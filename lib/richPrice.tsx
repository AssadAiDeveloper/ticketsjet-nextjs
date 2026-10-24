import type { ReactNode } from "react";
import { intlTag } from "@/lib/format";

/** Split text on §name§ tokens and swap each for a node (used to put live <Price/> inside translated sentences). */
export function fillTokens(text: string, map: Record<string, ReactNode>): ReactNode[] {
  return text.split(/(§\w+§)/g).map((part, i) => {
    const m = /^§(\w+)§$/.exec(part);
    return m ? <span key={i}>{map[m[1]]}</span> : part;
  });
}

/** Plain-text USD amount for metadata and JSON-LD, where the visitor's currency is unknown. */
export const usdText = (n: number, locale: string) =>
  new Intl.NumberFormat(intlTag(locale) === "en-GB" ? "en-US" : intlTag(locale), { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const DEST_CC: Record<string, string> = {
  lon: "GB", par: "FR", bcn: "ES", rom: "IT", mad: "ES", ist: "TR", dxb: "AE", cai: "EG", ruh: "SA", jed: "SA", cmn: "MA",
  nyc: "US", bkk: "TH", mnl: "PH", ams: "NL", dub: "IE", lis: "PT", ath: "GR", vie: "AT", fra: "DE",
};
