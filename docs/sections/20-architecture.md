---
id: architecture
title: Architektur
order: 20
status: current
last_updated: 2026-06-17
owner: @naim
linked_paths: src/App.jsx, src/main.jsx, src/data.js, index.html, vite.config.js
summary: Aufbau der Single-Page-App — Komponentenbaum, Screen-Zustandsmaschine und Web-API-Anbindung.
---

## Kontext

Eine reine Frontend-App ohne Server. Sie spricht nur den Browser und dessen
Web-APIs an; alle Inhalte sind im Bundle enthalten.

```mermaid
flowchart TD
  visitor([Besucher:in / Touchscreen]) --> app[Element Hotline · SPA]
  app --> audio[Web Audio API]
  app --> cam[getUserMedia · Kamera]
  app --> tts[speechSynthesis · TTS]
  data[(src/data.js · Fragebaum)] --> app
```

## Container / Module

Es gibt genau einen Deployment-Artefakt: das statische Vite-Bundle. Innerhalb
davon strukturiert `App.jsx` die UI in Screen-Komponenten, die eine zentrale
Zustandsmaschine umschaltet.

```mermaid
flowchart TD
  main[main.jsx] --> App
  App -->|screen=selection| Selection[SelectionScreen]
  App -->|screen=calling| Calling[CallingScreen]
  App -->|screen=facetime| FaceTime[FaceTimeScreen]
  FaceTime --> Self[SelfView · Kamera]
  FaceTime --> Avatar[ElementAvatar]
  Selection --> Avatar
  Calling --> Avatar
  App --> Sounds[useUiSounds · Web Audio]
  FaceTime --> Speech[useSpeech · TTS]
  FaceTime --> Data[data.js · getResponseForQuestion]
```

## Zustandsmaschine der Screens

`App` hält `screen` (`selection` → `calling` → `facetime`) und die gewählte
`persona`. Der Übergang von `calling` nach `facetime` läuft per Timeout (≈2,2 s
Klingeln); `useUiSounds` reagiert auf den Wechsel und spielt Klingel-/Verbindungs-
Sounds. Auflegen setzt `screen` zurück auf `selection`. Details als Sequenz:
siehe [Workflows](#workflows).

## Schlüsselentscheidungen

Das *Warum* steht in den [Architekturentscheidungen](#adrs):

- Kein Backend, statische In-App-Daten — ADR-001.
- Persona-spezifischer Fragebaum mit `unlocks` statt flacher Liste — ADR-002.
- Browser-`speechSynthesis` als optionales, abschaltbares TTS — ADR-003.
- Fluides, gerätegnostisches Layout statt Fix-auf-1920×1080 — ADR-004.
