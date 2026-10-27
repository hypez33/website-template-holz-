"use client";
import { useRef } from "react";
import { steps } from "@/lib/content";
import { useScrollProgress } from "@/lib/motion";

/** Arbeitsschritte als Maßkette, die sich beim Lesen durchzieht. */
export function ProcessChain() {
  const ref = useRef<HTMLOListElement>(null);
  useScrollProgress(ref, { start: 0.8, end: 0.55 });

  return (
    <ol ref={ref} className="chain">
      {steps.map((s, i) => (
        <li key={s.no} className="chain__step" style={{ "--at": i / (steps.length - 1) } as React.CSSProperties}>
          <span className="chain__tick" aria-hidden="true" />
          <span className="label chain__no">{s.no}</span>
          <h3 className="chain__title">{s.title}</h3>
          <p className="chain__body">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
