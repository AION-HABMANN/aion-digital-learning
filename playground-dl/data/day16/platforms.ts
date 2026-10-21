import type { Blk, Item, PPage, PlatformCfg } from "@/components/sim/PlatformSim";
import { lessonPages } from "@/components/sim/platformKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 16 · DataLearn. Two platforms: the analytics console (the key figures of Block 1.1 with the plan's 70% drop-out rate and a short time spent; and the console of the case of
 * Block 2.1 and Level 3, with a lot of tracking data and measures that show no effect) and the learner-facing platform after each of the three options of Block 1.2: A) improve UX
 * (navigation, structure), B) expand content, C) increase marketing (DL-STANDARD v1.7). Every menu entry, list entry and button opens a real page. Nothing here is marked right or
 * wrong, and no figure is printed that the plan does not print (the 70% of Block 1.1 is the plan's own).
 */
const N = 5;
const titles = () => LESSON_TEXTS().map((l) => l.title);
const go = (label: string, to: string, sub?: string): Item => ({ label, go: to, sub });
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const back = (to: string, label: string): Blk => ({ t: "links", items: [{ label, go: to }] });

/** The analytics console. `figures` shows the plan's key figures (70% drop-out, short time spent); otherwise the case: a lot of data, measures without effect. */
function console_(figures: boolean): PlatformCfg {
  const pages: Record<string, PPage> = {
    overview: {
      title: tt("Overview", "Übersicht"),
      section: "overview",
      blocks: [
        { t: "h", text: tt("Key figures", "Kennzahlen") },
        { t: "table", head: [tt("Figure", "Kennzahl"), tt("Value", "Wert")], rows: [[tt("Drop-out rate", "Abbruchquote"), figures ? "70 %" : tt("high", "hoch")], [tt("Time spent", "Verweildauer"), tt("short", "kurz")], [tt("Clicks", "Klicks"), tt("tracked", "erfasst")], [tt("Completion rate", "Abschlussquote"), tt("tracked", "erfasst")]] },
        { t: "links", items: figures ? [go(tt("Where learners leave", "Wo Lernende gehen"), "funnel"), go(tt("What is tracked", "Was erfasst wird"), "tracking")] : [go(tt("Where learners leave", "Wo Lernende gehen"), "funnel"), go(tt("What is tracked", "Was erfasst wird"), "tracking"), go(tt("Measures taken", "Getroffene Maßnahmen"), "measures")] },
      ],
    },
    funnel: {
      title: tt("Where learners leave", "Wo Lernende gehen"),
      crumb: tt("Where learners leave", "Wo Lernende gehen"),
      section: "funnel",
      blocks: [
        { t: "h", text: tt("Steps of a learner, from sign-up on", "Schritte einer Lernenden, ab der Anmeldung") },
        { t: "table", head: [tt("Step", "Schritt"), tt("How many are left", "Wie viele übrig sind")], rows: [[tt("Sign-up", "Anmeldung"), tt("many", "viele")], [tt("First lesson", "Erste Lektion"), tt("fewer", "weniger")], [tt("First quiz", "Erstes Quiz"), tt("few", "wenige")], [tt("Second week", "Zweite Woche"), tt("very few", "sehr wenige")]] },
        { t: "p", text: tt("The table says where they leave. It does not say why.", "Die Tabelle sagt, wo sie gehen. Sie sagt nicht, warum."), size: 12 },
        { t: "links", items: [go(tt("The lesson page, as a heatmap", "Die Lektionsseite als Heatmap"), "heatmap")] },
      ],
    },
    heatmap: {
      title: tt("Heatmap", "Heatmap"),
      crumb: tt("Heatmap", "Heatmap"),
      section: "funnel",
      blocks: [
        { t: "h", text: tt("Where learners click on a lesson page", "Wo Lernende auf einer Lektionsseite klicken") },
        { t: "note", title: tt("Reading", "Lesart"), text: tt("Most clicks are on the menu and at the top of the page. Few reach the end of the lesson.", "Die meisten Klicks liegen auf dem Menü und am Seitenanfang. Wenige erreichen das Ende der Lektion.") },
        back("funnel", tt("Back", "Zurück")),
      ],
    },
    tracking: {
      title: tt("What is tracked", "Was erfasst wird"),
      crumb: tt("What is tracked", "Was erfasst wird"),
      section: "tracking",
      blocks: [
        { t: "h", text: tt("Tracking", "Tracking") },
        { t: "table", head: [tt("Data", "Daten"), tt("Tracked?", "Erfasst?")], rows: [[tt("Clicks", "Klicks"), tt("yes", "ja")], [tt("Time spent", "Verweildauer"), tt("yes", "ja")], [tt("Drop-off points", "Abspringstellen"), tt("yes", "ja")], [tt("Device", "Gerät"), tt("yes", "ja")], [tt("Why learners leave", "Warum Lernende gehen"), tt("no", "nein")]] },
        { t: "links", items: [go(tt("All reports", "Alle Berichte"), "reports")] },
      ],
    },
    reports: {
      title: tt("Reports", "Berichte"),
      crumb: tt("Reports", "Berichte"),
      section: "tracking",
      blocks: [{ t: "h", text: tt("Reports", "Berichte") }, { t: "links", items: [go(tt("Clicks per page", "Klicks pro Seite"), "rep1"), go(tt("Time spent per lesson", "Verweildauer pro Lektion"), "rep2"), go(tt("Drop-off points", "Abspringstellen"), "funnel")] }],
    },
    rep1: { title: tt("Clicks per page", "Klicks pro Seite"), crumb: tt("Reports", "Berichte"), section: "tracking", blocks: [{ t: "h", text: tt("Clicks per page", "Klicks pro Seite") }, { t: "p", text: tt("A chart of clicks for every page. It shows where learners click, not what they were trying to do.", "Ein Diagramm der Klicks für jede Seite. Es zeigt, wo Lernende klicken, nicht, was sie tun wollten."), size: 12 }, back("reports", tt("Back to the reports", "Zurück zu den Berichten"))] },
    rep2: { title: tt("Time spent per lesson", "Verweildauer pro Lektion"), crumb: tt("Reports", "Berichte"), section: "tracking", blocks: [{ t: "h", text: tt("Time spent per lesson", "Verweildauer pro Lektion") }, { t: "p", text: tt("A chart of the time spent on each lesson. It is short almost everywhere. It does not say whether that is because the lesson is clear or because learners gave up.", "Ein Diagramm der Verweildauer bei jeder Lektion. Sie ist fast überall kurz. Es sagt nicht, ob das daran liegt, dass die Lektion klar ist, oder daran, dass Lernende aufgegeben haben."), size: 12 }, back("reports", tt("Back to the reports", "Zurück zu den Berichten"))] },
  };
  if (!figures) {
    pages.measures = {
      title: tt("Measures taken", "Getroffene Maßnahmen"),
      crumb: tt("Measures taken", "Getroffene Maßnahmen"),
      section: "measures",
      blocks: [
        { t: "h", text: tt("What the team has tried", "Was das Team versucht hat") },
        { t: "table", head: [tt("Measure", "Maßnahme"), tt("Effect on the drop-out", "Wirkung auf die Abbrüche")], rows: [[tt("A new banner on the home page", "Ein neues Banner auf der Startseite"), tt("none", "keine")], [tt("A longer course introduction", "Eine längere Kurseinführung"), tt("none", "keine")], [tt("A reminder e-mail", "Eine Erinnerungs-E-Mail"), tt("none", "keine")]] },
        { t: "links", items: [go(tt("Hypotheses", "Hypothesen"), "hyp")] },
      ],
    };
    pages.hyp = { title: tt("Hypotheses", "Hypothesen"), crumb: tt("Hypotheses", "Hypothesen"), section: "measures", blocks: [{ t: "h", text: tt("Hypotheses", "Hypothesen") }, { t: "note", title: tt("No hypotheses written", "Keine Hypothesen geschrieben"), text: tt("No measure was tied to a guess about why learners leave, so no test had anything to answer.", "Keine Maßnahme war an eine Vermutung gebunden, warum Lernende gehen, also hatte kein Test etwas zu beantworten.") }, back("measures", tt("Back", "Zurück"))] };
  }
  return {
    name: "DataLearn console",
    start: "overview",
    color: "#2F3E52",
    nav: figures
      ? [{ label: tt("Overview", "Übersicht"), go: "overview" }, { label: tt("Where learners leave", "Wo Lernende gehen"), go: "funnel" }, { label: tt("Tracking", "Tracking"), go: "tracking" }]
      : [{ label: tt("Overview", "Übersicht"), go: "overview" }, { label: tt("Where learners leave", "Wo Lernende gehen"), go: "funnel" }, { label: tt("Tracking", "Tracking"), go: "tracking" }, { label: tt("Measures", "Maßnahmen"), go: "measures" }],
    pages,
  };
}

type Fix = { ux: boolean; content: boolean; marketing: boolean };

/** The learner-facing platform: unclear navigation and structure as it is, and after each of the three options. */
function learner(f: Fix): PlatformCfg {
  const lessons = lessonPages(N, { back: "course" });
  const nav = f.ux
    ? [{ label: tt("Start", "Start"), go: "home" }, { label: tt("My course", "Mein Kurs"), go: "course" }, { label: tt("Help", "Hilfe"), go: "help" }]
    : [{ label: tt("Portal", "Portal"), go: "home" }, { label: tt("Modules", "Module"), go: "course" }, { label: tt("Resources", "Ressourcen"), go: "resources" }, { label: tt("Hub", "Hub"), go: "hub" }, { label: tt("Help", "Hilfe"), go: "help" }];
  const pages: Record<string, PPage> = {
    home: {
      title: f.ux ? tt("Start", "Start") : tt("Portal", "Portal"),
      section: "home",
      blocks: [
        { t: "h", text: tt("Welcome to DataLearn", "Willkommen bei DataLearn") },
        ...(f.marketing ? [{ t: "note", title: tt("Join today", "Jetzt anmelden"), text: tt("Learn faster with DataLearn. Tell your friends and your team.", "Lernen Sie schneller mit DataLearn. Erzählen Sie es Ihren Freunden und Ihrem Team."), go: { label: tt("See the campaign page", "Zur Kampagnenseite"), go: "campaign" } } as Blk] : []),
        f.ux
          ? { t: "links", items: [go(tt("Continue: lesson 1", "Weiter: Lektion 1"), "lesson0"), go(COURSE(), "course")] }
          : { t: "links", items: [go(tt("Modules", "Module"), "course"), go(tt("Resources", "Ressourcen"), "resources"), go(tt("Hub", "Hub"), "hub")], size: 12 },
      ],
    },
    course: {
      title: COURSE(),
      crumb: COURSE(),
      section: "course",
      blocks: f.ux
        ? [{ t: "h", text: COURSE() }, { t: "p", text: tt("Five steps. Start with step 1.", "Fünf Schritte. Beginnen Sie mit Schritt 1.") }, { t: "links", items: titles().slice(0, N).map((l, i) => go(`${i + 1}. ${l}`, `lesson${i}`)) }]
        : [{ t: "h", text: COURSE() }, { t: "links", items: [...titles().slice(0, N).map((l, i) => go(l, `lesson${i}`)), ...(f.content ? [go(tt("Negotiation: advanced", "Verhandlung: Fortgeschritten"), "more"), go(tt("Pricing basics", "Preisgrundlagen"), "more"), go(tt("Contracts", "Verträge"), "more")] : [])], size: 12, small: true }],
    },
    ...(f.ux ? {} : { resources: { title: tt("Resources", "Ressourcen"), crumb: tt("Resources", "Ressourcen"), section: "resources", blocks: [{ t: "h", text: tt("Resources", "Ressourcen") }, { t: "p", text: tt("Files and links for every module.", "Dateien und Links zu jedem Modul."), size: 12 }, back("home", tt("Back", "Zurück"))] },
    hub: { title: tt("Hub", "Hub"), crumb: tt("Hub", "Hub"), section: "hub", blocks: [{ t: "h", text: tt("Hub", "Hub") }, { t: "p", text: tt("Messages, groups and announcements.", "Nachrichten, Gruppen und Ankündigungen."), size: 12 }, back("home", tt("Back", "Zurück"))] } }),
    help: { title: tt("Help", "Hilfe"), crumb: tt("Help", "Hilfe"), section: "help", blocks: [{ t: "h", text: tt("Help", "Hilfe") }, { t: "form", fields: [tt("Your question", "Ihre Frage")], button: tt("Send", "Senden"), msg: tt("Sent.", "Gesendet.") }] },
    ...lessons,
  };
  if (f.content) pages.more = { title: tt("More courses", "Mehr Kurse"), crumb: tt("More courses", "Mehr Kurse"), section: "course", blocks: [{ t: "h", text: tt("More courses", "Mehr Kurse") }, { t: "p", text: tt("New courses were added. Each has the same long lessons.", "Neue Kurse wurden ergänzt. Jeder hat dieselben langen Lektionen."), size: 12 }, back("course", tt("Back to the course", "Zurück zum Kurs"))] };
  if (f.marketing) pages.campaign = { title: tt("Campaign", "Kampagne"), crumb: tt("Campaign", "Kampagne"), section: "home", blocks: [{ t: "h", text: tt("Join DataLearn today", "Melden Sie sich heute bei DataLearn an") }, { t: "p", text: tt("A page for new visitors: what DataLearn offers, and a sign-up button.", "Eine Seite für neue Besucher: was DataLearn bietet, und ein Anmeldebutton.") }, { t: "form", fields: [tt("Your e-mail", "Ihre E-Mail")], button: tt("Sign up", "Anmelden"), msg: tt("Signed up. Welcome!", "Angemeldet. Willkommen!") }, back("home", tt("Back to the platform", "Zurück zur Plattform"))] };
  return { name: "DataLearn", start: "home", color: "#4A4458", nav, pages };
}

/** The console with the plan's key figures (Block 1.1). */
export const figures = (): PlatformCfg => console_(true);
/** The console of the case: a lot of data, measures without effect (Block 2.1 and Level 3). */
export const today = (): PlatformCfg => console_(false);
/** Option A · improve UX (navigation, structure). */
export const optionA = (): PlatformCfg => learner({ ux: true, content: false, marketing: false });
/** Option B · expand content. */
export const optionB = (): PlatformCfg => learner({ ux: false, content: true, marketing: false });
/** Option C · increase marketing. */
export const optionC = (): PlatformCfg => learner({ ux: false, content: false, marketing: true });
