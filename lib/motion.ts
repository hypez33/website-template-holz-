"use client";
/*
 * Bewegungsregeln für FALZ.
 * Mechanik adaptiert aus alzag-component-lab
 * (packages/creative/src/shared/motion-policy.ts): Server-HTML bleibt statisch,
 * Animation schaltet sich erst nach der Hydration zu und respektiert
 * prefers-reduced-motion.
 */
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** false auf dem Server und bei reduzierter Bewegung. */
export function useMotionAllowed(): boolean {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  return !reduced;
}

export type RevealState = "static" | "closed" | "open";

/**
 * Einmaliger Auftritt beim Erreichen des Viewports.
 * Elemente, die bei der Hydration schon sichtbar sind, bleiben statisch —
 * nichts wird nachträglich versteckt.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.28,
): RevealState {
  const allowed = useMotionAllowed();
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const element = ref.current;
    if (!element || !allowed) return;
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    // Zustandswechsel im Frame: erst schließen, dann beobachten
    const frame = requestAnimationFrame(() => setState("closed"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("open");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref, allowed, threshold]);

  return state;
}

/**
 * Schreibt den Durchlauf eines Elements durch den Viewport als CSS-Variable
 * `--p` (0…1). Kein Scroll-Hijacking: es wird nur gelesen, nie gesteuert.
 * Ohne Bewegung bleibt `--p` bei 1 (Endzustand).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  {
    start = 0.85,
    end = 0.2,
    onProgress,
  }: { start?: number; end?: number; onProgress?: (p: number) => void } = {},
) {
  const allowed = useMotionAllowed();
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!allowed) {
      element.style.setProperty("--p", "1");
      callback.current?.(1);
      return;
    }

    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0: Oberkante erreicht `start`, 1: Unterkante erreicht `end`
      const from = vh * start;
      const to = vh * end - rect.height;
      const p = Math.min(1, Math.max(0, (from - rect.top) / (from - to)));
      element.style.setProperty("--p", p.toFixed(4));
      callback.current?.(p);
    };
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry?.isIntersecting ?? false;
      if (active) update();
    });
    observer.observe(element);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, allowed, start, end]);
}
