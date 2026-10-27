# FALZ — Konzeptstudie

Test-Landingpage einer **fiktiven** Tischlerei für Maßmöbel und Innenausbau (Modus Explore,
ALZAG-Regelwerk 0.4.0). Richtung, Bildnachweis und Prüfstand: [docs/PROJECT.md](docs/PROJECT.md).

```sh
nvm use            # Node 22.22.0
npm ci
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm run build
npx playwright install chromium   # einmalig
npm run test:e2e   # startet `next start` auf 127.0.0.1:3200 (Build vorher nötig)
```

- Inhalte: `lib/content.ts`; Kapitel: `components/chapter-*.tsx`; Tokens: `app/globals.css`.
- Das Anfrageformular ist eine Demo: Die Server Action (`app/actions.ts`) validiert und verwirft.
- Nicht für die Produktion gedacht; Seiten senden `noindex`.
