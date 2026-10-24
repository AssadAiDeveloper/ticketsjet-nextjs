"use client";

import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { CityField, Stepper, usePopover, fieldBtn, labelCls, fmt, type City } from "@/components/searchParts";
import { bookingUrl } from "@/lib/config";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Hotel search. Results open on Booking.com in a new tab. */
export default function StaysForm() {
  const [to, setTo] = useState<City | null>(null);
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [err, setErr] = useState("");
  const dates = usePopover();
  const guests = usePopover();
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const label = range?.from ? `${fmt(range.from)}${range.to ? "  →  " + fmt(range.to) : "  →  Check-out"}` : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!to) return setErr("Choose a destination from the list.");
    if (!range?.from || !range.to) return setErr("Pick your check-in and check-out dates.");
    setErr("");
    window.open(bookingUrl({ city: to.name, checkin: iso(range.from), checkout: iso(range.to), adults, children, rooms }), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-3 md:grid-cols-[1.4fr_1.4fr_1fr_auto] md:items-end">
        <CityField label="Destination" value={to} onPick={setTo} placeholder="City" />

        <div className="relative" ref={dates.ref}>
          <span className={labelCls}>Check-in — Check-out</span>
          <button type="button" className={fieldBtn} onClick={() => { dates.setOpen(!dates.open); guests.setOpen(false); }} aria-haspopup="dialog" aria-expanded={dates.open}>
            <span className={label ? "" : "text-slate/70"}>{label || "Add dates"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </button>
          {dates.open && (
            <div role="dialog" aria-label="Choose dates" className="tj-cal absolute left-0 z-50 mt-2 w-max rounded-2xl border border-mist bg-white p-3 shadow-2xl">
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
                weekStartsOn={1}
              />
            </div>
          )}
        </div>

        <div className="relative" ref={guests.ref}>
          <span className={labelCls}>Guests &amp; rooms</span>
          <button type="button" className={fieldBtn} onClick={() => { guests.setOpen(!guests.open); dates.setOpen(false); }} aria-haspopup="dialog" aria-expanded={guests.open}>
            <span>
              {adults + children} guest{adults + children > 1 ? "s" : ""} · {rooms} room{rooms > 1 ? "s" : ""}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {guests.open && (
            <div role="dialog" aria-label="Guests and rooms" className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-mist bg-white p-4 shadow-2xl">
              <Stepper label="Adults" hint="18+ years" value={adults} min={1} max={16} onChange={setAdults} />
              <Stepper label="Children" hint="0–17 years" value={children} min={0} max={10} onChange={setChildren} />
              <Stepper label="Rooms" hint="" value={rooms} min={1} max={8} onChange={setRooms} />
              <button type="button" onClick={() => guests.setOpen(false)} className="mt-4 w-full rounded-xl bg-ink py-2.5 text-sm font-bold text-white transition hover:bg-ink-2">
                Done
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[13px]">
          Search stays
        </button>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
      <p className="mt-3 text-xs text-slate">Results open on Booking.com in a new tab, where you complete the booking.</p>
    </form>
  );
}
