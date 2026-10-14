import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 10 (feedback, progress tracking, responsive design and accessibility). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32):
 * every technical term the cards and tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY10: GlossEntry[] = [
  {
    id: "direct-feedback",
    title: "Direct and indirect feedback",
    match: ["direct feedback", "indirect feedback", "direct and indirect feedback"],
    plain: "Direct feedback answers one action at once: correct or incorrect, a tick, an explained result. Indirect feedback shows how work adds up over time, such as a progress bar or a note at a milestone.",
    example: "A tick after a saved task is direct; “3 of 8 lessons done” is indirect.",
    from: "Materi A1",
    de: { title: "Direktes und indirektes Feedback", match: ["direktes Feedback", "indirektes Feedback", "direktes und indirektes Feedback", "direkte Rückmeldung"], plain: "Direktes Feedback antwortet sofort auf eine Aktion: richtig oder falsch, ein Haken, ein erklärtes Ergebnis. Indirektes Feedback zeigt, wie sich Arbeit über die Zeit summiert, etwa ein Fortschrittsbalken oder ein Hinweis an einem Meilenstein.", example: "Ein Haken nach einer gespeicherten Aufgabe ist direkt; „3 von 8 Lektionen erledigt“ ist indirekt." },
  },
  {
    id: "responsive",
    title: "Responsive design",
    match: ["responsive design", "responsive", "mobile first", "mobile-first", "phone-first"],
    plain: "A way of building a platform so that its layout adapts to the screen it is shown on: phone, tablet or desktop. It also means deciding what comes first on each device. “Mobile first” means designing for the small screen first.",
    example: "On a phone the lesson page puts “Continue” at the top in large type; on a desktop it also shows notes beside the lesson.",
    from: "Wroblewski 2011",
    de: { title: "Responsive Design", match: ["Responsive Design", "responsive", "responsives", "responsiven", "responsive Redesign", "Mobile First", "Handy-zuerst"], plain: "Eine Art, eine Plattform so zu bauen, dass sich ihr Layout an den Bildschirm anpasst, auf dem sie gezeigt wird: Handy, Tablet oder Desktop. Dazu gehört auch zu entscheiden, was auf jedem Gerät zuerst kommt. „Mobile First“ heißt, zuerst für den kleinen Bildschirm zu gestalten.", example: "Auf dem Handy setzt die Lektionsseite „Weiter“ groß nach oben; auf dem Desktop zeigt sie zusätzlich Notizen neben der Lektion." },
  },
  {
    id: "touch-target",
    title: "Touch target",
    match: ["touch target", "touch targets", "target size", "targets"],
    plain: "The area a finger can press to use a button or a link. Small targets are hard to hit, above all for people with a tremor or on a moving train. WCAG 2.2 requires at least 24 px at Level AA; 44 px is a common aim.",
    example: "A Next button 44 px high is easy to hit with a thumb; one 20 px high is not.",
    from: "WCAG 2.2",
    de: { title: "Touch-Ziel", match: ["Touch-Ziel", "Touch-Ziele", "Touch-Zielen", "Zielgröße", "Ziele"], plain: "Die Fläche, die ein Finger drücken kann, um einen Button oder Link zu nutzen. Kleine Ziele sind schwer zu treffen, vor allem für Menschen mit Zittern oder in einem fahrenden Zug. WCAG 2.2 verlangt mindestens 24 px auf Stufe AA; 44 px sind ein verbreitetes Ziel.", example: "Ein Weiter-Button von 44 px Höhe ist mit dem Daumen leicht zu treffen; einer von 20 px nicht." },
  },
  {
    id: "reflow",
    title: "Reflow",
    match: ["reflow", "reflows", "reflow without sideways scrolling"],
    plain: "Text and layout rearrange themselves to fit the width of the screen, so that nobody has to scroll sideways to read a line. WCAG 1.4.10 asks for this at a width of 320 CSS px.",
    example: "On a phone the lesson text wraps to the screen instead of running off the right edge.",
    from: "WCAG 1.4.10",
    de: { title: "Reflow", match: ["Reflow", "umbricht", "Text, der umbricht", "auf die Handybreite umbricht"], plain: "Text und Layout ordnen sich neu, um in die Breite des Bildschirms zu passen, sodass niemand seitlich scrollen muss, um eine Zeile zu lesen. WCAG 1.4.10 verlangt das bei einer Breite von 320 CSS-px.", example: "Auf dem Handy bricht der Lektionstext auf den Bildschirm um, statt über den rechten Rand zu laufen." },
  },
];
