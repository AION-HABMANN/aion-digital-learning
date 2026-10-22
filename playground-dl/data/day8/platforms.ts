import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { catalogPages, courseAbout, courseHero, courseOutcomes, courseOutline, footerOf, helpPage, otherCourses, richLessonPages } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 8 · StructLearn as the plan describes it (many colours, no clear structure, several buttons without priority) and the three options of Block 1.2 as the same platform after each
 * measure (DL-STANDARD v1.8): every tile, section and lesson opens a real page. The course, its lessons, the further courses and the help read like a real platform (`courseKit.ts`),
 * the same in every option, so only the named change differs: the loud colours, the six equal buttons and the banners on every page stay where the plan puts them. Nothing here is
 * marked right or wrong, and no figure is printed that the plan does not print.
 */
const COL = ["#E4572E", "#F3A712", "#29A19C", "#7A4DE8", "#D9534F", "#3D7BD9", "#2E9E6B"];
const GREY = "#6B7380";
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const OTHER = () => otherCourses();
const courseNames = () => [COURSE(), ...OTHER().map((o) => o.title)];
const courseKey = (i: number) => (i === 0 ? "course0" : `course${OTHER()[i - 1].id}`);
const LOOK = {};
/** The course page, its lessons and the further courses: the same content in every option. */
const coursePage = (): Blk[] => [...courseHero(LOOK, 3), courseOutline(3, LOOK), ...courseOutcomes(LOOK), ...courseAbout(LOOK)];
const otherPages = (back: string) => catalogPages(LOOK, { go: back, label: tt("Back to the courses", "Zurück zu den Kursen") }, "course");

type Mode = "loud" | "calm" | "icons";
const col = (mode: Mode, i: number) => (mode === "calm" ? GREY : COL[i % COL.length]);
const ICON = ["●", "▲", "■", "◆", "★", "✚"];

/** The six equal buttons of the start page: Start, Courses, My notes, Profile, Offers, News. */
const tiles = (mode: Mode): Blk => ({
  t: "links",
  grid: 3,
  items: [
    { label: tt("Start", "Start"), go: "home" },
    { label: tt("Courses", "Kurse"), go: "courses" },
    { label: tt("My notes", "Meine Notizen"), go: "notes" },
    { label: tt("Profile", "Profil"), go: "profile" },
    { label: tt("Offers", "Angebote"), go: "offers" },
    { label: tt("News", "Neuigkeiten"), go: "news" },
  ].map((x, i) => ({ ...x, label: mode === "icons" ? `${ICON[i]} ${x.label}` : x.label, color: col(mode, i * 2 + 1) })),
});

const banners = (mode: Mode): Blk => ({
  t: "links",
  items: [
    { label: tt("New: spring offers on every course!", "Neu: Frühlingsangebote für jeden Kurs!"), go: "offers", color: col(mode, 0), pulse: mode === "icons" },
    { label: tt("Join our community and get a badge", "Werden Sie Teil unserer Community und erhalten Sie ein Badge"), go: "profile", color: col(mode, 2), pulse: mode === "icons" },
    { label: tt("Tip: complete your profile", "Tipp: Vervollständigen Sie Ihr Profil"), go: "profile", color: col(mode, 3) },
  ].map((x, i) => (mode === "icons" ? { ...x, label: `${["★", "◆", "✚"][i]} ${x.label}` } : x)),
});

/** The look of every page: the same banners and the same six buttons, whatever the page is about. */
const chrome = (mode: Mode): Blk[] => [banners(mode), tiles(mode)];

function simplePages(mode: Mode): Record<string, PPage> {
  const page = (title: string, body: Blk[], noHead = false): PPage => ({ title, crumb: title, blocks: [...(noHead ? [] : [{ t: "h", text: title } as Blk]), ...body, ...chrome(mode)] });
  const withChrome = (pages: Record<string, PPage>) => Object.fromEntries(Object.entries(pages).map(([k, v]) => [k, { ...v, blocks: [...v.blocks, ...chrome(mode)] }]));
  return {
    home: { title: tt("Start", "Start"), blocks: [{ t: "p", text: tt("Welcome back, Mia. What would you like to do today?", "Willkommen zurück, Mia. Was möchten Sie heute tun?") }, { t: "links", items: [{ label: tt(`Continue: ${COURSE()}`, `Weiter: ${COURSE()}`), go: "course0", color: mode === "calm" ? undefined : COL[5] }] }, ...chrome(mode)] },
    courses: page(tt("Courses", "Kurse"), [{ t: "p", text: tt("All courses your company has booked for you.", "Alle Kurse, die Ihr Unternehmen für Sie gebucht hat.") }, { t: "links", items: courseNames().map((c, i) => ({ label: c, go: courseKey(i), color: mode === "calm" ? undefined : COL[(i + 3) % COL.length] })) }]),
    notes: page(tt("My notes", "Meine Notizen"), [{ t: "p", text: tt("Notes you saved in the lessons.", "Notizen, die Sie in den Lektionen gespeichert haben.") }, { t: "list", items: [tt("“Name my own number first.” (Lesson 3)", "„Meine Zahl zuerst nennen.“ (Lektion 3)"), tt("“Prepare the limit.” (Lesson 3)", "„Die Grenze vorbereiten.“ (Lektion 3)"), tt("“Ask what is behind a no.”", "„Fragen, was hinter einem Nein steckt.“")] }]),
    profile: page(tt("Profile", "Profil"), [{ t: "person", name: "Mia Berg", role: tt("Project manager · mia.berg@example.com", "Projektmanagerin · mia.berg@example.com"), text: tt(`Enrolled in: ${COURSE()}`, `Eingeschrieben in: ${COURSE()}`) }, { t: "list", items: [tt("Badges: 2", "Badges: 2"), tt("Language: English", "Sprache: Deutsch")] }, { t: "form", fields: [tt("Name", "Name"), tt("E-mail", "E-Mail")], button: tt("Save", "Speichern"), msg: tt("Saved.", "Gespeichert.") }]),
    offers: page(tt("Offers", "Angebote"), [{ t: "p", text: tt("Spring offers on every course. Ask your team lead to book a course for you.", "Frühlingsangebote für jeden Kurs. Bitten Sie Ihre Teamleitung, einen Kurs für Sie zu buchen.") }, { t: "links", items: courseNames().slice(1).map((c, i) => ({ label: c, go: courseKey(i + 1) })) }]),
    news: page(tt("News", "Neuigkeiten"), [{ t: "list", items: [tt("A new course on presenting starts next month.", "Nächsten Monat startet ein neuer Kurs zum Präsentieren."), tt("The mobile view of the lessons has been updated.", "Die mobile Ansicht der Lektionen wurde überarbeitet."), tt("Certificates can now be downloaded from your profile.", "Zertifikate können jetzt in Ihrem Profil heruntergeladen werden.")] }]),
    course0: page(COURSE(), coursePage(), true),
    ...withChrome(richLessonPages(3, { back: "course0" })),
    ...withChrome(otherPages("courses")),
  };
}

/** StructLearn today: many colours, six equal buttons, banners on every page, no marked place. */
export const today = (): PlatformCfg => ({ name: "StructLearn", start: "home", color: "#7A4DE8", header: () => tt("Offers · News · Help", "Angebote · Neuigkeiten · Hilfe"), pages: simplePages("loud"), footer: footerOf("StructLearn") });

/** Option A · the design simplified visually: colours and banners reduced, buttons quieter; where things are and what they are called stays as it is. */
export const optionA = (): PlatformCfg => ({ name: "StructLearn", start: "home", color: "#3F4A58", pages: simplePages("calm"), footer: footerOf("StructLearn") });

/** Option B · the navigation restructured: sections named after what the learner does, and the menu always marks where the learner is. */
export const optionB = (): PlatformCfg => {
  const sec = (section: string, title: string, blocks: Blk[], crumb?: string): PPage => ({ title, section, crumb: crumb ?? title, blocks: [{ t: "h", text: title }, ...blocks] });
  const learn = tt("Learn", "Lernen");
  return {
    name: "StructLearn",
    start: "learn",
    color: "#3F4A58",
    nav: [{ label: learn, go: "learn" }, { label: tt("Find", "Finden"), go: "find" }, { label: tt("Progress", "Fortschritt"), go: "progress" }, { label: tt("Help", "Hilfe"), go: "help" }],
    pages: {
      learn: sec("learn", tt("Learn", "Lernen"), [{ t: "p", text: tt("Welcome back. Your last course was Negotiation basics, lesson 3.", "Willkommen zurück. Ihr letzter Kurs war Verhandlungsgrundlagen, Lektion 3.") }, { t: "links", grid: 2, items: [{ label: tt("Continue", "Weitermachen"), go: "lesson2", color: COL[1] }, { label: tt("My courses", "Meine Kurse"), go: "mine", color: COL[3] }, { label: tt("Notes", "Notizen"), go: "notes", color: COL[5] }, { label: tt("Offers", "Angebote"), go: "offers", color: COL[0] }] }], `${learn} › ${tt("Overview", "Übersicht")}`),
      mine: sec("learn", tt("My courses", "Meine Kurse"), [{ t: "links", items: [{ label: `${COURSE()} (${tt("lesson 3 of 3", "Lektion 3 von 3")})`, go: "course0" }, { label: tt(`${OTHER()[0].title} (not started)`, `${OTHER()[0].title} (nicht begonnen)`), go: courseKey(1) }] }], `${learn} › ${tt("My courses", "Meine Kurse")}`),
      course0: { title: COURSE(), section: "learn", crumb: `${learn} › ${COURSE()}`, blocks: coursePage() },
      ...Object.fromEntries(Object.entries(otherPages("find")).map(([k, v]) => [k, { ...v, section: "find" }])),
      ...richLessonPages(3, { back: "course0", section: "learn" }),
      notes: sec("learn", tt("Notes", "Notizen"), [{ t: "list", items: [tt("“Name my own number first.”", "„Meine Zahl zuerst nennen.“"), tt("“Prepare the limit.”", "„Die Grenze vorbereiten.“")] }]),
      offers: sec("learn", tt("Offers", "Angebote"), [{ t: "p", text: tt("Spring offers on every course.", "Frühlingsangebote für jeden Kurs.") }]),
      find: sec("find", tt("Find", "Finden"), [{ t: "form", fields: [tt("Topic", "Thema")], button: tt("Search", "Suchen"), msg: tt("Five courses found.", "Fünf Kurse gefunden.") }, { t: "links", items: courseNames().map((c, i) => ({ label: c, go: courseKey(i) })) }]),
      progress: sec("progress", tt("Progress", "Fortschritt"), [{ t: "p", text: tt(`Negotiation basics: lesson 3 of 3. ${OTHER()[0].title}: not started.`, `Verhandlungsgrundlagen: Lektion 3 von 3. ${OTHER()[0].title}: nicht begonnen.`) }, { t: "links", items: [{ label: tt("Continue", "Weitermachen"), go: "lesson2" }] }]),
      help: helpPage({}, "help", [{ t: "note", title: tt("Where things are", "Wo was ist"), text: tt("Find a course under “Find”, continue under “Learn”, see where you are under “Progress”.", "Einen Kurs finden Sie unter „Finden“, weitermachen unter „Lernen“, Ihren Stand sehen Sie unter „Fortschritt“.") }]),
    },
    footer: footerOf("StructLearn"),
  };
};

/** Option C · more visual elements: icons, moving pictures and badges added; the structure stays as it is. */
export const optionC = (): PlatformCfg => ({ name: "StructLearn", start: "home", color: "#7A4DE8", pages: simplePages("icons"), footer: footerOf("StructLearn") });

