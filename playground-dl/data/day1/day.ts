import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day1/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { BLOCK_MINUTES, CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day1/progress";
import type { TaskBlockId } from "@/lib/day1/progress";
import type { RouteNo } from "@/data/course";

/** Day 1 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export const CORE_CARD_MIN = { 1: MATERIALS.filter((m) => m.block === "A" && !m.optional).reduce((s, m) => s + m.minutes, 0), 2: MATERIALS.filter((m) => m.block === "B" && !m.optional).reduce((s, m) => s + m.minutes, 0) };

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · read the platform, weigh measures", "Level 1 + 2 · die Plattform lesen, Maßnahmen abwägen"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · UX as a business decision", "Level 3 · UX als Geschäftsentscheidung"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Chief UX Officer", "UX Strategy Memo · Chief UX Officer"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d1:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: SkillUp and LearnFast", "Der Fall: SkillUp und LearnFast") },
          blk("1.1", tt("Eight findings: Orientation, Understanding, Motivation", "Acht Befunde: Orientierung, Verständnis, Motivation"), "b11"),
          blk("1.2", tt("What the 40% shows and does not show", "Was die 40 % zeigen und was nicht"), "b12"),
          blk("1.3", tt("Coaching reflection", "Coaching-Reflexion"), "b13"),
          blk("2.1", tt("Three main causes", "Drei Hauptursachen"), "b21"),
          blk("2.2", tt("Four measures, rated and ordered", "Vier Maßnahmen, bewertet und geordnet"), "b22"),
          { id: "export-l1l2", short: "Export", title: tt("Export the UX Analysis File", "UX Analysis File exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: SkillUp's Chief UX Officer", "Die Lage: Chief UX Officer von SkillUp") },
        blk("3.1", tt("Vision, three decisions, order", "Vision, drei Entscheidungen, Reihenfolge"), "b31"),
        blk("3.2", tt("Risk, a decision without complete data, how we decide, what you give up", "Risiko, eine Entscheidung ohne vollständige Daten, wie wir entscheiden, worauf Sie verzichten"), "b32"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about reading a learning platform from the learner's side, and then deciding what to do about it. You learn why UX is more than the look of a screen, what a learner needs from a good interface, and how to weigh measures when the budget cannot pay for everything.",
    "Heute geht es darum, eine Lernplattform aus Sicht der Lernenden zu lesen und dann zu entscheiden, was zu tun ist. Sie lernen, warum UX mehr ist als das Aussehen eines Bildschirms, was Lernende von einer guten Oberfläche brauchen und wie man Maßnahmen abwägt, wenn das Budget nicht für alles reicht.",
  ),
  caseLine: t(
    "The case that runs through the day is SkillUp GmbH, an EdTech company with a learning platform called LearnFast. Forty of every hundred learners who start a course do not finish it. The puzzle: the content is there, so why do they leave, and what is worth €50,000 and two months?",
    "Der Fall, der durch den Tag läuft, ist die SkillUp GmbH, ein EdTech-Unternehmen mit der Lernplattform LearnFast. Vierzig von hundert Lernenden, die einen Kurs beginnen, schließen ihn nicht ab. Das Rätsel: Die Inhalte sind da, warum gehen sie also, und was ist 50.000 € und zwei Monate wert?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Analyse and choose", "Analysieren und wählen"),
      question: t("What is wrong on LearnFast's screens, and which four of nine measures belong in a €50,000, two-month budget?", "Was ist auf den LearnFast-Bildschirmen falsch, und welche vier von neun Maßnahmen gehören in ein Budget von 50.000 € und zwei Monaten?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As SkillUp's Chief UX Officer, which three decisions make up your UX strategy for the year, and what do you give up?", "Welche drei Entscheidungen bilden als Chief UX Officer von SkillUp Ihre UX-Strategie für das Jahr, und worauf verzichten Sie?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Tell an experience problem from a surface problem", "Erlebnisprobleme von Oberflächenproblemen unterscheiden"), payoff: t("In any review of a platform or a screen you can say what the user cannot do or feel, instead of arguing about taste.", "Bei jeder Bewertung einer Plattform oder eines Bildschirms können Sie sagen, was die Nutzer nicht können oder fühlen, statt über Geschmack zu streiten.") },
    { route: 1 as RouteNo, skill: t("Sort what is wrong in three plain questions", "Fehler mit drei einfachen Fragen sortieren"), payoff: t("Orientation, understanding and motivation work as a checklist for the next course, tool or intranet page you look at.", "Orientierung, Verständnis und Motivation funktionieren als Checkliste für den nächsten Kurs, das nächste Tool oder die nächste Intranetseite, die Sie prüfen.") },
    { route: 1 as RouteNo, skill: t("Weigh options under a budget", "Optionen unter einem Budget abwägen"), payoff: t("Impact, effort and risk, plus what you do not know, is a method you can use in the next budget meeting, not only here.", "Wirkung, Aufwand und Risiko, plus das, was Sie nicht wissen, ist eine Methode für die nächste Budgetrunde, nicht nur hier.") },
    { route: 2 as RouteNo, skill: t("Argue for UX in business terms", "UX in Geschäftsbegriffen begründen"), payoff: t("You can link a UX decision to completion, retention and engagement, which is the language management listens to.", "Sie können eine UX-Entscheidung mit Completion, Retention und Engagement verbinden, der Sprache, auf die das Management hört.") },
    { route: 2 as RouteNo, skill: t("Decide without enough data", "Entscheiden ohne ausreichende Daten"), payoff: t("State what you decide, what you do not know, when you would reverse it and what you give up. That holds for any decision you cannot fully prove.", "Nennen Sie, was Sie entscheiden, was Sie nicht wissen, wann Sie es zurücknähmen und worauf Sie verzichten. Das gilt für jede Entscheidung, die Sie nicht voll belegen können.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Read the platform, choose the measures", "Die Plattform lesen, die Maßnahmen wählen"),
        blurb: tt("Levels 1 and 2 on one case: eight findings from the learner's side, then four measures within €50,000 and two months.", "Level 1 und 2 an einem Fall: acht Befunde aus Sicht der Lernenden, dann vier Maßnahmen innerhalb von 50.000 € und zwei Monaten."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
        ],
        optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the UX strategy", "Die UX-Strategie entscheiden"),
        blurb: tt("Level 3 in the Chief UX Officer's chair: a vision, three decisions in order, the biggest risk, one decision without complete data, and what you give up.", "Level 3 auf dem Stuhl der Chief UX Officer: eine Vision, drei Entscheidungen in Reihenfolge, das größte Risiko, eine Entscheidung ohne vollständige Daten und worauf Sie verzichten."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };

export { BLOCK_MINUTES };
