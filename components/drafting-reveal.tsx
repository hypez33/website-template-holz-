"use client";
import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/lib/motion";

/**
 * Eine Zeichenschiene fährt beim Scrollen über das Blatt und legt das Bild frei.
 * Ohne JavaScript / bei reduzierter Bewegung ist das Bild vollständig sichtbar.
 */
export function DraftingReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, { start: 0.95, end: 0.9 });

  return (
    <div ref={ref} className={`drafting ${className}`}>
      <div className="drafting__media">{children}</div>
      <span className="drafting__rule" aria-hidden="true">
        <span className="drafting__ticks" />
      </span>
    </div>
  );
}
