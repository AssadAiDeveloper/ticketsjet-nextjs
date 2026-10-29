import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/config";
import { alternatesFor } from "@/lib/i18nPages";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/contact") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1")}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-slate">
          {t("intro")}{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-amber-deep underline">{SITE.email}</a>
        </p>
        <ul className="mt-6 list-disc space-y-2 ps-5 text-sm text-slate">
          <li>{t("topic1")}</li>
          <li>{t("topic2")}</li>
          <li>{t("topic3")}</li>
          <li>{t("topic4")}</li>
        </ul>
        <p className="mt-8 text-sm text-slate">
          {t("noBooking")}{" "}
          <Link href="/help" className="font-semibold text-amber-deep underline">{t("helpLink")}</Link>
        </p>
      </section>
    </>
  );
}
