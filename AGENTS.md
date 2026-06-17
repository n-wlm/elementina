# AGENTS.md

> **Die verbindlichen Arbeitsregeln für dieses Repo stehen in [`CLAUDE.md`](./CLAUDE.md).**
> Diese Datei ist nur ein Einstieg für Agenten/Tools, die `AGENTS.md` als Konvention lesen,
> und spiegelt `CLAUDE.md`. Es gibt **eine** Quelle der Wahrheit — `CLAUDE.md`. Inhalte hier
> nicht duplizieren.

## Zuerst lesen

1. **[`CLAUDE.md`](./CLAUDE.md)** — Rolle, Operating Loop, Definition of Done, Autonomie-
   Grenzen, Guardrails und Project specifics.
2. **`docs/sections/*.md`** — die lebende Dokumentation (Source of Truth). Die Front-matter
   (`summary`, `status`) ist der billige Index bei Session-Start; `docs/documentation.html`
   ist die generierte Lesefassung für Menschen.
3. Vor einer Änderung die betroffene(n) **`docs/sections/*.md`** lesen (Pfad-Zuordnung über
   deren `linked_paths`).

## Das Wichtigste in Kürze (Details in `CLAUDE.md`)

- **Stack:** React 19 + Vite 7, plain CSS, kein Backend. Reine Client-SPA.
- **Dev / Build:** `npm run dev` · `npm run build` · `npm run preview`.
- **Doku-Build:** `cd docs && python3 build.py` (muss exit 0, keine broken anchors).
- **Dokumentation ist Teil von „fertig":** Quellen sind `docs/sections/*.md`;
  `docs/documentation.html` ist generiert und wird **nie** von Hand editiert. Nach jeder
  Änderung Sektion revidieren, neu bauen, dann committen.
- **Doku-Sprache:** Deutsch.

Bei Konflikten gilt immer `CLAUDE.md`.
