---
doc: task
day: 12
kicker: DAY 12 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: AdaptLearn: UX Analysis and UX Strategy Memo
subtitle: Assess the adaptations, choose the measures as a team member, and decide as Chief Product & UX Officer
daytitle: Day 12 · Module 5 (day 2 of 2): Adaptive learning systems, UX design patterns for personalised learning paths, practical project: prototype a gamified learning platform
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
case: AdaptLearn, an ambitious but ineffective system
intro: This is the worksheet for Day 12. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: rule-based,machine-learning,black-box,over-adaptation,transparency,data-quality,personalisation,adaptive,gamification,learning-path,prototype,learning-objective,complexity,feedback,low-fi,conflicting-goals,over-engineering,badge,kpi,leaderboard,comprehension
---

[[CONTENTS]]

:::note Which plan item each block answers
| UE | Plan item (Strukturplan, Day 12) | Block in this document |
|---|---|---|
| UE2 | Level 1, task 1 · which platform is more effective and why, the advantages of personalisation, the risks. | Block 1.1 (Core): the eight facts are sorted, then the fields |
| UE3 | Strategic decision on adaptive learning: three options: assess each option (benefit or impact, effort, risk), decide, justify | Block 1.2 (Optional) |
| UE4 | Coaching: The coaching point of the plan: more technology is not better UX; ask when adaptive UX really pays off; mind the risk of over-engineering and the importance of data quality. | Block 1.3 (Optional) |
| UE5–6 | Level 2 case study AdaptLearn: identify the central problems, develop four UX measures, prioritise, justify (and any extra item the plan names, such as test methods or KPIs) | Block 2.1 (Optional, four problems) and Block 2.2 (Core, four improvements, priority, justification) |
| UE7 | Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |
| UE8–10 | Level 3 transfer project: transfer project, items 1 to 4 · a concept for adaptive learning paths, the integration of gamification, UX design patterns, a low-fidelity concept sketch. transfer project, item 5 and the additional requirement · prioritised features and a risk analysis, a decision under uncertainty. | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: AdaptLearn, an ambitious but ineffective system

AdaptLearn is a learning platform with a complex adaptive system. It changes the path, the recommendations and the difficulty for every learner, but users do not understand the adaptations, and acceptance is low. A first analysis points to a lack of transparency and a wrong prioritisation of effort. The data basis is small, the users are very different, and the budget is limited. You are part of the UX team and asked to work out which adaptations help, which only confuse, and which measures are worth funding.

| What you have | The limits | How the task runs |
|---|---|---|
| Four AdaptLearn screens in outline, with eight facts about them (Block 1.1).<br>Three options (optional Block 1.2) and seven possible problems (optional Block 2.1).<br>Nine measures, each with a cost and weeks (Block 2.2). | Budget: €60,000 (Case assumption: the plan only says “limited”)<br>Time: 12 weeks (Case assumption: the plan gives none)<br>Heterogeneous users and a small data basis. | How the task runs:<br>1. Block 1.1: sort eight elements by what they do to the learner's understanding, say which one you would keep and what you would change (Level 1).<br>2. Block 2.2: choose four of nine measures, rate them, order them, justify and name what is missing (Level 2).<br>Three more blocks (about 20 min) are optional and folded. |

:::note Case assumption
The brief says: a complex adaptive system, users do not understand the adaptations, low acceptance, a lack of transparency and a wrong prioritisation, heterogeneous users, a small data basis and a limited budget. Everything else is made up for this exercise: the screens, the numbers on them, the €60,000, the 12 weeks, and the costs and weeks of the measures.
:::

## The evidence: four AdaptLearn screens and eight facts

The picture shows four screens in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is a problem.

![The AdaptLearn screens, drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d12_t1_screens.png)

| No. | Screen | What is there |
|---|---|---|
| 1 | Learning path | The path changed overnight, and a notice says only “Your path was updated”. |
| 2 | Learning path | Lesson 4 has vanished from the list, and nothing shows which lessons were skipped. |
| 3 | A recommendation | A card says “Recommended for you” and gives no reason. |
| 4 | A recommendation | A learner who passed the advanced test is offered a beginner course, because the system looked only at the last three clicks. |
| 5 | Difficulty | After one wrong answer the difficulty drops two levels, and there is no way to go back. |
| 6 | Difficulty | A note says “Difficulty lowered: you missed 3 of 4 questions on pricing”, with a button to change it back. |
| 7 | Settings | A switch lets the learner choose between “Let AdaptLearn decide” and “I choose my path”. |
| 8 | Settings | A new learner is asked three short questions about their goal and prior knowledge before the first lesson, and can change the answers later. |

# Part 1 · Assess the adaptations · Level 1 · Knowledge

## Block 1.1 · Eight elements: opaque, wrong basis or helpful? · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · Adaptive learning systems: collect, analyse, adapt · A2 · Technology and algorithms: rules, models and their limits.

**Part a (objective).** Sort each fact into the kind it shows. Tick one box per fact. The kinds are: *Opaque* (does something change without telling the learner what or why?); *Wrong basis* (does the system decide on thin evidence, or react too strongly?); *Helps* (does it adapt in a way the learner can see, understand and steer?)

| No. | The fact in short | Kind (tick one) |
|---|---|---|
| 1 | A path that changes with the notice “updated” | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 2 | A lesson vanishes with no sign of what was skipped | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 3 | A recommendation with no reason | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 4 | A beginner course for an advanced learner, from three clicks | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 5 | Difficulty drops two levels after one mistake, with no way back | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 6 | A note with the reason and a button to change it back | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 7 | A switch: the system decides, or I choose | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |
| 8 | Three start questions, which can be changed later | ☐ Opaque<br>☐ Wrong basis<br>☐ Helps |

**Part b (judged).**

**Which element is the best example of useful personalisation, the one you would keep unchanged?** Choose one. Any of the three helpful ones defends if the reason below says what the learner can see and do.

[[CHOOSE]] 3 · A recommendation with no reason ‖ 5 · Difficulty drops two levels after one mistake ‖ 1 · A path that changes with the notice “updated” ‖ 4 · A beginner course for an advanced learner ‖ 6 · A note with the reason and a button to change it back ‖ 7 · A switch: the system decides, or I choose ‖ 8 · Three start questions, which can be changed later ‖ 2 · A lesson that vanishes with no sign

**Part c (judged).**

[[ANSWER lines=3 label=Why keep it, and why not one of the others? Say what the learner can see and do with the element you keep, and name one element you would not keep, with the reason.]]

**Part d (judged).**

[[ANSWER lines=5 label=What are the advantages and the risks of personalisation here, and what would you change? Compare a platform that gives everyone the same content with one that adapts. Name the element (by number) that each change answers, and start each change with a verb.]]

## Block 1.2 · Strategic decision on adaptive learning: three options · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. Practises the three ratings at small scale; Block 2.2 is answered without it.*

**Draws on:** A5 · Weighing a personalisation measure: benefit, effort, risk.

You are planning a new learning platform. The budget is limited, the users are very different and the data basis is small (Case assumption: the costs). Effort follows the printed cost, by the rule in Materi A5. Option A uses standardised learning paths, option B uses simple rule-based personalisation, and option C builds a complex AI-based system.

| Option | What it is | Cost | Weeks | Benefit | Effort | Risk |
|---|---|---|---|---|---|---|
| **A** | Standardised learning paths | €9,000 | 3 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **B** | Simple personalisation with rules | €18,000 | 6 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **C** | A complex AI-based system | €45,000 | 12 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

| Priority | Option (A, B or C) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Justify your decision: weigh technology against benefit Say what each option gives and risks, given the small data basis and the different users.]]

## Block 1.3 · Coaching reflection: using personalisation sensibly · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: more technology is not better UX; ask when adaptive UX really pays off; mind the risk of over-engineering and the importance of data quality. Think back on Block 1.1 and write what comes to mind.

[[ANSWER lines=3 label=Which personalisation brings real added value?]]

[[ANSWER lines=3 label=When does standardisation make more sense?]]

[[ANSWER lines=3 label=Which decision is sustainable in the long term?]]

# Part 2 · Choose measures within the limits · Level 2 · Application · Case study (2 UE)

:::note Case study: 2 teaching units (UE5–6)
This part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your order with your group and for the trainer's closing. The blocks below need about 24 minutes of writing; the rest of the time is the group comparison.
:::

## Block 2.1 · Four problems · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. Practises pointing at a printed fact for a problem; Block 2.2 reads the facts, not this block.*

**Draws on:** A2 · Technology and algorithms: rules, models and their limits · A3 · UX patterns for personalised learning paths.

A problem is something that makes users not understand the adaptations, and you can point at it in the case or in a fact. Choose exactly four of the seven.

[[TICKALL]] Wrong prioritisation: the effort went into a complex system instead of into being understandable. ‖ The system needs a more powerful AI model. ‖ Lack of transparency: changes are not explained, so users do not know what changed or why. ‖ A wrong data basis: the system reacts strongly to very little data. ‖ The learner has no control: adaptations cannot be undone or switched off. ‖ The screens look out of date. ‖ There are too few courses.

[[ANSWER lines=3 label=Which printed fact supports your first problem? Quote a line of the case or point at an element by its number.]]

## Block 2.2 · Four improvements, rated, ordered and justified · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A5 · Weighing a personalisation measure: benefit, effort, risk · A1 · Adaptive learning systems: collect, analyse, adapt · A2 · Technology and algorithms: rules, models and their limits · A3 · UX patterns for personalised learning paths.

**The limits:** €60,000, 12 weeks. The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose exactly four of the nine measures.**

| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |
|---|---|---|---|---|---|---|
| M1 | Transparent adaptation | Every change says what changed and why, with a button to change it back. · The learner sees the reason. | €14,000 | 4 | Transparency | ☐ |
| M2 | Simple personalisation with three rules | A start level from three questions, skip what was passed, repeat what was missed. · The path fits the learner, and the rules can be stated. | €16,000 | 5 | Personalisation | ☐ |
| M3 | A clear structure | One path page in the same order for everyone, with the adapted parts marked. · The learner sees what is adapted. | €9,000 | 3 | Structure | ☐ |
| M4 | Targeted feedback | After each unit a short note on what changed in the path and what to do next. · Every unit ends with a clear next step. | €8,000 | 3 | Feedback | ☐ |
| M5 | Learner control | A switch to turn the adaptation off and to choose the path alone. · The learner decides. | €7,000 | 2 | Control | ☐ |
| M6 | A full deep-learning recommender | A model that predicts the best next lesson for each learner. · Lessons arrive that nobody can explain. | €45,000 | 10 | Adds technology | ☐ |
| M7 | Five variants of every lesson | Every lesson is rewritten five ways to fit different learners. · Lessons differ from learner to learner. | €30,000 | 6 | Adds variants | ☐ |
| M8 | A dashboard of twenty learner metrics | Learners see twenty figures about how the system rates them. · A wall of figures appears. | €18,000 | 5 | Adds information | ☐ |
| M9 | Badges for following the recommended path | A badge for every lesson taken in the order the system suggests. · Badges appear. | €6,000 | 2 | Adds rewards | ☐ |

**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each rating column. Benefit: how much it helps the learner understand and use the adaptation. Effort: by the printed cost, with the rule in Materi A5 (under €10,000, up to €25,000, above). Risk: what could go wrong, for example that the explanation confuses or the rules are too crude.

| Measure (M1 to M9) | Benefit | Effort | Risk |
|---|---|---|---|
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

[[ANSWER lines=3 label=Why these ratings? Measure 1 (name its number): which fact it answers, and what could go wrong.]]

[[ANSWER lines=3 label=Why these ratings? Measure 2:]]

[[ANSWER lines=3 label=Why these ratings? Measure 3:]]

[[ANSWER lines=3 label=Why these ratings? Measure 4:]]

**Step 3 · Check your plan against the limits.** Add up the costs of your four measures and find the longest one. Going over the budget or the time is allowed; if you do, say why in the reasons above. It is printed in your file as a fact.

| Total cost of your four measures | Budget | Longest measure (weeks) | Time limit |
|---|---|---|---|
| € __ | €60,000 | __ weeks | 12 weeks |

**Step 4 · Put your four measures in priority order.** The first is the most important.

| Priority | Measure (M1 to M9) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |
| 4 | __ |

[[ANSWER lines=3 label=Justify your decision: why does your first priority go first? Use the plan's rationale, comprehensibility before complexity: say how your first measure makes the system understandable.]]

[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision, and how you could find it out.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: your sort of the eight facts and your answers in Block 1.1, your four measures with their ratings and reasons, your order and justification, and your missing information. On the website the same file is exported as `1-{your-name}-day12-l1l2-ux-analysis`.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3) · Transfer project (3 UE)

:::note Transfer project: 3 teaching units (UE8–10)
This task is the day's Level 3 transfer project. It takes 3 UE (about 135 minutes): UE8 for Materi B and the brief, UE9 for Block 3.1, UE10 for Block 3.2, the presentation of your decision and the debrief with the trainer. The two blocks need about 20 minutes of writing; the rest of the time is the discussion of your decisions.
:::

## The situation: AdaptLearn's Chief Product & UX Officer

You are the Chief Product & UX Officer of AdaptLearn, which is to build a new learning platform. The users are very different, competitors use adaptive systems, and the data basis is not complete. Management wants a concept for the next 12 months, and expects you to decide how far to personalise, how gamification joins in, and to take responsibility for the system design.

| The limits | How the task runs |
|---|---|
| Budget for the year: €200,000 (Case assumption: the plan only says “limited”)<br>Data: it is incomplete, and you do not know how your learners will react.<br>You must decide anyway. | How the task runs:<br>1. Block 3.1: the approach to adaptive paths, the UX patterns, the concept sketch and how gamification joins in (draws on B1, B2).<br>2. Block 3.2: three prioritised measures, the risk analysis, one decision under uncertainty, and what you give up (draws on B2, B3). |

:::note Case assumption
The brief says: heterogeneous users, competitors that use adaptive systems, an incomplete data basis, a limited budget. Everything else is made up: the €200,000, the pattern cards, the sketch elements, and the seven decisions with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*

## Block 3.1 · The approach, the patterns, the concept sketch and gamification · JUDGED · Core · about 10 min

**Draws on:** B1 · Personalisation as a strategic UX option: need, data, technique, explanation · B2 · Conflicting goals: UX against technology, personalisation against standardisation.

**The approach to adaptive learning paths** Choose the approach you will take to management. A decision with a clear reason counts, whichever you choose.

[[CHOOSE]] A full AI system from the start, as competitors do ‖ No personalisation: standard paths for all ‖ Not yet: test a prototype with real learners first ‖ Rules first, model later: simple, explained rules now, a data-driven model once there is enough data

[[ANSWER lines=3 label=Why this approach, and not the others? Give the reason in terms of the data you have and what the learner can understand, not in terms of what competitors do.]]

**UX design patterns for personalised paths: choose at least three** A pattern is good when the learner can see it, understand it and steer it. Choose at least 3.

[[TICKALL]] Feedback based on behaviour after each unit ‖ A recommendation with no reason ‖ A start questionnaire the learner can edit later ‖ Silent re-routing with no message ‖ A dynamic path shown as a map, with adapted parts marked ‖ Adaptive difficulty with a notice and an undo ‖ A recommendation with a reason (“because you missed …”) ‖ A hidden score that ranks learners ‖ Difficulty that drops after one mistake, with no way back

**The low-fidelity concept sketch: place eight elements on the screens** Place each element on the screen of the first prototype where it belongs, or under “not in the first prototype” if it can wait or should be dropped. Write the letter of your choice in the last column. Use each section at least once.

| Letter | Section |
|---|---|
| A | Start screen |
| B | Path screen |
| C | Lesson screen |
| D | Not in the first prototype |

| No. | Item | Section (A to D) |
|---|---|---|
| 1 | Three questions about goal and prior knowledge | __ |
| 2 | A path map with the adapted parts marked | __ |
| 3 | A “Why this lesson?” link | __ |
| 4 | A difficulty notice with an undo button | __ |
| 5 | A goal bar: lessons toward the learner's own goal | __ |
| 6 | A “next step” card after each unit | __ |
| 7 | A hidden AI score for each learner | __ |
| 8 | A dashboard of twenty learner metrics | __ |

[[ANSWER lines=3 label=How does gamification join the personalisation? Name one gamification element, the personal goal it serves, and one risk to watch (Day 11).]]

## Block 3.2 · Measures, risk, a decision under uncertainty, and what you give up · JUDGED · Core · about 10 min

**Draws on:** B2 · Conflicting goals: UX against technology, personalisation against standardisation · B3 · Deciding with an incomplete data basis: a decision you can check later.

**Choose exactly 3 measures for your personalisation strategy.**

| No. | Decision | What it is | Cost | Weeks | Acts on | Choose (3) |
|---|---|---|---|---|---|---|
| D1 | Transparent adaptive paths | Every adaptation says what and why, shows the adapted parts on a path map, and can be undone. | €60,000 | 16 | Transparency | ☐ |
| D2 | Rule-based personalisation for start level and difficulty | A start questionnaire, skipping what was passed, repeating what was missed, with the rules stated. | €45,000 | 12 | Personalisation | ☐ |
| D3 | Gamification tied to the learner's own goal | A goal bar chosen at the start and filled by checked lessons, with no ranking. | €40,000 | 10 | Motivation | ☐ |
| D4 | A low-fidelity prototype tested with eight learners | The concept sketch is tested on paper or clickable screens before anything is built. | €18,000 | 6 | Gathers evidence | ☐ |
| D5 | A full AI recommender | A model that chooses the next lesson for each learner from behaviour data. | €120,000 | 24 | Adds technology | ☐ |
| D6 | A personalised leaderboard with prizes | Learners are ranked against others like them, with prizes for the top. | €35,000 | 10 | Adds a contest | ☐ |
| D7 | Automatic adaptation with no learner control | The system adapts silently and the learner cannot see or change it. | €30,000 | 8 | Hides the adaptation | ☐ |

| Total cost of your measures | Yearly budget |
|---|---|
| € __ | €200,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

| Priority | Measure (D1 to D7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first measure go first? Say what it does for the learner's understanding rather than for the technology.]]

**Risk analysis: opacity, over-adaptation and a wrong data basis** Imagine the platform has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] We built what competitors have, with no link to our learners' needs. ‖ Gamification rewarded activity, and learners followed the bar and did not learn. ‖ Over-adaptation: the system boxed learners in after a few clicks, and they never saw other content. ‖ A wrong data basis: the data was too thin or biased, so the adaptations were wrong for many users. ‖ Opacity: learners did not understand why things changed, and stopped trusting the system.

[[ANSWER lines=2 label=What do you do about that risk? One action, and when you would notice the risk.]]

**One decision you make under uncertainty (without a complete data basis)** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your answers in Blocks 3.1 and 3.2, your three measures with their order, your biggest risk and what you do about it, your decision under uncertainty, and what you give up. On the website the same file is exported as `2-{your-name}-day12-l3-ux-strategy`.
:::

