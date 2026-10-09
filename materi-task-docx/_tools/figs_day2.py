"""Day 2 figures: successful platforms, prototyping, testing, adaptive learning; the LearnPro task screens."""
from figlib import *


def fig_a1():
    return compare("d2_a1_successful-vs-failing.png", "Platform that learners finish", "Platform that learners leave", [
        ("A clear path: the learner always sees the next step", "No navigation: the only way on is to scroll"),
        ("Short units with one goal each", "One long page of content"),
        ("Progress is shown and a result follows every quiz", "No sign of progress, no message at the end"),
        ("Typical result: learners carry on and come back", "Typical result: learners stop early and do not return"),
    ], arrow=False, lkind="s", rkind="r", title="Same content, two designs · a typical contrast, not a measurement")


def fig_a2_cycle():
    return cycle("d2_a2_build-measure-learn.png", [("Build", "the smallest version that can be tested"), ("Measure", "watch what learners do and say"), ("Learn", "decide: keep, change or drop")], center="Repeat in days, not months", title="Build–Measure–Learn (Ries): the loop of iterative design", kinds=["a", "s", "m"])


def fig_a2_ladder():
    return chain("d2_a2_fidelity-ladder.png", [
        ("Sketch on paper", "Minutes. Tests the idea and the order of steps.", "g"),
        ("Low-fidelity wireframe", "Hours. Plain boxes, no colours. Tests structure and flow.", "a"),
        ("Clickable prototype", "Days. Boxes you can click through. Tests tasks end to end.", "a"),
        ("High-fidelity prototype", "Weeks. Looks like the real thing. Tests look and detail.", "m"),
    ], title="Fidelity ladder: how finished a prototype looks · cost and time rise to the right", note="Rule of thumb: climb only as far as the question you want answered needs. A question about structure does not need colours.")


def fig_a3_five():
    return bars("d2_a3_five-users.png", [("1 test user", 31, "about 31%"), ("3 test users", 65, "about 65%"), ("5 test users", 85, "about 85%"), ("15 test users", 100, "close to 100%")], title="Share of usability problems found, in Nielsen and Landauer's model", maxv=118, note="A model result: it assumes each user finds about 31% of the problems and that users find them independently. Use it to plan several small tests, not as a guarantee.", kinds=["m", "m", "a", "m"])


def fig_a3_qual_quant():
    return compare("d2_a3_qual-vs-quant.png", "Qualitative: why", "Quantitative: how many", [
        ("Question: why do learners get stuck?", "Question: how many get stuck, and where?"),
        ("Few learners (about 5 per group), watched or interviewed", "Many learners, counted from logs or a larger test"),
        ("Examples: observation, think-aloud, interviews", "Examples: drop-out per lesson, time on task, quiz score"),
        ("Strength: finds causes and surprises", "Strength: sizes a problem and tracks change"),
        ("Weakness: cannot say how common a problem is", "Weakness: shows the symptom, not the cause"),
    ], arrow=False, lkind="a", rkind="s", title="Two kinds of test data answer two different questions")


def fig_a4_loop():
    return cycle("d2_a4_adaptive-loop.png", [("Learner acts", "answers, skips, stays, leaves"), ("System records", "what happened, with consent"), ("Model chooses", "the next step for this learner"), ("Learner sees it", "and why it was suggested")], center="Adaptive learning loop", title="How an adaptive system works, and where transparency comes in", kinds=["a", "m", "m", "s"])


def fig_a5():
    return budget_bands("d2_a5_options-cost.png", [("A · High-fidelity prototype now", 36000), ("B · Low-fidelity test first", 8000), ("C · Build directly, no test", 54000)], 60000, [(10000, "Low"), (25000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €60,000, three months")


def fig_b1():
    return chain("d2_b1_staged-investment.png", [
        ("Stage 1 · Test the idea", "Paper or clickable prototype with 5 learners. Small money.", "a"),
        ("Gate 1", "Do learners complete the task? Keep, change or stop.", "m"),
        ("Stage 2 · Pilot", "One course, rule-based step. About 30 learners.", "a"),
        ("Gate 2", "Does completion rise against a control group? Keep, change or stop.", "m"),
        ("Stage 3 · Scale", "More courses and, only if the data supports it, algorithms.", "s"),
    ], title="Stage the investment: money follows evidence", note="Each gate has a figure and a date written down before the stage starts. A stage that misses its gate is changed or stopped, not extended by default.", hs=14, bs=12.5)


def fig_b2():
    pts = [("A Progress overview", 0.38, 0.10), ("B Next-step path", 0.70, 0.22), ("C Skip-what-you-know test", 0.78, 0.40), ("D Recommendation list", 0.40, 0.62), ("E Adaptive difficulty", 0.72, 0.70), ("F Full AI tutor", 0.60, 0.84)]
    return matrix("d2_b2_value-vs-data.png", "Value to the learner", "Data and complexity needed", ("Avoid for now", "Plan and prepare", "Easy extras", "Start here"), pts, title="LearnLoop · Case assumption · where six features sit (a reading of the example, not a score)")


def fig_b3():
    return frame4("d2_b3_decision-frame.png", "Run a rule-based pilot in one course first.", "Whether learners want recommended steps, and whether our data is good enough.", "Pilot completion is not at least 5 points above the control group after 8 weeks.", "The AI recommendation engine this year.", "The product lead with the head of data.", "A pilot with a control group, learner interviews, drop-out data per lesson.")


def fig_t1():
    def plat_a(c, x, y, w, h):
        c.rect(x + 8, y + 8, w - 16, 18, MIST, LINE, 1, 3)
        c.text(x + 14, y + 21, "Course · Step 2 of 6", 11, fill=INK)
        ui_bar(c, x + 8, y + 32, w - 38, 2 / 6)
        c.marker(x + w - 14, y + 36, 2)
        for i in range(4):
            c.rect(x + 8, y + 50 + i * 26, w - 38, 20, ACCSOFT if i == 1 else PAPER, ACC if i == 1 else GREY, 1, 3)
            c.text(x + 14, y + 64 + i * 26, f"Unit {i + 1} · 6 min", 10.5, fill=INK)
        c.marker(x + w - 14, y + 62, 1)
        c.marker(x + w - 14, y + 88, 3)
        c.text(x + 8, y + h - 30, "Quiz: 4 of 5 correct.", 11, "bold")
        c.text(x + 8, y + h - 16, "Review question 2.", 10.5, fill=ASH)
        c.marker(x + w - 14, y + h - 26, 4)

    def plat_b(c, x, y, w, h):
        ui_lines(c, x + 10, y + 12, w - 44, 20, h=3.8, gap=4.4)
        c.marker(x + w - 14, y + 20, 5)
        c.rect(x + 6, y + 6, 0.1, 0.1, GREY)
        c.marker(x + w - 14, y + 56, 6)
        c.marker(x + w - 14, y + 96, 7)
        c.text(x + 10, y + h - 12, "[ Back to course list ]", 10.5, fill=ASH)
        c.marker(x + w - 14, y + h - 16, 8)

    return screens("d2_t1_platform-a-b.png", [("Platform A (a benchmark)", plat_a), ("Platform B (LearnPro today)", plat_b)], title="Two platforms, drawn in outline · Case assumption: the details are made up for this exercise", sh=250)


ALL = [fig_a1, fig_a2_cycle, fig_a2_ladder, fig_a3_five, fig_a3_qual_quant, fig_a4_loop, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
