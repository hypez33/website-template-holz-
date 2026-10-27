"use client";
import Image from "next/image";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import muster from "@/assets/images/muster.webp";
import { materials, type MaterialId } from "@/lib/content";

const SCALE = 1.75;

/** Verschiebung, die den Fokuspunkt mittig setzt, ohne die Bildkante zu zeigen. */
function offset(focus: number) {
  const max = ((SCALE - 1) / (2 * SCALE)) * 100;
  return Math.max(-max, Math.min(max, 50 - focus));
}

/**
 * Materialwahl als Tabs: Das Musterbild fährt wie eine Lupe auf das gewählte Holz.
 * Tastatur: Pfeiltasten, Pos1/Ende. Touch: Tippen. Kein Hover nötig.
 */
export function MaterialSelector() {
  const [active, setActive] = useState<MaterialId>("eiche");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const current = materials.find((m) => m.id === active) ?? materials[0]!;

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = materials.findIndex((m) => m.id === active);
    const last = materials.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(materials[next]!.id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="material">
      <figure className="material__loupe">
        <div
          className="material__zoom"
          style={
            {
              "--tx": `${offset(current.focus.x)}%`,
              "--ty": `${offset(current.focus.y)}%`,
              "--s": SCALE,
            } as CSSProperties
          }
        >
          <Image
            src={muster}
            alt="Konzeptbild: vier Holzmuster nebeneinander auf grünlichem Kalkputz — Eiche, Nussbaum, Esche und Birke-Multiplex mit sichtbarer Schichtkante."
            placeholder="blur"
            sizes="(min-width: 900px) 46vw, 100vw"
          />
        </div>
        <span
          className="material__reticle"
          aria-hidden="true"
          style={
            {
              "--rx": `${50 + SCALE * (current.focus.x - 50 + offset(current.focus.x))}%`,
              "--ry": `${50 + SCALE * (current.focus.y - 50 + offset(current.focus.y))}%`,
            } as CSSProperties
          }
        />
        <figcaption className="label material__caption">
          {current.name} · Muster, KI-Konzeptbild
        </figcaption>
      </figure>

      <div className="material__controls">
        <div role="tablist" aria-label="Holzart wählen" className="material__tabs" onKeyDown={onKey}>
          {materials.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${m.id}`}
              aria-selected={m.id === active}
              aria-controls={`${id}-panel`}
              tabIndex={m.id === active ? 0 : -1}
              className="material__tab"
              onClick={() => setActive(m.id)}
            >
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              {m.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className="material__panel"
          key={active}
        >
          <p className="display material__name">{current.name}</p>
          <p className="mt-4 max-w-[28rem] text-[1.125rem] leading-[1.45]">{current.short}</p>
          <p className="label mt-6 text-muted">Gut geeignet für</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {current.traits.map((t) => (
              <li key={t} className="material__trait">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
