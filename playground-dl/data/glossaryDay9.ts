import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 9 (information architecture, navigation, interactive elements and engagement). Same shape and rules as data/glossary.ts
 * (CLAUDE.md #19, #32): every technical term the cards and tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY9: GlossEntry[] = [
  {
    id: "interaction",
    title: "Interaction",
    match: ["interaction", "interactions", "interactive", "interactive elements"],
    plain: "Anything the learner does on a screen beyond reading or watching: answering a question, doing a task, choosing in a scenario, pressing a button. Interaction helps learning only when it is tied to a goal and answers back.",
    example: "A short question after a lesson section, with an explained answer.",
    from: "Materi A3",
    de: { title: "Interaktion", match: ["Interaktion", "Interaktionen", "interaktive", "interaktiven", "interaktive Elemente", "Interaktionsstrategie"], plain: "Alles, was die Lernende auf einem Bildschirm über Lesen oder Ansehen hinaus tut: eine Frage beantworten, eine Aufgabe machen, in einem Szenario wählen, einen Button drücken. Interaktion hilft dem Lernen nur, wenn sie an ein Ziel gebunden ist und antwortet.", example: "Eine kurze Frage nach einem Lektionsabschnitt, mit erklärter Antwort." },
  },
  {
    id: "icap",
    title: "ICAP framework",
    match: ["ICAP", "ICAP framework"],
    plain: "A way to sort what a learner does into four kinds: passive (reading), active (doing something with the material), constructive (producing something new) and interactive (working it out with others). Research suggests learning tends to improve in that order.",
    example: "Reading about anchoring is passive; writing your own opening offer is constructive.",
    from: "Chi and Wylie 2014",
    de: { title: "ICAP-Rahmen", match: ["ICAP", "ICAP-Rahmen"], plain: "Eine Weise, das, was eine Lernende tut, in vier Arten zu ordnen: passiv (lesen), aktiv (etwas mit dem Material tun), konstruktiv (etwas Neues hervorbringen) und interaktiv (es mit anderen ausarbeiten). Die Forschung legt nahe, dass sich das Lernen tendenziell in dieser Reihenfolge verbessert.", example: "Über Verankern zu lesen ist passiv; ein eigenes Eröffnungsangebot zu schreiben ist konstruktiv." },
  },
  {
    id: "breadcrumb",
    title: "Path (breadcrumb)",
    match: ["breadcrumb", "breadcrumbs", "path above the page", "a path above"],
    plain: "A line above a page that shows where you are in the structure, such as Learn › Negotiation › Lesson 3 of 8. It answers “where am I?” and lets you step back up one level.",
    example: "“Learn › Negotiation › Lesson 3 of 8” above a lesson.",
    from: "Materi A2",
    de: { title: "Pfad (Breadcrumb)", match: ["Breadcrumb", "Breadcrumbs", "Pfad über der Seite", "ein Pfad über der Seite", "Pfad über der Lektion"], plain: "Eine Zeile über einer Seite, die zeigt, wo Sie in der Struktur sind, etwa Lernen › Verhandeln › Lektion 3 von 8. Sie beantwortet „Wo bin ich?“ und lässt Sie eine Ebene zurücktreten.", example: "„Lernen › Verhandeln › Lektion 3 von 8“ über einer Lektion." },
  },
  {
    id: "mega-menu",
    title: "Mega menu",
    match: ["mega menu"],
    plain: "A very large dropdown menu that lists many pages of a platform at once. It looks complete, but it brings back the problem of too many options at one decision point.",
    example: "A menu panel with 40 links in six columns.",
    from: "Materi B1",
    de: { title: "Mega-Menü", match: ["Mega-Menü", "Mega-Menüs"], plain: "Ein sehr großes Aufklappmenü, das viele Seiten einer Plattform auf einmal auflistet. Es wirkt vollständig, bringt aber das Problem zu vieler Optionen an einem Entscheidungspunkt zurück.", example: "Ein Menüfeld mit 40 Links in sechs Spalten." },
  },
  {
    id: "skip-rate",
    title: "Skip rate",
    match: ["skip rate", "skip button", "skippable"],
    plain: "The share of learners who skip an optional element, such as a question or a tour. A high skip rate says the element does not help or is in the way; it is a figure you can watch after a change.",
    example: "30 of 100 learners skip the question in lesson 4.",
    from: "Materi B2",
    de: { title: "Überspringrate", match: ["Überspringrate", "Überspringen-Button", "überspringbar", "überspringen"], plain: "Der Anteil der Lernenden, die ein optionales Element wie eine Frage oder eine Tour überspringen. Eine hohe Überspringrate sagt, dass das Element nicht hilft oder im Weg ist; es ist eine Zahl, die Sie nach einer Änderung beobachten können.", example: "30 von 100 Lernenden überspringen die Frage in Lektion 4." },
  },
];
