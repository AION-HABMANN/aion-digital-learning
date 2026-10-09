---
doc: task
day: 7
kicker: DAY 7 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: InclusiveLearn: Barrier Analysis and Inclusive UX Strategy
subtitle: Find the barriers that exclude learners, choose inclusive measures and evaluation methods, and decide as Chief UX and Accessibility Officer
daytitle: Day 7 · Module 3 (day 3 of 3): Accessibility and inclusive design of learning platforms, integration and evaluation of user-centred UX concepts
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
website: Not yet published (the link will be added once Day 7 is deployed)
case: InclusiveLearn, a platform with access problems
intro: This is the worksheet for Day 7. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: accessibility,inclusive-design,persona-spectrum,wcag,pour,conformance,contrast,screen-reader,keyboard,aria,plain-language,udl,bfsg,overlay,audit,sus,cognitive-load,usability,persona,iterative,kpi,qualitative,usability-test,dropout,completion,engagement,user-impact,roadmap,decision-architecture,conflicting-goals,stakeholder,symptom
---

[[CONTENTS]]

:::note Which plan item each block answers
| Plan item (Strukturplan, Day 7) | Block in this document |
|---|---|
| Level 1 · Task 1: identify 5 possible barriers (small font, complicated language, many steps), say which user groups run into problems, formulate 3 improvements | Block 1.1 (Core): the eight facts are sorted, the groups are named, three improvements are written |
| Level 1 · Task 2: new features, improve the existing UX or increase accessibility under limited budget, rising complaints and time pressure; assess user impact, risk, effort; prioritise; justify | Block 1.2 (Optional) |
| Coaching: inclusion as a strategic UX quality; reflection questions | Block 1.3 (Optional) |
| Level 2 case study InclusiveLearn: identify 4 central barriers, develop 4 inclusive UX measures, define 3 evaluation methods, prioritise | Block 2.1 (Optional, four barriers) and Block 2.2 (Core, four measures, three evaluation methods, priority) |
| Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |
| Level 3 transfer project: inclusive UX strategy, integration into existing processes, 3 prioritised measures, evaluation system (KPIs and methods), risk analysis (costs against benefits), one decision under uncertainty | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: InclusiveLearn, a platform with access problems

InclusiveLearn is a learning platform whose content is good, yet usage is low. Users with impairments drop out, and the content is hard to understand. A first analysis points to a lack of accessibility and to no user-centred integration. Complaints are increasing, the budget is limited and time is short. You are part of the UX team.

| What you have | The limits | How the task runs |
|---|---|---|
| Four InclusiveLearn screens in outline and eight facts about them (Block 1.1).<br>Three options (optional Block 1.2) and seven possible barriers (optional Block 2.1).<br>Nine measures and six evaluation methods (Block 2.2). | **Budget:** €50,000 (Case assumption: the plan only says "limited")<br>**Time:** 10 weeks (Case assumption: the plan says "high time pressure")<br>Complaints are rising. | Two Core blocks, about 30 minutes:<br>1. Block 1.1: sort eight facts, name the groups who struggle, write three improvements.<br>2. Block 2.2: choose four of nine measures, rate them, order them, choose three evaluation methods.<br>Three more blocks (about 20 minutes) are Optional. |

:::note Case assumption
The brief says: users with impairments drop out, content hard to understand, low usage despite good content, a lack of accessibility, no user-centred integration, a small font, complicated language, many steps to operate, a limited budget, rising complaints and high time pressure. Everything else is made up for this exercise: the screens, the numbers on them, the €50,000, the 10 weeks, and the costs and weeks of the measures.
:::

## The evidence: four InclusiveLearn screens and eight facts

The picture shows four screens in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is a problem.

![The InclusiveLearn screens, drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d7_t1_inclusivelearn-screens.png)

| No. | Screen | What is there |
|---|---|---|
| 1 | Course page | The body text is 11 px, light grey (#AAAAAA) on white. Its contrast ratio is 2.3 : 1. |
| 2 | Video lesson | Video lessons have no captions and no transcript. |
| 3 | Course page | A lesson's status is shown only by a coloured dot (red or green), with no word next to it. |
| 4 | Course page | The "Next" button is 18 × 18 px and sits 4 px from the "Back" button. |
| 5 | Quiz | The quiz can only be answered by dragging items onto boxes. There is no keyboard alternative. |
| 6 | Sign-up | Signing up takes 14 steps over 6 screens. |
| 7 | Sign-up | Instructions are long sentences with legal wording, many of 38 words or more. |
| 8 | Sign-up | A failed step shows only "Error 4011", with no explanation. |

# Part 1 · Find the barriers · Level 1 · Knowledge

## Block 1.1 · Eight facts, the groups affected and three improvements · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · Accessibility and inclusive design · A2 · Barriers and the four principles.

**Part a (objective).** Sort each fact into the principle it breaks first. Tick one box per fact. The three principles are those the plan names: *Perceivable* (can the learner see or hear it?), *Operable* (can the learner use it?) and *Understandable* (can the learner follow it?).

| No. | The fact in short | Principle (tick one) |
|---|---|---|
| 1 | Light grey 11 px text, contrast 2.3 : 1 | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 2 | Videos without captions or transcript | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 3 | Status shown only by a coloured dot | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 4 | An 18 × 18 px "Next" button, 4 px from "Back" | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 5 | A quiz that needs dragging, no keyboard way | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 6 | Sign-up in 14 steps over 6 screens | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 7 | Long sentences with legal wording | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |
| 8 | "Error 4011" with no explanation | ☐ Perceivable<br>☐ Operable<br>☐ Understandable |

**Part b (judged).** Which user groups run into problems? Tick all that apply, and then say which fact hurts which group.

[[TICKALL]] People with low vision ‖ People who cannot tell red from green ‖ Deaf or hard-of-hearing learners ‖ People who use only a keyboard or a switch ‖ People with a hand tremor or limited hand use ‖ People with dyslexia or learning difficulties ‖ Learners reading in a second language ‖ Anyone on a small screen, in bright light or on a noisy train (a situational limit)

[[ANSWER lines=3 label=Pick two groups from the list and say which of the eight facts (by number) blocks each of them, and what they cannot do.]]

**Part c (judged).**

[[ANSWER lines=3 label=Formulate three improvements. Start each with a verb, name the fact it answers by number, and say who gains.]]

## Block 1.2 · Integrating and assessing a UX concept: three options · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. It practises the three ratings at small scale; Block 2.2 is answered without it.*

**Draws on:** A5 · Weighing an inclusion measure.

You are to improve a learning platform. The budget is limited (€50,000, Case assumption), complaints are increasing and time is short (10 weeks). Effort follows the printed cost, by the rule in Materi A5.

| Option | What it is | Cost | Weeks | User impact | Effort | Risk |
|---|---|---|---|---|---|---|
| **A** | Develop new features | €36,000 | 10 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **B** | Improve the existing UX (structure, navigation, wording) | €18,000 | 6 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **C** | Increase accessibility (contrast, keyboard use, captions) | €24,000 | 8 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

| Priority | Option (A, B or C) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Justify your decision. Say who gains from your first priority, and whether it is an integration or an expansion.]]

## Block 1.3 · Coaching reflection: inclusion as a strategic UX quality · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: accessibility is not an add-on but a core quality; inclusive systems are more successful in the long run; evaluation is a continuous task. Think back on Block 1.1 and write what comes to mind.

[[ANSWER lines=3 label=Who is currently being excluded?]]

[[ANSWER lines=3 label=Which UX decision has the greatest reach?]]

[[ANSWER lines=3 label=How do we measure UX quality meaningfully?]]

# Part 2 · Choose inclusive measures · Level 2 · Application

## Block 2.1 · Four central barriers · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. It practises pointing at a printed fact for a barrier; Block 2.2 reads the facts, not this block.*

**Draws on:** A2 · Barriers and the four principles · A3 · Inclusive learning.

A central barrier is something that stops a group of learners from doing something, and you can point at it in the case or in a fact. Choose exactly four of the seven.

[[TICKALL]] The text is small and low in contrast. ‖ Content can only be operated with a mouse or by dragging. ‖ The language is complicated and instructions are unclear. ‖ Videos have no captions or transcripts. ‖ The subscription price is too high. ‖ The course catalogue is too small. ‖ The platform has no dark mode.

[[ANSWER lines=3 label=Which printed fact supports your first barrier, and which group does it block?]]

## Block 2.2 · Four measures, rated and ordered, and three evaluation methods · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A5 · Weighing an inclusion measure · A2 · Barriers and the four principles · A3 · Inclusive learning.

**The limits:** €50,000, 10 weeks. The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose exactly four of the nine measures.**

| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |
|---|---|---|---|---|---|---|
| M1 | Clear structure and plain language | Rewrite the 20 most-used lessons and the sign-up instructions in short, plain sentences with headings. · Text is easy to follow. | €15,000 | 6 | Understandable | ☐ |
| M2 | Better operability | Full keyboard use, larger targets, a non-drag way to answer quizzes. · Everything works without a mouse. | €13,000 | 5 | Operable | ☐ |
| M3 | Visual optimisation | Contrast of at least 4.5 : 1, text that can be enlarged to 200%, status always with a word. · Text is clear and can be enlarged. | €11,000 | 4 | Perceivable | ☐ |
| M4 | Captions and transcripts | Add captions and a transcript to the 30 most-used videos. · Videos can be read. | €9,000 | 4 | Perceivable | ☐ |
| M5 | Continuous testing | An automated check in every release and a test with five learners with impairments each quarter (first quarter). · Barriers are found before release. | €8,000 | 4 | Evaluation | ☐ |
| M6 | An accessibility toolbar | A third-party toolbar that promises to fix accessibility problems automatically. · A new icon appears on every page. | €12,000 | 3 | A layer on top | ☐ |
| M7 | An AI learning buddy | A chat assistant for questions on the content. · A chat button appears. | €40,000 | 10 | Adds a feature | ☐ |
| M8 | A new visual style | New colours, icons and fonts. · The platform looks different. | €25,000 | 6 | The look | ☐ |
| M9 | Two more languages | Translate the platform into two further languages. · More language options. | €30,000 | 10 | Adds reach in other ways | ☐ |

**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each rating column. User impact: how many learners it opens the platform to, and which groups. Effort: by the printed cost, with the rule in Materi A5. Risk: what could go wrong, for example that a patch hides a problem without fixing it.

| Measure (M1 to M9) | User impact | Effort | Risk |
|---|---|---|---|
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

[[ANSWER lines=3 label=Why these ratings? Measure 1 (name its number): which fact it answers, which group it opens the platform to, and what could go wrong.]]

[[ANSWER lines=3 label=Why these ratings? Measure 2:]]

[[ANSWER lines=3 label=Why these ratings? Measure 3:]]

[[ANSWER lines=3 label=Why these ratings? Measure 4:]]

**Step 3 · Check your plan against the limits.** Add up the costs of your four measures and find the longest one. Going over the budget or the time is allowed; if you do, say why in the reasons above. It is printed in your file as a fact.

| Total cost of your four measures | Budget | Longest measure (weeks) | Time limit |
|---|---|---|---|
| € __ | €50,000 | __ weeks | 10 weeks |

**Step 4 · Put your four measures in priority order.** The first is the most important.

| Priority | Measure (M1 to M9) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |
| 4 | __ |

[[ANSWER lines=3 label=Why does your first priority go first? A reason for position one: the group it reaches, the cost, or what the others depend on. Accessibility means usage, and usage means success: say how.]]

**Step 5 · Define three evaluation methods.** Choose exactly three. Each shows what it tells you.

| No. | Method | What it tells you | Choose (three) |
|---|---|---|---|
| E1 | An automated accessibility check in each release | Finds some problems quickly; cannot find all | ☐ |
| E2 | A manual check with the keyboard alone and a screen reader | Finds problems that tools miss | ☐ |
| E3 | A usability test with learners with impairments | Shows why a group cannot finish a task | ☐ |
| E4 | Task success and drop-out by user group | Shows how many in each group are blocked | ☐ |
| E5 | A satisfaction questionnaire (SUS) asked per group | A compact signal that a group has trouble | ☐ |
| E6 | Counting the features on the platform | Shows how much was built, not who can use it | ☐ |

[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision (for example how many learners need these features), and how you could find it out without guessing.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: your sort of the eight facts, the groups affected and your improvements, your four measures with their ratings and reasons, your order, your three evaluation methods and your missing information. On the website the same file is exported as `1-{your-name}-day7-l1l2-ux-analysis`.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3)

## The situation: InclusiveLearn's Chief UX and Accessibility Officer

You are the Chief UX and Accessibility Officer of InclusiveLearn. The platform is growing, but it does not reach all user groups. Accessibility requirements are increasing, and resources are limited. Management wants a strategy for inclusive UX and an evaluation system for the next 12 months, and it expects you to take responsibility at management level.

| The limits | How the task runs |
|---|---|
| **Budget for the year:** €240,000 (Case assumption: the plan only says "limited resources")<br>**Data:** incomplete: you do not know which groups use the platform or fail to.<br>You must decide anyway. | Two Core blocks, about 20 minutes:<br>1. Block 3.1: your strategy, the integration into existing processes and three prioritised measures (draws on B1, B2).<br>2. Block 3.2: the evaluation system, the risk analysis (costs against benefits), one decision under uncertainty, and what you give up (draws on B2, B3). |

:::note Case assumption
The brief says: a growing platform that does not reach all user groups, increasing accessibility requirements, limited resources. Everything else is made up: the €240,000, the seven decisions with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*

## Block 3.1 · Strategy, integration and three measures · JUDGED · Core · about 9 min

**Draws on:** B1 · Inclusion as a strategic quality · B2 · Conflicting goals: inclusion against cost, and integration against add-on.

[[ANSWER lines=4 label=Your strategy for inclusive UX in two or three sentences: which groups you aim to reach, what you will change first, and why this is a core quality and not an add-on.]]

**Integration into existing processes.** Where will accessibility be checked so that it does not depend on one person? Choose at least three.

[[TICKALL]] Requirements and user stories ‖ Design reviews ‖ Development: the definition of "done" ‖ Content creation: a standard for authors ‖ Buying third-party tools ‖ Release testing ‖ A support channel for access problems

**Choose exactly three measures.**

| No. | Decision | What it is | Cost | Weeks | Acts on | Choose (three) |
|---|---|---|---|---|---|---|
| D1 | Fix the barriers in the 20 most-used courses | Contrast, keyboard use, captions and plain language in the courses most learners open. | €80,000 | 22 | Reach now | ☐ |
| D2 | Accessibility in the design system and every release | Accessibility requirements, a definition of "done" and automated checks in every release. | €40,000 | 16 | Integration | ☐ |
| D3 | A quarterly test programme | A usability test each quarter with learners with disabilities. | €30,000 | 52 | Evidence | ☐ |
| D4 | A plain-language standard and author training | A writing standard and training for course authors. | €25,000 | 12 | Understandable | ☐ |
| D5 | An external accessibility audit | An audit against WCAG 2.2 AA and EN 301 549 by a specialist. | €35,000 | 8 | Evidence | ☐ |
| D6 | An accessibility toolbar | A third-party toolbar that promises to fix problems automatically. | €20,000 | 4 | A layer on top | ☐ |
| D7 | New features for growth | A set of new features requested by sales. | €90,000 | 28 | Adds features | ☐ |

| Total cost of your three measures | Yearly budget |
|---|---|
| € __ | €240,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

| Priority | Measure (D1 to D7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first measure go first? Say which groups it reaches and what it costs to wait.]]

## Block 3.2 · Evaluation system, risk analysis, a decision under uncertainty, and what you give up · JUDGED · Core · about 11 min

**Draws on:** B2 · Conflicting goals · B3 · An evaluation system and a decision under uncertainty.

**Your evaluation system: KPIs.** Choose at least three.

[[TICKALL]] Task success by user group ‖ Drop-out by user group ‖ The share of pages that meet WCAG 2.2 AA in an audit ‖ Accessibility problems reported, and the time to fix them ‖ Satisfaction (for example SUS) by group ‖ The number of clicks on a toolbar ‖ The number of features released

**Your evaluation system: methods.** Choose at least two.

[[TICKALL]] A usability test with learners with impairments ‖ A manual audit (keyboard, screen reader) ‖ Automated checks in each release ‖ Analytics by group (with a legal basis) ‖ A survey of all learners

[[ANSWER lines=3 label=In one or two sentences: who reads these results, how often, and what they must do when a KPI is poor.]]

**Risk analysis: costs against benefits.** Imagine the plan has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] Accessibility stayed a project and the platform drifted back. ‖ Authors ignored the standard, so new content was inaccessible. ‖ We bought a toolbar and the barriers stayed. ‖ We spent the budget on an audit and had nothing left to fix. ‖ We could not show a benefit and the budget was cut.

[[ANSWER lines=3 label=What do you do about that risk? One action, and the cost of the action against the cost of the risk.]]

**One decision you make under uncertainty (without complete user data).** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your inclusive strategy, the integration into processes, three measures with their order, your evaluation system, your biggest risk and what you do about it, your decision under uncertainty, and what you give up. On the website the same file is exported as `2-{your-name}-day7-l3-ux-strategy`.
:::
