import type { CSSProperties, ReactNode } from "react";
import { ScrollStage } from "./scroll-stage";

/* Konstruktionslinien der Einbauwand im Bildkoordinatensystem (700 × 938) */
const lines: Array<{ d: string; accent?: boolean }> = [
  { d: "M100 120 H700" },
  { d: "M105 676 H700" },
  { d: "M105 120 V676" },
  { d: "M676 120 V676" },
  { d: "M220 120 V672" },
  { d: "M338 120 V672" },
  { d: "M460 120 V672" },
  { d: "M340 228 H458 M340 334 H458 M340 440 H458 M340 545 H458" },
  { d: "M462 190 H676 M462 585 H676" },
  { d: "M568 585 V672" },
  { d: "M483 236 H632 V540 H483 Z", accent: true },
  { d: "M465 545 H672", accent: true },
  { d: "M48 125 V720" },
];

const markers = [
  { key: "A", x: 575, y: 600 },
  { key: "B", x: 220, y: 420 },
  { key: "C", x: 399, y: 390 },
] as const;

/**
 * Vom Plan zum Raum: Konstruktionslinien zeichnen sich, dann wächst das Foto
 * vom Boden her auf, zuletzt erscheinen die Markierungen A–C aus dem Text.
 * Ohne Bewegung: Foto mit feinen Linien und Markierungen.
 */
export function PlanReveal({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  return (
    <ScrollStage className="plan raum__media" start={0.95} end={0.72}>
      <div className="plan__sheet">
        <div className="plan__photo">{children}</div>
        <svg viewBox="0 0 700 938" className="plan__lines" aria-hidden="true">
          {lines.map((l, k) => (
            <path
              key={k}
              d={l.d}
              pathLength={1}
              className={l.accent ? "plan__line plan__line--accent" : "plan__line"}
              style={{ "--k": k } as CSSProperties}
            />
          ))}
          {markers.map((m) => (
            <g key={m.key} className="plan__marker" transform={`translate(${m.x} ${m.y})`}>
              <circle r="17" />
              <text dy="0.36em">{m.key}</text>
            </g>
          ))}
        </svg>
      </div>
      {overlay}
    </ScrollStage>
  );
}
