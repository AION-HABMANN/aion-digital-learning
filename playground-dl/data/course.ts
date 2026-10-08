import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * The course registry: one Next.js project holds every day (CLAUDE.md #49). A day is built when its content module exists
 * (`components/dayN`, `data/dayN`, `lib/dayN`) and it is listed here with `built: true`; a day that is not built yet still has its
 * page (a placeholder, CLAUDE.md #12), so the shape of the site never changes when a day is filled in.
 *
 * Topics are the plan's own (One Stop Digital Learning - Strukturplan 11_F_128, sheets Deutsch and English).
 */
export const COURSE = bi({
  site: t("Learning UX Lab", "Learning UX Lab"),
  course: t("Digital Training and Learning Systems · Educational UX/UI Design", "Digitale Trainings- und Lernsysteme · Edukatives UX/UI-Design"),
  provider: "Habmann AufstiegsAkademie",
});

type DayDef = { n: number; module: Tx; part: Tx; short: Tx; topic: Tx; built?: boolean };

const DAY_DEFS: DayDef[] = [
  { n: 1, built: true, module: t("Module 1", "Modul 1"), part: t("Day 1 of 2", "Tag 1 von 2"), short: t("UX/UI for learning platforms", "UX/UI für Lernplattformen"), topic: t("Fundamentals of UX/UI design for digital learning platforms and user-centred design of learning interfaces", "Grundlagen des UX/UI-Designs für digitale Lernplattformen und nutzerzentrierte Gestaltung von Lerninterfaces") },
  { n: 2, module: t("Module 1", "Modul 1"), part: t("Day 2 of 2", "Tag 2 von 2"), short: t("Platforms in practice, prototyping, testing", "Plattformen in der Praxis, Prototyping, Testing"), topic: t("Practical analysis of successful e-learning platforms, prototyping and testing of learning interfaces, future technologies and adaptive learning systems", "Praxisanalyse erfolgreicher E-Learning-Plattformen, Prototyping und Testing von Lerninterfaces, Zukunftstechnologien und adaptive Lernsysteme") },
  { n: 3, module: t("Module 2", "Modul 2"), part: t("Day 1 of 2", "Tag 1 von 2"), short: t("Learning psychology, cognitive load", "Lernpsychologie, kognitive Belastung"), topic: t("Fundamentals of learning psychology for UX designers, cognitive load and information processing", "Grundlagen der Lernpsychologie für UX-Designer, kognitive Belastung und Informationsverarbeitung") },
  { n: 4, module: t("Module 2", "Modul 2"), part: t("Day 2 of 2", "Tag 2 von 2"), short: t("Motivation and design principles", "Motivation und Designprinzipien"), topic: t("Motivation and engagement through design psychology, design principles for effective learning experiences, evaluation and optimisation", "Motivation und Engagement durch Design Psychology, Designprinzipien für effektive Lernerfahrungen, Evaluation und Optimierung") },
  { n: 5, module: t("Module 3", "Modul 3"), part: t("Day 1 of 3", "Tag 1 von 3"), short: t("User-centred UX design", "Nutzerzentriertes UX-Design"), topic: t("Fundamentals of user-centred UX design for learning platforms", "Grundlagen des nutzerzentrierten UX-Designs für Lernplattformen") },
  { n: 6, module: t("Module 3", "Modul 3"), part: t("Day 2 of 3", "Tag 2 von 3"), short: t("Personas and user journeys", "Personas und User Journeys"), topic: t("Developing personas for learners and teachers and mapping user journeys in the learning context", "Entwicklung von Personas für Lernende und Lehrende und Mapping von User Journeys im Lernkontext") },
  { n: 7, module: t("Module 3", "Modul 3"), part: t("Day 3 of 3", "Tag 3 von 3"), short: t("Accessibility and inclusive design", "Barrierefreiheit und inklusive Gestaltung"), topic: t("Accessibility and inclusive design of learning platforms, integration and evaluation of user-centred UX concepts", "Barrierefreiheit und inklusive Gestaltung von Lernplattformen, Integration und Evaluation nutzerzentrierter UX-Konzepte") },
  { n: 8, module: t("Module 4", "Modul 4"), part: t("Day 1 of 3", "Tag 1 von 3"), short: t("UX/UI basics: structure and hierarchy", "UX/UI-Grundlagen: Struktur und Hierarchie"), topic: t("Fundamentals of UX/UI design for digital learning environments: structure, visual hierarchy, interaction", "Grundlagen der UX/UI-Gestaltung für digitale Lernumgebungen: Struktur, visuelle Hierarchie, Interaktion") },
  { n: 9, module: t("Module 4", "Modul 4"), part: t("Day 2 of 3", "Tag 2 von 3"), short: t("Information architecture and interaction", "Informationsarchitektur und Interaktion"), topic: t("Information architecture and navigation in learning platforms, interactive elements and engagement strategies", "Informationsarchitektur und Navigation in Lernplattformen, interaktive Elemente und Engagement-Strategien") },
  { n: 10, module: t("Module 4", "Modul 4"), part: t("Day 3 of 3", "Tag 3 von 3"), short: t("Feedback, progress, responsive design", "Feedback, Fortschritt, Responsive Design"), topic: t("Visual feedback and progress tracking systems, responsive design and accessibility for learning platforms", "Visuelles Feedback und Progress-Tracking-Systeme, Responsive Design und Accessibility für Lernplattformen") },
  { n: 11, module: t("Module 5", "Modul 5"), part: t("Day 1 of 2", "Tag 1 von 2"), short: t("Gamification and motivation theories", "Gamification und Motivationstheorien"), topic: t("Fundamentals of gamification in UX design, psychological foundations and motivation theories", "Grundlagen der Gamification im UX-Design, psychologische Grundlagen und Motivationstheorien") },
  { n: 12, module: t("Module 5", "Modul 5"), part: t("Day 2 of 2", "Tag 2 von 2"), short: t("Adaptive learning, a gamified prototype", "Adaptives Lernen, ein gamifizierter Prototyp"), topic: t("Adaptive learning systems, UX design patterns for personalised learning paths, practical project: prototype a gamified learning platform", "Adaptive Learning-Systeme, UX-Design-Patterns für personalisierte Lernwege, Praxisprojekt: gamifizierte Lernplattform prototypisieren") },
  { n: 13, module: t("Module 6", "Modul 6"), part: t("Day 1 of 2", "Tag 1 von 2"), short: t("Inclusive UX/UI and WCAG", "Inklusives UX/UI und WCAG"), topic: t("Fundamentals of inclusive UX/UI design for learning platforms, accessibility in practice: WCAG standards", "Grundlagen inklusiven UX/UI-Designs für Lernplattformen, Barrierefreiheit in der Praxis: WCAG-Standards") },
  { n: 14, module: t("Module 6", "Modul 6"), part: t("Day 2 of 2", "Tag 2 von 2"), short: t("Plain language, usability, testing", "Einfache Sprache, Usability, Testing"), topic: t("Plain language and clear communication, intuitive learning environments, testing and optimisation of inclusive design solutions", "Einfache Sprache und verständliche Kommunikation, intuitive Lernumgebungen, Testing und Optimierung inklusiver Designlösungen") },
  { n: 15, module: t("Module 7", "Modul 7"), part: t("1 day", "1 Tag"), short: t("Mobile learning UX", "Mobile-Learning-UX"), topic: t("Fundamentals of mobile learning UX, microlearning design, responsive design, cross-device optimisation and testing", "Grundlagen Mobile Learning UX, Microlearning-Design, Responsive Design, Cross-Device-Optimierung und Testing") },
  { n: 16, module: t("Module 8", "Modul 8"), part: t("1 day", "1 Tag"), short: t("UX testing, analytics and KPIs", "UX-Testing, Analytics und KPIs"), topic: t("Fundamentals of UX testing, analytics tools and tracking, KPIs and metrics, data analysis and data-driven optimisation", "Grundlagen des UX-Testings, Analyse-Tools und Tracking, KPIs und Metriken, Datenanalyse und datengetriebene Optimierung") },
];

export const DAYS = bi(DAY_DEFS);
export type DayMeta = (typeof DAYS)[number];
export const dayOf = (n: number): DayMeta | undefined => DAYS.find((d) => d.n === n);

/** The two routes of every day (CLAUDE.md #30). */
export type RouteNo = 1 | 2;
export const ROUTE_LEVEL = bi({
  1: t("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"),
  2: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
});

/** `/day/1/route-2/#id` */
export const routeHref = (day: number, route: RouteNo) => `/day/${day}/route-${route}/`;
export const dayHref = (day: number) => `/day/${day}/`;

/** The day and route a pathname points at, for the top bar and the mentor bar. */
export function parsePath(pathname: string): { day: number | null; route: RouteNo | null } {
  const m = pathname.match(/^\/day\/(\d+)(?:\/route-([12]))?/);
  if (!m) return { day: null, route: null };
  return { day: Number(m[1]), route: m[2] ? (Number(m[2]) as RouteNo) : null };
}
