import type { PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { footerOf } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 15 · a competitor of MobileLearn as the brief describes them: "competitors are better on mobile", and how well they do cannot be seen (DL-STANDARD v1.8, section 4: a public
 * competitor page in the Route 2 window). PocketCampus is made up and shown on a phone: a home that starts where the learner stopped, large targets, lessons that fit the
 * screen, a download for the train and its store page. Its claims are its own; no rating, no figure and no result is shown. Every menu entry and button opens a real page.
 */
const N = 4;

export const competitor = (): PlatformCfg => {
  const t = LESSON_TEXTS();
  const lessons: Record<string, PPage> = {};
  for (let i = 0; i < N; i++) {
    lessons[`m${i}`] = {
      title: t[i].title,
      crumb: tt(`Lesson ${i + 1}`, `Lektion ${i + 1}`),
      section: "learn",
      blocks: [
        { t: "meta", items: [tt(`Lesson ${i + 1} of ${N}`, `Lektion ${i + 1} von ${N}`), tt("fits one screen", "passt auf einen Bildschirm")], size: 13 },
        { t: "h", text: t[i].title },
        { t: "p", text: t[i].text, size: 16, leading: 1.6 },
        { t: "links", size: 16, items: [i + 1 < N ? { label: tt("Continue", "Weiter"), go: `m${i + 1}`, color: "#2D5B8A" } : { label: tt("Done · back to today", "Fertig · zurück zu Heute"), go: "today", color: "#2D5B8A" }] },
      ],
    };
  }
  return {
    name: "PocketCampus",
    start: "today",
    color: "#2D5B8A",
    phone: true,
    nav: [{ label: tt("Today", "Heute"), go: "today" }, { label: tt("Learn", "Lernen"), go: "learn" }, { label: tt("Downloads", "Downloads"), go: "downloads" }, { label: tt("Get the app", "App holen"), go: "store" }],
    footer: footerOf("PocketCampus"),
    pages: {
      today: {
        title: tt("Today", "Heute"),
        section: "today",
        blocks: [
          { t: "h", text: tt("Good morning, Mia", "Guten Morgen, Mia") },
          { t: "hero", kicker: tt("Continue where you stopped", "Dort weitermachen, wo Sie aufgehört haben"), title: t[2].title, text: tt("Negotiation basics · lesson 3. Your place is the same on your laptop.", "Verhandlungsgrundlagen · Lektion 3. Ihr Stand ist auf dem Laptop derselbe."), button: { label: tt("Continue", "Weiter"), go: "m2" }, size: 15 },
          { t: "toggle", label: tt("Reminder at 7:30 on the train", "Erinnerung um 7:30 im Zug"), on: tt("We remind you every weekday at 7:30.", "Wir erinnern Sie an jedem Werktag um 7:30."), off: tt("No reminder.", "Keine Erinnerung.") },
        ],
      },
      learn: { title: tt("Learn", "Lernen"), crumb: tt("Learn", "Lernen"), section: "learn", blocks: [{ t: "h", text: tt("Negotiation basics", "Verhandlungsgrundlagen") }, { t: "links", size: 16, items: t.slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l.title}`, go: `m${i}`, track: true })) }] },
      ...lessons,
      downloads: { title: tt("Downloads", "Downloads"), crumb: tt("Downloads", "Downloads"), section: "downloads", blocks: [{ t: "h", text: tt("Learn without a connection", "Ohne Verbindung lernen") }, { t: "toggle", label: tt("Download Negotiation basics", "Verhandlungsgrundlagen herunterladen"), on: tt("Downloaded. The lessons open without a connection.", "Heruntergeladen. Die Lektionen öffnen sich ohne Verbindung."), off: tt("Not downloaded.", "Nicht heruntergeladen.") }] },
      store: { title: tt("Get the app", "App holen"), crumb: tt("Get the app", "App holen"), section: "store", blocks: [{ t: "hero", kicker: tt("PocketCampus for iPhone and Android", "PocketCampus für iPhone und Android"), title: tt("Your training in your pocket", "Ihre Weiterbildung in der Tasche"), text: tt("Short lessons that fit your phone, your place kept on every device, and lessons you can download for the train.", "Kurze Lektionen, die auf Ihr Handy passen, Ihr Stand auf jedem Gerät, und Lektionen zum Herunterladen für den Zug."), size: 15 }, { t: "quotes", items: [{ who: "Jan Peters", role: tt("Field sales", "Außendienst"), text: tt("I do a lesson between two customer visits.", "Ich mache eine Lektion zwischen zwei Kundenterminen.") }] }, { t: "note", title: tt("Install", "Installieren"), text: tt("Free for employees of customer companies.", "Für Beschäftigte von Kundenunternehmen kostenlos."), button: { label: tt("Install", "Installieren"), msg: tt("This is a simulation: nothing is installed.", "Das ist eine Simulation: Es wird nichts installiert.") } }] },
    },
  };
};
