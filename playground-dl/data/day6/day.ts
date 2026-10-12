import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day6/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day6/progress";
import type { TaskBlockId } from "@/lib/day6/progress";
import type { RouteNo } from "@/data/course";

/** Day 6 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · personas and user journeys", "Level 1 + 2 · Personas und User Journeys"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · segmentation as a strategy", "Level 3 · Segmentierung als Strategie"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Head of UX Strategy", "UX Strategy Memo · Head of UX Strategy"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d6:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: EduPath, where different users fail in different ways", "Der Fall: EduPath, wo verschiedene Nutzer auf verschiedene Weise scheitern") },
          blk("1.1", tt("Eight research notes and a learner persona", "Acht Recherchenotizen und eine Lernenden-Persona"), "b11"),
          blk("1.2", tt("A journey that ends in drop-out", "Eine Journey, die im Abbruch endet"), "b12"),
          blk("1.3", tt("Coaching reflection", "Coaching-Reflexion"), "b13"),
          blk("2.1", tt("The teacher persona and two journeys", "Die Lehrenden-Persona und zwei Journeys"), "b21"),
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
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: EduPath's Head of UX Strategy", "Die Lage: Head of UX Strategy von EduPath") },
        blk("3.1", tt("Strategic personas, target group and the three biggest problems", "Strategische Personas, Zielgruppe und die drei größten Probleme"), "b31"),
        blk("3.2", tt("The critical journey, the strategy, a decision under uncertainty, what you give up", "Die kritische Journey, die Strategie, eine Entscheidung unter Unsicherheit, worauf Sie verzichten"), "b32"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about making users tangible and following their path. You learn what a persona is and what goes into it, how to tell a useful persona from a cliché, how a user journey shows where an experience breaks, and how to prioritise user segments when their needs conflict and the data is thin.",
    "Heute geht es darum, Nutzer greifbar zu machen und ihrem Weg zu folgen. Sie lernen, was eine Persona ist und was hineingehört, wie man eine brauchbare Persona von einem Klischee unterscheidet, wie eine User Journey zeigt, wo ein Erlebnis bricht, und wie man Nutzersegmente priorisiert, wenn ihre Bedürfnisse kollidieren und die Daten dünn sind.",
  ),
  caseLine: t(
    "The case that runs through the day is EduPath, a learning platform with three kinds of users who fail in different ways: learners drop out because they lack time, teachers find the platform too complicated, and the organisations that buy the courses complain about low usage. The puzzle: which of them do you serve first?",
    "Der Fall, der durch den Tag läuft, ist EduPath, eine Lernplattform mit drei Arten von Nutzern, die auf verschiedene Weise scheitern: Lernende brechen aus Zeitmangel ab, Lehrende finden die Plattform zu kompliziert, und die Organisationen, die die Kurse kaufen, klagen über geringe Nutzung. Das Rätsel: Wen bedienen Sie zuerst?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Describe and choose", "Beschreiben und wählen"),
      question: t("Who is the working professional with little time, where does her path break, and which four of nine measures fit €45,000 and 13 weeks?", "Wer ist die Berufstätige mit wenig Zeit, wo bricht ihr Weg, und welche vier von neun Maßnahmen passen zu 45.000 € und 13 Wochen?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As EduPath's Head of UX Strategy, which segment comes first, where does its journey break, and what do you give up for it?", "Welches Segment kommt als Head of UX Strategy von EduPath zuerst, wo bricht seine Journey, und worauf verzichten Sie dafür?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Write a persona from evidence", "Eine Persona aus Belegen schreiben"), payoff: t("When a team argues about “the user”, a persona with a goal, a problem and a situation, each tied to a source, lets you ask “would this help her?” and get an answer.", "Wenn ein Team über „den Nutzer“ streitet, lässt eine Persona mit Ziel, Problem und Situation, jeweils an eine Quelle gebunden, Sie fragen „Würde das ihr helfen?“ und eine Antwort bekommen.") },
    { route: 1 as RouteNo, skill: t("Tell a useful persona from a cliché", "Eine brauchbare Persona von einem Klischee unterscheiden"), payoff: t("“Which decision would change because of this persona?” is a test you can apply to any persona a supplier or a colleague shows you.", "„Welche Entscheidung würde sich wegen dieser Persona ändern?“ ist ein Test, den Sie auf jede Persona anwenden können, die Ihnen ein Lieferant oder eine Kollegin zeigt.") },
    { route: 1 as RouteNo, skill: t("Read a journey for its lowest point", "Eine Journey auf ihren tiefsten Punkt lesen"), payoff: t("An emotion curve and a pain point per phase show where to act first, in a course, an onboarding process or a customer service path.", "Eine Emotionskurve und ein Pain Point pro Phase zeigen, wo man zuerst ansetzt, in einem Kurs, einem Onboarding-Prozess oder einem Kundenservice-Weg.") },
    { route: 2 as RouteNo, skill: t("Choose a group by size, value and breakage", "Eine Gruppe nach Größe, Wert und Bruchstelle wählen"), payoff: t("Three questions decide which segment gets the money first, and a small group that decides renewals can beat a large one.", "Drei Fragen entscheiden, welches Segment zuerst das Geld bekommt, und eine kleine Gruppe, die über Verlängerungen entscheidet, kann eine große schlagen.") },
    { route: 2 as RouteNo, skill: t("Say who waits, and until when", "Sagen, wer wartet und bis wann"), payoff: t("A strategy that names the group that waits, and gives it a date, keeps trust and survives the next stakeholder meeting.", "Eine Strategie, die die wartende Gruppe nennt und ihr ein Datum gibt, erhält das Vertrauen und übersteht die nächste Stakeholder-Sitzung.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Describe a person and a path, choose the measures", "Eine Person und einen Weg beschreiben, die Maßnahmen wählen"),
        blurb: tt("Levels 1 and 2 on one case: sort eight research notes into the fields of a persona and write the persona, then choose four of nine measures within €45,000 and 13 weeks, name the pain point each answers, rate them and put them in order.", "Level 1 und 2 an einem Fall: acht Recherchenotizen in die Felder einer Persona sortieren und die Persona schreiben, dann vier von neun Maßnahmen innerhalb von 45.000 € und 13 Wochen wählen, den Pain Point nennen, den jede beantwortet, sie bewerten und ordnen."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
        ],
        optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the segmentation strategy", "Die Segmentierungsstrategie entscheiden"),
        blurb: tt("Level 3 in the Head of UX Strategy's chair: two or three strategic personas, the most important target group and its three biggest problems, its most critical journey, three decisions in a priority order, one decision under uncertainty, and what you give up.", "Level 3 auf dem Stuhl der Head of UX Strategy: zwei oder drei strategische Personas, die wichtigste Zielgruppe und ihre drei größten Probleme, ihre kritischste Journey, drei Entscheidungen in einer Prioritätsreihenfolge, eine Entscheidung unter Unsicherheit und worauf Sie verzichten."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };
