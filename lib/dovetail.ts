/*
 * Geometrie einer offenen Schwalbenschwanz-Eckverbindung, isometrisch projiziert.
 * Achsen: x = Brettbreite, y = Tiefe, z = Höhe. Das Zinkenbrett steht vorn (y nahe L),
 * das Schwalbenbrett liegt dahinter und endet mit seinen Schwalben über dem Zinkenbrett.
 * Sichtrichtung von (+x, +y, +z): sichtbar sind Flächen mit Normalen nach +x, +y, +z —
 * also die Oberseite mit den Schrägen und die Stirnseite mit dem Hirnholz der Schwalben.
 * Das Zinkenbrett steht, das Schwalbenbrett wird von oben eingesetzt — die einzige
 * Richtung, in der eine echte Schwalbenschwanzverbindung zusammengeht.
 */

type P2 = readonly [number, number];
type P3 = readonly [number, number, number];

export interface Face {
  points: string;
  shade: "top" | "x" | "y";
}
export interface Piece {
  id: string;
  board: "zinken" | "schwalben";
  /** Sortierschlüssel im gefügten Zustand (entlang x) */
  order: number;
  faces: Face[];
}

export const W = 170; // Brettbreite
export const T = 24; // Brettdicke
export const H = 140; // Höhe Zinkenbrett
export const L = 150; // Länge Schwalbenbrett inkl. Verbindung
const Y0 = L - T; // Grundlinie des Schwalbenbretts

const COS = Math.cos(Math.PI / 6);

export function project([x, y, z]: P3): P2 {
  return [(x - y) * COS, (x + y) * 0.5 - z];
}

const fmt = (points: P3[]) =>
  points
    .map(project)
    .map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`)
    .join(" ");

/** Konvexes Prisma: Grundriss in x/y, extrudiert zwischen z0 und z1. */
function prism(outline: P2[], z0: number, z1: number): Face[] {
  const faces: Face[] = [];
  const cx = outline.reduce((s, p) => s + p[0], 0) / outline.length;
  const cy = outline.reduce((s, p) => s + p[1], 0) / outline.length;
  outline.forEach((a, i) => {
    const b = outline[(i + 1) % outline.length]!;
    // Außennormale der Kante
    let nx = b[1] - a[1];
    let ny = -(b[0] - a[0]);
    const mx = (a[0] + b[0]) / 2 - cx;
    const my = (a[1] + b[1]) / 2 - cy;
    if (nx * mx + ny * my < 0) {
      nx = -nx;
      ny = -ny;
    }
    if (nx + ny <= 1e-6) return; // abgewandt
    faces.push({
      points: fmt([
        [a[0], a[1], z0],
        [b[0], b[1], z0],
        [b[0], b[1], z1],
        [a[0], a[1], z1],
      ]),
      shade: Math.abs(nx) >= Math.abs(ny) ? "x" : "y",
    });
  });
  faces.push({ points: fmt(outline.map(([x, y]) => [x, y, z1] as P3)), shade: "top" });
  return faces;
}

const tails = [36, 85, 134]; // Mitten der Schwalben
const wide = 18; // halbe Breite am Hirnholzende (y = L)
const narrow = 11; // halbe Breite an der Grundlinie (y = Y0)

function buildPieces(): Piece[] {
  const z0 = H - T;
  const pieces: Piece[] = [];

  tails.forEach((c, i) => {
    pieces.push({
      id: `schwalbe-${i}`,
      board: "schwalben",
      order: c,
      faces: prism(
        [
          [c - narrow, Y0],
          [c + narrow, Y0],
          [c + wide, L],
          [c - wide, L],
        ],
        z0,
        H,
      ),
    });
  });

  // Zinken: Kanten an der Grundlinie (Y0) und am Ende (L)
  const edges: Array<[number, number]> = [[0, 0]];
  tails.forEach((c) => edges.push([c - narrow, c - wide], [c + narrow, c + wide]));
  edges.push([W, W]);
  for (let i = 0; i < edges.length; i += 2) {
    const [l0, lL] = edges[i]!;
    const [r0, rL] = edges[i + 1]!;
    pieces.push({
      id: `zinken-${i / 2}`,
      board: "zinken",
      order: (l0 + r0) / 2,
      faces: prism(
        [
          [l0, Y0],
          [r0, Y0],
          [rL, L],
          [lL, L],
        ],
        z0,
        H,
      ),
    });
  }
  return pieces.sort((a, b) => a.order - b.order);
}

export const pinBody = prism(
  [
    [0, Y0],
    [W, Y0],
    [W, L],
    [0, L],
  ],
  0,
  H - T,
);

export const tailBody = prism(
  [
    [0, 0],
    [W, 0],
    [W, Y0],
    [0, Y0],
  ],
  H - T,
  H,
);

export const jointPieces = buildPieces();

/** Grundlinien, mit dem Streichmaß angerissen */
export const baselines = {
  zinken: [project([0, L, H - T]), project([W, L, H - T])] as const,
  schwalben: [project([0, Y0, H]), project([W, Y0, H])] as const,
};

export const RAISE = 110;

/** Ausschnitt, der alle Zustände einschließt */
export const VIEWBOX = (() => {
  const xs = [project([W, 0, 0])[0], project([0, L, 0])[0]];
  const top = project([0, 0, H + RAISE])[1];
  const bottom = project([W, L, 0])[1];
  const pad = 6;
  return `${(Math.min(...xs) - pad).toFixed(1)} ${(top - pad).toFixed(1)} ${(Math.max(...xs) - Math.min(...xs) + 2 * pad).toFixed(1)} ${(bottom - top + 2 * pad).toFixed(1)}`;
})();
