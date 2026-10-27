import Image from "next/image";
import zeichnung from "@/assets/images/zeichnung.webp";
import anriss from "@/assets/images/anriss-1878.webp";
import { ChapterMark } from "./chapter-mark";
import { DraftingReveal } from "./drafting-reveal";

export function ChapterZeichnung() {
  return (
    <section id="zeichnung" className="chapter zeichnung" aria-labelledby="zeichnung-title">
      <div className="frame">
        <ChapterMark no="02" title="Zeichnung" />
      </div>

      <div className="zeichnung__sheet">
        <DraftingReveal className="zeichnung__drawing">
          <Image
            src={zeichnung}
            alt="Konzeptbild: Bleistiftzeichnung einer Einbauwand mit Fenstersitz in Ansicht und Grundriss, daneben Zollstock, Zimmermannsbleistift und ein Nussbaummuster auf einem Eichentisch."
            placeholder="blur"
            sizes="(min-width: 900px) 70vw, 100vw"
          />
        </DraftingReveal>
        <h2 id="zeichnung-title" className="display zeichnung__title">
          <span>Jede Linie</span>
          <span>ist eine</span>
          <span>Entscheidung.</span>
        </h2>
      </div>

      <div className="frame zeichnung__body">
        <div className="zeichnung__text">
          <p className="zeichnung__lead">
            Bevor ein Brett zugeschnitten wird, steht das Möbel auf dem Papier: Grundriss, Ansicht,
            Schnitt, jede Fuge und jede Kante.
          </p>
          <p className="mt-5 text-muted">
            Die Zeichnung ist das gemeinsame Werkzeug — für Sie, um sich das Möbel im Raum
            vorzustellen, für uns, um es zu bauen. Dazu kommen Muster zum Anfassen: Holz,
            Oberfläche, Kantenprofil. Farbe und Haptik lassen sich am Bildschirm nicht beurteilen.
          </p>
        </div>

        <figure className="zeichnung__archive">
          <Image
            src={anriss}
            alt="Historische Tuschezeichnung auf Papier: ein Zimmermannswinkel, eine japanische Tuschschnur mit Rolle und ein Anreißstift, darunter eine handschriftliche englische Beschriftung."
            placeholder="blur"
            sizes="(min-width: 900px) 22vw, 60vw"
          />
          <figcaption className="label mt-3 text-muted">
            Winkel, Schlagschnur, Anreißer · Zeichnung, Japan 1878 · Library of Congress,
            gemeinfrei
          </figcaption>
          <p className="mt-4 max-w-[22rem] text-[0.9375rem] text-muted">
            Die Werkzeuge zum Anreißen sind seit Jahrhunderten im Kern dieselben: ein Winkel, eine
            gespannte Schnur, eine feine Spitze.
          </p>
        </figure>
      </div>
    </section>
  );
}
