"use client";
import { useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { chapters } from "@/lib/content";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <header className="site-header">
      <div className="frame flex h-full items-center justify-between gap-4">
        <a href="#start" className="-ml-2 inline-flex min-h-11 items-center px-2" aria-label="FALZ — zum Anfang">
          <Wordmark />
        </a>

        <nav aria-label="Kapitel" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {chapters.slice(0, 5).map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="label inline-flex min-h-11 items-center hover:text-accent">
                  <span className="mr-1.5 text-muted">{c.no}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href="#anfrage" className="label inline-flex min-h-11 items-center gap-1.5 px-3 font-medium text-accent">
            Anfrage
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={openerRef}
            type="button"
            onClick={open}
            className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
            aria-haspopup="dialog"
            aria-label="Menü öffnen"
          >
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
      <span className="site-header__progress" aria-hidden="true" />

      <dialog
        ref={dialogRef}
        className="menu-dialog"
        aria-label="Menü"
        onClose={() => openerRef.current?.focus()}
        onClick={(event) => {
          // Klick auf einen Link schließt das Menü; der Anker springt danach
          if ((event.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="frame flex min-h-full flex-col pb-8">
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <Wordmark />
            <button
              type="button"
              onClick={close}
              className="-mr-2 inline-flex size-11 items-center justify-center"
              aria-label="Menü schließen"
            >
              <X size={24} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <span className="menu-rule block h-px origin-left bg-accent-on-dark" aria-hidden="true" />
          <nav aria-label="Kapitel" className="mt-8 flex-1">
            <ol className="flex flex-col">
              {chapters.map((c, i) => (
                <li key={c.id} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                  <a
                    href={`#${c.id}`}
                    className="flex min-h-14 items-baseline gap-4 border-b border-white/15 py-3"
                  >
                    <span className="label text-accent-on-dark">{c.no}</span>
                    <span className="display menu-word text-[2.6rem]">{c.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className="label mt-10 max-w-xs text-white/70">
            Konzeptstudie · FALZ ist ein fiktives Unternehmen
          </p>
        </div>
      </dialog>
    </header>
  );
}
