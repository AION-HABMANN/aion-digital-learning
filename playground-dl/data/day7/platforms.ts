import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";
import { LESSON, LONG, PARTS, PLAIN, PLAIN_PARTS } from "@/data/day7/texts";

/**
 * Day 7 · InclusiveLearn as the plan describes it (a small font, complicated language, many steps to operate) and the three options of Block 1.2 as the same platform after each
 * measure (DL-STANDARD v1.7): every menu entry, lesson and button opens a real page. Nothing here is marked right or wrong, and no figure is printed that the plan does not print.
 */
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const BACK = () => tt("Back to the course", "Zurück zum Kurs");

const lessonTitles = () => [tt("Lesson 1", "Lektion 1"), tt("Lesson 2", "Lektion 2"), tt("Lesson 3", "Lektion 3")];

/** Three lessons, each its own page, from the given parts. */
function lessons(parts: string[], size: number, leading: number): Record<string, PPage> {
  const out: Record<string, PPage> = {};
  parts.forEach((text, i) => {
    const links: Item[] = [];
    if (i + 1 < parts.length) links.push({ label: tt(`Next: ${lessonTitles()[i + 1]}`, `Weiter: ${lessonTitles()[i + 1]}`), go: `lesson${i + 1}` });
    links.push({ label: BACK(), go: "course" });
    out[`lesson${i}`] = { title: lessonTitles()[i], crumb: lessonTitles()[i], blocks: [{ t: "h", text: lessonTitles()[i] }, { t: "p", text: text, size, leading }, { t: "links", items: links, size }] };
  });
  return out;
}

const lessonLinks = (size: number): Blk => ({ t: "links", size, items: lessonTitles().map((l, i) => ({ label: l, go: `lesson${i}`, track: true })) });

function signup(text: string, size: number, doneText: string): PPage {
  return { title: tt("Sign-up", "Anmeldung"), crumb: tt("Sign-up", "Anmeldung"), blocks: [{ t: "wizard", steps: 10, text, field: tt("Reference", "Referenz"), doneText, size }] };
}

const NAV = () => [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Sign-up", "Anmeldung"), go: "signup" }, { label: tt("Help", "Hilfe"), go: "help" }, { label: tt("Account", "Konto"), go: "account" }];

const account = (size: number): PPage => ({
  title: tt("Account", "Konto"),
  crumb: tt("Account", "Konto"),
  blocks: [{ t: "h", text: tt("Account", "Konto") }, { t: "list", size, items: ["Mia Berg · mia.berg@example.com", tt("Language: English", "Sprache: Deutsch"), tt("Enrolled in: Negotiation basics", "Eingeschrieben in: Verhandlungsgrundlagen")] }],
});

/** InclusiveLearn today: a small font, complicated language, ten steps to sign up. */
export const today = (): PlatformCfg => ({
  name: "InclusiveLearn",
  start: "course",
  color: "#3F4A58",
  nav: NAV(),
  pages: {
    course: { title: COURSE(), blocks: [{ t: "h", text: COURSE() }, { t: "p", text: LESSON(), size: 11, leading: 1.45 }, { t: "p", text: LONG(), size: 11, leading: 1.45 }, lessonLinks(11)] },
    ...lessons([LESSON(), LONG(), PARTS()[1]], 11, 1.45),
    signup: signup(LONG(), 11, tt("You are signed up.", "Sie sind angemeldet.")),
    help: { title: tt("Help", "Hilfe"), crumb: tt("Help", "Hilfe"), blocks: [{ t: "h", text: tt("Help", "Hilfe") }, { t: "p", text: LONG(), size: 11, leading: 1.45 }, { t: "links", size: 11, items: [{ label: BACK(), go: "course" }] }] },
    account: account(11),
  },
});

/** Option A · a new feature: a quiz battle between colleagues. The lessons stay as they are. */
export const optionA = (): PlatformCfg => ({
  name: "InclusiveLearn",
  start: "course",
  color: "#3F4A58",
  nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Quiz battle", "Quiz-Battle"), go: "battle" }, { label: tt("Sign-up", "Anmeldung"), go: "signup" }, { label: tt("Account", "Konto"), go: "account" }],
  pages: {
    course: {
      title: COURSE(),
      blocks: [
        { t: "note", title: tt("New · Quiz battle", "Neu · Quiz-Battle"), text: tt("Challenge a colleague to a five-question duel on this lesson.", "Fordern Sie eine Kollegin zu einem Fünf-Fragen-Duell zu dieser Lektion heraus."), go: { label: tt("Open the quiz battle", "Das Quiz-Battle öffnen"), go: "battle" } },
        { t: "h", text: COURSE() },
        { t: "p", text: LESSON(), size: 11, leading: 1.45 },
        lessonLinks(11),
      ],
    },
    ...lessons(PARTS(), 11, 1.45),
    battle: {
      title: tt("Quiz battle", "Quiz-Battle"),
      crumb: tt("Quiz battle", "Quiz-Battle"),
      blocks: [
        { t: "h", text: tt("Quiz battle", "Quiz-Battle") },
        { t: "p", text: tt("Pick a colleague for a five-question duel on this lesson. The result appears here when both of you have played.", "Wählen Sie eine Kollegin für ein Fünf-Fragen-Duell zu dieser Lektion. Das Ergebnis erscheint hier, wenn Sie beide gespielt haben.") },
        { t: "links", items: [{ label: "Jonas K.", go: "sent" }, { label: "Mira S.", go: "sent" }, { label: "Tomas B.", go: "sent" }] },
        { t: "p", text: tt("The names are made up.", "Die Namen sind erfunden."), size: 12 },
      ],
    },
    sent: {
      title: tt("Challenge sent", "Herausforderung gesendet"),
      crumb: tt("Quiz battle", "Quiz-Battle"),
      blocks: [{ t: "h", text: tt("Challenge sent", "Herausforderung gesendet") }, { t: "p", text: tt("Challenge sent to a colleague. You will see the result when they have played.", "Herausforderung an eine Kollegin gesendet. Sie sehen das Ergebnis, wenn sie gespielt hat.") }, { t: "links", items: [{ label: tt("Back to the quiz battle", "Zurück zum Quiz-Battle"), go: "battle" }] }],
    },
    signup: signup(LONG(), 11, tt("You are signed up.", "Sie sind angemeldet.")),
    account: account(11),
  },
});

/** Option B · the existing pages tidied: a clearer layout, a simple menu, consistent buttons. The content stays as it is. */
export const optionB = (): PlatformCfg => ({
  name: "InclusiveLearn",
  start: "course",
  color: "#3F4A58",
  nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Sign-up", "Anmeldung"), go: "signup" }, { label: tt("Account", "Konto"), go: "account" }],
  pages: {
    course: { title: COURSE(), blocks: [{ t: "h", text: COURSE() }, { t: "p", text: LESSON(), size: 12, leading: 1.6 }, { t: "links", size: 13, items: lessonTitles().map((l, i) => ({ label: l, go: `lesson${i}`, track: true })) }] },
    ...lessons(PARTS(), 12, 1.6),
    signup: signup(LONG(), 12, tt("You are signed up.", "Sie sind angemeldet.")),
    account: account(13),
  },
});

/** Option C · more accessible: larger text, plain language, captions, the keyboard. No new features. */
export const optionC = (): PlatformCfg => ({
  name: "InclusiveLearn",
  start: "course",
  color: "#3F4A58",
  nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("Video", "Video"), go: "video" }, { label: tt("Sign-up", "Anmeldung"), go: "signup" }, { label: tt("Account", "Konto"), go: "account" }],
  pages: {
    course: { title: COURSE(), blocks: [{ t: "h", text: COURSE() }, { t: "p", text: PLAIN(), size: 16, leading: 1.6 }, lessonLinks(16), { t: "p", text: tt("Everything on this page works with the keyboard.", "Alles auf dieser Seite funktioniert mit der Tastatur."), size: 14 }] },
    ...lessons(PLAIN_PARTS(), 16, 1.6),
    video: {
      title: tt("Video", "Video"),
      crumb: tt("Video", "Video"),
      blocks: [
        { t: "h", text: tt("Video · Preparing a negotiation", "Video · Eine Verhandlung vorbereiten") },
        { t: "toggle", label: tt("Captions", "Untertitel"), on: tt("“First, think about what you want.”", "„Überlegen Sie zuerst, was Sie wollen.“"), off: tt("The video plays without captions.", "Das Video läuft ohne Untertitel.") },
        { t: "links", size: 16, items: [{ label: BACK(), go: "course" }] },
      ],
    },
    signup: signup(PLAIN(), 16, tt("You are signed up.", "Sie sind angemeldet.")),
    account: account(16),
  },
});
