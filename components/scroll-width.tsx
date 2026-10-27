"use client";
import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/lib/motion";

/** Ein Wort, das beim Scrollen in die Breite quillt — wie Holz bei Feuchte. */
export function ScrollWidth({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useScrollProgress(ref, { start: 1, end: 0.35 });
  return (
    <span ref={ref} className={`scroll-width ${className}`}>
      {children}
    </span>
  );
}
