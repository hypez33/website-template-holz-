"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useScrollProgress } from "@/lib/motion";

/**
 * Container, der seinen Scrolldurchlauf als `--p` (0…1) bereitstellt. Die
 * eigentliche Inszenierung liegt im CSS. Ohne Bewegung: `--p` = 1.
 */
export function ScrollStage({
  children,
  className = "",
  start,
  end,
  style,
}: {
  children: ReactNode;
  className?: string;
  start?: number;
  end?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, { start, end });
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
