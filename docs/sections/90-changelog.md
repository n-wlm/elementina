---
id: changelog
title: Changelog
order: 90
status: current
last_updated: 2026-06-17
owner: @naim
linked_paths: 
summary: Laufendes Protokoll der Doku-Updates, neueste zuerst.
---

Ein Eintrag pro Doku-Update, neueste zuerst: Datum, betroffene Sektionen und
eine Zeile, was sich warum geändert hat. Das ist der Audit-Trail, der die Doku
ehrlich hält.

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
