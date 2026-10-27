import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import endgrain from "@/assets/images/endgrain.webp";
import { ChalkLine } from "./chalk-line";

export function Opening() {
  return (
    <section id="start" className="opening frame" aria-labelledby="opening-title">
      <p className="opening__kicker label flex flex-wrap justify-between gap-x-6 gap-y-1 text-muted">
        <span>Tischlerei für Maßmöbel und Innenausbau</span>
        <span>Konzeptstudie · fiktives Unternehmen</span>
      </p>

      <h1 id="opening-title" className="opening__title display">
        <span className="l1">Erst die</span>
        <span className="l2">Linie.</span>
        <span className="l3">Dann das</span>
        <span className="l4">Holz.</span>
        <span className="l5 text-muted">FALZ — Möbel und Einbauten für genau einen Raum</span>
      </h1>

      <div className="opening__figure">
        <figure className="h-full">
          <Image
            src={endgrain}
            alt="Kante eines frisch gehobelten Eichenbalkens mit Hirnholz und einem eingerollten Hobelspan, im Streiflicht vor einer Kalkputzwand."
            priority
            placeholder="blur"
            sizes="(min-width: 900px) 42vw, 84vw"
          />
          <figcaption className="label absolute bottom-3 right-3 bg-surface/85 px-2 py-1 text-[0.6875rem] text-muted min-[900px]:hidden">
            Eiche, Hirnholz · KI-Konzeptbild
          </figcaption>
        </figure>
        <dl className="opening__schriftfeld label" aria-label="Bildangaben">
          <dt>Blatt</dt>
          <dd>01 / 06</dd>
          <dt>Motiv</dt>
          <dd>Eiche, Hirnholz, Hobelspan</dd>
          <dt>Licht</dt>
          <dd>Streiflicht von links</dd>
          <dt>Bild</dt>
          <dd>KI-Konzeptbild</dd>
        </dl>
        <ChalkLine note="Anriss — Schlagschnur, blaue Kreide" />
      </div>

      <div className="opening__intro">
        <p className="max-w-[34rem] text-[1.1875rem] leading-[1.5]">
          Wir planen und bauen Möbel und Einbauten, die nur in einen Raum passen: Schränke unter
          Dachschrägen, Küchen, raumhohe Regale, Wandverkleidungen. Vom ersten Aufmaß bis zur
          Montage bleibt alles in einer Werkstatt.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#anfrage" className="action">
            Projekt anfragen
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href="#arbeitsweise" className="action action--ghost">
            So arbeiten wir
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
