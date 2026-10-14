# Learning UX Lab · Digital Training and Learning Systems

**Educational UX/UI design for digital learning platforms (Habmann AufstiegsAkademie), 16 days.** One Next.js project holds every day; the build has
**Day 1** (Module 1, Day 1 of 2: UX/UI for learning platforms and user-centred design), **Day 2** (Module 1, Day 2 of 2: successful platforms, prototyping,
testing, adaptive learning), **Day 3** (Module 2, Day 1 of 2: learning psychology and cognitive load), **Day 4** (Module 2, Day 2 of 2: motivation and design principles),
**Day 5** (Module 3, Day 1 of 3: user-centred UX design), **Day 6** (Module 3, Day 2 of 3: personas and user journeys) and **Day 7** (Module 3, Day 3 of 3: accessibility and inclusive design). A self-study companion in **English and German**
(EN | DE in the top bar): study material with live instruments, two tasks and two working documents per day. It carries the shared standards
`../CLAUDE.md` #1 to #50 and the two-route form of #30. Palette: the DL "Ocean" palette (#15).

**Live site:** https://aion-dl.vercel.app (Day 1 at https://aion-dl.vercel.app/day/1/). Vercel project `aion-dl` of the account `attoyibi`; deployed from this folder with the CLI.
It is not connected to GitHub yet, so a push does not deploy: run `vercel deploy --prod --yes` in this folder (Vercel detects Next.js and the static export; when the project is connected to the
repository, set its Root Directory to `playground-dl`). **Days 2 and 3 are deployed; Days 4 to 6 are built, verified and pushed to GitHub, and not deployed yet.**

The cases: **Day 1 · SkillUp GmbH** runs the learning platform LearnFast (40 of every 100 learners do not finish; €50,000, two months; Route 2 €120,000).
**Day 2 · LearnPro**, a stagnating platform (€60,000, three months; Route 2 €200,000). **Day 3 · EduCore**, a platform with an overwhelm effect (€40,000, four weeks; Route 2 €150,000).
**Day 4 · MotivaLearn**, a platform with low retention (€40,000, two months; Route 2 €180,000). **Day 5 · LearnBase**, a feature-heavy platform with low usage (€40,000, 13 weeks; Route 2 €200,000). **Day 6 · EduPath**, a platform on which different users fail in different ways (€45,000, 13 weeks; Route 2 €220,000). **Day 7 · InclusiveLearn**, a platform with access problems (€50,000, 10 weeks; Route 2 €240,000).
Every figure beyond what the plan prints is a Case assumption, labelled on screen. The sources of Days 2 to 6 are the reviewed Markdown files in `../materi-task-docx/_source/` (`dayN-*.md`).

## Layout (one project, all days)

```
app/page.tsx                      the sixteen days (only a built day is a real page; the others keep their place)
app/day/[n]/page.tsx              a day's home      /day/1/
app/day/[n]/route-1|2/page.tsx    its two routes    /day/1/route-1/   /day/1/route-2/
components/day/DayView.tsx        picks the content of a day; wraps it in <DayProvider> (lib/dayContext.tsx)
components/day/DayPages.tsx       the shared home and route frames of the days after Day 1 (a day hands over one DayConfig)
components/day/dayConfigs.tsx     the DayConfig of Days 2 to 6
components/day/mockKit.tsx        drawing primitives for the mock screens and pictures of Days 4 to 6 (greys only: the site colours never colour the evidence)
components/dayStd/*               the blocks that repeat on a standard day (Days 4 onward): measures (Block 2.2), three options (1.2), reflection (1.3), decisions picker (Route 2)
lib/dayStd/common.ts             the minimums, minutes, Core/Optional lists and Block 2.2 helpers shared by Days 4 to 6
components/day1|day2|day3|day4|day5|day6|day7/*       per day: Cards, diagrams, mock screens, Task1, Task2, Materi (Day 1 also Pages)
components/materi/figures.tsx     figures shared by Days 2 and 3: chain, two columns, decision frame, cost bands, selectable matrix
components/chrome, components/ui  shared by every day (top bar, mentor bar, rail, page map, answer blocks, export bar, order list …)
data/course.ts                    the 16 days of the plan (topics in EN and DE), `built` flags, route helpers
data/dayN/*                       case, route 2 items, materials, the day's intro and page map
data/references.ts                one reference list for the course (a card cites keys from it)
data/materialRegistry.ts          the cards of every built day; shared components read them through lib/useMaterials.ts
data/glossary.ts, glossaryMore.ts one glossary for the course (a day adds its terms; Day 2 and 3 terms are in glossaryMore.ts)
lib/dayN/*                        checks, missing lists, progress, model answers, answer keys, worked answers, export documents
lib/lists.ts                      pure helpers (capped history, "choose exactly N", priority order, placement with undo and redo)
store/useStore.ts                 one persisted store, one slice per day (`d1` to `d7`), each with two routes (`r1`, `r2`); key `dl-v1`, version 4 (a generic `patchStd` writes Days 4 to 7)
store/dayTypes.ts, dayTypesStd.ts the shapes and empty values of the Day 2 and 3 slices, and of the Day 4 to 6 slices
scripts/verify-day1|2|3|4|5|6.ts  data and logic checks in both languages
```

To add the next day: copy `components/day6`, `data/day6`, `lib/day6` to `dayN`, replace the content, add a slice `dN` to `store/dayTypesStd.ts` and the store (bump `PERSIST_VERSION`,
extend `migratePersisted`, `mentorFill` and `resetRoute`), register the day's materials in `data/materialRegistry.ts`, add its `DayConfig` to `components/day/dayConfigs.tsx`,
set `built: true` in `data/course.ts`, and add any new references to `data/references.ts` and terms to `data/glossaryDays456.ts` (or a new file).

## Routes of Day 1

| Route | Content | Export |
|---|---|---|
| `/day/1/route-1/` **Levels 1 + 2** | **Materi A**, five cards, 60 min (A1 UX and UI, A2 the learner's need, A3 three principles, A4 platform against classic app **Optional**, A5 weighing a measure). **Task 1, UX Analysis File**: 1.1 **Core** (eight findings into Orientation, Understanding, Motivation; the one that makes a learner give up first, with a reason), 1.2 to 1.3 and 2.1 Optional (what the 40 % shows; a coaching reflection; three causes), 2.2 **Core** (four of nine measures, rated on user impact, effort and risk, ordered, with what is missing). | `1-{name}-day1-l1l2-ux-analysis.html` |
| `/day/1/route-2/` **Level 3** | **Materi B**, three cards, 60 min (B1 UX as a business factor, B2 conflicting goals, B3 deciding when you do not know enough). **Task 2, UX Strategy Memo**: 3.1 **Core** (vision, three of seven decisions, their order), 3.2 **Core** (biggest risk, one decision without complete data, who decides and on what evidence, what you give up). The memo builds below the questions (hide / show). | `2-{name}-day1-l3-ux-strategy.html` |

Minutes (the user's standing weights): Materi 60 + Task 1 Core 30 (all 50), Materi 60 + Task 2 Core 20.

## Routes of Day 2 (LearnPro) and Day 3 (EduCore)

Both days follow the form of Day 1 exactly (two routes, Core and Optional blocks, the same mentor bar, export names `{route}-{name}-day{N}-l1l2-ux-analysis` and `…-l3-ux-strategy`).
Minutes are the user's standing weights: Materi 60 + Task 1 Core 30 (all 50), Materi 60 + Task 2 Core 20. Card A4 of both days is Optional.

| Route | Day 2 · Platforms in practice, prototyping, testing | Day 3 · Learning psychology, cognitive load |
|---|---|---|
| **Materi A** (5 cards, 60 min) | A1 What successful platforms have in common · A2 Prototyping (loop, fidelity ladder, story) · A3 Testing (five users, qualitative against quantitative, KPIs) · **A4 Adaptive learning (Optional)** · A5 Weighing a prototyping and testing decision | A1 How people learn (intake, processing, storage) · A2 Cognitive load (three loads, story) · A3 Working memory, chunking, focus · **A4 Typical UX mistakes (Optional)** · A5 Weighing a load-reducing measure |
| **Task 1**, Route 1 (`/day/N/route-1/`) | **1.1 Core** eight facts about Platform A and B sorted into Learning path / Short units / Feedback, a preferred platform with a reason, three principles "Do X, because Y". 1.2 Optional three options rated, a decision, the risks without testing. 1.3 Optional reflection. 2.1 Optional three weaknesses of six. **2.2 Core** one prototype approach (of 5), three UX tests (of 7) each with the question it answers, cost and weeks against €60,000 and 12 weeks, the adaptive decision (yes / partly / no), what is missing. | **1.1 Core** eight facts sorted into Amount / Form / Order and purpose, the one that stops a learner first with how the process feels, the improvements. 1.2 Optional three options rated, ordered, the greatest effect. 1.3 Optional reflection. 2.1 Optional four causes of seven. **2.2 Core** four measures (of 9) rated on learning impact, effort and risk, ordered, justified, what is missing; €40,000 and 4 weeks. |
| **Materi B** (3 cards, 60 min) | B1 UX investments as staged bets (gates, story) · B2 Conflicting goals (matrix, story) · B3 Deciding under uncertainty | B1 Learning effectiveness and cognitive efficiency · B2 Efficiency against deep learning (matrix, story) · B3 Deciding without user data |
| **Task 2**, Route 2 (`/day/N/route-2/`) | **3.1 Core** adaptive decision, prototyping strategy, data needed (≥ 3), three investments of seven and their order. **3.2 Core** biggest risk, one decision under uncertainty (four-part frame), who decides, on what evidence (≥ 2), what you give up. €200,000. | **3.1 Core** strategy, a definition of learning-effective UX, three measures of seven and their order. **3.2 Core** biggest risk, who decides about new content, the checks a new lesson passes (≥ 3), a decision without user data, what you give up. €150,000. |

## Plan mapping, Days 2 and 3 (CLAUDE.md #44, #50)

| Plan row | Day 2 on the site | Day 3 on the site |
|---|---|---|
| Wissensvermittlung | Materi A1 to A5, B1 to B3 (the plan's topic groups: success factors, learning paths, microlearning, feedback, prototyping, usability tests and KPIs, adaptive learning, the three conflicts) | Materi A1 to A5, B1 to B3 (learning process, three kinds of load, working memory and chunking, visual hierarchy, typical mistakes, effectiveness against efficiency) |
| Level 1 Arbeitsauftrag 1 | Block 1.1 (compare Platform A and B, preference, three principles; the plan's "5 differences" are the eight printed facts, sorted) | Block 1.1 (describe how the process feels, sort the facts, what you would improve) |
| Level 1 Arbeitsauftrag 2 | Block 1.2 (Optional): three options, assess risk, benefit, effort, decide | Block 1.2 (Optional): shorten, visualise, split; learning impact, effort, risk; priority |
| Coaching | Block 1.3 (Optional) | Block 1.3 (Optional) |
| Level 2 Fallstudie | Blocks 2.1 (Optional) and 2.2 (Core): weaknesses, prototype approach, three UX tests, "is adaptive learning worthwhile?" | Blocks 2.1 (Optional) and 2.2 (Core): four causes, four improvements, prioritise, justify; the plan's "Welche Information fehlt Ihnen?" is a required field |
| Feedbackrunde | Classroom discussion; not a worksheet block | Classroom discussion; not a worksheet block |
| Transferprojekt | Blocks 3.1 and 3.2: decision (yes / no / partly), prototyping and testing strategy, roadmap, risk, one decision under uncertainty | Blocks 3.1 and 3.2: strategy, definition, three prioritised measures, risk, decision logic, one decision without user data |

## Notes on deviations, Days 2 and 3

1. **No calculation anywhere** (#44): the plan has none. Costs, budgets and weeks are printed and compared; the effort rule (Day 2: under €10,000 Low, up to €25,000 Mid, above High; Day 3: under €8,000 Low, up to €15,000 Mid, above High) is taught in card A5 and can be checked, while impact, benefit and risk are the learner's judgement and are never marked (#38).
2. **Day 3's reference set differs from the plan's Musterlösung in one measure.** The plan names chunking, visualisation, clear structure and reducing irrelevant content. In this case "Visualisation" (M2) costs €20,000 and takes five weeks, one more than the four weeks the plan prints, so the mentor key uses "Goal and outline" (M5, which answers facts 7 and 8, the missing learning logic) in its place. A learner who funds M2 as the plan does exports with "longest measure 5 weeks of 4" printed as a fact and a reason (tested in `verify:day3`). The mentor answer key says so.
3. **Day 2's reference choices follow the plan's Musterlösung:** main problem lack of feedback and individualisation; low-fidelity tests first; adaptive elements step by step ("partly"). The reference approach is P2 (a clickable low-fidelity version of the whole flow); P1 (paper sketches first) is marked as an equally defendable, cheaper start.
4. **Level 1 Arbeitsauftrag 2 is Optional on both days** (Block 1.2), as on Day 1 (#35 ceiling: two Core blocks in Route 1). On Day 3, Block 2.2 holds the plan's Fallstudie and its prioritisation in one.
5. **Day 3 Block 1.1 has the plan's "what would you improve intuitively" field.** (The Day 1 website still lacks its "three improvement ideas" field; the Day 1 Word worksheet has it.)
6. **The decision under uncertainty is one field with a collapsed frame, as on Day 1,** although the Word worksheets show the parts as a table. The export prints the text under one heading; "what you give up" has its own field.
7. **Shared code was extended, not forked:** the material card, the "Draws on" chips and the reference list read the day's cards through `lib/dayContext.tsx` and `data/materialRegistry.ts`; the references moved to `data/references.ts` (Day 1 re-exports them, texts unchanged); the persisted store is version 2 (a Day 1 blob migrates and keeps its answers, tested). Day 1's own pages and components are unchanged.
8. **Glossary:** `data/glossaryMore.ts` adds entries (EN and DE, written by hand) for the terms of Days 2 and 3, and also five terms Day 1 used without an entry (wireframe, heuristic, premortem, symptom, stakeholder); Day 1's text links them now too.
9. **Worked-example company:** LearnLoop on both days (Day 2: €60,000, three months, an untested course start; Day 3: a hard beginner course, €30,000, four weeks); the task companies are LearnPro and EduCore.
10. **Not built in this pass,** as on Day 1: videos (#33), the facilitator debrief card for the Feedbackrunde, the website links in the Word documents (they still say "not yet published" for Days 2 and 3: add the link once the days are deployed), and an automated accessibility run (axe) of the new pages.

## Dependency checklist, Days 2 and 3 (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| Blocks 1.1 and 2.2 of both days | **Core** | the brief, the printed facts and tables, cards A1 to A3 and A5 (Day 2: A1, A2, A3, A5; Day 3: A2, A3, A5; the adaptive-decision rule of Day 2 is repeated in A5) | ✓ |
| Blocks 1.2, 1.3, 2.1 | Optional | the brief and their own items | self-contained |
| Blocks 3.1 and 3.2 | **Core** | the brief and cards B1 to B3; Route 2 only quotes Route 1's Core answer (the adaptive decision on Day 2, the fact that stops a learner on Day 3) as a soft pointer | ✓ |
| Cards A1 to A3, A5, B1 to B3 | Core | each other and the case | ✓ |
| Card A4 of both days | Optional | none | no Core block cites it |

`npm run verify:day2` and `npm run verify:day3` check that filling only the Core fields leaves nothing missing, that a different over-budget choice (Day 3: the plan's own four measures) with reasons still exports, that the exports hold no answer key, and that an old Day 1 blob migrates.

## Days 4 to 6 (MotivaLearn, LearnBase, EduPath)

Built to the standard of Days 2 and 3: two routes per day (`/day/N/route-1/` UX Analysis File, `/day/N/route-2/` UX Strategy Memo), two Core blocks per route, Optional blocks folded,
EN and DE written by hand, a story and "What this shows" on every interactive diagram, real pictures for everything that has a form (#52), the mentor bar, answer keys and worked
answers, and a `verify:dayN` script. The blocks that repeat from day to day are shared in `components/dayStd`; each day keeps its own content.

| | Day 4 · Motivation and design principles | Day 5 · User-centred UX design | Day 6 · Personas and user journeys |
|---|---|---|---|
| **Materi A** (5 cards, 60 min, A4 Optional) | A1 Intrinsic and extrinsic motivation (Tom's quizzes, SDT) · A2 Five design principles (a lesson screen that gains one at a time) · A3 Feedback, progress, rewards · **A4 Metrics and iteration (Optional)** · A5 Weighing an engagement measure | A1 User-centred against feature-driven (one home screen decided two ways, Kano) · A2 Learners, goals, contexts of use · A3 Three typical mistakes (a home screen that gains and loses them) · **A4 Methods (Optional)** · A5 Weighing a user-centred measure | A1 Personas (a persona nobody can use, one a team can decide with) · A2 Good and weak personas · A3 User journeys (emotion curve) · **A4 Learners and teachers (Optional)** · A5 Weighing a measure along a journey |
| **Task 1** | **1.1 Core** eight facts about two platforms into four principles, a preferred platform, three principles. **2.2 Core** four of nine measures. €40,000, 8 weeks. | **1.1 Core** goal as a learner, eight facts into three mistakes, the most frustrating fact, three expectations. **2.2 Core** four of nine measures. €40,000, 13 weeks. | **1.1 Core** eight research notes into Goal / Problem / Context, a learner persona (five fields), frustrations. **2.2 Core** four of nine measures, each with the pain point it answers. €45,000, 13 weeks. |
| **Materi B** (3 cards, 60 min) | B1 Motivation, ability, prompt · B2 Motivation against pressure (matrix) · B3 Control group, a decision under uncertainty | B1 From a user need to a business figure · B2 Three goals and their conflicts · B3 The gate a feature must pass, a decision under uncertainty | B1 Segments by size and value (matrix) · B2 Design for everyone, primary first, shared base · B3 Evidence behind a persona, a reversible priority |
| **Task 2** | **3.1 Core** strategy, three of seven decisions and their order, success measures. **3.2 Core** risk, a decision under uncertainty, who decides, give-up. €180,000. | **3.1 Core** central user needs, three of seven decisions and their order, a conflict row per decision. **3.2 Core** risk, who decides, evidence, the rule for new features, a decision without complete data, give-up. €200,000. | **3.1 Core** two or three strategic personas, target group and why, the three biggest problems. **3.2 Core** the critical journey (grid), three of seven decisions and their order, a decision under uncertainty, give-up with a date. €220,000. |

### Notes on deviations, Days 4 to 6

1. **No calculation anywhere** (#44), as on Days 2 and 3. The effort rule (Day 4 and 5: under €10,000 Low, up to €20,000 Mid, above High; Day 6: under €8,000 Low, up to €15,000 Mid, above High) is taught in card A5 and can be checked; every other rating is a judgement and is never marked.
2. **The reference sets of Day 4 and Day 5 are over the case's printed budget, by plan fidelity.** Day 4: the plan's four measures cost €44,000 against €40,000; Day 5: €45,000 against €40,000. The key says so and names what would be phased; a set that stays inside the budget with a reason exports too, and so does the plan's set (tested in `verify:day4` and `verify:day5`, #38). Day 6's reference four measures cost exactly the €45,000.
3. **Day 5 Block 1.2 has no effort check:** its second criterion is business value (a judgement), as the plan asks to weigh user-centredness against business goals; the three ratings are shown side by side, never combined.
4. **Day 6 Block 2.2 asks for the pain point each measure answers** (the persona and the phase), and Route 2's decision picker also asks why the first decision goes first: a reason for every judgement (#44), shared with Days 4 and 5.
5. **Day 6 Block 3.1 lets the target group lie outside the chosen personas** (the plan only says to select the most important group); the answer key marks it as a question worth asking, never as missing.
6. **Journey grids** (Day 6 Blocks 1.2, 2.1 and 3.2) are cards per phase with a few words per field and an emotion from 1 to 5, with a live emotion curve; they replace drawing (no drawing library, #9).
7. **Worked-example company:** LearnLoop on all three days, with Tom and Anna (Day 4), Mia and Noor (Day 5), Mia and Sven (Day 6); the task companies are MotivaLearn, LearnBase and EduPath, so no task is answered in a card.
8. **Not built in this pass:** videos (#33), the facilitator debrief card, the Word documents for Days 4 to 6 (the website is the deliverable of this pass), the website links in the Word documents, and an automated accessibility run (axe).

### Dependency checklist, Days 4 to 6 (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| Blocks 1.1 and 2.2 of each day | **Core** | the brief, the printed notes and tables, the touchpoints (Day 6), and cards A1 to A3 and A5 (Day 4: A2, A3, A5; Day 5: A2, A3, A5, A1; Day 6: A1, A2, A3, A5) | ✓ |
| Blocks 1.2, 1.3, 2.1 | Optional | the brief and their own items | self-contained |
| Blocks 3.1 and 3.2 | **Core** | the brief and cards B1 to B3; Route 2 only quotes Route 1's Core answers (the preferred platform, the most frustrating fact, the chosen measures) as a soft pointer | ✓ |
| Cards A1 to A3, A5, B1 to B3 | Core | each other and the case | ✓ |
| Card A4 of each day | Optional | none | no Core block cites it |

`npm run verify:day4`, `verify:day5` and `verify:day6` check, in EN and DE, that filling only the Core fields leaves nothing missing, that the reference answers complete every block, that a different choice with reasons (over budget on Days 4 to 5 and on Day 6) still exports, that the exports hold no answer key, tick or cross, and that older blobs migrate with an empty slice for the new day.
## Stack

Next.js 14 · TypeScript · Tailwind (Ocean tokens, CS token names) · Zustand + `persist` (`skipHydration`, deep merge, pure `migratePersisted`) · static export.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run verify:day1  # data and logic checks, both languages (also verify:day2 to verify:day7)
npm run build        # stop `npm run dev` first; writes the static site to out/
node scripts/serve-out.cjs 4100   # serve out/ to test the production build
```

**Two gotchas.** (1) `export const dynamicParams = false` breaks `npm run dev` with `output: "export"` (Next 14.2 says "missing exported function generateStaticParams()"
although it is there); the three `app/day/[n]/…/page.tsx` files therefore export only `generateStaticParams`, and a day outside 1 to 16 is a 404 in the built site.
(2) Never run `npm run build` while `npm run dev` runs, and delete `.next` after a build before you start dev again (both write `.next`).

## Mentor bar

First element on every page. `muchson123` fills every model answer of both routes of the day you are on (and the name if empty); answer keys and worked
answers appear after the same unlock. A convenience gate, not security; a reload locks it.

## Plan mapping (CLAUDE.md #44, #50)

The plan (`One Stop Digital Learning - Strukturplan 11_F_128 (04-26).xlsx`, Day 1) → the site:

| Plan row | On the site |
|---|---|
| Wissensvermittlung (UX vs UI, learning success, user-centredness, user groups, three principles, apps against platforms, learning contexts, conflicting goals, UX in the business model) | Materi A (A1 to A5) and Materi B (B1 to B3) |
| Level 1 Task 1 (LearnFast: cluttered dashboard, long texts, no progress bar, drop-outs; problems, categories Orientation / Understanding / Motivation, ideas) | Block 1.1 (Core) |
| Level 1 Task 2 (three measures, budget €50,000, two months; assess, prioritise, what information is missing) | Block 2.2 (Core), same fields |
| Coaching (UX is a decision problem; reflection questions) | Block 1.3 (Optional), the notes appear in the file |
| Fallstudie SkillUp (40 %, hard to understand, no learning path; causes, four measures, prioritise) | Blocks 2.1 (Optional) and 2.2 (Core); the plan's Musterlösung is the mentor key |
| Feedback with a management perspective | Not a learner task: for the facilitator (see "Not built") |
| Transferprojekt (Chief UX Officer: vision, three decisions, roadmap, risk, decision architecture, one decision under incomplete data) | Blocks 3.1 and 3.2 (Core) |

**No calculation anywhere** (the plan has none): the printed figures (40 %, €50,000, two months) are read, not derived; effort is rated by a printed-cost rule
taught in Materi A5, and the check can flag it. User impact and risk are the learner's judgement and are never marked (#38).

## Notes on deviations

1. **Pending decisions of #50 followed the old rules, as the user asked:** time weights of 15 / 15 / 20 minutes; Level 1 objective where it can be (the sort), judged where
   the plan asks for opinion (the learner's own words); counts of the plan grouped into two Core blocks per route; the Musterlösung is a mentor reference, a different
   reasoned choice exports; individual export, no group work; two routes with their own Materi; text-only builders instead of sketching.
2. **The Feedbackrunde (UE7) is not built.** It is a classroom session; the plan's "Input Level 3" questions are the facilitator's debrief (a mentor-only card is an open point).
3. **Videos (#33) and the Word documents (#31) are not built** in this pass.
4. **Every figure beyond the plan is a Case assumption** (14 tiles, 500 words, four clicks, the costs and weeks of the nine measures, €120,000, the seven decisions).
5. **The worked-example company is LearnLoop** (Materi A2, A5, B2, B3); the task's own company is SkillUp.
6. **Sources:** the three NN/g articles (definition of UX, the 10 heuristics, prioritisation matrices) were opened and read; the two ISO standards are cited by title and year without a link (not opened); Sweller's DOI resolves
   but the publisher blocks scripts. Check every source before teaching from it.

## Dependency checklist (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| Block 1.1 | **Core** | brief, the eight findings, cards A1 and A3 | ✓ |
| Block 2.2 | **Core** | brief, the nine measures, cards A2, A3, A5 (it quotes no Optional block) | ✓ |
| Blocks 1.2, 1.3, 2.1 | Optional | brief, own items | self-contained |
| Block 3.1 | **Core** | brief, the seven decisions, cards B1 and B2 | ✓ |
| Block 3.2 | **Core** | Block 3.1's three decisions (Core), card B3, B2 | ✓ |
| Cards A1, A2, A3, A5, B1, B2, B3 | Core | each other and the case | ✓ |
| Card A4 | Optional | none | no Core block cites it |

`npm run verify:day1` checks that filling only the Core fields leaves nothing missing, that a different over-budget choice with reasons still exports, and that the exports hold no answer key.

## Verified

`tsc`, `verify:day1` (both languages), production build (52 static pages), the static export served locally from a clean `localStorage`: mentor fill on both routes, empty missing lists after
the fill, German and English, 375 px with no horizontal scroll, no console errors.

**Days 2 and 3 (2026-10-10):** `tsc`, `verify:day1`, `verify:day2` and `verify:day3` (both languages), production build (52 static pages), the static export served locally: every new page and
all five new interactive diagrams of Day 2 and four of Day 3 opened with every story stepped through, no console errors and no hydration error; mentor fill on both routes of both days
with empty missing lists; German scan with no English sentence left on the six new route pages; 375 px with no horizontal scroll on the six new pages and both homes; a version-1 localStorage
blob (Day 1 only) loads, migrates to version 2 and keeps its answers; Day 1 still fills and renders unchanged.

**Days 4 to 6 (2026-10-12):** `tsc`, `verify:day1` to `verify:day6` (both languages), production build (52 static pages), the static export served locally: both routes of Days 5 and 6 and the Day 4 and Day 6 homes opened with no console error and no hydration error; the dev server with every new interactive diagram operated (stories, switches, emotion buttons, gate, conflict screens); mentor fill on both routes of Days 5 and 6 with empty missing lists; German view of Day 6 Route 2; 375 px with no horizontal page scroll on Day 5 and Day 6 routes. Not run: an automated accessibility pass (axe).


## Day 7 (InclusiveLearn): accessibility and inclusive design

Built to the standard of Days 4 to 6 from the content of `../materi-task-docx/_source/day7-*.md`. Route 1: Materi A (A1 persona spectrum, A2 the four principles, a drag-only quiz, A3 plain language, **A4 integrating and evaluating (Optional)**, A5 weighing a measure); **Core 1.1** (eight facts into Perceivable / Operable / Understandable, the groups that struggle, three improvements) and **Core 2.2** (four of nine measures rated and ordered, three of six evaluation methods, what is missing; €50,000, 10 weeks). Route 2: Materi B (B1 strategic chain, B2 reach against cost, B3 an average that hides a group, a decision frame); **Core 3.1** (strategy, at least three places where accessibility is checked, three of seven measures in order; €240,000) and **Core 3.2** (KPIs, methods, who reads the results, risk, decision under uncertainty, what you give up). Exports `1-{name}-day7-l1l2-ux-analysis` and `2-{name}-day7-l3-ux-strategy`. `npm run verify:day7` (87 checks, both languages).

### Notes on deviations, Day 7

1. **No calculation** (#44). Effort rule: under €10,000 Low, up to €25,000 Mid, above High (as in Materi A5 of the Word documents).
2. **No set of three Route 2 measures can exceed the €240,000 budget** (the three dearest cost €205,000, figures taken from the Word documents), so the "over budget" hint of the shared picker never fires on Day 7; the bar still shows what is left. Route 1's €50,000 can be exceeded and is printed as a fact.
3. **Block 2.2 step 5 asks for a reason** ("Why these three methods?", `methodsWhy`), which the Word task does not: a choice carries a reason (#44). `MeasuresBlock` got an optional `afterOrder` slot for it.
4. **Block 1.1 part b** (the user groups) is a multi-select with at least two groups plus a reason field; all eight groups are real, so it is judged, not checked.
5. Persisted store is version 4 (slice `d7`); a version-3 blob migrates with an empty Day 7 slice (tested). Glossary: `data/glossaryDay7.ts` (15 terms, EN and DE); nine new references. Laws (BFSG, EN 301 549, BITV) are marked "in flux".
6. Worked-example company LearnLoop with Ben, Lena, Noor and others; the task company is InclusiveLearn.
7. **Not built:** videos (#33), the facilitator debrief card, the Word links for Day 7, an automated accessibility run (axe).

### Dependency checklist, Day 7 (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| Blocks 1.1 and 2.2 | **Core** | brief, printed facts and tables, cards A1, A2, A3, A5 (the evaluation-method rule is repeated in A5) | ✓ |
| Blocks 1.2, 1.3, 2.1 | Optional | brief and their own items | self-contained |
| Blocks 3.1 and 3.2 | **Core** | brief and cards B1 to B3; Route 2 quotes only Route 1's first priority (Core 2.2) as a soft pointer | ✓ |
| Card A4 | Optional | none | no Core block cites it |

Verified: `tsc`, `verify:day1` to `verify:day7`, production build, dev server in Chromium (clean localStorage, mentor fill empties both missing lists, memo builds, no console error except the shared favicon 404).

**Day 7 verification (2026-10-14):** `tsc`; `verify:day1` to `verify:day7` (Day 7: 87 checks, EN and DE); production build; static export served locally. In Chromium at 1280 px and 390 px, EN and DE: all six stories on the two routes stepped through, no horizontal overflow, no console or hydration error; a version-3 blob loads, keeps the participant name and migrates to version 4; the mentor fill empties both missing lists and the memo downloads as `2-{name}-day7-l3-ux-strategy.html`; Days 1 and 6 still open. The only English left in DE is the role title "Chief UX and Accessibility Officer". Not run: axe.
