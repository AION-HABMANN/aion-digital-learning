# DL Standard: how a Digital Learning day is built

**This is the living rulebook for the DL course.** It holds the current standard, the history of every change, and which day already follows which version. When a day is adjusted and the change should apply elsewhere, it is changed **here first**, a line is added to the changelog, and the status matrix shows which days still need it.

- **Current version: v1.2** (2026-10-17), first written from the rebuild of Day 2; v1.2 adds the pixel story comics (section 13).
- **Reference implementation: Day 2** (`playground-dl/`, commits `dafc57f`, `f008ac4`, `3555e6b`, `ff322a3`).
- **Read this file first for any DL task.** `CLAUDE.md` (#1 to #56) still holds the older rules; where they differ for a task, this file wins (section 10).
- **Scope: the website only.** The Word documents follow their own rule (CLAUDE.md #53) and are touched only on the user's signal.

## How this file is kept up to date

1. A change is decided in a session (the user adjusts something on a day, or asks for a rule).
2. The rule is edited **in section 1 to 9 or 13 of this file**, never only in a code comment or in chat.
3. A line goes into the **changelog (section 11)**: date, what changed, why, and which days it applies to (`all days`, `from Day N`, `Day N only`).
4. The **status matrix (section 12)** is updated: the day that got the change is marked, the others stay open.
5. The version number goes up (v1.1, v1.2, …) when a rule changes meaning; a wording fix does not bump it.
6. The assistant offers to apply the change to the days that are still open, one day at a time; nothing is applied to other days without the user's yes.

## 1. Principles

- **The curriculum's own questions are the tasks.** Each numbered item of the plan column (Strukturplan) becomes a question, in the plan's order and close to its words. Nothing is put in front of them and nothing replaces them. Level 1 Task 1 is Block 1.1.
- **Free answers.** Open questions of the plan are text, never a pick from a list, a sort board, a rating grid or a live panel. The only fixed choices are the ones the plan itself offers (platform A or B; yes, no or partly; option A, B or C).
- **Every block is Core.** There are no Optional blocks. A block either is a plan item or it does not exist. An old instrument that matches no plan item is removed.
- **No figure the plan does not print.** No cost, weeks, budget, score or threshold is invented. What the case needs beyond the plan stays minimal and is labelled "Case assumption".
- **Case detail closes gaps, never answers.** Where the plan says only "limited" or "unclear", experienced participants ask what it means. The case brief may add **qualitative** facts, each marked "Case assumption", that settle what the participant needs to read the case (what exists, what is recorded, what the time is for, which platform it is) and a box that lists **what is known and what is open on purpose**. It never adds a figure, never contradicts the plan, never names the cause the model solution finds, and never anchors a deliberately open condition (a budget stays unset; the answer must hold at any budget, and the learner says what they assume). A hidden facilitator card ("if a participant asks") holds the standard answers, so every group hears the same. Reference: Day 2 (`CaseBrief`, `CaseQaCard`, Block 1.2).
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
- A day's simulations are built directly from the plan's clues (v1.1: no demo-and-wait step on a full upgrade).

## 5. Real pictures (CLAUDE.md #52)

What has a form is shown in a real picture, the same example once per variant, interactive where a change is the lesson; the words beside it only say what to look at. A task option that names a visual kind carries a thumbnail. A new picture is built directly from the plan's clues (v1.1); a chat mockup only if the user asks for one.

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

1. Read the day's plan column and **write the map first**: UE row to block, with the number of questions; a row with no deliverable becomes a facilitator card. **On a full upgrade request ("upgrade Day N like Day 2") do not wait for a yes: write the map in the README and build (v1.1).** Only a decision this standard does not settle is asked.
2. Build each block from the plan's words (sections 1 and 2), one block at a time, slowly.
3. Pictures and simulations are built straight from the plan's clues (v1.1); show a mockup or demo in chat first only when the user asks to see it before it is built.
4. Saved state, missing list, mentor key and guides (EN and DE), answer key only for fixed picks, export, `verify:dayN`.
5. Sync the Materi when asked (section 6).
6. Check (section 7). Write the README "Notes on deviations", update this file, update the memory note.
7. Commit; push only when the user asks (pushing to `main` deploys to Vercel).
- **Engines:** Day 2, Day 3 and Day 7 are hand-built (`components/dayN`); **Days 4 to 6 (and any later day built to this standard) use the free-form engine `dayFree`**: write `data/dayN/free.ts` with `defineSpec`, a kit `components/dayN/Free.tsx` with the pictures and simulations as slots, register the day in `components/day/dayConfigs.tsx`, `store/dayTypesStd.ts`, `store/useStore.ts` (mentor fill) and `scripts/verify-free.ts`; Days 8 to 16 still share `dayGen` and Day 7 `dayStd` (rebuild them on `dayFree` when asked, no question needed).

## 10. What still applies from CLAUDE.md #1 to #56

| Still applies in full | Missing lists and jump links (#1, #2, #34); never-disabled buttons (#3); no hard locks (#6); the mentor bar, fill and answer keys (#7, #23); field help under the label (#8); the stack (#9); verification (#10); glossary (#19); page map (#28); home intro (#27); style and the Ocean palette (#15); the DL adaptation (#49); plan fidelity (#50); writing to explain (#51); real pictures (#52); Word rule (#53); two routes per day (#30); EN and DE (#32); export (#16) |
| **Overridden by this file for the tasks of a day built to it** | check-on-demand with a clue (#4), undo and redo on placement (#5), triage and a shared grid (#13, #14), Core and Optional split and ceiling (#35), Core never depends on Optional (#40, no Optional exists), the Core choice of #44, the prioritisation block (#45), the decision frame (#47), the measure block and sentence (#55 sections 2 and 3), the Level 3 live panel (#56) |
| Not used for DL | the Friday capstone (#29), the Day 13 to 16 form (#48), CS calculations (#21 to #26, #43) unless the plan asks for one |
| Story comics | story comics on cards (#54): Days 2 to 6 carry the pixel comics of section 13 (they replace "Walk me through it"); Day 1 keeps its line-art comics; Days 7 to 16 get them when the user asks |

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
| 2026-10-17 | v1.1 | Day 3 rebuilt to the standard (Blocks 1.1, 1.2, 2.1, 3.1, two facilitator cards through the shared `FacilitatorCard`, simulations of the lesson, the options and the platform) | First use of the no-validation rule | Day 3 done |
| 2026-10-17 | v1.1 | Days 4 to 6 rebuilt on the new shared free-form engine `dayFree` (one spec file per day) | Three days in one pass; the engine makes the next days a data file and a kit | Days 4, 5, 6 done |
| 2026-10-17 | v1.1 | A full upgrade request ("upgrade Day N like Day 2") needs no validation: no map-and-wait, no mockup-and-wait; read the standard and build | The standard exists; the user does not want to confirm each day again | Day 3 and every later day |
| 2026-10-17 | v1.0 | This file is the living rulebook; CLAUDE.md #57 to #60 point here | One place to update and to see what changed | All days |
| 2026-10-17 | v1.2 | Case detail closes gaps in the plan's case without a figure: a "known and open" box, assumption sentences in the brief, a facilitator "if a participant asks" card (section 1); Day 2 Block 1.2 reworded (start with, LearnPro's next version, the three months for a management review) | Experienced participants asked what "limited" and "unclear" mean, and the plan's Task 2 ("a new platform") and case study (LearnPro) had been merged without saying so | Day 2 done; other days when the user asks |
| 2026-10-17 | v1.2 | Story comics in pixel art on every study card of Days 2 to 6 ("Read the comic"), replacing the "Walk me through it" story; style, kit, German labels and checks recorded in section 13; CLAUDE.md #54 points here | The user approved the pixel style (a chat mockup of Day 2) and asked for Days 2 to 6 | Days 2 to 6 done; later days on request |

## 12. Status matrix: which version each day follows

`✓` done · `old` still the previous form · `wait` waiting for the user's signal · `n/a`

| Day | Tasks (sections 1 to 3) | Fields grow (section 2) | Materi synced (section 6) | Simulations (section 4) | Comics (section 13) | Word documents |
|---|---|---|---|---|---|---|
| 1 | old (#55, #56 form) | ✓ (shared field, slot field) | old | old | line-art (#54), ✓ | old (v1.1), wait |
| **2** | **✓ v1.0** | **✓** | **✓** | **✓** | **✓ pixel** | **old, out of sync, wait** |
| **3** | **✓ v1.1** | **✓** | **old** (A5, B3 still name Blocks 2.2 and 3.2), wait | **✓** (lesson, options, platform) | **✓ pixel** | **old, out of sync, wait** |
| **4** | **✓ v1.1** | **✓** | **old**, wait | **✓** (platforms, options, MotivaLearn, desk) | **✓ pixel** | **old, out of sync, wait** |
| **5** | **✓ v1.1** | **✓** | **old**, wait | **✓** (LearnBase, options, desk) | **✓ pixel** | **old, out of sync, wait** |
| **6** | **✓ v1.1** | **✓** | **old**, wait | **✓** (EduPath, desk) | **✓ pixel** | **old, out of sync, wait** |
| 7 | old | ✓ (shared) | old | old | wait (on request) | old (v1.1), wait |
| 8 | old | ✓ (shared) | old | old | wait (on request) | old (v1.1), wait |
| 9 to 16 | old | ✓ (shared) | old | old | wait (on request) | no Word documents yet |

**Reference for later days:** Days 4 to 6 are the reference for the `dayFree` engine (`data/day4/free.ts` is the most complete spec).  Day 3 adds the shared `components/ui/FacilitatorCard.tsx` and shows how a Level 1 task with an options block and a case study with a list-or-table pair are built (`components/day3/Task1.tsx`).

**Open questions for the user:** whether Day 1 is converted to the standard (it has its own newer form from #55 and #56); which route to take for the days on shared engines (4 to 6, 8 to 16); when the Day 2 Word documents may be rebuilt.

## 13. Story comics in pixel art (CLAUDE.md #54 points here)

Written 2026-10-17 from Days 2 to 6. A rule about the **website only** (Word keeps its own detail, #52, #53). Every study card carries one comic, a quiet row at the top of the card ("▶ Read the comic · title · teaser · n panels"), opening a dialog. **It replaces the card's "Walk me through it" story** (the `useStory` plan, the `<Story>` row, the spotlight classes and the "Press “Walk me through it”" sentence are removed; the sentence now says “Read the comic”). The diagram's own controls, "The point" and "What this shows" stay.

**Not a new story: the card's own material in pictures.** The people and the example company are the card's own (Day 2: Sofia, Ana, Lena, Tom, LearnLoop's Chief Product Officer; Day 3: Daniel, Mira, Priya; Day 4: Tom, Anna, Maya, Dana, Priya; Day 5: Mia, Priya, Dana, the finance director; Day 6: Mia, Sven, Petra, Priya, Dana, Sandra), the figures are the card's, and anything invented is labelled "Case assumption" in the comic's note. A card with no story (a static diagram) gets one told from its idea and its picture.

**Shape.** Four panels: the situation, the problem, the fix, and a last panel `THE RULE` that states the card's rule in one sentence and **names the task block that uses it** (a real block of the day: 1.1, 1.2, 2.1 or 3.1; there are no Optional blocks). A card that needs one more step has five (never more). Every panel has: the drawing, a scene line, speech (HTML), a tag that names what the panel shows (`tone` plain, teal or ink; the words carry the meaning, never the colour), an always-visible "What this panel means" (through `glossify`, #19) and optionally a "Look at:" line. Both languages are written by hand (#32).

**The style (approved by the user from a chat mockup).**
- A 160 by 90 grid in an SVG with `shapeRendering="crispEdges"`: chunky sprites with a **one-pixel outline in #1B1B1F**, flat colours, big heads, a face made from a few pixels, original characters (never someone else's). A pale-blue sky and a wooden floor (`Stage`), a table, a monitor, a board as props. No gradients, no shadows, no photo.
- **Speech is never drawn**: it is HTML beside the picture and wraps in both languages. Inside the drawing only numerals and short capital labels (`Txt`, a monospace face).
- The dialog looks like the drawings: a dark letterbox (`bg-[#1B1B1F]`) around the picture, a black frame, square speech boxes and square step dots (`pixel: true` on the comic); the header and the footer stay fixed so Next is always visible (check 390 px and a 450 px-high pane).
- A rating in a drawing is the same rating the card's diagram prints (Low, Mid, High as three squares), a chart uses the card's own numbers, money is the card's own. Text in a board stays inside the board: keep a rating board 56 high and its rows at 38, 46 and 54.

**Kit and files.**
- `components/comic/PixelKit.tsx`: `Stage` (backgrounds office, class, outside, plain, night), `Person` (a cast entry in `LOOK`, a face `neutral|worried|happy|sad|think|surprised`, a pose `down|up|point`, `flip`), `Kid`, `Table`, `Board`, `Mon`, `Lines`, `Bar`, `Chip`, `Paper`, `Calendar`, `Cloud`, `Door`, `Tree`, `Coins`, `Icon` (check, cross, up, down, clock, warn, ask, idea, eye, lock, chart, book, heart, gear, play, pencil), `Mark` (sweat, ask, bang, zzz), `Tick`, `Cross`, `Arrow`, `Bits` (a small bitmap), `Txt`.
- `components/dayN/comicScenes.tsx`: `ART_DN`, one entry per panel (`a1-1` to `b3-4`), plus the day's own helpers (a chart, a matrix, a persona card) and its cast: `LOOK.name = { hair, shirt, skin?, long?, glasses? }`. `data/dayN/comics.ts`: `COMICS_DN = bi({ A1: { id, pixel: true, title, teaser, note, names, panels: [...] }, ... }) as Record<MaterialId, Comic>`. `components/dayN/Cards.tsx`: `<ComicButton comic={COMICS_DN.A1} art={ART_DN} />` as the first child of each `MaterialCard`. Dialog: `components/comic/ComicModal.tsx`.
- **German labels in the drawings:** every string label goes through `components/comic/pixelLabels.ts` (`pixelLabel`, called by `Txt`): one hand-written German entry per English label; common UX terms stay English (Feedback, Persona, Usability-Test, Analytics, Roll-out); numbers are written in German form (40.000, 8.000 €, 60 %). A label with no entry is logged to the console in German mode (`[pixel label without German]`), so a gap is found while testing. A label that reads the same in both languages still has an entry.

**How to add a day.** Read each card (its "In plain words", picture text, story, data) and write the panels from it; list the cast and its look; draw the scenes with the kit and the day's helpers; write `comics.ts`; add the `ComicButton` to every card; remove the card's story from `diagrams.tsx` (and `diagramsB.tsx`) and change the "How to read the picture" sentence; add every new label to `pixelLabels.ts`; then run the checks below.

**Checks before a day ships.** `npx tsc --noEmit`. In the browser, EN and DE: open every comic of Route 1 (open the Optional card too) and Route 2 and look at every panel (a gallery of all panels is the quickest way): nothing overflows a board or a bar, no sprite covers a label, the figures equal the card's; no console warning `[pixel label without German]`; no dialog element wider than the dialog; ← → and Escape work; 390 px has no horizontal scroll and Next stays visible; no card still says “Walk me through it”. Reference: Days 2 to 6 (Day 2 is the first, `components/day2/comicScenes.tsx`).
