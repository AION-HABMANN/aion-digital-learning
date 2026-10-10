# Learning UX Lab · Digital Training and Learning Systems

**Educational UX/UI design for digital learning platforms (Habmann AufstiegsAkademie), 16 days.** One Next.js project holds every day; the build has
**Day 1** (Module 1, Day 1 of 2: UX/UI for learning platforms and user-centred design), **Day 2** (Module 1, Day 2 of 2: successful platforms, prototyping,
testing, adaptive learning) and **Day 3** (Module 2, Day 1 of 2: learning psychology and cognitive load). A self-study companion in **English and German**
(EN | DE in the top bar): study material with live instruments, two tasks and two working documents per day. It carries the shared standards
`../CLAUDE.md` #1 to #50 and the two-route form of #30. Palette: the DL "Ocean" palette (#15).

**Live site:** https://aion-dl.vercel.app (Day 1 at https://aion-dl.vercel.app/day/1/). Vercel project `aion-dl` of the account `attoyibi`; deployed from this folder with the CLI.
It is not connected to GitHub yet, so a push does not deploy: run `vercel deploy --prod --yes` in this folder (Vercel detects Next.js and the static export; when the project is connected to the
repository, set its Root Directory to `playground-dl`). **Days 2 and 3 are built locally and not deployed yet.**

The cases: **Day 1 · SkillUp GmbH** runs the learning platform LearnFast (40 of every 100 learners do not finish; €50,000, two months; Route 2 €120,000).
**Day 2 · LearnPro**, a stagnating platform (€60,000, three months; Route 2 €200,000). **Day 3 · EduCore**, a platform with an overwhelm effect (€40,000, four weeks; Route 2 €150,000).
Every figure beyond what the plan prints is a Case assumption, labelled on screen. The sources of Days 2 and 3 are the reviewed Markdown files in `../materi-task-docx/_source/` (`day2-*.md`, `day3-*.md`).

## Layout (one project, all days)

```
app/page.tsx                      the sixteen days (only a built day is a real page; the others keep their place)
app/day/[n]/page.tsx              a day's home      /day/1/
app/day/[n]/route-1|2/page.tsx    its two routes    /day/1/route-1/   /day/1/route-2/
components/day/DayView.tsx        picks the content of a day; wraps it in <DayProvider> (lib/dayContext.tsx)
components/day/DayPages.tsx       the shared home and route frames of the days after Day 1 (a day hands over one DayConfig)
components/day/dayConfigs.tsx     the DayConfig of Day 2 and Day 3
components/day1|day2|day3/*       per day: Cards, diagrams, mock screens, Task1, Task2, Materi (Day 1 also Pages)
components/materi/figures.tsx     figures shared by Days 2 and 3: chain, two columns, decision frame, cost bands, selectable matrix
components/chrome, components/ui  shared by every day (top bar, mentor bar, rail, page map, answer blocks, export bar, order list …)
data/course.ts                    the 16 days of the plan (topics in EN and DE), `built` flags, route helpers
data/dayN/*                       case, route 2 items, materials, the day's intro and page map
data/references.ts                one reference list for the course (a card cites keys from it)
data/materialRegistry.ts          the cards of every built day; shared components read them through lib/useMaterials.ts
data/glossary.ts, glossaryMore.ts one glossary for the course (a day adds its terms; Day 2 and 3 terms are in glossaryMore.ts)
lib/dayN/*                        checks, missing lists, progress, model answers, answer keys, worked answers, export documents
lib/lists.ts                      pure helpers (capped history, "choose exactly N", priority order, placement with undo and redo)
store/useStore.ts                 one persisted store, one slice per day (`d1`, `d2`, `d3`), each with two routes (`r1`, `r2`); key `dl-v1`, version 2
store/dayTypes.ts                 the shapes and empty values of the Day 2 and Day 3 slices
scripts/verify-day1|2|3.ts        data and logic checks in both languages
```

To add the next day: copy `components/day3`, `data/day3`, `lib/day3` to `dayN`, replace the content, add a slice `dN` to `store/dayTypes.ts` and the store (bump `PERSIST_VERSION`,
extend `migratePersisted`, `mentorFill` and `resetRoute`), register the day's materials in `data/materialRegistry.ts`, add its `DayConfig` to `components/day/dayConfigs.tsx`,
set `built: true` in `data/course.ts`, and add any new references to `data/references.ts` and terms to `data/glossaryMore.ts`.

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

## Stack

Next.js 14 · TypeScript · Tailwind (Ocean tokens, CS token names) · Zustand + `persist` (`skipHydration`, deep merge, pure `migratePersisted`) · static export.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run verify:day1  # data and logic checks, both languages (also verify:day2 and verify:day3)
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
