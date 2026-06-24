---
id: changelog
title: Changelog
order: 90
status: current
last_updated: 2026-06-24
owner: @naim
linked_paths: 
summary: Laufendes Protokoll der Doku-Updates, neueste zuerst.
---

Ein Eintrag pro Doku-Update, neueste zuerst: Datum, betroffene Sektionen und
eine Zeile, was sich warum geändert hat. Das ist der Audit-Trail, der die Doku
ehrlich hält.

## 2026-06-24

- **Echter Elementname im Anruf:** Neues Persona-Feld `elementName` (Gold,
  Kobalt, Lithium … für alle 12 Personas). Der FaceTime-Header zeigt unter dem
  personifizierten Namen jetzt `elementName · element` (z. B. „Gold · Au · 79"),
  damit Besucher:innen sofort sehen, *welches* echte Element spricht. **Datenmodell**
  (Feldliste) und **UI-Design** (FaceTimeScreen-Header) entsprechend aktualisiert.
- **Responsiveness fürs Handy-Querformat / sehr flache Screens gefixt:** Im
  FaceTime-Screen lief bei `max-height ≤ 560px` (z. B. 740×360) der Inhalt aus
  dem Rahmen — Antwort abgeschnitten, untere Fragen und **Auflegen-Button
  unerreichbar**. Neuer `max-height: 560px`-Breakpoint blendet den dekorativen
  Avatar aus, reduziert die Grid-Zeilen auf `auto auto minmax(0,1fr)` (Dock
  bekommt den Rest) und lässt das Fragen-Grid darin scrollen statt das
  Antwort-Panel zu überlappen; der Auswahl-Header wird kompakt, damit im
  Querformat sofort eine Karte sichtbar ist. **UI-Design**-Sektion neu gefasst
  und an die *tatsächliche* CSS-Realität angeglichen (Self-View blendet ab 720px
  aus, nicht 900px; das früher dokumentierte Zwei-Spalten-Querformat existierte
  nicht). Verifiziert per Browser-Preview über 320×568 bis 1080×1920.

## 2026-06-17

- **Überlappungen behoben + längere Antworten:** Identity-Card in eigene
  Grid-Zeile gezogen (kein Clipping mehr), Self-View-PiP nur noch ab 900px Höhe
  (kollidierte sonst mit Identity-Card/Header). Antwort-Panel auf 40dvh
  vergrößert. Alle Antworttexte deutlich ausführlicher (besonders Kobaltin);
  `dialog-overview.json` synchron gehalten. **UI-Design**-Sektion entsprechend
  aktualisiert.
- Dokumentation mit KeystoneDoc initialisiert (alle Sektionen aus dem
  bestehenden Prototyp und der `repro-dokumentation.md` befüllt).
- **Architekturentscheidungen** um **ADR-004** ergänzt: fluides,
  gerätegnostisches Layout (Mobil-Vollbild, Safe-Areas, eingegrenztes Scrollen)
  statt Fix-auf-1920×1080.
- **UI-Design** und **Anforderungen** (TR-03) um das responsive Verhalten
  erweitert.
