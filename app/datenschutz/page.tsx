import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Datenschutz · FALZ Konzeptstudie" };

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutz">
      {/* TODO(content): Datenschutzerklärung vom Kunden liefern lassen, juristisch zu prüfen */}
      <p>
        Diese Konzeptstudie setzt keine Cookies, lädt keine Drittanbieter-Inhalte und speichert
        keine Formulareingaben. Schriften werden lokal ausgeliefert. Das Anfrageformular prüft
        Angaben auf dem Server und verwirft sie anschließend.
      </p>
      <p>Für eine Veröffentlichung ist hier die vollständige Datenschutzerklärung des Betriebs nötig.</p>
    </LegalPage>
  );
}
