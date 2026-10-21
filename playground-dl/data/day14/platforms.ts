import type { Blk, Item, PPage, PlatformCfg } from "@/components/sim/PlatformSim";
import { lessonPages } from "@/components/sim/platformKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 14 · ClearLearn as it is (an interface text with long, complex sentences and many technical terms, and a navigation whose entries are unclear: Block 1.1 and the case of
 * Block 2.1) and the three options of Block 1.2 as the same platform after each measure: A) simplify the content, B) improve the navigation, C) add additional functions
 * (DL-STANDARD v1.7). One generator builds all four, so only the named change differs. Every menu entry, list entry and button opens a real page. Nothing here is marked right
 * or wrong, and no figure is printed that the plan does not print.
 */
type Fix = { plain: boolean; clearNav: boolean; extra: boolean };

const N = 5;
const titles = () => LESSON_TEXTS().map((l) => l.title);
const go = (label: string, to: string, sub?: string): Item => ({ label, go: to, sub });
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const back = (to: string, label: string): Blk => ({ t: "links", items: [{ label, go: to }] });

function clear(f: Fix): PlatformCfg {
  // The interface texts: hard (long sentences, technical terms) or plain.
  const welcome = f.plain
    ? tt("Before you start, answer a short quiz about what you already know. Then we show you the lessons that fit you. Start with the quiz.", "Bevor Sie anfangen, beantworten Sie ein kurzes Quiz zu dem, was Sie schon wissen. Dann zeigen wir Ihnen die Lektionen, die zu Ihnen passen. Beginnen Sie mit dem Quiz.")
    : tt("Prior to commencing the asynchronous modules, participants are required to complete the competency-profiling instrument, whereupon the adaptive sequencing engine provisions a curriculum trajectory that is commensurate with the participant's declared heuristics, subject to prerequisite fulfilment and the applicable certification taxonomy.", "Vor Beginn der asynchronen Module sind die Teilnehmenden verpflichtet, das Kompetenzprofilierungsinstrument auszufüllen, woraufhin die adaptive Sequenzierungs-Engine einen Curriculum-Verlauf bereitstellt, der den angegebenen Heuristiken der Teilnehmenden entspricht, vorbehaltlich der Erfüllung von Voraussetzungen und der geltenden Zertifizierungstaxonomie.");
  const errorText = f.plain
    ? tt("Your answer was not saved because you were logged out. Please log in again and send it again.", "Ihre Antwort wurde nicht gespeichert, weil Sie abgemeldet wurden. Bitte melden Sie sich wieder an und senden Sie sie noch einmal.")
    : tt("Error 4021: The submission could not be persisted because the session token has been invalidated. Re-authenticate and retry the transaction.", "Fehler 4021: Die Übermittlung konnte nicht persistiert werden, da das Sitzungstoken invalidiert wurde. Authentifizieren Sie sich erneut und wiederholen Sie die Transaktion.");
  const helpText = f.plain
    ? tt("To change how your lessons are chosen, open Settings and switch “Adapt my lessons” on or off.", "Um zu ändern, wie Ihre Lektionen gewählt werden, öffnen Sie die Einstellungen und schalten Sie „Meine Lektionen anpassen“ an oder aus.")
    : tt("To reconfigure the personalisation heuristics, navigate to Console › Profile › Preferences and toggle the adaptive sequencing parameters.", "Um die Personalisierungs-Heuristiken neu zu konfigurieren, navigieren Sie zu Konsole › Profil › Präferenzen und schalten Sie die Parameter der adaptiven Sequenzierung um.");

  const L = {
    home: f.clearNav ? tt("Start", "Start") : tt("Hub", "Hub"),
    work: f.clearNav ? tt("My courses", "Meine Kurse") : tt("Workspace", "Workspace"),
    repo: f.clearNav ? tt("Library", "Bibliothek") : tt("Repository", "Repository"),
    dir: f.clearNav ? tt("All courses", "Alle Kurse") : tt("Directory", "Verzeichnis"),
    console: f.clearNav ? tt("Settings", "Einstellungen") : tt("Console", "Konsole"),
    support: f.clearNav ? tt("Help", "Hilfe") : tt("Support", "Support"),
  };

  const lessons = lessonPages(N, { back: "work" });
  const pages: Record<string, PPage> = {
    home: {
      title: L.home,
      section: "home",
      blocks: [
        { t: "h", text: tt("Welcome to ClearLearn", "Willkommen bei ClearLearn") },
        { t: "p", text: welcome },
        { t: "links", items: [go(f.plain ? tt("Start the quiz", "Das Quiz starten") : tt("Complete the competency-profiling instrument", "Das Kompetenzprofilierungsinstrument ausfüllen"), "enrol"), go(L.work, "work")] },
      ],
    },
    enrol: {
      title: f.plain ? tt("The quiz", "Das Quiz") : tt("Competency profiling", "Kompetenzprofilierung"),
      crumb: f.plain ? tt("The quiz", "Das Quiz") : tt("Competency profiling", "Kompetenzprofilierung"),
      section: "home",
      blocks: [
        { t: "h", text: f.plain ? tt("What do you know already?", "Was wissen Sie schon?") : tt("Declare your prior-knowledge heuristics", "Geben Sie Ihre Vorwissens-Heuristiken an") },
        { t: "quiz", q: f.plain ? tt("Have you negotiated before?", "Haben Sie schon einmal verhandelt?") : tt("Indicate your self-assessed proficiency in distributive bargaining.", "Geben Sie Ihre selbst eingeschätzte Kompetenz im distributiven Verhandeln an."), options: f.plain ? [tt("Yes, often", "Ja, oft"), tt("No, never", "Nein, nie")] : [tt("Proficient", "Versiert"), tt("Novice", "Anfänger")], right: 0, why: tt("This only sets where the course starts.", "Das legt nur fest, wo der Kurs beginnt.") },
        { t: "note", title: tt("Message", "Meldung"), text: errorText, go: { label: tt("Back", "Zurück"), go: "home" } },
      ],
    },
    work: {
      title: L.work,
      crumb: L.work,
      section: "work",
      blocks: [{ t: "h", text: L.work }, { t: "links", items: titles().slice(0, N).map((l, i) => go(`${i + 1}. ${l}`, `lesson${i}`)) }],
    },
    repo: { title: L.repo, crumb: L.repo, section: "repo", blocks: [{ t: "h", text: L.repo }, { t: "p", text: f.plain ? tt("Articles and videos for every course.", "Artikel und Videos zu jedem Kurs.") : tt("Asset repository of supplementary resources, indexed by taxonomy node.", "Asset-Repository ergänzender Ressourcen, indiziert nach Taxonomieknoten.") }, back("work", L.work)] },
    dir: { title: L.dir, crumb: L.dir, section: "dir", blocks: [{ t: "h", text: L.dir }, { t: "links", items: [go(COURSE(), "work")] }] },
    console: { title: L.console, crumb: L.console, section: "console", blocks: [{ t: "h", text: L.console }, { t: "tabs", tabs: [{ label: f.plain ? tt("My lessons", "Meine Lektionen") : tt("Sequencing", "Sequenzierung"), fields: [f.plain ? tt("Adapt my lessons", "Meine Lektionen anpassen") : tt("Heuristic weighting", "Heuristik-Gewichtung")] }, { label: tt("Language", "Sprache"), fields: [tt("Interface language", "Sprache der Oberfläche")] }], button: tt("Save", "Speichern"), msg: tt("Saved.", "Gespeichert.") }] },
    support: { title: L.support, crumb: L.support, section: "support", blocks: [{ t: "h", text: L.support }, { t: "p", text: helpText }, { t: "form", fields: [tt("Your question", "Ihre Frage")], button: tt("Send", "Senden"), msg: tt("Sent.", "Gesendet.") }] },
    ...lessons,
  };

  const nav = [{ label: L.home, go: "home" }, { label: L.work, go: "work" }, { label: L.repo, go: "repo" }, { label: L.dir, go: "dir" }, { label: L.console, go: "console" }, { label: L.support, go: "support" }];

  if (f.extra) {
    pages.chat = { title: tt("Chat", "Chat"), crumb: tt("Chat", "Chat"), section: "chat", blocks: [{ t: "h", text: tt("Chat with other learners", "Chat mit anderen Lernenden") }, { t: "chat", intro: tt("Three learners are online.", "Drei Lernende sind online."), reply: tt("Hello! Did you do lesson 2?", "Hallo! Hast du Lektion 2 gemacht?"), label: tt("Your message", "Ihre Nachricht") }] };
    pages.badges = { title: tt("Badges", "Abzeichen"), crumb: tt("Badges", "Abzeichen"), section: "badges", blocks: [{ t: "h", text: tt("Your badges", "Ihre Abzeichen") }, { t: "list", items: [tt("First lesson", "Erste Lektion"), tt("Three days in a row", "Drei Tage in Folge")] }] };
    pages.forum = { title: tt("Forum", "Forum"), crumb: tt("Forum", "Forum"), section: "forum", blocks: [{ t: "h", text: tt("Forum", "Forum") }, { t: "links", items: [go(tt("Questions about lesson 1", "Fragen zu Lektion 1"), "forum1"), go(tt("Introduce yourself", "Stellen Sie sich vor"), "forum1")] }] };
    pages.forum1 = { title: tt("A forum thread", "Ein Forum-Thread"), crumb: tt("Forum", "Forum"), section: "forum", blocks: [{ t: "h", text: tt("Questions about lesson 1", "Fragen zu Lektion 1") }, { t: "p", text: tt("Nobody has answered yet.", "Noch hat niemand geantwortet.") }, back("forum", tt("Back to the forum", "Zurück zum Forum"))] };
    pages.planner = { title: tt("Planner", "Planer"), crumb: tt("Planner", "Planer"), section: "planner", blocks: [{ t: "h", text: tt("Study planner", "Lernplaner") }, { t: "form", fields: [tt("Days per week", "Tage pro Woche"), tt("Minutes per day", "Minuten pro Tag")], button: tt("Plan my week", "Meine Woche planen"), msg: tt("Planned.", "Geplant.") }] };
    nav.push({ label: tt("Chat", "Chat"), go: "chat" }, { label: tt("Badges", "Abzeichen"), go: "badges" }, { label: tt("Forum", "Forum"), go: "forum" }, { label: tt("Planner", "Planer"), go: "planner" });
  }

  return { name: "ClearLearn", start: "home", color: "#4A5568", nav, pages };
}

/** ClearLearn as it is: a hard text, unclear menu entries. */
export const today = (): PlatformCfg => clear({ plain: false, clearNav: false, extra: false });
/** Option A · simplify the content: the same platform with plain interface texts. */
export const optionA = (): PlatformCfg => clear({ plain: true, clearNav: false, extra: false });
/** Option B · improve the navigation: the same platform with clear menu entries. */
export const optionB = (): PlatformCfg => clear({ plain: false, clearNav: true, extra: false });
/** Option C · add additional functions: the same platform with a chat, badges, a forum and a planner. */
export const optionC = (): PlatformCfg => clear({ plain: false, clearNav: false, extra: true });
