import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 16 (UX testing, analytics, KPIs and data-driven optimisation). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32): every technical term
 * the cards and tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY16: GlossEntry[] = [
  {
    id: "tracking",
    title: "Tracking",
    match: ["tracking", "tracked"],
    plain: "Recording what users do on a platform, such as clicks, time spent and where they leave. It helps to understand behaviour, and data protection and ethics set limits on what may be collected and how long it is kept.",
    example: "Recording that a learner left the course page after 40 seconds.",
    from: "Materi A2",
    de: { title: "Tracking", match: ["Tracking", "erfasst", "erfasste", "erfassen", "Tracking-Setup"], plain: "Zu erfassen, was Nutzer auf einer Plattform tun, etwa Klicks, Verweildauer und wo sie gehen. Es hilft, Verhalten zu verstehen, und Datenschutz und Ethik setzen Grenzen dafür, was erfasst werden darf und wie lange es gespeichert wird.", example: "Zu erfassen, dass eine Lernende die Kursseite nach 40 Sekunden verlassen hat." },
  },
  {
    id: "heatmap",
    title: "Heatmap",
    match: ["heatmap", "heatmaps"],
    plain: "A picture of a page in which colour shows where people click, tap or how far they scroll. It shows where something happens, not why, so it is a starting point for a question.",
    example: "A red patch on a button that nobody reads, but everybody taps.",
    from: "Materi A2",
    de: { title: "Heatmap", match: ["Heatmap", "Heatmaps"], plain: "Ein Bild einer Seite, in dem Farbe zeigt, wo Menschen klicken, tippen oder wie weit sie scrollen. Es zeigt, wo etwas geschieht, nicht warum, es ist also ein Ausgangspunkt für eine Frage.", example: "Ein roter Fleck auf einem Button, den niemand liest, aber alle antippen." },
  },
  {
    id: "cohort",
    title: "Cohort analysis",
    match: ["cohort analysis", "cohort", "cohorts"],
    plain: "Looking at a group of users who share something, such as the week they signed up, and following that group over time. It shows whether the same group behaves differently from another, and where drop-out concentrates.",
    example: "Drop-out of everyone who signed up in March, compared with those who signed up in April.",
    from: "Materi A5",
    de: { title: "Kohortenanalyse", match: ["Kohortenanalyse", "Kohorte", "Kohorten"], plain: "Eine Gruppe von Nutzern anzusehen, die etwas gemeinsam haben, etwa die Woche der Anmeldung, und diese Gruppe über die Zeit zu verfolgen. Sie zeigt, ob dieselbe Gruppe sich anders verhält als eine andere und wo sich Abbrüche konzentrieren.", example: "Die Abbrüche aller, die sich im März angemeldet haben, verglichen mit denen, die sich im April angemeldet haben." },
  },
  {
    id: "vanity-metric",
    title: "Vanity metric",
    match: ["vanity metric", "vanity metrics"],
    plain: "A number that looks good and does not help to decide anything, because it mostly only rises. Total registered users is a typical case. A useful KPI ties to behaviour and an outcome.",
    example: "“10,000 users registered” says nothing about how many ever finished a course.",
    from: "Materi A2",
    de: { title: "Eitelkeitskennzahl", match: ["Eitelkeitskennzahl", "Eitelkeitskennzahlen", "Vanity Metric", "Vanity Metrics"], plain: "Eine Zahl, die gut aussieht und bei keiner Entscheidung hilft, weil sie meist nur steigt. Die Gesamtzahl registrierter Nutzer ist ein typischer Fall. Eine nützliche KPI bindet sich an Verhalten und ein Ergebnis.", example: "„10.000 Nutzer registriert“ sagt nichts darüber, wie viele je einen Kurs beendet haben." },
  },
  {
    id: "consent",
    title: "Consent",
    match: ["consent", "get consent"],
    plain: "A person's free and informed agreement to the collection of their data, given before it happens. In the EU the GDPR requires a lawful basis for collecting personal data, and for some tracking that basis is consent. Which one applies depends on the data and the purpose.",
    example: "A banner that lets a learner say yes or no to analytics cookies before they are set.",
    from: "Materi A2",
    de: { title: "Einwilligung", match: ["Einwilligung"], plain: "Die freie und informierte Zustimmung einer Person zur Erfassung ihrer Daten, gegeben, bevor es geschieht. In der EU verlangt die DSGVO eine Rechtsgrundlage für das Erfassen personenbezogener Daten, und für manches Tracking ist diese Grundlage die Einwilligung. Welche gilt, hängt von den Daten und dem Zweck ab.", example: "Ein Banner, das eine Lernende vor dem Setzen von Analyse-Cookies Ja oder Nein sagen lässt." },
  },
];
