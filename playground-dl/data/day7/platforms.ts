import type { Blk, Item, PPage, PlatformCfg } from "@/components/sim/PlatformSim";
import { accountPage, catalogCards, catalogPages, courseAbout, courseHero, courseOutcomes, footerOf, helpPage, type Look } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";
import { LESSON, LONG, PARTS, PLAIN, PLAIN_PARTS } from "@/data/day7/texts";

/**
 * Day 7 · InclusiveLearn as the plan describes it (a small font, complicated language, many steps to operate) and the three options of Block 1.2 as the same platform after each
 * measure (DL-STANDARD v1.8): one generator builds all four, so only the named change differs. The platform reads like a real one (a course page with its promise, syllabus,
 * trainer, reviews and questions, a catalogue, a help centre, an account), built from `courseKit.ts` in the platform's own font size and, where the plan says so, in its hard
 * language. Every menu entry, lesson and button opens a real page. Nothing here is marked right or wrong, and no figure is printed that the plan does not print.
 */
type Opt = { feature: boolean; tidy: boolean; access: boolean };

const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const BACK = () => tt("Back to the course", "Zurück zum Kurs");
const TITLES = () => [tt("Before the first offer", "Vor dem ersten Angebot"), tt("Goal and limit", "Ziel und Grenze"), tt("The other side", "Die andere Seite")];

function inclusive(o: Opt): PlatformCfg {
  const size = o.access ? 16 : o.tidy ? 12 : 11;
  const leading = o.access || o.tidy ? 1.6 : 1.45;
  const look: Look = { size, leading, hard: !o.access };
  const titles = TITLES();
  const parts = o.access ? PLAIN_PARTS() : o.tidy || o.feature ? PARTS() : [LESSON(), LONG(), PARTS()[1]];

  const lessonList = (): Blk => ({ t: "links", size: o.tidy || o.access ? size + 1 : size, items: titles.map((l, i): Item => ({ label: `${i + 1}. ${l}`, go: `lesson${i}`, track: true })) });

  const lessons: Record<string, PPage> = {};
  parts.forEach((text, i) => {
    const links: Item[] = [];
    if (i + 1 < parts.length) links.push({ label: tt(`Next: ${titles[i + 1]}`, `Weiter: ${titles[i + 1]}`), go: `lesson${i + 1}` });
    links.push({ label: BACK(), go: "course" });
    lessons[`lesson${i}`] = {
      title: titles[i],
      crumb: titles[i],
      section: "course",
      blocks: [
        { t: "sub", text: tt(`${COURSE()} · Lesson ${i + 1} of ${parts.length}`, `${COURSE()} · Lektion ${i + 1} von ${parts.length}`), size },
        { t: "h", text: titles[i] },
        { t: "p", text, size, leading },
        ...(o.access && i === 0 ? [{ t: "links", size, items: [{ label: tt("Watch the video of this lesson", "Das Video zu dieser Lektion ansehen"), go: "video" }] } as Blk] : []),
        { t: "links", items: links, size },
      ],
    };
  });

  const course: PPage = {
    title: COURSE(),
    section: "course",
    blocks: [
      ...courseHero(look, parts.length),
      ...(o.feature ? [{ t: "note", title: tt("New · Quiz battle", "Neu · Quiz-Battle"), text: tt("Challenge a colleague to a five-question duel on this lesson.", "Fordern Sie eine Kollegin zu einem Fünf-Fragen-Duell zu dieser Lektion heraus."), go: { label: tt("Open the quiz battle", "Quiz-Battle öffnen"), go: "battle" } } as Blk] : []),
      { t: "p", text: o.access ? PLAIN() : LESSON(), size, leading },
      ...(o.tidy || o.access ? [] : [{ t: "p", text: LONG(), size, leading } as Blk]),
      { t: "sub", text: tt("Lessons", "Lektionen"), size },
      lessonList(),
      ...courseOutcomes(look),
      ...courseAbout(look),
      ...(o.access ? [{ t: "p", text: tt("Everything on this page works with the keyboard.", "Alles auf dieser Seite funktioniert mit der Tastatur."), size: 14 } as Blk] : []),
      ...(o.tidy ? [{ t: "links", small: true, size, items: [{ label: tt("Help", "Hilfe"), go: "help" }] } as Blk] : []),
    ],
  };

  const catalog: PPage = {
    title: tt("Catalogue", "Katalog"),
    crumb: tt("Catalogue", "Katalog"),
    section: "catalog",
    blocks: [{ t: "h", text: tt("Course catalogue", "Kurskatalog") }, { t: "p", text: o.access ? tt("All courses your company offers. Open one to read more.", "Alle Kurse, die Ihr Unternehmen anbietet. Öffnen Sie einen, um mehr zu lesen.") : tt("The following overview comprises the entirety of the course offerings made available by your organisation.", "Die nachstehende Übersicht umfasst die Gesamtheit der von Ihrer Organisation bereitgestellten Kursangebote."), size }, catalogCards(look, "course")],
  };

  const signup: PPage = {
    title: tt("Sign-up", "Anmeldung"),
    crumb: tt("Sign-up", "Anmeldung"),
    section: "signup",
    blocks: [{ t: "wizard", steps: 10, text: o.access ? PLAIN() : LONG(), field: tt("Reference", "Referenz"), doneText: tt("You are signed up.", "Sie sind angemeldet."), size }],
  };

  const pages: Record<string, PPage> = {
    course,
    ...lessons,
    catalog,
    ...catalogPages(look, { go: "catalog", label: tt("Back to the catalogue", "Zurück zum Katalog") }, "cat", "catalog"),
    signup,
    help: helpPage(look, "help"),
    account: accountPage(look, "account"),
  };

  if (o.feature) {
    pages.battle = {
      title: tt("Quiz battle", "Quiz-Battle"),
      crumb: tt("Quiz battle", "Quiz-Battle"),
      section: "battle",
      blocks: [
        { t: "hero", kicker: tt("New feature", "Neue Funktion"), title: tt("Quiz battle", "Quiz-Battle"), text: tt("Pick a colleague for a five-question duel on this lesson. The result appears here when both of you have played.", "Wählen Sie eine Kollegin für ein Fünf-Fragen-Duell zu dieser Lektion. Das Ergebnis erscheint hier, wenn Sie beide gespielt haben."), size },
        { t: "links", items: [{ label: "Jonas K.", go: "sent" }, { label: "Mira S.", go: "sent" }, { label: "Tomas B.", go: "sent" }], size },
        { t: "p", text: tt("The names are made up.", "Die Namen sind erfunden."), size: 12 },
      ],
    };
    pages.sent = {
      title: tt("Challenge sent", "Herausforderung gesendet"),
      crumb: tt("Quiz battle", "Quiz-Battle"),
      section: "battle",
      blocks: [{ t: "h", text: tt("Challenge sent", "Herausforderung gesendet") }, { t: "p", text: tt("Challenge sent to a colleague. You will see the result when they have played.", "Herausforderung an eine Kollegin gesendet. Sie sehen das Ergebnis, wenn sie gespielt hat."), size }, { t: "links", items: [{ label: tt("Back to the quiz battle", "Zurück zum Quiz-Battle"), go: "battle" }], size }],
    };
  }

  if (o.access) {
    pages.video = {
      title: tt("Video", "Video"),
      crumb: tt("Video", "Video"),
      section: "video",
      blocks: [
        { t: "h", text: tt("Video · Preparing a negotiation", "Video · Eine Verhandlung vorbereiten") },
        { t: "toggle", label: tt("Captions", "Untertitel"), on: tt("“First, think about what you want.”", "„Überlegen Sie zuerst, was Sie wollen.“"), off: tt("The video plays without captions.", "Das Video läuft ohne Untertitel.") },
        { t: "p", text: tt("Transcript: First, think about what you want. Then decide where your limit is. Last, ask yourself what the other side might need.", "Transkript: Überlegen Sie zuerst, was Sie wollen. Legen Sie dann fest, wo Ihre Grenze liegt. Fragen Sie sich zuletzt, was die andere Seite brauchen könnte."), size },
        { t: "links", size, items: [{ label: BACK(), go: "course" }] },
      ],
    };
  }

  const nav = [
    { label: tt("Course", "Kurs"), go: "course" },
    ...(o.feature ? [{ label: tt("Quiz battle", "Quiz-Battle"), go: "battle" }] : []),
    ...(o.access ? [{ label: tt("Video", "Video"), go: "video" }] : []),
    { label: tt("Catalogue", "Katalog"), go: "catalog" },
    { label: tt("Sign-up", "Anmeldung"), go: "signup" },
    ...(o.tidy ? [] : [{ label: tt("Help", "Hilfe"), go: "help" }]),
    { label: tt("Account", "Konto"), go: "account" },
  ];

  return { name: "InclusiveLearn", start: "course", color: "#3F4A58", nav, pages, footer: footerOf("InclusiveLearn") };
}

/** InclusiveLearn today: a small font, complicated language, ten steps to sign up. */
export const today = (): PlatformCfg => inclusive({ feature: false, tidy: false, access: false });
/** Option A · a new feature: a quiz battle between colleagues. The lessons stay as they are. */
export const optionA = (): PlatformCfg => inclusive({ feature: true, tidy: false, access: false });
/** Option B · the existing pages tidied: a clearer layout, a slightly larger text, a simpler menu (help moves to the foot of the course page). The content and its language stay as they are. */
export const optionB = (): PlatformCfg => inclusive({ feature: false, tidy: true, access: false });
/** Option C · more accessible: larger text, plain language, captions and a transcript, the keyboard. No new features. */
export const optionC = (): PlatformCfg => inclusive({ feature: false, tidy: false, access: true });
