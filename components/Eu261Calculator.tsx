"use client";

import { useState } from "react";
import { evaluate } from "@/lib/eu261/calc";
import type { Band, Cause, Coverage, DelayBand, Eu261Content, Inputs, Notice, Situation } from "@/lib/eu261/types";

const INITIAL: Inputs = {
  situation: "delay",
  coverage: "eu-dep",
  band: "mid",
  intraEU: false,
  delay: "gte4",
  notice: "lt7",
  altOffered: false,
  volunteered: false,
  onTime: true,
  cause: "airline",
  pax: 1,
};

function Choice<T extends string>({ label, hint, value, options, onChange }: { label: string; hint?: string; value: T; options: { v: T; text: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset className="mt-7">
      <legend className="font-display text-base font-bold text-ink">{label}</legend>
      {hint && <p className="mt-1 text-sm text-slate">{hint}</p>}
      <div className="mt-3 flex flex-col gap-2">
        {options.map((o) => (
          <label key={o.v} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${value === o.v ? "border-amber bg-amber/10 text-ink" : "border-mist bg-white text-slate hover:border-amber"}`}>
            <input type="radio" className="mt-0.5 accent-amber" checked={value === o.v} onChange={() => onChange(o.v)} />
            <span>{o.text}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const money = (n: number, locale: string) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

export default function Eu261Calculator({ content, locale, claimHref }: { content: Eu261Content; locale: string; claimHref: string }) {
  const { t, reasons } = content;
  const [i, setI] = useState<Inputs>(INITIAL);
  const [done, setDone] = useState(false);
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => {
    setI((p) => ({ ...p, [k]: v }));
    setDone(false);
  };
  const yn = (b: boolean): "yes" | "no" => (b ? "yes" : "no");
  const result = done ? evaluate(i) : null;

  const tone = result?.verdict === "yes" ? "border-signal bg-signal/10" : result?.verdict === "maybe" ? "border-amber bg-amber/10" : "border-mist bg-white";

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
          setTimeout(() => document.getElementById("eu261-result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        }}
        className="rounded-2xl border border-mist bg-white p-5 sm:p-7"
      >
        <Choice<Situation> label={t.situation} value={i.situation} onChange={(v) => set("situation", v)} options={[{ v: "delay", text: t.delay }, { v: "cancel", text: t.cancel }, { v: "denied", text: t.denied }]} />
        <Choice<Coverage> label={t.coverage} hint={t.coverageHint} value={i.coverage} onChange={(v) => set("coverage", v)} options={[{ v: "eu-dep", text: t.euDep }, { v: "eu-arr", text: t.euArr }, { v: "none", text: t.none }]} />

        {i.coverage !== "none" && (
          <>
            <Choice<Band> label={t.distance} hint={t.distanceHint} value={i.band} onChange={(v) => set("band", v)} options={[{ v: "short", text: t.short }, { v: "mid", text: t.mid }, { v: "long", text: t.long }]} />
            {i.band === "long" && (
              <Choice<"yes" | "no"> label={t.intra} value={yn(i.intraEU)} onChange={(v) => set("intraEU", v === "yes")} options={[{ v: "yes", text: t.yes }, { v: "no", text: t.no }]} />
            )}

            {i.situation === "delay" && (
              <Choice<DelayBand> label={t.delayLabel} hint={t.delayHint} value={i.delay} onChange={(v) => set("delay", v)} options={[{ v: "lt3", text: t.lt3 }, { v: "to4", text: t.to4 }, { v: "gte4", text: t.gte4 }]} />
            )}

            {i.situation === "cancel" && (
              <>
                <Choice<Notice> label={t.noticeLabel} value={i.notice} onChange={(v) => set("notice", v)} options={[{ v: "gte14", text: t.gte14 }, { v: "to14", text: t.to14 }, { v: "lt7", text: t.lt7 }]} />
                {i.notice !== "gte14" && (
                  <Choice<"yes" | "no"> label={t.altLabel} hint={t.altHint} value={yn(i.altOffered)} onChange={(v) => set("altOffered", v === "yes")} options={[{ v: "yes", text: t.yes }, { v: "no", text: t.no }]} />
                )}
              </>
            )}

            {i.situation === "denied" && (
              <>
                <Choice<"yes" | "no"> label={t.volLabel} value={yn(i.volunteered)} onChange={(v) => set("volunteered", v === "yes")} options={[{ v: "yes", text: t.yes }, { v: "no", text: t.no }]} />
                <Choice<"yes" | "no"> label={t.timeLabel} value={yn(i.onTime)} onChange={(v) => set("onTime", v === "yes")} options={[{ v: "yes", text: t.yes }, { v: "no", text: t.no }]} />
              </>
            )}

            {i.situation !== "denied" && (
              <Choice<Cause> label={t.causeLabel} hint={t.causeHint} value={i.cause} onChange={(v) => set("cause", v)} options={[{ v: "airline", text: t.causeAirline }, { v: "extraordinary", text: t.causeExtra }, { v: "unsure", text: t.causeUnsure }]} />
            )}

            <div className="mt-7">
              <label htmlFor="eu261-pax" className="font-display text-base font-bold text-ink">{t.paxLabel}</label>
              <input id="eu261-pax" type="number" min={1} max={20} value={i.pax} onChange={(e) => set("pax", Math.min(20, Math.max(1, Number(e.target.value) || 1)))} className="mt-3 block w-28 rounded-xl border border-mist bg-white px-4 py-2.5 text-ink outline-none focus:border-amber" />
            </div>
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="submit" className="rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:brightness-95">{t.calc}</button>
          <button type="button" onClick={() => { setI(INITIAL); setDone(false); }} className="rounded-full border border-mist px-5 py-3 text-sm font-medium text-slate hover:border-amber">{t.reset}</button>
        </div>
      </form>

      {result && (
        <div id="eu261-result" className={`mt-6 scroll-mt-24 rounded-2xl border-2 p-6 ${tone}`} aria-live="polite">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            {result.verdict === "yes" ? t.resYes : result.verdict === "maybe" ? t.resMaybe : result.verdict === "no" ? t.resNo : t.resNone}
          </h2>
          {result.amountEach !== null && (
            <p className="mt-3 font-display text-3xl font-extrabold text-ink">
              {fill(t.perPax, { amount: money(result.amountEach, locale) })}
              {i.pax > 1 && <span className="mt-1 block text-base font-medium text-slate">{fill(t.totalFor, { total: money(result.amountEach * i.pax, locale), n: i.pax })}</span>}
            </p>
          )}
          <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed text-slate">
            {result.reasons.map((r) => <li key={r}>{reasons[r]}</li>)}
          </ul>

          <div className="mt-6 rounded-xl bg-white p-4">
            <p className="font-display font-bold text-ink">{t.careTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate">{t.careText}</p>
          </div>

          <div className="mt-4 rounded-xl bg-white p-4">
            <p className="font-display font-bold text-ink">{t.nextTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate">{t.nextText}</p>
            {result.verdict !== "notcovered" && (
              <>
                <a href={claimHref} target="_blank" rel="sponsored nofollow noopener" className="mt-4 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:brightness-95">{t.claimBtn}</a>
                <p className="mt-2 text-xs text-slate">{t.claimNote}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
