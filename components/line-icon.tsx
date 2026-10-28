"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useMotionAllowed } from "@/lib/motion";

export type LineIconKind =
  | "schrank"
  | "kueche"
  | "regal"
  | "verkleidung"
  | "moebel"
  | "tuer"
  | "gespraech"
  | "aufmass"
  | "entwurf"
  | "fertigung"
  | "montage";

/** Gezeichnete Linie; `d` = Verzögerung des Strichs in ms */
function L({ d, delay = 0, accent }: { d: string; delay?: number; accent?: boolean }) {
  return (
    <path
      d={d}
      pathLength={1}
      className={accent ? "si-l si-a" : "si-l"}
      style={{ "--d": delay } as CSSProperties}
    />
  );
}

const drawings: Record<LineIconKind, ReactNode> = {
  // Schrank unter der Dachschräge, rechte Tür schwenkt auf und gibt den Fachboden frei
  schrank: (
    <>
      <L d="M34 12 H54 V54 H10 V30" />
      <L d="M10 30 L34 12" accent delay={120} />
      <L d="M32 54 V14" delay={200} />
      <L d="M28 34 V42" delay={320} />
      <L d="M32 33 H54" delay={260} />
      <g className="si-m si-m--swing">
        <path d="M32 12.6 H54 V54 H32 Z" className="si-fill" />
        <L d="M32 12.6 H54 V54 H32 Z" delay={200} />
        <L d="M36 34 V42" delay={340} />
      </g>
    </>
  ),
  // Küchenzeile: Arbeitsplatte, Armatur, eine Schublade kommt heraus
  kueche: (
    <>
      <L d="M12 8 H52 V18 H12 Z M32 8 V18" delay={240} />
      <L d="M6 26 H58" accent />
      <L d="M45 26 V21 H49" delay={300} />
      <L d="M8 26 V54 H56 V26 M8 50 H56" delay={80} />
      <L d="M24 26 V50 M40 26 V50 M24 38 H40" delay={160} />
      <L d="M12 30 H20" delay={320} />
      <L d="M44 30 H52" delay={340} />
      <L d="M29 43 H35" delay={360} />
      <g className="si-m si-m--drawer">
        <path d="M24.5 26.5 H39.5 V37.5 H24.5 Z" className="si-fill" />
        <L d="M24.5 26.5 H39.5 V37.5 H24.5 Z" delay={200} />
        <L d="M29 31 H35" delay={360} />
      </g>
    </>
  ),
  // Raumhohes Regal: Bücher stellen sich ein, die Leiter rollt an
  regal: (
    <>
      <L d="M6 6 H58" delay={0} />
      <L d="M10 8 V56 M44 8 V56 M10 8 H44" delay={60} />
      <L d="M10 22 H44 M10 36 H44 M10 50 H44" delay={160} />
      {[
        [14, 21, 12],
        [17.5, 21, 13],
        [21, 21, 11],
        [30, 35, 26],
        [33.5, 35, 27],
        [15, 49, 40],
        [18.5, 49, 41],
        [22, 49, 39],
        [36, 49, 41],
      ].map(([x, y1, y2], k) => (
        <path
          key={k}
          d={`M${x} ${y1} V${y2}`}
          className="si-book"
          style={{ "--k": k } as CSSProperties}
        />
      ))}
      <g className="si-m si-m--ladder">
        <L d="M40 6 L48 56 M47 6 L55 56" accent delay={220} />
        <L d="M41.9 18 H48.9 M43.8 30 H50.8 M45.7 42 H52.7" accent delay={320} />
      </g>
    </>
  ),
  // Wandverkleidung: Paneele wachsen von der Decke nach unten
  verkleidung: (
    <>
      <L d="M4 8 H60" accent />
      <L d="M4 56 H60" delay={80} />
      {[10, 17, 24, 31, 38, 45, 52].map((x, k) => (
        <path
          key={x}
          d={`M${x} 10 V54`}
          className="si-slat"
          style={{ "--k": k } as CSSProperties}
        />
      ))}
    </>
  ),
  // Tisch: Maßkette darüber, die Platte senkt sich auf das Gestell
  moebel: (
    <>
      <L d="M8 12 H56 M6 14 L10 10 M54 14 L58 10" accent />
      <L d="M14 30 V54 M50 30 V54" delay={120} />
      <L d="M14 34 H50" delay={200} />
      <g className="si-m si-m--top">
        <path d="M8 26 H56 V30 H8 Z" className="si-fill" />
        <L d="M8 26 H56 V30 H8 Z" delay={60} />
      </g>
    </>
  ),
  // Innentür im Grundriss: Türblatt schwenkt auf, der Öffnungsbogen zeichnet sich
  tuer: (
    <>
      <L d="M4 44 H18 V50 H4 M60 44 H46 V50 H60" />
      <path d="M46 44 A28 28 0 0 0 18 16" pathLength={1} className="si-arc si-a" />
      <g className="si-m si-m--leaf">
        <path d="M18 43 H46 V45 H18 Z" className="si-leaf" />
      </g>
    </>
  ),

  /* --- Arbeitsschritte --- */
  // Gespräch: zwei Sprechblasen, in der ersten wird „getippt“
  gespraech: (
    <>
      <L d="M8 12 H40 V32 H20 L13 39 V32 H8 Z" />
      {[17, 24, 31].map((x, k) => (
        <path key={x} d={`M${x} 22 h0.01`} className="si-dot" style={{ "--k": k } as CSSProperties} />
      ))}
      <path d="M26 30 H56 V48 H50 V55 L43 48 H26 Z" className="si-fill" />
      <L d="M26 30 H56 V48 H50 V55 L43 48 H26 Z" delay={180} />
      <L d="M32 37 H50 M32 42 H44" delay={320} />
    </>
  ),
  // Aufmaß: ein Zollstock klappt Glied für Glied auf
  aufmass: (
    <>
      <L d="M8 22 H58 M6 24 L10 20 M56 24 L60 20" accent delay={360} />
      <g className="zs zs1">
        <L d="M8 34 H22 V42 H8 Z" delay={80} />
        <L d="M11 34 v3 M14 34 v2 M17 34 v3 M20 34 v2" delay={200} />
        <g className="zs zs2">
          <L d="M22 34 H36 V42 H22 Z" delay={120} />
          <L d="M25 34 v3 M28 34 v2 M31 34 v3 M34 34 v2" delay={240} />
          <g className="zs zs3">
            <L d="M36 34 H50 V42 H36 Z" delay={160} />
            <L d="M39 34 v3 M42 34 v2 M45 34 v3 M48 34 v2" delay={280} />
            <g className="zs zs4">
              <L d="M50 34 H58 V42 H50 Z" delay={200} />
            </g>
          </g>
        </g>
      </g>
    </>
  ),
  // Entwurf: der Bleistift zieht eine Linie in Schlagschnur-Blau
  entwurf: (
    <>
      <L d="M8 10 H48 V56 H8 Z" />
      <L d="M14 20 H40 M14 27 H32 M14 34 H36" delay={140} />
      <path d="M14 44 H40" pathLength={1} className="si-penline si-a" />
      <g transform="translate(14 44)">
        <g className="si-m si-m--pencil">
          <path d="M0 0 L3 -7 L25 -29 L29 -25 L7 -3 Z" className="si-fill" />
          <L d="M0 0 L3 -7 L25 -29 L29 -25 L7 -3 Z M3 -7 L7 -3" delay={240} />
        </g>
      </g>
    </>
  ),
  // Fertigung: ein Hobel stößt über das Brett, ein Span rollt sich auf
  fertigung: (
    <>
      <L d="M4 44 H60 V52 H4 Z" />
      <L d="M10 48 H22 M30 47 H46" delay={160} />
      <g transform="translate(6 44)">
        <g className="si-m si-m--plane">
          <path d="M0 0 H24 V-8 H0 Z" className="si-fill" />
          <L d="M0 0 H24 V-8 H0 Z" delay={120} />
          <L d="M15 -8 C15 -16 22 -16 22 -8 M3 -8 V-12 H6 V-8" delay={260} />
          <path
            d="M11 -8 C9 -17 19 -20 20 -14 C21 -10 15 -10 15.5 -13"
            pathLength={1}
            className="si-shave si-a"
          />
        </g>
      </g>
    </>
  ),
  // Montage: Korpus im Raum, die Libelle der Wasserwaage pendelt sich ein
  montage: (
    <>
      <L d="M12 24 H52 V56 H12 Z M32 24 V56" />
      <L d="M28 38 V44 M36 38 V44" delay={220} />
      <L d="M14 14 H50 V21 H14 Z" delay={120} />
      <L d="M26 15.5 H38 V19.5 H26 Z M30 15.5 V19.5 M34 15.5 V19.5" delay={200} />
      <g className="si-m si-m--bubble">
        <path d="M31.2 17.5 h1.6" className="si-bubble" />
      </g>
    </>
  ),
};

/**
 * Animiertes Linien-Icon (Leistungen, Arbeitsschritte): zeichnet sich beim
 * Erscheinen, danach eine kurze, inhaltliche Bewegung. Mit feinem Zeiger
 * wiederholt Hover über der Zeile die Bewegung. Ohne JavaScript / bei reduzierter Bewegung: fertige Zeichnung.
 */
export function LineIcon({ kind, index }: { kind: LineIconKind; index: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const allowed = useMotionAllowed();
  const [state, setState] = useState<"armed" | "play" | undefined>(undefined);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !allowed) return;
    const frame = requestAnimationFrame(() => setState((s) => s ?? "armed"));
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("play");
          observer.disconnect();
        }
      },
      { threshold: 0.7 },
    );
    observer.observe(svg);

    const row = svg.closest("li");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onEnter = () => {
      if (fine.matches) setReplay((r) => r + 1);
    };
    row?.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      row?.removeEventListener("pointerenter", onEnter);
    };
  }, [allowed]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 64 64"
      className={`si si--${kind}`}
      data-state={state}
      data-replay={replay > 0 ? "" : undefined}
      style={{ "--i": index } as CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      {/* Neuer Schlüssel startet die CSS-Animation neu */}
      <g key={replay}>{drawings[kind]}</g>
    </svg>
  );
}
