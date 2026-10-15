---
doc: materi
day: 16
kicker: DAY 16 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: UX testing, analytics and KPIs
subtitle: Fundamentals of UX testing, analytics tools and tracking, KPIs and metrics, data analysis and data-driven optimisation
daytitle: Day 16 · Module 8 (1 day): Fundamentals of UX testing, analytics tools and tracking, KPIs and metrics, data analysis and data-driven optimisation
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use LearnLoop, an online-course provider. The task case is DataLearn, lots of data but no improvement(see the Task document).
intro: This document holds everything you need to study Day 16 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: tracking,heatmap,cohort,vanity-metric,consent,hypothesis,dropout,kpi,rule-based,completion,qualitative,usability,symptom,ab-test,decision-architecture,machine-learning,engagement,usability-test,gdpr,conflicting-goals,premortem,bml,return-rate,heart,touch-target
refs: nielsen2000,kohavi2020,rodden2010,gdpr,croll2013,few2013,ries2011,gibbons2018,klein2007,bezos2016
---
[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · UX testing: usability tests, A/B tests and observation, qualitative and quantitative · 14 min · Core

> UX testing shows how people really behave. Quantitative tests (counting, A/B) say how many and which is better; qualitative tests (watching a few) say why. You usually need both.

:::box In plain words
**The idea.** UX testing finds out how people really behave with a product, so that it can be improved. Three common methods are the usability test (watching people do tasks), the A/B test (comparing two versions with real users) and observation. Qualitative tests, such as watching a few people, tell you why. Quantitative tests, such as counting many people, tell you how many.
**Why it matters.** In Task 1 you need to tell what a number can show from what only watching can show, and in Block 2.2 you choose tests.
**How to read the picture.** One LearnLoop drop-out figure seen three ways: as a number only, by watching a learner, and by comparing two versions.
:::

![One LearnLoop drop-out figure seen as a number, by watching, and by comparing.](_figures/d16_a1_0.png)

**The point.** UX testing finds out how people really behave. Quantitative methods, such as counting or an A/B test, tell you how many and which version is better. Qualitative methods, such as watching a few people, tell you why. You usually need both.

**A short story in steps.**

1. **A number with no reason.** Let us look at LearnLoop. Its report says that 70% of new learners leave in the first week. The figure is clear and it is alarming, but it only says how many. The team has no idea why, and any change it makes now is a guess.
2. **Watching one learner.** Now a researcher watches Sam do the first quiz. He stops at question seven and looks around for a Save button that is hidden below the fold. That is qualitative testing: a few people, and a real reason. It does not say how many are affected.
3. **Comparing two versions.** So LearnLoop shows half of the learners a version with the button in view, and compares. 70 of 100 stay, against 62 of 100 with the old version. That is quantitative testing, an A/B test: now the team knows how much the change helps.

| State shown in the picture | What it means |
|---|---|
| The number | 70% leave in the first week. That is clear and it matters, and it says nothing about why they leave. |
| Watch a learner | watching Sam, the team sees him stop at the quiz because he cannot find the Save button. That is a reason, though from only one person. |
| Compare two versions | the quiz with a visible Save button keeps 70 of 100 learners against 62 of 100. The team now knows the change works, and by how much. |

*Three test methods, and what each shows*

| Method | Kind | What it shows |
|---|---|---|
| Usability test | Qualitative | Where and why a few people get stuck. |
| A/B test | Quantitative | Which of two versions does better, and by how much. |
| Observation | Qualitative | How people behave in their real setting. |

:::note Case assumption
LearnLoop and Sam are made up for this example. The rule of thumb of five users for a usability test is Nielsen's, and the A/B test is described by Kohavi and colleagues; check the figures before you use them in a document.
:::

:::rules How to decide when this comes up in the task
- Use a usability test to find where and why people get stuck: five to eight learners do set tasks while someone watches.
- Use an A/B test to find which of two versions works better: the same learners are split at random and the figures compared.
- Use observation to learn about real contexts, for example how people use the platform on their own phones.
- Say which kind it is: qualitative gives reasons from few people; quantitative gives amounts from many. A figure alone never says why.
- Combine the two: use figures to find where, and watching to find why.
:::

:::note Extra · go deeper (optional reading)
An A/B test needs enough learners in each group for the difference to mean something. A small difference between 20 and 22 learners is noise, so the size of the groups belongs in the plan.
:::

^src: Nielsen 2000 · Kohavi et al. 2020 · Rodden et al. 2010

## A2 · Tracking and KPIs: what to measure, how to define it, and what data protection asks · 14 min · Core

> Tracking records clicks, time and drop-off; data protection sets limits. A KPI is one key figure with a definition and a target, such as completion rate, engagement or drop-out rate.

:::box In plain words
**The idea.** Tracking records what users do: clicks, time spent and the points where they drop off. Analytics tools and heatmaps show it, and data protection and ethics set limits on what may be collected. A KPI is one key figure chosen to show whether you reach a goal, such as completion rate, engagement or drop-out rate. A KPI needs a definition and a target.
**Why it matters.** In Block 1.1 you sort facts into measuring problems, and in Block 2.2 you define three KPIs. This card gives the tests.
**How to read the picture.** One LearnLoop dashboard with four features that can be on or off: only three KPIs, a definition under each, a target, and a split by device.
:::

![One LearnLoop dashboard and four fixes.](_figures/d16_a2_0.png)

**The point.** A KPI is one key figure chosen to show whether a goal is reached. It works when there are only a few, each has a definition and a target, and the figure can be split to show where the problem is. Many undefined metrics hide the one that matters.

**A short story in steps.**

1. **A wall of metrics.** Let us follow Mia, a product manager at LearnLoop, who opens the dashboard on Monday. She sees dozens of small metrics. None is marked as the one that matters, none says what it counts, and none has a target, so she cannot tell whether last week was good or bad.
2. **Three KPIs that can be judged.** Now the dashboard shows three KPIs: completion, first-week drop-out and seven-day return. Each says what it counts and has a target, and the drop-out is split by device. Mia sees at once that 70% leave and that phones are worse.
3. **One at a time.** A team can do these in steps. Block 2.2 asks you to define three KPIs, and a measure to do the same.

| Switches | What it means |
|---|---|
| All off | 0 of the 4 fixes are on. A wall of small metrics, and none stands out. Nothing shows where the drop-out concentrates. |
| All on (Only three KPIs, A definition under each, A target for each, A split by device) | 4 of the 4 fixes are on. Three numbers stand out, so Mia knows where to look. Each says what it counts. Each has a target, so it can be judged. Splitting by device shows that phone learners leave more. |

*Three common KPIs, how to define each, and a trap*

| KPI | A definition | A trap |
|---|---|---|
| Completion rate | Learners who finish a course, out of those who started it. | Counting only those who stayed to the end. |
| Engagement | A stated behaviour, for example learners who return within seven days. | Defining it as clicks, which may mean nothing. |
| Drop-out rate | Learners who leave within a stated time, out of those who started. | Leaving the time frame open, so figures cannot be compared. |

:::note Case assumption
LearnLoop and Mia are made up for this example. The HEART framework (Rodden et al. 2010) is one way to choose UX metrics; the GDPR sets the rules for personal data in the EU, and which apply to a case depends on the data, so check before relying on it.
:::

:::rules How to decide when this comes up in the task
- Sort a fact as a measuring problem when the trouble is in what is tracked or how it is defined: too many metrics, a metric with no definition, a metric that does not measure what its name says, tracking beyond need or without notice.
- Define a KPI with a name, a definition (what exactly is counted) and a target; keep the main ones to about three.
- Prefer KPIs that show an outcome and tie to behaviour: completion rate, first-week drop-out rate, seven-day return rate. Page views and total registered users show use or only rise.
- Check that a metric measures what it claims: engagement as a count of clicks, or time spent as the time a tab is open, may not show attention or learning.
- Collect only what a question needs, tell users what is tracked and get consent where it is required (GDPR); tracking with names and no notice is a problem.
:::

:::note Extra · go deeper (optional reading)
A heatmap shows where people click or how far they scroll on a page, as colour. It shows where, not why, so it is a starting point for a question and not an answer. A vanity metric is a number that looks good and does not guide a decision, such as total registered users.
:::

^src: Rodden et al. 2010 · GDPR · Croll and Yoskovitz 2013 · Few 2013

## A3 · Reading data: patterns, symptoms and causes, misreadings and hypotheses · 12 min · Core

> Data shows symptoms, not causes. Look for several possible causes, never jump from a number to an explanation, compare only like with like, and turn a guess into a testable hypothesis.

:::box In plain words
**The idea.** Reading data means finding patterns and then looking for causes, not only symptoms. A symptom is what the data shows, such as 70% drop-out. A cause is why, and the data alone rarely says it. Misreadings come from jumping from a number to an explanation, and from comparing periods that are not alike. A hypothesis is a testable guess: we believe …, so we will …, and expect ….
**Why it matters.** Task 1 asks for causes of a 70% drop-out rate, and Block 1.1 asks which fact jumps from a symptom to a cause. This card is the test for both.
**How to read the picture.** The same LearnLoop figure read three ways: as a jump to one cause, as a list of possible causes, and as a hypothesis that is tested.
:::

![The same LearnLoop figure read as a jump, as a list of causes, and as a tested hypothesis.](_figures/d16_a3_0.png)

**The point.** Data shows symptoms, not causes. A symptom such as 70% drop-out has many possible causes. Jumping to one of them without a test is the commonest misreading. A hypothesis, a testable guess, turns a guess into something that can be checked.

**A short story in steps.**

1. **The jump.** Let us look at a LearnLoop report: 70% of learners leave in the first week, so the content must be too hard. The team rewrites three lessons over two months. The drop-out stays at 70%, because “too hard” was a guess that nobody had checked.
2. **Keeping the question open.** A better reading lists what else could cause it: a long sign-up form, a slow page, a course that is not what people expected, and too-hard content as one entry among them. Short time spent fits all of these, so the number alone cannot choose.
3. **A guess that can be checked.** Then the team writes one cause as a hypothesis: we believe the form is too long, so we cut it to three fields and expect completion to rise. It tests it with half of the learners, and the result is 47% against 40%.

| State shown in the picture | What it means |
|---|---|
| A jump to one cause | the team reads 70% and says the content is too hard. Nothing was checked, so the team rewrites three lessons and the drop-out does not move. |
| A list of causes | the same 70% could come from content that is too hard, a long sign-up form, a slow page or a course that is not what people expected. The list keeps the question open. |
| A tested hypothesis | the team picks one cause, writes it as a hypothesis and tests it. A form with three fields keeps 47% against 40%, so the form is a real cause. |

*Three misreadings, and how to avoid each*

| Misreading | Example | How to avoid it |
|---|---|---|
| A symptom taken for a cause | “70% leave, so the content is too hard.” | List several causes and test one. |
| Unlike periods compared | A rise called a success; last month had a holiday. | Compare like with like. |
| Many changes at once | Five launches in a month; which one worked? | One change per cycle, with a hypothesis. |

:::note Case assumption
LearnLoop and its figures are made up for this example. The idea of turning a guess into a testable hypothesis follows the lean approach of build, measure, learn (Ries 2011).
:::

:::rules How to decide when this comes up in the task
- Sort a fact as a reading problem when a conclusion is drawn that the data does not support: a symptom taken for a cause, or two periods compared that are not alike.
- Tell a symptom from a cause: a symptom is what the data shows (70% leave); a cause is why, and the data alone rarely says it.
- Before acting, list several possible causes for a number, such as a long form, a slow page or a mismatch with expectations, and only then choose which to test.
- Compare like with like: the same weekdays, the same type of learner, no holiday against a normal period.
- Write a hypothesis in the form “we believe …, so we will …, and expect …”, with a figure, and change one thing at a time so that the effect can be seen.
:::

:::note Extra · go deeper (optional reading)
Correlation is not causation: two figures that move together may both be driven by a third. A rise in logins and a rise in drop-out in the same month may both come from a marketing campaign that brought many casual visitors.
:::

^src: Ries 2011 · Kohavi et al. 2020 · Nielsen 2000

## A4 · Data-driven optimisation: hypothesis, test, evaluate, repeat · 10 min · Optional

> Data-driven optimisation is a loop: hypothesis, test, evaluate, decide, and back to a new hypothesis. One change at a time, with each result starting the next guess.

:::box In plain words
**The idea.** Data-driven optimisation is a loop. You develop a hypothesis, test it, evaluate the result and decide what to do next, and the result starts the next hypothesis. It is continuous improvement: small steps, one change at a time, so that the effect of each can be seen.
**Why it matters.** Block 3.1 asks for hypotheses and a decision architecture. The core of the loop is repeated in A3 and B1, so no Core block needs this card.
**How to read the picture.** A loop of four steps: hypothesis, test, evaluate, decide.
:::

![.](_figures/d16_a4_0.png)

:::note Case assumption
LearnLoop is the example company.
:::

:::rules How to decide when this comes up in the task
- Run the loop in short cycles of about two weeks, one change each.
- Decide by a rule agreed in advance: keep, change or drop the change.
- Keep going: every result starts the next hypothesis.
:::

:::note Extra · go deeper (optional reading)
A decision rule agreed before the test, such as “keep the change if first-week drop-out falls by at least three points”, stops the team from arguing about the result afterwards.
:::

^src: Ries 2011 · Kohavi et al. 2020

## A5 · Weighing a data-based measure: KPI impact, effort, risk · 10 min · Core

> Rate a measure by how much it would move the KPI or the team's ability to move it, what it costs and what could go wrong. Define what matters first, then look for causes, and show data last.

:::box In plain words
**The idea.** To choose between data-based measures, rate each on the same three questions. KPI impact: how much would it move the drop-out rate or the completion rate, or the team's ability to do so? Effort: money and time, decided here by a rule: under €7,000 is Low, up to €14,000 is Mid, above that is High. Risk: what could go wrong, for example that the team reads the data wrongly again.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €30,000 budget, and the table gives the rating of each.
:::

![A worked example: LearnLoop weighs three data-based measures.](_figures/d16_a5_0.png)

**The point.** Rate a measure by how much it would move the KPI or the team's ability to move it, by its printed cost, and by what could go wrong. Defining three KPIs is cheap and prepares everything else. A wall of charts costs a lot and moves no KPI.

**A short story in steps.**

1. **The setting.** Let us look at LearnLoop once more. Learners leave early, the budget is €30,000, and three ideas are on the table. We rate each on three questions: how much it would move the KPI (KPI impact), what it costs (effort), and what could go wrong (risk).
2. **Three KPIs.** Defining three KPIs costs €5,000, so the effort is Low. The team finally knows which number to move, so the KPI impact is High, and the risk is Low because it only agrees definitions. Five usability tests cost €12,000, Mid effort, with Mid impact and Mid risk.
3. **A wall of charts.** The wall dashboard costs €26,000, so the effort is High. It shows more numbers but no new insight, so the impact is Low, and the risk is High because it adds noise and looks like action. So: define what matters first, look for causes next, show data last.

| Measure (LearnLoop, Case assumption) | Cost | Effort | KPI impact | Risk | Reasons |
|---|---|---|---|---|---|
| Define three KPIs with a target each | €5,000 | Low | High | Low | Effort: €5,000 is under €7,000: Low. KPI impact: The team finally knows which number to move and when it has succeeded. Risk: It only agrees definitions and targets. |
| Five usability tests where learners leave | €12,000 | Mid | Mid | Mid | Effort: €12,000 lies between €7,000 and €14,000: Mid. KPI impact: It finds real causes for the screens tested, though only for those screens. Risk: Five learners show the main hurdles, not every one. |
| A real-time wall dashboard with forty charts | €26,000 | High | Low | High | Effort: €26,000 is above €14,000: High. KPI impact: More charts show more numbers, but no new insight into why learners leave. Risk: It adds to the noise, and the team may feel it is acting on data when it is only looking. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €7,000 is Low; €7,000 to €14,000 is Mid; above €14,000 is High.
- Rate KPI impact by how far it would move the drop-out or completion rate, or the team's ability to do so: a measure that fixes a cause or sharpens the KPI outweighs one that only shows more numbers.
- Rate risk by what could go wrong: the team reading the data wrongly again, noise from more charts, a test on too few learners, a privacy problem.
- Justify the order with data, then insight, then decision: say how your first measure turns data into an insight.
- Say what you do not know, for example where the drop-out concentrates, and how you would find out.
:::

^src: Gibbons 2018 · Rodden et al. 2010

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.
:::

## B1 · UX as a measurable and controllable system: KPI, hypothesis, test, decision · 18 min · Core

> UX can be a measurable and controllable system: a KPI says what matters, a hypothesis says what will change it, a test checks the guess, and a decision follows. Data leads to insight, and insight to a decision.

:::box In plain words
**The idea.** The plan's goal is to understand UX as a measurable and controllable system. A data-driven strategy chains four things: a KPI that says what matters, a hypothesis that says what will change it, a test that checks the guess, and a decision that follows from the result. The plan's rationale is data, then insight, then decision.
**Why it matters.** Task 2 asks for the central KPIs, an analysis and tracking strategy, hypotheses and a decision architecture. This chain gives you the order.
**How to read the picture.** The chain reads from left to right: KPI, hypothesis, test, decision. Below it, the test for each link.
:::

![A data-driven system: KPI, hypothesis, test, decision.](_figures/d16_b1_0.png)

*The test for each link of the chain*

| Link | The test | What goes wrong without it |
|---|---|---|
| KPI | Does it have a name, a definition and a target? | Nobody knows what to move. |
| Hypothesis | Does it name a change and an expected effect? | The test has nothing to answer. |
| Test | One change at a time, with a comparison? | Effects cannot be told apart. |
| Decision | Is the rule agreed before the result? | The result is argued about afterwards. |

:::note Case assumption
The chain follows the plan's goal: understand UX as a measurable and controllable system. LearnLoop is the example company. Data protection rules apply to tracking; for a real case they must be checked.
:::

:::rules How to decide when this comes up in the task
- Decide on a strategy that starts from a question: define three KPIs, write a hypothesis for each change, change one thing at a time, and track only what the hypotheses need. Reject “track everything” (it repeats the misreading and is a privacy risk) and “decide on intuition” (it gives up the measurable system).
- Plan the analysis and tracking: split drop-out by week, device and course; combine numbers with tests with real learners; tell users what is tracked and get consent; write down each KPI's definition and owner.
- Sort a statement as a testable hypothesis only if it names a change and an expected effect, ideally with a figure; “we should improve the UX” and “the new menu is better” are not hypotheses.
- Build a decision architecture: a role decides, on a named figure or test, by a rule agreed before the result, and says what intuition still decides.
- Say what you do not know and how to find out: which screen causes most of the drop-out.
:::

:::note Extra · go deeper (optional reading)
A decision architecture is the set of agreements about who decides what, on which evidence and by which rule. It makes decisions repeatable, so that they depend less on whoever is in the room.
:::

^src: Ries 2011 · Rodden et al. 2010 · GDPR · Kohavi et al. 2020

## B2 · Conflicting goals: data against intuition, more data against more insight · 22 min · Core

> More data is not more insight, and intuition alone is not enough. Look for an approach that uses enough data and gives a real insight into causes; data is a basis for decisions, not a substitute for thinking.

:::box In plain words
**The idea.** The plan's discussion for Day 16 is data against intuition, and UX as a measurable system. More data is not more insight: a wall of charts can hide the question. Intuition is not useless either: data shows what happened, and judgement still decides what to try and what the product stands for. The aim is data as a basis for decisions, not a substitute for thinking.
**Why it matters.** Task 2 asks for a risk analysis and a decision architecture. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places six LearnLoop approaches by the amount of data they use (to the right) and the insight into causes they give (upwards). The position is a reading of the example, not a score. The top right is the aim.
:::

![A worked example: six LearnLoop approaches by the data they use and the insight into causes they give.](_figures/d16_b2_0.png)

**The point.** More data is not more insight, and intuition alone is not enough. Look for the approach that uses enough data and gives a real insight into causes. Data shows what happened; judgement still decides what to try.

**A short story in steps.**

1. **Too much data, too little insight.** Let us look at LearnLoop's approaches. Tracking everything and searching for patterns collects a mountain of data and answers no question, and a wall of forty charts only looks like insight. On the other side, deciding by gut feeling uses no data at all.
2. **A small amount of data, aimed.** Three KPIs, a written hypothesis and one test use little data and answer one question well. With a few learner interviews added, the numbers say where and the learners say why. That is the aim: enough data, and real insight.
3. **Data against intuition.** Data does not replace thinking: someone still decides which hypothesis to test first and what the product stands for. And an easy number such as time on page can mislead.

| Point | The idea | Why it sits there |
|---|---|---|
| A | Track everything and look for patterns | A great deal of data and no question, so the patterns found mean little. Heavy and blind. |
| B | Decide by gut feeling alone | No data and no test: the team cannot tell whether a guess was right. Light and blind. |
| C | Three KPIs, a hypothesis and a test | Little data, aimed at one question, and a test that answers it. A real insight into a cause. This is the aim. |
| D | The numbers plus five learner interviews | The data says where, and the interviews say why. A good combination of numbers and UX understanding. |
| E | A real-time wall of forty charts | A great deal on show and little understood: it looks like insight and gives none. |
| F | “Time on page” as the only KPI | One number that is easy to collect and misleading: a tab left open overnight counts as success. Light and misleading. |

*Two conflicts and a rule for deciding each*

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| Data against intuition | Decisions by figures alone | Decisions by judgement alone | Use data as the basis; keep judgement for what data cannot say. |
| More data against more insight | Track and show everything | A few figures tied to a question | Collect only what a hypothesis needs. |

:::note Case assumption
LearnLoop and its six approaches are made up for this example. The positions in the picture are a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name both poles: too much data and no question (a wall of charts, tracking everything), and no data at all (gut feeling). A plan that names only one pole has not weighed the conflict.
- Aim for little data aimed at a question: three KPIs, a hypothesis, a test; add learner interviews to learn why.
- Beware a single easy number, such as time on page: it can mislead, so pair every KPI with an outcome.
- Keep judgement where data cannot decide: which hypothesis to test first, how a message should sound, what the product stands for.
:::

:::note Extra · go deeper (optional reading)
Optimising a metric can harm the goal behind it: if time on page is rewarded, pages get slower. The remedy is to pair each KPI with an outcome and with a test, so that the number cannot rise alone.
:::

^src: Rodden et al. 2010 · Ries 2011 · Klein 2007

## B3 · Deciding when the causes are unclear: a decision you can check later · 20 min · Core

> When the causes are unclear, test the most likely one cheaply, write a figure you can watch into the plan, agree the decision rule before the result, and say what you give up.

:::box In plain words
**The idea.** The plan asks you to decide although the causes of the decline are unclear. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A small test of the most likely cause is the cheapest way to learn what you do not know.
**Why it matters.** Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![A decision with unclear causes, filled in for LearnLoop.](_figures/d16_b3_0.png)

*Five ways to make a decision with unclear causes safer*

| Way | What it looks like |
|---|---|
| Test the likely cause cheaply | A shorter sign-up form for half of the learners, compared with the rest. |
| Agree the rule first | “Keep it if drop-out falls by five points.” Written down before the test. |
| Set a figure and a date | The drop-out you expect, and the month you will look. |
| Fix who decides | A role, with the evidence it needs. |
| Name what you give up | Something real that someone would miss. |

:::note Case assumption
LearnLoop and its figures are made up for this example; the task case is in the task.
:::

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure you can watch and a time: “first-week drop-out has not fallen from 60% to below 55% by the end of month 2”.
- Start with the most likely and cheapest cause to test, such as the sign-up form, and agree what result would count as success before you look.
- Do not wait for perfect data: waiting while drop-out grows is also a decision.
- Giving up nothing means you have not decided: name what you postpone, for example a new tool or a live dashboard.
:::

:::note Extra · go deeper (optional reading)
Premortem: imagine the strategy failed. Typical answers here: we misread the data again, we collected more than anyone could read, and we optimised a number and not the learner. Each answer becomes a check.

One-way and two-way doors: a test behind a switch is a two-way door; storing every click for good is a one-way door that is hard to undo.
:::

^src: Klein 2007 · Bezos 2016 · Kohavi et al. 2020

