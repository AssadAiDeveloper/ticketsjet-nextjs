"use client";

import { useEffect, useRef, useState } from "react";
import type * as LType from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocale, useTranslations } from "next-intl";
import TpWidget from "@/components/TpWidget";
import { useFormatPrice } from "@/components/Price";
import { useCurrency } from "@/components/CurrencyProvider";
import { fullDate } from "@/lib/format";
import { WIDGETS } from "@/lib/config";
import DestPhoto from "@/components/DestPhoto";
import heroPhotos from "../data/destination-photos.json";

type Point = { code: string; name: string; lat: number; lng: number; price: number; stops: number; depart: string | null; back: string | null };
type Data = { origin: { code: string; name: string; lat: number; lng: number }; points: Point[] };
type Suggest = { code: string; name: string; country: string };

function flightsHref(origin: string, p: Point, prefix: string) {
  const q = new URLSearchParams({ origin_iata: origin, destination_iata: p.code, adults: "1" });
  if (p.depart) q.set("depart_date", p.depart);
  if (p.back) q.set("return_date", p.back);
  return `${prefix}/flights?${q.toString()}#results`;
}

import { regionOf } from "@/lib/regions";
const REGIONS = ["europe", "asia", "africa", "northamerica", "southamerica", "oceania", "middleeast"] as const;

function niceStep(v: number) {
  if (v <= 0) return 50;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  let step = mag;
  if (n > 5) step = mag * 5;
  else if (n > 2) step = mag * 2;
  return step;
}

function readUrl() {
  if (typeof window === "undefined") return {};
  const u = new URL(window.location.href);
  return {
    origin: u.searchParams.get("origin") || undefined,
    max: u.searchParams.get("max") ? Number(u.searchParams.get("max")) : undefined,
    month: u.searchParams.get("month") || undefined,
    direct: u.searchParams.get("direct") === "1",
    region: u.searchParams.get("region") || undefined,
    q: u.searchParams.get("q") || undefined,
    sort: u.searchParams.get("sort") || undefined,
  };
}

// Grey name-only pins for cities without a recent fare are disabled: the map shows real prices only.
const SHOW_UNPRICED = false as boolean;

const dnCache: Record<string, Intl.DisplayNames> = {};
// matches a typed query against a country name (visitor language and English) so "Spain" finds Madrid, Barcelona...
function countryHit(cc: string | undefined, q: string, loc: string): boolean {
  if (!cc || !/^[A-Za-z]{2}$/.test(cc)) return false;
  try {
    return [loc, "en"].some((l) => {
      const dn = (dnCache[l] ||= new Intl.DisplayNames([l], { type: "region" }));
      return (dn.of(cc.toUpperCase()) || "").toLowerCase().includes(q);
    });
  } catch {
    return false;
  }
}

export default function PriceMap({ names = {}, initialOrigin }: { names?: Record<string, string>; initialOrigin?: string }) {
  const t = useTranslations("map");
  const locale = useLocale();
  const fmtPrice = useFormatPrice();
  const { rate, priceCurrency } = useCurrency();
  const fmtRef = useRef(fmtPrice);
  fmtRef.current = fmtPrice;
  const tRef = useRef(t);
  tRef.current = t;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LType.Map | null>(null);
  const layerRef = useRef<LType.LayerGroup | null>(null);
  const leafletRef = useRef<typeof LType | null>(null);
  const drawRef = useRef<(() => void) | null>(null);
  const closeRef = useRef<(() => void) | null>(null);
  const viewOriginRef = useRef("");

  const url0 = readUrl();
  const [origin, setOrigin] = useState(initialOrigin && /^[A-Z]{3}$/.test(initialOrigin) ? initialOrigin : (url0.origin && /^[A-Z]{3}$/.test(url0.origin) ? url0.origin : "AMS"));
  const [originLabel, setOriginLabel] = useState("Amsterdam");
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState<Suggest[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [minTxt, setMinTxt] = useState("");
  const [maxTxt, setMaxTxt] = useState("");
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [extra, setExtra] = useState<Array<[string, string, number, number]>>([]);
  const [directOnly, setDirectOnly] = useState(url0.direct || false);
  const [region, setRegion] = useState<string>(url0.region || "all");
  const [month, setMonth] = useState<string>(url0.month || "any");
  const [exactDepart, setExactDepart] = useState("");
  const [exactReturn, setExactReturn] = useState("");
  const [sort, setSort] = useState<string>(url0.sort || "cheapest");
  const [destQuery, setDestQuery] = useState(url0.q || "");
  const [hovered, setHovered] = useState<string | null>(null);
  const [touchHint, setTouchHint] = useState(false);
  const [dOpen, setDOpen] = useState(false);
  const [sOpen, setSOpen] = useState(false);
  const [rOpen, setROpen] = useState(false);
  const [calY, setCalY] = useState(() => new Date().getFullYear());
  const [calM, setCalM] = useState(() => new Date().getMonth());

  const num = (x: string) => { const n = parseFloat(x); return Number.isFinite(n) && rate > 0 ? n / rate : null; };
  const lo0 = num(minTxt);
  const hi0 = num(maxTxt);
  const minPrice = lo0 !== null && hi0 !== null && lo0 > hi0 ? hi0 : (lo0 ?? 0);
  const maxPrice = lo0 !== null && hi0 !== null && lo0 > hi0 ? lo0 : (hi0 ?? Infinity);

  // sync filter state to URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    u.searchParams.set("origin", origin);
    if (minTxt) u.searchParams.set("min", minTxt); else u.searchParams.delete("min");
    if (maxTxt) u.searchParams.set("max", maxTxt); else u.searchParams.delete("max");
    if (month && month !== "any") u.searchParams.set("month", month); else u.searchParams.delete("month");
    if (directOnly) u.searchParams.set("direct", "1"); else u.searchParams.delete("direct");
    if (region && region !== "all") u.searchParams.set("region", region); else u.searchParams.delete("region");
    if (destQuery) u.searchParams.set("q", destQuery); else u.searchParams.delete("q");
    if (sort && sort !== "cheapest") u.searchParams.set("sort", sort); else u.searchParams.delete("sort");
    window.history.replaceState({}, "", u.toString());
  }, [origin, minTxt, maxTxt, month, directOnly, region, destQuery, sort]);

  // load prices for the chosen origin
  useEffect(() => {
    let off = false;
    setStatus("loading");
    fetch(`/api/map-prices?origin=${origin}`)
      .then((r) => (r.ok ? (r.json() as Promise<Data>) : Promise.reject()))
      .then((d) => {
        if (off) return;
        setData(d);
        { const ps = d.points.map((p) => p.price).sort((a, b) => a - b); setRange([ps.length ? ps[0] : 0, ps.length ? ps[ps.length - 1] : 0]); }
        setOriginLabel((names && names[d.origin.code]) || d.origin.name);
        setStatus(d.points.length ? "ok" : "error");
      })
      .catch(() => !off && setStatus("error"));
    return () => { off = true; };
  }, [origin]);

  // grey pins (cities without recent fare)
  useEffect(() => {
    if (status !== "ok") return;
    let off = false;
    fetch("/api/map-cities")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { if (!off && Array.isArray(d)) setExtra(d as Array<[string, string, number, number]>); })
      .catch(() => {});
    return () => { off = true; };
  }, [status]);

  // departure autocomplete
  useEffect(() => {
    if (query.trim().length < 2) return setSuggest([]);
    const t = setTimeout(() => {
      fetch(`/api/cities?q=${encodeURIComponent(query.trim())}&locale=${locale}`)
        .then((r) => r.json())
        .then((j: { cities: Suggest[] }) => setSuggest(j.cities))
        .catch(() => setSuggest([]));
    }, 200);
    return () => clearTimeout(t);
  }, [query, locale]);

  // filter points
  const filteredPoints = (data?.points || []).filter((p) => {
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (directOnly && p.stops !== 0) return false;
    if (region !== "all" && regionOf(p.lat, p.lng) !== region) return false;
    if (destQuery.trim()) {
      const q = destQuery.toLowerCase();
      if (!((p.name || "").toLowerCase().includes(q) || (names[p.code] || "").toLowerCase().includes(q) || countryHit(p.country, q, locale))) return false;
    }
    if (month !== "any" && month !== "exact") {
      if (!p.depart || !p.depart.startsWith(month)) return false;
    }
    if (month === "exact") {
      if (exactDepart && p.depart && p.depart < exactDepart) return false;
      if (exactReturn && p.back && p.back > exactReturn) return false;
      if (exactDepart && !p.depart) return false;
    }
    return true;
  });

  const sortedPoints = [...filteredPoints].sort((a, b) => {
    if (sort === "direct" && a.stops !== b.stops) return a.stops - b.stops;
    return a.price - b.price;
  });

  const priceTier = (price: number) => {
    if (!data || !data.points.length) return "mid";
    const prices = data.points.map((p) => p.price).sort((a, b) => a - b);
    const lo = prices[Math.floor(prices.length * 0.33)];
    const hi = prices[Math.floor(prices.length * 0.66)];
    if (price <= lo) return "cheap";
    if (price >= hi) return "expensive";
    return "mid";
  };
  const tierColor = (tier: string) => tier === "cheap" ? "#22c55e" : tier === "expensive" ? "#ef4444" : "#f59e0b";

  // draw markers
  useEffect(() => {
    if (status !== "ok" || !data || !mapEl.current) return;
    let cancelled = false;
    (async () => {
      const L = leafletRef.current ?? (await import("leaflet")).default;
      leafletRef.current = L;
      if (cancelled || !mapEl.current) return;

      if (!mapRef.current) {
        const map = L.map(mapEl.current, { worldCopyJump: true, minZoom: 2, zoomControl: true, scrollWheelZoom: true, wheelPxPerZoomLevel: 100, zoomSnap: 0.5 }).setView([data.origin.lat, data.origin.lng], 3);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 12,
        }).addTo(map);
        mapRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);
        viewOriginRef.current = data.origin.code;
        if ("ontouchstart" in window) setTouchHint(true);
      } else {
        if (viewOriginRef.current !== data.origin.code) {
          mapRef.current.setView([data.origin.lat, data.origin.lng], 3);
          viewOriginRef.current = data.origin.code;
        }
      }

      const map = mapRef.current!;
      const layer = layerRef.current!;
      const visible = sortedPoints;

      const draw = () => {
        if (mapEl.current?.querySelector(".leaflet-popup")) return;
        layer.clearLayers();
        L.marker([data.origin.lat, data.origin.lng], {
          icon: L.divIcon({ className: "tj-origin", html: "<span></span>", iconSize: [18, 18] }),
          interactive: false,
        }).addTo(layer);

        const bounds = map.getBounds().pad(0.1);
        const taken: Array<{ x: number; y: number }> = [];
        for (const p of visible) {
          if (!bounds.contains([p.lat, p.lng])) continue;
          const pt = map.latLngToContainerPoint([p.lat, p.lng]);
          if (taken.some((t) => Math.abs(t.x - pt.x) < 58 && Math.abs(t.y - pt.y) < 28)) continue;
          taken.push({ x: pt.x, y: pt.y });

          const tier = priceTier(p.price);
          const color = tierColor(tier);
          const html = `<span style="background:${color};color:#fff;border-radius:6px;padding:2px 6px;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;font-family:inherit">${fmtRef.current(p.price)}</span>`;
          const m = L.marker([p.lat, p.lng], {
            icon: L.divIcon({ className: "tj-pin", html, iconSize: [54, 24], iconAnchor: [27, 12] }),
            title: (names && names[p.code]) || p.name,
          });
          const box = document.createElement("div");
          box.className = "tj-pop";
          const h = document.createElement("strong");
          h.textContent = ((names && names[data.origin.code]) || data.origin.name) + " → " + ((names && names[p.code]) || p.name);
          const price = document.createElement("div");
          price.textContent = `${tRef.current("fromReturn", { price: fmtRef.current(p.price) })} · ${p.stops === 0 ? tRef.current("direct") : tRef.current("stops", { n: p.stops })}`;
          const dates = document.createElement("small");
          dates.textContent = p.depart ? `${fullDate(p.depart, locale)}${p.back ? " → " + fullDate(p.back, locale) : ""}` : tRef.current("flex");
          const a = document.createElement("a");
          a.href = flightsHref(data.origin.code, p, prefix);
          a.textContent = tRef.current("see");
          box.append(h, price, dates, a);
          m.bindPopup(box, { closeButton: false, offset: [0, -6] });
          m.addTo(layer);

          m.on("click", () => {
            const row = document.getElementById(`row-${p.code}`);
            if (row) row.scrollIntoView({ behavior: "smooth", block: "nearest" });
          });
        }

        // grey pins: cities without a recent fare (only when no price filter active)
        if (SHOW_UNPRICED && map.getZoom() >= 5 && !minTxt && !maxTxt && extra.length) {
          const priced = new Set(data.points.map((q) => q.code));
          priced.add(data.origin.code);
          for (const c of extra) {
            const [code, cname, lat, lng] = c;
            if (priced.has(code) || !bounds.contains([lat, lng])) continue;
            const pt = map.latLngToContainerPoint([lat, lng]);
            if (taken.some((t) => Math.abs(t.x - pt.x) < 58 && Math.abs(t.y - pt.y) < 28)) continue;
            taken.push({ x: pt.x, y: pt.y });
            const el = document.createElement("div");
            el.className = "tj-pin";
            el.style.cssText = "background:#e2e8f0;color:#334155;border-color:#94a3b8;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 6px;";
            el.textContent = (names && names[code]) || cname;
            const gm = L.marker([lat, lng], { icon: L.divIcon({ className: "", html: el, iconSize: [54, 24], iconAnchor: [27, 12] }), title: (names && names[code]) || cname });
            const gbox = document.createElement("div");
            gbox.className = "tj-pop";
            const gh = document.createElement("strong");
            gh.textContent = ((names && names[data.origin.code]) || data.origin.name) + " → " + ((names && names[code]) || cname);
            const ga = document.createElement("a");
            ga.href = flightsHref(data.origin.code, { code, name: cname, lat, lng, price: 0, stops: 0, depart: null, back: null }, prefix);
            ga.textContent = tRef.current("see");
            gbox.append(gh, ga);
            gm.bindPopup(gbox, { closeButton: false, offset: [0, -6] });
            gm.addTo(layer);
          }
        }
      };

      const afterClose = () => setTimeout(draw, 80);
      if (drawRef.current) map.off("zoomend moveend", drawRef.current);
      if (closeRef.current) map.off("popupclose", closeRef.current);
      drawRef.current = draw;
      closeRef.current = afterClose;
      map.on("zoomend moveend", draw);
      map.on("popupclose", afterClose);
      draw();
    })();
    return () => { cancelled = true; };
  }, [status, data, minPrice, maxPrice, minTxt, maxTxt, extra, directOnly, region, destQuery, month, exactDepart, exactReturn, sort, locale, fmtPrice, prefix]);

  useEffect(() => () => { mapRef.current?.remove(); mapRef.current = null; }, []);

  if (status === "error") return <TpWidget src={WIDGETS.priceMap} minHeight={520} />;

  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push({ value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleString(locale, { month: "long", year: "numeric" }) });
  }

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const todayIso = now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-" + pad2(now.getDate());
  const fmtD = (iso: string) => { try { return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(iso + "T00:00:00")); } catch { return iso; } };
  const monthLabel = months.find((m) => m.value === month)?.label;
  const dLabel = month === "exact" && (exactDepart || exactReturn) ? (exactDepart ? fmtD(exactDepart) : "…") + " – " + (exactReturn ? fmtD(exactReturn) : "…") : monthLabel || t("anytime");
  const monthStart0 = new Date(calY, calM, 1);
  const monday = !["en", "ar", "he", "fa"].includes(locale);
  const lead = (monthStart0.getDay() + (monday ? 6 : 0)) % 7;
  const dim = new Date(calY, calM + 1, 0).getDate();
  const isoOf = (d: number) => calY + "-" + pad2(calM + 1) + "-" + pad2(d);
  let calTitle = calY + "-" + pad2(calM + 1);
  try { calTitle = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(monthStart0); } catch {}
  const wk = Array.from({ length: 7 }, (_, i) => { try { return new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2024, 0, 1 + i - (monday ? 0 : 1))); } catch { return ""; } });
  const goMonth = (delta: number) => { const d = new Date(calY, calM + delta, 1); setCalY(d.getFullYear()); setCalM(d.getMonth()); };
  const atMin = calY === now.getFullYear() && calM <= now.getMonth();
  const pickDay = (iso: string) => {
    if (month !== "exact" || !exactDepart || exactReturn) { setMonth("exact"); setExactDepart(iso); setExactReturn(""); }
    else if (iso < exactDepart) { setExactDepart(iso); }
    else { setExactReturn(iso); setDOpen(false); }
  };
  const sortOpts: Array<[string, string]> = [["cheapest", t("sortCheapest")], ["direct", t("sortDirect")]];

  const photoFor = (code: string) => (heroPhotos as any)[code?.toUpperCase?.()] || null;

  return (
    <div style={{ position: "relative", isolation: "isolate", zIndex: 0 }}>
      {touchHint && (
        <div className="absolute inset-0 z-[500] flex items-center justify-center bg-black/30 text-sm font-semibold text-white" onClick={() => setTouchHint(false)}>
          {t("touchHint")}
        </div>
      )}
      {/* Filter bar */}
      <div className="grid grid-cols-2 items-end gap-3 pb-3 lg:flex lg:flex-wrap [&>*:nth-child(1)]:col-span-2 [&>*:nth-child(2)]:col-span-2 [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(6)]:col-span-2 [&>*:nth-child(10)]:col-span-2">
        <div className="relative">
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-from">{t("from")}</label>
          <input id="pm-from" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`${originLabel} (${origin})`} autoComplete="off"
            className="mt-1 w-full lg:w-56 rounded-lg border border-mist bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber" />
          {suggest.length > 0 && (
            <ul className="absolute z-[1000] mt-1 w-56 overflow-hidden rounded-lg border border-mist bg-white shadow-lg">
              {suggest.map((c) => (
                <li key={c.code}><button type="button" className="flex w-full items-center justify-between px-3 py-2 text-start text-sm hover:bg-cloud"
                  onClick={() => { setOrigin(c.code); setQuery(""); setSuggest([]); }}>
                  <span className="text-ink">{c.name}</span><span className="font-mono text-xs text-slate">{c.code}</span>
                </button></li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-dest">{t("destinationSearch")}</label>
          <div className="mt-1 flex gap-1">
            <input id="pm-dest" value={destQuery} onChange={(e) => setDestQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { const q = destQuery.toLowerCase(); const m = (data?.points || []).find((p) => (p.name || "").toLowerCase().includes(q) || (names[p.code] || "").toLowerCase().includes(q)); if (m && mapRef.current) { mapRef.current.setView([m.lat, m.lng], 6); const mk = (window as any).__m; } } }} placeholder={t("destinationPlaceholder")} autoComplete="off"
              className="min-w-0 flex-1 lg:w-40 lg:flex-none rounded-lg border border-mist bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber" />
          </div>
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-min">{priceCurrency}</label>
          <div className="mt-2 flex items-center gap-2" dir="ltr">
            <input id="pm-min" type="text" inputMode="numeric" autoComplete="off" value={minTxt} onChange={(e) => setMinTxt(e.target.value.replace(/[^\d]/g, ""))} placeholder={String(Math.round(range[0] * rate))} aria-label={`${priceCurrency} min`} className="min-w-0 flex-1 lg:w-24 lg:flex-none rounded-lg border border-slate/30 bg-white px-3 py-2 text-sm" />
            <span className="text-slate">-</span>
            <input id="pm-max" type="text" inputMode="numeric" autoComplete="off" value={maxTxt} onChange={(e) => setMaxTxt(e.target.value.replace(/[^\d]/g, ""))} placeholder={String(Math.round(range[1] * rate))} aria-label={`${priceCurrency} max`} className="min-w-0 flex-1 lg:w-24 lg:flex-none rounded-lg border border-slate/30 bg-white px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="relative">
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-when">{t("when")}</label>
          <button id="pm-when" type="button" onClick={() => { setDOpen((o) => !o); setSOpen(false); }} aria-expanded={dOpen} className="mt-1 flex w-full items-center justify-between gap-2 rounded-lg border border-mist bg-white px-3 py-2 text-start text-sm text-ink outline-none focus:border-amber lg:w-44">
            <span className="truncate">{dLabel}</span>
            <span aria-hidden className="text-slate">▾</span>
          </button>
          {(dOpen || sOpen || rOpen) && <button type="button" aria-label="×" className="fixed inset-0 z-[998] cursor-default" onClick={() => { setDOpen(false); setSOpen(false); }} />}
          {dOpen && (
            <div className="absolute start-0 z-[999] mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-mist bg-white p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <button type="button" onClick={() => goMonth(-1)} disabled={atMin} aria-label="<" className="h-8 w-8 rounded-full text-lg text-ink hover:bg-cloud disabled:opacity-30"><span className="inline-block rtl:rotate-180">‹</span></button>
                <span className="text-sm font-semibold text-ink">{calTitle}</span>
                <button type="button" onClick={() => goMonth(1)} aria-label=">" className="h-8 w-8 rounded-full text-lg text-ink hover:bg-cloud"><span className="inline-block rtl:rotate-180">›</span></button>
              </div>
              <div className="grid grid-cols-7 text-center text-[11px] text-slate">
                {wk.map((w, i) => <span key={i} className="py-1">{w}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {Array.from({ length: lead }, (_, i) => <span key={"b" + i} />)}
                {Array.from({ length: dim }, (_, i) => {
                  const iso = isoOf(i + 1);
                  const dis = iso < todayIso;
                  const ex = month === "exact";
                  const isS = ex && iso === exactDepart;
                  const isE = ex && iso === exactReturn;
                  const inR = ex && !!exactDepart && !!exactReturn && iso > exactDepart && iso < exactReturn;
                  const cls = "h-9 text-sm " + (isS || isE ? "rounded-full bg-amber font-semibold text-ink" : inR ? "bg-amber/20 text-ink" : dis ? "text-slate/30" : "rounded-full text-ink hover:bg-cloud");
                  return <button key={iso} type="button" disabled={dis} onClick={() => pickDay(iso)} className={cls}>{i + 1}</button>;
                })}
              </div>
              <button type="button" onClick={() => { setMonth("any"); setExactDepart(""); setExactReturn(""); setDOpen(false); }} className="mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-cloud">{t("anytime")}</button>
            </div>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} className="h-4 w-4 accent-amber" />
          {t("directOnly")}
        </label>
        <div className="relative lg:hidden">
          <button type="button" onClick={() => { setROpen((o) => !o); setDOpen(false); setSOpen(false); }} aria-expanded={rOpen} className="mt-1 flex w-full items-center justify-between gap-2 rounded-lg border border-mist bg-white px-3 py-2 text-start text-sm text-ink outline-none focus:border-amber">
            <span className="truncate">{region === "all" ? t("allRegions") : t(`region_${region as (typeof REGIONS)[number]}`)}</span>
            <span aria-hidden className="text-slate">▾</span>
          </button>
          {rOpen && (
            <div className="absolute start-0 z-[999] mt-1 max-h-72 w-full overflow-y-auto rounded-xl border border-mist bg-white p-1.5 shadow-xl">
              {["all", ...REGIONS].map((r) => (
                <button key={r} type="button" onClick={() => { setRegion(r); setROpen(false); }} className={"flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-sm " + (region === r ? "bg-amber/20 font-semibold text-ink" : "text-ink hover:bg-cloud")}>
                  <span>{r === "all" ? t("allRegions") : t(`region_${r as (typeof REGIONS)[number]}`)}</span>
                  {region === r && <span aria-hidden>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="hidden gap-1 lg:flex lg:flex-wrap">
          <button type="button" onClick={() => setRegion("all")} className={`rounded-full border px-3 py-1 text-xs font-medium ${region === "all" ? "border-amber bg-amber/15 text-ink" : "border-mist bg-white text-slate"}`}>{t("allRegions")}</button>
          {REGIONS.map((r) => (
            <button key={r} type="button" onClick={() => setRegion(r)} className={`rounded-full border px-3 py-1 text-xs font-medium ${region === r ? "border-amber bg-amber/15 text-ink" : "border-mist bg-white text-slate"}`}>{t(`region_${r}`)}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full lg:w-auto">
            <button type="button" onClick={() => { setSOpen((o) => !o); setDOpen(false); }} aria-expanded={sOpen} className="mt-1 flex w-full items-center justify-between gap-2 rounded-lg border border-mist bg-white px-3 py-2 text-start text-sm text-ink outline-none focus:border-amber lg:w-40">
              <span className="truncate">{sortOpts.find((o) => o[0] === sort)?.[1]}</span>
              <span aria-hidden className="text-slate">▾</span>
            </button>
            {sOpen && (
              <div className="absolute end-0 z-[999] mt-1 w-48 max-w-[calc(100vw-2rem)] rounded-xl border border-mist bg-white p-1.5 shadow-xl">
                {sortOpts.map((o) => (
                  <button key={o[0]} type="button" onClick={() => { setSort(o[0]); setSOpen(false); }} className={"flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-sm " + (sort === o[0] ? "bg-amber/20 font-semibold text-ink" : "text-ink hover:bg-cloud")}>
                    <span>{o[1]}</span>
                    {sort === o[0] && <span aria-hidden>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button type="button" onClick={() => { setMinTxt(""); setMaxTxt(""); setDirectOnly(false); setRegion("all"); setMonth("any"); setExactDepart(""); setExactReturn(""); setDestQuery(""); setSort("cheapest"); }} className="w-full lg:w-auto rounded-lg border border-mist bg-white px-3 py-2 text-sm font-medium text-ink hover:border-amber">{t("resetFilters")}</button>
        <p className="ms-auto text-xs text-slate">{status === "loading" ? t("loading") : t("count", { n: sortedPoints.length })}</p>
      </div>

      {/* Map + results list */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="relative">
          {touchHint && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-black/30 text-sm font-semibold text-white" onClick={() => setTouchHint(false)}>
              {t("touchHint")}
            </div>
          )}
          <div ref={mapEl} className="isolate relative z-0 h-[520px] w-full overflow-hidden rounded-xl bg-cloud" aria-label={t("aria")} />
          <div className="mt-2 flex gap-3 text-xs text-slate">
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded" style={{ background: "#22c55e" }} />{t("legendCheap")}</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded" style={{ background: "#f59e0b" }} />{t("legendMid")}</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded" style={{ background: "#ef4444" }} />{t("legendExpensive")}</span>
          </div>
        </div>
        <div className="max-h-[520px] overflow-y-auto rounded-xl border border-mist bg-white">
          {status === "loading" && (
            <div className="space-y-2 p-3">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-lg bg-cloud" />)}
            </div>
          )}
          {status === "ok" && sortedPoints.length === 0 && (
            <div className="p-6 text-center text-sm text-slate">
              <p>{t("emptyState")}</p>
              <button type="button" onClick={() => { setMinTxt(""); setMaxTxt(""); setDirectOnly(false); setRegion("all"); setMonth("any"); setDestQuery(""); setSort("cheapest"); }} className="mt-3 rounded-lg border border-mist bg-white px-3 py-2 text-sm font-medium text-ink hover:border-amber">{t("resetFilters")}</button>
            </div>
          )}
          {status === "ok" && sortedPoints.map((p) => {
            const photo = (heroPhotos as any)[p.code?.toUpperCase?.()] || null;
            return (
              <a key={p.code} id={`row-${p.code}`} href={flightsHref(data!.origin.code, p, prefix)}
                onMouseEnter={() => setHovered(p.code)} onMouseLeave={() => setHovered(null)}
                className={`flex items-center gap-3 border-b border-mist p-3 transition hover:bg-cloud ${hovered === p.code ? "bg-cloud" : ""}`}>
                <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-cloud">
                  {photo && photo.url ? <img src={photo.url + "?w=120&q=60"} alt={photo.alt || p.name} className="h-full w-full object-cover" loading="lazy" /> : <div className="h-full w-full bg-gradient-to-br from-[#16324a] to-[#0b1b2b]" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{(names && names[p.code]) || p.name}</span>
                    <span className="text-xs text-slate">{p.code}</span>
                  </div>
                  <div className="text-xs text-slate">{p.stops === 0 ? t("direct") : t("stops", { n: p.stops })} · {p.depart ? fullDate(p.depart, locale) : t("flex")}</div>
                </div>
                <div className="text-sm font-bold text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>{fmtPrice(p.price)}</div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
