---
doc: materi
day: 4
kicker: DAY 4 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Motivation and engagement through design
subtitle: Understand what motivates learners, design for lasting engagement, and evaluate it without sliding into manipulation
daytitle: Day 4 · Module 2 (day 2 of 2): Motivation and engagement through design psychology, design principles for effective learning experiences, evaluation and optimisation of learning-psychology-based UX concepts
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: Not yet published (the link will be added once Day 4 is deployed)
case: Worked examples use LearnLoop, an online-course provider. The task case is MotivaLearn, a platform with low user retention (see the Task document).
intro: This document holds everything you need to study Day 4 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: intrinsic-motivation,sdt,overjustification,fogg,flow,goal-setting,goal-gradient,reinforcement,dark-pattern,perverse-incentive,hypothesis,activation,return-rate,gamification,badge,leaderboard,progress-indicator,feedback,engagement,completion,retention,dropout,kpi,qualitative,ab-test,usability-test,iterative,user-impact,roadmap,decision-architecture,conflicting-goals,cognitive-load,symptom
refs: ryanDeci2000,deci1999,lepper1973,keller1987,fogg2009,csik1990,locke2002,hattie2007,kivetz2006,nunes2006,amabile2011,hamari2014,deterding2011,gray2018,rodden2010,gothelf2013,kohavi2020,gibbons2018,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand motivation mechanisms, psychological design principles and evaluation approaches. Level 2 asks you to design learning interfaces to be motivating and to assess UX concepts. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Intrinsic and extrinsic motivation, and what Self-Determination Theory adds · 14 min · Core

> Learners are motivated by the activity itself or by rewards from outside. Lasting motivation needs three things: autonomy, competence and relatedness.

:::box In plain words
**The idea.** Intrinsic motivation comes from the activity itself: interest, curiosity, the wish to get better. Extrinsic motivation comes from outside: points, money, a deadline, a certificate. Self-Determination Theory (Deci and Ryan) adds that people stay motivated when three needs are met: autonomy (I choose), competence (I can see I am getting better) and relatedness (I belong).
**Why it matters.** In Task 1 you compare two platforms and choose measures to raise engagement. You will need to say whether a measure supports a learner's motivation or only decorates it.
**How to read the picture.** The first picture sets the two sources of motivation side by side, row by row. The second shows the three needs as overlapping circles, each with an example from a learning platform.
:::

![Two sources of motivation, read row by row.](_figures/d4_a1_intrinsic-vs-extrinsic.png)

![Self-Determination Theory: three needs that support lasting motivation.](_figures/d4_a1_three-needs.png)

Let us look at what can go wrong, because it explains why Day 4 does not simply say "add rewards". Tom enjoys the quizzes on his company's platform; he does them because he likes seeing that he knows the answer. The platform then adds points for every quiz. For a few weeks he does more of them. Later he notices that he opens a quiz mainly to collect points, and when the points programme ends, he does fewer quizzes than before. The reward had become the reason. This is the overjustification effect (Lepper, Greene and Nisbett 1973), and a meta-analysis of 128 experiments by Deci, Koestner and Ryan (1999) found that expected tangible rewards tended to undermine intrinsic motivation, while unexpected rewards and informative praise did not.

:::note Case assumption
Tom and the quiz example are made up to illustrate the research. The research findings are real; check the sources before you quote them.
:::

| SDT need | The question the learner asks | What a platform can offer |
|---|---|---|
| **Autonomy** | Do I choose how and when I learn? | A choice of path or order, a pace of their own, a reason for each step |
| **Competence** | Can I see that I am getting better? | Clear goals, results with a next step, a record of skills gained |
| **Relatedness** | Do I belong? | Learning with colleagues, a trainer's comment, a visible group |

:::rules How to decide when this comes up in the task
- Ask of each platform feature or measure: does it support autonomy, competence or relatedness? A feature that supports none of the three probably only decorates.
- Extrinsic rewards can start behaviour but may not sustain it, and expected rewards for something the learner already enjoys can reduce interest.
- Informational feedback ("you can now do X") supports competence. Pure points for presence do not.
- Motivation is not the same as gamification: a platform can motivate without any game elements, and a game layer can leave motivation unchanged.
:::

:::note Extra · go deeper (optional reading)
**Other models you will meet.** Keller's ARCS model (1987) lists four conditions for motivation in instruction: attention, relevance, confidence and satisfaction. Fogg's Behavior Model (2009) says a behaviour happens when motivation, ability and a prompt come together; it returns in Materi B1. Both fit alongside SDT: SDT explains what sustains motivation, Fogg explains why a motivated learner still does not act.
**Why "intrinsic" is not a feature.** You cannot ship intrinsic motivation as a button. You can only remove what blocks it (confusion, boredom, no sign of progress) and offer what feeds it (choice, competence, belonging).
:::

^src: Ryan & Deci 2000 · Deci, Koestner & Ryan 1999 · Lepper, Greene & Nisbett 1973 · Keller 1987

## A2 · Five design principles for effective learning experiences · 14 min · Core

> Clarity, activation, feedback, progression and relevance are the five things a motivating learning screen delivers.

:::box In plain words
**The idea.** The plan names five design principles. Clarity and structure: the learner knows what this is and what to do. Activation: the learner does something instead of only reading. Feedback and reinforcement: the learner knows how they did and what to do next. Progression: the learner can see their learning move forward. Relevance and context: the learner sees why this matters for their work.
**Why it matters.** In Task 1 you sort what differs between two platforms into these principles and then choose measures that deliver them. The model of the plan builds its measures on exactly these ideas.
**How to read the picture.** Each row reads from left to right: the principle, what the learner experiences, and a typical screen element that delivers it.
:::

![Five design principles, what the learner experiences, and a typical screen element.](_figures/d4_a2_five-principles.png)

:::note A short story: Anna's negotiation course
**Step 1.** Let us follow Anna, a sales manager who is taking a course on negotiation on LearnLoop. The first version of the course opens with a long page of reading. She does not know what she will be able to do at the end, nothing asks her to try anything, nothing tells her how she is doing, and the page does not show how far she has come. After two pages she closes it.
**Step 2.** In the second version, each unit starts with "After this unit you can write a counter-offer" (clarity and relevance). Then comes a three-minute task: she types her counter-offer (activation). A message follows: "Your offer names a price but no condition. Next: task 4" (feedback with a next step). At the top a bar shows 40 percent (progression).
**Step 3.** Nothing about the content changed. What changed is that each of the five principles is now visible on the screen, so Anna can feel that she is moving.
:::

:::note Case assumption
Anna and the negotiation course are made up for this example.
:::

| Principle | If it is missing, the learner meets… | A measure that delivers it |
|---|---|---|
| Clarity and structure | A page with no stated goal | A goal sentence at the start of each unit |
| Activation | Pages of reading with nothing to do | Short tasks and questions inside the unit |
| Feedback and reinforcement | A silent screen after an answer | A result and a next step after each task |
| Progression | No sign of how far they have come | A progress bar, "3 of 8 done", skills gained |
| Relevance and context | Content without a reason | A work example before the rule |

:::rules How to decide when this comes up in the task
- Sort a difference between two platforms by the principle it delivers or lacks: goal (clarity), doing (activation), result (feedback), progress (progression), reason (relevance).
- A principle of motivation is a sentence with a reason: "Show the learner their progress, because people continue when they can see they are getting somewhere."
- Prefer measures that deliver a principle for every learner (a progress bar, a goal sentence) before an extra for some (a badge).
- Activation is not the same as more clicking: the learner must do something that relates to the goal.
:::

:::note Extra · go deeper (optional reading)
**Challenge and skill.** Csikszentmihalyi (1990) described a state of deep engagement, "flow", that arises when the challenge fits the learner's skill: too easy is boring, too hard is frustrating. Tasks that grow slightly harder as the learner succeeds follow this idea.
**Goals.** Locke and Latham (2002) summarise 35 years of research showing that specific, challenging goals lead to better performance than vague ones. A stated unit goal is the learning version of this finding.
:::

^src: Keller 1987 · Csikszentmihalyi 1990 · Locke & Latham 2002

## A3 · Feedback, progress and rewards: what helps and what backfires · 12 min · Core

> Feedback that tells the learner what to do next and progress that is honest support competence. Rewards help only when they stay informative.

:::box In plain words
**The idea.** Three tools appear in almost every motivation discussion: feedback, progress displays and rewards. Feedback helps when it answers three questions: where am I going, how am I going, where to next (Hattie and Timperley 2007). Progress displays help because people work harder as they get nearer a goal and when they can already see some progress. Rewards help when they tell the learner something true about their skill, and backfire when they replace the reason for learning.
**Why it matters.** In Task 1 and Task 2 you choose between measures such as a progress display, feedback after each task, and points and badges. This card tells you how to rate each.
**How to read the picture.** The first picture shows the three feedback questions. The second sets a reward that supports learning next to one that replaces it, row by row.
:::

![Three questions good feedback answers.](_figures/d4_a3_feedback-questions.png)

![The same element can help or backfire: a reward that supports learning against one that replaces it.](_figures/d4_a3_rewards.png)

- **Progress.** The goal-gradient effect (Kivetz, Urminsky and Zheng 2006) describes that people speed up as they approach a goal. The endowed-progress effect (Nunes and Drèze 2006) found that customers with a loyalty card that was already partly stamped were more likely to complete it. A progress bar uses both, but it must be honest: a bar that moves without real progress teaches the learner to distrust it.
- **Small wins.** Amabile and Kramer (2011) analysed almost 12,000 diary entries of 238 knowledge workers and found that making progress in meaningful work was the strongest everyday boost to motivation. It concerns workplaces, but it supports the plan's model logic that perceived progress is a strong motivator.
- **Gamification.** The use of game elements outside games (Deterding et al. 2011). A review of empirical studies (Hamari, Koivisto and Sarsa 2014) found mostly positive effects that depend on the context and on the user. Day 11 treats it in depth; here, rate it by what it does to the three needs of SDT.

:::rules How to decide when this comes up in the task
- Give feedback that answers three questions: the goal, the result so far, and the next step. "Well done" alone is not feedback in this sense.
- A progress display must show real progress against a clear end. Show the learner what is done and what is left.
- Rate a reward by what it says: does it tell the learner something true about their skill, or does it pay them for presence? The second kind carries a risk of overjustification.
- A measure that adds rewards but leaves a platform without goals, activation and feedback treats the symptom and not the cause.
:::

:::note Extra · go deeper (optional reading)
**Rewards in a work setting.** Learners who are paid or required to learn (as many Habmann learners are) already have an extrinsic reason. The design question is then how to add competence and autonomy so that the reason does not stay only external.
**Do not mix up engagement and learning.** A platform can raise clicks and time spent while learning stays flat. Card A4 returns to this when it asks what to measure.
:::

^src: Hattie & Timperley 2007 · Kivetz et al. 2006 · Nunes & Drèze 2006 · Amabile & Kramer 2011 · Hamari et al. 2014

## A4 · Evaluating motivation-based UX: metrics and methods · 10 min · Optional

> Engagement metrics show what learners do; interviews show why. Use both, and write down what you expect before you change anything.

:::box In plain words
**The idea.** To know whether a motivating design works, you measure. The plan lists engagement, completion rate and time spent as metrics, user feedback and observation as qualitative methods, and KPIs and tracking as quantitative methods. Each metric answers one question and has a trap.
**Why it matters.** The plan's Level 3 task asks for an evaluation strategy: how do we measure success? This card gives you the building blocks.
**How to read the picture.** Each row reads from left to right: the metric or method, the question it answers, and why you read it carefully.
:::

![Five metrics and methods, the question each answers, and the trap in each.](_figures/d4_a4_metrics.png)

**Iterate in three steps.** Test, analyse, adjust. Before the test, write the hypothesis in a sentence: "We believe that a next-step button will raise the seven-day return rate by five points; we will know when the rate moves against a control group." Gothelf and Seiden (2013) describe this form. After the test, compare with the baseline and decide: keep, change or stop.

:::rules How to decide when this comes up in the task
- Pair a metric about behaviour (return rate, tasks done) with a method about reasons (interviews, observation).
- Time spent is ambiguous: a long time can mean interest or confusion. Do not use it alone.
- Write the expected effect and the figure before you change anything, so that you can tell whether it worked.
- With enough learners, use a control group (an A/B test) so that you know the change, not the season, caused the result.
:::

:::note Extra · go deeper (optional reading)
**HEART.** Google's HEART framework (Rodden, Hutchinson and Fu 2010) lists happiness, engagement, adoption, retention and task success as categories of user-centred metrics, each with a goal, a signal and a metric. It is a way to avoid choosing a metric only because it is easy to count. Day 16 returns to it.
**Experiments.** Kohavi, Tang and Xu (2020) warn that many ideas do not move the metric they were built for. A control group is how you find out cheaply.
:::

^src: Rodden et al. 2010 · Gothelf & Seiden 2013 · Kohavi et al. 2020

## A5 · Weighing an engagement measure: motivation, effort, risk · 10 min · Core

> Rate each measure on how much it supports lasting motivation, what it costs and how it can backfire. Pressure and rewards carry the highest risk.

:::box In plain words
**The idea.** To choose between ways of raising engagement, rate each on the same three questions. Motivation impact: how much does it support lasting motivation, meaning goals, activation, feedback and progress? Effort: money and time, decided here by a rule: under €10,000 is Low, up to €20,000 is Mid, above that is High. Risk: how can it backfire, through overjustification, pressure or manipulation?
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** The bars show the cost of three LearnLoop measures. The coloured bands behind them are the effort rule. The dashed line is the budget. The table gives the rating of each and the reason.
:::

![LearnLoop weighs three engagement measures. Cost against the effort rule and the budget (Case assumption).](_figures/d4_a5_options-cost.png)

:::note A short story: LearnLoop has €40,000 and two months
**Step 1.** Let us look at LearnLoop again. Learners drop out early, the budget is €40,000 and the time limit is two months. Three ideas are on the table.
**Step 2 · A weekly leaderboard.** It costs €14,000, so the effort is Mid. It sounds motivating, but a ranking rewards learners who are already active and can discourage those at the bottom, so the motivation impact is Low for the learners LearnLoop wants to keep, and the risk is High (pressure and social comparison).
**Step 3 · A progress and next-step display.** It costs €8,000, so the effort is Low. It shows the learner how far they have come and what to do next, so the motivation impact is High (competence and clarity), and the risk is Low: it adds information and takes nothing away.
**Step 4 · Short practice tasks.** It costs €26,000, so the effort is High, and it takes seven of the eight weeks. It makes learners active, so the motivation impact is High and lasting, and the risk is Mid, because the schedule is tight and weak tasks would feel like homework.
:::

| LearnLoop measure | Motivation impact | Effort | Risk |
|---|---|---|---|
| **Weekly leaderboard** · €14,000 | **Low.** Rewards the already active; no help for the learner who is lost. | **Mid.** €14,000 lies between €10,000 and €20,000. | **High.** Pressure and comparison can push the weakest learners out. |
| **Progress and next-step display** · €8,000 | **High.** Supports competence and clarity for every learner. | **Low.** €8,000 is under €10,000. | **Low.** It adds information; it can be adjusted. |
| **Short practice tasks** · €26,000 | **High.** Activation, feedback and a sense of getting better. | **High.** €26,000 is above €20,000. | **Mid.** Seven of eight weeks; weak tasks feel like homework. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €10,000 is Low; €10,000 to €20,000 is Mid; above €20,000 is High.
- Rate motivation impact by the principles it delivers (goal, activation, feedback, progress) for the learners who are leaving, not by how exciting it sounds.
- Rate risk by how the measure can backfire: expected rewards that crowd out interest, ranking pressure, loss messages and other manipulation.
- Ask which measure has a lasting effect. A measure that depends on a continuing reward has a weaker lasting effect than one that builds competence.
- Name what you do not know, for example whether learners leave for lack of progress or lack of time.
:::

^src: Ryan & Deci 2000 · Deci et al. 1999 · Gibbons 2018 (NN/g)

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to prioritise motivation strategies, design principles and optimisation measures strategically and to take responsibility for them. Materi B teaches the three things Task 2 asks: motivation as a business lever and its limits (B1), the conflict between motivation, overload and manipulation (B2), and how to decide and evaluate under uncertainty (B3).
:::

## B1 · Motivation as a business lever, and where it is overestimated · 18 min · Core

> Motivation is one of three conditions for behaviour. Raising it helps only when the learner is able to act and has a prompt at the right moment.

:::box In plain words
**The idea.** For a platform, retention is behaviour: learners come back and do the next lesson. Fogg's Behavior Model says a behaviour happens when motivation, ability and a prompt come together. If the next step is hard, or nothing prompts it, more motivation does not help. That is where motivation is overestimated: teams add rewards when the real barrier is that the next step is hard to find.
**Why it matters.** Task 2 puts you in the chair of a Chief Experience Officer whose platform has low retention, whose competitors seem more motivating, and whose data is incomplete. You must choose a strategy and say how you will know it works.
**How to read the picture.** The chain shows three conditions that lead to a behaviour. Read which of the three each of your measures works on.
:::

![Fogg's Behavior Model: behaviour happens when motivation, ability and a prompt come together.](_figures/d4_b1_behaviour-model.png)

| Condition | A typical barrier on a learning platform | A measure that works on it |
|---|---|---|
| **Motivation** | The learner sees no reason to continue | A goal sentence, a work example, a sign of progress |
| **Ability** | The next step is hard to find or too big | A visible "next" button, units of a few minutes |
| **Prompt** | Nothing reminds the learner at a useful moment | A timely, honest reminder with the next step in it |

**Where is motivation overestimated?** Three places. First, where the barrier is ability or a missing prompt, not motivation. Second, where a reward gives a short rise that fades (a novelty effect): reviews of gamification find results that depend on context and the user (Hamari et al. 2014). Third, where learners are already extrinsically required to learn (as in company training), so that the question is how to add competence and autonomy.

:::rules How to decide when this comes up in the task
- Before adding motivation, check ability and prompt: can the learner find and do the next step in a few minutes, and does something invite them at the right moment?
- Say which of the three conditions each measure of your strategy works on. A strategy that works only on motivation is incomplete.
- Prefer measures with a lasting effect (goals, competence, clear next steps) over measures that need a continuing reward.
- Link every measure to a business figure: retention (return rate), completion, and what it costs.
:::

:::note Extra · go deeper (optional reading)
**Competitors' motivation features are not evidence.** The case says competitors offer more motivating platforms. That is a market fact, not proof that rewards cause retention. Ask which of the competitor's design choices (a clear path, instant feedback) could explain it, and test the one you would copy.
**Prompts and ethics.** A prompt is a reminder, and a reminder that respects the learner's goals ("Your next unit takes four minutes") is different from one that scolds. Materi B2 draws the line.
:::

^src: Fogg 2009 · Hamari et al. 2014 · Ryan & Deci 2000

## B2 · Conflicting goals: motivation, overload and manipulation · 22 min · Core

> Every motivating element costs attention and can be used against the learner. Weigh motivation against load and against manipulation.

:::box In plain words
**The idea.** The plan's conflicts for Day 4 are motivation against overload, motivation against usability, and short-term against long-term effect. A third pull is motivation against manipulation: pressure, guilt and loss messages that raise activity today and cost trust tomorrow. A good strategy names which conflict it faces in each measure.
**Why it matters.** Task 2 asks for a risk analysis of perverse incentives and wrong motivation, and for a motivation strategy that stays on the right side of manipulation.
**How to read the picture.** The matrix places seven measures by the lasting motivation they support (left to right) and the pressure they put on the learner (bottom to top). The position is a reading of the example, not a score. The bottom right is the aim.
:::

![Seven measures by lasting motivation supported and pressure on the learner. LearnLoop example, Case assumption.](_figures/d4_b2_motivation-vs-pressure.png)

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| **Motivation against overload** | An engaging element on every screen | A learner whose attention is not split (Day 3) | Add an engaging element only if it supports the screen's goal; remove one for each you add |
| **Motivation against manipulation** | A short rise in activity | A learner who trusts the platform and decides for themselves | Test: would you be comfortable explaining the mechanism to the learner? If not, do not ship it |
| **Short-term against long-term** | A visible lift this month | An effect that lasts after the novelty is gone | Judge a measure on a later check as well as the first week |
| **Motivation against usability** | A reward or game layer | A fast, plain way to do the task | Never put a reward between the learner and the task |

:::rules How to decide when this comes up in the task
- Name which conflict each measure faces and what each side gets and loses.
- A measure that works by pressure (loss messages, rankings of the weakest) is a manipulation risk. Prefer measures the learner would endorse if they saw how they work.
- A perverse incentive produces the opposite of what you intended: points for opening lessons produce opened but unread lessons. Ask of every reward: what is the cheapest way to earn it, and is that what we want?
- Judge short-term and long-term effect separately, and say which one your strategy aims at.
:::

:::note Extra · go deeper (optional reading)
**Dark patterns.** Gray and colleagues (2018) catalogued manipulative strategies in interfaces, such as nagging, forced action and obstruction. Laws on such design are under discussion in Europe and in flux, so check current rules; the design principle is stable: do not make the learner act against their own interest.
**Motivation against cognitive load.** Each badge, pop-up and ranking asks for attention. If the learner's working memory is already full (Day 3), an extra motivating element can lower learning. Remove load before adding motivation.
:::

^src: Gray et al. 2018 · Deci et al. 1999 · Hamari et al. 2014

## B3 · Deciding and evaluating under uncertainty · 20 min · Core

> With incomplete data, write down a hypothesis, a metric and a stop condition before you start. Set a rule for how future UX optimisation is decided.

:::box In plain words
**The idea.** When the data is incomplete you cannot be sure which measure will work. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. Your evaluation strategy then says how you will measure success: a baseline, a target, a method and a date. You also fix who decides future optimisation and on what evidence.
**Why it matters.** Block 3.1 and 3.2 ask for an evaluation strategy, a risk analysis, a decision architecture and one decision under uncertainty.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![The four parts of a decision made with incomplete data, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d4_b3_decision-frame.png)

- **A hypothesis with a figure.** "We believe that showing progress and a next step will raise the seven-day return rate by five points. We will know when the rate in the test group is five points above the control group after six weeks."
- **A baseline and a target.** Without today's value you cannot say whether anything moved. Write the baseline down before the change.
- **Two kinds of evidence.** A behaviour metric (return rate, tasks per week) and a reason (interviews). Together they show whether the change worked and why.
- **A perverse-incentive check.** For every reward, write the cheapest way to earn it. If that is not the behaviour you want, change the reward.
- **A decision architecture.** Name a role that decides and the evidence that decision needs, so that optimisation does not follow the loudest opinion.

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- Measure success with a baseline, a target, a method and a date, written before the change. A metric without a baseline cannot show improvement.
- Use a behaviour metric and a reason-giving method together. Time spent and badges earned are not evidence of learning.
- Check every reward for perverse incentives before you ship it.
- A decision architecture names who decides and what evidence they need; a senior opinion alone is not evidence.
- Giving up nothing means you have not decided: name what you postpone.
:::

:::note Extra · go deeper (optional reading)
**Premortem.** Klein's premortem asks the team to imagine that the strategy failed a year from now and to list why. For motivation strategies the typical answers are: learners collected rewards without learning, the metric moved for a reason other than our change, and learners felt pushed. Each answer becomes a check.
**Small experiments.** If the platform has enough learners, an A/B test with a control group is the cleanest way to show an effect; if it has few, use sequential small tests with interviews (see Day 2).
:::

^src: Gothelf & Seiden 2013 · Kohavi et al. 2020 · Klein 2007 · Rodden et al. 2010
