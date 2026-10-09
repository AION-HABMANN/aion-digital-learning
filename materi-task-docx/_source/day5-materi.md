---
doc: materi
day: 5
kicker: DAY 5 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: User-centred UX design for learning platforms
subtitle: Design from the learner's perspective, spot the mistakes of feature-driven platforms, and argue for users in business terms
daytitle: Day 5 · Module 3 (day 1 of 3): Fundamentals of user-centred UX design for learning platforms
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: Not yet published (the link will be added once Day 5 is deployed)
case: Worked examples use LearnLoop, an online-course provider. The task case is LearnBase, a feature-heavy platform without user focus (see the Task document).
intro: This document holds everything you need to study Day 5 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: user-centred,feature-driven,context-of-use,contextual-inquiry,say-do,kano,feature-creep,nps,persona,journey,system-logic,orientation,usability,self-directed,stakeholder,competitive-factor,conflicting-goals,user-impact,roadmap,decision-architecture,dropout,engagement,completion,retention,kpi,qualitative,usability-test,iterative,symptom,dashboard,learning-path
refs: iso9241210,iso924111,norman2013,christensen2016,beyer2017,rohrer2014,nielsen2001,kano1984,reichheld2003,knowles1975,gibbons2018,klein2007,bezos2016
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand and classify the fundamentals of user-centred UX design. Level 2 asks you to recognise user needs and to analyse UX problems from the user's perspective. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · User-centred against feature-driven · 12 min · Core

> User-centred design starts from what the learner wants to do. Feature-driven design starts from what the software can do. UX bridges the learner's needs and the business model.

:::box In plain words
**The idea.** User-centred design means designing from the user's perspective, not the system's. A feature-driven platform decides what to build from what the software could do, or from what a department asked for. A user-driven platform decides from what learners need to do. UX is the bridge between those needs and the business model of the company.
**Why it matters.** Task 1 describes a platform with many functions and little use. You will look at it through the learner's eyes, and you will need words to say what is wrong with deciding by features.
**How to read the picture.** The two columns describe the same platform decided in two ways. Read each row from left to right: where the decision starts, what the menu looks like, how success is counted, and what typically follows.
:::

![Two ways to decide what a platform is.](_figures/d5_a1_feature-vs-user.png)

Let us look at why the feature-driven path is so common. Each department has a good reason for its feature: marketing wants a news area, the training team wants a repository, sales wants a community. Each feature is defensible alone. Together they produce a platform whose menu follows the organisation chart, and the learner, who has one goal, must work out which entry serves it. This is what Norman calls creeping featurism (Norman 2013): products grow by addition, and nobody owns the whole.

- **ISO 9241-210** names the opposite habit: design rests on an explicit understanding of users, tasks and environments, and users are involved throughout.
- **The Kano model** (Kano et al. 1984) explains why extra features do not rescue a weak basic. Must-be qualities (finding my course) are only noticed when missing. One-dimensional qualities (faster is better) raise satisfaction in proportion. Attractive qualities (a pleasant surprise) delight, but only on top of a working basic.
- **The business link.** A learner who finds, understands and finishes a course renews, returns and recommends. A user-centred decision is therefore not opposed to business goals; it is how most business goals of a learning company are reached.

:::rules How to decide when this comes up in the task
- Ask of each feature or measure: which learner task does it serve? If the answer is "none, but it is available", it is feature-driven.
- Name things in the learner's words (Start course, Continue), not the system's (Enrol in module instance).
- A new feature does not repair a failing basic. If learners cannot find their course, fix that before adding anything.
- User-centred does not mean ignoring the business. State what the business gets from a user-centred measure (completion, retention, renewal).
:::

:::note Extra · go deeper (optional reading)
**Jobs to be done.** Another way to write the learner's goal is as a job they hire the platform for (Christensen and colleagues): "carry on where I stopped in the time I have". The wording keeps the discussion on the learner's task, not on the feature list.
**Who owns the whole?** A simple remedy for feature creep is a rule that every new feature needs a named user problem and a metric before it is built. Materi B3 returns to this as a decision architecture.
:::

^src: ISO 9241-210:2019 · Norman 2013 · Kano et al. 1984

## A2 · Understanding learners: goals, expectations and contexts of use · 12 min · Core

> Different learners, with different goals, learn in different situations. A design must fit the situation, not an average.

:::box In plain words
**The idea.** To design from the user's perspective you need to know three things: who the users are (learners, teachers, organisations), what they want and expect, and in what situation they use the platform. The situation is the context of use: on a phone, on the side between meetings, in an intensive weekend, or because training is mandatory.
**Why it matters.** In Task 1 you put yourself into a learner's position and write their goals and frustrations. This card gives you the situations to think of.
**How to read the picture.** Each row reads from left to right: a context of use, what it looks like in practice, and what the design must allow.
:::

![Four contexts of use for a learning platform, and what each asks of the design.](_figures/d5_a2_contexts.png)

| User group | Typical goal | Typical expectation | Typical problem |
|---|---|---|---|
| **Learners** | Reach a skill or a qualification in the time they have | To find the next step at once; to see progress | Cannot find content; no time; no sign of progress |
| **Teachers** | Set up and run courses with little effort | Simple tools; a view of how learners are doing | A tool built for administrators, not for them |
| **Organisations** | Staff trained, completion visible, costs under control | Reports; certificates; reliable operation | Low usage that they cannot explain |

ISO 9241-11 defines usability for a **specified context of use**: specified users, goals, tasks, equipment and environment. The same platform can be usable for one context and not for another. A design that has been checked only on a desktop in a quiet office has not been checked for a learner on a train.

:::rules How to decide when this comes up in the task
- Write a learner's goal as a task in everyday words ("carry on where I stopped"), and note the situation: device, time, mandatory or voluntary.
- Name the expectation behind a frustration. "I cannot find my course" means the expectation was "my course is the first thing I see".
- Check a measure against more than one context of use: does it still work on a phone, between meetings, under a deadline?
- Do not design for an average learner. Name the group a measure helps, and say who it burdens.
:::

:::note Extra · go deeper (optional reading)
**Adult learners.** Knowles described adults as self-directed learners who want to know why they learn something and who bring experience. For the platform it means a visible reason for each step and the ability to skip what is known. Most Habmann learners study next to a job, so "on the side" is the context to design for first.
**Say and do.** What learners say they want and what they do often differ (Nielsen 2001). To understand a context, watch it, as card A4 explains.
:::

^src: ISO 9241-11:2018 · Knowles 1975 · Nielsen 2001

## A3 · Typical mistakes of platforms without user focus · 10 min · Core

> Three mistakes recur: functions instead of benefits, overly complex interfaces, and missing orientation and structure.

:::box In plain words
**The idea.** The plan lists three mistakes that follow from not designing for the user. The platform talks about its functions instead of what the learner can do. The interface is overly complex: too many choices at once. And orientation and structure are missing: the learner cannot tell where they are or where the content is.
**Why it matters.** These are the three areas Block 1.1 sorts the facts into. Each fact in the task is one of these mistakes.
**How to read the picture.** Each row reads from left to right: the mistake, what the learner experiences, and a user-centred remedy.
:::

![Three typical mistakes without user focus, what the learner experiences, and a remedy.](_figures/d5_a3_mistakes.png)

:::note A short story: Mia looks for her course
**Step 1.** Let us follow Mia, a project manager, who opens her company's platform to carry on with a course. The menu has twenty-two entries, named "Content Repository", "Module Manager" and "Analytics Suite". She does not know what they mean, because they describe the software, not her task. This is the first mistake: functions instead of benefits.
**Step 2.** She tries "Content Repository", and finds a list with fourteen filters before the first result. Too many things to decide at once is the second mistake: an overly complex interface.
**Step 3.** She finally finds the course, but the same course also appears in a catalogue and in a library, in a different order each time, and nothing shows that she was halfway through it. She cannot tell where she is. This is the third mistake: missing orientation and structure.
**Step 4.** None of the three problems is a lack of function; the platform has everything. They are all failures to start from what Mia wants to do.
:::

:::note Case assumption
Mia, the menu and the numbers are made up for this example.
:::

:::rules How to decide when this comes up in the task
- If the screen names things after the software ("module instance", "repository"), it is functions instead of benefits.
- If the learner must choose from many things before they can act (many menu entries, many filters, many widgets), it is complexity.
- If the learner cannot tell where they are, where something is, or what to do next, it is missing orientation.
- Sort a fact by what it makes the learner unable to do, not by how it looks. One fact belongs to the area it breaks first.
:::

:::note Extra · go deeper (optional reading)
**Where this connects.** Missing orientation links to Day 1 (clarity and orientation) and Day 8 (information architecture). Overly complex interfaces link to Day 3 (cognitive load): each extra choice uses attention. The user-centred view adds the question that decides the fix: what was the learner trying to do?
:::

^src: Norman 2013 · ISO 9241-210:2019

## A4 · Methods of user-centred design: a first overview · 12 min · Optional

> To design for users you must learn about them. Methods differ in whether they show what people say or do, and whether they give reasons or counts.

:::box In plain words
**The idea.** The plan lists four methods in overview: observation and user feedback, personas, user journeys and iterative design. Methods differ in what they tell you. Interviews and surveys show what people say; usability tests, observation and analytics show what people do. Small studies give reasons; large ones give counts.
**Why it matters.** In the plan's Level 3 task you decide without complete user data, so you need to know which method would close which gap.
**How to read the picture.** The matrix places five methods by what they tell you about (what people say against what they do, left to right) and the number of people involved (few to many, bottom to top). The position is a reading, not a ranking.
:::

![A first overview of user-research methods, after Rohrer (2014).](_figures/d5_a4_methods.png)

| Method | What it gives | When to use it |
|---|---|---|
| **Observation in context** (contextual inquiry) | What people really do where they do it | When you do not yet understand the situation |
| **Interviews** | Reasons, expectations, stories | To learn why; with a handful of learners |
| **Usability test** | Where people succeed or stumble on a task | To check a design with real tasks |
| **Analytics and logs** | How many do what, where they leave | To size a problem and track change |
| **Personas and journeys** (Day 6) | A shared picture of a group and its path | To keep decisions tied to users |
| **Iterative design** (Day 2) | Repeated rounds of build, test, adjust | Throughout |

:::rules How to decide when this comes up in the task
- Pair a method that shows what people do with one that shows why: analytics with interviews, a usability test with a follow-up question.
- Opinions of users are useful, but watch behaviour as well: people often do not do what they say.
- Choose the method by the gap in your knowledge: do not understand the situation (observe), do not know why (interview), do not know how many (count), do not know if it works (test).
:::

:::note Extra · go deeper (optional reading)
**Contextual inquiry.** Beyer and Holtzblatt describe visiting users in their own setting to see how work really happens. For a platform it can be as simple as watching three employees try to find their training on a Monday morning.
**Say against do.** Nielsen's "first rule of usability" is to watch what users do, not to rely on what they say about what they do.
:::

^src: Rohrer 2014 · Beyer & Holtzblatt 2017 · Nielsen 2001 · ISO 9241-210:2019

## A5 · Weighing a user-centred measure: user value, effort, risk · 14 min · Core

> Rate each measure on how much it helps the learner, what it costs and what could go wrong, then argue it in business terms as well.

:::box In plain words
**The idea.** To choose between measures, rate each on the same three questions. User value: how much does it help learners reach their goal? Effort: money and time, decided here by a rule: under €10,000 is Low, up to €20,000 is Mid, above that is High. Risk: what could go wrong or be lost? Then add one sentence on what the business gets, because management weighs a fourth question: what do we gain?
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** The bars show the cost of three LearnLoop measures. The coloured bands are the effort rule. The dashed line is the budget. The table gives the rating of each and the reason.
:::

![LearnLoop weighs three measures. Cost against the effort rule and the budget (Case assumption).](_figures/d5_a5_options-cost.png)

:::note A short story: LearnLoop has €50,000
**Step 1.** Let us look at LearnLoop again. Satisfaction is falling, management wants growth, and the budget is limited to €50,000. Three ideas are on the table.
**Step 2 · Add a chat feature.** It costs €24,000, so the effort is High. A chat is an extra, and learners who cannot find their course will not find the chat either, so the user value is Low. The business gains little at first, and the risk is Mid: it uses half the budget for something nobody asked for.
**Step 3 · Rebuild the menu around tasks.** It costs €12,000, so the effort is Mid. Learners find their course and see what to do next, so the user value is High. The business gains more completion and fewer complaints, and the risk is Low, because it changes the structure without removing content.
**Step 4 · Add ten new courses.** It costs €32,000, so the effort is High. A longer catalogue makes finding the right course harder, so the user value is Low. It serves a growth goal but depends on learners finding the courses, so the risk is Mid.
:::

| LearnLoop measure | User value | Effort | Risk | What the business gets |
|---|---|---|---|---|
| **Add a chat feature** · €24,000 | **Low.** Learners who cannot find their course do not use a chat. | **High.** €24,000 is above €20,000. | **Mid.** Half the budget for something nobody asked for. | A feature to announce, little usage |
| **Rebuild the menu around tasks** · €12,000 | **High.** Learners find their course and see what to do next. | **Mid.** €12,000 lies between €10,000 and €20,000. | **Low.** Structure changes; content stays. | More completion, fewer complaints |
| **Add ten new courses** · €32,000 | **Low.** A longer catalogue is harder to search. | **High.** €32,000 is above €20,000. | **Mid.** Depends on learners finding the courses. | More choice, if found |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €10,000 is Low; €10,000 to €20,000 is Mid; above €20,000 is High.
- Rate user value by whether the measure helps a learner with a printed problem. A measure that adds something nobody was missing has a low user value.
- Rate risk by what could be lost or wasted: a large share of the budget on an unrequested extra, or the removal of something learners use.
- Argue to management in its terms: say what the measure does to completion, retention or complaints, and what it costs.
- Prioritise the measure that fixes what every learner meets before the extra for some.
:::

^src: Gibbons 2018 (NN/g) · ISO 9241-210:2019

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to assess and prioritise user-centredness as a strategic success factor. Materi B teaches the three things Task 2 asks: link user needs to the business model (B1), analyse the conflict between user, business and technology (B2), and decide without complete user data and set a rule for user-centred development (B3).
:::

## B1 · UX as the bridge between user needs and the business model · 18 min · Core

> A platform earns when learners complete, return and recommend. Those results follow from user needs being met.

:::box In plain words
**The idea.** The plan calls user-centred UX a strategic success factor. It influences engagement, learning success and the drop-out rate, and so the numbers the business watches. UX is the translation between what the learner needs and what the company earns from.
**Why it matters.** Task 2 asks you to define the central user needs and to conflict-analyse user against business. To do it you must be able to say each need in business terms.
**How to read the picture.** The chain reads from left to right: the learner's need, what UX does with it, and what the business gets.
:::

![UX as a bridge between user needs and the business model.](_figures/d5_b1_bridge.png)

| User need | UX decision that serves it | Business figure that moves |
|---|---|---|
| Find my course at once | A task-based menu, a "Continue" entry | Completion, fewer support requests |
| Understand what to do | Plain labels, one main action per screen | Usage of paid content |
| See that I am making progress | A progress display | Retention, renewals |
| Learn in the time I have | Short units, quick re-entry | Return rate |

**Where companies fail to act user-centred.** The plan's coaching asks why. Typical reasons: each department measures its own feature; deadlines favour shipping over checking; user knowledge sits with one team; and "growth" is counted in sign-ups, not in finished courses. The UX role is to translate: to show that the numbers management wants depend on the needs users have.

**A satisfaction number.** Companies often track a recommend score such as the Net Promoter Score (Reichheld 2003), based on one question: how likely are you to recommend us? It is useful as a trend, but one number hides the reasons, so pair it with a method that gives them.

:::rules How to decide when this comes up in the task
- State each central user need as a task, and next to it the business figure that depends on it. A need without a business link will not get funded; a business goal without a user need will not be reached.
- User-centredness is a decision principle, not a nice-to-have: it decides what is built first.
- Argue to management with its numbers (completion, retention, renewals, support load), and show the cost of ignoring the need.
- Name the reason an organisation may not act user-centred (departments' own goals, deadlines, growth counted in sign-ups) and say how your plan counters it.
:::

:::note Extra · go deeper (optional reading)
**Translation effort.** The plan's coaching describes UX as a "translation effort between user and business". A short habit helps: write every user need as a sentence with three parts: who, what they want to do, and what the company gets if they can.
**Prioritisation from two perspectives.** The user's perspective ranks by what blocks the goal; the company's by what moves its figures. When they agree, decide quickly. When they differ, say which wins and what the other side gets.
:::

^src: ISO 9241-210:2019 · Reichheld 2003 · Norman 2013

## B2 · Conflicting goals: user, business and technology · 22 min · Core

> User, business and technology pull in different directions. Name the conflict, say what each side gets and loses, and decide.

:::box In plain words
**The idea.** The plan's conflict for Day 5 is user against business against technology. The user wants to find and finish. The business wants growth, retention and low cost. Technology sets what can be built and kept running. A good UX decision aims for the overlap, and when none exists, says which goal wins and what the others lose.
**Why it matters.** Task 2 asks for a conflict analysis (user against business) and a prioritised roadmap. The rules of this card tell you how to argue each choice.
**How to read the picture.** The three circles are the three goals. The centre is the aim: a decision that serves all three. Read what each circle wants.
:::

![Three goals pull at every UX decision.](_figures/d5_b2_three-goals.png)

| Conflict | The user gets | The business gets | A rule for deciding |
|---|---|---|---|
| **A feature the user did not ask for** | Nothing, or more clutter | A story to announce | Require a named user problem and a metric before building |
| **A simpler interface** | Faster completion of the task | Fewer support requests, but fewer places to show promotions | Count the business gain in completion and support, not in banners |
| **Growth by sign-ups** | Nothing, if the platform stays hard | More new users, who may leave | Count growth in finished courses and returns |
| **A technical shortcut** | A worse experience | Faster delivery | Accept only if the shortcut does not sit on the learner's main task |

:::rules How to decide when this comes up in the task
- Name the conflict in one sentence with the three goals in it: what the user, the business and the technology each want.
- A decision that serves only one goal is a trade-off: say what the other two lose and how you will limit the loss.
- Where the business goal depends on the user goal (growth needs learners who stay), argue that the user-centred measure is the business measure.
- Where goals really conflict, say which wins and why, and what you give the losing side (a date, a smaller version, evidence).
:::

:::note Extra · go deeper (optional reading)
**Stakeholders.** A stakeholder is anyone affected by a decision or able to influence it: management, sales, the training team, trainers, learners and the customers' HR departments. Listing them and what each wants takes five minutes and prevents most surprises.
**Feature requests.** A request from sales is often a symptom of a user problem ("customers cannot find reports"). Ask what problem it solves; the answer may be cheaper than the request.
:::

^src: Norman 2013 · ISO 9241-210:2019 · Kano et al. 1984

## B3 · Deciding without complete user data, and a decision architecture · 20 min · Core

> When user data is incomplete, decide a step you can test and undo, write down when you would reverse it, and set a rule that every feature starts from a user problem.

:::box In plain words
**The idea.** The plan asks you to decide without complete user data. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A decision architecture for user-centred development then names who decides and what evidence a decision needs, so that features start from users.
**Why it matters.** Block 3.2 asks for exactly this, and for a rule that holds for every future feature.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![The four parts of a decision without complete user data, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d5_b3_decision-frame.png)

- **Close the cheapest gap first.** Three interviews with learners who left and a usability test of the home screen cost little and show most of what is wrong.
- **Prefer reversible steps.** Rebuilding the home screen and pausing new features for six months can be undone; a long contract for a feature set cannot.
- **A feature approval rule.** Every new feature needs a named user problem, a metric and an owner before it enters the roadmap. This is the most direct decision architecture against feature creep.
- **Evidence with a ranking.** A usability test and interviews with leavers say why; usage per feature says how many; a request from sales says what one department wants.

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition has a figure and a time, set before the change.
- Close the cheapest evidence gap first, and prefer steps you can undo.
- A decision architecture names who decides (a role) and what evidence is needed; a feature approval rule is a concrete example.
- Giving up nothing means you have not decided: name the feature or request you postpone.
:::

:::note Extra · go deeper (optional reading)
**Premortem.** Klein's premortem asks the team to imagine in a year that satisfaction is still falling: why? The typical answers (we built what sales asked for, we measured sign-ups, nobody owned the whole) each become a rule in the architecture.
**One-way and two-way doors.** Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. Freezing features for six months is a two-way door; a three-year platform commitment is a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · ISO 9241-210:2019 · Rohrer 2014
