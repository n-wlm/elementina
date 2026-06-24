---
id: ui-design
title: UI-Design
order: 60
status: current
last_updated: 2026-06-24
owner: @naim
linked_paths: src/styles.css, src/App.jsx, src/data.js
summary: Designsprache (Liquid Glass), Tokens, Screens und das responsive Verhalten.
---

## Designprinzipien

- **Vertraute Telefon-Metapher.** Auswahl wie eine Kontaktliste, Anruf wie
  FaceTime — minimaler kognitiver Overhead in der Ausstellung.
- **Liquid Glass.** Durchscheinende, leicht milchige Flächen (`backdrop-filter`),
  weiche Schatten, Glanzkanten. Tiefe statt Flat.
- **Touch-first.** Große Tap-Targets, keine Hover-Abhängigkeit.
- **Pro-Persona-Kolorierung.** Element-Farben fließen als CSS-Custom-Properties
  (`--tone`, `--glow`, `--persona-bg`) in Avatar und Hintergründe.
- **Fluid vor fix.** Größen über `clamp()`/`dvh`; ein Layout von ≈320px bis
  4K-Vertikal statt fixer Breakpoints (siehe [ADR-004](#adrs)).

## Design-Tokens

Keine Token-Datei — Werte leben in `src/styles.css` (global) und in `PERSONAS`
in `src/data.js` (pro Element). Die wichtigsten:

| Token | Wert | Verwendung |
| --- | --- | --- |
| Akzent Gold (Goldina) | `#f0c020` | Tone/Glow für Au-Persona |
| Akzent Blau (Kobaltin) | `#2878f0` | Tone/Glow für Co-Persona |
| App-Hintergrund | `#030305` / `#050509` | Bühne und Screens |
| Verbunden-Grün | `#61f083` | Call-Status, Anruf-Button-Verlauf |
| Hangup-Rot | `#ff6b62 → #ff2f27` | Auflegen-Button |
| Glass-Fläche | `rgba(18,19,27,.55)` + `blur(24px)` | `.glass`-Panels |
| Device-Frame-Breite | `min(92vw, 520px)` | zentriertes Mockup (Desktop/Tablet) |
| Schrift | Inter / System-Sans | gesamte UI |

## Screens & Komponenten

- **SelectionScreen** — Header, Kontaktliste der Personas (`ElementAvatar` +
  Name/Element/Tagline + Anruf-Dot) und iOS-artige Tabbar (`Anruf` / `Über`).
- **CallingScreen** — animierte Klingel-Ringe um den Avatar, „Wird angerufen…".
- **FaceTimeScreen** — Header mit Timer/Status, `SelfView` (Kamera-PiP),
  Avatar-Stage mit Identity-Card, Antwort-Panel, Fragebaum-Dock mit
  `LiquidButton`-Kacheln, Voice-Toggle und Auflegen-Button.
- **ElementAvatar** — prozeduraler „Element-Charakter" (Kopf, Augen, Mund,
  Orbits, Sparks) rein aus CSS; Größe über `--avatar-size`, Mund animiert beim
  „Sprechen" (`is-talking`).

## Responsives Verhalten

Ein fluides Grundlayout, ergänzt um wenige Breakpoints, die bei knappem Platz
gestaffelt Dekoratives ausblenden — damit Inhalt und Bedienelemente nie
überlappen oder unerreichbar werden.

- **Vollbild auf Handys:** bei `max-width: 540px` verschwindet der Phone-Rahmen,
  die App füllt den Screen (`100dvw`/`100dvh`); Safe-Areas via
  `env(safe-area-inset-*)`. Engere Abstände/Schriftgrößen zusätzlich bei
  `max-width: 380px`.
- **Desktop/Tablet:** zentriertes Phone-Mockup (`min(92vw, 520px)` breit,
  `min(94dvh, 980px)` hoch). Beide Auswahl- und FaceTime-Screen scrollen
  *innerhalb* des Rahmens, sodass alle 12 Personas bzw. lange Antworten + Fragen
  erreichbar bleiben.
- **Große Ausstellungs-/Vertikaldisplays** (`min-height: 1200px` und
  `min-width: 760px`): größerer Rahmen (`min(82vw, 760px)` × `min(94vh, 1440px)`)
  und hochskalierte Typo/Karten.
- **FaceTime-Schrumpflogik:** eigene Grid-Zeilen für Avatar-Stage
  (`minmax(0,1fr)`, schrumpft zuerst), Identity-Card, Antwort-Panel und Dock.
  Die Identity-Card liegt in **eigener Zeile** (nicht in der Avatar-Stage), damit
  sie beim Schrumpfen nie geclippt wird oder überlappt. Antwort-Panel
  (`max-height: 40dvh`, auf niedrigen Screens 32/30dvh) und Fragebaum-Dock scrollen
  *eingegrenzt* als Sicherheitsnetz.
- **Gestaffeltes Ausblenden bei wenig Platz** (verhindert Überlappungen):
  Identity-Card und Self-View-PiP unter `max-height: 720px` (die absolut
  positionierte PiP würde sonst beim Schrumpfen der Avatar-Zone mit Header
  kollidieren).
- **Sehr flach / Handy-Querformat** (`max-height: 560px`): Der dekorative Avatar
  wird ausgeblendet und die FaceTime-Zeilen auf `auto auto minmax(0,1fr)`
  reduziert — der Fragen-Dock erhält den flexiblen Rest, sodass der
  **Auflegen-Button immer erreichbar** bleibt und das Fragen-Grid darin scrollt
  statt über das Antwort-Panel zu wachsen. Der Auswahl-Header wird kompakt
  gesetzt, damit auch im Querformat sofort eine Element-Karte sichtbar ist.
- **Verifikation:** Überlappungs-/Clipping-frei per Browser-Preview und
  DOM-Bounding-Box-Check geprüft über 320×568, 375×667, 740×360 (Querformat),
  1024×600, 1280×720, 1366×768 und 1080×1920 — jeweils mit Antwort und allen
  sichtbaren Fragen. Scroll-Ränder (z. B. Auswahlliste ↔ Tabbar) grenzen exakt
  aneinander, ohne echte Überlappung.
