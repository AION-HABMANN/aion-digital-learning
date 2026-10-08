# Learning UX Lab · Digital Training and Learning Systems

**Educational UX/UI design for digital learning platforms (Habmann AufstiegsAkademie), 16 days.** One Next.js project holds every day; this first
build has **Day 1** (Module 1, Day 1 of 2: UX/UI for learning platforms and user-centred design). A self-study companion in **English and German**
(EN | DE in the top bar): study material with live instruments, two tasks and two working documents. It carries the shared standards
`../CLAUDE.md` #1 to #50 and the two-route form of #30. Palette: the DL "Ocean" palette (#15).

The case: **SkillUp GmbH** runs the learning platform LearnFast. 40 of every 100 learners who start a course do not finish it. Budget €50,000, two months
(Route 1); the Chief UX Officer's year (Route 2, budget €120,000 is a Case assumption).

## Layout (one project, all days)

```
app/page.tsx                      the sixteen days (only a built day is a real page; the others keep their place)
app/day/[n]/page.tsx              a day's home      /day/1/
app/day/[n]/route-1|2/page.tsx    its two routes    /day/1/route-1/   /day/1/route-2/
components/day/DayView.tsx        picks the content of a day (Day 1, or the placeholder)
components/day1/*                 Day 1: Cards, diagrams, LearnFast screens, Task1, Task2, Materi, Pages
components/chrome, components/ui  shared by every day (top bar, mentor bar, rail, page map, answer blocks, export bar …)
data/course.ts                    the 16 days of the plan (topics in EN and DE), route helpers
data/day1/*                       case, route 2 items, materials and sources, the day's intro and page map
data/glossary.ts                  one glossary for the course (a day adds its terms)
lib/day1/*                        checks, missing lists, progress, model answers, answer keys, worked answers, export documents
store/useStore.ts                 one persisted store, one slice per day (`d1`), each with two routes (`r1`, `r2`); key `dl-v1`, version 1
scripts/verify-day1.ts            data and logic checks in both languages
```

To add Day 2: copy `components/day1`, `data/day1`, `lib/day1` to `day2`, replace the content, add a slice `d2` to the store (bump the persist version
and add a `migrate` step), set `built: true` in `data/course.ts`, and extend `DayView`, `MentorBar` and `mentorFill` to know the day.

## Routes of Day 1

| Route | Content | Export |
|---|---|---|
| `/day/1/route-1/` **Levels 1 + 2** | **Materi A**, five cards, 60 min (A1 UX and UI, A2 the learner's need, A3 three principles, A4 platform against classic app **Optional**, A5 weighing a measure). **Task 1, UX Analysis File**: 1.1 **Core** (eight findings into Orientation, Understanding, Motivation; the one that makes a learner give up first, with a reason), 1.2 to 1.3 and 2.1 Optional (what the 40 % shows; a coaching reflection; three causes), 2.2 **Core** (four of nine measures, rated on user impact, effort and risk, ordered, with what is missing). | `1-{name}-day1-l1l2-ux-analysis.html` |
| `/day/1/route-2/` **Level 3** | **Materi B**, three cards, 60 min (B1 UX as a business factor, B2 conflicting goals, B3 deciding when you do not know enough). **Task 2, UX Strategy Memo**: 3.1 **Core** (vision, three of seven decisions, their order), 3.2 **Core** (biggest risk, one decision without complete data, who decides and on what evidence, what you give up). The memo builds below the questions (hide / show). | `2-{name}-day1-l3-ux-strategy.html` |

Minutes (the user's standing weights): Materi 60 + Task 1 Core 30 (all 50), Materi 60 + Task 2 Core 20.

## Stack

Next.js 14 · TypeScript · Tailwind (Ocean tokens, CS token names) · Zustand + `persist` (`skipHydration`, deep merge, pure `migratePersisted`) · static export.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run verify:day1  # data and logic checks, both languages
npm run build        # stop `npm run dev` first; writes the static site to out/
node scripts/serve-out.cjs 4100   # serve out/ to test the production build
```

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
