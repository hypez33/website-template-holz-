"use client";
import { useRef, type ReactNode } from "react";
import { useReveal } from "@/lib/motion";

/**
 * Kreide-Anmerkung über der Archivzeichnung: ein von Hand gezogener Kreis um die
 * Tuschschnur, Hinweislinie und Beschriftung im leeren Papierbereich oben rechts.
 * Ohne Bewegung steht die fertige Markierung.
 */
export function ChalkAnnotation({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useReveal(ref, 0.5);

  return (
    <div ref={ref} className="annot" data-armed={state === "static" ? undefined : state}>
      {children}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="annot__svg" aria-hidden="true">
        <path
          className="annot__loop"
          pathLength={1}
          d="M37 51 C36 45 45 44.5 51 45 C58 45.5 62 48.5 61.5 52.5 C61 57.5 52 60 45 59.5 C38.5 59 35.5 55.5 38 51.5 C40 48.5 44 47.5 47.5 47"
        />
        <path className="annot__leader" pathLength={1} d="M60 47 L67 20" />
      </svg>
      <span className="annot__label label">{label}</span>
    </div>
  );
}
