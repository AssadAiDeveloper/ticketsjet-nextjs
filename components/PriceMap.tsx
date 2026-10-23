"use client";

import { useEffect, useRef, useState } from "react";
import type * as LType from "leaflet";
import "leaflet/dist/leaflet.css";
import TpWidget from "@/components/TpWidget";
import { WIDGETS } from "@/lib/config";

type Point = { code: string; name: string; lat: number; lng: number; price: number; stops: number; depart: string | null; back: string | null };
type Data = { origin: { code: string; name: string; lat: number; lng: number }; points: Point[] };
type Suggest = { code: string; name: string; country: string };

/** Link into our own flight search page; the search widget there does the rest. */
function flightsHref(origin: string, p: Point) {
  const q = new URLSearchParams({ origin_iata: origin, destination_iata: p.code, adults: "1" });
  if (p.depart) q.set("depart_date", p.depart);
  if (p.back) q.set("return_date", p.back);
  return `/flights?${q.toString()}#results`;
}

export default function PriceMap() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LType.Map | null>(null);
  const layerRef = useRef<LType.LayerGroup | null>(null);
  const leafletRef = useRef<typeof LType | null>(null);

  const [origin, setOrigin] = useState("AMS");
  const [originLabel, setOriginLabel] = useState("Amsterdam");
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState<Suggest[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [maxPrice, setMaxPrice] = useState(20000);

  // load prices for the chosen origin
  useEffect(() => {
    let off = false;
    setStatus("loading");
    fetch(`/api/map-prices?origin=${origin}`)
      .then((r) => (r.ok ? (r.json() as Promise<Data>) : Promise.reject()))
      .then((d) => {
        if (off) return;
        setData(d);
        setOriginLabel(d.origin.name);
        setStatus(d.points.length ? "ok" : "error");
      })
      .catch(() => !off && setStatus("error"));
    return () => {
      off = true;
    };
  }, [origin]);

  // departure autocomplete
  useEffect(() => {
    if (query.trim().length < 2) return setSuggest([]);
    const t = setTimeout(() => {
      fetch(`/api/cities?q=${encodeURIComponent(query.trim())}`)
        .then((r) => r.json())
        .then((j: { cities: Suggest[] }) => setSuggest(j.cities))
        .catch(() => setSuggest([]));
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  // draw / redraw markers
  useEffect(() => {
    if (status !== "ok" || !data || !mapEl.current) return;
    let cancelled = false;
    (async () => {
      const L = leafletRef.current ?? (await import("leaflet")).default;
      leafletRef.current = L;
      if (cancelled || !mapEl.current) return;

      if (!mapRef.current) {
        const map = L.map(mapEl.current, { worldCopyJump: true, minZoom: 2, zoomControl: true, scrollWheelZoom: false }).setView([data.origin.lat, data.origin.lng], 3);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 12,
        }).addTo(map);
        mapRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);
      } else {
        mapRef.current.setView([data.origin.lat, data.origin.lng], 3);
      }

      const layer = layerRef.current!;
      layer.clearLayers();

      L.marker([data.origin.lat, data.origin.lng], {
        icon: L.divIcon({ className: "tj-origin", html: "<span></span>", iconSize: [18, 18] }),
        interactive: false,
      }).addTo(layer);

      data.points
        .filter((p) => p.price <= maxPrice)
        .slice(0, 150)
        .forEach((p) => {
          const m = L.marker([p.lat, p.lng], {
            icon: L.divIcon({ className: "tj-pin", html: `$${p.price}`, iconSize: [54, 24], iconAnchor: [27, 12] }),
            title: p.name,
          });
          const box = document.createElement("div");
          box.className = "tj-pop";
          const h = document.createElement("strong");
          h.textContent = `${data.origin.name} → ${p.name}`;
          const price = document.createElement("div");
          price.textContent = `from $${p.price} return${p.stops === 0 ? " · direct" : ` · ${p.stops} stop${p.stops > 1 ? "s" : ""}`}`;
          const dates = document.createElement("small");
          dates.textContent = p.depart ? `${p.depart}${p.back ? " → " + p.back : ""}` : "Flexible dates";
          const a = document.createElement("a");
          a.href = flightsHref(data.origin.code, p);
          a.textContent = "See flights →";
          box.append(h, price, dates, a);
          m.bindPopup(box, { closeButton: false, offset: [0, -6] });
          m.addTo(layer);
        });
    })();
    return () => {
      cancelled = true;
    };
  }, [status, data, maxPrice]);

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
            Flying from
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
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-cloud"
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
          <label className="block font-mono text-[11px] uppercase tracking-widest text-slate" htmlFor="pm-max">
            Max price · ${maxPrice}
          </label>
          <input id="pm-max" type="range" min={100} max={20000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-48 accent-amber" />
        </div>
        <p className="ml-auto text-xs text-slate">{status === "loading" ? "Loading fares…" : `${data?.points.filter((p) => p.price <= maxPrice).length ?? 0} destinations`}</p>
      </div>
      <div ref={mapEl} className="h-[520px] w-full overflow-hidden rounded-xl bg-cloud" aria-label="Map of flight prices" />
    </div>
  );
}
