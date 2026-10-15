"""
Writes _source/dayN-trainer.md (the trainer document of each day) from three sources:
  * the plan (Strukturplan xlsx, sheet English): coaching focus, model solution (core logic), feedback round, transfer project;
  * the reference answers of the playground for Days 1 to 6 (trainer_export_days1-6.json, made by export-mentor-keys.ts);
  * trainer_data78.py for Days 7 and 8, which have no playground page yet.
Usage: python _tools/make_trainer.py [day ...]      Needs openpyxl.  The Markdown can be edited by hand afterwards; rerunning overwrites it.
"""
import io
import json
import os
import re
import sys

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import ablauf  # noqa: E402
import release  # noqa: E402
from trainer_data78 import DATA78  # noqa: E402
import make_gen_docs  # noqa: E402

PLAN_XLSX = os.path.join(os.path.dirname(ROOT), "One Stop Digital Learning - Strukturplan 11_F_128 (04-26).xlsx")
EXPORT = os.path.join(HERE, "trainer_export_days1-6.json")
PLAYGROUND_LIB = os.path.join(os.path.dirname(ROOT), "playground-dl", "lib")

COVERAGE = {
    1: ["Block 3.1 (the vision)", "Block 3.1 (three decisions)", "Block 3.1 (their order: the roadmap)", "Block 3.2 (the biggest risk and what you do about it)", "Block 3.2 (who decides, on what evidence)"],
    2: ["Block 3.1 (yes, partly or no)", "Block 3.1 (prototyping strategy)", "Block 3.1 (the data the testing strategy needs)", "Block 3.1 (the investments in order: the roadmap)", "Block 3.2 (the biggest risk: technology against user value)"],
    3: ["Block 3.1 (strategy)", "Block 3.1 (three measures, in order)", "Block 3.1 (your definition)", "Block 3.2 (the biggest risk)", "Block 3.2 (who decides, and which checks a new lesson passes)"],
    4: ["Block 3.1 (motivation strategy)", "Block 3.1 (three measures, in order)", "Block 3.1 (how to measure success)", "Block 3.2 (the biggest risk: perverse incentives, wrong motivation)", "Block 3.2 (who decides, on what evidence)"],
    5: ["Block 3.1 (the central user needs)", "Block 3.1 (three decisions)", "Block 3.1 (their order: the roadmap)", "Block 3.1 (the conflict between user and business)", "Block 3.2 (who decides, and the rule every new feature must pass)"],
    6: ["Block 3.1 (strategic personas)", "Block 3.1 (the target group and why)", "Block 3.2 (the critical journey)", "Block 3.1 (the three biggest problems)", "Block 3.2 (three decisions, in order)"],
    7: ["Block 3.1 (strategy)", "Block 3.1 (integration into processes)", "Block 3.1 (three measures, in order)", "Block 3.2 (evaluation system: KPIs and methods)", "Block 3.2 (risk: costs against benefits)"],
    8: ["Block 3.1 (the card sort)", "Block 3.1 (principles for visual design)", "Block 3.1 (concept for user guidance)", "Block 3.2 (three measures, in order)", "Block 3.2 (risk: too complex against too reduced)"],
}
COVERAGE.update(make_gen_docs.COVERAGE)
BLOCK_UE = {"1.1": "UE2", "1.2": "UE3", "1.3": "UE4", "2.1": "UE5–6", "2.2": "UE5–6", "3.1": "UE9", "3.2": "UE10"}
BANNED = re.compile(r"CLAUDE|\bexport|\bthe app\b|\bapp\b|the check|flag|\bsite\b|website|mentor bar|passcode|#\d+|rule #|the playground|playground", re.I)


def clean(text):
    """Drop sentences that talk about the website or the build, so the text reads as a trainer's note."""
    if not text:
        return ""
    sents = re.split(r"(?<=[.!?])\s+(?=[A-Z“\"(])", text.strip())
    keep = [s for s in sents if not BANNED.search(s)]
    return " ".join(keep).strip()


def cell(s):
    return re.sub(r"\s+", " ", str(s)).replace("|", "/").strip()


# ------------------------------------------------------------------------------------------------ plan
def plan_cells(day):
    wb = openpyxl.load_workbook(PLAN_XLSX, data_only=True)
    ws = wb["English"]
    col = 3 + day
    g = lambda r: (ws.cell(r, col).value or "").replace("\r", "")
    return dict(coach=g(7), case=g(8), feedback=g(10), transfer=g(11))


def bullets(block):
    out = []
    for ln in block.split("\n"):
        ln = ln.strip()
        if not ln:
            continue
        ln = re.sub(r"^[•\-–]\s*", "", ln)
        ln = re.sub(r"^\d+\.\s*", "", ln)
        out.append(ln)
    return out


def sections(text, heads):
    """Split a plan cell at the given heading words ('Reflection:' ...). Returns {head: text}, with '' for the part before the first head."""
    pos = []
    for h in heads:
        m = re.search(r"(?m)^" + re.escape(h) + r"\s*$", text)
        if m:
            pos.append((m.start(), m.end(), h))
    pos.sort()
    out = {"": text[: pos[0][0]] if pos else text}
    for i, (s, e, h) in enumerate(pos):
        out[h] = text[e: pos[i + 1][0] if i + 1 < len(pos) else len(text)]
    return out


# ------------------------------------------------------------------------------------------------ reference answers
def decl_order(day, fname):
    p = os.path.join(PLAYGROUND_LIB, f"day{day}", fname)
    if not os.path.exists(p):
        return []
    return re.findall(r"export function (\w+)\(", open(p, encoding="utf-8").read())


def blocks_for(day):
    """{'1.1': [('key', dict), ('guide', dict)], ...} in reading order."""
    if day in DATA78:
        return DATA78[day]
    if day >= 9:
        return make_gen_docs.trainer_data(day)
    data = json.load(open(EXPORT, encoding="utf-8"))[f"day{day}"]
    out = {}
    for kind, store, order in (("key", data["keys"], decl_order(day, "answerKey.ts")), ("guide", data["guides"], decl_order(day, "guides.ts"))):
        names = [n for n in order if n in store] + [n for n in store if n not in order]
        for n in names:
            obj = store[n]
            if not isinstance(obj, dict):
                continue
            m = re.match(r"^(?:Block )?(\d\.\d)", obj["title"])
            if not m:
                continue
            out.setdefault(m.group(1), []).append((kind, obj))
    # keys first, then guides, each block
    for k, v in out.items():
        out[k] = [x for x in v if x[0] == "key"] + [x for x in v if x[0] == "guide"]
    return out


def render_item(kind, o):
    L = []
    if kind == "key":
        title = re.sub(r"^Block \d\.\d( \(Optional\))? · ", "", o["title"])
        L.append(f"### Reference: {title}")
        L.append("")
        exp = o["expected"].replace("  |  ", " · ")
        opts = o["options"]
        if " → " not in exp:
            L.append(f"**Reference answer.** {cell(exp)}")
            L.append("")
        if all(op["expected"] for op in opts) and len(opts) >= 5:
            # a sorting or a true/false key: every row has a reference reading
            verdict = {}
            for part in o["expected"].split("  |  "):
                if " → " in part:
                    a, b = part.split(" → ", 1)
                    verdict[a.strip()] = b.strip()
            rows = ["| Item | Reference reading |", "|---|---|"]
            for op in opts:
                v = verdict.get(op["label"].strip())
                v = (v[0].upper() + v[1:] + ". ") if v else ""
                rows.append(f"| {cell(op['label'])} | {cell(v + (clean(op['why']) or ''))} |")
        else:
            rows = ["| Option | In the reference answer? | Why |", "|---|---|---|"]
            last_why = None
            for op in opts:
                w = cell(clean(op['why']) or '—')
                if w == last_why and len(w) > 40:
                    w = "Same reading as the row above."
                last_why = cell(clean(op['why']) or '—')
                rows.append(f"| {cell(op['label'])} | {'Yes' if op['expected'] else 'No'} | {w} |")
        L += rows
        note = clean(o.get("teachingNote", ""))
        if note:
            L += ["", f"*Trainer note.* {note}"]
        L.append("")
    else:
        title = re.sub(r"\s*\((Core|Optional)\)\s*$", "", o["title"])
        L.append(f":::note {title}")
        L.append(f"**Model answer (an example).** {cell(clean(o['answer']))}")
        why = clean(o.get("why", ""))
        if why:
            L += ["", f"**Why.** {why}"]
        if o.get("lookFor"):
            L += ["", "**Look for.**"] + [f"- {cell(clean(x) or x)}" for x in o["lookFor"]]
        if o.get("pitfalls"):
            L += ["", "**Typical mistakes.**"] + [f"- {cell(clean(x) or x)}" for x in o["pitfalls"]]
        L += [":::", ""]
    return L


# ------------------------------------------------------------------------------------------------ the document
RUBRIC = [
    ["Criterion", "Level", "Meets", "Partly", "Not yet"],
    ["**The user's side**", "1", "Describes and sorts from the learner's side; every statement points at a printed fact.", "Mostly from the learner's side; some statements are about the design only, or no fact is named.", "Describes the platform, not the learner; no fact named."],
    ["**Weighing under limits**", "2", "Rates user impact, effort and risk with a reason for each; effort follows the printed cost rule; budget and time are checked, or the overrun is explained.", "Ratings given, reasons thin, or effort does not follow the rule.", "Ratings missing or without reasons; the limits are ignored."],
    ["**Prioritising**", "2", "Gives a reason for position one (reach, cost or what the others depend on); the order fits the ratings.", "An order is given; the reason covers the whole set or is generic.", "No order, or no reason."],
    ["**Missing information**", "2", "Names something specific that would change the decision, and how to find it out.", "Names a gap but not how to find it out.", "“More data” with nothing specific."],
    ["**Conflict of goals**", "3", "Names the day's conflicting goals, says who or what loses, and justifies the order.", "Names the conflict; the loser is not named.", "Presents a plan in which everything wins."],
    ["**Decision under uncertainty**", "3", "Decides in one sentence, names an unknown, gives a reversal figure and a time, and says what is given up.", "Decides; the reversal or the give-up is missing or vague.", "Does not decide, or gives up nothing."],
]


def build(day):
    cards, blocks_meta = ablauf.parse_day(day)
    case = ablauf.CASES[day]
    role = ablauf.ROLES[day]
    plan = plan_cells(day)
    task_meta = open(os.path.join(ROOT, "_source", f"day{day}-task.md"), encoding="utf-8").read()
    m = re.search(r"^daytitle: (.*)$", task_meta, re.M)
    daytitle = m.group(1) if m else f"Day {day}"
    m = re.search(r"^case: (.*)$", task_meta, re.M)
    casefull = m.group(1) if m else case
    bdata = blocks_for(day)
    b2 = next((c for c in cards if c["id"] == "B2"), None)
    conflict = b2["title"] if b2 else "the day's conflicting goals"

    title = "SkillUp and LearnFast" if day == 1 else case
    L = []
    L += [
        "---",
        "doc: trainer",
        f"day: {day}",
        f"kicker: DAY {day} · TRAINER DOCUMENT · COACHING, FEEDBACK AND MODEL SOLUTIONS · NOT FOR PARTICIPANTS",
        f"title: {title}: Coaching, Feedback and Model Solutions",
        "subtitle: How to coach, run the feedback round and debrief the case study and the transfer project, with reference answers and assessment criteria",
        f"daytitle: {daytitle}",
        "doctype: Trainer document (coaching, feedback round, model solutions, assessment criteria, transition from Level 2 to Level 3). Not for participants.",
        "route: Serves Route 1 (Levels 1 and 2) and Route 2 (Level 3) of the day.",
        f"minutes: Ten teaching units (UE) · case study 2 UE (UE5–6) · transfer project 3 UE (UE8–10) · one UE counted as {release.UE_MINUTES} min",
        f"case: {casefull}",
        "intro: This document is for the trainer and is not handed out. The Task document carries no answer keys. Here you find the coaching of UE4, the model solution of the case study, the questions of the feedback round, the criteria for moving from Level 2 to Level 3, and the model solution of the transfer project. A reference answer is one defensible answer, not the only one: in the judged parts a different choice with a clear reason is a good answer. There are no scores; give feedback in words, using the criteria.",
        "---",
        "",
        "[[CONTENTS]]",
        "",
        "# Trainer guide",
        "",
        "## How to use this document",
        "",
        "- **Before the day:** read the lesson plan above and the model solution of the case study (UE5–6). Decide which Optional cards and blocks your group will skip.",
        "- **During the day:** use the section of the unit you are in (UE4 coaching, UE6 debrief, UE7 feedback round, UE10 debrief). Show a model solution only after the participants have worked.",
        "- **Reference answers:** they use the facts and the numbers printed in the Task document. Figures that the plan does not print are Case assumptions. Effort is rated by the printed cost rule taught in Materi A5; user impact and risk are judgements.",
        "- **What is not here:** the Materi (the study material) and the Task (the worksheet) are separate documents and are handed out. This one is not.",
        "",
        "## Assessment criteria (Bewertungskriterien)",
        "",
        "Use these criteria to read what participants hand in and to give feedback in words. They are the same on every day; the reference answers below say what meets them on this day.",
        "",
    ]
    for r in RUBRIC:
        L.append("| " + " | ".join(r) + " |")
        if r is RUBRIC[0]:
            L.append("|---|---|---|---|---|")
    L += [
        "",
        "**How to give feedback.** Say what is strong, name one criterion that is only partly met, and give one concrete next step. A choice that differs from the reference is not an error if the reason is clear and refers to a printed fact.",
        "",
    ]

    # ---------------- Level 1 tasks
    L += ["# UE2–3 · Level 1 tasks", ""]
    for bid in ("1.1", "1.2"):
        bm = blocks_meta.get(bid)
        L += [f"## Block {bid} · model answers ({BLOCK_UE[bid]})", ""]
        if bm:
            L += [f"*Block {bid}: {bm['title']} · {bm['kind']} · about {bm['min']} min.*", ""]
        if day == 1 and bid == "1.2":
            L += ["On Day 1, UE3 uses the rating part of Block 2.2; its reference answers are under Block 2.2 below. Block 1.2 is Optional.", ""]
        for kind, o in bdata.get(bid, []):
            L += render_item(kind, o)

    # ---------------- UE4 coaching
    cs = sections(plan["coach"], ["Reflection:"])
    coach_title = cs[""].split("\n")[0].strip()
    coach_points = bullets("\n".join(cs[""].split("\n")[1:]))
    coach_reflect = bullets(cs.get("Reflection:", ""))
    L += [
        "# UE4 · Coaching: transition from Level 1 to Level 2",
        "",
        f"## {coach_title} (UE4)",
        "",
        "**The plan's coaching points.**",
        "",
    ] + [f"- {x}" for x in coach_points] + [
        "",
        "**Reflection questions.**",
        "",
    ] + [f"- {x}" for x in coach_reflect] + [
        "",
        "**How to run the unit (about 45 minutes).**",
        "",
        "| Step | Minutes | What you do |",
        "|---|---|---|",
        f"| 1 | 5 | Say the coaching focus in one sentence: “{coach_title.replace('Coaching Focus: ', '')}.” Say that in the next unit they will not describe, they will decide. |",
        "| 2 | 10 | Pairs talk through the reflection questions; the notes go into Block 1.3 (never scored). |",
        "| 3 | 15 | Collect two or three answers. Link each to a fact or a finding from Block 1.1, so that the answer is about this platform and not about UX in general. |",
        "| 4 | 10 | Bridge: Level 1 was reading the platform from the user's side. Level 2 asks you to rate and order measures under a budget and a deadline, and to say what information you are missing. Show the first step of Block 2.2. |",
        "| 5 | 5 | Open questions; set the briefing for UE5. |",
        "",
        f"## Block 1.3 · model answers (UE4)",
        "",
    ]
    for kind, o in bdata.get("1.3", []):
        L += render_item(kind, o)

    # ---------------- UE5-6 case study
    cc = sections(plan["case"], ["Situation:", "Analysis:", "Task:", "Model Solution (Core Logic):", "Rationale:"])
    core = bullets(cc.get("Model Solution (Core Logic):", ""))
    rationale = " ".join(bullets(cc.get("Rationale:", "")))
    main = [x for x in core if x.lower().startswith("main problem")]
    meas = [x for x in core if x not in main and not x.lower().startswith("measures") and not x.lower().startswith("solution")]
    L += [
        "# UE5–6 · Case study (2 UE)",
        "",
        "## The plan's model solution: core logic (UE5–6)",
        "",
        "Show this only after the participants have worked, at the end of UE6.",
        "",
    ]
    L += [f"- **{x.split(':')[0]}:** {x.split(':', 1)[1].strip()}" for x in main if ":" in x]
    L += ["- **Measures (as the plan lists them):**"] + [f"  - {x}" for x in meas] if meas else []
    L += ["", f"**Rationale (plan):** {rationale}", ""]
    for bid in ("2.1", "2.2"):
        bm = blocks_meta.get(bid)
        L += [f"## Block {bid} · model answers ({BLOCK_UE[bid]})", ""]
        if bm:
            L += [f"*Block {bid}: {bm['title']} · {bm['kind']} · about {bm['min']} min.*", ""]
        for kind, o in bdata.get(bid, []):
            L += render_item(kind, o)
    L += [
        "## Debrief of the case study (UE6)",
        "",
        "| Step | Minutes | What you do |",
        "|---|---|---|",
        "| 1 | 15 | Groups of three or four compare their four measures and their order. They name where they differ and why. |",
        "| 2 | 15 | Each group gives the reason for its first priority in one sentence. Write the reasons on a board; do not write the measures. |",
        f"| 3 | 10 | Show the plan's core logic and the rationale line (“{rationale}”). Ask: where does a different order still defend? |",
        "| 4 | 5 | Ask each participant to write one thing they would now rate differently. |",
        "",
    ]

    # ---------------- UE7 feedback
    fs = sections(plan["feedback"], ["Preparation:", "Level 3 Input:", "Discussion:"])
    fb_title = fs[""].strip().split("\n")[0]
    L += [
        "# UE7 · Feedback round",
        "",
        f"## {fb_title} (UE7)",
        "",
        "**Preparation (from the plan).**",
        "",
    ] + [f"- {x}" for x in bullets(fs.get("Preparation:", ""))] + [
        "",
        "**Level 3 input: ask these questions.**",
        "",
    ] + [f"- {x}" for x in bullets(fs.get("Level 3 Input:", ""))] + [
        "",
        "**Discussion.**",
        "",
    ] + [f"- {x}" for x in bullets(fs.get("Discussion:", ""))] + [
        "",
        "**How to run the unit (about 45 minutes).**",
        "",
        "| Step | Minutes | What you do |",
        "|---|---|---|",
        "| 1 | 20 | Each group presents for about five minutes. The focus is the reasoning, not the result: why this first priority, what was left out. |",
        "| 2 | 15 | Put the Level 3 input questions to the whole room, one at a time. Ask for the answer in business terms: what it moves (completion, retention, engagement, cost). |",
        "| 3 | 10 | Run the discussion. Close with one sentence: the same measures, ordered under a different goal, give a different plan. That is the step to Level 3. |",
        "",
        "## Transition from Level 2 to Level 3 (Übergang)",
        "",
        f"Level 2 asks a participant to decide among measures. Level 3 asks them to decide as a manager, between goals that pull apart. The day's conflict is: **{conflict}** (Materi B2).",
        "",
        "**A participant is ready for Level 3 (Route 2, Task 2) when:**",
        "",
        "1. the Core of Task 1 is done and the reason for position one names a reach, a cost or a dependency;",
        "2. the missing information is specific and comes with a way to find it out;",
        "3. they can say the day's conflict in one sentence and name what loses when each side wins.",
        "",
        "**If a participant is not there yet:**",
        "",
        "- Ask for the reason of position one again, using the “How to decide” box of Materi A5.",
        "- Pair them for UE8 with someone who is ready, for the brief and the first block.",
        "- Give them the “In plain words” box of Materi B1 before the brief; Route 2 does not need Route 1 answers.",
        "",
        "Route 2 does not require Route 1: a participant may start the transfer project without having finished Task 1, and use their own answers in the memo if they have them.",
        "",
    ]

    # ---------------- UE8-10 transfer
    ts = sections(plan["transfer"], ["Framework:", "Develop:", "Additional:", "Goal:"])
    role_line = re.search(r"Role:\s*(.*)", ts[""])
    develop = bullets(ts.get("Develop:", ""))
    additional = " ".join(bullets(ts.get("Additional:", "")))
    goals = bullets(ts.get("Goal:", ""))
    L += [
        "# UE8–10 · Transfer project (3 UE)",
        "",
        "## What the plan asks and where the worksheet answers it (UE8–10)",
        "",
        f"The plan's role: {(role_line.group(1).strip() if role_line else role).rstrip('.')}.",
        "",
        "| Plan item | Where the worksheet answers it |",
        "|---|---|",
    ]
    for i, item in enumerate(develop):
        where = COVERAGE[day][i] if i < len(COVERAGE[day]) else "Block 3.2"
        L.append(f"| {i + 1}. {cell(item)} | {where} |")
    L.append(f"| Additional: {cell(additional)} | Block 3.2 (the decision with its four parts: what you decide, what you do not know, when you reverse, what you give up) |")
    L += ["", "**The plan's goals for the project.**", ""] + [f"- {g}" for g in goals] + [""]
    for bid in ("3.1", "3.2"):
        bm = blocks_meta.get(bid)
        L += [f"## Block {bid} · model answers ({BLOCK_UE[bid]})", ""]
        if bm:
            L += [f"*Block {bid}: {bm['title']} · {bm['kind']} · about {bm['min']} min.*", ""]
        for kind, o in bdata.get(bid, []):
            L += render_item(kind, o)
    L += [
        "## Debrief of the transfer project (UE10)",
        "",
        "| Step | Minutes | What you do |",
        "|---|---|---|",
        "| 1 | 25 | Each participant presents the decision under uncertainty in the four parts: what I decide, what I do not know, when I reverse (a figure and a time), what I give up. Two minutes each; the others ask one question. |",
        "| 2 | 10 | Name the losers: what did each plan give up, and who would miss it? A plan with no loser has not decided. |",
        "| 3 | 10 | Show the model solution of Block 3.1 and 3.2 and the plan's goals: think like a decision-maker, understand the day as a system, take responsibility. Compare, do not correct. |",
        "",
    ]
    out = os.path.join(ROOT, "_source", f"day{day}-trainer.md")
    open(out, "w", encoding="utf-8").write("\n".join(L))
    return out


if __name__ == "__main__":
    days = [int(x) for x in sys.argv[1:]] or list(range(1, 17))
    for d in days:
        print("wrote", build(d))
