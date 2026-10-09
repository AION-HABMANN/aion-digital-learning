---
doc: materi
day: 3
kicker: DAY 3 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Learning psychology and cognitive load
subtitle: Understand how people take in and process information, and design screens that steer thinking instead of overloading it
daytitle: Day 3 · Module 2 (day 1 of 2): Fundamentals of learning psychology for UX designers, cognitive load and information processing
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: Not yet published (the link will be added once Day 3 is deployed)
case: Worked examples use LearnLoop, an online-course provider. The task case is EduCore, a learning platform with an overwhelm effect (see the Task document).
intro: This document holds everything you need to study Day 3 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.
glossary: working-memory,long-term-memory,chunking,intrinsic,extraneous,germane,visual-hierarchy,multimedia,seductive,expertise-reversal,retrieval,microlearning,learning-effective,cognitive-load,orientation,feedback,progress-indicator,dropout,completion,engagement,user-impact,roadmap,decision-architecture,conflicting-goals,symptom,kpi,usability-test,qualitative,stakeholder,learning-path
refs: bjork2011,nielsen2000,sweller1988,sweller1998,miller1956,cowan2001,atkinson1968,anderson2001,cepeda2006,roediger2006,mayer2009,mayerMoreno2003,harp1998,kalyuga2003,nielsen1997,nielsen1994,gibbons2018,klein2007,bezos2016
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the basics of learning psychology and to classify cognitive processes and load. Level 2 asks you to analyse and optimise learning interfaces with regard to cognitive load. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · How people learn: intake, processing, storage · 12 min · Core

> Learning happens in three steps: attention picks something, working memory works on it, long-term memory keeps it. A screen can help or hinder each step.

:::box In plain words
**The idea.** Think of learning as three steps. First, intake: of everything on the screen, attention picks only a few things. Second, processing: working memory, a small mental workspace, holds those things and works on them. Third, storage: long-term memory keeps what was understood and revisited. Taking in, understanding and applying are different levels, and each asks more of the interface.
**Why it matters.** In Task 1 you describe how a learning screen feels to the learner. The three steps give you words for it: "I did not know what to look at" is an intake problem, "I lost track of what I had read" is a processing problem.
**How to read the picture.** The first picture shows the three steps from left to right. The second shows the three levels of learning, from taking in to applying. Read both from left to right.
:::

![How people learn: intake, processing, storage. The classic multi-store model (Atkinson and Shiffrin 1968) in a form that designers can use.](_figures/d3_a1_memory-flow.png)

![Three levels of learning, each needs more from the interface than the one before.](_figures/d3_a1_levels.png)

Let us follow Karim, who is learning about data protection after work. The lesson shows a long page. His attention jumps from the menu to a banner to the first line of text, which is intake going wrong: nothing on the screen says what matters. When he finally reads, he has to keep the first sentence in mind to understand the third, which fills working memory so that by the fifth sentence he has lost the thread. Later that week he remembers almost nothing, because nothing asked him to revisit what he had read. The three steps failed one after another, and none of the failures is about content.

- **Attention and motivation.** Attention is selective: learners attend to what is prominent, new or relevant to their goal. Motivation decides whether they spend the effort at all (Day 4).
- **Knowing, understanding, applying.** In the revised Bloom's taxonomy (Anderson and Krathwohl 2001) these correspond to remember, understand and apply. A screen that only presents supports remembering at best; understanding needs examples and links to what the learner already knows; applying needs tasks and feedback.
- **Repetition and context.** Memory is strengthened when learners retrieve information instead of re-reading it (Roediger and Karpicke 2006) and when practice is spread over time (Cepeda et al. 2006). Learning in a realistic context helps the learner see when to use it.

:::rules How to decide when this comes up in the task
- Describe how a screen feels in terms of the three steps: did the learner know what to look at (intake), could they keep it in mind (processing), will they be able to recall it later (storage)?
- Match the screen to the level you want: if the goal is applying, a page of text with no task cannot get the learner there.
- A problem that makes learners stop early is usually an intake or processing problem. A problem that shows up weeks later (they forget) is a storage problem.
- Do not blame the learner's motivation before checking the screen: a screen that wastes attention also kills motivation.
:::

:::note Extra · go deeper (optional reading)
**Retrieval and spacing in an interface.** A short question at the start of the next lesson on the last lesson ("what were the three loads?") uses retrieval practice and spacing at almost no cost. A "review" button at the end that replays the whole lesson does neither, because re-reading is the weaker strategy.
**Context.** The plan names context as part of learning psychology. For a platform it means showing why a unit matters for the learner's job (a work example) before the rule, so that the learner knows what to attend to.
:::

^src: Atkinson & Shiffrin 1968 · Anderson & Krathwohl 2001 · Roediger & Karpicke 2006 · Cepeda et al. 2006

## A2 · Cognitive load: intrinsic, extraneous, germane · 14 min · Core

> The subject sets part of the mental effort. Design decides how much of the rest is wasted. Cut the waste; keep room for understanding.

:::box In plain words
**The idea.** Cognitive load is how much a person has to hold in mind and work out at once, and it is limited. Cognitive Load Theory (Sweller) distinguishes three kinds. Intrinsic load comes from the subject: how many new ideas there are and how much they depend on each other. Extraneous load comes from poor design: clutter, a wall of text, unclear structure. Germane load is the effort that goes into understanding: linking ideas and working an example. The goal is to minimise the unnecessary load.
**Why it matters.** In Task 1 you analyse a platform that learners call "too complicated" and decide what to change. The three loads tell you which part you can change by design (the second), which you can only order (the first) and which you want to leave room for (the third).
**How to read the picture.** Each bar is the learner's working memory at one moment. In the top bar, clutter and a wall of text (extraneous load) take more than half of it. In the bottom bar the same lesson has been redesigned: the subject is the same, the waste is small, and most of the capacity goes to understanding. The numbers are illustrative.
:::

![The three loads in one learner's working memory. Illustrative figures: the subject stays the same, the design decides how much is wasted.](_figures/d3_a2_three-loads.png)

| Load | Where it comes from | What a designer can do | Example in a lesson |
|---|---|---|---|
| **Intrinsic** | The subject: how many new ideas, how linked | Order it: start with the simplest idea, introduce one new idea at a time | Explaining "legitimate interest" before the learner knows what personal data is |
| **Extraneous** | The presentation: clutter, structure, wording | Remove it: cut what does not help, structure the rest, explain terms in place | A banner, a chat window and a menu next to a 500-word block |
| **Germane** | Making sense of the content | Make room for it: add an example, a question, a link to what the learner knows | A short exercise that applies the rule to a case from the learner's work |

:::note A short story: Daniel and the banner
**Step 1.** Let us follow Daniel, who works in procurement and is studying contract basics on a platform. The lesson he opens is hard, because contracts are hard: this is intrinsic load, and no design can remove it.
**Step 2.** The page also shows a news banner, a chat window and a menu with nine entries, and the text is one block without headings. Daniel has to ignore all of that while trying to understand a clause. This effort teaches him nothing about contracts, so it is extraneous load.
**Step 3.** In the redesigned version the page shows one heading, three short paragraphs, one diagram of the clause and a question at the end. The subject is exactly as hard as before, but the effort now goes into the clause itself. That is germane load, and it is what the lesson was meant to ask.
:::

:::note Case assumption
Karim, Daniel and the lessons are made up for this card.
:::

:::rules How to decide when this comes up in the task
- Name the kind of load: if the cause is the subject, it is intrinsic and you can only order it; if the cause is how the screen is built, it is extraneous and you should cut it.
- Most "this is too complicated" complaints on a platform come from extraneous load: too much at once, no visual structure, no recognisable order.
- Do not remove intrinsic load by deleting the content the learner needs. Split it, order it and support it instead.
- Keep room for germane load: a screen with nothing to think about is not learning-effective just because it is light.
:::

:::note Extra · go deeper (optional reading)
**Where the theory comes from.** Sweller (1988) showed that people learn problem solving less well when the task itself consumes working memory; Sweller, van Merriënboer and Paas (1998) set out the three kinds of load. Germane load has been revised by later work and is the most debated of the three; for design decisions the practical split into effort that helps learning and effort that does not is the part that counts.
**Mayer and Moreno's design measures.** Mayer and Moreno (2003) list nine ways to reduce load in multimedia learning, for example removing extra material (coherence), marking what matters (signalling), splitting a lesson into learner-paced parts (segmenting) and placing words next to the picture they explain (spatial contiguity).
:::

^src: Sweller 1988 · Sweller et al. 1998 · Mayer & Moreno 2003

## A3 · Working memory, chunking and focus in the interface · 14 min · Core

> Working memory holds only a few items. Group things into chunks, and use size, contrast and position to tell the eye what comes first.

:::box In plain words
**The idea.** Working memory can hold only a few new things at once. Miller (1956) famously put it at seven plus or minus two; later work (Cowan 2001) suggests about four chunks for new material. A chunk is a meaningful group: a phone number written in groups is easier than eleven loose digits. On a screen you help in two ways: by chunking the content, and by using a visual hierarchy (size, colour, contrast, position) so that attention goes to the main thing first.
**Why it matters.** In Task 1 you decide how to reduce load. Chunking and visual hierarchy are the two most direct tools, and the task's measures use their names.
**How to read the picture.** On the left are twelve loose items. On the right are the same twelve items in three chunks with a name each. Count how many things you must hold in each case.
:::

![Chunking: the same twelve items as twelve loose things and as three groups.](_figures/d3_a3_chunking.png)

- **Chunking in a lesson:** split a long lesson into units of five to seven minutes, each with one goal; group menu entries; give each group a name.
- **Visual hierarchy:** the most important element is the largest, highest-contrast or best-placed. A heading above a paragraph, a primary button next to a quieter secondary one, the key sentence of a lesson marked in bold.
- **Focus control:** remove or quiet what is not needed for the current step (banners, chat, news) while the learner works on the content.
- **Text and pictures:** a relevant picture next to the words that it explains helps (Mayer's multimedia principle); a decorative picture or an interesting but irrelevant detail does not (Harp and Mayer 1998 found that such "seductive details" reduced learning).

:::rules How to decide when this comes up in the task
- If a screen shows more than about four separate things at once that the learner must handle, group them or hide some of them.
- Use a visual hierarchy to answer "what should I look at first?" For a lesson, that is the heading, then the key sentence, then the explanation.
- Chunk the content (units with one goal) and chunk the interface (groups with names); both reduce what the learner must hold.
- A diagram helps when it shows a structure or flow that text describes badly, and when its labels are inside it. A picture that does not explain anything is clutter.
- Remove what does not help the goal of the screen before you add anything.
:::

:::note Extra · go deeper (optional reading)
**Why four and not seven.** Miller's seven plus or minus two was a landmark paper but counted items that people had already learned to chunk. Cowan's (2001) review of later studies suggests that when chunking cannot be used, capacity is about four. For design this is the safer number: plan for few items.
**Reading behaviour.** On web pages most readers scan, they do not read word by word: in Nielsen's study 79 percent of test users always scanned a new page and only 16 percent read word for word (Nielsen 1997). A lesson is read more closely than a news page, but a tired learner scans too. Headings, short paragraphs and one idea per paragraph let a scanning reader find the point.
:::

^src: Miller 1956 · Cowan 2001 · Mayer 2009 · Harp & Mayer 1998 · Nielsen 1997

## A4 · Typical UX mistakes seen through psychology · 10 min · Optional

> Four mistakes recur: overload, unclear structure, missing feedback and complex navigation. Each has a psychological cost and a typical remedy.

:::box In plain words
**The idea.** The plan lists four typical UX mistakes: information overload, unclear structure, missing feedback and overly complex navigation. Seen through psychology, each one wastes a limited resource: attention, working memory, or the learner's wish to carry on.
**Why it matters.** It gives you a checklist for reading any learning screen, and a plain way to say what each mistake does to the learner.
**How to read the picture.** Each row reads from left to right: the mistake, what it does in the learner's head, and a way to reduce it.
:::

![Four typical UX mistakes, what they do in the learner's head, and a way to reduce each.](_figures/d3_a4_mistakes.png)

:::rules How to decide when this comes up in the task
- Information overload is about too many things at once (amount). Unclear structure is about how things are arranged (form). Missing feedback is about not knowing the result. Complex navigation is about effort spent on finding.
- Name the remedy in terms of the load it removes: "group the menu into three" removes extraneous load, "mark the key sentence" directs attention.
- Do not call something a mistake only because it looks plain: ask what it does to the learner.
:::

:::note Extra · go deeper (optional reading)
**Expertise changes the answer.** Guidance and simplification that help beginners can hinder experts, who find the extra support redundant. This is the expertise reversal effect (Kalyuga et al. 2003). If your learners are beginners, as in the plan's Day 3 task, support them heavily; for an advanced audience, make it possible to skip.
**Too simple is also a mistake.** Removing difficulty that is part of the learning (for example a worked problem that the learner must try) lowers germane load as well. Materi B2 returns to this as the risk of "too much simplification".
:::

^src: Sweller et al. 1998 · Kalyuga et al. 2003

## A5 · Weighing a load-reducing measure: learning impact, effort, risk · 10 min · Core

> Rate each measure on how much it helps learning, what it costs and what could go wrong. Cheap and direct usually beats big and slow when time is short.

:::box In plain words
**The idea.** To choose between ways of reducing load, rate each on the same three questions. Learning impact: how much does it help learners understand? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong, for example that too much is removed. Then put the measures in order and say why the first goes first.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this under a time limit. The example here uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** The bars show the cost of three LearnLoop measures. The coloured bands behind them are the effort rule. The dashed line is the budget. The table below the picture gives the rating of each option and the reason.
:::

![LearnLoop weighs three load-reducing measures. Cost against the effort rule and the budget (Case assumption).](_figures/d3_a5_options-cost.png)

:::note A short story: LearnLoop's hard course
**Step 1.** Let us look at LearnLoop again. A course for beginners on a technical subject is rated "too complicated", the content has to stay, and the team has four weeks and €30,000. Three ideas are on the table, and we rate each on learning impact, effort and risk.
**Step 2 · Shorten the content a lot.** It costs €6,000, so the effort is Low. But the content is professionally necessary, so shortening it a lot removes things learners need: the risk is High, and the impact is Low because what is left may no longer teach the subject.
**Step 3 · Add diagrams and graphics.** It costs €16,000, which is above €15,000, so the effort is High. A good diagram helps with structures and flows, so the impact is Mid, but it takes the whole four weeks, so the risk is Mid.
**Step 4 · Split into small modules.** It costs €12,000, so the effort is Mid. Chunking reduces what the learner holds at once without deleting content, so the impact is High, and the risk is Low because the content is the same and the split can be adjusted.
:::

| LearnLoop measure | Learning impact | Effort | Risk |
|---|---|---|---|
| **Shorten the content a lot** · €6,000 | **Low.** Beginners need the content; cutting it removes what they came for. | **Low.** €6,000 is under €8,000. | **High.** Too much is lost, and it cannot easily be put back. |
| **Add diagrams and graphics** · €16,000 | **Mid.** A diagram helps where a structure or flow is described, not everywhere. | **High.** €16,000 is above €15,000. | **Mid.** It uses the whole four weeks; weak diagrams add clutter. |
| **Split into small modules** · €12,000 | **High.** Less to hold at once, and the content is kept. | **Mid.** €12,000 lies between €8,000 and €15,000. | **Low.** Same content, small units, can be adjusted. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €8,000 is Low; €8,000 to €15,000 is Mid; above €15,000 is High.
- Rate learning impact by the load it removes from what the learner actually does (reading, finding, holding), and whether it keeps the content the learner needs.
- Rate risk by what could be lost or go wrong: removing needed content is a high risk; a change that can be undone is a low risk.
- A measure that makes the screen lighter but not the learning better (a decoration, a new look) has a low learning impact.
- Say which measure has the greatest effect and why, and name the information you lack (for example, whether learners are overloaded by amount or by wording).
:::

^src: Gibbons 2018 (NN/g) · Sweller et al. 1998

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to prioritise UX design decisions on the basis of learning effectiveness and cognitive efficiency. Materi B teaches the three things Task 2 asks: use effectiveness and efficiency as measures (B1), weigh the conflict between efficiency and deep learning (B2), and decide without user data (B3).
:::

## B1 · Learning effectiveness and cognitive efficiency as strategic measures · 18 min · Core

> A UX decision is strategic when it changes what learners can do afterwards and the mental cost of getting there. Define "learning-effective UX" and judge decisions by it.

:::box In plain words
**The idea.** Two lenses help a manager judge a UX decision. Learning effectiveness asks whether the learner learned what the course promised. Cognitive efficiency asks how much mental effort that took. A design can be easy and teach nothing, or hard and teach a lot. The aim is a design that gets the learning result at a reasonable mental cost; this card calls it learning-effective UX.
**Why it matters.** Task 2 asks you to write a definition of learning-effective UX and to prioritise three measures by it. The definition is what lets you say "no" to a measure that only makes things look simpler.
**How to read the picture.** The chain reads from left to right: learning effectiveness, cognitive efficiency, and where both lead: learners who finish and employers who see results.
:::

![Two lenses on a UX decision, and where they lead.](_figures/d3_b1_effectiveness-chain.png)

**A definition you can adapt.** "A learning-effective UX is one in which a learner of the intended level can reach the stated learning goal with as little effort as possible that does not help learning, shown by what they can explain or do afterwards." Notice that this definition names the learner (intended level), the goal (stated), the cost (effort that does not help) and the proof (explain or do). A definition without a proof cannot be tested.

| Question a manager asks | What it measures | Typical evidence |
|---|---|---|
| Did learners learn what we promised? | Effectiveness | A comprehension check, a task in a test, a result after the course |
| How much effort did it take? | Efficiency | Time to finish, errors, a short rating of effort, observed hesitation |
| Do learners finish and come back? | Business result | Completion rate, retention |

:::rules How to decide when this comes up in the task
- Judge a measure on both lenses: does it help learners learn (effectiveness), and does it cost less unnecessary effort (efficiency)? A measure that lowers effort but also lowers learning is not an improvement.
- Define "learning-effective" with a learner, a goal, a cost and a proof, so that it can be checked.
- Prioritise first the measures that remove extraneous load for every learner (structure, chunking) before those that add something (a new feature).
- A drop-out rate is a symptom. Use it to find where to look, then use a test to find the cause.
:::

:::note Extra · go deeper (optional reading)
**Learning is not the same as satisfaction.** Learners may rate a very easy course highly and learn little. The Kirkpatrick levels (reaction, learning, behaviour, results) are a reminder to measure beyond the first. A platform manager therefore needs at least one measure of learning, not only of ratings.
**Desirable difficulty.** Some effort helps memory (trying to recall an answer), which is why "as little effort as possible" in the definition is qualified by "that does not help learning".
:::

^src: Sweller et al. 1998 · Mayer 2009 · Roediger & Karpicke 2006

## B2 · Conflicting goals: efficiency, deep learning and over-simplification · 22 min · Core

> Lighter is not always better. Efficiency and depth pull against each other; name what each option keeps and what it loses.

:::box In plain words
**The idea.** The plan's conflict for Day 3 is efficiency against deep learning, and its risk question is "where is the risk of too much simplification?". Making content lighter helps beginners, but removing the difficulty that is part of the learning leaves learners with a feeling of understanding and little ability. The decision is how much load to remove and how much to keep.
**Why it matters.** Task 2 asks for a risk analysis of content that is too simple against content that is too complex. This card gives you the two sides.
**How to read the picture.** The matrix places five options for a hard course by how much mental load they remove (left to right) and how much depth they keep (bottom to top). The position is a reading of the example, not a score. The top right is the aim: much load removed, depth kept.
:::

![Five options for a hard course by mental load removed and depth kept. LearnLoop example, Case assumption.](_figures/d3_b2_load-vs-depth.png)

| | Too simple | Too complex |
|---|---|---|
| What the learner experiences | A feeling of understanding, but cannot apply it | A feeling of being lost, and stops |
| What was removed or left in | Examples, practice and the hard steps | Clutter, wall of text, missing structure |
| Typical sign in the data | High completion, low results in a test or at work | High drop-out, long time on early lessons |
| Remedy | Restore the worked example and a task; let experts skip | Chunk, structure, explain terms in place |

:::rules How to decide when this comes up in the task
- Name both risks: content that is too simple (learners finish and cannot apply) and content that is too complex (learners leave). A plan that names only one has not weighed the conflict.
- Remove extraneous load first; keep the intrinsic difficulty the course exists to teach, and support it.
- For beginners support more; for experienced learners let them skip. Guidance that helps one group can hinder the other (expertise reversal).
- To tell the two risks apart you need both a completion measure and a measure of what learners can do afterwards.
:::

:::note Extra · go deeper (optional reading)
**UX as a learning amplifier.** The plan's discussion line is "UX as a learning amplifier". A good interface does not replace the effort of learning; it directs that effort to the right place. When you argue for a UX measure to management, say which learning effort it protects.
**Efficiency against deep learning.** Efficient learning (fast, light) is right for routine knowledge such as a form's fields. Deep learning (slow, effortful) is right for judgement such as assessing a contract risk. A platform that serves both needs to tell them apart in its design.
:::

^src: Sweller et al. 1998 · Kalyuga et al. 2003 · Bjork & Bjork 2011

## B3 · Deciding without user data: assume, test, and set a rule for content · 20 min · Core

> When you have no user data, state your assumption, choose a step you can test and undo, and fix how future content decisions are made.

:::box In plain words
**The idea.** The plan asks you to decide under uncertainty, for example without user data. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also set a decision logic for future content: who decides and what evidence they need.
**Why it matters.** Block 3.2 asks for exactly this, and for a rule that will be used for every new lesson.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![The four parts of a decision made without user data, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d3_b3_decision-frame.png)

- **No data is still a decision.** Choose the step whose result will tell you most and which you can undo: rebuild one course, test it with five beginners, and decide the rest afterwards.
- **A reversal condition has a figure and a time.** "Fewer than four of five beginners can explain the key point" is a figure; "if it does not work" is not.
- **Decision logic for future content.** Name who decides (a role) and which checks every new lesson passes: one goal, a size that fits the time, the key sentence marked, terms explained, a check at the end.
- **A premortem helps.** Imagine in a year that learners still call the platform too complicated: what went wrong? The answers become checks.

:::rules How to decide when this comes up in the task
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
- A reversal condition is checkable only with a figure and a time, set before the test starts.
- Prefer a step you can undo and learn from; leave the large, hard-to-undo decision for after the evidence.
- A decision logic for content names a role that decides and the checks that a lesson must pass; a style guide that nobody checks is not a decision logic.
- Giving up nothing means you have not decided: name what you postpone.
:::

:::note Extra · go deeper (optional reading)
**Evidence without a big study.** With five beginners you can learn most of what is wrong with a lesson (see Day 2, card A3). Ask each to explain the key point in their own words after reading: this is a cheap check of effectiveness that works without any platform data.
**One-way and two-way doors.** Bezos distinguishes decisions that are hard to reverse from decisions that can be reversed cheaply. Rebuilding one course is a two-way door; replacing the whole content library is closer to a one-way door.
:::

^src: Klein 2007 · Bezos 2016 · Nielsen 2000 · Mayer 2009
