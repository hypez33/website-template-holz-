# FALZ — Konzeptstudie Tischlerei

**Modus:** Explore (Test-Landingpage, kein Kundenprojekt, geht nicht in Produktion)
**Regelwerk-Version:** `rules-v0.4.0` (hypez33/alzag-agency-rules, `main` @ `bd46c2b`, 27.10.2026)

## Projekt

- **Kunde / Branche:** fiktive Tischlerei „FALZ“ für Maßmöbel und Innenausbau. Name, Leistungen und Abläufe sind erfunden und auf der Seite als Konzeptstudie gekennzeichnet.
- **Ziel und primäre Conversion:** Interesse wecken, Arbeitsweise verständlich machen, Projektanfrage (Formular, Demo ohne Versand).
- **Zielgruppe und wichtigste Frage:** Menschen, die individuelle Gestaltung und handwerkliche Qualität suchen. Frage: „Wie läuft das ab, und lohnt sich der erste Schritt?“
- **Nutzungskontext:** offen (keine Daten). Annahme für den Entwurf: mobiler Einstieg über Suche oder Empfehlung.
- **Belege und Referenzen:** keine. Bewusst keine Bewertungen, Auszeichnungen, Zahlen oder Kundenprojekte.
- **Assets und Rechte:** siehe [Bildnachweis](#bildnachweis). Schriften Archivo und IBM Plex Mono (SIL OFL), lokal ausgeliefert über `next/font`.
- **Seiten:** Startseite (Ein-Seiter), Impressum- und Datenschutz-Platzhalter, 404. Deutsch.
- **Formulare, Dienste:** Anfrageformular als Demo (Server Action validiert, verwirft). Keine Drittanbieter, keine Cookies.

## Marke

- **Soll vermitteln:** präzise, ruhig, materialnah, räumlich, ehrlich.
- **Soll nicht vermitteln:** rustikal, Katalog, Luxus-Pose.
- **Nach fünf Sekunden:** Tischlerei für Möbel und Einbauten nach Maß; der Weg zur Anfrage ist sichtbar.
- **Interaktionsgrad:** expressiv in wenigen Momenten, sonst ruhig.

## Designrichtung

- **Leitidee:** *Erst die Linie. Dann das Holz.* Die blau gekreidete Schlagschnur, mit der Tischler gerade Linien anreißen, ist roter Faden, Akzentfarbe und erste Bewegung.
- **Typografie:** Archivo (variable Breitenachse 62–125) für Display und Text; die Breitenachse wird zum Materialbild: „Holz arbeitet“, das Wort quillt beim Scrollen in die Breite. IBM Plex Mono für technische Beschriftungen wie auf einer Werkzeichnung.
- **Farben / Tokens:** Kalkputz `#ece8e0` (Fläche), Mooreiche `#1a1815` (Schrift, dunkler Akt „Fügung“), Schlagschnur-Blau `#2336c2` (Akzent; 7,7 : 1 auf Kalkputz), helles Blau `#9aa5ff` auf Dunkel. Keine Radien. Tokens in `app/globals.css`.
- **Kundenmerkmale → Gestaltung:**
  - Falz (Brettprofil) → Wortmarke, L-förmige Aussparung im Hero-Bild mit „Schriftfeld“, Fußzeilen-Wortmarke.
  - Aufmaß → Maßketten an Bildern.
  - Zeichnung → Zeichenschiene legt das Bild frei.
  - Holzbewegung → variable Schriftbreite.
  - Holzverbindung → isometrische Montage.
  - Einbauschrank → Bild hinter aufschwenkenden Türen.
- **Aufbau:** der Entstehung eines Möbels folgend: Einstieg „Linie“ → 01 Raum → 02 Zeichnung → 03 Material → 04 Fügung (dunkler Höhepunkt) → 05 Arbeitsweise mit Leistungen → 06 Anfrage. Bildmaßstab wächst vom Makro (Hirnholz) zum Raum.
- **Geprüfte strukturelle Alternative:**
  - **B „Maßblatt/Index“:** die Seite als technisches Zeichenblatt mit Leistungsindex und Plan-Einschüben.
  - **Verworfen,** weil ohne reale Projekte ein Index leer wirkt und die Besucherfrage („Wie läuft das ab?“) eine Erzählung braucht.
  - **Übernommen** aus B: Maßketten und Schriftfeld als typografische Mittel.
- **Motion (Dramaturgie):**
  1. Schlagschnur wird gespannt, gezupft, Kreideabdruck bleibt; „Holz.“ quillt; der Falz wird ins Bild gefräst (CSS, einmalig).
  2. Ruhe, dann Türen schwenken vor dem Raum auf, Maßketten ziehen sich (einmalig beim Erreichen).
  3. Zeichenschiene (scrollgekoppelt).
  4. Materiallupe (vom Nutzer gesteuert).
  5. Schwalbenschwanz-Montage, isometrisch aus echter 3D-Geometrie projiziert, sticky und scrollgekoppelt, ohne Scroll-Hijacking.
  6. Ruhige Maßkette der Arbeitsschritte.
  7. Schlagschnur-Rückruf über dem Formular.

  Bei `prefers-reduced-motion` und ohne JavaScript gelten Endzustände.
- **Mobile Umsetzung:**
  - Typografie-geführter Einstieg, Bild mit Falz darunter.
  - Menü als vollflächiger `<dialog>`; „Anfrage“ immer in der Kopfzeile.
  - Montage: Zeichnung oben, aktive Erläuterung darunter.
  - Materialwahl als 2×2-Tabs.
  - Werkstattbild mit eigenem Hochformat-Ausschnitt.

  Desktop erweitert um Split-Einstieg, Sticky-Text und horizontale Maßkette.
- **Designprobe / visueller Review:**
  - Probe aus Einstieg und Kapitel „Raum“ bei 375 und 1440 px geprüft.
  - Korrigiert:
    - unsichtbare Schnur (singuläre Matrix bei `scaleY(0)`, Filterregion ohne Höhe);
    - Schnur-Versatz (`transform-box: view-box`);
    - 61 px Überlauf;
    - zu konventioneller Desktop-Split (Falz und Schriftfeld ergänzt);
    - CTA unter dem Falz.
  - Danach korrigiert:
    - Kameraposition der Montage (Verbindung zeigt zum Betrachter);
    - Lupen-Fadenkreuz;
    - Fußzeilen-Umbruch;
    - Tablet-Stufe;
    - Layoutsprung nach der Hydration: Die Montage-Spur wuchs erst mit JavaScript auf 260svh, wodurch frühe Ankersprünge verrutschten. Die Höhe hängt jetzt nur an der Media Query.
- **Bewusst vermeiden:** Creme/Serif/Terrakotta-Handwerksklischee, Bewertungs- und Zahlenblöcke, Card-Raster, Pill-Buttons.

## Bildnachweis

| Datei | Motiv | Herkunft |
|---|---|---|
| `assets/images/endgrain.webp` | Hirnholz mit Hobelspan | KI-generiert, GPT Image 2.5 via Higgsfield, Job `d7332b4f` |
| `assets/images/einbauwand.webp` | Einbauwand mit Fenstersitz | KI-generiert, Job `018d3527` |
| `assets/images/zeichnung.webp` | Entwurfszeichnung, Zollstock | KI-generiert, Job `46cc77a1` |
| `assets/images/muster.webp` | Holzmuster auf Kalkputz | KI-generiert, Job `eb2120db` |
| `assets/images/zinken.webp` | Schwalbenschwanzzinken | KI-generiert, Job `85e68bec` |
| `assets/images/hobel.webp` | Hände mit Handhobel | KI-generiert, Job `c41cb13b` |
| `assets/images/werkstatt.webp`, `werkstatt-mobil.webp` | Werkstatt (mobil: eigener Ausschnitt) | KI-generiert, Job `b97a2940` |
| `assets/images/kueche.webp` | Küche Nussbaum/Eiche | KI-generiert, Job `122b78c9` |
| `assets/images/anriss-1878.webp` | „Carpenter’s square, ink-line (chalk line), marker“, Japan 1878, Ausschnitt | Library of Congress, Japanese Fine Prints, LCCN 2009630306, gemeinfrei; via Wikimedia Commons |

Alle KI-Bilder: erzeugt am 27.10.2026, Qualität „medium“, 2K, gemeinsame Bildsprache (Streiflicht von einer Seite, Kalkputz, warme Neutraltöne, ohne Personen außer Händen, keine Schrift). Sie sind auf der Seite als KI-Konzeptbilder gekennzeichnet und nicht als Kundenarbeiten dargestellt. Zwei weitere Bilder (Werkstatt kühl/unruhig, Entwurf zu traditionell) wurden verworfen. Recherchierte, aber nicht verwendete Fotos auf Wikimedia Commons (z. B. Schlagschnur-Fotos der US Navy, gemeinfrei) passten nicht zur Bildsprache.

## Technik

- **Versionen (Lockdatei):** Node 22.22.0, npm 11.11.0, Next.js 16.4.3 (App Router, Turbopack), React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.3, lucide-react 1.62.0, Zod 4.6.7, Playwright 1.58.2 (dev).
- **Styling / Motion:** Tailwind plus eigenes CSS (`globals.css`, `sections.css`). Keine Motion- oder GSAP-Bibliothek: CSS-Keyframes, eine scrollgetriebene CSS-Animation (Lesefortschritt, Progressive Enhancement) und zwei kleine Hooks (`lib/motion.ts`, Mechanik adaptiert aus `alzag-component-lab` `motion-policy.ts`). `DoorReveal` entstand aus dem Lab-Mechanismus `ImageMaskReveal`.
- **Abweichungen:** keine. TypeScript 7 bewusst nicht verwendet (Lab und Next-Ökosystem auf 5.9).

## Prüfstand (27.10.2026)

- **Bestanden:**
  - `typecheck`, `lint` (inkl. `@typescript-eslint/no-deprecated`), `build`: grün, alle Routen statisch.
  - Playwright gegen `next start` in Chromium mit Emulation, mobil 375 px und Desktop 1440 px: 21 bestanden, 1 bewusst übersprungen (Mobilmenü-Test nur mobil); in 5 und 3 Wiederholungen ohne Ausfall. Abgedeckt:
    - Überlauf 320–1920 px;
    - Konsolenfehler;
    - Menü mit Escape und Fokusrückgabe;
    - CTA;
    - Material-Tabs mit Tastatur;
    - Formularfehler und -erfolg;
    - Skip-Link;
    - Reduced Motion;
    - ohne JavaScript;
    - 404.
  - `npm audit --omit=dev`: 0 Funde.
  - Gedrosselte Messung (Chromium-Emulation, 390×844, 150 ms RTT, 1,6 Mbit/s, CPU 4×, localhost): LCP ≈ 0,9 s (Hero-Bild, 32 kB AVIF), CLS ≈ 0,05.
- **Nicht geprüft:** echte Geräte, mobiles Safari/Firefox, Screenreader, axe-Scan, Lighthouse, Bildschirmtastatur, Querformat.

## Freigaben

| Freigabe | Wer | Datum |
|---|---|---|
| Designrichtung | — (Explore) | |
| Veröffentlichung | — (nicht vorgesehen) | |

## Offene Fragen

- TODO(content): echte Kontaktdaten, Impressum, Datenschutzerklärung, Einwilligungstext (juristisch zu prüfen).
- Für ein echtes Projekt: eigene Fotografie aus Werkstatt und realen Projekten statt KI-Bildern.
