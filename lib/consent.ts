"use client";

import { useSyncExternalStore } from "react";

export type Consent = "granted" | "denied" | null;
const KEY = "tj_consent";
const EVT = "tj:consent";

export function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: Exclude<Consent, null>) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked — the choice just won't persist */
  }
  window.dispatchEvent(new Event(EVT));
}

/** Forget the choice so the banner shows again (footer "Cookie settings"). */
export function resetConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVT));
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
};

/** Current choice. `undefined` on the server / before hydration so nothing flashes. */
export function useConsent(): Consent | undefined {
  return useSyncExternalStore<Consent | undefined>(subscribe, readConsent, () => undefined);
}
