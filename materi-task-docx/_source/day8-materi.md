---
doc: materi
day: 8
kicker: DAY 8 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: UX/UI basics: structure, visual hierarchy and interaction
subtitle: Design the structure first, then the surface, and guide the learner's attention and action
daytitle: Day 8 · Module 4 (day 1 of 3): Fundamentals of UX/UI design for digital learning environments
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: Not yet published (the link will be added once Day 8 is deployed)
case: Worked examples use LearnLoop, an online-course provider. The task case is StructLearn, a cluttered learning platform (see the Task document).
intro: This document holds everything you need to study Day 8 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: ia,navigation,card-sort,hierarchy,gestalt,cta,affordance,hick,fitts,consistency,progressive-disclosure,style-guide,orientation,cognitive-load,chunking,visual-hierarchy,feedback,usability,user-centred,learning-path,progress-indicator,dropout,completion,engagement,user-impact,roadmap,decision-architecture,conflicting-goals,usability-test,qualitative,symptom,stakeholder
refs: rosenfeld2015,spencer2009,krug2014,wertheimer1923,hick1952,fitts1954,nielsen1994,nielsen1993rt,nielsen2006pd,nielsen2006,norman2013,shneiderman2016,bringhurst2012,sweller1998,mayer2009,wcag22,nielsen2000,gibbons2018,klein2007,bezos2016
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of UX/UI design: structure, visual hierarchy and interaction. Level 2 asks you to analyse learning interfaces and make basic design decisions. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Structure: information architecture, hierarchy and orientation · 14 min · Core

> Structure comes first. Organise the content so that the learner can answer three questions on any page: where am I, where can I go, what comes next?

:::box In plain words
**The idea.** The structure of a learning interface has three parts. Information architecture is how the content is organised and named. Hierarchy and navigation logic say what is a main section and what is a detail, and how you move between them. Orientation in the learning process means the learner always knows where they are and what comes next.
**Why it matters.** In Task 1 you sort facts about a platform into unclear navigation, visual overload and inconsistent design. The first of these is a structure problem, and the plan's coaching says that structure beats visual design.
**How to read the picture.** The first picture is a simple information architecture: a root, four sections named after what the learner does, and three items under each. The second shows the three orientation questions.
:::

![A simple information architecture: four sections named after what the learner does (LearnLoop example, Case assumption).](_figures/d8_a1_ia-tree.png)

![Orientation in the learning process, after Krug's trunk test.](_figures/d8_a1_orientation.png)

Let us look at how this works in a lesson. Tom opens a lesson on his phone. The title says "Negotiation basics", the menu highlights "Learn", and a line above the text reads "Learn › Negotiation basics › Lesson 3 of 8". At the bottom a button says "Next: lesson 4". Tom answers all three questions without thinking: he is in lesson 3, he can go to Find or Progress, and what comes next is lesson 4. If the menu highlighted "Home" while he was in a course, or the next step was missing, he would have to build the map himself.

- **Four parts of an information architecture** (Rosenfeld, Morville and Arango 2015): an organisation system (how content is grouped), a labelling system (what each group is called), a navigation system (how you move) and a search system (how you look for something).
- **Check a structure before you build it.** In a card sort, people group labelled cards into the categories that make sense to them; in a tree test, they try to find items in a text-only version of the menu (Spencer 2009). Both are cheap and use few participants.
- **Krug's trunk test** (2014): if you drop a visitor on any page, can they tell what site it is, what page they are on, what the major sections are, what their options are and where they are in the scheme of things?
- **Choice.** The more options at a decision point, the longer it takes to choose (Hick's law, Hick 1952). Keep the number of main sections small.

:::rules How to decide when this comes up in the task
- Check navigation by three questions: where am I (title, highlighted entry and path agree), where can I go (a few clear sections), what comes next (a Next link or Continue button).
- One item has one home. If the same content is reachable from three places under different names, the structure is unclear.
- Name sections after what the learner does (Learn, Find, Progress), not after the system's modules.
- Check a structure with people before you build it: card sort for the groups, tree test for the findability.
:::

:::note Extra · go deeper (optional reading)
**Hierarchy of content.** A common shape is three levels: sections (a few), groups within sections (several), items (many). If a platform needs more than three levels to reach a lesson, ask whether the structure or the content is too big.
**Search is not a cure.** A search box helps learners who know the name of what they want; it does not help learners who do not know what exists. Structure and search work together.
:::

^src: Rosenfeld et al. 2015 · Spencer 2009 · Krug 2014 · Hick 1952

## A2 · Visual design: hierarchy, legibility, consistency and reduction · 14 min · Core

> Use size, colour, contrast and position to show what matters first. Keep it legible, consistent, and reduced to the essentials.

:::box In plain words
**The idea.** Visual design (UI) controls attention. A visual hierarchy uses size, colour, contrast and position so that the most important thing is seen first. Legibility and clarity mean the text can be read comfortably. Consistency means the same thing looks the same everywhere. Reduction to the essentials means leaving out what does not help the learner's goal on this screen.
**Why it matters.** In Task 1 you decide between simplifying the design and restructuring the navigation. You need to know what a visual change can and cannot do.
**How to read the picture.** The left screen shows everything competing: seven colours, five equal buttons, banners. The right screen shows the same page with one main thing (the Continue button), quieter secondary actions and a progress bar.
:::

![The same course page before and after a visual hierarchy: on the left everything competes, on the right one main thing comes first.](_figures/d8_a2_visual-hierarchy.png)

- **Size, colour, contrast, position.** The eye goes first to what is largest, most contrasting and in a prominent place. A single filled button among quiet links tells the learner where to go.
- **Grouping without boxes.** The Gestalt principles (Wertheimer 1923) describe how people group what they see: things that are close together (proximity) or alike (similarity) are read as belonging together.
- **Legibility.** WCAG sets a contrast of at least 4.5 : 1 for normal text at Level AA (Day 7). For running text a line of about 45 to 75 characters is comfortable (Bringhurst 2012). Do not rely on colour alone.
- **Consistency.** It is one of Nielsen's usability heuristics, "consistency and standards": the same words and the same actions mean the same thing, and the platform follows the conventions that learners know.
- **Reduction.** On text-heavy pages many people scan in an F-shaped pattern, reading the top and the left edge more than the rest (Nielsen 2006). Put the key point where the eye goes, and cut what does not help the goal.

:::rules How to decide when this comes up in the task
- Name the one main thing on a screen. If five items have the same size, colour and weight, there is no hierarchy.
- Give the main action the strongest visual weight; make secondary actions quieter.
- Use the same style for the same function across the platform (buttons, links, dates, back).
- Reduce: remove what does not help the learner's goal on the screen before you add anything.
- A visual fix does not repair a structural problem. If learners cannot find their course, a new colour scheme will not help.
:::

:::note Extra · go deeper (optional reading)
**Visual design supports learning.** Mayer's principles (coherence, signalling, spatial contiguity) say that learners learn better when extra material is removed, when what matters is marked, and when labels sit next to what they describe (Mayer 2009). They are the visual-design side of Day 3's cognitive load.
**Style guide.** A written set of components and rules (a design system) is how consistency survives a team of several people. Without it, each screen gets its own version of a button.
:::

^src: Wertheimer 1923 · Nielsen 1994 · Nielsen 2006 · Bringhurst 2012 · Mayer 2009

## A3 · Interaction and user guidance: operability, calls to action, feedback · 12 min · Core

> The learner should be able to see what to do, do it easily, and see that it worked.

:::box In plain words
**The idea.** Interaction design has three jobs. Intuitive operability: things look like what they do, so the learner does not have to learn the interface. Clear calls to action: one main button says what to do next. Feedback on actions: when the learner acts, the platform answers at once.
**Why it matters.** In Task 1 you judge screens with several buttons without priority, and you choose measures for action guidance.
**How to read the picture.** The three boxes show the response-time limits for feedback: about a tenth of a second feels instant, about a second keeps the train of thought, ten seconds is the limit of attention.
:::

![Three response-time limits for feedback on an action (Nielsen).](_figures/d8_a3_response-times.png)

- **Signifiers.** Norman (2013) distinguishes what an object allows (an affordance) from the sign that shows it (a signifier). A button that looks like a button, with a clear label, signals what can be done.
- **One main call to action per screen.** Say it with a verb and an object: "Continue: lesson 3", "Start the quiz". Make it the strongest element (card A2).
- **Fitts's law** (Fitts 1954): the time to reach a target depends on its distance and size. Make the main targets large and place them where the learner's attention already is, which matters especially on a phone.
- **Feedback.** Shneiderman and colleagues (2016) include informative feedback and closure among their golden rules: every action gets a response, and a task has a clear end. Nielsen's response-time limits tell you how fast it must come.

:::rules How to decide when this comes up in the task
- Find the main call to action on a screen. If there are several of equal weight, the learner has no priority to follow.
- A button label says what happens ("Start lesson"), not what the system does ("Submit form").
- Every action gets a visible response within about a second; if it takes longer, show that something is happening.
- Make the main targets large and close to where attention is.
:::

:::note Extra · go deeper (optional reading)
**Progressive disclosure.** Show only what is needed now and put advanced options behind a link such as "More" (Nielsen 2006, progressive disclosure). It keeps the first view calm and supports beginners without removing power for others.
**Feedback is also teaching.** In a learning platform feedback is more than a click response: a result and a next step after a task (Day 4) are interaction feedback at the level of learning.
:::

^src: Norman 2013 · Shneiderman et al. 2016 · Fitts 1954 · Nielsen 1993 (response times) · Nielsen 2006 (progressive disclosure)

## A4 · Typical UX/UI mistakes and the link to learning psychology · 10 min · Optional

> Unclear navigation, visual overload and inconsistent design each waste attention, which is the learner's scarcest resource.

:::box In plain words
**The idea.** The plan lists three typical mistakes: unclear navigation, visual overload and inconsistent design. It also asks you to link design to learning psychology: structure reduces cognitive load, and visual support helps learning (Day 3). Each mistake takes attention that learning needs.
**Why it matters.** The three mistakes are the three areas Block 1.1 sorts facts into. This card gives you the reason for each.
**How to read the picture.** Each row reads from left to right: the mistake, what it costs the learner, and a structural remedy.
:::

![Three typical UX/UI mistakes, what each costs the learner, and a remedy.](_figures/d8_a4_mistakes.png)

| Mistake | How to recognise it | What the learner experiences |
|---|---|---|
| **Unclear navigation** | The learner cannot say where they are or where something is; one item sits in several places; no Next step | "Where did I put it?" Effort goes into finding |
| **Visual overload** | Many colours, sizes and elements; several buttons of equal weight; banners | "What should I do?" The key point is lost |
| **Inconsistent design** | The same function looks or works differently on different screens | "Does this work like the last one?" Each screen is learned again |

:::rules How to decide when this comes up in the task
- Sort a fact by what the learner cannot do: find or place themselves (navigation), pick the main thing (overload), rely on what they have learned (inconsistency).
- Several buttons of equal weight with no priority is a hierarchy problem (overload), not an inconsistency.
- The same function with different looks on different screens is inconsistency, even if each screen looks fine alone.
- Explain the cost in terms of attention and working memory (Day 3), not taste.
:::

:::note Extra · go deeper (optional reading)
**Structure lowers load.** Chunking a menu into four sections and showing a path turns many items to hold into a few (Sweller, van Merriënboer and Paas 1998). This is why the plan places structure before visual polish.
**Beginners and experts.** A reduced interface helps beginners; experts may want shortcuts. Progressive disclosure serves both (card A3).
:::

^src: Sweller et al. 1998 · Nielsen 1994 · Mayer 2009

## A5 · Weighing a design measure: user impact, effort, risk · 10 min · Core

> Rate each measure by how much it helps orientation, what it costs and what could go wrong. Structure usually beats surface.

:::box In plain words
**The idea.** To choose between design measures, rate each on the same three questions. User impact: how much does it help the learner find, choose and carry on? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong, for example adding more clutter.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** The bars show the cost of three LearnLoop measures. The coloured bands are the effort rule. The dashed line is the budget.
:::

![LearnLoop weighs three measures. Cost against the effort rule and the budget (Case assumption).](_figures/d8_a5_options-cost.png)

:::note A short story: LearnLoop has €30,000 and three weeks
**Step 1.** Let us look at LearnLoop again. Learners get lost on a busy platform, drop-out is high, the budget is €30,000 and the team has three weeks.
**Step 2 · Fewer colours and banners.** It costs €6,000, so the effort is Low. It calms the page and helps the learner see the main button, so the user impact is Mid; it does not fix a menu in which the same course sits in three places. The risk is Low.
**Step 3 · Rebuild the navigation.** It costs €18,000, so the effort is High, and it needs most of the three weeks. It helps the learner find and carry on, so the user impact is High, and the risk is Mid because of the tight schedule.
**Step 4 · Animated illustrations.** It costs €10,000, so the effort is Mid. They add visual elements without helping the learner find or choose, so the user impact is Low, and the risk is High: more things compete for attention.
:::

| LearnLoop measure | User impact | Effort | Risk |
|---|---|---|---|
| **Fewer colours and banners** · €6,000 | **Mid.** The main button becomes visible; the structure stays as it is. | **Low.** €6,000 is under €8,000. | **Low.** It removes things. |
| **Rebuild the navigation** · €18,000 | **High.** Learners find their course and see what comes next. | **High.** €18,000 is above €15,000. | **Mid.** It needs most of the three weeks. |
| **Animated illustrations** · €10,000 | **Low.** They help nobody find or choose. | **Mid.** €10,000 lies between €8,000 and €15,000. | **High.** More elements compete for attention. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €8,000 is Low; €8,000 to €15,000 is Mid; above €15,000 is High.
- Rate user impact by what it does for orientation and action: structure and guidance first, surface second.
- Rate risk by what could be added or lost: a measure that adds elements to a cluttered screen carries the risk of more clutter.
- Justify the order in a sentence that begins from the learner's problem: structure leads to orientation, and orientation leads to use.
- Say what you do not know, for example whether learners fail to find content because of the menu or because of the names.
:::

^src: Gibbons 2018 (NN/g) · Sweller et al. 1998

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to prioritise design principles strategically and to align them with learning impact. Materi B teaches the three things Task 2 asks: treat design as decision architecture (B1), weigh the conflict between design and function and between too complex and too reduced (B2), and decide without user tests (B3).
:::

## B1 · Design as decision architecture: structure beats surface · 18 min · Core

> Design does not only decorate. It steers what learners do, and so what they learn. Fix the structure before the look.

:::box In plain words
**The idea.** The plan's coaching says design is decision architecture: UI is not about making it pretty but about making it understandable; structure beats visual design; good UX reduces the user's wrong decisions. The chain runs from structure and hierarchy to orientation, from orientation to behaviour, and from behaviour to learning success.
**Why it matters.** Task 2 asks you to propose a basic structure, principles for visual design and a concept for user guidance, in order of priority. This card gives you the logic of the order.
**How to read the picture.** The chain reads from left to right: structure and hierarchy, orientation and guidance, behaviour, learning result.
:::

![From structure to learning success: design as decision architecture.](_figures/d8_b1_design-chain.png)

| Design layer | What it decides for the learner | Typical business effect |
|---|---|---|
| **Structure** (information architecture, navigation) | Where things are; whether they can be found | Completion, support requests |
| **Hierarchy** (visual) | What to look at first | Task success, time to start |
| **Guidance** (calls to action, feedback) | What to do next | Progress, return rate |
| **Surface** (colour, illustration) | How the platform feels | Brand perception; effects on learning are small unless structure is right |

**Where design is overestimated.** The plan's feedback question asks where design is overestimated. Typical places: a new look is paid for when the problem is structure; an animation is added when the problem is that the next step is hidden; a style guide is written but no one follows it. The test is the same as always: which learner decision does this change?

:::rules How to decide when this comes up in the task
- Fix structure first, then hierarchy, then guidance, then surface. A surface change on a broken structure does not reduce drop-out sustainably.
- Argue a design measure by the wrong decision it prevents: "learners no longer pick the wrong menu entry".
- Link every design principle to learning: reduce load (structure), direct attention (hierarchy), confirm progress (feedback).
- A rebrand is justified by brand goals; do not present it as a learning measure unless tests show an effect.
:::

:::note Extra · go deeper (optional reading)
**Design principles as a decision tool.** A short list of principles (for example "one main action per screen", "same function, same look") lets a team decide quickly and consistently. A principle that cannot be used to say no to a proposal is decoration.
**Behaviour.** Day 4 showed that behaviour needs motivation, ability and a prompt. Structure and guidance work on ability and the prompt; they are the designer's most direct levers.
:::

^src: Norman 2013 · Rosenfeld et al. 2015 · Shneiderman et al. 2016

## B2 · Conflicting goals: design against functionality, and too complex against too reduced · 22 min · Core

> A cluttered platform and an over-reduced one both fail. Reduce clutter, keep the guidance and the functions that learners need.

:::box In plain words
**The idea.** The plan's conflicts for Day 8 are design against functionality, and (in the risk analysis) too complex against too reduced. A designer who removes everything to make the screen calm may also remove what learners need: help, options, power for experts. A designer who keeps everything makes the screen unusable. The aim is to remove clutter and keep guidance and function.
**Why it matters.** Task 2 asks for a risk analysis of too complex against too reduced and for prioritised design measures.
**How to read the picture.** The matrix places five options by the clutter they remove (left to right) and by the guidance and function they keep (bottom to top). The position is a reading of the example, not a score. The top right is the aim.
:::

![Five options by clutter removed and guidance kept. LearnLoop example, Case assumption.](_figures/d8_b2_reduction-vs-guidance.png)

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| **Design against functionality** | A calm, attractive screen | All the functions learners and trainers need | Keep the functions; change where and when they appear (progressive disclosure) |
| **Too complex against too reduced** | A light screen for beginners | Depth and speed for experts | Hide advanced options behind "More"; keep help available |
| **Consistency against local fit** | The same pattern everywhere | A pattern tuned to one screen | Default to consistency; break it only with a tested reason |
| **Speed against user tests** | A decision this month | A decision based on evidence | If there is no time to test, choose reversible changes and test afterwards |

:::rules How to decide when this comes up in the task
- Name both risks: too complex (learners are lost in clutter) and too reduced (learners lose guidance or experts lose function). A plan that names one has not weighed the conflict.
- Remove clutter first (banners, equal-weight buttons, duplicate paths); keep guidance (path, Next, help).
- Use progressive disclosure so that beginners see little and experts can reach more.
- Where there is no time or money to test, choose changes that can be reversed, and write the test into the plan.
:::

:::note Extra · go deeper (optional reading)
**Design as steering of behaviour.** The plan's discussion line is "UX as steering of behaviour". Every layout nudges: an enlarged button invites a click. State openly what you want learners to do, and check that it is what they want too (see Day 4 on manipulation).
**Beginners.** The plan's Day 8 case users are beginners. Beginners benefit from structure, visible next steps and plain labels more than from advanced options.
:::

^src: Nielsen 2006 (progressive disclosure) · Nielsen 1994 · Norman 2013

## B3 · Deciding without user tests: a structure, principles and guidance you can check later · 20 min · Core

> When you cannot test first, choose changes that can be reversed, write the test into the plan, and name who decides what the design may do.

:::box In plain words
**The idea.** The plan asks you to decide under uncertainty, for example without user tests. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. For a design decision the usual unknown is how learners will react to a new structure and new names.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised design measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![The four parts of a decision without user tests, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d8_b3_decision-frame.png)

- **Test cheaply before you build.** A closed card sort with ten learners shows whether the section names make sense; a tree test shows whether they can find items (Spencer 2009). Both can be done in days, before any redesign.
- **Prefer reversible changes.** Reorganising the menu behind a switch that can be turned off is reversible; a platform rebuilt around an untested structure is not.
- **Set design principles that can say no.** For example: one main action per screen; the same function always looks the same; no information by colour alone. Each can be checked on any screen.
- **A guidance concept.** Say how a learner always knows where they are (a path, a marked entry) and what comes next (a Next or Continue button), and how a first-time visitor is guided.
- **Fix the rule.** Name who decides on a design change and what evidence they need: a test, task success, drop-out. A change that depends on one person's taste will drift.

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure and a time: "fewer than four of five beginners find their course in 30 seconds".
- Choose a reversible change, and write the test (card sort, tree test, usability test) into the plan.
- State design principles that can be used to refuse a proposal, and a guidance concept that answers "where am I, and what next?".
- Giving up nothing means you have not decided: name what you postpone, for example the visual rebrand.
:::

:::note Extra · go deeper (optional reading)
**Premortem.** Klein's premortem asks the team to imagine that the redesign failed: typical answers are that the new names did not make sense to learners, that the style guide was ignored, and that the redesign removed something experts needed. Each answer becomes a check.
**One-way and two-way doors.** Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. A menu change behind a switch is a two-way door; replacing the platform is a one-way door.
:::

^src: Spencer 2009 · Nielsen 2000 · Klein 2007 · Bezos 2016
