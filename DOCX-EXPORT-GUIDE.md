# AION — Turning a day's website into readable Materi and Task documents (.docx)

> **DL note (2026-10-08).** This guide was written for the CS course and applies unchanged to the Digital Learning (DL) course, with two
> additions: the mock-platform screens (CLAUDE.md #49) are exported as the picture plus a table of every hotspot's printed fact, and the plan's
> *Feedbackrunde* debrief card is mentor-only, so it never goes into a learner document. The pipeline in `materi-task-docx/_tools/` does not exist
> in this repository yet; copy it here from wherever the CS work keeps it when the first DL day is ready for documents.

Companion to [`CLAUDE.md`](CLAUDE.md) (rule #31) and [`CURRICULUM-GUIDE.md`](CURRICULUM-GUIDE.md).
Every time a CS or DL day's website is built, its material and its tasks are also delivered as Word documents
that a presenter, a learner or a reviewer can read **without the website**. This guide is the standing
procedure. It was distilled from the first run (Days 1–3, 2026-09-25).

> **Ringkasan (Bahasa Indonesia).** Setiap kali website sebuah hari selesai, buat dokumen Word untuk
> materi dan task-nya di folder `materi-task-docx/`. Nama file menyebut hari, level, jenis (Materi / Task)
> dan judulnya. Semua teks yang hanya berarti di website (tombol, "FIND IT", cek, klik/drag, mentor,
> export, daftar "missing", penghitung karakter, petunjuk tersembunyi) dibuang; diagram interaktif
> ditampilkan sebagai gambar keadaan awal ditambah tabel yang menuliskan isi setiap keadaan; isian
> website diganti ruang jawaban (kotak kosong, tabel kosong, kotak centang). Alat otomatisnya ada di
> `materi-task-docx/_tools/`; sumber Markdown yang sudah disunting ada di `materi-task-docx/_source/`.
> Langkah kerja lengkap ada di §4, daftar periksa di §7.

## 1. What is delivered

One folder at the course root, **`materi-task-docx/`**, holding every day's documents side by side:

```
materi-task-docx/
  README.md                         index: every document, its day, level, route and website link
  Day1_L1_Materi-A_Knowledge.docx   ← the deliverables, at the top level, sorted by name
  Day1_L1_Task-1_Diagnostic-Note.docx
  …
  _source/                          reviewed Markdown (the source of truth), manifest.json, fig/, gloss/
  _tools/                           the pipeline (see §4)
  _work/                            scratch: captures, drafts, previews. Safe to delete; regenerated.
```

Two documents per route: its **Materi** and its **Task**. A route that spans levels lists them all.

### File-name contract

```
Day{N}_L{levels}_Materi-{letter}_{Level-name}[_Optional].docx
Day{N}_L{levels}_Task-{n}_{Deliverable-name}[_Optional].docx
```

- `{levels}`: `L1`, `L2`, `L3`, or a span: `L1-L2` (the merged Route 1 from Day 3, CLAUDE.md #30), `L1-L3`
  (the Friday capstone, #29).
- `{letter}` / `{n}`: the website's own labels (Materi A/B/C, Task 1/2/3), so the document and the site match.
- `{Level-name}`: `Knowledge`, `Application`, `Management-Decision`, `Knowledge-and-Application`, `Capstone`.
- `{Deliverable-name}`: the export's name on the site (`Diagnostic-Note`, `Calculation-Note`, `Decision-Memo`,
  `Case-File`, `Behaviour-Analysis-File`; **DL:** `UX-Analysis` for the merged Route 1 and `UX-Strategy-Memo` for Route 2,
  CURRICULUM-GUIDE §7).
- `_Optional`: the hidden optional routes of a Friday day (#29).
- ASCII only, hyphens inside a part, underscores between parts. The manifest (`_source/manifest.json`)
  maps each source Markdown to its file name; add the day's entries there.

### What every document carries

- **Cover block**: course, a kicker (`DAY 2 · MATERI A · LEVELS 1 TO 3 · CAPSTONE`), title, subtitle, and a
  fact table: day, route, level, time, **website (playground) link to the route** (CS: `https://aion-cs-dayN.vercel.app/route-n/`; **DL:** `https://aion-dl-dayN.vercel.app/route-n/`, once the day is deployed),
  case. If the day is not deployed yet, write "Not yet published (…will be added once it is deployed)" and
  update it when the user gives the link. An "About this document" box says in 2–4 sentences what the
  document is for and which material it needs.
- **Materi**: every card in order (`A1 · Title (minutes)`), each with: the scan line, the "In plain words"
  box (plain words, why it matters, how to read the picture), the diagram, the body (bullets, tables,
  callouts), every interactive state written out (§3), the decision rules box ("How to decide when this
  comes up in the task"), the sources line; the references list at the end; then the **glossary appendix**.
- **Task**: the case brief once; a note box with how the task works; the evidence (records, tables,
  figures) printed once; every block as `Block x.y · Title · Objective/Judged/Core/Optional · minutes`,
  its "Draws on" line, its instructions and **answer spaces**; a "What you hand in" box naming the
  deliverable and the website's export file name; the glossary appendix.
- House look (CLAUDE.md #15, adapted to print): Calibri, ink text, amber kicker and decision-rule boxes,
  mist "In plain words" boxes, hairline tables with a mist header row, A4, footer with course · day ·
  document and the page number. Never green/red for right/wrong. No answers, no scores.

## 2. What is website-only — leave it out

A sentence belongs in the document only if it still makes sense on paper. Drop:

| Website element | In the document |
|---|---|
| Mentor bar, passcode, answer keys, worked mentor answers, "Fill all model answers" | never (they also must never leak into a learner document) |
| Top nav, section rail, page map, participant name strip, footer, dismissible banners | dropped |
| Buttons: Check, Re-check, Show clue, Reveal, Mark as read, Undo/Redo, Reset, Export, Print, File …, Use this result, Open all, Hide | dropped |
| "FIND IT · Route 1 → …" lines and "Analyse in the app…" | dropped |
| "What this shows" readings (they describe the current state of a control) | dropped; the states themselves are written out instead (§3) |
| "How to read the picture below" | **kept** as "How to read the picture", minus the sentences that say what to click/drag/toggle |
| Captions and sentences that only instruct: "Select a …", "Drag …", "Click …", "Switch … on and off", "Move the slider", "Tick the box", "watch …" | dropped (sentence by sentence, the rest of the paragraph stays) |
| Check counters ("Checks requested: 0"), character counters and minimums ("0 / 30 characters", "At least 30 characters") | dropped |
| Missing lists ("Your note is still missing: …"), soft locks ("LOCKED · Unlocks after …"), "Take me there" | dropped; the condition is stated as a normal instruction if it matters ("If you have not done Task 1, leave this empty") |
| Hidden helps: Show the formula, Show where the numbers are, Show the test questions, Show how to build the answer, calculators, FormulaBuilder | dropped: they are on-demand hints on the site (#4, #21, #24) and would hand over the answer on paper |
| Live memo / report preview panels, export preview | dropped; the "What you hand in" box replaces them |
| Empty-state text inside diagrams ("Nothing placed yet", "no motive chosen") | removed from the image (render_figures.py) |
| "Read-only", "Exploratory · not graded · not exported", "(Case assumption, illustrative, read-only)" | reduced to what matters on paper: "(Case assumption, illustrative)", "not graded" |
| German/English switch (Day 2) | documents are in English, the site's default |

Keep everything that teaches or that a learner needs to answer: case briefs, "Case assumption" labels,
evidence records, data tables, decision rules, sources, "Draws on" references (with full card titles),
Objective/Judged and Core/Optional marks, time budgets, frames for written answers.

## 3. What is converted, not dropped

- **Form fields → answer spaces.** Text area → bordered answer box (`[[ANSWER lines=n]]`). Short number or
  name → one-line box, or a blank cell in a table. Radio group → `☐ A ☐ B ☐ C` on one line (`[[OPTIONS]]`).
  Select → a "Tick one" list (`[[CHOOSE]]`). Multi-select → "Tick all that apply" (`[[TICKALL]]`).
  Drag-and-drop or click-to-place (sort into bins, tag notes, assign letters) → a table with the items as
  rows and a blank column (`__`) for the learner's answer, with the bins/categories explained above it.
  Repeated field groups (six readings, three hypotheses, four patterns, governance rows) → one table.
- **Controls that only appear after an earlier choice** (a scoring table after choosing three measures,
  governance rows after funding) → print them as a blank table with the right number of rows, and put the
  option lists (owners, cadences, metrics, actions) in the text above it.
- **Interactive diagrams → the starting-state picture plus every state as text.** A diagram whose panel
  changes on click (a stage, a rung, a motive, a worked-example cell) gets a table after the picture with
  one row per state (label · what the panel says). Get these with the **state sweep** (§4 step 5) — never
  from memory. Sliders and toggles: write the result at the drawn position and the key other positions the
  card's own text names ("drawn at 38 clients; the lines cross at 37.5"). Recompute any number you add from
  the day's data files and say which inputs it uses.
- **Practice items (Try it)** → numbered practice with tick boxes and an "Answers:" line in italics
  underneath, since they are ungraded teaching, not the task.
- **Glossary.** Every dotted-underlined term is collected by the **glossary sweep** and printed as an
  appendix table (term · plain explanation · example · source). Terms stay plain text in the body.
- **Task integrity.** Never print a value the task asks the learner to work out, even if the website shows
  it in an exploratory widget (Day 1 Task 2's cost explorer shows every layer; the document shows the fees
  layer only and lists the other layers by name). Never print the answer to a Check.

## 4. The pipeline (commands run from `materi-task-docx/`)

Tools in `_tools/`: `serve_capture.py`, `capture.js`, `state_sweep.js`, `gloss_sweep.js`, `html2md.py`,
`render_figures.py`, `coverage.py`, `mdedit.py`, `md2docx.py`, `build_all.py`, `preview.sh`.
Needs: Python with `beautifulsoup4`, `python-docx`, `Pillow`; Chrome or Edge; LibreOffice + `pdftoppm` for previews.

1. **Build the day** (`npm run build` in `dayN/`, dev server stopped first, CLAUDE.md #10). Check that
   `out/` is newer than the last source change.
2. **Serve and capture.** Run `python _tools/serve_capture.py ../dayN/out 81NN _work/capture` (one port per
   day, run in the background). Open each page in the browser pane **from a clean localStorage**, then in the
   page: `eval(await (await fetch('/__tools/capture.js')).text()); await CAPTURE('dayN-route-n', [/^Optional, about/])`.
   Pass extra opener patterns for anything collapsed by default (Day 2's optional blocks). Capture the home
   page too (day title and route names).
3. **Extract drafts.** `python _tools/html2md.py _work/capture/dayN-route-n.html _work/md dayN-rn materi-x task-n`
   writes `dayN-rn-materi.md`, `dayN-rn-task.md` and the figure jobs. Anything the extractor could not
   finish is marked `%% REVIEW` (figure panels that show only the default state, HTML worked examples).
   `%%` lines never reach the document.
4. **Render diagrams.** `python _tools/render_figures.py _work/md/dayN-rn-figures.json ../dayN/out _work/md/fig`,
   then copy `_work/md/fig` to `_source/fig`. Re-render **every time the extractor changes**: figure numbers
   are assigned in page order and shift when the extraction changes.
5. **State sweep** (per route, in the browser): `eval(await (await fetch('/__tools/state_sweep.js')).text()); await SWEEP('dayN-route-n')`.
   It clicks every control in every material figure and records the panel text of each state.
   `mdedit.states(capture, card, figure, cols=…, label_from_button=…)` turns one figure into a table.
6. **Glossary sweep** (per route): `eval(await (await fetch('/__tools/gloss_sweep.js')).text()); await GLOSS('dayN-rn-materi', '#materi-x'); await GLOSS('dayN-rn-task', '#task-n, #task-n ~ *')`,
   then copy the results to `_source/gloss/<name>-gloss.json`. `build_all.py` appends them.
7. **Review the Materi drafts** (copy to `_source/` first; from then on `_source` is the source of truth and
   is never overwritten by a new extraction). With `mdedit.py`: `take_head` + `front(...)` for the front
   matter; `review(n, replacement, until=…)` for each `%% REVIEW` block; `rep`, `drop_line`, `table` for the
   rest. Fill every figure panel from the state sweep or the day's `data/*.ts`. Run
   `python _tools/coverage.py _work/capture/dayN-route-n.html materi-x _source/dayN-rn-materi.md` and read
   what it lists: each line is either website-only (fine) or lost teaching content (put it back).
8. **Write the Task worksheets.** The task draft is raw material only. Rewrite `_source/dayN-rn-task.md`
   by hand as a worksheet (§3): case brief, evidence, blocks with answer spaces, "What you hand in". Take
   every option list, cost, baseline and label from the page capture or `data/*.ts`; take the export file
   name from the page (`grep -o "[0-9]-participant-day[0-9]-[a-z0-9-]*" _work/capture/*.html`).
9. **Register and build.** Add the entries to `_source/manifest.json`, then `python _tools/build_all.py dayN`.
10. **Check.** `sh _tools/preview.sh <file>.docx _work/pv/<name>` renders contact sheets of the pages; look at
    every page. Validate every file with the docx skill's `scripts/office/validate.py` (all must pass).
11. **Index.** Add the day's rows to `materi-task-docx/README.md`. Stop the capture servers.

### Markdown dialect (`md2docx.py`)

Front matter keys: `kicker, title, subtitle, daytitle, route, level, minutes, website, case, footer, intro`
(`course` comes from the manifest). Body: `#`–`####` headings (`#` for a task's Part), paragraphs with
`**bold**`, `*italic*`, `` `code` ``; `- ` bullets; `1. ` numbered lines; pipe tables (`<br>` for a line
break in a cell, a cell that is exactly `__` is a blank writing space); `![caption](fig/x.png)`;
`:::box Title … :::` (mist box; a title starting "How to decide" becomes the amber decision-rules box),
`:::note Title … :::` (outlined box); `[[ANSWER lines=n]]`, `[[OPTIONS]] a ‖ b`, `[[CHOOSE]] a ‖ b`,
`[[TICKALL]] a ‖ b`; `---pagebreak---`; `%% …` reviewer notes (not printed). An italic line directly
before an image is its title and keeps with it.

## 5. Accuracy rules

- Only what the website shows or the day's data files hold. Do not invent a caption, a reason or a number;
  when a sentence interprets a picture, check it against the component (a line that looks teal is not "the
  red line"). A recomputed number (expected value, regret, break-even) must come from the day's constants.
- Do not reveal what a task keeps back: an unlabelled element stays unlabelled in its explanation (Day 1's
  dashed Operate & review band is named, not explained as "no contact was logged").
- Case assumptions stay labelled as such.

## 6. Gotchas learned on the first run

- **Escapes.** Patching Python or JS through a shell heredoc turned `\b` into a backspace and `\n` into a
  real newline inside string literals. Edit tool files with the Edit tool, or build strings with `chr(92)`.
- **Regex filters.** A UI filter that starts with `Show` also drops "Show-up rate"; use word boundaries
  (`Show\b(?!-)`). A filter on `Switch` also drops "Switching cost"; use `Switch\b`.
- **Choice groups.** A container is a radio/checkbox group only if its text is (almost) all label text;
  otherwise a whole card with one checkbox inside is swallowed (Day 1 B4 was, once).
- **Tables in Word.** Set `w:gridCol` widths and a fixed layout, or LibreOffice/Word ignore the cell widths.
  Give every column a floor (its longest word, or 3 cm for a blank answer column) and scale the floors down
  when a table has many columns.
- **Schema order.** python-docx appends properties at the end of `pPr`/`tcPr`/`tblPr`/`trPr`; Word's schema
  wants a fixed order. `fix_schema_order()` in `md2docx.py` sorts them before saving; validation then passes.
- **Glossary panel.** Read the term from the panel's heading element, not from the first line of text: the
  card starts with a small-caps label, and an all-capitals term (MECE) looks like a label.
- **Re-extraction.** Never re-run the extractor into `_source/`. Drafts go to `_work/md`; reviewed files live
  in `_source` and are edited in place.
- **Stale build.** Day 2's `out/` was older than its last commit; rebuild before capturing.

## 7. Definition of done (check every document)

1. The file name follows §1 and the document opens with the cover block and a working website link (or the
   "not yet published" line).
2. No website-only text remains (§2): search `_source/*.md` for click, tap, select, drag, slider, toggle,
   button, check, clue, reveal, locked, FIND IT, "What this shows", characters, read-only, `%% REVIEW`.
3. Every card is present with all its parts, every interactive state is written out, every figure renders
   and is the right one (figure numbering), no diagram shows empty-state website text.
4. Every task block has its instructions and an answer space; option lists, costs and baselines match the
   site; nothing the learner must work out is printed.
5. The glossary appendix is present; the "What you hand in" box names the site's export file name.
6. `preview.sh` pages look right (no squeezed columns, no orphaned box headers); `validate.py` passes.
7. `README.md` lists the day's documents; the manifest has them.
