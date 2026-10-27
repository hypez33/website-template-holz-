"use client";
import { useRef, useState, type CSSProperties } from "react";
import { baselines, jointPieces, pinBody, RAISE, T, tailBody, VIEWBOX, type Face } from "@/lib/dovetail";
import { useMotionAllowed, useScrollProgress } from "@/lib/motion";

const captions = [
  {
    no: "1",
    title: "Anreißen",
    body: "Mit dem Streichmaß wird auf beiden Brettern die Grundlinie angerissen — genau eine Brettdicke vom Ende.",
  },
  {
    no: "2",
    title: "Sägen und Stemmen",
    body: "Schwalben und Zinken werden gesägt, das Holz dazwischen ausgestemmt. Die Schräge macht später die Verbindung.",
  },
  {
    no: "3",
    title: "Fügen",
    body: "Das Schwalbenbrett geht nur in einer Richtung hinein und lässt sich nach vorn nicht mehr herausziehen. Die Form hält, ganz ohne Schraube oder Beschlag.",
  },
] as const;

function Faces({ faces, tone }: { faces: Face[]; tone: "eiche" | "nuss" }) {
  return (
    <>
      {faces.map((f, i) => (
        <polygon key={i} points={f.points} className={`face face--${tone}-${f.shade}`} />
      ))}
    </>
  );
}

/**
 * Montage einer Schwalbenschwanzverbindung, an den Scrollfortschritt gekoppelt.
 * Ohne JavaScript und bei reduzierter Bewegung: gefügter Endzustand.
 */
export function JointAssembly() {
  const trackRef = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();
  // Erläuterung 0–2; ohne Bewegung steht der gefügte Zustand
  const [phase, setPhase] = useState<0 | 1 | 2>(2);
  // Zeichenreihenfolge: über den Zinken schwebend vs. ineinandergreifend
  const [interleaved, setInterleaved] = useState(true);

  useScrollProgress(trackRef, {
    start: 0.1,
    end: 0.9,
    onProgress: (p) => {
      const el = trackRef.current;
      if (!el) return;
      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const t = clamp((p - 0.2) / 0.62);
      const eased = 1 - (1 - t) ** 3;
      const lift = RAISE * (1 - eased);
      el.style.setProperty("--draw", clamp(p / 0.18).toFixed(3));
      el.style.setProperty("--lift", `${lift.toFixed(2)}px`);
      setInterleaved(lift < T);
      setPhase(p < 0.22 ? 0 : p < 0.78 ? 1 : 2);
    },
  });

  const pins = jointPieces.filter((p) => p.board === "zinken");
  const tailsOnly = jointPieces.filter((p) => p.board === "schwalben");

  return (
    <div ref={trackRef} className="joint" data-motion={allowed ? "on" : "off"} data-phase={phase}>
      <div className="joint__stage">
        <svg
          className="joint__svg"
          viewBox={VIEWBOX}
          role="img"
          aria-label="Isometrische Zeichnung: Ein Schwalbenbrett aus Nussbaum wird von oben in ein stehendes Zinkenbrett aus Eiche eingesetzt."
        >
          <g className="joint__tail">
            <Faces faces={tailBody} tone="nuss" />
            <line
              className="joint__baseline"
              x1={baselines.schwalben[0][0]}
              y1={baselines.schwalben[0][1]}
              x2={baselines.schwalben[1][0]}
              y2={baselines.schwalben[1][1]}
              pathLength={1}
            />
          </g>

          <g>
            <Faces faces={pinBody} tone="eiche" />
            <line
              className="joint__baseline"
              x1={baselines.zinken[0][0]}
              y1={baselines.zinken[0][1]}
              x2={baselines.zinken[1][0]}
              y2={baselines.zinken[1][1]}
              pathLength={1}
            />
          </g>

          {interleaved ? (
            jointPieces.map((piece) => (
              <g key={piece.id} className={piece.board === "schwalben" ? "joint__tail" : undefined}>
                <Faces faces={piece.faces} tone={piece.board === "zinken" ? "eiche" : "nuss"} />
              </g>
            ))
          ) : (
            <>
              {pins.map((piece) => (
                <g key={piece.id}>
                  <Faces faces={piece.faces} tone="eiche" />
                </g>
              ))}
              {tailsOnly.map((piece) => (
                <g key={piece.id} className="joint__tail">
                  <Faces faces={piece.faces} tone="nuss" />
                </g>
              ))}
            </>
          )}
        </svg>

        <ol className="joint__captions">
          {captions.map((c, i) => (
            <li
              key={c.no}
              className="joint__caption"
              data-active={i === phase}
              style={{ "--i": i } as CSSProperties}
            >
              <span className="label text-accent-on-dark">{c.no}</span>
              <div>
                <h3 className="joint__caption-title">{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
