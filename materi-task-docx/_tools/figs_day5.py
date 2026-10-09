"""Day 5 figures: user-centred UX design; the LearnBase task screens."""
from figlib import *


def fig_a1():
    return compare("d5_a1_feature-vs-user.png", "Feature-driven", "User-driven", [
        ("Starts from: \"what can our software do?\"", "Starts from: \"what does the learner want to do?\""),
        ("The menu lists modules: Content Repository, Module Manager", "The menu lists tasks: My courses, Find a course, My progress"),
        ("Success is counted in features shipped", "Success is counted in tasks learners complete"),
        ("Typical result: many functions, low usage, frustration", "Typical result: fewer functions, used, understood"),
    ], arrow=False, lkind="r", rkind="s", title="Two ways to decide what a platform is")


def fig_a2():
    return rows_chain("d5_a2_contexts.png", [
        ["On a phone", "A commuter has ten minutes and one hand free", "Short units, large targets, resume at once"],
        ["On the side", "A busy professional learns between meetings", "Quick re-entry: \"continue where I stopped\""],
        ["Intensive", "A learner prepares for an exam over a weekend", "Overview, search, notes, practice questions"],
        ["Mandatory", "An employee must finish compliance training by a date", "Clear deadline, low friction, proof of completion"],
    ], heads=["Context of use", "What the situation looks like", "What the design must allow"], kinds=("a", "m", "s"))


def fig_a3():
    return rows_chain("d5_a3_mistakes.png", [
        ["Functions instead of benefits", "The screen says what the software has, not what I can do", "Name things after the learner's task"],
        ["Overly complex interface", "I must choose from too many things at once", "Show one main action; hide the rest"],
        ["Missing orientation and structure", "I do not know where I am or where the content is", "One place per item; always show where you are"],
    ], heads=["Typical mistake without user focus", "What the learner experiences", "A user-centred remedy"], kinds=("r", "m", "s"))


def fig_a4():
    pts = [("A Interviews", 0.16, 0.30), ("B Surveys", 0.20, 0.86), ("C Usability test", 0.82, 0.28), ("D Analytics and logs", 0.84, 0.86), ("E Observation in context", 0.62, 0.16)]
    return matrix("d5_a4_methods.png", "What you learn about: what people say  →  what people do", "Size of the sample: few  →  many", ("Say, many: how many say it", "Do, many: how many do it", "Say, few: why they say it", "Do, few: why they do it"), pts, xlow="Say", xhigh="Do", ylow="Few", yhigh="Many", title="A first overview of user-research methods (after Rohrer) · a reading, not a ranking")


def fig_a5():
    return budget_bands("d5_a5_options-cost.png", [("A · Add a chat feature", 24000), ("B · Rebuild the menu around tasks", 12000), ("C · Add ten new courses", 32000)], 50000, [(10000, "Low"), (20000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €50,000, limited time")


def fig_b1():
    return chain("d5_b1_bridge.png", [
        ("What the learner needs", "To find, understand and finish what they came for.", "a"),
        ("What UX does", "Makes that possible, with the least effort.", "m"),
        ("What the business gets", "Completion, retention, renewals, recommendations.", "s"),
    ], title="UX as a bridge between user needs and the business model", note="The bridge works in both directions: a business goal that ignores the user need does not reach its number.")


def fig_b2():
    return venn3("d5_b2_three-goals.png", ["User", "Business", "Technology"], ["finds, understands, finishes", "growth, retention, cost", "what can be built and kept running"], center="Aim for the overlap", title="Three goals pull at every UX decision")


def fig_b3():
    return frame4("d5_b3_decision-frame.png", "Rebuild the home screen around \"Continue\" and two tasks; freeze new features for six months.", "Which three tasks matter most to the learners who leave; we have no complete user data.", "Task completion on the new home screen is not at least 10 points above today's after 8 weeks.", "The new feature set that sales asked for, this half year.", "The head of product with the UX lead.", "A usability test, interviews with leavers, task completion and usage per feature.")


def fig_t1():
    def home(c, x, y, w, h):
        for i in range(11):
            c.rect(x + 8, y + 10 + i * 12, w * 0.3, 7, GREY, None, 0, 2)
        for i in range(3):
            for k in range(3):
                c.rect(x + w * 0.38 + k * (w * 0.19), y + 10 + i * 32, w * 0.17, 26, MIST, GREY, 1, 3)
        for i in range(4):
            c.rect(x + w * 0.38, y + 108 + i * 12, w * 0.54, 8, ACCSOFT, ACC, 1, 2)
        c.marker(x + 18, y + 6, 1)
        c.marker(x + w - 14, y + 30, 3)
        c.marker(x + w - 14, y + 70, 7)
        c.marker(x + w - 14, y + h - 12, 6)

    def search(c, x, y, w, h):
        c.rect(x + 8, y + 8, w - 16, 14, PAPER, GREY, 1, 3)
        for i in range(7):
            c.rect(x + 8 + (i % 2) * (w / 2 - 8), y + 30 + (i // 2) * 16, w / 2 - 14, 10, MIST, GREY, 1, 3)
        c.text(x + 10, y + h - 12, "Results: 0 shown", 10, fill=ASH)
        c.marker(x + w - 14, y + 60, 4)

    def course(c, x, y, w, h):
        c.text(x + 10, y + 16, "Home > Home", 10, fill=ASH)
        c.marker(x + w - 14, y + 14, 8)
        c.rect(x + 8, y + 28, w * 0.6, 8, GREY, None, 0, 2)
        for i in range(4):
            c.rect(x + 8, y + 46 + i * 11, w * 0.5, 5, LINE, None, 0, 2)
        ui_button(c, x + 8, y + h - 34, w * 0.78, 20, "Enrol in module instance", True, 10)
        c.marker(x + w - 14, y + h - 24, 2)

    def lists(c, x, y, w, h):
        for k, nm in enumerate(["Library", "Catalogue", "My Learning"]):
            gx = x + 6 + k * (w / 3)
            c.text(gx, y + 14, nm, 9.5, "bold")
            for i in range(5):
                c.rect(gx, y + 22 + i * 14, w / 3 - 10, 8, MIST, GREY, 1, 2)
        c.marker(x + w - 14, y + h - 16, 5)

    return screens("d5_t1_learnbase-screens.png", [("Home", home), ("Course search", search), ("Course page", course), ("Three lists", lists)], title="LearnBase screens, drawn in outline · Case assumption: the details are made up for this exercise", sh=190)


ALL = [fig_a1, fig_a2, fig_a3, fig_a4, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
