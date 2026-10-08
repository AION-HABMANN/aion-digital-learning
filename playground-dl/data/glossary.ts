import { getLang } from "@/lib/lang";

/**
 * Plain-language glossary (CLAUDE.md #19), in English and German (#32). Every technical term, abbreviation or foreign word that the material
 * or a task uses is an entry here. In the text it becomes a dotted link; a click opens the explanation. Written for someone who is NOT an
 * expert (the DL learners may have no UX background): short sentences, everyday words, one example where it helps.
 *
 * `match` lists every English written form; `de.match` every form the German text uses (the English term itself, with the German plural or
 * genitive forms, and German words). The German `title` keeps the English term where German practitioners use it. An all-capitals match
 * ("UX") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [
  {
    id: "ux",
    title: "UX (user experience)",
    match: ["UX", "user experience"],
    plain: "How using something feels from the first click to the last: finding it, understanding it, getting done what you came for. It is the whole experience, not only the screens.",
    example: "A learner who finds the next lesson at once, understands it and sees that they are nearly done has a good UX.",
    from: "Norman & Nielsen",
    de: { title: "UX (User Experience)", match: ["UX", "User Experience"], plain: "Wie sich die Nutzung von etwas vom ersten bis zum letzten Klick anfühlt: es finden, es verstehen, das erreichen, wofür man gekommen ist. Es ist das ganze Erlebnis, nicht nur die Bildschirme.", example: "Wer die nächste Lektion sofort findet, sie versteht und sieht, dass er fast fertig ist, hat eine gute UX." },
  },
  {
    id: "ui",
    title: "UI (user interface)",
    match: ["UI", "user interface"],
    plain: "What you see and touch on a screen: buttons, colours, text, icons, layout. It is one part of the experience, the surface.",
    example: "Changing a button from grey to blue is a UI change.",
    from: "Norman & Nielsen",
    de: { title: "UI (User Interface)", match: ["UI", "User Interface"], plain: "Was man auf einem Bildschirm sieht und anfasst: Buttons, Farben, Text, Icons, Layout. Es ist ein Teil des Erlebnisses, die Oberfläche.", example: "Einen Button von grau auf blau zu ändern, ist eine UI-Änderung." },
  },
  {
    id: "user-centred",
    title: "User-centred design",
    match: ["user-centred design", "user-centred", "user-centered", "user-centeredness", "user-centred approach"],
    plain: "Designing from what the users want to do and need, not from what the software can do. You start with the people, their tasks and their situation, and check your design with them.",
    example: "Instead of asking “which features do we have?”, you ask “what does a learner want to do when they open the app?”.",
    from: "ISO 9241-210",
    de: { title: "Nutzerzentriertes Design", match: ["nutzerzentriertes Design", "nutzerzentriert", "nutzerzentrierte", "nutzerzentrierten", "Nutzerzentrierung"], plain: "Gestalten von dem aus, was die Nutzer tun wollen und brauchen, nicht von dem, was die Software kann. Sie beginnen bei den Menschen, ihren Aufgaben und ihrer Situation und prüfen Ihr Design mit ihnen.", example: "Statt „Welche Funktionen haben wir?“ fragen Sie „Was will eine Lernende tun, wenn sie die App öffnet?“." },
  },
  {
    id: "system-logic",
    title: "System logic",
    match: ["system logic", "the system's logic"],
    plain: "Organising a screen the way the software is built, for example a menu that lists every feature, instead of the way the user thinks about their task.",
    example: "A menu with “Library, Catalogue, Admin, Reports” is system logic; “Continue where I stopped” is learner logic.",
    de: { title: "Systemlogik", match: ["Systemlogik", "Logik des Systems"], plain: "Einen Bildschirm so ordnen, wie die Software gebaut ist, etwa ein Menü, das jede Funktion auflistet, statt so, wie der Nutzer über seine Aufgabe denkt.", example: "Ein Menü mit „Bibliothek, Katalog, Admin, Berichte“ ist Systemlogik; „Dort weitermachen, wo ich aufgehört habe“ ist Logik der Lernenden." },
  },
  {
    id: "learning-path",
    title: "Learning path",
    match: ["learning path", "learning paths", "learning pathway"],
    plain: "A set order in which a learner goes through the material of a course: what to do first, next and last. It tells a beginner where to start and how far there is to go.",
    example: "“Lesson 1 → Lesson 2 → Quiz → Lesson 3” shown on screen as a path.",
    de: { title: "Lernpfad", match: ["Lernpfad", "Lernpfade", "Lernpfaden", "Lernpfades"], plain: "Eine feste Reihenfolge, in der Lernende das Material eines Kurses durchgehen: was zuerst, als Nächstes und zuletzt zu tun ist. Er sagt Einsteigern, wo sie anfangen und wie weit es noch ist.", example: "„Lektion 1 → Lektion 2 → Quiz → Lektion 3“, als Pfad auf dem Bildschirm gezeigt." },
  },
  {
    id: "cognitive-load",
    title: "Cognitive load",
    match: ["cognitive load"],
    plain: "How much a person has to hold in mind and work out at once. Attention is limited. Effort spent on decoding a cluttered screen is effort that is missing for learning the content.",
    example: "A 500-word block of text with no headings costs more attention than the same text in five short parts.",
    from: "Sweller 1988",
    de: { title: "Kognitive Belastung (Cognitive Load)", match: ["kognitive Belastung", "kognitiven Belastung", "Cognitive Load"], plain: "Wie viel ein Mensch gleichzeitig im Kopf halten und durchdenken muss. Aufmerksamkeit ist begrenzt. Mühe, die in das Entziffern eines vollen Bildschirms fließt, fehlt zum Lernen des Inhalts.", example: "Ein Textblock von 500 Wörtern ohne Überschriften kostet mehr Aufmerksamkeit als derselbe Text in fünf kurzen Teilen." },
  },
  {
    id: "dropout",
    title: "Drop-out rate",
    match: ["drop-out rate", "drop-out", "dropout rate", "drop out", "drop-outs", "drop out rate"],
    plain: "The share of people who start something and stop before the end. A 40% drop-out rate means 40 of every 100 learners who start a course do not finish it. It counts who left, not why.",
    example: "100 learners start; 60 finish; the drop-out rate is 40%.",
    de: { title: "Abbruchquote (Drop-out-Rate)", match: ["Abbruchquote", "Drop-out-Rate", "Drop-out", "Abbrüche", "Abbruch"], plain: "Der Anteil der Menschen, die etwas beginnen und vor dem Ende aufhören. Eine Abbruchquote von 40 % heißt: 40 von je 100 Lernenden, die einen Kurs beginnen, schließen ihn nicht ab. Sie zählt, wer gegangen ist, nicht warum.", example: "100 Lernende beginnen; 60 schließen ab; die Abbruchquote ist 40 %." },
  },
  {
    id: "completion",
    title: "Completion rate",
    match: ["completion rate", "completion"],
    plain: "The share of people who start a course and finish it. It is the opposite side of the drop-out rate: 60% completion means 40% drop-out.",
    de: { title: "Completion Rate", match: ["Completion Rate", "Abschlussquote"], plain: "Der Anteil der Menschen, die einen Kurs beginnen und ihn abschließen. Sie ist die Gegenseite der Abbruchquote: 60 % Completion heißt 40 % Abbruch." },
  },
  {
    id: "retention",
    title: "Retention",
    match: ["retention"],
    plain: "How many learners come back after the first time, for the next lesson, the next course or the next year. A platform with good retention keeps its learners.",
    de: { title: "Retention", match: ["Retention", "Kundenbindung"], plain: "Wie viele Lernende nach dem ersten Mal wiederkommen, für die nächste Lektion, den nächsten Kurs oder das nächste Jahr. Eine Plattform mit guter Retention behält ihre Lernenden." },
  },
  {
    id: "engagement",
    title: "Engagement",
    match: ["engagement"],
    plain: "How much a learner actually does on the platform: lessons opened, tasks tried, time spent. High engagement is a sign that the platform holds attention; it does not prove they learned.",
    de: { title: "Engagement", match: ["Engagement"], plain: "Wie viel Lernende auf der Plattform tatsächlich tun: geöffnete Lektionen, versuchte Aufgaben, verbrachte Zeit. Hohes Engagement zeigt, dass die Plattform Aufmerksamkeit hält; es beweist nicht, dass gelernt wurde." },
  },
  {
    id: "progress-indicator",
    title: "Progress indicator",
    match: ["progress indicator", "progress bar", "progress bars", "progress display", "progress view", "progress views"],
    plain: "Something on screen that shows how far along the learner is, for example a bar and “3 of 8 lessons done”. It answers “where am I, and how much is left?”.",
    de: { title: "Fortschrittsanzeige", match: ["Fortschrittsanzeige", "Fortschrittsleiste", "Fortschrittsansicht", "Fortschrittsansichten"], plain: "Etwas auf dem Bildschirm, das zeigt, wie weit die Lernenden sind, zum Beispiel ein Balken und „3 von 8 Lektionen erledigt“. Es beantwortet „Wo bin ich, und wie viel bleibt?“.", example: "Ein Balken, der zu 3/8 gefüllt ist." },
  },
  {
    id: "feedback",
    title: "Feedback (in an interface)",
    match: ["feedback"],
    plain: "A sign from the system that tells the user what just happened or how they did: “saved”, “4 of 5 correct”, a bar that moves. Without it, users do not know whether their action worked.",
    from: "Nielsen 1994",
    de: { title: "Feedback", match: ["Feedback", "Rückmeldung", "Rückmeldungen"], plain: "Ein Zeichen des Systems, das den Nutzern sagt, was gerade passiert ist oder wie sie abgeschnitten haben: „gespeichert“, „4 von 5 richtig“, ein Balken, der sich bewegt. Ohne es wissen Nutzer nicht, ob ihre Handlung gewirkt hat." },
  },
  {
    id: "orientation",
    title: "Orientation",
    match: ["orientation"],
    plain: "Knowing where you are in a system, how you got there and what you can do next. Good orientation means a learner never has to guess.",
    de: { title: "Orientierung", match: ["Orientierung"], plain: "Zu wissen, wo man in einem System ist, wie man dorthin kam und was man als Nächstes tun kann. Gute Orientierung heißt, dass Lernende nie raten müssen." },
  },
  {
    id: "usability",
    title: "Usability",
    match: ["usability"],
    plain: "How well a system lets users reach their goals with little effort and few errors, and how satisfied they are. It is one part of the whole experience.",
    from: "ISO 9241-11",
    de: { title: "Usability", match: ["Usability", "Benutzbarkeit"], plain: "Wie gut ein System Nutzern erlaubt, ihre Ziele mit wenig Aufwand und wenigen Fehlern zu erreichen, und wie zufrieden sie dabei sind. Sie ist ein Teil des ganzen Erlebnisses." },
  },
  {
    id: "usability-test",
    title: "Usability test",
    match: ["usability test", "usability tests"],
    plain: "You watch real users try a task on the product while they think aloud, and note where they hesitate or fail. Five to ten people already show the main problems.",
    de: { title: "Usability-Test", match: ["Usability-Test", "Usability-Tests", "Usability-Tests"], plain: "Sie beobachten echte Nutzer dabei, wie sie eine Aufgabe am Produkt versuchen und dabei laut denken, und notieren, wo sie zögern oder scheitern. Fünf bis zehn Personen zeigen schon die Hauptprobleme." },
  },
  {
    id: "gamification",
    title: "Gamification",
    match: ["gamification", "badges", "badge", "leaderboard"],
    plain: "Using elements from games, such as points, badges, levels or rankings, in something that is not a game. Whether it helps depends on whether the learner wanted the result anyway.",
    example: "A badge after every lesson, or a ranking of all learners.",
    de: { title: "Gamification", match: ["Gamification", "Badges", "Badge", "Rangliste"], plain: "Elemente aus Spielen, etwa Punkte, Badges, Level oder Ranglisten, in etwas nutzen, das kein Spiel ist. Ob es hilft, hängt davon ab, ob die Lernenden das Ergebnis ohnehin wollten.", example: "Ein Badge nach jeder Lektion oder eine Rangliste aller Lernenden." },
  },
  {
    id: "self-directed",
    title: "Self-directed and guided learning",
    match: ["self-directed", "guided learning"],
    plain: "Self-directed learners study alone, at their own pace, and decide for themselves what to do next. Guided learners follow a trainer and a schedule. A platform must supply the structure and feedback a trainer would, for those who learn alone.",
    from: "Knowles 1975",
    de: { title: "Selbstgesteuertes und geführtes Lernen", match: ["selbstgesteuert", "selbstgesteuertes", "geführtes Lernen"], plain: "Selbstgesteuert Lernende lernen allein, im eigenen Tempo, und entscheiden selbst, was als Nächstes kommt. Geführt Lernende folgen einem Trainer und einem Zeitplan. Eine Plattform muss für alle, die allein lernen, die Struktur und das Feedback liefern, die sonst ein Trainer gäbe." },
  },
  {
    id: "user-impact",
    title: "User impact",
    match: ["user impact"],
    plain: "How much a measure helps the users with the problems they actually have: getting unstuck, understanding, carrying on. A measure that answers none of the findings has little user impact, however good it sounds.",
    de: { title: "Nutzerwirkung", match: ["Nutzerwirkung"], plain: "Wie sehr eine Maßnahme den Nutzern bei den Problemen hilft, die sie wirklich haben: weiterkommen, verstehen, dranbleiben. Eine Maßnahme, die keinen Befund beantwortet, hat wenig Nutzerwirkung, so gut sie auch klingt." },
  },
  {
    id: "roadmap",
    title: "Roadmap",
    match: ["roadmap"],
    plain: "A plan that puts decisions in order over time: what is done first, next and later, and why in that order.",
    de: { title: "Roadmap", match: ["Roadmap"], plain: "Ein Plan, der Entscheidungen zeitlich ordnet: was zuerst, als Nächstes und später geschieht, und warum in dieser Reihenfolge." },
  },
  {
    id: "conflicting-goals",
    title: "Conflicting goals (trade-off)",
    match: ["conflicting goals", "conflict of goals", "trade-off", "trade-offs"],
    plain: "Two goals that both matter, but cannot both be fully met: for example a simple screen against depth of content. A trade-off means you decide how much of each to keep, and say what you give up.",
    de: { title: "Zielkonflikt (Trade-off)", match: ["Zielkonflikt", "Zielkonflikte", "Zielkonflikten", "Trade-off", "Trade-offs"], plain: "Zwei Ziele, die beide zählen, aber nicht beide ganz erreicht werden können: zum Beispiel ein einfacher Bildschirm gegen Inhaltstiefe. Ein Trade-off heißt, Sie entscheiden, wie viel von jedem bleibt, und sagen, worauf Sie verzichten." },
  },
  {
    id: "decision-architecture",
    title: "Decision architecture",
    match: ["decision architecture"],
    plain: "The rule for how future decisions are made: who decides and what evidence they need. It stops a decision from resting on one person's taste.",
    de: { title: "Entscheidungsarchitektur", match: ["Entscheidungsarchitektur"], plain: "Die Regel, wie künftige Entscheidungen getroffen werden: wer entscheidet und welche Belege er braucht. Sie verhindert, dass eine Entscheidung am Geschmack einer einzelnen Person hängt." },
  },
  {
    id: "edtech",
    title: "EdTech",
    match: ["EdTech"],
    plain: "Short for “education technology”: companies that make software and platforms for teaching and learning.",
    de: { title: "EdTech", match: ["EdTech"], plain: "Kurz für „Education Technology“: Unternehmen, die Software und Plattformen zum Lehren und Lernen herstellen." },
  },
  {
    id: "ai",
    title: "AI (artificial intelligence)",
    match: ["AI", "AI-driven"],
    plain: "Software that learns patterns from data and uses them to predict or choose, for example which lesson to suggest next. It needs enough good data; with little data it guesses.",
    de: { title: "KI (künstliche Intelligenz)", match: ["KI", "KI-gestützte", "KI-gestützten", "KI-gestützt"], plain: "Software, die Muster aus Daten lernt und damit vorhersagt oder auswählt, zum Beispiel welche Lektion als Nächstes vorgeschlagen wird. Sie braucht genug gute Daten; mit wenigen Daten rät sie." },
  },
];

// --- lookup ---------------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
