import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { lessonItems, lessonPages } from "@/components/sim/platformKit";
import { tt } from "@/lib/lang";

/**
 * Day 8 · StructLearn as the plan describes it (many colours, no clear structure, several buttons without priority) and the three options of Block 1.2 as the same platform after each
 * measure (DL-STANDARD v1.7): every tile, section and lesson opens a real page. Nothing here is marked right or wrong, and no figure is printed that the plan does not print.
 */
const COL = ["#E4572E", "#F3A712", "#29A19C", "#7A4DE8", "#D9534F", "#3D7BD9", "#2E9E6B"];
const GREY = "#6B7380";
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const courseNames = () => [COURSE(), tt("Project planning", "Projektplanung"), tt("Presenting", "Präsentieren"), tt("Teamwork", "Teamarbeit")];

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
  const page = (title: string, body: Blk[]): PPage => ({ title, crumb: title, blocks: [{ t: "h", text: title }, ...body, ...chrome(mode)] });
  const out: Record<string, PPage> = {
    home: { title: tt("Start", "Start"), blocks: [{ t: "p", text: tt("Welcome back. What would you like to do?", "Willkommen zurück. Was möchten Sie tun?") }, ...chrome(mode)] },
    courses: page(tt("Courses", "Kurse"), [{ t: "links", items: courseNames().map((c, i) => ({ label: c, go: `course${i}`, color: mode === "calm" ? undefined : COL[(i + 3) % COL.length] })) }]),
    notes: page(tt("My notes", "Meine Notizen"), [{ t: "list", items: [tt("“Name my own number first.”", "„Meine Zahl zuerst nennen.“"), tt("“Prepare the limit.”", "„Die Grenze vorbereiten.“")] }]),
    profile: page(tt("Profile", "Profil"), [{ t: "p", text: tt("Your details and your badges.", "Ihre Angaben und Ihre Badges.") }, { t: "list", items: ["Mia Berg · mia.berg@example.com", tt("Badges: 2", "Badges: 2")] }]),
    offers: page(tt("Offers", "Angebote"), [{ t: "p", text: tt("Spring offers on every course.", "Frühlingsangebote für jeden Kurs.") }]),
    news: page(tt("News", "Neuigkeiten"), [{ t: "p", text: tt("A new course on presenting starts next month.", "Nächsten Monat startet ein neuer Kurs zum Präsentieren.") }]),
    course0: page(COURSE(), [{ t: "p", text: tt("Negotiation basics: preparing, offering, agreeing. This course has three lessons.", "Verhandlungsgrundlagen: vorbereiten, anbieten, einigen. Dieser Kurs hat drei Lektionen.") }, { t: "links", items: lessonItems(3) }]),
    ...lessonPages(3, { back: "course0" }),
  };
  courseNames().slice(1).forEach((c, k) => {
    out[`course${k + 1}`] = page(c, [{ t: "p", text: tt(`${c}: a short course. It has not been started yet.`, `${c}: ein kurzer Kurs. Er wurde noch nicht begonnen.`) }]);
  });
  return out;
}

/** StructLearn today: many colours, six equal buttons, banners on every page, no marked place. */
export const today = (): PlatformCfg => ({ name: "StructLearn", start: "home", color: "#7A4DE8", header: () => tt("Offers · News · Help", "Angebote · Neuigkeiten · Hilfe"), pages: simplePages("loud") });

/** Option A · the design simplified visually: colours and banners reduced, buttons quieter; where things are and what they are called stays as it is. */
export const optionA = (): PlatformCfg => ({ name: "StructLearn", start: "home", color: "#3F4A58", pages: simplePages("calm") });

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
      mine: sec("learn", tt("My courses", "Meine Kurse"), [{ t: "links", items: [{ label: `${COURSE()} (${tt("lesson 3 of 8", "Lektion 3 von 8")})`, go: "course0" }, { label: tt("Project planning (not started)", "Projektplanung (nicht begonnen)"), go: "course1" }] }], `${learn} › ${tt("My courses", "Meine Kurse")}`),
      course0: sec("learn", COURSE(), [{ t: "links", items: lessonItems(3) }], `${learn} › ${COURSE()}`),
      course1: sec("learn", tt("Project planning", "Projektplanung"), [{ t: "p", text: tt("Project planning: a short course. It has not been started yet.", "Projektplanung: ein kurzer Kurs. Er wurde noch nicht begonnen.") }]),
      ...Object.fromEntries(Object.entries(lessonPages(3, { back: "course0" })).map(([k, v]) => [k, { ...v, section: "learn" }])),
      notes: sec("learn", tt("Notes", "Notizen"), [{ t: "list", items: [tt("“Name my own number first.”", "„Meine Zahl zuerst nennen.“"), tt("“Prepare the limit.”", "„Die Grenze vorbereiten.“")] }]),
      offers: sec("learn", tt("Offers", "Angebote"), [{ t: "p", text: tt("Spring offers on every course.", "Frühlingsangebote für jeden Kurs.") }]),
      find: sec("find", tt("Find", "Finden"), [{ t: "form", fields: [tt("Topic", "Thema")], button: tt("Search", "Suchen"), msg: tt("Four courses found.", "Vier Kurse gefunden.") }, { t: "links", items: courseNames().map((c, i) => ({ label: c, go: i === 0 ? "course0" : "course1" })) }]),
      progress: sec("progress", tt("Progress", "Fortschritt"), [{ t: "p", text: tt("Negotiation basics: lesson 3 of 8. Project planning: not started.", "Verhandlungsgrundlagen: Lektion 3 von 8. Projektplanung: nicht begonnen.") }, { t: "links", items: [{ label: tt("Continue", "Weitermachen"), go: "lesson2" }] }]),
      help: sec("help", tt("Help", "Hilfe"), [{ t: "p", text: tt("Find a course under “Find”, continue under “Learn”, see where you are under “Progress”.", "Einen Kurs finden Sie unter „Finden“, weitermachen unter „Lernen“, Ihren Stand sehen Sie unter „Fortschritt“.") }]),
    },
  };
};

/** Option C · more visual elements: icons, moving pictures and badges added; the structure stays as it is. */
export const optionC = (): PlatformCfg => ({ name: "StructLearn", start: "home", color: "#7A4DE8", pages: simplePages("icons") });

