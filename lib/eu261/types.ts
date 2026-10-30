export type Situation = "delay" | "cancel" | "denied";
export type Coverage = "eu-dep" | "eu-arr" | "none";
export type Band = "short" | "mid" | "long";
export type DelayBand = "lt3" | "to4" | "gte4";
export type Notice = "gte14" | "to14" | "lt7";
export type Cause = "airline" | "extraordinary" | "unsure";

export type Inputs = {
  situation: Situation;
  coverage: Coverage;
  band: Band;
  intraEU: boolean;
  delay: DelayBand;
  notice: Notice;
  altOffered: boolean;
  volunteered: boolean;
  onTime: boolean;
  cause: Cause;
  pax: number;
};

export type ReasonKey =
  | "notCovered"
  | "delayShort"
  | "noticeLong"
  | "altOffered"
  | "volunteered"
  | "notOnTime"
  | "extraordinary"
  | "unsureCause"
  | "halved"
  | "eligible";

export type Verdict = "yes" | "maybe" | "no" | "notcovered";

export type Result = { verdict: Verdict; amountEach: number | null; reasons: ReasonKey[] };

export type TKey =
  | "situation" | "delay" | "cancel" | "denied"
  | "coverage" | "euDep" | "euArr" | "none" | "coverageHint"
  | "distance" | "short" | "mid" | "long" | "distanceHint"
  | "intra" | "yes" | "no"
  | "delayLabel" | "lt3" | "to4" | "gte4" | "delayHint"
  | "noticeLabel" | "gte14" | "to14" | "lt7"
  | "altLabel" | "altHint"
  | "volLabel" | "timeLabel"
  | "causeLabel" | "causeAirline" | "causeExtra" | "causeUnsure" | "causeHint"
  | "paxLabel" | "calc" | "reset"
  | "resYes" | "resMaybe" | "resNo" | "resNone"
  | "perPax" | "totalFor" | "careTitle" | "careText" | "nextTitle" | "nextText" | "claimBtn" | "claimNote"
  | "disclaimer" | "relatedTitle" | "relArticle" | "relService" | "relHelp" | "affiliate" | "contact" | "faqTitle" | "howTitle";

export type Eu261Content = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  t: Record<TKey, string>;
  reasons: Record<ReasonKey, string>;
  how: { h: string; p: string }[];
  faq: { q: string; a: string }[];
};
