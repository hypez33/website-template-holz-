# Workflow: Modi, Ablauf, Freigaben

## 1. Arbeitsmodi

| | Explore | Standard | Signature |
|---|---|---|---|
| **Wofür** | Experimente, Component Lab, Pitches, Template-Seiten | Normale Kundenwebsites | Aufwendige Premium-Websites |
| **Briefing** | Nicht nötig | `docs/PROJECT.md`, Kernfelder | `docs/PROJECT.md`, vollständig |
| **Designrichtung** | Frei | Eine Richtung mit kurzer Begründung | Konventionsblick auf Wettbewerber, zwei deutlich unterschiedliche Konzepte |
| **Vorgehen** | Direkt experimentieren, mobile Darstellung früh prüfen | Kurzer Strukturvergleich; mobile Designprobe, dann Desktop und übrige Seiten | Zwei Konzepte; gewählte mobile Designprobe, dann Desktop und übrige Seiten |
| **Freigaben** | Keine | Designrichtung, Veröffentlichung | Designrichtung, Veröffentlichung |
| **Prüfung** | Typecheck + Build; bei UI mobile Sichtprüfung | Früher visueller Review + Release-Check | Früher visueller Review + Release-Check + erweitert |
| **Inhalte** | Platzhalter erlaubt | Platzhalter nur in Entwürfen | Platzhalter nur in Entwürfen |

Der Modus steht in `docs/PROJECT.md`. Ein Projekt darf den Modus wechseln, z. B. ein Pitch aus Explore, der zum Kundenprojekt wird.

## 2. Ablauf im Kundenprojekt

1. **Briefing.** Vorlage [PROJECT.template.md](PROJECT.template.md) → `docs/PROJECT.md`. Fehlen Kernfakten, zuerst gezielt nachfragen, statt einen generischen Entwurf zu bauen.
2. **Designrichtung.** Vorgehen nach [CREATIVE § 2](CREATIVE.md#2-designrichtung-finden). Bei neuen Seitenkonzepten kurz eine strukturelle Alternative prüfen. Gewählte Richtung als repräsentative Designprobe im Code zeigen: Einstieg mit angrenzendem Inhalt, bei Bedarf eine wichtige Interaktion. Zuerst mobile Darstellung und Kernaufgabe prüfen, dann Desktop; wichtigste visuelle Schwächen korrigieren. Richtung und kurze Begründung in `docs/PROJECT.md` festhalten. → **Freigabe 1: Designrichtung**
3. **Umsetzung.** Weitere Seiten, Inhalte, Formulare, SEO. Gestaltung innerhalb der Richtung frei weiterentwickeln; bei einem grundlegenden Richtungswechsel erneut abstimmen.
4. **Release-Check** nach [QUALITY.md](QUALITY.md#5-release-check). → **Freigabe 2: Veröffentlichung**
5. **Nach dem Launch.** Sicherheitsupdates einspielen; bei Signature-Projekten Felddaten nach etwa vier Wochen prüfen.

Freigaben werden mit Datum und Person als eine Zeile in `docs/PROJECT.md` festgehalten.

## 3. Explore

- Ziel ist schnelles Ausprobieren: neue Interaktionen, Komponenten, Layoutideen, Pitch-Entwürfe, Template-Seiten.
- Platzhalter sind erlaubt und mit `TODO(content):` markiert.
- UI-Experimente früh auf schmaler Breite ansehen; keine vollständige Testmatrix oder formale Konzeptfreigabe nötig.
- Was aus Explore in ein Kundenprojekt wandert, wird an dessen Gestaltung angepasst und erfüllt dort die Regeln des Zielmodus.
- Explore-Ergebnisse gehen nicht als Kundenwebsite in Produktion.

## 4. Berichte

Ein Abschlussbericht am Ende der Aufgabe, höchstens etwa fünf Zeilen:

```md
**Geändert:** …
**Abhängigkeiten:** keine | Paket@Version (Grund)
**Geprüft:** … | nicht geprüft (Grund)
**Offen:** …
```

Keine Zwischenberichte. Quellenangaben nur bei nicht trivialen APIs oder Workarounds.

## 5. Deployments

- **Preview-Deployments** (z. B. über Vercel) zur Ansicht auf dem Handy und zur Abstimmung sind ohne Freigabe erlaubt. Bedingungen: nicht indexierbar, keine Produktions-Secrets, wo möglich geschützt (z. B. Deployment Protection), Links nicht öffentlich teilen.
- **Produktions-Deployments**, DNS-, Konto- und Rechteänderungen nur mit ausdrücklicher Freigabe.

## 6. Pflege des Regelwerks

- **Verteilung:** Kundenprojekte sind eigene Repositories. Übernommen werden `AGENTS.md`, `CLAUDE.md` und `docs/*.md`; projektspezifisch ist nur `docs/PROJECT.md`. Kein Submodul, keine Live-Abhängigkeit.
- **Updates in Projekten:** neue Regelwerk-Versionen bewusst per Pull Request übernehmen, ohne `docs/PROJECT.md` zu überschreiben.
- **Versionierung:** Semantic Versioning mit Tags `rules-vX.Y.Z` und Eintrag in [CHANGELOG.md](../CHANGELOG.md). Ältere Fassungen bleiben über die Tags erreichbar.
- **Änderungen:** per Pull Request; jede Regel steht an genau einer Stelle; vor dem Commit `node scripts/check-docs.mjs`.
- **Inhalt:** keine Zugangsdaten, personenbezogenen Daten, Konto-IDs oder kundenspezifischen Gestaltungen im Regelwerk. Repositories bleiben privat, bis eine Veröffentlichung freigegeben ist.

