"""Day 1 figures: Materi A1-A5, B1-B3 and the LearnFast screens of Task 1."""
from figlib import *


def fig_uxui():
    c = Canvas(W, 330)
    c.text(10, 22, "UI · what you see and touch", 15, "bold")
    device(c, 10, 30, W - 20, 130, "Course · UX basics")
    for i in range(3):
        c.box(30 + i * 200, 62, 180, 50, f"Lesson {i + 1}", None, ACCSOFT, ACC, None, 14)
    ui_button(c, W - 150, 74, 110, 28, "Start", True, 13)
    c.text(30, 146, "Colours, buttons, text, layout", 12.5, fill=ASH)
    c.path("M4 176 H2 V316 H4", ASH, 2)
    c.text(14, 192, "UX · what the learner goes through (the surface is part of it)", 15, "bold")
    steps = [("Find it", "Where is my course?"), ("Understand it", "Can I follow this?"), ("Finish it", "Am I getting there?")]
    bw = (W - 20 - 2 * 30) / 3
    for i, (a, b) in enumerate(steps):
        x = 10 + i * (bw + 30)
        c.box(x, 204, bw, 100, a, b, SIGSOFT, SIG, None, 17, 14)
        if i < 2:
            c.arrow(x + bw + 3, 254, x + bw + 27, 254, SIG)
    return c.save("d1_a1_ux-ui-layers.png")


def fig_system_learner():
    c = Canvas(W, 320)
    hw = (W - 20 - 20) / 2
    for k, (x, cap) in enumerate(((10, "System's view: organised by what the software can do"), (10 + hw + 20, "Learner's view: organised by what a learner wants to do"))):
        device(c, x, 10, hw, 230, "LearnLoop")
        if k == 0:
            menu = ["Courses", "Library", "Catalogue", "Forum", "Certificates", "Reports", "Admin", "Settings"]
            c.rect(x + 10, 36, 110, 192, CANVAS, LINE, 1, 4)
            for i, m in enumerate(menu):
                c.text(x + 20, 56 + i * 22, m, 13.5)
            c.tb(x + 130, 44, hw - 140, "You came to carry on with a lesson. Which entry is it?", 13.5, fill=ASH, italic=True)
        else:
            cards = [("Carry on where I stopped", "Lesson 3 of 8 · UX basics", True), ("Find a course for my job", "Tell us your role", False), ("Show my employer I finished", "Your certificates", False)]
            for i, (a, b, hi) in enumerate(cards):
                c.box(x + 10, 36 + i * 64, hw - 20, 56, a, b, ACCSOFT if hi else CANVAS, ACC if hi else LINE, None, 14, 12.5, align="start", sw=2.5 if hi else 1.5)
        c.tb(x, 250, hw, cap, 14, "bold", INK, "middle")
    return c.save("d1_a2_system-vs-learner.png")


def fig_lesson():
    c = Canvas(W, 360)
    hw = (W - 20 - 20) / 2
    x = 10
    device(c, x, 10, hw, 290, "Lesson 3")
    c.rect(x + 8, 34, hw - 16, 22, MIST, LINE, 1, 3)
    c.text(x + 16, 50, "Lesson", 12.5, fill=ASH)
    ui_lines(c, x + 16, 66, hw - 32, 14, h=4.5, gap=5.0)
    c.text(x + 16, 222, "…about 500 words in one block; “wireframe” and", 11.5, fill=ASH)
    c.text(x + 16, 238, "“heuristic” are not explained", 11.5, fill=ASH)
    c.rect(x + 8, 262, hw - 16, 30, MIST, LINE, 1, 3)
    c.text(x + 16, 282, "(nothing here: no progress, no result)", 12.5, fill=ASH)
    c.text(x + hw / 2, 322, "Before: none of the three principles", 14.5, "bold", "middle")
    x = 10 + hw + 20
    device(c, x, 10, hw, 290, "Lesson 3")
    c.rect(x + 8, 34, hw - 16, 24, MIST, LINE, 1, 3)
    c.text(x + 16, 51, "UX basics › Module 2 › Lesson 3 of 8", 12, fill=INK)
    ui_button(c, x + hw - 118, 38, 102, 16, "Next lesson →", True, 11)
    c.text(x + 16, 90, "Why a sketch comes before a design", 14, "bold")
    c.text(x + 16, 112, "A sketch tests an idea in minutes.", 12.5)
    c.tb(x + 16, 120, hw - 32, "A wireframe (a plain layout drawing with no colours) shows structure first.", 12.5)
    c.rect(x + 8, 262, hw - 16, 30, MIST, LINE, 1, 3)
    c.text(x + 16, 281, "3 of 8 lessons done", 12, fill=INK)
    ui_bar(c, x + 128, 272, 60, 3 / 8)
    c.text(x + 196, 281, "Quiz: 4 of 5 correct.", 11.5, fill=INK)
    c.marker(x + hw - 134, 46, 1)
    c.marker(x + hw - 14, 100, 2)
    c.marker(x + hw - 14, 244, 3)
    c.text(x + hw / 2, 322, "After: orientation (1), light load (2), feedback (3)", 14.5, "bold", "middle")
    return c.save("d1_a3_lesson-screen.png")


def fig_weigh():
    return budget_bands("d1_a5_budget-effort.png", [("Guided first week", 7000), ("Leaderboard", 12000), ("Rewrite the whole catalogue", 27000)], 30000, [(10000, "Low"), (15000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €30,000, six weeks")


def fig_exp_number():
    return rows_chain("d1_b1_experience-to-number.png", [
        ["A clear path", "Learners carry on", "Completion rate"],
        ["Lessons you can follow", "They do more while there", "Engagement"],
        ["Visible progress", "They come back", "Retention"],
    ], heads=["What the learner experiences", "What they then do", "The number that shows it"])


def fig_tension():
    pts = [("A Add more courses", 0.18, 0.30), ("B Simplify the navigation", 0.78, 0.55), ("C Buy more marketing", 0.10, 0.70)]
    return matrix("d1_b2_user-vs-business.png", "Value to the user", "Value to the business", ("Business gains, user loses", "Both gain", "Neither gains", "User gains, business gains later"), pts, title="LearnLoop · Case assumption · where the three options sit (a reading of the example, not a score)")


def fig_decision_frame():
    c = Canvas(W, 340)
    boxes = [("I decide", "Launch a guided first week now.", ACCSOFT, ACC), ("I do not know", "Whether leavers lack direction or time.", ACCSOFT, ACC), ("I reverse if", "Week-one drop-out is not below 25% after six weeks (now 30%).", ACCSOFT, ACC), ("I give up", "The leaderboard this year.", RUSTSOFT, RUST)]
    bw = (W - 20 - 3 * 12) / 4
    for i, (a, b, f, s) in enumerate(boxes):
        c.box(10 + i * (bw + 12), 12, bw, 168, a, b, f, s, None, 16, 14)
    c.text(10, 212, "The rule for future UX decisions", 14, "bold", fill=ASH)
    rule = [("Who decides", "The UX lead with the product owner."), ("On what evidence", "Interviews, a usability test, drop-out data.")]
    bw2 = (W - 20 - 12) / 2
    for i, (a, b) in enumerate(rule):
        c.box(10 + i * (bw2 + 12), 224, bw2, 100, a, b, SIGSOFT, SIG, None, 16, 14)
    return c.save("d1_b3_decision-frame.png")


def fig_learnfast():
    def dash(c, x, y, w, h):
        ui_tiles(c, x + 8, y + 10, w - 38, 2, 7, h=36, gap=3)
        c.marker(x + w - 14, y + 30, 1)
        c.rect(x + 8, y + h - 36, w - 38, 20, MIST, LINE, 1, 3)
        c.text(x + 14, y + h - 22, "All courses ›", 11, fill=ASH)
        c.marker(x + w - 14, y + h - 26, 2)

    def course(c, x, y, w, h):
        c.rect(x + 10, y + 10, w * 0.5, 8, GREY, None, 0, 2)
        for i in range(8):
            c.rect(x + 10, y + 30 + i * 11, w * (0.62 - (i % 3) * 0.08), 5, LINE, None, 0, 2)
        c.marker(x + w - 14, y + 14, 7)
        c.marker(x + w - 14, y + h - 30, 3)

    def lesson(c, x, y, w, h):
        ui_lines(c, x + 10, y + 12, w - 44, 17, h=3.8, gap=4.2)
        c.marker(x + w - 14, y + 20, 4)
        c.marker(x + w - 14, y + 52, 5)
        c.marker(x + w - 14, y + 86, 6)

    def quiz(c, x, y, w, h):
        for i in range(5):
            c.rect(x + 10, y + 12 + i * 22, 11, 11, PAPER, GREY, 1, 2)
            c.rect(x + 28, y + 15 + i * 22, w - 70, 4.5, LINE, None, 0, 2)
        ui_button(c, x + 10, y + h - 34, 64, 20, "Submit", False, 11)
        c.marker(x + w - 14, y + h - 26, 8)

    return screens("d1_t1_learnfast-screens.png", [("Dashboard", dash), ("Course page", course), ("Lesson 3", lesson), ("Quiz", quiz)], title="LearnFast screens, drawn in outline · Case assumption: the details are made up for this exercise", sh=200)


ALL = [fig_uxui, fig_system_learner, fig_lesson, fig_weigh, fig_exp_number, fig_tension, fig_decision_frame, fig_learnfast]

if __name__ == "__main__":
    for f in ALL:
        print(f())
