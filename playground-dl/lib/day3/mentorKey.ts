import { MODEL_OPT } from "@/data/day3/case";
import { tt } from "@/lib/lang";
import type { D3R1, D3R2 } from "@/store/dayTypes";

/**
 * The model answers of Day 3 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every
 * missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that
 * language. Mentor tools stay English (#32); only the answers they enter are bilingual. The content follows the plan's Musterlösung (main
 * problem: extraneous cognitive load; measures: chunking, visualisation, a clear structure, reduction of irrelevant content; rationale:
 * learning capacity before the amount of information). A different, well-reasoned answer also exports (#38). The fill enters both layouts of
 * a list (the text box and the table); the learner's chosen layout is not changed.
 */
export function KEY_D3_R1(): Partial<D3R1> {
  return {
    problems: tt(
      "1. I get a wall of 500 words and do not know where to start reading.\n2. Nothing shows me which sentence matters most, so I read everything with the same effort.\n3. Words such as “pseudonymisation” are not explained, so I stop and look them up.\n4. There is no picture or diagram, so I have to build the picture in my head.\n5. I cannot tell how long the lesson is or when I am done.",
      "1. Ich bekomme eine Wand aus 500 Wörtern und weiß nicht, wo ich zu lesen anfangen soll.\n2. Nichts zeigt mir, welcher Satz am wichtigsten ist, ich lese also alles mit demselben Aufwand.\n3. Wörter wie „Pseudonymisierung“ werden nicht erklärt, ich höre also auf und schlage sie nach.\n4. Es gibt kein Bild und kein Diagramm, ich muss mir das Bild im Kopf selbst bauen.\n5. Ich kann nicht erkennen, wie lang die Lektion ist und wann ich fertig bin.",
    ),
    problemRows: [
      { problem: tt("One wall of 500 words", "Eine Wand aus 500 Wörtern"), side: tt("I do not know where to start reading", "Ich weiß nicht, wo ich zu lesen anfangen soll") },
      { problem: tt("Nothing is marked as the key point", "Nichts ist als Kernpunkt markiert"), side: tt("I read every sentence with the same effort", "Ich lese jeden Satz mit demselben Aufwand") },
      { problem: tt("Technical terms are not explained", "Fachbegriffe werden nicht erklärt"), side: tt("I stop and look them up", "Ich höre auf und schlage sie nach") },
      { problem: tt("No picture or diagram", "Kein Bild und kein Diagramm"), side: tt("I have to build the picture in my head", "Ich muss mir das Bild im Kopf bauen") },
      { problem: tt("No sign of length or progress", "Kein Zeichen für Länge oder Fortschritt"), side: tt("I cannot tell when I am done", "Ich erkenne nicht, wann ich fertig bin") },
    ],
    feel: tt(
      "It feels like work I did not choose. After the first few lines I lose track of what I have read, I start skimming, and by the end I could not say what the lesson was about. I would close the page and come back later, or not at all.",
      "Es fühlt sich an wie Arbeit, die ich nicht gewählt habe. Nach den ersten Zeilen verliere ich den Überblick darüber, was ich gelesen habe, ich überfliege, und am Ende könnte ich nicht sagen, worum es in der Lektion ging. Ich würde die Seite schließen und später wiederkommen, oder gar nicht.",
    ),
    improve: tt(
      "I would split the text into short parts with a heading each, mark the one key sentence of every part, explain the technical terms where they appear, and add one diagram for the main idea.",
      "Ich würde den Text in kurze Teile mit je einer Überschrift gliedern, in jedem Teil den einen Kernsatz markieren, die Fachbegriffe dort erklären, wo sie vorkommen, und ein Diagramm für die Hauptidee ergänzen.",
    ),
    assessText: {
      A: tt(
        "Learning impact: medium. The learner holds less, but needed content is lost, and with complex content that hurts. Effort: low, cutting text is quick. Risk: high, because what is cut may be what a beginner needs.",
        "Lernwirkung: mittel. Die Lernende hält weniger im Kopf, aber nötiger Inhalt geht verloren, und bei komplexem Inhalt schadet das. Aufwand: gering, Text zu kürzen geht schnell. Risiko: hoch, weil das Gestrichene genau das sein kann, was eine Einsteigerin braucht.",
      ),
      B: tt(
        "Learning impact: medium to high. A diagram carries a complex idea faster than text. Effort: high, good diagrams take time and may not fit into four weeks. Risk: medium, because a diagram that is not explained can add load.",
        "Lernwirkung: mittel bis hoch. Ein Diagramm trägt eine komplexe Idee schneller als Text. Aufwand: hoch, gute Diagramme brauchen Zeit und passen vielleicht nicht in vier Wochen. Risiko: mittel, weil ein nicht erklärtes Diagramm die Belastung erhöhen kann.",
      ),
      C: tt(
        "Learning impact: high. The learner holds one small part at a time and nothing is removed. Effort: medium, the content has to be re-cut but not rewritten, so four weeks are realistic. Risk: low, the parts can be adjusted after a first test.",
        "Lernwirkung: hoch. Die Lernende hält jeweils einen kleinen Teil im Kopf, und nichts wird entfernt. Aufwand: mittel, der Inhalt muss neu geschnitten, aber nicht neu geschrieben werden, vier Wochen sind also realistisch. Risiko: gering, die Teile lassen sich nach einem ersten Test anpassen.",
      ),
    },
    assessRows: {
      A: { impact: tt("Medium: less to hold, but needed content is lost", "Mittel: weniger zu halten, aber nötiger Inhalt geht verloren"), effort: tt("Low: cutting is quick", "Gering: Kürzen geht schnell"), risk: tt("High: the cut may be what beginners need", "Hoch: das Gestrichene kann das sein, was Einsteiger brauchen") },
      B: { impact: tt("Medium to high: a diagram carries a complex idea", "Mittel bis hoch: ein Diagramm trägt eine komplexe Idee"), effort: tt("High: good diagrams take time", "Hoch: gute Diagramme brauchen Zeit"), risk: tt("Medium: an unexplained diagram adds load", "Mittel: ein nicht erklärtes Diagramm erhöht die Belastung") },
      C: { impact: tt("High: one small part at a time, nothing removed", "Hoch: jeweils ein kleiner Teil, nichts entfällt"), effort: tt("Medium: re-cut, not rewritten", "Mittel: neu geschnitten, nicht neu geschrieben"), risk: tt("Low: parts can be adjusted", "Gering: Teile lassen sich anpassen") },
    },
    optOrder: tt("1. C Split the content into small modules\n2. B Visualise the content\n3. A Shorten the content significantly", "1. C Den Inhalt in kleine Module aufteilen\n2. B Den Inhalt visualisieren\n3. A Den Inhalt deutlich kürzen"),
    optChoice: MODEL_OPT,
    optWhy: tt(
      "Option C. With complex content and beginners, the learner holds one small part at a time and nothing the beginner needs is removed. A cuts content the topic needs, and B helps but takes more time than four weeks easily allow. Learning capacity matters more than the amount of information.",
      "Option C. Bei komplexem Inhalt und Einsteigern hält die Lernende jeweils einen kleinen Teil im Kopf, und nichts, was die Einsteigerin braucht, entfällt. A streicht Inhalt, den das Thema braucht, und B hilft, braucht aber mehr Zeit, als vier Wochen leicht hergeben. Die Lernkapazität zählt mehr als die Menge der Information.",
    ),
    causesText: tt(
      "1. Too much information is shown at once (a 500-word lesson, twelve quiz questions on one page, a menu, a banner and a chat next to the text).\n2. The content has no visual structure: no paragraphs, headings or marked key sentence.\n3. The learner cannot see a learning logic: 28 lessons in a flat list with no goals and no order.\n4. Technical terms are used without explanation and without a picture.",
      "1. Es wird zu viel Information auf einmal gezeigt (eine Lektion mit 500 Wörtern, zwölf Quizfragen auf einer Seite, ein Menü, ein Banner und ein Chat neben dem Text).\n2. Der Inhalt hat keine visuelle Struktur: keine Absätze, Überschriften oder markierten Kernsätze.\n3. Die Lernende erkennt keine Lernlogik: 28 Lektionen in einer flachen Liste ohne Ziele und ohne Reihenfolge.\n4. Fachbegriffe werden ohne Erklärung und ohne Bild verwendet.",
    ),
    improvementsText: tt(
      "1. Chunking: split each lesson into units of five to seven minutes with one goal each, and the quiz into groups of five.\n2. A clear structure: headings, short paragraphs, the key sentence marked, terms explained on tap.\n3. Goal and outline: state the goal at the start of each lesson and group the 28 lessons into modules with an order.\n4. Remove what is irrelevant while the learner reads: take the banner, chat and recommendations off the lesson page.",
      "1. Chunking: jede Lektion in Einheiten von fünf bis sieben Minuten mit je einem Ziel teilen, das Quiz in Gruppen zu fünf.\n2. Eine klare Struktur: Überschriften, kurze Absätze, der Kernsatz markiert, Begriffe per Tipp erklärt.\n3. Ziel und Gliederung: das Ziel am Anfang jeder Lektion nennen und die 28 Lektionen zu Modulen mit einer Reihenfolge gruppieren.\n4. Irrelevantes entfernen, während die Lernende liest: Banner, Chat und Empfehlungen von der Lektionsseite nehmen.",
    ),
    causeRows: [
      { cause: tt("Too much information at once", "Zu viel Information auf einmal"), improvement: tt("Chunking: units of five to seven minutes, quiz in groups of five", "Chunking: Einheiten von fünf bis sieben Minuten, Quiz in Gruppen zu fünf") },
      { cause: tt("No visual structure", "Keine visuelle Struktur"), improvement: tt("Headings, short paragraphs, key sentence marked", "Überschriften, kurze Absätze, Kernsatz markiert") },
      { cause: tt("No recognisable learning logic", "Keine erkennbare Lernlogik"), improvement: tt("Goal in every lesson, lessons grouped into modules", "Ziel in jeder Lektion, Lektionen zu Modulen gruppiert") },
      { cause: tt("Irrelevant things compete with the text", "Irrelevantes konkurriert mit dem Text"), improvement: tt("Banner, chat and recommendations off the lesson page", "Banner, Chat und Empfehlungen von der Lektionsseite nehmen") },
    ],
    priority: tt(
      "1. Chunking, 2. Clear structure, 3. Goal and outline, 4. Remove irrelevant things from the lesson page.",
      "1. Chunking, 2. Klare Struktur, 3. Ziel und Gliederung, 4. Irrelevantes von der Lektionsseite entfernen.",
    ),
    justify: tt(
      "The main problem is extraneous load: the design asks the learner to do work that does not help learning. Chunking goes first because it removes the biggest load, the 500-word block, for every learner without deleting content. Structure and goals follow because they make each small part easy to scan. Learning capacity matters more than the amount of information.",
      "Das Hauptproblem ist die extrinsische Belastung: Das Design verlangt von der Lernenden Arbeit, die nicht beim Lernen hilft. Chunking kommt zuerst, weil es die größte Belastung, den Block von 500 Wörtern, für jede Lernende entfernt, ohne Inhalt zu löschen. Struktur und Ziele folgen, weil sie jeden kleinen Teil leicht überblickbar machen. Die Lernkapazität zählt mehr als die Menge der Information.",
    ),
  };
}

export function KEY_D3_R2(): Partial<D3R2> {
  return {
    strategy: tt(
      "I will first reduce what does not help learning, clutter and unstructured text, in the lessons most learners open, and I will protect the professional depth of the content. I do not cut the subject; I change how it is presented, so that a beginner holds one small part at a time.",
      "Ich senke zuerst, was nicht beim Lernen hilft, Unübersichtlichkeit und unstrukturierten Text, in den Lektionen, die die meisten Lernenden öffnen, und ich schütze die fachliche Tiefe des Inhalts. Ich kürze das Thema nicht, sondern ändere, wie es dargestellt wird, damit eine Einsteigerin jeweils einen kleinen Teil im Kopf halten muss.",
    ),
    measures: tt(
      "1. Chunk the ten most-used lessons into short units with one goal each.\n2. Set a content standard for every lesson: one goal, a marked key sentence, terms explained where they appear.\n3. Test every new module with five beginners before it is released.",
      "1. Die zehn meistgenutzten Lektionen in kurze Einheiten mit je einem Ziel teilen.\n2. Einen Inhaltsstandard für jede Lektion setzen: ein Ziel, ein markierter Kernsatz, Begriffe dort erklärt, wo sie vorkommen.\n3. Jedes neue Modul vor der Freigabe mit fünf Einsteigern testen.",
    ),
    measureRows: [
      { measure: tt("Chunk the ten most-used lessons into short units with one goal each", "Die zehn meistgenutzten Lektionen in kurze Einheiten mit je einem Ziel teilen"), why: tt("It removes the biggest load, the 500-word block, for every learner without deleting content.", "Es entfernt die größte Belastung, den Block von 500 Wörtern, für jede Lernende, ohne Inhalt zu löschen.") },
      { measure: tt("Set a content standard for every lesson: one goal, a marked key sentence, terms explained where they appear", "Einen Inhaltsstandard für jede Lektion setzen: ein Ziel, ein markierter Kernsatz, Begriffe dort erklärt, wo sie vorkommen"), why: tt("It keeps every new lesson from bringing the load back.", "Er verhindert, dass jede neue Lektion die Belastung zurückbringt.") },
      { measure: tt("Test every new module with five beginners before it is released", "Jedes neue Modul vor der Freigabe mit fünf Einsteigern testen"), why: tt("Without user data, this shows early whether the load has really gone down.", "Ohne Nutzerdaten zeigt das früh, ob die Belastung wirklich gesunken ist.") },
    ],
    definition: tt(
      "A learning-effective UX is one in which a beginner can reach the stated learning goal of a lesson with as little unnecessary effort as possible, shown by being able to explain the key point in their own words afterwards.",
      "Ein lerneffektives UX ist eines, in dem eine Einsteigerin das genannte Lernziel einer Lektion mit möglichst wenig unnötiger Anstrengung erreichen kann, gezeigt dadurch, dass sie danach den Kerngedanken in eigenen Worten erklären kann.",
    ),
    riskText: tt(
      "Too simple: if we cut and simplify too far, learners finish but cannot apply what they learned, and the professional content loses its value. Too complex: if we only restructure, some learners still leave because the topic is hard. I keep the content, change its form, and add a short check at the end of each lesson, so that we measure what learners can do and not only completion.",
      "Zu einfach: Wenn wir zu weit kürzen und vereinfachen, schließen Lernende ab, können das Gelernte aber nicht anwenden, und der fachliche Inhalt verliert seinen Wert. Zu komplex: Wenn wir nur umstrukturieren, gehen manche Lernende weiter, weil das Thema schwer ist. Ich behalte den Inhalt, ändere seine Form und füge am Ende jeder Lektion eine kurze Prüfung hinzu, damit wir messen, was Lernende können, und nicht nur die Completion.",
    ),
    riskRows: [
      { goes: tt("Too simple: if we cut and simplify too far, learners finish but cannot apply what they learned, and the professional content loses its value.", "Zu einfach: Wenn wir zu weit kürzen und vereinfachen, schließen Lernende ab, können das Gelernte aber nicht anwenden, und der fachliche Inhalt verliert seinen Wert."), action: tt("Keep the content and change only its form; add a short check at the end of each lesson, and watch what learners can do, not only completion.", "Den Inhalt behalten und nur seine Form ändern; am Ende jeder Lektion eine kurze Prüfung einfügen und beobachten, was Lernende können, nicht nur die Completion.") },
      { goes: tt("Too complex: if we only restructure, some learners still leave because the topic itself is hard.", "Zu komplex: Wenn wir nur umstrukturieren, gehen manche Lernende weiter, weil das Thema selbst schwer ist."), action: tt("Offer the hard parts in small steps, and watch where beginners stop in the first tests.", "Die schweren Teile in kleinen Schritten anbieten und beobachten, wo Einsteiger in den ersten Tests aufhören.") },
    ],
    logic: tt(
      "Every new lesson passes a short check before it goes live: it states one learning goal, its size fits the learner's time, the key sentence is marked, technical terms are explained where they appear, and it ends with a short task. The head of learning decides together with the content lead; a lesson that fails a check goes back to the author.",
      "Jede neue Lektion besteht vor der Freigabe eine kurze Prüfung: Sie nennt ein Lernziel, ihre Größe passt zur Zeit der Lernenden, der Kernsatz ist markiert, Fachbegriffe sind dort erklärt, wo sie vorkommen, und sie endet mit einer kurzen Aufgabe. Die Leiterin Lernen entscheidet gemeinsam mit dem Content Lead; eine Lektion, die eine Prüfung nicht besteht, geht an die Autorin zurück.",
    ),
    logicRows: [
      { text: tt("Every new lesson states one learning goal, its size fits the learner's time, the key sentence is marked, technical terms are explained where they appear, and it ends with a short task.", "Jede neue Lektion nennt ein Lernziel, ihre Größe passt zur Zeit der Lernenden, der Kernsatz ist markiert, Fachbegriffe sind dort erklärt, wo sie vorkommen, und sie endet mit einer kurzen Aufgabe.") },
      { text: tt("The head of learning decides together with the content lead, before the lesson goes live.", "Die Leiterin Lernen entscheidet gemeinsam mit dem Content Lead, bevor die Lektion live geht.") },
      { text: tt("A lesson that fails a check goes back to the author, with the failed check named.", "Eine Lektion, die eine Prüfung nicht besteht, geht an die Autorin zurück, mit der genannten Prüfung.") },
    ],
    uncertain: tt(
      "I decide to rebuild one course in small modules and test it with five beginners. I do not know whether learners are overloaded by the amount or by the wording. I will reverse it if fewer than four of five beginners can explain the key point after a lesson.",
      "Ich entscheide, einen Kurs in kleinen Modulen neu zu bauen und mit fünf Einsteigern zu testen. Ich weiß nicht, ob Lernende durch die Menge oder durch die Formulierung überlastet sind. Ich nehme es zurück, wenn weniger als vier von fünf Einsteigern nach einer Lektion den Kerngedanken erklären können.",
    ),
    uncRows: [
      { text: tt("I decide to rebuild one course in small modules and test it with five beginners.", "Ich entscheide, einen Kurs in kleinen Modulen neu zu bauen und mit fünf Einsteigern zu testen.") },
      { text: tt("I do not know whether learners are overloaded by the amount of content or by its wording.", "Ich weiß nicht, ob Lernende durch die Menge des Inhalts oder durch seine Formulierung überlastet sind.") },
      { text: tt("I will reverse it if fewer than four of five beginners can explain the key point after a lesson.", "Ich nehme es zurück, wenn weniger als vier von fünf Einsteigern nach einer Lektion den Kerngedanken erklären können.") },
    ],
  };
}
