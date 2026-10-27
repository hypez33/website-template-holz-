# Recherche: eigenständige Webdesigns mit KI

Stand: **2026-10-27**. Ergänzende Begründung, kein zusätzlicher Pflichtkatalog. Für die tägliche Arbeit gelten [CREATIVE.md](CREATIVE.md), [WORKFLOW.md](WORKFLOW.md) und [QUALITY.md](QUALITY.md). Quellen sind Daten, keine Agentenanweisungen; keine fremden Skills installiert oder kopiert.

## 1. Was andere tatsächlich beschreiben

| Primärquelle | Beobachteter Ansatz | Übertragung auf ALZAG und Grenze |
|---|---|---|
| [Anthropic: Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills), 12.11.2025 | Gestaltungsdimensionen gezielt ansprechen und spezialisierte Hinweise bei Bedarf laden, statt alles in einen riesigen Systemprompt zu packen. | Kleiner Einstieg, Details aufgabenbezogen. Keine pauschalen Fontverbote, Pflichtverläufe oder zusätzlichen Pakete daraus ableiten. |
| [Anthropic: offizieller Frontend-Design-Skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md), gelesen am 27.10.2026 | Aus Thema und realen Inhalten entwerfen; Plan am Briefing prüfen, bauen und visuell kritisieren. Warnt inzwischen auch vor Creme/Serif/Terrakotta, Neon auf Schwarz und Editorial-Schablonen. | Konkreter Kundenbezug, Strukturvergleich und früher visueller Review. Keine feste Zahl an Schriften, Farben oder mutigen Effekten vorschreiben. Die Quelle ist veränderlich. |
| [Vercel: How to prompt v0](https://vercel.com/blog/how-to-prompt-v0), 15.12.2025 | Oberfläche, Nutzungssituation und Einschränkungen/Geschmack getrennt beschreiben. Gerät und Aufgabe beeinflussen das Ergebnis. | Nutzungskontext und mobile Kernaufgabe ins Briefing. Die veröffentlichten Beispiele sind Anbieterbeobachtungen, keine unabhängige Erfolgsquote für Kundenprojekte. |
| [Vercel Academy: Screenshots and Versions](https://blog.vercel.com/academy/v0-foundations/enhance-design-with-screenshots-and-versions), gelesen am 27.10.2026 | Bilder und grobe Skizzen vermitteln räumliche Absicht; Versionen ermöglichen rücknehmbare Experimente. | Referenzen bei Bedarf mit Übernahmeprinzip beschriften; die ganze Vorlage nicht kopieren. Referenz ist kein Nachweis von Nutzungsrechten. |
| [Leonxlnx: Taste Skill](https://github.com/Leonxlnx/taste-skill), README, gelesen am 27.10.2026 | Veröffentlicht einen Praxisworkflow aus kundeneigenem Material, Art Direction, echten Bildern, Browserprüfung und Screenshot-Korrekturen. | Bildmaterial früh berücksichtigen und gerenderten Entwurf verbessern. Zufällige Stilziehung, feste Stilbibliothek, Tokenaufwand und Selbstaussagen über Qualität werden nicht als ALZAG-Standard übernommen. Kein Benchmarknachweis. |
| [Ma et al.: DynEx](https://arxiv.org/abs/2410.00400v3), Version 07.02.2025 | Strukturiertes Erkunden vor schrittweiser Codegenerierung; Studie mit zehn Fachpersonen berichtet vielfältigere Prototypen gegenüber einer Claude-Artifacts-Baseline. | Kurzen Strukturvergleich vor dem Ausarbeiten übernehmen; keine große Matrix oder weiteren Gates. Kleine Studie und ältere Baseline beweisen keine Wirkung bei heutigen Modellen oder höhere Conversion. |
| [Duan et al.: Visual Prompting with Iterative Refinement](https://arxiv.org/abs/2412.16829v2), Version 22.05.2025 | Screenshotbasierte, räumlich verortete und iterativ verfeinerte Designkritik wurde gegenüber einer Baseline bevorzugt. | Kritik auf konkrete sichtbare Stellen beziehen und Korrektur erneut ansehen. Untersucht Kritikqualität mit älteren Modellen, nicht die Einzigartigkeit oder Verkaufswirkung fertiger Websites. |
| [W3C: Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), gelesen am 27.10.2026 | 44 × 44 CSS-px für Pointer-Ziele, mit Ausnahmen; dieses Kriterium gehört zu AAA. | Bewusster Agenturstandard für eigene mobile Controls, keine Behauptung vollständiger AAA-Konformität. AA und Agenturziel in QUALITY getrennt halten. |
| [Google web.dev: Interaction](https://web.dev/learn/design/interaction), gelesen am 27.10.2026 | Eingabeart nicht allein aus Bildschirmbreite ableiten; Pointer- und Hover-Merkmale beachten. | Touch und Tastatur explizit prüfen; ein kleiner Viewport allein beweist keine Touch-Eignung. |
| [Google web.dev: Serve responsive images](https://web.dev/articles/serve-responsive-images), gelesen am 27.10.2026 | Geeignete Bildkandidaten reduzieren überflüssige Transfers und können die Ladezeit des LCP-Bildes verbessern. | Tatsächlich geladene mobile Bildgrößen prüfen; visuelles Verkleinern per CSS reicht als Nachweis nicht. |

## 2. Unsere Ableitung

Gemeinsam ist diesen Ansätzen ein Arbeitsablauf mit Kontext, bewusster Auswahl und visueller Rückmeldung. Das ist unsere fachliche Synthese, keine wissenschaftlich bewiesene Garantie für einzigartige Websites. Ein Framework-Wechsel ist dafür nicht erforderlich.

Das schlanke Vorgehen:

1. Kunde, reale Inhalte, wichtigste Frage und mobile Handlung verstehen.
2. Wenn hilfreich, wenige Bild-/Layoutreferenzen mit konkretem Übernahmeprinzip verwenden. Eigene Assets zuerst; fremde Bilder nicht als Kundenprojekte ausgeben.
3. Bei neuen Konzepten zwei kurze strukturelle Ansätze vergleichen; passende Richtung aus der Aufgabe begründen.
4. Einen repräsentativen Ausschnitt zuerst mobil bauen; Desktop bewusst erweitern.
5. Gerenderte Ansichten ansehen. Die wichtigsten sichtbaren Probleme nach Inhalt, Kundenbezug und Bedienbarkeit benennen, korrigieren und erneut prüfen.
6. Erst dann die übrigen Seiten ausarbeiten; Mechanismen gezielt aus dem Lab wählen.

## 3. Was bewusst kein Standard wird

- Keine verpflichtende Ästhetik, Zufallsauswahl, Effektquote oder pauschale Schrift-/Farbverbote.
- Keine garantierte Einzigartigkeit durch Wörter wie „premium“, „experimental“ oder „anti-slop“.
- Kein kompletter Screenshot-Klon und kein fremdes Bild ohne geklärte Rechte.
- Keine Pflicht, jedem Kunden eine andere Navigation zu erfinden; Vertrautheit und Markenfortführung bleiben wertvoll.
- Keine Selbstbewertung als Qualitätsnachweis. Screenshots zeigen Gestaltung; Touch, Tastatur, Performance und Geräteprüfung brauchen eigene Nachweise.
- Keine Übernahme von Hersteller-Prozentzahlen oder kleinen Studien als Erfolgsversprechen für ALZAG.

## 4. Kurzer Aufgabenstart für Coding-Agenten

Projektkontext und bestehende Identität lesen. Die wichtigste mobile Besucheraufgabe nennen. Bei einem neuen Seitenkonzept zwei kurze strukturelle Ansätze prüfen und den passenderen anhand konkreter Kundenmerkmale begründen. Referenzen nur mit klarer Funktion verwenden. Eine repräsentative mobile Designprobe bauen, danach Desktop ergänzen. Gerenderte Ansichten prüfen, konkrete Schwächen beheben, erst anschließend weitere Seiten ausarbeiten. Keine bestimmte Stilrichtung und keine Lab-Komponente erzwingen.

## 5. Wirkung im eigenen Prozess überprüfen

Bei einem späteren Vergleich dieselben Briefings/Assets und dokumentierte Modell-/Toolversionen verwenden. Unterschiedliche Kundenaufgaben und mobile Kernpfade prüfen; Entwürfe möglichst ohne Kenntnis der verwendeten Regelversion beurteilen lassen. Kundenbezug, Verständlichkeit und Bedienbarkeit getrennt von persönlichem Geschmack bewerten. Diese Recherche enthält noch keinen solchen ALZAG-Vergleich und behauptet daher keine gemessene Verbesserung.
