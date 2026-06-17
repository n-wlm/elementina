---
id: overview
title: Überblick
order: 0
status: current
last_updated: 2026-06-17
owner: @naim
linked_paths: README.md, package.json, index.html, vite.config.js, src/main.jsx
summary: Was Element Hotline ist, für wen es gedacht ist und wie man es lokal startet.
---

## Was ist das

**Element Hotline** ist ein interaktiver Ausstellungs-Prototyp zum Thema
*Resource Consciousness*: Besucher:innen „rufen" chemische Elemente an, die in
jedem Smartphone stecken (aktuell **Goldina / Au** und **Kobaltin / Co**), und
führen ein FaceTime-artiges Interview. Die Elemente erzählen aus erster Person,
woher sie kommen, wie sie abgebaut werden und welche ökologischen und sozialen
Folgen daran hängen.

Ziel ist, die verborgene Materialität digitaler Produkte erlebbar zu machen —
ohne moralischen Zeigefinger. Das Projekt entsteht in einem
Product-Development-Kontext in Zusammenarbeit mit Lukas Wagner (Universität
Marburg). Primärer Einsatz ist die **Installation/Ausstellung** (großer,
vertikaler Touchscreen, der wie ein riesiges Smartphone wirkt) — die App läuft
inzwischen aber auch sauber auf echten Mobilgeräten und Desktops (siehe
[ADR-004](#adrs)).

## Quickstart

```bash
npm install
npm run dev          # Vite-Devserver auf 127.0.0.1:5173
```

Dann öffnen: `http://127.0.0.1:5173/`

Production-Build prüfen:

```bash
npm run build        # nach dist/
npm run preview      # gebauten Stand lokal testen
```

## Projektstruktur

| Pfad | Inhalt |
| --- | --- |
| `index.html` | HTML-Einstieg, Viewport-Meta (mit `viewport-fit=cover`) |
| `src/main.jsx` | React-Mount-Punkt |
| `src/App.jsx` | Zustandsmaschine (Selection → Calling → FaceTime) + alle Komponenten, Sound, Kamera, TTS |
| `src/data.js` | Personas und persona-spezifischer Fragebaum (Intro, Initialfragen, Unlocks) |
| `src/dialog-overview.json` | Redaktionelle Review-Sicht aller Fragen/Antworten |
| `src/styles.css` | Liquid-Glass-Look, Device-Frame, gesamtes responsives Layout |
| `docs/` | Diese keystonedoc-Dokumentation |

## Tech-Stack

- **React 19** — Komponenten- und Zustandsmodell für die drei Screens.
- **Vite 7** — schneller Dev-Loop und Build; keine Backend-Abhängigkeit.
- **Plain CSS** (`src/styles.css`) — volle visuelle Kontrolle für das
  Ausstellungslayout, bewusst ohne UI-Library.
- **Browser-Web-APIs** — Web Audio (UI-Sounds), `getUserMedia` (Self-View),
  `speechSynthesis` (optionales TTS). Keine externen Dienste, keine Cloudkosten.
