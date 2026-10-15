---
doc: materi
day: 9
kicker: DAY 9 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Information architecture and interaction
subtitle: Information architecture and navigation in learning platforms, interactive elements and engagement strategies
daytitle: Day 9 · Module 4 (day 2 of 3): Information architecture and navigation in learning platforms, interactive elements and engagement strategies
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is NavLearn, a platform learners cannot find their way in(see the Task document).
intro: This document holds everything you need to study Day 9 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: interaction,icap,breadcrumb,mega-menu,skip-rate,engagement,feedback,orientation,navigation,activation,rule-based,information-architecture,progress-indicator,card-sort,tree-test,hick,complexity,gamification,premortem,badge,progressive-disclosure,dropout,usability,conflicting-goals,heuristic,retrieval,fogg,trunk-test,leaderboard
refs: rosenfeld2015,spencer2009,krug2014,hick1952,nielsen1994,chiWylie2014,roediger2006,hattie2007,hamari2014,gibbons2018,norman2013,nielsen2006pd,nielsen2000,klein2007,bezos2016
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Information architecture: organising content so that it can be found and understood · 14 min · Core

> Information architecture organises and names content so that it can be found and understood: clear hierarchies, logical grouping, less complexity.

:::box In plain words
**The idea.** Information architecture is how the content of a platform is organised and named. Its goal is that content can be found and understood. Three principles carry it: clear hierarchies, logical grouping, and a reduction of complexity.
**Why it matters.** In Task 1 you sort facts about a platform into too many options, unclear labels and no orientation. The first two come from a weak architecture.
**How to read the picture.** The same LearnLoop items, once as a flat row with two homes for one course and once grouped under four sections.
:::

![The same LearnLoop items: grown without a plan, and grouped.](_figures/d9_a1_0.png)

**The point.** An information architecture organises and names content so that people can find it. The same items can be a flat row with two homes for one course, or four groups where every item has one home.

**A short story in steps.**

1. **Ana cannot find her certificate.** Let us follow Ana, a learner at LearnLoop, who wants to download her certificate. The menu is one flat row of twelve entries, and the same course appears twice under different names. Ana does not know which entry is the real one or where a certificate would be, so she opens three before she gives up.
2. **One home for every item.** Now the same items are grouped under four sections named after what Ana does: Learn, Find, Progress, Help. A certificate is part of progress, so she goes to Progress and finds it at once. The content is the same; what changed is the order and the names, which is exactly what an information architecture is.

| State shown in the picture | What it means |
|---|---|
| Grown without a plan | twelve entries sit in one row, and the same course appears twice, as “My courses” and as “Courses (old)”. Ana cannot tell which is the real one, and has to guess where a certificate or a note might be. |
| Grouped under four sections | the same items sit under Learn, Find, Progress and Help, named after what Ana does, and every item has one home. She looks for her certificate under Progress and finds it. Nothing was added; things were put in order. |

*Three principles of an information architecture*

| Principle | What it means | A sign it is missing |
|---|---|---|
| Clear hierarchies | Main sections, groups within them, items below. | A flat row of many equal entries. |
| Logical grouping | Things that belong together sit together, named after what the learner does. | One course under two or three names. |
| Reduction of complexity | Few choices at one point; the rest one level down. | Two menus side by side. |

:::note Case assumption
LearnLoop, Ana and the items shown are made up for this example. The four parts of an architecture follow Rosenfeld, Morville and Arango (2015).
:::

:::rules How to decide when this comes up in the task
- Judge a structure by two goals: can a learner find the content, and can they understand where it belongs?
- Give every item one home. The same content under two names or in two places is a structural problem.
- Group by what the learner does (Learn, Find, Progress, Help), keep the top level to a few groups, and put detail below.
- Check a structure with learners before you build it: a card sort for the groups, a tree test for findability.
:::

:::note Extra · go deeper (optional reading)
In a card sort, people group labelled cards into the categories that make sense to them; in a tree test, they try to find items in a text-only version of the menu (Spencer 2009). Both are cheap and need few participants. Krug's trunk test asks whether a visitor dropped on any page can say where they are (Krug 2014).
:::

^src: Rosenfeld et al. 2015 · Spencer 2009 · Krug 2014

## A2 · Navigation in learning platforms: orientation, types and typical mistakes · 14 min · Core

> Navigation answers “where am I, and what comes next?”. Keep the choices few, name them after what the learner does, and always show the position.

:::box In plain words
**The idea.** Navigation answers the learner's orientation questions: where am I, and what comes next. There are three kinds: a menu, paths and a progress indicator. The typical mistakes are too many options and unclear labels.
**Why it matters.** Block 1.1 asks you to say where a learner loses orientation and how to improve the navigation, and the three problems of the sort come from this card.
**How to read the picture.** First a menu with 4, 9 or 24 entries. Then one lesson screen with its three kinds of navigation labelled.
:::

![One LearnLoop menu with 4, 9 or 24 entries: how long does it take to find “Contracts”?.](_figures/d9_a2_0.png)

**The point.** The more options at one decision point, the longer a learner needs to choose, and the more likely they are to stop. Keep the main menu short and move the rest under groups.

**A short story in steps.**

1. **A short menu.** Let us follow Sam, a learner at LearnLoop, who wants the lesson on contracts. The menu has four entries, so he reads them all in a second and knows where to go. Hick's law says that choice time grows with the number of options, and here there are almost none to weigh.
2. **The same platform, grown.** Now the platform has grown and the menu shows 24 entries in small boxes. Sam has to read nearly every one, and “Contracts” is somewhere among words such as “Hub” and “Atlas”. He picks the wrong entry, comes back, picks another, and the minutes he had are gone.
3. **In between.** Nine entries are a middle case: Sam can manage, but it takes longer than with four. So the rule is not “never more than four”; it is to keep the main menu short, group the rest under a few names, and test where learners hesitate.

| State shown in the picture | What it means |
|---|---|
| 4 entries | with four entries Sam reads them all in a moment and picks one. There is little to weigh, so the choice is quick. |
| 9 entries | with nine entries Sam must scan, and the names start to compete. It still works, but it takes longer than with four. |
| 24 entries | with 24 small entries Sam has to read nearly every one, and “Contracts” hides among words like “Hub” and “Atlas”. Many learners give up here, or pick the wrong entry. |

![Three kinds of navigation on one LearnLoop lesson screen: the menu, the path and.](_figures/d9_a2_1.png)

Three kinds of navigation on one LearnLoop lesson screen: the menu, the path and the progress indicator Each kind answers one question: the menu says where I can go, the path says where I am, the progress indicator says how far I am and what is left.

*Three typical navigation problems, how to recognise them and the remedy*

| Problem | How to recognise it | Remedy |
|---|---|---|
| Too many options | Many entries or results with no grouping, no order and no filters. | Group, cut to a few, rank results, add filters. |
| Unclear labels | Names that are the system's words, or look alike, or say nothing about the result. | Name after what the learner does: “Start the quiz”. |
| No orientation | No position on the page, no next step after a result, the same title everywhere. | A path, “Lesson 3 of 8”, a Next button, a page title. |

:::note Case assumption
LearnLoop and Sam are made up for this example. Hick's law is Hick (1952); the orientation questions follow Krug (2014).
:::

:::rules How to decide when this comes up in the task
- Sort a navigation fact by what the learner cannot do: choose among too many options, tell from the name what is behind it, or tell where they are and what comes next.
- Count the choices at one decision point. Many entries with no grouping or order are too many options.
- Read every label as a stranger would. If two names look alike or say nothing about the result, the label is unclear.
- Orientation needs the position (a path, a lesson number, a marked entry) and the next step (a Next button, an explained result). A page that lacks either leaves the learner lost.
- Improve navigation by cutting and grouping the entries, renaming them, and adding the position and the next step.
:::

:::note Extra · go deeper (optional reading)
Hick's law says that choice time grows with the number of options (Hick 1952); it is a reason to keep the main menu short, not a rule of four entries. Nielsen's usability heuristics ask for visibility of system status (a position, a progress indicator) and a match between the system and the real world (names the learner uses) (Nielsen 1994).
:::

^src: Krug 2014 · Hick 1952 · Nielsen 1994

## A3 · Interactive elements: quizzes, tasks and clicks as a learning reinforcer · 12 min · Core

> Interaction helps when it is tied to a goal, makes the learner think and answers back. Reading is passive use; a question with feedback is active use.

:::box In plain words
**The idea.** Interactive elements are quizzes, tasks and click interactions. Using them is active, reading is passive, and active use can reinforce learning. But interaction helps only when it is tied to a goal, makes the learner think and answers back; an interaction that only collects clicks is an end in itself.
**Why it matters.** In Task 1 you choose measures for targeted interaction and feedback, and in Task 2 you decide where in a lesson an interaction belongs.
**How to read the picture.** The same LearnLoop lesson three ways: only read, a question with an explained answer, and rewards for clicks.
:::

![The same LearnLoop lesson, read, asked or clicked.](_figures/d9_a3_0.png)

**The point.** Interaction helps learning when it makes the learner think and answers back. A question with an explained answer and a next step reinforces; a badge for opening a page is activity without learning.

**A short story in steps.**

1. **A page to read.** Let us follow Lea, a learner at LearnLoop, through a lesson about negotiation. The page is a text, and at the end there is a Next button. Lea reads, or her eyes pass over the words, and presses Next. The platform cannot tell which, and neither can she.
2. **One question that fits.** Now one short question follows the text: who should name the first number? Lea has to recall and apply what she read. The answer is explained, so even a wrong choice teaches something, and a button leads on to lesson 4. The interaction is tied to the goal of the section.
3. **Clicks that teach nothing.** The third version rewards Lea with points for opening a page and pressing a button. She is active, but active in a way that has nothing to do with the lesson, so it is interaction as an end in itself. So ask of every interaction: what does the learner think or decide here, and what do they get back?

| State shown in the picture | What it means |
|---|---|
| Only read | Lea reads the text and presses Next. This is passive use: she may take it in, or her eyes may only pass over it, and nothing shows which. |
| A question, with feedback | Lea answers one question tied to what she just read, sees why A is right and what the first number does, and gets a next step. She had to think, and she learned from the answer. |
| Rewards for clicks | Lea collects points for opening a page and pressing a button. She is busy, but nothing says what she learned. The interaction is an end in itself. |

*Active and passive use of a lesson, and what interaction adds*

| Use | What the learner does | What it gives |
|---|---|---|
| Passive: reading, watching | Takes in; may only look. | Needed, but nothing shows if it worked. |
| Active: answering, applying, deciding | Recalls and uses the idea. | Reinforces learning and shows what is understood. |
| Clicks without a goal | Opens, presses, collects. | Activity, not learning; adds noise. |

:::note Case assumption
LearnLoop and Lea are made up for this example. The difference between active and passive use follows the ICAP framework (Chi and Wylie 2014).
:::

:::rules How to decide when this comes up in the task
- Ask of every interaction: what does the learner think or decide here, and what do they get back? If nothing, it is an end in itself.
- Tie each interaction to the goal of the lesson section it follows; put a short question inside the lesson, not a quiz that blocks the next page.
- Close every interaction with feedback: an explained result and a next step. A bare score leaves the learner without a direction.
- A reward for opening a page or pressing a button teaches nothing. Reward progress, not clicks.
- Avoid monotony: vary the kind of task, and keep the number of interactions per lesson small enough that most can be skipped.
:::

:::note Extra · go deeper (optional reading)
Retrieval practice: trying to recall something strengthens memory more than rereading it (Roediger and Karpicke 2006), which is why a short question after a section helps. Feedback is one of the strongest influences on learning when it tells the learner where they are going, how they are doing and what to do next (Hattie and Timperley 2007).
:::

^src: Chi and Wylie 2014 · Roediger & Karpicke 2006 · Hattie & Timperley 2007 · Nielsen 1994

## A4 · Engagement strategies through interaction: activation, feedback and variety · 10 min · Optional

> Engagement through interaction comes from feedback that explains, a next step, and variety. A score alone is none of them.

:::box In plain words
**The idea.** The plan names three engagement strategies through interaction: activate the user, give feedback and reward, and avoid monotony. Feedback that explains and a reward that is tied to progress keep a learner going; the same task again and again does not.
**Why it matters.** The three parts are the engagement side of the plan's Musterlösung (feedback mechanisms). Feedback and a next step are also taught in A3, so no Core block needs this card.
**How to read the picture.** The end of a LearnLoop lesson with three features that can be on or off: an explained result, a next step and a different kind of task.
:::

![The end of a LearnLoop lesson: result, next step and variety.](_figures/d9_a4_0.png)

**The point.** Engagement through interaction comes from three things: feedback that explains, a next step, and variety so that the tenth task is not the first one again. A score alone is none of them.

**A short story in steps.**

1. **A score and nothing else.** Let us follow Ben, a learner at LearnLoop, who has just finished a quiz. The page shows 6 of 10, a cheerful “Well done”, and then nothing: no reason for the four misses, no next step, and the next task is the same kind of question again. Ben does not know what to do, so he often leaves.
2. **Explain and lead on.** Now the page explains the missed question and adds a button “Next: lesson 4”. Ben learns something from his mistake and knows where to go. That is feedback and guidance together, and it costs one short text and one button.
3. **Vary the task.** Finally the next task changes kind: a short scenario in which Ben is the buyer. Monotony is one of the quiet reasons learners drift away, and a different kind of task at the right moment wakes attention again.

| Switches | What it means |
|---|---|
| All off | 0 of the 3 engagement parts are on. Ben sees only 6 of 10 and has to guess what went wrong. Nothing tells him what to do next. The next task is the same kind of question again. |
| All on (An explained result, A next step, A different kind of task) | 3 of the 3 engagement parts are on. Ben sees why he missed a question. He knows what to do next. The next task is a scenario, so the lesson does not repeat itself. |

:::note Case assumption
LearnLoop and Ben are made up for this example.
:::

:::rules How to decide when this comes up in the task
- Activate the learner with a task tied to the lesson, not with a click to open the next page.
- Give feedback that explains why, and a reward that is tied to progress, not to activity.
- Avoid monotony: change the kind of task now and then so that the tenth is not the first again.
:::

:::note Extra · go deeper (optional reading)
Gamification can raise engagement in some settings, but results are mixed and depend on context (Hamari, Koivisto and Sarsa 2014); Day 11 treats it in depth. Here the rule is the narrow one: reward progress, never clicks.
:::

^src: Hattie & Timperley 2007 · Hamari et al. 2014 · Chi and Wylie 2014

## A5 · Weighing a structure or interaction measure: learning impact, effort, risk · 10 min · Core

> Rate a measure by how much it helps the learner find and then learn, what it costs and what could go wrong. Structure before interaction.

:::box In plain words
**The idea.** To choose between structure and interaction measures, rate each on the same three questions. Learning impact: how much does it help the learner find the content and then learn from it? Effort: money and time, decided here by a rule: under €7,000 is Low, up to €14,000 is Mid, above that is High. Risk: what could go wrong, for example that an interaction becomes a burden.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €30,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three structure and interaction measures.](_figures/d9_a5_0.png)

**The point.** Rate a structure or interaction measure by how much it helps the learner find and then learn, by its printed cost, and by what could go wrong. Interaction without structure, and rewards for clicks, carry the highest risk of becoming a burden.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop again. Learners get lost in the menu and rarely interact, the budget is €30,000, and three ideas are on the table. We rate each on three questions: what it does for the learner (learning impact), what it costs (effort), and what could go wrong (risk).
2. **Better names.** Renaming the entries costs €4,000, so the effort is Low. The names say what is behind them, so the learning impact is Mid, but the entries stay where they are. The risk is Low, because only words change.
3. **Grouping, the cause.** Grouping the menu into four sections costs €16,000, so the effort is High. It answers the cause: learners find their course and know where they are, so the learning impact is High. The risk is Mid, because the change touches every page.
4. **Rewards for clicks.** Badges for every click cost €9,000, so the effort is Mid, but nothing is learned from a click: the learning impact is Low and the risk is High, because it rewards activity and adds noise. So structure and goal-tied interaction come first; interaction as an end in itself comes last.

| Measure (LearnLoop, Case assumption) | Cost | Effort | Learning impact | Risk | Reasons |
|---|---|---|---|---|---|
| Rename entries after what the learner does | €4,000 | Low | Mid | Low | Effort: €4,000 is under €7,000: Low. Learning impact: The names say what is behind them, so fewer learners open the wrong entry; the grouping stays as it is. Risk: It changes words only; little can go wrong. |
| Group the menu into four sections | €16,000 | High | High | Mid | Effort: €16,000 is above €14,000: High. Learning impact: Learners find their course and know where they are: it answers the cause of the lost orientation. Risk: It touches every page, so a mistake would be visible everywhere. |
| Badges for every click | €9,000 | Mid | Low | High | Effort: €9,000 lies between €7,000 and €14,000: Mid. Learning impact: Nothing is learned from a click, and learners who cannot find content get a badge for being lost. Risk: It rewards activity, not learning, and adds noise to a busy page. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €7,000 is Low; €7,000 to €14,000 is Mid; above €14,000 is High.
- Rate learning impact by what a measure does for finding the content and then learning from it: structure and feedback first, extra interaction second.
- Rate risk by what could go wrong: an interaction can become a burden, a reward can reward the wrong thing, a big change touches every page.
- Justify the order with the chain orientation, activation, engagement: say how your first measure leads to the next.
- Say what you do not know, for example whether learners drop out before or after they find a lesson, and how you would find out.
:::

^src: Gibbons 2018 · Chi and Wylie 2014

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · Structure guides, interaction activates: orientation, activation, engagement · 18 min · Core

> Structure guides, interaction activates. Without structure, interaction has no effect; interaction must serve a goal, and engagement comes from meaningful activation.

:::box In plain words
**The idea.** The plan's coaching says that structure guides and interaction activates: without structure, interaction has no effect; navigation is decision guidance; interaction must be goal-oriented; engagement arises from meaningful activation. The chain runs orientation, activation, engagement.
**Why it matters.** Task 2 asks you to design the sections, the navigation and the interaction in order of priority. This card gives you the logic of that order.
**How to read the picture.** The chain reads from left to right: orientation, activation, engagement. Below it, what each step needs and where interaction is overestimated.
:::

![Structure guides, interaction activates: orientation, then activation, then engagement.](_figures/d9_b1_0.png)

*Where interaction belongs in a lesson, and where it does not*

| Place | What fits | What does not |
|---|---|---|
| Start of a lesson | A one-question warm-up that recalls the last lesson; a poll on confidence. | A long quiz that delays the content. |
| Inside a lesson | A short question after a section; a click-through scenario. | A pop-up that blocks the next page. |
| End of a lesson | A task that applies the idea; a reflection note. | A score with no explanation or next step. |
| Anywhere | Feedback and a next step after each interaction. | A reward for opening a page or pressing a button. |

:::note Where interaction is overestimated
The plan's feedback question asks where interaction is overestimated. Typical places: a quiz is added to every page when the problem is that content cannot be found; points are added when the problem is unclear goals; an assistant is added on top of a menu with 24 entries. The test is the same: what does the learner think or decide here, and what do they get back?
:::

:::note Case assumption
The chain follows the plan's coaching and Musterlösung: orientation, activation, engagement.
:::

:::rules How to decide when this comes up in the task
- Order the work as the chain runs: orientation first, then activation, then engagement. An interaction on a platform the learner cannot navigate adds clicks to a lost learner.
- Treat navigation as decision guidance: every entry, path and button steers what the learner does next.
- Say where interaction is overestimated: a quiz on every page, rewards for clicks, an assistant on top of an unclear menu.
- Place each interaction deliberately (start, inside, end of a lesson, or not at all) and tie it to a goal.
:::

:::note Extra · go deeper (optional reading)
ICAP: Chi and Wylie (2014) sort learning activity into passive, active, constructive and interactive, and report that learning tends to improve in that order. A question that makes the learner produce something is better than one that only asks them to click.
:::

^src: Norman 2013 · Rosenfeld et al. 2015 · Chi and Wylie 2014

## B2 · Conflicting goals: structure against flexibility, and interaction against overload · 22 min · Core

> Too much guidance traps experts, too little loses beginners; too little interaction leaves learners passive, too much overloads them. Aim for guidance with freedom.

:::box In plain words
**The idea.** The plan's conflicts for Day 9 are structure against flexibility, and interaction against overload. Too much guidance traps experienced learners; too little loses beginners. Too little interaction leaves learners passive; too much overloads them. The aim is guidance with freedom, and interaction in a dose that serves a goal.
**Why it matters.** Task 2 asks for a risk analysis of over-structuring against over-interaction and for prioritised measures.
**How to read the picture.** The matrix places five LearnLoop designs by the guidance the learner gets (to the right) and the freedom they keep (upwards). The position is a reading of the example, not a score. The top right is the aim.
:::

![A worked example: five LearnLoop designs by guidance and freedom.](_figures/d9_b2_0.png)

**The point.** Structure and flexibility pull against each other: too much guidance traps experienced learners, too little loses beginners. A recommended path with free access gives both, and interaction should be capped so that it does not become a burden.

**A short story in steps.**

1. **Two ways to get it wrong.** Let us look at LearnLoop, which wants to guide beginners without trapping experts. Design A is a fixed path with a quiz after every page: guidance is at the maximum and freedom is gone. Design B opens everything and recommends nothing: freedom is at the maximum, and beginners do not know where to start. Both lose learners, in different groups.
2. **Guided and free.** Design C recommends a path and keeps everything open, with a skip button. Beginners follow the path, and an experienced learner jumps to the lesson they need. Nobody is trapped and nobody is lost, so it sits in the top right, the aim.
3. **The same question for interaction.** The same balance applies to interaction: a quiz that cannot be skipped is the interaction version of design A, and it can become a burden. So cap the interactions per lesson, make most of them optional, and watch how many learners skip them.

| Point | The idea | Why it sits there |
|---|---|---|
| A | A fixed path that cannot be skipped, with a quiz after every page | Maximum guidance, no freedom. Beginners are safe, but experienced learners are forced through what they know, and the compulsory quizzes become a burden. |
| B | Everything open, no path, no recommendation | Maximum freedom, no guidance. Experts are happy; beginners cannot tell where to start and many leave. |
| C | A recommended path with free access and a skip button | Beginners follow the path; experienced learners jump straight to what they need. This is the aim: guided and free. |
| D | A guided tour at the first visit that cannot be closed | It guides, but it cannot be skipped, so it takes freedom away at the moment a learner is most curious. |
| E | Three menus with 40 entries and no path | It looks free, but the learner is lost in choices: no guidance and no real freedom either, because freedom needs an overview. |

*Four conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| Structure against flexibility | A clear path for beginners | Free access for experienced learners | Recommend a path, never lock it; add a skip option. |
| Interaction against overload | An active learner | A page that is not crowded | One targeted interaction per section; cap the rest. |
| Guidance against speed | A tour or a hint at every step | A quick route for those who know | Guide the first visit, let it be closed, and do not repeat it. |
| Reward against meaning | A visible reward for activity | A result that means something | Reward progress and results, not clicks. |

:::note Case assumption
LearnLoop and its five designs are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both poles of each conflict: over-structuring (learners lose freedom) and under-structuring (learners are lost); over-interaction (a burden) and under-interaction (passive use). A plan that names one pole has not weighed the conflict.
- Offer a recommended path with free access and a skip option, so that beginners are guided and experienced learners keep their freedom.
- Cap interactions per lesson and make most of them skippable; watch the skip rate.
- Where there is no data, choose changes that can be reversed and write the check into the plan.
:::

:::note Extra · go deeper (optional reading)
Progressive disclosure helps both sides of the conflict: it shows beginners little and lets experts reach more (Nielsen 2006). For interaction, the same idea applies: show the one question that fits, and keep the rest one click away.

UX as steering of behaviour: the plan's discussion line. Every menu, path and prompt nudges; state openly what you want learners to do and check that it is also what they want.
:::

^src: Nielsen 2006 (progressive disclosure) · Nielsen 1994 · Chi and Wylie 2014

## B3 · Deciding without behaviour data: a structure and an interaction plan you can check later · 20 min · Core

> When you have no behaviour data, choose changes that can be reversed, write the check into the plan, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. For a structure and interaction decision the usual unknown is how learners will react to a new menu or a question after every section.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision without behaviour data, filled in for LearnLoop.](_figures/d9_b3_0.png)

*Five ways to make a decision without behaviour data safer*

| Way | What it looks like |
|---|---|
| Test the structure cheaply | A closed card sort and a tree test with ten to twenty learners take days and need no build. |
| Add interaction in small steps | One question per lesson first, behind a switch, before any other interaction. |
| Pick a figure you can watch | The skip rate, task success or the share who find a course in a minute. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “more than 30% of learners skip the question by the end of week 6”.
- Start with the structure, which can be checked cheaply with a card sort and a tree test, and add interaction in small steps that can be switched off.
- Name who decides on a change and what evidence they need: a test, task success, the skip rate.
- Giving up nothing means you have not decided: name what you postpone, for example the point system or the assistant.
:::

:::note Extra · go deeper (optional reading)
Premortem: Klein's premortem asks the team to imagine that the redesign failed. Typical answers here: learners lost the freedom to jump ahead, every screen asked for a click, and the new names meant nothing to beginners. Each answer becomes a check.

One-way and two-way doors: Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. A question behind a switch is a two-way door; rebuilding the platform is a one-way door.
:::

^src: Spencer 2009 · Nielsen 2000 · Klein 2007 · Bezos 2016

