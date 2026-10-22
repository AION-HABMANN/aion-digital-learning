import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { lessonItems, lessonKeys } from "@/components/sim/platformKit";
import { accountPage, catalogCards, catalogPages, courseAbout, courseHero, courseOutcomes, courseOutline, footerOf, helpPage, otherCourses, richLessonPages } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 9 · NavLearn as the plan describes it (many menu items, no clear order, content that is hard to find) and the three options of Block 1.2 as the same platform after each
 * measure (DL-STANDARD v1.8): every menu entry, course and lesson opens a real page. The course, its lessons, the catalogue, the help and the account read like a real platform
 * (`courseKit.ts`); the sixteen menu items in no order and pages that do not say where they sit stay as the plan describes them, and only Option B adds the place of a lesson and the
 * learner's progress. Nothing here is marked right or wrong, and no figure is printed that the plan does not print.
 */
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const OTHER = () => otherCourses();
const courseNames = () => [COURSE(), ...OTHER().map((o) => o.title)];
const courseKey = (i: number) => (i === 0 ? "course0" : `course${OTHER()[i - 1].id}`);
const LESSONS_N = 8;
const LOOK = {};

const courseLinks = (): Item[] => courseNames().map((c, i) => ({ label: c, go: courseKey(i) }));
const coursePages = (extraLessons?: (i: number) => Blk[], section?: string): Record<string, PPage> => {
  const sec = (p: PPage): PPage => (section ? { ...p, section } : p);
  const out: Record<string, PPage> = {
    course0: sec({
      title: COURSE(),
      crumb: section ? `${tt("Learn", "Lernen")} › ${COURSE()}` : undefined,
      blocks: [
        ...courseHero(LOOK, LESSONS_N),
        ...(section ? ([{ t: "progress", label: tt("Lessons done", "Erledigte Lektionen"), of: lessonKeys(LESSONS_N) }, courseOutline(LESSONS_N, LOOK)] as Blk[]) : ([{ t: "links", items: lessonItems(LESSONS_N) }] as Blk[])),
        ...courseOutcomes(LOOK),
        ...courseAbout(LOOK),
      ],
    }),
  };
  const lp = richLessonPages(LESSONS_N, { back: "course0", extra: extraLessons, noPlace: !section });
  Object.entries(lp).forEach(([k, v], i) => {
    out[k] = sec({ ...v, crumb: section ? `${tt("Learn", "Lernen")} › ${COURSE()} › ${tt(`Lesson ${i + 1} of ${LESSONS_N}`, `Lektion ${i + 1} von ${LESSONS_N}`)}` : undefined, blocks: section ? [v.blocks[0], { t: "progress", label: tt("Lessons visited", "Besuchte Lektionen"), of: lessonKeys(LESSONS_N) }, ...v.blocks.slice(1)] : v.blocks });
  });
  Object.assign(out, Object.fromEntries(Object.entries(catalogPages(LOOK, { go: section ? "find" : "library", label: section ? tt("Back to Find", "Zurück zu Finden") : tt("Back to the library", "Zurück zur Bibliothek") }, "course")).map(([k, v]) => [k, sec(v)])));
  return out;
};

type Entry = { key: string; label: string; text: string; links?: Item[] };
/** The sixteen menu items of today, in no order. */
const entries = (): Entry[] => [
  { key: "hub", label: tt("Hub", "Hub"), text: tt("Your news and a few suggestions.", "Ihre Neuigkeiten und ein paar Vorschläge."), links: [{ label: tt("Negotiation basics, lesson 3", "Verhandlungsgrundlagen, Lektion 3"), go: "lesson2" }] },
  { key: "library", label: tt("Library", "Bibliothek"), text: tt("All courses your company offers.", "Alle Kurse, die Ihr Unternehmen anbietet.") },
  { key: "learning", label: tt("Learning", "Lernen"), text: tt("Lessons you have started. Negotiation basics: lesson 3.", "Lektionen, die Sie begonnen haben. Verhandlungsgrundlagen: Lektion 3."), links: [{ label: tt("Open lesson 3", "Lektion 3 öffnen"), go: "lesson2" }] },
  { key: "mystuff", label: tt("My stuff", "Meine Sachen"), text: tt("Notes, bookmarks and things you saved.", "Notizen, Lesezeichen und Dinge, die Sie gespeichert haben.") },
  { key: "coursesold", label: tt("Courses (old)", "Kurse (alt)"), text: tt("The list of courses as it was last year.", "Die Kursliste, wie sie letztes Jahr war."), links: courseLinks() },
  { key: "atlas", label: tt("Atlas", "Atlas"), text: tt("A map of topics. Pick a topic to see related courses.", "Eine Landkarte der Themen. Wählen Sie ein Thema, um verwandte Kurse zu sehen."), links: [{ label: tt("Negotiating", "Verhandeln"), go: "course0" }, { label: tt("Planning", "Planen"), go: courseKey(4) }, { label: tt("Communicating", "Kommunizieren"), go: courseKey(1) }] },
  { key: "records", label: tt("Records", "Nachweise"), text: tt("Your completed courses and your certificates.", "Ihre abgeschlossenen Kurse und Ihre Zertifikate."), links: [{ label: tt(`${OTHER()[2].title} · certificate`, `${OTHER()[2].title} · Zertifikat`), go: courseKey(3) }] },
  { key: "offers", label: tt("Offers", "Angebote"), text: tt("Spring offers on every course.", "Frühlingsangebote für jeden Kurs.") },
  { key: "community", label: tt("Community", "Community"), text: tt("Questions and answers from other learners.", "Fragen und Antworten anderer Lernender."), links: [{ label: tt("How do I prepare my limit?", "Wie bereite ich meine Grenze vor?"), go: "lesson3" }] },
  { key: "tools", label: tt("Tools", "Werkzeuge"), text: tt("A calculator, a glossary and a timer.", "Ein Rechner, ein Glossar und ein Timer.") },
  { key: "start", label: tt("Start", "Start"), text: tt("Welcome back. What would you like to do?", "Willkommen zurück. Was möchten Sie tun?"), links: [{ label: tt("Continue: lesson 3", "Weiter: Lektion 3"), go: "lesson2" }] },
  { key: "help", label: tt("Help", "Hilfe"), text: tt("Contact us and read the answers to common questions.", "Kontaktieren Sie uns und lesen Sie die Antworten auf häufige Fragen.") },
  { key: "explore", label: tt("Explore", "Entdecken"), text: tt("New and popular courses.", "Neue und beliebte Kurse."), links: courseLinks().slice(0, 3) },
  { key: "account", label: tt("Account", "Konto"), text: tt("Your details and your settings.", "Ihre Angaben und Ihre Einstellungen.") },
  { key: "archive", label: tt("Archive", "Archiv"), text: tt("Courses you have set aside.", "Kurse, die Sie beiseitegelegt haben."), links: [{ label: courseNames()[2], go: courseKey(2) }] },
  { key: "tracks", label: tt("Tracks", "Pfade"), text: tt("Sets of courses in a fixed order.", "Gruppen von Kursen in fester Reihenfolge."), links: courseLinks().slice(0, 2) },
];

function menuPages(): Record<string, PPage> {
  const out: Record<string, PPage> = {};
  for (const e of entries()) {
    const extra: Blk[] = [];
    if (e.key === "library") extra.push(catalogCards(LOOK, "course0", "course"));
    if (e.key === "help") extra.push(...helpPage(LOOK).blocks.slice(2));
    if (e.key === "account") extra.push(...accountPage(LOOK).blocks.slice(1));
    if (e.key === "mystuff") extra.push({ t: "list", items: [tt("“Name my own number first.”", "„Meine Zahl zuerst nennen.“"), tt("Bookmark: Giving in return", "Lesezeichen: Etwas dafür geben")] });
    if (e.key === "tools") extra.push({ t: "table", head: [tt("Tool", "Werkzeug"), tt("What it does", "Was es tut")], rows: [[tt("Calculator", "Rechner"), tt("Adds and compares figures", "Addiert und vergleicht Zahlen")], [tt("Glossary", "Glossar"), tt("Explains terms", "Erklärt Begriffe")], [tt("Timer", "Timer"), tt("Counts down a study time", "Zählt eine Lernzeit herunter")]] });
    if (e.key === "community") extra.push({ t: "list", items: [tt("Q: How do I prepare my limit?", "F: Wie bereite ich meine Grenze vor?"), tt("A: Write it down before the talk.", "A: Schreiben Sie sie vor dem Gespräch auf.")] });
    if (e.key === "tracks") extra.push({ t: "table", head: [tt("Track", "Pfad"), tt("Courses", "Kurse")], rows: [[tt("Negotiating", "Verhandeln"), `${COURSE()}, ${OTHER()[2].title}`], [tt("Working in projects", "Arbeiten in Projekten"), `${OTHER()[1].title}, ${OTHER()[3].title}`]] });
    out[e.key] = { title: e.label, blocks: [{ t: "h", text: e.label }, { t: "p", text: e.text }, ...(e.links ? ([{ t: "links", items: e.links }] as Blk[]) : []), ...extra] };
  }
  return out;
}

const welcome = (): PPage => ({ title: tt("Welcome", "Willkommen"), blocks: [{ t: "p", text: tt("Welcome. Pick something from the menu.", "Willkommen. Wählen Sie etwas aus dem Menü.") }] });
const menuNav = () => entries().map((e) => ({ label: e.label, go: e.key }));

/** NavLearn today: sixteen menu items in no order, and pages that do not say where they sit. */
export const today = (): PlatformCfg => ({ name: "NavLearn", start: "welcome", color: "#3F4A58", nav: menuNav(), header: () => tt("Learning platform", "Lernplattform"), pages: { welcome: welcome(), ...menuPages(), ...coursePages() }, footer: footerOf("NavLearn") });

const quiz = (q: string, a: string, b: string, why: string): Blk => ({ t: "quiz", q, options: [a, b], right: 0, why });
const tipNote = (n: number): Blk => ({ t: "note", title: tt(`Tip ${n}`, `Tipp ${n}`), text: tt("Tap to reveal.", "Tippen zum Aufdecken."), button: { label: tt(`Tap to reveal tip ${n}`, `Tippen für Tipp ${n}`), msg: tt(`Tip ${n}: read the next paragraph.`, `Tipp ${n}: Lesen Sie den nächsten Absatz.`) } });

/** Option A · more interactions: short quizzes and things to tap in the lessons; the menu and the structure stay as they are. */
export const optionA = (): PlatformCfg => ({
  ...today(),
  pages: {
    ...today().pages,
    ...coursePages((i) => [
      quiz(tt("Quick check: who names the first number?", "Kurzer Check: Wer nennt die erste Zahl?"), tt("You", "Sie"), tt("The other side", "Die andere Seite"), tt("The first number pulls the rest toward it, so name yours first.", "Die erste Zahl zieht den Rest zu sich hin, also nennen Sie Ihre zuerst.")),
      ...(i % 2 === 0 ? [quiz(tt("Quick check: what do you prepare?", "Kurzer Check: Was bereiten Sie vor?"), tt("A limit", "Eine Grenze"), tt("Nothing", "Nichts"), tt("A limit tells you when to walk away.", "Eine Grenze sagt Ihnen, wann Sie gehen."))] : []),
      tipNote((i % 3) + 1),
    ]),
  },
});

/** Option B · a clear learning structure: a few named sections, and each lesson shows where it sits, how far the learner is and what comes next. */
export const optionB = (): PlatformCfg => {
  const sec = (section: string, title: string, blocks: Blk[], crumb?: string): PPage => ({ title, section, crumb: crumb ?? title, blocks: [{ t: "h", text: title }, ...blocks] });
  return {
    name: "NavLearn",
    start: "learn",
    color: "#3F4A58",
    nav: [{ label: tt("Learn", "Lernen"), go: "learn" }, { label: tt("Find", "Finden"), go: "find" }, { label: tt("Progress", "Fortschritt"), go: "progress" }, { label: tt("Help", "Hilfe"), go: "help" }],
    pages: {
      learn: sec("learn", tt("Learn", "Lernen"), [{ t: "p", text: tt("Your course: Negotiation basics, lesson 3 of 8.", "Ihr Kurs: Verhandlungsgrundlagen, Lektion 3 von 8.") }, { t: "links", items: [{ label: tt("Continue: lesson 3", "Weiter: Lektion 3"), go: "lesson2" }, { label: COURSE(), go: "course0" }] }]),
      find: sec("find", tt("Find", "Finden"), [{ t: "form", fields: [tt("Topic", "Thema")], button: tt("Search", "Suchen"), msg: tt("Five courses found.", "Fünf Kurse gefunden.") }, catalogCards(LOOK, "course0", "course")]),
      progress: sec("progress", tt("Progress", "Fortschritt"), [{ t: "progress", label: tt("Lessons visited", "Besuchte Lektionen"), of: lessonKeys(LESSONS_N) }, { t: "links", items: [{ label: tt("Continue: lesson 3", "Weiter: Lektion 3"), go: "lesson2" }] }]),
      help: helpPage(LOOK, "help", [{ t: "note", title: tt("Where things are", "Wo was ist"), text: tt("Find a course under “Find”, continue under “Learn”, see where you are under “Progress”.", "Einen Kurs finden Sie unter „Finden“, weitermachen unter „Lernen“, Ihren Stand sehen Sie unter „Fortschritt“.") }]),
      ...coursePages(undefined, "learn"),
    },
    footer: footerOf("NavLearn"),
  };
};

/** Option C · only the look is improved: colours, type and spacing; the content and the menu stay unchanged. */
export const optionC = (): PlatformCfg => {
  const base = today();
  const pages: Record<string, PPage> = {};
  for (const [k, p] of Object.entries(base.pages)) pages[k] = { ...p, blocks: p.blocks.map((b) => (b.t === "p" ? { ...b, size: 15, leading: 1.75 } : b)) };
  return { ...base, color: "#2B5F8E", pages };
};
