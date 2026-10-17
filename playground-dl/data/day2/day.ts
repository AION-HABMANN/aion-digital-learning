import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day2/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day2/progress";
import type { TaskBlockId } from "@/lib/day2/progress";
import type { RouteNo } from "@/data/course";

/** Day 2 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · what works, prototypes, tests", "Level 1 + 2 · was funktioniert, Prototypen, Tests"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · investing in UX and technology", "Level 3 · in UX und Technologie investieren"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Chief Product Officer", "UX Strategy Memo · Chief Product Officer"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d2:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: LearnPro, a stagnating platform", "Der Fall: LearnPro, eine stagnierende Plattform") },
          blk("1.1", tt("Two platforms: which one, five differences, three principles", "Zwei Plattformen: welche, fünf Unterschiede, drei Prinzipien"), "b11"),
          blk("1.2", tt("Prototyping and testing: three options", "Prototyping und Testen: drei Optionen"), "b12"),
          blk("2.1", tt("The case study: weaknesses, approach, three tests, adaptive decision", "Die Fallstudie: Schwächen, Ansatz, drei Tests, adaptive Entscheidung"), "b21"),
          { id: "export-l1l2", short: "Export", title: tt("Export the UX Analysis File", "UX Analysis File exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: LearnPro's Chief Product Officer", "Die Lage: Chief Product Officer von LearnPro") },
        blk("3.1", tt("Decision, prototyping, testing, roadmap, risk, a decision under uncertainty", "Entscheidung, Prototyping, Testen, Roadmap, Risiko, eine Entscheidung unter Unsicherheit"), "b31"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about what makes a learning platform work, and how to find out cheaply whether an idea works before you build it. You learn what successful platforms have in common, how to prototype and test with a handful of learners, and how to decide about adaptive learning when the data is incomplete.",
    "Heute geht es darum, was eine Lernplattform funktionieren lässt und wie man günstig herausfindet, ob eine Idee funktioniert, bevor man sie baut. Sie lernen, was erfolgreiche Plattformen gemeinsam haben, wie man mit wenigen Lernenden prototypt und testet und wie man über adaptives Lernen entscheidet, wenn die Daten unvollständig sind.",
  ),
  caseLine: t(
    "The case that runs through the day is LearnPro, a learning platform that has stopped growing: learners drop out early, there is no personalisation and the content is called boring. The puzzle: with three months, a limited budget and unclear user needs, what do you test first, and is adaptive learning worth it?",
    "Der Fall, der durch den Tag läuft, ist LearnPro, eine Lernplattform, die nicht mehr wächst: Lernende brechen früh ab, es gibt keine Personalisierung, und der Inhalt wird langweilig genannt. Das Rätsel: Was testen Sie mit drei Monaten, begrenztem Budget und unklaren Nutzerbedürfnissen zuerst, und lohnt adaptives Lernen?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Compare and plan", "Vergleichen und planen"),
      question: t("What does a platform that learners finish do differently from one they leave, and which prototype approach and three UX tests fit three months, a limited budget and unclear user needs?", "Was macht eine Plattform, die Lernende abschließen, anders als eine, die sie verlassen, und welcher Prototyping-Ansatz und welche drei UX-Tests passen zu drei Monaten, begrenztem Budget und unklaren Nutzerbedürfnissen?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As LearnPro's Chief Product Officer, do you invest in adaptive learning, how do you test and prioritise, and which decision do you take on purpose under uncertainty?", "Investieren Sie als Chief Product Officer von LearnPro in adaptives Lernen, wie testen und priorisieren Sie, und welche Entscheidung treffen Sie bewusst unter Unsicherheit?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Say what makes a learning platform work", "Sagen, was eine Lernplattform funktionieren lässt"), payoff: t("Path, short units and feedback work as a checklist when you review any platform, course or training site, instead of arguing about taste.", "Pfad, kurze Einheiten und Feedback funktionieren als Checkliste, wenn Sie irgendeine Plattform, einen Kurs oder eine Schulungsseite prüfen, statt über Geschmack zu streiten.") },
    { route: 1 as RouteNo, skill: t("Test an idea before you build it", "Eine Idee testen, bevor man sie baut"), payoff: t("A paper or clickable prototype with five users answers a question in days. You can use this before your next project spends real money.", "Ein Papier- oder klickbarer Prototyp mit fünf Nutzern beantwortet eine Frage in Tagen. Das können Sie nutzen, bevor Ihr nächstes Projekt echtes Geld ausgibt.") },
    { route: 1 as RouteNo, skill: t("Choose tests for the question they answer", "Tests nach der Frage wählen, die sie beantworten"), payoff: t("Qualitative data says why, quantitative data says how many. Picking one of each is useful far beyond this case.", "Qualitative Daten sagen, warum, quantitative sagen, wie viele. Von jeder eine zu wählen, ist weit über diesen Fall hinaus nützlich.") },
    { route: 2 as RouteNo, skill: t("Decide about new technology without the hype", "Über neue Technologie ohne Hype entscheiden"), payoff: t("Ask for the learner's problem, the data and the simplest first step. It works for any AI or tool proposal that lands on your desk.", "Fragen Sie nach dem Problem der Lernenden, den Daten und dem einfachsten ersten Schritt. Das funktioniert für jeden KI- oder Tool-Vorschlag, der auf Ihrem Tisch landet.") },
    { route: 2 as RouteNo, skill: t("Stage a bet with a gate", "Eine Wette mit einem Gate stufen"), payoff: t("Write down the figure that continues or stops a project before the money is spent. You can use it in your next budget meeting.", "Schreiben Sie die Zahl auf, die ein Projekt fortsetzt oder stoppt, bevor das Geld ausgegeben ist. Sie können es in Ihrer nächsten Budgetrunde nutzen.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Compare platforms, plan prototypes and tests", "Plattformen vergleichen, Prototypen und Tests planen"),
        blurb: tt("Levels 1 and 2 on one case: compare two platforms, assess three prototyping and testing options, then analyse LearnPro, define a prototype approach and three UX tests, and decide on adaptive learning.", "Level 1 und 2 an einem Fall: zwei Plattformen vergleichen, drei Prototyping- und Testoptionen bewerten, dann LearnPro analysieren, einen Prototyping-Ansatz und drei UX-Tests definieren und über adaptives Lernen entscheiden."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, blocks 1.1, 1.2 and 2.1", "Task 1 · UX Analysis File, Blöcke 1.1, 1.2 und 2.1"), minutes: CORE1_MINUTES },
        ],
        optional: "",
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the innovation strategy", "Die Innovationsstrategie entscheiden"),
        blurb: tt("Level 3 in the Chief Product Officer's chair: a decision on adaptive learning, a prototyping strategy, a UX testing strategy, a prioritised innovation roadmap, a risk analysis, and one decision under uncertainty.", "Level 3 auf dem Stuhl der Chief Product Officer: eine Entscheidung zu adaptivem Lernen, eine Prototyping-Strategie, eine UX-Teststrategie, eine priorisierte Innovations-Roadmap, eine Risikoanalyse und eine Entscheidung unter Unsicherheit."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, block 3.1", "Task 2 · UX Strategy Memo, Block 3.1"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };
