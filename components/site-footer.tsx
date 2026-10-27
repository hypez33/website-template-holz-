import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { imageCredits } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="frame">
        <p className="footer__mark display" aria-hidden="true">
          FALZ
        </p>

        <div className="footer__grid">
          <div>
            <p className="label text-white/60">Konzeptstudie</p>
            <p className="mt-3 max-w-[30rem] text-white/85">
              FALZ ist ein fiktives Unternehmen. Diese Seite ist ein Gestaltungsentwurf ohne echte
              Kundschaft, Projekte oder Bewertungen. Raum-, Material- und Werkstattbilder sind
              KI-generierte Konzeptbilder und zeigen keine realen Arbeiten.
            </p>
          </div>

          <details className="footer__credits">
            <summary className="label">Bildnachweis</summary>
            <ul>
              {imageCredits.map((c) => (
                <li key={c.subject}>
                  <span className="text-white/90">{c.subject}</span>
                  <span className="text-white/60">
                    {"href" in c ? (
                      <a href={c.href} className="underline underline-offset-4" rel="noopener noreferrer">
                        {c.origin}
                      </a>
                    ) : (
                      c.origin
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </details>

          <nav aria-label="Rechtliches" className="footer__legal">
            <Link href="/impressum" className="label">
              Impressum
            </Link>
            <Link href="/datenschutz" className="label">
              Datenschutz
            </Link>
            <a href="#start" className="label inline-flex items-center gap-1.5">
              Nach oben
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
