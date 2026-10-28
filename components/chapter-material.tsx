import { ChapterMark } from "./chapter-mark";
import { MaterialSelector } from "./material-selector";
import { ScrollWidth } from "./scroll-width";
import { WoodMovement } from "./wood-movement";

export function ChapterMaterial() {
  return (
    <section id="material" className="chapter frame" aria-labelledby="material-title">
      <ChapterMark no="03" title="Material" />
      <div className="material-intro">
        <h2 id="material-title" className="display material-intro__title">
          Holz <ScrollWidth className="text-accent">arbeitet.</ScrollWidth>
        </h2>
        <p className="material-intro__text">
          Es quillt bei feuchter Luft und schwindet, wenn geheizt wird — quer zur Faser deutlich
          mehr als längs. Wer das einplant, baut Möbel, die sich auch nach Jahren nicht verziehen:
          mit Fugen, die Bewegung zulassen, und Verbindungen, die sie aufnehmen. Welches Holz
          passt, hängt vom Raum ab, vom Licht und davon, wie stark es genutzt wird.
        </p>
      </div>
      <WoodMovement />
      <MaterialSelector />
    </section>
  );
}
