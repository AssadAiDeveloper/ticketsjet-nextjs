import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-deep">Error 404</p>
      <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-ink">
        This gate doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-slate">
        The page you&apos;re looking for has departed or never boarded. Head back to search and
        find your next trip.
      </p>
      <Link href="/" className="mt-7 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-ink-2">
        Back to search →
      </Link>
    </section>
  );
}
