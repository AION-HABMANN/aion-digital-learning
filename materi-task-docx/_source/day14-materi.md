---
doc: materi
day: 14
kicker: DAY 14 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Plain language, usability, testing
subtitle: Plain language and clear communication, intuitive learning environments, testing and optimisation of inclusive design solutions
daytitle: Day 14 · Module 6 (day 2 of 2): Plain language and clear communication, intuitive learning environments, testing and optimisation of inclusive design solutions
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is ClearLearn, a complex platform with low usage(see the Task document).
intro: This document holds everything you need to study Day 14 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: jargon,comprehension,error-prevention,complexity,five-second-test,usability,rule-based,plain-language,dropout,usability-test,consistency,inclusive-design,navigation,iterative,information-architecture,card-sort,conflicting-goals,heuristic,premortem,think-aloud,trunk-test,progressive-disclosure,breadcrumb,barrier
refs: iso24495,ecClear2011,nielsen1994,krug2014,shneiderman2016,nielsen2000,gibbons2018,klein2007,bezos2016
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Plain language: short sentences, clear terms, no jargon · 14 min · Core

> Plain language: short sentences, clear everyday terms, no jargon. Language is access, and access is use.

:::box In plain words
**The idea.** Plain language means writing so that the people who use a platform understand it at first reading. Use short sentences, clear everyday terms and no jargon. The idea in the plan is: language is access, and access is use. A learner who cannot understand the text cannot use the platform.
**Why it matters.** In Task 1 you sort facts by the kind of hurdle, and you write a plainer version of a text. The first of these is the language.
**How to read the picture.** The same LearnLoop welcome text three ways: one long sentence with technical terms, short sentences that keep the terms, and a plain version.
:::

![The same LearnLoop welcome text three ways.](_figures/d14_a1_0.png)

**The point.** Plain language means short sentences, clear everyday terms and no jargon, so that people understand a text at first reading. Short sentences alone are not enough: if the terms stay hard, the text stays hard. Language is access, and access is use.

**A short story in steps.**

1. **A wall of words.** Let us follow Kim, a new learner at LearnLoop, who opens the welcome text. It is one sentence of 52 words with terms she has never heard. She reads it twice, still does not know what to do, and starts to doubt that the platform is for her.
2. **Short is not enough.** Now the team cuts the sentence into three short ones. It reads faster, but the technical terms are still there, and Kim still cannot say what “asynchronous modality” is. So a short sentence with hard words is only half the cure.
3. **Plain at first reading.** The plain version says: learn when it suits you, in short lessons, and pick a course to start. Short sentences, everyday words, one thing to do. Kim understands it at once.

| State shown in the picture | What it means |
|---|---|
| One long sentence | one sentence of 52 words with technical terms. Kim reads it twice and still does not know what to do, so she may close the page. |
| Short, but hard words | the sentences are short, and it is already easier to read. But Kim still does not know what “asynchronous modality” means, so she is still stuck. |
| Plain | short sentences, everyday words and one thing to do. Kim understands at first reading and presses “My first lesson”. |

*Three principles of plain language*

| Principle | Instead of … | Write … |
|---|---|---|
| Short sentences | One sentence of 52 words | Three sentences of about 15 words |
| Clear terms | “asynchronous modality” | “learn when it suits you” |
| No jargon in messages | “Error 4012: invalid payload” | “Please add a file, then press Send.” |

:::note Case assumption
LearnLoop and Kim are made up for this example. The principles follow the international plain-language standard (ISO 24495-1) and the European Commission's guide to writing clearly.
:::

:::rules How to decide when this comes up in the task
- Sort a fact as a language hurdle when the words alone make it hard: a very long sentence, a technical term with no explanation, a cryptic error message.
- Write short sentences (one idea each), everyday words, and the most important thing first.
- Replace jargon with an everyday word, or explain the term where it first appears; short sentences alone do not make a text plain.
- A good error message says what went wrong and what to do next, in words a learner uses.
- Name the users who are hurt most: new learners, people who read in a second language, people with dyslexia or low attention.
:::

:::note Extra · go deeper (optional reading)
Plain language is not the same as simple language (Leichte Sprache), which is a stricter German set of rules for people with learning difficulties. Plain language keeps the content and writes it so that the intended readers can find, understand and use it.
:::

^src: ISO 24495-1 · European Commission 2011 · Nielsen 1994

## A2 · Intuitive learning environments: structure, navigation and three usability principles · 14 min · Core

> An intuitive environment needs no explanation: a clear structure and navigation, less complexity, and three usability principles: efficiency, error prevention and consistency.

:::box In plain words
**The idea.** An intuitive learning environment is one that people can use without an explanation. It has a clear structure and navigation, and it reduces complexity. Three usability principles help: efficiency (common tasks take few steps), error prevention (the system stops a mistake before it happens) and consistency (the same thing always has the same name and place).
**Why it matters.** In Block 1.1 and Block 2.2 you separate structure hurdles from usability hurdles, and you choose measures for each.
**How to read the picture.** One LearnLoop learning page with four features that can be on or off: a short menu, a quick common action, error prevention and consistent names.
:::

![One LearnLoop learning page and four usability fixes.](_figures/d14_a2_0.png)

**The point.** An intuitive environment can be used without an explanation. Clear structure, three usability principles (efficiency, error prevention, consistency) and less complexity get you there. Each fix is small, and together they remove most of the friction.

**A short story in steps.**

1. **A confusing page.** Let us follow Raj, a learner at LearnLoop, on a page with eight unlabelled boxes at the top, a “More” menu that hides the common action, two names for one action, and a cryptic error. None of it is wrong in itself, but together it is hard work.
2. **Four fixes.** Now all four fixes are on. Three clear entries replace the eight boxes, marking done is one click, the page stops a missing file before Send, and the action has one name. Raj does not need an explanation, which is what intuitive means.
3. **One at a time.** A team can do these one by one. Block 2.2 asks you to choose measures like these.

| Switches | What it means |
|---|---|
| All off | 0 of the 4 fixes are on. Eight unlabelled boxes make Raj search. Marking done hides behind “More”. A cryptic error appears after the mistake. One action has two names. |
| All on (Short clear menu, Quick common action, Error prevention, Consistent names) | 4 of the 4 fixes are on. Three clear menu entries show where to go. Marking a lesson done is one click. The page stops the mistake before it happens. One action has one name. |

*Three usability principles, a typical failure and a fix*

| Principle | A typical failure | A fix |
|---|---|---|
| Efficiency | Five clicks to mark a lesson done | One button on the lesson page |
| Error prevention | Send works with no file; the error comes later | Send stays off until a file is added |
| Consistency | “Save”, “Submit” and “Apply” for one action | One word, everywhere |

:::note Case assumption
LearnLoop and Raj are made up for this example. The three principles are among the usability heuristics of Nielsen (1994).
:::

:::rules How to decide when this comes up in the task
- Sort a fact as a structure hurdle when the learner does not know where to go: a menu with too many entries, vague labels, the same thing in several places.
- Sort a fact as a usability hurdle when it breaks efficiency (too many steps for a common task), error prevention (a mistake the system could have stopped) or consistency (one action under different names).
- Give each thing one place and one name, keep a menu to about six entries, and show learners where they are.
- Reduce complexity by showing only what is needed now and putting the rest one click down.
- Do not answer a confusing platform with a manual or a help centre: intuitive means understandable without explanation.
:::

:::note Extra · go deeper (optional reading)
Krug's “trunk test” asks whether a visitor dropped on any page can say where they are, which sections exist and how to search. A platform that fails it is not intuitive, however good its content.
:::

^src: Nielsen 1994 · Krug 2014 · Shneiderman et al. 2016

## A3 · Testing with different user groups: observe, ask, find the hurdles · 12 min · Core

> Test with different user groups: watch real learners do real tasks, listen, and note where they stop. A usability test and a comprehension check show whether people understand, not whether they like it.

:::box In plain words
**The idea.** To know whether a platform is understood, you test it with different groups of users. A usability test means watching people do real tasks, listening to what they say, and noting where they stop. This finds comprehension barriers that the team, who know the platform too well, cannot see.
**Why it matters.** Block 2.2 asks you to define two test methods, and Task 2 asks for a testing concept. This card names the methods.
**How to read the picture.** Three ways of testing the same LearnLoop page: asking a manager, watching one learner, and watching several different learners.
:::

![Three ways of testing the same LearnLoop page.](_figures/d14_a3_0.png)

**The point.** To know whether a platform is understood, watch real learners do real tasks. A manager's opinion shows how the page looks to someone who knows it. One learner shows one hurdle, and a mix of different learners shows the most.

**A short story in steps.**

1. **Asking the wrong person.** Let us look at how LearnLoop checked its new page. The head of product, who built it, was asked whether it looks clear, and said yes. Of course: they know where everything is. The answer says nothing about a newcomer.
2. **Watching a learner.** Then the team watches Ava, a learner, try to find her course. She hesitates at the menu and stops. That is a usability test: a real task, a real learner, and a hurdle the team could not see. One learner already found something useful.
3. **A mixed group.** Finally the team invites four different learners, among them one with low vision and one who reads in a second language. Each stops somewhere else, so the mix shows far more than any single learner.

| State shown in the picture | What it means |
|---|---|
| Ask a manager | the manager says the page looks clear, because the manager knows it. This tells you nothing about where a new learner would stop. |
| Watch one learner | you watch Ava do a task and see her stop at the menu. You found a real hurdle that nobody on the team had noticed. |
| Watch several different learners | four different learners stop in four places: the menu, the jargon, the form and the small text. A mixed group shows the hurdles one learner alone would miss. |

*Three test methods and what each shows*

| Method | How it works | What it shows |
|---|---|---|
| Usability test | Five to eight learners do set tasks while someone watches and notes where they stop. | Where real users get stuck. |
| Five-second test | A screen is shown for five seconds, then people say what it was about. | Whether a screen is understood at a glance. |
| Comprehension check | Readers explain a text back in their own words. | Whether the text is understood. |

:::note Case assumption
LearnLoop and Ava are made up for this example. The rule of thumb of five users for a usability test is Nielsen's; it applies to finding the main hurdles, not to measuring.
:::

:::rules How to decide when this comes up in the task
- Choose a test method that watches behaviour: a usability test (five to eight learners do set tasks while someone watches), a five-second test (what was the screen about?), a comprehension check (explain the text back).
- Test with different user groups: new learners, people who read in a second language, people with impairments. Different people stop in different places.
- Do not rely on opinion: asking managers or asking “do you like it?” does not show whether people understand.
- Do not rely on page views alone: they show use, not understanding.
- Note each comprehension barrier with where it happened, then fix the most common one first.
:::

:::note Extra · go deeper (optional reading)
Think-aloud testing asks the learner to say what they are thinking while they work. It is a way of watching that shows the reasons behind a stop, not only the stop.
:::

^src: Nielsen 2000 · Krug 2014 · Gibbons 2018

## A4 · Optimising inclusive UX: iterate, use data, keep evaluating · 10 min · Optional

> Optimising inclusive UX is a loop: change, test, measure, adjust, and repeat. Iterative improvement and continuous evaluation mean that it never stops.

:::box In plain words
**The idea.** Optimising inclusive UX is not a one-off task. It is a loop: change something, test it, measure the effect with data, adjust, and repeat. Iterative improvement means small steps with checks in between, and continuous evaluation means the loop never stops.
**Why it matters.** Block 3.1 asks for a testing and optimisation concept. The core of the loop is repeated in A3 and B1, so no Core block needs this card.
**How to read the picture.** A loop of four steps: change, test, measure, adjust.
:::

![.](_figures/d14_a4_0.png)

:::note Case assumption
LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Improve in small steps with a check after each one.
- Use data to adjust: drop-out, support questions and test results show what to fix next.
- Keep evaluating: a platform changes, and new text and screens bring new hurdles.
:::

:::note Extra · go deeper (optional reading)
Data tells you that something is wrong, and a test tells you why. Use both: a rise in first-week drop-out on one screen says where to look, and watching learners on that screen says what to change.
:::

^src: Nielsen 2000 · Gibbons 2018

## A5 · Weighing a simplification measure: impact, effort, risk · 10 min · Core

> Rate a measure by how much it helps learners understand and keep going, what it costs and what could go wrong. Simplify first, add functions later.

:::box In plain words
**The idea.** To choose between simplification measures, rate each on the same three questions. Impact: how much does it help learners understand and keep going? Effort: money and time, decided here by a rule: under €7,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong, for example that it adds complexity or does not reach the cause.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €36,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three simplification measures.](_figures/d14_a5_0.png)

**The point.** Rate a measure by how much it helps learners understand and keep going, by its printed cost, and by what could go wrong. A cheap fix that makes messages understandable beats a new function that makes the platform more complex.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop once more. Learners leave early, the budget is €36,000, and three ideas are on the table. We rate each on three questions: how much it helps learners understand and keep going (impact), what it costs (effort), and what could go wrong (risk).
2. **Plain messages.** Plain messages cost €6,000, so the effort is Low. Learners know what to do next, so the impact is High, and the risk is Low because only words change. The menu costs €13,000, Mid effort, with High impact and Mid risk.
3. **A new function.** The chat costs €28,000, so the effort is High. It adds one more thing to a platform people already find hard, so the impact is Low, and the risk is High because more complexity can raise drop-out. So: simplify first, add later.

| Measure (LearnLoop, Case assumption) | Cost | Effort | Impact | Risk | Reasons |
|---|---|---|---|---|---|
| Plain messages in place of error codes | €6,000 | Low | High | Low | Effort: €6,000 is under €7,000: Low. Impact: Learners know what went wrong and what to do, so they carry on instead of leaving. Risk: It only changes words. |
| One menu of six entries | €13,000 | Mid | High | Mid | Effort: €13,000 lies between €7,000 and €15,000: Mid. Impact: Learners find their course at once, which removes a hurdle every learner meets. Risk: Regular users may be disturbed by the new menu at first. |
| A new chat function | €28,000 | High | Low | High | Effort: €28,000 is above €15,000: High. Impact: It adds one more thing to learn on a platform people already find hard. Risk: More complexity can raise drop-out instead of lowering it. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €7,000 is Low; €7,000 to €15,000 is Mid; above €15,000 is High.
- Rate impact by how much it helps learners understand and keep going: a measure that goes to the cause (words, structure) outweighs one that adds something new.
- Rate risk by what could go wrong: added complexity, removing information some learners need, a new menu that disturbs regular users at first.
- Justify the order with comprehensibility, then usage, then success: say how your first measure helps learners understand.
- Say what you do not know, for example on which screen most learners stop, and how you would find out.
:::

^src: Gibbons 2018 · Nielsen 1994

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · Comprehensibility as a strategic quality: find the hurdle, simplify, test, adjust · 18 min · Core

> Complexity is UX's greatest enemy. A comprehensibility strategy finds the hurdle, simplifies it, tests with real users and adjusts, because comprehensibility leads to usage and usage to success.

:::box In plain words
**The idea.** The plan's coaching says that complexity is UX's greatest enemy, simple systems are more successful, and usability determines usage. A strategy for comprehensibility is a loop: find the hurdle where learners stop, simplify it, test whether it worked with real users, and adjust. The aim is comprehensibility, then usage, then success.
**Why it matters.** Task 2 asks for a strategy to simplify, an optimised information architecture and a testing concept. This chain gives you the order.
**How to read the picture.** The chain reads from left to right: find the hurdle, simplify, test with users, adjust. Below it, the test for each link.
:::

![A comprehensibility strategy: find the hurdle, simplify, test, adjust.](_figures/d14_b1_0.png)

*The test for each link of the chain*

| Link | The test | What goes wrong without it |
|---|---|---|
| Find the hurdle | Can you say where learners stop, from watching or data? | You fix what you can see, not what hurts. |
| Simplify | Is each thing in one place with one name, in plain words? | Complexity stays, or necessary content goes. |
| Test with users | Did different learners understand, not just like it? | You are guessing. |
| Adjust and repeat | Is there a date for the next check? | The platform drifts back to complexity. |

:::note Case assumption
The chain follows the plan's coaching: complexity is UX's greatest enemy, simple systems are more successful, usability determines usage. LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Choose a strategy that goes in steps: plain language and a clear structure first, then test and adjust; reject “everything at once” (it may remove what some learners need) and “add a help centre” (it explains the complexity instead of reducing it).
- Optimise the information architecture: one menu of about six entries, each course in one place, a path above every page, a “continue where you stopped” card, one label for one action.
- Test before, during and after a change: a card sort before, a test of the draft during, and drop-out and support questions after.
- Keep the complexity the subject needs: separate it from the complexity of the interface, which should go.
- Use data and tests together: data tells you where, a test tells you why.
:::

:::note Extra · go deeper (optional reading)
A card sort asks people to group labelled cards, which shows how learners expect things to be organised. It is a cheap way to design a menu before it is built.
:::

^src: ISO 24495-1 · Nielsen 2000 · Krug 2014 · Nielsen 1994

## B2 · Conflicting goals: simplicity against information, standard against flexibility · 22 min · Core

> Simplicity competes with information content, and a standard with flexibility. Keep the complexity the subject needs and remove the complexity the interface adds.

:::box In plain words
**The idea.** The plan's conflicts for Day 14 are simplicity against information content, and standardisation against flexibility. Too much simplification removes what some learners need, and too little leaves them lost. The aim is to separate the complexity of the subject, which may be needed, from the complexity of the interface, which should go.
**Why it matters.** Task 2 asks for a risk analysis of too much against too little simplification. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places six LearnLoop screens by the information they keep (to the right) and how well a learner understands them at first reading (upwards). The position is a reading of the example, not a score. The top right is the aim.
:::

![A worked example: six LearnLoop screens by information kept and understanding at first reading.](_figures/d14_b2_0.png)

**The point.** Simplicity and information content pull against each other. Too much simplification removes what some learners need, and too little leaves them lost. Keep the complexity the subject needs and remove the complexity the interface adds.

**A short story in steps.**

1. **Two ways to get it wrong.** Let us look at LearnLoop's options. One page holds everything in expert terms: all the information, and no learner can use it. Another page holds one slogan: perfectly clear, and nobody learns anything. Both fail, from opposite sides.
2. **Clear and rich.** Short steps with a “More detail” link do both jobs. The main points are plain, so a newcomer follows them, and the detail is one click down for an expert. That separates the complexity of the interface, which goes, from the complexity of the subject, which stays.
3. **Too much simplification.** Deleting half of the lessons looks like a quick way to simplify, and it costs advanced learners what they came for. So the risk runs both ways: too little simplification and too much.

| Point | The idea | Why it sits there |
|---|---|---|
| A | Everything on one page, in expert terms | All the information is there, but a learner cannot find or understand any of it. Dense and unclear. |
| B | A bare page with one slogan | Perfectly clear and almost empty: nobody learns anything from it. Simple, but too little information. |
| C | Short steps, with a “More detail” link | The main points come first in plain words, and the detail sits one click down. A learner can follow it and an expert can dig in. This is the aim. |
| D | A 40-page manual | It holds the information, but nobody reads it before using the platform. Information kept, little understood. |
| E | Plain text with a small explanation for each term | The terms stay, because the subject needs them, and each is explained where it appears. Good: it keeps the content and helps the newcomer. |
| F | Half of the lessons deleted | The platform is simpler, but advanced learners lost what they needed. Over-simplification: clarity bought with information. |

*Two conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| Simplicity against information content | A very simple screen | All the detail a subject needs | Plain main points first, detail one click down. |
| Standardisation against flexibility | The same pattern everywhere | Choices for different learners | Standardise names and places; allow choice of presentation. |

:::note Case assumption
LearnLoop and its six screens are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both poles of each conflict: too much simplification (content deleted, experts leave) and too little (learners still lost). A plan that names one pole has not weighed the conflict.
- Separate the complexity of the subject (keep it) from the complexity of the interface (remove it): a demanding course can sit behind a clear menu.
- Use layers: the main points in plain words first, the detail one click down.
- Keep a standard (one name for one action, one place for one thing) and allow flexibility where learners differ, such as a choice of text size.
:::

:::note Extra · go deeper (optional reading)
Progressive disclosure shows only what is needed now and reveals the rest on request. It is the standard way to keep an interface simple without throwing information away.
:::

^src: Nielsen 1994 · Krug 2014 · Klein 2007

## B3 · Deciding without knowing where learners stop: a decision you can check later · 20 min · Core

> When you do not know where learners stop, fix the most likely hurdle first, test with a few learners, write a figure you can watch into the plan, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide although you do not know exactly where learners stop. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A first test with a few learners is the cheapest way to find out what you do not know.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision without knowing where learners stop, filled in for LearnLoop.](_figures/d14_b3_0.png)

*Five ways to make a decision without knowing where learners stop safer*

| Way | What it looks like |
|---|---|
| Test with a few learners | Five to eight, mixed, do set tasks while someone watches. |
| Start with the likely and cheap | Plain words on the first screens, before a rebuild. |
| Set a figure and a date | The drop-out you expect, and the month you will look. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “first-week drop-out has not fallen from 40% to below 35% by the end of month 3”.
- Start where the hurdle is most likely and cheapest to fix (the words on the first screens), and test with a few learners to find out whether you were right.
- Guard against both risks: test with experts as well as newcomers, so that you do not simplify away what some need.
- Giving up nothing means you have not decided: name what you postpone, for example new functions or a cut in content.
:::

:::note Extra · go deeper (optional reading)
Premortem: imagine the strategy failed. Typical answers here: we removed content that experts needed, learners still did not understand, and we tested opinion and not understanding. Each answer becomes a check.

One-way and two-way doors: a rewritten text can be rewritten back, a two-way door; deleting half of the content is a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · Nielsen 2000

