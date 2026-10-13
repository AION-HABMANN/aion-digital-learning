"""
Reference answers for Day 7 and Day 8 (InclusiveLearn, StructLearn), written for the trainer document in the same shape as the keys of
Days 1 to 6 (which are read from the playground). Sources: the plan's Musterlösung (Kernlogik) of the day, the facts and options printed in
the Task document, and the rules taught in the Materi (effort by printed cost). A reference answer is one defensible answer, not the only one.
"""


def K(title, expected, options, note=""):
    return ("key", {"title": title, "expected": expected, "options": [{"label": a, "expected": b, "why": c} for a, b, c in options], "teachingNote": note})


def G(title, answer, why="", look=None, pitfalls=None):
    return ("guide", {"title": title, "answer": answer, "why": why, "lookFor": look or [], "pitfalls": pitfalls or []})


# ---------------------------------------------------------------------------------------------------- Day 7 · InclusiveLearn

D7 = {
    "1.1": [
        K(
            "Block 1.1 · Eight facts into Perceivable, Operable, Understandable",
            "Perceivable: facts 1, 2, 3 · Operable: facts 4, 5, 6 · Understandable: facts 7, 8",
            [
                ("1 · Light grey 11 px text, contrast 2.3 : 1", True, "Perceivable. The text is too small and too pale to read well; contrast is below 4.5 : 1."),
                ("2 · Videos without captions or transcript", True, "Perceivable. A learner who cannot hear cannot take in the content."),
                ("3 · Status shown only by a coloured dot", True, "Perceivable. Information given by colour alone is lost for learners who cannot tell red from green."),
                ("4 · An 18 × 18 px “Next” button, 4 px from “Back”", True, "Operable. The target is small and sits close to another: learners with a tremor or limited hand use hit the wrong one."),
                ("5 · A quiz that needs dragging, no keyboard way", True, "Operable. Keyboard and switch users cannot answer at all."),
                ("6 · Sign-up in 14 steps over 6 screens", True, "Operable. The plan names “many steps to operate”: the learner cannot reach the end of a long sequence."),
                ("7 · Long sentences with legal wording", True, "Understandable. The learner cannot follow the instruction."),
                ("8 · “Error 4011” with no explanation", True, "Understandable. The learner cannot tell what went wrong or what to do."),
            ],
            "The sort is objective: each fact breaks one of the three principles the plan names. Fact 6 can be argued as Understandable (fourteen steps are hard to follow); the test is what the learner cannot do, and the plan files “many steps to operate” under operation. A learner who argues it with a reason defends the choice.",
        ),
        G(
            "1.1 · The groups that struggle, and the facts that block them (Core)",
            "Low vision: fact 1 blocks this group, because the text is too small and too pale to read. Deaf and hard-of-hearing learners: fact 2, because the videos can only be heard.",
            "Any two groups defend if each is tied to a fact by number and the answer says what the group cannot do.",
            ["Names a group and a fact by number.", "Says what the group cannot do (read, hear, operate, understand), not only that it is hard.", "Includes the situational limit (bright light, noisy train) in at least one answer, to show that the gain is wider than one group."],
            ["Listing groups without a fact.", "Describing a group by its impairment alone instead of by the task it cannot do."],
        ),
        G(
            "1.1 · Three improvements (Core)",
            "Raise the text contrast to at least 4.5 : 1 and let the text be enlarged to 200% (facts 1 and 3): learners with low vision and everyone in bright light gain. Add captions and a transcript to the videos (fact 2): deaf learners and learners on a noisy train gain. Give the quiz a keyboard way to answer (fact 5): keyboard and switch users gain.",
            "The plan asks for three improvements. Each should start with a verb, name the fact it answers and say who gains.",
            ["Starts with a verb.", "Names the fact by number.", "Says who gains."],
        ),
    ],
    "1.2": [
        K(
            "Block 1.2 (Optional) · Integrate or expand: three options",
            "Reference order: C (increase accessibility), then B (improve the existing UX), then A (new features)",
            [
                ("A · Develop new features (€36,000, 10 weeks)", False, "Reference ratings: user impact Low (it opens nothing to the groups who drop out), effort High (€36,000 is above €25,000), risk Mid (a new feature can bring new barriers). An expansion that uses all ten weeks."),
                ("B · Improve the existing UX (€18,000, 6 weeks)", True, "Reference ratings: user impact Mid (structure, navigation and wording help many, but not those blocked by pictures, sound or a mouse-only quiz), effort Mid, risk Low. An integration. Defends as first or second."),
                ("C · Increase accessibility (€24,000, 8 weeks)", True, "Reference ratings: user impact High (it opens the platform to the groups who drop out), effort Mid (€24,000 is under €25,000), risk Low to Mid (a patch could hide a problem). An integration."),
            ],
            "Effort follows the printed cost by the rule in Materi A5 (under €10,000 Low, €10,000 to €25,000 Mid, above €25,000 High); user impact and risk are judgements. The plan's goal is to understand integration against expansion: A expands, B and C build inclusion into what exists. B first also defends if the reason says who gains and what it leaves out.",
        ),
        G(
            "1.2 · Justify your decision",
            "I put C first: the groups who drop out are blocked by contrast, keyboard use and missing captions, and only C changes that. B comes second because clearer structure helps everyone, but it does not remove those barriers. A comes last: it adds a feature on top of a platform that part of the audience cannot use.",
            "The plan asks for a prioritisation with a justification.",
            ["Says who gains from the first priority.", "Says whether the choice is an integration or an expansion."],
        ),
    ],
    "1.3": [
        G(
            "1.3 · Coaching reflection (never scored)",
            "Who is excluded today: learners who cannot read small, pale text, hear the videos or use a mouse. Greatest reach: fixing contrast, keyboard use and captions, because it opens every course. Measuring quality: by task success and drop-out for each group, not by the number of features.",
            "Reflection is never scored. The plan's coaching points: accessibility is a core quality, not an add-on; inclusive systems are more successful in the long run; evaluation is a continuous task. Use the notes as the start of the live discussion.",
        ),
    ],
    "2.1": [
        K(
            "Block 2.1 (Optional) · Four central barriers",
            "Small and low-contrast text · mouse-only or drag-only operation · complicated language and unclear instructions · videos without captions or transcripts",
            [
                ("The text is small and low in contrast", True, "Printed in facts 1 and 3; blocks low-vision and colour-blind learners."),
                ("Content can only be operated with a mouse or by dragging", True, "Facts 4 and 5; blocks keyboard, switch and tremor users."),
                ("The language is complicated and instructions are unclear", True, "Facts 7 and 8; blocks learners with reading difficulties and learners reading in a second language."),
                ("Videos have no captions or transcripts", True, "Fact 2; blocks deaf and hard-of-hearing learners."),
                ("The subscription price is too high", False, "A business matter; no printed fact says it stops a group of learners."),
                ("The course catalogue is too small", False, "A content matter; the case says the content is good."),
                ("The platform has no dark mode", False, "A preference, not a barrier in the case. It would not help the groups who drop out."),
            ],
            "A central barrier is defended by a printed fact. The plan's model solution names the main problem as the exclusion of certain user groups.",
        ),
        G("2.1 · Which printed fact supports your first barrier", "Fact 5: the quiz can only be answered by dragging items, so keyboard and switch users cannot finish it.", "", ["Points at a fact by number or quotes the case.", "Names the group it blocks."]),
    ],
    "2.2": [
        K(
            "Block 2.2 · Four measures, rated and ordered",
            "M1 clear structure and plain language · M2 better operability · M3 visual optimisation · M5 continuous testing. Total €47,000 of €50,000; longest measure 6 weeks of 10.",
            [
                ("M1 · Clear structure and plain language (€15,000, 6 weeks)", True, "Answers facts 7 and 8. Effort Mid by the printed cost. Reference ratings: user impact High (readers with difficulties, second-language learners, everyone at sign-up), risk Low."),
                ("M2 · Better operability (€13,000, 5 weeks)", True, "Answers facts 4, 5 and 6. Effort Mid. Reference ratings: user impact High (it lets keyboard, switch and tremor users finish), risk Mid (it touches the quiz and the sign-up)."),
                ("M3 · Visual optimisation (€11,000, 4 weeks)", True, "Answers facts 1 and 3. Effort Mid. Reference ratings: user impact High (one change on every page), risk Low."),
                ("M4 · Captions and transcripts (€9,000, 4 weeks)", False, "Defends: answers fact 2 for deaf and hard-of-hearing learners. Effort Low. A learner who picks it instead of M5 or M1 should name the group and the fact."),
                ("M5 · Continuous testing (€8,000, 4 weeks)", True, "Effort Low. Reference ratings: user impact Mid (it finds barriers, it fixes none), risk Low. In the reference set so that the fixes do not decay: accessibility means usage means success only if it stays."),
                ("M6 · An accessibility toolbar (€12,000, 3 weeks)", False, "Rejected: a layer on top that promises to fix problems automatically; the barriers stay. Effort Mid, user impact Low, risk High (a patch hides the problem)."),
                ("M7 · An AI learning buddy (€40,000, 10 weeks)", False, "Rejected: adds a feature, opens nothing to excluded groups; effort High (above €25,000)."),
                ("M8 · A new visual style (€25,000, 6 weeks)", False, "Rejected: the look; no printed fact asks for it. Effort Mid (€25,000 is up to the limit)."),
                ("M9 · Two more languages (€30,000, 10 weeks)", False, "Rejected: reach in another way; effort High, and it does not answer a printed barrier."),
            ],
            "The plan's model solution: clear structure and plain language, better operability, visual optimisation, continuous testing; rationale “Accessibility = usage = success”. The four fit the budget and the time. Reference order (one defensible reading): M3 first (one change on every page, answers facts 1 and 3), then M2 (a group that cannot operate cannot finish at all), then M1 (the widest reach, but six weeks of rewriting), then M5. M1 or M2 first defends equally with a reason.",
        ),
        K(
            "Block 2.2 · Three evaluation methods",
            "E1 automated check · E3 usability test with learners with impairments · E4 task success and drop-out by user group (E2 manual check also defends)",
            [
                ("E1 · Automated accessibility check in each release", True, "Finds some problems quickly; cannot find all. Gives conformance."),
                ("E2 · Manual check with keyboard alone and a screen reader", True, "Finds problems that tools miss. Defends in place of E1."),
                ("E3 · Usability test with learners with impairments", True, "Shows why a group cannot finish a task: the method that gives reasons."),
                ("E4 · Task success and drop-out by user group", True, "Shows how many in each group are blocked: the method that gives counts."),
                ("E5 · A satisfaction questionnaire (SUS) per group", False, "Defends as a compact signal; it does not show where the barrier is."),
                ("E6 · Counting the features on the platform", False, "Rejected: shows how much was built, not who can use it."),
            ],
            "Choose at least one method that gives reasons and one that gives counts or conformance. The learner is judged on the reason, not on matching the reference set.",
        ),
        G("2.2 · Why the first priority goes first", "M3 goes first: low contrast and status by colour alone are on every page, so one change reaches every learner with low vision or colour blindness, and it costs €11,000 and four weeks. Without it, the other fixes would sit on pages some learners still cannot read.", "A different first priority defends if the reason names the group it reaches, the cost, or what the others depend on.", ["Gives a reason for position one, not for the whole set.", "Names a group, a cost or a dependency."]),
        G("2.2 · What information you are missing", "I do not know how many of our learners need these features, or which groups they are, because the platform does not record it. I would test with five learners with impairments and, with consent, ask all learners about access needs, before I spend the last €3,000.", "The plan asks “what information are you missing”. A good answer is specific and says how to find it out without guessing; data protection (DSGVO) applies if groups are measured.", ["Names something specific that would change the decision.", "Says how to find it out.", "Does not guess a number."]),
    ],
    "3.1": [
        K(
            "Block 3.1 · Where accessibility is checked",
            "At least three places, so that accessibility does not depend on one person. The core four: requirements, design review, definition of “done”, release testing.",
            [
                ("Requirements and user stories", True, "Accessibility is asked for before anything is built."),
                ("Design reviews", True, "Barriers are caught on the drawing board."),
                ("Development: the definition of “done”", True, "A feature is not finished until it passes."),
                ("Content creation: a standard for authors", True, "New lessons are born accessible."),
                ("Buying third-party tools", True, "A tool can bring barriers in; procurement is a gate."),
                ("Release testing", True, "Automated and manual checks before every release."),
                ("A support channel for access problems", True, "Learners can report what the tests missed."),
            ],
            "All seven are defensible places. The test is that the choice names an owner for each place, so that the check does not rest on one person's interest.",
        ),
        K(
            "Block 3.1 · Three measures",
            "D1 fix the barriers in the 20 most-used courses · D2 accessibility in the design system and every release · D3 a quarterly test programme. €150,000 of €240,000.",
            [
                ("D1 · Fix the barriers in the 20 most-used courses (€80,000, 22 weeks)", True, "Reach now: the groups blocked today stay blocked while you wait."),
                ("D2 · Accessibility in the design system and every release (€40,000, 16 weeks)", True, "Integration: otherwise new content re-creates the barriers."),
                ("D3 · A quarterly test programme (€30,000, 52 weeks)", True, "Evidence by group; the plan asks for an evaluation system."),
                ("D4 · A plain-language standard and author training (€25,000, 12 weeks)", False, "Defends: prevents new inaccessible text. Instead of D3 if the reason says how it will be checked."),
                ("D5 · An external accessibility audit (€35,000, 8 weeks)", False, "Defends as diagnosis, but an audit finds problems and fixes none: the premortem failure “we spent the budget on an audit and had nothing left to fix”."),
                ("D6 · An accessibility toolbar (€20,000, 4 weeks)", False, "Rejected: a layer on top; the barriers stay."),
                ("D7 · New features for growth (€90,000, 28 weeks)", False, "Rejected: an expansion; it reaches no excluded group and uses the largest share of the budget."),
            ],
            "Reference order: D1, D2, D3. D1 first because every month of waiting is a month of excluded learners; D2 second so that the fix lasts; D3 third to show the effect by group. D2 first also defends (it removes the dependence on one person).",
        ),
        G(
            "3.1 · Your strategy for inclusive UX",
            "We aim to reach learners with low vision, hearing, motor and reading difficulties, who drop out today. We change first what blocks them: contrast, keyboard use, captions and plain language in the 20 most-used courses. Inclusion is a core quality, not an add-on: a learner who cannot use a lesson is a learner we lose, and each fix helps everyone (captions on a train, contrast in sunlight).",
            "The plan asks for an inclusive UX strategy and its integration into existing processes.",
            ["Names the groups it aims to reach.", "Says what changes first.", "Says why it is a core quality."],
        ),
        G("3.1 · Why the first measure goes first", "D1 goes first: it reaches the groups who are blocked today, in the courses most learners open. Each month of waiting costs learners we already have.", "", ["Names the groups it reaches.", "Says what waiting costs."]),
    ],
    "3.2": [
        K(
            "Block 3.2 · The evaluation system: KPIs and methods",
            "KPIs (at least three): task success by group, drop-out by group, share of pages that meet WCAG 2.2 AA, access problems and time to fix, satisfaction by group. Methods (at least two): a test with learners with impairments, a manual audit, automated checks, analytics by group.",
            [
                ("KPI · Task success by user group", True, "Shows whether a group cannot finish the main task."),
                ("KPI · Drop-out by user group", True, "A symptom of exclusion."),
                ("KPI · The share of pages that meet WCAG 2.2 AA in an audit", True, "Measures the product against the standard."),
                ("KPI · Accessibility problems reported, and the time to fix them", True, "Shows whether the process works."),
                ("KPI · Satisfaction (for example SUS) by group", True, "A compact signal that a group has trouble."),
                ("KPI · The number of clicks on a toolbar", False, "Rejected: counts use of a layer, not access."),
                ("KPI · The number of features released", False, "Rejected: counts what was built, not who can use it."),
                ("Method · A usability test with learners with impairments", True, "Gives reasons."),
                ("Method · A manual audit (keyboard, screen reader)", True, "Gives conformance and finds what tools miss."),
                ("Method · Automated checks in each release", True, "Gives quick, partial conformance."),
                ("Method · Analytics by group (with a legal basis)", True, "Gives counts. Check the DSGVO duties before measuring by group."),
                ("Method · A survey of all learners", False, "Defends as one source; it is not by group and shows no barrier."),
            ],
            "Choose at least one method that gives reasons (a test with users) and one that gives counts or conformance. The learner is judged on the reason, not on matching the reference set.",
        ),
        K(
            "Block 3.2 · The biggest risk (costs against benefits)",
            "Reference: “Accessibility stayed a project and the platform drifted back.” Any of the five defends with a reason and an action.",
            [
                ("Accessibility stayed a project and the platform drifted back", True, "The most common failure; answered by D2 (definition of “done”, checks in every release)."),
                ("Authors ignored the standard, so new content was inaccessible", True, "Answered by a standard and training (D4) and a release check."),
                ("We bought a toolbar and the barriers stayed", True, "Answered by fixing the source, never by a layer."),
                ("We spent the budget on an audit and had nothing left to fix", True, "Answered by ordering: fix first, audit later."),
                ("We could not show a benefit and the budget was cut", True, "Answered by KPIs by group from the first quarter."),
            ],
            "The action should cost less than the risk; ask the learner to compare the two.",
        ),
        G("3.2 · Who reads the results, how often, and what happens when a KPI is poor", "The accessibility lead reads the group dashboard monthly and the product board reads it each quarter. If task success for any group falls below the rest, the owner of that course fixes the barrier in the next release.", "A decision architecture names a role, a rhythm and a consequence.", ["Names a role.", "Names a rhythm.", "Says what must be done when a KPI is poor."]),
        G("3.2 · What you do about the biggest risk", "I put accessibility into the definition of “done” and the release checks (D2), so it does not depend on a project. The action costs about the price of one measure; a platform that drifts back costs the whole programme.", "", ["One action.", "Compares its cost with the cost of the risk."]),
        G("3.2 · The decision under uncertainty", "I decide to fix contrast, keyboard use and captions in the 20 most-used courses first. I do not know how many of our learners are affected or which groups they are. I reverse if, by the end of the second quarter, task success of the tested learners in those courses has not risen from 60% to 75%.", "A decision under uncertainty states what you decide, what you do not know, what would make you reverse it (a figure) and by when.", ["States the decision in one sentence.", "Names a specific unknown.", "Gives a reversal condition with a figure and a time."]),
        G("3.2 · What you give up or postpone", "I give up the new sales features (D7) for this year and postpone the external audit (D5) to year two. Sales will miss the features they asked for.", "A plan that gives up nothing has not decided.", ["Names something real that someone would miss."]),
    ],
}


# ---------------------------------------------------------------------------------------------------- Day 8 · StructLearn

D8 = {
    "1.1": [
        K(
            "Block 1.1 · Eight facts into Unclear navigation, Visual overload, Inconsistent design",
            "Unclear navigation: facts 1, 2, 3 · Visual overload: facts 4, 5 · Inconsistent design: facts 6, 7, 8",
            [
                ("1 · Four menu levels; one course under three entries", True, "Unclear navigation. The same item has several homes; the learner cannot tell where it is."),
                ("2 · The menu marks “Home” inside a course", True, "Unclear navigation. The marked entry and the page disagree, so the learner cannot tell where they are."),
                ("3 · No “Next” link at the end of a lesson", True, "Unclear navigation. The learner does not know what comes next."),
                ("4 · Nine colours, four sizes, three banners", True, "Visual overload. Many elements compete and nothing leads."),
                ("5 · Five equal buttons in a row", True, "Visual overload. The plan's “several buttons without priority”: there is no main thing."),
                ("6 · Links in three different colours", True, "Inconsistent design. The same function looks different in different places."),
                ("7 · “Submit” looks different on three screens", True, "Inconsistent design."),
                ("8 · “Back” does different things on different screens", True, "Inconsistent design: the same function works differently."),
            ],
            "The sort is objective: each fact breaks one of the three mistakes the plan names. Fact 8 touches navigation too; the test is the phrase printed: the same control behaving differently is inconsistency. A learner who argues another placement with a reason defends the choice.",
        ),
        G("1.1 · Where confusion arises", "Fact 3: at the end of a lesson there is no “Next” link. A beginner who has just finished a lesson does not know what to do and has to go back up three levels; many will stop there.", "Any of the eight facts defends if the reason says what the learner wants to do at that point and what they cannot tell.", ["Says what the learner wants to do.", "Says what they cannot tell.", "Refers to a fact by number."]),
        G("1.1 · What you would improve intuitively", "Add a “Next lesson” button at the end of every lesson (fact 3). Mark the real place in the menu (fact 2). Make one button the main button and turn the others into quiet links (fact 5).", "The plan asks for intuitive improvements; each should name the fact it answers.", ["Names the fact each improvement answers.", "Improves structure before decoration."]),
    ],
    "1.2": [
        K(
            "Block 1.2 (Optional) · Three design options under three weeks",
            "Reference order: B (restructure the navigation), then A (simplify visually), then C (add visual elements)",
            [
                ("A · Simplify the design visually (€9,000, 2 weeks)", True, "Reference ratings: user impact Mid (it calms the page but does not fix the menu), effort Mid (€9,000 is within €8,000 to €15,000), risk Low."),
                ("B · Restructure the navigation (€14,000, 3 weeks)", True, "Reference ratings: user impact High (the learner can find, choose and carry on), effort Mid, risk Mid (it needs all three weeks)."),
                ("C · Add more visual elements (€7,000, 2 weeks)", False, "Reference ratings: user impact Low (it adds things to look at, it helps nobody find anything), effort Low (under €8,000), risk High (more clutter). Rejected."),
            ],
            "Effort follows the printed cost by the rule in Materi A5 (under €8,000 Low, €8,000 to €15,000 Mid, above €15,000 High). The plan's goal is to weigh structure against design: structure beats visual design.",
        ),
        G("1.2 · Justify your decision", "I put B first: beginners are lost because they cannot find content and do not know what comes next, and only the navigation answers that. A comes second: a calmer page helps, but a calm page with the same course under three entries still loses them. C comes last: it only changes how the platform looks.", "", ["Says which option fixes what the learner cannot do and which only changes the look."]),
    ],
    "1.3": [
        G("1.3 · Coaching reflection (never scored)", "What guides the user: a path, a marked place and one main button. Uncertainty arises where the menu and the page disagree and where there is no next step. The decision with the greatest effect: giving every item one home and every lesson a next step.", "Reflection is never scored. The plan's coaching points: UI is not about making it pretty but about making it understandable; structure beats visual design; good UX reduces the user's wrong decisions. Use the notes as the start of the live discussion."),
    ],
    "2.1": [
        K(
            "Block 2.1 (Optional) · Four structural problems",
            "Content cannot be found (one item in several places) · no clear visual hierarchy · navigation not unambiguous · no clear guidance for action",
            [
                ("Learners cannot find content: one item sits in several places under different names", True, "Fact 1 and the case: users cannot find content."),
                ("There is no clear visual hierarchy: everything competes for attention", True, "Facts 4 and 5; the case names a lack of hierarchy."),
                ("The navigation is not unambiguous: learners cannot tell where they are", True, "Facts 2 and 3; the case names no clear navigation."),
                ("There is no clear guidance for action: no main button and no next step", True, "Facts 3 and 5."),
                ("The courses are too long", False, "No printed fact says so."),
                ("The subscription price is too high", False, "A business matter; nothing printed."),
                ("There are too few courses", False, "A content matter; the case is about structure."),
            ],
            "A structural problem is defended by a printed fact. The plan's model solution names the main problem as a lack of structure.",
        ),
        G("2.1 · Which printed fact supports your first problem", "Fact 1: the same course can be reached under “Learn”, “Library” and “Archive”, so learners do not know which entry is the real one.", "", ["Points at a fact by number or quotes the case."]),
    ],
    "2.2": [
        K(
            "Block 2.2 · Four improvements, rated and ordered",
            "M1 clear information architecture · M2 reduce visual complexity · M3 unambiguous navigation · M4 clear action guidance. Total €41,000 against €40,000; longest measure 5 weeks of 10.",
            [
                ("M1 · A clear information architecture (€16,000, 5 weeks)", True, "Effort High by the printed cost (above €15,000). Reference ratings: user impact High (one place per item), risk Mid (a large change)."),
                ("M2 · Reduce visual complexity (€8,000, 3 weeks)", True, "Effort Mid (€8,000 is the lower edge of Mid). Reference ratings: user impact Mid, risk Low."),
                ("M3 · Unambiguous navigation (€11,000, 4 weeks)", True, "Effort Mid. Reference ratings: user impact High (where am I, what comes next), risk Low."),
                ("M4 · A clear action guidance (€6,000, 2 weeks)", True, "Effort Low. Reference ratings: user impact High for its cost (one main button), risk Low."),
                ("M5 · Consistent components (€13,000, 5 weeks)", False, "Defends: answers facts 6, 7 and 8. Effort Mid. It is a second wave: consistency matters once the structure is fixed."),
                ("M6 · More visual elements (€18,000, 6 weeks)", False, "Rejected: adds decoration; effort High, risk High (more clutter)."),
                ("M7 · A dark mode (€10,000, 4 weeks)", False, "Rejected: the look; no printed fact asks for it."),
                ("M8 · A new logo and brand name (€22,000, 6 weeks)", False, "Rejected: the brand; learners who are lost need a structure, not a new name."),
                ("M9 · A search with AI suggestions (€30,000, 10 weeks)", False, "Rejected: adds technology on top of a structure that is not clear; effort High."),
            ],
            "The plan's model solution: clear information architecture, reduction of visual complexity, unambiguous navigation, clear action guidance; rationale “Structure → orientation → usage”. The reference set costs €41,000, €1,000 over the printed budget by plan fidelity; the worksheet allows going over with a reason. A set within budget is M3, M4, M2 and M5 (€38,000), but it leaves the architecture unchanged, and “structure beats visual design”: whoever picks it should say why. Reference order: M1, M3, M2, M4; M3 first also defends (a quick win in four weeks).",
        ),
        G("2.2 · Why the first priority goes first", "M1 goes first: structure leads to orientation and orientation leads to use. As long as the same course sits in three places, a calmer page or a better button only decorates a menu the beginner cannot read.", "The worksheet asks for the chain structure, orientation, use.", ["Uses the chain structure → orientation → use.", "Gives a reason for position one, not for the whole set."]),
        G("2.2 · What information you are missing", "I do not know where beginners actually get lost: the facts say what is there, not which step makes them stop. I would watch five beginners find one course in a tree test before I rebuild the architecture.", "The plan's wording is “what information is missing”. A good answer is specific and says how to find it out.", ["Names something specific.", "Says how to find it out."]),
    ],
    "3.1": [
        K(
            "Block 3.1 · The basic structure: a closed card sort of twelve items",
            "A Learn: 1, 6, 12 · B Find: 2, 3 · C Progress: 4, 5 · D Help and account: 7, 8, 9 · E Trainer area: 10, 11",
            [
                ("1 · Continue where I stopped", True, "A Learn. It is the learner's way back into the course."),
                ("2 · Course catalogue", True, "B Find."),
                ("3 · Search", True, "B Find."),
                ("4 · My certificates", True, "C Progress. A certificate is the result of progress."),
                ("5 · Progress in each course", True, "C Progress."),
                ("6 · My notes", True, "A Learn. Open item: C or D also defend; notes belong to the lesson the learner is in."),
                ("7 · Reminder settings", True, "D Help and account. Open item: it also supports progress."),
                ("8 · Help centre", True, "D Help and account."),
                ("9 · Profile and password", True, "D Help and account."),
                ("10 · Create a course (for trainers)", True, "E Trainer area."),
                ("11 · Learner list of my course (for trainers)", True, "E Trainer area."),
                ("12 · Messages from my trainer", True, "A Learn (the learner's side). Open item: E or D defend; decide by where the learner looks for it."),
            ],
            "A card sort has no single right answer. Items 6, 7 and 12 are the open ones; any placement with a reason from the learner's side defends. What matters is the check: the learner names one hard item and says how learners would test it (a closed card sort, a tree test). Each section must be used at least once.",
        ),
        K(
            "Block 3.1 · Principles for visual design and the concept for user guidance",
            "Principles (at least three): one main action per screen · at most three colours and one accent · the same function always looks the same · text contrast at least 4.5 : 1, no information by colour alone · group with space and proximity. Guidance (at least three): a path and a marked menu entry · a “Next” button · a “Continue where you stopped” entry · progress on each course page · plain labels.",
            [
                ("One main action per screen", True, "Answers fact 5."),
                ("At most three colours and one accent colour", True, "Answers fact 4."),
                ("The same function always looks the same (a style guide)", True, "Answers facts 6 to 8."),
                ("Text contrast of at least 4.5 : 1 and no information by colour alone", True, "A rule that can be checked."),
                ("Group with space and proximity, not with boxes everywhere", True, "A hierarchy rule."),
                ("New courses may choose their own colours for variety", False, "Rejected: it creates the inconsistency of facts 6 to 8."),
                ("Add animation to keep learners interested", False, "Rejected: decoration; the case already has three animated banners."),
                ("Every screen shows a banner for current offers", False, "Rejected: competes with the main action."),
                ("Guidance · A path above the page and a marked menu entry", True, "Answers facts 1 and 2."),
                ("Guidance · A “Next” or “Continue” button after every lesson", True, "Answers fact 3."),
                ("Guidance · A “Continue where you stopped” entry on the home screen", True, "Orientation on the first screen."),
                ("Guidance · Progress shown on each course page", True, "Tells the learner how far they are."),
                ("Guidance · Plain labels named after what the learner does", True, "Names sections by what the learner does."),
                ("Guidance · A pop-up tour on every page", False, "Rejected: interrupts and adds noise."),
                ("Guidance · Tooltips on every element", False, "Rejected: explains a structure that should explain itself."),
            ],
            "A principle is good if it can be used to say no to a proposal. Ask the learner which proposal each principle would reject.",
        ),
        G("3.1 · How a learner always knows where they are and what comes next", "A path above the page and the marked menu entry say where they are; a “Next” button after each lesson and “Continue where you stopped” on the home screen say what comes next.", "", ["Answers both questions: where am I, what comes next.", "Uses at least two of the guidance elements chosen."]),
    ],
    "3.2": [
        K(
            "Block 3.2 · Three prioritised design measures",
            "D1 rebuild the information architecture and navigation · D3 redesign home and course pages around one main action · D4 tests of the new structure with learners. €135,000 of €210,000; longest 20 weeks.",
            [
                ("D1 · Rebuild the information architecture and navigation (€70,000, 20 weeks)", True, "Structure first: the cause of the lost orientation."),
                ("D2 · A design system with a style guide (€50,000, 24 weeks)", False, "Defends as the second wave: consistency after structure. In place of D4 if the reason says why tests can wait."),
                ("D3 · Redesign the home and course pages around one main action (€40,000, 14 weeks)", True, "Hierarchy and guidance on the pages learners meet first."),
                ("D4 · Tests of the new structure with learners (€25,000, 10 weeks)", True, "The structure is decided without user tests; D4 is how it is checked later."),
                ("D5 · A guided first visit for beginners (€20,000, 8 weeks)", False, "Defends, but guiding learners through a confusing structure treats the symptom; it follows D1."),
                ("D6 · A full visual rebrand (€60,000, 20 weeks)", False, "Rejected: the look before the structure; one of the risks the worksheet names."),
                ("D7 · Animated elements everywhere (€45,000, 16 weeks)", False, "Rejected: decoration; more things competing for attention."),
            ],
            "Reference order: D1, D3, D4. D1 first because structure leads to orientation and orientation to use. D4 third, run next to the build, so that the decision made without tests is checked early. D1, D2, D3 also defends.",
        ),
        K(
            "Block 3.2 · The biggest risk: too complex against too reduced",
            "Reference: “We removed so much that learners and trainers lost help and functions they needed.” Any of the five defends with a reason and an action.",
            [
                ("The new structure is still too complex, and learners are still lost", True, "Action: a tree test before release; notice it in the first weeks by support questions."),
                ("We removed so much that learners and trainers lost help and functions they needed", True, "The too-reduced failure. Action: test with trainers as well as learners; notice it in support requests in the first four weeks."),
                ("The new section names did not make sense to beginners", True, "Action: name sections after what the learner does and test the names."),
                ("The style guide was ignored and the platform drifted back to inconsistency", True, "Action: components in the design system and a review gate."),
                ("The budget was spent on the look before the structure was fixed", True, "Action: order the work: structure first."),
            ],
            "The learner should say when they would notice the risk, not only what they would do.",
        ),
        G("3.2 · Why the first measure goes first", "D1 goes first: the structure is the reason learners lose orientation, and with it fixed every later measure (hierarchy, guidance, tests) has something solid to work on.", "", ["Says what it does for orientation.", "Says what it does for the learner's behaviour."]),
        G("3.2 · What you do about the risk", "I run a tree test with learners and trainers before the release and watch the support requests in the first four weeks; if trainers cannot find their functions, I restore them in the trainer area at once.", "", ["One action.", "Says when the risk would be noticed."]),
        G("3.2 · The decision under uncertainty (without user tests)", "I decide to rebuild the information architecture into five sections named after what the learner does (D1) before any visual redesign. I do not know how beginners will group the twelve items. I reverse if, by the end of week 8, fewer than 80% of 20 tested learners find a given course in under a minute in a tree test.", "Four parts: what you decide, what you do not know, what would make you reverse it (a figure) and by when, and what you give up.", ["States the decision in one sentence.", "Names a specific unknown.", "Gives a reversal condition with a figure and a time."]),
        G("3.2 · What you give up or postpone", "I give up the full rebrand (D6) and the animated elements (D7) this year; marketing will miss the new look.", "A plan that gives up nothing has not decided.", ["Names something real that someone would miss."]),
    ],
}

DATA78 = {7: D7, 8: D8}
