---
doc: materi
day: 13
kicker: DAY 13 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Inclusive UX/UI and WCAG
subtitle: Fundamentals of inclusive UX/UI design for learning platforms, accessibility in practice: WCAG standards
daytitle: Day 13 · Module 6 (day 1 of 2): Fundamentals of inclusive UX/UI design for learning platforms, accessibility in practice: WCAG standards
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is AccessLearn, a platform with barriers(see the Task document).
intro: This document holds everything you need to study Day 13 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: barrier,alt-text,assistive-technology,captions,focus-indicator,compliance,accessibility,wcag,keyboard,rule-based,screen-reader,plain-language,inclusive-design,overlay,pour,navigation,usability,bfsg,visual-hierarchy,contrast,aria,interaction,touch-target,conflicting-goals,premortem,conformance,udl,style-guide,leaderboard
refs: castUdl,msInclusive,who2022,wcag22,wcagUnderstanding,w3cAria,en301549,nielsen1994,gibbons2018,bfsg,klein2007,bezos2016
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Inclusive design: user groups with different needs, and how it differs from usability · 14 min · Core

> Inclusive design asks who is left out. Three groups of needs matter: visual, motor and cognitive. A barrier can slow a learner, stop them completely, or lose them quietly.

:::box In plain words
**The idea.** Inclusive design means designing so that people with different needs can use a product, not only the typical user. Classic usability asks whether a typical user finds a product easy. Inclusion asks who is left out. Three groups of needs matter: visual (seeing the page), motor (using the controls) and cognitive (understanding and following).
**Why it matters.** In Task 1 you sort facts about a platform by the user group they affect, and you say which one stops a learner completely.
**How to read the picture.** One LearnLoop lesson page as three learners meet it: Mia with low vision, Tom with only a keyboard, and Nia who finds long text hard.
:::

![The same LearnLoop lesson page as three learners meet it.](_figures/d13_a1_0.png)

**The point.** Inclusive design asks who is left out, not only whether a typical user finds a page easy. The same page can be fine for one learner and a dead end for another, depending on whether they see it, can operate it, or can follow it.

**A short story in steps.**

1. **Pale text.** Let us follow Mia, a learner at LearnLoop who has low vision. The lesson text is pale grey on white. She can squint, zoom in and carry on, but it takes effort every time, and she will tire of it long before the others do.
2. **A dead end.** Now Tom, who uses only a keyboard because of a motor impairment. The course menu opens only when a mouse hovers over it, so pressing Tab skips it. Tom cannot get to any course, and there is nothing he can do about it: the page has stopped him.
3. **A wall of text.** And Nia, who finds long text hard to follow. The page is one block of text with no headings. She cannot tell where the step she needs begins. So there are barriers that slow, barriers that stop, and barriers that lose people quietly.

| State shown in the picture | What it means |
|---|---|
| Mia, low vision | the text is pale grey on white, and Mia can barely read it. She can still use the page, with a zoom or a high-contrast setting, so this barrier slows her. |
| Tom, keyboard only | the menu opens only on mouse hover, and Tom presses Tab in vain. He cannot reach a single course, so this barrier stops him completely. |
| Nia, long text is hard | a wall of text with no headings, so Nia does not know where to start or where the step she needs is. She may give up, so this barrier loses her. |

*Three groups of needs, with an example of a barrier and a fix*

| Group | A typical barrier | A typical fix |
|---|---|---|
| Visual | Pale text; images with no description. | Strong contrast; a text alternative. |
| Motor | A menu that needs a mouse; tiny buttons. | Everything reachable by keyboard; large targets. |
| Cognitive | A wall of text; seven levels of menus. | Headings and short steps; a flat structure. |

:::note Case assumption
LearnLoop, Mia, Tom and Nia are made up for this example. The idea that one design should work for people with different needs is that of Universal Design for Learning (CAST) and of inclusive design (Microsoft).
:::

:::rules How to decide when this comes up in the task
- Sort a barrier by the user group it hits first: visual (contrast, text size, images without a text alternative), motor (a menu that needs a mouse, tiny buttons) or cognitive (deep navigation, unstructured text, fixed time limits).
- Tell a barrier that stops from one that slows: ask whether the learner has any way around it. If none, it stops.
- Remember that one barrier can hit more than one group: say whom it hits first and who else it hits.
- Do not blame the learner: if a page does not work for a group, the barrier is in the page.
:::

:::note Extra · go deeper (optional reading)
Impairments can be permanent, temporary or situational: a broken arm, a bright train window, a noisy room. Designing for the permanent case usually helps the temporary and the situational one too, which is why inclusion improves UX for everyone.
:::

^src: CAST 2024 · Microsoft 2016 · WHO 2022

## A2 · The four principles: perceivable, operable, understandable, robust · 12 min · Core

> WCAG rests on four principles: perceivable, operable, understandable, robust. Every barrier breaks one of them.

:::box In plain words
**The idea.** The WCAG standard rests on four principles. Content must be perceivable (people can see or hear it), operable (people can use the controls), understandable (people can follow it) and robust (it works with different browsers and assistive technologies, such as a screen reader). A barrier breaks one of the four.
**Why it matters.** In Block 2.1 and Block 2.2 you name the barriers behind the facts. The four principles are the way to name them.
**How to read the picture.** Four small pictures, one for each principle: an eye, a keyboard key, a short text and a plug that fits.
:::

![.](_figures/d13_a2_0.png)

*The four principles, the question each asks, and a barrier that breaks it*

| Principle | The question | A barrier that breaks it |
|---|---|---|
| Perceivable | Can it be seen or heard? | Contrast 2.1 : 1; a chart with no text alternative. |
| Operable | Can it be used with different devices? | A menu that opens only on mouse hover. |
| Understandable | Can it be followed? | Seven levels of menus; a fixed time limit. |
| Robust | Does it work with assistive technology? | A custom control that a screen reader cannot name. |

:::note Case assumption
LearnLoop is the example company. The four principles are those of WCAG 2.2 (W3C); ARIA is the W3C standard that lets custom controls tell assistive technology what they are.
:::

:::rules How to decide when this comes up in the task
- Name the principle a barrier breaks: pale text and missing text alternatives break perceivable; a mouse-only menu and tiny targets break operable; deep navigation and long unstructured text break understandable; code that a screen reader cannot read breaks robust.
- Use the four principles as a checklist when you review a page, one question each: can it be seen or heard, used, followed, and read by assistive technology?
- Treat WCAG as a minimum: meeting it does not by itself make a platform good to use.
:::

:::note Extra · go deeper (optional reading)
In the EU, accessibility rules rest on EN 301 549, which takes over WCAG, and in Germany on the BFSG (Barrierefreiheitsstärkungsgesetz) and the BITV for public bodies. Rules in this area change, so check the current text and dates before you rely on them.
:::

^src: W3C 2023 · Understanding WCAG 2.2 · W3C 2024 (ARIA)

## A3 · WCAG in practice: contrast, text alternatives, structure, keyboard use · 14 min · Core

> Four WCAG requirements matter most on a learning platform: contrast of at least 4.5 : 1, text alternatives, clear structure and navigation, and keyboard use. Each is a small, testable change.

:::box In plain words
**The idea.** WCAG, the Web Content Accessibility Guidelines, turns the principles into testable requirements. Four matter most on a learning platform: sufficient contrast (at least 4.5 : 1 for normal text), a text alternative for every image that carries content, a clear structure and navigation, and keyboard operability, so that everything works without a mouse.
**Why it matters.** Block 1.2 and Block 2.2 ask you to prioritise measures. Each one is one of these four requirements.
**How to read the picture.** One LearnLoop lesson page with four features that can be on or off: contrast, a text alternative, structure and keyboard use.
:::

![One LearnLoop lesson page and four WCAG fixes.](_figures/d13_a3_0.png)

**The point.** WCAG turns the four principles into testable requirements. Four matter most on a learning platform: enough contrast, a text alternative for images, a clear structure, and keyboard use. Each is a small, checkable change, and each frees a different group of learners.

**A short story in steps.**

1. **A page with four barriers.** Let us look at a LearnLoop lesson page as it stands: pale text, a chart with no words, no headings, and a menu that needs a mouse. Four learners, each with a different need, are blocked or slowed by it, and none of the four problems is hard to describe.
2. **Four small fixes.** Now all four WCAG fixes are on. The text meets a contrast of 4.5 : 1, the chart carries a sentence that says what it shows, headings mark the steps, and the menu can be reached with Tab. The lesson has not changed, only how it is built, and each fix can be tested.
3. **One at a time.** A team rarely does all four at once. Block 1.2 asks you to prioritise exactly this.

| Switches | What it means |
|---|---|
| All off | 0 of the 4 fixes are on. The text is pale and hard to read. The chart has no words, so a blind learner misses it. There are no headings. The menu needs a mouse. |
| All on (Contrast 4.5 : 1, Text alternative, Clear structure, Keyboard use) | 4 of the 4 fixes are on. The text is dark enough to read in any light. The chart has words, so a screen reader can say it. Headings show where each step begins. The menu can be reached with Tab. |

*Four requirements, the group each frees, and a test*

| Requirement | Who it frees | A simple test |
|---|---|---|
| Contrast of at least 4.5 : 1 | Learners with low vision, anyone in bright light | A contrast checker on every text colour. |
| Text alternatives | Blind learners, learners who use a screen reader | Turn images off: is the message still there? |
| Clear structure | Learners who find structure hard, screen-reader users | List the headings: do they tell the story? |
| Keyboard use | Keyboard-only users, learners with a tremor | Put the mouse away and press Tab through the page. |

:::note Case assumption
LearnLoop is the example company. The requirements are those of WCAG 2.2, summarised; the 4.5 : 1 ratio is criterion 1.4.3. Check the current criteria text before quoting a number in a document.
:::

:::rules How to decide when this comes up in the task
- Contrast: normal text needs at least 4.5 : 1 against its background (large text 3 : 1); light grey on white fails.
- Text alternatives: every image or chart that carries content needs a short text that says what it shows; a purely decorative image needs none.
- Structure and navigation: use real headings in order, keep menus shallow and the same on every page, and give each page a clear title.
- Keyboard use: everything that works with a mouse must work with the keyboard, in a sensible order, with a visible focus.
- Videos need captions, and a time limit must be adjustable; both appear as measures in the task.
:::

:::note Extra · go deeper (optional reading)
WCAG has three levels, A, AA and AAA. Level AA is the usual target and the one the European standard asks for. A free automatic tool finds only a part of the barriers, so testing with a keyboard and a screen reader stays necessary.
:::

^src: W3C 2023 · Understanding WCAG 2.2 · EN 301 549

## A4 · Implementation in UX/UI design: plain language, hierarchy, intuitive interaction · 10 min · Optional

> Build accessibility into the design: plain language, a clear visual hierarchy and intuitive interactions. They help everyone and are the cheapest barriers to avoid.

:::box In plain words
**The idea.** Accessibility is built in the design itself: plain language (short sentences, everyday words, abbreviations explained), a clear visual hierarchy (headings that show what matters), and intuitive interactions (controls that look and behave as people expect). These help everyone and are the cheapest barriers to avoid.
**Why it matters.** Block 3.1 asks how accessibility joins the UX process. The core rules on structure are repeated in A3 and B1, so no Core block needs this card.
**How to read the picture.** A before and after: one block of long text, and the same text with headings and short steps.
:::

![.](_figures/d13_a4_0.png)

:::note Case assumption
LearnLoop is the example company. Day 14 treats plain language and intuitive environments in depth.
:::

:::rules How to decide when this comes up in the task
- Plain language: short sentences, everyday words, each abbreviation explained once.
- Hierarchy: real headings that show what matters, and one main action per screen.
- Intuitive interaction: controls look and behave as people expect, with the same pattern for the same task.
:::

:::note Extra · go deeper (optional reading)
Structure helps a screen reader as well: it lets a blind learner jump from heading to heading, as a sighted learner skims. One structure serves both.
:::

^src: Nielsen 1994 · W3C 2023

## A5 · Prioritising accessibility measures: impact, effort, risk · 10 min · Core

> Rate a measure by how many learners it frees and how badly they were blocked, what it costs and what could go wrong. Cheap fixes that free a blocked group go first.

:::box In plain words
**The idea.** To choose between accessibility measures, rate each on the same three questions. Impact: how many learners does it free from a barrier, and how badly were they blocked? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €18,000 is Mid, above that is High. Risk: what could go wrong, for example that it takes longer than planned.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €40,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three accessibility measures.](_figures/d13_a5_0.png)

**The point.** Rate a measure by how many learners it frees from a barrier and how badly they were blocked, by its printed cost, and by what could go wrong. A cheap fix that stops a group from being blocked beats a big rewrite that takes months and helps only a little.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop once more. It has a lot of content, the budget is €40,000, time is short, and three ideas are on the table. We rate each on three questions: how many learners it frees and how badly they were blocked (impact), what it costs (effort), and what could go wrong (risk).
2. **A cheap fix that frees a group.** A skip link and a visible focus cost €5,000, so the effort is Low. They free keyboard users who were stopped completely, so the impact is High, and the risk is Low because it is a small change in the template. Captions for ten videos cost €12,000, Mid effort, with High impact and Mid risk.
3. **A big rewrite.** Rewriting all 600 lessons costs €30,000, so the effort is High. It helps many learners a little and only when it is finished, so the impact is Mid, and the risk is High because the budget may run out first. So: cheap fixes that free a blocked group first, the big job later.

| Measure (LearnLoop, Case assumption) | Cost | Effort | Impact | Risk | Reasons |
|---|---|---|---|---|---|
| A skip link and a visible focus on every page | €5,000 | Low | High | Low | Effort: €5,000 is under €8,000: Low. Impact: Keyboard users can finally move through every page, so a group that was stopped is freed. Risk: A small change in the page template, easy to test. |
| Captions for the ten most-viewed videos | €12,000 | Mid | High | Mid | Effort: €12,000 lies between €8,000 and €18,000: Mid. Impact: Deaf learners get the content of the videos that most learners watch. Risk: The other videos stay without captions, so the gain is partial. |
| Rewrite all 600 lessons in plain language | €30,000 | High | Mid | High | Effort: €30,000 is above €18,000: High. Impact: It helps many learners a little, but only once all lessons are done. Risk: It will take months, and the budget may run out before it is finished. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €8,000 is Low; €8,000 to €18,000 is Mid; above €18,000 is High.
- Rate impact by how many learners are freed and how badly they were blocked: a barrier that stops a group completely outweighs one that only slows.
- Rate risk by what could go wrong: a job that takes longer than the time allows, a fix that covers only part of the content, a new menu that confuses regular users at first.
- Justify the order with accessibility is usability is success: say whom your first measure helps soonest.
- Say what you do not know, for example how many learners use a screen reader, and how you would find out.
:::

^src: Gibbons 2018 · W3C 2023

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · Accessibility as a strategic quality: from requirement to priority, process and measure · 18 min · Core

> Accessibility is a standard, not an add-on, and WCAG is the minimum, not the goal. A strategy moves from requirement to priority, to process, to measure.

:::box In plain words
**The idea.** The plan's coaching says that accessibility is not an add-on but a standard, and that WCAG is a minimum, not a goal. A strategy moves from the requirement to a priority (start where most learners meet the barrier), to a process (so that new content stays accessible), to a measure (so that management can see progress).
**Why it matters.** Task 2 asks for a strategy to implement WCAG, the integration into the UX process and an evaluation approach. This chain gives you the order.
**How to read the picture.** The chain reads from left to right: requirement, priority, process, measure. Below it, the test for each link.
:::

![An accessibility strategy: requirement, priority, process, measure.](_figures/d13_b1_0.png)

*The test for each link of the chain*

| Link | The test | What goes wrong without it |
|---|---|---|
| Requirement | Is the standard named (WCAG 2.2 AA) and its status known? | Nobody knows what “accessible” means. |
| Priority | Do the first steps reach the most learners? | Effort goes into rarely used content. |
| Process | Does a new page start accessible? | New barriers appear as fast as old ones are fixed. |
| Measure | Can management see progress in a figure? | Nobody can say whether it works. |

:::note Case assumption
The chain follows the plan's coaching: accessibility is a standard and WCAG a minimum. LearnLoop is the example company. Legal duties differ by country and product, so the legal side must be checked for the real case.
:::

:::rules How to decide when this comes up in the task
- Choose a strategy that starts where most learners meet the barrier and then builds accessibility into the process; reject “everything at once” (over the budget) and “only when a complaint arrives” (the risk stays).
- Build accessibility into the process early: criteria in the brief, a check at design review, accessible components in the style guide, a test before release, training for the people who make content.
- Make it measurable: use automatic counts (share of pages that pass the contrast check), tests with users (can a keyboard user finish a lesson?) and a figure for management (open barriers by severity).
- Do not use a statement of accessibility as a measure: it is a claim, and it can be wrong.
- Name who else gains: measures built for one group, such as captions or a clear menu, often help everyone.
:::

:::note Extra · go deeper (optional reading)
In Germany, the BFSG (Barrierefreiheitsstärkungsgesetz) makes accessibility a legal requirement for many products and services, and it applies from 28 June 2025; which parts apply to a given learning platform depends on its use, so a legal check is part of the strategy.
:::

^src: W3C 2023 · EN 301 549 · BFSG · CAST 2024

## B2 · Conflicting goals: accessibility against cost, standardisation against flexibility · 22 min · Core

> Accessibility competes with cost, and a fixed standard with flexibility. Measures with wide reach and modest cost go first; an overlay that removes no barrier is not a measure.

:::box In plain words
**The idea.** The plan's conflicts for Day 13 are accessibility against cost, and standardisation against flexibility. A broad programme is expensive, and a cheap overlay does not remove barriers. A fixed standard is reliable, yet some learners need different solutions. The aim is the measures that reach the most learners for the least cost, with the standard as the floor.
**Why it matters.** Task 2 asks for prioritised measures and a risk analysis of costs against benefits. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places six LearnLoop measures by their cost (to the right) and the reach, that is how many learners gain (upwards). The position is a reading of the example, not a score.
:::

![A worked example: six LearnLoop measures by cost and reach.](_figures/d13_b2_0.png)

**The point.** Accessibility competes with cost, and a standard competes with flexibility. Rank measures by how many learners gain against what it costs: cheap measures with wide reach go first, and a cheap overlay that removes no barrier is not a measure at all.

**A short story in steps.**

1. **Cheap and wide.** Let us look at LearnLoop's options. Raising the text contrast costs little and helps every page, and a keyboard-operable menu with clear structure opens every course to several groups at once. Both gain many learners for modest cost, so both go first.
2. **Costly or narrow.** Two other ideas look different. A separate accessible version costs the most and serves a narrow group, and a cheap overlay plug-in removes almost nothing. Neither is a good use of a limited budget, however different their price.
3. **Accessibility against cost.** A text alternative for all 2,000 items matters a great deal and costs a great deal. The answer is not to skip it but to do the most-viewed items first and the rest in steps.

| Point | The idea | Why it sits there |
|---|---|---|
| A | Raise the text contrast | One change in the style sheet, and every page helps learners with low vision and anyone in bright light. Cheap, with wide reach. |
| B | A keyboard-operable menu and clear structure | It opens every course for keyboard users, helps learners who find structure hard, and everyone finds courses faster. Mid cost, the widest reach. |
| C | A text alternative for all 2,000 items | It matters a lot to blind and deaf learners, but the cost is very high and the gain arrives only at the end. Worth doing, in steps, most-used first. |
| D | An accessibility overlay plug-in | Cheap and quick, and it removes almost no barrier underneath. Low reach, and a false sense of safety. |
| E | A separate accessible version | The highest cost for a narrow group, and a second platform that must be kept up. Costly, narrow reach. |
| F | Plain language on the most-used lessons | A mid cost, and it helps learners with dyslexia, non-native speakers and everyone in a hurry. Wide reach, planned in steps. |

*Two conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| Accessibility against cost | A full programme at once | A small budget and little time | Start with the measures of the widest reach for the least cost. |
| Standardisation against flexibility | One fixed standard for all | Solutions for particular needs | Make the standard the floor; allow adjustment above it. |

:::note Case assumption
LearnLoop and its six measures are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both sides of each conflict: the cost of a broad programme and the cost of doing too little (complaints, legal action, lost customers). A plan that names only one cost has not weighed the conflict.
- Order measures by reach for cost: cheap with wide reach first, costly with wide reach in steps, cheap with narrow reach only if it removes a real barrier, costly with narrow reach avoided.
- Reject a separate accessible version and an overlay as the main answer: the first is not inclusive and doubles the upkeep; the second leaves the barriers underneath.
- Use the standard as the floor and allow flexibility above it: a learner who needs more time or a different format should be able to ask for it.
:::

:::note Extra · go deeper (optional reading)
Accessibility overlays are plug-ins that promise to fix a site automatically. Many accessibility experts and disabled users have criticised them because the barriers underneath remain, so they are better treated as a risk than as a measure.
:::

^src: W3C 2023 · CAST 2024 · Gibbons 2018

## B3 · Deciding without knowing how much of the platform fails: a decision you can check later · 20 min · Core

> When you do not know how much fails, fix the most-used part first, audit a sample, write a figure you can watch into the plan, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide although you do not know how much of the platform fails WCAG, and requirements are rising. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A short audit of a sample is the cheapest way to find out what you do not know.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision without knowing how much fails, filled in for LearnLoop.](_figures/d13_b3_0.png)

*Five ways to make a decision with an unknown scale safer*

| Way | What it looks like |
|---|---|
| Audit a sample | Five to ten pages are checked with a keyboard, a screen reader and a tool. |
| Start with the most-used content | The twenty courses most learners use are fixed first. |
| Set a figure and a date | The number of barriers per page you expect, and the month you will look. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “the audit of five more pages shows more than five barriers per page by the end of month 3”.
- Learn cheaply: audit a sample of pages with a keyboard, a screen reader and an automatic tool before you plan the whole programme.
- Do not wait for certainty: starting with the most-used courses is useful whatever the audit finds.
- Giving up nothing means you have not decided: name what you postpone, for example the claim “fully accessible” or the old archive.
:::

:::note Extra · go deeper (optional reading)
Premortem: imagine the programme failed. Typical answers here: we did too little and a complaint became a legal case, retrofitting cost far more than planned, and new content brought new barriers. Each answer becomes a check.

One-way and two-way doors: a fix in the style sheet is a two-way door; a second, separate platform is a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · Gibbons 2018

