"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const nav = [
  { href: "/flights", key: "flights" },
  { href: "/trip-finder", key: "tripFinder" },
  { href: "/explore", key: "explore" },
  { href: "/cars", key: "cars" },
  { href: "/blog", key: "guides" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t("home")}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15.5 13.5 12V5.75a1.5 1.5 0 0 0-3 0V12L3 15.5v2l7.5-2v3.75L8.5 21v1.25L12 21.5l3.5.75V21l-2-1.75V15.5l7.5 2v-2Z" fill="currentColor" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Tickets<span className="text-amber">Jet</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("main")}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href="/flights"
            className="ms-2 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-deep"
          >
            {t("searchFlights")}
          </Link>
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t("menu")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink px-4 pb-4 pt-2 md:hidden" aria-label={t("mobile")}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-2 border-t border-white/10 pt-2">
            <LocaleSwitcher align="start" />
          </div>
        </nav>
      )}
    </header>
  );
}
