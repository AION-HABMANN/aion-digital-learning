# AION — Curriculum & Gamification Authoring Standard

This file is the companion to [`CLAUDE.md`](CLAUDE.md). That file governs **interaction/UX
mechanics** (missing-item lists, scroll+flash, disabled buttons, route gating, mentor tools,
stack conventions) and already applies automatically to every day. This file governs
**content/curriculum authoring** — how deep material must be, how it must cite sources, how
gamification must be designed, what language to write in, and the exact export-filename
contract — none of which CLAUDE.md covers by design (it scopes itself to UX only).

**Adapted 2026-10-08 for the Digital Learning course (DL: UX/UI for digital learning platforms).** This
folder now serves DL; the CS-era history below is kept because the mechanics are shared. What changes for
DL is marked **(DL)** in §1, §3, §7 and listed in full in `CLAUDE.md` #49. Where a section cites a CS or
Green IT day, read it as an example of the mechanic.

Distilled 2026-09-11 from an audit of day3–day8-v2. Applies starting with the next new
day/route. Day3 and Day4 predate this standard and CLAUDE.md's own rules and are left as
legacy — not retrofitted (see §9).

**Updated 2026-09-20 (CS course, day1 onward).** The route structure is now three routes per
day (§2, §3) and the export filename leads with the route number, added automatically (§7). **Precedence
between a day's own prompt and this guide is CLAUDE.md #18:** the prompt decides the materials,
the tasks and the gamification; these documents decide structure, style, UX and mechanics.

One provenance correction to keep in mind when reading CLAUDE.md itself: it describes the
`reasoning[]` + `MaterialRefs.tsx` pattern (its rule #11) and the answer-key half of rule #7
as things "already implemented in day5." They are not — day5 has neither. Both patterns were
actually introduced in day6 and only named "Standard #11" explicitly in the day8-v2 commit
history. Treat this guide's §4 and §6 below as the accurate, current version of those two
rules.

## 1. Audience & language standard

- **Update (2026-09-25): every CS day also has a German version (EN | DE switch)**, built to
  CLAUDE.md #32: common technical terms stay English, every explanation is German. English is
  still the default, and it is the version you write first. The paragraph below is about not
  building an automatic dictionary layer (day7), which #32 still forbids.
- **English first**, written in a detailed, international professional register — not a
  dwibahasa/i18n layer. Day7 built a full English→German dictionary (`lib/i18n/`); day8-v2
  dropped it entirely. Don't rebuild it: one language, written so both the target learner and
  the facilitator read it with equal ease.
- Must be readable, without a dictionary, by **both**: a German/European corporate
  professional (the learner) and an Indonesian facilitator (you — since you present the
  material live).
- **(DL)** The DL learners are working adults at a German training provider (Habmann
  AufstiegsAkademie). The plan says its first tasks are possible "ohne Vorwissen", so do not assume
  a UX or design background: the material starts from the learner's own experience as a user of
  online courses and builds the vocabulary from there. The plan is written in German, so every task
  keeps the plan's own wording as the German source (CLAUDE.md #32).
- **Assume the presenter is not an expert.** Technical language is welcome, but every term is
  explained in the simplest words: a glossary entry per term (CLAUDE.md #19), plus a plain-words
  sentence next to its first use where the sentence would otherwise be all jargon.
- Name German/EU-specific regulatory and market context explicitly, in English prose, wherever
  it's the realistic reference point for this audience — e.g. BAFA, EEG, EnEfG, CSRD/ESRS,
  Blauer Engel, WEEE Directive, ESPR. This is what gives the content a European grounding
  without a translation layer.
  **(DL)** For UX and learning platforms the realistic reference points are: WCAG 2.2 (W3C), EN 301 549
  (the European accessibility standard that refers to WCAG), the BFSG (Barrierefreiheitsstärkungsgesetz,
  Germany's implementation of the European Accessibility Act, applying to many digital services from
  28 June 2025), BITV 2.0 (public bodies), DSGVO/GDPR (consent, tracking, learning analytics), and the
  EU AI Act (adaptive and AI-driven learning systems). These are in flux or have exemptions: state the
  year, say what is uncertain, and tell the user in the report to re-check before teaching (same
  discipline as DEPTH-UPGRADE-PROMPT §2.3). For design method, name ISO 9241-11 (usability) and
  ISO 9241-210 (human-centred design), Nielsen's usability heuristics, and the learning-science and
  motivation sources listed in `MATERIAL-GUIDE.md`.

## 2. Site structure convention

**From Day 3 the CS course has two routes per day** (CLAUDE.md #30): Route 1 = Levels 1 and 2 on one merged case, Route 2 = Level 3.
The table below is the three-route form of Days 1 and 2; the shape of a route and every rule after it apply unchanged to each of the two.

**Every day: exactly three routes, one per level** (CLAUDE.md #12). This replaces the
"two routes from Day 11" form for the CS course.

| Route | Level | Material | Task | Export |
|---|---|---|---|---|
| Route 1 | L1 · Knowledge | Materi A, ~60 min, facilitator-led | Task 1, length per the day's prompt | its own |
| Route 2 | L2 · Application | Materi B, ~60 min, facilitator-led | Task 2, length per the day's prompt | its own |
| Route 3 | L3 · Management decision | Materi C, ~60 min, facilitator-led | Task 3, length per the day's prompt | its own |

The learning objectives are the same as before — L1 "read and analyse the situation", L2
"choose the best option and defend it", L3 "decide the structure and who owns it" — and each
route still leaves gradable evidence in its own export.

**The shape of a route:**

```
case brief, stated once, directly above the task
      ↓
MATERIAL — one continuous block of study cards (Materi A / B / C)
      ↓
TASK — one task, one continuous scroll (blocks and mechanics from the day's prompt)
      ↓
ONE EXPORT — the route's own working document
```

Rules that follow from it:

1. **All teaching sits in the material block.** No material inside a task. If a task has two parts,
   the handover between them is a small inline panel built from the learner's own Part 1 output.
2. **One case per task, introduced once**, above the task. A worked-example company in the material
   is read-only and visually distinct, so the learner reasons *from* one company and is assessed
   *on* another where the day's prompt wants that.
3. **One participant strip per site** (the learner's full name only), on every page, with the
   instruction to use the same name all week — it is how submissions are matched. There is no
   number field: the number in the file name comes from the route (§7).
4. **One export per route**, one deliverable, one missing list (§7 for the file name).
5. **Later routes quote earlier ones as soft links**, never gates: Task 2 quotes the Task 1
   verdict, Task 3 quotes both (CLAUDE.md #6, #12).
6. **MaterialRefs chips on every task step are load-bearing.** With all teaching in front of the
   task, they are the only thing carrying a learner back to the section a question draws on.

Folder/URL convention, locked in: `app/route-{n}/page.tsx` → `/route-{n}/` (no slug). The older
`route-{n}-{kebab-slug}` and Day4's `level-1/2/3` names are legacy. A route that is not built yet
still has a placeholder page, a nav entry and an empty store slice.

Days built in the older forms (three routes with material interleaved before each task; the
two-route Day 11+ form) are not retrofitted (§9).

## 3. Minutes budget → how much to write

The budget is split by what the time is for:

| Block | Each route |
|---|---|
| Material — facilitator-led, all before the task | ~60 min across the route's cards |
| Task interaction | set by the day's prompt (Day 1: Route 1 ≈ 30 min, Route 2 ≈ 15 min, Route 3 ≈ 20 min) |

- **(DL)** Time weights per the user's standing split (`MATERIAL-GUIDE.md`): Route 1 = Level 1 material 1 h and
  task 15 min, plus Level 2 material 1 h and task 15 min (merged per CLAUDE.md #30); Route 2 = Level 3 material 1 h
  and task 20 min. The Level 2 case study in the plan is "2 UE"; the merged task still follows the user's shorter
  weights, so cut rows, not difficulty. Do not exceed them without asking.
- Give every material card a `minutes` value and keep the set close to the block budget — the
  facilitator presents from it. If the card minutes do not add up to exactly 60, say what the
  remainder is (discussion, the ungraded exercises) rather than pretending.
- The material block is long on purpose. It is taught live, so depth is the point: practitioner
  level, European standards and regulation named explicitly, and every card carrying at least one
  real source with a specific figure, standard number or named framework (§4). No paragraph that
  "everybody already knows".
- The task side stays tight. Keep "decide first, discover the position" (§5) at whatever size the
  prompt gives it; a longer task (Day 1 Task 1 is ≈ 30 min) is split into named blocks (1.1, 1.2,
  1.3), each with its own FIND IT line and pill (CLAUDE.md #16).

## 4. Material depth & citation standard

Every material section/block needs, at minimum:

```ts
type MaterialSection = {
  id: string; n: number; icon: string; kicker: string; title: string;
  definition: string;   // 2-4 dense sentences — what it is
  insight: string;      // 2-4 sentences — why it matters / the causal mechanism
  takeaway: string;     // 2-4 sentences — the practical action, incl. a boundary/caveat
  reasoning: string[];  // decision rules phrased the way the task will need them —
                         // including the rule that rules out the plausible wrong answer
  references: { label: string; url?: string }[]; // at least one real external source
  callout?: { label: string; text: string };
};
```

**Day 11 extension.** The shared type now lives in `lib/materialSection.ts` and adds `code`
("S1", "A" — what the mini-nav and chips show), `standfirst` (one line under the title), `body`
(sub-headed deep-dive paragraphs for the facilitator-led block), and `minutes`; each reference
gains a `detail` line carrying the specific figure or clause. Render order is fixed by
`components/ui/MaterialBlock.tsx`: title → diagram → explanation → reasoning → callout → sources.
The diagram comes first because it is the teaching artifact, not an illustration of prose.

- `reasoning[]` is mandatory — this is CLAUDE.md rule #11a, correctly attributed: it's the
  day6-forward pattern, and it is what `MaterialRefs` chips on a task point back to.
- At least one real citation per section — a named standard, body, or regulation, with a year
  where one exists (ISO 14064 / ISO 20400 / ISO 50001, GHG Protocol, EU directives, ASHRAE,
  Uptime Institute, FinOps Foundation, a national regulator, etc.). Prefer the structured
  `references` array (day4's pattern) over citations buried only in prose, so they stay
  consistent and linkable. **(DL)** Typical DL sources: W3C WCAG 2.2 and the WAI "Understanding" pages,
  EN 301 549, ISO 9241-11/-210, Nielsen Norman Group articles (named author and year), Sweller (cognitive
  load), Mayer (multimedia learning), Deci & Ryan (self-determination), Fogg, Chou (Octalysis), Bloom, and
  for evaluation SUS (Brooke) and Google's HEART framework. Verify each link and claim before use.
- **Glossary coverage (CLAUDE.md #19):** every technical term, abbreviation and foreign word in a
  card is an entry in `data/glossary.ts` with a `plain` explanation for a non-expert.
- Coverage rule (CLAUDE.md #11b): before shipping a route, walk every task question and every
  selectable option and confirm the material actually taught the basis for choosing between
  them. An option the material never named is the same defect as a missing `reasoning` rule.

## 5. Gamification design philosophy

**Core rule: decide first, discover the position second.** Never let a learner drag or pick
directly into a final classification/quadrant without resolving a sub-question or reading
evidence first — the category, score, or quadrant must fall out as a *consequence* of earlier
choices, never a free-standing guess. (This is the pattern already working in day5's Kraljic
quadrant task and day6's PrioritySimulator — keep doing it explicitly, by design, for every new
task.)

Combine with CLAUDE.md rule #4 (check-on-demand + clue, never the literal answer, never an
auto-reveal on interaction — day3's instant-reveal pattern is the thing to avoid).

Reusable mechanic vocabulary, proven across day5–day8v2 — pick and combine per task, don't
default to "slide a thing across a line":

- **Calculator** — numeric input → live computed output (PUE calculator, carbon calculator).
- **Evidence/clue classification** — click-to-sort or native HTML5 DnD into named categories,
  each with a justification step.
- **Guided quadrant/matrix placement** — resolve sub-criteria first; the matrix position is
  computed, not chosen directly.
- **Slider/scenario dial** — free exploration of a trade-off *before* a graded step, not itself
  graded.
- **Ranking/lever prioritization** — drag-to-reorder with a full undo/redo history stack.
- **Form-that-builds-a-report** — inputs on one side, a live-assembled report/memo on the other.
  This is the user's own signature "Task 4" pattern and the strongest closing exercise for a
  route.
- **Forced-choice-with-pushback** — learner recommends, then must defend against a counter-
  argument/board-challenge.

Every step of every mechanic cites back to material via `MaterialRefs` chips (§4, CLAUDE.md
#11b) — never a question whose reasoning wasn't taught above it.

### 5.1 Backstory formats — how a task's problem is delivered

The mechanic is *how the learner answers*. The backstory is *how the problem arrives*. Pick one
of these deliberately per task rather than defaulting to a briefing paragraph every time.

**A. Case dossier.** A written company brief plus a fleet/figures block, then evidence the
learner reads. Fast to author, works when the analysis itself is the interesting part. Used in
Day 8 (Flexora) and as the opener of Day 9 Route 1 (UrbanByte).

**B. Site walkthrough.** The learner clicks through a place — rooms, zones, a facility — and
each location yields one finding. Turns "read this list of 6 problems" into "go and find 6
problems", and gives every finding a physical home the report can refer back to. Used in Day 9
Route 1 (the UrbanByte floor plan), and in Day 6's facility diagram.

**C. Guide-narrated consequence replay (the "Stillwater" pattern).** The strongest format for
teaching that an either/or framing is itself the mistake. Structure, in order:

1. A recurring **guide character** introduces a puzzle in a neutral setting, in first person:
   *"Some people might call our work conservation… explore our puzzle and you'll see what I
   mean."*
2. The scene shifts to the **situation** — a map, a site, an org chart — and two legitimate,
   competing opportunities are set up, each with real upside (jobs, revenue, speed).
3. A **forced binary choice**, with the guide explicitly handing the decision over: *"We're
   leaving the choice to you."*
4. The chosen branch **runs forward in time** — "but a year later…", "a few months later…" —
   and the consequence is narrated as an outcome, not graded as an answer.
5. **Both branches fail**, each in its own way, and the guide's tone visibly changes as it
   happens.
6. Re-picking a spent branch is answered, not ignored: *"You've already tried this. It didn't
   work out so well."* → Try again.
7. A short **debrief** names what just happened: *"the options were well-intentioned, but they
   both failed."*
8. The guide **reframes and re-runs**: *"Suppose you change the proportions…"* — now the
   options are 75/25 and 25/75 rather than all-or-nothing.

Why it earns its cost: the learner *experiences* that a trade-off beats an either/or before
anyone tells them, which no amount of material prose achieves. It is also the narrative form of
§5's core rule — the position falls out of a decision — and its step 6 is a natural home for the
undo/retry affordance CLAUDE.md #5 already requires.

Cost and constraints: it needs a real branch tree (two failure narratives plus a reframed second
round), so budget it as the whole task, not an intro. Within our stack (§7 of CLAUDE.md, no
media libraries) the guide is a small hand-coded SVG portrait with a `mood` prop and a speech
bubble, CSS-faded between lines — not photography or video; the scene is an SVG the same way the
Day 9 floor plan is. Branch state goes in the persisted store; the "already tried" set can be
session-only.

**When to use which.** Use A when the learner needs to practise reading evidence. Use B when
findings should feel discovered rather than handed over. Use C when the learning objective is
that a common framing is wrong — a false binary, a symptom mistaken for a cause, a lever that
looks big and isn't. Do not use C for a task whose answer is genuinely a single correct choice:
the format promises a twist, and a task with no twist will feel like a trick.

## 6. Mentor tooling — mandatory on every route

Three things, every site, from here on (not optional, not "if there's time"):

- **MentorBar (top of every page)** — CLAUDE.md #7, "top-of-page mentor bar". One strip above
  the nav; the mentor enters `muchson123` once, all model answers of every route fill in, and
  the notes are ready to export. This is how a reviewer checks a site without typing through it,
  so after one fill every export's missing list must be empty. Model answers live in one file
  (`data/mentorKey.ts`).

- **MentorFillButton** — passcode-gated (`muchson123`, CLAUDE.md #7) one-click fill of every
  persisted field with plausible demo data, so a mentor can exercise every conditional render
  without retyping a full run-through each QA pass.
- **AnswerKeyButton** — same passcode, unlocks an `AnswerKeyBlock` per forced-choice/
  classification exercise: the expected pick, a `why` for **every** option including the
  rejected ones, and a `teachingNote` wherever more than one answer is genuinely defensible.

**Why this matters enough to be mandatory:** because check-on-demand (§5) deliberately never
gives the learner a literal answer, the live facilitator is the one place that reasoning has to
live in full — so you can answer a participant's question or defend a counter-case on the spot
without improvising. Day8-v2 dropped `AnswerKeyButton` ("auto-fill only") without replacing that
function anywhere else — treat that as the gap to close, not the precedent to follow.

## 7. Export filename — exact contract

```
{taskNumber}-{learnerName}-day{dayNumber}-{taskSlug}
```

Example: `1-muchson-day9-supplychain-audit`

- `taskNumber` — which task **within its route** this export is. Where a route has exactly one
  task, this is legitimately `1` on every route, and `l{level}` is what distinguishes them —
  that is the form Day 9 ships (`1-muchson-day9-l1task1`, `…-l2task1`, `…-l3task1`). Derive it
  from the task rather than hardcoding the digit, so a route that later gains a second task
  numbers it correctly.
- `learnerName` — the learner's own name field, slugified (lowercase, no spaces).
- `dayNumber` — the curriculum day number, not a repo/version suffix (day8-v2 still exports as
  `day8`, correctly — keep that: version suffixes are a repo concern, not a filename concern).
- `taskSlug` — either a short, specific kebab-case label for the deliverable
  (`supplychain-audit`, `decision-memo`) or the level/task form Day 9 uses (`l2task1`) when a
  day's spec fixes the export ID. Never a generic placeholder like `materi1`.
- **A route that spans two levels lists both, in order**: Day 11's merged Route 1 exports as
  `1-muchson-day11-l1l2task1`, and its Route 2 as `1-muchson-day11-l3task1`. The generator
  takes the levels as a list (`exportFilename(name, [1, 2], 1)`), so the filename follows the
  route's actual scope instead of being hand-written per route.

**CS course form (day1 onward).** The leading number is the **route's own number** — Route 1
(Diagnose) = 1, Route 2 (Calculate) = 2, Route 3 (Decide) = 3 — added automatically by the
export. It is never typed and never shown in a field; the learner only enters their name. The slug
names the level and the deliverable:

```
{routeNo}-{learnerName}-day{dayNumber}-l{level}-{deliverable}
1-muchson-day1-l1-diagnostic     2-muchson-day1-l2-calculation     3-muchson-day1-l3-memo
```

**DL form (Digital Learning course).** Same pattern; the deliverable names follow the three levels of the plan.
Route 1 spans Levels 1 and 2 (CLAUDE.md #30) and Route 2 is Level 3, so the leading route number is 1 or 2
and the slug lists the levels it covers:

```
1-{learnerName}-day{N}-l1l2-ux-analysis        Route 1: UX Analysis Note + Case Analysis (one export)
2-{learnerName}-day{N}-l3-ux-strategy          Route 2: UX Strategy Memo
1-muchson-day1-l1l2-ux-analysis     2-muchson-day1-l3-ux-strategy
```

Deliverables, in the language of the aion-task-design skill: Level 1 is a **UX analysis note** (problems named
from the user's side, sorted, with a stated verdict), Level 2 a **case analysis** (causes, measures,
priority and the reason, with what information is missing), Level 3 a **strategy memo** (vision, decisions
in order, roadmap, risks, decision architecture, with what was given up). Neither Level 1 nor Level 2 asks
for a calculation (CLAUDE.md #44, DL paragraph). *Proposed, not yet confirmed by the user.*

The extension is `.html` (CLAUDE.md #16). `learnerName` is slugified to lowercase ASCII with
diacritics stripped (ü → u, ß → ss). Each route has exactly one export, so there is no per-task
digit and no two-level filename. The older forms above stay valid for days built with them.

One shared `lib/exportFilename.ts` per day, one function signature, reused by every route's
export bar. Each of the six days audited implemented this differently (and one had an active
bug) precisely because there was never one canonical spec — this is that spec.

## 8. Collaboration process for building a new day

1. Flow first: share the route/material/task relationships as concrete, technical instruction
   text — not a conceptual discussion. Wait for approval.
2. Then write the Material + Task 1 prompt → wait for OK → Task 2 → wait for OK → Task 3.
   Never draft a whole day's material and tasks in one pass.
3. Every material+task prompt explicitly calls for SVG diagrams as the primary explanatory
   visual, CSS-only animation/flash affordances, the interactive workspace itself, and the
   export button — all in the same prompt, none deferred to "add later."

## 9. Legacy note

Day3 and Day4 predate this guide and several CLAUDE.md rules (day3: instant-reveal answers, a
disabled export button; day4: disabled export buttons, dead gating code). Decision as of
2026-09-11: leave both as-is. This guide and CLAUDE.md apply starting with the next new day or
route, not retroactively.
## Legacy addendum (2026-09-20)

The Green IT days built before this date keep the forms they were built in: the three-route days
with material interleaved before each task, and the two-route days 11–16 (with Day 16's two
exports in one route). They are not retrofitted to the CS structure. The CS course starts at its
own `day1` (CLAUDE.md, header) and uses the three-route form from the first day.
