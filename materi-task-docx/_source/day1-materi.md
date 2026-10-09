---
doc: materi
day: 1
kicker: DAY 1 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: UX and UI for learning platforms
subtitle: Read the interface from the learner's side, weigh measures under a budget, and decide a UX strategy
daytitle: Day 1 · Module 1 (day 1 of 2): Fundamentals of UX/UI design for digital learning platforms and user-centred design of learning interfaces
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: https://aion-dl.vercel.app/day/1/ (Route 1: /day/1/route-1/ · Route 2: /day/1/route-2/)
case: Worked examples use LearnLoop, an online-course provider. The task case is SkillUp GmbH and its platform LearnFast (see the Task document).
intro: This document holds everything you need to study Day 1 without the website. It is written to be read from top to bottom. Every card says what the idea is in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use a different company (LearnLoop) so that no task answer is printed here. Glossary and references are at the end.
glossary: ux,ui,user-centred,system-logic,learning-path,cognitive-load,dropout,completion,retention,engagement,progress-indicator,feedback,orientation,usability,usability-test,gamification,self-directed,user-impact,roadmap,conflicting-goals,decision-architecture,edtech,ai,wireframe,heuristic,premortem,symptom,prioritisation-matrix,stakeholder,competitive-factor,lms,e-learning
refs: normanNielsen,iso924111,iso9241210,nielsen1994,nielsen1997,sweller1988,knowles1975,bjork2011,gibbons2018,klein2007,jordan2015,kirkpatrick2006,bezos2016
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the basic concepts, to tell UX from UI and to explain user-centredness. Level 2 asks you to analyse a learning interface and make first design decisions. Materi A gives you the ideas and the rules for both, and Task 1 uses them on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · UX is the experience, UI is the surface · 10 min · Core

> UX is everything a learner goes through; UI is only what they see and touch. A learning platform succeeds or fails on the first.

:::box In plain words
**The idea.** UX (user experience) is how using the platform feels from start to finish: finding a course, understanding a lesson, seeing that you are getting somewhere. UI (user interface) is only what you see and touch: buttons, colours, text. A beautiful surface can still give a poor experience.
**Why it matters.** On a learning platform the experience is the product. If learners get lost or do not understand, they do not learn, and they leave. In Task 1 you will describe problems the way this card does: by what the learner cannot do or feel, not by what looks wrong.
**How to read the picture.** The top half is one course page seen as a surface (UI). The bottom row is what the learner goes through (UX): find it, understand it, finish it. The bracket on the left shows that the surface is part of the experience, not separate from it. Read from top to bottom.
:::

![UI is the surface, UX is the experience. A beautiful surface can sit on top of a poor experience; the reverse is rare, because a good experience needs a surface that works.](_figures/d1_a1_ux-ui-layers.png)

Let us look at the three steps in the bottom row, because each one is a question a learner asks without saying it. "Find it": where is my course, and where did I stop yesterday? "Understand it": can I follow this lesson without extra effort? "Finish it": am I getting there, and do I know how I did? A platform can do well on the surface and still fail one of the three, and then learners leave for a reason that a screenshot does not show.

- **UX, in the words of Norman and Nielsen:** all aspects of the end user's interaction with the company, its services and its products.
- **Learning success is UX success.** A learner who cannot find, follow or finish a course has not learned, however good the content is.
- **A UI can change without the experience changing** (new colours), and an experience can be poor behind a polished surface.

:::rules How to decide when this comes up in the task
- Describe a problem as what the learner cannot do, understand or feel (an experience), not as what looks wrong (a surface).
- If a fix changes only colours, icons or fonts, it is a UI fix. It helps the experience only if the experience problem was the surface itself.
- On a learning platform a UX problem shows up as a learning problem: someone who cannot find, follow or finish a course does not learn.
:::

:::note Extra · go deeper (optional reading)
**Two definitions you can quote.** ISO 9241-210 defines user experience as a person's perceptions and responses that result from the use, or anticipated use, of a product, system or service. ISO 9241-11 defines usability more narrowly: how far a system can be used by specified users to reach specified goals with effectiveness, efficiency and satisfaction in a specified context of use. So usability is one part of UX, and both standards tie the judgement to the user, the goal and the context, never to taste.
**What this means for a learning platform.** Usability asks "can the learner do the task?". On a learning platform the task is learning, so you need a second question: "did the learner learn?". A screen can be easy to use and still teach little, which is why A4 comes later in this document.
**A common mistake.** Teams often call a redesign "a UX project" when it changes only the UI. The test is simple: after the change, can a learner do something they could not do before, or feel something they did not feel before?
:::

^src: Norman & Nielsen (NN/g) · ISO 9241-11:2018 · ISO 9241-210:2019

## A2 · Design from the learner's need, not from the system's logic · 12 min · Core

> A platform organised around its own features confuses learners. One organised around what they want to do guides them.

:::box In plain words
**The idea.** Software is usually built around what it can do: a menu with every feature. Learners come with a goal: carry on where I stopped, find a course for my job, show my employer that I finished. User-centred design starts from that goal and asks what the learner needs at each step. A learning platform has three kinds of users with different goals: learners, teachers and the organisations that pay for the courses.
**Why it matters.** In Block 1.1 and Block 2.2 of the task you judge problems and measures from the learner's side. The test of this card is the one you use there: for every screen or measure, whose goal does it serve, the learner's or the system's?
**How to read the picture.** The same platform is drawn twice. On the left it is organised by the system's features: an eight-entry menu. On the right it is organised by what a learner wants to do: three cards, and the first one carries on where the learner stopped.
:::

![One platform, two ways to organise it. On the left the learner has to guess which of eight entries leads to their lesson. On the right the first card says "Carry on where I stopped".](_figures/d1_a2_system-vs-learner.png)

:::note A short story: Mia has twenty minutes
**Step 1 · The menu.** Let us follow Mia, a project manager at a logistics firm. Her employer pays for LearnLoop, an online-course platform, and yesterday she finished lesson 2 of a course on negotiating with suppliers. Today she has twenty free minutes before a meeting, so she opens the platform to carry on with lesson 3. The first thing she sees is the menu that the platform's builders organised: Courses, Library, Catalogue, Forum, Certificates, Reports, Admin and Settings. None of the eight entries says "continue".
**Step 2 · Where is lesson 3?** Mia tries Courses, then Library. After three minutes she still has not found lesson 3, so her twenty minutes are almost gone and she closes the tab. LearnLoop never finds out why she left, and that is why a problem like this stays hidden.
**Step 3 · The same platform, built around Mia's goal.** Now look at the same platform organised by what a learner wants to do. The first card says "Carry on where I stopped: lesson 3 of 8", so one click takes Mia straight back. None of the features changed. What changed is who does the work of finding the goal: before it was Mia, and now it is the platform.
**Step 4 · What to take from it.** When you judge any screen, ask whose goal it serves. The learner's or the system's? You will use this same question again in Blocks 1.1 and 2.2.
:::

:::note Case assumption
LearnLoop, Mia and the eight menu entries are made up for this example. SkillUp's facts are in the Task document.
:::

| User | Their goal | What they need from the platform |
|---|---|---|
| Learners | Reach a skill or a qualification in the time they have | A clear path, readable lessons, a sign of progress |
| Teachers | Set up and run courses with little effort | Simple tools to build, update and see how learners are doing |
| Organisations | Staff trained, visible completion, costs under control | Reports on who finished, certificates, a reliable platform |

:::rules How to decide when this comes up in the task
- Ask of each screen or measure: which goal of which user does it serve? One that serves only the system's structure (an admin menu shown to a learner) is a user-centred failure.
- Start from what the learner wants to do, in their words; name the feature afterwards.
- Learners, teachers and organisations want different things. A measure that helps one can burden another, so name who it helps.
:::

:::note Extra · go deeper (optional reading)
**Six principles of human-centred design (ISO 9241-210).** The standard asks that design (1) rests on an explicit understanding of users, tasks and environments, (2) involves users throughout, (3) is driven and refined by user-centred evaluation, (4) is iterative, (5) addresses the whole user experience, and (6) is done by a multidisciplinary team. Notice that three of the six are about checking with real users: user-centredness is a habit of checking, not a mood.
**Jobs to be done.** Another way to start from the goal is the "job" a person hires a product for (Christensen and colleagues). Mia hires the platform to "carry on where I stopped in the time I have". Naming the job in the learner's words keeps the discussion away from features.
:::

^src: ISO 9241-210:2019 · Norman & Nielsen (NN/g)

## A3 · Three principles of a good learning interface · 14 min · Core

> Three things a learning screen must do: show where you are, ask for no needless effort, and show that you are getting somewhere.

:::box In plain words
**The idea.** Good learning screens follow three principles. Clarity and orientation: the learner always knows where they are and what comes next. Low cognitive load: the screen does not spend the learner's limited attention on things that do not help them learn, such as dense text, clutter and unexplained words. Feedback and progress: the learner can see how far they have come and whether they got it right.
**Why it matters.** These are the three areas Block 1.1 sorts the findings into: Orientation, Understanding, Motivation. Each finding is one of these principles missing or broken.
**How to read the picture.** The same lesson screen is drawn twice. On the left none of the three principles is present. On the right all three are, and each is marked with a number: orientation (1), light load (2), feedback (3).
:::

![A lesson screen before and after. Left: no orientation, a wall of text, no progress or result. Right: a path line and a Next button (1), a heading and short paragraphs with the new word explained (2), and progress with a quiz result (3).](_figures/d1_a3_lesson-screen.png)

:::note A short story: Daniel opens lesson 3
**Step 1.** Let us follow Daniel, who works in procurement and is taking an online course on contract basics. It is evening and he has had a long day, but he wants to finish lesson 3. When the lesson opens, he sees one block of about 500 words, nothing that tells him where this lesson sits in the course, and nothing that tells him how he is doing so far. Imagine being Daniel: how long would you keep reading?
**Step 2 · First fix: where am I?** Let us improve the lesson in three steps, and each step answers one question. The first question is "where am I?". A line at the top now reads "Module 2 › Lesson 3 of 8", and a "Next lesson" button shows what comes after. Daniel knows where he is, but the text is still a wall, and knowing where you are does not make a hard text easy.
**Step 3 · Second fix: can I follow this?** The same lesson now has a heading, three short paragraphs, and the new word "wireframe" explained right where it appears. Because of this, Daniel can scan the page and find the main point in a few seconds. He reads instead of digging, so his attention goes into the lesson and not into decoding the screen.
**Step 4 · Third fix: am I getting somewhere?** At the bottom Daniel now sees "3 of 8 lessons done", and after the quiz he reads "4 of 5 correct. Review question 2." He can see that he is progressing, and he knows what to do about the question he missed. Each fix answered a different question, so you can remove any one of them and see which problem comes back.
:::

| Principle | The question | A typical failure |
|---|---|---|
| Clarity and orientation | Can the learner tell where they are, where to start and what comes next? | Many equal tiles, no "next" button, yesterday's course hidden |
| Low cognitive load | Can the learner follow what they read without extra effort? | A wall of text, unexplained terms, very long sentences |
| Feedback and progress | Can the learner see they are getting somewhere, and get a sign when they succeed? | No progress bar, no message after a quiz |

:::note Where the ideas come from
Sweller's cognitive load theory: working memory is limited, so effort spent decoding a bad screen is missing for learning. Nielsen's heuristic "visibility of system status" asks the system to keep users informed with prompt feedback.
:::

:::rules How to decide when this comes up in the task
- Sort a finding by the question it breaks: can the learner tell where they are or what to do next (Orientation), follow what they read (Understanding), or see they are getting somewhere (Motivation)?
- A finding about text length, structure, pictures or unexplained words is about Understanding, even if it also looks like a design choice.
- A finding about a missing progress bar or no message after a quiz is about Motivation: feedback and progress, not how the screen looks.
- The drop-out figure is the consequence, not a cause and not an area: it is where the principles failing end up.
:::

:::note Extra · go deeper (optional reading)
**Why a wall of text fails.** Web studies by Nielsen and Morkes found that 79 percent of test users always scanned a new page and only 16 percent read word for word (Nielsen 1997). A lesson is read more carefully than a news page, but a learner who is tired or short of time scans as well. Headings, short paragraphs and one idea per paragraph let a scanning reader find the point.
**Why feedback is more than a pat on the back.** "4 of 5 correct. Review question 2" tells the learner what happened and what to do. "Well done!" tells them only that something happened. The first is feedback in Nielsen's sense (visibility of system status); the second is decoration.
**Where this goes next.** Day 3 explains cognitive load in detail (intrinsic, extraneous and germane load). Here you only need the idea: attention is limited, so do not waste it.
:::

^src: Sweller 1988 · Nielsen 1994 · Nielsen 1997

## A4 · A learning platform is not a classic app · 10 min · Optional

> A learning platform is not a shopping or banking app: the goal is to change what you know, and learners differ in how much they steer themselves.

:::box In plain words
**The idea.** In a classic app the goal is a quick task: pay, book, buy. On a learning platform the goal is to change what someone knows or can do, which takes effort and repeated visits. And learners differ in how much they steer themselves: some study alone at their own pace (self-directed), others follow a trainer and a schedule (guided). One screen rarely serves both equally.
**Why it matters.** It explains why a measure that makes a screen faster is not automatically better for learning, and why you ask who is learning, alone or with a trainer, before you choose.
**How to read the picture.** There is no drawing on this card. The first table sets a classic app next to a learning platform; the second sets self-directed next to guided learning. Read across each row.
:::

| | Classic app (pay, book, buy) | Learning platform |
|---|---|---|
| The goal | A quick task done | What someone knows or can do has changed |
| The time | Minutes, one visit | Weeks, many visits |
| Success looks like | The task is finished | The learner finishes and can use it |
| Effort | The less, the better | Some effort is the point of learning |

| | Self-directed (alone, own pace) | Guided (trainer, schedule) |
|---|---|---|
| Who sets the next step | The learner | The trainer |
| What the platform must supply | A clear path and feedback on its own | Visibility for the trainer, a shared schedule |
| Typical failure | Gets lost and stops unnoticed | Waits for instruction that does not come |

:::rules How to decide when this comes up in the task
- A measure that makes a screen quicker is not automatically better for learning. Remove effort that does not help learning; keep effort that does.
- Ask whether the learner studies alone or with a trainer before you choose: alone, the platform must supply the structure and feedback a trainer would.
:::

:::note Extra · go deeper (optional reading)
**Which effort is worth keeping.** Bjork and Bjork call useful struggle "desirable difficulty": trying to recall an answer is harder than re-reading it, and it helps memory more. But a confusing menu is not a desirable difficulty. It uses attention without teaching anything. The design question is therefore always: does this effort go into learning, or into working out the interface?
**Adult learners.** Knowles described adults as increasingly self-directed: they want to know why they learn something and they bring their own experience. For a platform this means the learner needs the "why" at the start and the choice to skip what they know. Most Habmann learners are working professionals, so both matter.
:::

^src: Knowles 1975 · Bjork & Bjork 2011

## A5 · Weighing a measure: user impact, effort, risk · 14 min · Core

> To choose under a budget, rate each measure on user impact, effort and risk, put them in order, and say what you do not know.

:::box In plain words
**The idea.** A budget never covers every good idea, so you compare measures with the same three questions. User impact: how much does it help learners get unstuck, understand or carry on? Effort: money and time; here a rule decides it. Under €10,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong or backfire? Then you put the measures in order and say what information you are missing, because you rarely know enough.
**Why it matters.** Block 2.2 asks you to choose four measures for SkillUp, rate them like this, order them and name the missing information. The example here uses LearnLoop, a different company, so the answer is not given.
**How to read the picture.** The bars show the cost of each of three LearnLoop measures. The coloured bands behind them are the effort rule: Low, Mid, High. The dashed line is the budget. A measure inside the Low band has Low effort. The table below the picture gives the three ratings for each measure and the reason.
:::

![LearnLoop weighs three measures. Cost against the effort rule and the €30,000 budget (Case assumption).](_figures/d1_a5_budget-effort.png)

:::note A short story: LearnLoop has €30,000 and six weeks
**Step 1 · Idea one: a guided first week.** Let us look at LearnLoop, an online-course provider. It has a problem: 30 of every 100 new learners leave in the first week. To improve this, LearnLoop has €30,000 and six weeks, and three ideas on the table. We will rate each idea on three questions: how much it helps the learner (user impact), what it costs (effort), and what could go wrong (risk). The first idea is a guided first week that tells every newcomer what to do first. It costs €7,000, and the rule says that anything under €10,000 has Low effort, so its effort is Low.
**Step 2 · Does it help? Could it backfire?** Week one is exactly where learners leave, and with a guided week a newcomer finally knows where to start, so the user impact is High. It adds a path and takes nothing away, and LearnLoop can switch it off again, so the risk is Low. Put together, this is a cheap, direct and safe measure.
**Step 3 · Idea two: a tempting leaderboard.** The second idea is a leaderboard, a ranking of learners by activity. It costs €12,000, which is between €10,000 and €15,000, so the effort is Mid. It sounds exciting, but a ranking mostly rewards learners who are already active, and a newcomer who is lost gains nothing from it, so its user impact is Low. It can even backfire: learners at the bottom of a ranking may leave sooner, and they are the ones LearnLoop most wants to keep, so the risk is High.
**Step 4 · Idea three, and what is still unknown.** The third idea is to rewrite the whole course catalogue. It costs €27,000, so the effort is High, and it would use almost the whole budget. Most of the benefit would also come after the six weeks, while learners are leaving in week one. LearnLoop also does not know yet whether newcomers leave because they lack direction or because they lack time, and it should find that out before it commits the money.
:::

| LearnLoop measure | User impact | Effort | Risk |
|---|---|---|---|
| **Guided first week** · €7,000 | **High.** Week one is where learners leave, and this tells every new learner exactly what to do first. | **Low.** €7,000 is under €10,000. | **Low.** It adds a path and removes nothing, and it can be switched off again. |
| **Leaderboard** · €12,000 | **Low.** It rewards the few learners who are already active and does nothing for a newcomer who is lost. | **Mid.** €12,000 lies between €10,000 and €15,000. | **High.** A ranking can discourage learners at the bottom, and they are the ones most likely to leave. |
| **Rewrite the whole catalogue** · €27,000 | **Mid.** It helps understanding, but most of the benefit arrives after the six weeks, and learners leave in week one. | **High.** €27,000 is above €15,000 and uses almost the whole €30,000. | **Mid.** Most of the budget goes into one bet; if the cause is not the text, little is left to try something else. |

:::note Still unknown (LearnLoop)
Whether week-one leavers lack direction or lack time. LearnLoop would run five short interviews before committing the whole budget.
:::

:::note Case assumption
LearnLoop, its 30%, its costs and its reasons are made up for this example. SkillUp's numbers are in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €10,000 is Low; €10,000 to €15,000 is Mid; above €15,000 is High. Do not judge it by how hard it feels.
- Rate user impact by the learner's problem the measure meets: a measure that answers a printed finding scores higher than one that answers none.
- Rate risk by what could go wrong: it backfires (a ranking that discourages), rests on one person, or uses most of the budget for a late result.
- A measure that answers none of the printed findings (a new feature, a new look, more courses) is a weak choice however attractive it sounds.
- Put the chosen measures in order and say why the first goes first. Going over budget is allowed with a stated reason; saying nothing about what you do not know is not.
:::

:::note Extra · go deeper (optional reading)
**Effort is a rule, impact and risk are judgements.** The effort rule is a convention for this course so that two people rate the same cost the same way. User impact and risk are judgements: two experienced designers can rate them differently and both be right, as long as each can point at a printed fact.
**A prioritisation matrix.** The Nielsen Norman Group describes a prioritisation matrix as a way to plot options on two criteria, for example value to the user against effort, so that the quick wins (high value, low effort) stand out (Gibbons 2018). Here you rate three criteria and show them side by side. The app never adds them up, because adding unlike things hides the trade-off you want to see.
**Reversibility as part of risk.** A measure you can switch off again carries less risk than one that commits the budget. The same thought returns in Materi B3.
:::

^src: Gibbons 2018 (NN/g)

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 is the management level: you assess UX as a strategic competitive factor and set priorities between user value, effort and business goals. Materi B teaches the three things Task 2 asks: argue a UX decision in business terms (B1), weigh conflicting goals (B2), and decide when you do not know enough (B3). The worked examples use LearnLoop again.
:::

## B1 · Why UX matters to the business · 18 min · Core

> For an EdTech company, UX decides whether learners finish and come back, and that is what the business earns from.

:::box In plain words
**The idea.** A learning platform earns when learners finish courses, come back for the next one and recommend it to their employers. Three numbers show it: completion rate (how many of those who start, finish), retention (how many come back) and engagement (how much they do while they are there). All three move with the experience, so a UX decision is also a business decision. And if a competitor's platform is easier to use, learners, and the companies that pay for them, can switch.
**Why it matters.** Route 2 puts you in the chair of SkillUp's Chief UX Officer. Every decision there has to be justified to people who think in completion, retention and cost, not in screens.
**How to read the picture.** The chain reads from left to right: what the learner experiences, what they then do, and which number shows it. Follow it from any of the three experiences to its number.
:::

![From the experience to the numbers a business watches. Typical links, drawn for a learning platform; a real platform checks each link with its own data.](_figures/d1_b1_experience-to-number.png)

| Number | It counts | UX moves it by |
|---|---|---|
| Completion rate | Of those who start a course, how many finish | A clear path, lessons you can follow |
| Retention | How many come back for the next lesson, course or year | Visible progress, a good last experience |
| Engagement | How much learners do while they are there | Tasks and feedback that invite the next step |

:::rules How to decide when this comes up in the task
- Argue a UX decision in the business's numbers: which of completion rate, retention or engagement does it move, and how do you expect to see it?
- A competitor with an easier platform is a business risk, not a design detail: learners and the companies that pay for them can switch.
- A number such as a drop-out rate counts who left, not why. Treat it as a symptom until you know the cause.
:::

:::note Extra · go deeper (optional reading)
**How big is the problem?** Completion is low across online learning. Jordan (2015) collected published figures for 221 open online courses (MOOCs, with data from before 2015) and found a median completion rate of 12.6 percent, with courses ranging from 0.7 to 52.1 percent; longer courses had lower completion, and the first two weeks were the most critical for engagement. A company platform with paid staff learners behaves differently from an open course, so use the figure as a reminder that "most people who start do not finish" is normal, not as a benchmark for SkillUp.
**Two buyers, two views.** An employer judges training on the levels described by Kirkpatrick: reaction, learning, behaviour at work and results. The learner meets only the first two. A UX decision therefore has to work on both sides: the learner must be able to finish (levels 1 and 2), and the employer must see that people finished and that it made a difference (levels 3 and 4).
**Symptom against cause.** A drop-out rate is a symptom. Two platforms can both lose 40 percent of learners for opposite reasons, one because the course is too hard to follow and the other because it is too easy. No number on its own says which; you need to look at the learners.
:::

^src: Norman & Nielsen (NN/g) · ISO 9241-11:2018 · Jordan 2015 · Kirkpatrick & Kirkpatrick 2006

## B2 · Conflicting goals: user value, effort and business goals · 22 min · Core

> In every UX decision goals pull against each other. Name the conflict, say what each side gets and loses, then decide.

:::box In plain words
**The idea.** In every UX decision, goals pull against each other. The plan's own example: usability, depth of content and time pressure. A simple screen is easy to use but may carry less depth; depth takes time the learner may not have. At management level a second tension appears: what is best for the user, what is cheap to build, and what the business asks for. A good decision names the tension in one sentence, says what each side gets, and says what it loses.
**Why it matters.** Block 3.1 asks you to pick three strategic decisions under a limited budget while competitors move. This card gives you the way to weigh them.
**How to read the picture.** The matrix places three options for LearnLoop by the value they give the user (left to right) and the value they give the business (bottom to top). The position is a reading of the example, not a score. The table below it gives the reason for each rating.
:::

![LearnLoop weighs three options against conflicting goals. The position of each option is a reading of the example (Case assumption).](_figures/d1_b2_user-vs-business.png)

:::note A short story: the managing director wants growth
**Step 1 · The managing director wants growth.** Let us look at LearnLoop again, this time at management level. The managing director wants the company to grow this year. At the same time, satisfaction scores are falling and the budget is limited. In the meeting three ideas come up, and each one serves a different goal. The first is more marketing. It serves the growth goal, because it brings new sign-ups quickly.
**Step 2 · The catch.** The new learners arrive, meet the same confusing platform, and many of them leave again. So part of the money is lost, and nothing has become better for the learners who were already there. In other words, the growth goal can only be reached if the user goal is reached as well.
**Step 3 · An option that serves both.** The user team suggests a different idea: simplify the navigation. It is a small change and it can be undone. Learners find their course more easily, and as a result more of them finish, which also helps the business, only more slowly. Compare this with the third idea, adding more courses. It sounds like added value, but a longer catalogue makes finding the right course harder, so it serves a business goal while hurting the user goal.
**Step 4 · How to decide.** A good decision first names the conflict in one sentence, for example quick growth against a platform that learners can actually use. Then it says what each side gets and what it loses, and only then does it decide. When the options are close, prefer the one that can be undone cheaply while you learn more.
:::

| LearnLoop option | User value | Business value | Risk |
|---|---|---|---|
| **Add more courses** (a business goal) | **Low.** More to choose from makes finding the right course harder, not easier. | **Mid.** A bigger catalogue can sell, but only if learners can find what they want. | **Mid.** Money goes into content before the finding problem is fixed. |
| **Simplify the navigation** (a user goal) | **High.** Learners find their course and see what comes next. | **Mid.** Fewer leave, so completion and renewals rise, but slowly. | **Low.** It is a small change that can be undone. |
| **Buy more marketing** (a growth goal) | **Low.** Nothing gets better for the learner who is already there. | **Mid.** More sign-ups in the short term. | **High.** New learners meet the same problems and leave, so the spend is partly lost. |

:::note Case assumption
LearnLoop and the three options are made up for this example.
:::

- The plan's own example of a conflict: usability against depth of content against time pressure. A simple screen is easy to use but may carry less depth; depth takes time the learner may not have.
- At management level a second conflict appears: what is best for the user, what is cheap to build, and what the business asks for.

:::rules How to decide when this comes up in the task
- Name the conflict in one sentence with two legitimate sides (for example depth of content against time to finish) before you decide.
- A decision that gives each side something is not the same as one that serves nobody. Say what each side gets and what it loses.
- A growth goal reached by features learners cannot find does not reach growth: check whether the business goal depends on the user goal.
- Order decisions by what unlocks the others, usually a fix every learner meets (orientation) before an extra.
:::

:::note Extra · go deeper (optional reading)
**Who is in the room.** A stakeholder is anyone affected by a decision or able to influence it: management, the product team, trainers, the customer's HR department, the learners themselves. Each brings a legitimate goal. Naming the conflict in one sentence lets each of them recognise their own goal in it, which makes the trade-off a discussion about priorities and not about who is right.
**Do not hide the loser.** "Everyone wins" is almost never true under a limited budget. If a plan names no loser, someone has not looked closely enough, or the loser is the learner and nobody said so.
:::

^src: Gibbons 2018 (NN/g) · ISO 9241-210:2019

## B3 · Deciding when you do not know enough · 20 min · Core

> When you must decide without the data you want, state what you decide, what you do not know, when you would reverse it, and what you give up.

:::box In plain words
**The idea.** Sometimes you must decide without the data you would like. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also fix how future UX decisions are made: who decides and what evidence they need, so that a decision does not rest on one person's taste.
**Why it matters.** Block 3.2 is exactly this: the risk of your plan, one decision made without complete data, a rule for future decisions, and what you give up.
**How to read the picture.** The four boxes at the top are the parts of a decision made under uncertainty, filled in for LearnLoop. The two boxes below are the rule for future decisions. Read from left to right.
:::

![The four parts of a decision made without complete data, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d1_b3_decision-frame.png)

- **A premortem** (Klein 2007) helps with the risk: imagine the plan has failed and ask why. It brings risks to the surface before the money is spent.
- The plan's coaching says it plainly: UX is not a design problem but a decision problem.

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition is checkable when it has a figure and a time ("below 25% after six weeks"), not when it is a feeling ("if it does not work").
- Prefer the decision you can undo cheaply while you learn; let the rest wait.
- A rule for future UX decisions names who decides and what evidence they need, so that a decision does not rest on one person's taste.
- Giving up nothing means you have not decided: name the thing you postpone.
:::

:::note Extra · go deeper (optional reading)
**One-way and two-way decisions.** Bezos distinguished decisions that are hard to reverse ("one-way doors") from those that can be reversed cheaply ("two-way doors"). Spend the care on the first kind and move quickly on the second. A guided first week that can be switched off is a two-way door; a rewritten catalogue is closer to a one-way door.
**Evidence has a ranking.** Interviews and a usability test with a handful of learners tell you why; drop-out data per lesson tells you where; a competitor comparison tells you what is possible; the opinion of the most senior person in the room tells you what that person thinks. A decision rule that names only the last is a rule about authority, not evidence.
**What "give up" does.** Naming what you postpone makes the plan honest and gives the person who loses something a date to expect an answer. It is the cheapest way to keep trust when the budget is limited.
:::

^src: Klein 2007 · Gibbons 2018 (NN/g) · Bezos 2016
