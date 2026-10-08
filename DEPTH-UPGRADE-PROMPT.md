> **Legacy (2026-10-08).** This prompt was written for the Green IT days 15 and 16 and refers to their files (`../day14`, micro-cards, `aion-green-it-dayN`).
> It is kept for its method (phased audit, Read more, coverage table, defect checklist, verification), which is reusable for a DL day; every file name,
> day number and case in it belongs to Green IT and does not exist in this repository. Where it conflicts with `CLAUDE.md` or `CURRICULUM-GUIDE.md`, those win.

# Depth & interactivity upgrade — prompt for Day 15 and Day 16

Paste everything below the line into a fresh Claude Code session whose working directory is
`day15` (then again in `day16`). It is self-contained. The reference implementation is `../day14`
(read it, do not import from it). Written 2026-09-19 from the Day 14 upgrade session.

---

## 0. Your job in one paragraph

Upgrade this day's **material** and **tasks** to the same depth and interactivity Day 14 now has.
"Depth" does not mean more text. It means: the learner sees one short **definition**, everything
else is one tap away behind **Read more**; every interactive **tells a story and shows its
reasoning** (numbers, a reason per value, a live "why this result", a live "what just changed");
every option a task offers is **defined in the material, with when to use it and a case**; and the
material contains **exactly what the task needs** — nothing the task never uses is on the main
path, and nothing the task asks for is missing. Do not change the day's subject matter, cases,
export contract, or stack. Follow `../CLAUDE.md` (§1–§14) and `../CURRICULUM-GUIDE.md`; this prompt
adds to them, it does not replace them.

## 1. Process — phased, with a stop for approval (standing user preference)

Do **not** rewrite everything in one pass.

**Phase A — Audit (read-only).** Read this day's `README.md`, `lib/routeN/*` (material + task
data), every `components/routeN/*`, and `components/ui/MicroCard.tsx` (or `MaterialBlock.tsx`).
Read the Day 14 reference files listed in §8. Then produce, in chat, one table per route:

| Material card/section | What stays visible | What moves to Read more | Interactive upgrade (which pattern from §3) | Task question(s) it grounds | Terms needing a glossary entry | Sources to verify |

plus a **defect list** (§7 checklist: contradictions, repeated case briefs, options the task uses
that the material never defines, dead UI references) and a **task upgrade list** (§4). Keep the
chat text short. **Stop and wait for the user's go-ahead.**

**Phase B — Implement**, one route at a time, one section at a time, in the order: shared
primitives → material → task → mentor tools/answer keys → README. After each section: typecheck,
then exercise it live (§9). Report briefly. Commit and push **only when asked**.

## 2. Material rules

### 2.1 Visible vs. Read more
- Always visible per section/card: kicker + title, **one-line standfirst**, the **live diagram**,
  and the **Definition** (2–4 plain sentences that a non-expert can repeat back).
- Behind a collapsed **Read more** (native button, `aria-expanded`, chevron that rotates, closed by
  default, no library): the decision rules ("How to decide when this comes up in the task"),
  insight, practical takeaway, deeper body sub-sections, industry callout, sources.
- The Read more button carries a one-line hint of what is inside ("decision rules, insight, full
  lists, sources") so it is never a blind click.
- The block-level intro above a group of sections becomes one short sentence; the rest goes into a
  Read more (`SectionHeading` has an optional `more` prop in Day 14).
- Day 15/16 use **micro-cards** (`MicroCard`), not `MaterialBlock`. Keep the "read less, do more"
  card shape, but apply the same split: definition + diagram visible, rule text and depth behind
  Read more. Do not lengthen the visible part of a card.
- Recommended: when a task's **MaterialRefs chip** scrolls to a section, also open that section's
  Read more, because the decision rules live there. (Day 14 does not do this yet.)
- Respect `prefers-reduced-motion`: the shared `.reveal-in` keyframe is switched off under it.

### 2.2 Definitions must define every term and option the task uses
Walk every task question and every selectable option. For each, find the sentence in the material
that defines it. If a role, lens, criterion, zone, or category appears in the task and only in one
hidden reasoning bullet — or nowhere — promote it into the visible Definition and add a
"how to decide" rule for it. Example of the failure this fixes (Day 14 S2): *Owns / Consulted*
were used by the task but defined only in one hidden sentence.

### 2.3 Terms, abbreviations and sources
- Every abbreviation or named regulation/standard in a diagram or text gets a **glossary entry**:
  full name (with legal reference), 1–2 sentence plain meaning, clickable **Source ↗** link(s)
  (`target="_blank" rel="noopener noreferrer"`). Pattern: `lib/route1/glossary.ts`
  (`GLOSSARY`, `splitByGlossary`) + `Glossed` and `TermPanel` in
  `components/route1/MaterialDiagrams.tsx`. Terms render as dotted-underlined buttons; tapping one
  opens the panel under the sentence; tapping again or Close hides it.
- The section's **Sources** list uses real, separate, clickable entries (one URL per entry).
- **Verify every URL** before shipping (`curl -s -o /dev/null -L -m 20 -A "Mozilla/5.0" -w
  "%{http_code} %{url_effective}"`). Notes from Day 14: EUR-Lex ELI links answer HTTP 202 to
  scripts (bot challenge) — they are the canonical permalink form, keep them but say they were not
  opened in a browser; ISO.org answers 403 to scripts — do not link what you cannot verify; the
  old EU Ecolabel page moved (`green-forum.ec.europa.eu/green-business/eu-ecolabel_en` works).
- Where a rule is in flux (Day 14: CSRD scope under the EU "Omnibus" package) say so in the
  meaning text and tell the user in your report to re-check before teaching it.

## 3. Interactive patterns — the quality bar

An interactive is upgraded when the learner can **understand the way of thinking from playing with
it alone**. Every control change must produce all of the following, derived from state (never
hard-coded copies of numbers):

1. **Numbers** on screen (points, totals as a visible sum "3 + 2 = 5", kWh, €, years).
2. **A reason per value** — one short sentence for *why* this option has this score/state.
3. **"Why this result"** — a live sentence naming the leader/outcome, the margin, and *which
   input made the difference*. Handle ties honestly ("tied — these lenses cannot separate them;
   adding X would").
4. **"What just changed"** — after each toggle, a written account of what moved and why, plus the
   *shift in way of thinking* ("You are now also asking what pays back in hard euros…"). For
   removals, explain risers as "loses only 1", not "gained".
5. **A baseline to compare against** where a shape or total moves (ghost/dashed outline, "Reset to
   baseline", "+2 from baseline").
6. Keyboard-operable controls, `aria-live="polite"` on the region that changes, reduced-motion
   safe, no horizontal scroll at 375 px, self-contained (nothing loaded from outside, nothing sent).

Patterns already built in Day 14 — reuse the shape, change the subject:

| Pattern | Day 14 file | What it does |
|---|---|---|
| Multi-lens ranking | `components/route1/ThreeLensDiagram.tsx` | Points + reason per score, lens question chips, "Why this order", "What just changed", tie handling, always ≥1 lens on |
| Calculator with teaching | `components/route1/MaterialDiagrams.tsx` (`CostBenefitScale`, `PaybackTimeline`, `LiveReading`, `CalcExplainer`) | Field captions carry the lesson; preset chips; timeline strip; live tone-coloured reading; two small "How is it calculated?" buttons with a worked example using the live numbers and where the data comes from |
| Story simulator | `components/route1/AdoptionStory.tsx` | One driver (adoption) → 10×10 icon grid (readable without colour: screen off vs lit + legend), promise-vs-reality bars, illustrative money panel with warning, chapters that preset the driver with a story card, named characters with tap-for-reason, takeaway box. Chips do not follow manual slider moves; a note says the story still shows the last chapter |
| Practice scorer with background | `components/route2/MaterialDiagrams.tsx` (`PracticeRadar`) | A practice case *different from the task case*; sensible baseline with a reason per axis; per-axis "N means:" text; delta box with the claim you are now making and an "In the task:" tip; shape reading (spiky / balanced / even / one weak axis) |
| Role lab | `components/route2/OwnershipLab.tsx` + `ROLE_GUIDE`, `CASE_ROLES`, `OWNERSHIP_CASE` in `lib/route2/task.ts` | Role cards (means / use when / ask), a case, a row per actor with all options selectable and one consequence sentence each, live summary of what the whole assignment adds up to |
| Glossary | `lib/route1/glossary.ts` | See §2.3 |

Writing style for all on-screen text: **English, short sentences, plain words, consequences not
verdicts** ("Nobody checks the contract terms; a lock-in shows up later" — not "Wrong").
Numbers in `en-GB` format (`€18,000`, `4,000 kWh`) via one shared formatter.

For each material section, choose the pattern that fits; do not force one. If a section's
diagram is already a good interactive, add only what is missing from the list above.

## 4. Task upgrades

1. **No blind choices.** Wherever the learner ranks/classifies/picks among options, show enough
   detail *on the option itself* to reason from: a "What it involves" list on each option and, on
   each criterion/question card, one **neutral fact per option** for that criterion. Facts, never
   rankings. (Day 14: `MeasureLine.involves` and `byCriterion` in `lib/route2/task.ts`, rendered
   in `RankBoard.tsx`.)
2. **Check gives a real verdict, still no answer** (CLAUDE.md §4). After "Check": ✓ *holds up*
   (green) or ✕ *doesn't hold up yet* (red, `danger` token) plus a written clue; from the second
   failed check use a sharper line ("re-read what each option brings…"). Judge against a **list of
   defensible answers** (`defensibleTop: ["b","c"]`), not one hard-coded answer, wherever two
   answers genuinely defend. Never mark an order the exercise does not test. The verdict is stored
   against the state it checked and **disappears when the state changes**.
3. **Green means "verified", nothing else.** Filled/placed slots use a neutral style; colour is
   applied only by a fresh verdict. (Day 14 bug: every filled slot and every clue was green, so
   learners read wrong answers as right.)
4. **Role/option keys at the point of use.** Any field with named options (Owns/Consulted, zones,
   lenses, criteria) shows a compact key under its instruction: what each means and when to use it,
   plus the MaterialRefs chip back to the section. Instructions stay **under the label**, never
   only in a placeholder (§8).
5. **Practice case ≠ task case.** The material's practice scenarios must not reveal the task's
   answers. Their facts may be reused as *teaching* (e.g. same managed-print case across two
   sections of one route) but never lift a task cell's answer.
6. **One case, briefed once** per route, above the task. Do not restate the case in the task
   framing and again in a case paragraph (§7 lists this as a Day 14 defect).
7. Keep everything from CLAUDE.md that already applies: itemised clickable missing lists, export
   never disabled, undo/redo on placements, no hard locks, mentor fill + answer keys per exercise,
   `useHydrated()` guards.
8. When a task field changes, update **all four** places: task UI, `missing` logic, export
   document, mentor auto-fill — and the mentor answer key (`lib/answerKey.ts` blocks) so it states
   the new check rule (e.g. "the check judges only the 1st slot: Feasibility accepts B or C…").

## 5. Material ↔ task traceability (CLAUDE.md §11, made stricter)

Produce and keep current a **coverage table** in your Phase A output and in the README:

| Task step / option | Material section that defines it | Where the rule lives (visible Definition or Read more) | Interactive that rehearses it |

Rules: (a) every row must be filled; (b) an option offered by the task but absent from the
material is a defect, same as a missing rule; (c) material that no task step uses moves entirely
behind Read more or is cut; (d) a section's stated rules must **match the task's logic exactly**
(Day 14 defect: S2 said "pilot" is for expensive-to-undo decisions while the task's outcome table
gave "pilot" to cheap-to-undo ones, and one of the four outcomes had no rule at all). After
editing any rule text, re-read the task's actual outcome/answer tables and compare line by line.

## 6. Scope of change per route

- **Route 1 (Levels 1–2, or as this day defines it):** upgrade every material card/section, then
  Part 1 (diagnose) and Part 2 (decide) task cards, then the handover panel (still built from the
  learner's own Part 1 output, never a gate).
- **Route 2 (Level 3):** upgrade every material card, the worked-example card (read-only, visually
  distinct, no inputs), then each task stage.
- Day 16 Route 1 keeps its **two exports** by design; do not merge them. Day 15 keeps one export
  per route. Do not change export filenames (`exportFilename(...)` contract).
- Keep each day's micro-card time budget honest: update the `minutes` values if the visible part
  shrinks; the Read more depth is optional and not counted.

## 7. Defect checklist — run in Phase A and again before you finish

- [ ] A section's rule contradicts the task's logic or answer key.
- [ ] An option/role/zone the task offers has no definition or "when to use" in the material.
- [ ] The intro of a route names a different company/case than the task works on, or claims the
      route "stands on its own" while depending on another route.
- [ ] The case is briefed more than once in one route.
- [ ] Task instructions refer to UI that does not exist ("highlight every indication" with no
      highlight; "per area" when the UI is per item).
- [ ] The answer key or README says one thing (e.g. "exactly one owner") and the UI/missing logic
      accepts another — align them or say why not.
- [ ] Export tables show one number (rank) while a total sums another (points).
- [ ] HTML export markup validity (`<dt>/<dd>` need a `<dl>`).
- [ ] Any coloured state that could be read as "correct" without a verdict.
- [ ] Any number in a story or panel that is a literal instead of derived from state.
- [ ] Any control unreachable by keyboard; any 10×10-style grid unreadable at 375 px.
- [ ] Any external link not verified (§2.3).

## 8. Reference files in `../day14` (read these first)

Shared UI: `components/ui/ReadMore.tsx`, `components/ui/MaterialBlock.tsx`,
`components/ui/SectionHeading.tsx` (the `more` prop), `styles/globals.css` (the
`prefers-reduced-motion` rule for `.reveal-in`).
Route 1: `components/route1/ThreeLensDiagram.tsx`, `AdoptionStory.tsx`, `MaterialDiagrams.tsx`,
`lib/route1/glossary.ts`, `lib/route1/material.ts` (real `url:` references).
Route 2: `components/route2/MaterialDiagrams.tsx` (`PracticeRadar`), `OwnershipLab.tsx`,
`RankBoard.tsx` (verdict + neutral slots + per-criterion facts), `ProposeSection.tsx` (role key),
`lib/route2/task.ts` (`involves`, `byCriterion`, `defensibleTop`, `ROLE_GUIDE`, `CASE_ROLES`,
`OWNERSHIP_CASE`, verdict labels), `lib/route2/material.ts` (rules rewritten to define Owns /
Consulted and when to use each).
Day 14's changes may still be uncommitted in its working tree; read the working files, not git.

## 9. Verification (CLAUDE.md §10 plus what we learned)

1. `npx tsc --noEmit` after every section; `npm run build` at the end **only with the dev server
   stopped** (both write `.next`; a live server then serves dead pages that still render).
2. Live in the browser via the parent `.claude/launch.json` entry for this day (`dayN-dev`;
   `preview_start` reads the *parent* config). Start from a **clean localStorage**. Exercise each
   upgraded interactive through its states; for numeric simulators write the acceptance numbers
   down first (Day 14: 15% → 600 kWh, lost 3,400, payback 16.7 y; 100% → 4,000 kWh, 2.5 y) and
   assert them in the page.
3. Check: no console errors, no horizontal scroll at 375 px, keyboard operation, `aria-live`
   regions update, mentor fill still completes the export, missing list still works, export opens.
4. Drive React inputs from scripts with the native value setter + a bubbling `input` event; find
   buttons by their **full** labels (Day 14 criteria are "Economic effect", not "Economic").
5. Tooling gotchas on this machine: long Bash commands truncate at ~8 KB — write scripts to the
   scratchpad with Write and run the file; there is no `python3`; pane key events lack `keyCode`
   (Enter may not submit a passcode via `computer key` — that is not an app bug); the pane can stop
   painting (screenshots time out or show a stale frame) — verify with DOM text/`javascript_tool`,
   use a fresh tab, or screenshot at phone width; a tab opened before a dev-server restart keeps
   stale state and console history.
6. Update `README.md` (layout, what each interactive does, the coverage table, the defensible-answer
   lists) and the mentor answer keys. Do not add libraries.

## 10. Reporting

Short chat report per phase: what changed, what you decided yourself (list each), what you could
not verify (links, screenshots), what needs the user's decision. No long recaps of the diff.
Ask before committing or pushing; each day has its own GitHub repo (`aion-green-it-dayN`) — check
`git remote -v` first, because a day cloned from the previous one may still point at the old repo.

## 11. Day-specific starting notes (verify against the code — do not trust this blindly)

**Day 15 — Module 11, "Innovations for the Sustainable IT of Tomorrow"** (innovation, AI, circular
economy). Route 1 `/route-1-assess-and-decide`, case FutureGrid Technologies, material C1–C9
micro-cards, Part 1 Diagnose (six initiatives → two questions each → zone, lens, rationale) →
handover → Part 2 Decide (three lines on seven dimensions, radar, priority + justification +
follow-ups + risks). Route 2 `/route-2-management-decision`, case NovaCircular, D1–D4 with a
CircularMind worked example, then a connect-the-six-blocks canvas and a seven-element proposal.
Likely upgrades: make each zone/lens/dimension defined with "use when" and a case; give the two
diagnostic questions a live "which zone does this combination give and why" reading; give the
seven-dimension assessment per-line neutral facts per dimension and a verdict-style check; give the
canvas's orphaned-block hint a reason and the proposal elements a role key.

**Day 16 — Module 12, "Capturing & Visualising Sustainability Targets"** (KPIs, continuous
optimisation, reporting, carbon monitoring). Route 1 `/route-1-kpis-and-monitoring`, case Clarity
Digital Services, M1–M4 then M5–M7, two exports; Task 1 three stages (sort ten signals into six
areas, six candidate metrics against target/owner/decision, six moves short-term vs structural),
Task 2 seven criteria × three lines with a radar, priority + justification. Route 2, case Verdeon,
D1–D4 with a TerraMetrics example, five stages (frame, guiding, sequence, trade-offs point
allocation, governance). Likely upgrades: the "wired to a decision" gauge and the six-gate filter
become explain-as-you-go interactives; the PDCA and trade-off triangle get live "why" text; the
100-point allocation shows what each shift costs elsewhere; the governance matching gets a
role lab like Owns/Consulted with consequences per choice; every KPI/standard term (GHG Protocol
Scope 1/2/3, ISO 14064, ISO/IEC 30134, ISO 50001) goes through the glossary with verified links.

## 12. Definition of done

- Every material section/card: definition visible, everything else behind Read more with a hint;
  block intros shortened; terms glossed; sources clickable and verified.
- Every interactive shows numbers, reasons, "why this result", "what just changed", a baseline
  where shapes move, and passes the §3.6 accessibility list.
- Every task option is defined with when-to-use; every choice-based task step has per-option
  detail and a verdict-style check that reveals no answer; green means verified only.
- The coverage table is complete, the §7 checklist is clean, typecheck and build pass, the live
  walk-through passed from a clean localStorage, README and answer keys updated, and the user has
  been told what was decided for them and what could not be verified.
