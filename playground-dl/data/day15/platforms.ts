import type { Blk, Item, PPage, PlatformCfg } from "@/components/sim/PlatformSim";
import { lessonPages } from "@/components/sim/platformKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 15 · MobileLearn as it is (a platform optimised for desktop: Block 1.1's scenario and the case of Block 2.1, seen on a phone and on a desktop) and the three options of
 * Block 1.2 as the same platform on a phone after each measure: A) significantly shorten content for mobile (microlearning), B) adopt the desktop version, C) develop a separate
 * mobile UX (DL-STANDARD v1.7). One generator builds them, so only the named change differs. Every menu entry, list entry and button opens a real page. Nothing here is marked right
 * or wrong, and no figure is printed that the plan does not print.
 */
type Fix = { phone: boolean; units: boolean; mobileUx: boolean };

const N = 5;
const titles = () => LESSON_TEXTS().map((l) => l.title);
const go = (label: string, to: string, sub?: string): Item => ({ label, go: to, sub });
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const back = (to: string, label: string, size?: number): Blk => ({ t: "links", items: [{ label, go: to }], size });

function mobile(f: Fix): PlatformCfg {
  const small = f.mobileUx ? 15 : 11;
  const texts = LESSON_TEXTS();
  const lessons = lessonPages(N, {
    size: small,
    leading: f.mobileUx ? 1.5 : 1.2,
    back: "course",
    extra: (i) =>
      f.units
        ? [{ t: "p", text: tt(`Unit ${i + 1} of ${N} · about 3 minutes · one goal`, `Einheit ${i + 1} von ${N} · etwa 3 Minuten · ein Ziel`), size: 12 } as Blk, { t: "quiz", q: tt("A quick check: did you get the point?", "Eine kurze Prüfung: Haben Sie den Kern verstanden?"), options: [tt("Yes", "Ja"), tt("Not yet", "Noch nicht")], right: 0, why: tt("This only sets what you see next.", "Das legt nur fest, was Sie als Nächstes sehen.") }]
        : [{ t: "p", text: texts[(i + 1) % texts.length].text, size: small, leading: 1.2 } as Blk, { t: "p", text: texts[(i + 2) % texts.length].text, size: small, leading: 1.2 } as Blk],
  });
  const wide: Blk = { t: "table", head: [tt("Course", "Kurs"), tt("Module", "Modul"), tt("Lessons", "Lektionen"), tt("Status", "Status"), tt("Due", "Fällig"), tt("Owner", "Verantwortlich")], rows: [[COURSE(), tt("Module 1", "Modul 1"), "5", tt("open", "offen"), tt("—", "—"), tt("Team", "Team")]] };

  const nav = f.mobileUx
    ? [{ label: tt("Today", "Heute"), go: "home" }, { label: tt("Courses", "Kurse"), go: "course" }, { label: tt("Me", "Ich"), go: "me" }]
    : [{ label: tt("Home", "Start"), go: "home" }, { label: tt("Catalogue", "Katalog"), go: "catalog" }, { label: tt("Course", "Kurs"), go: "course" }, { label: tt("Reports", "Berichte"), go: "reports" }, { label: tt("Library", "Bibliothek"), go: "library" }, { label: tt("Messages", "Nachrichten"), go: "messages" }, { label: tt("Account", "Konto"), go: "me" }];

  const pages: Record<string, PPage> = {
    home: f.mobileUx
      ? {
          title: tt("Today", "Heute"),
          section: "home",
          blocks: [
            { t: "h", text: tt("Continue where you stopped", "Dort weitermachen, wo Sie aufgehört haben") },
            { t: "p", text: tt("Lesson 3 · about 4 minutes. Your progress is the same on your laptop.", "Lektion 3 · etwa 4 Minuten. Ihr Fortschritt ist auf Ihrem Laptop derselbe."), size: 15 },
            { t: "links", items: [go(tt("Continue", "Weiter"), "lesson2")], size: 15 },
            { t: "links", items: [go(COURSE(), "course")], size: 15 },
          ],
        }
      : {
          title: tt("Home", "Start"),
          section: "home",
          blocks: [
            { t: "h", text: tt("Learning dashboard", "Lern-Dashboard") },
            { t: "links", items: [go(tt("Catalogue", "Katalog"), "catalog"), go(COURSE(), "course"), go(tt("Reports", "Berichte"), "reports"), go(tt("Library", "Bibliothek"), "library"), go(tt("Messages", "Nachrichten"), "messages"), go(tt("Account", "Konto"), "me")], grid: 3, small: true, size: 10 },
            { t: "p", text: tt("This page is laid out for a large screen.", "Diese Seite ist für einen großen Bildschirm gestaltet."), size: 10 },
          ],
        },
    course: {
      title: COURSE(),
      crumb: COURSE(),
      section: "course",
      blocks: [
        { t: "h", text: COURSE() },
        { t: "links", items: titles().slice(0, N).map((l, i) => go(f.units ? `${i + 1}. ${l} · 3 min` : `${i + 1}. ${l}`, `lesson${i}`)), size: small, small: !f.mobileUx },
      ],
    },
    me: { title: f.mobileUx ? tt("Me", "Ich") : tt("Account", "Konto"), crumb: tt("Account", "Konto"), section: "me", blocks: [{ t: "h", text: tt("Account", "Konto") }, { t: "form", fields: [tt("Name", "Name"), tt("E-mail", "E-Mail")], button: tt("Save", "Speichern"), msg: tt("Saved.", "Gespeichert.") }] },
    ...lessons,
  };
  if (!f.mobileUx) {
    pages.catalog = { title: tt("Catalogue", "Katalog"), crumb: tt("Catalogue", "Katalog"), section: "catalog", blocks: [{ t: "h", text: tt("Catalogue", "Katalog") }, wide, { t: "links", items: [go(COURSE(), "course")], size: 10, small: true }] };
    pages.reports = { title: tt("Reports", "Berichte"), crumb: tt("Reports", "Berichte"), section: "reports", blocks: [{ t: "h", text: tt("Reports", "Berichte") }, wide, back("home", tt("Back", "Zurück"), 10)] };
    pages.library = { title: tt("Library", "Bibliothek"), crumb: tt("Library", "Bibliothek"), section: "library", blocks: [{ t: "h", text: tt("Library", "Bibliothek") }, { t: "p", text: tt("Long reading for every course, laid out for a laptop.", "Langes Lesematerial zu jedem Kurs, für einen Laptop gestaltet."), size: 10 }, back("home", tt("Back", "Zurück"), 10)] };
    pages.messages = { title: tt("Messages", "Nachrichten"), crumb: tt("Messages", "Nachrichten"), section: "messages", blocks: [{ t: "h", text: tt("Messages", "Nachrichten") }, { t: "p", text: tt("No new messages.", "Keine neuen Nachrichten."), size: 10 }, back("home", tt("Back", "Zurück"), 10)] };
  }
  return { name: "MobileLearn", start: "home", color: "#4A5568", phone: f.phone, nav, pages };
}

/** MobileLearn as it is on a phone: the desktop layout, long content. */
export const today = (): PlatformCfg => mobile({ phone: true, units: false, mobileUx: false });
/** MobileLearn as it is on a desktop screen. */
export const desktop = (): PlatformCfg => mobile({ phone: false, units: false, mobileUx: false });
/** Option A · significantly shorten content for mobile (microlearning): short units on the phone, the desktop layout otherwise unchanged. */
export const optionA = (): PlatformCfg => mobile({ phone: true, units: true, mobileUx: false });
/** Option B · adopt the desktop version: the phone shows the desktop version as it is. */
export const optionB = (): PlatformCfg => mobile({ phone: true, units: false, mobileUx: false });
/** Option C · develop a separate mobile UX: a phone layout with large targets and a continue card, the long content kept. */
export const optionC = (): PlatformCfg => mobile({ phone: true, units: false, mobileUx: true });
