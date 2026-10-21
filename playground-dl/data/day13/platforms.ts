import type { Blk, Item, PPage, PlatformCfg } from "@/components/sim/PlatformSim";
import { lessonPages } from "@/components/sim/platformKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 13 · AccessLearn as it is (a platform with low contrast, a small font and a complex navigation, Block 1.1 and the case of Block 2.1) and the three options of Block 1.2 as the
 * same platform after each measure: A) improve the contrasts, B) simplify the navigation, C) provide alternative content (DL-STANDARD v1.7). One generator builds all four, so
 * only the named change differs. Every menu entry, list entry and button opens a real page. Nothing here is marked right or wrong, and no figure is printed that the plan does not
 * print.
 */
type Fix = { contrast: boolean; simpleNav: boolean; alt: boolean };

const N = 5;
const SMALL = 11;
const titles = () => LESSON_TEXTS().map((l) => l.title);
const go = (label: string, to: string, sub?: string): Item => ({ label, go: to, sub });
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const back = (to: string, label?: string): Blk => ({ t: "links", items: [{ label: label ?? tt("Back", "Zurück"), go: to }], size: SMALL });

function access(f: Fix): PlatformCfg {
  const lessons = lessonPages(N, {
    size: SMALL,
    leading: 1.25,
    back: "course",
    extra: (i) => (f.alt && i === 1 ? [{ t: "note", title: tt("Audio version", "Audio-Fassung"), text: tt("This lesson can be listened to. A transcript is below the player.", "Diese Lektion kann angehört werden. Ein Transkript steht unter dem Player.") } as Blk] : []),
  });
  const course: PPage = {
    title: COURSE(),
    section: f.simpleNav ? "courses" : "learning",
    blocks: [{ t: "h", text: COURSE() }, { t: "links", items: titles().slice(0, N).map((l, i) => go(`${i + 1}. ${l}`, `lesson${i}`)), size: SMALL, small: true }, { t: "links", items: [go(tt("Chart: completion by month", "Diagramm: Abschluss je Monat"), "chart"), go(tt("Video: a negotiation", "Video: eine Verhandlung"), "video")], size: SMALL, small: true }],
  };
  const chart: PPage = {
    title: tt("Chart", "Diagramm"),
    crumb: tt("Chart", "Diagramm"),
    section: f.simpleNav ? "courses" : "learning",
    blocks: [
      { t: "h", text: tt("Course completion by month", "Kursabschluss je Monat") },
      f.alt
        ? { t: "note", title: tt("Text version of the chart", "Textfassung des Diagramms"), text: tt("Completion rose through the year, with a dip in the summer months.", "Der Abschluss stieg im Lauf des Jahres, mit einem Rückgang in den Sommermonaten.") }
        : { t: "note", title: tt("Chart", "Diagramm"), text: tt("[A chart is shown here. It has no description.]", "[Hier wird ein Diagramm gezeigt. Es hat keine Beschreibung.]") },
      back("course", tt("Back to the course", "Zurück zum Kurs")),
    ],
  };
  const video: PPage = {
    title: tt("Video", "Video"),
    crumb: tt("Video", "Video"),
    section: f.simpleNav ? "courses" : "learning",
    blocks: [
      { t: "h", text: tt("A negotiation, filmed", "Eine Verhandlung, gefilmt") },
      f.alt
        ? { t: "note", title: tt("Captions and transcript", "Untertitel und Transkript"), text: tt("The video has captions and a text transcript below it.", "Das Video hat Untertitel und darunter ein Texttranskript.") }
        : { t: "note", title: tt("Video", "Video"), text: tt("[A video plays here. It has no captions and no transcript.]", "[Hier läuft ein Video. Es hat keine Untertitel und kein Transkript.]") },
      back("course", tt("Back to the course", "Zurück zum Kurs")),
    ],
  };
  const library: PPage = {
    title: tt("Library", "Bibliothek"),
    crumb: tt("Library", "Bibliothek"),
    section: "library",
    blocks: [{ t: "h", text: tt("Library", "Bibliothek") }, { t: "links", items: [go(tt("Chart: completion by month", "Diagramm: Abschluss je Monat"), "chart"), go(tt("Video: a negotiation", "Video: eine Verhandlung"), "video")], size: SMALL, small: true }],
  };
  const help: PPage = {
    title: tt("Help", "Hilfe"),
    crumb: tt("Help", "Hilfe"),
    section: "help",
    blocks: [{ t: "h", text: tt("Help", "Hilfe") }, { t: "p", text: tt("Write to the team and say what is not working. We answer within a few days.", "Schreiben Sie dem Team und sagen Sie, was nicht funktioniert. Wir antworten innerhalb weniger Tage."), size: SMALL }, { t: "form", fields: [tt("Your message", "Ihre Nachricht")], button: tt("Send", "Senden"), msg: tt("Sent.", "Gesendet.") }],
  };

  const simple: PlatformCfg["pages"] = {
    home: {
      title: tt("Start", "Start"),
      section: "home",
      blocks: [{ t: "h", text: tt("Welcome back", "Willkommen zurück") }, { t: "p", text: tt("Pick up where you stopped.", "Machen Sie dort weiter, wo Sie aufgehört haben."), size: SMALL }, { t: "links", items: [go(COURSE(), "course", tt("lesson 3 next", "Lektion 3 als Nächstes"))], size: SMALL }],
    },
    course,
    library,
    help,
  };

  /** The complex navigation: a catalogue four levels deep, and eight entries in the menu. */
  const complex: PlatformCfg["pages"] = {
    home: {
      title: tt("Start", "Start"),
      section: "home",
      blocks: [
        { t: "h", text: tt("Dashboard", "Dashboard") },
        { t: "links", items: [go(tt("My learning", "Mein Lernen"), "learning"), go(tt("Catalogue", "Katalog"), "catalog"), go(tt("Reports", "Berichte"), "reports"), go(tt("Library", "Bibliothek"), "library"), go(tt("Certificates", "Zertifikate"), "certs"), go(tt("Messages", "Nachrichten"), "messages"), go(tt("Settings", "Einstellungen"), "settings"), go(tt("Account", "Konto"), "account")], grid: 3, small: true, size: SMALL },
      ],
    },
    learning: { title: tt("My learning", "Mein Lernen"), crumb: tt("My learning", "Mein Lernen"), section: "learning", blocks: [{ t: "h", text: tt("My learning", "Mein Lernen") }, { t: "links", items: [go(COURSE(), "course")], size: SMALL, small: true }, { t: "links", items: [go(tt("Open the catalogue", "Den Katalog öffnen"), "catalog")], size: SMALL, small: true }] },
    catalog: { title: tt("Catalogue", "Katalog"), crumb: tt("Catalogue", "Katalog"), section: "catalog", blocks: [{ t: "h", text: tt("Catalogue · all areas", "Katalog · alle Bereiche") }, { t: "links", items: [go(tt("Business skills", "Fachkompetenzen"), "catA"), go(tt("Tools", "Werkzeuge"), "catB"), go(tt("Compliance", "Compliance"), "catC")], size: SMALL, small: true }] },
    catA: { title: tt("Business skills", "Fachkompetenzen"), crumb: tt("Catalogue › Business skills", "Katalog › Fachkompetenzen"), section: "catalog", blocks: [{ t: "h", text: tt("Business skills · topics", "Fachkompetenzen · Themen") }, { t: "links", items: [go(tt("Communication", "Kommunikation"), "catA1"), go(tt("Leadership", "Führung"), "catA2")], size: SMALL, small: true }, back("catalog")] },
    catA1: { title: tt("Communication", "Kommunikation"), crumb: tt("Catalogue › Business skills › Communication", "Katalog › Fachkompetenzen › Kommunikation"), section: "catalog", blocks: [{ t: "h", text: tt("Communication · courses", "Kommunikation · Kurse") }, { t: "links", items: [go(COURSE(), "course")], size: SMALL, small: true }, back("catA")] },
    catA2: { title: tt("Leadership", "Führung"), crumb: tt("Catalogue › Business skills › Leadership", "Katalog › Fachkompetenzen › Führung"), section: "catalog", blocks: [{ t: "h", text: tt("Leadership · courses", "Führung · Kurse") }, { t: "p", text: tt("No courses in this topic yet.", "In diesem Thema gibt es noch keine Kurse."), size: SMALL }, back("catA")] },
    catB: { title: tt("Tools", "Werkzeuge"), crumb: tt("Catalogue › Tools", "Katalog › Werkzeuge"), section: "catalog", blocks: [{ t: "h", text: tt("Tools · topics", "Werkzeuge · Themen") }, { t: "p", text: tt("No courses in this area yet.", "In diesem Bereich gibt es noch keine Kurse."), size: SMALL }, back("catalog")] },
    catC: { title: tt("Compliance", "Compliance"), crumb: tt("Catalogue › Compliance", "Katalog › Compliance"), section: "catalog", blocks: [{ t: "h", text: tt("Compliance · topics", "Compliance · Themen") }, { t: "p", text: tt("No courses in this area yet.", "In diesem Bereich gibt es noch keine Kurse."), size: SMALL }, back("catalog")] },
    reports: { title: tt("Reports", "Berichte"), crumb: tt("Reports", "Berichte"), section: "reports", blocks: [{ t: "h", text: tt("Reports", "Berichte") }, { t: "table", head: [tt("Course", "Kurs"), tt("Status", "Status")], rows: [[{ label: COURSE(), go: "course" }, tt("in progress", "in Bearbeitung")]] }, { t: "links", items: [go(tt("Chart: completion by month", "Diagramm: Abschluss je Monat"), "chart")], size: SMALL, small: true }] },
    certs: { title: tt("Certificates", "Zertifikate"), crumb: tt("Certificates", "Zertifikate"), section: "certs", blocks: [{ t: "h", text: tt("Certificates", "Zertifikate") }, { t: "p", text: tt("No certificates yet. Finish a course to receive one.", "Noch keine Zertifikate. Schließen Sie einen Kurs ab, um eines zu erhalten."), size: SMALL }] },
    messages: { title: tt("Messages", "Nachrichten"), crumb: tt("Messages", "Nachrichten"), section: "messages", blocks: [{ t: "h", text: tt("Messages", "Nachrichten") }, { t: "p", text: tt("No new messages.", "Keine neuen Nachrichten."), size: SMALL }] },
    settings: { title: tt("Settings", "Einstellungen"), crumb: tt("Settings", "Einstellungen"), section: "settings", blocks: [{ t: "h", text: tt("Settings", "Einstellungen") }, { t: "tabs", tabs: [{ label: tt("Notifications", "Benachrichtigungen"), fields: [tt("E-mail summary", "E-Mail-Zusammenfassung"), tt("Reminders", "Erinnerungen")] }, { label: tt("Privacy", "Datenschutz"), fields: [tt("Show my name in groups", "Meinen Namen in Gruppen zeigen")] }, { label: tt("Language", "Sprache"), fields: [tt("Interface language", "Sprache der Oberfläche")] }], button: tt("Save", "Speichern"), msg: tt("Saved.", "Gespeichert.") }] },
    account: { title: tt("Account", "Konto"), crumb: tt("Account", "Konto"), section: "account", blocks: [{ t: "h", text: tt("Account", "Konto") }, { t: "form", fields: [tt("Name", "Name"), tt("E-mail", "E-Mail")], button: tt("Save", "Speichern"), msg: tt("Saved.", "Gespeichert.") }] },
    course,
    library,
    help,
  };

  return {
    name: "AccessLearn",
    start: "home",
    color: "#566074",
    dim: !f.contrast,
    nav: f.simpleNav
      ? [{ label: tt("Start", "Start"), go: "home" }, { label: tt("Courses", "Kurse"), go: "course" }, { label: tt("Library", "Bibliothek"), go: "library" }, { label: tt("Help", "Hilfe"), go: "help" }]
      : [{ label: tt("Start", "Start"), go: "home" }, { label: tt("My learning", "Mein Lernen"), go: "learning" }, { label: tt("Catalogue", "Katalog"), go: "catalog" }, { label: tt("Reports", "Berichte"), go: "reports" }, { label: tt("Library", "Bibliothek"), go: "library" }, { label: tt("Certificates", "Zertifikate"), go: "certs" }, { label: tt("Messages", "Nachrichten"), go: "messages" }, { label: tt("Settings", "Einstellungen"), go: "settings" }, { label: tt("Account", "Konto"), go: "account" }, { label: tt("Help", "Hilfe"), go: "help" }],
    pages: { ...(f.simpleNav ? simple : complex), chart, video, ...lessons },
  };
}

/** AccessLearn as it is: low contrast, a small font, a complex navigation, and content with no alternative. */
export const today = (): PlatformCfg => access({ contrast: false, simpleNav: false, alt: false });
/** Option A · improve the contrasts: the same platform, with strong contrast. */
export const optionA = (): PlatformCfg => access({ contrast: true, simpleNav: false, alt: false });
/** Option B · simplify the navigation: the same platform, with four menu entries and a flat course list. */
export const optionB = (): PlatformCfg => access({ contrast: false, simpleNav: true, alt: false });
/** Option C · provide alternative content: the same platform, with captions, a transcript and a text version of the chart. */
export const optionC = (): PlatformCfg => access({ contrast: false, simpleNav: false, alt: true });
