"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionAllowed } from "@/lib/motion";

/**
 * Das Bild wird beim Wegscrollen entlang der angerissenen Schlagschnur
 * „gesägt“: zwei Hälften driften auseinander, dazwischen die Schnittfuge.
 * Die Schnittlinie wird aus der Lage der Schnur (`.chalk`) berechnet.
 * Server-HTML, ohne JavaScript und bei reduzierter Bewegung: ein ganzes Bild.
 */
export function CutImage({ image, copy, caption }: { image: ReactNode; copy: ReactNode; caption?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();
  const [clips, setClips] = useState<{ above: string; below: string } | null>(null);

  // Schnittlinie messen
  useEffect(() => {
    const cut = ref.current;
    const wrap = cut?.closest<HTMLElement>(".opening__figure");
    const chalk = wrap?.querySelector<HTMLElement>(".chalk");
    if (!cut || !wrap || !chalk || !allowed) return;

    const measure = () => {
      const W = cut.offsetWidth;
      const H = cut.offsetHeight;
      const angle = parseFloat(getComputedStyle(chalk).getPropertyValue("--chalk-angle")) || 0;
      const tan = Math.tan((angle * Math.PI) / 180);
      const cx = chalk.offsetLeft + chalk.offsetWidth / 2;
      const cy = chalk.offsetTop; // `top` der Schnur; translateY(-50%) zentriert sie dort
      const yL = cy - tan * cx;
      const yR = cy + tan * (W - cx);
      setClips({
        above: `polygon(0 0, ${W}px 0, ${W}px ${yR + 0.5}px, 0 ${yL + 0.5}px)`,
        below: `polygon(0 ${yL - 0.5}px, ${W}px ${yR - 0.5}px, ${W}px ${H}px, 0 ${H}px)`,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(cut);
    return () => observer.disconnect();
  }, [allowed]);

  // Fortschritt: 0 beim Laden, 1 wenn das Bild fast aus dem Blick ist
  useEffect(() => {
    const cut = ref.current;
    const wrap = cut?.closest<HTMLElement>(".opening__figure");
    if (!cut || !wrap || !allowed) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const distance = rect.bottom + window.scrollY - window.innerHeight * 0.3;
      const c = Math.min(1, Math.max(0, window.scrollY / Math.max(1, distance)));
      wrap.style.setProperty("--c", c.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      wrap.style.removeProperty("--c");
    };
  }, [allowed]);

  const active = allowed && clips !== null;

  return (
    <div ref={ref} className="cut" data-cut={active ? "" : undefined}>
      <div className="cut__piece cut__piece--below" style={active ? { clipPath: clips.below } : undefined}>
        {image}
        {caption}
      </div>
      {active && (
        <div className="cut__piece cut__piece--above" style={{ clipPath: clips.above }} aria-hidden="true">
          {copy}
        </div>
      )}
    </div>
  );
}
