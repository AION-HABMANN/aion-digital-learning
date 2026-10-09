---
doc: task
day: 8
kicker: DAY 8 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: StructLearn: Structure Analysis and Basic UX/UI Structure
subtitle: Assess a cluttered interface, choose structural and visual measures, and design the basic structure as Chief UX Architect
daytitle: Day 8 · Module 4 (day 1 of 3): Fundamentals of UX/UI design for digital learning environments
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
website: Not yet published (the link will be added once Day 8 is deployed)
case: StructLearn, a cluttered learning platform
intro: This is the worksheet for Day 8. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. The card sort in Task 2 replaces drawing a structure: fill the table. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: ia,navigation,card-sort,hierarchy,gestalt,cta,affordance,hick,fitts,consistency,progressive-disclosure,style-guide,orientation,cognitive-load,chunking,visual-hierarchy,feedback,usability,learning-path,progress-indicator,dropout,completion,engagement,user-impact,roadmap,decision-architecture,conflicting-goals,usability-test,symptom
---

[[CONTENTS]]

:::note Which plan item each block answers
| Plan item (Strukturplan, Day 8) | Block in this document |
|---|---|
| Level 1 · Task 1: describe 5 problems from the user's side (many colours, no clear structure, several buttons without priority), where confusion arises, what you would improve intuitively | Block 1.1 (Core): the eight facts are sorted, then the confusion and the improvements |
| Level 1 · Task 2: simplify the design visually, restructure the navigation or add more visual elements under 3 weeks, beginners and a high drop-out rate; assess user impact, effort, risk; prioritise; justify | Block 1.2 (Optional) |
| Coaching: design is decision architecture; structure beats visual design; reflection questions | Block 1.3 (Optional) |
| Level 2 case study StructLearn: identify 4 structural problems, develop 4 UX/UI improvements, prioritise, justify | Block 2.1 (Optional, four problems) and Block 2.2 (Core, four improvements, priority, justification) |
| Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |
| Level 3 transfer project: basic structure (information architecture), principles for visual design, concept for user guidance, prioritised design measures, risk analysis (too complex against too reduced), one decision under uncertainty | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: StructLearn, a cluttered learning platform

StructLearn is a learning platform that has grown without a plan. Users cannot find content, there are many visual elements without structure, and the drop-out rate is high. A first analysis points to a lack of hierarchy and no clear navigation. The users are beginners. You are part of the UX team, and you have three weeks.

| What you have | The limits | How the task runs |
|---|---|---|
| Four StructLearn screens in outline and eight facts about them (Block 1.1).<br>Three design options (optional Block 1.2) and seven possible problems (optional Block 2.1).<br>Nine measures, each with a cost and weeks (Block 2.2). | **Budget:** €40,000 (Case assumption)<br>**Time:** 10 weeks for the case study (Case assumption); the options in Block 1.2 have 3 weeks, as in the plan<br>The users are beginners. | Two Core blocks, about 30 minutes:<br>1. Block 1.1: sort eight facts, say where confusion arises, what you would improve.<br>2. Block 2.2: choose four of nine measures, rate them, order them, justify.<br>Three more blocks (about 20 minutes) are Optional. |

:::note Case assumption
The brief says: users cannot find content, many visual elements without structure, a high drop-out rate, a lack of hierarchy, no clear navigation, many colours, no clear structure, several buttons without priority, beginners, three weeks. Everything else is made up for this exercise: the screens, the numbers on them, the €40,000, the 10 weeks, and the costs and weeks of the measures.
:::

## The evidence: four StructLearn screens and eight facts

The picture shows four screens in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is a problem.

![The StructLearn screens, drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d8_t1_structlearn-screens.png)

| No. | Screen | What is there |
|---|---|---|
| 1 | Home and menu | The menu has four levels, and the same course can be reached under "Learn", "Library" and "Archive". |
| 2 | Home and menu | While a learner is inside a course, the menu still marks "Home". |
| 3 | End of a lesson | At the end of a lesson there is no "Next" link; the learner must go back up three levels. |
| 4 | Course page | The course page uses nine colours, four font sizes and three animated banners at the same time. |
| 5 | Course page | Five buttons of the same size and colour sit in a row: "Start", "Save", "Share", "Report", "Delete". |
| 6 | Quiz, profile, editor | Links are blue on one screen, orange on another and plain black on a third. |
| 7 | Quiz, profile, editor | "Submit" is a filled button on the quiz, a grey link in the profile and a small icon in the editor. |
| 8 | End of a lesson | The "Back" arrow returns to the previous page on some screens and goes up one level on others. |

# Part 1 · Assess the interface · Level 1 · Knowledge

## Block 1.1 · Eight facts: navigation, overload or inconsistency? · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · Structure: information architecture, hierarchy and orientation · A2 · Visual design · A4 · Typical UX/UI mistakes and the link to learning psychology (Optional card; its three mistakes are repeated in A1 to A3).

**Part a (objective).** Sort each fact into the mistake it shows. Tick one box per fact. The three mistakes are those of the plan: *Unclear navigation* (the learner cannot tell where they are or where something is), *Visual overload* (many elements compete, with no main thing) and *Inconsistent design* (the same function looks or works differently in different places).

| No. | The fact in short | Mistake (tick one) |
|---|---|---|
| 1 | Four menu levels; one course under three entries | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 2 | The menu marks "Home" inside a course | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 3 | No "Next" link at the end of a lesson | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 4 | Nine colours, four sizes, three banners | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 5 | Five equal buttons in a row | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 6 | Links in three different colours | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 7 | "Submit" looks different on three screens | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |
| 8 | "Back" does different things on different screens | ☐ Unclear navigation<br>☐ Visual overload<br>☐ Inconsistent design |

**Part b (judged).** Where does confusion arise for a beginner? Choose the fact that would confuse you most as a learner.

[[CHOOSE]] 1 · Four menu levels, one course under three entries ‖ 2 · The menu marks "Home" inside a course ‖ 3 · No "Next" link ‖ 4 · Nine colours, four sizes, three banners ‖ 5 · Five equal buttons ‖ 6 · Links in three colours ‖ 7 · "Submit" looks different on three screens ‖ 8 · "Back" does different things

[[ANSWER lines=3 label=Where does the confusion arise, and why? Say what the learner wants to do at that point, and what they cannot tell.]]

**Part c (judged).**

[[ANSWER lines=3 label=What would you improve intuitively? Name the fact (by number) that each improvement answers.]]

## Block 1.2 · Making design decisions: three options under three weeks · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. It practises the three ratings at small scale; Block 2.2 is answered without it.*

**Draws on:** A5 · Weighing a design measure.

You are to improve a learning interface. You have 3 weeks, the users are beginners and the drop-out rate is high. Effort follows the printed cost, by the rule in Materi A5.

| Option | What it is | Cost | Weeks | User impact | Effort | Risk |
|---|---|---|---|---|---|---|
| **A** | Simplify the design visually (fewer colours, fewer banners, one style for buttons) | €9,000 | 2 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **B** | Restructure the navigation (fewer levels, one place per course, a path and a "Next" link) | €14,000 | 3 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **C** | Add more visual elements (icons, illustrations and animations on every course page) | €7,000 | 2 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

| Priority | Option (A, B or C) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Justify your decision: weigh structure against design. Say which option fixes what the learner cannot do, and which only changes how it looks.]]

## Block 1.3 · Coaching reflection: design is decision architecture · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: UI is not about making it pretty but about making it understandable; structure beats visual design; good UX reduces the user's wrong decisions. Think back on Block 1.1 and write what comes to mind.

[[ANSWER lines=3 label=What really guides the user?]]

[[ANSWER lines=3 label=Where does uncertainty arise in the interface?]]

[[ANSWER lines=3 label=Which design decision has the greatest effect?]]

# Part 2 · Choose design measures within the limits · Level 2 · Application

## Block 2.1 · Four structural problems · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. It practises pointing at a printed fact for a problem; Block 2.2 reads the facts, not this block.*

**Draws on:** A1 · Structure · A4 · Typical UX/UI mistakes.

A structural problem is something a learner cannot do because of how the platform is built, and you can point at it in the case or in a fact. Choose exactly four of the seven.

[[TICKALL]] Learners cannot find content: one item sits in several places under different names. ‖ There is no clear visual hierarchy: everything competes for attention. ‖ The navigation is not unambiguous: learners cannot tell where they are. ‖ There is no clear guidance for action: no main button and no next step. ‖ The courses are too long. ‖ The subscription price is too high. ‖ There are too few courses.

[[ANSWER lines=3 label=Which printed fact supports your first problem? Quote a line of the case or point at a fact by its number.]]

## Block 2.2 · Four improvements, rated, ordered and justified · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A5 · Weighing a design measure · A1 · Structure · A2 · Visual design · A3 · Interaction and user guidance.

**The limits:** €40,000, 10 weeks. The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose exactly four of the nine measures.**

| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |
|---|---|---|---|---|---|---|
| M1 | A clear information architecture | One place per item, grouped into four sections named after what the learner does. · A course is in one place under one name. | €16,000 | 5 | Structure | ☐ |
| M2 | Reduce visual complexity | At most three colours and two text sizes; remove the banners. · The page is calm. | €8,000 | 3 | Visual hierarchy | ☐ |
| M3 | Unambiguous navigation | The menu marks where the learner is; a path above the page; a "Next" link after every lesson. · The learner knows where they are and what comes next. | €11,000 | 4 | Navigation | ☐ |
| M4 | A clear action guidance | One main button per screen; secondary actions as quiet links. · The learner sees what to do. | €6,000 | 2 | Interaction | ☐ |
| M5 | Consistent components | A style guide for buttons, links, dates and "Back", applied to every screen. · The same thing looks the same. | €13,000 | 5 | Consistency | ☐ |
| M6 | More visual elements | Animated illustrations on every course page. · More pictures and movement. | €18,000 | 6 | Adds decoration | ☐ |
| M7 | A dark mode | An alternative dark colour scheme. · A switch for light and dark. | €10,000 | 4 | The look | ☐ |
| M8 | A new logo and brand name | A new name, logo and colours. · The platform is called something new. | €22,000 | 6 | The brand | ☐ |
| M9 | A search with AI suggestions | A search box that suggests courses with an algorithm. · A new search bar appears. | €30,000 | 10 | Adds technology | ☐ |

**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each rating column. User impact: how much it helps the learner find, choose and carry on. Effort: by the printed cost, with the rule in Materi A5. Risk: what could be added or lost.

| Measure (M1 to M9) | User impact | Effort | Risk |
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
| € __ | €40,000 | __ weeks | 10 weeks |

**Step 4 · Put your four measures in priority order.** The first is the most important.

| Priority | Measure (M1 to M9) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |
| 4 | __ |

[[ANSWER lines=3 label=Justify your decision: why does your first priority go first? Use the chain structure, orientation, use: say how your first measure leads to orientation and then to use.]]

[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision, and how you could find it out.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: your sort of the eight facts, where the confusion arises and what you would improve, your four measures with their ratings and reasons, your order and justification, and your missing information. On the website the same file is exported as `1-{your-name}-day8-l1l2-ux-analysis`.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3)

## The situation: StructLearn's Chief UX Architect

You are the Chief UX Architect of StructLearn. The platform has grown and become cluttered, users lose orientation, and a redesign is necessary, but the budget is limited. Management wants the basic UX/UI structure of the platform for the next 12 months and expects you to take responsibility for the design decisions.

| The limits | How the task runs |
|---|---|
| **Budget for the year:** €210,000 (Case assumption: the plan only says "limited")<br>**Data:** you have no user tests of a new structure yet.<br>You must decide anyway. | Two Core blocks, about 20 minutes:<br>1. Block 3.1: the basic structure (a card sort), the principles for visual design and the concept for user guidance (draws on B1, B2).<br>2. Block 3.2: three prioritised design measures, the risk analysis (too complex against too reduced), one decision under uncertainty, and what you give up (draws on B2, B3). |

:::note Case assumption
The brief says: a platform that has grown and become cluttered, users who lose orientation, a necessary redesign, a limited budget. Everything else is made up: the €210,000, the 12 content items, and the seven decisions with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*

## Block 3.1 · Basic structure, principles for visual design and user guidance · JUDGED · Core · about 10 min

**Draws on:** B1 · Design as decision architecture · B2 · Conflicting goals.

**The basic structure (information architecture).** Assign each of the twelve items to one of five sections. Write the section's letter in the last column. A closed card sort like this checks a structure before you build it. Use each section at least once, and decide where an item belongs for the learner, not for the system.

| Letter | Section |
|---|---|
| A | Learn |
| B | Find |
| C | Progress |
| D | Help and account |
| E | Trainer area |

| No. | Item | Section (A to E) |
|---|---|---|
| 1 | Continue where I stopped | __ |
| 2 | Course catalogue | __ |
| 3 | Search | __ |
| 4 | My certificates | __ |
| 5 | Progress in each course | __ |
| 6 | My notes | __ |
| 7 | Reminder settings | __ |
| 8 | Help centre | __ |
| 9 | Profile and password | __ |
| 10 | Create a course (for trainers) | __ |
| 11 | Learner list of my course (for trainers) | __ |
| 12 | Messages from my trainer | __ |

[[ANSWER lines=3 label=Name one item that was hard to place, say why, and how you would check it with learners (for example a card sort or a tree test).]]

**Principles for visual design.** Choose at least three that you would put on a one-page list, so that they can be used to say no to a proposal.

[[TICKALL]] One main action per screen ‖ At most three colours and one accent colour ‖ The same function always looks the same (a style guide) ‖ Text contrast of at least 4.5 : 1 and no information by colour alone ‖ Group with space and proximity, not with boxes everywhere ‖ New courses may choose their own colours for variety ‖ Add animation to keep learners interested ‖ Every screen shows a banner for current offers

**Concept for user guidance.** Choose at least three elements.

[[TICKALL]] A path above the page and a marked menu entry ‖ A "Next" or "Continue" button after every lesson ‖ A "Continue where you stopped" entry on the home screen ‖ Progress shown on each course page ‖ Plain labels named after what the learner does ‖ A pop-up tour on every page ‖ Tooltips on every element

[[ANSWER lines=3 label=In one or two sentences: how does a learner always know where they are and what comes next?]]

## Block 3.2 · Measures, risk, a decision under uncertainty, and what you give up · JUDGED · Core · about 10 min

**Draws on:** B2 · Conflicting goals · B3 · Deciding without user tests.

**Choose exactly three prioritised design measures.**

| No. | Decision | What it is | Cost | Weeks | Acts on | Choose (three) |
|---|---|---|---|---|---|---|
| D1 | Rebuild the information architecture and navigation | Four or five sections, one place per item, a path and a next step on every page. | €70,000 | 20 | Structure | ☐ |
| D2 | A design system with a style guide | Shared components and rules for buttons, links, dates and "Back". | €50,000 | 24 | Consistency | ☐ |
| D3 | Redesign the home and course pages around one main action | A clear visual hierarchy and a "Continue" button. | €40,000 | 14 | Hierarchy and guidance | ☐ |
| D4 | Tests of the new structure with learners | A closed card sort, a tree test and a usability test with beginners. | €25,000 | 10 | Evidence | ☐ |
| D5 | A guided first visit for beginners | A short, skippable first-visit guide to the new structure. | €20,000 | 8 | Guidance | ☐ |
| D6 | A full visual rebrand | New logo, colours, fonts and illustrations. | €60,000 | 20 | The look | ☐ |
| D7 | Animated elements everywhere | Movement and illustrations on every page. | €45,000 | 16 | Adds decoration | ☐ |

| Total cost of your three measures | Yearly budget |
|---|---|
| € __ | €210,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

| Priority | Measure (D1 to D7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first measure go first? Say what it does for orientation and for the learner's behaviour.]]

**Risk analysis (too complex against too reduced).** Imagine the redesign has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] The new structure is still too complex, and learners are still lost. ‖ We removed so much that learners and trainers lost help and functions they needed. ‖ The new section names did not make sense to beginners. ‖ The style guide was ignored and the platform drifted back to inconsistency. ‖ The budget was spent on the look before the structure was fixed.

[[ANSWER lines=3 label=What do you do about that risk? One action, and when you would notice the risk.]]

**One decision you make under uncertainty (without user tests).** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your basic structure (the card sort), your principles for visual design, your concept for user guidance, three measures with their order, your biggest risk and what you do about it, your decision under uncertainty, and what you give up. On the website the same file is exported as `2-{your-name}-day8-l3-ux-strategy`.
:::
