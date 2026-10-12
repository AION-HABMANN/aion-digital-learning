import { bi, t, tt } from "@/lib/lang";
import { MATERIALS, materialAnchorId } from "@/data/day4/materials";
import type { RailSection } from "@/data/day1/materials";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/day4/progress";
import type { TaskBlockId } from "@/lib/day4/progress";
import type { RouteNo } from "@/data/course";

/** Day 4 · the day's chrome data: rail sections, page map, the home page's intro. Built on call so every text follows the language. */

export function railSections(route: RouteNo): RailSection[] {
  return route === 1
    ? [
        { id: "materi-a", label: "Materi A", sub: tt("Levels 1 + 2 · motivation and design principles", "Level 1 + 2 · Motivation und Gestaltungsprinzipien"), minutes: 60 },
        { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
      ]
    : [
        { id: "materi-b", label: "Materi B", sub: tt("Level 3 · engagement as a strategy", "Level 3 · Engagement als Strategie"), minutes: 60 },
        { id: "task-2", label: "Task 2", sub: tt("UX Strategy Memo · Chief Experience Officer", "UX Strategy Memo · Chief Experience Officer"), minutes: TASK2_MINUTES },
      ];
}

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d4:${m.id}` }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: MotivaLearn, a platform with low retention", "Der Fall: MotivaLearn, eine Plattform mit niedriger Retention") },
          blk("1.1", tt("Eight facts, a preferred platform, three principles", "Acht Fakten, eine bevorzugte Plattform, drei Prinzipien"), "b11"),
          blk("1.2", tt("Choose an engagement strategy: three options", "Eine Engagement-Strategie wählen: drei Optionen"), "b12"),
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
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation: MotivaLearn's Chief Experience Officer", "Die Lage: Chief Experience Officer von MotivaLearn") },
        blk("3.1", tt("Strategy, three measures, how to measure success", "Strategie, drei Maßnahmen, wie der Erfolg gemessen wird"), "b31"),
        blk("3.2", tt("Risk, a decision under uncertainty, who decides, what you give up", "Risiko, eine Entscheidung unter Unsicherheit, wer entscheidet, worauf Sie verzichten"), "b32"),
        { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
        { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ The day's home page (CLAUDE.md #27) */

export const DAY_INTRO = bi({
  about: t(
    "Today is about what makes people keep learning, and how a screen can support that motivation or undermine it. You learn the difference between intrinsic and extrinsic motivation, five design principles that deliver it, what feedback, progress and rewards do, and how to measure whether it works without sliding into manipulation.",
    "Heute geht es darum, was Menschen am Lernen hält und wie ein Bildschirm diese Motivation stützen oder untergraben kann. Sie lernen den Unterschied zwischen intrinsischer und extrinsischer Motivation, fünf Gestaltungsprinzipien, die sie liefern, was Feedback, Fortschritt und Belohnungen bewirken und wie man misst, ob es wirkt, ohne in Manipulation abzurutschen.",
  ),
  caseLine: t(
    "The case that runs through the day is MotivaLearn, a learning platform with low user retention: learners start courses and then drop out, call the content boring, and see no progress. The puzzle: what really motivates them, and which of the measures on the table lasts after a reward would stop?",
    "Der Fall, der durch den Tag läuft, ist MotivaLearn, eine Lernplattform mit niedriger Nutzer-Retention: Lernende beginnen Kurse und brechen dann ab, nennen den Inhalt langweilig und sehen keinen Fortschritt. Das Rätsel: Was motiviert sie wirklich, und welche der Maßnahmen auf dem Tisch wirkt auch dann noch, wenn eine Belohnung wegfiele?",
  ),
  story: [
    {
      route: 1 as RouteNo,
      verb: t("Recognise and choose", "Erkennen und wählen"),
      question: t("Which of two platforms is more motivating and why, and which four of nine measures fit €40,000 and two months?", "Welche von zwei Plattformen motiviert mehr und warum, und welche vier von neun Maßnahmen passen zu 40.000 € und zwei Monaten?"),
      output: t("the UX Analysis File", "die UX Analysis File"),
    },
    {
      route: 2 as RouteNo,
      verb: t("Decide", "Entscheiden"),
      question: t("As MotivaLearn's Chief Experience Officer, how do you build motivation, which three measures make up your strategy, how will you know it works, and what do you give up?", "Wie bauen Sie als Chief Experience Officer von MotivaLearn Motivation auf, welche drei Maßnahmen bilden Ihre Strategie, woran erkennen Sie, dass sie wirkt, und worauf verzichten Sie?"),
      output: t("the UX Strategy Memo", "das UX Strategy Memo"),
    },
  ],
  wiifm: [
    { route: 1 as RouteNo, skill: t("Tell what supports motivation and what only decorates it", "Erkennen, was Motivation stützt und was sie nur schmückt"), payoff: t("Autonomy, competence and relatedness give you three questions to ask of any feature, a course, a training programme or an app you manage.", "Autonomie, Kompetenz und Zugehörigkeit geben Ihnen drei Fragen, die Sie jedem Feature, einem Kurs, einem Trainingsprogramm oder einer App stellen können, die Sie verantworten.") },
    { route: 1 as RouteNo, skill: t("Find the missing principle on a screen", "Das fehlende Prinzip auf einem Bildschirm finden"), payoff: t("A goal, a task, a result and a sign of progress are the four things to look for on any page that is meant to keep someone going.", "Ein Ziel, eine Aufgabe, ein Ergebnis und ein Zeichen von Fortschritt sind die vier Dinge, auf die Sie bei jeder Seite achten können, die jemanden bei der Stange halten soll.") },
    { route: 1 as RouteNo, skill: t("Rate a reward by what remains when it stops", "Eine Belohnung danach bewerten, was bleibt, wenn sie wegfällt"), payoff: t("It stops you from funding badges or points where the real problem is that a learner cannot see progress.", "Es hält Sie davon ab, Badges oder Punkte zu finanzieren, wo das eigentliche Problem ist, dass eine Lernende keinen Fortschritt sieht.") },
    { route: 2 as RouteNo, skill: t("Check ability and prompt before adding motivation", "Können und Impuls prüfen, bevor man Motivation ergänzt"), payoff: t("When a team says people are not motivated, you can ask whether the next step is easy to find and whether anything invites it.", "Wenn ein Team sagt, Menschen seien nicht motiviert, können Sie fragen, ob der nächste Schritt leicht zu finden ist und ob etwas dazu einlädt.") },
    { route: 2 as RouteNo, skill: t("Measure success with a baseline and a control group", "Erfolg mit einer Ausgangslage und einer Kontrollgruppe messen"), payoff: t("A baseline, a target, a method and a date, written before the change, turn “it feels better” into something you can show management.", "Eine Ausgangslage, ein Ziel, eine Methode und ein Termin, vor der Änderung aufgeschrieben, machen aus „es fühlt sich besser an“ etwas, das Sie der Geschäftsführung zeigen können.") },
    { route: 1 as RouteNo, skill: t("Leave with two reusable documents", "Mit zwei wiederverwendbaren Dokumenten gehen"), payoff: t("A UX Analysis File and a UX Strategy Memo. Keep them as templates for your own platform or course.", "Eine UX Analysis File und ein UX Strategy Memo. Behalten Sie sie als Vorlagen für Ihre eigene Plattform oder Ihren eigenen Kurs.") },
  ],
});

export const ROUTE_CARDS = (route: RouteNo) =>
  route === 1
    ? {
        title: tt("Recognise motivation, choose the measures", "Motivation erkennen, die Maßnahmen wählen"),
        blurb: tt("Levels 1 and 2 on one case: sort eight facts about two platforms into four principles, say which is more motivating and why, then choose four of nine measures within €40,000 and two months, rate them and put them in order.", "Level 1 und 2 an einem Fall: acht Fakten zu zwei Plattformen in vier Prinzipien sortieren, sagen, welche mehr motiviert und warum, dann vier von neun Maßnahmen innerhalb von 40.000 € und zwei Monaten wählen, bewerten und ordnen."),
        plan: [
          { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
        ],
        optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
        export: "UX Analysis File",
      }
    : {
        title: tt("Decide the engagement strategy", "Die Engagement-Strategie entscheiden"),
        blurb: tt("Level 3 in the Chief Experience Officer's chair: a motivation strategy, three prioritised measures, how you will measure success, the biggest risk, a decision architecture, one decision under uncertainty, and what you give up.", "Level 3 auf dem Stuhl der Chief Experience Officer: eine Motivationsstrategie, drei priorisierte Maßnahmen, wie Sie den Erfolg messen, das größte Risiko, eine Entscheidungsarchitektur, eine Entscheidung unter Unsicherheit und worauf Sie verzichten."),
        plan: [
          { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
          { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
        ],
        optional: "",
        export: "UX Strategy Memo",
      };
