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
import { KIT as KIT4 } from "@/components/day4/Free";
import { KIT as KIT5 } from "@/components/day5/Free";
import { KIT as KIT6 } from "@/components/day6/Free";
import { KIT as KIT7 } from "@/components/day7/Free";
import { KIT as KIT8 } from "@/components/day8/Free";
import { KIT as KIT9 } from "@/components/day9/Free";
import { KIT as KIT10 } from "@/components/day10/Free";
import { makeFreeConfig } from "@/components/dayFree/freeDay";
import { SPEC as SPEC4 } from "@/data/day4/free";
import { SPEC as SPEC5 } from "@/data/day5/free";
import { SPEC as SPEC6 } from "@/data/day6/free";
import { SPEC as SPEC7 } from "@/data/day7/free";
import { SPEC as SPEC8 } from "@/data/day8/free";
import { SPEC as SPEC9 } from "@/data/day9/free";
import { SPEC as SPEC10 } from "@/data/day10/free";
import { materialsOf } from "@/data/materialRegistry";
import { GEN_CONFIGS } from "@/components/dayGen/genConfigs";
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
          order: tt("Materi A (five cards) → the UX Analysis task: Block 1.1 and Block 1.2 (Level 1), then the case study, Block 2.1 (Level 2). Every platform and option can be opened and tried. Every section stays open, so you can start anywhere.", "Materi A (fünf Karten) → die Aufgabe UX Analysis: Block 1.1 und Block 1.2 (Level 1), dann die Fallstudie, Block 2.1 (Level 2). Jede Plattform und jede Option lässt sich öffnen und ausprobieren. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 2 · Route 2 · Level 3 · Management decision", "Tag 2 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("A future strategy for the platform: adaptive learning, prototyping and testing, a roadmap, the risk, and one decision under uncertainty", "Eine Zukunftsstrategie für die Plattform: adaptives Lernen, Prototyping und Testen, eine Roadmap, das Risiko und eine Entscheidung unter Unsicherheit"),
          order: tt("Materi B (three cards) → the UX Strategy task: one block with six questions and a memo that builds below. Your desk can be opened and read. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy: ein Block mit sechs Fragen und ein Memo, das darunter entsteht. Ihr Schreibtisch lässt sich öffnen und lesen. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
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
          h1: tt("Learning psychology and cognitive load: recognise the overload on the screens, then decide on the measures", "Lernpsychologie und kognitive Belastung: die Überlastung auf den Bildschirmen erkennen, dann über die Maßnahmen entscheiden"),
          order: tt("Materi A (five cards) → the UX Analysis task: Block 1.1 and Block 1.2 (Level 1), then the case study, Block 2.1 (Level 2). The lesson, the options and the platform can be opened and tried. Every section stays open, so you can start anywhere.", "Materi A (fünf Karten) → die Aufgabe UX Analysis: Block 1.1 und Block 1.2 (Level 1), dann die Fallstudie, Block 2.1 (Level 2). Die Lektion, die Optionen und die Plattform lassen sich öffnen und ausprobieren. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 3 · Route 2 · Level 3 · Management decision", "Tag 3 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Learning effectiveness as a strategy: a strategy, three measures, a definition, the risk, a decision logic, and a decision under uncertainty", "Lerneffektivität als Strategie: eine Strategie, drei Maßnahmen, eine Definition, das Risiko, eine Entscheidungslogik und eine Entscheidung unter Unsicherheit"),
          order: tt("Materi B (three cards) → the UX Strategy task: one block with six questions and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy: ein Block mit sechs Fragen und ein Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};

export const DAY4: DayConfig = makeFreeConfig(SPEC4, KIT4, materialsOf(4));

export const DAY5: DayConfig = makeFreeConfig(SPEC5, KIT5, materialsOf(5));
export const DAY6: DayConfig = makeFreeConfig(SPEC6, KIT6, materialsOf(6));
export const DAY7: DayConfig = makeFreeConfig(SPEC7, KIT7, materialsOf(7));
export const DAY8: DayConfig = makeFreeConfig(SPEC8, KIT8, materialsOf(8));
export const DAY9: DayConfig = makeFreeConfig(SPEC9, KIT9, materialsOf(9));
export const DAY10: DayConfig = makeFreeConfig(SPEC10, KIT10, materialsOf(10));
export const DAY_CONFIGS: Record<number, DayConfig> = { 2: DAY2, 3: DAY3, 4: DAY4, 5: DAY5, 6: DAY6, 7: DAY7, 8: DAY8, 9: DAY9, 10: DAY10, ...GEN_CONFIGS };
