"""Day 4 figures: motivation, design principles, evaluation; the MotivaLearn task screens."""
from figlib import *


def fig_a1_drivers():
    return compare("d4_a1_intrinsic-vs-extrinsic.png", "Intrinsic motivation", "Extrinsic motivation", [
        ("Comes from the activity itself: curiosity, interest, the wish to get better", "Comes from outside: points, badges, money, a deadline, a certificate"),
        ("Example: \"I want to understand how contracts work\"", "Example: \"I need the certificate to keep my job\""),
        ("Tends to last, and to grow with competence", "Works while the reward lasts; can fade when it stops"),
        ("Risk: easy to overlook, hard to \"add\" with a feature", "Risk: expected rewards can crowd out the interest that was there"),
    ], arrow=False, lkind="s", rkind="a", title="Two sources of motivation (Deci and Ryan)")


def fig_a1_sdt():
    return venn3("d4_a1_three-needs.png", ["Autonomy", "Competence", "Relatedness"], ["I choose my path and pace", "I can see I am getting better", "I belong; others learn with me"], center="Motivation", title="Self-Determination Theory: three needs that support lasting motivation")


def fig_a2_principles():
    return rows_chain("d4_a2_five-principles.png", [
        ["Clarity and structure", "I know what this is and what to do", "A stated goal; one main action per screen"],
        ["Activation", "I do something, I do not only read", "A short task, a choice, a question"],
        ["Feedback and reinforcement", "I know how I did and what next", "A result after each task, with a next step"],
        ["Progression", "I can see my learning moving forward", "A progress bar, skills gained, a path"],
        ["Relevance and context", "I see why this matters for my work", "A work example before the rule"],
    ], heads=["Design principle", "What the learner experiences", "A typical screen element"], kinds=("a", "m", "s"))


def fig_a3_feedback():
    return chain("d4_a3_feedback-questions.png", [
        ("Where am I going?", "The goal: what I will be able to do after this unit.", "a"),
        ("How am I going?", "The result so far: what I got right, what I missed.", "a"),
        ("Where to next?", "The next step: what to do now to improve.", "s"),
    ], title="Three questions good feedback answers (Hattie and Timperley)", note="Feedback that answers only 'good job' says that something happened. Feedback that answers these three questions tells the learner what to do.")


def fig_a3_rewards():
    return compare("d4_a3_rewards.png", "A reward that supports learning", "A reward that replaces learning", [
        ("Tells the learner something true about their skill: \"You can now read a contract clause\"", "Counts something easy: \"+10 points for opening a page\""),
        ("Comes after real effort or a real result", "Comes for presence or clicks"),
        ("The learner would still value the activity without it", "The learner does the activity only for the reward"),
        ("Fits what the learner wants to achieve", "Sets up comparison or pressure the learner did not ask for"),
    ], arrow=False, lkind="s", rkind="r", title="Rewards, progress and badges: the same element can help or backfire")


def fig_a4_metrics():
    return rows_chain("d4_a4_metrics.png", [
        ["Completion rate", "Did learners finish what they started?", "An outcome; it does not say why"],
        ["Return rate (e.g. within 7 days)", "Do learners come back?", "A sign of retention; check what pulled them back"],
        ["Tasks done per week", "How much do learners do?", "Activity; more is not always better"],
        ["Time spent", "How long are learners there?", "Ambiguous: long can mean interest or confusion"],
        ["Interviews and observation", "Why do learners act as they do?", "Small numbers; shows reasons, not size"],
    ], heads=["Metric or method", "The question it answers", "Read it carefully because"], kinds=("a", "m", "r"))


def fig_a5():
    return budget_bands("d4_a5_options-cost.png", [("A · Weekly leaderboard", 14000), ("B · Progress and next-step display", 8000), ("C · Short practice tasks", 26000)], 40000, [(10000, "Low"), (20000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €40,000, two months")


def fig_b1():
    return chain("d4_b1_behaviour-model.png", [
        ("Motivation", "Does the learner want to?", "a"),
        ("Ability", "Is it easy enough to do now?", "a"),
        ("Prompt", "Is there a cue at the right moment?", "a"),
        ("Behaviour", "The learner does the next lesson.", "s"),
    ], title="Fogg's Behavior Model: behaviour happens when motivation, ability and a prompt come together", note="Raising motivation alone often fails if the next step is hard or nothing prompts it. A design decision can work on any of the three.")


def fig_b2():
    pts = [("A Progress display", 0.78, 0.18), ("B Clear goals", 0.74, 0.10), ("C Interactive tasks", 0.84, 0.34), ("D Badges", 0.33, 0.42), ("E Leaderboard", 0.30, 0.68), ("F Streak-loss messages", 0.34, 0.86), ("G Discount coupons", 0.18, 0.28)]
    return matrix("d4_b2_motivation-vs-pressure.png", "Lasting motivation supported", "Pressure on the learner", ("Pressure without much gain", "Gain with pressure: use with care", "Little effect, little pressure", "Aim here"), pts, title="LearnLoop · Case assumption · where seven measures sit (a reading of the example, not a score)")


def fig_b3():
    return frame4("d4_b3_decision-frame.png", "Show progress and a next step in two courses; hold off on badges.", "Whether learners return because of progress or only because of deadlines.", "The 7-day return rate is not at least 5 points above the control group after 6 weeks.", "The leaderboard this year.", "The head of product with the learning lead.", "An A/B test with a control group, learner interviews, return rate and completion.")


def fig_t1():
    def a_course(c, x, y, w, h):
        c.rect(x + 8, y + 8, w - 16, 16, MIST, LINE, 1, 3)
        c.text(x + 14, y + 20, "Course · Negotiation", 10.5)
        c.text(x + 10, y + 46, "After this unit you can:", 10.5, "bold")
        c.text(x + 10, y + 60, "write a counter-offer", 10.5)
        c.marker(x + w - 14, y + 56, 4)
        ui_bar(c, x + 10, y + 82, w - 44, 0.4)
        c.text(x + 10, y + 106, "40% done", 10.5, fill=ASH)
        c.marker(x + w - 14, y + 86, 1)

    def a_task(c, x, y, w, h):
        c.text(x + 10, y + 22, "Task 3 · 3 min", 10.5, "bold")
        c.rect(x + 10, y + 32, w - 44, 20, PAPER, GREY, 1, 3)
        c.text(x + 16, y + 46, "your answer…", 10, fill=ASH)
        c.marker(x + w - 14, y + 44, 3)
        c.rect(x + 10, y + 70, w - 44, 30, SIGSOFT, SIG, 1, 3)
        c.text(x + 16, y + 84, "Correct.", 10.5, "bold")
        c.text(x + 16, y + 96, "Next: task 4", 10, fill=ASH)
        c.marker(x + w - 14, y + 84, 2)

    def b_lesson(c, x, y, w, h):
        ui_lines(c, x + 10, y + 12, w - 44, 17, h=3.8, gap=4.2)
        c.marker(x + w - 14, y + 20, 5)
        c.text(x + 10, y + h - 14, "[ Next page ]", 10.5, fill=ASH)
        c.marker(x + w - 14, y + h - 18, 6)

    def b_course(c, x, y, w, h):
        c.rect(x + 8, y + 8, w - 16, 16, MIST, LINE, 1, 3)
        c.text(x + 14, y + 20, "Course · Negotiation", 10.5)
        for i in range(6):
            c.rect(x + 10, y + 40 + i * 14, w * 0.55, 5, LINE, None, 0, 2)
        c.marker(x + w - 14, y + 50, 7)
        c.marker(x + w - 14, y + 100, 8)

    return screens("d4_t1_motivalearn-screens.png", [("A · Course page", a_course), ("A · A task", a_task), ("B · A lesson", b_lesson), ("B · Course page", b_course)], title="Platform A (a benchmark) and Platform B (MotivaLearn today), drawn in outline · Case assumption", sh=190)


ALL = [fig_a1_drivers, fig_a1_sdt, fig_a2_principles, fig_a3_feedback, fig_a3_rewards, fig_a4_metrics, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
