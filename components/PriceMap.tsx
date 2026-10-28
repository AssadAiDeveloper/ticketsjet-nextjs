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

type Point = { code: string; name: string; country?: string; lat: number; lng: number; price: number; stops: number; depart: string | null; back: string | null };
type Data = { origin: { code: string; name: string; lat: number; lng: number }; points: Point[] };
type Suggest = { code: string; name: string; country: string };

/** Link into our own flight search page; the search widget there does the rest. */
function flightsHref(origin: string, p: Point, prefix: string) {
  const q = new URLSearchParams({ origin_iata: origin, destination_iata: p.code, adults: "1" });
  if (p.depart) q.set("depart_date", p.depart);
  if (p.back) q.set("return_date", p.back);
  return `${prefix}/flights?${q.toString()}#results`;
}

const REGION_CODES: Record<string, string> = {};
(
  [
    ["150", "AL AD AT BY BE BA BG HR CZ DK EE FI FR DE GR HU IS IE IT XK LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SE CH UA GB VA GI FO JE GG IM AX SJ CY"],
    ["145", "AE BH EG IL IQ IR JO KW LB OM PS QA SA SY TR YE GE AM AZ"],
    ["142", "AF BD BT BN KH CN HK IN ID JP KZ KG LA MO MY MV MN MM NP KP PK PH SG KR LK TW TJ TH TL TM UZ VN"],
    ["002", "DZ AO BJ BW BF BI CM CV CF TD KM CG CD CI DJ GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW RE YT EH SH"],
    ["019", "AG AR AW BS BB BZ BO BR CA CL CO CR CU CW DM DO EC SV GD GT GY HT HN JM MX NI PA PY PE PR KN LC VC SR TT US UY VE BM GL GP MQ BQ BL MF PM TC VG VI KY AI MS FK GF SX"],
    ["009", "AU NZ FJ PG SB VU WS TO KI FM MH NR PW TV NC PF GU MP CK NU TK WF AS NF"],
  ] as Array<[string, string]>
).forEach(([r, list]) => list.split(" ").forEach((c) => { REGION_CODES[c] = r; }));
const REGION_ORDER = ["150", "145", "142", "002", "019", "009"];

export default function PriceMap({ names = {}, initialOrigin }: { names?: Record<string, string>; initialOrigin?: string }) {
  const t = useTranslations("map");
  const locale = useLocale();
  const fmtPrice = useFormatPrice();
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
  const viewOriginRef = useRef("");
  const closeRef = useRef<(() => void) | null>(null);

  const [origin, setOrigin] = useState(initialOrigin && /^[A-Z]{3}$/.test(initialOrigin) ? initialOrigin : "AMS");
  const [originLabel, setOriginLabel] = useState("Amsterdam");
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState<Suggest[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const { rate, priceCurrency } = useCurrency();
  const [minTxt, setMinTxt] = useState("");
  const [maxTxt, setMaxTxt] = useState("");
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [extra, setExtra] = useState<Array<[string, string, number, number]>>([]);
  const num = (x: string) => { const n = parseFloat(x); return Number.isFinite(n) && rate > 0 ? n / rate : null; };
  const lo0 = num(minTxt);
  const hi0 = num(maxTxt);
  const [minPrice, maxPrice] = lo0 !== null && hi0 !== null && lo0 > hi0 ? [hi0, lo0] : [lo0 ?? 0, hi0 ?? Infinity];
  const [direct, setDirect] = useState(false);
  const [region, setRegion] = useState("");
  const [dFrom, setDFrom] = useState("");
  const [dTo, setDTo] = useState("");
  const pass = (p: Point & { country?: string }) =>
    p.price >= minPrice &&
    p.price <= maxPrice &&
    (!direct || p.stops === 0) &&
    (!region || (p.country ? REGION_CODES[p.country] : "") === region) &&
    (!dFrom || (!!p.depart && p.depart >= dFrom)) &&
    (!dTo || (!!p.depart && p.depart <= dTo));
  const filtered = !!(minTxt || maxTxt || direct || region || dFrom || dTo);
  const regionName = (code: string) => {
    try { return new Intl.DisplayNames([locale], { type: "region" }).of(code) || code; } catch { return code; }
  };
  const today = new Date().toISOString().slice(0, 10);

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
    return () => {
      off = true;
    };
  }, [origin]);

  // every other city (no recent fare) - shown as grey pins when zoomed in
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

  // draw / redraw markers
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
      } else {
        if (viewOriginRef.current !== data.origin.code) {
          mapRef.current.setView([data.origin.lat, data.origin.lng], 3);
          viewOriginRef.current = data.origin.code;
        }
      }

      const map = mapRef.current!;
      const layer = layerRef.current!;
      const visible = data.points.filter((p) => pass(p)); // already sorted cheapest first

      // Declutter: place cheapest first, skip any pin that would overlap one already placed.
      // Re-runs on zoom/pan, so more destinations appear as the map is zoomed in.
      const draw = () => {
        // don't wipe the markers while a popup is open (opening one pans the map and fires moveend)
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

          const m = L.marker([p.lat, p.lng], {
            icon: L.divIcon({ className: "tj-pin", html: fmtRef.current(p.price), iconSize: [54, 24], iconAnchor: [27, 12] }),
            title: (names && names[p.code]) || p.name,
          });
          const box = document.createElement("div");
          box.className = "tj-pop";
          const h = document.createElement("strong");
          h.textContent = ((names && names[data.origin.code]) || data.origin.name) + " ? " + ((names && names[p.code]) || p.name);
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
      }

      // Open map: cities without a recent fare, grey pins, only when zoomed in and no price filter is active
      if (map.getZoom() >= 5 && !filtered && extra.length) {
        const priced = new Set(data.points.map((q) => q.code));
        priced.add(data.origin.code);
        for (const c of extra) {
          const [code, cname, lat, lng] = c;
          if (priced.has(code) || !bounds.contains([lat, lng])) continue;
          const pt = map.latLngToContainerPoint([lat, lng]);
          if (taken.some((t) => Math.abs(t.x - pt.x) < 104 && Math.abs(t.y - pt.y) < 28)) continue;
          taken.push({ x: pt.x, y: pt.y });
          const el = document.createElement("div");
          el.className = "tj-pin";
          el.style.cssText = "background:#e2e8f0;color:#334155;border-color:#94a3b8;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 8px;width:100px;box-sizing:border-box;text-align:center;";
          el.textContent = (names && names[code]) || cname;
          const gm = L.marker([lat, lng], { icon: L.divIcon({ className: "", html: el, iconSize: [100, 24], iconAnchor: [50, 12] }), title: (names && names[code]) || cname });
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
    return () => {
      cancelled = true;
    };
  }, [status, data, minPrice, maxPrice, minTxt, maxTxt, direct, region, dFrom, dTo, extra, locale, fmtPrice, prefix]);

  // cleanup
  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
    },
    [],
  );

  // If prices can't be loaded (API token missing or service down), fall back to the stock map widget.
  if (status === "error") return <TpWidget src={WIDGETS.priceMap} minHeight={520} />;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 pb-3">
        <div className="relative">
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-from">
            {t("from")}
          </label>
          <input
            id="pm-from"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${originLabel} (${origin})`}
            autoComplete="off"
            className="mt-1 w-56 rounded-lg border border-mist bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
          />
          {suggest.length > 0 && (
            <ul className="absolute z-[1000] mt-1 w-56 overflow-hidden rounded-lg border border-mist bg-white shadow-lg">
              {suggest.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2 text-start text-sm hover:bg-cloud"
                    onClick={() => {
                      setOrigin(c.code);
                      setQuery("");
                      setSuggest([]);
                    }}
                  >
                    <span className="text-ink">{c.name}</span>
                    <span className="font-mono text-xs text-slate">{c.code}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-min">{priceCurrency}</label>
          <div className="mt-2 flex items-center gap-2" dir="ltr">
            <input id="pm-min" type="text" inputMode="numeric" autoComplete="off" value={minTxt} onChange={(e) => setMinTxt(e.target.value.replace(/[^\d]/g, ""))} placeholder={String(Math.round(range[0] * rate))} aria-label={`${priceCurrency} ≥`} className="w-24 rounded-lg border border-slate/30 bg-white px-3 py-2 text-sm" />
            <span className="text-slate">–</span>
            <input id="pm-max" type="text" inputMode="numeric" autoComplete="off" value={maxTxt} onChange={(e) => setMaxTxt(e.target.value.replace(/[^\d]/g, ""))} placeholder={String(Math.round(range[1] * rate))} aria-label={`${priceCurrency} ≤`} className="w-24 rounded-lg border border-slate/30 bg-white px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2" dir="ltr">
          <label className="flex items-center gap-2 text-sm text-ink" dir="auto">
            <input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} className="h-4 w-4 accent-amber" />
            {t("direct")}
          </label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label={regionName("001")} className="rounded-lg border border-slate/30 bg-white px-2 py-2 text-sm">
            <option value="">{regionName("001")}</option>
            {REGION_ORDER.map((r) => <option key={r} value={r}>{regionName(r)}</option>)}
          </select>
          <span aria-hidden className="text-slate">✈</span>
          <input type="date" value={dFrom} min={today} max={dTo || undefined} onChange={(e) => setDFrom(e.target.value)} aria-label="✈ ≥" className="rounded-lg border border-slate/30 bg-white px-2 py-2 text-sm" />
          <span className="text-slate">–</span>
          <input type="date" value={dTo} min={dFrom || today} onChange={(e) => setDTo(e.target.value)} aria-label="✈ ≤" className="rounded-lg border border-slate/30 bg-white px-2 py-2 text-sm" />
          {filtered && (
            <button type="button" onClick={() => { setMinTxt(""); setMaxTxt(""); setDirect(false); setRegion(""); setDFrom(""); setDTo(""); }} className="rounded-lg border border-slate/30 bg-white px-3 py-2 text-sm text-ink" aria-label="×">×</button>
          )}
        </div>
        <p className="ms-auto text-xs text-slate">{status === "loading" ? t("loading") : t("count", { n: data?.points.filter((p) => pass(p)).length ?? 0 })}</p>
      </div>
      <div ref={mapEl} className="isolate relative z-0 h-[520px] w-full overflow-hidden rounded-xl bg-cloud" aria-label={t("aria")} />
    </div>
  );
}
