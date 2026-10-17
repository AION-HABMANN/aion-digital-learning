import type { DayConfig } from "@/components/day/DayPages";
import { MateriA as D2MateriA, MateriB as D2MateriB } from "@/components/day2/Materi";
import { Task1 as D2Task1 } from "@/components/day2/Task1";
import { Task2 as D2Task2 } from "@/components/day2/Task2";
import { MateriA as D3MateriA, MateriB as D3MateriB } from "@/components/day3/Materi";
import { Task1 as D3Task1 } from "@/components/day3/Task1";
import { Task2 as D3Task2 } from "@/components/day3/Task2";
import { MateriA as D4MateriA, MateriB as D4MateriB } from "@/components/day4/Materi";
import { Task1 as D4Task1 } from "@/components/day4/Task1";
import { Task2 as D4Task2 } from "@/components/day4/Task2";
import { MateriA as D5MateriA, MateriB as D5MateriB } from "@/components/day5/Materi";
import { Task1 as D5Task1 } from "@/components/day5/Task1";
import { Task2 as D5Task2 } from "@/components/day5/Task2";
import { MateriA as D6MateriA, MateriB as D6MateriB } from "@/components/day6/Materi";
import { Task1 as D6Task1 } from "@/components/day6/Task1";
import { Task2 as D6Task2 } from "@/components/day6/Task2";
import { MateriA as D7MateriA, MateriB as D7MateriB } from "@/components/day7/Materi";
import { Task1 as D7Task1 } from "@/components/day7/Task1";
import { Task2 as D7Task2 } from "@/components/day7/Task2";
import { DAY_INTRO as D2_INTRO, ROUTE_CARDS as D2_CARDS, pageNav as d2PageNav, railSections as d2Rail } from "@/data/day2/day";
import { DAY_INTRO as D3_INTRO, ROUTE_CARDS as D3_CARDS, pageNav as d3PageNav, railSections as d3Rail } from "@/data/day3/day";
import { DAY_INTRO as D4_INTRO, ROUTE_CARDS as D4_CARDS, pageNav as d4PageNav, railSections as d4Rail } from "@/data/day4/day";
import { DAY_INTRO as D5_INTRO, ROUTE_CARDS as D5_CARDS, pageNav as d5PageNav, railSections as d5Rail } from "@/data/day5/day";
import { dossierProgress as d4Progress, taskBlocks as d4Blocks } from "@/lib/day4/progress";
import { dossierProgress as d5Progress, taskBlocks as d5Blocks } from "@/lib/day5/progress";
import { DAY_INTRO as D6_INTRO, ROUTE_CARDS as D6_CARDS, pageNav as d6PageNav, railSections as d6Rail } from "@/data/day6/day";
import { dossierProgress as d6Progress, taskBlocks as d6Blocks } from "@/lib/day6/progress";
import { DAY_INTRO as D7_INTRO, ROUTE_CARDS as D7_CARDS, pageNav as d7PageNav, railSections as d7Rail } from "@/data/day7/day";
import { dossierProgress as d7Progress, taskBlocks as d7Blocks } from "@/lib/day7/progress";
import { dossierProgress as d2Progress, taskBlocks as d2Blocks } from "@/lib/day2/progress";
import { dossierProgress as d3Progress, taskBlocks as d3Blocks } from "@/lib/day3/progress";
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
          h1: tt("Learning psychology and cognitive load: recognise the overload on the screens, then choose the measures", "Lernpsychologie und kognitive Belastung: die Überlastung auf den Bildschirmen erkennen, dann die Maßnahmen wählen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (recognise the overload, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (die Überlastung erkennen, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 3 · Route 2 · Level 3 · Management decision", "Tag 3 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Learning effectiveness as a strategy: a definition, three measures, the risk, a decision logic, and what you give up", "Lerneffektivität als Strategie: eine Definition, drei Maßnahmen, das Risiko, eine Entscheidungslogik und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};

export const DAY4: DayConfig = {
  n: 4,
  heading: () => tt("Day 4 · Motivation and engagement through design", "Tag 4 · Motivation und Engagement durch Gestaltung"),
  intro: D4_INTRO,
  routeCard: D4_CARDS,
  railSections: d4Rail,
  pageNav: d4PageNav,
  MateriA: D4MateriA,
  MateriB: D4MateriB,
  Task1: D4Task1,
  Task2: D4Task2,
  progress: d4Progress,
  taskBlocks: d4Blocks,
  routeHeading: (route) =>
    route === 1
      ? {
          kicker: tt("Day 4 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 4 · Route 1 · Level 1 und 2 · Wissen und Anwendung"),
          h1: tt("Motivation and engagement: recognise what motivates learners, then choose the measures", "Motivation und Engagement: erkennen, was Lernende motiviert, dann die Maßnahmen wählen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (recognise motivation, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (Motivation erkennen, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 4 · Route 2 · Level 3 · Management decision", "Tag 4 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Engagement as a strategy: a motivation strategy, three measures, how to measure success, the risk, and what you give up", "Engagement als Strategie: eine Motivationsstrategie, drei Maßnahmen, wie der Erfolg gemessen wird, das Risiko und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};

export const DAY5: DayConfig = {
  n: 5,
  heading: () => tt("Day 5 · User-centred UX design", "Tag 5 · Nutzerzentriertes UX-Design"),
  intro: D5_INTRO,
  routeCard: D5_CARDS,
  railSections: d5Rail,
  pageNav: d5PageNav,
  MateriA: D5MateriA,
  MateriB: D5MateriB,
  Task1: D5Task1,
  Task2: D5Task2,
  progress: d5Progress,
  taskBlocks: d5Blocks,
  routeHeading: (route) =>
    route === 1
      ? {
          kicker: tt("Day 5 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 5 · Route 1 · Level 1 und 2 · Wissen und Anwendung"),
          h1: tt("User-centred UX design: take the learner's side, then choose the measures", "Nutzerzentriertes UX-Design: die Seite der Lernenden einnehmen, dann die Maßnahmen wählen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (take the learner's side, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (die Seite der Lernenden einnehmen, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 5 · Route 2 · Level 3 · Management decision", "Tag 5 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("User-centredness as a strategy: the central user needs, three decisions, the conflict of user against business, a decision architecture, and what you give up", "Nutzerzentrierung als Strategie: die zentralen Nutzerbedürfnisse, drei Entscheidungen, der Konflikt zwischen Nutzer und Unternehmen, eine Entscheidungsarchitektur und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};
export const DAY6: DayConfig = {
  n: 6,
  heading: () => tt("Day 6 · Personas and user journeys", "Tag 6 · Personas und User Journeys"),
  intro: D6_INTRO,
  routeCard: D6_CARDS,
  railSections: d6Rail,
  pageNav: d6PageNav,
  MateriA: D6MateriA,
  MateriB: D6MateriB,
  Task1: D6Task1,
  Task2: D6Task2,
  progress: d6Progress,
  taskBlocks: d6Blocks,
  routeHeading: (route) =>
    route === 1
      ? {
          kicker: tt("Day 6 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 6 · Route 1 · Level 1 und 2 · Wissen und Anwendung"),
          h1: tt("Personas and user journeys: describe a person and a path, then choose the measures", "Personas und User Journeys: eine Person und einen Weg beschreiben, dann die Maßnahmen wählen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (describe a person and a path, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (eine Person und einen Weg beschreiben, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 6 · Route 2 · Level 3 · Management decision", "Tag 6 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Segmentation as a strategy: strategic personas, the target group, its critical journey, three decisions, and what you give up", "Segmentierung als Strategie: strategische Personas, die Zielgruppe, ihre kritische Journey, drei Entscheidungen und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};
export const DAY7: DayConfig = {
  n: 7,
  heading: () => tt("Day 7 · Accessibility and inclusive design", "Tag 7 · Barrierefreiheit und inklusive Gestaltung"),
  intro: D7_INTRO,
  routeCard: D7_CARDS,
  railSections: d7Rail,
  pageNav: d7PageNav,
  MateriA: D7MateriA,
  MateriB: D7MateriB,
  Task1: D7Task1,
  Task2: D7Task2,
  progress: d7Progress,
  taskBlocks: d7Blocks,
  routeHeading: (route) =>
    route === 1
      ? {
          kicker: tt("Day 7 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 7 · Route 1 · Level 1 und 2 · Wissen und Anwendung"),
          h1: tt("Accessibility and inclusive design: find the barriers, then choose the measures", "Barrierefreiheit und inklusives Design: die Barrieren finden, dann die Maßnahmen wählen"),
          order: tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (find the barriers, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (die Barrieren finden, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen."),
        }
      : {
          kicker: tt("Day 7 · Route 2 · Level 3 · Management decision", "Tag 7 · Route 2 · Level 3 · Managemententscheidung"),
          h1: tt("Inclusion as a strategy: where accessibility is checked, three measures, an evaluation system, the risk, and what you give up", "Inklusion als Strategie: wo Barrierefreiheit geprüft wird, drei Maßnahmen, ein Evaluationssystem, das Risiko und worauf Sie verzichten"),
          order: tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen."),
        },
};
export const DAY_CONFIGS: Record<number, DayConfig> = { 2: DAY2, 3: DAY3, 4: DAY4, 5: DAY5, 6: DAY6, 7: DAY7, ...GEN_CONFIGS };
