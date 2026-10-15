---
doc: task
day: 10
kicker: DAY 10 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: TrackLearn: UX Analysis and UX Strategy Memo
subtitle: Assess feedback and progress, choose the measures as a team member, and decide as Chief UX Systems Officer
daytitle: Day 10 · Module 4 (day 3 of 3): Visual feedback and progress tracking systems, responsive design and accessibility for learning platforms
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
case: TrackLearn, a platform where learners do not know where they stand
intro: This is the worksheet for Day 10. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: direct-feedback,responsive,touch-target,reflow,feedback,tracking,accessibility,progress-indicator,retention,learning-objective,dropout,orientation,personalisation,transparency,conflicting-goals,contrast,consistency,game-mechanic,usability,usability-test,gamification,kpi,learning-analytics,fogg,badge,screen-reader,leaderboard,captions
---

[[CONTENTS]]

:::note Which plan item each block answers
| UE | Plan item (Strukturplan, Day 10) | Block in this document |
|---|---|---|
| UE2 | Level 1, task 1 · describe the problems from the user's perspective, how they affect motivation, which improvements you suggest. | Block 1.1 (Core): the eight facts are sorted, then the fields |
| UE3 | Prioritising UX systems: three options: assess each option (benefit or impact, effort, risk), decide, justify | Block 1.2 (Optional) |
| UE4 | Coaching: The coaching point of the plan: users need orientation and feedback; making progress visible raises motivation; responsive design is not an option but a prerequisite; accessibility means scalability and reach. | Block 1.3 (Optional) |
| UE5–6 | Level 2 case study TrackLearn: identify the central problems, develop four UX measures, prioritise, justify (and any extra item the plan names, such as test methods or KPIs) | Block 2.1 (Optional, four problems) and Block 2.2 (Core, four improvements, priority, justification) |
| UE7 | Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |
| UE8–10 | Level 3 transfer project: items 1 to 4 · a concept for feedback systems, a strategy for progress tracking, a responsive design concept, accessibility integration. Also: item 5 and the additional requirement · prioritised measures and a risk analysis, a decision under uncertainty. | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: TrackLearn, a platform where learners do not know where they stand

TrackLearn is a learning platform whose users do not know how far along they are. Most of them use a phone, but the experience there is poor, and their motivation is low. A first analysis points to missing feedback and no mobile optimisation. There is no progress bar, nothing answers a finished task, and the learning status is unclear. You are part of the UX team, the budget is limited and the drop-out rate is high.

| What you have | The limits | How the task runs |
|---|---|---|
| Four TrackLearn screens in outline, with eight facts about them (Block 1.1).<br>Three options (optional Block 1.2) and seven possible central problems (optional Block 2.1).<br>Nine measures, each with a cost and weeks (Block 2.2). | Budget: €45,000 (Case assumption: the plan only says “limited”)<br>Time: 10 weeks (Case assumption: the plan gives none)<br>Most users use the platform on a phone, and many drop out. | How the task runs:<br>1. Block 1.1: sort eight facts into three problems, say how they affect motivation and what you would improve (Level 1).<br>2. Block 2.2: choose four of nine measures, rate them, order them, justify and name what is missing (Level 2).<br>Three more blocks (about 20 min) are optional and folded. |

:::note Case assumption
The brief says: users do not know how far along they are, high mobile use but poor UX, low motivation, missing feedback, no mobile optimisation, no progress bar, no response to completed tasks, an unclear learning status, a limited budget and a high drop-out rate. Everything else is made up for this exercise: the screens, the numbers on them, the €45,000, the 10 weeks, and the costs and weeks of the measures.
:::

## The evidence: four TrackLearn screens and eight facts

The picture shows four screens in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is a problem.

![The TrackLearn screens, drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d10_t1_screens.png)

| No. | Screen | What is there |
|---|---|---|
| 1 | Quiz | When a learner finishes a task, nothing on the screen changes. |
| 2 | Quiz | A wrong quiz answer shows only a red cross, with no reason. |
| 3 | Quiz | Saving a task gives no message, so learners press Save again to be sure. |
| 4 | Course page | The course page shows no progress bar and no count of finished lessons. |
| 5 | Course page | Finished lessons look the same as lessons not yet started. |
| 6 | Dashboard | The dashboard shows “Level 7” and does not say what it measures. |
| 7 | On a phone | On a phone, the lesson text is cut off at the right edge, and the learner must scroll sideways. |
| 8 | On a phone | On a phone, the Next button is 20 px high and sits at the very bottom of a long page. |

# Part 1 · Assess feedback and progress · Level 1 · Knowledge

## Block 1.1 · Eight facts: feedback, progress or phone? · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · Visual feedback: direct and indirect feedback as a tool for motivation and steering · A2 · Progress tracking systems: bars, levels and status, and their risks.

**Part a (objective).** Sort each fact into the kind it shows. Tick one box per fact. The kinds are: *Missing feedback* (does the platform answer what the learner does?); *Unclear progress* (can the learner tell how far along they are?); *Poor use on a phone* (does the screen work on a small display?)

| No. | The fact in short | Kind (tick one) |
|---|---|---|
| 1 | Nothing changes when a task is finished | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 2 | A red cross and no reason | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 3 | No message after saving | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 4 | No progress bar, no count of lessons | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 5 | Finished lessons look like unstarted ones | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 6 | “Level 7” with no meaning | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 7 | Text cut off on a phone, sideways scrolling | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |
| 8 | A 20 px Next button at the page bottom | ☐ Missing feedback<br>☐ Unclear progress<br>☐ Poor use on a phone |

**Part b (judged).**

**Which fact would take away a learner's motivation first?** Choose one. Any of the eight defends if the reason below says what the learner feels and what they stop doing.

[[CHOOSE]] 6 · “Level 7” with no meaning ‖ 8 · A 20 px Next button at the page bottom ‖ 3 · No message after saving ‖ 2 · A red cross and no reason ‖ 5 · Finished lessons look like unstarted ones ‖ 4 · No progress bar, no count of lessons ‖ 7 · Text cut off on a phone ‖ 1 · Nothing changes when a task is finished

**Part c (judged).**

[[ANSWER lines=3 label=How does this affect motivation? Say what the learner feels and what they stop doing. Refer to the fact by number.]]

**Part d (judged).**

[[ANSWER lines=5 label=Which improvements do you suggest? Name the fact (by number) that each improvement answers, and start each with a verb.]]

## Block 1.2 · Prioritising UX systems: three options · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. Practises the three ratings at small scale; Block 2.2 is answered without it.*

**Draws on:** A5 · Weighing a feedback, tracking or mobile measure: impact, effort, risk.

You are to optimise a learning platform. Users use it on a phone, the drop-out rate is high and the budget is limited (Case assumption: the costs). Effort follows the printed cost, by the rule in Materi A5. Option A shows progress, option B adapts the platform to phones, and option C builds a detailed feedback system.

| Option | What it is | Cost | Weeks | Impact | Effort | Risk |
|---|---|---|---|---|---|---|
| **A** | Introduce a progress indicator | €7,000 | 3 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **B** | Optimise the platform for mobile | €16,000 | 5 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **C** | Develop a detailed feedback system | €24,000 | 7 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

| Priority | Option (A, B or C) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Justify your decision: make a systemic UX decision Say what each option does for most of your users, who use a phone, and what it leaves open.]]

## Block 1.3 · Coaching reflection: UX as a steering and feedback system · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: users need orientation and feedback; making progress visible raises motivation; responsive design is not an option but a prerequisite; accessibility means scalability and reach. Think back on Block 1.1 and write what comes to mind.

[[ANSWER lines=3 label=Where does the user lack orientation?]]

[[ANSWER lines=3 label=Which information is decisive for motivation?]]

[[ANSWER lines=3 label=Which UX decision works on all devices?]]

# Part 2 · Choose measures within the limits · Level 2 · Application · Case study (2 UE)

:::note Case study: 2 teaching units (UE5–6)
This part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your order with your group and for the trainer's closing. The blocks below need about 24 minutes of writing; the rest of the time is the group comparison.
:::

## Block 2.1 · Four central problems · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. Practises pointing at a printed fact for a problem; Block 2.2 reads the facts, not this block.*

**Draws on:** A1 · Visual feedback: direct and indirect feedback as a tool for motivation and steering · A2 · Progress tracking systems: bars, levels and status, and their risks.

A central problem is something that stops a learner from knowing how they are doing or from using the platform, and you can point at it in the case or in a fact. Choose exactly four of the seven.

[[TICKALL]] Feedback is missing or says nothing: tasks get no answer, or only a bare mark. ‖ The platform has too few courses. ‖ Information is hard to use for many people: tiny targets and text that does not fit. ‖ Learners do not know how far along they are: progress is not shown. ‖ The courses are too long. ‖ The subscription price is too high. ‖ The platform works badly on a phone, where most learners are.

[[ANSWER lines=3 label=Which printed fact supports your first problem? Quote a line of the case or point at a fact by its number.]]

## Block 2.2 · Four measures for feedback, tracking and phones, rated, ordered and justified · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A5 · Weighing a feedback, tracking or mobile measure: impact, effort, risk · A1 · Visual feedback: direct and indirect feedback as a tool for motivation and steering · A2 · Progress tracking systems: bars, levels and status, and their risks · A3 · Responsive design for learning platforms: devices, contexts and priorities.

**The limits:** €45,000, 10 weeks. The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose exactly four of the nine measures.**

| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |
|---|---|---|---|---|---|---|
| M1 | A progress indicator | A bar on every course page and a status for every lesson: not started, in progress, done, with “3 of 8”. · The learner always sees how far along they are. | €7,000 | 3 | Progress | ☐ |
| M2 | Direct feedback | A message and a tick when a task is finished, and an explained result with a next step after every quiz answer. · Every action gets an answer that says something. | €9,000 | 3 | Feedback | ☐ |
| M3 | Mobile optimisation | A phone-first layout: text that fits, large targets within thumb reach, the main action at the bottom. · The platform is easy to use on a phone. | €16,000 | 5 | Phone use | ☐ |
| M4 | A clear presentation | One main thing per screen, a short result line and plain words, so that progress and feedback are read at a glance. · The screens are calm and easy to read. | €8,000 | 3 | Presentation | ☐ |
| M5 | Accessible targets and contrast | Targets of at least 44 px, contrast of at least 4.5 : 1, and status shown with a word as well as a colour. · Buttons are easy to hit and text is easy to read. | €6,000 | 3 | Accessibility | ☐ |
| M6 | Levels and points for every action | A level number and points for every click and every lesson opened. · Numbers and levels appear everywhere. | €14,000 | 5 | Adds game elements | ☐ |
| M7 | A detailed learning analytics dashboard | Fourteen charts about time spent, clicks and scores for every learner. · A dense page of charts. | €22,000 | 8 | Adds information | ☐ |
| M8 | A separate native mobile app | A second product for phones, built and maintained alongside the website. · A second thing to install. | €48,000 | 12 | Adds a second product | ☐ |
| M9 | Daily reminder emails | An email every day to every learner who has not logged in. · More emails arrive. | €5,000 | 2 | Adds a prompt | ☐ |

**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each rating column. Impact: how much it does for motivation and for finishing a course. Effort: by the printed cost, with the rule in Materi A5 (under €8,000, up to €16,000, above). Risk: what could go wrong, for example a display that misleads or feedback that overloads.

| Measure (M1 to M9) | Impact | Effort | Risk |
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
| € __ | €45,000 | __ weeks | 10 weeks |

**Step 4 · Put your four measures in priority order.** The first is the most important.

| Priority | Measure (M1 to M9) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |
| 4 | __ |

[[ANSWER lines=3 label=Justify your decision: why does your first priority go first? Use the chain transparency, motivation, usage: say how your first measure leads to the next.]]

[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision, and how you could find it out.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: your sort of the eight facts and your answers in Block 1.1, your four measures with their ratings and reasons, your order and justification, and your missing information. On the website the same file is exported as `1-{your-name}-day10-l1l2-ux-analysis`.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3) · Transfer project (3 UE)

:::note Transfer project: 3 teaching units (UE8–10)
This task is the day's Level 3 transfer project. It takes 3 UE (about 135 minutes): UE8 for Materi B and the brief, UE9 for Block 3.1, UE10 for Block 3.2, the presentation of your decision and the debrief with the trainer. The two blocks need about 20 minutes of writing; the rest of the time is the discussion of your decisions.
:::

## The situation: TrackLearn's Chief UX Systems Officer

You are the Chief UX Systems Officer of TrackLearn. The platform is growing, but user retention is declining. Most users are on a phone, and feedback systems are missing. Management wants a strategy for feedback and UX systems for the next 12 months and expects you to take responsibility for guiding the users.

| The limits | How the task runs |
|---|---|
| Budget for the year: €200,000 (Case assumption: the plan does not give one)<br>Data: you cannot yet measure retention by device.<br>You must decide anyway. | How the task runs:<br>1. Block 3.1: the concept for feedback, the strategy for progress tracking, the responsive concept and the accessibility integration (draws on B1, B2).<br>2. Block 3.2: three prioritised measures, the risk analysis, one decision under uncertainty, and what you give up (draws on B2, B3). |

:::note Case assumption
The brief says: a platform that grows while retention declines, high mobile use, missing feedback systems. Everything else is made up: the €200,000, the feedback and tracking elements, the device cards, and the seven decisions with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*

## Block 3.1 · Feedback, progress tracking, devices and accessibility · JUDGED · Core · about 10 min

**Draws on:** B1 · UX as a steering and feedback system: transparency, motivation, usage · B2 · Conflicting goals: information density against clarity, feedback against overload, flexibility against consistency.

**The concept for feedback: choose at least three elements** Choose elements that together tell the learner that their work counted, why a result is what it is, and what to do next. Choose at least 3.

[[TICKALL]] An error hint that says what to change ‖ A red or green mark with no words ‖ A message and a tick when a task is saved or finished ‖ An explained result after every task, with a next step ‖ A badge for every login ‖ Feedback only at the end of the course ‖ A short note at a milestone: half the course done ‖ A pop-up after every single click

**The strategy for progress tracking: choose at least three elements** Choose elements that answer “how far along am I?” honestly, without misleading or overwhelming. Choose at least 3.

[[TICKALL]] A ranking against all other learners ‖ A level number that does not say what it measures ‖ An estimate of the time left in the course ‖ A status for every lesson: not started, in progress, done ‖ A bar that fills fast at the start and slowly at the end ‖ One overall score that hides the details ‖ A “Continue where you stopped” entry ‖ A progress bar for each course, based on lessons finished

[[ANSWER lines=3 label=Name one way the progress display could mislead or demotivate, and how you prevent it The plan names two risks: a misleading display and demotivation when overwhelmed.]]

**The responsive concept: place eight pieces of content by device** Decide for each piece whether it is the same on every device, comes first on a phone, only fits a larger screen, or is not shown on a phone because it distracts. Content is prioritised by device. Write the letter of your choice in the last column. Use each section at least once.

| Letter | Section |
|---|---|
| A | Same on every device |
| B | First on a phone |
| C | Only on larger screens |
| D | Not shown on a phone |

| No. | Item | Section (A to D) |
|---|---|---|
| 1 | “Continue where you stopped” | __ |
| 2 | The progress bar and the lesson status | __ |
| 3 | The lesson text | __ |
| 4 | A video with captions | __ |
| 5 | A short quiz question after a section | __ |
| 6 | Notes next to the lesson, side by side | __ |
| 7 | The full course catalogue with filters | __ |
| 8 | A banner for current offers | __ |

**The accessibility integration: choose at least three measures** Choose measures that make the progress and feedback usable on every device and by more people (Day 7). Choose at least 3.

[[TICKALL]] Status and feedback in words and not by colour alone ‖ Touch targets of at least 44 px ‖ A name and value for the progress bar for screen readers ‖ A separate accessible version of the site ‖ Contrast of at least 4.5 : 1 for text and the progress bar ‖ Text that reflows to the phone width without sideways scrolling ‖ A fixed 11 px font so that more fits on a phone ‖ Colour alone to show a lesson as done

[[ANSWER lines=3 label=In two sentences: how do feedback, progress and a phone-first layout work together so that a learner always knows how they are doing? Use at least one element from each of the three parts.]]

## Block 3.2 · Measures, risk, a decision under uncertainty, and what you give up · JUDGED · Core · about 10 min

**Draws on:** B2 · Conflicting goals: information density against clarity, feedback against overload, flexibility against consistency · B3 · Deciding without retention data by device: a system you can check later.

**Choose exactly 3 measures for your feedback and tracking system.**

| No. | Decision | What it is | Cost | Weeks | Acts on | Choose (3) |
|---|---|---|---|---|---|---|
| D1 | A feedback system | Explained results, milestone messages and error hints across all tasks. | €55,000 | 16 | Feedback | ☐ |
| D2 | A progress tracking system | A bar, a status per lesson, a resume entry and a time estimate on every course. | €40,000 | 12 | Progress | ☐ |
| D3 | A phone-first responsive redesign | Layouts for phone, tablet and desktop with content prioritised by device. | €70,000 | 20 | Phone use | ☐ |
| D4 | Accessibility built into the components | Targets, contrast, reflow and screen reader names in every shared component. | €30,000 | 10 | Accessibility | ☐ |
| D5 | Tests on real phones with learners | Usability tests of progress and feedback with learners on their own phones. | €18,000 | 8 | Gathers evidence | ☐ |
| D6 | Levels and points for every action | A level system and points for every click and lesson opened. | €50,000 | 14 | Adds game elements | ☐ |
| D7 | A separate native mobile app | A second product for phones alongside the website. | €120,000 | 30 | Adds a second product | ☐ |

| Total cost of your measures | Yearly budget |
|---|---|
| € __ | €200,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

| Priority | Measure (D1 to D7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first measure go first? Say what it does for transparency and for motivation.]]

**Risk analysis: the biggest risk of the plan** Imagine the plan has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] The progress display misled learners, and they felt cheated when it slowed down. ‖ Too much feedback: learners felt interrupted and overloaded, and turned it off. ‖ We measured clicks, not retention, so we could not tell whether it worked. ‖ The phone-first layout removed functions that desktop users needed. ‖ Accessibility was added late and broke the new components.

[[ANSWER lines=2 label=What do you do about that risk? One action, and when you would notice the risk.]]

**One decision you make under uncertainty (without retention data by device)** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your answers in Blocks 3.1 and 3.2, your three measures with their order, your biggest risk and what you do about it, your decision under uncertainty, and what you give up. On the website the same file is exported as `2-{your-name}-day10-l3-ux-strategy`.
:::

