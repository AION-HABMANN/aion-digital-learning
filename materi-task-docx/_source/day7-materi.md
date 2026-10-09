---
doc: materi
day: 7
kicker: DAY 7 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Accessibility, inclusive design and the evaluation of UX concepts
subtitle: Find the barriers that exclude learners, design inclusive solutions, and build a system that measures UX quality
daytitle: Day 7 · Module 3 (day 3 of 3): Accessibility and inclusive design of learning platforms, integration and evaluation of user-centred UX concepts
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
website: Not yet published (the link will be added once Day 7 is deployed)
case: Worked examples use LearnLoop, an online-course provider. The task case is InclusiveLearn, a platform with access problems (see the Task document).
intro: This document holds everything you need to study Day 7 without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. The legal references (BFSG, EN 301 549, BITV 2.0) are in flux; check them before you teach from them. Glossary and references are at the end.
glossary: accessibility,inclusive-design,persona-spectrum,wcag,pour,conformance,contrast,screen-reader,keyboard,aria,plain-language,udl,bfsg,overlay,audit,sus,cognitive-load,usability,persona,journey,iterative,kpi,qualitative,usability-test,dropout,completion,engagement,user-impact,roadmap,decision-architecture,conflicting-goals,stakeholder,symptom
refs: gdpr,wcag22,wcagUnderstanding,en301549,bfsg,bitv,castUdl,who2022,msInclusive,w3cAria,iso924111,brooke1996,rodden2010,nielsen2000,gibbons2018,klein2007,bezos2016
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. The plan's Level 1 asks you to understand the basics of accessibility and inclusive UX design and to know the principles of integration and evaluation. Level 2 asks you to identify barriers, develop inclusive solutions and assess UX concepts. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.
:::

## A1 · Accessibility and inclusive design: what they are and why they matter · 12 min · Core

> Accessibility means everyone can get in; usability means the user can reach the goal. Inclusive design starts from the fact that abilities differ and change.

:::box In plain words
**The idea.** Accessibility means enabling access for all user groups: people who cannot see well, cannot hear, cannot use a mouse or find complex text hard. It differs from usability, which asks whether users can reach their goals with effectiveness, efficiency and satisfaction. A platform can be usable for most and still closed to some. Inclusive design goes further: it plans for differences from the start, instead of fixing them at the end.
**Why it matters.** In Task 1 you look at a platform where users with impairments drop out although the content is good. This card gives you the vocabulary and the reason to treat access as a core quality.
**How to read the picture.** Each row is an ability. The columns show a limit that can be permanent, temporary or situational. Read across: the same barrier hits very different people.
:::

![The persona spectrum (after Microsoft's inclusive design toolkit): permanent, temporary and situational limits.](_figures/d7_a1_persona-spectrum.png)

Let us look at why the spectrum matters for a platform. A video without captions blocks a deaf learner (permanent). It also blocks a learner who has an ear infection this week (temporary), and a learner on a noisy train without headphones (situational). Captions therefore serve far more people than the group they were designed for. The same holds for a keyboard-operable quiz, a clear contrast and plain wording. This is why accessibility is not a niche: the WHO estimates that about 1.3 billion people, around one in six, live with a significant disability (WHO 2022), and many more meet a temporary or situational limit.

- **Accessibility against usability.** Usability (ISO 9241-11) is judged for specified users in a context of use. Accessibility asks whether the specified users include the full range of abilities. Both are needed.
- **The rules around it (in flux).** In Europe, the European Accessibility Act (Directive 2019/882) is applied in Germany through the BFSG, which has applied since 28 June 2025 to many consumer-facing digital services. The technical reference is EN 301 549, which for web content refers to WCAG. Public bodies follow BITV 2.0. Whether and how a learning platform is covered depends on the service: a platform that only serves companies as customers may fall outside the BFSG's consumer scope, while registration and contracts with consumers may bring it in. State the year, and check scope and exemptions with a lawyer before you decide.

:::rules How to decide when this comes up in the task
- Say what a barrier stops a learner from doing, and who it affects: permanent, temporary and situational groups.
- Treat accessibility as a core quality, not an add-on. Ask of every measure: does it open the platform to more learners, or only improve it for those who are already in?
- A barrier that blocks one group often hurts others in some situations (captions, contrast, keyboard use). Count all of them when you estimate reach.
- Do not state legal obligations as certain. Name the rule, the year and what is still unclear.
:::

:::note Extra · go deeper (optional reading)
**Universal Design for Learning.** CAST's UDL framework (2024) asks for multiple means of engagement, representation, and action and expression. It is the learning-specific side of inclusive design: the same content offered as text, captioned video and audio lets learners choose.
**Accessibility is not the same as an add-on.** A platform in which accessibility is added at the end has to retrofit every screen. Practitioners and the W3C's accessibility business-case materials argue that planning early avoids costly rework. The figure differs by project, so treat it as a direction.
:::

^src: ISO 9241-11:2018 · WHO 2022 · Microsoft 2016 · CAST 2024 · BFSG, EN 301 549 and BITV 2.0 (in flux)

## A2 · Barriers and the four principles: perceivable, operable, understandable, robust · 14 min · Core

> Barriers are visual, cognitive or motor. WCAG sorts the ways to remove them under four principles that you can apply to any screen.

:::box In plain words
**The idea.** The plan names three types of barrier: visual (contrast, font), cognitive (complexity) and motor (operability). The WCAG standard organises its requirements under four principles: perceivable, operable, understandable and robust (POUR). The plan's three principles of inclusive design (perceivability, understandability, operability) are the first three of them.
**Why it matters.** In Block 1.1 you sort facts about a platform into these principles, and in Block 2.2 you choose measures that remove the barriers.
**How to read the picture.** The first picture shows the four principles with a question and typical requirements. The second shows the three barrier types, a typical barrier and a remedy.
:::

![WCAG 2.2: four principles, often called POUR.](_figures/d7_a2_pour.png)

![Three types of barrier, a typical barrier and a typical remedy.](_figures/d7_a2_barrier-types.png)

| Principle | A learner's question | Success criteria that matter on a learning platform (level) |
|---|---|---|
| **Perceivable** | Can I see or hear it? | 1.1.1 Text alternatives for images (A) · 1.2.2 Captions for recorded video (A) · 1.4.1 Colour is not the only means of conveying information (A) · 1.4.3 Contrast of at least 4.5 : 1 for normal text, 3 : 1 for large (AA) · 1.4.4 Text can be resized to 200% (AA) · 1.4.10 Reflow: content works at 320 CSS px wide without two-way scrolling (AA) |
| **Operable** | Can I use it? | 2.1.1 Everything works by keyboard (A) · 2.4.7 The focus is visible (AA) · 2.4.11 The focused element is not hidden by other content (AA, new in 2.2) · 2.5.7 A drag action also works without dragging (AA, new in 2.2) · 2.5.8 Pointer targets are at least 24 × 24 CSS px (AA, new in 2.2) |
| **Understandable** | Can I follow it? | 3.1.1 The page language is set (A) · 3.3.2 Fields have labels or instructions (A) · 3.3.8 Logging in does not depend on remembering or solving a puzzle (AA, new in 2.2) |
| **Robust** | Does it work with my tools? | 4.1.2 Name, role and value are available to assistive technology (A) |

WCAG 2.2 (W3C Recommendation, October 2023) has 86 success criteria. It adds nine to WCAG 2.1 and removes one (4.1.1 Parsing). Level AA is the usual target in law and policy, and the EN 301 549 standard that the BFSG relies on is currently tied to WCAG 2.1 for web content, with a revision expected to refer to WCAG 2.2: because 2.2 is backward-compatible, aiming at 2.2 AA is a safe choice, but check the current reference.

:::note A short story: Lena and the quiz
**Step 1.** Let us follow Lena, a learner who uses only a keyboard because she cannot use a mouse after an injury. She opens a quiz on LearnLoop that asks her to drag five items onto five boxes.
**Step 2.** She cannot do it: dragging needs a mouse, and the quiz has no other way. She is blocked by one operable-principle failure, although the content is excellent.
**Step 3.** The fix is small: each item can also be chosen and placed with the keyboard (WCAG 2.5.7 and 2.1.1). After that, Lena can finish, and so can a learner on a phone who finds dragging awkward.
:::

:::note Case assumption
Lena and the LearnLoop quiz are made up for this example.
:::

:::rules How to decide when this comes up in the task
- Sort a barrier by the principle it breaks: cannot see or hear (perceivable), cannot use (operable), cannot follow (understandable). Pick the first one it breaks.
- Name the barrier type too: visual (contrast, text size, colour only), cognitive (complexity, language, steps), motor (target size, drag only, keyboard).
- A fix that works with the keyboard, large targets and clear contrast usually helps several groups at once.
- Automated checks find only some problems; a manual check with the keyboard and a screen reader finds more. Do not call a page accessible because a tool passed.
:::

:::note Extra · go deeper (optional reading)
**Using ARIA.** WAI-ARIA lets developers add names, roles and states for custom controls. The first rule in the W3C's guidance is to use native HTML (a real button) when it does the job, because native elements already work with keyboards and assistive technology.
**New in WCAG 2.2.** The nine additions include focus not obscured, dragging alternatives, a minimum target size, consistent help, redundant entry and accessible authentication. For a learning platform, dragging quizzes, sticky headers that hide focus, and login that blocks password managers are the typical failures.
:::

^src: WCAG 2.2 (W3C 2023) · Understanding WCAG 2.2 (W3C) · Using ARIA (W3C)

## A3 · Inclusive learning: plain language, lower load and flexibility · 10 min · Core

> An inclusive platform is easy to read, light on the mind, and lets the learner choose how to learn.

:::box In plain words
**The idea.** Beyond sensory and motor access, inclusion has a cognitive side. The plan names three tools: plain language and clear structure, reduction of cognitive load (the link to Day 3), and flexibility, meaning different learning paths. Together they make a platform open to learners with learning difficulties, a different first language, a tired mind or little time.
**Why it matters.** In Task 1 you choose measures against cognitive barriers (complex language, many steps). This card gives you the three tools and a way to say what each does.
**How to read the picture.** Each row sets a hard-to-read version next to an easier one. The arrows show the change.
:::

![Plain language, structure and flexibility in an inclusive learning platform.](_figures/d7_a3_plain-language.png)

- **Plain language.** In German there are two forms: Einfache Sprache (simple language, fewer rules) and Leichte Sprache (easy-to-read language with strict rules, for people with learning difficulties). WCAG has a reading-level criterion at Level AAA (3.1.5). Day 14 treats it in depth.
- **Clear structure and low load.** Headings, short paragraphs, one task per screen and explained terms reduce extraneous load (Day 3). Fewer steps in a form help everyone.
- **Flexibility.** Offer the content in more than one form (text, captioned video, a transcript, audio) and let the learner skip what they know. This follows Universal Design for Learning.

:::rules How to decide when this comes up in the task
- Name which of the three tools a measure uses: plain language, lower load or flexibility.
- Rewrite instructions in everyday words and short sentences; explain every error and say what to do.
- Offer more than one way to reach the same content; do not force one format.
- A cognitive barrier is real even when a screen passes every technical check. Test it with learners who find reading hard.
:::

:::note Extra · go deeper (optional reading)
**Link to Day 3.** Plain language and clear structure lower extraneous load. Inclusive design is therefore also the quickest route to a lighter platform for everyone.
**Link to Day 14.** The next module on plain language and intuitive environments continues here with testing and rewriting.
:::

^src: CAST 2024 (UDL) · WCAG 2.2 (3.1.5) · Sweller et al. 1998 (Day 3)

## A4 · Integrating and evaluating user-centred UX concepts · 12 min · Optional

> UX quality is not a single step. Join personas, journeys and design, build them into the organisation, and measure with tests, feedback and data.

:::box In plain words
**The idea.** The plan asks for the integration of user-centred concepts: combining personas, journeys and design; treating UX as a continuous process, not a single step; and building it into development and the organisation. It also asks for evaluation: measuring satisfaction, usage and drop-out rates, with tests, feedback and data analysis, and improving iteratively.
**Why it matters.** The plan's Level 3 task asks for an integration into existing processes and an evaluation system. This card gives you the building blocks.
**How to read the picture.** The loop shows four stages: plan, design, build, evaluate. In each stage the same question is asked: does this work for all learners? Evaluation feeds the next plan.
:::

![Integrating and evaluating UX continuously.](_figures/d7_a4_continuous.png)

| Where to integrate | What it looks like for accessibility |
|---|---|
| **Planning** | Personas and journeys include learners with access needs |
| **Design** | A pattern library whose components are checked against WCAG |
| **Development** | Accessibility is part of the definition of "done"; automated checks in every release |
| **Content** | Authors follow a plain-language and caption standard |
| **Buying** | Third-party tools are checked before purchase |
| **Support** | A channel for access problems with a promised reply time |

| What to measure | Method |
|---|---|
| Satisfaction | A short questionnaire such as SUS, asked per user group |
| Usage and task success | Analytics by user group; tests with real tasks |
| Drop-out | Where and how many leave, by group |
| Access quality | A manual audit (keyboard, screen reader) plus automated checks |

:::rules How to decide when this comes up in the task
- Choose evaluation methods that give different kinds of evidence: a test with users with impairments (why), data by group (how many), an audit against WCAG (does it meet the criteria).
- Measure by group. An average score can hide a group that cannot use the platform.
- Make evaluation continuous: a check in every release and a regular test with users, not one audit.
- Automated tools find only part of the problems; they cannot replace a manual check or a user test.
:::

:::note Extra · go deeper (optional reading)
**SUS and HEART.** The System Usability Scale (Brooke 1996) is a ten-item questionnaire with a score from 0 to 100. Google's HEART framework (Rodden et al. 2010) lists happiness, engagement, adoption, retention and task success as categories of user-centred metrics. Day 16 treats them in detail.
**Small tests are enough to start.** Five users per group find most problems in a focused test (Nielsen 2000, Day 2). Recruit at least some learners with impairments; their findings differ from the rest.
:::

^src: Brooke 1996 · Rodden et al. 2010 · Nielsen 2000 · ISO 9241-11:2018

## A5 · Weighing an inclusion measure: user impact, effort, risk · 12 min · Core

> Rate a measure by the learners it opens the platform to, what it costs and what could go wrong. Prefer fixes at the source to quick patches.

:::box In plain words
**The idea.** To choose between measures, rate each on three questions. User impact: how many learners does it open the platform to, and how much does it help them? Effort: money and time, decided here by a rule: under €10,000 is Low, up to €25,000 is Mid, above that is High. Risk: what could go wrong, for example that a quick patch hides the problem without fixing it.
**Why it matters.** Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.
**How to read the picture.** The bars show the cost of three LearnLoop measures. The coloured bands are the effort rule. The dashed line is the budget.
:::

![LearnLoop weighs three measures. Cost against the effort rule and the budget (Case assumption).](_figures/d7_a5_options-cost.png)

:::note A short story: LearnLoop chooses
**Step 1.** Let us look at LearnLoop again. Users with impairments drop out, complaints are increasing, time is short, and the budget is €45,000. Three ideas are on the table.
**Step 2 · A new quiz-battle feature.** It costs €30,000, so the effort is High. It is a new feature for engagement, and it opens the platform to nobody who is currently excluded; the user impact on the excluded groups is Low. The risk is Mid, because a new drag-based game could add new barriers.
**Step 3 · Captions and keyboard use for ten courses.** It costs €14,000, so the effort is Mid. It removes two blocking barriers for the most-used courses, and it helps more groups (deaf, keyboard users, learners on a train), so the user impact is High and the risk is Low.
**Step 4 · Instructions in plain language.** It costs €8,000, so the effort is Low. It helps learners with reading difficulties and a different first language, and everyone in a hurry, so the user impact is Mid to High, and the risk is Low.
:::

| LearnLoop measure | User impact | Effort | Risk |
|---|---|---|---|
| **A new quiz-battle feature** · €30,000 | **Low** for excluded groups: it opens nothing. | **High.** €30,000 is above €25,000. | **Mid.** A new drag-based game could create new barriers. |
| **Captions and keyboard use for ten courses** · €14,000 | **High.** It removes two blocking barriers for several groups. | **Mid.** €14,000 lies between €10,000 and €25,000. | **Low.** It fixes the source and can be tested. |
| **Instructions in plain language** · €8,000 | **Mid to High.** It helps readers with difficulties and many others. | **Low.** €8,000 is under €10,000. | **Low.** It changes wording, not structure. |

:::note Case assumption
LearnLoop, its costs and its reasons are made up for this example. The task case is in the Task document.
:::

:::rules How to decide when this comes up in the task
- Rate effort by the printed cost: under €10,000 is Low; €10,000 to €25,000 is Mid; above €25,000 is High.
- Rate user impact by the barrier it removes and the groups it reaches. A measure that adds new features and removes no barrier has a low impact on excluded groups.
- Rate risk by what could go wrong: a fix that only hides a problem (an overlay) or a new feature that adds new barriers carries more risk than a fix at the source.
- Fix the source (content, code) before you add a layer on top. A toolbar that promises automatic compliance does not remove the barriers underneath.
- Say how you will evaluate the measure: which method and which group.
- Choose evaluation methods that give different kinds of evidence: a test with users with impairments (why), data by group (how many), a manual audit against WCAG (does it meet the criteria). Automated checks find only part of the problems, so they never stand alone.
:::

^src: Gibbons 2018 (NN/g) · WCAG 2.2 · Nielsen 2000

---pagebreak---

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards. Level 3 asks you to prioritise inclusion strategically and to evaluate UX quality systematically. Materi B teaches the three things Task 2 asks: inclusion as a strategic quality (B1), the conflict between inclusion and cost and between integration and add-on (B2), and an evaluation system plus a decision under uncertainty (B3).
:::

## B1 · Inclusion as a strategic quality · 18 min · Core

> Accessibility is a core quality that widens reach, meets growing requirements and improves the platform for everyone.

:::box In plain words
**The idea.** The plan's coaching says accessibility is not an add-on but a core quality, and that inclusive systems are more successful in the long run. Three reasons stand behind it: rules and customer expectations, reach, and long-term quality.
**Why it matters.** Task 2 asks for a strategy for inclusive UX in a company whose platform is growing but does not reach all groups, under growing accessibility requirements and limited resources.
**How to read the picture.** The chain reads from left to right: the rules and expectations, the reach, the long-term quality.
:::

![Why inclusion is a strategic quality, not an add-on.](_figures/d7_b1_strategic-chain.png)

| Reason | What it means | What to watch |
|---|---|---|
| **Rules and expectations** | Law (BFSG for many consumer services since June 2025, BITV 2.0 for public bodies), the standard EN 301 549, and customers who ask for WCAG conformance in tenders | The rules are in flux; scope and dates need checking; B2B platforms may be covered through customers' demands even where the law does not reach them |
| **Reach** | About one in six people has a significant disability (WHO 2022), and many more meet temporary or situational limits | Reach is measurable: count which groups finish and which do not |
| **Long-term quality** | Plain language, clear structure and keyboard use help everyone | Retrofitting later is more expensive than building in |

:::rules How to decide when this comes up in the task
- State the strategic case in three parts: rules and expectations, reach, and long-term quality. Add the cost of not acting.
- Say which groups the platform does not reach today, and how you know (or will find out).
- Write legal statements with care: the rule, the year, what is unclear.
- Argue to management in its terms: tenders won or lost, complaints, completion by group, risk.
:::

:::note Extra · go deeper (optional reading)
**UX as social responsibility.** The plan's discussion line frames inclusion as social responsibility. In a training provider this has a concrete form: learners who are excluded cannot reach the qualification that the platform exists to give.
**The business case.** Practitioners list benefits such as a larger audience, fewer support requests, better search visibility and lower legal risk. They are plausible, but figures differ by case; use your own data where you can.
:::

^src: WHO 2022 · BFSG, EN 301 549 and BITV 2.0 (in flux) · WCAG 2.2

## B2 · Conflicting goals: inclusion against cost, and integration against add-on · 22 min · Core

> Inclusion is cheaper built in than bolted on, but it competes with new features for a limited budget. Weigh reach against cost and say what waits.

:::box In plain words
**The idea.** The plan's conflicts for Day 7 are inclusion against costs and integration against expansion. A new feature is visible and easy to justify; accessibility work is less visible, and the benefit is spread over learners who were not reached before. The decision is a matter of reach, cost and risk, and of what waits.
**Why it matters.** Task 2 asks for a risk analysis of costs against benefits and for three prioritised measures. The rules of this card tell you how to weigh them.
**How to read the picture.** The matrix places seven measures by the reach they give (left to right) and by their cost and effort (bottom to top). The position is a reading of the example, not a score. The bottom right is where to start.
:::

![Seven measures by reach and cost. LearnLoop example, Case assumption.](_figures/d7_b2_reach-vs-cost.png)

| Conflict | One side gets | The other side gets | A rule for deciding |
|---|---|---|---|
| **Inclusion against a new feature** | More learners who can use the platform | A visible new feature | Count excluded groups first; a feature that nobody can use adds nothing |
| **Fix at the source against a quick patch** | A lasting fix | Speed and low cost today | Prefer the source; use a patch only as a stop-gap with a date |
| **Integration against add-on** | Accessibility in every release | A one-off project | Integrate: a definition of done and automated checks; run a project only for the backlog |
| **Full audit against targeted fixes** | A complete picture | A fast improvement on the most-used courses | Fix the most-used paths first, audit in stages |

:::rules How to decide when this comes up in the task
- Weigh each measure by reach (how many learners and which groups), cost and risk. Say what the cheapest, broadest measure is and start there.
- Integrate accessibility into existing processes so that it is not a recurring project: requirements, design review, definition of done, content standard, procurement.
- Be wary of a measure that promises to make a platform compliant automatically. Tools help but do not replace fixing content and code.
- Name what waits, and say what the learners who wait experience in the meantime.
:::

:::note Extra · go deeper (optional reading)
**Costs and benefits in the risk analysis.** The plan's risk analysis for Day 7 is costs against benefits. Costs: budget, time, training of authors. Risks of not acting: complaints, lost tenders, legal exposure where the law applies, learners lost. Both columns need a number or a statement, not a feeling.
**Do not rely on one audit.** A single audit gives a snapshot; without an integration into the process, the platform drifts back. The audit becomes useful when its findings enter the backlog and the next release is checked.
:::

^src: WCAG 2.2 · Gibbons 2018 (NN/g) · Brooke 1996

## B3 · An evaluation system and a decision under uncertainty · 20 min · Core

> Measure UX quality by group, with a method that shows why and one that shows how many. Decide under uncertainty with a figure and a date for reversal.

:::box In plain words
**The idea.** The plan asks for an evaluation system with KPIs and methods, and for a decision without complete user data. An evaluation system has three parts: KPIs (what you count), methods (how you find out) and a rhythm (how often, and who acts). A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.
**Why it matters.** Block 3.1 and 3.2 ask for exactly this.
**How to read the picture.** The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions.
:::

![The four parts of a decision without complete user data, filled in for LearnLoop (Case assumption), and the rule for future decisions.](_figures/d7_b3_decision-frame.png)

| KPI | Why it fits inclusion | Method to read it |
|---|---|---|
| **Task success by user group** | Shows whether a group cannot finish the main task | Usability tests with learners with impairments; analytics by group where lawful |
| **Drop-out by group** | A symptom of exclusion | Analytics; interviews for the reason |
| **Share of pages that meet WCAG 2.2 AA** | Measures the product against the standard | Manual audit and automated checks |
| **Access problems reported, and time to fix** | Shows whether the process works | The support channel and the backlog |
| **Satisfaction by group (for example SUS)** | A compact signal of trouble | A short questionnaire |

- **Data protection.** Measuring by group may touch special categories of data. Ask whether you need it, how you obtain consent, and whether a test with volunteers is enough. This is a DSGVO question, not only a UX one.
- **Do not guess how many learners need access features.** If the platform does not record it, say you do not know; a test with a few learners shows the barrier, and a survey (with consent) can show the number.

:::rules How to decide when this comes up in the task
- Choose KPIs by what they show about excluded groups: success and drop-out by group, share of pages that meet AA, issues and time to fix.
- Choose at least one method that gives reasons (a test with users) and one that gives counts or conformance (analytics, audit).
- A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. The reversal condition has a figure and a time.
- Ask who decides: a role with the evidence it needs, so that accessibility does not depend on one person's interest.
- Check data-protection duties before measuring by group.
- Giving up nothing means you have not decided: name what you postpone.
:::

:::note Extra · go deeper (optional reading)
**Premortem.** Klein's premortem asks the team to imagine that the inclusion strategy failed: the typical answers are that accessibility stayed a project, authors did not follow the standard, and an overlay was bought instead of fixing the source. Each answer becomes a check.
**One-way and two-way doors.** Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. Fixing five courses and testing is a two-way door; a platform replacement is a one-way door.
:::

^src: Brooke 1996 · Rodden et al. 2010 · GDPR (Regulation 2016/679) · Klein 2007 · Bezos 2016
