import type { DayConfig } from "@/components/day/DayPages";
import { MateriA as D2MateriA, MateriB as D2MateriB } from "@/components/day2/Materi";
import { Task1 as D2Task1 } from "@/components/day2/Task1";
import { Task2 as D2Task2 } from "@/components/day2/Task2";
import { MateriA as D3MateriA, MateriB as D3MateriB } from "@/components/day3/Materi";
import { Task1 as D3Task1 } from "@/components/day3/Task1";
import { Task2 as D3Task2 } from "@/components/day3/Task2";
import { DAY_INTRO as D2_INTRO, ROUTE_CARDS as D2_CARDS, pageNav as d2PageNav, railSections as d2Rail } from "@/data/day2/day";
import { DAY_INTRO as D3_INTRO, ROUTE_CARDS as D3_CARDS, pageNav as d3PageNav, railSections as d3Rail } from "@/data/day3/day";
import { dossierProgress as d2Progress, taskBlocks as d2Blocks } from "@/lib/day2/progress";
import { dossierProgress as d3Progress, taskBlocks as d3Blocks } from "@/lib/day3/progress";
import { tt } from "@/lib/lang";

/**
 * What each day built after Day 1 hands to the shared page frames (components/day/DayPages.tsx). A day is added here when its content module exists;
 * Day 1 keeps its own pages (components/day1/Pages.tsx).
 */
export const DAY2: DayConfig = {
  n: 2,
  heading: () => tt("Day 2 · Platforms in practice, prototyping, testing", "Tag 2 · Plattformen in der Praxis, Prototyping, Testing"),
  intro: D2_INTRO,
  routeCard: D2_CARDS,
  railSections: d2Rail,
  pageNav: d2PageNav,
  MateriA: D2MateriA,
  MateriB: D2MateriB,
  Task1: D2Task1,
  Task2: D2Task2,
  progress: d2Progress,
  taskBlocks: d2Blocks,
  routeHeading: (route) =>
    route === 1
      ? {
          kicker: tt("Day 2 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 2 · Route 1 · Level 1 und 2 · Wissen und Anwendung"),
          h1: tt("Successful platforms, prototyping and testing: compare two platforms, then plan the prototype and the tests", "Erfolgreiche Plattformen, Prototyping und Testing: zwei Plattformen vergleichen, dann Prototyp und Tests planen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (compare platforms, plan prototypes and tests), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (Plattformen vergleichen, Prototypen und Tests planen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 2 · Route 2 · Level 3 · Management decision", "Tag 2 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Innovation as a strategic decision: adaptive learning, a testing strategy, three investments, the risk, and what you give up", "Innovation als strategische Entscheidung: adaptives Lernen, eine Teststrategie, drei Investitionen, das Risiko und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};

export const DAY3: DayConfig = {
  n: 3,
  heading: () => tt("Day 3 · Learning psychology, cognitive load", "Tag 3 · Lernpsychologie, kognitive Belastung"),
  intro: D3_INTRO,
  routeCard: D3_CARDS,
  railSections: d3Rail,
  pageNav: d3PageNav,
  MateriA: D3MateriA,
  MateriB: D3MateriB,
  Task1: D3Task1,
  Task2: D3Task2,
  progress: d3Progress,
  taskBlocks: d3Blocks,
  routeHeading: (route) =>
    route === 1
      ? {
          kicker: tt("Day 3 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 3 · Route 1 · Level 1 und 2 · Wissen und Anwendung"),
          h1: tt("Learning psychology and cognitive load: recognise the overload on the screens, then choose the measures", "Lernpsychologie und kognitive Belastung: die Überlastung auf den Bildschirmen erkennen, dann die Maßnahmen wählen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (recognise the overload, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (die Überlastung erkennen, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 3 · Route 2 · Level 3 · Management decision", "Tag 3 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Learning effectiveness as a strategy: a definition, three measures, the risk, a decision logic, and what you give up", "Lerneffektivität als Strategie: eine Definition, drei Maßnahmen, das Risiko, eine Entscheidungslogik und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};

export const DAY_CONFIGS: Record<number, DayConfig> = { 2: DAY2, 3: DAY3 };
