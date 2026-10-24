import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("nf");
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-deep">{t("kicker")}</p>
      <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-ink">{t("h1")}</h1>
      <p className="mt-4 max-w-md text-slate">{t("text")}</p>
      <Link href="/" className="mt-7 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-ink-2">
        {t("back")}
      </Link>
    </section>
  );
}
