"""Day 8 figures: structure, visual hierarchy and interaction; the StructLearn task screens."""
from figlib import *


def fig_a1_tree():
    return tree("d8_a1_ia-tree.png", "LearnLoop (example)", [
        ("Learn", ["Continue where I stopped", "My courses", "My notes"]),
        ("Find", ["Catalogue", "Search", "Recommended"]),
        ("Progress", ["Certificates", "Skills gained", "Reports for my employer"]),
        ("Help and account", ["Help centre", "Profile", "Settings"]),
    ], title="A simple information architecture: four sections named after what the learner does · Case assumption")


def fig_a1_orient():
    return chain("d8_a1_orientation.png", [
        ("Where am I?", "The page title, the highlighted menu entry and a path such as Learn › Negotiation › Lesson 3 agree with each other.", "a"),
        ("Where can I go?", "The main sections are visible and few; the current one is marked.", "a"),
        ("What comes next?", "One clear next step: a Next link or a Continue button.", "s"),
    ], title="Orientation in the learning process (after Krug's \"trunk test\")", note="If a learner dropped onto any page could answer these three questions in a few seconds, the structure works.")


def fig_a2_hierarchy():
    c = Canvas(W, 360)
    hw = (W - 20 - 20) / 2
    x = 10
    device(c, x, 10, hw, 290, "Course page")
    cols = [RUST, ACC, SIG, GOLD, "#C28A00", "#7A3E9D", GREY]
    for i in range(7):
        c.rect(x + 12 + i * 46, 34, 40, 20, cols[i], None, 0, 3)
    c.text(x + 12, 80, "Negotiation basics", 14, "bold", fill=RUST)
    c.text(x + 12, 98, "Welcome to the course", 11, fill=ACC)
    for i, nm in enumerate(["Start", "Save", "Share", "Report", "Delete"]):
        ui_button(c, x + 12 + i * 66, 120, 60, 24, nm, False, 11)
    ui_lines(c, x + 12, 160, hw - 24, 6, h=4, gap=5)
    c.rect(x + 12, 210, hw - 24, 30, "#FFE08A", "#C28A00", 1, 3)
    c.text(x + 18, 230, "NEW! 20% off", 12, "bold")
    c.rect(x + 12, 250, hw - 24, 30, "#DDE", "#99B", 1, 3)
    c.text(x + 18, 270, "Join our community", 12)
    c.text(x + hw / 2, 322, "Before: everything competes", 14.5, "bold", "middle")
    x = 10 + hw + 20
    device(c, x, 10, hw, 290, "Course page")
    c.text(x + 12, 52, "Learn › Negotiation basics", 11, fill=ASH)
    c.text(x + 12, 90, "Negotiation basics", 19, "bold")
    c.text(x + 12, 112, "8 lessons · about 45 minutes", 12, fill=ASH)
    ui_lines(c, x + 12, 132, hw - 24, 4, h=4, gap=6)
    ui_button(c, x + 12, 180, 150, 36, "Continue: lesson 3", True, 14)
    c.text(x + 180, 203, "Save", 12, fill=ACC)
    c.text(x + 220, 203, "Share", 12, fill=ACC)
    ui_bar(c, x + 12, 240, hw - 24, 2 / 8, h=8)
    c.text(x + 12, 264, "2 of 8 lessons done", 11.5, fill=ASH)
    c.text(x + hw / 2, 322, "After: one main thing, then the rest", 14.5, "bold", "middle")
    return c.save("d8_a2_visual-hierarchy.png")


def fig_a3_response():
    return chain("d8_a3_response-times.png", [
        ("0.1 second", "Feels instant. The learner sees the system react to their action.", "a"),
        ("1 second", "The learner's train of thought stays unbroken, but they notice the delay.", "a"),
        ("10 seconds", "The limit of attention. Show progress and let the learner do something else.", "r"),
    ], title="Three response-time limits for feedback on an action (Nielsen)", note="A button that does nothing for two seconds is read as broken. Even a small change (a pressed state, a spinner) tells the learner that the action was received.")


def fig_a4_mistakes():
    return rows_chain("d8_a4_mistakes.png", [
        ["Unclear navigation", "The learner cannot hold a map of the platform in mind; effort goes into finding", "Few sections, always show where you are, one place per item"],
        ["Visual overload", "Many things compete for attention; the key point is lost", "A visual hierarchy: one main thing per screen, the rest quieter"],
        ["Inconsistent design", "Each screen must be learned again; the learner doubts what they know", "One style for one function: buttons, links, dates, back"],
    ], heads=["Typical UX/UI mistake", "What it costs the learner (link to Day 3)", "A structural remedy"], kinds=("r", "m", "s"))


def fig_a5():
    return budget_bands("d8_a5_options-cost.png", [("A · Fewer colours and banners", 6000), ("B · Rebuild the navigation", 18000), ("C · Animated illustrations", 10000)], 30000, [(8000, "Low"), (15000, "Mid"), (None, "High")], title="LearnLoop · Case assumption · budget €30,000, three weeks")


def fig_b1():
    return chain("d8_b1_design-chain.png", [
        ("Structure and hierarchy", "Where things are and what comes first.", "a"),
        ("Orientation and guidance", "The learner knows where they are and what to do.", "a"),
        ("Behaviour", "Fewer wrong turns; the learner carries on.", "m"),
        ("Learning result", "More learners reach the goal.", "s"),
    ], title="Design as decision architecture: from structure to learning success", note="The plan's coaching: structure beats visual design; good UX reduces the learner's wrong decisions.", hs=14, bs=12.5)


def fig_b2():
    pts = [("A Remove advanced features", 0.92, 0.18), ("B Group into three sections", 0.88, 0.80), ("C Hide advanced under More", 0.90, 0.64), ("D Remove all help text", 0.88, 0.32), ("E Everything on one screen", 0.12, 0.84)]
    return matrix("d8_b2_reduction-vs-guidance.png", "Clutter removed", "Guidance and function kept", ("Helpful but cluttered", "Aim here", "Neither", "Too reduced"), pts, title="LearnLoop · Case assumption · five options (a reading of the example, not a score)")


def fig_b3():
    return frame4("d8_b3_decision-frame.png", "Rebuild the navigation into four sections and give every page one main action.", "Whether beginners understand the four section names; we have not run a card sort or a user test.", "Fewer than 4 of 5 beginners find their course in 30 seconds in a test, or drop-out is not down 5 points after 8 weeks.", "The full visual rebrand this year.", "The Chief UX Architect with the head of product.", "A closed card sort, a tree test and a usability test with beginners; drop-out and task success.")


def fig_t1():
    def home(c, x, y, w, h):
        for i, nm in enumerate(["Learn", "Library", "Archive", "More", "Tools"]):
            c.rect(x + 8 + i * (w - 16) / 5, y + 6, (w - 16) / 5 - 3, 12, MIST, GREY, 1, 2)
        c.rect(x + 8, y + 22, w * 0.3, 8, ACCSOFT, ACC, 1, 2)
        c.marker(x + w - 14, y + 12, 1)
        c.text(x + 10, y + 52, "Course: Negotiation", 10, fill=ASH)
        c.text(x + 10, y + 64, "Menu marks: Home", 10, fill=ASH)
        c.marker(x + w - 14, y + 58, 2)

    def course(c, x, y, w, h):
        cols = [RUST, ACC, SIG, GOLD, "#C28A00", "#7A3E9D", GREY, "#555", "#B07"]
        for i in range(9):
            c.rect(x + 8 + i * ((w - 16) / 9), y + 8, (w - 16) / 9 - 2, 10, cols[i], None, 0, 2)
        c.marker(x + w - 14, y + 30, 4)
        for i in range(5):
            ui_button(c, x + 8 + i * ((w - 16) / 5), y + 56, (w - 16) / 5 - 3, 16, ["Start", "Save", "Share", "Report", "Delete"][i][:3], False, 8)
        c.marker(x + w - 14, y + 90, 5)
        c.rect(x + 8, y + 104, w - 16, 14, "#FFE08A", "#C28A00", 1, 2)

    def lesson(c, x, y, w, h):
        ui_lines(c, x + 10, y + 12, w - 44, 10, h=3.8, gap=4.2)
        c.text(x + 10, y + h - 30, "‹ Back", 10, fill=ACC)
        c.marker(x + w - 14, y + 60, 3)
        c.marker(x + w - 14, y + h - 26, 8)

    def prof(c, x, y, w, h):
        ui_button(c, x + 8, y + 12, 56, 20, "Submit", True, 10)
        c.text(x + 70, y + 26, "Quiz", 10, fill=ASH)
        c.text(x + 8, y + 60, "Submit", 10, fill=ASH)
        c.text(x + 70, y + 60, "Profile", 10, fill=ASH)
        c.rect(x + 8, y + 80, 14, 14, MIST, GREY, 1, 3)
        c.path(f"M{x + 15} {y + 92} V{y + 84} M{x + 11} {y + 87} L{x + 15} {y + 83} L{x + 19} {y + 87}", INK, 1.5)
        c.text(x + 70, y + 90, "Editor", 10, fill=ASH)
        c.marker(x + w - 14, y + 26, 7)
        c.marker(x + w - 14, y + 62, 6)
        c.text(x + 8, y + 116, "Updated 03/04/2026 · 3 April 2026", 8.5, fill=ASH)

    return screens("d8_t1_structlearn-screens.png", [("Home and menu", home), ("Course page", course), ("End of a lesson", lesson), ("Quiz, profile, editor", prof)], title="StructLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", sh=190)


ALL = [fig_a1_tree, fig_a1_orient, fig_a2_hierarchy, fig_a3_response, fig_a4_mistakes, fig_a5, fig_b1, fig_b2, fig_b3, fig_t1]
if __name__ == "__main__":
    for f in ALL:
        print(f())
