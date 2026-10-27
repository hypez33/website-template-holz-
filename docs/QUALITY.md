# Qualität: Tests, Accessibility, SEO, Sicherheit, Release

## 1. Testing

**Während der Arbeit:** Typecheck, Build und gezielte Funktionstests für das Geänderte. Bei neuen Seitenkonzepten die gerenderte Designprobe früh zuerst bei 360–390 px und dann auf Desktop prüfen: Inhaltshierarchie, Kundenbezug, Bilder und nächste Handlung. Wichtigste Schwächen benennen, korrigieren und betroffene Ansicht erneut prüfen. Bei kleinen Änderungen genügt der betroffene Bereich; keine vollständigen Testläufe nach jeder Kleinigkeit.

**Mobile Kernpfade:** Menü öffnen/schließen, primären CTA verfolgen und vorhandene Formulare mit Bildschirmtastatur einschließlich Fehler/Erfolg prüfen. Dazu Touch ohne Hover, Sticky-/Cookie-Überlagerungen, kurze Höhe/Querformat, Textvergrößerung und Reduced Motion. Vor Launch auf mobilem Safari und Android Chrome sowie mindestens einem echten Smartphone prüfen; Emulation und echte Geräte getrennt benennen. Fehlende Browser-/Gerätenachweise sind offene Releasepunkte, keine bestandenen Tests.

**In CI bei Pull Requests:** Installation mit eingefrorener Lockdatei, `typecheck`, `lint`, `build` sowie vorhandene E2E-Tests.

**Playwright-Konventionen:** Locator über Rolle und Label (`getByRole`, `getByLabel`); keine festen Wartezeiten; Tests gegen den Produktionsbuild; kein externes Netzwerk; keine echten E-Mails. Instabile Tests reparieren statt wiederholen.

Fehlgeschlagene oder nicht ausgeführte Prüfungen werden genannt, nie als bestanden dargestellt.

## 2. Accessibility (immer)

Ziel ist WCAG 2.2 AA. Ob rechtliche Pflichten bestehen (z. B. BFSG), klärt der Kunde. Grundlegend gilt immer:

- Alles per Tastatur bedienbar, sichtbarer Fokus (`:focus-visible`), Skip-Link, `Escape` schließt Overlays, der Fokus kehrt zurück.
- Semantisches HTML: eine `h1` pro Seite, logische Überschriften, Landmarks, `lang`; Buttons für Aktionen, Links für Navigation.
- Kontrast mindestens 4,5 : 1 für Text, 3 : 1 für großen Text, UI-Elemente und Fokus — auch bei Text auf Bild oder Video.
- Alternativtexte (dekorative Bilder `alt=""`); Icon-Buttons haben einen zugänglichen Namen.
- Formulare mit sichtbaren Labels; Fehler als Text am Feld, verknüpft per `aria-describedby`; passende `autocomplete`-Attribute.
- Touch-Flächen nach [CREATIVE § 8](CREATIVE.md#8-mobile-first) gestalten. [WCAG 2.2 AA, Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) verlangt grundsätzlich 24 × 24 CSS-px oder die dort geregelten Ausnahmen; unser 44-px-Controlstandard ist bewusst strenger. Keine Information nur per Hover; Reflow bei 320 CSS-px ohne horizontales Seitenscrollen. Fachlich nötige zweidimensionale Inhalte dürfen einen bedienbaren lokalen Scroller haben.
- `prefers-reduced-motion` respektieren; nichts blinkt mehr als dreimal pro Sekunde; Bewegtinhalte über 5 Sekunden sind pausierbar.
- Native Elemente vor ARIA; komplexe Widgets über geprüfte Headless-Primitives.

## 3. SEO (Kundenwebsites)

- Metadata API: eindeutige Titel und Descriptions, `metadataBase`, Canonical, Open Graph inklusive Bild.
- `sitemap` und `robots`; Previews und Staging nicht indexierbar; die 404-Seite liefert Status 404.
- Bei Relaunch alte URLs per 301 weiterleiten.
- Strukturierte Daten nur mit echten, bestätigten Informationen; keine erfundenen Bewertungen oder FAQs; JSON-LD sicher serialisieren.
- Keine generierten SEO-Fülltexte, kein Keyword-Stuffing.

## 4. Sicherheit und Datenschutz (immer)

Agenten geben keine Rechtsberatung. Rechtliches markieren sie als „juristisch zu prüfen“.

- **Secrets:** nicht im Client, nicht im Repo, nicht in Logs; `.env*` in `.gitignore`, nur `.env.example` mit Namen einchecken. Geleakte Secrets sofort rotieren.
- **Endpunkte:** Server Actions und Route Handler validieren serverseitig und prüfen wo nötig Berechtigungen; verständliche Fehlermeldungen ohne Interna. Fehlerfälle (Mail-Dienst down, doppeltes Absenden) behandeln, ohne Eingaben zu verlieren.
- **Formulare:** Spam-Schutz (Honeypot, Rate Limiting), Längenlimits, keine Nutzereingaben in Mail-Headern, keine offenen Weiterleitungen, Uploads serverseitig prüfen.
- **Ausgabe:** kein `dangerouslySetInnerHTML` mit nicht vertrauenswürdigen Inhalten.
- **Header in Produktion:** HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, Framing-Schutz, `poweredByHeader: false`; eine CSP, wo vertretbar.
- **Abhängigkeiten:** Vor dem Release ein Audit der Produktionsabhängigkeiten (z. B. `npm audit --omit=dev`), keine ungeprüften *high*/*critical*-Funde. Kritische Sicherheitsupdates für Next.js/React zeitnah einspielen.
- **Datenschutz:** keine Drittanbieter-Verbindungen vor einer nötigen Einwilligung (Schriften selbst hosten, Karten und Videos per Klick laden); nur nötige Formularfelder; keine personenbezogenen Daten in URLs, Logs oder Analytics.
- **Rechtliches:** Impressum und Datenschutzerklärung von jeder Seite erreichbar; die Inhalte liefert der Kunde. Ein Einwilligungsdialog bietet „Ablehnen“ so einfach wie „Akzeptieren“.

## 5. Release-Check

Vor wichtigen Veröffentlichungen, im Abschlussbericht mit Ergebnis.

**Standard:**

- [ ] Typecheck, Lint, Build grün; keine Konsolenfehler auf Schlüsselseiten
- [ ] Mobile Kernpfade aus § 1 geprüft; mobile Safari-/Chrome- und echter Smartphone-Nachweis oder konkret offener Releasepunkt genannt
- [ ] Navigation, Mobilmenü, Formulare inklusive Fehler- und Erfolgsfall getestet
- [ ] Früher visueller Review auf Mobil und Desktop; Kundenbezug und Inhaltsgewichtung sichtbar, wichtigste Schwächen korrigiert
- [ ] Kein horizontaler Seiten-Overflow bei 360, 390, 768, 1280 und 1920 px; 320-px-Reflow, kurze Höhe/Querformat, Zoom und Bildschirmtastatur geprüft
- [ ] Tastaturdurchlauf, Kontraste, reduzierte Bewegung geprüft
- [ ] Keine `TODO(content)`-Platzhalter, keine erfundenen Inhalte; Bilder, Texte und Schriften mit Nutzungsrechten
- [ ] Metadaten, Sitemap, `robots`, 404, Weiterleitungen; Produktion indexierbar, Preview nicht
- [ ] Sicherheitsheader, Audit, keine Secrets im Bundle; keine Drittanbieter vor Einwilligung
- [ ] Impressum und Datenschutz vom Kunden bestätigt
- [ ] Performance-Ziele zuerst unter dokumentierten mobilen Bedingungen gemessen ([ENGINEERING.md](ENGINEERING.md#7-performance)); Bildkandidaten/Transfergrößen geprüft oder Zielkonflikt benannt
- [ ] Kurzes README zu Betrieb, Content-Pflege und Deployment

**Signature zusätzlich:**

- [ ] Lighthouse Mobil mit Messwerten je Schlüsselvorlage
- [ ] axe-Scan ohne *critical*/*serious*-Befunde; Screenreader-Schnellcheck
- [ ] Ergänzend echter iPhone- und Android-Gerätetest; Screenshots der Schlüsselvorlagen auf Mobil und Desktop
- [ ] Felddaten etwa vier Wochen nach Launch nachprüfen

**Explore:** Typecheck und Build; bei UI eine kurze mobile Sichtprüfung des Experiments. Kein vollständiger Release-Check, keine Geräte- oder Browserzertifizierung.

