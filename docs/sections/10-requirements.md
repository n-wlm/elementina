---
id: requirements
title: Anforderungen
order: 10
status: current
last_updated: 2026-06-17
owner: @naim
linked_paths: src/App.jsx, src/data.js, src/styles.css
summary: User Stories sowie funktionale und technische Anforderungen des Prototyps.
---

## User Stories

- Als **Besucher:in** möchte ich ein Element auswählen und „anrufen", um auf
  spielerische, vertraute Weise (Telefon-/FaceTime-Metapher) ins Thema zu kommen.
- Als **Besucher:in** möchte ich aus vorbereiteten Fragen wählen und passende
  Antworten erhalten, ohne tippen zu müssen.
- Als **Besucher:in** möchte ich durch Folgefragen tiefer einsteigen, ohne von
  einer langen Fragenliste erschlagen zu werden.
- Als **Kurator:in / Redaktion** möchte ich Fragen und Antworten an einer
  zentralen Stelle pflegen und gegen Fachexpertise abgleichen können.
- Als **Betreiber:in der Installation** möchte ich, dass die App auf dem
  Zielgerät ohne Backend, Login oder Cloud-Abhängigkeit läuft.

## Funktionale Anforderungen

| ID | Anforderung | Priorität |
| --- | --- | --- |
| FR-01 | Auswahl-Screen listet alle aktiven Personas mit Avatar, Element und Tagline. | must |
| FR-02 | Antippen einer Persona startet einen Anruf: Calling-Screen mit Klingeln, dann automatischer Übergang in den FaceTime-Screen. | must |
| FR-03 | Im FaceTime-Screen wählt man aus sichtbaren Frage-Kacheln; die Antwort erscheint im Antwort-Panel. | must |
| FR-04 | Beantwortete Fragen schalten über `unlocks` neue Folgefragen frei (dynamischer Fragebaum). | must |
| FR-05 | „Über"-Tab zeigt eine Projektbeschreibung innerhalb der Tabbar. | should |
| FR-06 | Optionaler Voice-Toggle liest Antworten per Browser-TTS vor. | should |
| FR-07 | Self-View blendet das Kamerabild ein, mit grafischem Fallback bei Verweigerung/Fehlen. | should |
| FR-08 | Auflegen kehrt zum Auswahl-Screen zurück und stoppt Sprachausgabe/Klingeln. | must |

## Technische Anforderungen

| ID | Anforderung | Zielwert |
| --- | --- | --- |
| TR-01 | Läuft vollständig client-seitig, ohne Backend oder externe APIs. | erfüllt |
| TR-02 | Touch-first: große Tap-Targets, keine Hover-Abhängigkeit. | erfüllt |
| TR-03 | Sauberes Layout ohne Überlauf/Überlappung von Mobil (≈320px) bis 4K-Vertikal. | erfüllt (siehe [ADR-004](#adrs)) |
| TR-04 | Degradiert ohne Kamera/TTS funktionsfähig (Fallback bzw. deaktivierbar). | erfüllt |
| TR-05 | Inhalte (Personas, Fragen, Antworten) ohne Code-Logikänderung erweiterbar. | erfüllt |
