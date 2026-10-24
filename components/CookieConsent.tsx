"use client";

import Link from "next/link";
import { useConsent, writeConsent } from "@/lib/consent";

/** Cookie notice. Until the visitor accepts, no advertising scripts are loaded. */
export default function CookieConsent() {
  const consent = useConsent();
  if (consent !== null) return null; // undefined (not hydrated) or already chosen

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-ink p-5 text-white shadow-2xl ring-1 ring-white/10 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
    >
      <p className="font-display text-base font-bold">Cookies on TicketsJet</p>
      <p className="mt-1.5 text-sm leading-relaxed text-white/75">
        We use essential cookies to make the site work. With your OK we also load advertising cookies.
        Our travel partners may set their own cookies when you search or book.{" "}
        <Link href="/privacy-policy" className="underline hover:text-white">Privacy policy</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-amber-deep"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className="rounded-xl border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Only essential
        </button>
      </div>
    </div>
  );
}
