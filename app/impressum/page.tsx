import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Impressum · FALZ Konzeptstudie" };

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      {/* TODO(content): Impressum vom Kunden liefern lassen, juristisch zu prüfen */}
      <p>
        FALZ ist ein fiktives Unternehmen; diese Seite gehört zu einer Konzeptstudie. Für eine
        Veröffentlichung müssen hier die vollständigen Anbieterangaben des Betriebs stehen.
      </p>
    </LegalPage>
  );
}
