"use client";
/*
 * Zwei Schranktüren schwenken auf und geben das Bild frei.
 * Ausgangspunkt: ImageMaskReveal aus alzag-component-lab
 * (packages/creative/src/media/image-mask-reveal.tsx) — hier als
 * räumliche Bewegung neu gestaltet. Ohne JavaScript, bei reduzierter
 * Bewegung und für Bilder, die schon sichtbar sind: keine Türen.
 */
import { useRef, type ReactNode } from "react";
import { useReveal } from "@/lib/motion";

export function DoorReveal({
  children,
  overlay,
  className = "",
}: {
  children: ReactNode;
  /** Wird über den Türen gezeichnet, z. B. Maßketten */
  overlay?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useReveal(ref);

  return (
    <div ref={ref} className={className} data-armed={state === "static" ? undefined : state}>
      <div className="doors">
        <div className="doors__media">{children}</div>
        <span className="doors__leaf doors__leaf--l" aria-hidden="true" />
        <span className="doors__leaf doors__leaf--r" aria-hidden="true" />
      </div>
      {overlay}
    </div>
  );
}
