"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { CityField, Stepper, usePopover, fieldBtn, labelCls, fmt, dayPickerLocale, type City } from "@/components/searchParts";
import { bookingUrl } from "@/lib/config";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Hotel search. Results open on Booking.com in a new tab. */
export default function StaysForm() {
  const t = useTranslations("stays");
  const tf = useTranslations("form");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [to, setTo] = useState<City | null>(null);
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [err, setErr] = useState("");
  const [typed, setTyped] = useState("");
  const dates = usePopover();
  const guests = usePopover();
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const label = range?.from ? `${fmt(range.from, locale)}${range.to ? "  →  " + fmt(range.to, locale) : `  →  ${t("checkOutWord")}`}` : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const dest = to ? to.name : typed.trim();
    if (!dest) return setErr(t("errDest"));
    if (!range?.from || !range.to) return setErr(t("errDates"));
    setErr("");
    window.open(bookingUrl({ city: dest, checkin: iso(range.from), checkout: iso(range.to), adults, children, rooms }), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-3 md:grid-cols-[1.4fr_1.4fr_1fr_auto] md:items-end">
        <CityField label={t("destination")} value={to} onPick={setTo} onTyped={setTyped} hideCode placeholder={t("city")} />

        <div className="relative" ref={dates.ref}>
          <span className={labelCls}>{t("checkInOut")}</span>
          <button type="button" className={fieldBtn} onClick={() => { dates.setOpen(!dates.open); guests.setOpen(false); }} aria-haspopup="dialog" aria-expanded={dates.open}>
            <span className={label ? "" : "text-slate/70"}>{label || tf("addDates")}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </button>
          {dates.open && (
            <div role="dialog" aria-label={tf("chooseDates")} className="tj-cal absolute start-0 z-50 mt-2 w-max rounded-2xl border border-mist bg-white p-3 shadow-2xl">
              <DayPicker
                mode="range"
                numberOfMonths={2}
                selected={range}
                onSelect={(r) => {
                  setRange(r);
                  if (r?.from && r?.to && r.to.getTime() !== r.from.getTime()) dates.setOpen(false);
                }}
                disabled={{ before: today }}
                startMonth={today}
                {...dayPickerLocale(locale)}
              />
            </div>
          )}
        </div>

        <div className="relative" ref={guests.ref}>
          <span className={labelCls}>{t("guestsRooms")}</span>
          <button type="button" className={fieldBtn} onClick={() => { guests.setOpen(!guests.open); dates.setOpen(false); }} aria-haspopup="dialog" aria-expanded={guests.open}>
            <span>
              {t("guestsLabel", { n: adults + children, r: rooms })}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {guests.open && (
            <div role="dialog" aria-label={t("guestsRooms")} className="absolute end-0 z-50 mt-2 w-72 rounded-2xl border border-mist bg-white p-4 shadow-2xl">
              <Stepper label={tf("adults")} hint={t("adultsHint")} value={adults} min={1} max={16} onChange={setAdults} />
              <Stepper label={tf("children")} hint={t("childrenHint")} value={children} min={0} max={10} onChange={setChildren} />
              <Stepper label={t("rooms")} hint="" value={rooms} min={1} max={8} onChange={setRooms} />
              <button type="button" onClick={() => guests.setOpen(false)} className="mt-4 w-full rounded-xl bg-ink py-2.5 text-sm font-bold text-white transition hover:bg-ink-2">
                {tc("done")}
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[13px]">
          {t("search")}
        </button>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
      <p className="mt-3 text-xs text-slate">{t("note")}</p>
    </form>
  );
}
