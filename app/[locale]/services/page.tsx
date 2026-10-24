import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "svc" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/services") };
}

const items = [
  { href: "/services/esim", t: "esimT", d: "esimD" },
  { href: "/services/airport-transfers", t: "trT", d: "trD" },
  { href: "/services/flight-compensation", t: "compT", d: "compD" },
] as const;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("svc");
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">{t("h1")}</h1>
      <p className="mt-3 max-w-xl text-slate">{t("lead")}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block h-full rounded-2xl border border-mist bg-white p-6 hover:border-amber">
              <h2 className="font-display text-lg font-bold text-ink">{t(i.t)}</h2>
              <p className="mt-2 text-sm text-slate">{t(i.d)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
