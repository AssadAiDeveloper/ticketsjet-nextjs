import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { CARS_LINK } from "@/lib/config";

const year = new Date().getFullYear();

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={44} height={32} className="h-8 w-auto" />
          <p className="font-display text-lg font-bold">
            Tickets<span className="text-amber">Jet</span>
          </p>
        </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            {t("about")}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber">{t("search")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link className="hover:text-white" href="/flights">{t("cheapFlights")}</Link></li>
            <li><Link className="hover:text-white" href="/explore">{t("explore")}</Link></li>
            <li><Link className="hover:text-white" href="/cheap-flights">{t("byRoute")}</Link></li>
            <li><Link className="hover:text-white" href="/stays">{t("hotels")}</Link></li>
            <li><Link className="hover:text-white" href="/trip-finder">{t("tripFinder")}</Link></li>
            <li><Link className="hover:text-white" href="/destinations">{t("planTrip")}</Link></li>
            <li><Link className="hover:text-white" href="/activities">{t("thingsToDo")}</Link></li>
            <li><Link className="hover:text-white" href="/services">{t("services")}</Link></li>
            <li><Link className="hover:text-white" href="/cars">{t("carRentals")}</Link></li>
            <li><Link className="hover:text-white" href="/blog">{t("guides")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber">{t("more")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link className="hover:text-white" href={CARS_LINK}>
                {t("rentalCars")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber">{t("company")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link className="hover:text-white" href="/about-us">{t("aboutUs")}</Link></li>
            <li><Link className="hover:text-white" href="/help">{t("help")}</Link></li>
            <li><Link className="hover:text-white" href="/privacy-policy">{t("privacy")}</Link></li>
            <li><Link className="hover:text-white" href="/terms-and-conditions">{t("terms")}</Link></li>
            <li><Link className="hover:text-white" href="/affiliate-disclosure">{t("affiliate")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} TicketsJet. {t("tagline")}</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{t("notSeller")} <Link href="/affiliate-disclosure" className="underline hover:text-white">{t("learnMore")}</Link>.</span>
            <CookieSettingsButton />
          </p>
        </div>
      </div>
    </footer>
  );
}
