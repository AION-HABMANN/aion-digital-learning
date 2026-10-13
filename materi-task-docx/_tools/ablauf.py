"""
The lesson plan ("Ablaufplan") that every Materi, Task and Trainer document opens with, and the block orientation of Day 1.
Built from the day's own Markdown (cards and blocks with their minutes), so the table never drifts from the documents.
Blocks are returned as the internal tuples of md2docx (("h", level, text), ("p", text), ("table", rows), ("box", kind, title, inner)).
"""
import os
import re

import release

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

CASES = {1: "SkillUp", 2: "LearnPro", 3: "EduCore", 4: "MotivaLearn", 5: "LearnBase", 6: "EduPath", 7: "InclusiveLearn", 8: "StructLearn"}
ROLES = {
    1: "Chief UX Officer", 2: "Chief Product Officer", 3: "Chief Learning Experience Officer", 4: "Chief Experience Officer",
    5: "Chief UX Strategist", 6: "Head of UX Strategy", 7: "Chief UX & Accessibility Officer", 8: "Chief UX Architect",
}

CARD = re.compile(r"^## ([AB]\d+) · (.+?) · (\d+) min · (Core|Optional)\s*$", re.M)
BLOCK = re.compile(r"^## Block (\d\.\d) · (.+?) · ([A-Z][A-Z +]*) · (Core|Optional) · about (\d+) min", re.M)


def _read(day, kind):
    p = os.path.join(ROOT, "_source", f"day{day}-{kind}.md")
    return open(p, encoding="utf-8").read() if os.path.exists(p) else ""


def parse_day(day):
    cards = [dict(id=m[0], title=m[1], min=int(m[2]), kind=m[3]) for m in CARD.findall(_read(day, "materi"))]
    blocks = {m[0]: dict(id=m[0], title=m[1], type=m[2], kind=m[3], min=int(m[4])) for m in BLOCK.findall(_read(day, "task"))}
    return cards, blocks


def _ids(cards):
    return ", ".join(c["id"] for c in cards)


def _blk(blocks, bid):
    b = blocks.get(bid)
    if not b:
        return f"Block {bid}"
    return f"Block {bid} ({b['kind']}, about {b['min']} min)"


def lesson_plan_rows(day):
    cards, blocks = parse_day(day)
    a = [c for c in cards if c["id"].startswith("A")]
    b = [c for c in cards if c["id"].startswith("B")]
    a_core = [c for c in a if c["kind"] == "Core"]
    a_opt = [c for c in a if c["kind"] == "Optional"]
    b_core = [c for c in b if c["kind"] == "Core"]
    b_opt = [c for c in b if c["kind"] == "Optional"]
    case = CASES[day]
    role = ROLES[day]
    opt_a = f" Optional {_ids(a_opt)} is read from the handout." if a_opt else ""
    opt_b = f" Optional {_ids(b_opt)} is read from the handout." if b_opt else ""

    if day == 1:
        ue3 = (
            "Level 1 · Task 2",
            f"Participants rate the three measures on user impact, effort and risk and say what information is missing: the first part of {_blk(blocks, '2.2')}. The block is finished in UE5–6.",
            "Task 1 · Part 2 · Block 2.2",
        )
    else:
        ue3 = (
            "Level 1 · Task 2",
            f"Three options are rated on three criteria and one is chosen with a reason: {_blk(blocks, '1.2')}. Groups that skip Optional blocks use the time to finish Block 1.1 and to read the Optional cards.",
            "Task 1 · Part 1 · Block 1.2",
        )

    rows = [["UE", "Min", "Plan item", "What happens", "Material", "Format"]]
    rows.append([
        "**1**", str(release.UE_MINUTES), "Knowledge transfer · Level 1",
        f"The trainer presents the Core cards of Materi A ({_ids(a_core)}, about {sum(c['min'] for c in a_core)} min of cards) on the playground; participants follow in the handout.{opt_a}",
        "Materi A (Route 1)", "Presentation + Handout",
    ])
    rows.append([
        "**2**", str(release.UE_MINUTES), "Level 1 · Task 1",
        f"Individual work on {_blk(blocks, '1.1')}. Pairs then compare their results and the trainer collects open questions.",
        "Task 1 · Part 1 · Block 1.1", "Handout (or on the playground)",
    ])
    rows.append(["**3**", str(release.UE_MINUTES), ue3[0], ue3[1], ue3[2], "Handout (or on the playground)"])
    rows.append([
        "**4**", str(release.UE_MINUTES), "Coaching · transition from Level 1 to Level 2",
        f"Trainer-led. A short talk on the day's coaching focus, then the reflection questions in pairs: {_blk(blocks, '1.3')}. The bridge: from reading an interface to deciding under limits.",
        "Task 1 · Block 1.3<br>Trainer document, section Coaching", "Trainer only + Handout",
    ])
    rows.append([
        "**5–6**", str(2 * release.UE_MINUTES), f"Level 2 · Case study {case} (**2 UE**) incl. model solution",
        f"UE5: the trainer presents the case; participants work on {_blk(blocks, '2.1')} and {_blk(blocks, '2.2')}. UE6: groups compare their order and defend it; the trainer closes with the model solution (core logic).",
        "Task 1 · Part 2 · Blocks 2.1, 2.2<br>Trainer document, section Case study", "Handout; model solution shown after the work",
    ])
    rows.append([
        "**7**", str(release.UE_MINUTES), "Level 2 + 3 · Feedback round with a management perspective",
        "Groups present their reasoning, not only their result. The trainer asks the day's Level 3 input questions and leads the discussion.",
        "Trainer document, section Feedback round", "Presentation by the groups; Trainer only",
    ])
    rows.append([
        "**8**", str(release.UE_MINUTES), f"Level 3 · Transfer project, {role} (**3 UE**: UE8–10)",
        f"The trainer presents Materi B ({_ids(b_core)}; use the \"In plain words\" and \"How to decide\" boxes, the rest is handout) and sets the role and the brief.{opt_b}",
        "Materi B (Route 2)", "Presentation + Handout",
    ])
    rows.append([
        "**9**", str(release.UE_MINUTES), "Level 3 · Transfer project",
        f"Individual work or in pairs on {_blk(blocks, '3.1')}.",
        "Task 2 · Block 3.1", "Handout (or on the playground)",
    ])
    rows.append([
        "**10**", str(release.UE_MINUTES), "Level 3 · Transfer project",
        f"{_blk(blocks, '3.2')}: the decision despite incomplete data. Participants then present the decision and what they give up; the trainer debriefs with the model solution.",
        "Task 2 · Block 3.2<br>Trainer document, section Transfer project", "Handout; model solution shown after the work",
    ])
    return rows


def lesson_plan_blocks(day, doc):
    case = CASES[day]
    role = ROLES[day]
    where = {
        "materi": "This document is the study material; it is used in UE1 (Materi A) and UE8 (Materi B).",
        "task": "This document is the worksheet; it is used in UE2 to UE6 (Task 1) and UE8 to UE10 (Task 2).",
        "trainer": "This document is the trainer document; it is used in UE4 to UE10 and is **not handed out to participants**.",
    }[doc]
    out = [
        ("h", 1, "Day at a glance"),
        ("p", f"Day {day} has ten teaching units (UE). {where} The day is built from three documents and the playground: **Materi** (study material), **Task** (worksheet) and **Trainer** (coaching, feedback and model solutions), plus the course website."),
        ("h", 2, "Lesson plan: ten teaching units (Ablaufplan)"),
        ("table", lesson_plan_rows(day)),
        ("p", f"One UE is counted as {release.UE_MINUTES} minutes here; breaks are not shown. The times are a guide for the trainer. Optional blocks and cards can be skipped; the Core blocks are enough for a complete answer."),
        ("h", 2, "Case study and transfer project at a glance"),
        ("table", [
            ["Component", "UE", "Duration", "Participants work in", "Model solution in"],
            [f"**Level 2 case study** ({case})", "UE5–6", f"**2 UE** · {2 * release.UE_MINUTES} min", "Task 1 · Part 2 (Blocks 2.1, 2.2)", "Trainer document, section Case study"],
            [f"**Level 3 transfer project** ({role})", "UE8–10", f"**3 UE** · {3 * release.UE_MINUTES} min", "Materi B and Task 2 (Blocks 3.1, 3.2)", "Trainer document, section Transfer project"],
        ]),
    ]
    return out


# ------------------------------------------------------------------ Day 1: block orientation

COURSE_MAP = [
    ["Module 1", "1", "Fundamentals of UX/UI design for learning platforms and user-centred design of learning interfaces"],
    ["", "2", "Successful e-learning platforms, prototyping and testing, future technologies and adaptive learning"],
    ["Module 2", "3", "Learning psychology for UX designers, cognitive load and information processing"],
    ["", "4", "Motivation and engagement through design psychology, design principles, evaluation of learning-psychology-based UX concepts"],
    ["Module 3", "5", "Fundamentals of user-centred UX design for learning platforms"],
    ["", "6", "Personas for learners and teachers, user journeys in the learning context"],
    ["", "7", "Accessibility and inclusive design, integration and evaluation of user-centred UX concepts"],
    ["Module 4", "8", "Fundamentals of UX/UI design for digital learning environments"],
    ["", "9", "Information architecture and navigation, interactive elements and engagement strategies"],
    ["", "10", "Visual feedback and progress tracking, responsive design and accessibility"],
    ["Module 5", "11", "Fundamentals of gamification in UX design, psychological foundations and motivation theories"],
    ["", "12", "Adaptive learning systems, UX patterns for personalised paths, practical project: a gamified platform"],
    ["Module 6", "13", "Inclusive UX/UI design and accessibility in practice: WCAG"],
    ["", "14", "Plain language, intuitive learning environments, testing and optimising inclusive design"],
    ["Module 7", "15", "Mobile learning UX, microlearning, responsive design, cross-device optimisation"],
    ["Module 8", "16", "UX testing, analytics tools and tracking, KPIs, data-driven optimisation"],
]


def block_orientation_blocks():
    rows = [["Module", "Day", "Topic"]] + COURSE_MAP
    return [
        ("h", 1, "Block orientation (Blockorientierung)"),
        ("p", "This page orients you before the first day. It says what the course is, how a day runs, which documents you will meet, and what is expected of you."),
        ("h", 2, "The course: sixteen days, eight modules"),
        ("p", "The course *Educational UX/UI Design* (Habmann AufstiegsAkademie, One Stop Digital Learning) runs over sixteen days. One thread runs through every day: **UX is a decision problem, not a design problem.** You are asked to think like a decision-maker, not like a designer: to weigh options against a budget, a deadline and conflicting goals, and to say why."),
        ("table", rows),
        ("p", "This release contains the documents for Days 1 to 8. The documents for Days 9 to 16 follow in the same form."),
        ("h", 2, "How every day runs"),
        ("p", "Every day has the same ten teaching units (UE) and the same three levels of work."),
        ("table", [
            ["UE", "What happens", "Level"],
            ["1", "Knowledge transfer: the trainer presents the day's topic", "Level 1 · Knowledge"],
            ["2–3", "Two short tasks: take the user's side, then weigh options under limits", "Level 1 · Knowledge"],
            ["4", "Coaching: from understanding to application", "Level 1 to 2"],
            ["5–6", "Case study (2 UE) with a model solution", "Level 2 · Application"],
            ["7", "Feedback round with a management perspective", "Level 2 + 3"],
            ["8–10", "Transfer project (3 UE): you take a management role and decide", "Level 3 · Management decision"],
        ]),
        ("p", "**Level 1** asks you to understand and to take the learner's side. **Level 2** asks you to analyse a learning interface and make first design decisions. **Level 3** asks you to decide as a manager: to set priorities between user value, effort and business goals, and to decide even when the data is incomplete."),
        ("h", 2, "Your documents and the playground"),
        ("table", [
            ["Document", "What it is", "Who has it"],
            ["**Materi** (A and B)", "Study material. Materi A serves Route 1 (Levels 1 and 2); Materi B serves Route 2 (Level 3).", "Participants (handout)"],
            ["**Task** (1 and 2)", "The worksheet with answer boxes. Task 1 is Route 1; Task 2 is Route 2. There are no answer keys and no scores in it.", "Participants (handout)"],
            ["**Trainer**", "Coaching, feedback round, model solutions and assessment criteria.", "Trainer only"],
            ["**Playground**", f"The course website ({release.SITE}). In class it is the place to practise and learn: the cards and tasks are there too, and you can work in them directly.", "Everyone"],
        ]),
        ("h", 2, "How we work"),
        ("bullets", [
            "Blocks marked **Core** are enough for a complete answer. Blocks and cards marked **Optional** deepen a skill; no Core block needs them.",
            "In the judged parts, a different choice with a clear reason is a good answer. The reason matters more than the result.",
            "The worked examples in the Materi use another company than the task. No task answer is printed in the study material.",
            "Every document names its version, its release date and the person who reviewed and approved it. Diagrams are AI-generated and are labelled on the image.",
        ]),
    ]
