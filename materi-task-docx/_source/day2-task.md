---
doc: task
day: 2
kicker: DAY 2 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: LearnPro: Prototype and Test Plan, and Innovation Strategy
subtitle: Compare a successful and a weak platform, plan prototypes and tests, and decide whether to invest in adaptive learning
daytitle: Day 2 · Module 1 (day 2 of 2): Practical analysis of successful e-learning platforms, prototyping and testing of learning interfaces, future technologies and adaptive learning systems
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
website: Not yet published (the link will be added once Day 2 is deployed)
case: LearnPro, a stagnating learning platform
intro: This is the worksheet for Day 2. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: prototype,low-fi,iterative,bml,think-aloud,kpi,qualitative,adaptive,recommendation,learning-analytics,personalisation,cold-start,over-engineering,ab-test,stage-gate,gdpr,ai-act,mvp,completion,dropout,engagement,learning-path,progress-indicator,feedback,usability-test,roadmap,decision-architecture,symptom
---

[[CONTENTS]]

:::note Which plan item each block answers
| Plan item (Strukturplan, Day 2) | Block in this document |
|---|---|
| Level 1 · Task 1: compare Platform A and B, which one you prefer and why, identify 5 differences, derive 3 principles of success | Block 1.1 (Core): the eight facts are sorted (the differences), then preference and three principles |
| Level 1 · Task 2: prototyping and testing options A, B, C under 3 months, limited budget, unclear needs; assess risk, benefit, effort; decide; risks without testing | Block 1.2 (Optional) |
| Coaching: from design to validation; reflection questions | Block 1.3 (Optional) |
| Level 2 case study LearnPro: analyse the weaknesses, develop a prototype approach, define 3 UX tests, decide whether adaptive learning is worthwhile | Block 2.1 (Optional, weaknesses) and Block 2.2 (Core, prototype approach, three tests, adaptive decision) |
| Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |
| Level 3 transfer project: decision on adaptive learning (yes, no, partly), prototyping strategy, UX testing strategy, prioritised innovation roadmap, risk analysis, one decision under uncertainty | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: LearnPro, a stagnating learning platform

LearnPro is a learning platform that has stopped growing. Learners drop out of courses early, there is no personalisation, and the content is rated as "boring". You are part of the product team and the goal is to improve the platform. Management gives you three months and a limited budget, and the needs of the learners are not clear yet.

| What you have | The limits | How the task runs |
|---|---|---|
| Two platforms in outline: Platform A (a benchmark) and Platform B (LearnPro today), with eight facts (Block 1.1).<br>Three options for prototyping and testing (optional Block 1.2) and six possible weaknesses (optional Block 2.1).<br>Five prototype approaches and seven UX tests, each with a cost and weeks (Block 2.2). | **Time:** 3 months (12 weeks)<br>**Budget:** €60,000 (Case assumption: the plan only says "limited")<br>User needs are unclear. | Two Core blocks, about 30 minutes:<br>1. Block 1.1: sort eight facts, say which platform you prefer, write three principles of success.<br>2. Block 2.2: choose a prototype approach and three UX tests, decide on adaptive learning, name what is missing.<br>Three more blocks (about 20 minutes) are Optional. |

:::note Case assumption
The brief says: users drop out early, no personalisation, content rated boring, three months, limited budget, unclear user needs. Everything else is made up for this exercise: the two platform drawings, the €60,000, and the costs and weeks of the options.
:::

## The evidence: two platforms and eight facts

The picture shows two platforms in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is good or bad.

![Platform A (a benchmark) and Platform B (LearnPro today), drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d2_t1_platform-a-b.png)

| No. | Platform | What is there |
|---|---|---|
| 1 | A | The course page shows a path of six steps and marks the current one. |
| 2 | A | A progress bar and the text "Step 2 of 6" sit at the top. |
| 3 | A | Each learning unit says "6 min" and has one goal. |
| 4 | A | After a quiz the screen says "4 of 5 correct" and names the question to review. |
| 5 | B | The course is one long page of about 40 minutes of reading. |
| 6 | B | There is no menu or list of the parts of the course; the only way on is to scroll. |
| 7 | B | There is no sign of how far along the learner is. |
| 8 | B | After the last page the learner is returned to the course list without any message. |

# Part 1 · Compare platforms and options · Level 1 · Knowledge

## Block 1.1 · Two platforms: success practices and principles · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · What successful learning platforms have in common.

**Part a (objective).** Sort each fact into the practice it belongs to. Tick one box per fact. The three practices are the three questions of card A1: *Learning path* (what do I do next?), *Short units* (can I do this in the time I have?) and *Feedback* (am I getting somewhere, and did I get it right?).

| No. | The fact in short | Practice (tick one) |
|---|---|---|
| 1 | A: a path of six steps, current step marked | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 2 | A: progress bar and "Step 2 of 6" | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 3 | A: each unit "6 min" with one goal | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 4 | A: "4 of 5 correct", question to review | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 5 | B: one long page, about 40 minutes | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 6 | B: no menu, the only way on is to scroll | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 7 | B: no sign of how far along | ☐ Learning path<br>☐ Short units<br>☐ Feedback |
| 8 | B: no message after the last page | ☐ Learning path<br>☐ Short units<br>☐ Feedback |

**Part b (judged).** Which platform would you prefer as a learner?

[[OPTIONS]] Platform A ‖ Platform B

[[ANSWER lines=3 label=Why? Say what you, as a learner, can do or feel on that platform that you cannot on the other.]]

**Part c (judged).** Derive three principles of success from the differences. Write each as one sentence with a reason: "Do X, because Y."

[[ANSWER lines=2 label=Principle 1]]

[[ANSWER lines=2 label=Principle 2]]

[[ANSWER lines=2 label=Principle 3]]

## Block 1.2 · Prototype and test: three options under time pressure · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. It practises the three ratings on a prototyping decision at small scale; Block 2.2 is answered without it.*

**Draws on:** A2 · Prototyping · A5 · Weighing a prototyping and testing decision.

You are developing a new learning platform. You have three months, a limited budget (€60,000, Case assumption) and the needs of users are unclear. Three options are on the table. Effort follows the printed cost, by the rule in Materi A5.

| Option | What it is | Cost | Weeks | Benefit | Effort | Risk |
|---|---|---|---|---|---|---|
| **A** | Develop a high-fidelity prototype of the core flows immediately | €22,000 | 6 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **B** | Test low-fidelity first | €6,500 | 2 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **C** | Develop directly without testing | €48,000 | 11 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

Your decision:

[[OPTIONS]] A ‖ B ‖ C

[[ANSWER lines=3 label=Why? One or two sentences: refer to the cost, to what you will know afterwards, or to what could go wrong.]]

**What risks arise without testing?** Tick all that apply to this case, then add your own in the box.

[[TICKALL]] We build the wrong thing. ‖ We find out late, when change is expensive. ‖ The budget is spent on rework. ‖ Learners leave before we know why. ‖ A competitor ships a better version while we rework.

[[ANSWER lines=2 label=Another risk, or the one that worries you most and why:]]

## Block 1.3 · Coaching reflection: from design to validation · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: successful platforms are not "good by chance"; prototyping reduces risk; testing is the basis for decisions. Think back on Block 1.1 and write what comes to mind.

[[ANSWER lines=3 label=What happens if we do not test?]]

[[ANSWER lines=3 label=Which decision costs the most later on?]]

[[ANSWER lines=3 label=When does technology make sense, and when is it over-engineering?]]

# Part 2 · Plan prototypes and tests · Level 2 · Application

## Block 2.1 · Three main weaknesses of LearnPro · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. It practises pointing at a printed fact for a weakness; Block 2.2 does not read this block.*

**Draws on:** A1 · What successful learning platforms have in common · A3 · Testing a learning interface.

A weakness is something you can point at in the case or in the facts of Block 1.1. Choose exactly three of the six.

[[TICKALL]] Learners get no feedback on what they do or how far they have come. ‖ Every learner gets the same path and the same content, whatever they already know. ‖ The content is long and passive, with little to do. ‖ The visual style of the platform looks dated. ‖ The course catalogue is too small. ‖ The subscription price is too high.

[[ANSWER lines=3 label=Which printed fact supports your first weakness? Quote a line of the case or point at a fact by its number.]]

## Block 2.2 · Prototype approach, three UX tests and the adaptive decision · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A2 · Prototyping · A3 · Testing a learning interface · A4 · Adaptive learning (Optional card; the rule you need for Step 3 is repeated in A5) · A5 · Weighing a prototyping and testing decision.

**The limits:** 3 months (12 weeks), €60,000. User needs are unclear. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose one prototype approach.**

| No. | Approach | Cost | Weeks | Choose (one) |
|---|---|---|---|---|
| P1 | Paper sketches of the course start and the learning path; test with five learners; then a clickable low-fidelity version | €5,000 | 2 | ☐ |
| P2 | A clickable low-fidelity prototype of the whole course flow (start, unit, quiz, end); test; refine | €14,000 | 5 | ☐ |
| P3 | A high-fidelity prototype of the whole platform with the final look | €36,000 | 8 | ☐ |
| P4 | Build the adaptive engine first and test it on the real platform | €72,000 | 14 | ☐ |
| P5 | Build the redesign directly and test after launch | €54,000 | 12 | ☐ |

[[ANSWER lines=3 label=Why this approach? Say what question it answers first and what it leaves for later.]]

**Step 2 · Define three UX tests.** Choose exactly three. Each shows what it answers, what kind of data it gives, its cost and its weeks.

| No. | Test | What it answers · kind of data | Cost | Weeks | Choose (three) |
|---|---|---|---|---|---|
| T1 | Paper-prototype test with 5 learners, task-based | Can learners find the next step? Why not? · qualitative | €3,000 | 1 | ☐ |
| T2 | Clickable low-fidelity test with 5 learners, think-aloud | Do learners complete a whole flow? Where do they hesitate? · qualitative, plus time on task | €6,000 | 2 | ☐ |
| T3 | Unmoderated remote test with 30 learners | How many complete the task, and how fast? · quantitative | €9,000 | 3 | ☐ |
| T4 | A/B test of two course-start screens on live traffic | Which version raises the share who finish lesson 1? · quantitative; needs enough learners | €12,000 | 6 | ☐ |
| T5 | Drop-out analysis per lesson from existing logs | Where do learners leave? · quantitative; shows where, not why | €4,000 | 2 | ☐ |
| T6 | Interviews with 8 learners who left | Why did they leave? · qualitative | €5,000 | 2 | ☐ |
| T7 | Usability test of the full high-fidelity redesign | Does the finished design work in detail? · qualitative and quantitative | €30,000 | 8 | ☐ |

| Test (T1 to T7) | The question it answers for LearnPro |
|---|---|
| __ | __ |
| __ | __ |
| __ | __ |

| Cost of your approach plus your three tests | Budget | Longest weeks | Time limit |
|---|---|---|---|
| € __ | €60,000 | __ weeks | 12 weeks |

Going over the budget or the time is allowed; if you do, say why in your reasons. It is printed in your file as a fact.

**Step 3 · Decide: is adaptive learning worthwhile for LearnPro?**

[[OPTIONS]] Yes ‖ Partly ‖ No

[[ANSWER lines=4 label=Your reason, and the first step you would take. If you say Partly, say which part and which part waits.]]

**Step 4 · What information are you missing?**

[[ANSWER lines=3 label=Name something specific you do not know that would change your decision, and how you could find it out.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: your sort of the eight facts, your preference and principles, your prototype approach with its three tests and the questions they answer, your adaptive decision and your missing information. On the website the same file is exported as `1-{your-name}-day2-l1l2-ux-analysis`.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3)

## The situation: LearnPro's Chief Product Officer

You are the Chief Product Officer of LearnPro. Competitors use AI and adaptive systems, your own platform is outdated, the budget is limited and your data situation is incomplete. Management wants a future strategy for the next 12 months and expects you to take responsibility for the investment decisions.

| The limits | How the task runs |
|---|---|
| **Budget for the year:** €200,000 (Case assumption: the plan only says "limited")<br>**Data:** incomplete: you know where learners leave, not why.<br>You must decide even though the data is incomplete. | Two Core blocks, about 20 minutes:<br>1. Block 3.1: your decision on adaptive learning, your prototyping and testing strategy, the data you need and your roadmap (draws on B1, B2).<br>2. Block 3.2: the biggest risk, one decision under uncertainty, how you will decide in future, and what you give up (draws on B3). |

:::note Case assumption
The brief says: competitors use AI and adaptive systems, an outdated platform, a limited budget, incomplete data. Everything else is made up: the €200,000, the seven investments with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*

## Block 3.1 · Decision, prototyping and testing strategy, data and roadmap · JUDGED · Core · about 9 min

**Draws on:** B1 · UX investments as staged bets · B2 · Conflicting goals: personalisation, hype and scale.

**Do we invest in adaptive learning?**

[[OPTIONS]] Yes ‖ Partly ‖ No

[[ANSWER lines=3 label=Why? If you say Partly, say which part you fund now and which part waits for evidence.]]

[[ANSWER lines=3 label=Prototyping strategy: how will we test new features? Name the fidelity you start with and the first question it answers.]]

**UX testing strategy: which data do we need?** Choose at least three, and be ready to say which question each answers.

[[TICKALL]] Drop-out per lesson from existing logs (shows where learners leave) ‖ Interviews with learners who left (shows why) ‖ Task success and time in usability tests ‖ Completion per course in a pilot with a control group ‖ Time on task in the live platform ‖ Competitors' feature lists ‖ Consent and legal basis for tracking learners

**Your roadmap: choose exactly three investments.** Each shows what it is, its cost and its weeks, and what it acts on.

| No. | Investment | What it is | Cost | Weeks | Acts on | Choose (three) |
|---|---|---|---|---|---|---|
| I1 | Guided path and feedback redesign, tested with low-fidelity prototypes | Rework the course flow around one path and a result after each quiz; test before building. | €30,000 | 10 | Guidance and feedback | ☐ |
| I2 | Rule-based personalisation pilot | A pre-test lets learners skip what they know; one course, with a control group. | €40,000 | 16 | Adaptive step | ☐ |
| I3 | Learning-analytics dashboard for the product team | Completion and drop-out per lesson, with consent and a stated purpose. | €25,000 | 12 | Evidence | ☐ |
| I4 | A standing prototype-and-test routine | Every new feature gets a low-fidelity test before it is built. | €20,000 | 52 | Evidence and process | ☐ |
| I5 | AI recommendation engine for all courses | Software that suggests the next lesson to each learner from their behaviour. | €120,000 | 40 | Adds technology | ☐ |
| I6 | New visual design of the whole platform | Colours, icons, fonts and layout. | €60,000 | 20 | The look | ☐ |
| I7 | Interactive exercises for the three most boring courses | Replace long text with short tasks and feedback. | €45,000 | 20 | Engagement | ☐ |

| Total cost of your three investments | Yearly budget |
|---|---|
| € __ | €200,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

| Order | Investment (I1 to I7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first investment go first? Reach, cost, what the others depend on, or the evidence it brings.]]

## Block 3.2 · Risk, a decision under uncertainty, how you decide, and what you give up · JUDGED · Core · about 11 min

**Draws on:** B3 · Deciding under uncertainty · B2 · Conflicting goals.

**The biggest risk of your plan** (technology against user value). Imagine the plan has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] We buy technology that the data cannot support. ‖ Competitors' AI gets ahead while we run pilots. ‖ Learners do not understand or trust the recommendations. ‖ The pilot is too small to show a result. ‖ The legal check for adaptive features comes too late.

[[ANSWER lines=3 label=What do you do about that risk? One action, and when you would notice the risk.]]

**One decision you deliberately make under uncertainty.** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

**How will LearnPro decide on innovations in future? Who decides?** Choose one.

[[CHOOSE]] The Chief Product Officer alone ‖ The product lead together with the head of data ‖ A steering group with management ‖ The vendor of the technology

**On what evidence?** Choose at least two.

[[TICKALL]] A pilot with a control group ‖ A usability test of the new screens ‖ Drop-out data per lesson ‖ A vendor demonstration or competitor comparison ‖ The opinion of the most senior person in the room

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your decision on adaptive learning, your prototyping and testing strategy, the data you need, three investments with their order and reason, your biggest risk and what you do about it, your decision under uncertainty, who decides and on what evidence, and what you give up. On the website the same file is exported as `2-{your-name}-day2-l3-ux-strategy`.
:::
