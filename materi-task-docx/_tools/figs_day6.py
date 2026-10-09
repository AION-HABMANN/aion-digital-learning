"""Day 6 figures: personas and user journeys; the EduPath touchpoints."""
from figlib import *


def fig_a1_persona():
    c = Canvas(W, 380)
    c.rect(10, 10, W - 20, 360, PAPER, ACC, 2, 10)
    c.circle(60, 62, 32, ACCSOFT, ACC, 2)
    c.text(60, 70, "M", 26, "bold", "middle", ACC)
    c.text(110, 52, "Mia, 38 · project manager at a logistics firm", 17, "bold")
    c.text(110, 74, "Learner persona · an example for LearnLoop (Case assumption)", 13, fill=ASH)
    cols = [("Goals", "Why does she learn?", "Qualify for a team-lead role next year; use what she learns in her current project.", SIGSOFT, SIG),
            ("Problems and frustrations", "What gets in her way?", "Little time; loses the thread after a few days away; lessons that need 40 minutes in one go.", RUSTSOFT, RUST),
            ("Context of use", "Time, device, motivation", "About 20 minutes in the evening, on her phone; paid by her employer; motivated by the promotion.", ACCSOFT, ACC)]
    bw = (W - 20 - 40 - 2 * 14) / 3
    for i, (h, q, t, f, s) in enumerate(cols):
        x = 30 + i * (bw + 14)
        c.rect(x, 108, bw, 188, f, s, 1.5, 8)
        c.text(x + 10, 130, h, 14.5, "bold")
        c.text(x + 10, 148, q, 12, fill=ASH, italic=True)
        c.tb(x + 10, 156, bw - 20, t, 13.5)
    c.rect(30, 308, W - 60, 48, MIST, GREY, 1, 6)
    c.tb(40, 312, W - 80, "Built from: five interviews, support tickets and usage logs. A persona that is not tied to data is a guess; label it as a hypothesis.", 13.5, fill=INK)
    return c.save("d6_a1_persona-card.png")


def fig_a2():
    return compare("d6_a2_good-vs-weak.png", "A weak persona", "A useful persona", [
        ("A cliché: \"Tech-savvy Tim, 25, loves apps\"", "Built from interviews, tickets and logs, with sources named"),
        ("Too general: \"all learners want quality\"", "Specific goals, problems and a situation that differ from other personas"),
        ("Decoration: a stock photo on a poster nobody uses", "Used in decisions: \"does this help Mia?\" is asked in every review"),
        ("One persona for everyone", "Two or three personas that really differ in needs"),
    ], arrow=False, lkind="r", rkind="s", title="Typical persona mistakes and what a useful persona looks like")


def fig_a3_journey():
    return journey("d6_a3_journey-map.png", ["Entry (onboarding)", "Learning (usage)", "Progress and completion", "After the course"], [3, 2, 1.5, 4],
                   ["Signs up from a mail from HR. Finds a clear first course.", "Opens lesson 2 on the phone; needs 40 minutes in one sitting. Pain: cannot pause.", "Away for three days. Cannot find where she stopped. Pain: no resume.", "Finishes late with a reminder. Certificate arrives; employer is told."],
                   title="Journey map (example): one persona, four phases, an emotion curve and the pain points", low_label="frustrated", high_label="motivated")


def fig_a4():
    return compare("d6_a4_learner-vs-teacher.png", "Learner's perspective", "Teacher's perspective", [
        ("Goal: reach a skill or a qualification in the time I have", "Goal: set up and run a course with little effort"),
        ("Problem: loses the thread; no sign of progress", "Problem: a tool built for administrators; many tabs"),
        ("Context: evenings, a phone, short sessions", "Context: a desk, a weekend, long sessions"),
        ("Success: I finish and can use it", "Success: learners finish and I can see who is stuck"),
    ], arrow=False, lkind="a", rkind="s", title="The same platform, two perspectives: personas for each group differ")


def fig_a5():
    return budget_bands("d6_a5_options-cost.png", [("A · A resume button on every screen", 5000), ("B · Five-minute learning formats", 18000), ("C · A new course editor for teachers", 26000)], 40000, [(8000, "Low"), (15000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €40,000, three months")


def fig_b1():
    pts = [("A Time-poor learners", 0.86, 0.62), ("B Exam preparers", 0.28, 0.45), ("C Teachers", 0.26, 0.68), ("D Training managers", 0.14, 0.84), ("E Casual browsers", 0.52, 0.12)]
    return matrix("d6_b1_segments.png", "Size of the segment (share of users)", "Business value of the segment", ("Small but critical: keep close", "Large and valuable: serve first", "Small and low: watch", "Large but low value: do not over-serve"), pts, title="LearnLoop · Case assumption · where five user segments sit (a reading of the example, not a score)")


def fig_b2():
    return compare("d6_b2_conflicting-needs.png", "Time-poor learners", "Exam preparers", [
        ("Want five-minute units and a resume button", "Want long practice sessions and an overview of everything"),
        ("A simple home: one next step", "A dense home: search, notes, practice sets"),
        ("Reminders on the phone", "No reminders; they plan themselves"),
        ("A design for both has to give up depth or speed", "Two separate designs double the cost and the upkeep"),
    ], arrow=False, lkind="a", rkind="m", title="Two segments with conflicting needs (LearnLoop, Case assumption): \"design for everyone\" serves neither")


def fig_b3():
    return frame4("d6_b3_decision-frame.png", "Prioritise time-poor learners for the next two quarters.", "Whether exam preparers would pay more for a dedicated mode; we only have 12 interviews.", "Return rate of time-poor learners is not up 8 points after 10 weeks, or exam-preparer churn doubles.", "A dedicated exam mode this year.", "The head of UX strategy with the head of product.", "Interviews per persona, usage logs per segment, renewal data from training managers.")


def fig_t1():
    return chain("d6_t1_edupath-touchpoints.png", [
        ("Sign-up", "Learners join from a mail of their employer's training team.", "a"),
        ("Learning", "Courses are read on a phone or a laptop; a lesson can take 40 minutes.", "a"),
        ("Reminder", "An email reminder arrives at 08:00, when most learners are at work.", "a"),
        ("Teacher workspace", "A course editor with nine tabs; uploading one unit takes about three hours.", "s"),
        ("Organisation report", "A monthly export that the training manager formats by hand.", "m"),
    ], title="EduPath: where learners, teachers and the organisation meet the platform · Case assumption", hs=14, bs=12)


ALL = [fig_a1_persona, fig_a2, fig_a3_journey, fig_a4, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
