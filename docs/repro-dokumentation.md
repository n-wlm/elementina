# Repro-Dokumentation: Element Hotline Prototyp

Stand: 2026-05-19

## 1) Projektziel (aktueller Scope)

Der Prototyp zeigt eine FaceTime-artige, touch-optimierte Ausstellungserfahrung auf einem vertikalen Grossbildschirm. Besucher:innen waehlen ein Element (aktuell Goldina und Kobaltin), starten einen Call und stellen vorgefertigte Fragen. Die Antworten sind derzeit datengetrieben hinterlegt.

## 2) Unterstellte Annahmen

Diese Annahmen wurden fuer die bisherige Umsetzung getroffen:

1. Das aktuelle Verzeichnis ist die Ziel-App und darf neu als React-App aufgebaut werden.
2. Primaerer Einsatz ist Ausstellung/Installation, nicht allgemeiner Consumer-Webbetrieb.
3. Bedienung erfolgt hauptsaechlich per Touch (grosse Targets, keine Hover-Abhaengigkeit).
4. Die App soll wie ein grosses Smartphone wirken (Phone-Frame innerhalb einer Fullscreen-Buehne).
5. Vorerst bleiben nur zwei Personas aktiv: `goldina` und `kobaltin`.
6. Antworten sind initial statisch (kein externes LLM/Backend notwendig).
7. Webcam darf beim Call-Beginn sofort angefragt werden, mit Fallback falls blockiert.
8. TTS ist optional und darf deaktivierbar sein (wegen Qualitaets- und Browser-Unterschieden).
9. Der `Ueber`-Tab liegt innerhalb der iOS-artigen Tabbar im Phone-Screen.
10. Spaeter sollen neue Fragen/Antworten leicht per Datenpflege ergaenzt werden.

## 3) Bisher getroffene Entscheidungen

### A) Tech-Stack

1. React + Vite als Basis.
2. Single-Page-Prototype ohne Backend-Abhaengigkeit.
3. Styling ueber zentrale CSS-Datei, keine UI-Library.

Begruendung:
- schneller Prototyping-Loop
- einfache Deployment-/Lokal-Story
- volle visuelle Kontrolle fuer Ausstellungslayout

### B) UX und Layout

1. Fullscreen-Buehne mit zentralem Device-Frame.
2. Drei Hauptzustaende: Auswahl -> Calling -> FaceTime.
3. Unten liegende Tabbar (`Anruf` / `Ueber`) im iOS-Stil.
4. Touch-optimierte Buttons und Fragekacheln.

Begruendung:
- klares mentales Modell fuer Besucher:innen
- geringer kognitiver Overhead in Ausstellungssituationen

### C) Persona-/Dialogmodell

1. Umstellung von flacher Fragenliste auf persona-spezifischen Fragebaum.
2. Pro Persona:
   - `introStatement`
   - `initialQuestionIds`
   - `questions[id]` mit `label`, `answer`, `unlocks`
3. Nach jeder Antwort werden neue Folgefragen ueber `unlocks` dynamisch eingeblendet.

Begruendung:
- skaliert fuer kuenftige Personas
- erlaubt dramaturgische Fuehrung pro Element
- macht redaktionelle Pflege eindeutig

### D) Kamera und Stimme

1. Self-View via `getUserMedia` mit visueller Fallback-Ansicht.
2. TTS per Browser `speechSynthesis` als optionaler Toggle.

Begruendung:
- keine harte Hardware-Abhaengigkeit
- funktional nutzbar ohne Cloudkosten
- spaeter austauschbar gegen hochwertigere Voice-Provider

### E) Daten und Redaktionssicht

1. Laufende App-Daten liegen in `src/data.js`.
2. Review-Datei fuer Inhalte liegt in `src/dialog-overview.json`.

Begruendung:
- Trennung zwischen Laufzeitlogik und redaktioneller Pruefsicht
- schneller Abgleich mit Fachexpert:innen

## 4) Datei- und Modulueberblick

1. `src/App.jsx`
   - Hauptzustandsmaschine (Selection, Calling, FaceTime)
   - Frage-Interaktion, TTS-Toggle, Hangup-Flow
2. `src/data.js`
   - Personas
   - Dialog-Flow pro Persona inkl. Intro und Unlock-Logik
3. `src/dialog-overview.json`
   - kompakte Uebersicht aller Fragen/Antworten fuer Review
4. `src/styles.css`
   - Liquid-Glass-Look, Device-Frame, Responsive/4K-Vertikal-Anpassungen
5. `vite.config.js`
   - React-Plugin fuer Vite

## 5) Entscheidungsstatus

### Bereits final fuer Prototyp-Phase

1. React/Vite als Basis
2. Zwei-Persona-Scope
3. Touch-first Bedienlogik
4. Fragebaum mit dynamischem Freischalten
5. About-Text integriert

### Bewusst offen fuer naechste Iteration

1. Hochwertiger TTS-Provider (z. B. Azure/Google/Polly/ElevenLabs)
2. Externe Datenquelle (CMS/JSON-Import) statt harter In-App-Daten
3. Audio-Caching und Latenzoptimierung fuer Ausstellung
4. Optionaler Operator-Modus fuer kuratorische Steuerung

## 6) Reproduzierbarkeit (lokal)

Im Projektordner:

```bash
npm install
npm run dev -- --port 5173
```

Dann oeffnen:

`http://127.0.0.1:5173/`

Build-Check:

```bash
npm run build
```

## 7) Offene Risiken / Hinweise

1. Browser-TTS klingt je nach Betriebssystem/Browser sehr unterschiedlich.
2. Kamera-Freigabe kann im Kiosk-Setup geblockt sein und muss im Zielsystem getestet werden.
3. Lange Antworttexte koennen in lauter Umgebung visuell gut, auditiv aber suboptimal sein.
4. Fuer produktiven Ausstellungsbetrieb ist ein stabiler Voice-Plan inkl. Fallback ratsam.

