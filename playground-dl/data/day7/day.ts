import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day7/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day7/progress";
import type { TaskBlockId } from "@/lib/day7/progress";
import type { RouteNo } from "@/data/course";

/** Day 7 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · accessibility and inclusive design", "Level 1 + 2 · Barrierefreiheit und inklusives Design"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · inclusion as a strategy", "Level 3 · Inklusion als Strategie"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Chief UX and Accessibility Officer", "UX Strategy Memo · Chief UX and Accessibility Officer"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d7:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: InclusiveLearn, a platform with access problems", "Der Fall: InclusiveLearn, eine Plattform mit Zugangsproblemen") },
          blk("1.1", tt("Eight facts, the groups affected and three improvements", "Acht Fakten, die betroffenen Gruppen und drei Verbesserungen"), "b11"),
          blk("1.2", tt("Integrate or expand: three options", "Integrieren oder erweitern: drei Optionen"), "b12"),
          blk("1.3", tt("Coaching reflection", "Coaching-Reflexion"), "b13"),
          blk("2.1", tt("Four central barriers", "Vier zentrale Barrieren"), "b21"),
          blk("2.2", tt("Four measures, rated and ordered, and three evaluation methods", "Vier Maßnahmen, bewertet und geordnet, und drei Evaluationsmethoden"), "b22"),
          { id: "export-l1l2", short: "Export", title: tt("Export the UX Analysis File", "UX Analysis File exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: InclusiveLearn's Chief UX and Accessibility Officer", "Die Lage: Chief UX and Accessibility Officer von InclusiveLearn") },
        blk("3.1", tt("Strategy, integration and three measures", "Strategie, Integration und drei Maßnahmen"), "b31"),
        blk("3.2", tt("Evaluation system, risk, a decision under uncertainty, what you give up", "Evaluationssystem, Risiko, eine Entscheidung unter Unsicherheit, worauf Sie verzichten"), "b32"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about who a learning platform lets in, and who it quietly shuts out. You learn what accessibility and inclusive design mean, how to sort a barrier by the four principles of the WCAG standard, how plain language and a lower load open a platform to more learners, and how to build quality control into the way a team works, with measures that show whether it works for every group.",
    "Heute geht es darum, wen eine Lernplattform hineinlässt und wen sie unbemerkt ausschließt. Sie lernen, was Barrierefreiheit und inklusives Design bedeuten, wie man eine Barriere nach den vier Prinzipien des WCAG-Standards einordnet, wie einfache Sprache und eine geringere Belastung eine Plattform für mehr Lernende öffnen und wie man Qualitätskontrolle in die Arbeitsweise eines Teams einbaut, mit Messgrößen, die zeigen, ob es für jede Gruppe funktioniert.",
  ),
  caseLine: t(
    "The case that runs through the day is InclusiveLearn, a learning platform whose content is good and whose usage is low: users with impairments drop out, the text is small and pale, a quiz works only with a mouse, and the sign-up speaks in legal sentences. The puzzle: with a limited budget and little time, what do you fix first, and how do you know it worked for everyone?",
    "Der Fall, der durch den Tag läuft, ist InclusiveLearn, eine Lernplattform, deren Inhalt gut und deren Nutzung gering ist: Nutzer mit Einschränkungen brechen ab, der Text ist klein und blass, ein Quiz funktioniert nur mit der Maus, und die Anmeldung spricht in juristischen Sätzen. Das Rätsel: Was beheben Sie bei begrenztem Budget und wenig Zeit zuerst, und woher wissen Sie, dass es für alle funktioniert hat?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Find and choose", "Finden und wählen"),
      question: t("Which principle does each of the eight facts break, which groups does that block, and which four of nine measures fit €50,000 and ten weeks?", "Welches Prinzip verletzt jeder der acht Fakten, welche Gruppen blockiert das, und welche vier von neun Maßnahmen passen zu 50.000 € und zehn Wochen?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As the Chief UX and Accessibility Officer, where is accessibility checked, which three measures come first, how do you measure it by group, and what do you give up?", "Wo wird Barrierefreiheit geprüft, welche drei Maßnahmen kommen zuerst, wie messen Sie pro Gruppe, und worauf verzichten Sie als Chief UX and Accessibility Officer?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Name a barrier by what a learner cannot do", "Eine Barriere danach benennen, was eine Lernende nicht kann"), payoff: t("“Cannot see it, cannot use it, cannot follow it” is a test you can apply to any screen, form or document at your own work, before anyone argues about taste.", "„Kann es nicht sehen, nicht bedienen, nicht nachvollziehen“ ist ein Test, den Sie vor jedem Geschmacksstreit auf jeden Bildschirm, jedes Formular und jedes Dokument an Ihrem Arbeitsplatz anwenden können.") },
    { route: 1 as RouteNo, skill: t("See who is shut out, and who else gains", "Sehen, wer ausgeschlossen ist und wer sonst profitiert"), payoff: t("Captions, contrast and keyboard use help far more people than the group they were made for. Counting all of them makes a request for budget much easier to argue.", "Untertitel, Kontrast und Tastaturbedienung helfen weit mehr Menschen als die Gruppe, für die sie gemacht wurden. Alle mitzuzählen macht eine Budgetanfrage viel leichter zu begründen.") },
    { route: 1 as RouteNo, skill: t("Weigh a fix at the source against a layer on top", "Eine Behebung an der Quelle gegen eine Schicht obendrauf abwägen"), payoff: t("A toolbar that promises automatic compliance is cheap and tempting. Knowing why it hides the problem protects you from buying it.", "Eine Toolbar, die automatische Konformität verspricht, ist billig und verlockend. Zu wissen, warum sie das Problem verdeckt, schützt Sie davor, sie zu kaufen.") },
    { route: 2 as RouteNo, skill: t("Build accessibility into the process, not into a project", "Barrierefreiheit in den Prozess einbauen, nicht in ein Projekt"), payoff: t("A definition of “done”, a standard for authors and a gate for buying tools keep quality from drifting back, in a course, a website or a product.", "Eine Definition von „fertig“, ein Standard für Autoren und ein Tor für den Einkauf von Werkzeugen verhindern, dass die Qualität zurückfällt, in einem Kurs, auf einer Website oder in einem Produkt.") },
    { route: 2 as RouteNo, skill: t("Measure by group, because an average hides who fails", "Pro Gruppe messen, weil ein Durchschnitt verbirgt, wer scheitert"), payoff: t("Task success and drop-out by group, with one method that gives reasons and one that gives counts, show where a service fails, for customers as well as learners.", "Aufgabenerfolg und Abbruch pro Gruppe, mit einer Methode, die Gründe liefert, und einer, die Zahlen liefert, zeigen, wo ein Service scheitert, bei Kunden wie bei Lernenden.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Find the barriers, choose the measures", "Die Barrieren finden, die Maßnahmen wählen"),
        blurb: tt("Levels 1 and 2 on one case: sort eight facts into the principles, name the groups that struggle and write three improvements, then choose four of nine measures within €50,000 and ten weeks, rate them, put them in order and choose three evaluation methods.", "Level 1 und 2 an einem Fall: acht Fakten in die Prinzipien sortieren, die Gruppen nennen, die Schwierigkeiten haben, und drei Verbesserungen schreiben, dann vier von neun Maßnahmen innerhalb von 50.000 € und zehn Wochen wählen, bewerten, ordnen und drei Evaluationsmethoden wählen."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
        ],
        optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the inclusion strategy", "Die Inklusionsstrategie entscheiden"),
        blurb: tt("Level 3 in the Chief UX and Accessibility Officer's chair: a strategy for inclusive UX, where accessibility is checked, three measures in a priority order, an evaluation system, the biggest risk, one decision under uncertainty, and what you give up.", "Level 3 auf dem Stuhl des Chief UX and Accessibility Officer: eine Strategie für inklusive UX, wo Barrierefreiheit geprüft wird, drei Maßnahmen in einer Prioritätsreihenfolge, ein Evaluationssystem, das größte Risiko, eine Entscheidung unter Unsicherheit und worauf Sie verzichten."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };
