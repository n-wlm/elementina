---
id: adrs
title: Architekturentscheidungen
order: 50
status: current
last_updated: 2026-06-17
owner: @naim
linked_paths: src/App.jsx, src/styles.css, src/data.js, index.html
summary: Die wesentlichen Entscheidungen und ihr Warum, neueste zuerst.
---

Jede bedeutsame Entscheidung wird einmal festgehalten — das *Warum*, damit sie
nicht erneut aufgerollt wird. Neueste zuerst.

## ADR-004: Fluides, gerätegnostisches Layout statt Fix-auf-1920×1080

**Status:** accepted

> [!DECISION] Das Layout skaliert fluid (clamp/dvh/Safe-Areas) und füllt auf
> echten Handys den ganzen Screen; Desktop/Tablet behalten das zentrierte
> Phone-Mockup.

**Kontext** — Ursprünglich war alles auf 1920×1080 optimiert. Eine erzwungene
`min-height: 720px` am Device-Frame plus `overflow: hidden` führten auf kleinen
und quer gehaltenen Geräten zu Abschneiden: der wachsende Fragebaum (bis 6
Kacheln) und der Auflegen-Button wurden geclippt, ohne Scroll.

**Entscheidung** — Feste Mindesthöhe entfernt, durchgehend `dvh`. Im
FaceTime-Screen ist die Avatar-Stage die flexible Schrumpfzone (`minmax(0,1fr)`
+ `clamp`); Antwort-Panel und Fragebaum-Dock bekommen je einen *eingegrenzten*
Scrollbereich als Sicherheitsnetz. Vollbild-Modus für Handys per
`max-width: 540px` **oder** `max-height: 540px`, eigenes Querformat-Layout,
`viewport-fit=cover` + `env(safe-area-inset-*)`.

**Konsequenzen** — App ist von ≈320px bis 4K-Vertikal nutzbar, kein
Clipping/Overlap. Preis: zwei Inhaltsbereiche dürfen auf sehr kleinen Screens
intern scrollen, und die Identity-Card wird unter 720px Höhe ausgeblendet
(Name steht ohnehin im Header). Verifiziert an 320–1920 px Breakpoints.

## ADR-003: Browser-`speechSynthesis` als optionales, abschaltbares TTS

**Status:** accepted

> [!DECISION] Sprachausgabe nutzt die Browser-`speechSynthesis` und ist per
> Toggle deaktivierbar.

**Kontext** — Vorlesen erhöht die Zugänglichkeit, aber hochwertige Cloud-Voices
kosten Geld und brauchen Infrastruktur; Browser-TTS klingt je nach OS/Browser
sehr unterschiedlich.

**Entscheidung** — Für den Prototyp die eingebaute `speechSynthesis` (de-DE) als
optionalen Toggle; bei fehlender Unterstützung wird der Toggle deaktiviert.

**Konsequenzen** — Keine Hardware-/Cloud-Abhängigkeit, sofort lauffähig.
Qualität schwankt — ein hochwertiger Voice-Provider bleibt bewusst offen für
eine spätere Iteration und kann hinter `useSpeech` ausgetauscht werden.

## ADR-002: Persona-spezifischer Fragebaum mit `unlocks`

**Status:** accepted

> [!DECISION] Statt einer flachen Fragenliste hat jede Persona einen eigenen
> Fragebaum; Antworten schalten Folgefragen frei.

**Kontext** — Eine flache Liste skaliert schlecht und erlaubt keine
dramaturgische Führung pro Element.

**Entscheidung** — Pro Persona `introStatement`, `initialQuestionIds` und
`questions[id]` mit `unlocks`. Nach jeder Antwort werden neue Fragen additiv
eingeblendet (siehe [Datenmodell](#data-model)).

**Konsequenzen** — Skaliert für weitere Personas, ermöglicht geführte
Erzählung, macht redaktionelle Pflege eindeutig. Etwas mehr Datenstruktur als
eine flache Liste.

## ADR-001: Kein Backend — statische In-App-Daten

**Status:** accepted

> [!DECISION] Reine Client-SPA mit React + Vite, alle Inhalte im Bundle, kein
> Server.

**Kontext** — Zielumgebung ist eine Ausstellungs-Installation; ein schneller
Prototyping-Loop und eine einfache Deploy-/Kiosk-Story sind wichtiger als
dynamische Inhalte zur Laufzeit.

**Entscheidung** — Single-Page-Prototyp ohne Backend; Inhalte in `src/data.js`;
Styling über eine zentrale CSS-Datei ohne UI-Library.

**Konsequenzen** — Offline lauffähig, keine Betriebskosten, volle visuelle
Kontrolle. Inhalte werden per Code-Datei gepflegt; eine externe Datenquelle
(CMS/JSON-Import) bleibt bewusst offen für später.
