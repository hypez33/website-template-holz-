"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useMotionAllowed } from "@/lib/motion";

export type ServiceIconKind = "schrank" | "kueche" | "regal" | "verkleidung" | "moebel" | "tuer";

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

const drawings: Record<ServiceIconKind, ReactNode> = {
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
};

/**
 * Animiertes Linien-Icon: zeichnet sich beim Erscheinen, danach eine kurze,
 * inhaltliche Bewegung. Mit feinem Zeiger wiederholt Hover über der Zeile die
 * Bewegung. Ohne JavaScript / bei reduzierter Bewegung: fertige Zeichnung.
 */
export function ServiceIcon({ kind, index }: { kind: ServiceIconKind; index: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const allowed = useMotionAllowed();
  const [state, setState] = useState<"armed" | "play" | undefined>(undefined);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !allowed) return;
    const frame = requestAnimationFrame(() => setState((s) => s ?? "armed"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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
