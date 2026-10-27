import { ChalkLine } from "./chalk-line";
import { ChalkTrigger } from "./chalk-trigger";
import { ChapterMark } from "./chapter-mark";
import { InquiryForm } from "./inquiry-form";

const helpful = [
  "Fotos vom Raum, gern auch mit Unordnung",
  "Grobe Maße oder ein Grundriss, falls vorhanden",
  "Bilder von Möbeln, die Ihnen gefallen — oder nicht",
] as const;

export function ChapterAnfrage() {
  return (
    <section id="anfrage" className="chapter frame anfrage" aria-labelledby="anfrage-title">
      <ChapterMark no="06" title="Anfrage" />

      <ChalkTrigger className="anfrage__head">
        <h2 id="anfrage-title" className="display anfrage__title">
          <span>Erzählen Sie</span>
          <span>uns von</span>
          <span className="text-accent">Ihrem Raum.</span>
        </h2>
        <ChalkLine className="anfrage__chalk" />
      </ChalkTrigger>

      <div className="anfrage__grid">
        <aside className="anfrage__aside">
          <p className="text-[1.1875rem] leading-[1.45]">
            Am Anfang reicht eine kurze Beschreibung. Danach melden wir uns, klären offene Fragen
            und vereinbaren einen Termin für das Aufmaß.
          </p>
          <p className="label mt-8 text-muted">Hilft beim ersten Gespräch</p>
          <ul className="anfrage__helpful">
            {helpful.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p className="label mt-8 text-muted">Lieber anrufen?</p>
          {/* TODO(content): Telefonnummer, Adresse und Öffnungszeiten der Werkstatt */}
          <p className="mt-2 text-muted">
            Telefon und Adresse folgen. FALZ ist eine fiktive Konzeptstudie.
          </p>
        </aside>
        <InquiryForm />
      </div>
    </section>
  );
}
