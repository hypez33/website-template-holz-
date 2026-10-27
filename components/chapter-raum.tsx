import Image from "next/image";
import einbauwand from "@/assets/images/einbauwand.webp";
import { ChapterMark } from "./chapter-mark";
import { Dimension } from "./dimension";
import { DoorReveal } from "./door-reveal";

const callouts = [
  { key: "A", text: "Fensterlaibung wird zur Sitzbank" },
  { key: "B", text: "Fronten grifflos, Fugen durchlaufend" },
  { key: "C", text: "Regalböden auf Buchhöhe geteilt" },
] as const;

export function ChapterRaum() {
  return (
    <section id="raum" className="chapter frame raum" aria-labelledby="raum-title">
      <ChapterMark no="01" title="Raum" />

      <div className="raum__text">
        <h2 id="raum-title" className="display raum__title">
          Beim Raum
          <br />
          anfangen.
        </h2>
        <p className="raum__lead">
          Ein Schrank, der in jeden Raum passt, passt in keinen richtig. Deshalb beginnt jeder
          Entwurf mit dem, was schon da ist.
        </p>
        <p className="mt-5 max-w-[34rem] text-muted">
          Wände laufen selten genau im Lot, Decken hängen durch, Heizungsrohre liegen dort, wo
          eigentlich ein Fach hinsollte. Wir nehmen das nicht als Störung, sondern als Vorgabe: Das
          Möbel folgt der Wand, nicht umgekehrt. Fenster, Lichteinfall und Laufwege entscheiden
          über Tiefe, Teilung und Öffnungsrichtung.
        </p>
        <ol className="raum__callouts">
          {callouts.map((c) => (
            <li key={c.key}>
              <span className="label text-accent">{c.key}</span>
              <span>{c.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <DoorReveal
        className="raum__media"
        overlay={
          <>
            <Dimension value="3 120" className="raum__dim-h" />
            <Dimension value="2 480" orientation="v" className="raum__dim-v" />
          </>
        }
      >
        <Image
          src={einbauwand}
          alt="Konzeptbild: raumhohe Einbauwand aus Eiche mit grifflosen Türen, offenem Bücherregal und einer Sitznische im Fenster, Morgenlicht auf Betonboden."
          placeholder="blur"
          sizes="(min-width: 900px) 52vw, 100vw"
        />
      </DoorReveal>
      <p className="raum__caption label text-muted">
        Konzeptbild (KI-generiert), keine Kundenarbeit · Maße in mm, Beispiel
      </p>
    </section>
  );
}
