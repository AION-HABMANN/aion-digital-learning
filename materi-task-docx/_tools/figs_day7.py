"""Day 7 figures: accessibility and inclusive design; the InclusiveLearn task screens."""
from figlib import *


def fig_a1_spectrum():
    return rows_chain("d7_a1_persona-spectrum.png", [
        ["Seeing", "Blind", "Eye infection", "Bright sunlight on the screen"],
        ["Hearing", "Deaf", "Ear infection", "A noisy train, no headphones"],
        ["Moving a hand", "One arm", "A broken arm", "Holding a child in one arm"],
        ["Understanding text", "Dyslexia", "A concussion", "Tired, reading in a second language"],
    ], heads=["Ability", "Permanent", "Temporary", "Situational"], kinds=("a", "m", "m", "m"))


def fig_a2_pour():
    return chain("d7_a2_pour.png", [
        ("Perceivable", "Can the learner see or hear it? Text alternatives, captions, contrast of at least 4.5 : 1.", "a"),
        ("Operable", "Can the learner use it? Full keyboard use, visible focus, targets of at least 24 px.", "a"),
        ("Understandable", "Can the learner follow it? Plain language, clear labels, errors that explain.", "a"),
        ("Robust", "Does it work with assistive technology? Correct names, roles and states in the code.", "s"),
    ], title="WCAG 2.2: four principles, often called POUR", note="Every success criterion belongs to one of the four principles and carries a level: A (essential), AA (the usual legal target), AAA (the highest).", hs=14.5, bs=12.5)


def fig_a2_barriers():
    return rows_chain("d7_a2_barrier-types.png", [
        ["Visual", "Small text, low contrast, information only by colour", "Contrast, resizable text, a text label next to every colour"],
        ["Cognitive", "Complex language, long forms, many steps, no clear structure", "Plain language, one task per screen, clear structure"],
        ["Motor", "Tiny targets, drag-only actions, no keyboard use, timeouts", "Large targets, keyboard access, no drag-only, enough time"],
    ], heads=["Barrier type", "A typical barrier", "A typical remedy"], kinds=("r", "m", "s"))


def fig_a3():
    return compare("d7_a3_plain-language.png", "Hard to read", "Easier to read", [
        ("\"Upon successful completion of the module, participants are obliged to submit their documented results.\"", "\"When you finish the module, upload your answers.\""),
        ("One block of text, no headings", "Short paragraphs with headings and one idea each"),
        ("Only one way to learn the content: a long video", "Text, video with captions and a transcript: the learner chooses"),
        ("Error: \"Error 4011\"", "\"Your password needs at least 8 characters. Add 2 more.\""),
    ], arrow=True, lkind="r", rkind="s", title="Plain language, structure and flexibility in an inclusive learning platform")


def fig_a4():
    return cycle("d7_a4_continuous.png", [("Plan", "personas include access needs"), ("Design", "patterns checked for access"), ("Build", "access is part of \"done\""), ("Evaluate", "tests with users and KPIs")], center="Inclusion is a process, not a step", title="Integrating and evaluating UX continuously", kinds=["a", "a", "a", "s"])


def fig_a5():
    return budget_bands("d7_a5_options-cost.png", [("A · A new quiz-battle feature", 30000), ("B · Captions and keyboard use for ten courses", 14000), ("C · Instructions in plain language", 8000)], 45000, [(10000, "Low"), (25000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €45,000, limited time")


def fig_b1():
    return chain("d7_b1_strategic-chain.png", [
        ("Rules and expectations", "BFSG, EN 301 549, BITV 2.0 and customers' own requirements. In flux: check scope and dates.", "m"),
        ("Reach", "More learners can start, continue and finish. About one in six people has a significant disability (WHO 2022).", "a"),
        ("Long-term quality", "Plain language, clear structure and keyboard access also help everyone else, in noise, on a phone, when tired.", "s"),
    ], title="Why inclusion is a strategic quality, not an add-on", hs=14.5, bs=12.5)


def fig_b2():
    pts = [("A Captions", 0.58, 0.26), ("B Contrast and zoom", 0.84, 0.14), ("C Keyboard use", 0.66, 0.38), ("D Plain language", 0.90, 0.30), ("E Overlay widget", 0.22, 0.14), ("F Full external audit", 0.46, 0.76), ("G New feature for growth", 0.20, 0.86)]
    return matrix("d7_b2_reach-vs-cost.png", "Reach: people who really benefit", "Cost and effort", ("Costly, narrow", "Costly but broad: plan it", "Cheap, narrow: do when passing", "Cheap and broad: start here"), pts, title="LearnLoop · Case assumption · seven measures (a reading of the example, not a score)")


def fig_b3():
    return frame4("d7_b3_decision-frame.png", "Fix contrast, keyboard use and captions in the five most-used courses first, and test with five learners with impairments.", "How many of our learners need these features; we do not record this and should not guess.", "Fewer than 4 of 5 testers finish the main task, or the audit still finds blocking issues after 10 weeks.", "The new quiz-battle feature this half year.", "The Chief UX and Accessibility Officer with the head of product.", "A manual audit (keyboard, screen reader), tests with users, task success and drop-out by group.")


def fig_t1():
    def course(c, x, y, w, h):
        for i in range(8):
            c.rect(x + 10, y + 12 + i * 8, w - 44, 3.6, "#C8C8C8", None, 0, 2)
        c.marker(x + w - 14, y + 20, 1)
        c.circle(x + 16, y + 92, 5, "#B03030")
        c.rect(x + 28, y + 90, 44, 4, LINE, None, 0, 2)
        c.marker(x + w - 14, y + 92, 3)
        ui_button(c, x + 10, y + h - 30, 18, 18, "<", False, 9)
        ui_button(c, x + 32, y + h - 30, 18, 18, ">", True, 9)
        c.marker(x + w - 14, y + h - 22, 4)

    def video(c, x, y, w, h):
        c.rect(x + 10, y + 10, w - 20, 70, "#333", None, 0, 4)
        c.text(x + w / 2, y + 50, "Video", 12, "bold", "middle", PAPER)
        c.text(x + 10, y + 100, "No captions · no transcript", 10, fill=ASH)
        c.marker(x + w - 14, y + 96, 2)

    def quiz(c, x, y, w, h):
        for i in range(3):
            c.rect(x + 10, y + 14 + i * 24, 70, 16, MIST, GREY, 1, 3)
            c.rect(x + w - 66, y + 14 + i * 24, 50, 16, PAPER, GREY, 1, 3, "3 2")
        c.text(x + 10, y + h - 14, "Drag each item onto its box", 10, fill=ASH)
        c.marker(x + w - 14, y + h - 18, 5)

    def signup(c, x, y, w, h):
        for i in range(6):
            c.rect(x + 10, y + 10 + i * 14, w - 40, 8, MIST, GREY, 1, 2)
        c.text(x + 10, y + 108, "Step 3 of 14", 10, fill=ASH)
        c.marker(x + w - 14, y + 60, 6)
        c.rect(x + 10, y + h - 40, w - 40, 14, RUSTSOFT, RUST, 1, 3)
        c.text(x + 14, y + h - 30, "Error 4011", 10)
        c.marker(x + w - 14, y + h - 33, 8)
        c.marker(x + w - 14, y + 30, 7)

    return screens("d7_t1_inclusivelearn-screens.png", [("Course page", course), ("Video lesson", video), ("Quiz", quiz), ("Sign-up", signup)], title="InclusiveLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", sh=190)


ALL = [fig_a1_spectrum, fig_a2_pour, fig_a2_barriers, fig_a3, fig_a4, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
