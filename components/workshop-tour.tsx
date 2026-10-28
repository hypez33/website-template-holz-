"use client";
import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import werkstatt from "@/assets/images/werkstatt.webp";
import { useMotionAllowed, useScrollProgress } from "@/lib/motion";

const workshopAlt =
  "Konzeptbild: ruhige Werkstatt mit gekalkten Wänden, Eichenbretter im Wandregal, eine Hobelbank mit Handhobel, Abendlicht fällt in einem langen Streifen über den Betonboden.";

/* Stationen: Lage (x, y) im Bild, Haltefenster [von, bis] im Scrolldurchlauf */
const stations = [
  {
    x: 0.17,
    y: 0.42,
    hold: [0.2, 0.34],
    title: "Holzlager",
    text: "Die Bretter liegen hier, bis sie die Feuchte der Werkstatt angenommen haben.",
  },
  {
    x: 0.45,
    y: 0.45,
    hold: [0.48, 0.62],
    title: "Hobelbank",
    text: "Hier wird angerissen, gestemmt und eingepasst — von Hand, wo es zählt.",
  },
  {
    x: 0.83,
    y: 0.33,
    hold: [0.76, 0.88],
    title: "Tageslicht",
    text: "Farbe und Oberfläche prüfen wir bei echtem Licht, nicht unter der Lampe.",
  },
] as const;

/* Kamerapfad: [Durchlauf, Fokus x, Fokus y, Zoom]. Zwischen den Stationen
   fährt die Kamera kurz zurück, dann wieder heran. */
const path: ReadonlyArray<readonly [number, number, number, number]> = [
  [0, 0.5, 0.5, 1],
  [0.1, 0.42, 0.5, 1.04],
  [0.2, 0.17, 0.42, 1.55],
  [0.34, 0.19, 0.44, 1.65],
  [0.41, 0.32, 0.5, 1.15],
  [0.48, 0.45, 0.45, 1.6],
  [0.62, 0.47, 0.46, 1.72],
  [0.69, 0.65, 0.42, 1.18],
  [0.76, 0.83, 0.33, 1.5],
  [0.88, 0.84, 0.34, 1.58],
  [1, 0.5, 0.5, 1],
];

/* Ohne JS keine Kamera: wie bei reduzierter Bewegung (sections.css) */
const staticCss = `.pan{height:auto}.pan__stage{position:relative;top:auto;height:auto;overflow:visible;background:none}.pan__strip{position:relative;width:100%;height:auto;transform:none}.pan__img{width:100%;height:auto}.pan__light,.pan__finder,.pan__rail{display:none}.pan__dot,.pan__card{--on:1!important}.pan__stations{position:static;width:auto;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:.75rem;padding:1rem var(--grid-gutter) 0}.pan__card{grid-area:auto}.werkstatt__title{position:relative;margin-top:1.5rem}`;

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

function camera(p: number) {
  let k = 0;
  while (k < path.length - 2 && p > path[k + 1]![0]) k++;
  const [t0, x0, y0, z0] = path[k]!;
  const [t1, x1, y1, z1] = path[k + 1]!;
  const t = ease(clamp((p - t0) / (t1 - t0)));
  return { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, z: z0 + (z1 - z0) * t };
}

/* 1 im Haltefenster, weich ein- und ausgeblendet */
function presence(p: number, [from, to]: readonly [number, number]) {
  return clamp(1 - Math.max(from - p, p - to, 0) / 0.05);
}

/**
 * Kamerafahrt durch die Werkstatt: Die Kamera fährt beim Scrollen zu drei
 * Stationen und zoomt jeweils heran; ein Sucher rastet auf dem Detail ein.
 * Sticky-Bühne, kein Scroll-Hijacking. Ohne Bewegung: stehendes Panorama mit
 * Stationen als Liste.
 */
export function WorkshopTour() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();

  useScrollProgress(root, {
    start: 0.06,
    end: 1,
    onProgress: (p) => {
      const s = stage.current;
      const el = strip.current;
      if (!allowed || !s || !el) return;
      const W = s.clientWidth;
      const H = s.clientHeight;
      const bw = el.offsetWidth;
      const bh = el.offsetHeight;
      const wide = W >= 900;
      const cam = camera(p);
      // Auf schmalen Schirmen ist das Panorama schon groß: weniger Zoom
      const z = 1 + (cam.z - 1) * (wide ? 1 : 0.55);
      // Fokuspunkt soll hier landen (Platz für die Erläuterung lassen)
      const sx = (wide ? 0.62 : 0.5) * W;
      const sy = (wide ? 0.5 : 0.4) * H;
      const tx = clamp(sx - cam.x * bw * z, W - bw * z, 0);
      const ty = clamp(sy - cam.y * bh * z, H - bh * z, 0);
      el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${z.toFixed(4)})`;

      const on = stations.map((st) => presence(p, st.hold));
      const lock = Math.max(...on);
      // Sucher folgt der Kamera und rastet beim Halt auf der Station ein
      const near = stations[on.indexOf(lock)]!;
      const fx = cam.x + (near.x - cam.x) * lock;
      const fy = cam.y + (near.y - cam.y) * lock;
      s.style.setProperty("--z", z.toFixed(4));
      s.style.setProperty("--vx", `${(tx + fx * bw * z).toFixed(1)}px`);
      s.style.setProperty("--vy", `${(ty + fy * bh * z).toFixed(1)}px`);
      s.style.setProperty("--lock", lock.toFixed(3));
      // Titel weicht zu Beginn aus und kehrt am Ende zurück
      s.style.setProperty("--hide", Math.min(clamp(p / 0.12), clamp((1 - p) / 0.1)).toFixed(3));
      on.forEach((v, i) => s.style.setProperty(`--on-${i}`, v.toFixed(3)));
    },
  });

  return (
    <div ref={root} className="pan" data-tour={allowed ? "" : undefined}>
      <div ref={stage} className="pan__stage">
        <div ref={strip} className="pan__strip">
          <Image
            src={werkstatt}
            alt={workshopAlt}
            placeholder="blur"
            sizes="(min-width: 900px) 240vw, 600vw"
            className="pan__img"
          />
          {stations.map((st, i) => (
            <span
              key={st.title}
              className="pan__dot"
              aria-hidden="true"
              style={{ "--x": st.x, "--y": st.y } as CSSProperties}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className="pan__light" aria-hidden="true" />
        <div className="pan__finder" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <ol className="pan__rail" aria-hidden="true">
          {stations.map((st) => (
            <li
              key={st.title}
              style={{ "--at": (st.hold[0] + st.hold[1]) / 2 } as CSSProperties}
            >
              {st.title}
            </li>
          ))}
        </ol>
        <ol className="pan__stations">
          {stations.map((st, i) => (
            <li key={st.title} className="pan__card">
              <span className="pan__no display" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong>{st.title}</strong>
              <span>{st.text}</span>
            </li>
          ))}
        </ol>
        <noscript>
          <style>{staticCss}</style>
        </noscript>
        <h2 id="arbeitsweise-title" className="display werkstatt__title frame">
          <span>Eine Werkstatt,</span>
          <span>dieselben Hände.</span>
        </h2>
      </div>
    </div>
  );
}
