import type { CSSProperties } from "react";

/* Feste Staubpartikel (x in %, Versatz in px) — deterministisch für SSR */
const dust = [
  [12, -14, -22],
  [20.5, 10, 18],
  [29, -6, -26],
  [36, 14, 20],
  [45.5, -12, -16],
  [53, 8, 24],
  [61, -16, -20],
  [70, 6, 16],
  [79, -10, -24],
  [86, 12, 22],
] as const;

/**
 * Schlagschnur: wird gespannt, angehoben, schnalzt zurück und hinterlässt
 * einen Kreideabdruck. Rein CSS; bei reduzierter Bewegung steht nur der Abdruck.
 */
export function ChalkLine({
  note,
  className = "",
  style,
}: {
  note?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`chalk ${className}`} style={style} aria-hidden="true">
      <svg viewBox="0 -40 1000 80" preserveAspectRatio="none">
        <defs>
          <filter id="chalk-grain" filterUnits="userSpaceOnUse" x="-20" y="-40" width="1040" height="80">
            <feTurbulence type="fractalNoise" baseFrequency="0.9 0.35" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
        </defs>
        <line className="chalk__mark" x1="0" y1="0" x2="1000" y2="0" filter="url(#chalk-grain)" />
        <g className="chalk__string">
          <path d="M0 0 Q500 -36 1000 0" pathLength={1} />
        </g>
      </svg>
      {dust.map(([x, dx, dy]) => (
        <span
          key={x}
          className="chalk__dust"
          style={{ left: `${x}%`, "--dx": `${dx}px`, "--dy": `${dy}px` } as CSSProperties}
        />
      ))}
      {note && <span className="chalk__note label">{note}</span>}
    </div>
  );
}
