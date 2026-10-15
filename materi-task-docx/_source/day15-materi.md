---
doc: materi
day: 15
kicker: DAY 15 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Mobile learning UX
subtitle: Fundamentals of mobile learning UX, microlearning design, responsive design, cross-device optimisation and testing
daytitle: Day 15 · Module 7 (1 day): Fundamentals of mobile learning UX, microlearning design, responsive design, cross-device optimisation and testing
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is MobileLearn, a platform with poor mobile usage(see the Task document).
intro: This document holds everything you need to study Day 15 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: cross-device,synchronisation,native-app,fragmentation,push-notification,microlearning,context-of-use,learning-objective,rule-based,responsive,dropout,touch-target,usability,wcag,completion,usability-test,conflicting-goals,premortem,accessibility,conformance,keyboard,focus-indicator
refs: budiu2015,sharples2007,wroblewski2011,hug2005,klein2007,wcag22,nielsen2000,gibbons2018,bezos2016
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · The mobile context of use: on the go, little time, low attention · 14 min · Core

> The context of use decides the design. On a phone it is usually on the go, with little time and low attention. Mobile is not a smaller desktop; it needs speed, simplicity and clarity.

:::box In plain words
**The idea.** The context of use is where, when and with how much attention a person uses a product. On a phone it is usually on the go, with little time and low attention, in a place with many distractions. At a desk it is the opposite. Mobile is not a smaller desktop: the context decides the design, and what mobile learners need is speed, simplicity and clarity.
**Why it matters.** In Task 1 you say which problem to fix first for a learner on the move and which content belongs on a phone. Both come from the context of use.
**How to read the picture.** The same learner, Ben, in three contexts: at a desk, on a crowded train and in a five-minute break.
:::

![The same learner in three contexts of use.](_figures/d15_a1_0.png)

**The point.** The context of use is where, when and with how much attention someone uses a product. On a phone it is often on the go, with little time and low attention. Mobile is not a smaller desktop: the context decides the design, and what the learner needs is speed, simplicity and clarity.

**A short story in steps.**

1. **The desk.** Let us follow Ben, a learner at LearnLoop. In the evening he sits at a desk with a large screen and an hour free. A long lesson, a wide table and a page of text all work for him, and this is the situation the platform was built for.
2. **The train.** In the morning the same Ben stands on a crowded train with a phone in one hand and ten minutes. The same lesson is now a problem: it is long, it needs two hands, and he is interrupted at every stop. Nothing about Ben changed, only the context.
3. **What he needs.** In a five-minute break at work he needs something short that starts at once and can be stopped without losing his place. So designing for mobile means designing for this context, not squeezing the desktop onto a small screen.

| State shown in the picture | What it means |
|---|---|
| At a desk | Ben has an hour, a big screen and quiet. A long lesson, a wide table and a lot of text all work, so the desktop design is fine here. |
| On a crowded train | Ben has a few minutes, one hand and many distractions. A 40-minute video or a wide table is useless to him now. |
| In a five-minute break | Ben has five minutes and one eye on the clock. He needs something short that starts at once and that he can stop without losing his place. |

*Two contexts of use, side by side*

|  | At a desk | On the go with a phone |
|---|---|---|
| Time | An hour or more | A few minutes |
| Attention | High, few interruptions | Low, many interruptions |
| Hands and screen | Two hands, large screen, keyboard | One hand, small screen, thumb |
| What fits | Long reading, tables, projects | Short units, quick checks, reminders |

:::note Case assumption
LearnLoop and Ben are made up for this example. The differences between mobile and desktop use are described in the usability literature on mobile (Budiu 2015) and in the theory of mobile learning (Sharples et al. 2007).
:::

:::rules How to decide when this comes up in the task
- Start from the context: where, when and with how much attention does the learner use the platform? On the go means minutes, one hand and distractions.
- Sort a fact as a length problem when a session on the move cannot finish it: a long video, a very long text, a quiz that must be finished in one go.
- Sort a fact as an adaptation problem when the layout or media are not fitted to a phone or its setting: a shrunk desktop menu, a wide table, a video that needs sound.
- Say what a mobile learner expects: speed (it starts at once), simplicity (one main thing), clarity (it is obvious what to do).
- Decide which content belongs on a phone: short, quick to check, easy to stop. Long reading, wide tables and projects with files fit a laptop better.
:::

:::note Extra · go deeper (optional reading)
Wroblewski's “mobile first” asks teams to design for the small screen first, because the constraints force them to decide what matters most. It is a way of working, and not a claim that everybody studies on a phone.
:::

^src: Budiu 2015 · Sharples et al. 2007 · Wroblewski 2011

## A2 · Microlearning design: short units with one objective, and its risks · 14 min · Core

> Microlearning: short, self-contained units with one objective each. It fits everyday life. The risk is fragmentation of knowledge, so each unit needs a goal, a check and its place in the course.

:::box In plain words
**The idea.** Microlearning means short, self-contained learning units, each with one learning objective. Its advantages are flexibility and a better fit with everyday life. Its risk is fragmentation of knowledge: pieces that do not add up. A unit needs one objective, a short check and a visible place in the course.
**Why it matters.** In Block 2.2 and Block 3.1 you choose microlearning measures and rules, and you name the risk of fragmentation.
**How to read the picture.** The same content three ways: one long lesson, the same lesson cut into pieces at arbitrary points, and five short units with a goal each.
:::

![The same LearnLoop content as one long lesson, as arbitrary pieces, and as units with a goal.](_figures/d15_a2_0.png)

**The point.** Microlearning means short, self-contained units, each with one objective. It fits everyday life, but cutting a lesson at random pieces does not teach. The risk is fragmentation of knowledge, and the answer is a goal, a check and a visible place in the course for every unit.

**A short story in steps.**

1. **Too long for a break.** Let us look at a LearnLoop lesson on pricing: one block of forty minutes. Ben opens it on the train and has ten minutes. He cannot finish it, and when he leaves he loses his place, so he does not come back to it that day.
2. **Short, but pointless.** A first fix cuts the lesson every five minutes. The pieces are short, but they stop in the middle of an idea, and none of them says what it is for. Ben finishes three pieces and still cannot say what he learned: the knowledge has been fragmented.
3. **Units with a goal.** The better version builds five units, each with one goal, a short check and a place in the course. Ben can finish one in a break, and the bar shows how far he has come. So microlearning needs a goal in every unit.

| State shown in the picture | What it means |
|---|---|
| One long lesson | one block of forty minutes. A learner must finish it or lose their place, which does not fit a day full of short breaks. |
| Arbitrary pieces | the same lesson cut every five minutes, wherever the clock says. Each piece is short, but none says what it is for, so the learner collects pieces and understands little. |
| Units with a goal | five units of about four minutes, each with one goal, a short check and its place in the course. A learner can finish one in a break and still see how the whole fits together. |

*Advantages and risks of microlearning*

|  | Advantage | Risk and a safeguard |
|---|---|---|
| Time | Fits a short break; high flexibility. | Many tiny sessions; a “continue” card helps. |
| Focus | One objective per unit. | Fragmentation: show each unit's place in the course. |
| Everyday life | Better integration into a busy day. | Shallow learning: end with a check, and a course-level check. |

:::note Case assumption
LearnLoop and Ben are made up for this example. Microlearning as a term is discussed in the literature (Hug 2005), where its limits as well as its uses are noted.
:::

:::rules How to decide when this comes up in the task
- Build a unit around one learning objective, about three to seven minutes, that can be finished in a short break.
- Make each unit stand alone, but show its place in the course, so that the pieces add up.
- End each unit with a short check, and let a “continue” card remember where the learner stopped.
- Do not cut a long lesson at arbitrary points: a piece with no objective does not teach.
- Name the risk when you propose microlearning: fragmentation, and say how you would guard against it.
:::

:::note Extra · go deeper (optional reading)
Whether short units teach as well as long ones depends on how the content is designed, so the claim to check is not “short is better” but “each unit has one objective and a check”.
:::

^src: Hug 2005 · Sharples et al. 2007 · Klein 2007

## A3 · Responsive and cross-device design: prioritise, reduce, synchronise · 12 min · Core

> Responsive design prioritises and reduces: the essentials first, large targets, text that fits. Cross-device design keeps one experience: synchronised progress, the same names, the same logic.

:::box In plain words
**The idea.** Responsive design adapts a platform to different screen sizes. On a phone it prioritises content, reduces what is shown to the essentials, and makes controls large enough for a thumb. Cross-device optimisation goes further: it keeps the experience whole when a learner changes device, by synchronising progress and keeping the same names and layout logic.
**Why it matters.** Block 2.2 and Block 3.1 ask for mobile optimisation and for progress synchronisation. This card names both.
**How to read the picture.** One LearnLoop phone screen with four features that can be on or off: prioritised content, large targets, text that fits and a synchronised continue card.
:::

![One LearnLoop phone screen and four fixes.](_figures/d15_a3_0.png)

**The point.** Responsive design prioritises: it shows what a phone user needs first, makes controls large enough for a thumb, and lets text fit the screen. Cross-device design adds a synchronised place, so a learner can pick up on any device. Together they make one experience instead of two.

**A short story in steps.**

1. **The desktop on a phone.** Let us follow Ben on the train, opening LearnLoop on his phone. The screen shows everything at once in small type, the Start button is tiny, a block of text runs off the edge, and nothing says that he began a unit on his laptop last night. He gives up.
2. **Four fixes.** Now all four fixes are on. The screen opens with today's four minutes, the button fits a thumb, the text fits the screen, and a card says “Continue: Unit 3, from your laptop”. Ben starts in one tap and does not have to search for anything.
3. **One at a time.** A team can do these in steps. Block 2.2 asks you to choose measures like these.

| Switches | What it means |
|---|---|
| All off | 0 of the 4 fixes are on. Everything is shown at once, in small type. The Start button is tiny. A wide block runs off the edge. Nothing shows where Ben stopped on his laptop. |
| All on (Prioritised content, Large targets, Text that fits, Synchronised continue card) | 4 of the 4 fixes are on. The screen opens with what Ben needs today. The Start button is large enough for a thumb. The text fits the screen. A card continues where Ben stopped on his laptop. |

*Four fixes, and the failure each one answers*

| Fix | It answers | A simple test |
|---|---|---|
| Prioritised content | Everything shown at once in small type | Does the screen open with what matters today? |
| Large targets | A menu shrunk onto a phone | Can a thumb hit it on a moving train? |
| Text that fits | Tables that scroll sideways | Can a whole row be read at once? |
| Synchronised place | Progress that does not follow the learner | Does the laptop show what the phone did? |

:::note Case assumption
LearnLoop and Ben are made up for this example. The target-size figures are those of WCAG 2.2; the 44 px aim is a common guideline, not a legal limit.
:::

:::rules How to decide when this comes up in the task
- Prioritise content by device: what is the same everywhere, what comes first on a phone, what only fits a large screen.
- Reduce to the essentials: one main action per screen, tables turned into cards, long text broken up.
- Make touch targets large and give them room: about 44 px is a good aim (WCAG 2.2 requires 24 px at Level AA).
- Synchronise progress, bookmarks and the place where the learner stopped, so that any device can pick up.
- Keep the same names and the same logic on every device, and adapt only the layout.
:::

:::note Extra · go deeper (optional reading)
Day 10 treated responsive design and accessibility on a phone in detail. This card adds the cross-device side: what happens to one learner's experience when they change device.
:::

^src: Wroblewski 2011 · Budiu 2015 · W3C 2023

## A4 · Testing and optimising mobile learning: real phones, real settings · 10 min · Optional

> Test mobile learning on real phones in real settings, analyse when and where learners study, and adjust continuously.

:::box In plain words
**The idea.** Mobile learning is tested on real phones in real settings. A mobile usability test means watching learners do tasks on their own phones, some on the move. Analysing the contexts of use means finding out when and where they study, and continuous adjustment means repeating the loop as use changes.
**Why it matters.** Block 3.1 asks for a testing and optimisation strategy. The loop is repeated in B1, so no Core block needs this card.
**How to read the picture.** A learner tests a task on her own phone while a tester watches and notes where she stops.
:::

![.](_figures/d15_a4_0.png)

:::note Case assumption
LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Test on learners' own phones, some of them on the move: a lab desk hides the context.
- Analyse the contexts of use: when, where and on which device learners study.
- Adjust continuously: repeat the loop as use changes.
:::

:::note Extra · go deeper (optional reading)
A diary study asks learners to note where, when and on which device they study for a few weeks. It shows contexts that no analytics tool can see.
:::

^src: Nielsen 2000 · Budiu 2015

## A5 · Weighing a mobile measure: user value, effort, risk · 10 min · Core

> Rate a measure by how much it helps a learner on the move, what it costs and what could go wrong. Fit the content to the context before building another product.

:::box In plain words
**The idea.** To choose between mobile measures, rate each on the same three questions. User value: how much does it help a learner on the move? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €16,000 is Mid, above that is High. Risk: what could go wrong, for example that knowledge is fragmented or two products must be kept up.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €40,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three mobile measures.](_figures/d15_a5_0.png)

**The point.** Rate a measure by how much it helps a learner on the move, by its printed cost, and by what could go wrong. Short units and a remembered place fit the context cheaply. A separate native app can fit well too, but it costs the most and doubles the upkeep.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop once more. Phone use is rising, lessons are long, the budget is €40,000, and three ideas are on the table. We rate each on three questions: how much it helps a learner on the move (user value), what it costs (effort), and what could go wrong (risk).
2. **Short units.** Three-minute units for ten lessons cost €12,000, so the effort is Mid. A learner can finish one in a break, so the user value is High, and the risk is Mid because the units must still add up to the course. Remembering the place costs €9,000, Mid effort, with Mid value and Mid risk.
3. **A separate app.** The native app costs €36,000, so the effort is High. It helps only once built, while the lessons stay long, so the value is Mid, and the risk is High because two products must be kept up on a limited budget. So: fit the content to the context first, build a product later.

| Measure (LearnLoop, Case assumption) | Cost | Effort | User value | Risk | Reasons |
|---|---|---|---|---|---|
| Three-minute units for the ten most-used lessons | €12,000 | Mid | High | Mid | Effort: €12,000 lies between €8,000 and €16,000: Mid. User value: A learner can finish a unit in a short break, which fits the context of use. Risk: The units must still add up to the course, or knowledge is fragmented. |
| Remember where a learner stopped, on every device | €9,000 | Mid | Mid | Mid | Effort: €9,000 lies between €8,000 and €16,000: Mid. User value: It keeps the experience whole when the device changes, but it does not shorten anything. Risk: A sync error could show the wrong place or progress. |
| A separate native phone app | €36,000 | High | Mid | High | Effort: €36,000 is above €16,000: High. User value: It can fit the phone very well, but it only helps once built and the content is still long. Risk: Two products must be kept up, and the budget is limited. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €8,000 is Low; €8,000 to €16,000 is Mid; above €16,000 is High.
- Rate user value by how much it helps a learner on the move: a measure that fits the context outweighs one that only copies the desktop.
- Rate risk by what could go wrong: fragmentation of knowledge, two products to keep up, a sync error, a change that touches every screen.
- Justify the order with context, design, usage: say how your first measure fits the context of use.
- Say what you do not know, for example how many learners use a phone and when, and how you would find out.
:::

^src: Gibbons 2018 · Hug 2005

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · Mobile UX as a strategy of its own: context, design, usage, scale · 18 min · Core

> Mobile UX is a strategy of its own: start from the context of use, design for it, check the usage it produces, and scale one experience across devices.

:::box In plain words
**The idea.** The plan's coaching says that mobile is not a smaller desktop, the context of use determines the design, and cross-device is a strategic advantage. A mobile strategy therefore starts from the context, designs for it (short units, a layout that prioritises), checks the usage it produces, and scales the experience across devices. The chain is context, design, usage, scale.
**Why it matters.** Task 2 asks for a mobile strategy, a microlearning concept, a cross-device approach and a testing strategy. This chain gives you the order.
**How to read the picture.** The chain reads from left to right: context, design, usage, scale. Below it, the test for each link.
:::

![A mobile strategy: context, design, usage, scale.](_figures/d15_b1_0.png)

*The test for each link of the chain*

| Link | The test | What goes wrong without it |
|---|---|---|
| Context of use | Can you say where, when and with what attention learners use it? | You design for a learner who is not there. |
| Design for it | Does the unit fit a short break, and does the layout fit a thumb? | The desktop is squeezed onto a phone. |
| Usage | Is drop-out on phones measured separately? | You cannot tell whether it worked. |
| Scale across devices | Does the experience stay whole when the device changes? | Two experiences drift apart. |

:::note Case assumption
The chain follows the plan's coaching: context determines design, and cross-device is a strategic advantage. LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Decide the mobile strategy from the context of use: one platform designed from the phone context first, with short units on the phone, depth on the desktop and one account. Reject a separate mobile site (two products) and native apps without a named need (cost and a one-way door).
- Design the microlearning concept: one objective per unit, three to seven minutes, a place in the course, a short check, a “continue” card.
- Plan the cross-device approach: decide what is phone first, desktop first and identical everywhere (progress, bookmarks, names).
- Test and optimise in a loop: tests on real phones each quarter, drop-out and task data split by device each month, and a change after each round.
- Say what you do not know and how to find out: the share of phone learners, and where they stop.
:::

:::note Extra · go deeper (optional reading)
A native app is a program built for one operating system and installed from a store. It can use the phone's functions (notifications, offline storage), which a website cannot always do, so it is justified by a named need, not by fashion.
:::

^src: Wroblewski 2011 · Sharples et al. 2007 · Budiu 2015 · Nielsen 2000

## B2 · Conflicting goals: mobile against desktop, content against fit to the situation · 22 min · Core

> Mobile competes with desktop, and content with fit to the situation. Show on each device what suits it, keep one experience across both, and do not copy one onto the other.

:::box In plain words
**The idea.** The plan's conflicts for Day 15 are mobile against desktop, and information content against fit to the situation. The desktop can show everything, and a phone cannot. The aim is to show on each device what suits its situation, and to keep one experience across both, instead of building two products or copying one onto the other.
**Why it matters.** Task 2 asks for a risk analysis and prioritised measures. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places six LearnLoop ideas by how much content they show at once (to the right) and how well they fit the learner's situation (upwards). The position is a reading of the example, not a score. The top right is the aim.
:::

![A worked example: six LearnLoop ideas by content shown at once and fit to the learner's situation.](_figures/d15_b2_0.png)

**The point.** Mobile and desktop pull against each other, and so do content and fit. A phone cannot show everything at once, so the answer is to show on each device what suits its situation, with the rest one tap away, and to keep one experience across both.

**A short story in steps.**

1. **Complete, but not fitting.** Let us look at LearnLoop's ideas. Shrinking the desktop page onto a phone keeps everything and fits nothing: the type is tiny and the table scrolls sideways. A three-minute unit is the opposite, a perfect fit that shows very little.
2. **The essentials first.** A responsive page does both jobs. On the phone it shows the essentials first and puts the rest one tap away, and on the laptop it shows the whole. The learner on the move gets what suits the moment, and nothing is lost.
3. **Mobile against desktop.** A separate phone-only catalogue fits the phone, but learners miss courses and the experience breaks at the device change. So keep one experience, and let each device show what suits it.

| Point | The idea | Why it sits there |
|---|---|---|
| A | The desktop page shrunk onto the phone | Everything is there, in tiny type, and it fits no situation on the move. Complete, not fitting. |
| B | A three-minute unit with one goal | It fits a short break perfectly and shows little. On its own it is a piece, so it needs its place in the course. Reduced and fitting. |
| C | A responsive page that shows the essentials first | The essentials come first on the phone, and the rest is one tap away. The whole is there, and the situation is respected. This is the aim. |
| D | A daily push reminder | It shows almost nothing, and it arrives when the learner is busy. It interrupts instead of fitting. Reduced, not fitting. |
| E | A separate phone-only catalogue with fewer courses | It fits the phone, and learners miss courses and lose the link to the desktop. A second product with a broken experience. |
| F | Long reading and wide tables kept for the laptop | The depth stays where it fits, on a large screen, and the phone is not forced to show it. Complete on the laptop, with the phone kept clear. |

*Two conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| Mobile against desktop | A phone-only design | The desktop as it is | One platform, one account, layout adapted by device. |
| Content against fit to the situation | All the content at once | Only what suits the moment | Essentials first, the rest one tap away. |

:::note Case assumption
LearnLoop and its six ideas are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both sides of each conflict: what the desktop can show (everything) and what a phone situation allows (the essentials). A plan that names one side has not weighed the conflict.
- Do not shrink the desktop onto the phone, and do not build a second product to avoid the choice: show the essentials first and keep the rest one tap away.
- Keep depth where it fits: long reading and wide tables on the large screen, short units and quick checks on the phone.
- Reject interruptions as a cure: a daily push message adds to the distractions of the context and does not fix the content.
:::

:::note Extra · go deeper (optional reading)
Competitors that are “better on mobile” can mean many things: shorter units, a better layout, or an app. Before copying, ask which of these the learners of your own platform need, because their context may differ.
:::

^src: Budiu 2015 · Wroblewski 2011 · Klein 2007

## B3 · Deciding without data by device: a decision you can check later · 20 min · Core

> When you do not have the data by device, split it first, test on a few real phones, start with the likely and cheap step, write a figure you can watch into the plan, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide although you do not yet have the data by device. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. Splitting the data by device and testing on a few real phones is the cheapest way to learn what you do not know.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision without data by device, filled in for LearnLoop.](_figures/d15_b3_0.png)

*Five ways to make a decision without the data by device safer*

| Way | What it looks like |
|---|---|
| Split the data by device | Drop-out and completion are recorded separately for phone, tablet and laptop. |
| Test on real phones | Five to eight learners do tasks on their own phones, some on the move. |
| Start likely and reversible | Short units for the most-used lessons first, behind a switch. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “drop-out on phones has not fallen from 45% to below 40% by the end of month 3”.
- Close the data gap first and cheaply: split drop-out by device, and run a test with a few learners on their own phones.
- Start with the step that is likely and cheap to reverse: short units for the most-used lessons, not a native app.
- Giving up nothing means you have not decided: name what you postpone, for example the native app or the push reminders.
:::

:::note Extra · go deeper (optional reading)
Premortem: imagine the strategy failed. Typical answers here: the short units did not add up, phone and desktop drifted apart, and we designed for an imagined context. Each answer becomes a check.

One-way and two-way doors: short units behind a switch are a two-way door; two native apps are a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · Gibbons 2018

