import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 12 (adaptive learning and personalisation). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32): every technical term the cards and
 * tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY12: GlossEntry[] = [
  {
    id: "rule-based",
    title: "Rule-based system",
    match: ["rule-based", "rules", "if-then", "if–then", "if-then rules"],
    plain: "A system that decides by rules a person has written down, in the form “if this, then that”. It needs little data, and a learner can be told exactly which rule applied.",
    example: "“If the test is passed, skip the lesson; if it is failed, repeat it.”",
    from: "Materi A2",
    de: { title: "Regelbasiertes System", match: ["regelbasiert", "regelbasierte", "regelbasierten", "Regeln", "Wenn-dann", "Wenn-dann-Regeln"], plain: "Ein System, das nach Regeln entscheidet, die ein Mensch aufgeschrieben hat, in der Form „wenn dies, dann das“. Es braucht wenige Daten, und einer Lernenden lässt sich genau sagen, welche Regel galt.", example: "„Wenn der Test bestanden ist, die Lektion überspringen; wenn nicht, sie wiederholen.“" },
  },
  {
    id: "machine-learning",
    title: "Machine learning",
    match: ["machine learning", "machine-learning", "model", "models", "AI model", "data-driven"],
    plain: "A way for a computer to find patterns in a lot of data and use them to make predictions, such as which lesson suits a learner. It needs a lot of good data, and it usually cannot say why it chose what it chose.",
    example: "A model that learns from thousands of learners which lesson to show next.",
    from: "Materi A2",
    de: { title: "Maschinelles Lernen", match: ["maschinelles Lernen", "maschinellen Lernens", "Modell", "Modelle", "Modells", "KI-Modell", "datengetrieben", "datengetriebene", "datengetriebenes"], plain: "Eine Art, wie ein Computer in vielen Daten Muster findet und sie für Vorhersagen nutzt, etwa welche Lektion zu einer Lernenden passt. Es braucht viele gute Daten, und meist kann es nicht sagen, warum es gewählt hat, was es gewählt hat.", example: "Ein Modell, das von Tausenden Lernenden lernt, welche Lektion als Nächstes gezeigt wird." },
  },
  {
    id: "black-box",
    title: "Black box",
    match: ["black box", "closed box", "opaque", "opacity"],
    plain: "A system whose inner workings and reasons cannot be seen. Data goes in and an answer comes out, but nobody can say why. For a learner it means an adaptation they cannot understand.",
    example: "A recommendation that appears with no reason.",
    from: "Materi A2",
    de: { title: "Black Box", match: ["Black Box", "geschlossene Box", "geschlossenen Box", "undurchsichtig", "undurchsichtige", "Undurchsichtigkeit"], plain: "Ein System, dessen Innenleben und Gründe sich nicht sehen lassen. Daten gehen hinein und eine Antwort kommt heraus, aber niemand kann sagen, warum. Für eine Lernende heißt das eine Anpassung, die sie nicht verstehen kann.", example: "Eine Empfehlung, die ohne Grund erscheint." },
  },
  {
    id: "over-adaptation",
    title: "Over-adaptation",
    match: ["over-adaptation", "overadaptation", "adapts too strongly"],
    plain: "When a system reacts too strongly to too little evidence, such as one mistake or a few clicks, and boxes the learner in. The learner then never sees other content and cannot get out.",
    example: "Difficulty drops two levels after one wrong answer, with no way back.",
    from: "Materi A2",
    de: { title: "Überanpassung", match: ["Überanpassung", "Überanpassungen", "überanpasst"], plain: "Wenn ein System zu stark auf zu wenig Beleg reagiert, etwa einen Fehler oder wenige Klicks, und die Lernende einsperrt. Die Lernende sieht dann nie anderen Inhalt und kommt nicht heraus.", example: "Die Schwierigkeit sinkt nach einer falschen Antwort um zwei Stufen, ohne Weg zurück." },
  },
  {
    id: "transparency",
    title: "Transparency",
    match: ["transparency", "transparent", "transparent adaptation"],
    plain: "That people can see what a system does and why. In an adaptive platform it means each change says what changed and for what reason, so the learner is not left guessing.",
    example: "“Difficulty lowered: you missed 3 of 4 questions on pricing.”",
    from: "Materi A1",
    de: { title: "Transparenz", match: ["Transparenz", "transparent", "transparente", "transparenten", "transparenter"], plain: "Dass Menschen sehen können, was ein System tut und warum. In einer adaptiven Plattform heißt es, dass jede Änderung sagt, was sich geändert hat und aus welchem Grund, die Lernende muss also nicht raten.", example: "„Schwierigkeit gesenkt: Sie haben 3 von 4 Fragen zur Preisgestaltung verfehlt.“" },
  },
  {
    id: "data-quality",
    title: "Data quality and data basis",
    match: ["data quality", "data basis", "small data basis", "incomplete data basis"],
    plain: "Whether the data a system learns from is enough, correct and typical of the people it serves. A small or biased data basis makes a system guess or treat some learners wrongly, however clever the technique.",
    example: "Twelve learners are too few for a model to find a pattern.",
    from: "Materi A2",
    de: { title: "Datenqualität und Datenbasis", match: ["Datenqualität", "Datenbasis", "kleine Datenbasis", "kleiner Datenbasis", "unvollständige Datenbasis", "unvollständiger Datenbasis"], plain: "Ob die Daten, aus denen ein System lernt, ausreichen, korrekt sind und typisch für die Menschen, denen es dient. Eine kleine oder verzerrte Datenbasis lässt ein System raten oder manche Lernende falsch behandeln, so klug die Technik auch ist.", example: "Zwölf Lernende sind zu wenige, damit ein Modell ein Muster findet." },
  },
];
