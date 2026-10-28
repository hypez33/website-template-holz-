"use client";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/motion";

/*
 * Schwindverhalten im Querschnitt, schematisch und überzeichnet.
 * Fladerschnitt (liegende Jahresringe): schwindet stark in der Breite und
 * schüsselt — die kernabgewandte (linke) Seite wird hohl.
 * Riftschnitt (stehende Jahresringe): schwindet weniger in der Breite, bleibt eben.
 * p = 0: feucht, p = 1: trocken.
 */

type Cut = "flader" | "rift";
type Pt = [number, number];

const HALF = 100; // halbe Brettbreite
const THICK = 36;

function deform(cut: Cut, [x, y]: Pt, p: number): Pt {
  if (cut === "flader") {
    const s = 1 - 0.07 * p;
    const t = 1 - 0.03 * p;
    const cup = 14 * p;
    return [x * s, THICK / 2 + (y - THICK / 2) * t - cup * (x / HALF) ** 2];
  }
  const s = 1 - 0.035 * p;
  const t = 1 - 0.07 * p;
  return [x * s, THICK / 2 + (y - THICK / 2) * t];
}

const toPath = (pts: Pt[], close = false) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") + (close ? " Z" : "");

function outline(cut: Cut, p: number) {
  const pts: Pt[] = [];
  for (let x = -HALF; x <= HALF; x += 10) pts.push(deform(cut, [x, 0], p));
  for (let x = HALF; x >= -HALF; x -= 10) pts.push(deform(cut, [x, THICK], p));
  return toPath(pts, true);
}

/** Jahresringe als Polylinien; Ausschnitt übernimmt der Clip-Pfad */
function rings(cut: Cut, p: number): string[] {
  const out: string[] = [];
  if (cut === "flader") {
    const cy = 150; // Mark unterhalb des Bretts
    for (let r = 112; r <= 250; r += 9) {
      const pts: Pt[] = [];
      for (let x = -130; x <= 130; x += 10) {
        if (Math.abs(x) >= r) continue;
        pts.push(deform(cut, [x, cy - Math.sqrt(r * r - x * x)], p));
      }
      if (pts.length > 1) out.push(toPath(pts));
    }
  } else {
    const cx = -420; // Mark weit seitlich: Ringe stehen fast senkrecht
    for (let r = 312; r <= 532; r += 9) {
      const pts: Pt[] = [];
      for (let y = -8; y <= THICK + 8; y += 4) {
        const dy = y - THICK / 2;
        pts.push(deform(cut, [cx + Math.sqrt(r * r - dy * dy), y], p));
      }
      out.push(toPath(pts));
    }
  }
  return out;
}

const cuts: Array<{ cut: Cut; name: string; text: string }> = [
  {
    cut: "flader",
    name: "Fladerschnitt",
    text: "Liegende Jahresringe. Schwindet stark in der Breite und schüsselt: Die kernabgewandte Seite wird hohl.",
  },
  {
    cut: "rift",
    name: "Riftschnitt",
    text: "Stehende Jahresringe. Schwindet weniger in der Breite und bleibt eben — für Fronten und Platten oft die ruhigere Wahl.",
  },
];

function Board({ cut, register }: { cut: Cut; register: (key: string, el: SVGPathElement | null) => void }) {
  const clipId = `wm-clip-${cut}`;
  const ringPaths = rings(cut, 1);
  return (
    <svg viewBox="-125 -26 250 84" className="wm__svg" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path
            d={outline(cut, 1)}
            ref={(el) => register(`${cut}-clip`, el)}
          />
        </clipPath>
      </defs>
      {/* Umriss im feuchten Zustand als Kreidelinie zum Vergleich */}
      <path d={outline(cut, 0)} className="wm__ghost" />
      <path
        d={outline(cut, 1)}
        className="wm__board"
        ref={(el) => register(`${cut}-board`, el)}
      />
      <g clipPath={`url(#${clipId})`}>
        {ringPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            className="wm__ring"
            ref={(el) => register(`${cut}-ring-${i}`, el)}
          />
        ))}
      </g>
      <path
        d={outline(cut, 1)}
        className="wm__edge"
        ref={(el) => register(`${cut}-edge`, el)}
      />
    </svg>
  );
}

/** Scrollgekoppeltes Schwinden zweier Querschnitte. Ohne Bewegung: getrockneter Zustand. */
export function WoodMovement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, SVGPathElement | null>>({});
  const register = (key: string, el: SVGPathElement | null) => {
    refs.current[key] = el;
  };

  useScrollProgress(rootRef, {
    start: 0.92,
    end: 0.4,
    onProgress: (p) => {
      for (const { cut } of cuts) {
        const o = outline(cut, p);
        for (const key of ["clip", "board", "edge"]) refs.current[`${cut}-${key}`]?.setAttribute("d", o);
        rings(cut, p).forEach((d, i) => refs.current[`${cut}-ring-${i}`]?.setAttribute("d", d));
      }
    },
  });

  return (
    <figure ref={rootRef} className="wm">
      <div className="wm__scale" aria-hidden="true">
        <span className="label">feucht</span>
        <span className="wm__track">
          <span className="wm__marker" />
        </span>
        <span className="label">trocken</span>
      </div>
      <div className="wm__boards">
        {cuts.map((c) => (
          <div key={c.cut} className="wm__cell">
            <Board cut={c.cut} register={register} />
            <p className="wm__name">{c.name}</p>
            <p className="wm__text">{c.text}</p>
          </div>
        ))}
      </div>
      <figcaption className="label wm__caption">
        Querschnitte schematisch, Bewegung überzeichnet · gestrichelt: Zustand vor dem Trocknen
      </figcaption>
    </figure>
  );
}
