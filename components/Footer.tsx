import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { CARS_LINK } from "@/lib/config";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">
            Tickets<span className="text-amber">Jet</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Compare flights and car rentals from many providers.
            No booking fees — ever. You always book directly with the provider.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber">Search</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link className="hover:text-white" href="/flights">Cheap flights</Link></li>
            <li><Link className="hover:text-white" href="/explore">Explore on the map</Link></li>
            <li><Link className="hover:text-white" href="/cheap-flights">Flights by route</Link></li>
            <li><Link className="hover:text-white" href="/stays">Hotels</Link></li>
            <li><Link className="hover:text-white" href="/destinations">Plan a trip</Link></li>
            <li><Link className="hover:text-white" href="/activities">Things to do</Link></li>
            <li><Link className="hover:text-white" href="/services">Travel services</Link></li>
            <li><Link className="hover:text-white" href="/cars">Car rentals</Link></li>
            <li><Link className="hover:text-white" href="/blog">Travel guides</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber">More</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link className="hover:text-white" href={CARS_LINK}>
                Rental cars
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link className="hover:text-white" href="/about-us">About us</Link></li>
            <li><Link className="hover:text-white" href="/help">Help &amp; FAQ</Link></li>
            <li><Link className="hover:text-white" href="/privacy-policy">Privacy policy</Link></li>
            <li><Link className="hover:text-white" href="/terms-and-conditions">Terms of service</Link></li>
            <li><Link className="hover:text-white" href="/affiliate-disclosure">Affiliate disclosure</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} TicketsJet. Compare and book cheap flights from anywhere, to everywhere.</p>
          <p>
            TicketsJet is a search engine, not a seller. Some links are affiliate links —{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-white">learn more</Link>.{" "}
            <CookieSettingsButton />
          </p>
        </div>
      </div>
    </footer>
  );
}
