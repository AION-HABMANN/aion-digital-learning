import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 13 (inclusive UX/UI and WCAG). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32): every technical term the cards and tasks use that
 * is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY13: GlossEntry[] = [
  {
    id: "barrier",
    title: "Barrier",
    match: ["barrier", "barriers"],
    plain: "Something in a product that makes it hard or impossible for some people to use. A barrier can slow a person down, stop them completely, or lose them quietly. It is in the product, not in the person.",
    example: "A menu that opens only when a mouse hovers over it is a barrier for someone who uses only a keyboard.",
    from: "Materi A1",
    de: { title: "Barriere", match: ["Barriere", "Barrieren"], plain: "Etwas in einem Produkt, das es für manche Menschen schwer oder unmöglich macht, es zu nutzen. Eine Barriere kann einen Menschen bremsen, vollständig stoppen oder still verlieren. Sie liegt im Produkt, nicht im Menschen.", example: "Ein Menü, das sich nur öffnet, wenn eine Maus darüber fährt, ist eine Barriere für jemanden, der nur eine Tastatur nutzt." },
  },
  {
    id: "alt-text",
    title: "Text alternative (alt text)",
    match: ["text alternative", "text alternatives", "alt text", "alternative text", "alternative content"],
    plain: "A short text that says what an image or chart shows, so that a person who cannot see it, for example with a screen reader, gets the same message. A purely decorative image needs none.",
    example: "“Sales rose in each of the four quarters” for a bar chart.",
    from: "Materi A3",
    de: { title: "Textalternative (Alt-Text)", match: ["Textalternative", "Textalternativen", "Alt-Text", "Alternativtext", "alternative Inhalte", "alternativen Inhalt"], plain: "Ein kurzer Text, der sagt, was ein Bild oder Diagramm zeigt, damit ein Mensch, der es nicht sehen kann, etwa mit einem Screenreader, dieselbe Aussage bekommt. Ein rein dekoratives Bild braucht keinen.", example: "„Der Umsatz stieg in jedem der vier Quartale“ bei einem Balkendiagramm." },
  },
  {
    id: "assistive-technology",
    title: "Assistive technology",
    match: ["assistive technology", "assistive technologies", "screen reader and keyboard"],
    plain: "Tools that people with impairments use to work with a computer, such as a screen reader that reads the page aloud, a switch, or a magnifier. A product has to work with them, which is the idea of the principle “robust”.",
    example: "A blind learner uses a screen reader to hear the lesson.",
    from: "Materi A2",
    de: { title: "Assistive Technologie", match: ["assistive Technologie", "assistive Technologien", "assistiven Technologien", "assistiver Technologie", "assistiven Technologie"], plain: "Werkzeuge, mit denen Menschen mit Beeinträchtigungen einen Computer nutzen, etwa ein Screenreader, der die Seite vorliest, ein Schalter oder eine Bildschirmlupe. Ein Produkt muss mit ihnen funktionieren, das ist die Idee des Prinzips „robust“.", example: "Eine blinde Lernende nutzt einen Screenreader, um die Lektion zu hören." },
  },
  {
    id: "captions",
    title: "Captions",
    match: ["captions", "caption", "captioned"],
    plain: "Text shown with a video that gives the spoken words and important sounds. They let deaf and hard-of-hearing learners follow, and help anyone watching without sound.",
    example: "Captions for a training video watched on a train with the sound off.",
    from: "Materi A3",
    de: { title: "Untertitel", match: ["Untertitel", "Untertiteln"], plain: "Text, der mit einem Video gezeigt wird und die gesprochenen Worte und wichtige Geräusche wiedergibt. Er lässt gehörlose und schwerhörige Lernende folgen und hilft allen, die ohne Ton schauen.", example: "Untertitel für ein Schulungsvideo, das im Zug ohne Ton geschaut wird." },
  },
  {
    id: "focus-indicator",
    title: "Focus indicator",
    match: ["focus indicator", "visible focus", "focus", "focus outline"],
    plain: "The outline or highlight that shows which element on a page is selected when someone moves with the keyboard. Without it, a keyboard user cannot tell where they are.",
    example: "A dark outline around the “Continue” button when Tab reaches it.",
    from: "Materi A3",
    de: { title: "Fokusanzeige", match: ["Fokusanzeige", "sichtbarer Fokus", "sichtbaren Fokus", "Fokus", "Fokusmarkierung"], plain: "Die Umrandung oder Hervorhebung, die zeigt, welches Element einer Seite ausgewählt ist, wenn jemand sich mit der Tastatur bewegt. Ohne sie kann ein Tastaturnutzer nicht sagen, wo er ist.", example: "Eine dunkle Umrandung um den Button „Weiter“, wenn Tab ihn erreicht." },
  },
  {
    id: "compliance",
    title: "Compliance",
    match: ["compliance", "non-compliance", "legal risk", "legal risks"],
    plain: "Meeting the rules that apply, such as a law or a standard. For accessibility it means that a product meets the required level (for example WCAG 2.2 AA). The coaching point is that this is the minimum, not the goal.",
    example: "A platform that fails the contrast rule is not compliant, and may face complaints.",
    from: "Materi B1",
    de: { title: "Compliance", match: ["Compliance", "Nichteinhaltung", "rechtliche Risiken", "rechtliches Risiko", "rechtlichen Risiken"], plain: "Die geltenden Regeln einzuhalten, etwa ein Gesetz oder einen Standard. Bei Barrierefreiheit heißt es, dass ein Produkt die geforderte Stufe erfüllt (zum Beispiel WCAG 2.2 AA). Der Coaching-Punkt ist, dass das das Minimum ist, nicht das Ziel.", example: "Eine Plattform, die die Kontrastregel verfehlt, ist nicht konform und muss mit Beschwerden rechnen." },
  },
];
