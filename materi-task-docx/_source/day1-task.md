---
doc: task
day: 1
kicker: DAY 1 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: LearnFast: UX Analysis File and UX Strategy Memo
subtitle: Read a learning platform from the learner's side, choose measures within a budget, and decide as Chief UX Officer
daytitle: Day 1 · Module 1 (day 1 of 2): Fundamentals of UX/UI design for digital learning platforms and user-centred design of learning interfaces
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
website: https://aion-dl.vercel.app/day/1/ (Route 1: /day/1/route-1/ · Route 2: /day/1/route-2/)
case: SkillUp GmbH, an EdTech company with the learning platform LearnFast
intro: This is the worksheet for Day 1. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no right-answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: dropout,completion,orientation,cognitive-load,progress-indicator,feedback,gamification,badge,leaderboard,usability-test,symptom,roadmap,decision-architecture,user-impact,edtech,dashboard,premortem,stakeholder,conflicting-goals,learning-path,wireframe,heuristic
---

[[CONTENTS]]

:::note Which plan item each block answers
| Plan item (Strukturplan, Day 1) | Block in this document |
|---|---|
| Level 1 · Task 1: describe problems from the user's side, sort them into Orientation, Understanding, Motivation, suggest improvements | Block 1.1 (Core): the eight findings are sorted, the most serious is chosen with a reason, three improvements are written |
| Level 1 · Task 2: assess three measures on user impact, effort and risk, prioritise, say what information is missing | Block 2.2 (Core), with the same three criteria and the same missing-information question |
| Coaching: UX is a decision problem; reflection questions | Block 1.3 (Optional) |
| Level 2 case study SkillUp: analyse the problems, identify three main causes, develop four measures, prioritise | Blocks 2.1 (Optional) and 2.2 (Core) |
| Feedback round with a management perspective | A classroom discussion led by the facilitator; not a worksheet block |
| Level 3 transfer project: UX vision, three strategic decisions, roadmap, risk analysis, decision architecture, one decision despite incomplete data | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: SkillUp GmbH and its platform LearnFast

SkillUp GmbH is an EdTech company. It runs the learning platform LearnFast, where professionals take online courses. 40 of every 100 learners who start a course do not finish it. Learners say the content is hard to understand, and there is no clear learning path. The dashboard is cluttered, the lessons are long texts without structure, and there is no progress bar. Management asks the UX lead which measures to fund.

| What you have | The limits | How the task runs |
|---|---|---|
| Eight findings on the LearnFast screens (Block 1.1).<br>The 40% drop-out figure (optional Block 1.2) and six possible causes (optional Block 2.1).<br>Nine measures SkillUp could fund, each with a cost and weeks (Block 2.2). | **Budget:** €50,000<br>**Time:** 2 months (8 weeks)<br>Measures can run in parallel (Case assumption). | Two Core blocks, about 30 minutes:<br>1. Block 1.1: sort eight findings and say which makes a learner give up first.<br>2. Block 2.2: choose four of nine measures, rate them, order them, name what is missing.<br>Three more blocks (about 20 minutes) are Optional. |

:::note Case assumption
The brief says: a cluttered dashboard, long texts without structure, no progress bar, many drop-outs, a 40% drop-out rate, content hard to understand, no clear learning path, €50,000 and two months. Everything else is made up for this exercise: the 14 tiles, the 500 words, the four clicks, the quiz, the costs and the weeks.
:::

## The evidence: four LearnFast screens and eight findings

The picture shows four LearnFast screens in outline. The numbers 1 to 8 mark the places the findings below describe. The table prints each finding as a plain fact: it says what is there, never whether it is a problem.

![The LearnFast screens, drawn in outline. Numbers 1 to 8 mark the findings in the table below (Case assumption: the details are made up for this exercise).](_figures/d1_t1_learnfast-screens.png)

| No. | Screen | What is there |
|---|---|---|
| 1 | Dashboard | The dashboard shows 14 tiles of the same size and colour. Nothing tells the learner where to start. |
| 2 | Dashboard | The course a learner opened yesterday is not on the first screen. It sits under "All courses", four clicks away. |
| 3 | Course page | A lesson ends and the page shows no "Next lesson" button. The learner has to go back to the list and search for the next one. |
| 4 | Lesson 3 | Lesson 3 is one block of about 500 words. It has no headings, no paragraphs and no picture. |
| 5 | Lesson 3 | Terms such as "wireframe" and "heuristic" appear without any short explanation. |
| 6 | Lesson 3 | The sentences are long: most have 25 words or more, with several sub-clauses. |
| 7 | Course page | The course page has no progress bar and does not say how many lessons are left. |
| 8 | Quiz | After a quiz the screen simply reloads. No message tells the learner whether it went well. |

# Part 1 · Read the platform from the learner's side · Level 1 · Knowledge

## Block 1.1 · Eight findings: Orientation, Understanding or Motivation? · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · UX is the experience, UI is the surface · A3 · Three principles of a good learning interface.

**Part a (objective).** Sort each of the eight findings into the one area it breaks first. Tick one box per finding. The three areas are the three questions of card A3: *Orientation* (can the learner tell where they are, where to start and what comes next?), *Understanding* (can the learner follow what they read without extra effort?) and *Motivation* (can the learner see they are getting somewhere, and get a sign when they succeed?).

| No. | The finding in short | Area (tick one) |
|---|---|---|
| 1 | 14 equal tiles on the dashboard | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 2 | Yesterday's course is four clicks away | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 3 | No "Next lesson" button | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 4 | One 500-word block of text | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 5 | Technical terms without explanation | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 6 | Very long sentences | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 7 | No progress bar | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |
| 8 | No message after a quiz | ☐ Orientation<br>☐ Understanding<br>☐ Motivation |

**Part b (judged).** Imagine you are a learner on LearnFast. Which one finding would make you give up first? Any of the eight can be a good answer; the reason is what counts.

[[CHOOSE]] 1 · 14 equal tiles on the dashboard ‖ 2 · Yesterday's course is four clicks away ‖ 3 · No "Next lesson" button ‖ 4 · One 500-word block of text ‖ 5 · Technical terms without explanation ‖ 6 · Very long sentences ‖ 7 · No progress bar ‖ 8 · No message after a quiz

[[ANSWER lines=4 label=Why that one, from the learner's side? Write it as the learner would feel it ("I would not know…"). Say what they cannot do or feel, not what looks wrong. At least one or two full sentences.]]

**Part c (judged).**

[[ANSWER lines=3 label=Formulate three ideas for improvement. Start each with a verb, name the finding it answers by its number, and say what the learner can then do.]]

## Block 1.2 · What the 40% shows and does not show · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. It practises reading one number without turning it into a cause; Block 2.2 is answered without it.*

**Draws on (related):** B1 · Why UX matters to the business.

The case brief says: "40 of every 100 learners who start a course do not finish it." Decide for each statement below whether the number alone shows it, or whether the statement needs something the number does not hold.

| No. | Statement | The number shows this | The number does not show this |
|---|---|---|---|
| 1 | 40 of every 100 learners who start a course do not finish it. | ☐ | ☐ |
| 2 | Learners leave because the lessons are too hard. | ☐ | ☐ |
| 3 | A progress bar would bring the number down. | ☐ | ☐ |
| 4 | More than one in three learners who start do not finish. | ☐ | ☐ |
| 5 | The 40 who leave are the learners who find the content boring. | ☐ | ☐ |

[[ANSWER lines=3 label=What would you need to find out to know why learners leave? Name one source of evidence about the learners themselves.]]

## Block 1.3 · Coaching reflection: from Level 1 to Level 2 · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: UX is not a design problem but a decision problem. Designing beautifully is not the same as designing effectively; think in the learner's flow, not in single screens. Think back on Block 1.1 and write what comes to mind, in a sentence or two.

[[ANSWER lines=3 label=Which decision really improves learning?]]

[[ANSWER lines=3 label=What is "nice to have", and what is "critical"?]]

[[ANSWER lines=3 label=Which UX decision has a business impact?]]

# Part 2 · Choose measures within the limits · Level 2 · Application

## Block 2.1 · Three main causes of the drop-out · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. It practises pointing at a printed fact for a cause; Block 2.2 reads the findings, not this block.*

**Draws on:** A3 · Three principles of a good learning interface.

A cause is something you can point at in the case or in a finding. Choose exactly three of the six possible causes.

[[TICKALL]] Learners have no clear path through a course: what to do first, next and last. ‖ Lessons are hard to follow: long, unstructured text with unexplained terms. ‖ Learners cannot see their progress or whether they are succeeding. ‖ The visual style of the platform looks dated. ‖ The course catalogue is too small. ‖ The subscription price is too high.

[[ANSWER lines=3 label=Which printed fact supports your first cause? Quote a line of the case or point at a finding (by its number). At least one sentence.]]

## Block 2.2 · Four measures, rated and ordered · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A5 · Weighing a measure: user impact, effort, risk · A2 · Design from the learner's need, not from the system's logic · A3 · Three principles of a good learning interface.

**The limits:** €50,000, 2 months (8 weeks). The findings of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose exactly four of the nine measures.** Each measure shows what it does, what a learner notices, its cost and its weeks, and what it acts on.

| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |
|---|---|---|---|---|---|---|
| M1 | Define learning paths | For each course, set one guided path: what to do first, next and last. · After the first lesson the learner sees "Next: lesson 2" and the whole path. | €18,000 | 6 | Orientation | ☐ |
| M2 | Split lessons into short units | Cut the long lessons into units of five to seven minutes, each with one goal. · A lesson becomes a few short screens, each with a clear goal at the top. | €14,000 | 5 | Understanding | ☐ |
| M3 | Add a progress indicator | Show a progress bar and the number of lessons left on every course page. · The learner sees "3 of 8 lessons done" on the course page. | €6,000 | 2 | Motivation | ☐ |
| M4 | Structure the text of each lesson | Add headings, short paragraphs and a picture, and explain each technical term in one line. · A lesson can be scanned: headings show the structure, a term shows its meaning on tap. | €9,000 | 3 | Understanding | ☐ |
| M5 | Points and badges | Give points and badges for each finished lesson. · After a lesson a badge appears and the point total goes up. | €12,000 | 4 | Motivation | ☐ |
| M6 | Discussion forum | Add a forum where learners can ask each other questions. · A new "Forum" entry appears in the menu. | €22,000 | 8 | Adds a new feature | ☐ |
| M7 | New visual style | Redesign colours, icons and fonts of the whole platform. · The platform looks different; the way it works stays the same. | €15,000 | 4 | The look, not the experience | ☐ |
| M8 | Ten new courses | Add ten new courses to the catalogue. · The catalogue is longer; the courses work as before. | €20,000 | 8 | Adds more content | ☐ |
| M9 | Interview learners who left, and test one course | Interview ten learners who left and run a usability test of one course. · Nothing changes on screen yet; SkillUp learns why learners stop. | €7,000 | 3 | Gathers evidence | ☐ |

**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each of the three rating columns. User impact: how much it helps learners with a printed finding. Effort: by the printed cost, with the rule in Materi A5. Risk: what could go wrong or backfire. Then give your reason in one or two sentences: which printed finding the measure answers, and what could go wrong.

| Measure (M1 to M9) | User impact | Effort | Risk |
|---|---|---|---|
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

[[ANSWER lines=3 label=Why these ratings? Measure 1 (name its number):]]

[[ANSWER lines=3 label=Why these ratings? Measure 2:]]

[[ANSWER lines=3 label=Why these ratings? Measure 3:]]

[[ANSWER lines=3 label=Why these ratings? Measure 4:]]

**Step 3 · Check your plan against the limits.** Add up the costs of your four measures and find the longest one. Going over the budget or the time is allowed; if you do, say why in the reasons above. It is printed in your file as a fact.

| Total cost of your four measures | Budget | Longest measure (weeks) | Time limit |
|---|---|---|---|
| € __ | €50,000 | __ weeks | 8 weeks |

**Step 4 · Put your four measures in priority order.** The first is the most important.

| Priority | Measure (M1 to M9) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |
| 4 | __ |

[[ANSWER lines=3 label=Why does your first priority go first? A reason for position one, not for the whole set. Refer to the learner's problem, the cost or what the others depend on.]]

[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision, and how you could find it out.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: this part of the document with your sort of the eight findings, your reasons, your four measures with their ratings, your order and your missing information. On the website the same file is exported as `1-{your-name}-day1-l1l2-ux-analysis`. Do not hand in anything about the answers of Task 2 here.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3)

## The situation: SkillUp's Chief UX Officer

You are the Chief UX Officer of SkillUp GmbH, the EdTech company that runs LearnFast. The market is growing strongly, competitors offer better UX, the budget is limited and users are impatient. Management wants a UX strategy for the next 12 months, and it wants you to take responsibility for it.

| The limits | How the task runs |
|---|---|
| **Budget for the year:** €120,000 (Case assumption: the plan only says "limited")<br>**Drop-out today:** 40 of every 100 learners who start a course.<br>You must decide even though you do not have complete user data. | Two Core blocks, about 20 minutes:<br>1. Block 3.1: your UX vision, three strategic decisions and their order (draws on B1, B2).<br>2. Block 3.2: the biggest risk, one decision without complete data, how you will decide in future, and what you give up (draws on B3). |

:::note Case assumption
The brief says: a strongly growing market, competitors with better UX, a limited budget, impatient users. Everything else is made up: the €120,000, the seven decisions with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers (for example the finding you judged most serious) in your memo.*

## Block 3.1 · UX vision, three decisions, and their order · JUDGED · Core · about 9 min

**Draws on:** B1 · Why UX matters to the business · B2 · Conflicting goals: user value, effort and business goals.

[[ANSWER lines=3 label=Your UX vision: how should learning be experienced at SkillUp? One or two sentences about the learner's experience, not a list of features.]]

**Choose exactly three strategic UX decisions.** Each shows what it is, what a learner notices, its cost and weeks, and what it acts on.

| No. | Decision | What it is · what a learner notices | Cost | Weeks | Acts on | Choose (three) |
|---|---|---|---|---|---|---|
| D1 | Guided learning paths for the three most-taken courses | Rebuild the three busiest courses around one path each: first, next, last. · A learner always sees where they are on the path and what comes next. | €45,000 | 16 | Orientation | ☐ |
| D2 | Progress and feedback on every course page and quiz | Show progress on every course page and give a clear message after every quiz. · A learner sees how far they have come and how they did. | €25,000 | 12 | Motivation | ☐ |
| D3 | Rewrite the ten longest lessons as short, structured units | Rewrite the ten longest lessons with headings, short paragraphs and plain wording. · Those ten lessons can be scanned and followed without effort. | €40,000 | 20 | Understanding | ☐ |
| D4 | A standing user-research programme | Interview learners every month and run a usability test every quarter, and feed the results to every UX decision. · Nothing changes on screen at first; decisions rest on what learners actually do. | €30,000 | 52 | Gathers evidence | ☐ |
| D5 | Points, badges and a leaderboard | Introduce points for each lesson, badges for milestones and a ranking of learners. · Learners collect points and see where they stand against others. | €35,000 | 16 | Adds rewards | ☐ |
| D6 | AI-driven personal recommendations | Build a system that recommends the next lesson to each learner from their behaviour. · Each learner is shown a different next step, chosen by software. | €90,000 | 36 | Adds technology | ☐ |
| D7 | Double the marketing budget | Spend twice as much on advertising to win more new learners. · More new learners arrive; the platform they meet is unchanged. | €60,000 | 12 | Aims at growth, not experience | ☐ |

| Total cost of your three decisions | Yearly budget |
|---|---|
| € __ | €120,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

**Your roadmap: put the three decisions in order.** The first happens first.

| Order | Decision (D1 to D7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first decision go first? A reason for position one: reach, cost, what the others depend on, or the evidence it brings.]]

## Block 3.2 · The biggest risk, a decision without complete data, how you decide, and what you give up · JUDGED · Core · about 11 min

**Draws on:** B3 · Deciding when you do not know enough · B2 · Conflicting goals: user value, effort and business goals.

**The biggest risk of your plan.** Imagine the plan has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] We treat the symptom (drop-out) and miss its cause. ‖ Competitors improve faster than we do while we prepare. ‖ Learners do not use the new paths or progress views. ‖ The budget is used up before a first result is visible. ‖ Management expects the drop-out rate to fall within weeks.

[[ANSWER lines=3 label=What do you do about that risk? One action, and when you would notice the risk.]]

**One decision you make without complete data.** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

**How will SkillUp decide on UX in future? Who decides?** Choose one.

[[CHOOSE]] The Chief UX Officer alone ‖ The UX lead together with the product owner ‖ A steering group with management ‖ Whoever builds the feature

**On what evidence?** Choose at least two.

[[TICKALL]] Learner interviews ‖ A usability test of the new screens ‖ Drop-out data per lesson ‖ A comparison with competitors ‖ The opinion of the most senior person in the room

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your vision, three decisions with their order and reason, your biggest risk and what you do about it, your decision without complete data, who decides and on what evidence, and what you give up. On the website the same file is exported as `2-{your-name}-day1-l3-ux-strategy`.
:::
