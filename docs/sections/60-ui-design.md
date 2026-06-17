---
id: ui-design
title: UI-Design
order: 60
status: current
last_updated: 2026-06-17
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

- **Vollbild auf Handys:** bei `max-width: 540px` *oder* `max-height: 540px`
  verschwindet der Phone-Rahmen, die App füllt den Screen; Safe-Areas via
  `env(safe-area-inset-*)`.
- **Desktop/Tablet:** zentriertes Phone-Mockup (`min(92vw, 520px)`).
- **FaceTime-Schrumpflogik:** eigene Grid-Zeilen für Avatar-Stage
  (`minmax(0,1fr)`, schrumpft zuerst), Identity-Card, Antwort-Panel und Dock.
  Die Identity-Card liegt in **eigener Zeile** (nicht in der Avatar-Stage), damit
  sie beim Schrumpfen nie geclippt wird oder überlappt. Antwort-Panel
  (`max-height: 40dvh`, auf niedrigen Screens 32dvh) und Fragebaum-Dock scrollen
  *eingegrenzt* als Sicherheitsnetz.
- **Gestaffeltes Ausblenden bei wenig Platz** (verhindert Überlappungen):
  Identity-Card unter `max-height: 720px`, die absolut positionierte
  Self-View-PiP unter `max-height: 900px`. Die PiP würde sonst beim Schrumpfen
  der Avatar-Zone mit Identity-Card/Header kollidieren; sie erscheint nur auf
  großen Screens (Ausstellungsdisplay, Tablet, Desktop-Mockup).
- **Querformat** (`orientation: landscape` und `max-height: 540px`): eigenes
  Zwei-Spalten-Layout (Avatar links, Antwort + Fragen rechts), PiP ausgeblendet.
- **Verifikation:** Überlappungs-/Clipping-frei geprüft per DOM-Bounding-Box-Check
  über 320×568 bis 1920×1080 inkl. Querformat, jeweils mit allen 6 Fragen.
