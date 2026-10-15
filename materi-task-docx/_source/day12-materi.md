---
doc: materi
day: 12
kicker: DAY 12 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Adaptive learning, a gamified prototype
subtitle: Adaptive learning systems, UX design patterns for personalised learning paths, practical project: prototype a gamified learning platform
daytitle: Day 12 · Module 5 (day 2 of 2): Adaptive learning systems, UX design patterns for personalised learning paths, practical project: prototype a gamified learning platform
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is AdaptLearn, an ambitious but ineffective system(see the Task document).
intro: This document holds everything you need to study Day 12 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: rule-based,machine-learning,black-box,over-adaptation,transparency,data-quality,personalisation,adaptive,gamification,feedback,complexity,prototype,low-fi,ai-act,interaction,learning-path,usability,conflicting-goals,heuristic,premortem,cold-start,over-engineering,expertise-reversal,leaderboard,game-mechanic,comprehension
refs: brusilovsky2001,kalyuga2003,ribeiro2016,amershi2019,aiAct,shneiderman2016,nielsen1994,deterding2011,gibbons2018,hamari2014,klein2007,bezos2016
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Adaptive learning systems: collect, analyse, adapt · 14 min · Core

> An adaptive system collects data about behaviour, analyses it and adapts content or difficulty, to give each learner a path that fits. It helps only when the learner can see why.

:::box In plain words
**The idea.** An adaptive learning system adapts content to what the learner does. It works in three steps: it collects data about behaviour, it analyses it (for example progress and mistakes), and it adapts the content or the difficulty. The goal is a path that fits one person rather than everyone.
**Why it matters.** In Task 1 you sort facts about a platform into changes that are opaque, based on a wrong basis, or helpful. You first need to know what the system does.
**How to read the picture.** The same LearnLoop course three ways: identical for everyone, adapted with a reason, and adapted with no reason.
:::

![The same LearnLoop course: identical for all, adapted with a reason, adapted with none.](_figures/d12_a1_0.png)

**The point.** An adaptive system collects data about what the learner does, analyses it, and adapts the content or the difficulty. Done well, it spares a learner what they know and gives practice where they struggle. Done without a reason, the same adaptation feels like a system that changes things behind the learner's back.

**A short story in steps.**

1. **One path for all.** Let us follow Ravi, a learner at LearnLoop who already knows the basics of negotiation. The platform gives him the same four lessons as every other learner, so he spends his first twenty minutes on what he knows. Nothing is wrong, but his time is wasted.
2. **An adaptation he can read.** Now LearnLoop adapts. It collected his test results, saw that he passed the basics and missed anchoring, and changed the path. A line tells him so: “You know the basics, so we skipped them.” He saves time and knows why, so the adaptation helps.
3. **The same change, unexplained.** Now take away the line. The path is just as different, but Ravi sees a lesson missing and a new one appear with no word. A good adaptation has become a puzzle, which is how a system ends up not accepted.

| State shown in the picture | What it means |
|---|---|
| The same for everyone | Ravi gets the same four lessons as everyone, including one on basics he already knows. It is clear and cheap, and it ignores how different learners are. |
| Adapted, with a reason | the basics are skipped and a practice lesson on anchoring is added, and a line says why. Ravi saves time and understands what happened, so he trusts the path. |
| Adapted, with no reason | the path is exactly as different, but nothing says why. Ravi wonders where a lesson went and whether the platform is working, and may stop trusting it. |

*The three steps of an adaptive system*

| Step | What happens | Where it can go wrong |
|---|---|---|
| Collect | Data about what the learner does. | Too little data, or the wrong data. |
| Analyse | Progress, mistakes, speed. | A big conclusion from one data point. |
| Adapt | Content or difficulty changes. | It changes silently, or cannot be undone. |

:::note Case assumption
LearnLoop and Ravi are made up for this example. The definition follows Brusilovsky (2001): adapting content to the individual learner.
:::

:::rules How to decide when this comes up in the task
- Sort an adaptation as opaque when something changes with no notice, no reason or no way to see it: a path that says only “updated”, a lesson that vanishes, a recommendation with no reason.
- Sort an adaptation as helpful when the learner sees what changed and why, and can change it back or choose.
- Use the three steps to find where a system goes wrong: it collects the wrong data, it analyses too little, or it adapts too strongly or silently.
- Compare a platform that gives everyone the same content with one that adapts: the first is clear and ignores differences; the second can fit each learner, if it is understandable.
:::

:::note Extra · go deeper (optional reading)
Adaptive systems often rest on a model of the learner, for example what they know. Studies of expertise reversal (Kalyuga et al. 2003) show why adapting matters: help that suits a beginner can slow an expert down.
:::

^src: Brusilovsky 2001 · Kalyuga et al. 2003

## A2 · Technology and algorithms: rules, models and their limits · 14 min · Core

> Rules are written by a person, need little data and can be explained. A model finds patterns in a lot of data but cannot say why. With a small data basis, rules are the safer choice.

:::box In plain words
**The idea.** There are two broad ways to decide how to adapt. Rule-based systems use if-then logic that a person writes, such as “if the test is passed, skip the lesson”. Data-driven systems, such as machine learning, find patterns in large amounts of data. Their limits are data quality, complexity and transparency: a model with too little data guesses, and a learner cannot be told why it chose.
**Why it matters.** Block 1.2 asks you to weigh rules against a complex AI system under a small data basis. This card gives the test.
**How to read the picture.** The same decision three ways: two clear rules, a closed box with lots of data, and a closed box with too little data.
:::

![The same decision by rules, by a model, and by a model with too little data.](_figures/d12_a2_0.png)

**The point.** Rules are written by a person, need little data and can be explained to the learner. A model finds patterns in a lot of data, but needs good data and cannot say why. With a small data basis, rules are the safer choice.

**A short story in steps.**

1. **Two rules.** Let us look at how LearnLoop could choose Ravi's next lesson. The simplest way is two rules a person writes: if he passed the test, skip the lesson; if he failed, repeat it. It needs very little data, and Ravi can be told which rule applied.
2. **A model with a lot of data.** A model is different. Fed with data from thousands of learners, it may find patterns a person would miss. But the data goes into a closed box, and what comes out has no reason attached, so Ravi cannot be told why he got that lesson.
3. **When the data is thin.** Now LearnLoop is small, with only a dozen learners to learn from. The model has too little to find a pattern, so it guesses, and a guess in a closed box looks just like a good decision. So with a small data basis, start with rules.

| State shown in the picture | What it means |
|---|---|
| Rules | two if-then rules decide. Little data is needed, a person can read and change them, and the learner can be told exactly which rule applied. |
| A model, lots of data | a model learns from thousands of learners and may find patterns no person would. It needs a lot of good data, and nobody can say why it picked a lesson. |
| A model, too little data | with only a dozen examples the model has nothing to learn from, so it guesses, and nobody can tell. This is the case for a small platform. |

*Rules and models side by side*

|  | Rule-based | Data-driven (a model) |
|---|---|---|
| Needs | Little data and a person who writes the rules. | A lot of good data and skills to build and check it. |
| Explaining | Easy: “because you passed the test”. | Hard: the reason is inside the box. |
| Typical risk | Rules too crude for some learners. | Wrong guesses from thin or biased data. |

:::note Case assumption
LearnLoop and its values are made up for this example. The need to explain a model's choice is discussed by Ribeiro et al. (2016) and in the guidelines for human-AI interaction (Amershi et al. 2019); the EU AI Act sets rules for AI systems, and which apply to a learning platform depends on its use, so check before relying on it.
:::

:::rules How to decide when this comes up in the task
- Match the technique to the data you have: a small data basis points to simple rules; a model needs a lot of good data.
- Prefer a technique you can explain: if the learner cannot be told why a lesson was chosen, trust and acceptance suffer.
- Name the three limits of any system: data quality (is it enough and right?), complexity (can the team maintain it?) and transparency (can it be explained?).
- Treat a complex AI system as high effort and high risk when the data basis is small, however modern it sounds.
- Over-adaptation: a system that reacts strongly to one mistake or a few clicks boxes the learner in; adapt slowly and keep a way back.
:::

:::note Extra · go deeper (optional reading)
A cold start is the moment a new learner has no history, so a model has nothing to go on. A short start questionnaire is the usual answer, and it works with rules as well as with models.
:::

^src: Ribeiro et al. 2016 · Amershi et al. 2019 · EU AI Act

## A3 · UX patterns for personalised learning paths · 12 min · Core

> Four UX patterns make a personalised path usable: a recommendation, adaptive difficulty, a dynamic path and behaviour-based feedback. Each works when the learner can see it, understand it and change it.

:::box In plain words
**The idea.** A UX pattern is a proven way to show something in an interface. For personalised paths there are four: an individual recommendation, adaptive difficulty levels, a dynamic learning path, and feedback based on behaviour. A pattern works when the learner can see it, understand why it appears, and change it.
**Why it matters.** In Block 1.1 and Block 2.2 you separate patterns that explain themselves from ones that hide. In Block 3.1 you choose patterns.
**How to read the picture.** One LearnLoop path screen with four features that can be on or off: a recommendation, difficulty, a path and feedback.
:::

![One LearnLoop path screen and four personalisation patterns.](_figures/d12_a3_0.png)

**The point.** Four UX patterns make a personalised path usable: an individual recommendation, adaptive difficulty, a dynamic path and behaviour-based feedback. Each works when the learner can see it, understand why it appears and change it.

**A short story in steps.**

1. **A plain list.** Let us follow Ravi, a learner at LearnLoop, who opens his path. It is a plain list of lessons, the same for everyone, so he has to work out for himself where to go next and whether the level is right.
2. **Four patterns.** Now all four patterns are on. A card recommends the next lesson and says why, the level is shown and can be raised, the path shows what was added for him, and a note after each unit says what comes next. Each one tells Ravi something and lets him act.
3. **One at a time.** A platform does not need all four at once. In Task 2 you choose which ones to build first.

| Switches | What it means |
|---|---|
| All off | 0 of the 4 patterns are on. No recommendation: Ravi must choose alone. The path is a plain list. |
| All on (Recommendation, Adaptive difficulty, Dynamic path, Behaviour-based feedback) | 4 of the 4 patterns are on. A recommendation says what to do next and why. The level shows and can be raised. The path shows what was added for him. After a unit he is told what comes next. |

*Four patterns and what makes each one usable*

| Pattern | What it does | What makes it usable |
|---|---|---|
| Individual recommendation | Suggests the next lesson. | A reason, and the full list still reachable. |
| Adaptive difficulty | Raises or lowers the level. | The level is shown, with an undo. |
| Dynamic path | Adds, skips or repeats lessons. | Adapted parts are marked on a map. |
| Behaviour-based feedback | Comments on what the learner did. | It names the behaviour and the next step. |

:::note Case assumption
LearnLoop and Ravi are made up for this example. The usability rules follow Nielsen's heuristics and the guidelines for human-AI interaction (Amershi et al. 2019).
:::

:::rules How to decide when this comes up in the task
- Choose patterns the learner can see: a recommendation with its reason, a difficulty level that is shown, a path map with adapted parts marked.
- Give every pattern a way back: an undo for a difficulty change, a switch to choose the path alone.
- Avoid silent re-routing, a recommendation with no reason, and a hidden score: each takes control from the learner.
- Start the first adaptation from what the learner says (a short questionnaire they can edit), and let behaviour refine it.
:::

:::note Extra · go deeper (optional reading)
Amershi et al. (2019) propose guidelines for systems that learn from their users, among them: make clear what the system can do, show why it did what it did, and let the user correct it. They apply to a learning platform as much as to any other.
:::

^src: Amershi et al. 2019 · Shneiderman et al. 2016 · Nielsen 1994

## A4 · Opportunities and risks, and the link to gamification · 10 min · Optional

> Opportunities: efficiency, motivation and learning success. Risks: opacity, over-adaptation and a wrong data basis. Personalisation links to gamification through a personal goal.

:::box In plain words
**The idea.** Adaptive systems offer opportunities (efficiency, motivation and learning success) and risks (opacity, over-adaptation and a wrong data basis). Over-adaptation means the system reacts too strongly to too little and boxes the learner in. Personalisation also links to gamification: a mechanic tied to a personal goal combines motivation with personalisation.
**Why it matters.** Block 3.1 asks how gamification joins the personalisation. The core rules are repeated in A2 and B2, so no Core block needs this card.
**How to read the picture.** Two columns: opportunities on the left, risks on the right.
:::

![.](_figures/d12_a4_0.png)

:::note Case assumption
LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Name both sides: an opportunity (time saved, practice where needed) and the risk that comes with it.
- Join gamification to personalisation through a personal goal, not through a point total.
:::

:::note Extra · go deeper (optional reading)
Day 11 showed that points reward activity. A goal the learner chose at the start gives the same bar a meaning of its own: progress toward something they want.
:::

^src: Brusilovsky 2001 · Deterding et al. 2011

## A5 · Weighing a personalisation measure: benefit, effort, risk · 10 min · Core

> Rate a measure by how much it helps learners, what it costs and what could go wrong. Technology against benefit: a small data basis points to simple rules.

:::box In plain words
**The idea.** To choose between personalisation measures, rate each on the same three questions. Benefit: how much does it help learners reach their goal, for many different users? Effort: money and time, decided here by a rule: under €10,000 is Low, up to €25,000 is Mid, above that is High. Risk: what could go wrong, for example a small data basis or a system nobody understands.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €50,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three personalisation measures.](_figures/d12_a5_0.png)

**The point.** Rate a measure by how much it helps learners, by its printed cost, and by what could go wrong. A reason on every recommendation is cheap and safe. A model needs data a small platform does not have, so it carries the highest risk.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop once more. It is a small platform with little data, the budget is €50,000, and three ideas are on the table. We rate each on three questions: how much it helps learners (benefit), what it costs (effort), and what could go wrong (risk).
2. **A reason on every recommendation.** A reason on every recommendation costs €7,000, so the effort is Low. Learners see why a lesson was chosen, so the benefit is High, and the risk is Low because it only adds words. The questionnaire costs €18,000, Mid effort, with Mid benefit and Mid risk.
3. **The model.** The model costs €44,000, so the effort is High. With little data it mostly guesses, so the benefit is Mid, and the risk is High because nobody could explain a wrong adaptation. So: explain first, simple rules next, a model last.

| Measure (LearnLoop, Case assumption) | Cost | Effort | Benefit | Risk | Reasons |
|---|---|---|---|---|---|
| A reason on every recommendation | €7,000 | Low | High | Low | Effort: €7,000 is under €10,000: Low. Benefit: Learners see why a lesson was chosen, so they trust and use the recommendations. Risk: It only adds words and removes nothing. |
| A start questionnaire for the level | €18,000 | Mid | Mid | Mid | Effort: €18,000 lies between €10,000 and €25,000: Mid. Benefit: It starts each learner at the right level, but only as well as the learner answers. Risk: Learners may rate themselves wrongly, so the level can be off at the start. |
| A machine-learning model for the next lesson | €44,000 | High | Mid | High | Effort: €44,000 is above €25,000: High. Benefit: It could fit well in theory, but with little data it mostly guesses. Risk: A small data basis makes wrong adaptations likely, and nobody could explain them. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €10,000 is Low; €10,000 to €25,000 is Mid; above €25,000 is High.
- Rate benefit by how much it helps different learners understand and use the adaptation, not by how advanced the technology is.
- Rate risk by what could go wrong: a small data basis, a system nobody understands, over-adaptation, a big change that touches every screen.
- Justify the order with the rule comprehensibility before complexity: say how your first measure makes the system understandable.
- Say what you do not know, for example whether learners keep the adaptation on, and how you would find out.
:::

^src: Gibbons 2018 · Amershi et al. 2019

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · Personalisation as a strategic UX option: need, data, technique, explanation · 18 min · Core

> More technology is not better UX. Design personalisation from the learner's need, through the data you have and the simplest technique that fits, to an adaptation the learner can see and change.

:::box In plain words
**The idea.** The plan's coaching says that more technology is not better UX. Personalisation is a strategic option, and the chain to design runs from the learner's need, to the data you have, to the technique (a rule or a model), to an adaptation the learner can see and change. Skipping the last step is how a clever system ends up not accepted.
**Why it matters.** Task 2 asks for a concept for adaptive paths, the UX patterns, how gamification joins in, and a low-fidelity sketch. This chain gives you the order.
**How to read the picture.** The chain reads from left to right: need, data, technique, an adaptation the learner can see. Below it, the test for each link.
:::

![Designing personalisation: need, data, technique, an adaptation the learner can see.](_figures/d12_b1_0.png)

*The test for each link of the chain*

| Link | The test | What goes wrong without it |
|---|---|---|
| Learner need | Can you say who needs what, and why a standard path fails them? | Technology looks for a problem. |
| Data you have | Is it enough, and is it right? | The system guesses. |
| Technique | Is it the simplest one that fits the data? | Complexity nobody can maintain. |
| A visible adaptation | Does the learner see what changed, why, and can they change it? | Low acceptance. |

:::note Case assumption
The chain follows the plan's coaching: more technology is not better UX, and data quality matters. LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Decide how far to personalise from the data and the users you have: heterogeneous users argue for some personalisation; a small data basis argues for simple rules.
- Build in two steps when data is incomplete: explained rules first, a model later once there is enough good data.
- Choose UX patterns the learner can see, understand and steer, and drop the silent and hidden ones.
- Join gamification to the personal goal: a goal bar chosen at the start, filled by checked lessons, with no ranking.
- Sketch at low fidelity first: place each element on the screen where it belongs and leave out what a first test does not need.
:::

:::note Extra · go deeper (optional reading)
Over-engineering means building more than the problem needs. In personalisation it often shows as a model where three rules would do, which costs more, is harder to explain and, with little data, works worse.
:::

^src: Amershi et al. 2019 · Brusilovsky 2001 · Hamari et al. 2014

## B2 · Conflicting goals: UX against technology, personalisation against standardisation · 22 min · Core

> UX against technology, personalisation against standardisation. Choose the simplest technique the learner understands and that fits the data.

:::box In plain words
**The idea.** The plan's conflicts for Day 12 are UX against technology, and personalisation against standardisation. A technique can be powerful and still not understood. Standardisation is cheap and clear and ignores differences. The aim is the simplest technique that the learner can understand and that fits the data you have.
**Why it matters.** Task 2 asks for a risk analysis and prioritised measures. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places six LearnLoop ideas by their technical complexity (to the right) and how well the learner understands them (upwards). The position is a reading of the example, not a score.
:::

![A worked example: six LearnLoop ideas by technical complexity and how well the learner understands them.](_figures/d12_b2_0.png)

**The point.** UX and technology pull against each other, and so do personalisation and standardisation. A powerful technique that the learner cannot understand is not better UX. Aim for the simplest technique that the learner understands and that fits the data.

**A short story in steps.**

1. **Powerful but not understood.** Let us look at LearnLoop's ideas. A hidden AI that re-orders the path is very powerful, but the learner only sees that things moved. On the other side, the same path for everyone is perfectly clear and adapts to nobody.
2. **Simple and clear.** Three rules with a stated reason sit between the two. They adapt, because the rules use what the learner did, and they stay clear, because the learner is told which rule applied. For a platform with little data, that is the aim.
3. **Personalisation against standardisation.** A model with a “Why this?” line can also reach the top, but only with enough good data. So choose the simplest technique that the learner can understand and that fits your data.

| Point | The idea | Why it sits there |
|---|---|---|
| A | A hidden AI that re-orders the path | Very complex, and the learner sees only that the path changed. It is powerful and opaque. |
| B | The same path for everyone | As simple as it gets and perfectly clear, but it does not adapt to anyone. Standardisation: cheap and clear, and it ignores differences. |
| C | Three rules with a stated reason | Simple enough to state, and the learner is told which rule applied. It adapts and stays clear. This is the aim for a small data basis. |
| D | A model with a “Why this?” explanation | Complex, but the learner gets a short reason for each choice. It can work once there is enough good data, and it needs the explanation. |
| E | A start level set silently from three clicks | Not complex, but the learner cannot see where the level came from or change it. Simple but unclear. |
| F | A start level the learner can edit | Only a little more complex, and the learner sees and controls it. A good first adaptation. |

*Two conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| UX against technology | The most powerful technique | A technique the learner understands | Choose the simplest one that fits the data. |
| Personalisation against standardisation | A path for each learner | One clear path for all | Personalise where learners differ and the data shows it; standardise the rest. |

:::note Case assumption
LearnLoop and its six ideas are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both sides of each conflict: powerful technique and understood technique; adapted for each and the same for all. A plan that names one side has not weighed the conflict.
- When standardisation is the better choice: short content, a very small data basis, or learners who are alike.
- When personalisation pays off: learners differ a lot in what they know, and you can see the difference in data you trust.
- Keep the full path visible even when it is adapted, so a learner can look beyond what the system suggests.
:::

:::note Extra · go deeper (optional reading)
Explainable AI is the effort to make a model's choices understandable to people (Ribeiro et al. 2016). For a learning platform the practical version is a short reason beside each adaptation, in the learner's words.
:::

^src: Amershi et al. 2019 · Ribeiro et al. 2016 · Kalyuga et al. 2003

## B3 · Deciding with an incomplete data basis: a decision you can check later · 20 min · Core

> When the data basis is incomplete, choose a small, reversible step, test the concept in a prototype with a few learners, write a figure you can watch into the plan, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide although the data basis is not complete, and competitors already use adaptive systems. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A low-fidelity prototype tested with a few learners is the cheapest way to learn what you do not know.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision with an incomplete data basis, filled in for LearnLoop.](_figures/d12_b3_0.png)

*Five ways to make a decision with incomplete data safer*

| Way | What it looks like |
|---|---|
| Test a prototype | Five to eight learners use paper or clickable screens of the concept. |
| Start with rules | A few rules that need little data and that can be explained. |
| Set a figure and a date | The share you expect to keep the adaptation on, and the month you will look. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “more than 30% of the test learners have switched the adaptation off by the end of month 2”.
- Learn cheaply: a low-fidelity prototype tested with five to eight learners shows what you do not know before you build.
- Do not copy competitors because they use adaptive systems: you cannot see their evidence, and their data is not yours.
- Giving up nothing means you have not decided: name what you postpone, for example a model or an “AI-powered” label.
:::

:::note Extra · go deeper (optional reading)
Premortem: imagine the platform failed. Typical answers here: learners did not understand the adaptations, the system boxed people in after a few clicks, and the data was too thin. Each answer becomes a check.

One-way and two-way doors: adaptation behind a switch is a two-way door; a platform rebuilt around a model is a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · Gibbons 2018

