# AION — cross-day interaction standards

This directory is the shared parent for a series of independent `dayN` projects
(`day1`, `day2`, `day3`, ...). Each is its own Next.js app, but they are one continuous
training course and should feel like it. Because this file lives above all of them,
Claude Code loads it automatically no matter which `dayN` folder is the working
directory — it does not need to be copied into each day's folder.

The rules below are **interaction, structure and style standards, not subject-matter
content**. They were distilled from real corrections made while building the days (a
learner or reviewer hit a real point of confusion, or a mentor asked for something, and
the fix generalized). Apply them to every new day and when touching an existing one —
regardless of what that day's material is about.

**This folder is the Digital Learning course ("DL"): UX/UI design for digital learning
platforms** (`One Stop Digital Learning - Strukturplan 11_F_128 (04-26).xlsx`, 16 days, 8 modules, three sheets *Deutsch* (the source),
*English* and *Bahasa Indonesia* with identical structure, Habmann AufstiegsAkademie). It reuses the standards that were first written for the
Customer Retention / Customer Success course ("CS", `aion-cs-dayN`) and the Green IT days
before it. **Read "DL adaptation" (#49) first**: it lists what changes for this course and
how to read the examples below.

**How to read the examples in #1–#48.** Most rules cite a worked example from a CS day
(`day1`, Kessler, CLV, TCO, RACI, a sales funnel, …). They illustrate a *mechanic*, not
DL content. Apply the mechanic to the DL day's own material; never copy the CS subject
matter, names or figures into a DL day. Where a rule's wording would actively mislead for
DL, it has been changed in place and carries a "(DL)" mark; everything else is unchanged.
The CS and Green IT repositories are the **source of the reference code** (components,
store shape, tokens); the DL days are bootstrapped from CS `day1`, and the first DL day
that ships becomes DL's own reference implementation.

**Who wins when a day's own prompt differs from these rules:** see #18. Short version:
these rules decide structure, style and UX; the prompt decides the materials, the tasks
and the gamification.

## 1. Never show a generic "missing" message

Don't gate an action with text like "Complete Step 4 first" or "Fill in the
required fields." If something is incomplete, say exactly what is missing, as a
list of concrete named items (e.g. "Rank your top 3 leverage points", "Add a
justification note for Model B"), not a step number or a vague category.

Model this as a small derived list the UI can render, not a boolean:

```ts
type MissingItem = { id: string; label: string };
function getMissing(...): MissingItem[] { /* one entry per concretely-missing thing */ }
```

## 2. Every "missing" item is clickable and jumps to the exact spot

Render missing items through a shared list component where each entry is a button,
not plain text. Clicking it scrolls the relevant section into view and flashes it
briefly so the user's eye finds it immediately.

Reuse this pattern (already implemented in day5 as
`lib/scrollToAndFlash.ts` + `components/ui/MissingList.tsx`):

```ts
export function scrollToAndFlash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("anim-flash-warn");
  void el.offsetWidth; // force reflow so the animation can re-trigger
  el.classList.add("anim-flash-warn");
  window.setTimeout(() => el.classList.remove("anim-flash-warn"), 1200);
}
```

Every step/section wrapper needs a stable `id` (e.g. `r1-step3`,
`route2-export-missing`) for this to target. A CSS-only keyframe (no animation
library) drives the flash — see `.anim-flash-warn` in day5's `styles/globals.css`
for the exact rule to copy.

## 3. Primary action buttons are never truly `disabled`

Export/submit/continue buttons must stay clickable even when the task isn't done.
Clicking while incomplete should redirect attention to what's missing (scroll +
flash the first missing item, or open a panel that lists all of them), never do
nothing and never silently no-op a `disabled` attribute. A disabled button gives
no feedback about *why*; a clickable one that points at the gap does.

```tsx
onClick={() => (canExport ? setOpen(true) : scrollToAndFlash("route-export-missing"))}
```

## 4. Check-on-demand, clue not answer

For any classification/placement/matching exercise (drag-drop, tagging,
multi-choice mapping), do not reveal correctness automatically on drop/select.
Give the user an explicit "Check" (or "Re-check") action. When something is
wrong, show a written **hint** pointing at the right direction of reasoning —
never the literal correct answer. The point is a clue that lets them reason
their way to the fix, not an answer key.

## 5. Undo/redo on placement exercises

Any drag-and-drop or assign-to-category interaction must let the user remove a
wrong placement and immediately retry — either into the same slot or a different
one. Don't force a full reset to correct one mistake. In day5 this is a small
`onRemoveTag`-style callback that clears the placement and re-selects the item so
the next click/drop places it again.

## 6. No hard locks across sections, routes, or days

Never block access to later material because earlier material (or its export)
isn't finished. Always grant full read/work access to every route and every day.
Where a suggested order genuinely helps, show a soft, non-blocking banner (e.g.
"Recommended: complete Route 1 first — you can still work through this
regardless") instead of a wall. See day5's `components/chrome/RouteGate.tsx` and
`lib/routeGating.ts` for the pattern: a `useRouteUnlocked()` hook still exists and
still drives the banner copy, it just no longer gates rendering of `children`.

## 7. Passcode-gated mentor/QA auto-fill tool

Every day should have a small collapsed button near the top of each
route/section — visually minor, out of the way — that a mentor can use to
instantly fill every persisted field on that page with plausible demo data, so
they can exercise every feature and check answers without manually typing
through the whole flow. Gate it behind a shared passcode
(`"muchson123"` in day5) entered inline (collapsed button → password field +
Go/Cancel → "Demo answers filled." or "Wrong passcode." feedback).

This is a convenience gate against accidental clicks, not real security — the
passcode lives in client-side plaintext. Do not upgrade it to real auth or treat
it as a security boundary; that would be over-engineering a QA convenience.

Reuse `components/ui/MentorFillButton.tsx` (takes a single `onFill: () => void`)
and give each route its own thin `MentorTools.tsx` that calls the route's raw
store actions (`choose`/`setNote`/`toggleCheck`/`markSeen`) for every field.

**Required on every site: the top-of-page mentor bar.** Besides the per-route
buttons above, every site (every day, every route, the home page too) carries one
`MentorBar` as the very first element of the page, above the top nav. A mentor
types `"muchson123"` there **once** and every model answer in the whole site is
filled in — every route, every part, and the participant name if it is
still empty — so the only thing left to do is press Export. The point is to let a
reviewer **check the site end to end without anyone typing the answers in**. It
must therefore:

- start collapsed as one quiet line (`Mentor · Enter passcode to fill all model
  answers`) → inline password field + Go/Cancel → "Wrong passcode." on a miss;
- once unlocked, offer **Fill all model answers**, **Jump to this route's export**,
  **Clear this route** (only the current route; the participant strip stays) and
  **Lock**;
- fill *everything a route's export needs*, so that after one fill every route's
  "missing" list (#1) is empty and the export downloads at once — verify this on
  each new day;
- keep the model answers in one data file (`data/mentorKey.ts`) and the unlock flag
  in the **non-persisted** session slice (a reload re-locks it);
- stay a convenience gate, exactly as described above — never described as
  security in the UI.

A day that ships without this bar is not done. (Reference implementation: day1,
`components/chrome/MentorBar.tsx`.)

**Second tool behind the same passcode: the answer key.** Alongside demo-fill,
`components/ui/AnswerKeyButton.tsx` unlocks a mentor-only block next to every
exercise where the learner picks from fixed options (forced choice,
classification, multi-select, first-step pick, a RACI row — not free text).
The key gives the expected answer *and a reason per option, including why each
rejected option is rejected*, plus a `teachingNote` wherever more than one
answer defends — so a mentor never has to improvise the counter-case live.
Shape it with `AnswerKeyBlock` from `lib/answerKey.ts`, render via
`<AnswerKey>` / `<AnswerKeyNote>`, style it in `warn` (never the accent, so it
never reads as learner content), and keep the unlock flag in the store's
**non-persisted** session slice so a reload re-locks it.

## 8. Field-level instructions live under the label, not in the placeholder

Every form field needs a short instructional caption below its label (e.g. "e.g.
a number between 1 and 100" or "one sentence, aimed at a non-technical
stakeholder") explaining what to enter. Placeholder text disappears the moment
the user starts typing and is invisible on review — never rely on it as the only
source of guidance.

## 9. Keep the stack conventions consistent across days

Unless a day has a genuine reason to diverge, match the established stack so the
series stays uniform and reviewable:
- Next.js App Router + TypeScript + Tailwind, static export (`output: "export"`),
  no backend/auth.
- Zustand + `persist` (localStorage) for state; a `useHydrated()` guard for any
  UI that reads persisted state, to avoid SSR hydration mismatches.
- No animation, drag-and-drop, or PDF libraries — native HTML5 DnD (+ tap-to-select
  as an accessible fallback), CSS-only keyframe animations, and
  `window.print()`-based export. This isn't a preference, it's kept deliberately
  dependency-light; don't introduce a new library to solve something the existing
  primitives already cover.

**Update (day1).** Prefer `persist({ skipHydration: true })` plus one `<StoreHydrator/>` in
the layout that calls `useStore.persist.rehydrate()` in an effect. The server render and the
first client paint then both see the defaults, so no page needs its own guard;
`useHydrated()` stays only for UI that must not flash a default (a dismissed banner, a
"filed" stamp). Any change to the persisted shape (a new route slice, a new field) bumps the
persist `version`, adds a `migrate` step and a deep `merge` that fills every missing field
from the defaults — and is tested by loading an old-shape blob from localStorage.

## 10. Verify before calling it done

After implementing or fixing any interactive feature: run typecheck and build,
then actually exercise the feature live (a browser preview), not just read the
diff. For anything persisted, test from a clean `localStorage` state at least
once — stale state from a previous run is a common source of false "it works"
readings.

Never run `npm run build` while the dev server is running — both write to `.next`,
after which the dev server serves 404s for `main-app.js` and nothing hydrates. The
page still server-renders, so it looks fine while every click is dead. Stop the dev
server first, or restart it afterwards.

**Gotchas learned on this machine (day1).**
- An SVG `<title>` or `<desc>` must have **one string child** — write
  ``<title>{`${label} touchpoint`}</title>``, never `<title>{label} touchpoint</title>`. React 18
  renders a multi-child `<title>` empty on the server, which causes a hydration mismatch
  (minified error #418) that only shows in the production build.
- Never write `package.json` with PowerShell `Set-Content -Encoding utf8` (it adds a BOM and
  `next build` dies with "not valid JSON"). Edit it with a tool that keeps plain UTF-8.
- To test a static export, serve `out/` with a tiny static server and click through it; a dev
  server hides production-only bugs. Drive React inputs from scripts with the native value
  setter plus a bubbling `input` event. The preview pane sometimes stops painting: verify with
  DOM text, and scroll with `behavior: "instant"` before a screenshot.
- Test the **whole** flow from a clean localStorage, and again from an old-shape blob (see #9).
- **(Day 8, 2026-10-04.)** When another chat's dev server already runs in the day's folder, never run `npm run build` there (it breaks `.next`). Verify in the browser on
  `http://127.0.0.1:<port>` (a different origin from `localhost`, so a separate localStorage that the other session cannot change), and build in a **scratch copy** of the folder (copy
  `node_modules` too: a junction to another drive makes webpack fail), serve its `out/` with a tiny static server on a spare port, test there, then stop the server and delete the copy.
- zustand's `persist` API does not exist in Node (no `localStorage`), so export the migration as a pure function and test that; and never call `useStore.persist` from `verify:calc`.
- A Windows emulated phone size can report a wrong layout width to scripts; trust the screenshot, and still check 390 px by eye.

## 11. Every task question traces back to the material, with a clickable reference

A learner must never meet a question whose reasoning wasn't taught above it. Two
halves, both required:

**a) Each material section carries explicit decision rules**, not just prose. Prose
explains a concept; rules tell a learner how to actually answer. Add a
`reasoning: string[]` to every material section, phrased the way the task will need
it — including the rule that rules out the plausible wrong options — and render it
through `MaterialBlock` as a "How to decide when this comes up in the task" block.

Treat it as a coverage rule: before shipping a route, walk every task question and
every selectable option, and confirm the material contains the basis for choosing
between them. Anything a task offers as a choice (a lever, a goal conflict, a RACI
role, a time horizon) must be named and explained upstream first — an option the
material never mentions is the same defect as a missing rule.

**b) Each task step points back at the sections it draws on**, as chips that scroll
to that section and flash it. Reuse `components/ui/MaterialRefs.tsx` plus a
`materialAnchorId()` / `materialRefs()` pair in `lib/routeN.ts`, and give each
question or step a `material: MaterialSectionId[]` field. The flash uses the accent
`anim-flash-ref` keyframe, deliberately not the red `anim-flash-warn` used for
missing items — arriving somewhere is not a warning.

## 12. Three routes per day — one per level, material first, one task each

> **Superseded from Day 3 by #30:** a day from Day 3 onward has two routes (Levels 1 + 2 merged, then Level 3). The shape of
> a route below (case brief once, material, one task, one export, sticky rail, soft links) still applies to each of them.

Every day ships exactly **three routes, one per learning level**, all built to the same shape.
This replaces the earlier "two routes from day 11" rule for the CS course.

| Route | Level | Carries |
|---|---|---|
| Route 1 | L1 · Knowledge | Materi A → Task 1 → **its own export** |
| Route 2 | L2 · Application | Materi B → Task 2 → **its own export** |
| Route 3 | L3 · Management decision | Materi C → Task 3 → **its own export** |

Route 1 of `day1` is the reference. Every route has this shape:

```
case brief (stated ONCE, directly above the task)
  → MATERIAL — one continuous block of study cards (~60 min, facilitator-led)
  → TASK — one task on one continuous scroll (its length and blocks come from the day's prompt)
  → ONE EXPORT — the route's own working document
```

- **URLs and folders:** `/route-{n}/` and `app/route-{n}/page.tsx` (no slug). Section anchors are
  `#materi-a → #task-1`, `#materi-b → #task-2`, `#materi-c → #task-3`.
- **A route that is not built yet still exists**: a placeholder page, its nav entry, and an empty
  slice in the store — so the shape of the site never changes when it is filled in.
- **Sticky section rail per route** with the minutes of each section and a progress ring for
  *that route only* (cards marked read + task blocks done; "Portfolio" or "Dossier" as the label).
- **Routes never gate each other (#6).** A later route quotes an earlier route's answers back
  (Task 2's premise quotes the Task 1 verdict; Task 3 quotes both) as a *soft* pointer:
  `useJumpTo()` scrolls if the target is on the page, otherwise navigates client-side to
  `/route-n/#id` and `<HashFlash/>` flashes it on arrival. Nothing is ever blocked on it.
- **One store, one slice per route** (`l1`, `l2`, `route3`, …) under one persisted key. Each route
  has its own **Reset** (inline two-step confirm) that leaves the participant strip and the other
  routes alone.
- **Participant strip on every page** — one field, the learner's **full name**, used only for the
  export file name. There is **no number field**: the number that leads the file name is the route's
  own (Route 1 = 1, Route 2 = 2, Route 3 = 3) and each export adds it automatically, so a learner
  only ever fills in a name (file name contract: `CURRICULUM-GUIDE.md` §7).

The UX rules that make each route read as one thing:

- **No material inside a task.** All teaching sits in the material block. If a task has two parts,
  the handover between them is a small inline panel built from the learner's own Part 1 output,
  never a section of content and never a gate.
- **One case brief per route**, above the task. A worked-example company inside the material is
  read-only and visually distinct (no inputs); the case the learner works is briefed once.
- **One export bar, one deliverable, one `missing` list spanning the whole task** (#1–#3).
- **A missing entry never lands on a closed container.** When a field lives in a collapsed card or
  a hidden tab, the entry carries a `before` callback (`MissingItem`) that opens it first.
- **Material layout:** each card renders *title → scan line → large inline SVG (the primary
  teaching artifact) → short body → decision rules → sources → Mark as read*. SVGs use `viewBox`,
  stay legible at 380 px, and every hover affordance has a tap equivalent. Keep sentences in HTML
  beside the diagram rather than in SVG text, which shrinks with the viewBox.
- **A report-builder task** (a memo, report or file that assembles from the answers) **puts the live document at the bottom of the
  task, full width, below the last question and above Export, with a "Hide the memo" / "Show the memo" button** (#39). Not a
  side column and not a fixed strip: while answering, the questions keep the whole screen.
- **Completed cards stay editable** with every entered value intact.
- **Check-on-demand on binary questions:** report at the level of the item, not per question —
  naming which binary answer is wrong *is* the answer (#4).
- **Mentor:** the top-of-page MentorBar (#7) fills all three routes at once; answer keys stay per
  exercise where a task has fixed options.

The content side of this (minutes, section schema, export filename) is `CURRICULUM-GUIDE.md` §2–§4
and §7. Days already built in the older forms are not retrofitted. **The one standing exception is the
Friday day (a two-hour capstone in Route 1, with Routes 2 and 3 kept as optional): see #29.**

## 13. Triage-then-escalate for a set that's too large to analyse in full

When a level-1 exercise has more items than the time budget allows a full workup on (e.g. six
signals, ~10 minutes), don't shrink the set or hand the learner a free pick. Split the work into
three steps, each checkable on its own terms:

1. **Triage the whole set, shallowly.** One binary or small-set tag per item, anchored to a
   *tappable phrase in the item's own text* — the learner taps the exact words that prove the
   tag, not just the tag itself. This is what keeps the judgement from being a guess: the answer
   has to point at evidence. Check this as **one set-level check**, reporting only how many items
   hold — never which ones — because a two-way (or few-way) tag makes naming the wrong ones the
   answer (rule #4). A "clue" marks the *decisive* phrase in every item at once (never only the
   wrong ones), and after two genuine checks a "show the reasoning" option opens, recorded in the
   export — a real anchor to reason from, not an answer handed over on the first try.
2. **Escalate a fixed, small number for a deeper look**, with a one-line justification. This is
   the actual level-1 skill being tested — judging what deserves attention — not a formality.
   Deselecting an item never discards the deep-dive work already done on it (rule #5); it comes
   back if re-selected.
3. **Full workup only on the escalated items.** Area/category, tags, free text — whatever the
   full exercise needs. Checked per item this time, since the checked field (e.g. a six-way area)
   is specific enough that a per-item verdict doesn't hand over the answer. Same two-checks-then-
   reveal pattern as step 1.

The handover into the next stage (rule #12) still draws from the *triage* step across the full
set (so the pattern the learner saw is honest), plus which items they escalated and why — not
from the deep dive alone, which only ever covers a fraction of the set.

## 14. One shared grid instead of N repeated forms, coarse buckets instead of fine sliders

When a task asks the learner to do the *same* multi-field judgement for several items in a row
(predict a profile for measure A, then B, then C — each behind its own tab, each with its own
set of sliders), don't ship it as N repeated forms. Two changes together cut real completion
time without cutting the number of judgements being tested:

1. **One shared grid, not N tab-gated forms.** Rows = the fields being judged, columns = the
   items being compared, one screen. This removes the repeated re-orientation cost (re-read
   the same instructions, re-find the same controls, three times) and — because every item is
   visible at once — makes the comparison the exercise is actually testing *easier*, not harder:
   comparing A's Leverage to C's Leverage is a glance, not a context switch across two tabs.
2. **Coarse click-to-cycle buckets (e.g. Low/Mid/High) instead of a fine numeric slider**, when
   the assessed thing is a comparative judgement rather than a precise score. A tap that cycles
   through 3–4 states is faster than finding and dragging a slider to a specific value, and the
   task rarely needs the extra precision a 1–10 scale offers — three buckets is usually enough
   to teach "no option dominates." Bucket the ground truth the same way for comparison (e.g.
   1–3 Low, 4–7 Mid, 8–10 High) so a predicted bucket and the real one are directly comparable.

One Reveal action colours the whole grid at once — not one reveal per item — and the gap summary
groups misses by item below the grid. This is the same "one flag instead of N" pattern as rule
#12's single Reveal/situational treatment, applied to a grid instead of a tab set.

The number of underlying judgements does not shrink (every cell still needs a deliberate
decision) — only the repetition of *context* around each one does. If a task genuinely needs
numeric precision (not just comparison), keep the slider; this pattern is for "judge each of
several items on the same several dimensions," not for every prediction exercise.

## 15. Visual identity — the AION style ("case file and ledger")

Every CS and DL day looks the same: a consulting working paper, sober, adult. Copy the tokens from
`day1/tailwind.config.ts` and `day1/styles/globals.css` (the CS `day1` until DL has its own); do not
re-pick colours per day. **(DL)** The Digital Learning course has its **own palette, "Ocean"** (user decision
2026-10-08), given below the CS table. Never put the CS palette into a DL day or the reverse; the meaning of the colours (below) is the same in both.

| Token | Hex | Use |
|---|---|---|
| `ink` | #1F2328 | text |
| `slate` / `slateHi` | #23272D / #333A43 | top bar |
| `ash` | #59606A | secondary text, axes |
| `paper` | #FFFEFA | cards, fields |
| `canvas` | #F3EFE4 | page ground |
| `mist` | #ECE6D6 | quiet fills, table heads |
| `line` | #D8D1BF | hairlines |
| `accent` / `accentHi` / `accentSoft` | #8A5A0B / #6E4708 / #FBF0D6 | **amber** — attention and selection; primary buttons, focus ring, check flags, ref flash |
| `gold` | #D99A2B | amber for graphics and outlines |
| `signal` / `signalSoft` | #0F6B6B / #DFEEEB | **teal** — structure, an OK-state, never "correct" |
| `rust` / `rustSoft` | #A4472A / #F6E3DB | **warning** — missing items, an exceeded constraint |
| data fill | #2F5D62 (solid), #8B9098 (grey) | bars and segments |

### DL palette: "Ocean" (clear blue, friendly; a cool "screen" ground instead of CS's warm paper)

The user's standing choice for the Digital Learning course (2026-10-08, picked from three candidates). **Use these values in a DL day's
`tailwind.config.ts` and `styles/globals.css`; keep the CS token names** (`ink`, `slate`, `accent`, `signal`, `rust`, …) so shared components copy over
unchanged: only the values differ. A DL day also uses the DL shadow colour below. Contrast was computed on 2026-10-08 (WCAG 2 ratio).

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `ink` | #17212E | text | 16.2 on paper, 15.0 on canvas |
| `slate` / `slateHi` | #1B2736 / #2A3849 | top bar | white on slate 15.1 |
| `ash` | #556274 | secondary text, axes | 6.2 on paper, 5.2 on mist |
| `paper` | #FFFFFF | cards, fields | |
| `canvas` | #F3F6FA | page ground (cool, like a screen) | |
| `mist` | #E6ECF4 | quiet fills, table heads | |
| `line` | #D5DEE9 | hairlines (decorative, not text) | |
| `accent` / `accentHi` / `accentSoft` | #1750A8 / #123E85 / #E3ECFA | **blue**: attention and selection; primary buttons, focus ring, check flags, ref flash | accent on paper 7.6, on accentSoft 6.4; white on accent 7.6 |
| `gold` | #4C8BE0 | blue for graphics and outlines only (never text; 3.5 on paper) | graphics ≥ 3 |
| `signal` / `signalSoft` | #0B6F69 / #DCF0EE | **teal**: structure, an OK-state, never "correct" | signal on signalSoft 5.1, on paper 6.0 |
| `rust` / `rustSoft` | #AD3F26 / #F8E4DE | **warning**: missing items, an exceeded constraint | rust on rustSoft 4.9, white on rust 6.0 |
| data fill | #2B5F8E (solid), #8793A3 (grey) | bars and segments | 6.7 / 3.1 (graphics) |
| shadows | `rgba(23,33,46, .06 / .08 / .16)` | `sm` / `md` / `lg` | |

- **The three meanings are unchanged** (see the CS bullets below): blue = look here / your selection / flagged by a Check (a blue outline, never red,
  never a tick or cross); teal = structure and states such as *read*, *filed*; rust = missing or a constraint broken. Nothing is green or red for right and wrong.
- **Blue and teal are close in lightness (accent against signal 1.27), so colour never separates them alone.** Every use of `signal` carries a label, a glyph or a
  pattern (the CS rule "colour is never the only channel" is enforced harder here). The hatch that CS draws in amber for "an interpretation, an over-cap amount, an
  axis the file does not record" is drawn in `gold` blue in DL; dashed outline and the glyphs ● ◐ ○ ? stay.
- **Text links are always underlined.** The accent blue is close to the browser's default link blue, so an underline (not the colour) is what marks a link; glossary
  terms keep the dotted underline (#19) and stay `ink`-coloured text, never styled as links.
- **A learning interface teaches with its own colour.** Where a DL day shows a mock platform (#49), the mock screens use their own neutral greys plus whatever
  colours the *problem* needs (a low-contrast grey on grey, a too-bright banner), clearly inside a framed device; the site's three roles never colour the mock
  itself, so a learner cannot mistake the site's "look here" for part of the evidence.

- **Meaning of the three colours is fixed.** Amber = look here / your selection / flagged by a
  Check (an amber outline, **never red, never a tick or cross**). Teal = structure and states such
  as *read*, *filed*. Rust = something missing or a constraint broken. Nothing is green or red for
  "right" and "wrong": the app never says wrong outside a Check, and even then it gives a question.
- **Colour is never the only channel.** Pair it with a pattern or a label: hatch (amber diagonal)
  = an interpretation, an over-cap amount, an axis the file does not record; dots = a secondary
  layer; dashed outline = non-cash, set aside, absent; glyphs (● ◐ ○ ?) beside a bucket's name.
- **Type:** system font stack (no web fonts, no CDNs — the site works offline), tabular numbers,
  small-caps labels (`.smallcaps`: 11 px, uppercase, tracked), thin rules. Georgia serif only inside
  exported documents. Cards are `rounded-xl border-line bg-paper shadow-sm`.
- **Stamps and pills:** `FILED` stamp for a filed state; `OBJECTIVE` (teal) / `JUDGED` (amber) pills on
  every answer block (#16).
- **Motion vocabulary (CSS only, nothing over 600 ms except the 1.2 s flash):** stroke draw-in for
  lines, bar grow, connector draw, staggered fade-slide for lists, a pulse on the focused item, an
  outline flash for navigation (`anim-flash-warn` rust for missing, `anim-flash-ref` amber for a
  material reference). A tiny requestAnimationFrame count-up is allowed for readouts. Under
  `prefers-reduced-motion` movement becomes an instant state change, and the flash stays as a static
  outline until the script removes it.
- **Tone:** second person, declarative, no exclamation marks, no praise; feedback is consequence
  ("Your figure rests on 1 observation."). **No XP, badges, confetti, leaderboards or mascots.**
  **(DL)** This bans them from *the app's own reward layer*. DL's subject is the design of learning
  platforms, so gamification elements (badges, points, levels, progress bars, streaks) appear as
  **subject matter**: drawn inside a mock platform that the learner inspects, never as a reward the
  site gives the learner for doing the task. A DL day's own progress ring still means "filled in", not "won".
- The Green IT days keep their own green accent; never put the CS/DL palette into a Green IT day or the
  reverse.

## 16. House defaults every CS day carries (unless the day's prompt says otherwise)

These come from the day1 build and are the defaults a prompt does not need to repeat:

- **FIND IT line** above every answer block — the exact route, the widget *as printed on screen* and
  the click — followed by "Analyse in the app. Write your result in the answer area below." The
  answer area is separate, blank, and directly underneath.
- **OBJECTIVE / JUDGED pill** on every answer block heading (both, when a block has both).
- **Only ask for values the UI prints.** If a number is not on screen, do not ask for it.
- **Check on request** is the only place the app may mark anything: amber outline on the flagged
  cell plus, per cell, a *Show clue* that reveals **one question that teaches how to test the item**,
  never the answer or the bin. Every check is counted (`Checks requested: n`, printed in the export
  footer, not punished).
- **Consequence pictures instead of verdicts:** a wrong-but-unmarked choice shows up in the
  instrument (a hatched segment, a band across an open axis, a dashed connector to an empty node).
- **Soft locks:** a control that depends on earlier work is visibly disabled (`aria-disabled`, a
  tooltip, a "LOCKED" tag) and clicking it scrolls to and flashes the reason — it is never dead.
- **Undo/redo** (buttons + Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl+Y, capped at 100) on every drag or
  click placement; native HTML5 drag **and** a click-to-place fallback.
- **Export = one self-contained HTML document** (inline CSS + inline SVG) built by the same renderer
  as the on-screen "Preview of your …", downloaded via Blob + `<a download>`, plus a
  `Print / save as PDF` that opens the same document and calls `window.print()` (iframe fallback if
  a pop-up is blocked). It **never prints answer keys, ticks, crosses or scores.** File name:
  see `CURRICULUM-GUIDE.md` §7.
- **Content accuracy:** use only the facts and figures the prompt supplies. Anything invented for
  the case is labelled **"Case assumption"** on screen; every real figure carries a source chip
  (Author Year) that opens the block's References accordion. German terms get a gloss on first use
  (*Mittelstand (mid-sized companies)*, *Ausschreibung (formal tender)*, …).
- **Accessibility:** fully keyboard-operable, visible focus ring, `<title>` and `<desc>` on every SVG
  (single string children, see #10), ARIA labels on SVG hit areas, contrast AA. Touch targets are
  ≥ 40 px or have an HTML equivalent (a button list beside a small SVG hit area). No horizontal page
  scroll at 390 px.
- **Suggested order** is one dismissible banner per route, never a wall (#6).

## 17. Repository conventions for a CS day

- **Bootstrap a new day from `day1`** (its store shape, chrome, `components/ui` primitives and
  tokens), then replace the content — the way earlier days were bootstrapped from the previous one.
  Reuse the shared components (`JourneyMap`, `TcoStack`, `MotiveMap`, `LoyaltyMap`, `ExportBar`,
  `MissingList`, `Field`, `AnswerBlock`, `MaterialCard`, `MentorBar`, …); never fork a copy.
- **Layout is the repo's, not the prompt's:** `app/`, `components/`, `lib/`, `data/`, `store/` at the
  root (no `src/`), Tailwind with the CS tokens, static export, `trailingSlash: true`,
  `basePath` from `NEXT_PUBLIC_BASE_PATH`. A prompt that suggests `src/…` or CSS Modules is a
  suggestion; keep the repo convention (#18).
- **One data file per kind of content** (`data/*.ts`), one `mentorKey.ts` for every model answer,
  one `lib/exportDoc.ts` for every exported document, one `lib/missing.ts` (or per-route) that
  derives every missing list from state.
- **Each CS day has its own GitHub repository** (`aion-cs-dayN`); check `git remote -v` before pushing,
  because a day copied from the previous one may still point at the old repo. Push only when asked.
  **(DL)** This folder is itself the repository `AION-HABMANN/aion-digital-learning`, and **all sixteen days live in
  ONE Next.js project, `playground-dl/`** (user decision 2026-10-08, unlike CS where each day was its own project and repo):
  `/day/{n}/` is a day's home and `/day/{n}/route-{1|2}/` its two routes, one persisted store with one slice per day
  (`d1`, later `d2`, …), one glossary, shared `components/chrome` and `components/ui`, and per-day `components/dayN`,
  `data/dayN`, `lib/dayN`. A day not built yet keeps its page as a placeholder (#12). Export file names stay
  `{route}-{name}-day{N}-…` (CURRICULUM-GUIDE §7). A day gets its own repository only if the user asks. Push only when asked.
  `playground-dl/README.md` says how to add the next day. The older `playground/` folder is a copy of CS Day 13 and is
  reference only: never push from it (its git still points at the CS repository).
- **README per day** with the routes table, layout, the mentor bar and a "Notes on deviations"
  section (see #18).

## 18. Precedence — the day's prompt versus these rules

Each day gets its own detailed prompt (per route). When it differs from what is written here:

**The prompt decides — follow it:**
- the material: which cards, what each says, figures, cases, sources, minutes per card;
- the tasks and the gamification: mechanics, blocks, scoring, clue wording, case data, the
  deliverable's content;
- the mentor model answers and the day's own numbers.

**These rules decide — follow them even if the prompt says otherwise:**
- the site structure (three routes, URLs, the rail, one export per route, #12);
- the visual style (#15), the UX mechanics (#1–#8, #13–#14, #16), the stack and repo conventions
  (#9, #17), the MentorBar (#7), the export mechanics and file-name contract, and verification (#10).

Where the prompt asks for something in the second list that contradicts a rule (a different colour
scheme, two routes instead of three, CSS Modules, `src/`, a PDF library, a disabled Export button,
an unpatterned red/green verdict), **do the rule, not the prompt** — and never silently: write the
mismatch under "Notes on deviations" in the day's README and in the final report, so the user can
decide whether the rule or the prompt should change for good. Where the prompt is silent, the rules
apply. Only an explicit "for this day, X instead" from the user waives a rule, and that goes in the
README too.

## 19. Plain-language glossary — every technical term is one click from an easy explanation

The person who presents this material is not a subject-matter expert, and the learners are
working adults from another field. So the material may use the real technical word, but it must
never leave that word unexplained. This is a standing rule for every CS day:

- **Every technical term, abbreviation, framework name, legal term or German word** that appears
  in a material card or a task is an entry in `data/glossary.ts`: `title`, every written form
  (`match`), a `plain` explanation, an optional `example`, and `from` (where the idea comes from).
- **In the text it is a dotted-underlined button** (`glossify()` in `lib/glossify.tsx`, styled by
  `.gloss`). Clicking it opens **one** explanation card fixed to the bottom of the screen
  (`GlossaryPanel`, state in `store/useGloss.ts`, session-only). Clicking it again, pressing
  Escape or Close hides it; clicking another term swaps it. Opening it never moves the text.
- **Automatic, not hand-marked.** `MaterialCard`, `Bul`, `DataTable`, `Callout`, `Diagram` captions and
  `Field` help already run their text through `glossify`; anywhere else, wrap prose in `<Gloss>`.
  Each term is linked once per block, so a paragraph is not a wall of underlines. It never links
  inside a button, link, `code`, heading or SVG text. An all-capitals form ("ICE", "ALE") is matched
  exactly, so ordinary words never turn into links.
- **Write the explanation for a non-expert**: two or three short sentences, everyday words, no other
  unexplained term inside it, and a small worked example whenever a number makes it click ("€30,000
  a year and 80% staying gives about €80,000"). A term that another explanation uses must itself be
  an entry.
- **Say it in plain words next to where a term first appears** as well, when the sentence would
  otherwise be only jargon (day1 A1 does this for CLV). The glossary is the safety net, not an excuse
  for jargon-only prose.
- **Coverage check before a route ships** (add it to #11's coverage walk): read every card and task
  for terms, abbreviations and foreign words; each must already be in the glossary. Add the entries,
  then confirm in the browser that they render as links. German terms keep the inline gloss on first
  use (#16) *and* have an entry.
- The panel is not a place for facts the exercise depends on: anything a task answer needs stays in
  the card's body and its decision rules (#11).

## 20. Every interactive control gets an always-visible "What this shows" reading

A learner should never have to interpret a diagram unaided: clicking a toggle, dragging a
slider or selecting an SVG hit-area must never leave the learner staring at a picture that
moved with no sentence telling them what the movement means. This came from a real point of
confusion: in A3 ("Three types of retention"), switching between Customer P and Customer Q
moved lines around the Three Ropes diagram, but nothing said what the comparison was *for* —
the learner could operate the control without learning anything from it.

- **Every interactive teaching control renders `<Insight>` (`components/materi/kit.tsx`)
  directly under or beside itself**, always visible — never a click-to-reveal tooltip, never
  collapsed. `Insight` is `aria-live="polite"`, carries a fixed `smallcaps` label ("What this
  shows") so it is instantly recognisable wherever it appears on the site, and a 3px accent
  left border (`.insight` in `styles/globals.css`). Where the surrounding element must stay a
  `<figcaption>` for SVG-figure semantics (`JourneyMap`, `LoyaltyMap`, `MotiveMap`), copy the
  same visual treatment (`insight` class + the smallcaps label span) by hand instead of nesting
  `<Insight>` inside it.
- **The text interprets, it does not restate.** "CLV = €102,000" is the value; "raising
  retention from 0.80 to 0.85 moved CLV by +27%, because r sits in the denominator" is the
  reading. Write what the change demonstrates about the underlying idea, computed from the
  same local state that drives the control — same convention as the ad hoc `aria-live`
  captions this rule formalizes (e.g. `DecisionScale`, `MaySend`, `ScoreVsCap` in day1).
  `glossify`'s dictionary (#19) is for jargon terms; `Insight` text is always hand-authored per
  component, because the interpretation is specific to that control's state.
  Skip only the SVGs that carry no `onClick`/`onChange` handler at all (a purely illustrative,
  static diagram) — nothing to interpret because nothing moves.
- **`Insight` augments, not replaces,** the card-level `reasoning` block (#11, rendered by
  `MaterialCard`) and per-item reveal text (`Show clue`, `TryIt`-style checks, #4). `reasoning`
  answers "how do I decide in the task"; `Insight` answers "what did the thing I just clicked
  show me." A card can have both.
- **Coverage check before a route ships** (same discipline as #11 and #19): walk every
  `Diagram`-wrapped component and every graded control, list what changes on interaction, and
  confirm each one has an `Insight` (or its `figcaption` equivalent) that names the
  consequence, not just the number. For a graded task control already governed by #1–#5
  (check-on-demand + clue, non-disabled soft locks), only add `Insight` where the control is
  exploratory/state-only and the check/clue flow does not already explain the result in
  words — e.g. `RaciGrid`'s flagged rows already get their explanation through the `MissingList`
  item text (#1), so no separate `Insight` is needed there; do not force the pattern where an
  existing mechanism already does the same job.

> **Extended by #36 (2026-09-29):** every interactive diagram also carries a "Walk me through it" story, and "What this shows" is written
> as an "In plain words" verdict first.

## 21. Every calculation question says where its numbers are ("Numbers you need")

A learner must never face a number field and wonder where the inputs come from. This came from a
real point of confusion: in day1 Task 2, Block 2.3 (F1–F5), a participant could not see where
"2,000" came from. The inputs were all printed, but in Block 2.1's tables, several screens
above the fields, and nothing linked a question to its rows.

- **Every figure/calculation question carries its sources as data**, not prose: a
  `sources: FigureSource[]` on the question, each entry pointing at one printed row (table + row
  index, plus the column where a table has several, e.g. Offer A / Offer B) or at another figure
  the learner already entered (`{ figure: "F3" }`). Keep them next to the table constants
  (day1: `data/offers.ts`), so the tables, the sources and the answer key cannot drift apart.
- **Under each field, a "Numbers you need" list** (day1: `FigureSources` in
  `components/task2/Task2.tsx`): table name · row label · the printed value, each entry a button
  that calls `scrollToAndFlash(rowId, "ref")`. Every row of a source table gets a stable id
  (`MiniTable`'s `rowIdPrefix` → `t2-offer-0`, `t2-cost-4`, …). Table rows flash with the inset
  `tr.anim-flash-ref` rule in `styles/globals.css`, because an outer ring is clipped by the
  table's scroll container.
- **Hidden until asked for, like a clue.** Each field shows only a small `Show where the numbers
  are` button (`aria-expanded`); the list opens under it on click and has a `Hide`. The learner
  first tries to find the rows alone, and opens the help only when stuck. The same applies to any
  similar "where to find it" helper in a task: collapsed by default, one click to reveal.
- **One sentence at the top of the block** says where the numbers live (a clickable link to the
  tables block), invites the learner to look first, names the reveal button, and names what is
  actually being practised: combining the numbers correctly.
- **The list points at inputs only.** It names rows, not operations; the formula is a separate
  on-demand help (#24). Listing an input the figure does not need, as a decoy, is not allowed —
  every entry must be one the model answer uses.
- **Only list values the UI prints (#16).** A source that is not on screen is a defect in the
  question, not in the list.
- **Coverage check before a route ships:** for every calculation question, recompute the model
  answer (`data/mentorKey.ts`) from exactly the listed rows. If it cannot be reproduced from them,
  a source is missing; if a listed row goes unused, remove it. Then click each entry in the
  browser and confirm it lands on and flashes the right row.
- Applies wherever a task has a calculator or numeric answer fields — a TCO comparison, a CLV or
  ALE figure, a budget allocation — in every future day.

## 22. Every material card opens with an "In plain words" box

A card's one-line scan is too short on its own. The title, the scan and an interactive
diagram can leave a learner, or a presenter who is not a subject-matter expert, unsure what
the card is about and what the picture is for. This came from a real point of confusion: day1 B5
("One customer is an anecdote, not a base rate") showed a row of dots with no sentence explaining
them. So every card carries a short, friendly explanation between the scan line and the body.

- **Three parts, fixed labels, fixed order**, rendered by `MaterialCard` in one quiet box
  (`bg-mist`, smallcaps labels):
  1. **In plain words**: the idea in everyday language, as if explained to a colleague from
     another department. Two to four short sentences.
  2. **Why it matters**: tied to the day's case company or the task that uses the card.
  3. **How to read the picture below**: what to click, drag or toggle, and what the change
     means. It names the actual controls on screen ("Drag the slider for r", "Switch on *Show
     cost*"). Leave it out only for a card with no diagram to read (a field-method card).
- **Data, not JSX:** one file, `data/materialPlain.ts`, typed as
  `Record<MaterialId, PlainExplain>`, so a card without an explanation fails the typecheck.
  `MaterialCard` looks it up by `id`; the card components themselves do not change.
- **Tone:** easy to read and not stiff. Second person, short sentences, everyday words,
  concrete examples from the case ("Kessler is one customer…"). House tone rules still hold
  (#15): no exclamation marks, no praise, no jokes at the learner's expense. Write in the site's
  language (English for CS days) unless the user says otherwise for a day.
- **Accuracy:** use only facts and numbers that the card itself, or the day's prompt, supplies.
  Name a colour or a label in "How to read" only after checking it in the component (a line
  that is rust on screen is not "the red line" if it is teal).
- **Glossary still applies (#19):** the box runs through `glossify` with the same `seen` set as
  the card, so a term is linked once per card. Every technical term used in the box must already
  be a glossary entry.
- **It sits alongside the other help, never replaces it:** `reasoning` (#11) says how to decide
  in the task, `Insight` (#20) interprets the current state of a control, and this box explains
  the whole card before the learner starts. Do not move decision rules or task answers into it.
- **Coverage check before a route ships:** every `MaterialId` has an entry. Read each "How to read"
  against the live diagram in the browser: every control it names exists and behaves as
  described.

## 23. Every task question has a mentor worked answer, with the arithmetic written out

The answer key (#7) explains the fixed-option exercises, but a mentor helping a learner live also
needs every other answer explained: how a figure is calculated, and what a good free-text answer
contains. This came from a real request: in day1 Task 2, F3's model answer 159,890 was filled in by
"Fill all model answers", but nothing showed the mentor *why* it is 159,890, so they could not walk
a learner through it.

- **Coverage: every question in every task of Routes 1, 2 and 3.** Fixed-option exercises keep their
  answer key (`AnswerKey`, #7). Everything else gets a worked answer (`MentorGuide`): every numeric
  field and every free-text or table answer. Nothing a learner answers is left without one.
- **Shown only after the passcode**, exactly like the answer key: `components/ui/MentorGuide.tsx`
  reads the session-only `mentorUnlocked` flag (a reload locks it), rust `warn` styling (never the
  accent), `print:hidden`, never exported. Place it directly under the field or block it explains.
- **Content lives in one file, `lib/mentorGuide.ts`**, as `MentorGuide` objects:
  `title`, `answer` (the model answer as a learner would enter it), `steps` (for calculations),
  `why`, `lookFor` (for free text) and `pitfalls`.
- **A calculation shows every step with its real numbers**, in order, as a table of
  *step · calculation · result*: which printed row each input comes from, every unit conversion
  (days → hours → euros), every per-year versus per-term step (× 3 years), every one-off versus
  recurring decision, and the final sum. Example (day1 F3): 3 × 44,000 = 132,000; 10 × 1,100 = 11,000;
  3 days × 8 h = 24 h; 24 h × €85 = 2,040; 30 h × €165 × 3 = 14,850;
  132,000 + 11,000 + 2,040 + 14,850 = **159,890**.
- **`why`** is one or two sentences the mentor can say out loud (why × 3 here and not there, why this
  cost is one-off). **`pitfalls`** lists the typical wrong answers *with the number each produces*,
  so a mentor who sees a learner's wrong figure can recognise the mistake at a glance.
- **Computed, never retyped.** Every number is computed from the same constants as the tables, the
  checks and `data/mentorKey.ts` (export the raw inputs, e.g. `KESSLER_INPUTS` in `data/offers.ts`),
  so the worked answer cannot drift from the model answer. A figure that depends on the learner's own
  earlier choices (day1 G1–G6, from the allocation board) is computed **live from the learner's state**,
  with a note naming the reference answer that "Fill all model answers" enters.
- **Free text** gets the model answer (the same text the fill enters), `why`, and a `lookFor` checklist
  of what an acceptable answer must contain, so the mentor can judge an answer that is worded differently.
- **Wording comes from the app.** Explain a rule in the words the screen uses (quote the board's own
  note); do not invent a rationale the case never states.
- **Coverage check before a route ships:** unlock the mentor bar, press *Fill all model answers*, and
  walk every question of every task: each has either an answer key or a worked answer, and each worked
  answer's final number equals the filled model answer.

**Update (2026-09-27, from Day 4, applies to every day from here on).** Participants asked for a
comparison example on free-text/reflective fields and said they struggle without one, so besides the
mentor-only worked answer above, **every free-text (JUDGED) field also carries a learner-facing,
ungated "Show clue and example answer" control** — visible to every participant, no passcode:

- **Component:** `components/ui/ExampleAnswer.tsx`, the same collapsed-by-default reveal shape as
  `RevealHint` (a small button → a panel with a Hide link), placed directly under the field, open to
  every learner at any time — no passcode and no check required first.
- **Content is the same string as the mentor's**, never retyped: it reads `answer` straight out of the
  same `MentorGuide` entry in `lib/mentorGuide.ts` used by #23 above, so the participant's example and
  the mentor's worked answer can never drift apart. `why` and `pitfalls` stay mentor-only (they are
  coaching notes, not something a participant reads mid-task); only `answer` (plus a short clue
  sentence) is surfaced here.
- **This is a deliberate, named exception to rule #4's "clue, not answer"**, for free-text/reflective
  fields only — never for a classification, placement or fixed-option exercise, which keep #4
  unchanged. A free-text prompt has no single bin to leak: showing one filled-in example does not hand
  over "the" correct classification the way naming a bin would.
- **Still call it an example, never *the* answer.** Where the field asks for something of the
  learner's own (a reason not already given, a personal reflection), the panel's own copy says the
  example is one way of answering, not the only acceptable one — the field's `help` caption keeps
  stating what is actually required.
- **Coverage check before a route ships:** every free-text/JUDGED `TextBox` field carries this control,
  and its example text is read from, not retyped from, the same `answer` already authored in
  `lib/mentorGuide.ts` for that field.

**Second update (2026-09-27, from Day 3, applies to every day from here on).** `answer` is not always
safe to show verbatim. For an open, reflective field (a reason, a hypothesis, a personal reflection)
many answers defend, so showing the model text is a genuine "one way to answer this". But some
free-text fields are checked *against a specific result*: the field asks the learner to state a
calculated comparison (which of two offers actually costs less once a risk term is added), or to
justify a pick drawn from a small fixed set the task also grades elsewhere (which measures were
funded, which lever is named "greatest", which pattern got which rating). For those, `answer` *is*
the case's own answer — showing it does not clue the method, it hands over the number or the pick,
which stops being a clue and starts being #4's forbidden literal answer.

- **Give `MentorGuide` a second, optional field: `example`.** A learner-facing worked example, written
  separately from `answer`: the *same method*, but a different scenario — generic names ("Company A",
  "Measure A", "Lever B", "Barrier X") and different numbers that do not resemble the case's own
  figures, so a learner cannot copy a value across. It ends by pointing the learner back to their own
  inputs ("Run the same steps on your own F1, F2 and F3…", "Use your own three measures…").
- **`ExampleAnswer` prefers `example` over `answer`** when a guide sets it (`guide.example ?? guide.answer`),
  and its own copy changes to say so plainly: "A worked example with different names and different
  numbers — not this case. Use the same method on your own figures; your result will differ." An open
  field with no `example` keeps the original "One way to answer this" copy and shows `answer` as before.
- **The mentor's own worked answer is unaffected.** `<MentorGuide>` (passcode-gated) always reads
  `answer`, the real model text — the facilitator needs the real number, only the learner-facing panel
  needs the substitute.
- **Test before writing one: would showing `answer` let a learner skip the calculation or the choice
  the block grades, rather than merely show them the shape of a good sentence?** If yes, write an
  `example`. Reuse this test per field, not per block — a block can mix open fields (no `example`
  needed) with one calculated or fixed-pick field (needs one).
- **Coverage check before a route ships:** for every free-text field whose block also runs a numeric
  check or a fixed-set pick (a felt-cost/TCO-style comparison, "which N of M options", "which one is
  greatest/first/weakest"), confirm its guide sets `example` and that the example's own arithmetic is
  internally consistent (recompute it) even though it does not match the case.

## 24. Every calculation is taught in the material, and its formula is one click away

A learner must never have to invent a method. This came from a real review: in day1, Task 2's
figures needed "per year × term", "one-off counted once", "day rate versus hourly rate" and
"hours inside the included allowance cost €0", but Materi B4 only named the TCO formula; the
worked example never showed those steps, and Task 3's conversion halving was nowhere explained.

- **Every calculation in a task is taught in the material first, with a worked example** (this is
  #11 applied to arithmetic). The example uses the **same method on different numbers** (a separate
  worked-example company, labelled *Case assumption*), so the task's answer is never printed. It
  shows every step a task figure needs: which inputs recur and are × the term, which are one-off,
  every unit conversion, included allowances, a cap compared per the same period, and any rule such
  as rounding or a scenario multiplier. Reference: day1 B4 `TermWorkedExample`.
- **The card's decision rules (`reasoning`) state each of those steps as a rule**, phrased the way
  the task needs it ("A day rate multiplies days directly. An hourly rate needs hours first.").
- **A rule the app applies for the learner** (a halving, a scenario factor, a dependency between
  options) is printed **on the instrument itself** (day1: "How the board counts" under the allocation
  board) *and* named as a concept in the material (day1 C4). A number the learner reads off a board
  still needs its rule to be visible.
- **Every calculation question has a hidden "Show the formula" help**, beside "Show where the
  numbers are" (#21), both through `components/ui/RevealHint.tsx` (button → panel with Hide,
  collapsed by default, session-only, never exported). The formula is written **in words, with no
  numbers** ("(Annual fee × years) + onboarding (person-days × day rate) + …"), and names the material
  card it comes from. It lives as a `formula` field next to the question's data (day1:
  `FIGURES[].formula` in `data/offers.ts`, `G_META[].formula` in `lib/l3.ts`).
- **This is the one deliberate exception to "clue, not answer" (#4) for arithmetic:** the formula
  and the rows are shown on request, but never the values plugged in and never the result. The
  learner still finds the values, types them into the calculator and works out the number. The
  check-on-demand *Show clue* (#16) keeps its question form.
- **The block's intro sentence** names the material card that teaches the method and both helps.
- **Coverage check before a route ships:** for every calculation question, (1) the material card it
  draws on shows the same method step by step on other numbers; (2) every step in its formula
  appears in that card's rules; (3) the formula, fed with the printed rows (#21), reproduces the
  model answer (#23). A step that exists only in the question text is a defect.

## 25. A task that asks the learner to assign roles or categories needs profiles and a per-cell worked example

A learner cannot pick between options the material only names. This came from a real review: day1
Task 3's RACI grid asked for R/A/C/I across four roles and four activities, but Materi C5 gave a
one-line definition of each letter, the role names as a list, and a static example grid with no
reasons. The rules that decide the model answer ("put A at the level with the authority";
"contract terms make Legal a C") existed only in the mentor's answer key.

Applies to every assignment exercise: a RACI or responsibility grid, role-to-motive, item-to-category,
stakeholder mapping, any "which of these N options goes here".

- **One test question per option**, in the material, phrased so a learner can apply it to a cell
  ("A: who answers for the result and has the authority to decide?"). Include the test for an
  **empty** cell when the exercise allows one, and the **distinguishing test for each confusable
  pair** (A vs R, C vs I, Price vs Trust, …).
- **A profile of every option the task offers**, in the material: for roles, what each typically
  decides, does, is asked about and is told (day1 C5's role table); for categories, what belongs and
  what does not. Label it as practitioner observation or Case assumption where it is one.
- **A worked example on a different case, explained per cell.** Every cell is clickable and shows
  *why* it holds that option, empty cells included, with an `Insight` (#20) naming the test behind it.
  The example uses a different company and different activities, so the task's answer is not printed
  (day1: `RaciExample`, Alpenwerk replacing its ticketing tool).
- **The rules the answer key relies on are in the card's `reasoning` (#11).** If a mentor's answer key
  (#7) or worked answer (#23) justifies the model answer with a rule, that rule must also be taught
  in the material. The key may explain; it may never be the only place a rule exists.
- **Every option label is a glossary entry (#19)**, e.g. Responsible, Consulted and Informed, with
  `exactCase` where the word is also an everyday word.
- **In the task, a hidden "Show the test questions" help** (`RevealHint`, as in #21/#24) repeats the
  tests and the level rule, never which option fits which cell.
- **Coverage check before a route ships:** for each cell of the model answer, name the test question
  and the profile line that lead to it. If one is missing from the material, add it before shipping.

## 26. Every calculation has an automatic calculator whose check names the exact wrong part

A "wrong" on a total teaches nothing: the learner cannot tell which of five inputs or which step went
astray. This came from a real request on day1 Task 2: every calculation must say *specifically* what is
wrong and where to read the right input. So besides the manual Calculator, every calculation question
gets an automatic one built from its own formula. The learner uses whichever they prefer.

- **Where:** inside the question's "Show the formula" panel (#24), under the formula in words:
  `components/ui/FormulaBuilder.tsx`. One small labelled input per part of the formula ("Onboarding
  day rate (€ per day)", "Term (years)"), the formula re-written live with the learner's values
  (`3 × 44000 + …`, ▢ for an empty part), the result, and **Use this result in F3**, which copies it
  into the answer field. Applies to every numeric answer built from more than one value; a single
  read-off (day1 G2, G3) needs none.
- **Data:** one `CalcBuilder` per question in `lib/calcBuilder.ts`: `parts` (id, label, `expected`,
  `tolerance`, `clue`), `compute`, `show`. Every `expected` is computed from the same constants as the
  tables and the model answers (#23). A question whose inputs depend on the learner's earlier choices
  (day1 G1–G6, the levers) builds its parts live from that state.
- **The check is per part.** "Check my figures" compares every filled part with its `expected` and
  outlines each wrong part in amber (#15, `is-flagged`, never red, never a tick or cross). Under a wrong
  part: *"Check this part. Read it from: Cost lines · Kessler internal IT cost rate (per hour). The
  review is Kessler's own staff time, not NordByte's day rate."* The clue names **the table, the row
  and which part of the row** (the days, the per-day amount, the years rather than the notice months),
  plus the mix-up it is most likely to be, and **never the value**. Empty parts are not flagged.
- **A flagged total always gets a specific "What to check" line** under its field, one of:
  the parts are all right but the entered total differs from their result (→ press "Use this result");
  these named parts hold the wrong number; some parts are still empty; or no parts were filled yet
  (→ fill them and the next check shows which step is off). Never only "1 figure is outlined".
- **A flag never sits in a closed panel (#12):** `RevealHint`'s `forceOpen` opens "Show the formula"
  when any of its parts is flagged. A part flag clears as soon as that part is edited; a change to an
  upstream choice (a lever) clears all of them.
- **Soft lock, not dead button (#3, #16):** "Use this result" with a part missing scrolls to and flashes
  the first empty part.
- **Persisted like any answer** (`parts`, `partFlags` on the route's slice), so this is a persisted-shape
  change: bump the persist `version`, add the `migrate` note and fill the new fields in `merge` (#9), and
  test from an old-shape blob. The mentor fill enters every model part too (#7), so "Fill all model
  answers" shows complete, correct calculators.
- **Coverage check before a route ships:** for every calculation question, fill the builder with the
  model parts and confirm its result equals the model answer; then enter one wrong part at a time and
  confirm that exactly that part is flagged and its clue points at the right row.

## 27. The home page opens with "What today is about" and "What's in it for you"

A learner who lands on a day's home page must know, before choosing a route, what the day teaches
and why it is worth their time personally. This came from a real request on day1: the page showed
only a title, one subtitle line and the three route cards.

- **Directly under the header, two sections**, from one data file (`data/dayIntro.ts`, rendered in
  `app/page.tsx`, text through `Gloss` #19):
  1. **What today is about** (`card`): two short paragraphs, the day's topic in plain words, then the
     case that runs through the day (company, customer, the one fact that makes the case a puzzle).
     Below it **One story, three steps**: one tile per route with its verb (CS: Diagnose / Calculate /
     Decide; **DL: Analyse / Design / Decide**, because DL's Level 2 is a design case study, not a calculation, #49),
     the question that route answers in the case, and "You finish with: <the export>". Each
     tile links to its route. End with the total time, computed from the routes' plans.
  2. **What's in it for you** (WIIFM, `card` on `bg-accentSoft`): five to six items, each a skill the
     learner takes home plus its pay-off **at their own work, outside the case**, tagged with the route
     that teaches it. The last item names the documents they leave with and how to reuse them.
- **Facts only from the day's own material and cases** (#16): the numbers and names in the intro must
  already appear in a card or a case brief. No invented benefits such as salary or promotion claims.
- **Tone (#15):** second person, plain, no exclamation marks, no praise, no hype. It is a promise the
  day has to keep, so each WIIFM item must map to a route that actually teaches it.
- **Coverage check before a day ships:** every WIIFM item's route teaches that skill in its material or
  task; every figure in the intro is findable in the day; each story tile links to the right route.

## 28. Every route has a page map on the right: every card and every task block, one click away

A route is long (eight cards and three to six task blocks). A learner must be able to see at a glance
how much the route holds and jump to any card or block without scrolling to find it. This came from a
real request on day1; the Green IT days had a card-only rail, and the CS days need the task blocks too.

- **One component, every route:** `components/chrome/PageNav.tsx`, rendered right after `SectionRail`
  in each `app/route-{n}/page.tsx`. Its entries come from one data file, `data/pageNav.ts`: per route, a
  **Materi** group (one pill per card, `A1`…, from `MATERIALS`) and a **Task** group (`Case` for the
  task's brief, one pill per answer block `1.1`…, and `Export`). Ids are the anchors the page already
  renders (`mat-A1`, `task-1`, `block-2-3`, `export-l3`); verify each exists on the page.
- **Wide screens (xl, ≥ 1280 px):** a slim column of small pills fixed to the right edge, vertically
  centred, outside the 1100 px content column (it must never cover content). Group labels in
  `smallcaps`; the full name appears beside a pill on hover **and on keyboard focus**.
- **Smaller screens:** one "☰ Jump to · <current part> · done/total" button fixed at the bottom right
  (above any bottom strip), opening the same list with full names; Escape or a choice closes it. Touch
  targets ≥ 40 px, no horizontal scroll at 375 px.
- **Style (#15):** the part in view is a dark `ink` pill, the same as the section rail's active tab;
  others `paper` with a `line` border, amber on hover. A card marked read or a task block filled in
  (from `lib/progress.ts`, "filled in", never "correct") carries a small **teal** dot, with "read"/"done"
  as text in the mobile list and in the button's `aria-label` (colour is never the only channel).
- **Behaviour:** a click scrolls the part's **top** into view (`scrollToAndFlash(id, "ref", "start")`, so a
  tall section is not centred on its middle) and flashes it with the amber reference flash; the clicked
  pill becomes current at once. The part in view is the last whose top has passed ~45% of the screen,
  or, at the bottom of the page, the last visible one (so `Export` can become current).
- **Coverage check before a route ships:** every card and every answer block of the route has a pill,
  in page order; clicking each lands on its part and highlights the same pill; the done dots match the
  progress ring of the section rail.

## 29. The Friday day: a capstone of under two hours in Route 1, with the full Routes 2 and 3 kept behind a small button

Friday is built differently from Monday to Thursday, and this rule is the user's explicit "for this day, X
instead" (#18). **The Friday days are Day 2, about Day 7, and so on in CS; the user names each one in its prompt. (DL) The
user has not named any DL Friday yet: until they do, no DL day uses this form.**
The other days keep #12 as written. On Friday learners leave early, so the day holds about
**one hour of material and under an hour of task, about 110 minutes in all, and does not fill the day**. The Friday
day therefore has two layers:

- **Route 1 is the capstone**: one complete study case that carries a learner through all three levels in one
  short, continuous thread. This is what is done on the day.
- **Routes 2 and 3 are kept and unchanged in form** (#12: their own materi, their own task, their own
  export), but **hidden by default** and offered as **optional** for another time, when the full material is
  wanted.

### Route 1: the capstone

- **The case is the one the curriculum plan gives that day** (`Strukturplan` and the module deck), briefed
  **once** at the top of Route 1 and short enough to read in about five minutes. Day 2 uses DigitalIT Solutions
  GmbH, the case the plan already assigns to it, so nothing new is invented; a later Friday gets a new German
  Mittelstand case built from that day's topic in the plan. No Monday to Thursday route is changed. The
  capstone uses the instruments already built for the day and the week (funnel, calculator, allocation grid,
  memo), so no new mechanic is taught on the shortest day. Facts follow #16 (only figures the prompt supplies;
  the rest labelled "Case assumption").
- **Converting a day that is already built (Day 2):** the existing Route 2 and Route 3 stay exactly as they are
  and become the hidden optional routes below; Route 1 (Materi A + Task 1) is replaced by the capstone. Reuse
  the day's data files, components, glossary and answer keys; the old Route 1 stays available in git history.
- **Material, about 60 minutes:** six short cards, two per level (Level 1 to Level 3), facilitator-led. Each
  card only teaches what the Route 1 task uses, with `reasoning`, `MaterialRefs`, "In plain words", glossary
  and "What this shows" as in #11, #19, #20 and #22. Card minutes add up to the material budget; say so on the
  page.
- **Task, about 50 minutes, ONE task on one page, not several stages.** The user asked for one case and one
  continuous task, so there are no stage panels, no stage strip, no "Carried forward" panels and no per-part
  minutes. The task has **nine answer blocks** in three thin, unnumbered-by-stage dividers ("Part 1 · Diagnose",
  "Part 2 · Calculate", "Part 3 · Decide"): 1.1–1.4 (find the leak and cost it), 2.1–2.3 (put a euro figure on the
  three options and choose one per segment), and only **two** decision blocks, 3.1 (spend the budget and set the
  start months) and 3.2 (what you cut or postpone, with a pickup point, and an owner, cadence and trigger for each
  funded item). There is no block 2.4 (one option for both segments), no separate "what was cut", no separate
  rollout-order question and no live memo panel in Route 1; those stay in the optional Routes 2 and 3.
- **The blocks feed one another from top to bottom**, through the learner's own answers (2.3 quotes the leak
  diagnosis; 3.1 uses the options and figures of Part 2), never through a second case brief and never a new fact
  the learner has not derived or the brief does not hold. A figure used in Part 3 must be traceable to Part 1,
  Part 2 or the brief.
- **Core and stretch blocks.** Each block is marked **Core** or **Optional**. The Core blocks (1.3, 1.4, 2.1,
  2.3, 3.1, 3.2, about 40 minutes) are enough to produce a complete Case File; the Optional blocks (1.1, 1.2, 2.2)
  bring the whole task to about 50 minutes and are for whoever has time. Nothing is ever lengthened by repeating a
  block.
- **One export: the Case File**, one self-contained HTML document (#16) in three parts (Diagnosis, Calculation,
  Decision), built by the renderer that also draws the on-screen preview. File name
  `1-{name}-day{N}-case-file` (Day 2: `1-{name}-day2-case-file`). One `missing` list spans the file; each entry jumps to its
  block (#1, #2); the Export button is never disabled (#3). It counts Core blocks as required and Optional
  blocks as not required.
- **Nothing is gated (#6), and a learner who runs out of time can still finish.** Every block and control is
  open from the start (no soft locks inside Route 1), the blocks can be answered in any order, and the Core
  blocks alone give a complete file. A mentor or a late joiner uses the mentor bar's fill.
- **Progress:** the section rail's ring covers Route 1 (cards read + Core blocks filled in) and the page map lists
  every card and block (#28). "Filled in", never "correct".

### Routes 2 and 3: kept, hidden, optional

- **Same case, full depth.** Route 2 (Level 2: Materi B, Task 2) and Route 3 (Level 3: Materi C, Task 3) stay
  at `/route-2/` and `/route-3/`, on the **same Friday case**, as the expanded version of Parts 2 and 3. They
  follow #12 in full, with their own exports (`2-…-l2-…`, `3-…-l3-…`, §7 of `CURRICULUM-GUIDE.md`). They
  quote Route 1's answers as soft links (#6). They share the answer slices with Route 1, so work done in one
  is in the other. Nothing in Route 1 requires them.
- **Hidden until the learner asks.** By default the home page, the top navigation and the page footer show
  Route 1 only. One small, quiet button ("Optional · Full Level 2 and 3 routes", in `smallcaps` weight, not the
  primary style) sits on the home page under the Route 1 card, and a matching one-line notice sits at the end of
  Route 1's Export. Pressing it reveals the two routes as ordinary cards and nav entries labelled **Optional ·
  full route**, with a "Hide" to put them away again. The state is `ui.optionalRoutesShown` in the persisted
  slice (a shape change: bump `version`, `migrate`, deep `merge`, #9), and a shared hook
  `useOptionalRoutes()` drives every place that lists routes.
- **Hidden is not locked.** `/route-2/` and `/route-3/` open directly by URL at any time and are fully
  usable (#6); a learner who arrives there, or a mentor, sees the routes appear in the navigation. The reveal
  button only controls whether they are listed.
- **Mentor bar (#7):** one fill fills Route 1 and, whether or not they are shown, Routes 2 and 3, so every
  export's `missing` list is empty after one fill. "Clear this route" clears the current route only.

### What does not change

Everything else in #1–#11 and #13–#28 (missing lists, check-on-demand, answer keys and worked answers for every
question, glossary, page map, home intro, style, stack). The home page (#27) describes Friday as one story
("Diagnose, calculate, decide") ending in "You finish with: the Case File", with total time 120 minutes. Its
"What's in it for you" items each map to something Route 1 teaches.

### Coverage check before the Friday day ships (in addition to #10, #11, #19, #21–#28)

1. Add up the minutes: material about 60, Core task about 40, whole task about 50.
2. Trace the chain: for every block of Parts 2 and 3, name the earlier output it uses and confirm it is the
   learner's own or a figure printed in the brief.
3. Open Part 3 from a clean `localStorage`: every control works (nothing is locked) and the missing list says
   what is missing.
4. Fill everything with the mentor bar and export: one document, three parts, one empty missing list. Then
   export with only the Core blocks filled: the Case File is complete and Optional blocks are not listed as
   missing.
5. From a clean `localStorage` the home page and nav list Route 1 only; the button reveals Routes 2 and 3; a
   reload keeps that choice; opening `/route-2/` by URL works while they are hidden.
6. Write the deviation from #12 under "Notes on deviations" in the day's README, with this rule's number.

## 30. From Day 3: two routes per day — Route 1 merges Level 1 and Level 2 on one case, Route 2 is Level 3

The user's explicit "for Day 3 and every day after, X instead" (#18): **from Day 3 a day has exactly two routes**, not
three. This replaces the three-route table of #12 for Day 3 onward; Day 1 and Day 2 keep the forms they were built in
(Day 2's Friday form is #29). Everything else in #1–#28 applies unchanged.

| Route | Levels | Carries |
|---|---|---|
| Route 1 | L1 · Knowledge **+** L2 · Application | Materi A (about 60 min) → **one merged case**, one task in two parts → its own export |
| Route 2 | L3 · Management decision | Materi B (about 60 min) → one task built as a report (the memo assembles beside the questions) → its own export |

- **One case for Route 1, briefed once.** The day's plan gives a Level 1 task pair and a Level 2 case study; they are
  merged into one case (Day 3: SecureIT Systems). The evidence of the Level 1 tasks (a debrief, a set of exit notes)
  becomes the evidence file of that one case, so a learner works one company from start to finish. Part 1 (Level 1)
  understands, Part 2 (Level 2) analyses and acts; the coaching reflection of the plan sits between them.
- **Route 2 (Level 3) is the same company in a manager's role**, quotes the learner's Route 1 answers as a soft pointer
  (#6, #12) and never requires them.
  On the days the user names, Route 2 takes the **decision-frame form of #47** (a live control panel, Step A and Step B, the older blocks folded as Go deeper) instead of the report-builder form.
- **URLs and folders:** `/route-1/`, `/route-2/`, `app/route-{n}/page.tsx`. Section anchors `#materi-a → #task-1` and
  `#materi-b → #task-2`. The store has one slice per route (`l1`, `r2`); each route has its own Reset.
- **Export file names:** the leading number is the route's own number (Route 1 = 1, Route 2 = 2), and a route that spans two
  levels lists both: `1-{name}-day3-l1l2-{deliverable}`, `2-{name}-day3-l3-{deliverable}` (CURRICULUM-GUIDE §7).
- **Mentor bar (#7):** one fill fills both routes; "Clear this route" clears the current route only.
- **Home page (#27):** "One story, two routes", one tile per route.
- **No capstone form, no optional routes.** Those belong to the Friday day (#29); a day built to this rule has neither
  unless the user asks for one in that day's prompt. (The EN | DE switch is no longer an exception: see #32.)
- **Coverage check before a day ships** (adds to #10, #11, #19, #21–#28): confirm the Level 1 tasks of the plan
  are all answered somewhere in Route 1's merged task, and the Level 3 transfer project's numbered requirements are
  all answered in Route 2; write any merge or drop under "Notes on deviations" in the day's README.

## 31. Every day also ships its Materi and Task as readable Word documents

The user's standing request (2026-09-25): once a day's website is built, its material and its tasks are also
delivered as `.docx` files that can be read, presented and worked **without the website**. The full procedure,
tools and checklist are in [`DOCX-EXPORT-GUIDE.md`](DOCX-EXPORT-GUIDE.md); follow it every time.

- **Where and how named:** all documents in one folder, `materi-task-docx/`, two per route:
  `Day{N}_L{levels}_Materi-{letter}_{Level-name}.docx` and `Day{N}_L{levels}_Task-{n}_{Deliverable}.docx`
  (`_Optional` for a Friday day's hidden routes). The name always says the day, the level(s), Materi or Task.
- **Every document names the website (playground) link** of its route on the cover, and the folder's README
  lists every day's link.
- **Website-only text never goes in** (buttons, FIND IT lines, checks and clues, click/drag/toggle
  instructions, "What this shows", counters, missing lists, locks, hidden helps, mentor tools, export bars).
  Interactive diagrams become the starting-state picture plus every state written out; form fields become
  answer spaces; the glossary becomes an appendix; nothing a task asks the learner to work out is printed.
- **The pipeline is reused, not rebuilt:** `materi-task-docx/_tools/` (capture → extract → render → state and
  glossary sweeps → hand review in `_source/` → `build_all.py` → preview → validate). The reviewed Markdown in
  `_source/` is the source of truth; never overwrite it with a new extraction.
- **Done means** the guide's §7 checklist holds for every document, including `validate.py` passing and a
  page-by-page look at the rendered preview.

> **Video versions:** where a card embeds a video (#33 and its 2026-09-29 update in #36), the Word document keeps the gist and names the
> video (title, channel, length, link) instead of reproducing the long explanation.

## 32. German version (EN | DE): common terms stay English, every explanation is German

The user's standing request (2026-09-25). The German version is **not** a word-for-word translation. It is written the
way a German Customer Success team (**DL: a German UX / e-learning team**) actually talks: the common technical terms
stay in English, and everything around them (explanations, instructions, questions, feedback) is in natural German. The
goal is that a native German speaker reads it without effort, and without meeting made-up German terms that nobody uses
at work.

**(DL) The DL plan itself is written in German** (sheet *Deutsch* of the One Stop workbook; *English* is its official translation), so for DL the German text is not an
add-on: the plan's own German wording for tasks, levels and requirements (*Arbeitsauftrag, Fallstudie, Transferprojekt,
Nutzerwirkung, Aufwand, Risiko*) is the source for the German version, and the English is written from it. English is
still written first and is still the default (CURRICULUM-GUIDE §1); open question for the user: whether DL should
default to German instead (#49).

### Scope

- **Every CS and DL day gets an EN | DE switch** in the top bar. English is the default and is written first. German covers
  all learner-facing text on the home page and on every route: material cards, "In plain words" (#22), `reasoning`
  (#11), `Insight` (#20), diagram captions and HTML labels (SVG text too), case briefs, tasks, field captions (#8),
  clues and checks, missing lists (#1), soft-lock messages, the glossary panel (#19), and the exported document and its
  preview (#16).
- **Mentor tools stay English** (mentor bar, answer keys, worked answers; same as Day 2): they are for the facilitator.
  "Fill all model answers" enters German free text while the site is in German.
- **Days already built** get the German version only when the user asks. Day 2's older German (a full translation,
  e.g. "Fallakte", "Behebung des Trichter-Lecks") is not retrofitted unless asked. The Word documents (#31) stay English
  unless the user asks for German ones; German ones follow this rule too.

### The core rule: which words stay English

**Keep in English** (spelled as in English, with German grammar around them: *der Churn, die Retention Rate, das
Onboarding, den Health Score*):

| Kind | Examples |
|---|---|
| CS terms German practitioners use in English | Customer Success, Customer Journey, Touchpoint, Churn, Retention, Retention Rate, Onboarding, Renewal, Upsell, Cross-sell, Health Score, Account, Stakeholder, Owner, Lead, Funnel, Pipeline, Feedback, Workshop, Benchmark, Quick Win, Trigger, Budget |
| **(DL)** UX and e-learning terms German practitioners use in English | UX, UI, Usability, User Journey, Persona, Wireframe, Prototype, Low-Fidelity / High-Fidelity, Mockup, Dashboard, Onboarding, Touchpoint, Pain Point, Feedback, Engagement, Completion Rate, Drop-off, Gamification, Badge, Microlearning, Mobile First, Responsive Design, Cross-Device, Accessibility, Screenreader, A/B-Test, Usability-Test, Tracking, Roadmap, Quick Win, Stakeholder, Trade-off, Learning Analytics, Cognitive Load (also *kognitive Belastung*: use the form the card uses, once per day) |
| Abbreviations and formulas | CLV, NPS, CSAT, KPI, TCO, ROI, SLA, MRR, ARR, B2B, RACI (and its letters R, A, C, I); **(DL)** UX, UI, WCAG, BFSG, BITV, LMS, SUS, CTA, MVP, ARIA |
| Names of models, frameworks and methods | the name as the material gives it (e.g. Customer Lifetime Value, Jobs to be Done) |
| The course's own structure and deliverables | Route, Level, Materi, Task, Case File, Memo, Export: learner, facilitator and documents all use the same names |

**Write in German**: every sentence, explanation, instruction and question; ordinary words (*Kunde, Kosten, Vertrag,
Preis, Entscheidung, Kündigung*); headings made of ordinary words; button verbs (*Prüfen, Hinweis anzeigen,
Exportieren, Zurücksetzen, Rückgängig*); the case story; feedback and missing-list entries ("Begründung für Option B
fehlt").

**Test for a term not in the table:** *Would a German CS or account manager at a Mittelstand company say this word in
English in a team meeting?* (**DL:** *…a German UX designer, product owner or learning designer at an EdTech company or
training provider…*) Yes → keep it in English. No, or it is an everyday word → German. Two mistakes to avoid:

- inventing a German term nobody uses at work ("Kundenabwanderungsrate" for Churn Rate, "Trichter-Leck" for a funnel
  leak), and
- leaving an ordinary English word in a German sentence ("Der Customer hat den Contract gekündigt" → "Der Kunde hat
  den Vertrag gekündigt").

**One term, one form across the day.** The German glossary (`data/glossaryDe.ts`) is the list: its `title` is the
English term exactly as written in the German text. A term kept in English is always an entry.

### How a term is explained

- **First use in a card or task: English term plus a short German hint in brackets**, then the English term alone:
  "der Churn (Kundenabwanderung)", "der Health Score (ein Gesamtwert, wie gesund ein Kundenkonto ist)".
- **German glossary entry:** `title` = the English term; `match` includes the inflected forms German text produces
  (*Touchpoints, Health Scores, KPIs, des Churns*); `plain` and `example` are in easy German (two or three short
  sentences, a small worked example with German number format). Everything in #19 still applies: every term used inside
  an explanation is itself an entry, and each term is linked once per block.

### Style of the German

- **"Sie", formal, everywhere**, consistently (as in Day 2). Second person, short sentences, active voice.
- **No Amtsdeutsch:** no long noun chains ("Durchführung der Bewertung der Kundenzufriedenheit" → "Sie bewerten, wie
  zufrieden der Kunde ist"). No exclamation marks, no praise (#15).
- **Correct German spelling:** ä, ö, ü and ß (never ae, oe, ss as a stand-in), German quotation marks „…". An English term
  joined to a German word is hyphenated (*Onboarding-Prozess, KPI-Dashboard, Churn-Risiko*); on its own it keeps its
  English form (*Customer Success*).
- **Numbers, money and dates in German format:** 1.234,5 · 12.345 € · 12 % · 25.09.2026. Number fields accept both
  formats.
- **Longer words:** German compounds are longer, so buttons and pills wrap cleanly (`hyphens: auto` with `lang="de"`),
  and there is still no horizontal scroll at 390 px (#16).

### Mechanics (reuse Day 2's, do not rebuild)

- `ui.lang` (`"en" | "de"`) in the persisted slice (a shape change: bump `version`, `migrate`, deep `merge`, #9);
  `LangProvider` + `LangSwitch` from `lib/i18n.tsx`; text written as `tt(en, de)` from `lib/lang.ts`; data files read the
  language through getters / `lazyRecord`, so nothing is frozen at import; `<html lang>` follows the choice.
- **Stored answer values stay the English constants** and are only *displayed* in German (label functions, as Day 2's
  `ownerLabel`), so checks, answer keys, the mentor fill and a language switch mid-task all still agree.
- The export is built in the active language; the **file name stays English** (CURRICULUM-GUIDE §7).
- Every German string is written by hand next to its English one. No automatic dictionary layer that swaps strings at
  runtime (day7's `lib/i18n/` was dropped for good reason), and no raw machine translation left unreviewed.

### Coverage check before a day ships (adds to #10, #19)

1. Switch to DE and walk every card, block, help, clue, missing entry and the export: no English sentence is left.
2. Every English word left in a German sentence is a term from the table or `glossaryDe.ts`, and renders as a glossary
   link; no invented German coinage stands in for a listed term.
3. Numbers, money and dates are in German format; a number field accepts "1.234,5".
4. Mentor bar in DE: *Fill all model answers* → every missing list empty → the export downloads in German.
5. Switch back to EN mid-task: every answer is intact and every check gives the same result.
6. 390 px in DE: nothing overflows.

## 33. A credible YouTube video, when one genuinely exists for the topic, is embedded as a supplement — never as a replacement

Material has been text-and-diagram only so far. Some topics already have a short, credible video
that explains the same idea a card teaches — a recognised practitioner, a named business school, a
publisher already used as a reference (#4's citation standard), a documented talk. Where one
genuinely exists, embed it so a learner can watch as well as read. This is a mechanism standard
(CLAUDE.md's territory, #18): whether a given card gets a video, and which one, is a content
decision like any other source (the prompt's or the user's call, #18) — this rule only fixes *how*
one is embedded when it is used, so every day does it the same, safe way.

- **Credibility bar, checked like any other source.** The channel or speaker is identifiable and
  named (a person or institution you could put in a reference chip, #4), the content matches what
  the card teaches, and it is not an anonymous explainer, a reaction video, or AI-narrated summary
  content. When in doubt, do not embed it — a card with no video is never a defect; a card with a
  weak one is.
- **Supplements the card, never carries it alone.** Everything #11 and #22 require — the definition,
  the decision rules, the "In plain words" box — stays in the card's own text and stays sufficient
  on its own. A learner who never presses play, or who opens the site with no working connection,
  must still get the complete lesson. The video is where it adds something text cannot (seeing a
  technique performed, hearing a named practitioner explain it in their own words), not a substitute
  for writing the card.
- **Data-driven, one field.** Add an optional `video` to the shared material-section type
  (`lib/materialSection.ts`, #4): `{ title, channel, youtubeId, minutes, url }`. A card without a
  video simply omits it; nothing about the type or the renderer requires one.
- **Click-to-load, privacy-first, offline-safe.** Render a thumbnail (`https://i.ytimg.com/vi/{id}/hqdefault.jpg`)
  with a play control and the title/channel/duration printed under it, in a `Watch` block next to
  `Diagram` in `components/materi/kit.tsx`. Nothing from YouTube loads — no script, no tracking
  cookie, no iframe — until the learner presses play; only then does an iframe swap in, pointing at
  `https://www.youtube-nocookie.com/embed/{id}` (the cookie-reduced domain), `autoplay` off. This
  keeps the page's own load light and offline-first (#9, #16) and keeps a German audience's consent
  posture clean (#15's tone, the GDPR/consent material some CS days already teach) — nobody's viewing
  data reaches YouTube until they choose to watch.
- **Never autoplay, never silent-with-sound-on-load, always a visible, labelled, keyboard-reachable
  play control.** Caption the block the same way a diagram is captioned (#12's `Diagram` pattern):
  a `smallcaps` label, the video's title, its channel/speaker, and its length, so a facilitator can
  judge in one glance whether to show it live or assign it around the session.
- **Minutes budget (#3).** A short video (a couple of minutes) can be counted inside its card's own
  `minutes`. A longer one is marked plainly as optional and outside today's material minutes
  ("Optional · watch before or after the session"), the same way #29's Optional blocks are marked,
  so it never silently inflates the ~60-minute material budget.
- **Glossary and language stay in force (#19, #32).** A term the video uses that the card's own text
  does not already explain still needs a glossary entry. Prefer a video with captions (English at
  least, German where it exists) — the presenter is not a subject-matter expert (CURRICULUM-GUIDE
  §1) and cannot narrate over a video in a language they do not speak live.
- **Verify before shipping, and re-verify periodically.** Confirm the video is public, playable, not
  region-locked and not likely to be taken down (an official channel's own upload, not a re-upload),
  the same discipline CURRICULUM-GUIDE §4 already asks of a citation URL. Record the channel name
  next to the link so a later re-check is fast.
- **Degrade without breaking the page.** If a video is later removed or goes private, the block shows
  "This video is no longer available; the material above already covers what it demonstrated" instead
  of a broken embed or a console error — never a hard failure of the page.
- **Where it sits in the card.** After the primary teaching diagram and body, alongside or just above
  Sources (#12's material layout: title → scan line → In plain words → diagram → body → decision
  rules → sources → Mark as read). The SVG diagram stays the primary teaching artifact; the video is
  additional, not a replacement for building one.
- **Coverage check before a route ships:** every card that carries a `video` field has a reachable,
  credible, on-topic link with a named channel; every term the video uses that is not already
  explained in the card's own text is a glossary entry; the card's text alone (with the video
  ignored entirely) still teaches everything #11's reasoning coverage requires.

## 34. Two always-live rust "still missing" notices — one under every answer block, one above Export

The user's standing request (2026-09-28): a learner should never have to press Check or open the export
panel just to find out whether a block still has gaps. Rust already means "missing" in this course's own
colour vocabulary (#15: "rust — warning — missing items, an exceeded constraint"); this rule makes that
signal live everywhere instead of only inside a flagged field after a Check, and only after clicking Export.

- **This is about completeness, never correctness.** It reports that a field is empty, too short, or a
  required count is not yet met — never which classification, placement or bin is right. #4 and #16's
  "Check on request is the only place the app may mark anything" still governs *correctness*; this rule
  adds a second, always-on signal for a different, non-answer-revealing fact: *is this filled in at all*.
  A field a classification exercise already covers (#4) is not duplicated here with a second judgement —
  only presence, length or count is reported, in the same words `lib/missing.ts` already authors.
- **One live notice under every answer block** (`components/ui/BlockMissing.tsx` or the day's equivalent):
  it re-filters the same `MissingEntry[]` the Export notice uses down to that one block's own items (every
  label already states its own block, e.g. "Block 1.2: …" — filter on that prefix, no new ids needed) and
  renders them as a small rust list directly under the block, each entry clickable and jumping to (and
  flashing) its exact element (#2). It renders nothing, and takes no space, the instant that block's own
  requirements are met, and reappears the moment a value is cleared or shortened below them again.
- **One live notice at the Export bar**, shown whenever anything in the whole route is still open — not
  gated by clicking Export first. It disappears entirely once nothing is missing. Clicking Export or Print
  while something is open scrolls this notice into view and flashes its first entry, exactly as the old
  click-triggered panel did; with nothing missing it still downloads or prints immediately. The Export
  button itself is unaffected (#3): never disabled, always clickable.
- **No manual dismiss.** Neither notice has a "Close" the learner can use to silence it while something is
  genuinely still missing — the only way either one goes away is by completing the thing it names. (A
  route's *Optional* blocks, where a day has the Core/Optional split, are unaffected: their fields are
  already excluded from the missing computation, so their notice never has anything to show.)
- **One data source, no drift.** Both notices read the same `l1Missing`/`r2Missing`-style function per
  route; nothing is computed twice with different wording, and the per-block notice's total always sums to
  the Export notice's total.
- **Coverage check before a route ships:** clear every field of one block and confirm its own live notice
  names each gap concretely (#1's "concrete named items", never a generic "fill in the required fields");
  fill it and confirm the notice disappears without a Check or a page reload; confirm the Export notice's
  count matches a manual tally across every block's own notice.

## 35. Every route splits into Core and Optional — the shortest thread to the route's own objective, everything else collapsed

> **Extended from Day 8 by #44:** Core is chosen from the curriculum's own numbered task items first.

The user's standing request (2026-09-28, applied first to Day 4's two routes): every route, on every day from
here on, should feel shorter to a learner without a single question, card or figure being changed, removed
or dumbed down. The fix is never to cut content — it is to name, honestly, which of it is on the shortest
path to the route's own stated objective, and fold the rest out of the way by default.

- **Pick Core by the route's own objective, not by a fixed count.** Read the route's own header/title (its
  stated promise, e.g. "why customers stay: emotion, personalisation and loyalty") and pick the smallest set
  of task blocks that (a) each answer a piece of that promise directly, and (b) chain into one connected
  thread — each Core block's output is the kind of thing the next one would plausibly use, even if nothing
  is hard-wired to require it (#6 still applies: skipping an Optional block never breaks a Core one, it just
  narrows what that Core block has to work with, gracefully — see Route 1 Block 2.4's budget still computing
  correctly with zero measures chosen if Block 2.3 was skipped). There is no fixed number: Day 4 Route 1 (two
  levels merged, #30) used 2 Core blocks per level; Route 2 (one single seven-block chain) used 3. Pick
  however many the route's own objective genuinely needs and no more — the test is "does removing this block
  break the thread to the objective," not "is this block hard."
  **Ceiling (user decision 2026-10-01, from Days 6 and 7): Route 1 has at most four Core blocks** (Day 6 and Day 7: two per
  level), and Route 2 two (the plan's implementation block and the decision block); everything else is Optional, folded, never removed.
- **Core never depends on Optional (#40):** no Core block reads an Optional block's answer or needs a rule only an Optional card
  teaches; an Optional block is self-contained. Check it with #40's dependency checklist before the split is final.
- **A materi card stays Core if any Core block cites it** (`MaterialRefs`/its data equivalent), even when an
  Optional block also cites it — never collapse a card a Core block still needs. A card only *no* Core block
  cites becomes Optional.
- **Mechanism: `components/ui/OptionalSection.tsx`** (or the day's copy of it) wraps both the Optional
  material cards and the Optional task blocks: collapsed by default to one line (title, an `Optional` pill, a
  one-sentence reason naming what it deepens or repeats, a "Show this" button), one click reveals it exactly
  as if never wrapped. Never removed, never behind a passcode (#6) — a curious or ahead-of-schedule learner
  opens anything at any time.
- **The dossier ring, the page map's done/total, and the missing list (#1, #34) all count Core only**
  (`lib/progress.ts`-style `OPTIONAL_BLOCKS`/`isOptionalBlock`, and `optional` on the material registry): an
  Optional item is invisible to "how much is left," exactly like the Friday day's Core/Optional split (#29)
  now generalised to any day, at the user's request, rather than only the shortest day.
- **The tag is never only in the page map — it repeats on the card or block itself, everywhere a learner
  actually reads it.** Two places, both required, never one by omission:
  - **The page map (#28)**: every card and block pill that carries a done-state shows `Core` or `Optional`
    **always visible**, never only inside a hover/focus tooltip — a learner must never have to hover to
    learn this. On wide screens this is a small always-on caption **beside** the pill, on the same row (the
    row stays exactly as tall as the pill itself; a first attempt on Day 4 stacked it underneath instead,
    which read as cramped and doubled every row's height — the user caught this directly and it was
    corrected to sit alongside), in addition to the full name still appearing on hover/focus; on smaller
    screens it is inline next to the title in the mobile list. Both screen sizes must show the same
    information, never the mobile list carrying it alone. The wide pill for an Optional item is also visually
    distinct on its own (a dashed border, not a new colour — #15's palette is unchanged; Optional is a
    structural fact, not a warning or a correctness state).
  - **A jump into a collapsed Optional item opens it first, then lands on it — never onto a closed
    container** (the general rule already stated in #12). Give the Optional open/closed state its own small,
    session-only, non-persisted store (e.g. `store/useOptionalOpen.ts`, a bare `create()` with `open`,
    `show(id)`, `hide(id)`) instead of a local `useState` inside the collapse wrapper, precisely so the page
    map's jump handler can call `show(id)` before it scrolls. Once opened, a small "Hide" control puts the
    item back to one quiet line — collapsing is exactly as reversible as expanding, in both directions,
    without a reload.
  - **The page content itself**: a small `CORE`/`OPTIONAL` pill (`CorePill` in `components/ui/AnswerBlock.tsx`
    or the day's equivalent) sits in the header of every answer block, next to its `OBJECTIVE`/`JUDGED` pill,
    and in the header of every material card, next to its id badge — Core in the same teal/signal family as
    `OBJECTIVE` (a structural fact, never the warning rust or the attention amber), Optional in the same quiet
    neutral tone `OptionalSection`'s own collapsed placeholder already uses (the two reuse one component, so
    the wording and colour can never drift apart). This means the tag is visible both when a block is
    collapsed *and* the moment it is opened — a learner who expands an Optional block still sees it named as
    such once reading it, not only in a nav list they may have already closed.
- **The mentor bar's "Fill all model answers" (#7) still fills every field, Core and Optional alike**, so a
  facilitator can exercise the whole route regardless of what a learner would see collapsed.
- **Coverage check before a route ships:** state the route's own objective in one sentence; confirm every
  Core block is necessary to reach it and that skipping any one of them would leave a visible gap in that
  sentence; confirm every Optional block, left untouched, still lets the Core thread alone produce a complete,
  exportable document (mentor-fill the Core blocks only and confirm the missing list empties); confirm every
  materi card a Core block cites is not marked optional; confirm the page map labels every done-tracked item
  `Core` or `Optional` on both screen sizes **without needing to hover**, never neither; confirm the same pill
  also appears on every card and block itself, open or collapsed, in both languages; confirm a page-map jump
  to a collapsed Optional item opens it before landing, and that "Hide" re-collapses an opened one.

## 36. Understand from the picture, not from reading — every interactive diagram gets a "Walk me through it" story, and a picture beats a paragraph

The user's standing request (2026-09-29, from Day 5's "Effort against benefit" diagram): a learner, and the presenter who
is not a subject-matter expert, should be able to understand an interactive diagram by pressing **Next** a few times and
watching the picture change, without having to read a table or work out what each button means. Toggles alone (#20) made the
learner operate the picture; this rule makes the picture tell its own story.

- **No exception: every interactive element in the material has "The point" and a story** (the user's standing request,
  2026-09-29): every SVG diagram with a control, every clickable worked example, every scoring table or slider. The purpose is
  the classroom: the facilitator does not explain or click through the pictures; the learners follow each story on their own and
  the session is spent sharing experience. So each story must be complete without a presenter: it names the example company,
  shows the case that works, the case that does not, and ends on the point. Build it with the shared pieces in `kit.tsx`:
  `<ThePoint>` above the picture, `useStory([...{ title, say, look, apply }])` for the steps (each `apply` calls the diagram's own
  setters), `<Story steps={story.plan} step={story.step} onStep={story.go} />` next to the picture, and `story.leave()` inside
  every manual control. Reference: all twelve diagrams of Day 5.
- **Every interactive teaching diagram carries a story** (`Story` in `components/materi/kit.tsx`): one collapsed-by-default
  panel next to the picture, "▶ Walk me through it". Pressed, it becomes **Step n of N · title**, a short narration, a
  **👁 Look at:** line naming what to look at in the picture, **◀ Back**, **Next ▶** (**Start over ↺** on the last step),
  clickable step dots and **Explore on my own**. All controls ≥ 40 px, keyboard-operable, `aria-live="polite"` narration.
- **The story drives the real controls.** Each step sets the same state the learner's own buttons set (which segment, which
  value, which toggle), so the picture is the picture the learner can reproduce. The diagram owns the state; `Story` is
  controlled (`step: number | null`, `onStep`). The learner's own buttons stay exactly as before (**responsive buttons stay**);
  pressing any of them leaves the story (`null`, "Explore on my own") so the narration can never disagree with the picture.
- **"The point" first, always visible.** Every interactive picture opens with one teal box, **The point / Das Wichtigste**: the
  whole lesson of the picture in one to three everyday sentences, readable without touching anything. A learner who reads only
  that box has the take-away; the picture, the story and "What this shows" then show *why*.
- **No extra explanation boxes around the picture.** Do not add "Where this number comes from" or cost-breakdown panels
  under a diagram: the user found they add confusion, not clarity (Day 5, 2026-09-29). Where a number needs a reason, give it in
  one short phrase inside the story step that shows it ("€25,000 a year, mostly a specialist's time"). Labels in the picture use
  everyday words ("What it earns", "What it costs a year"), not the textbook term ("extra gross profit").
- **Every interactive text is glossary-linked (#19).** "The point", the story narration, "What this shows" and any caption run
  through `glossify` (`Story` and `Insight` in `kit.tsx` do it themselves; wrap other text in `<Gloss>`). Whenever a word in an
  interactive part is less than everyday (tailoring, break-even, margin, win rate…), it must be a glossary entry, with its
  inflected and synonym forms in `match` (e.g. "tailoring" under Personalisation, "the cost to beat" under Break-even), so the
  learner can click it like everywhere else.
- **A spotlight in the picture.** The step also moves a highlight inside the SVG (a dashed amber ring, `anim-pulse`, on the
  bar, node or region being talked about), so the eye lands where the sentence is. Colour is never the only channel
  (#15): the "Look at:" line says it in words.
- **Stories are plain and concrete.** Everyday words a colleague from another department would use; two to four short
  sentences per step; **three steps, and no detours: (1) the case where it works, (2) the case where it does not, (3) the point.** Step 1 and 2
  each set the picture and say in plain words what you see and why (the one thing that differs, e.g. "one clinic contract is
  big: €45,000" against "one shop contract is small: €12,000"); step 3 is the take-away in one or two sentences and what to do
  with it in the task. No build-up steps (introducing the company, defining the word, walking up a scale one value at a time):
  introduce names inline ("Weserdata, an example company, …") and leave the fine grain to the buttons. Use one everyday word
  for the thing ("a special offer") instead of the textbook term, and at most two numbers per step. **Step 1 introduces any named person or company** ("Meet …, an example company that …", and says whether it is the task's own case) and **the next step explains the central word with an everyday picture** (a tailor sewing to size, one-size clothes) before any use of it; a story never uses a term the learner has not just been given, and uses one word for one idea (the card and the story say the same word). One idea per step: the situation with the
  wrong or small case first, then the case that works, then the contrast and the take-away with an invitation to try the buttons.
  A learner must get the point with almost no effort: **at most about 25 words and two numbers per step**, one idea, no jargon
  (the word for a concept comes only after the everyday idea), and leave contrasts and side cases to "What this shows" and the
  buttons, with one line inviting the learner to tap them. If a first draft makes a reader ask "what is the point?", cut it again. Every number is **computed from the same constants and state that draw the picture**
  (never retyped), so story, picture, "What this shows" and the task's own arithmetic cannot drift. Terms explained in words
  the first time (a "break-even" is named and explained where it first appears in the story).
  The story shows the *method* on the worked-example company, never the task's own answer (#11, #24).
- **"What this shows" (#20) is now written the same way:** start with *In plain words:* and give the verdict in everyday
  language (what it earns, what it costs, what is left), then the numbers, then the rule of thumb. It is still always
  visible, still `aria-live`, and never replaced by the story.
- **Prefer a picture to a sentence when a picture is understandable on its own.** Where a concept can be drawn, so the
  learner sees it (a bar against a break-even line, dots moving between groups, a matrix, a flow), draw it as an SVG and
  let the reading be one sentence beside it; do not write a paragraph and add a decorative picture. If the SVG option is
  understandable at a glance, take it. Every SVG keeps `viewBox`, a `<title>`/`<desc>` of one string each (#10), legibility
  at 380 px, and its explanation in HTML beside it (#12).
- **Bilingual and glossary as always (#19, #32):** both languages written by hand, terms glossified; the German story keeps the
  common English terms.
- **What may skip a story:** a diagram with no `onClick`/`onChange` (static) needs none, as in #20; a graded task control
  keeps check-on-demand (#4) instead. A story never appears inside a task block, only in the material (#12).
- **Coverage check before a route ships (adds to #20):** for every interactive diagram, press Next through every step from a
  clean state and confirm: each step's picture matches its sentence; every number in the story equals the picture's number
  (recompute one by hand); pressing a manual button leaves the story; Back and Start over work; the spotlight moves; the
  story reads sensibly in both languages and at 390 px. **Reference implementation:** Day 5, `EffortBenefit` in
  `components/materi/diagramsA.tsx`.

**Update to #33 (2026-09-29): when a good video carries the long explanation, the card keeps only the gist.**
- Where a video passes #33's credibility bar **and** genuinely explains the idea well, let the video carry the long
  explanation: the card's own text is cut to the essentials (a plain-words box, the diagram, the decision rules the task
  needs, sources). The rules and the "In plain words" box (#11, #22) are never cut; they are what the task is answered from,
  and the card must stay sufficient for a learner who never presses play. Do not delete a card's sentences to "make room"
  for a video that has not been watched through and checked.
- **The Word and slide versions (#31) keep the gist only** and name the video: title, speaker or channel, length and link,
  under the card's heading, with the same "optional" marking. The long explanation lives in the video that the website embeds.
- **Find and verify before use.** Search for candidates (an official channel of a school, publisher or firm, or a named
  lecturer), then **check the facts, do not trust the search snippet**: the oEmbed endpoint
  (`youtube.com/oembed?url=…&format=json`) returns the exact title and uploader; the watch page shows the length,
  `playableInEmbed` and whether captions exist (`curl` works for this). Record channel, length and the check date in
  `data/videos.ts` next to the id. Prefer the official channel's own upload to a re-upload, and a video with captions.
- **One place, one mechanism:** `data/videos.ts` (`Partial<Record<MaterialId, Video>>`) and `Watch` in `kit.tsx`, rendered by
  `MaterialCard` after the body and before the decision rules. The block says which minutes it uses ("Counted in this card's
  minutes" for about two minutes or less, otherwise "Optional · outside today's minutes"), names the video's language and
  captions, says in one sentence what it adds, and degrades to a note when the preview cannot load.
- **Say what was and was not verified.** A video that was checked for existence, embeddability, uploader and length but not
  watched through must be reported as such to the user, who previews it before teaching (a mentor is responsible for what is
  shown). The card's claims about a video's content stay as general as what was actually verified.
- **Privacy, honestly stated:** before play only the thumbnail image is requested from YouTube's image server; the player
  (`youtube-nocookie.com`) loads only on press. The block says so in one line.

## 37. Less text by default — a material card shows what the task needs, everything else is one "Show" away

The user's standing request (2026-09-29, from Day 5): a learner should not have to read a wall of text. The words that
answer no task question (the rule box, the video block and its labels, the extra explanations, side notes) stay hidden
until asked for, so attention goes to the picture and to what the task uses. Nothing is deleted and nothing is gated (#6).

- **Always visible on a card:** title, Core/Optional pill and minutes; the scan line; **In plain words** (the idea, one
  short box); the picture and the body a task draws on (its story, #36; its tables and worked pieces that a task block
  reads); Sources; Mark as read.
- **Hidden behind a quiet dashed "＋ Show …" row** (`components/ui/ShowMore.tsx`, one button, "Hide" when open, 40 px tall,
  keyboard-operable, `aria-expanded`): (1) **the decision rules** ("Show the rules this card gives the task (n)"); (2) **why it
  matters and how to read the picture** (the rest of the #22 box); (3) **the video** ("Show the video · n min", with
  "optional" in the label when it is outside the minutes, #33) — the block itself carries no "counted in this card's
  minutes" banner; (4) **anything the task does not read**: a side callout (law, context, a coaching question), a small
  note, a worked calculation the story already shows; write these in the card as `<ShowMore id part label>`.
- **How to decide what is "extra":** ask of every piece of body text, *does a task block in this route need it to answer, or
  is it context?* A piece a Core task block needs stays visible or is opened for the learner by the task (below). A piece
  only context, only Optional blocks use, or only repeating what the picture and story already say is hidden. When in
  doubt, hide it: it is one click away.
- **A task never lands on a closed part.** `MaterialRefs` (the "Draws on" / "Taught in" chips) open the rules, the
  worked calculation and the reference tables (`part` = `rules`, `calc`, `table`) of the card before they scroll there (`showCardPart`), the same guarantee as an Optional item (#12,
  #35). The rules (#11) are still required to exist for every task question; this rule only decides they are folded until a
  task chip or the learner opens them.
- **State is session-only** (`store/useCardMore.ts`, not persisted; `all` opens everything). Each Materi block has one
  button, "Show every extra explanation, video and rule" / "Hide the extra explanations", for a mentor, a reviewer or
  printing: the full text is always reachable in one press.
- **Written words are shorter too.** New card text is written for the visible layer first: one plain sentence per idea, no
  paragraph where a picture works (#36); rules, side notes and detail go in the hidden layer.
- **Word and slide versions (#31):** the visible layer is the body of the document; hidden parts go in an appendix per
  card, marked "extra", so the reader can skip them.
- **Coverage check before a route ships (adds to #11, #22, #33, #36):** open the route from a clean state and confirm a
  card shows only the visible layer; open every Core task block's "Draws on" chip and confirm the rules (and any worked
  calculation) it needs are open on arrival; press "Show every extra explanation" and confirm nothing is lost; confirm the
  glossary still links a term once per card whether its first mention was hidden or not; confirm both languages and 390 px.
  **Reference implementation:** Day 5 (`components/ui/MaterialCard.tsx`, `ShowMore.tsx`, `store/useCardMore.ts`).

## 38. Decisions are free: a check is a hint, and an answer that differs from the model still exports

The user's standing request (2026-09-29): in a part where the learner *decides* (choose, prioritise, fund, rank, commit),
there is no single right answer. What is required is a clear reason, not agreement with the model. So a check may hint and
never judge, and it must never stand between the learner and the export.

- **Export depends only on completeness and a stated reason** (#1, #34): every field filled, a minimum length where a
  reason is asked for. It never depends on the learner's choice matching the reference, on a check having passed, or on a
  constraint the learner is allowed to weigh (a budget, a cap on how many, an order). Such a constraint is shown live as a
  hint (over by …, left …) and printed in the exported document as a plain fact ("€X over budget"), never as a missing item.
- **What still counts as missing:** an empty field, too short a reason, a required count of items (three chosen, not four)
  where the task defines the shape of the answer, and a number where the field is defined as a measurable trigger.
  Not: which option, which order, which side of a budget.
- **The wording of a check in a decision part is a hint**, in the "a question, not an answer" voice (#4, #16), and each
  `CheckBar` says once a check has been requested: "A check is a hint, not a verdict. If you decide differently and can
  give a clear reason, you can still export." Amber, never red; no tick, no cross (#15).
- **A different choice needs a reason the file can show.** Where a check would flag a choice (over budget, a role that
  does not follow the ratings), the field that asks for the reason stays required, and the export carries both the choice
  and the reason, so a reader can judge it.
- **Mentor tools:** the answer key and worked answer still give the reference and why other options are rejected (#7, #23),
  and add a note that a different, well-reasoned choice is acceptable in a decision part.
- **Coverage check before a route ships (adds to #34):** for every decision block, deliberately pick the "wrong" option
  (over budget, against the model), fill the reason, and confirm the missing list is empty, the Check only hints, and the
  export downloads and states the choice; add one line to the day's verification script for it.

## 39. A live document never competes with the questions: it sits at the bottom, full width, and can be hidden

The user's standing request (2026-09-29, from Day 5 Route 2's "Live memo"): the assembling document was a sticky column at the
right edge (and a fixed strip on phones), which took a third of the screen from the questions the learner is working on. This
applies to **every** report-builder in every day (a memo, a plan file, a dossier preview) and to any similar side or floating
panel that repeats the learner's own answers back to them.

- **Position:** after the last answer block and before the Export bar, in the normal page flow, full width (the document itself
  centred at a readable width, about 48 rem). Never sticky, never fixed, never beside the questions, never a bottom strip.
- **A visible "Hide the memo" / "Show the memo" button** in the panel header (`aria-expanded`, `aria-controls`), open by
  default because it sits below the work, session-only state. When hidden it costs one header line.
- **Same renderer as the export** (#16): what the learner reads is what they download; it is drawn only after hydration so the
  date and stored answers never mismatch the first paint; `print:hidden`.
- **A route with a live document has no two-column task layout**, so the block cards get the full width and the page map (#28)
  stays the only side element. Add a page-map entry for the live document only if it helps; it is never Core or Optional.
- **Coverage check before a route ships:** at 1280 px and 390 px the questions span the full width; the memo appears below the
  last block and above Export; Hide collapses it to one line and Show restores it with the current answers.

## 40. Core never depends on Optional — every Optional block and card stands on its own

The user's standing request (2026-09-29, from Day 4's decide part): tasks that lean on each other confused learners, above all when a
Core block needed an answer, a figure, a rule or a concept that only an Optional block or an Optional card supplies. A learner who
skips the Optional part (as #35 invites them to) then meets a Core question with no context. This tightens #35 for every day.

- **A Core block may use only:** the case brief, what it prints itself, other **Core** blocks' answers, and **Core** cards. Never an
  Optional block's answer, never a rule or concept taught only in an Optional card, never a FIND IT line, help text, soft pointer
  or "from Block x.y" label that names an Optional block.
- **If a Core block needs a value an Optional block computes, the Core block computes and prints it itself** from Core inputs (Day 5:
  Block 2.3 prints each segment's value from the learner's own Block 2.1 placement, with the value rule next to it). **If it needs
  a rule taught in an Optional card, that rule is repeated in a Core card's rules** (Day 5: the value rule in A7 as well as A6).
- **An Optional block is self-contained:** it may *read* a Core answer (it is done after the Core thread anyway) but nothing in the
  route reads it back, and it does not need another Optional block to make sense. Deleting every Optional block must leave the
  Core thread complete, clear and exportable.
- **Across routes, the same holds:** Route 2 quotes only Route 1's Core answers, and its soft pointer jumps to a Core block.
  Describe an item by what it is ("a ready audit folder sent with every regulated proposal"), not by where it came from ("the
  folder from Route 1"), so the item makes sense to a learner who skipped that part.
- **Decide parts (#38) are the most exposed.** A decision block quotes its inputs in the block (the numbers and choices it needs,
  with their source block named), so the learner never has to scroll back through several blocks to reconstruct the context.
- **Coverage check before a route ships:** write a dependency checklist in the day's README — for every block and card: Core or
  Optional, what it reads from (block, card or brief), and ✓ or ✗ for "reads only Core and the brief" (for Core items). Every Core
  item must be ✓. Then open the route from a clean state, fill **only** the Core blocks, read every Core block's text, and
  confirm no question, label or help mentions an Optional block or needs an Optional card's rule.

## 41. An assumption question always points at where its clues are: doubt from the data, sign from a number you can watch

The user's standing request (2026-09-30, from Day 5 Block 3.6): "write the assumptions your decision rests on" left learners
blind, because nothing said where an assumption comes from. Every task, on every day, that asks for assumptions (a decision, a
plan, a forecast, a risk list) follows one recipe, taught in the material and repeated at the field.

- **The recipe, two sentences per assumption:**
  1. **"I assume …"** about one segment, customer group or option. Its clue is **what is still uncertain in the data**: a
     "data confidence" note, a figure resting on few cases, a group tagged by an easy criterion, a market estimate, a gap the
     brief names. Tie it to **what the learner's own plan bets on there** (the money they spent, or deliberately held back).
  2. **"I am wrong if … [a number] … by [a month].":** a sign the learner can **watch themselves** within the plan's time,
     compared with today's figure: a win rate, a conversion (tests to contracts), a count in the CRM, a cancellation rate.
     **Never** a market-growth figure or any external estimate: it does not move within the plan and the plan does not move it.
- **One assumption per group the plan still serves:** one for each group that receives the money (the plan's bet), one for a
  group deliberately left on the standard offer (the bet that it will not leave). None for a group the plan drops; nothing is
  riding on it. That is why a typical answer has three.
- **The data must be on screen and named.** The task prints a "data confidence" (or equivalent) line for every group and a
  baseline for every metric a sign may use (#16: only ask for values the UI prints). The assumption block itself says where they
  are ("Your core segments and their data-confidence notes are in Block x.y; today's figures are in the metric list below"), and,
  under #40, it quotes the learner's own groups and roles inside the block instead of sending them back to search.
- **Taught first (#11, #24):** the material card that covers deciding under uncertainty states the recipe as a rule and shows it
  on the worked-example company (a different case, #24), one example per kind of group (funded, left standard).
- **Help at the field:** a hidden "Show how to build an assumption" (`RevealHint`) with the two-sentence recipe and the two
  sources; the `ExampleAnswer` (#23) uses a different company. The field's check is completeness only (a number and a month
  present, #34, #38), never whether the assumption is "right".
- **Mentor worked answer (#23):** for each model assumption, name its doubt (the exact data-confidence line), what the plan bets
  there, why that number (half of the group, just above today's baseline, a stated tolerance) and why that month (when the
  item that produces the evidence is in use).
- **Coverage check before a route ships:** for every model assumption, point at the printed data-confidence line it comes from
  and the printed baseline its sign is measured against; if either is not on screen, the task is not ready.

## 42. Every answer field carries its own clue kit: every number and fact it needs, gathered in one place, each one click from its source

The user's standing request (2026-09-30, from Day 5 Block 3.6): to answer one field a learner had to collect numbers and rules
scattered over earlier blocks and cards (the 140 accounts and the contract value in Block 3.2's table, the €2.5m band under that
table and in Materi B1, the "40 of 140" in the board's box, the start months chosen in Block 3.5). Nothing told them which ones
mattered or where they were. #21 already fixed this for calculation fields; this rule extends it to **every** form field, on every
day: free text, decisions, assumptions, tripwires, challenges, choices.

- **One "clue kit" per field**, inside the field's help (the `WritingHelp` / `RevealHint` panel the field already has, collapsed
  by default like every clue, #21): a short **"What to look at"** list naming **every** number, rule, earlier answer and fact the
  model answer uses, and nothing it does not use (#21: no decoys). Each entry shows the value itself, not only its name
  ("Compliance-first accounts: 140", "High band: €2,500,000 or more", "Your role for Compliance-first in Block 3.2: Core").
- **Every entry is a button to its fuller context:** it scrolls to the source (a table row, a rule line in a card, the learner's
  own earlier answer, the brief) and flashes it with the amber reference flash (`scrollToAndFlash(id, "ref")`, #11, #21); a
  source in a collapsed card or Optional part is opened first (#35, #37); a source on another route navigates there (#12).
  Give every such source a stable id.
- **The learner's own earlier answers are quoted live**, not described ("Your core segments: …", "Your start month for the key
  account team: 2"), computed from the store, so the kit is right whatever the learner chose. Under #40 a Core field quotes only
  Core blocks and cards.
- **Rules and bands are quoted in words with their numbers**, next to the fact they apply to (the €2.5m band beside the recomputed
  profit pool), so the learner never has to remember where a threshold was printed.
- **Then the frame:** below the "What to look at" list, the numbered steps of how to build the answer (what to check first,
  what to keep, what to change; or the two-sentence assumption recipe of #41). The frame names the steps, the list supplies the
  inputs; neither gives the result (#4, #24).
- **Mentor worked answers (#23) reference the same entries**, so mentor and learner speak about the same numbers.
- **Coverage check before a route ships:** for every field, take the model answer and underline every number, rule and earlier
  choice in it; each must appear in that field's clue kit with its value, and each kit entry must land on and flash its source
  in the browser. A number in the model answer that is not in the kit, or a kit entry that lands nowhere, is a defect.

## 43. Every number a learner writes into a decision gets a method, a calculator and a check — above all in Route 2

> **Conditional from Day 8 by #44:** this rule applies only where that day's curriculum itself asks for a calculation. Days 6 and 7 are exempt from #44 for now and keep this rule as built.

The user's standing request (2026-09-30, from Day 5 Route 2, Blocks 3.5 and 3.6): the management-decision route asked for many
numbers inside free text (a trigger's threshold and month, a pickup point, an assumption's sign, the board's challenge, a
tripwire), but gave no method for any of them. The clues sat blocks away, and nobody noticed them; the model answers used numbers
(80%, 26%, 28%, 3%) that could not be derived from anything on screen. This is the standing weakness of Level 3 tasks. It ends
here: **no number in a task is ever a guess.** #21, #24 and #26 already did this for calculation fields; this rule applies the
same to every number that appears inside a decision, trigger, pickup point, assumption, tripwire or challenge answer.

- **Every such number is derived by a named method from numbers printed on screen**, and the model answer uses that method, so
  the mentor can show the arithmetic. The standard methods (use the one that fits; a day may add its own, taught in the material):
  - **Band threshold (how many to stay in a band):** band limit ÷ value per unit, rounded up. (Day 5: €2,500,000 ÷ (€56,000 × 38%)
    = 117.5 → 118 of 140 Compliance-first accounts must hold for the segment to stay High/Core.)
  - **Payback count (how many results an item needs to earn its cost):** item cost ÷ profit per result, rounded up. (Day 5: key
    account team €48,000 ÷ €21,280 = 2.3 → 3 extra contracts.)
  - **Cost of waiting (when a postponed item is worth reopening):** item cost ÷ profit lost per unit, rounded up. (Day 5: managed
    package €36,000 ÷ €2,200 = 16.4 → 17 lost Hands-off customers.)
  - **Baseline plus target (a customer-response tripwire):** today's printed figure, and a threshold that beats it, with the
    size of the step justified by one of the methods above.
  - **Timing (the month):** start month (the learner's own) + weeks to be in use (printed on the item) + the customer's decision
    time (printed), no later than the month that still leaves time to act.
- **No free-floating judgement numbers in a model answer.** If a model answer's number cannot be recomputed from the screen by
  one of these methods, change the number or add the missing input to the screen. Two answers in the same route that measure
  the same thing in the same month use the same threshold (no 26% here and 28% there).
- **At every such field, three helps, all collapsed by default (#21, #24):**
  1. **Clue kit (#42):** "What to look at", every input with its value, each a link to its source.
  2. **"Show the method":** the formula in words, no numbers ("Item cost ÷ profit per contract, rounded up"), naming the
     material card that teaches it.
  3. **Automatic calculator (#26, `FormulaBuilder`):** one input per part, the formula rewritten live with the learner's values,
     the result, and "Use this number"; "Check my figures" flags each wrong *part* in amber with a clue naming the table and row
     to read it from, never the value. The calculator checks the **arithmetic of the learner's own inputs**; it does not force
     the model's choice (#38): a learner who argues for a different band or item still gets their own number checked.
- **Taught first (#11, #24):** the Materi B card for each method works it through on the worked-example company with different
  numbers, and states each method as a rule. The story (#36) of that card walks one example.
- **The field's check (#34, #38):** completeness only for the sentence (a number and a month present); correctness of the number
  lives in the calculator's part check, as a hint that never blocks export.
- **Mentor worked answer (#23):** every number in the model answer has its steps (inputs with their source, operation, rounding,
  result), so the facilitator can explain it in one breath.
- **Coverage check before a route ships:** list every number that any model answer in the route contains. For each: the method
  it comes from, its inputs on screen, its calculator giving the same result, its clue kit linking every input, and the material
  card that teaches the method. A number with any of these missing is a defect, and Route 2 is not done.

## 44. From Day 8: follow the curriculum — numbers only where that day's curriculum asks for them, and every opinion carries a reason

The user's standing decision (2026-09-30, after reviewing Day 6): the CS course follows the curriculum plan
(`Strukturplan_*.xlsx`, the day's own column). Day 6 had grown calculations the plan never asks for (churn arithmetic, payback
counts, coverage shares, tripwire thresholds derived by formula). The plan's Day 6 asks for reasoning about customer behaviour,
signals, measures and a system decision; its only arithmetic is a budget and a score (Effect × Sustainability × Feasibility).
Classifying, sorting and tagging exercises were fine and stay as they are.

**Scope: Day 8 and every day after.** **Day 6 and Day 7 do not follow this rule for now**: they stay as built until the user
gives day-specific feedback (Day 6 first). Days 1 to 5 are not retrofitted unless asked. Do not change Day 6 or Day 7 on the basis of
this rule.

**(DL) For the Digital Learning course this rule applies from Day 1**: there are no legacy DL days. The plan is
`One Stop Digital Learning - Strukturplan 11_F_128 (04-26).xlsx`, one column per day. Checked against the plan (2026-10-08): **the plan contains no
calculation at all.** The only numbers it prints are Day 1's budget (€50.000) and time limit (2 months), Day 1's drop-out rate (40 %)
and Day 16's abandonment rate (70 %); every other day says only "Budget begrenzt" and a time limit in weeks or months. Its recurring
structure is a three-criterion **judgement** of each measure (*Nutzerwirkung / Wirkung, Aufwand, Risiko*), rated by the learner, with
no formula behind it. So by default a DL day has **no calculator, no formula help and no "numbers you can defend" method** (#21, #24,
#26, #43 do not apply); a printed figure is read and compared, never derived. Read the day's column again before building: if a
later revision of the plan adds a real calculation, #21–#26 and #43 apply to that calculation only.

- **Numbers only if the curriculum asks.** Before building a day, read its column of the plan (levels, tasks, case study, transfer
  project, evaluation line). A calculation, a formula, a calculator or a "numbers you can defend" method is built only if the plan
  names it (a budget to respect, a scoring formula, a cost comparison, a calculation in the case). Otherwise the case may still
  print figures, but the learner **reads and compares** them; the learner is never asked to derive a new number by a method.
- **Figures the case prints are fine; figures the task makes the learner compute are not** (unless the plan asks). A budget, a
  time limit and a printed baseline ("14 stalled deals today") stay as constraints and reference points. A trigger, a tripwire or a
  sign can say "not below today's printed figure by month 4" without any formula behind it.
- **A number the learner must write is shown, not calculated (user feedback on Day 6 Route 2, 2026-09-30).** Where a decision field
  needs a number (a trigger, a pickup point, an assumption's sign, a tripwire, a cost to compare), the field has a collapsed
  "Show the numbers you can use": each number the printed figures support, why it is that number (one or two everyday sentences),
  where every input is printed (each a button that scrolls to and flashes its row), and a button that puts it into the answer.
  The learner chooses the number and words the sentence; there is no calculator, no "Check my figures", no "Use this result". A
  number that depends on the learner's own plan is read live, and says what to choose first when it cannot be shown yet. The same
  constants produce the panel, the model answer and the mentor's worked answer (#23), so they cannot drift; the material explains
  how such numbers are found (so the learner can say why they chose one), and never asks the learner to do it in the task. The Word
  version prints the same numbers as tables.
- **A sentence with slots gets a ready-to-use kit (user decision on Day 6 Route 2, 2026-09-30).** Where the learner writes a sentence with
  fixed parts (a trigger: metric, worse-than number, month, action; a pickup point), the field has a collapsed kit that shows the sentence and,
  for each part, what to write, why, and where each printed input comes from (a button to its row), with a button that puts the part into the
  sentence. The learner adds the parts one at a time, sees the sentence grow and learns what each part is; a different choice is fine with a
  reason (#38). Actions are things the owner can do alone that change one item, and the first of each item is the model's. This gives the parts
  of the answer and so deliberately overrides #4's "clue, not answer" for these fields; it never names an Optional card (#40).
- **A judgement always carries a reason.** Everywhere the learner chooses, ranks, prioritises, decides or gives an opinion, the
  field asks for a reason in their own words (minimum length, #34; free per #38: a different choice with a clear reason still
  exports). The check is a hint about completeness and reasoning quality, never about the choice matching the model.
- **Clues still say where the evidence is (#42).** Without formulas, the clue kit points at the printed statements, rates,
  baselines and earlier answers the reasoning rests on, each one click from its source; the frame gives the steps of the
  reasoning, never the conclusion.
- **Core follows the curriculum's numbered items first (extends #35).** The plan's numbered task items, the case-study
  tasks and the Level 3 inputs and requirements are the first candidates for Core; anything the plan does not ask for (an
  extra instrument, a derived number, a side exercise) is Optional or left out. Pick Core by the route's objective as before
  (#35, #40), and write in the README which plan item each block answers (the coverage check of #30).
- **Where a calculation is asked for by the plan**, #21, #24, #26 and #43 apply in full for that calculation only: taught in
  the material with a worked example on another company, sources under the field, formula on request, calculator with per-part
  clues, worked answer with every step.
- **Say it in the README.** Under "Notes on deviations", list every place the plan asks for a number and every place a figure is
  only printed, so the user can see the rule was applied.
- **Coverage check before a day ships (adds to #10, #30):** read the plan column and list each calculation it names (none is
  common); confirm every calculator, formula help and number method in the day answers one of them; confirm every choice or opinion
  field asks for a reason; confirm the plan's numbered task items each map to a block, and that Core is drawn from them.

## 45. From Day 8: the case-study prioritisation block follows Day 6's Block 2.3

The user's standing decision (2026-09-30, after comparing Day 6's Block 2.3 with the curriculum plan): the block is already what the
plan asks for (develop measures, prioritise them, judge them with a scoring formula inside a budget and a time limit, and its only
arithmetic is printed or automatic), so later days reuse it as the standard. **From Day 8.** Day 6 stays as built (it is the reference
implementation: `day6/components/task1/Part2.tsx` Block23, `day6/data/measures.ts`, `day6/lib/checks.ts`); Day 7 is not changed by this rule.

**When it applies:** the day's plan has a case study that asks the learner to choose or develop measures, prioritise them and
evaluate them by a named formula (Day 6: Effect × Sustainability × Feasibility) within a stated framework (Day 6: €140,000 and six
months). A day whose plan has no such case study does not get the block (#44).

- **Shape, in Route 1 (Level 2, after the tagging or analysis blocks):** the plan's own criteria and framework, printed once; a
  list of about nine candidate measures, each printed with what it does, what it changes for the customer, its cost, its weeks and
  what it runs on (a process or system / one person or a one-off / a named role); the learner picks exactly the number the plan
  asks for (Day 6: three). The list carries deliberate weak options (a discount, more of the same messages, a measure that rests on
  one person) so that choosing is a judgement, not a scan.
- **A category label after the weeks, taken from the theory in the material.** Every candidate prints, right after its weeks, the
  category of the day's own framework it acts on (Day 6: the three areas of Materi A3, plus "Price" for the one measure no customer
  statement names), as a small pill and again in the chosen card's header. It is a fact about the measure, never the answer (the
  factor the learner tags stays hidden) and never a score. One line above the list says which categories the case's evidence names
  and which it does not, and the material's decision rules state how to read the label. The label helps the learner see that not
  every option can be right; it does not rank the strong options against each other (durability and the judged scores do that).
  Add a check that no printed evidence statement names the category used to rule an option out.
- **Per chosen measure:** the learner tags what it really builds (the day's factors, or none), then scores each criterion of the
  plan's formula on a small scale (Day 6: 1 to 3). The app multiplies the scores; the learner never multiplies. Where a criterion
  follows from a printed fact (Day 6: sustainability follows from what the measure runs on) it is checked as a rule, in the
  material first (#11); criteria that are judgements (Day 6: effect, feasibility) are never marked right or wrong.
- **A reason for every judged score.** Following #44, each judged criterion carries a short reason in the learner's own words
  (what changes for the customer, why it can be done inside the time limit), with a clue kit pointing at the printed description,
  weeks and cost (#42), and an example answer (#23 update). A reason may be a single sentence; a missing one is a named missing
  item (#1, #34).
- **The budget and the time limit are a live hint, never a lock (#38):** a bar of the chosen costs against the budget, an "over by …"
  reading, and the same plain fact printed in the export. Going over is allowed with a stated reason.
- **Then the order and its reason:** the learner puts the chosen measures in priority order (undo/redo, #16), a check names any
  measure that sits above one with a higher score ("if deliberate, say why"), and one reason for the first priority is required.
- **Check on request (#4, #16):** the check reports how many tags and how many rule-based scores hold and outlines the flagged
  ones with a clue that asks a question; it never names the right factor or score. Checks are counted, never punished.
- **The system that runs the measures** (the plan's "design a simple system" item, Day 6: Block 2.2) is a neighbouring block: when
  the plan asks for it, it is planned next to this one, and the Core/Optional choice (#35, #44) is made from the plan's numbered
  items, not from where the blocks sit.
- **Mentor tools (#7, #23):** the answer key gives the reference picks, tags and sustainability scores with a reason for each rejected
  option, plus the note that a different, well-reasoned choice is acceptable for the judged scores; a worked answer shows each score
  and the product.
- **Coverage check before a day ships:** the plan's formula, framework and number of measures are each mapped to a control on the
  page; every rule-based score has its rule in the material; every judged score has a reason field; over-budget with a reason
  exports.

**(DL) How the block carries over.** The DL plan has the same shape on almost every day (Level 1 *Arbeitsauftrag 2* and the Level 2
*Fallstudie*: "Bewerten Sie jede Maßnahme (Nutzerwirkung, Aufwand, Risiko), treffen Sie eine Priorisierung, begründen Sie"), but
**no formula**. So the DL block keeps the shape (a list of candidate UX measures with what each does, what the user notices, its
effort and what it depends on; the learner picks the number the plan asks for; per chosen measure the learner rates the plan's own
three criteria on a small scale, with a reason in their own words; a live hint against the stated budget and time limit that never
locks; then the priority order with undo/redo and one reason for the first priority) and **drops the multiplication and any "score"**:
the three ratings are shown side by side, never combined into a number the app ranks by. The plan's closing question ("Welche
Information fehlt Ihnen?") becomes a required, free-text field. The category label of this rule (the theory's own area, printed after
the weeks) is the day's own framework (Day 3: the types of kognitive Belastung; Day 4: the motivation drivers; …) and is a fact about the
measure, never the answer. Weak options are deliberate and typical for DL: a visual-only fix when the problem is structure, a reward
mechanic (badges) when the problem is unclear goals, a technology-heavy fix with little data.

## 46. Every item, case and term is explained down to earth: a scene, who does what, and every piece of context the reader needs

The user's standing request (2026-10-01, from Day 6 Block 3.5): a reader who knows the English words can still fail to understand a card,
because the sentence is correct but short, and the context it assumes is not on the screen ("One record per customer for all three teams,
with open signals. Spends on: every team (internal) · its trigger counts a share of customers (coverage)."). The learners are working adults
from another field and the presenter is not a subject-matter expert (CURRICULUM-GUIDE §1), so a description is not finished until someone
who has never met the case could repeat it in their own words. This applies to **every description a learner reads in the material and in a
task**: an item card, an option, a measure, a case fact, a label, a status line, a rule.

- **Say what it is, in everyday words, before the label.** One plain sentence ("A shared file on each customer that sales, service and
  marketing can all open") before the technical name, and the name only after.
- **Give a scene.** One concrete sentence about a situation in the case company that shows the item in use ("Today a customer writes to
  service about a delay and sales does not know; with the shared record, the salesperson sees it before the next call"). A scene is
  not a second example in the material; it is one line in the card itself, in the case's own world (#16: facts only from the case; anything
  invented is labelled Case assumption).
- **Say who does what and what changes for the customer.** Name the person or team that acts and the one thing a customer notices.
- **Explain every status or label the card prints**, in a short line the first time it appears or in a one-click help: what "Rests on",
  "Needs first", "response shows after", "Spends on", "its trigger counts" mean, with a number from the card in the example. A label
  with a value and no meaning is a defect (#19 for terms, this rule for the card's own labels).
- **Name what a number counts.** "6 stalled deals must move forward" says which deals (the ones that stopped in the last six months), why
  six (the cost of the item divided by what one deal earns) and where that comes from, in one sentence beside the number.
- **Never assume background the screen does not show.** If a sentence depends on a fact printed somewhere else (a table, an earlier block),
  it quotes that fact in place, or links to it (#42). If the reader would have to guess what an abbreviation, a role or a time unit means,
  it is explained in place.
- **Write for the visible layer first (#37):** the plain sentence, the scene and the one-line meaning of each label are visible; the long
  reasoning stays behind "Show". A "What this item is" line must never be hidden.
- **Same rule in both languages (#32) and in the Word versions (#31).** The German is written by hand, not translated word for word.
- **Coverage check before a route ships:** for every card, option and label, cover the screen except that one piece and ask whether a
  newcomer could say, in their own words, what it is, who does what and what a number on it counts. If not, add the missing line. Ask a
  person who has not seen the case to read three cards aloud and say where they stopped understanding.

**Scope:** every new day from now on, and any card a day's content is touched for. Existing cards are not retrofitted unless the user asks
(Day 6's Block 3.5 item cards are the first candidates; Day 6 and Day 7 stay as built until then).

## 47. Level 3 as one decision frame with a live control panel (reference: Day 8 Route 2)

The user's standing decision (2026-10-03/04, #18), made while rebuilding Day 8 Route 2 and meant to be repeated on other days: *"we will make
something similar on other days"*. **Day 8 Route 2 is the reference implementation** (`day8/`: `data/route2Panel.ts`, `lib/r2Panel.ts`,
`components/task2/Panel.tsx`, `StepA.tsx`, `StepB.tsx`, `MentorCategory.tsx`, Materi B5, `ROUTE2-REDESIGN.md`). **Scope:** a Level 3 route adopts this form when
the user says so for that day (the user names the days); Days 1 to 7 and every other route are not retrofitted unless asked. Where a day adopts it,
this rule decides the structure and the mechanics; the day's plan decides the items, the tests and the two day-specific axes (#18). The decisions
and formulas of Day 8 are in `day8/ROUTE2-REDESIGN.md`; read it and copy from the reference, never from memory.

**Why:** the old Level 3 Core blocks asked for 15 to 20 fields, which learners did not finish, and several fields (owner, trigger, pickup, assumptions,
tripwire, board challenge) were not asked for by the plan. The learner also never saw what their decision does. A Level 3 plan item usually asks for a
vision, a selection, a measurement system, an optimisation process, a prioritised architecture and a decision despite an unclear forecast, and has no
grading rubric: so the route teaches by showing consequences, not by marking.

### The form

- **One task, one frame.** One task (Task N) and one export. Inside it, in this order: the **control panel**, **Step A · Build the system** (Core, the
  block that held the plan's architecture items) and **Step B · Decide** (Core, the block that held the decision), then **Go deeper** (the older
  blocks, Optional, folded, unchanged, self-contained, never read by the frame, not counted in the ring, the page map, the missing lists or the export's
  missing status, #35, #40), then the memo (full width at the bottom, Hide / Show, #39) and the export. Core stays at two blocks (#35); the old block ids
  are kept so the page map and documents do not break, only their titles change ("Step A", "Step B"). About **five written fields** plus at least one item
  set to "Now". The page map reads: Case, Panel, A, B, the Go deeper blocks (Optional), Export.
- **Step A:** every item (six to nine, from the plan) is set to **Now / After data is ready / Not now** (the tiers are the priority; no start month, no owner, no
  trigger per item; the one item that prepares the data offers only Now / Not now). Then **target vision in two sentences** and **what my plan gives me and what I give up**
  in the learner's own words. Each item card prints a scene (#46), what it moves, how much of the data it needs is ready (a printed Case assumption), its weeks to be in use, the
  live line "starts in month … and is in use from month …", and **a link "See it in the diagram ↑"**. A collapsed "Show how an architecture is built" repeats the building steps of
  the day's material.
- **Step B:** the technology decision (the plan's additional requirement; all options stay selectable, with their reasons in the mentor key), why, and **what I will watch and when I would stop**
  (a figure about customers, not the company's own output; the month it can first be read; the action). One plain hint appears when Step B and Step A disagree (wait while Step A builds;
  buy everything while Step A leaves it out). A collapsed **"Show how the system reads my decision"** says how the decision reads against the plan and ends in what to change.
- **Never blocks (#3, #38).** Over budget, a black box, a set that differs from the model: all still export, with the reason written; the export states the bars as facts. Missing means an
  empty field, a too-short reason, or **no item set to Now** ("you were asked to build the architecture"; #38's "a required count where the task defines the shape of the answer"): doing
  nothing is **incomplete, not "wrong"**. A position on the panel is never a missing item. Missing labels start "Step A:" / "Step B:" (`BlockMissing` takes a `prefix`), in both languages.

### The control panel (live, consequences, never a verdict)

Every choice redraws it at once. It is in the page flow at the top of the frame (not sticky, not a side column, #39; at 390 px it stacks, so check it there). It has:

1. **An architecture diagram that looks like a real architecture**, not a stack of boxes: layers with a direction of flow (what customers meet, the black box, the engines, the measurement
   and people layer, the base, the data preparation, where the data lives) and **links that can break**. A box is solid teal for Now, dashed amber for After data is ready, faded for Not now, with a
   short text note of its consequence and "in use month N". A link is solid teal when it works and **dashed amber with its reason in words** when it does not ("not measured", "no KPI system to read",
   "data used as it is", "no link to the KPI system"). A black-box item is drawn dark, marked "?", with no working link. **Every box carries a small tier switch** (Now / Later / Not now; Now / Not now
   for the item that prepares what the others need, exactly the options of its card) that writes the same state as the card's buttons, so the learner can change the plan while watching the picture (user
   request 2026-10-04, Days 8–12 and every later day using this form; "Later" is the short label of the day's "after …" tier, its full name in `title`), plus a **"Details on its card ↓"** link that scrolls to
   and flashes its card in Step A. The box itself is a `div role="group"`, not a button (no nested buttons). Colour is never the only channel (dashes and words).
2. **Exactly three range bars**: **Budget** (money on every funded item, Now and After data, against the limit, a dashed limit line; over is a hint) and **two day-specific bars** that follow the day's
   plan (Day 8: **Measurable**, the share of the money on items that are measured and whose data is ready; **Risk**, the share on a black box or on data below the bar). The two day-specific bars are **ranges**
   across the two scenarios of the day's main uncertainty (Day 8: a **data switch**, "as the brief says" / "15 points weaker"), with a marker for the active one, because the plan's additional requirement is a
   decision under an unclear forecast and a single number would pretend otherwise. Under each bar one plain sentence says what the position means.
3. **Four tests (three to four per day), hidden until asked for:** one button, "Show the four tests · 2 of 4 hold" (session-only state, `store/useR2Tests.ts`; any chip or link that points at the tests opens
   them first, #12). Each test is labelled *Holds* or *Open*, never a tick or cross. Under every open test: **the fact, the rule, and two ways to act**, as information, **never a question** (user decision: not
   everyone understands when asked back). The tests are the rules the day's material teaches; Day 8: *measurement comes first*, *every funded item has a purpose*, *data is ready when an engine starts*,
   *it fits the budget and the six months*. The count shows how many of the course's principles hold, not agreement with the model: a learner who decides differently and says why can still export.
   **Every open finding says where the problem is and how to fix it, with links (user request 2026-10-04, standard for Days 8–12 and every later day using this form).** "Fact, rule, ways" alone
   left learners unsure what was wrong and where to act. Each finding (`OpenDetail = { fact, plain, rule, where, ways: { text, go }[] }` in `lib/r2Panel.ts`) renders, in this order:
   **What is off** (the fact, bold) → **In plain words** (one or two everyday sentences on what would happen to customers or the money, written per day for that case, never generic jargon) →
   **Where in the diagram** (a button per involved item, `where`, scrolling to and flashing its box) → **Why it matters** (the rule) → **What you can do (you decide)**: numbered ways, each naming the
   card by the **title printed on it in Step A** and the tier button to press ("On the card “…”, press “Not now”"), with one **"Go to card: <card title> · €cost ↓"** chip per item in `go` that
   scrolls to and flashes that card. The budget finding says the minimum to cut and lists **every funded item as a chip, most expensive first**, never naming which one to drop (#38). A way that is
   only a written reason has no chip. Reference: `day8/lib/r2Panel.ts` (`testsOf`) and the open-finding block of `day8/components/task2/Panel.tsx`; copy them, then write each day's `plain` lines
   for its own case in EN and DE. `verify:calc` includes `plain` and every way's `text` in its learner-text checks.
4. **"What this shows"** (#20): one always-visible "In plain words" sentence under the panel, computed from the same state.
5. **No "good", "bad" or "wrong", no red/green, no tick or cross, no praise** (#15); teal and amber only; every state has a text or pattern channel.

**This form deliberately waives #16's "check on request is the only place the app may mark anything" and #4's "a question, not an answer" for the routes that adopt it:** the panel marks positions
live, and the reading tells the learner what they can do. It never blocks, never names a right answer as a verdict, and the learner decides (#38).

### The reading of the plan and the three internal categories

- **"Show how the system reads my plan"** (collapsed, under the learner's own "what it gives and what I give up"): one paragraph on how the plan stands, two fact lists (*what your plan gives you*, *what it costs or
  leaves open*, including what each After-data or Not-now item leaves unchanged and any budget left unspent), and **"To make it hold"**: concrete changes (which item to which tier, with the reason) and what
  the plan looks like after them ("with these changes N of M tests hold, Measurable …, Risk …"). The learner writes their own first; the reveal is never locked.
- **Three internal categories choose the wording (user idea, 2026-10-03); the learner never sees the category.** **1 · safe**: the basics are met (the base is mapped and measured before the engines; several
  plans can be safe). **2 · fair**: a base exists but a fundamental is missing or a better approach is available; the reading names what to watch and change to reach 1. **3 · clearly wrong**: tools or AI
  are bought without the base (an engine or the black box funded with no KPI system), or nothing is built; the reading says what to change to reach 1. The wording never says "category", "wrong" or "safe".
  Step B's decision has its own category (Day 8: staging 1; waiting 2; buying everything 2 when a base is funded, 3 when it is not). Only the **unlocked mentor** sees the category with its reasons, under
  Step A and Step B (`MentorCategory`); it is never exported and never blocks. Each day writes its own category rules from the same idea ("base" = what the day's material says must exist before the tools).
- **Time is derived, not an input.** Day 8: Now starts in month 1; After data is ready starts in the month the data-preparation item is in use (so that item must itself be Now); an item is in use in month =
  start + weeks ÷ 4, rounded up; a test says whether everything is in use inside the plan. A day with a different prerequisite (not data) names its own "after …" tier and its own start rule.

### Numbers, material, mentor, export

- **No learner arithmetic (#44).** Every figure the panel uses is printed in the case brief ("the numbers today") and on the Core item cards, labelled Case assumption where invented, and **printed in Core**,
  so Core never reads an Optional block (#40); a `verify:calc` check keeps each figure equal to the Optional block's. All panel values come from **one data file** (`data/route2Panel.ts`) and **one logic file**
  (`lib/r2Panel.ts`) shared by the panel, the reading, the export, the model answer and the mentor's worked answer, so they cannot drift.
- **Taught first (#11, #24, #36).** The Core card before the task (Day 8: B5) is rewritten as **how the thing is built**: the building steps in order, the four tests as rules, the time rule, how to read the three
  bars, the decision rules, what to watch, and what a plan gives and costs; its worked example is on another company, drawn as a **small version of the same panel** with a story (three steps: it works, it does
  not, the point) and two toggles that break and mend a link. New glossary entries for every new term (architecture, engine, KPI system, A/B routine, data clean-up on Day 8), EN and DE. The #41 to #43 methods
  stop applying to the Core fields that were removed; Optional blocks keep what they have.
- **Mentor (#7, #23):** the answer key for Step A (reference set with a reason per item, a teaching note that a different reasoned set is acceptable and that doing nothing is incomplete) and Step B (the
  decisions and why the plan rejects each rejected one); a worked answer for the vision, the give-and-give-up, the reason and the watch sentence; a **computed** worked answer for the architecture whose steps
  and results equal the panel's numbers; examples for learners (`ExampleAnswer`) on another company. The mentor fill completes both steps.
- **Export:** one self-contained document in the active language, built by the renderer that also draws the live memo: the vision, the architecture table (item, when, cost, start to in use, what the panel
  noted), the bars as plain facts **for both scenarios**, the tests as *holds / open* for both scenarios, what the plan gives and what the learner gives up, the decision, why, what to watch, and the Go deeper
  blocks marked "not answered" when empty. **Never a category, a score, a tick or a cross.** The over-budget amount is printed as a fact.
- **Persistence (#9):** the route's slice changes shape, so bump the persist version and export a **pure** `migratePersisted(persisted, from)` (a funded item becomes Now; the removed fields are dropped), plus the deep
  `merge`; test it with an old-shape blob (zustand's persist API does not exist in Node, so the test cannot go through the store).

### How to carry this to another day

1. Read the day's plan column: the Level 3 inputs and requirements, the transfer project's numbered items, the additional requirement. Map each to Step A, Step B or the panel (a table in the README, #44).
2. List the items (six to nine) the learner can fund, each with a cost, the weeks to be in use, what it moves, and the prerequisite figure the day's material teaches (Day 8: data readiness), including one
   item the day's material calls a black box or a trap and one that prepares what the others need. Decide the layers and which links can break.
3. Choose the two day-specific bars, the uncertainty switch and three to four tests **from the rules the day's material already teaches**; write each test's fact, rule and two ways to act in EN and DE.
4. Write the category rules (what the "base" is; what counts as buying tools without it) and the Step B decision categories.
5. Rewrite the Core material card as in "Taught first", add the glossary entries, and move Core's printed figures into the case brief.
6. Build the data file, the logic file and the components by copying the Day 8 files; replace the day's constants; keep the mechanics.
7. Update the missing list, the progress ring, the page map, the export, the mentor key and guides, the store (version, migrate, merge), `verify:calc` and the README (routes table, deviations, #40 checklist).
8. Run the coverage check below. Tell the user what was copied unchanged and what differs, in the README under "Notes on deviations".

**Open design points of Day 8 (proposed to the user, not built):** make the measurement link three-level (solid: measured against a control group; dashed teal: before and after only, counted half; dashed amber:
not measured) so that skipping the A/B routine reads as a weaker approach (category 2, "a better approach exists") instead of a break. The user's answer decides; until then the link is two-level.

### Coverage check before it ships (adds to #10, #34, #38, #40)

Fill only Step A and Step B from a clean state and export: the missing list empties and nothing in Core names an Optional block. Recompute every bar by hand for each item and both scenarios (the checks do it);
turn the measurement item off, add the black-box item, flip the switch, and confirm every box note, link, bar sentence, test and reading line matches the picture. Do nothing (no item Now): a named missing item and
a reading that says what to change. Go over budget with a reason and export. Click a box: its card lands in view and flashes; click "See it in the diagram": the box does. Open a chip that points at the tests while
they are hidden: they open first. Switch EN and DE: no English sentence is left; no learner text names a category. Mentor bar: the category appears under Step A and Step B only after the passcode.
1280 px and 390 px. An old-shape blob loads. `npm run typecheck`, `verify:calc`, `build`.

## 48. From Day 13: one Core block and one Core card per level

The user's standing decision (2026-10-07): from Day 13 to the end (Day 16) learners also do other tasks the same day, so each level has
**one Core question and one Core material card**. Route 1 has two Core blocks (one per level) and two Core cards; Route 2 has one Core card and
one Core task (Day 13+: the #47 frame, Step A + Step B, counts as one Core unit). Everything else stays, folded as Optional (#35), never removed.
#40 still holds: each Core block cites only its own Core card, and the card carries every rule that block needs. Reference: `day13/`
(`lib/progress.ts` `CORE_UNITS`, `data/materialIndex.ts`). Later days are copied from Day 13.

**(DL)** This decision was made for CS Days 13 to 16 and is **not** carried over to DL by default: DL has no day that "shares its day with
other tasks" yet. #35's ceiling (Route 1 at most four Core blocks, Route 2 two) applies instead, until the user says which DL days get this
form. #47 (the decision frame with a live control panel) likewise applies to a DL Level 3 route only when the user names that day; its
architecture, tiers and tests are data and technology specific to CS Day 8, so a DL day that adopts it writes its own items, bars and tests
from its own material (for example Day 12: *Now / Later / Not now* for adaptive-learning and gamification building blocks, with the bars *Budget*,
*Time* and *User impact*; Day 16: the KPI system), never by copying Day 8's constants.

## 49. DL adaptation — what is different in the Digital Learning course

Written 2026-10-08 when this folder was repurposed from the CS course to **DL: UX/UI design for digital learning platforms**
(`One Stop Digital Learning - Strukturplan 11_F_128 (04-26).xlsx`). Rules #1–#48 stand as written, read through the "How to read the examples" note at the top.
This rule lists only what is *different*. Everything marked **Decided** is an adaptation made without a user answer; the user can
overrule it. Everything under **Open** needs a user answer before it is built.

### The plan and the days

The plan has the same eight-row skeleton as the CS plan (Wissen → Arbeitsaufträge 1 and 2 → Coaching → Fallstudie → Feedback →
Transferprojekt), so #12, #30 and #35 apply unchanged. Sixteen days, eight modules:

| Day | Module | Topic (short) | Level 2 case (the plan's own name) |
|---|---|---|---|
| 1 | M1 (1/2) | UX vs UI, user-centred design, principles of good learning interfaces | SkillUp |
| 2 | M1 (2/2) | Successful e-learning platforms, prototyping and testing, adaptive systems | LearnPro |
| 3 | M2 (1/2) | Learning psychology, cognitive load | EduCore |
| 4 | M2 (2/2) | Motivation, design psychology, design principles, evaluating them | MotivaLearn |
| 5 | M3 (1/3) | User-centred UX design | LearnBase |
| 6 | M3 (2/3) | Personas and user journeys | EduPath |
| 7 | M3 (3/3) | Accessibility and inclusive design; integrating and evaluating UX concepts | InclusiveLearn |
| 8 | M4 (1/3) | UX/UI basics: structure, visual hierarchy, interaction | StructLearn |
| 9 | M4 (2/3) | Information architecture, navigation, interactive elements, engagement | NavLearn |
| 10 | M4 (3/3) | Visual feedback, progress tracking, responsive design and accessibility | TrackLearn |
| 11 | M5 (1/2) | Gamification and motivation theories | GameLearn |
| 12 | M5 (2/2) | Adaptive learning, personalisation patterns, prototype a gamified platform | AdaptLearn |
| 13 | M6 (1/2) | Inclusive UX/UI, WCAG | AccessLearn |
| 14 | M6 (2/2) | Plain language, intuitive learning environments, testing inclusive solutions | ClearLearn |
| 15 | M7 (1 day) | Mobile learning UX, microlearning, responsive, cross-device | MobileLearn |
| 16 | M8 (1 day) | UX testing, analytics, KPIs, data-driven optimisation | DataLearn |

- **Use the plan's case.** Each day's Level 2 case is a fictional platform named in the plan (table above). It is briefed once and is
  also the company of the Level 3 route (#30): the plan's role ("Chief UX Officer of an EdTech company", "Chief Accessibility Officer", …)
  is the learner's role *in that company*. The Level 1 platforms in the plan (e.g. "LearnFast", "Plattform A/B") are the Level 1 evidence
  of the same case, as #30 merges them. **Decided.**
- **Plan row → site element.** Wissen = Materi. Arbeitsauftrag 1 and 2 = Route 1 Part 1 (Level 1). Coaching = the reflection between
  Part 1 and Part 2 (#30). Fallstudie (incl. Musterlösung) = Route 1 Part 2 (Level 2); the plan's *Musterlösung (Kernlogik)* is the
  source of the mentor key and the worked answer (#7, #23), never shown to the learner. Transferprojekt = Route 2 (Level 3), and its
  numbered "Erarbeiten Sie" items are the first candidates for Core (#44). **Feedbackrunde mit Management-Brille** (the "Input Level 3"
  questions and the "X vs Y" discussion lines) is a classroom session, not a learner task: it is delivered as a **facilitator debrief
  card in the mentor tools** (passcode-gated, never exported) for that day, not as a route. **Decided.**
- **No calculation** (#44, DL paragraph). Level 2 is a design case study: analyse, find causes, develop measures, prioritise, justify.

### The instrument is an interface

A CS instrument is a table, a funnel or a calculator. In DL the thing the learner analyses *is a learning interface*, and the plan says
so ("Sie erhalten Screenshots/Beschreibungen einer fiktiven Lernplattform"). So:

- **Each case ships a mock platform**: a few annotated screens (dashboard, course page, lesson, quiz, mobile view, …) drawn as inline
  SVG/HTML with `viewBox`, no images from outside (#9, #15). They are the evidence. Every problem the plan lists for the case ("unübersichtliches
  Dashboard, lange Texte ohne Struktur, kein Fortschrittsbalken") is **visible on a screen**, as a tappable hotspot that opens a one-line
  fact (what is there), never a verdict. The learner finds the problem; the screen never says "problem". **Decided.**
- **FIND IT lines (#16) name the screen and the hotspot** instead of a route and a widget ("Mock platform · Dashboard screen · tap the
  progress area"). Only ask for what the screen prints or draws.
- **Level 1 Task 1 may be answered without prior knowledge** (the plan: "ohne Vorwissen möglich"). It stays answerable from the screens
  plus the Materi; it does not require outside knowledge, and #11 still holds for every question. Perspective-taking questions ("Was frustriert
  Sie als Lernender?") are JUDGED and ask for a reason; sorting into the plan's categories (Orientierung / Verständnis / Motivation) is
  OBJECTIVE with check-on-demand (#4).
- **Gamification is shown, not given** (#15, DL note): badges, points, levels and progress bars appear on the mock screens as the thing
  under analysis. The site's own feedback stays the consequence-and-question voice.

### The site must pass its own course

A UX class cannot ship a site that breaks the principles it teaches, and a reviewer will check. For DL days, in addition to #16 and #10:

- **WCAG 2.2 level AA is the target** for every DL page: visible focus that is not hidden by a sticky bar (2.4.11), targets at least 24 px (2.5.8;
  our own floor of 40 px stays), contrast AA, content reflows at 320 CSS px / 400 % zoom without two-way scroll (1.4.10), no information by colour alone
  (#15), `prefers-reduced-motion` honoured, labels for every control, headings in order, page language set (`lang`, also on German passages).
- **Coverage check before a DL day ships** (adds to #10): walk the whole day with the keyboard only; zoom to 200 % and 400 %; run an automated
  accessibility check (axe or Lighthouse) and fix what it lists; read each page with one screen-reader pass (at least the first card and one task
  block). Record the result in the day's README. A learner-visible defect the course itself teaches against is a release blocker.
- **Cognitive load is a design constraint of the site** (the course teaches it on Day 3): #37 (less text by default), #28 (page map) and #36
  (a picture beats a paragraph) are not optional polish for DL.
- **Progress is visible and honest** (taught Days 10, 11): the ring means "filled in", never "correct" (#28, #15).

### Subject matter and context

- **Name the real frameworks** (CURRICULUM-GUIDE §4, MATERIAL-GUIDE): the standards, laws, theories and methods of UX and learning design,
  by their proper names, each with a verified source. The starting list is in `MATERIAL-GUIDE.md`; it is a list of *candidates to verify*, not
  of facts to paste.
- **European context, not US-generic**: BFSG and EN 301 549 for accessibility, WCAG 2.2 as the technical reference, DSGVO/GDPR for tracking and
  learning analytics, the EU AI Act for adaptive systems. Rules in flux are marked as such in the card and in the report (CURRICULUM-GUIDE §1).
- **Plain-language glossary (#19) is stricter here**: the learners are working adults who may have no UX background, and several terms
  (persona, heuristic, affordance, cognitive load, WCAG, ARIA) are jargon even to designers. Every one is an entry.

### Decided

1. All DL days live in one Next.js project, `playground-dl/`, inside this repository (#17). 2. Level 1 and 2 merge into Route 1, Level 3 is Route 2 (#30). 3. Deliverable names
and export file names are in CURRICULUM-GUIDE §7 (`1-{name}-dayN-l1l2-ux-analysis`, `2-{name}-dayN-l3-ux-strategy`). 4. DL uses the **Ocean palette** (#15; the user's choice, 2026-10-08). 5. The mentor passcode is unchanged (#7).
6. English is written first (CURRICULUM-GUIDE §1); German follows #32. 7. No DL Friday form (#29) and no Day 13 to 16 form (#48) until the user says so.

### Open (ask before building Day 1)

1. Default language: English first with EN | DE (as CS), or German by default because the plan, the learners and the provider are German?
2. ~~Accent colour~~ Decided: Ocean (#15).
3. Repository: one repo with `dayN/` folders (current), or one repo per day as CS did? The existing `playground/` folder is a copy of CS Day 13 with its own `.git` pointing at `AION-CS/aion-cs-day13`: never push from it; DL days are clean copies without `.git`.
4. Which DL days, if any, are Fridays (#29), and which share their day with other tasks (#48)?
5. Does the facilitator debrief card (Feedbackrunde) belong in the mentor tools, or should it be left out?
6. The CS files still in this folder (`Module1-Retention-Muchson.pptx`, `Perkenalan-Muchson-Attoyibi.pptx`, the two CS Strukturpläne, `deploy-log.txt`): move to a `reference-cs/` folder, rebuild for DL, or delete?

## 50. DL plan fidelity and the adult-learner supplement

Written 2026-10-08 after a full read of the One Stop workbook (all three sheets; *English* and *Bahasa Indonesia* are translations of *Deutsch*). It
**supplements** #1–#49: it adds, it removes nothing, and where something here collides with an existing rule or with the plan itself, the collision is
listed under "Pending decisions" and **nothing is built on either side until the user chooses**. The audience is senior professionals at a German
training provider, in an eight-hour live day: keep it to what is sensible and good; do not build for completeness' sake.

### What the plan is made of

- **A day is eight UE (Unterrichtseinheiten), one row each:** UE1 Wissensvermittlung · UE2 Level 1 Arbeitsauftrag 1 (*Grundlagen strukturieren*) · UE3 Level 1
  Arbeitsauftrag 2 (*Bewertung und Priorisierung*) · UE4 Coaching, transition Level 1+2 · UE5–6 Level 2 Fallstudie incl. Musterlösung (2 UE) · UE7 Feedbackrunde
  Level 2+3 "mit Management-Brille" · UE8 Senior Level 3 Transferprojekt. UE6 carries no text of its own (it is the second unit of the Fallstudie); UE9 and UE10 exist as empty rows.
- **One thread runs through every day: UX is a decision problem, not a design problem** ("Denken wie Entscheider, nicht Designer"). Each day's *Wissen* cell ends
  in a `Ziel:` line that states it, and each ends its topic groups with the day's **Zielkonflikte** (usability vs depth vs time; personalisation vs transparency;
  motivation vs overload vs manipulation; …). Those conflicts are the Level 3 lens.
- **The task shapes repeat, so the site's blocks can repeat too:** Arbeitsauftrag 1 = describe problems from the user's side, sort them into the day's categories,
  suggest improvements; Arbeitsauftrag 2 = rate three options on the day's three criteria under stated constraints, prioritise, say what information is missing;
  Fallstudie = analyse, find causes, develop measures, prioritise, justify; Transferprojekt = a role (Chief … Officer), five numbered items, and one decision made
  despite incomplete data.

### Build from the plan, not beyond it

1. **Materi cards are the plan's own topic groups** of the day's *Wissen* cell, in the plan's order (four or five per day), each card carrying that group's bullets and
   nothing the plan does not name. The `Ziel:` line becomes the Materi's one-sentence takeaway. Extra frameworks, laws or theories (the candidate list in
   `MATERIAL-GUIDE.md`) enter a card only when a task needs them to be answered; that list is background, not a checklist.
2. **The Zielkonflikte groups are the spine of Materi B** (the Level 3 route); the Coaching row's bullets and the Feedback row's "Input Level 3" questions
   feed it. Do not invent a separate Level 3 theory.
3. **Every task block says which plan item it answers** (the coverage table of #44), including the plan's *Musterlösung (Kernlogik)* as the source of the mentor key.
4. **Where the plan asks "Welche Information fehlt Ihnen?" or "Treffen Sie eine Entscheidung trotz unvollständiger Datenlage"**, that is a required free-text field
   with a reason (#38, #44), never an optional extra.

### Andragogy, kept light (Knowles' principles, applied where they cost little)

| Principle | How it shows up, and nothing more |
|---|---|
| Need to know why | The Materi opens with the day's `Ziel:` and one line on why it matters at work (#22, #27). |
| Experience as a resource | The plan's own "from the user's side" prompts and the Coaching row's *Reflexion* questions are short **optional notes** in the learner's words; they appear in the export under "Reflection" and are never scored or flagged missing. |
| Problem-centred, not subject-centred | Every task is a decision in a role with constraints (the plan already gives the roles). No quiz-shaped tasks. |
| Readiness tied to real tasks | Cases are workplace situations of an EdTech or training provider; each day's WIIFM names a use at the learner's own desk (#27). |
| Self-direction | Nothing is locked (#6); Core and Optional (#35) let a senior skip what they know. |
| Respect for time and status | Formal *Sie*, short paragraphs, the decision first and the reasoning behind a click, no praise, no hype, no cute elements (#15). Text size at least 16 px on cards (the CS body is 15.5 px) and contrast per #49. |
| Peer exchange | The plan's *Diskussion* lines ("X vs Y") and "Input Level 3" questions are shown as **discussion prompts for the live session**, in the mentor tools (#49) until the user decides otherwise. |

Gamification for adults: no points, streaks, badges or leaderboards from the site itself (#15). The only game-like parts are analytical ones the plan already
implies: sorting into categories, ranking measures, a trade-off view. Where the subject *is* gamification (Day 11) it is analysed critically, as the plan's coaching asks
("Motivation ≠ Gamification", "Gefahr der Überstimulation", "Motivation vs. Manipulation").

### The day's agenda

Each day's home page shows the plan's UE as the day's agenda, built from a data file: UE, plan row, what the learner does on the site, minutes. **The minutes are not
decided** (see Pending decisions 1); until the user answers, the agenda lists UE and parts without minutes.

### Pending decisions (the user chooses; do not build until answered)

1. **Time.** The plan gives the case study 2 UE and the Transferprojekt 1 UE; `MATERIAL-GUIDE.md` and `CURRICULUM-GUIDE.md` §3 carry the earlier weights (tasks of 15, 15 and 20
   minutes). The user's new rhythm is one hour of explanation, then work and discussion in blocks of about 30 minutes, twice a day. Which timetable applies, and where lunch falls
   relative to the case study and Materi B, is open.
2. **Level 1 is not objective in the plan.** Arbeitsauftrag 1 asks for spontaneous, open answers ("Beschreiben Sie spontan 5 Probleme", "Welche Plattform würden Sie bevorzugen
   und warum?") and Arbeitsauftrag 2 is already a judgement with a missing-information question. `MATERIAL-GUIDE.md` and the aion-task-design skill define Level 1 as OBJECTIVE.
3. **Fixed counts.** The plan names counts (5 problems, 3 improvements, 4 causes, 4 measures, 3 KPIs, 2 test methods, five Transferprojekt items). #35, #44 and #48 keep Core to
   one or two blocks and few fields.
4. **The Musterlösung is one answer with a ranking line** ("Rationale: Impact > Effort > User impact"), against #38 (decisions are free; a check is a hint).
5. **Group work.** The Feedbackrunde has groups present their solutions; the site has one participant name and one export per learner.
6. **Order of the day.** The plan puts the Fallstudie (Level 2) after the Coaching and Level 3 after the Feedback; #30 puts Level 1 and 2 in Route 1 and Level 3 in Route 2, each with
   its own Materi, while the plan has one *Wissen* UE a day.
7. **Sketching tasks** (Day 6 sketch the user journey, Day 12 low-fidelity prototype, personas): the stack has no drawing library (#9). Constrained builders, or words only.
8. **Weight of the supporting layers** (#19 glossary, #22 plain-words box, #36 stories for every diagram, #42 clue kit for every field, #46) for senior professionals.
