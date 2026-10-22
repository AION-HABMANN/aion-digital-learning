import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { lessonKeys } from "@/components/sim/platformKit";
import { accountPage, catalogCards, catalogPages, courseAbout, courseHero, courseOutcomes, footerOf, helpPage, richLessonPages } from "@/components/sim/courseKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the two platforms of Block 1.1 (A with a progress bar, points for tasks and levels; B with only content, no feedback and no progress indicator), GameLearn as it is
 * (points for finishing a screen, a level, a leaderboard) and the three options of Block 1.2 as the same learning platform after each measure (DL-STANDARD v1.7). Every menu
 * entry, lesson and button opens a real page. The course page, the catalogue, the help and the account read like a real platform (`courseKit.ts`). The lessons keep their plain text
 * (two paragraphs) in every version except Option C, because "more interesting content" (an example, a case, a decision) is Option C's own change. Nothing here is marked right or
 * wrong, and no figure is printed that the plan does not print.
 */
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const N = 5;
const titles = () => LESSON_TEXTS().map((l) => l.title);
const doneCount = (v: string[]) => v.filter((k) => k.startsWith("done")).length;
const TASK = () => tt("Task: write your limit for the example offer.", "Aufgabe: Schreiben Sie Ihre Grenze für das Beispielangebot.");
const FINISH = () => tt("Finish task", "Aufgabe beenden");
const levelOf = (points: number) => 1 + Math.floor(points / 20);
const names = [["Jonas K.", 90], ["Mira S.", 60], ["Tomas B.", 30]] as const;

const plainLinks = (): Blk => ({ t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `lesson${i}` })) });

/** The lessons of every version but Option C: the lesson's text in two paragraphs, nothing added. */
const lessonPages = (n: number, o: { back: string; extra?: (i: number) => Blk[] }) => richLessonPages(n, { ...o, plainOnly: true });
/** The course page: its promise and facts, the lesson list the version shows, what you learn, the trainer, reviews and questions. */
const coursePage = (list: Blk[]): PPage => ({ title: COURSE(), section: "course", blocks: [...courseHero({}, N), ...list, ...courseOutcomes({}), ...courseAbout({})] });
/** The pages around the course: the catalogue and its courses, the help and the account. */
const shell = (course = "course"): Record<string, PPage> => ({
  catalog: { title: tt("Catalogue", "Katalog"), crumb: tt("Catalogue", "Katalog"), section: "catalog", blocks: [{ t: "h", text: tt("Course catalogue", "Kurskatalog") }, catalogCards({}, course)] },
  ...catalogPages({}, { go: "catalog", label: tt("Back to the catalogue", "Zurück zum Katalog") }, "cat", "catalog"),
  help: helpPage({}, "help"),
  account: accountPage({}, "account"),
});
const SHELL_NAV = () => [{ label: tt("Catalogue", "Katalog"), go: "catalog" }, { label: tt("Help", "Hilfe"), go: "help" }, { label: tt("Account", "Konto"), go: "account" }];

/** Platform B · only content: no feedback, no progress indicator. */
export const platformB = (): PlatformCfg => ({
  name: "Platform B",
  start: "course",
  color: "#6B7380",
  nav: [{ label: tt("Course", "Kurs"), go: "course" }, ...SHELL_NAV()],
  footer: footerOf("Platform B"),
  pages: { course: coursePage([{ t: "p", text: tt("Read the lessons in order.", "Lesen Sie die Lektionen der Reihe nach.") }, plainLinks()]), ...lessonPages(N, { back: "course" }), ...shell() },
});

/** Platform A · a progress bar, points for tasks and levels. */
export const platformA = (): PlatformCfg => {
  const lp = lessonPages(N, { back: "course", extra: (i) => [{ t: "finish", task: TASK(), label: FINISH(), key: `done${i}`, feedback: [tt("Correct. +10 points.", "Richtig. +10 Punkte."), i + 1 < N ? tt(`Next: lesson ${i + 2}`, `Weiter: Lektion ${i + 2}`) : tt("The last task of the course.", "Die letzte Aufgabe des Kurses.")] }, { t: "progress", label: tt("Tasks done", "Erledigte Aufgaben"), of: lessonKeys(N, "done") }] });
  return {
    name: "Platform A",
    start: "course",
    color: "#4A4458",
    nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Levels", "Level"), go: "levels" }, ...SHELL_NAV()],
    header: (v) => tt(`${doneCount(v) * 10} points · level ${levelOf(doneCount(v) * 10)}`, `${doneCount(v) * 10} Punkte · Stufe ${levelOf(doneCount(v) * 10)}`),
    footer: footerOf("Platform A"),
    pages: {
      course: coursePage([{ t: "progress", label: tt("Tasks done", "Erledigte Aufgaben"), of: lessonKeys(N, "done") }, { t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `lesson${i}`, doneKey: `done${i}` })) }]),
      ...shell(),
      levels: { title: tt("Levels", "Level"), crumb: tt("Levels", "Level"), blocks: [{ t: "h", text: tt("Levels", "Level") }, { t: "table", head: [tt("Level", "Stufe"), tt("From", "Ab")], rows: [["1", tt("0 points", "0 Punkte")], ["2", tt("20 points", "20 Punkte")], ["3", tt("40 points", "40 Punkte")]] }, { t: "links", items: [{ label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      ...lp,
    },
  };
};

/** GameLearn today: points for finishing a screen, a level and a leaderboard; the content is one screen after another. */
export const today = (): PlatformCfg => {
  const screens = Array.from({ length: N }, (_, i) => `s${i}`);
  const lp: Record<string, PPage> = {};
  const texts = richLessonPages(N, { back: "dash", plainOnly: true, noPlace: true });
  titles().slice(0, N).forEach((title, i) => {
    lp[`s${i}`] = { title, crumb: title, blocks: [{ t: "h", text: title }, texts[`lesson${i}`].blocks[1], { t: "links", items: [i + 1 < N ? { label: tt("Next screen: +10 points", "Nächste Seite: +10 Punkte"), go: `s${i + 1}` } : { label: tt("Finish: +10 points", "Beenden: +10 Punkte"), go: "dash" }, { label: tt("Dashboard", "Dashboard"), go: "dash" }] }] };
  });
  const pts = (v: string[]) => screens.filter((k) => v.includes(k)).length * 10;
  return {
    name: "GameLearn",
    start: "dash",
    color: "#7A4DE8",
    nav: [{ label: tt("Dashboard", "Dashboard"), go: "dash" }, { label: tt("Leaderboard", "Rangliste"), go: "board" }, { label: tt("Badges", "Abzeichen"), go: "badges" }, ...SHELL_NAV()],
    header: (v) => tt(`${pts(v)} points · level ${levelOf(pts(v))}`, `${pts(v)} Punkte · Stufe ${levelOf(pts(v))}`),
    footer: footerOf("GameLearn"),
    pages: {
      ...shell("course"),
      course: coursePage([{ t: "p", text: tt("Every finished screen gives 10 points.", "Jede beendete Seite gibt 10 Punkte.") }, { t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l} · +10`, go: `s${i}` })) }]),
      dash: { title: tt("Dashboard", "Dashboard"), blocks: [{ t: "h", text: tt("Your dashboard", "Ihr Dashboard") }, { t: "p", text: tt("Every finished screen gives 10 points.", "Jede beendete Seite gibt 10 Punkte.") }, { t: "progress", label: tt("Screens finished", "Beendete Seiten"), of: screens }, { t: "links", items: [{ label: tt("Continue: screen 1", "Weiter: Seite 1"), go: "s0" }, { label: tt("Leaderboard", "Rangliste"), go: "board" }, { label: tt("Badges", "Abzeichen"), go: "badges" }] }, { t: "sub", text: tt("Your course", "Ihr Kurs") }, { t: "cards", items: [{ title: COURSE(), tag: tt("Communication", "Kommunikation"), text: tt("Prepare a negotiation, open with a clear offer and close with an agreement.", "Eine Verhandlung vorbereiten, mit einem klaren Angebot eröffnen und mit einer Einigung abschließen."), by: "Dr. Katrin Albers", go: "course" }] }] },
      board: { title: tt("Leaderboard", "Rangliste"), crumb: tt("Leaderboard", "Rangliste"), blocks: [{ t: "h", text: tt("Leaderboard", "Rangliste") }, { t: "table", head: [tt("Rank", "Rang"), tt("Name", "Name"), tt("Points", "Punkte")], rows: names.map(([n, p], i) => [String(i + 1), n, String(p)]) }, { t: "p", text: tt("The names are made up. Points count finished screens.", "Die Namen sind erfunden. Punkte zählen beendete Seiten."), size: 12 }, { t: "links", items: [{ label: tt("Back to the dashboard", "Zurück zum Dashboard"), go: "dash" }] }] },
      badges: { title: tt("Badges", "Abzeichen"), crumb: tt("Badges", "Abzeichen"), blocks: [{ t: "h", text: tt("Badges", "Abzeichen") }, { t: "table", head: [tt("Badge", "Abzeichen"), tt("How to get it", "So bekommen Sie es")], rows: [[tt("Explorer", "Entdecker"), tt("Open 3 screens", "3 Seiten öffnen")], [tt("Marathon", "Marathon"), tt("Open 5 screens in a row", "5 Seiten nacheinander öffnen")], [tt("Collector", "Sammler"), tt("Reach 50 points", "50 Punkte erreichen")]] }, { t: "links", items: [{ label: tt("Back to the dashboard", "Zurück zum Dashboard"), go: "dash" }] }] },
      ...lp,
    },
  };
};

const quiz = (q: string, a: string, b: string, why: string): Blk => ({ t: "quiz", q, options: [a, b], right: 0, why });

/** Option A · a points and reward system: points for finished tasks and a page of rewards to redeem. */
export const optionA = (): PlatformCfg => {
  const lp = lessonPages(N, { back: "course", extra: (i) => [{ t: "finish", task: TASK(), label: FINISH(), key: `done${i}`, feedback: [tt("+10 points.", "+10 Punkte.")] }] });
  const rewards: Item[] = [{ label: tt("A profile colour · 20 points", "Eine Profilfarbe · 20 Punkte"), go: "reward" }, { label: tt("A coffee voucher · 40 points", "Ein Kaffeegutschein · 40 Punkte"), go: "reward" }, { label: tt("A book · 50 points", "Ein Buch · 50 Punkte"), go: "reward" }];
  return {
    name: "Platform",
    start: "course",
    color: "#4A4458",
    nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Rewards", "Belohnungen"), go: "rewards" }, ...SHELL_NAV()],
    header: (v) => tt(`${doneCount(v) * 10} points`, `${doneCount(v) * 10} Punkte`),
    footer: footerOf("GameLearn"),
    pages: {
      ...shell(),
      course: coursePage([{ t: "p", text: tt("Every finished task gives 10 points. Points can be redeemed for rewards.", "Jede beendete Aufgabe gibt 10 Punkte. Punkte lassen sich gegen Belohnungen einlösen.") }, { t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `lesson${i}`, doneKey: `done${i}` })) }]),
      rewards: { title: tt("Rewards", "Belohnungen"), crumb: tt("Rewards", "Belohnungen"), blocks: [{ t: "h", text: tt("Rewards", "Belohnungen") }, { t: "links", items: rewards }, { t: "links", items: [{ label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      reward: { title: tt("A reward", "Eine Belohnung"), crumb: tt("Rewards", "Belohnungen"), blocks: [{ t: "h", text: tt("Redeem a reward", "Eine Belohnung einlösen") }, { t: "p", text: tt("Rewards are redeemed with the points on your account. Finish tasks to earn more.", "Belohnungen werden mit den Punkten auf Ihrem Konto eingelöst. Beenden Sie Aufgaben, um mehr zu verdienen.") }, { t: "links", items: [{ label: tt("Back to the rewards", "Zurück zu den Belohnungen"), go: "rewards" }] }] },
      ...lp,
    },
  };
};

/** Option B · visualise learning progress: the objectives mastered, a bar and a line that says what to practise. */
export const optionB = (): PlatformCfg => {
  const objs = [tt("Prepare a limit", "Eine Grenze vorbereiten"), tt("Make a first offer", "Ein erstes Angebot machen"), tt("Trade concessions", "Zugeständnisse tauschen"), tt("Handle a no", "Mit einem Nein umgehen"), tt("Close a deal", "Einen Abschluss erzielen")];
  const lp = lessonPages(N, { back: "course", extra: (i) => [{ t: "finish", task: TASK(), label: FINISH(), key: `done${i}`, feedback: [tt(`Objective mastered: ${objs[i]}.`, `Ziel gemeistert: ${objs[i]}.`), i + 1 < N ? tt(`Next to practise: ${objs[i + 1]}.`, `Als Nächstes üben: ${objs[i + 1]}.`) : tt("All objectives mastered.", "Alle Ziele gemeistert.")] }, { t: "progress", label: tt("Objectives mastered", "Gemeisterte Ziele"), of: lessonKeys(N, "done") }] });
  return {
    name: "Platform",
    start: "course",
    color: "#4A4458",
    nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("My progress", "Mein Fortschritt"), go: "progress" }, ...SHELL_NAV()],
    header: (v) => tt(`${doneCount(v)} of ${N} mastered`, `${doneCount(v)} von ${N} gemeistert`),
    footer: footerOf("GameLearn"),
    pages: {
      ...shell(),
      course: coursePage([{ t: "progress", label: tt("Objectives mastered", "Gemeisterte Ziele"), of: lessonKeys(N, "done") }, { t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `lesson${i}`, doneKey: `done${i}` })) }]),
      progress: { title: tt("My progress", "Mein Fortschritt"), crumb: tt("My progress", "Mein Fortschritt"), blocks: [{ t: "h", text: tt("My progress", "Mein Fortschritt") }, { t: "progress", label: tt("Objectives mastered", "Gemeisterte Ziele"), of: lessonKeys(N, "done") }, { t: "list", items: objs }, { t: "links", items: [{ label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      ...lp,
    },
  };
};

/** Option C · more interesting content, without gamification: a story case through the lessons, with a decision at each step. */
export const optionC = (): PlatformCfg => {
  const lp = richLessonPages(N, {
    back: "course",
    extra: (i) => [
      { t: "note", title: tt("The case", "Der Fall"), text: tt("Kim has to renegotiate a supplier contract. She has two days before the call.", "Kim muss einen Lieferantenvertrag nachverhandeln. Sie hat zwei Tage bis zum Gespräch.") },
      quiz(tt("What does Kim do first?", "Was tut Kim zuerst?"), tt("She writes down her goal and her limit", "Sie schreibt Ziel und Grenze auf"), tt("She waits for the other side's number", "Sie wartet auf die Zahl der Gegenseite"), tt("Her own limit tells her when to walk away; waiting hands the other side the anchor.", "Ihre eigene Grenze sagt ihr, wann sie geht; Warten gibt der Gegenseite den Anker.")),
      ...(i % 2 === 1 ? [quiz(tt("What does she offer in return?", "Was bietet sie im Gegenzug an?"), tt("A longer contract", "Einen längeren Vertrag"), tt("Nothing", "Nichts"), tt("A concession that costs little but matters to them is worth the most.", "Ein Zugeständnis, das wenig kostet, aber ihnen wichtig ist, ist am meisten wert."))] : []),
    ],
  });
  return { name: "Platform", start: "course", color: "#4A4458", nav: [{ label: tt("Course", "Kurs"), go: "course" }, ...SHELL_NAV()], footer: footerOf("GameLearn"), pages: { ...shell(), course: coursePage([{ t: "p", text: tt("Follow Kim through one negotiation. Each lesson has an example from work and ends with a decision.", "Begleiten Sie Kim durch eine Verhandlung. Jede Lektion hat ein Beispiel aus dem Arbeitsalltag und endet mit einer Entscheidung.") }, plainLinks()]), ...lp } };
};
