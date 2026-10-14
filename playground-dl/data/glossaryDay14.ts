import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 14 (plain language, intuitive environments, testing). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32): every technical term the
 * cards and tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY14: GlossEntry[] = [
  {
    id: "jargon",
    title: "Jargon",
    match: ["jargon", "technical terms", "technical term"],
    plain: "Special words that experts use among themselves and that newcomers do not know. In a learning platform, jargon without an explanation keeps newcomers out. The cure is an everyday word or a short explanation where the term appears.",
    example: "“Asynchronous modality” instead of “learn when it suits you”.",
    from: "Materi A1",
    de: { title: "Jargon", match: ["Jargon", "Fachbegriffe", "Fachbegriff", "Fachbegriffen"], plain: "Besondere Wörter, die Experten untereinander nutzen und die Neulinge nicht kennen. Auf einer Lernplattform hält Jargon ohne Erklärung Neulinge draußen. Das Mittel ist ein Alltagswort oder eine kurze Erklärung dort, wo der Begriff vorkommt.", example: "„Asynchrone Modalität“ statt „lernen, wann es passt“." },
  },
  {
    id: "comprehension",
    title: "Comprehensibility (understandability)",
    match: ["comprehensibility", "comprehension", "understandability", "comprehension hurdles", "comprehension barriers"],
    plain: "How easily the intended readers can understand a text or a screen at first reading. The plan's chain is: comprehensibility leads to usage, and usage leads to success. A comprehension check asks readers to explain something back in their own words.",
    example: "A learner who can say in one sentence what a screen asks of them understands it.",
    from: "Materi A1",
    de: { title: "Verständlichkeit", match: ["Verständlichkeit", "Verständnis", "Verständnishürden", "Verständnisbarrieren", "Verständnis-Check"], plain: "Wie leicht die gemeinten Leser einen Text oder Bildschirm beim ersten Lesen verstehen. Die Kette des Plans lautet: Verständlichkeit führt zu Nutzung, und Nutzung führt zu Erfolg. Ein Verständnis-Check bittet Leser, etwas mit eigenen Worten zurückzuerklären.", example: "Eine Lernende, die in einem Satz sagen kann, was ein Bildschirm von ihr verlangt, versteht ihn." },
  },
  {
    id: "error-prevention",
    title: "Error prevention",
    match: ["error prevention", "preventable mistake", "prevent a mistake"],
    plain: "Designing so that a mistake cannot happen in the first place, instead of showing an error afterwards. It is one of the three usability principles in this course, next to efficiency and consistency.",
    example: "The Send button stays off until a file has been added.",
    from: "Materi A2",
    de: { title: "Fehlervermeidung", match: ["Fehlervermeidung", "vermeidbarer Fehler", "vermeidbare Fehler", "vermeidbaren Fehler"], plain: "So zu gestalten, dass ein Fehler gar nicht erst passieren kann, statt hinterher eine Fehlermeldung zu zeigen. Es ist eines der drei Usability-Prinzipien dieses Kurses, neben Effizienz und Konsistenz.", example: "Der Button Senden bleibt aus, bis eine Datei hinzugefügt wurde." },
  },
  {
    id: "complexity",
    title: "Complexity",
    match: ["complexity", "complex"],
    plain: "How many parts, steps and terms a person has to keep in mind. The plan says it is UX's greatest enemy. Some complexity belongs to the subject and is needed; the complexity the interface adds is the part to remove.",
    example: "Eleven menu entries add complexity; a demanding legal course may need its depth.",
    from: "Materi B2",
    de: { title: "Komplexität", match: ["Komplexität", "komplex", "komplexe", "komplexen", "komplexer"], plain: "Wie viele Teile, Schritte und Begriffe ein Mensch im Kopf behalten muss. Der Plan nennt sie den größten Feind der UX. Manche Komplexität gehört zum Thema und ist nötig; die Komplexität, die die Oberfläche hinzufügt, ist der Teil, der weg sollte.", example: "Elf Menüeinträge fügen Komplexität hinzu; ein anspruchsvoller Rechtskurs braucht vielleicht seine Tiefe." },
  },
  {
    id: "five-second-test",
    title: "Five-second test",
    match: ["five-second test", "five second test"],
    plain: "A quick test: people see a screen for five seconds and then say what it was about and what they remember. It shows whether a screen is understood at a glance.",
    example: "After five seconds, a learner says “it is about starting a course”, so the screen works.",
    from: "Materi A3",
    de: { title: "Fünf-Sekunden-Test", match: ["Fünf-Sekunden-Test", "Fünf-Sekunden-Tests"], plain: "Ein schneller Test: Menschen sehen einen Bildschirm fünf Sekunden lang und sagen dann, worum es ging und was sie behalten haben. Er zeigt, ob ein Bildschirm auf einen Blick verstanden wird.", example: "Nach fünf Sekunden sagt eine Lernende „es geht darum, einen Kurs zu starten“, der Bildschirm funktioniert also." },
  },
];
