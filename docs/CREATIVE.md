# Creative: Gestaltung, Motion, Tokens

## 1. Freiheit und Grundsatz

- Der Agent hat **ausdrücklich gestalterische Freiheit**. Es gibt keine festen Hero-Strukturen, keine Standardlayouts, keine wiederkehrenden Animationen und keine vorgeschriebene Ästhetik.
- Jede Kundenwebsite entsteht individuell aus dem Kunden: Angebot, Zielgruppe, Herkunft, Material, Sprache, Arbeitsweise.
- Eine Website hat **eine** klare Leitidee, z. B. typografisch-editorial, materialorientiert, architektonisch, industriell-präzise oder verspielt — nicht mehrere Ästhetiken wahllos gemischt.
- Bedienmuster und technische Effekte dürfen wiederverwendet werden; Kundenkompositionen und markentypische Inszenierungen werden nicht unverändert zu Agenturvorlagen. Innerhalb derselben Kundenmarke bleibt die Designsprache konsistent.
- Typografie, Symmetrie oder Asymmetrie, Bildanteil und Bewegung folgen der Aufgabe. Weder radikale Brüche noch ein bestimmter Stil sind Pflicht. Eigenständigkeit entsteht aus passenden Entscheidungen.
- Mobile ist die Ausgangsgestaltung für Kundenwebsites; eine andere Priorität braucht belegten Nutzungskontext in `docs/PROJECT.md`, siehe [§ 8](#8-mobile-first).

## 2. Designrichtung finden

**Bei neuen Seitenkonzepten (Standard und Signature):**

1. **Material verstehen:** konkrete Kundenmerkmale, reale Inhalte/Assets, wichtigste Besucherfrage und nächste Handlung bestimmen. „Modern“ oder „hochwertig“ allein begründet keine Gestaltung. Fehlende Fakten nicht erfinden.
2. **Kurz vergleichen:** zwei strukturell unterschiedliche Ansätze skizzieren, etwa andere Inhaltsgewichtung oder Bild-Text-Beziehung. Je wenige Sätze reichen; keine zwei fertigen Websites und keine feste Stil-Auswahlliste. Passendere Richtung anhand der Besucheraufgabe wählen.
3. **Richtung festhalten:** Leitidee, inhaltlicher Aufbau, Typografie, Farben, Bildwelt und mobile Umsetzung kurz in `docs/PROJECT.md` begründen. Wenn Referenzen helfen: wenige passende Bilder, Screenshots oder Skizzen verwenden; je Referenz das übertragbare Prinzip und das nicht zu Übernehmende nennen. Keine fremde Seite komplett nachbauen; Rechte klären.
4. **Früh zeigen und korrigieren:** repräsentative Designprobe im Code, zuerst Mobil, dann Desktop; gerenderte Ansichten prüfen, wichtigste Schwächen konkret benennen und beheben, bevor weitere Seiten entstehen. Umfang und Freigaben: [WORKFLOW.md](WORKFLOW.md#2-ablauf-im-kundenprojekt).

Kleine Änderungen und bestehende freigegebene Richtungen brauchen keinen neuen Konzeptvergleich. Explore darf direkt experimentieren; Thema, Ziel und mobile Darstellung müssen trotzdem erkennbar sein.

**Signature zusätzlich:** Die Konventionen von drei bis fünf Wettbewerbern sichten — was erwarten Nutzerinnen und Nutzer, was macht austauschbar? Dazu zwei **deutlich unterschiedliche** Konzepte, die sich in Typografie, Komposition, Bildwelt oder Interaktion unterscheiden, nicht nur in der Farbe. Der Kunde wählt.

Die Begründung nennt beobachtbare Merkmale und ihre gestalterische Folge. Eine Metapher ist optional; kein Branchenklischee als Ersatz für Kundenwissen.

Recherche und zusätzliche Prompting-Hinweise stehen separat in [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md); nur bei Bedarf lesen.

## 3. Handwerk

- **Typografie:** Schrift bewusst wählen, auch eine Standardschrift. Klare Hierarchie; Fließtext gut lesbar (etwa ab 16 px, 45–75 Zeichen pro Zeile). Lange deutsche Komposita bei 360 px prüfen (`hyphens: auto` mit `lang`, gezielt `&shy;`). Webfont-Lizenz klären.
- **Layout:** mit echten Inhaltslängen gestalten, nicht mit idealem Blindtext. Abwechslungsreicher Rhythmus statt eines Stapels gleichförmiger Sektionen; Übergänge bewusst gestalten.
- **Farbe:** Rollen mit Bezug zu Marke oder Material; Kontrast nach [QUALITY.md](QUALITY.md#2-accessibility-immer). Dunkle Gestaltung, Verläufe und Glas-Effekte bewusst einsetzen, nicht als Default.
- **Bilder:** echtes Material hat Vorrang. Stockfotos nur, wenn sie passen und nicht austauschbar wirken. KI-Bilder nur mit Zustimmung des Kunden — und nie als vermeintlich reale Personen, Teams, Projekte oder Produkte.
- **Texte:** konkret und belegbar statt Floskeln („Innovation trifft Leidenschaft“, „ganzheitliche Lösungen“). CTAs nennen die Handlung. Fehlende Inhalte als `TODO(content):` markieren.
- **Mobil:** Inhalt, Bildausschnitte, Typografie und Interaktion zuerst für schmale Ansichten entwickeln; Details in [§ 8](#8-mobile-first).

## 4. KI-Defaults nicht reflexhaft einsetzen

Die folgenden Muster sind nicht verboten, aber nur mit Markenbezug sinnvoll:

generische Farbverläufe und Verlaufstext · Glow-Orbs, Blobs, Partikel · beliebiges Glassmorphism · automatische Dark-/Glow-Ästhetik · drei austauschbare Cards nach dem Hero · Bento-Grid als Standard · zentrierter Hero mit Badge und zwei Buttons · Pill-Buttons und gleiche Radien überall · Logos als Text · Logo-Marquees ohne echte Logos · animierte Zähler ohne Beleg · generische 3D-Illustrationen und Dashboard-Mockups · Emojis als Icons · „Design by Library-Demo“.

Auch vermeintliche Alternativen können zu Defaults werden: Creme/Serif/Terrakotta, Schwarz mit Neonakzent, wahllose Editorial-Linien oder identische Reveal-Effekte. Keine Schrift, Farbe oder Layoutform ist pauschal verboten. Feste Kundenvorgaben bleiben maßgeblich.

Kurzer Selbsttest am gerenderten Ergebnis: Welche konkreten Eigenschaften dieses Kunden sind außer Logo, Farbe und Namen sichtbar? Welche Sektion würde mit nahezu beliebigem Inhalt genauso aussehen? Austauschbare Stellen überarbeiten; keine Neuheit erzwingen, die Orientierung oder Vertrauen verschlechtert.

## 5. Signature-Element

Der unverwechselbare Charakter kann aus Inhalt, Typografie, Fotografie, Komposition oder einer Interaktion entstehen. Eine spektakuläre Einzelkomponente oder Animation ist keine Pflicht. Ein gewählter Effekt dient der Marke und funktioniert auch mit Touch, reduzierter Bewegung und ohne JavaScript.

Im Component Lab zuerst die Besucheraufgabe bestimmen, dann den Mechanismus auswählen. Nutzungshinweise beschreiben „geeignet für“ und „vermeiden, wenn“; Demo-Skin, Standardwerte und ganze Sektionen sind keine Kunden-Art-Direction. Ohne passenden Mechanismus darf die Seite ohne Lab-Effekt entstehen.

## 6. Motion

Jede Animation hat eine Funktion: Orientierung, Hierarchie, Erzählung, Rückmeldung oder Markencharakter. Lieber wenige starke Momente als ständig bewegte Hintergründe.

**Niedrigste passende Stufe wählen:**

1. **CSS** — Transitions, Keyframes; Scroll-driven Animations und View Transitions als Progressive Enhancement.
2. **Motion** (`motion/react`) — React-State, Gesten, Layout- und Präsenzanimationen. Reduzierte Bewegung zentral über `MotionConfig reducedMotion="user"`.
3. **GSAP** mit `@gsap/react` — komplexe Scroll-Timelines, SVG-Choreografien. `useGSAP()` mit `scope`, `contextSafe` für Handler, `gsap.matchMedia()` für Breakpoints und reduzierte Bewegung; Plugins einmal registrieren.
4. **WebGL** (Three.js, R3F, OGL) — nur mit echtem Mehrwert: statischer Fallback zuerst, verzögert laden, außerhalb des Viewports pausieren, Pixeldichte ≤ 2, Ressourcen beim Unmount freigeben, Text als HTML.

Motion und GSAP nicht automatisch beide installieren.

**Immer:**

- Bei `prefers-reduced-motion: reduce` keine Verschiebungen, Parallax oder Scroll-Choreografien, höchstens kurze Überblendungen.
- Inhalte sind im Server-HTML sichtbar; das LCP-Element startet nicht unsichtbar.
- In Schleifen nur `transform` und `opacity`; kein Scroll-Hijacking, kein gesperrtes Scrollen während Animationen.
- Eigene Cursor nur bei `(hover: hover) and (pointer: fine)`.

## 7. Design-Tokens

Semantische Namen sind gemeinsam, die Werte gehören zur jeweiligen Kundenmarke — **kein globales ALZAG-Gold, kein Standard-Gradient, keine feste Rundung**. Neue Seiten derselben Marke verwenden ihre etablierten Tokens; neue Kunden übernehmen keine Beispielpalette.

- Farbe: `--color-surface`, `--color-foreground`, `--color-muted`, `--color-accent`, `--color-outline`, `--color-focus`
- Schrift: `--font-display`, `--font-body`, Größenskala
- Raum und Form: `--space-section`, `--layout-max`, `--grid-gutter`, `--radius-control`, `--radius-media`
- Bewegung: `--motion-enter`, `--motion-ease`, `--motion-distance`

Komponenten verwenden Tokens statt Rohwerten. Unausgefüllte Schnittstellenbeispiele (keine Palette, keine Designvorlage): [semantic-tokens.example.css](../examples/semantic-tokens.example.css), [project-identity.example.json](../examples/project-identity.example.json).

## 8. Mobile First

Gilt für neue Kundenwebsites und größere Seitenerweiterungen; bestehende Markenvorgaben bleiben erhalten. Abweichende Gerätepriorität nur mit belegtem Nutzungskontext, nicht aus Bequemlichkeit. Keine pauschale Besucherstatistik behaupten.

- **Inhalt und Conversion:** zuerst bei 360–390 CSS-px planen. Angebot und Nutzen zügig verständlich machen, den nächsten Schritt klar erreichbar halten. Kein Zwang, alles in einen Bildschirm zu quetschen. Wichtige Belege und Inhalte bleiben mobil erhalten; DOM-, Lese- und Fokusreihenfolge stimmen überein.
- **Komposition:** mobile Bild-Text-Beziehung, Ausschnitte und Rhythmus bewusst wählen. Eigenständigkeit erhalten; nicht nur Desktop-Spalten untereinander stapeln. Desktop nutzt zusätzlichen Raum, ohne die mobile Kernaufgabe zu ändern. Breakpoints folgen dem Inhalt, nicht bestimmten Gerätemodellen.
- **Bedienung:** kein wesentlicher Inhalt nur über Hover, Drag, präzise Zeigerbewegung oder Scroll-Effekt. Touch- und Tastaturalternative vorsehen. Hauptaktionen, Menü-, Schließen- und Formular-Controls mindestens 44 × 44 CSS-px Trefferfläche mit ausreichendem Abstand; Inline-Textlinks sind ausgenommen. Das ist der Agenturstandard, keine Behauptung über die AA-Mindestgröße.
- **Lesbarkeit:** lesbarer Fließtext, echte deutsche Inhaltslängen, Umbruch und Textvergrößerung prüfen. Kein `user-scalable=no` oder unterdrückter Zoom. Formulare mit passenden Eingabetypen, Autofill und verständlichen Fehlern.
- **Viewport und Overlays:** Browserleisten, Safe Areas, kurze Ansichten, Querformat und Bildschirmtastatur berücksichtigen. Keine abgeschnittenen Menüs oder verdeckten Felder/CTAs durch feste Höhen. Sticky-Header, Cookie-UI und optionale Kontaktleisten dürfen Inhalt und Fokus nicht überdecken; keine feste Bottom-Bar als Pflichtmuster.
- **Medien und Effekte:** passende Bildgrößen und mobile Ausschnitte, sparsame Schriften und ein sofort verständlicher Einstieg. Keine Desktop-Videos, WebGL-Szenen oder schweren Blur-Flächen automatisch mobil übernehmen. Leichtere Umsetzung wählen, wenn Lesbarkeit, Ladezeit oder Bedienreaktion leiden; Markencharakter und Informationswert erhalten.
- **Nachweis:** frühe mobile Sichtprüfung und Kernpfad-Tests nach [QUALITY.md](QUALITY.md#1-testing). Eine schmale Desktop-Ansicht ersetzt keine Prüfung von Touch, mobiler Tastatur und Browserleisten.
