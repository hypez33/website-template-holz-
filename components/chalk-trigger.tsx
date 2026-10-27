"use client";
import { useRef, type ReactNode } from "react";
import { useReveal } from "@/lib/motion";

/** Hält die CSS-Choreografie der Schlagschnur an, bis sie in den Blick kommt. */
export function ChalkTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useReveal(ref, 0.6);
  return (
    <div ref={ref} className={className} data-armed={state === "static" ? undefined : state}>
      {children}
    </div>
  );
}
