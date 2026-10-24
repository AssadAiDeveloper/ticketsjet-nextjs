import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ROUTES, slug } from "@/lib/routes";
import { alternatesFor } from "@/lib/i18nPages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "routes" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/cheap-flights") };
}

export default async function RoutesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("routes");
  const tp = await getTranslations("place");
  const tr = await getTranslations("route");
  const groups = new Map<string, string[]>();
  for (const [o, d] of ROUTES) groups.set(o, [...(groups.get(o) ?? []), d]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">{t("h1")}</h1>
      <p className="mt-3 max-w-xl text-slate">{t("lead")}</p>
      {[...groups].map(([o, ds]) => (
        <section key={o} className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">{t("from", { from: tp(`${o}.name`) })}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ds.map((d) => (
              <li key={d}>
                <Link href={`/cheap-flights/${slug(o, d)}`} className="block rounded-xl border border-mist bg-white px-4 py-3 text-sm font-medium text-ink hover:border-amber">
                  {tr("fromTo", { from: tp(`${o}.name`), to: tp(`${d}.name`) })}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
