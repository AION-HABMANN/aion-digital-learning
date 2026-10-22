import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { lessonKeys } from "@/components/sim/platformKit";
import { accountPage, catalogCards, catalogPages, courseAbout, courseHero, courseOutcomes, footerOf, helpPage, richLessonPages } from "@/components/sim/courseKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 10 · TrackLearn as the plan describes it (no progress bar, no response to completed tasks, an unclear learning status), the same platform on a phone (the case study: high
 * mobile use, poor UX) and the three options of Block 1.2 as the same course after each measure (DL-STANDARD v1.8): every lesson opens and every button leads somewhere real. The one
 * button that stays silent is the plan's own clue: a finished task gets no response. The course page, the lessons, the catalogue, the help and the account read like a real platform
 * (`courseKit.ts`), but nothing outside Option A shows the learner's place or progress (no "lesson 3 of 8", no ticks), because that is what the plan says is missing. Nothing here is
 * marked right or wrong, and no figure is printed that the plan does not print.
 */
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const N = 8;
const TASK = () => tt("Task: write your limit for the example offer.", "Aufgabe: Schreiben Sie Ihre Grenze für das Beispielangebot.");
const FINISH = () => tt("Finish task", "Aufgabe beenden");
const titles = () => LESSON_TEXTS().map((l) => l.title);

const plainItems = (size?: number): Blk => ({ t: "links", size, items: titles().slice(0, N).map((l, i) => ({ label: l, go: `lesson${i}` })) });

/** The pages around the course that every version has: the catalogue, its courses, the help and the account. */
const shell = (size?: number): Record<string, PPage> => ({
  catalog: { title: tt("Catalogue", "Katalog"), crumb: tt("Catalogue", "Katalog"), section: "catalog", blocks: [{ t: "h", text: tt("Course catalogue", "Kurskatalog") }, catalogCards({ size }, "course")] },
  ...catalogPages({ size }, { go: "catalog", label: tt("Back to the catalogue", "Zurück zum Katalog") }, "cat", "catalog"),
  help: helpPage({ size }, "help"),
  account: accountPage({ size }, "account"),
});
const NAV = () => [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Catalogue", "Katalog"), go: "catalog" }, { label: tt("Help", "Hilfe"), go: "help" }, { label: tt("Account", "Konto"), go: "account" }];
/** The course page: its promise, the lesson list the version shows, what you learn, the trainer and the questions. */
const coursePage = (list: Blk[], size?: number): PPage => ({ title: COURSE(), section: "course", blocks: [...courseHero({ size }, N), ...list, ...courseOutcomes({ size }), ...courseAbout({ size })] });

/** TrackLearn today: eight lessons that look alike, a task that answers with nothing, and no sign of progress. */
export const today = (phone = false): PlatformCfg => {
  const size = phone ? 11 : undefined;
  const lp = richLessonPages(N, {
    back: "course",
    size,
    noPlace: true,
    section: "course",
    extra: () => [{ t: "form", fields: [tt("Your limit", "Ihre Grenze")], button: FINISH(), msg: "" }],
  });
  return {
    name: "TrackLearn",
    start: "course",
    color: "#3F4A58",
    phone,
    header: () => (phone ? tt("On a phone", "Auf dem Handy") : tt("Learning platform", "Lernplattform")),
    nav: NAV(),
    footer: footerOf("TrackLearn"),
    pages: { course: coursePage([{ t: "sub", text: tt("Lessons", "Lektionen"), size }, plainItems(size)], size), ...lp, ...shell(size) },
  };
};

const doneItems = (): Item[] => titles().slice(0, N).map((l, i) => ({ label: l, go: `lesson${i}`, doneKey: `done${i}` }));

/** Option A · a progress indicator: how many lessons are done, a status on each lesson and a bar; pages and layout stay as they are. */
export const optionA = (): PlatformCfg => {
  const lp = richLessonPages(N, { back: "course", section: "course", extra: (i) => [{ t: "finish", task: TASK(), label: FINISH(), key: `done${i}` }, { t: "progress", label: tt("Lessons done", "Erledigte Lektionen"), of: lessonKeys(N, "done") }] });
  return {
    name: "TrackLearn",
    start: "course",
    color: "#3F4A58",
    header: (v) => tt(`${v.filter((k) => k.startsWith("done")).length} of ${N} done`, `${v.filter((k) => k.startsWith("done")).length} von ${N} erledigt`),
    nav: NAV(),
    footer: footerOf("TrackLearn"),
    pages: { course: coursePage([{ t: "progress", label: tt("Lessons done", "Erledigte Lektionen"), of: lessonKeys(N, "done") }, { t: "links", items: doneItems() }]), ...lp, ...shell() },
  };
};

/** Option B · optimised for mobile: one large main button, text that fits the width, the main action first. */
export const optionB = (): PlatformCfg => {
  const lp = richLessonPages(N, { back: "course", size: 14, leading: 1.6, noPlace: true, section: "course" });
  const pages: Record<string, PPage> = {};
  for (const [k, p] of Object.entries(lp)) {
    const i = Number(k.replace("lesson", ""));
    const next = i + 1 < N ? `lesson${i + 1}` : "course";
    const label = i + 1 < N ? tt(`Continue: lesson ${i + 2}`, `Weiter: Lektion ${i + 2}`) : tt("Back to the course", "Zurück zum Kurs");
    pages[k] = { ...p, blocks: [{ t: "links", size: 15, items: [{ label, go: next, color: "#3F4A58" }] }, ...p.blocks.slice(0, -1), { t: "finish", task: TASK(), label: FINISH(), big: true }] };
  }
  return {
    name: "TrackLearn",
    start: "course",
    color: "#3F4A58",
    phone: true,
    nav: NAV(),
    footer: footerOf("TrackLearn"),
    pages: { course: { ...coursePage([plainItems(14)], 14), blocks: [{ t: "links", size: 15, items: [{ label: tt("Continue: lesson 3", "Weiter: Lektion 3"), go: "lesson2", color: "#3F4A58" }] }, ...coursePage([plainItems(14)], 14).blocks] }, ...pages, ...shell(14) },
  };
};

/** Option C · a detailed feedback system: after each task a saved note, an assessment, a tip, a badge and a count of the day; the layout stays as it is. */
export const optionC = (): PlatformCfg => {
  const feedback = () => [
    tt("Task saved. Well done for finishing.", "Aufgabe gespeichert. Gut gemacht, dass Sie fertig sind."),
    tt("Your limit is lower than the usual range for this kind of offer.", "Ihre Grenze liegt unter dem üblichen Bereich für diese Art Angebot."),
    tt("Tip: name your own number first.", "Tipp: Nennen Sie Ihre Zahl zuerst."),
    tt("Badge earned: First task.", "Abzeichen erhalten: Erste Aufgabe."),
    tt("You have finished 1 task today.", "Sie haben heute 1 Aufgabe beendet."),
  ];
  const lp = richLessonPages(N, { back: "course", noPlace: true, section: "course", extra: () => [{ t: "finish", task: TASK(), label: FINISH(), feedback: feedback() }] });
  return { name: "TrackLearn", start: "course", color: "#3F4A58", nav: NAV(), footer: footerOf("TrackLearn"), pages: { course: coursePage([{ t: "sub", text: tt("Lessons", "Lektionen") }, plainItems()]), ...lp, ...shell() } };
};
