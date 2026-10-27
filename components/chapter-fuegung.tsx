import Image from "next/image";
import zinken from "@/assets/images/zinken.webp";
import hobel from "@/assets/images/hobel.webp";
import { ChapterMark } from "./chapter-mark";
import { JointAssembly } from "./joint-assembly";

export function ChapterFuegung() {
  return (
    <section id="fuegung" className="fuegung" aria-labelledby="fuegung-title">
      <div className="frame fuegung__head">
        <ChapterMark no="04" title="Fügung" tone="dark" />
        <h2 id="fuegung-title" className="display fuegung__title">
          Die Form
          <br />
          hält.
        </h2>
        <p className="fuegung__intro">
          Eine gute Holzverbindung braucht kein Metall. Sie entsteht aus Schrägen, Passungen und
          der Richtung der Faser. Am deutlichsten zeigt das der Schwalbenschwanz — scrollen Sie
          langsam weiter.
        </p>
      </div>

      <div className="frame">
        <JointAssembly />
      </div>

      <div className="frame fuegung__photos">
        <figure className="fuegung__photo fuegung__photo--a">
          <Image
            src={zinken}
            alt="Konzeptbild: Ecke eines Kastens mit offenen Schwalbenschwanzzinken, Nussbaum und Eiche, auf grauem Filz."
            placeholder="blur"
            sizes="(min-width: 900px) 34vw, 78vw"
          />
          <figcaption className="label mt-3 text-white/65">Nussbaum in Eiche · KI-Konzeptbild</figcaption>
        </figure>
        <p className="fuegung__quote display">
          Maschinen schneiden gerade.
          <br />
          <span className="text-accent-on-dark">Passen muss es von Hand.</span>
        </p>
        <figure className="fuegung__photo fuegung__photo--b">
          <Image
            src={hobel}
            alt="Konzeptbild: Hände führen einen Holzhobel über ein Eichenbrett, ein langer Span rollt sich heraus."
            placeholder="blur"
            sizes="(min-width: 900px) 52vw, 100vw"
          />
          <figcaption className="label mt-3 text-white/65">Handhobel auf Eiche · KI-Konzeptbild</figcaption>
        </figure>
      </div>
    </section>
  );
}
