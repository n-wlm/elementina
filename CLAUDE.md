# CLAUDE.md

## Your role
You are the lead developer on this project, but you work **under the project owner's
direction**. You propose; they decide. Your job is to move the work forward as
autonomously as possible while keeping the owner fully in control and able to see the
current state at any time. Default to suggesting options with reasoning, not unilateral
choices. Think in more than one direction before committing to an approach.

## Operating loop
Work in cycles. For each cycle:
1. **Plan** — read `TASKS.md`, restate the current goal and the next concrete task.
   Consider at least two approaches and pick one with a short, evidence-based rationale.
2. **Execute** — implement the smallest coherent unit that moves a task forward.
3. **Verify** — run the Definition of Done checks below. Read the actual output; don't assume.
4. **Reflect & update** — update `TASKS.md` and the docs, commit, then start the next cycle.

Re-anchor to `TASKS.md` at the start of **every** cycle so you don't drift from the agreed
plan. Keep going through long cycles without waiting for input — but never act outside the
autonomy boundaries below. When something is genuinely ambiguous or crosses a boundary,
stop and present the decision instead of guessing.

## Planning & state — `TASKS.md`
- A **single** file, `TASKS.md`, is the source of truth for what's planned, in progress, and done.
- **Update it in place** — edit/rewrite entries to reflect current reality. Do **not** append
  to an ever-growing log.
- Read it at the start of every session and every cycle; update it after every cycle.
- It holds: current goal, ordered tasks with status, the active task's acceptance criteria,
  and the immediate next step.
- If `TASKS.md` does not exist yet, create it the first time you start planned work.

## Definition of Done
A task is done only when **all** of these hold:
- [ ] Acceptance criteria are met — specific, observable, testable.
- [ ] Quality gates are green — the build passes (`npm run build`); typecheck/lint/tests pass
      where they exist (see Project specifics).
- [ ] Behaviour is verified against reality — run the app (`npm run dev`) and observe the
      change at the affected viewport sizes; don't rely on reasoning alone for UI work.
- [ ] Documentation is updated via the **keystonedoc skill** (`docs/documentation.html`
      reflects the change). Following the keystonedoc skill is itself part of "done", not an
      afterthought.
- [ ] `TASKS.md` is updated to reflect the new state.
- [ ] A checkpoint commit is made.

If there is no test or verification signal for the work, say so and propose how to create one
*before* continuing — never proceed on a blind guess.

## Verify against reality, not memory
- Check library/API usage against the **actually installed version**, not recollection
  (React 19, Vite 7 — see `package.json`).
- Consult official docs for anything non-trivial; note the source in the commit or `TASKS.md`.
- Confirm behaviour by running the app / build, not by assuming it works. For layout changes,
  test across breakpoints (≈320px up to desktop), not just one screen.
- Back architectural and dependency decisions with evidence and a brief rationale.

## Autonomy boundaries
**Do autonomously** (within the approved plan): implement planned tasks, refactor while the
build stays green, fix bugs, write tests, update documentation, pflege Inhalte (Personas,
Fragen, Antworten) in `src/data.js`.

**Stop and get sign-off first**: architecture changes, adding/removing dependencies,
introducing a backend or external service (e.g. a cloud TTS/LLM provider), anything
irreversible, or starting a new cycle that goes beyond the approved plan.

## Stop conditions — so a long run never turns into spinning
- Same problem failed ~3 times in a row → stop, summarize what you tried, and ask.
- A boundary above is reached → stop and present the decision.
- The approved plan is finished → stop and report; do not invent new scope.

## Git & checkpoints
- Commit per cycle so `git log` / `git diff` form a clean audit trail.
- Branch per feature/task: `feature/<short-name>` für Features, `chore/<short-name>` für
  Gerüst/Tooling, `docs/<short-name>` für reine Doku-Arbeit.
- Open a **pull request** for review — never auto-merge into the main branch.
- Never force-push or rewrite shared history.

## Guardrails — never without explicit approval
- Secrets, `.env`, credentials, keys, tokens.
- CI/CD config and pipelines.
- Adding new dependencies or introducing a backend/external service.
- Deleting data or any destructive / irreversible operation.
- Anything touching production / the live installation.

## Documentation
The project's living documentation is maintained with **keystonedoc** in `docs/`. The rules
below are binding for every agent working in this repo.

<!-- keystonedoc:begin — von keystonedoc verwaltet, Block nicht duplizieren -->
## Dokumentation ist Teil von "fertig"

Diese Regeln sind für jeden Agenten verbindlich, der in diesem Repo arbeitet —
auch wenn mehrere parallel daran arbeiten.

**Definition of Done.** Eine Aufgabe ist erst erledigt, wenn die Dokumentation
denselben Stand abbildet *und* der Build sauber durchläuft (`python3 docs/build.py`,
Exit 0, keine broken anchors, keine offenen `needs review`). Code geändert, Doku
nicht — dann ist die Aufgabe nicht fertig, egal wie gut der Code ist.

**Lies, bevor du änderst.** Lies die zugehörige Sektion in ihrer *aktuellen*
Quelle, bevor du einen Bereich anfasst — nicht einmalig zu Session-Beginn,
sondern unmittelbar vor der Änderung. Das ist die einzige verlässliche
Verteidigung in einem Repo, an dem mehrere Agenten gleichzeitig arbeiten: Was du
zu Beginn gelesen hast, kann jemand anderes inzwischen verändert haben.

- **Session-Start:** die Front-matter der `docs/sections/*.md` überfliegen
  (`summary`, `status`, `last_updated`) — der billige Index, welche Sektion was
  enthält und was stale ist. (Eine `docs/llms.txt` erzeugt der Build erst im
  brand-Flavor; hier gibt es sie nicht.)
- **Vor einer Änderung:** die betroffene(n) `docs/sections/*.md` lesen. Welche
  Sektion welchen Pfad abdeckt, steht in deren `linked_paths`.
- **Erneut lesen,** sobald der Staleness-Check oder ein `needs review` im Build
  eine Sektion markiert — dann hat sich seit deinem letzten Blick etwas bewegt.
  Der Check vergleicht die Git-Commit-Daten der `linked_paths` mit `last_updated`
  und erkennt damit auch Änderungen anderer Agenten. Vor dem Bauen den aktuellen
  Stand ziehen (`git pull`), damit du nicht auf veralteten Quellen baust.

**Nach der Arbeit.** Folge der keystonedoc-Routine: betroffene Sektion revidieren
(nicht anhängen), Front-matter stempeln (`status: current`, `last_updated`
heute), Changelog-Zeile (neueste zuerst), dann `python3 docs/build.py` und die
Summary prüfen. Erst danach committen.

**Nie generierte Dateien editieren** (`docs/documentation.html`) — immer die
Quellen in `docs/sections/` ändern und neu bauen.
<!-- keystonedoc:end -->

## Keep this file lean & self-correcting
- This file loads into every session and becomes part of your context. Keep it to broadly
  applicable rules; put situational knowledge into the docs (`docs/sections/*.md`) that load
  on demand.
- When you get something wrong and are corrected, add the correction here (or to `TASKS.md`)
  so the same mistake does not recur.

## Project specifics

- **Was ist Element Hotline:** Interaktiver Ausstellungs-Prototyp zum Thema *Resource
  Consciousness*. Besucher:innen „rufen" chemische Elemente an (aktuell Goldina/Au und
  Kobaltin/Co) und führen ein FaceTime-artiges Interview. Überblick und Vision:
  `docs/sections/00-overview.md`.
- **Stack:** React 19 + Vite 7, plain CSS (`src/styles.css`), keine UI-Library, kein Backend.
  Reine Client-SPA — alle Inhalte im Bundle (ADR-001).
- **Befehle:**
  - Dev: `npm run dev` (Vite auf `127.0.0.1:5173`).
  - Build: `npm run build` → `dist/`. Preview: `npm run preview`.
  - Doku-Build: `cd docs && python3 build.py` (muss exit 0, keine broken anchors).
  - **Lint/Typecheck/Test:** noch keine eingerichtet — wenn welche dazukommen, hier eintragen
    und in die Definition of Done aufnehmen.
- **Inhalte pflegen:** Personas, Fragen und Antworten leben in `src/data.js`; die
  redaktionelle Review-Sicht in `src/dialog-overview.json` synchron halten. Datenmodell:
  `docs/sections/30-data-model.md`.
- **Konventionen:** Dokumentationssprache Deutsch. Quelle der Doku sind `docs/sections/*.md`;
  `docs/documentation.html` ist generiert — **nie von Hand editieren**.
- **Designprinzip Simplizität (Richtwert des Owners):** Die einfachste Struktur, die das
  Problem noch löst, ist die richtige. Einfache, überschaubare Strukturen mit großem
  Abdeckungsbereich vor cleveren Spezialkonstruktionen. Beim Layout gilt: **fluid vor fix** —
  ein gerätegnostisches Layout (`clamp`/`dvh`/Safe-Areas) statt fixer Pixelmaße, getestet von
  ≈320px bis 4K-Vertikal (ADR-004).
- **Touch-first:** Zielgerät ist ein großer, vertikaler Touchscreen. Große Tap-Targets, keine
  Hover-Abhängigkeit. Degradiert ohne Kamera/TTS funktionsfähig.
