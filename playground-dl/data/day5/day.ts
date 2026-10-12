import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day5/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day5/progress";
import type { TaskBlockId } from "@/lib/day5/progress";
import type { RouteNo } from "@/data/course";

/** Day 5 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · user-centred design", "Level 1 + 2 · nutzerzentriertes Design"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · user-centredness as a strategy", "Level 3 · Nutzerzentrierung als Strategie"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Chief UX Strategist", "UX Strategy Memo · Chief UX Strategist"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d5:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: LearnBase, a feature-heavy platform", "Der Fall: LearnBase, eine featurelastige Plattform") },
          blk("1.1", tt("Goals, frustrations and eight facts", "Ziele, Frustrationen und acht Fakten"), "b11"),
          blk("1.2", tt("User-centredness against business goals", "Nutzerzentrierung gegen Geschäftsziele"), "b12"),
          blk("1.3", tt("Coaching reflection", "Coaching-Reflexion"), "b13"),
          blk("2.1", tt("Four user problems and their causes", "Vier Nutzerprobleme und ihre Ursachen"), "b21"),
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
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: LearnBase's Chief UX Strategist", "Die Lage: Chief UX Strategist von LearnBase") },
        blk("3.1", tt("User needs, three decisions, order and conflict", "Nutzerbedürfnisse, drei Entscheidungen, Reihenfolge und Konflikt"), "b31"),
        blk("3.2", tt("Risk, decision architecture, a decision under uncertainty, what you give up", "Risiko, Entscheidungsarchitektur, eine Entscheidung unter Unsicherheit, worauf Sie verzichten"), "b32"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about designing from the learner's side instead of from the software's. You learn what user-centred and feature-driven mean, how to describe learners by their goals and situations, which three mistakes recur on platforms without user focus, and how to weigh a measure for the learner and for the business at once.",
    "Heute geht es darum, von der Seite der Lernenden zu gestalten statt von der der Software. Sie lernen, was nutzerzentriert und funktionsgetrieben heißt, wie man Lernende über ihre Ziele und Situationen beschreibt, welche drei Fehler auf Plattformen ohne Nutzerfokus immer wiederkehren und wie man eine Maßnahme zugleich für die Lernende und für das Unternehmen abwägt.",
  ),
  caseLine: t(
    "The case that runs through the day is LearnBase, a learning platform with many functions and low usage: learners cannot find the content they need, satisfaction is falling, and management demands growth. The puzzle: the platform has everything, so what is missing?",
    "Der Fall, der durch den Tag läuft, ist LearnBase, eine Lernplattform mit vielen Funktionen und geringer Nutzung: Lernende finden den Inhalt nicht, den sie brauchen, die Zufriedenheit sinkt, und das Management verlangt Wachstum. Das Rätsel: Die Plattform hat alles, was fehlt also?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Take the learner's side and choose", "Die Seite der Lernenden einnehmen und wählen"),
      question: t("What do learners on LearnBase want and what stops them, and which four of nine measures fit €40,000 and 13 weeks?", "Was wollen Lernende auf LearnBase, und was hindert sie, und welche vier von neun Maßnahmen passen zu 40.000 € und 13 Wochen?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As LearnBase's Chief UX Strategist, what are the central user needs, which three decisions make up your strategy, and who decides what goes on the roadmap?", "Was sind als Chief UX Strategist von LearnBase die zentralen Nutzerbedürfnisse, welche drei Entscheidungen bilden Ihre Strategie, und wer entscheidet, was auf die Roadmap kommt?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Ask of any feature which learner task it serves", "Bei jedem Feature fragen, welcher Aufgabe der Lernenden es dient"), payoff: t("When a department proposes a new function, one question (“which task does it serve?”) tells you whether it is a need or only something the software can do.", "Wenn eine Abteilung eine neue Funktion vorschlägt, sagt Ihnen eine Frage („Welcher Aufgabe dient sie?“), ob es ein Bedürfnis ist oder nur etwas, das die Software kann.") },
    { route: 1 as RouteNo, skill: t("Describe users by goal and situation", "Nutzer über Ziel und Situation beschreiben"), payoff: t("A goal as a task and a context of use (device, time, mandatory or voluntary) is a better brief for a designer, a trainer or a supplier than “our users”.", "Ein Ziel als Aufgabe und ein Nutzungskontext (Gerät, Zeit, verpflichtend oder freiwillig) sind ein besserer Auftrag für eine Designerin, einen Trainer oder einen Lieferanten als „unsere Nutzer“.") },
    { route: 1 as RouteNo, skill: t("Spot the three mistakes on any screen", "Die drei Fehler auf jedem Bildschirm erkennen"), payoff: t("Names after the software, too many choices at once, and no sign of where you are are visible on a form, an intranet or a shop as well.", "Namen nach der Software, zu viele Auswahlmöglichkeiten auf einmal und kein Zeichen, wo man ist, sind auch auf einem Formular, einem Intranet oder in einem Shop sichtbar.") },
    { route: 2 as RouteNo, skill: t("Say a user need in business terms", "Ein Nutzerbedürfnis in Geschäftsbegriffen sagen"), payoff: t("“Who, what they want to do, what the company gets” gets a need funded, because management hears its own numbers.", "„Wer, was sie tun wollen, was das Unternehmen bekommt“ bringt ein Bedürfnis durch die Finanzierung, weil das Management seine eigenen Zahlen hört.") },
    { route: 2 as RouteNo, skill: t("Name the conflict and what each side loses", "Den Konflikt und das, was jede Seite verliert, benennen"), payoff: t("A decision that says who gains, who gives up something and how the loss is limited is easier to defend in any stakeholder meeting.", "Eine Entscheidung, die sagt, wer gewinnt, wer etwas aufgibt und wie der Verlust begrenzt wird, lässt sich in jedem Stakeholder-Meeting leichter verteidigen.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Take the learner's side, choose the measures", "Die Seite der Lernenden einnehmen, die Maßnahmen wählen"),
        blurb: tt("Levels 1 and 2 on one case: write your goal as a learner, sort eight facts about LearnBase into three mistakes, say which frustrates you most, then choose four of nine measures within €40,000 and 13 weeks, rate them and put them in order.", "Level 1 und 2 an einem Fall: Ihr Ziel als Lernende aufschreiben, acht Fakten zu LearnBase in drei Fehler sortieren, sagen, welcher Sie am meisten frustriert, dann vier von neun Maßnahmen innerhalb von 40.000 € und 13 Wochen wählen, bewerten und ordnen."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
        ],
        optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the user-centred strategy", "Die nutzerzentrierte Strategie entscheiden"),
        blurb: tt("Level 3 in the Chief UX Strategist's chair: the central user needs, three strategic decisions as a roadmap, the conflict between user and business, the biggest risk, a decision architecture, one decision under uncertainty, and what you give up.", "Level 3 auf dem Stuhl der Chief UX Strategist: die zentralen Nutzerbedürfnisse, drei strategische Entscheidungen als Roadmap, der Konflikt zwischen Nutzer und Unternehmen, das größte Risiko, eine Entscheidungsarchitektur, eine Entscheidung unter Unsicherheit und worauf Sie verzichten."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };
