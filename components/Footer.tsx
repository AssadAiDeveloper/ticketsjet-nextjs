import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CookieSettingsButton from "@/components/CookieSettingsButton";

// Replace each url with the real TicketsJet profile link.
const SOCIAL: { name: string; url: string; path: string; stroke?: boolean }[] = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61565939300853", path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" },
];

const year = new Date().getFullYear();

export default async function Footer() {
  const t = await getTranslations("footer");
  const heading = "font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-amber";
  const list = "mt-5 space-y-3 text-sm text-white/70";
  const link = "transition hover:text-white";
  return (
    <footer className="border-t-4 border-amber bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-4 pb-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={44} height={32} className="h-8 w-auto" />
            <span className="font-display text-xl font-bold">
              Tickets<span className="text-amber">Jet</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t("about")}</p>
          <ul className="mt-5 flex items-center gap-2.5" aria-label="Social media">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={s.name}
                  title={s.name}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-amber hover:bg-amber hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true" fill={s.stroke ? "none" : "currentColor"} stroke={s.stroke ? "currentColor" : "none"} strokeWidth={s.stroke ? 1.8 : 0} strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t("search")}>
          <p className={heading}>{t("search")}</p>
          <ul className={list}>
            <li><Link className={link} href="/flights">{t("cheapFlights")}</Link></li>
            <li><Link className={link} href="/explore">{t("explore")}</Link></li>
            <li><Link className={link} href="/cheap-flights">{t("byRoute")}</Link></li>
            <li><Link className={link} href="/trip-finder">{t("tripFinder")}</Link></li>
            <li><Link className={link} href="/destinations">{t("planTrip")}</Link></li>
          </ul>
        </nav>

        <nav aria-label={t("more")}>
          <p className={heading}>{t("more")}</p>
          <ul className={list}>
            <li><Link className={link} href="/stays">{t("hotels")}</Link></li>
            <li><Link className={link} href="/cars">{t("carRentals")}</Link></li>
            <li><Link className={link} href="/activities">{t("thingsToDo")}</Link></li>
            <li><Link className={link} href="/services">{t("services")}</Link></li>
            <li><Link className={link} href="/blog">{t("guides")}</Link></li>
            <li><Link className={link} href="/eu261-calculator">{t("eu261")}</Link></li>
          </ul>
        </nav>

        <nav aria-label={t("company")}>
          <p className={heading}>{t("company")}</p>
          <ul className={list}>
            <li><Link className={link} href="/about-us">{t("aboutUs")}</Link></li>
            <li><Link className={link} href="/contact">{t("contact")}</Link></li>
            <li><Link className={link} href="/help">{t("help")}</Link></li>
            <li><Link className={link} href="/privacy-policy">{t("privacy")}</Link></li>
            <li><Link className={link} href="/terms-and-conditions">{t("terms")}</Link></li>
            <li><Link className={link} href="/affiliate-disclosure">{t("affiliate")}</Link></li>
            <li className="[&_button]:no-underline [&_button]:transition [&_button:hover]:text-white"><CookieSettingsButton /></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-white/45">
          <p>© {year} TicketsJet. {t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
