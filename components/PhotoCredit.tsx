"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PhotoCredit({ author, authorUrl, photoUrl }: { author: string; authorUrl: string; photoUrl: string }) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  return (
    <span className="absolute bottom-2 end-2 z-20">
      <button
        type="button"
        aria-label={t("photoCredit")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="grid h-6 w-6 place-items-center rounded-full bg-black/50 text-white/90 transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-amber"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </button>
      {open && (
        <span role="tooltip" className="absolute bottom-8 end-0 z-30 whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1.5 text-[10px] text-white shadow-lg">
          {t("photoBy", { name: author })}{" "}
          <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-amber">Unsplash</a>
          {" · "}
          <a href={photoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-amber">photo</a>
        </span>
      )}
    </span>
  );
}
