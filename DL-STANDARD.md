# DL Standard: how a Digital Learning day is built

**This is the living rulebook for the DL course.** It holds the current standard, the history of every change, and which day already follows which version. When a day is adjusted and the change should apply elsewhere, it is changed **here first**, a line is added to the changelog, and the status matrix shows which days still need it.

- **Current version: v1.0** (2026-10-17), first written from the rebuild of Day 2.
- **Reference implementation: Day 2** (`playground-dl/`, commits `dafc57f`, `f008ac4`, `3555e6b`, `ff322a3`).
- **Read this file first for any DL task.** `CLAUDE.md` (#1 to #56) still holds the older rules; where they differ for a task, this file wins (section 10).
- **Scope: the website only.** The Word documents follow their own rule (CLAUDE.md #53) and are touched only on the user's signal.

## How this file is kept up to date

1. A change is decided in a session (the user adjusts something on a day, or asks for a rule).
2. The rule is edited **in section 1 to 9 of this file**, never only in a code comment or in chat.
3. A line goes into the **changelog (section 11)**: date, what changed, why, and which days it applies to (`all days`, `from Day N`, `Day N only`).
4. The **status matrix (section 12)** is updated: the day that got the change is marked, the others stay open.
5. The version number goes up (v1.1, v1.2, …) when a rule changes meaning; a wording fix does not bump it.
6. The assistant offers to apply the change to the days that are still open, one day at a time; nothing is applied to other days without the user's yes.

## 1. Principles

- **The curriculum's own questions are the tasks.** Each numbered item of the plan column (Strukturplan) becomes a question, in the plan's order and close to its words. Nothing is put in front of them and nothing replaces them. Level 1 Task 1 is Block 1.1.
- **Free answers.** Open questions of the plan are text, never a pick from a list, a sort board, a rating grid or a live panel. The only fixed choices are the ones the plan itself offers (platform A or B; yes, no or partly; option A, B or C).
- **Every block is Core.** There are no Optional blocks. A block either is a plan item or it does not exist. An old instrument that matches no plan item is removed.
- **No figure the plan does not print.** No cost, weeks, budget, score or threshold is invented. What the case needs beyond the plan stays minimal and is labelled "Case assumption".
- **Checks are completeness only**: an empty field, a list with too few items, a text that is too short, each as a named item. A choice that differs from the model is never missing. Nothing is marked right or wrong.

## 2. Fields: form by default, table as a quiet extra, fields that grow

- A list of N items is **one text box, one item per line** by default. Where the plan asks for several things per item (risk, benefit, effort; what, how, measure), the default is **one box per item**.
- A **table** (rows by columns) is offered through **one quiet text link under the field**, never a prominent button ("Prefer a table? Fill in rows instead."). Both layouts are kept, only the chosen one counts, and a switch never loses the other. Shared component: `components/ui/FormOrTable.tsx`; the five-row case of Block 1.1 is built in `components/day2/Task1.tsx`.
- **Every free-text field and every table cell is `components/ui/AutoTextarea.tsx`**: it starts small and grows with what is typed (like a Google Docs cell); no clipped answer, no inner scrollbar, no single-line `<input>` for an answer. `TextBox` (`components/ui/Inputs.tsx`) already uses it. A truly short value (the participant's name, the mentor passcode) stays an `<input>`.
- **A rating scale is a recommendation, never a requirement.** Where the plan says "assess" and gives no scale, the help may say that teams often rate Low, Medium or High with a reason, and the model answer may use it; a learner who writes plain sentences is just as complete, and nothing checks for the words. The Materi says what practice looks like (a coarse scale or a value-effort two-by-two without data, a scoring formula with data) and that the reason carries the decision.
- Every free-text field keeps: a collapsed "How to build the answer" (`WritingHelp`, CLAUDE.md #55 section 1), an example answer on a different company (`ExampleAnswer`, #23), a mentor model answer in EN and DE, and an entry in the missing list (#1, #34).

## 3. Plan rows with no written deliverable: a hidden facilitator card

The Coaching row (UE4) and the Feedbackrunde (UE7) have questions to discuss and nothing to write. They are **not tasks**. On the page, in the place of the row, there is a card that stays hidden until the mentor passcode is entered; then one quiet button opens it. It holds the plan's coaching points and questions, has no fields, and is not in the missing list, the ring, the page map or the export. Reference: `CoachingCard` in `components/day2/Task1.tsx`.

## 4. Working simulations (CLAUDE.md #60 is the stub of this section)

Every platform, option and case artefact a task asks the learner to judge is **also** something the learner can open and use, so that a senior learner judges from experience, not from a description. Authentic tasks and contexts (Herrington, Reeves and Oliver, *A Guide to Authentic e-Learning*, 2010) and simulation research (what transfers is mostly task and functional realism, more than a photo-real look) are the basis: **it works like the real thing; it looks plausible.**

- **Two layers:** the overview card or schematic in the block, and an **"Open … and try it"** button that opens a simulation in a dialog with a browser frame (`components/sim/SimFrame.tsx`, `SimButton`: address bar, Reset, Close, Escape, focus kept inside, a footer that says it is a simulation).
- **One to one from the plan's clues.** Clear path, progress indicator, short units, long content, no navigation, no feedback: each becomes something the learner experiences. Every numbered fact the task prints can be found in it.
- **Nothing is added that changes the answer**: no extra problem, no extra virtue, no hint, no "bad" styling, no marking. A plain, neutral screen.
- **Options are experiences too** (Day 2 Block 1.2: a prototype that looks finished but where most taps are "not built yet"; a paper prototype paged by a person who plays the computer; the live product).
- **The case company is a place to visit** (LearnPro today is the same simulation as Platform B; Route 2 has the manager's desk with the note, the competitor news and the table of what is recorded). A figure appears only where the plan prints one.
- Own colours, never the site's blue, teal and rust; state is session-only, never counted, never exported; built inline, no external site; EN and DE by hand; 390 px without horizontal scroll. Day 2's simulations: `components/day2/sims.tsx`.
- Before building a day's simulations, **show one as a working demo in chat** and wait for a yes.

## 5. Real pictures (CLAUDE.md #52)

What has a form is shown in a real picture, the same example once per variant, interactive where a change is the lesson; the words beside it only say what to look at. A task option that names a visual kind carries a thumbnail. Before building a new picture, draw it once as a simple mockup in chat.

## 6. The Materi follows the tasks (done when the user asks)

- Every "why" line and rule names the blocks that really exist.
- No card teaches a rule or a figure the tasks no longer use (an effort rule by cost, a budget).
- A worked example uses its own company **and its own options**, so the task's answer is never shown.
- Read the cards against the plan's *Wissen* bullets and the Level 3 input lines one by one; close each gap with one sentence, and say when a statement is the plan's view and not a separate finding.
- A card that a block draws on is Core. The task chips (`MaterialRefs`) list every card a block needs.
- The Materi is **not touched** while tasks are being rebuilt unless the user asks.

## 7. State and checks

- One slice per route; both layouts of a list kept, only the chosen one counted; the persist version bumped; the deep `mergeDefaults` fills new fields; an old blob is tested (CLAUDE.md #9).
- `npx tsc --noEmit` and `npm run verify:dayN` (the model fill leaves nothing missing, each layout counts alone, a different decision exports, no Optional block, an old blob loads).
- The browser from a clean `localStorage` in EN and DE at 1280 px and 390 px, with a very long answer in every box and cell, the mentor fill and the export. Never run `next build` while the dev server runs (CLAUDE.md #10).

## 8. Word documents

Only on the user's signal (CLAUDE.md #53, #31). Order: the `_source` Markdown (Materi, Task, Trainer), then the build tools in `materi-task-docx/_tools`. A simulation becomes its starting screen plus its states written out. Until then a day's Word documents differ from its website, and the status matrix says so.

## 9. Order of work for a day (the checklist)

1. Read the day's plan column and **write the map first**: UE row to block, with the number of questions; a row with no deliverable becomes a facilitator card. Show it to the user and wait for a yes.
2. Build each block from the plan's words (sections 1 and 2), one block at a time, slowly.
3. Show each new picture or simulation as a mockup or demo **in chat first**, then build it.
4. Saved state, missing list, mentor key and guides (EN and DE), answer key only for fixed picks, export, `verify:dayN`.
5. Sync the Materi when asked (section 6).
6. Check (section 7). Write the README "Notes on deviations", update this file, update the memory note.
7. Commit; push only when the user asks (pushing to `main` deploys to Vercel).
- **Engines:** Day 2, Day 3 and Day 7 are hand-built (`components/dayN`); Days 4 to 6 share `dayStd`; Days 8 to 16 share `dayGen`. Rebuild a shared engine once, then each day's data; ask which route the user wants before starting a day that uses one.

## 10. What still applies from CLAUDE.md #1 to #56

| Still applies in full | Missing lists and jump links (#1, #2, #34); never-disabled buttons (#3); no hard locks (#6); the mentor bar, fill and answer keys (#7, #23); field help under the label (#8); the stack (#9); verification (#10); glossary (#19); page map (#28); home intro (#27); style and the Ocean palette (#15); the DL adaptation (#49); plan fidelity (#50); writing to explain (#51); real pictures (#52); Word rule (#53); two routes per day (#30); EN and DE (#32); export (#16) |
| **Overridden by this file for the tasks of a day built to it** | check-on-demand with a clue (#4), undo and redo on placement (#5), triage and a shared grid (#13, #14), Core and Optional split and ceiling (#35), Core never depends on Optional (#40, no Optional exists), the Core choice of #44, the prioritisation block (#45), the decision frame (#47), the measure block and sentence (#55 sections 2 and 3), the Level 3 live panel (#56) |
| Not used for DL | the Friday capstone (#29), the Day 13 to 16 form (#48), CS calculations (#21 to #26, #43) unless the plan asks for one |
| Cards, later | story comics on cards (#54): added when the user asks |

## 11. Changelog

| Date | Version | What changed | Why | Applies to |
|---|---|---|---|---|
| 2026-10-17 | v1.0 | Tasks are the plan's own questions as free answers; no Optional blocks; no invented figures; completeness-only checks | Tasks had become scenario-shaped (sort boards, option lists with costs, panels) and learners could not answer what the plan asks | All days; Day 2 done |
| 2026-10-17 | v1.0 | A list is one box by default; a table through a quiet link; both layouts kept, only the chosen one counts (`FormOrTable`) | The user liked a table for clarity, but the form must stay the default | All days; Day 2 done |
| 2026-10-17 | v1.0 | Every free-text field and cell grows with the text (`AutoTextarea`) | A long answer was clipped in a table cell | All days; done in the shared `TextBox`, Day 1's slot field and Day 6's journey cells |
| 2026-10-17 | v1.0 | A rating scale (Low, Medium, High) is a recommendation, never a requirement | The scale was ours, not the curriculum's | All days; Day 2 done |
| 2026-10-17 | v1.0 | A plan row with no deliverable (Coaching, Feedbackrunde) is a hidden facilitator card | The reflection is discussed aloud and nothing is written | All days; Day 2 done |
| 2026-10-17 | v1.0 | Platforms, options and case artefacts are working simulations, one to one from the plan's clues | Seniors judge from experience; the plan gives only clues | All days; Day 2 done |
| 2026-10-17 | v1.0 | The Materi follows the tasks: no card teaches a rule or figure the tasks no longer use; own options in worked examples; plan gaps closed; cards a block draws on are Core | The A5 effort rule by cost and the old block names no longer matched the tasks | All days; Day 2 done |
| 2026-10-17 | v1.0 | Order of work: map first, one block at a time, picture or demo in chat first, tasks before Materi, Word only on signal | The user wants it slow and visible | All days |
| 2026-10-17 | v1.0 | This file is the living rulebook; CLAUDE.md #57 to #60 point here | One place to update and to see what changed | All days |

## 12. Status matrix: which version each day follows

`✓` done · `old` still the previous form · `wait` waiting for the user's signal · `n/a`

| Day | Tasks (sections 1 to 3) | Fields grow (section 2) | Materi synced (section 6) | Simulations (section 4) | Word documents |
|---|---|---|---|---|---|
| 1 | old (#55, #56 form) | ✓ (shared field, slot field) | old | old | old (v1.1), wait |
| **2** | **✓ v1.0** | **✓** | **✓** | **✓** | **old, out of sync, wait** |
| 3 | old | ✓ (shared) | old | old | old (v1.1), wait |
| 4 | old | ✓ (shared) | old | old | old (v1.1), wait |
| 5 | old | ✓ (shared) | old | old | old (v1.1), wait |
| 6 | old | ✓ (shared, journey cells) | old | old | old (v1.1), wait |
| 7 | old | ✓ (shared) | old | old | old (v1.1), wait |
| 8 | old | ✓ (shared) | old | old | old (v1.1), wait |
| 9 to 16 | old | ✓ (shared) | old | old | no Word documents yet |

**Open questions for the user:** whether Day 1 is converted to the standard (it has its own newer form from #55 and #56); which route to take for the days on shared engines (4 to 6, 8 to 16); when the Day 2 Word documents may be rebuilt.
