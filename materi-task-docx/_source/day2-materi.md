---
doc: materi
day: 2
kicker: DAY 2 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Successful platforms, prototyping, testing and adaptive learning
subtitle: Learn what makes a learning platform work, how to test an idea cheaply, and how to decide about adaptive technology
daytitle: Day 2 · Module 1 (day 2 of 2): Practical analysis of successful e-learning platforms, prototyping and testing of learning interfaces, future technologies and adaptive learning systems
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: Not yet published (the link will be added once Day 2 is deployed)
case: Worked examples use LearnLoop, an online-course provider. The task case is LearnPro, a stagnating learning platform (see the Task document).
intro: This document holds everything you need to study Day 2 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: prototype,low-fi,iterative,bml,think-aloud,kpi,qualitative,adaptive,recommendation,learning-analytics,personalisation,cold-start,over-engineering,ab-test,stage-gate,gdpr,ai-act,mvp,completion,dropout,engagement,learning-path,progress-indicator,feedback,usability-test,roadmap,decision-architecture,conflicting-goals,symptom,user-impact,stakeholder,e-learning,ai
refs: nielsen1994,iso9241210,gibbons2018,jordan2015,rettig1994,ries2011,nielsen2000,nielsenLandauer1993,kohavi2020,kulik2016,gdpr,aiAct,klein2007,bezos2016,brooke1996
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the success factors of e-learning platforms, to know the basics of prototyping and testing, and to classify adaptive systems. Level 2 asks you to analyse platforms, design prototypes and structure UX tests. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · What successful learning platforms have in common · 12 min · Core

> Learners finish platforms that show the way, break content into short units and answer every effort with feedback. Platforms that lack these lose learners early.

:::box In plain words
**The idea.** A learning platform is successful when learners start, carry on and finish, and then come back. The plan names three success factors: engagement (they do things), completion rate (they finish) and user guidance (they know where to go). Three practices appear again and again behind them: a clear learning path, microlearning (short units) and feedback systems.
**Why it matters.** In Task 1 you compare a platform that learners finish with one they leave. You will say which practice each difference belongs to, and then state the principles of success in your own words.
**How to read the picture.** The two columns show the same content built in two ways. Read each row from left to right: path, units, feedback, and what typically follows.
:::

![Same content, two designs. A typical contrast, not a measurement: the left platform shows the way, the right one makes the learner find it alone.](_figures/d2_a1_successful-vs-failing.png)

Let us look at the three practices one at a time, because each answers a question that every learner asks without saying it. A clear learning path answers "what do I do next?". Short units answer "can I do this in the time I have?". Feedback answers "am I getting somewhere, and did I get it right?". When one of the three is missing, the learner has to supply the answer alone, and many do not.

| Practice | What it does for the learner | What the learner meets when it is missing |
|---|---|---|
| **A clear learning path** | Shows the steps in order and which one is next | A list of lessons with no order, or a single long page with no navigation |
| **Microlearning** (short units) | Lets the learner finish one unit in a few minutes, each with one goal | One long lesson that needs 40 minutes in one sitting |
| **Feedback systems** | Shows progress and gives a result after each task | No sign of progress; the screen reloads silently after a quiz |

**What the research can and cannot tell us.** Jordan (2015) collected published completion figures for 221 open online courses with data from before 2015. The median completion rate was 12.6 percent. Longer courses had lower completion, courses that used only automatically graded assessment had higher completion, and the first two weeks were the most critical for engagement. This supports the three practices (short, structured, with quick feedback), but it describes open courses and older data, so it is evidence for a direction, not a benchmark for your platform.

:::rules How to decide when this comes up in the task
- Sort a platform feature by the question it answers: what comes next (learning path), how long will this take (short units), how am I doing (feedback). A feature that answers none of the three is probably not a success factor.
- A difference between two platforms is a *difference of practice* only if you can name which of the three practices it belongs to. "It looks nicer" is a UI difference, not a practice.
- Write a principle of success as a sentence with a reason: "Show the learner the next step, because a learner who has to search for it may stop."
- Engagement, completion and guidance are results and conditions, not features. Do not list "completion" as a difference between platforms; it is what the differences lead to.
:::

:::note Extra · go deeper (optional reading)
**Practices seen in well-known platforms (observation, not a study).** Language-learning apps such as Duolingo use very short lessons and an immediate result after each exercise, plus a streak counter that shows days in a row. Khan Academy shows skill progress as levels and gives instant feedback on exercises. Course platforms such as Coursera and edX arrange material in weekly steps with graded quizzes. These are design choices that are easy to see; whether each one causes better learning is a separate question that needs an evaluation, which is why Day 2 goes on to testing.
**UX as a driver of motivation and retention.** Motivation is the subject of Day 4. For today it is enough to see the link: a learner who sees a next step and a sign of progress has a reason to start the next unit, and a platform whose learners return has retention, which is what the business earns from (Day 1, Materi B1).
:::

^src: Jordan 2015 · Nielsen 1994 (visibility of system status, consistency)

## A2 · Prototyping: test the idea before you build it · 12 min · Core

> A prototype is a cheap, early version made to learn something. Test it as soon as it can answer a question, and no more finished than that.

:::box In plain words
**The idea.** A prototype is an early, simple version of a screen or a flow, made so that you can test an idea before you build the real thing. It can be a sketch on paper or a clickable mock-up. Low-fidelity means rough and plain, high-fidelity means polished. The purpose is quick validation, not perfection.
**Why it matters.** In Task 1 you decide how to prototype and test under time pressure and a limited budget, when the needs of users are still unclear. This card gives you the reasons for choosing a low-fidelity test first.
**How to read the picture.** The first picture is the loop of iterative design: build a small version, measure what learners do, learn from it, and repeat. The second is the fidelity ladder from sketch to high-fidelity prototype; time and cost rise to the right.
:::

![Build–Measure–Learn: the loop of iterative design.](_figures/d2_a2_build-measure-learn.png)

![The fidelity ladder. Climb only as far as the question you want answered needs.](_figures/d2_a2_fidelity-ladder.png)

:::note A short story: Sofia's course start screen
**Step 1.** Let us follow Sofia, a product designer at LearnLoop, an online-course provider. She has an idea for a new "course start" screen that shows the learning path with a Next button. Her team could build it in six weeks, but she is not sure that learners will notice the Next button.
**Step 2.** Instead of building, Sofia draws the screen on six paper cards. She asks five learners to "find your next lesson" and watches. Four of the five do not see the Next button, because it sits in the top corner where they never look. That took one afternoon and cost almost nothing.
**Step 3.** Sofia moves the button below the lesson list, redraws one card in ten minutes, and tests with five more learners. This time four of five find it at once. If she had built the screen first, the same finding would have meant reworking finished code.
**Step 4.** So prototyping is risk reduction, not design play. It lets you be wrong cheaply. You can now see why the plan says "quick validation instead of perfection".
:::

:::note Case assumption
LearnLoop, Sofia and the numbers of learners are made up for this example.
:::

| | Low-fidelity | High-fidelity |
|---|---|---|
| Looks like | Sketch, grey boxes | The finished product |
| Time and cost to make | Minutes to hours; almost nothing | Days to weeks; real money |
| Time and cost to change | Seconds to minutes | Hours to days |
| What testers talk about | Structure, order, wording | Colours, spacing, small details |
| Good for | Early questions: is the flow right? | Late questions: does the detail work? |
| Typical mistake | Dismissing it as "not a real test" | Polishing an idea nobody has tested |

**Typical mistakes.** The plan names two. *Testing too late:* the first contact with a user happens after the build, when changes are costly. *Thinking too complex:* the first prototype tries to hold the whole platform, when one question and one flow would have been enough.

:::rules How to decide when this comes up in the task
- Choose the fidelity by the question: structure, order and wording can be tested with paper or grey boxes; detail and look need a polished version, and only later.
- When user needs are unclear, test low-fidelity first. A polished prototype of an untested idea only makes the mistake more expensive.
- A prototype is a question in physical form. Write the question first ("can learners find the next step?"), then build the smallest version that can answer it.
- Say what a low-fidelity test cannot tell you: how the final look and speed feel. That is the next round, not a reason to skip the first.
:::

:::note Extra · go deeper (optional reading)
**Paper prototypes.** Rettig (1994) argued that paper prototypes let a team test ideas "at the speed of thought" and that people are more willing to criticise a sketch than a polished design, because a sketch looks changeable. That is one reason to show learners something rough.
**Iterative design is a standard, not a style.** ISO 9241-210 lists "the process is iterative" among its principles of human-centred design, and Ries's Build–Measure–Learn loop gives it a rhythm for product teams. The common thread: shorten the time from an idea to evidence about it.
:::

^src: Rettig 1994 · Ries 2011 · ISO 9241-210:2019

## A3 · Testing a learning interface: whom, how and what you measure · 14 min · Core

> Watch a few learners do a real task to learn why they struggle; count many learners to learn how often. Use both, in that order.

:::box In plain words
**The idea.** A usability test watches real users try a real task, for example "find your next lesson", while they say what they think. It is task-based and usually needs only a handful of users per group. Alongside it, you can measure numbers (KPIs) such as the drop-out rate, the time to finish a task and a comprehension score. Qualitative data says why; quantitative data says how many.
**Why it matters.** In Task 1 you choose three UX tests for a platform in which learners drop out and no one knows why. This card tells you what each kind of test can answer.
**How to read the picture.** The first picture shows how many problems a few test users find, in Nielsen and Landauer's model. The second sets qualitative and quantitative data side by side.
:::

![Share of usability problems found, in Nielsen and Landauer's model. The model assumes each user finds about 31% of the problems; it supports several small tests, not a single large one.](_figures/d2_a3_five-users.png)

![Two kinds of test data answer two different questions.](_figures/d2_a3_qual-vs-quant.png)

**Why five users are often enough for a first test.** Nielsen's argument (2000), based on the model of Nielsen and Landauer (1993), is that one user finds about 31 percent of the problems, three users about 65 percent and five users about 85 percent, because later users mostly repeat what earlier ones found. His advice is to run several small tests with about five users each, fixing problems in between, rather than one large test. The model has limits: it assumes problems are found independently and with similar likelihood, and it applies to a focused test of a single user group. If you test several groups (for example beginners and experts), plan a few users for each.

| KPI | It counts | Read it carefully, because |
|---|---|---|
| Drop-out rate per lesson | Where learners stop | It shows *where*, not *why*. It is a symptom. |
| Time on task | How long a task takes | A long time can mean confusion or deep reading; look at the task. |
| Comprehension score | Quiz or check result | A low score can mean unclear teaching or a badly written question. |
| Task success | Whether the learner completed the task | A success with a long detour is not the same as a quick success. |

:::rules How to decide when this comes up in the task
- Ask first which question the test must answer. *Why* do learners leave: watch or interview a few of them. *How many* leave and where: count in the data.
- A number such as a drop-out rate tells you where to look, not what to fix. Pair it with a test that shows the cause.
- Plan small, repeated tests with about five users per user group, not one large test; fix what you find, then test again.
- A KPI needs a baseline (today's value) and a target, written down before the test starts, so that you can say whether the change worked.
- Tracking learners is personal-data processing. Say what you collect, why, and on what legal basis (DSGVO / GDPR).
:::

:::note Extra · go deeper (optional reading)
**Experiments.** When a platform has enough learners, an A/B test shows two versions to similar groups at the same time and compares a metric. Kohavi, Tang and Xu (2020) stress that many ideas do not move the metric they were built to move, which is why a control group matters. For a platform with few learners, an A/B test may not be possible; then small qualitative tests carry the decision.
**Questionnaires.** A short standard questionnaire such as the System Usability Scale (Brooke 1996) gives a score from 0 to 100 and is useful to compare versions. Day 16 returns to analytics, KPIs and data-driven optimisation in detail.
**Data protection in testing.** Observation in a lab with consent is simple. Tracking on a live platform needs a purpose, a legal basis and, for access to a user's device, often consent. The rules for tracking are in flux and differ by technology; check the current guidance of the data-protection authorities before you plan it.
:::

^src: Nielsen 2000 · Nielsen & Landauer 1993 · Kohavi et al. 2020 · Brooke 1996 · GDPR (Regulation 2016/679)

## A4 · Adaptive learning: what it is, what it needs, what it risks · 10 min · Optional

> An adaptive system changes what a learner sees depending on what that learner does. It can help, but it depends on data and it is harder to explain.

:::box In plain words
**The idea.** Adaptive learning means the platform adjusts the next step, the difficulty or the order of content to the learner. The adjustment can follow a simple rule (if the pre-test is passed, skip the basics) or an algorithm that learns from data. Recommendation systems and learning analytics are tools for it. Adaptive systems can personalise, but they need data, content in several variants and a way to explain what they do.
**Why it matters.** The plan asks whether adaptive learning is worthwhile. This card gives you the opportunities and the risks, so that you can say "yes, no or partly" and give a reason.
**How to read the picture.** The loop shows how an adaptive system works: the learner acts, the system records it, a model chooses the next step, and the learner sees it. The last box, "and why it was suggested", is where transparency comes in.
:::

![How an adaptive system works, and where transparency comes in.](_figures/d2_a4_adaptive-loop.png)

| Level | How it decides | Needs | Typical risk |
|---|---|---|---|
| 1 · Learner choice | The learner picks the path from a menu | Content in clear options | Learners choose badly, or do not choose at all |
| 2 · Rules | "If pre-test score is at least 80%, skip unit 1" | A pre-test and a few rules | Rules that are too rough for some learners |
| 3 · Algorithms | A model trained on data picks the next step | Many learners, good data, content variants | Cold start, black box, bias, legal obligations |

**Opportunities.** Kulik and Fletcher (2016) reviewed 50 controlled evaluations of intelligent tutoring systems and found a median gain of 0.66 standard deviations over conventional teaching, which corresponds to moving the average learner from the 50th to the 75th percentile. The gain depended strongly on how the test was designed, so read the figure as "often helpful when well implemented and aligned with the objectives", not as a promise for every platform.
**Risks.** Complexity (more parts that can fail), data dependency (no data, no adaptation; the cold start problem), and transparency (a learner who cannot see why a step was chosen cannot judge it or correct it). In the European context, personal data is covered by the DSGVO, including limits on decisions taken only by automated means (Article 22). The EU AI Act treats AI systems in education that evaluate learning outcomes or steer the learning process as high-risk. The law applies in stages and is in flux, so check the dates before you plan.

:::rules How to decide when this comes up in the task
- Adaptive technology is worth considering when you have the data, the content variants and a clear problem that individual paths solve. Without them it is over-engineering.
- Start with the simplest level that answers the problem (rules before algorithms) and add complexity step by step, each step tested.
- Personalisation and transparency pull against each other. Whenever a system chooses for the learner, decide how the learner can see and change the choice.
- If the system evaluates learners or steers their learning, check the legal duties (DSGVO and the AI Act) before building.
:::

^src: Kulik & Fletcher 2016 · GDPR (Regulation 2016/679) · EU AI Act (Regulation 2024/1689), in flux

## A5 · Weighing a prototyping and testing decision: benefit, risk, effort · 12 min · Core

> When user needs are unclear and time is short, the cheapest test that gives real evidence usually beats both building at once and testing nothing.

:::box In plain words
**The idea.** To choose between ways of building and testing, rate each on the same three questions: benefit (how much do we learn or gain?), effort (money and time) and risk (what could go wrong?). Here a rule decides effort: under €10,000 is Low, up to €25,000 is Mid, above that is High. Then decide and say what could go wrong if you skip testing.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this under a time limit and a limited budget. The example below uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** The bars show the cost of three options. The coloured bands behind them are the effort rule. The dashed line is the budget. The table below the picture gives the rating of each option and the reason.
:::

![LearnLoop weighs three options. Cost against the effort rule and the budget (Case assumption).](_figures/d2_a5_options-cost.png)

:::note A short story: LearnLoop has €60,000 and three months
**Step 1.** Let us look at LearnLoop again. It wants to improve how learners start a course, it has €60,000 and three months, and it does not yet know what learners need. Three options are on the table. We rate each on benefit, effort and risk.
**Step 2 · Option B, a low-fidelity test first.** It costs €8,000 and takes three weeks, so the effort is Low. The benefit is High, because after three weeks LearnLoop knows what works. The risk is Low: little money is spent and nothing is locked in. What it does not give is a finished product, so the build still comes afterwards.
**Step 3 · Option A, a high-fidelity prototype now.** It costs €36,000, so the effort is High. The benefit is Mid: LearnLoop learns something, but it learns it from a polished prototype of an untested idea. The risk is Mid: if the idea is wrong, a large part of the budget is gone and the team may defend the prototype because it looks so good.
**Step 4 · Option C, build directly.** It costs €54,000, so the effort is High, and nothing is learned before launch. The benefit is Low, and the risk is High: LearnLoop finds out about problems from learners who leave, and rework would use up the rest of the budget. Without testing, a wrong assumption is discovered at the most expensive moment.
:::

| LearnLoop option | Benefit | Effort | Risk |
|---|---|---|---|
| **A · High-fidelity prototype now** · €36,000 | **Mid.** Real learning, but from a polished version of an untested idea. | **High.** €36,000 is above €25,000. | **Mid.** If the idea is wrong, most of the budget is spent; the polish makes it hard to drop. |
| **B · Low-fidelity test first** · €8,000 | **High.** Clear evidence on structure and flow in three weeks. | **Low.** €8,000 is under €10,000. | **Low.** Small money, nothing locked in; the build still has to follow. |
| **C · Build directly, no test** · €54,000 | **Low.** No evidence before launch. | **High.** €54,000 is above €25,000. | **High.** Problems are found by learners who leave; rework would use the rest of the budget. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €10,000 is Low; €10,000 to €25,000 is Mid; above €25,000 is High. Do not judge it by how hard it feels.
- Rate benefit by what you will know afterwards that you do not know now. An option that teaches nothing before the money is spent has a low benefit, however finished it looks.
- Rate risk by what happens if the assumption is wrong: how much is spent, how much can be undone, and who finds out first, you or the learner.
- Without testing, the risks are: building the wrong thing, finding out late, spending the budget on rework, and learners leaving before you know why. Name at least the ones that apply to your case.
- Decide, and say what you do not know. A decision with a stated gap is stronger than one that pretends there is none.
- To decide whether adaptive learning is worthwhile, ask three things: is there a learner problem that individual paths solve, is there enough data of good quality, and are there content variants to adapt to? Without them it is over-engineering. Start with the simplest level (a rule) and add complexity step by step. Say "yes", "partly" or "no", and name the first step.
:::

^src: Gibbons 2018 (NN/g) · Rettig 1994 · Ries 2011

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to assess and prioritise investments in UX, testing and adaptive systems strategically. Materi B teaches the three things Task 2 asks: treat an investment as a staged bet (B1), weigh the conflicting goals around technology (B2), and decide under uncertainty (B3). The worked examples use LearnLoop.
:::

## B1 · UX investments as staged bets · 18 min · Core

> Spend a little to learn, and let the evidence decide the next amount. A big commitment before the evidence is a gamble.

:::box In plain words
**The idea.** A management decision about UX is a decision about where to put money and time: prototypes and tests, analytics, personalisation, artificial intelligence, a new look. Each one is a bet. A staged investment spreads the bet: a small first stage, then a gate with a figure written down in advance, then the next stage only if the gate is passed.
**Why it matters.** Task 2 puts you in the chair of a Chief Product Officer whose competitors use AI and adaptive systems, whose own platform is outdated, whose budget is limited and whose data is incomplete. You will decide whether to invest, how to test, and in what order.
**How to read the picture.** The chain runs left to right: stage 1, a gate, stage 2, a gate, stage 3. Each gate asks a question with a number. Read what happens when a gate is missed: the stage is changed or stopped.
:::

![Stage the investment: money follows evidence. Gates carry a figure and a date written down before the stage starts.](_figures/d2_b1_staged-investment.png)

Let us look at where money tends to go wrong, because the plan asks "where is money being invested wrongly?". There are four common patterns. *Building before validating:* a full build comes first and the first test comes after launch. *Following the hype:* a competitor announces AI, so the company announces AI, without a problem it solves. *Investing in the surface:* a new look is paid for when the problem is structure. *Investing without data foundations:* an adaptive engine is bought for a platform that records almost nothing about its learners.

| Type of investment | What the evidence must show before the next stage |
|---|---|
| Prototyping and testing routine | Tests find problems that the team did not expect; fixes raise task success |
| Analytics and learning dashboards | The team can name decisions the data will change, and has a legal basis for collecting it |
| Rule-based personalisation (pilot) | A pilot with a control group raises completion by an agreed amount |
| Algorithmic recommendations or AI | Enough learners and data of good quality; a clear explanation for learners; legal check done |
| A new visual style | Tests show that the look, not the structure, is what learners complain about |

:::rules How to decide when this comes up in the task
- Treat every investment as a bet and write down, before the money is spent, what figure would make you continue and what would make you stop.
- Fund the cheapest stage that gives evidence first. The answer to "do we invest in adaptive learning?" is often "partly": one small, tested step, with the rest waiting for its gate.
- Do not buy technology because competitors have it. Name the learner problem it solves and show that a simpler measure does not.
- Check the data foundation before the technology: if the platform cannot record what an algorithm needs, the first investment is the foundation.
:::

:::note Extra · go deeper (optional reading)
**Validated learning.** Ries calls the evidence that a stage produces "validated learning": knowledge about what customers actually do, not what the team believes. A gate turns that learning into a decision.
**The cost of the late test.** Many teams find that a problem found in a paper test is fixed in minutes, and the same problem found after launch is fixed in a release cycle. The cost does not grow by a fixed factor, but the direction is reliable: the later you find it, the more it costs to change. This is the business case for the testing routine in the first row of the table.
:::

^src: Ries 2011 · Kohavi et al. 2020 · Gibbons 2018 (NN/g)

## B2 · Conflicting goals: personalisation, hype and scale · 22 min · Core

> Technology decisions pull goals apart. Name the conflict in one sentence, say what each side gets and loses, then decide.

:::box In plain words
**The idea.** The plan names three conflicts for Day 2. *Personalisation against transparency:* the more the system decides for the learner, the harder it is to explain. *UX against technology hype:* a good experience may need a simple fix, while the market pushes for the newest technology. *Scalability against simplicity:* a solution that works for ten thousand learners may be too heavy for a platform with three hundred.
**Why it matters.** Block 3.1 and Block 3.2 of the task ask you to prioritise a roadmap and to take one decision under uncertainty. The rules of this card tell you how to argue each choice.
**How to read the picture.** The matrix places six features of a learning platform by the value they give the learner (left to right) and by the data and complexity they need (bottom to top). The position is a reading of the example, not a score. Features at the bottom right give a lot for little; features at the top need a lot of data and complexity.
:::

![Six features of a learning platform by value to the learner and the data and complexity they need. LearnLoop example, Case assumption.](_figures/d2_b2_value-vs-data.png)

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| **Personalisation against transparency** | Steps that fit each learner | A learner who can see and challenge why a step was chosen | Personalise only as far as you can explain it. Show the reason next to the suggestion and let the learner change it. |
| **UX against technology hype** | The newest technology, a market story | A fix that solves the learner's problem now | Start from the problem. If a simple measure answers it, the technology has to prove it adds more. |
| **Scalability against simplicity** | A solution that grows with the platform | A solution the team can build, test and maintain today | Build what you need for the next stage. Plan the growth path, but do not pay for it before the gate. |

:::rules How to decide when this comes up in the task
- Name each conflict in one sentence and say what each side gets and what it loses. A plan that names no loser has not weighed anything.
- Place a feature by two questions: how much does it help the learner, and how much data and complexity does it need? Start with what gives most for least.
- Technology is justified by a learner problem and by evidence that simpler measures fall short, not by what competitors announce.
- For every personalised feature, write down how a learner sees why it was chosen and how they can change it. If you cannot, delay the feature.
:::

:::note Extra · go deeper (optional reading)
**Transparency is also a legal theme.** Under the DSGVO, a person has a right to meaningful information about the logic involved in automated decisions with significant effects, and the EU AI Act adds transparency duties for some AI systems. Whether a given adaptive feature falls under these rules depends on what it decides; ask the data-protection officer early.
**"Partly" is a real answer.** The plan asks "yes, no or partly?". Partly means that you commit to the part that the evidence supports (for example rule-based personalisation in one course) and say which parts wait and why.
:::

^src: GDPR (Regulation 2016/679) · EU AI Act (Regulation 2024/1689), in flux · Kulik & Fletcher 2016

## B3 · Deciding under uncertainty: pilots, gates and a rule for next time · 20 min · Core

> When you must decide without the data you want, choose a decision you can test and undo, write down when you would stop, and name what you give up.

:::box In plain words
**The idea.** The plan asks you to deliberately make one decision under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also fix how future decisions are made: who decides and what evidence they need.
**Why it matters.** Block 3.2 asks for exactly this, for a platform with incomplete data. A pilot with a control group is the standard way to turn an unknown into evidence.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Read from left to right.
:::

![The four parts of a decision made without complete data, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d2_b3_decision-frame.png)

- **Prefer the reversible step.** A pilot of one rule-based step in one course can be switched off. An algorithmic engine for the whole platform is much harder to undo. When the evidence is thin, choose the first kind.
- **Write the reversal condition with a figure and a time:** "pilot completion is not at least five points above the control group after eight weeks". A feeling ("if it does not work") cannot be checked.
- **Name the data you do not have.** If the data situation is incomplete, the first decision may be about data: what to record, with what legal basis, for how long.
- **Fix the decision rule.** Name who decides (a role, not a person) and the evidence they need (a test, a pilot, drop-out data), so that the next decision does not rest on the loudest opinion.

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition is checkable only with a figure and a time. Set it before the pilot starts.
- Prefer the decision you can undo cheaply while you learn; let the expensive, hard-to-undo decisions wait for their gate.
- A rule for future UX decisions names who decides and what evidence they need. An opinion, even a senior one, is not evidence.
- Giving up nothing means you have not decided: name what you postpone, for example the recommendation engine.
:::

:::note Extra · go deeper (optional reading)
**One-way and two-way doors.** Bezos separated decisions that are hard to reverse from those that can be reversed cheaply. A pilot is a two-way door; an irreversible platform replacement is a one-way door. Use the care you save on the first kind for the second.
**A premortem for technology bets.** Klein's premortem asks the team to imagine the investment has failed a year from now and to list why. For adaptive learning the usual answers are: the data was too thin, learners did not understand why steps were chosen, and the legal check came too late. Each answer becomes a gate or a condition in the plan.
:::

^src: Klein 2007 · Bezos 2016 · Kohavi et al. 2020 · Ries 2011
