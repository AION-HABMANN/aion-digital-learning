import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day3/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day3/progress";
import type { TaskBlockId } from "@/lib/day3/progress";
import type { RouteNo } from "@/data/course";

/** Day 3 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · how people learn, cognitive load", "Level 1 + 2 · wie Menschen lernen, kognitive Belastung"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · learning effectiveness as a strategy", "Level 3 · Lerneffektivität als Strategie"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Chief Learning Experience Officer", "UX Strategy Memo · Chief Learning Experience Officer"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d3:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: EduCore, a platform with an overwhelm effect", "Der Fall: EduCore, eine Plattform mit Überforderungseffekt") },
          blk("1.1", tt("Eight facts: Amount, Form, Order and purpose", "Acht Fakten: Menge, Form, Ordnung und Zweck"), "b11"),
          blk("1.2", tt("Reduce the load of a module: three options", "Die Belastung eines Moduls senken: drei Optionen"), "b12"),
          blk("1.3", tt("Coaching reflection", "Coaching-Reflexion"), "b13"),
          blk("2.1", tt("Four causes of overload", "Vier Ursachen der Überlastung"), "b21"),
          blk("2.2", tt("Four improvements, rated and ordered", "Vier Verbesserungen, bewertet und geordnet"), "b22"),
          { id: "export-l1l2", short: "Export", title: tt("Export the UX Analysis File", "UX Analysis File exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: EduCore's Chief Learning Experience Officer", "Die Lage: Chief Learning Experience Officer von EduCore") },
        blk("3.1", tt("Strategy, definition, three measures, order", "Strategie, Definition, drei Maßnahmen, Reihenfolge"), "b31"),
        blk("3.2", tt("Risk, decision logic, a decision without user data, what you give up", "Risiko, Entscheidungslogik, eine Entscheidung ohne Nutzerdaten, worauf Sie verzichten"), "b32"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about how people take in and process information, and how a screen can steer thinking instead of overloading it. You learn how learning works in three steps, what cognitive load is and which part of it design can change, and how to weigh measures that make a lesson lighter without making it useless.",
    "Heute geht es darum, wie Menschen Information aufnehmen und verarbeiten und wie ein Bildschirm das Denken steuern kann, statt zu überlasten. Sie lernen, wie Lernen in drei Schritten abläuft, was kognitive Belastung ist und welchen Teil davon Gestaltung ändern kann, und wie man Maßnahmen abwägt, die eine Lektion leichter machen, ohne sie nutzlos zu machen.",
  ),
  caseLine: t(
    "The case that runs through the day is EduCore, a learning platform for professionals with an overwhelm effect: learners say they do not understand the content and call the platform too complicated. The puzzle: the content is professionally necessary, so what do you reduce, and what must you protect?",
    "Der Fall, der durch den Tag läuft, ist EduCore, eine Lernplattform für Fachkräfte mit Überforderungseffekt: Lernende sagen, sie verstünden den Inhalt nicht, und nennen die Plattform zu kompliziert. Das Rätsel: Der Inhalt ist fachlich nötig, was senken Sie also, und was müssen Sie schützen?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Recognise and choose", "Erkennen und wählen"),
      question: t("Is the overload on EduCore's screens a matter of amount, form or order and purpose, and which four of nine measures fit €40,000 and four weeks?", "Ist die Überlastung auf den Bildschirmen von EduCore eine Frage von Menge, Form oder Ordnung und Zweck, und welche vier von neun Maßnahmen passen zu 40.000 € und vier Wochen?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As EduCore's Chief Learning Experience Officer, what does learning-effective UX mean, which three measures make up your strategy, and what do you give up?", "Was bedeutet lerneffektives UX für Sie als Chief Learning Experience Officer von EduCore, welche drei Maßnahmen bilden Ihre Strategie, und worauf verzichten Sie?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Describe how a screen feels in terms of learning", "Beschreiben, wie sich ein Bildschirm in Begriffen des Lernens anfühlt"), payoff: t("Intake, processing and storage give you words for “I lost track” that you can use when you review a course, a manual or an intranet page.", "Aufnahme, Verarbeitung und Speicherung geben Ihnen Worte für „Ich habe den Faden verloren“, die Sie beim Prüfen eines Kurses, eines Handbuchs oder einer Intranetseite nutzen können.") },
    { route: 1 as RouteNo, skill: t("Tell which kind of load you can change", "Erkennen, welche Art von Belastung man ändern kann"), payoff: t("A complaint like “too complicated” becomes a question: is it the subject, the presentation or the learner's effort to understand? You can ask it about any material you write.", "Eine Klage wie „zu kompliziert“ wird zu einer Frage: Liegt es am Thema, an der Darstellung oder an der Mühe des Verstehens? Sie können sie zu jedem Material stellen, das Sie schreiben.") },
    { route: 1 as RouteNo, skill: t("Use chunking and visual hierarchy", "Chunking und visuelle Hierarchie nutzen"), payoff: t("Short units with one goal and a marked key sentence help in a slide deck, a handout or a screen: wherever someone has to hold something in mind.", "Kurze Einheiten mit einem Ziel und ein markierter Kernsatz helfen in einer Foliensammlung, einem Handout oder auf einem Bildschirm: überall, wo jemand etwas im Kopf behalten muss.") },
    { route: 2 as RouteNo, skill: t("Define success as learning, not as looking simple", "Erfolg als Lernen definieren, nicht als einfach aussehen"), payoff: t("A definition with a learner, a goal, a cost and a proof lets you say no to a change that only looks lighter.", "Eine Definition mit einer Lernenden, einem Ziel, Kosten und einem Beleg lässt Sie Nein zu einer Änderung sagen, die nur leichter aussieht.") },
    { route: 2 as RouteNo, skill: t("Decide without user data", "Ohne Nutzerdaten entscheiden"), payoff: t("State what you decide, what you do not know, when you would reverse it and what you give up. That holds for any decision you cannot fully prove.", "Nennen Sie, was Sie entscheiden, was Sie nicht wissen, wann Sie es zurücknähmen und worauf Sie verzichten. Das gilt für jede Entscheidung, die Sie nicht voll belegen können.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Recognise the overload, choose the measures", "Die Überlastung erkennen, die Maßnahmen wählen"),
        blurb: tt("Levels 1 and 2 on one case: sort eight facts about EduCore's screens, then choose four of nine measures within €40,000 and four weeks, rate them and put them in order.", "Level 1 und 2 an einem Fall: acht Fakten zu EduCores Bildschirmen sortieren, dann vier von neun Maßnahmen innerhalb von 40.000 € und vier Wochen wählen, bewerten und ordnen."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
        ],
        optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the learning-experience strategy", "Die Lernerlebnis-Strategie entscheiden"),
        blurb: tt("Level 3 in the Chief Learning Experience Officer's chair: a strategy to reduce cognitive load, a definition of learning-effective UX, three measures in order, the biggest risk, a decision logic for content, and what you give up.", "Level 3 auf dem Stuhl der Chief Learning Experience Officer: eine Strategie zur Senkung der kognitiven Belastung, eine Definition von lerneffektivem UX, drei Maßnahmen in Reihenfolge, das größte Risiko, eine Entscheidungslogik für Inhalte und worauf Sie verzichten."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };
