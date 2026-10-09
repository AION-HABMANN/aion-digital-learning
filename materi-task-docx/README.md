# Habmann Digital Learning · Materi and Task documents, Day 1 to Day 8

Word documents of the study material (Materi) and the worksheets (Task) of the course *Educational UX/UI Design* (Habmann AufstiegsAkademie).
They can be read, taught and worked **without the website**, and they are the reference from which the website days are built.
Written to the standards of `../CLAUDE.md` (#11, #19, #22, #30, #31, #35, #40, #44, #46, #50, #51) and `../DOCX-EXPORT-GUIDE.md`.

## The documents

One Materi and one Task file per day. Each file holds both routes of the day: Materi A and Materi B in the Materi file, Task 1 and Task 2 in the Task file.

| Day | Topic (plan) | Case | Materi | Task |
|---|---|---|---|---|
| 1 | UX and UI, user-centred design | SkillUp / LearnFast | `Day1-Materi-Habmann-Digital-Learning-UX-vs-UI-and-User-Centred-Design.docx` | `Day1-Task-Habmann-Digital-Learning-LearnFast-UX-Analysis-and-UX-Strategy-Memo.docx` |
| 2 | Successful platforms, prototyping, testing, adaptive learning | LearnPro | `Day2-Materi-…-Successful-Platforms-Prototyping-Testing-and-Adaptive-Learning.docx` | `Day2-Task-…-LearnPro-Prototype-and-Test-Plan-and-Innovation-Strategy.docx` |
| 3 | Learning psychology and cognitive load | EduCore | `Day3-Materi-…-Learning-Psychology-and-Cognitive-Load.docx` | `Day3-Task-…-EduCore-Cognitive-Load-Analysis-and-Learning-Experience-Strategy.docx` |
| 4 | Motivation and engagement | MotivaLearn | `Day4-Materi-…-Motivation-and-Engagement-by-Design.docx` | `Day4-Task-…-MotivaLearn-Engagement-Analysis-and-Engagement-Strategy.docx` |
| 5 | User-centred UX design | LearnBase | `Day5-Materi-…-User-Centred-UX-Design.docx` | `Day5-Task-…-LearnBase-User-Centred-Analysis-and-UX-Strategy.docx` |
| 6 | Personas and user journeys | EduPath | `Day6-Materi-…-Personas-and-User-Journeys.docx` | `Day6-Task-…-EduPath-Personas-Journeys-and-Segmentation-Strategy.docx` |
| 7 | Accessibility and inclusive design, evaluation | InclusiveLearn | `Day7-Materi-…-Accessibility-and-Inclusive-Design.docx` | `Day7-Task-…-InclusiveLearn-Barrier-Analysis-and-Inclusive-UX-Strategy.docx` |
| 8 | UX/UI basics: structure, hierarchy, interaction | StructLearn | `Day8-Materi-…-UX-UI-Structure-Visual-Hierarchy-and-Interaction.docx` | `Day8-Task-…-StructLearn-Structure-Analysis-and-Basic-UX-UI-Structure.docx` |

The full file names always read `Day{N}-{Materi|Task}-Habmann-Digital-Learning-{topic}.docx` (the `…` above stands for `Habmann-Digital-Learning`).
Website link: Day 1 is at <https://aion-dl.vercel.app/day/1/>; Days 2 to 8 say "not yet published" on their cover and need the link once they are deployed.

## What is in a Materi file

Cover and fact table · contents · **Materi A** (Route 1, Levels 1 and 2: five cards, about 60 minutes) · **Materi B** (Route 2, Level 3: three cards, about 60 minutes) · references · glossary.
Every card: scan line · "In plain words" box (the idea, why it matters, how to read the picture) · a diagram · the content (tables, a short story with a named person) · the box "How to decide when this comes up in the task" · an "Extra" box for deeper reading · sources. Cards marked **Optional** are not needed by the Core blocks of the task. The worked examples use LearnLoop, never the task's own company.

## What is in a Task file

Cover and fact table · contents · "Which plan item each block answers" · name field · **Task 1** (the case, the evidence as a drawn screen set with numbered facts, Part 1 Level 1, Part 2 Level 2, "What you hand in") · **Task 2** (the situation, Block 3.1 and Block 3.2, "What you hand in") · glossary.
Blocks are marked Core or Optional and carry minutes and the cards they draw on. Answers go into boxes, tables and tick boxes. There are no answer keys and no scores. Core blocks read only Core cards.

## How the plan was followed

The cases and their facts come from `One Stop Digital Learning - Strukturplan 11_F_128 (04-26).xlsx` (sheet English). Only what the plan prints is stated as fact; every other figure is labelled **Case assumption**. The plan contains no calculation, so no task asks the learner to derive a number: costs and budgets are printed and compared, and the effort rating follows a printed cost rule taught in the Materi.
Level 1 and 2 are merged into Route 1 and Level 3 is Route 2 (`../CLAUDE.md` #30). The feedback round of each day is a classroom discussion and is not a worksheet block.

## Things to check before teaching

- **Standards and laws in flux:** BFSG (scope, exemptions, the ordinance), EN 301 549 (the revision that refers to WCAG 2.2), the EU AI Act (staged dates), and tracking rules (DSGVO, § 25 TDDDG). The documents say so where they use them; check the current text.
- **Figures quoted from research** were checked by web search on 2026-10-09 (abstracts and secondary summaries, not the full papers): Jordan 2015 (median MOOC completion 12.6 %), Nielsen 1997 (79 % scan, 16 % read word for word), Kulik and Fletcher 2016 (median effect 0.66), the 5-user model (31 %, 65 %, 85 %), ISO 9241-210 (definition of user experience, six principles), WCAG 2.2 (new AA criteria). Other citations are standard references quoted from knowledge and were not re-fetched: open the source before you quote a page number or a figure.
- **Day 1 website:** the plan asks for three improvement ideas in Level 1 Task 1. The Word worksheet has them (Block 1.1, Part c); the website's Block 1.1 has no such field yet.

## Folders

```
materi-task-docx/
  Day1-Materi-….docx … Day8-Task-….docx   the 16 documents
  README.md                                this file
  _source/                                 the reviewed Markdown of every document (the source of truth)
  _figures/                                every diagram as PNG (drawn from SVG)
  _tools/                                  the generator
```

Rebuild: `python _tools/build_all.py` (all days) or `python _tools/build_all.py 3` (one day). Needs Python with `python-docx`, `cairosvg` and `Pillow`.
Edit the Markdown in `_source/`, a figure in `_tools/figs_dayN.py`, a glossary entry in `_tools/glossary.py`, a reference in `_tools/refs.py`, then rebuild. The Markdown dialect is described at the top of `_tools/md2docx.py`.
