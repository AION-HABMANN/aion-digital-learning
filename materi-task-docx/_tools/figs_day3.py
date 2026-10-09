"""Day 3 figures: learning psychology and cognitive load; the EduCore task screens."""
from figlib import *


def fig_a1_memory():
    return chain("d3_a1_memory-flow.png", [
        ("Intake", "Attention picks a few things from the screen. The rest is ignored.", "a"),
        ("Processing", "Working memory holds and works on about four chunks at a time.", "a"),
        ("Storage", "Long-term memory keeps what was understood and revisited.", "s"),
    ], title="How people learn: intake, processing, storage", note="Design can help at each step: guide attention (intake), do not overfill working memory (processing), and bring learners back to the content later (storage).")


def fig_a1_levels():
    return chain("d3_a1_levels.png", [
        ("Taking in", "The learner can repeat what was shown.", "m"),
        ("Understanding", "The learner can explain it in their own words and give an example.", "a"),
        ("Applying", "The learner can use it in a new situation at work.", "s"),
    ], title="Three levels of learning, each needs more from the interface than the one before", note="A screen that only presents content supports the first level. Examples and connections support the second. Tasks and feedback support the third.")


def fig_a2_load():
    c = Canvas(W, 330)
    cap = W - 20
    def bar(y, title, parts):
        c.text(10, y, title, 14.5, "bold")
        x = 10
        for lab, sh, col, txt in parts:
            w = cap * sh
            c.rect(x, y + 10, w, 46, col, PAPER, 2, 0)
            c.text(x + w / 2, y + 38, lab, 13, "bold", "middle", PAPER)
            x += w
        c.rect(10, y + 10, cap, 46, "none", INK, 2, 0)
    bar(24, "A screen that overloads the learner (illustrative)", [("Intrinsic: the subject", 0.38, GREY, ""), ("Extraneous: clutter, wall of text", 0.52, RUST, ""), ("Germane", 0.10, SIG, "")])
    bar(130, "The same lesson after redesign (illustrative)", [("Intrinsic: the subject", 0.38, GREY, ""), ("Extraneous", 0.12, RUST, ""), ("Germane: making sense of it", 0.50, SIG, "")])
    c.text(10, 232, "The full bar is the learner's working memory at one moment. The subject (intrinsic load) is fixed; design decides how much", 13, fill=ASH)
    c.text(10, 250, "is left for making sense of it (germane load) after the unnecessary effort (extraneous load) is removed.", 13, fill=ASH)
    c.box(10, 270, (W - 40) / 3, 48, "Intrinsic", "how complex the content is", MIST, GREY, None, 14, 12.5)
    c.box(20 + (W - 40) / 3, 270, (W - 40) / 3, 48, "Extraneous", "effort caused by poor design", RUSTSOFT, RUST, None, 14, 12.5)
    c.box(30 + 2 * (W - 40) / 3, 270, (W - 40) / 3, 48, "Germane", "effort that builds understanding", SIGSOFT, SIG, None, 14, 12.5)
    return c.save("d3_a2_three-loads.png")


def fig_a3_chunk():
    c = Canvas(W, 306)
    hw = (W - 20 - 30) / 2
    c.text(10, 22, "Before: twelve loose items", 14.5, "bold")
    import random
    random.seed(4)
    items = ["login", "profile", "deadline", "badge", "forum", "quiz 1", "news", "certificate", "quiz 2", "reading", "chat", "report"]
    for i, t in enumerate(items):
        x = 14 + (i % 4) * 88 + random.randint(-4, 4)
        y = 40 + (i // 4) * 62 + random.randint(-4, 8)
        c.box(x, y, 80, 40, None, t, MIST, GREY, None, 13, 13)
    c.text(10 + hw + 30, 22, "After: the same items in three chunks", 14.5, "bold")
    groups = [("Learn", ["reading", "quiz 1", "quiz 2"]), ("Progress", ["badge", "certificate", "report"]), ("Talk", ["forum", "chat", "news"])]
    for gi, (g, its) in enumerate(groups):
        gx = 10 + hw + 30
        gy = 34 + gi * 82
        c.rect(gx, gy, hw, 74, ACCSOFT, ACC, 1.5, 8)
        c.text(gx + 10, gy + 20, g, 14, "bold")
        for k, t in enumerate(its):
            c.box(gx + 10 + k * 122, gy + 28, 112, 36, None, t, PAPER, GREY, None, 13, 13)
    c.text(10, 296, "Working memory holds about four chunks. Grouping turns twelve things to hold into three.", 13.5, fill=ASH)
    return c.save("d3_a3_chunking.png")


def fig_a4_mistakes():
    return rows_chain("d3_a4_mistakes.png", [
        ["Information overload", "Too many things compete for attention at once", "Show one main thing per screen; hide the rest"],
        ["Unclear structure", "The learner must build the structure from scratch", "Headings, short paragraphs, a marked key sentence"],
        ["Missing feedback", "The learner cannot tell whether effort worked", "A result and a next step after each task"],
        ["Overly complex navigation", "Effort goes into finding, not learning", "Few clear paths; always show where you are"],
    ], heads=["Typical UX mistake", "What it does in the learner's head", "A way to reduce it"], kinds=("r", "m", "s"))


def fig_a5():
    return budget_bands("d3_a5_options-cost.png", [("A · Shorten the content a lot", 6000), ("B · Add diagrams and graphics", 16000), ("C · Split into small modules", 12000)], 30000, [(8000, "Low"), (15000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €30,000, four weeks")


def fig_b1():
    return chain("d3_b1_effectiveness-chain.png", [
        ("Learning effectiveness", "Did the learner learn what the course promised?", "a"),
        ("Cognitive efficiency", "How much effort was needed to get there?", "m"),
        ("Completion and trust", "Learners finish and employers see results.", "s"),
    ], title="Two lenses on a UX decision, and where they lead", note="Effectiveness asks whether learning happened. Efficiency asks at what mental cost. A decision that raises one and lowers the other needs a stated reason.")


def fig_b2():
    pts = [("A Cut content by half", 0.80, 0.18), ("B Chunk into modules", 0.64, 0.74), ("C Add diagrams", 0.58, 0.60), ("D Summary button only", 0.82, 0.30), ("E Keep as it is", 0.12, 0.88)]
    return matrix("d3_b2_load-vs-depth.png", "Mental load removed", "Depth of content kept", ("Deep but heavy", "Aim here", "Neither", "Light but shallow"), pts, title="LearnLoop · Case assumption · five options for a hard course (a reading of the example, not a score)")


def fig_b3():
    return frame4("d3_b3_decision-frame.png", "Rebuild one course in small modules and test it with five beginners.", "Whether learners are overloaded by the amount or by the wording; we have no user data yet.", "Fewer than 4 of 5 beginners can explain the key point after a lesson, or completion is not up 5 points after 8 weeks.", "The full diagram redesign this year.", "The head of learning with the content lead.", "A usability test with beginners, a short comprehension check, drop-out per lesson.")


def fig_t1():
    def lesson(c, x, y, w, h):
        ui_lines(c, x + 10, y + 14, w - 44, 18, h=3.6, gap=4.0)
        c.marker(x + w - 14, y + 20, 1)
        c.marker(x + w - 14, y + 52, 4)
        c.marker(x + w - 14, y + 86, 5)
        c.marker(x + w - 14, y + 120, 6)

    def overview(c, x, y, w, h):
        for i in range(14):
            c.rect(x + 10, y + 12 + i * 11.5, w - 44, 7, MIST, LINE, 1, 2)
        c.marker(x + w - 14, y + 40, 7)
        c.marker(x + w - 14, y + h - 22, 8)

    def clutter(c, x, y, w, h):
        c.rect(x + 8, y + 8, w * 0.28, h - 20, CANVAS, GREY, 1, 3)
        for i in range(9):
            c.rect(x + 12, y + 14 + i * 14, w * 0.2, 6, GREY, None, 0, 2)
        c.rect(x + w * 0.34, y + 8, w * 0.6 - 4, 18, ACCSOFT, ACC, 1, 3)
        ui_lines(c, x + w * 0.34, y + 36, w * 0.38, 7, h=3.6, gap=4.0)
        c.rect(x + w * 0.74, y + 34, w * 0.2, 46, MIST, GREY, 1, 3)
        c.rect(x + w * 0.34, y + 100, w * 0.6 - 4, 24, MIST, GREY, 1, 3)
        c.marker(x + w - 14, y + 18, 2)

    def quiz(c, x, y, w, h):
        for i in range(12):
            c.rect(x + 10, y + 10 + i * 12, 8, 8, PAPER, GREY, 1, 2)
            c.rect(x + 24, y + 12 + i * 12, w - 66, 4, LINE, None, 0, 2)
        ui_button(c, x + 10, y + h - 26, 60, 18, "Submit", False, 10)
        c.marker(x + w - 14, y + 70, 3)

    return screens("d3_t1_educore-screens.png", [("Lesson 7", lesson), ("Module overview", overview), ("Lesson page with extras", clutter), ("Quiz", quiz)], title="EduCore screens, drawn in outline · Case assumption: the details are made up for this exercise", sh=200)


ALL = [fig_a1_memory, fig_a1_levels, fig_a2_load, fig_a3_chunk, fig_a4_mistakes, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
