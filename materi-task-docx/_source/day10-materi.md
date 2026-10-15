---
doc: materi
day: 10
kicker: DAY 10 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Feedback, progress, responsive design
subtitle: Visual feedback and progress tracking systems, responsive design and accessibility for learning platforms
daytitle: Day 10 · Module 4 (day 3 of 3): Visual feedback and progress tracking systems, responsive design and accessibility for learning platforms
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is TrackLearn, a platform where learners do not know where they stand(see the Task document).
intro: This document holds everything you need to study Day 10 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: direct-feedback,responsive,touch-target,reflow,feedback,accessibility,rule-based,progress-indicator,personalisation,transparency,tracking,completion,retention,wcag,consistency,return-rate,contrast,premortem,inclusive-design,dropout,orientation,gamification,conflicting-goals,goal-gradient,context-of-use,conformance,screen-reader,fitts,interaction,cross-device,native-app
refs: hattie2007,nielsen1993rt,shneiderman2016,amabile2011,kivetz2006,nunes2006,nielsen1994,wroblewski2011,fitts1954,wcag22,castUdl,gibbons2018,klein2007,bezos2016,nielsen2000
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Visual feedback: direct and indirect feedback as a tool for motivation and steering · 14 min · Core

> Feedback tells a learner that an action counted and what it means. Direct feedback answers at once; indirect feedback shows progress. Both steer motivation.

:::box In plain words
**The idea.** Feedback is what a platform tells a learner back after they act. It matters in the learning process because it shows that the action counted and what it means. There are two kinds: direct feedback, such as correct or incorrect, and indirect feedback, such as visible progress. Used well, feedback is a tool for motivation and steering.
**Why it matters.** In Task 1 you sort facts about a platform into missing feedback, unclear progress and poor use on a phone, and you say how they affect motivation. The first of these comes from this card.
**How to read the picture.** The same LearnLoop question three ways: no answer, a bare red cross, and an explained result with a next step.
:::

![The same LearnLoop question: no answer, a bare mark, or an explained result.](_figures/d10_a1_0.png)

**The point.** Feedback tells a learner that their action counted and what it means. A bare mark says something happened; an explained result with a next step tells the learner how they are doing and what to do, which steers their motivation.

**A short story in steps.**

1. **Silence.** Let us follow Kim, a learner at LearnLoop, who answers a quiz question. The page does not change at all. Kim cannot tell whether her answer was recorded, so she clicks it again and then wonders if the platform is broken. A learner who gets no answer to an action tends to stop acting.
2. **A mark and nothing else.** Now a red cross appears next to B. That is direct feedback, and it is better than silence, but it only judges. Kim does not know why B is wrong or what to do about it, so a mistake feels like a verdict and the next question feels like a risk.
3. **Feedback that steers.** Finally the page explains: A is right, because the first number sets the anchor, and next time name your number first. A button leads to the next question. Kim learns something from the mistake and knows where to go, so feedback has become a tool for motivation and steering.

| State shown in the picture | What it means |
|---|---|
| No answer | Kim picks an answer and the page looks exactly as before. She does not know if it counted, so she clicks again and wonders whether the platform works. |
| A bare mark | a red cross appears. Kim knows she was wrong, but not why, and not what to do. Direct feedback that only judges can feel like a verdict. |
| Explained, with a next step | the page says A was right, why, and what to do next time, and offers “Next question”. Kim learns from the mistake and carries on, so the feedback steers her instead of stopping her. |

*Two kinds of feedback and what each does*

| Kind | Example | What it does for the learner |
|---|---|---|
| Direct | Correct or incorrect, a tick when a task is saved, an explained result. | Says at once whether the action counted and why. |
| Indirect | A progress bar, a status per lesson, a note at a milestone. | Shows how the work adds up over time. |

:::note Case assumption
LearnLoop and Kim are made up for this example. The response-time limits behind “at once” are Nielsen's (1993); the three questions of good feedback follow Hattie and Timperley (2007).
:::

:::rules How to decide when this comes up in the task
- Sort a fact as missing feedback when the learner does something and the platform does not answer, or answers with a bare mark that says nothing.
- Good feedback does three things: it says the action counted, says why a result is what it is, and says what to do next.
- Use direct feedback (a result, a tick) for single actions, and indirect feedback (visible progress, a milestone note) for the course as a whole.
- Explain how a fact affects motivation by saying what the learner feels and what they stop doing.
- Give feedback where it counts (a finished task, a mistake, a milestone), and keep the rest quiet; too much is overload.
:::

:::note Extra · go deeper (optional reading)
Feedback is one of the strongest influences on learning when it tells the learner where they are going, how they are doing and what to do next (Hattie and Timperley 2007). Shneiderman's golden rules ask for informative feedback on every action and a clear closure at the end of a task (Shneiderman et al. 2016).
:::

^src: Hattie & Timperley 2007 · Nielsen 1993 (response times) · Shneiderman et al. 2016

## A2 · Progress tracking systems: bars, levels and status, and their risks · 14 min · Core

> A progress display answers “how far along am I?”. It raises motivation and completion, if it is honest, clear and sized so that a learner can take it in.

:::box In plain words
**The idea.** A progress tracking system shows the learner how far along they are, with progress bars, levels or status indicators. It answers “how far along am I?”, which makes the learning process transparent, and it raises motivation and the completion rate. Its risks are a misleading display and demotivation when the learner is overwhelmed.
**Why it matters.** In Task 1 you choose measures for transparency, and in Task 2 you design a tracking strategy and name how it could mislead.
**How to read the picture.** The same course page three ways: no progress, a bar that jumps to 90% and then crawls, and an honest display “3 of 8”.
:::

![The same LearnLoop course: no progress, a bar that cheats, an honest display.](_figures/d10_a2_0.png)

**The point.** A progress display answers “how far along am I?” and raises motivation and completion, but only if it is honest. A bar that jumps ahead and then crawls feels like a cheat, and a long course shown all at once can overwhelm.

**A short story in steps.**

1. **No way to tell.** Let us follow Raj, a learner at LearnLoop, half way through an eight-lesson course. The page lists the lessons and nothing else: finished ones look like new ones, and there is no count. Raj cannot tell how far he has come, and effort without a sign of progress is hard to keep up.
2. **A bar that cheats.** Now someone adds a bar that counts clicks and shows 90% after the first lesson. It looks motivating for a minute. Then the bar creeps, and Raj feels cheated: a misleading display is one of the two risks the plan names, and it costs trust in every number.
3. **Honest and clear.** The honest version counts lessons finished out of lessons in the course: “3 of 8”, with a status on each lesson and the time left. It is true, it is clear, and it breaks a big course into steps Raj can see. So progress should be based on something real, labelled, and shown in a size a learner can take in.

| State shown in the picture | What it means |
|---|---|
| No progress shown | eight lessons that all look alike. Raj is half way through and cannot tell. Without a sense of getting somewhere he starts to wonder how much is left. |
| A bar that cheats | the bar counts clicks, so it shows 90% after the first lesson and then barely moves. Raj first feels great and then feels cheated, and loses trust in every number the platform shows. |
| An honest display | “3 of 8 lessons done · about 20 min left”, with a status on each lesson. Raj sees where he is, what is done and what is left, so the progress motivates him and matches what he did. |

*Four progress elements, and the risk of each*

| Element | It answers | Risk |
|---|---|---|
| A progress bar | How far along am I in this course? | Misleading if it counts clicks and not lessons. |
| A status per lesson | What is done, what is open? | Few; keep to three states. |
| A level | How much have I achieved overall? | Meaningless if it does not say what it measures. |
| A time estimate | How much is left? | Discouraging if the course looks very long; show a first small goal too. |

:::note Case assumption
LearnLoop and Raj are made up for this example. Research on the effect of visible progress is mixed in detail, so the card states a direction, not a figure.
:::

:::rules How to decide when this comes up in the task
- Sort a fact as unclear progress when the learner cannot tell how far along they are, which lessons are done, or what a number measures.
- Base a progress display on something real (lessons finished out of lessons in the course), label it (“3 of 8”) and show the status of each lesson.
- A display that does not say what it measures (a bare level), jumps ahead and then crawls, or ranks learners against each other can mislead or demotivate: name the risk when you propose one.
- For a long course show a small goal first (the first module) as well as the whole, so that it does not overwhelm.
- Transparency raises motivation, and motivation raises completion: that is the chain to argue in a priority order.
:::

:::note Extra · go deeper (optional reading)
The progress principle: Amabile and Kramer (2011) report that a sense of making progress in meaningful work is a strong driver of motivation. Studies of goal gradient and endowed progress (Kivetz, Urminsky and Zheng 2006; Nunes and Drèze 2006) suggest that people try harder as a goal gets closer, and that a head start helps, though a head start that is not real is the cheat shown in the picture. Day 11 treats gamification in depth.
:::

^src: Amabile & Kramer 2011 · Kivetz et al. 2006 · Nunes & Drèze 2006 · Nielsen 1994

## A3 · Responsive design for learning platforms: devices, contexts and priorities · 12 min · Core

> Responsive design adapts a platform to the device and context, and prioritises content by device. For a platform used mostly on phones it is a prerequisite.

:::box In plain words
**The idea.** Responsive design adapts a platform to different devices (desktop, tablet, mobile) and to the different contexts in which they are used. It prioritises content by device: what is the same everywhere, what comes first on a phone, what only fits a large screen. A learner who studies on a phone in a few free minutes needs a different order than one at a desk.
**Why it matters.** In Block 1.1 a fact about a phone screen is one of the three problems, and in Block 3.1 you place content by device. The coaching says responsive design is not an option, but a prerequisite.
**How to read the picture.** The same LearnLoop lesson on four screens: a phone that was not adapted, a phone that was, a tablet and a desktop.
:::

![The same LearnLoop lesson on four screens.](_figures/d10_a3_0.png)

**The point.** Responsive design adapts a platform to the device and the context of use, and prioritises content by device. For a platform used mostly on phones, it is a prerequisite, not an option.

**A short story in steps.**

1. **A desktop page on a phone.** Let us follow Nia, a learner at LearnLoop, who studies on the train with her phone. The platform shows the desktop layout, squeezed to fit: the text runs off the right edge, and the Next button is 20 pixels high at the bottom of a long page. She has four minutes and spends them scrolling.
2. **Prioritised for the phone.** Now the page is built for a phone: progress on top, a large “Continue” button first, text that fits, and one short question. Nia reaches what she needs with her thumb. The content is the same; what changed is the order and the size, decided by how a phone is used.
3. **More room, more content.** A tablet shows the lesson list beside the lesson, and a desktop adds notes. So responsive design is not one shrunken page: it is a decision, per device, about what is the same everywhere, what comes first, and what only fits a large screen.

| State shown in the picture | What it means |
|---|---|
| Phone, not adapted | the desktop layout is squeezed onto a phone. Text runs off the right edge, the learner must scroll sideways, and the Next button is tiny at the page bottom. Most learners would give up. |
| Phone, adapted | the same lesson, prioritised for a phone: progress on top, a large Continue button first, text that fits and one short question. Everything a learner needs in a few minutes is within thumb reach. |
| Tablet | a tablet has room for the lesson list beside the lesson. The core content is the same; the layout uses the extra width. |
| Desktop | a desktop adds notes beside the lesson. These extras suit a large screen; on a phone they open as a separate layer or wait. |

*What changes by device, and what does not*

| Device and context | Typical use | What to put first |
|---|---|---|
| Phone | A few minutes, on the move, one thumb. | Continue, progress, a short question; large targets. |
| Tablet | Sitting down, medium time. | The lesson with the lesson list beside it. |
| Desktop | A longer session at a desk. | The lesson, notes beside it, the full catalogue. |

:::note Case assumption
LearnLoop and Nia are made up for this example. The target-size figures are those of WCAG 2.2; the 44 px aim is a common guideline, not a legal limit.
:::

:::rules How to decide when this comes up in the task
- Sort a fact as poor use on a phone when the layout was not adapted: text runs off the edge, the learner must scroll sideways, or a button is tiny or out of thumb reach.
- Prioritise content by device: what is the same everywhere (progress, the lesson), what comes first on a phone (continue, a short question), what only fits a large screen (notes, a full catalogue).
- Make touch targets large (at least 44 px is a good aim; WCAG 2.2 requires 24 px at Level AA) and put the main action where the thumb is.
- Let text reflow to the screen width so that nobody scrolls sideways (WCAG 1.4.10).
- For a platform with high mobile use, rate a mobile measure as a prerequisite: a progress display or feedback that does not work on a phone reaches nobody.
:::

:::note Extra · go deeper (optional reading)
Mobile first is the practice of designing for the small screen first and adding to it for larger ones, which forces the team to decide what matters most (Wroblewski 2011). Fitts's law explains why large targets near the thumb are quicker to hit (Fitts 1954).
:::

^src: Wroblewski 2011 · Fitts 1954 · W3C 2023

## A4 · Accessibility in the responsive context: operability, legibility and reach · 10 min · Optional

> In the responsive context accessibility means targets large enough to hit, contrast and text that can be read, and words as well as colour. It means reach: the same design works for more learners.

:::box In plain words
**The idea.** In the responsive context accessibility means three things: operability on all devices (targets large enough to hit), legibility (contrast and text that fits), and interaction that works for more people. It is the link to inclusive design from Day 7, and it means scalability and reach: the same design works for more learners.
**Why it matters.** Block 3.1 asks for an accessibility integration. The core rules (target size, contrast, words as well as colour) are repeated in A3 and B1, so no Core block needs this card.
**How to read the picture.** A LearnLoop phone screen with three features that can be on or off: large targets, strong contrast and status in words.
:::

![A LearnLoop phone screen: targets, contrast and words.](_figures/d10_a4_0.png)

**The point.** Accessibility on a phone comes from three small things: targets large enough to hit, contrast strong enough to read in sunlight, and words as well as colours. They make the design work for more people on more devices.

**A short story in steps.**

1. **Jo on a bright day.** Let us follow Jo, a learner at LearnLoop whose hand shakes a little, who studies on a phone outside. The Continue button is tiny, the text is pale grey, and each lesson is only a red or green dot. Jo misses the button, cannot read the text in the glare, and cannot tell which lessons are done.
2. **Three small fixes.** Now the button is large, the text is dark and each lesson says “done” or “open” in words. Jo hits the button at the first try, reads the text in the sun and sees what is done. Nothing about the content changed, and the same three fixes help every learner in a hurry or in bad light.

| Switches | What it means |
|---|---|
| All off | 0 of the 3 accessibility parts are on. The Continue button is tiny, and Jo, whose hand shakes, misses it. The pale grey text disappears in sunlight. Lessons are only red or green dots, which a colour-blind learner cannot tell apart. |
| All on (Large targets (at least 44 px), Strong contrast, Status in words) | 3 of the 3 accessibility parts are on. Jo can hit Continue with a thumb that shakes a little. The text is dark and readable in sunlight. Each lesson says “done” or “open”, which works for colour-blind learners too. |

:::note Case assumption
LearnLoop and Jo are made up for this example. The criteria come from WCAG 2.2 (Day 7).
:::

:::rules How to decide when this comes up in the task
- Operability: targets large enough to hit with a thumb or a shaky hand.
- Legibility: contrast of at least 4.5 : 1 and text that reflows to the screen.
- Do not show status by colour alone: add a word.
:::

:::note Extra · go deeper (optional reading)
This is the link to inclusive design from Day 7: a measure built for a learner with a limit usually helps every learner in a hurry or in bad light. Day 13 treats the WCAG standards in practice.
:::

^src: W3C 2023 · CAST 2024

## A5 · Weighing a feedback, tracking or mobile measure: impact, effort, risk · 10 min · Core

> Rate a measure by what it does for motivation and finishing, what it costs and what could go wrong. Transparency and explained feedback before decoration.

:::box In plain words
**The idea.** To choose between feedback, tracking and mobile measures, rate each on the same three questions. Impact: how much does it do for motivation and for finishing a course? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €16,000 is Mid, above that is High. Risk: what could go wrong, for example a display that misleads or feedback that overloads.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €30,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three feedback and tracking measures.](_figures/d10_a5_0.png)

**The point.** Rate a measure by what it does for motivation and finishing, by its printed cost, and by what could go wrong. Honest transparency and explained feedback beat a flashy display, and a display that does not say what it measures carries the highest risk.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop again. Learners do not know how far along they are, motivation is low, the budget is €30,000, and three ideas are on the table. We rate each on three questions: what it does for motivation and finishing (impact), what it costs (effort), and what could go wrong (risk).
2. **A progress bar.** A progress bar costs €6,000, so the effort is Low. It shows every learner how far along they are, so the impact is High. The risk is Mid, because a bar that counts the wrong thing would mislead; it must show lessons finished.
3. **Explained feedback.** Explained feedback after every task costs €12,000, so the effort is Mid. Learners learn from mistakes and know what to do next, so the impact is High, and the risk is Low because it only adds answers. Both measures answer the case; the bar is cheaper and can come first.
4. **Levels without meaning.** Levels and points for every action cost €20,000, so the effort is High. They reward clicks and say nothing about progress, so the impact is Low, and the risk is High because a level that does not say what it measures misleads. So: transparency and feedback first, decoration last.

| Measure (LearnLoop, Case assumption) | Cost | Effort | Impact | Risk | Reasons |
|---|---|---|---|---|---|
| A progress bar on every course | €6,000 | Low | High | Mid | Effort: €6,000 is under €8,000: Low. Impact: Every learner sees how far along they are, which is the cheapest way to raise motivation and completion. Risk: A wrong or cheating bar would mislead, so it must count something real. |
| Explained feedback after every task | €12,000 | Mid | High | Low | Effort: €12,000 lies between €8,000 and €16,000: Mid. Impact: Learners learn from mistakes and know what to do next, so they carry on. Risk: It adds answers and removes nothing. |
| Levels and points for every action | €20,000 | High | Low | High | Effort: €20,000 is above €16,000: High. Impact: It rewards clicks and says nothing about progress, so it does not help learners know how they are doing. Risk: A level that does not say what it measures misleads and can demotivate. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €8,000 is Low; €8,000 to €16,000 is Mid; above €16,000 is High.
- Rate impact by what a measure does for motivation and for finishing a course: transparency, feedback that counts and a working phone layout first; decoration last.
- Rate risk by what could go wrong: a display that misleads, feedback that overloads, a big change that touches every screen.
- Justify the order with the chain transparency, motivation, usage: say how your first measure leads to the next.
- Say what you do not know, for example where phone learners drop out, and how you would find out.
:::

^src: Gibbons 2018 · Hattie & Timperley 2007

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · UX as a steering and feedback system: transparency, motivation, usage · 18 min · Core

> UX is a steering and feedback system: feedback leads to visible progress, progress to motivation, motivation to use. Responsive design and accessibility let the chain work for everyone.

:::box In plain words
**The idea.** The plan's coaching says that UX is a steering and feedback system: users need orientation and feedback; making progress visible increases motivation; responsive design is not an option but a prerequisite; accessibility means scalability and reach. The chain runs from feedback to visible progress, to motivation, to usage.
**Why it matters.** Task 2 asks you to design the feedback, the tracking, the responsive concept and the accessibility integration as one system, in order of priority.
**How to read the picture.** The chain reads from left to right: feedback, visible progress, motivation, usage. Below it, the parts of a system and the accessibility rules.
:::

![UX as a feedback system: feedback, visible progress, motivation, usage.](_figures/d10_b1_0.png)

*Accessibility measures that make the system work on every device*

| Measure | Who gains | Why it also helps everyone |
|---|---|---|
| Targets of at least 44 px | People with a tremor or limited hand use | Anyone on a moving train |
| Contrast of at least 4.5 : 1 | People with low vision | Anyone in sunlight |
| Text that reflows | People who enlarge text | Everyone on a small screen |
| Status in words | People who cannot tell colours apart | Anyone who prints in black and white |
| A name and value for the bar | People who use a screen reader | Search and automation tools |

:::note Case assumption
The chain follows the plan's coaching and Musterlösung: transparency, motivation, usage. LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Design the parts as one system: feedback that counts and explains, an honest progress display, and a layout that works on the device the learner uses.
- Name a risk of the progress display (misleading, or overwhelming) and say how the design prevents it.
- Build accessibility into the responsive concept, not into a separate version: targets of at least 44 px, contrast of at least 4.5 : 1, reflow without sideways scrolling, status in words, and a name and value for the progress bar for screen readers.
- Argue the order of measures by the chain: transparency first, then feedback, then usage on every device; where most users are on a phone, responsive design can also go first as a prerequisite.
:::

:::note Extra · go deeper (optional reading)
Accessibility is scalability and reach: a design that works with a thumb, in sunlight and without colour works for more learners on more devices, and costs less to build in from the start than to retrofit (Day 7). Where feedback is underestimated: teams often invest in new content and neglect to tell learners that their work counted.
:::

^src: Hattie & Timperley 2007 · Amabile & Kramer 2011 · Wroblewski 2011 · W3C 2023

## B2 · Conflicting goals: information density against clarity, feedback against overload, flexibility against consistency · 22 min · Core

> Information density, feedback and flexibility each pull against clarity, calm and consistency. Show what a learner needs to decide the next step; give feedback where it counts.

:::box In plain words
**The idea.** The plan's conflicts for Day 10 are information density against clarity, feedback against overload, and flexibility against consistency. A screen that shows everything is not clear; feedback after every click is overload; a layout tuned to each device can break consistency. The aim is to show what the learner needs to decide the next step, and to give feedback where it counts.
**Why it matters.** Task 2 asks for a risk analysis and for prioritised measures. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places five LearnLoop progress screens by the information they show (to the right) and the clarity they keep (upwards). The position is a reading of the example, not a score. The top right is the aim.
:::

![A worked example: five LearnLoop progress screens by information shown and clarity kept.](_figures/d10_b2_0.png)

**The point.** Information density and clarity pull against each other, and so do feedback and overload. Show what a learner needs to decide the next step, and keep the rest one level down; feedback after every click is overload.

**A short story in steps.**

1. **Two ways to get it wrong.** Let us look at LearnLoop's progress screen. One idea shows fourteen charts: a learner is lost among them. Another shows only a Continue button: it is clear, but the learner has no idea how they are doing. Too much information destroys clarity, and too little leaves the learner blind.
2. **Enough, and clear.** The third idea shows three numbers: lessons done, time left, next lesson, with a “Details” link for the rest. It gives the learner what they need to decide the next step, and it stays clear because everything else is one click down. That is the aim.
3. **Feedback against overload.** The same balance holds for feedback. A pop-up after every click is feedback in the same way that shouting is conversation: it overloads. So give feedback where it counts (a finished task, a mistake, a milestone) and keep the rest quiet.

| Point | The idea | Why it sits there |
|---|---|---|
| A | A dashboard with fourteen charts | It shows everything, so a learner cannot find the one number they need. Information density has beaten clarity. |
| B | Only a Continue button | It is perfectly clear, but it shows no progress and no result. The learner does not know how they are doing. |
| C | Three numbers and a “Details” link | Lessons done, time left and the next lesson, with the rest one click away. It shows what a learner needs and stays clear. This is the aim. |
| D | A pop-up after every click | It is feedback, but so much of it that it interrupts the lesson. Feedback against overload: here overload wins. |
| E | Small icons with no labels for status | It has some information, but a learner has to guess what each icon means. It is neither rich nor clear. |

*Three conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| Information density against clarity | Everything the learner might want | A screen that can be read at a glance | Show what decides the next step; the rest one level down. |
| Feedback against overload | An answer to every action | An uninterrupted lesson | Feedback where it counts (a finished task, a mistake, a milestone); quiet elsewhere. |
| Flexibility against consistency | A layout tuned to each device | The same patterns on every device | Adapt the layout, keep the components and the meaning. |

:::note Case assumption
LearnLoop and its five progress screens are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both poles of each conflict: too much (a dashboard of fourteen charts, a pop-up after every click) and too little (only a Continue button, silence). A plan that names one pole has not weighed the conflict.
- Show the few things a learner needs to decide the next step (lessons done, time left, the next lesson) and put the rest one click down.
- Cap feedback per task: one message that counts, and the detail behind a “Why?” link.
- Keep the same components across devices so that a learner who switches device is not lost; adapt the layout, not the meaning.
:::

:::note Extra · go deeper (optional reading)
Mobile UX as a standard: the plan's discussion line. Treating the phone as the main case, not an afterthought, is what “mobile first” means (Wroblewski 2011): the team has to decide what matters most before it adds anything for larger screens.
:::

^src: Nielsen 1994 · Wroblewski 2011 · Shneiderman et al. 2016

## B3 · Deciding without retention data by device: a system you can check later · 20 min · Core

> When you cannot yet measure retention by device, choose changes that can be reversed, write a figure you can watch into the plan, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. For a feedback and tracking decision the usual unknown is whether the change raises retention, and whether it does so on phones, where most learners are.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision without retention data by device, filled in for LearnLoop.](_figures/d10_b3_0.png)

*Five ways to make a decision without retention data by device safer*

| Way | What it looks like |
|---|---|
| Split the data by device | Start recording the return rate and completion separately for phone, tablet and desktop. |
| Test on real phones | Watch five to eight learners use progress and feedback on their own phones. |
| Start small and reversible | An honest progress display and one message per task first, behind a switch. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “the seven-day return rate of phone learners has not risen from 20% to 26% by the end of month 3”.
- Start with the cheapest measures that answer a printed fact (an honest progress display, one explained message per task) and test on real phones before the large redesign.
- Name who decides on a change and what evidence they need: the return rate by device, completion, a test.
- Giving up nothing means you have not decided: name what you postpone, for example the levels and points or a separate app.
:::

:::note Extra · go deeper (optional reading)
Premortem: Klein's premortem asks the team to imagine that the plan failed. Typical answers here: the feedback overloaded learners, the progress display misled them, and the phone layout removed what desktop users needed. Each answer becomes a check.

One-way and two-way doors: Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. A progress display behind a switch is a two-way door; building a separate native app is a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · Nielsen 2000 · Gibbons 2018

