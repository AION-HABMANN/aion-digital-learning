"""
Writes the Word-document sources (_source/dayN-materi.md, dayN-task.md, dayN-trainer.md) and the figures of the generic days (Days 9 to 16) from the playground itself,
so that the documents and the website cannot drift apart.

Inputs (made by the playground; see dump-day-docs.tsx and the one-off dump in the README):
  _tools/_gen_dump.json          the English specs, card metas, glossary and references of Days 8 to 16
  _work/dump/dayN.json, _work/svg/*.svg   the study cards (text, tables, figures) and the mock pictures of each day

Usage: python _tools/make_gen_docs.py [day ...]      (default: 9 to 16)       then   python _tools/build_all.py [day ...]
The Markdown can be edited by hand afterwards; rerunning overwrites it.
"""
import json
import os
import random
import re
import sys
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import figlib  # noqa: E402
from figlib import Canvas, W, chain, frame4, matrix, budget_bands  # noqa: E402
import release  # noqa: E402

DUMP = json.load(open(os.path.join(HERE, "_gen_dump.json"), encoding="utf-8"))
COURSE_TS = os.path.join(os.path.dirname(ROOT), "playground-dl", "data", "course.ts")
PLAYGROUND = os.path.join(os.path.dirname(ROOT), "playground-dl")
P = "Habmann-Digital-Learning"

BLOCK_MIN = {"1.1": 13, "1.2": 8, "1.3": 5, "2.1": 7, "2.2": 17, "3.1": 10, "3.2": 10}
COVERAGE = {
    9: ["Block 3.1 (the sections)", "Block 3.1 (the navigation elements)", "Block 3.1 (the interaction map)", "Block 3.2 (three measures, in order)", "Block 3.2 (risk: over-structuring against over-interaction)"],
    10: ["Block 3.1 (the kinds of feedback)", "Block 3.1 (progress tracking elements and their risk)", "Block 3.1 (the device plan)", "Block 3.1 (accessibility in the responsive context)", "Block 3.2 (three measures, in order, and the risk)"],
    11: ["Block 3.1 (the decision: gamification or not)", "Block 3.1 (meaningful mechanics)", "Block 3.1 (the link to learning objectives)", "Block 3.2 (risk: perverse incentives, over-motivation)", "Block 3.2 (three measures, in order)"],
    12: ["Block 3.1 (the approach to adaptive paths)", "Block 3.1 (how gamification joins in)", "Block 3.1 (UX design patterns)", "Block 3.1 (the concept sketch)", "Block 3.2 (three measures, in order, and the risk)"],
    13: ["Block 3.1 (the WCAG strategy)", "Block 3.2 (three measures, in order)", "Block 3.1 (integration into the UX process)", "Block 3.1 (the evaluation approach)", "Block 3.2 (risk: costs against benefits)"],
    14: ["Block 3.1 (the strategy for simplifying)", "Block 3.1 (the information architecture steps)", "Block 3.1 (the testing and optimisation concept)", "Block 3.2 (three measures, in order)", "Block 3.2 (risk: too much against too little simplification)"],
    15: ["Block 3.1 (the mobile strategy)", "Block 3.1 (the microlearning rules)", "Block 3.1 (the cross-device placement)", "Block 3.1 (how to test and optimise)", "Block 3.2 (three measures, in order, and the risk)"],
    16: ["Block 3.1 (the strategy; the KPIs of Level 2 are defined in Task 1, Block 2.2)", "Block 3.1 (the tracking and analysis rules)", "Block 3.1 (the hypotheses)", "Block 3.2 (three measures, in order)", "Block 3.1 (who decides on what evidence)"],
}


# ------------------------------------------------------------------------------------------------ small helpers
def cell(s):
    return re.sub(r"\s+", " ", str(s)).replace("|", "/").strip()


def money(n):
    return "€" + f"{n:,}"


INSTR = re.compile(r"^(Choose|Press|Switch|Select|Nothing to click|Click|Drag|Walk me|Move)\b")


def drop_instr(text):
    """Remove the sentences that only say what to click."""
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    out = " ".join(p for p in parts if not INSTR.match(p)).strip()
    out = re.sub(r"[;:,]\s*(select|choose|press|click|tap|drag)\b[^.]*", "", out)
    return re.sub(r"\bwith (\w+) switches\b", r"with \1 features that can be on or off", out)


def strip_min(text):
    text = re.sub(r"\s*At least \d+ characters( in all)?\.", "", text)
    return text.strip()


def rng(day, key):
    return random.Random(zlib.crc32(f"{day}:{key}".encode()))


def shuffled(day, key, items):
    r = rng(day, key)
    out = list(items)
    r.shuffle(out)
    return out


def band_of(spec, cost):
    lim = spec["limits"]
    return "Low" if cost <= lim["effortLowMax"] else ("Mid" if cost <= lim["effortMidMax"] else "High")


def lvl(n):
    return {1: "Low", 2: "Mid", 3: "High"}[n]


def course_meta(day):
    t = open(COURSE_TS, encoding="utf-8").read()
    m = re.search(r'\{ n: %d,[^\n]*?module: t\("([^"]+)",[^\n]*?part: t\("([^"]+)",[^\n]*?short: t\("([^"]+)",[^\n]*?topic: t\("([^"]+)",' % day, t)
    return dict(module=m.group(1), part=m.group(2), short=m.group(3), topic=m.group(4))


def mats(day):
    return DUMP["mats"][str(day)]


def card_title(day, cid):
    for c in mats(day)["list"]:
        if c["id"] == cid:
            return c["title"]
    return cid


def card_info(day, cid):
    for c in mats(day)["list"]:
        if c["id"] == cid:
            return c
    raise KeyError(cid)


def chip(key):
    r = DUMP["refs"].get(key)
    return r["chip"] if r else key


# ------------------------------------------------------------------------------------------------ figures
SVG_DIR = os.path.join(ROOT, "_work", "svg")


def svg_inner(name):
    s = open(os.path.join(SVG_DIR, name), encoding="utf-8").read()
    m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', s)
    vw, vh = float(m.group(1)), float(m.group(2))
    inner = re.sub(r"^<svg[^>]*>", "", s)
    inner = re.sub(r"</svg>\s*$", "", inner)
    inner = re.sub(r"<title[^>]*>.*?</title>", "", inner, flags=re.S)
    inner = re.sub(r"<desc[^>]*>.*?</desc>", "", inner, flags=re.S)
    return vw, vh, inner


def sheet(fname, svgs, captions=None, cols=None, title=None, note=None):
    """A row (or grid) of the website's own mock pictures, with a caption under each."""
    n = len(svgs)
    cols = cols or n
    rows = (n + cols - 1) // cols
    gap = 14
    cw = (W - 20 - gap * (cols - 1)) / cols
    dims = [svg_inner(s)[:2] for s in svgs]
    cap_h = 30 if captions else 0
    rh = max(d[1] * cw / d[0] for d in dims) + cap_h + 10
    top = 12 + (28 if title else 0)
    h = top + rows * rh + (34 if note else 6)
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=figlib.ASH)
    for i, s in enumerate(svgs):
        r, k = divmod(i, cols)
        vw, vh, inner = svg_inner(s)
        x = 10 + k * (cw + gap)
        y = top + r * rh
        sc = cw / vw
        c.raw(f'<g transform="translate({x:.1f},{y:.1f}) scale({sc:.4f})">{inner}</g>')
        if captions:
            c.tb(x, y + vh * sc + 4, cw, captions[i], 13.5, "bold", figlib.INK, "middle")
    if note:
        c.tb(10, h - 30, W - 20, note, 13, fill=figlib.ASH)
    return c.save(fname)


def fig_png(day, cid, idx, f, spec):
    """Draw one figure descriptor to PNG. Returns (path-relative-to-source, caption)."""
    base = f"d{day}_{cid.lower()}_{idx}"
    name = base + ".png"
    kind = f["fig"]
    label = f.get("label") or ""
    cap = re.sub(r"\s*·\s*(Exploratory|Case assumption)", "", label)
    if kind == "StateFig":
        sheet(name, [s["svg"] for s in f["states"]], [s["button"] for s in f["states"]], cols=len(f["states"]))
    elif kind == "SwitchFig":
        sheet(name, [f["off"]["svg"], f["on"]["svg"]], ["All switches off", "All switches on"], cols=2)
    elif kind == "Svg":
        sheet(name, [f["svg"]])
    elif kind == "Html":
        sheet(name, f["svgs"], cols=len(f["svgs"]))
    elif kind == "WeighFig":
        items = [(i["name"], i["cost"]) for i in f["items"]]
        bands = [(b["to"], b["label"]) for b in f["bands"]]
        budget_bands(name, items, f["budget"], bands, title=f"{f['company']} · Case assumption · budget {money(f['budget'])}")
    elif kind == "MatrixStory":
        pts = [(f"{p['letter']} {p['name']}", p["x"], p["y"]) for p in f["points"]]
        matrix(name, f["xLabel"], f["yLabel"], tuple(f["quads"]), pts, title="LearnLoop · Case assumption · a reading of the example, not a score")
    elif kind == "ChainFig":
        chain(name, [(s["h"], s["b"], s["kind"]) for s in f["steps"]], title=cap, note=f.get("caption"), hs=14, bs=12.5)
    elif kind == "DecisionFrameFig":
        b, r = f["boxes"], f["rule"]
        frame4(name, b[0][1], b[1][1], b[2][1], b[3][1], r[0][1], r[1][1])
    else:
        raise ValueError(kind)
    return f"_figures/{name}", cap


# ------------------------------------------------------------------------------------------------ Materi
def say_text(s):
    return drop_instr(s)


def story_md(steps):
    L = ["**A short story in steps.**", ""]
    for i, s in enumerate(steps, 1):
        L.append(f"{i}. **{cell(s['title'])}.** {cell(say_text(s['say']))}")
    L.append("")
    return L


def strip_prefix(t):
    return re.sub(r"^In plain words:\s*", "", t.strip())


def fig_md(day, cid, idx, f, spec):
    path, cap = fig_png(day, cid, idx, f, spec)
    L = [f"![{cap}.]({path})", ""]
    kind = f["fig"]
    if kind in ("StateFig", "SwitchFig", "WeighFig", "MatrixStory") and f.get("point"):
        L += [f"**The point.** {f['point']}", ""]
    if kind == "StateFig":
        L += story_md(f["steps"])
        L += ["| State shown in the picture | What it means |", "|---|---|"]
        for s in f["states"]:
            L.append(f"| {cell(s['button'])} | {cell(strip_prefix(s['insight']))} |")
        L.append("")
    elif kind == "SwitchFig":
        L += story_md(f["steps"])
        L += ["| Switches | What it means |", "|---|---|", f"| All off | {cell(strip_prefix(f['off']['insight']))} |", f"| All on ({', '.join(s['label'] for s in f['switches'])}) | {cell(strip_prefix(f['on']['insight']))} |", ""]
    elif kind == "WeighFig":
        L += story_md(f["steps"])
        lim = f["bands"]
        L += [f"| Measure ({f['company']}, Case assumption) | Cost | Effort | {f['impactLabel']} | Risk | Reasons |", "|---|---|---|---|---|---|"]
        for i in f["items"]:
            eff = lvl(i["band"])
            L.append(f"| {cell(i['name'])} | {money(i['cost'])} | {eff} | {lvl(i['impact']['level'])} | {lvl(i['risk']['level'])} | Effort: {cell(i['effortReason'])} {f['impactLabel']}: {cell(i['impact']['reason'])} Risk: {cell(i['risk']['reason'])} |")
        L.append("")
    elif kind == "MatrixStory":
        L += story_md(f["steps"])
        L += ["| Point | The idea | Why it sits there |", "|---|---|---|"]
        for p in f["points"]:
            L.append(f"| {p['letter']} | {cell(p['name'])} | {cell(p['reading'])} |")
        L.append("")
    elif kind == "Html":
        if f.get("text"):
            L += [cell(f["text"]), ""]
    return L


def card_md(day, cid, card, spec):
    info = card_info(day, cid)
    plain = mats(day)["plain"][cid]
    kind = "Optional" if info.get("optional") else "Core"
    L = [f"## {cid} · {info['title']} · {info['minutes']} min · {kind}", "", f"> {card['scan']}", ""]
    L += [
        ":::box In plain words",
        f"**The idea.** {plain['idea']}",
        f"**Why it matters.** {plain['why']}",
        f"**How to read the picture.** {drop_instr(plain['picture'])}",
        ":::",
        "",
    ]
    nfig = 0
    for it in card["items"]:
        k = it["k"]
        if k == "fig":
            L += fig_md(day, cid, nfig, it, spec)
            nfig += 1
        elif k == "table":
            L += [f"*{it['caption']}*", "", "| " + " | ".join(cell(h) for h in it["head"]) + " |", "|" + "---|" * len(it["head"])]
            for r in it["rows"]:
                L.append("| " + " | ".join(cell(x) for x in r) + " |")
            L.append("")
        elif k == "callout":
            L += [f":::note {it['label']}", it["text"], ":::", ""]
    L += [":::rules How to decide when this comes up in the task"] + [f"- {r}" for r in card["reasoning"]] + [":::", ""]
    for it in card["items"]:
        if it["k"] == "extra":
            L += [":::note Extra · go deeper (optional reading)"] + ["\n\n".join(it["paras"]), ":::", ""]
    L += ["^src: " + " · ".join(chip(s) for s in card["sources"]), ""]
    return L


def glossary_ids(day, text):
    own = set(re.findall(r'id: "([a-z0-9-]+)"', open(os.path.join(PLAYGROUND, "data", f"glossaryDay{day}.ts"), encoding="utf-8").read()))
    found = {}
    low = text.lower()
    for g in DUMP["gloss"]:
        if g["id"] in own:
            found[g["id"]] = 10**6
            continue
        best = 0
        for m in [g["title"]] + g.get("match", []):
            if len(m) < 4:
                continue
            n = len(re.findall(r"(?<![\w-])" + re.escape(m.lower()) + r"(?![\w-])", low))
            best = max(best, n)
        if best:
            found[g["id"]] = best
    ids = sorted(found, key=lambda k: -found[k])[:40]
    return ids


def refs_for(cards):
    seen = []
    for c in cards.values():
        for s in c["sources"]:
            if s not in seen:
                seen.append(s)
    return seen


def materi_md(day):
    spec = DUMP["specs"][str(day)]
    dump = json.load(open(os.path.join(ROOT, "_work", "dump", f"day{day}.json"), encoding="utf-8"))
    cards = dump["cards"]
    meta = course_meta(day)
    daytitle = f"Day {day} · {meta['module']} ({meta['part'][0].lower() + meta['part'][1:]}): {meta['topic']}"
    case = spec["caseName"]
    body = []
    body += [
        "[[CONTENTS]]",
        "",
        "# Materi A · Route 1 · Levels 1 and 2",
        "",
        ":::note How Materi A is used",
        f"About 60 minutes, five cards. {spec['route1']['order'].split('→')[0].strip() if False else ''}The plan's Level 1 asks you to understand the fundamentals of the day's topic. Level 2 asks you to analyse a learning interface and to apply them. Task 1 uses all of it on one case. The card A4 is Optional: no Core block of the task needs it.",
        ":::",
        "",
    ]
    for cid in ["A1", "A2", "A3", "A4", "A5"]:
        body += card_md(day, cid, cards[cid], spec)
    body += ["# Materi B · Route 2 · Level 3", "", ":::note How Materi B is used", "About 60 minutes, three cards. Level 3 asks you to decide as a manager, between goals that pull apart, and to take responsibility. Task 2 uses all three cards.", ":::", ""]
    for cid in ["B1", "B2", "B3"]:
        body += card_md(day, cid, cards[cid], spec)
    text = "\n".join(body)
    gl = glossary_ids(day, text)
    rf = refs_for(cards)
    fm = [
        "---",
        "doc: materi",
        f"day: {day}",
        f"kicker: DAY {day} · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3",
        f"title: {meta['short']}",
        f"subtitle: {meta['topic']}",
        f"daytitle: {daytitle}",
        "doctype: Materi (study material). Materi A has five cards, Materi B has three.",
        "route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).",
        "minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)",
        f"case: Worked examples use LearnLoop, an online-course provider. The task case is {case}, {spec['brief1']['heading'].split(', ', 1)[-1] if ', ' in spec['brief1']['heading'] else ''}(see the Task document).",
        f"intro: This document holds everything you need to study Day {day} without the website. Each card says the idea in plain words, shows it in a picture, gives the details, and ends with the rules you will use in the Task document. Cards marked Optional are not needed for the Core blocks of the task. The worked examples use LearnLoop, a different company from the task case, so no task answer is printed here. Glossary and references are at the end.",
        "glossary: " + ",".join(gl),
        "refs: " + ",".join(rf),
        "---",
        "",
    ]
    return "\n".join(fm) + text + "\n"


# ------------------------------------------------------------------------------------------------ Task
def opt_labels(day, fid, options):
    return [o["label"] for o in shuffled(day, fid, options)]


def field_md(day, spec, f, blockno, letter):
    """One field of a block as a worksheet element. Returns lines."""
    L = []
    kind = f.get("kind")
    if kind == "single":
        L += [f"**{cell(f['label'])}** {cell(strip_min(f['help']))}", "", "[[CHOOSE]] " + " ‖ ".join(cell(x) for x in opt_labels(day, f["id"], f["options"])), ""]
    elif kind == "text":
        L += [f"[[ANSWER lines={f.get('rows', 3)} label={cell(f['label'])} {cell(strip_min(f['help']))}]]", ""]
    elif kind == "multi":
        need = f"Choose exactly {f['exact']}." if f.get("exact") else f"Choose at least {f.get('min', 1)}."
        L += [f"**{cell(f['label'])}** {cell(strip_min(f['help']))} {need}", "", "[[TICKALL]] " + " ‖ ".join(cell(x) for x in opt_labels(day, f["id"], f["options"])), ""]
    elif kind == "assign":
        letters = "ABCDEFGH"
        L += [f"**{cell(f['label'])}** {cell(f['help'])} Write the letter of your choice in the last column. Use each section at least once.", "", "| Letter | Section |", "|---|---|"]
        for i, b in enumerate(f["bins"]):
            L.append(f"| {letters[i]} | {cell(b['label'])} |")
        L += ["", f"| No. | Item | Section (A to {letters[len(f['bins']) - 1]}) |", "|---|---|---|"]
        for it in f["items"]:
            L.append(f"| {it['no']} | {cell(it['label'])} | __ |")
        L.append("")
    elif kind == "frame":
        L += [f"**{cell(f['label'])}** Use the four parts of Materi B3. The fourth part, what you give up, has its own field further down.", "", "| Part | Your sentence |", "|---|---|"]
        for p in f["parts"]:
            L.append(f"| {cell(p['label'])} | __ |")
        L.append("")
    return L


def decisions_md(day, spec):
    d = spec["decisions"]
    pick = spec["limits"]["r2Pick"]
    L = [f"**Choose exactly {pick} {d['pickLabel']}.**", "", f"| No. | Decision | What it is | Cost | Weeks | Acts on | Choose ({pick}) |", "|---|---|---|---|---|---|---|"]
    for i in d["items"]:
        L.append(f"| {i['no']} | {cell(i['name'])} | {cell(i['what'])} | {money(i['cost'])} | {i['weeks']} | {cell(d['areas'].get(i['area'], i['area']).replace('Acts on: ', ''))} | ☐ |")
    L += ["", "| Total cost of your measures | Yearly budget |", "|---|---|", f"| € __ | {money(spec['limits']['r2Budget'])} |", "", "Going over the budget is allowed; say why. It is printed in the memo as a fact.", "", "| Priority | Measure (" + f"{d['items'][0]['no']} to {d['items'][-1]['no']}) |", "|---|---|"]
    for k in range(1, pick + 1):
        L.append(f"| {k} | __ |")
    L += ["", f"[[ANSWER lines=3 label={cell(d['whyLabel'])} {cell(strip_min(d['whyHelp']))}]]", ""]
    return L


def draws_on(day, refs):
    return " · ".join(f"{r} · {card_title(day, r)}" for r in refs)


def task_md(day):
    spec = DUMP["specs"][str(day)]
    dump = json.load(open(os.path.join(ROOT, "_work", "dump", f"day{day}.json"), encoding="utf-8"))
    meta = course_meta(day)
    daytitle = f"Day {day} · {meta['module']} ({meta['part'][0].lower() + meta['part'][1:]}): {meta['topic']}"
    case = spec["caseName"]
    role = spec["role"]
    lim = spec["limits"]
    b1, b2 = spec["brief1"], spec["brief2"]
    desc1 = re.sub(r"^The case: ", "", b1["heading"])
    desc1 = desc1.split(", ", 1)[1] if ", " in desc1 else desc1
    titleh = f"{case}: UX Analysis and UX Strategy Memo"
    L = []
    L += [
        "---",
        "doc: task",
        f"day: {day}",
        f"kicker: DAY {day} · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3",
        f"title: {titleh}",
        f"subtitle: {spec['route1']['title']} as a team member, and decide as {role}",
        f"daytitle: {daytitle}",
        "doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).",
        "route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).",
        f"minutes: Task 1 Core about 30 min (all blocks about 50 min) · Task 2 Core about 20 min",
        f"case: {case}, {desc1}",
        f"intro: This is the worksheet for Day {day}. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. Blocks marked Core are enough for a complete answer; blocks marked Optional deepen a skill and no Core block needs them. Every block names the cards of the Materi document it draws on. There are no answer keys here: in the judged parts a different choice with a clear reason is a good answer.",
        "@@GLOSSARY@@",
        "---",
        "",
        "[[CONTENTS]]",
        "",
    ]

    def plan(t):
        return re.sub(r"^Plan:\s*", "", t)

    caseplan = f"Level 2 case study {case}: identify the central problems, develop four UX measures, prioritise, justify (and any extra item the plan names, such as test methods or KPIs)"
    L += [
        ":::note Which plan item each block answers",
        "| UE | Plan item (Strukturplan, Day %d) | Block in this document |" % day,
        "|---|---|---|",
        f"| UE2 | {cell(plan(spec['b11']['plan']))} | Block 1.1 (Core): the eight facts are sorted, then the fields |",
        f"| UE3 | {cell(spec['opts']['title'].split(' · ', 1)[1])}: assess each option (benefit or impact, effort, risk), decide, justify | Block 1.2 (Optional) |",
        f"| UE4 | Coaching: {cell(drop_instr(spec['reflect']['point']))} | Block 1.3 (Optional) |",
        f"| UE5–6 | {cell(caseplan)} | Block 2.1 (Optional, four problems) and Block 2.2 (Core, four improvements, priority, justification) |",
        "| UE7 | Feedback round with a strategic perspective | A classroom discussion led by the facilitator; not a worksheet block |",
        f"| UE8–10 | Level 3 transfer project: {cell(plan(spec['b31']['plan']))} {cell(plan(spec['b32']['plan']))} | Blocks 3.1 and 3.2 (both Core) |",
        ":::",
        "",
        ":::note Your name",
        "Write your full name here. Use the same name on every Task document this week; it is how your work is matched.",
        "[[ANSWER lines=1]]",
        ":::",
        "",
        f"# Task 1 · Route 1 · UX Analysis File (Levels 1 and 2)",
        "",
        f"## {b1['heading']}",
        "",
        b1["paragraph"],
        "",
        "| What you have | The limits | How the task runs |",
        "|---|---|---|",
        "| " + "<br>".join(cell(x) for x in b1["have"]["items"]) + " | " + "<br>".join(cell(x) for x in b1["limits"]["items"]) + " | " + cell(b1["runTitle"].split(" · ")[0]) + ":<br>" + "<br>".join(f"{i}. {cell(x)}" for i, x in enumerate(b1["run"], 1)) + "<br>" + cell(b1["runNote"]) + " |",
        "",
        ":::note Case assumption",
        b1["assumption"],
        ":::",
        "",
        f"## The evidence: four {case} screens and eight facts",
        "",
        "The picture shows four screens in outline. The numbers 1 to 8 mark the places the facts below describe. The table prints each fact as plain description: it says what is there, never whether it is a problem.",
        "",
    ]
    ev = dump["evidence"]
    sheet(f"d{day}_t1_screens.png", [e["svg"] for e in ev], [e["caption"] for e in ev], cols=2, title=f"{case} screens, drawn in outline · Case assumption: the details are made up for this exercise")
    L += [f"![The {case} screens, drawn in outline. Numbers 1 to 8 mark the facts in the table (Case assumption: the details are made up for this exercise).](_figures/d{day}_t1_screens.png)", "", "| No. | Screen | What is there |", "|---|---|---|"]
    for f in spec["facts"]:
        L.append(f"| {f['no']} | {cell(f['where'])} | {cell(f['text'])} |")
    L += ["", f"# Part 1 · {spec['partHeadings']['p1']['title']} · Level 1 · Knowledge", ""]

    # ---- block 1.1
    b11 = spec["b11"]
    L += [f"## {b11['title']} · OBJECTIVE + JUDGED · Core · about {BLOCK_MIN['1.1']} min", "", f"**Draws on:** {draws_on(day, b11['refs'])}.", ""]
    cats = spec["cats"]
    catlist = "; ".join(f"*{c['label'].split(':')[0]}* ({c['hint'][0].lower() + c['hint'][1:]})" for c in cats)
    L += [f"**Part a (objective).** Sort each fact into the kind it shows. Tick one box per fact. The kinds are: {catlist}", "", "| No. | The fact in short | Kind (tick one) |", "|---|---|---|"]
    for f in spec["facts"]:
        L.append(f"| {f['no']} | {cell(f['short'])} | " + "<br>".join("☐ " + cell(c["label"].split(":")[0]) for c in cats) + " |")
    L.append("")
    letters = "bcdefg"
    for i, f in enumerate(b11["fields"]):
        L += [f"**Part {letters[i]} (judged).**", ""] + field_md(day, spec, f, "1.1", letters[i])

    # ---- block 1.2
    o = spec["opts"]
    L += [f"## {o['title']} · OBJECTIVE + JUDGED · Optional · about {BLOCK_MIN['1.2']} min", "", f"*Optional. {o['reason']}*", "", f"**Draws on:** {draws_on(day, o['refs'])}.", "", o["intro"], "", f"| Option | What it is | Cost | Weeks | {o['criteria'][0]['label']} | {o['criteria'][1]['label']} | {o['criteria'][2]['label']} |", "|---|---|---|---|---|---|---|"]
    for op in o["options"]:
        L.append(f"| **{op['id']}** | {cell(op['name'])} | {money(op['cost'])} | {op['weeks']} | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |")
    ids = [op["id"] for op in o["options"]]
    L += ["", "| Priority | Option (" + ", ".join(ids[:-1]) + " or " + ids[-1] + ") |", "|---|---|"] + [f"| {k} | __ |" for k in range(1, len(ids) + 1)]
    L += ["", f"[[ANSWER lines=3 label={cell(o['whyLabel'])} {cell(strip_min(o['whyHelp']))}]]", ""]

    # ---- block 1.3
    r = spec["reflect"]
    L += [f"## {r['title']} · REFLECTION · Optional · about {BLOCK_MIN['1.3']} min", "", f"*Optional. {r['reason']} Your notes are never scored and never count as missing; no Core block needs them.*", "", r["point"] + " Think back on Block 1.1 and write what comes to mind.", ""]
    for q in r["questions"]:
        L += [f"[[ANSWER lines=3 label={cell(q['q'])}]]", ""]

    # ---- part 2
    L += [f"# Part 2 · {spec['partHeadings']['p2']['title']} · Level 2 · Application · Case study (2 UE)", "", ":::note Case study: 2 teaching units (UE5–6)", "This part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your order with your group and for the trainer's closing. The blocks below need about 24 minutes of writing; the rest of the time is the group comparison.", ":::", ""]
    cz = spec["causes"]
    items = shuffled(day, "causes", cz["items"])
    L += [f"## {cz['title']} · OBJECTIVE + JUDGED · Optional · about {BLOCK_MIN['2.1']} min", "", f"*Optional. {cz['reason']}*", "", f"**Draws on:** {draws_on(day, cz['refs'])}.", "", f"{cz['pickHelp']} Choose exactly four of the seven.", "", "[[TICKALL]] " + " ‖ ".join(cell(x["text"]) for x in items), "", f"[[ANSWER lines=3 label={cell(cz['whyLabel'])} {cell(strip_min(cz['whyHelp']))}]]", ""]

    b22 = spec["b22"]
    L += [f"## {b22['title']} · OBJECTIVE + JUDGED · Core · about {BLOCK_MIN['2.2']} min", "", f"**Draws on:** {draws_on(day, b22['refs'])}.", "", f"**The limits:** {money(lim['budget'])}, {lim['weeks']} weeks. {b22['evidenceNote']}", "", "**Step 1 · Choose exactly four of the nine measures.**", "", "| No. | Measure | What it does · what a learner notices | Cost | Weeks | Acts on | Choose (four) |", "|---|---|---|---|---|---|---|"]
    for m in b22["measures"]:
        L.append(f"| {m['no']} | {cell(m['name'])} | {cell(m['what'])} · {cell(m['notice'])} | {money(m['cost'])} | {m['weeks']} | {cell(b22['areas'].get(m['area'], m['area']).replace('Acts on: ', ''))} | ☐ |")
    crit = f"{b22['impact']['label']}: {b22['impact']['help'][0].lower() + b22['impact']['help'][1:]}"
    L += ["", f"**Step 2 · Rate each of your four measures.** Write the measure's number (M1 to M9) in the first column. Tick one level in each rating column. {crit} Effort: by the printed cost, with the rule in Materi A5 ({b22['effortRuleText']}). Risk: {b22['riskHelp'][0].lower() + b22['riskHelp'][1:]}", "", f"| Measure (M1 to M9) | {b22['impact']['label']} | Effort | Risk |", "|---|---|---|---|"]
    L += ["| __ | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High | ☐ Low ☐ Mid ☐ High |"] * 4
    L.append("")
    for k, lab in enumerate(["Measure 1 (name its number): which fact it answers, and what could go wrong.", "Measure 2:", "Measure 3:", "Measure 4:"]):
        L += [f"[[ANSWER lines=3 label=Why these ratings? {lab}]]", ""]
    L += ["**Step 3 · Check your plan against the limits.** Add up the costs of your four measures and find the longest one. Going over the budget or the time is allowed; if you do, say why in the reasons above. It is printed in your file as a fact.", "", "| Total cost of your four measures | Budget | Longest measure (weeks) | Time limit |", "|---|---|---|---|", f"| € __ | {money(lim['budget'])} | __ weeks | {lim['weeks']} weeks |", "", "**Step 4 · Put your four measures in priority order.** The first is the most important.", "", "| Priority | Measure (M1 to M9) |", "|---|---|", "| 1 | __ |", "| 2 | __ |", "| 3 | __ |", "| 4 | __ |", ""]
    for f in b22["after"]:
        L += [b22.get("afterNote", ""), ""] if f is b22["after"][0] else []
        L += field_md(day, spec, f, "2.2", "")
    L += [f"[[ANSWER lines=3 label=Justify your decision: why does your first priority go first? {cell(strip_min(b22['orderWhyHelp']))}]]", "", "[[ANSWER lines=3 label=What information are you missing? Name something specific you do not know that would change your decision, and how you could find it out.]]", ""]
    L += [":::note What you hand in (Task 1)", f"The completed **UX Analysis File**: your sort of the eight facts and your answers in Block 1.1, your four measures with their ratings and reasons, your order and justification, and your missing information. On the website the same file is exported as `1-{{your-name}}-day{day}-l1l2-ux-analysis`.", ":::", "", "---pagebreak---", ""]

    # ---- task 2
    L += [f"# Task 2 · Route 2 · UX Strategy Memo (Level 3) · Transfer project (3 UE)", "", ":::note Transfer project: 3 teaching units (UE8–10)", "This task is the day's Level 3 transfer project. It takes 3 UE (about 135 minutes): UE8 for Materi B and the brief, UE9 for Block 3.1, UE10 for Block 3.2, the presentation of your decision and the debrief with the trainer. The two blocks need about 20 minutes of writing; the rest of the time is the discussion of your decisions.", ":::", "", f"## {b2['heading']}", "", b2["paragraph"], "", "| The limits | How the task runs |", "|---|---|", "| " + "<br>".join(cell(x) for x in b2["limits"]["items"]) + " | " + cell(b2["runTitle"].split(" · ")[0]) + ":<br>" + "<br>".join(f"{i}. {cell(x)}" for i, x in enumerate(b2["run"], 1)) + " |", "", ":::note Case assumption", b2["assumption"], ":::", "", "*Route 1 is not needed for this task. If you have done it, you may use your own answers in your memo.*", ""]
    for key, bid in (("b31", "3.1"), ("b32", "3.2")):
        b = spec[key]
        L += [f"## {b['title']} · JUDGED · Core · about {BLOCK_MIN[bid]} min", "", f"**Draws on:** {draws_on(day, b['refs'])}.", ""]
        for f in b["fields"]:
            if f.get("kind") == "decisions":
                L += decisions_md(day, spec)
            else:
                L += field_md(day, spec, f, bid, "")
    L += [":::note What you hand in (Task 2)", f"The completed **UX Strategy Memo**: your answers in Blocks 3.1 and 3.2, your three measures with their order, your biggest risk and what you do about it, your decision under uncertainty, and what you give up. On the website the same file is exported as `2-{{your-name}}-day{day}-l3-ux-strategy`.", ":::", ""]
    text = "\n".join(L)
    gl = glossary_ids(day, text)
    text = text.replace("@@GLOSSARY@@", "glossary: " + ",".join(gl))
    return text + "\n"


# ------------------------------------------------------------------------------------------------ Trainer data (the format of make_trainer.render_item)
def key_item(title, expected, options, note=""):
    return ("key", dict(title=title, expected=expected, options=options, teachingNote=note))


def guide_item(title, answer, why="", look=None, pitfalls=None):
    return ("guide", dict(title=title, answer=answer, why=why, lookFor=look or [], pitfalls=pitfalls or []))


def field_items(spec, bid, f):
    out = []
    kind = f.get("kind")
    if kind in ("single", "multi"):
        model = [f["model"]] if kind == "single" else f["model"]
        opts = [dict(label=o["label"], expected=o["id"] in model, why=o["why"]) for o in f["options"]]
        picked = "; ".join(o["label"] for o in f["options"] if o["id"] in model)
        out.append(key_item(f"Block {bid} · {f['keyTitle'].split(' · ', 1)[-1]}", picked, opts, f["teaching"]))
    elif kind == "assign":
        bins = {b["id"]: b["label"] for b in f["bins"]}
        exp = "  |  ".join(f"{b['label']}: items " + ", ".join(i["no"] for i in f["items"] if i["model"] == b["id"]) for b in f["bins"])
        opts = [dict(label=f"{i['no']} · {i['label']}", expected=True, why=f"{bins[i['model']]}. {i['why']}") for i in f["items"]]
        out.append(key_item(f"Block {bid} · {f['keyTitle'].split(' · ', 1)[-1]}", exp, opts, f["teaching"]))
    elif kind == "text":
        g = f.get("guide", {})
        out.append(guide_item(f"{bid} · {f['label']}", f["model"], g.get("why", ""), g.get("lookFor", [])))
    elif kind == "frame":
        g = f.get("guide", {})
        ans = " ".join(f"{p['label']} {p['model']}" for p in f["parts"])
        out.append(guide_item(f"{bid} · {f['label']}", ans, g.get("why", ""), g.get("lookFor", [])))
    return out


def trainer_data(day):
    spec = DUMP["specs"][str(day)]
    lim = spec["limits"]
    data = {}
    # 1.1
    cats = {c["id"]: c["label"].split(":")[0] for c in spec["cats"]}
    exp = "  |  ".join(f"{cats[cid]}: facts " + ", ".join(str(f["no"]) for f in spec["facts"] if f["area"] == cid) for cid in cats)
    opts = [dict(label=f"{f['no']} · {f['short']}", expected=True, why=f"{cats[f['area']]}. {f['why']}") for f in spec["facts"]]
    items = [key_item(f"Block 1.1 · {spec['sortKeyTitle']}", exp, opts, spec["sortTeaching"])]
    for f in spec["b11"]["fields"]:
        items += field_items(spec, "1.1", f)
    data["1.1"] = [x for x in items if x[0] == "key"] + [x for x in items if x[0] == "guide"]
    # 1.2
    o = spec["opts"]
    m = o["model"]
    order = m["order"]
    names = {x["id"]: x["name"] for x in o["options"]}
    opts = []
    for x in o["options"]:
        opts.append(dict(label=f"{x['id']} · {x['name']} ({money(x['cost'])}, {x['weeks']} weeks)", expected=True, why=f"{x['keyWhy']} Reference ratings: {o['criteria'][0]['label']} {lvl(m['impact'][x['id']])}, effort {band_of(spec, x['cost'])} (by the printed cost), risk {lvl(m['risk'][x['id']])}; position {order.index(x['id']) + 1}."))
    items = [key_item(o["keyTitle"], "Reference order: " + ", then ".join(f"{i} ({names[i]})" for i in order), opts, o["keyTeaching"]), guide_item(f"1.2 · {o['whyLabel']}", m["why"], o["guide"].get("why", ""), o["guide"].get("lookFor", []))]
    data["1.2"] = items
    # 1.3
    r = spec["reflect"]
    data["1.3"] = [guide_item(f"1.3 · Coaching reflection (never scored): {q['q']}", r["model"][q["k"]], r["guideWhy"]) for q in r["questions"]]
    # 2.1
    cz = spec["causes"]
    opts = [dict(label=x["text"], expected=x["expected"], why=x["why"]) for x in cz["items"]]
    data["2.1"] = [key_item(cz["keyTitle"], "; ".join(x["text"] for x in cz["items"] if x["expected"]), opts, cz["teaching"]), guide_item(f"2.1 · {cz['whyLabel']}", cz["whyModel"], cz["guide"].get("why", ""), cz["guide"].get("lookFor", []))]
    # 2.2
    b22 = spec["b22"]
    m = b22["model"]
    opts = []
    for x in b22["measures"]:
        if x["id"] in m["chosen"]:
            why = f"{x['keyWhy']} Reference ratings: effort {band_of(spec, x['cost'])} (by the printed cost), {b22['impact']['label']} {lvl(m['impact'][x['id']])}, risk {lvl(m['risk'][x['id']])}."
        else:
            why = f"{x['keyWhy']} Effort by the printed cost: {band_of(spec, x['cost'])}."
        opts.append(dict(label=f"{x['no']} · {x['name']} ({money(x['cost'])}, {x['weeks']} weeks)", expected=x["id"] in m["chosen"], why=why))
    nos = {x["id"]: x["no"] for x in b22["measures"]}
    tot = sum(x["cost"] for x in b22["measures"] if x["id"] in m["chosen"])
    wk = max(x["weeks"] for x in b22["measures"] if x["id"] in m["chosen"])
    exp = " · ".join(f"{nos[i]} {next(x['name'] for x in b22['measures'] if x['id'] == i)}" for i in m["order"]) + f". Total {money(tot)} of {money(lim['budget'])}; the longest takes {wk} weeks of {lim['weeks']}."
    items = [key_item(b22["keyTitle"], exp, opts, b22["keyTeaching"])]
    for i, mid in enumerate(m["chosen"]):
        items.append(guide_item(f"2.2 · Why these ratings? {nos[mid]}", m["reasons"][mid], b22["guides"]["reason"].get("why", ""), b22["guides"]["reason"].get("lookFor", [])))
    items.append(guide_item("2.2 · Why the first priority goes first", m["orderWhy"], b22["guides"]["order"].get("why", ""), b22["guides"]["order"].get("lookFor", [])))
    items.append(guide_item("2.2 · What information you are missing", m["missingInfo"], b22["guides"]["missing"].get("why", ""), b22["guides"]["missing"].get("lookFor", [])))
    for f in b22["after"]:
        items += field_items(spec, "2.2", f)
    data["2.2"] = [x for x in items if x[0] == "key"] + [x for x in items if x[0] == "guide"]
    # 3.1 / 3.2
    for key, bid in (("b31", "3.1"), ("b32", "3.2")):
        items = []
        for f in spec[key]["fields"]:
            if f.get("kind") == "decisions":
                d = spec["decisions"]
                dm = d["model"]
                nm = {x["id"]: x for x in d["items"]}
                opts = [dict(label=f"{x['no']} · {x['name']} ({money(x['cost'])}, {x['weeks']} weeks)", expected=x["id"] in dm["picks"], why=x["keyWhy"] + f" Position {dm['order'].index(x['id']) + 1}." if x["id"] in dm["order"] else x["keyWhy"]) for x in d["items"]]
                tot = sum(nm[i]["cost"] for i in dm["picks"])
                exp = " · ".join(f"{nm[i]['no']} {nm[i]['name']}" for i in dm["order"]) + f". Total {money(tot)} of {money(lim['r2Budget'])}; the longest takes {max(nm[i]['weeks'] for i in dm['picks'])} weeks."
                items.append(key_item(d["keyTitle"], exp, opts, d["keyTeaching"]))
                items.append(guide_item(f"{bid} · {d['whyLabel']}", dm["orderWhy"], d["guide"].get("why", ""), d["guide"].get("lookFor", [])))
            else:
                items += field_items(spec, bid, f)
        data[bid] = [x for x in items if x[0] == "key"] + [x for x in items if x[0] == "guide"]
    return data


if __name__ == "__main__":
    days = [int(x) for x in sys.argv[1:]] or list(range(9, 17))
    for d in days:
        for kind, fn in (("materi", materi_md), ("task", task_md)):
            p = os.path.join(ROOT, "_source", f"day{d}-{kind}.md")
            open(p, "w", encoding="utf-8").write(fn(d))
            print("wrote", p)
