"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const nav = [
  { href: "/flights", key: "flights" },
  { href: "/stays", key: "stays" },
  { href: "/cars", key: "cars" },
  { href: "/explore", key: "explore" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const t = useTranslations("nav");

  return (
    <header className={`sticky top-0 z-50 bg-ink transition-shadow ${scrolled ? "shadow-lg shadow-black/20" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t("home")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={44} height={32} className="h-8 w-auto" />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Tickets<span className="text-amber">Jet</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("main")}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href="/trip-finder"
            className="ms-2 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-deep"
          >
            {t("tripFinder")}
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
            <LocaleSwitcher />
          </div>
          <Link
            href="/trip-finder"
            onClick={() => setOpen(false)}
            className="mt-2 block w-full rounded-lg bg-amber px-4 py-2.5 text-center text-sm font-bold text-ink transition hover:bg-amber-deep"
          >
            {t("tripFinder")}
          </Link>
        </nav>
      )}
    </header>
  );
}
