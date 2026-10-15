---
doc: task
day: 13
kicker: DAY 13 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: AccessLearn: UX Analysis and UX Strategy Memo
subtitle: Find the barriers, choose the measures as a team member, and decide as Chief Accessibility Officer
daytitle: Day 13 · Module 6 (day 1 of 2): Fundamentals of inclusive UX/UI design for learning platforms, accessibility in practice: WCAG standards
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min
case: AccessLearn, a platform with barriers
intro: This is the worksheet for Day 13. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.
glossary: barrier,alt-text,assistive-technology,captions,focus-indicator,compliance,accessibility,wcag,keyboard,inclusive-design,learning-objective,pour,usability,overlay,navigation,conflicting-goals,screen-reader,style-guide,feedback,kpi,conformance,contrast,audit,rule-based
---

[[CONTENTS]]

:::note Which plan item each block answers
| UE | Plan item (Strukturplan, Day 13) | Block in this document |
|---|---|---|
| UE2 | Level 1, task 1 · identify five barriers, which user groups are affected, which improvements. | Block 1.1 (Core): the eight facts are sorted, then the fields |
| UE3 | Prioritising WCAG measures: three options: assess each option (benefit or impact, effort, risk), decide, justify | Block 1.2 (Optional) |
| UE4 | Coaching: The coaching point of the plan: accessibility is not an add-on but a standard; WCAG is a minimum requirement, not a goal; inclusion improves UX for all users; its strategic importance lies in law, market and reputation. | Block 1.3 (Optional) |
| UE5–6 | Level 2 case study AccessLearn: identify the central problems, develop four UX measures, prioritise, justify (and any extra item the plan names, such as test methods or KPIs) | Block 2.1 (Optional, four problems) and Block 2.2 (Core, four improvements, priority, justification) |
| UE7 | Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |
| UE8–10 | Level 3 transfer project: transfer project, items 1, 3 and 4 · a strategy for implementing WCAG, integration into UX processes, an evaluation approach (measurability). transfer project, items 2 and 5 and the additional requirement · prioritised measures, a risk analysis of costs against benefits, a decision under uncertainty. | Blocks 3.1 and 3.2 (both Core) |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)

## The case: AccessLearn, a platform with barriers

AccessLearn is a learning platform that people with impairments cannot use properly. Complaints are increasing and legal risks are growing. A first analysis points to a missing implementation of WCAG and to no inclusive UX in the design. There is a lot of existing content, time is short and the budget is limited. You are part of the UX team and asked to work out which barriers exist, whom they stop, and which measures are worth funding.

| What you have | The limits | How the task runs |
|---|---|---|
| Four AccessLearn screens in outline, with eight facts about them (Block 1.1).<br>Three options (optional Block 1.2) and seven possible problems (optional Block 2.1).<br>Nine measures, each with a cost and weeks (Block 2.2). | Budget: €50,000 (Case assumption: the plan only says “limited”)<br>Time: 10 weeks (Case assumption: the plan only says “time pressure”)<br>Many existing content items. | How the task runs:<br>1. Block 1.1: sort eight facts by the user group they affect, say which one stops a learner completely and what you would change (Level 1).<br>2. Block 2.2: choose four of nine measures, rate them, order them, justify and name what is missing (Level 2).<br>Three more blocks (about 20 min) are optional and folded. |

:::note Case assumption
The brief says: users with impairments cannot use the platform, complaints are increasing, legal risks, a missing WCAG implementation, no inclusive UX, a limited budget, time pressure and many existing content items. Everything else is made up for this exercise: the screens, the numbers on them, the €50,000, the 10 weeks, and the costs and weeks of the measures.
:::

## The evidence: four AccessLearn screens and eight facts

The picture shows four screens in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is a problem.

![The AccessLearn screens, drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d13_t1_screens.png)

| No. | Screen | What is there |
|---|---|---|
| 1 | Lesson text | The lesson text is light grey on a white background, with a contrast ratio of 2.1 : 1. |
| 2 | Lesson text | The text is 10 px, and when it is enlarged the page breaks and text is cut off. |
| 3 | A chart | A chart that carries the lesson's key message has no text alternative. |
| 4 | The menu | The course menu opens only when the mouse hovers over it, and cannot be reached with the Tab key. |
| 5 | The quiz | The quiz answer buttons are 18 px high and sit close together. |
| 6 | The menu | A lesson sits seven levels deep, and the same page can be reached from three different menus. |
| 7 | Lesson text | Instructions run as long paragraphs with unexplained abbreviations and no headings. |
| 8 | The quiz | Each quiz has a fixed 60-second time limit that cannot be extended. |

# Part 1 · Find the barriers · Level 1 · Knowledge

## Block 1.1 · Eight barriers: who do they affect, and which one stops a learner? · OBJECTIVE + JUDGED · Core · about 13 min

**Draws on:** A1 · Inclusive design: user groups with different needs, and how it differs from usability · A2 · The four principles: perceivable, operable, understandable, robust.

**Part a (objective).** Sort each fact into the kind it shows. Tick one box per fact. The kinds are: *Visual* (does it make the page hard or impossible to see or to hear described?); *Motor* (does it make controls hard to reach or to hit without a mouse or a steady hand?); *Cognitive* (does it make the page hard to understand, remember or follow?)

| No. | The fact in short | Kind (tick one) |
|---|---|---|
| 1 | Light grey text, contrast 2.1 : 1 | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 2 | 10 px text that breaks when enlarged | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 3 | A key chart with no text alternative | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 4 | A menu that opens only on mouse hover | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 5 | 18 px quiz buttons close together | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 6 | Seven levels deep, three menus to the same page | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 7 | Long paragraphs, abbreviations, no headings | ☐ Visual<br>☐ Motor<br>☐ Cognitive |
| 8 | A fixed 60-second quiz limit | ☐ Visual<br>☐ Motor<br>☐ Cognitive |

**Part b (judged).**

**Which barrier stops a learner from using the platform at all?** Choose one. A barrier that slows is not the same as one that stops. The reason below says whom it stops and why.

[[CHOOSE]] 3 · A key chart with no text alternative ‖ 5 · 18 px quiz buttons close together ‖ 1 · Light grey text, contrast 2.1 : 1 ‖ 4 · A menu that opens only on mouse hover ‖ 8 · A fixed 60-second quiz limit ‖ 2 · 10 px text that breaks when enlarged ‖ 7 · Long paragraphs, abbreviations, no headings ‖ 6 · Seven levels deep, three menus to one page

**Part c (judged).**

[[ANSWER lines=3 label=Whom does it stop, and why is it worse than a barrier that only slows? Name the user group, say why they cannot get around it, and name one barrier that only slows, with the reason.]]

**Part d (judged).**

[[ANSWER lines=5 label=Which user groups are affected, and what would you change? Name the group, and for each change the barrier (by number) it answers, starting each change with a verb.]]

## Block 1.2 · Prioritising WCAG measures: three options · OBJECTIVE + JUDGED · Optional · about 8 min

*Optional. Practises the three ratings at small scale; Block 2.2 is answered without it.*

**Draws on:** A5 · Prioritising accessibility measures: impact, effort, risk.

You are to make a learning platform accessible. The budget is limited, time is short and there are many existing content items (Case assumption: the costs). Effort follows the printed cost, by the rule in Materi A5. Option A improves the contrasts, option B simplifies the navigation, and option C provides alternative content, such as text for images.

| Option | What it is | Cost | Weeks | Impact | Effort | Risk |
|---|---|---|---|---|---|---|
| **A** | Improve the contrasts | €6,000 | 2 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **B** | Simplify the navigation | €14,000 | 5 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |
| **C** | Provide alternative content for all existing items | €26,000 | 9 | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |

| Priority | Option (A, B or C) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Justify your prioritisation: prioritise practical implementation Say what each option frees learners from and what it costs, given the time pressure and the amount of content.]]

## Block 1.3 · Coaching reflection: accessibility as quality and compliance · REFLECTION · Optional · about 5 min

*Optional. A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them. Your notes are never scored and never count as missing; no Core block needs them.*

The coaching point of the plan: accessibility is not an add-on but a standard; WCAG is a minimum requirement, not a goal; inclusion improves UX for all users; its strategic importance lies in law, market and reputation. Think back on Block 1.1 and write what comes to mind.

[[ANSWER lines=3 label=Who is currently being excluded?]]

[[ANSWER lines=3 label=Which measure has the greatest effect?]]

[[ANSWER lines=3 label=Which risks arise from non-compliance?]]

# Part 2 · Choose measures within the limits · Level 2 · Application · Case study (2 UE)

:::note Case study: 2 teaching units (UE5–6)
This part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your order with your group and for the trainer's closing. The blocks below need about 24 minutes of writing; the rest of the time is the group comparison.
:::

## Block 2.1 · Four central barriers to the platform · OBJECTIVE + JUDGED · Optional · about 7 min

*Optional. Practises pointing at a printed fact for a problem; Block 2.2 reads the facts, not this block.*

**Draws on:** A2 · The four principles: perceivable, operable, understandable, robust · A3 · WCAG in practice: contrast, text alternatives, structure, keyboard use.

A problem is something that keeps learners with impairments from using the platform, and you can point at it in the case or in a fact. Choose exactly four of the seven.

[[TICKALL]] Learners with impairments are not skilled enough with technology. ‖ Users with impairments should be given a separate simplified version. ‖ Nobody tests the platform with a keyboard, a screen reader or users with impairments. ‖ The platform's colours need a new brand design. ‖ The barriers hit several user groups at once: visual, motor and cognitive. ‖ WCAG is not implemented: there are no rules for contrast, text alternatives or keyboard use. ‖ There is no inclusive UX: accessibility was not considered when the screens were designed.

[[ANSWER lines=3 label=Which printed fact supports your first problem? Quote a line of the case or point at a fact by its number.]]

## Block 2.2 · Four UX measures, rated, ordered and justified · OBJECTIVE + JUDGED · Core · about 17 min

**Draws on:** A5 · Prioritising accessibility measures: impact, effort, risk · A1 · Inclusive design: user groups with different needs, and how it differs from usability · A2 · The four principles: perceivable, operable, understandable, robust · A3 · WCAG in practice: contrast, text alternatives, structure, keyboard use.

**The limits:** €50,000, 10 weeks. The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.

**Step 1 · Choose exactly four of the nine measures.**

| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |
|---|---|---|---|---|---|---|
| M1 | Improve contrast and text size | Raise all text to a contrast of at least 4.5 : 1 and let text be enlarged without breaking the page. · Text is readable on every page. | €6,000 | 2 | Removes: visual barriers | ☐ |
| M2 | Simplify the navigation | One menu, at most three levels deep, operable with the keyboard. · Every course can be reached with the keyboard. | €14,000 | 5 | Removes: motor and cognitive barriers | ☐ |
| M3 | Alternative content for the most-used items | Text alternatives for the 40 most-viewed images and charts, and captions for the 10 most-viewed videos. · Blind and deaf learners get the key content. | €18,000 | 6 | Removes: barriers for blind and deaf learners | ☐ |
| M4 | Clear structure | Headings, short paragraphs and plain labels on the lessons that are used most. · Lessons can be skimmed. | €8,000 | 3 | Removes: cognitive barriers | ☐ |
| M5 | A check with assistive technology and users | Test the platform with a keyboard, a screen reader and five users with impairments. · The team sees the barriers for itself. | €7,000 | 2 | Gathers evidence | ☐ |
| M6 | An accessibility overlay | A plug-in that adds a toolbar and promises to fix the page automatically. · A toolbar button appears. | €12,000 | 3 | Adds a layer on top | ☐ |
| M7 | A separate accessible version | A second, simplified copy of the platform for users with impairments. · There are two platforms. | €40,000 | 8 | Adds a second version | ☐ |
| M8 | Fix all 2,000 content items at once | Every lesson, image and video is reworked in one programme. · Nothing changes for months, then everything. | €60,000 | 10 | Changes everything at once | ☐ |
| M9 | An accessibility statement on the website | A page that describes the platform's accessibility and a contact for complaints. · A new page appears in the footer. | €3,000 | 1 | Adds a statement | ☐ |

**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each rating column. Impact: how many learners it frees from a barrier, and how badly they were blocked. Effort: by the printed cost, with the rule in Materi A5 (under €8,000, up to €18,000, above). Risk: what could go wrong, for example that it takes longer than planned or covers only part of the content.

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
| € __ | €50,000 | __ weeks | 10 weeks |

**Step 4 · Put your four measures in priority order.** The first is the most important.

| Priority | Measure (M1 to M9) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |
| 4 | __ |

[[ANSWER lines=3 label=Justify your decision: why does your first priority go first? Use the plan's rationale, accessibility is usability is success: say how your first measure helps most learners soonest.]]

[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision, and how you could find it out.]]

:::note What you hand in (Task 1)
The completed **UX Analysis File**: your sort of the eight facts and your answers in Block 1.1, your four measures with their ratings and reasons, your order and justification, and your missing information. On the website the same file is exported as `1-{your-name}-day13-l1l2-ux-analysis`.
:::

---pagebreak---

# Task 2 · Route 2 · UX Strategy Memo (Level 3) · Transfer project (3 UE)

:::note Transfer project: 3 teaching units (UE8–10)
This task is the day's Level 3 transfer project. It takes 3 UE (about 135 minutes): UE8 for Materi B and the brief, UE9 for Block 3.1, UE10 for Block 3.2, the presentation of your decision and the debrief with the trainer. The two blocks need about 20 minutes of writing; the rest of the time is the discussion of your decisions.
:::

## The situation: AccessLearn's Chief Accessibility Officer

You are the Chief Accessibility Officer of AccessLearn. The platform must become accessible, the budget is limited and the requirements are increasing. Management wants a strategy for the next 12 months and expects you to decide how to implement WCAG, how to build accessibility into the UX process, how to measure progress, and to take responsibility at management level.

| The limits | How the task runs |
|---|---|
| Budget for the year: €180,000 (Case assumption: the plan only says “limited”)<br>Requirements are increasing, and nobody can say exactly how much of the platform fails them.<br>You must decide anyway. | How the task runs:<br>1. Block 3.1: the strategy for WCAG, the integration into the UX process, and the evaluation approach (draws on B1, B2).<br>2. Block 3.2: three prioritised measures, the risk analysis of costs against benefits, one decision under uncertainty, and what you give up (draws on B2, B3). |

:::note Case assumption
The brief says: the platform must become accessible, a limited budget, increasing requirements. Everything else is made up: the €180,000, the process steps, the indicators, and the seven decisions with their costs and weeks.
:::

*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*

## Block 3.1 · The WCAG strategy, the process and the evaluation · JUDGED · Core · about 10 min

**Draws on:** B1 · Accessibility as a strategic quality: from requirement to priority, process and measure · B2 · Conflicting goals: accessibility against cost, standardisation against flexibility.

**The strategy for implementing WCAG** Choose the approach you will take to management. A decision with a clear reason counts, whichever you choose.

[[CHOOSE]] Audit first: test the whole platform, then decide ‖ Only the legal minimum, fixed when a complaint arrives ‖ Step by step: WCAG 2.2 level AA on the most-used courses first, then build it into the process ‖ Everything at once: all 2,000 items in one programme

[[ANSWER lines=3 label=Why this strategy, and not the others? Give the reason in terms of reach, cost and risk, not only in terms of what the law demands.]]

**Integration into the UX process: choose at least three steps** A step is good when it stops a barrier early, where it is cheap, and does not depend on one person. Choose at least 3.

[[TICKALL]] A check at every design review ‖ Accessibility criteria in every design brief ‖ A keyboard and screen-reader test before every release ‖ Automated tests only ‖ A separate team that fixes problems afterwards ‖ A test only before the launch of a big change ‖ Accessible components in the style guide ‖ An overlay plug-in as the fix ‖ Training for designers and content authors

**The evaluation approach: place eight indicators** Place each indicator under the way it is best measured or used, or under “does not show accessibility” if it tells nothing about it. Write the letter of your choice in the last column. Use each section at least once.

| Letter | Section |
|---|---|
| A | Measure automatically |
| B | Test with users |
| C | Report to management |
| D | Does not show accessibility |

| No. | Item | Section (A to D) |
|---|---|---|
| 1 | The share of pages that pass the contrast check | __ |
| 2 | The share of images with a text alternative | __ |
| 3 | Can a keyboard-only user finish a lesson? | __ |
| 4 | How long a screen-reader user needs to find lesson 3 | __ |
| 5 | Accessibility complaints per month | __ |
| 6 | Open barriers by severity, reported each quarter | __ |
| 7 | The number of pages on the platform | __ |
| 8 | A published statement that the platform “is accessible” | __ |

[[ANSWER lines=3 label=Which measure has the greatest reach, and who else gains? Name the measure, the user groups it reaches, and one group beyond people with impairments who also gain.]]

## Block 3.2 · Measures, risk, a decision under uncertainty, and what you give up · JUDGED · Core · about 10 min

**Draws on:** B2 · Conflicting goals: accessibility against cost, standardisation against flexibility · B3 · Deciding without knowing how much of the platform fails: a decision you can check later.

**Choose exactly 3 measures for your accessibility strategy.**

| No. | Decision | What it is | Cost | Weeks | Acts on | Choose (3) |
|---|---|---|---|---|---|---|
| D1 | WCAG 2.2 AA on the most-used courses | Contrast, keyboard use, text alternatives, structure and time limits fixed on the twenty courses most learners use. | €70,000 | 20 | Removes: existing barriers | ☐ |
| D2 | Accessibility built into the UX process | Criteria in every brief, a check at design review, accessible components in the style guide. | €40,000 | 12 | Prevents: new barriers | ☐ |
| D3 | Measurement: automated checks and quarterly user tests | Automatic counts of contrast and text alternatives, and a keyboard and screen-reader test with users each quarter. | €30,000 | 10 | Shows: progress | ☐ |
| D4 | Training for designers and authors | Workshops on WCAG and accessible writing for the people who create the courses. | €20,000 | 8 | Builds: skills | ☐ |
| D5 | An accessibility overlay | A plug-in with a toolbar that promises to fix every page. | €15,000 | 4 | Adds a layer on top | ☐ |
| D6 | A separate accessible version | A second platform for users with impairments. | €90,000 | 24 | Adds a second version | ☐ |
| D7 | Fix only what complaints report | A team that reacts to each complaint as it arrives. | €25,000 | 12 | Waits for complaints | ☐ |

| Total cost of your measures | Yearly budget |
|---|---|
| € __ | €180,000 |

Going over the budget is allowed; say why. It is printed in the memo as a fact.

| Priority | Measure (D1 to D7) |
|---|---|
| 1 | __ |
| 2 | __ |
| 3 | __ |

[[ANSWER lines=3 label=Why does the first measure go first? Say whom it reaches and what it prevents.]]

**Risk analysis: costs against benefits** Imagine the programme has failed in a year. Which reason is the most likely? Choose one.

[[CHOOSE]] The team lacked the skills, and the fixes were wrong. ‖ We fixed what automated tools found, but real users still could not use the platform. ‖ Non-compliance: we did too little, and a complaint led to legal action and lost customers. ‖ Cost overrun: retrofitting the old content cost far more than planned. ‖ A one-off project: new content brought new barriers, and the gains faded.

[[ANSWER lines=2 label=What do you do about that risk? One action, and when you would notice the risk.]]

**One decision you make under uncertainty (without knowing how much of the platform fails WCAG)** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.

| Part | Your sentence |
|---|---|
| I decide … | __ |
| I do not know … | __ |
| I reverse if … (a figure) … by … (a time) | __ |

[[ANSWER lines=3 label=What do you give up or postpone? Name something real that someone would miss. A plan that gives up nothing has not decided.]]

:::note What you hand in (Task 2)
The completed **UX Strategy Memo**: your answers in Blocks 3.1 and 3.2, your three measures with their order, your biggest risk and what you do about it, your decision under uncertainty, and what you give up. On the website the same file is exported as `2-{your-name}-day13-l3-ux-strategy`.
:::

