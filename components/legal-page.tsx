import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "./wordmark";

/** Platzhalter für Rechtstexte — Inhalte liefert der Kunde. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="inhalt" className="frame legal">
      <Link href="/" className="-ml-2 inline-flex min-h-11 items-center px-2" aria-label="FALZ — zur Startseite">
        <Wordmark />
      </Link>
      <h1 className="display legal__title">{title}</h1>
      <div className="legal__body">{children}</div>
      <Link href="/" className="action action--ghost mt-12">
        <ArrowLeft size={18} aria-hidden="true" />
        Zur Startseite
      </Link>
    </main>
  );
}
