import { notFound } from "next/navigation";

// Unknown URLs under a language prefix render the localised 404 (app/[locale]/not-found.tsx).
export default function CatchAll() {
  notFound();
}
