import type { Inputs, ReasonKey, Result } from "./types";

/** Simplified EU261/2004 check. Information only, never a legal decision. */
export function evaluate(i: Inputs): Result {
  if (i.coverage === "none") return { verdict: "notcovered", amountEach: null, reasons: ["notCovered"] };

  let amount = i.band === "short" ? 250 : i.band === "mid" ? 400 : i.intraEU ? 400 : 600;
  const reasons: ReasonKey[] = [];

  if (i.situation === "denied") {
    if (i.volunteered) return { verdict: "no", amountEach: null, reasons: ["volunteered"] };
    if (!i.onTime) return { verdict: "no", amountEach: null, reasons: ["notOnTime"] };
    return { verdict: "yes", amountEach: amount, reasons: ["eligible"] };
  }

  if (i.situation === "delay") {
    if (i.delay === "lt3") return { verdict: "no", amountEach: null, reasons: ["delayShort"] };
    if (i.band === "long" && !i.intraEU && i.delay === "to4") {
      amount = amount / 2;
      reasons.push("halved");
    }
  } else {
    if (i.notice === "gte14") return { verdict: "no", amountEach: null, reasons: ["noticeLong"] };
    if (i.altOffered) return { verdict: "no", amountEach: null, reasons: ["altOffered"] };
  }

  if (i.cause === "extraordinary") return { verdict: "no", amountEach: null, reasons: ["extraordinary"] };
  if (i.cause === "unsure") return { verdict: "maybe", amountEach: amount, reasons: [...reasons, "unsureCause"] };
  return { verdict: "yes", amountEach: amount, reasons: [...reasons, "eligible"] };
}
