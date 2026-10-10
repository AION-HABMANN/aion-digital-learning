import { CAUSE_MODEL, MEASURE_BY_ID, MODEL_IMPACT, MODEL_MEASURES, MODEL_OPT_IMPACT, MODEL_OPT_ORDER, MODEL_OPT_RISK, MODEL_RISK, OPT_BY_ID, OPT_IDS, TRUTH_SORT, effortBand } from "@/data/day3/case";
import { MODEL_CHECKS, MODEL_DECISIONS, MODEL_OWNER, MODEL_RISK_PICK } from "@/data/day3/route2";
import { tt } from "@/lib/lang";
import type { D3R1, D3R2 } from "@/store/dayTypes";
import type { Score } from "@/store/useStore";

/**
 * The model answers of Day 3 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every
 * missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that
 * language. Mentor tools stay English (#32); only the answers they enter are bilingual. The measures follow the plan's Musterlösung (main
 * problem: extraneous cognitive load; chunking, clear structure, reducing irrelevant content; learning capacity before the amount of
 * information), with "Goal and outline" in place of visualisation, which takes five weeks against the four the plan prints. A different,
 * well-reasoned choice, including the plan's own visualisation, also exports (#38).
 */
export const MENTOR_NOTE = "Visualisation (M2) takes 5 weeks against the 4-week limit; the reference set uses M5 instead.";

export function KEY_D3_R1(): Partial<D3R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  const effort: Record<string, Score> = Object.fromEntries(MODEL_MEASURES.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>;
  const optEffort: Record<string, Score> = Object.fromEntries(OPT_IDS.map((id) => [id, effortBand(OPT_BY_ID[id].cost)])) as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    worst: "f1",
    worstWhy: tt(
      "I open Lesson 7 and see one block of about 500 words. I would not know where to start, and by the fifth sentence I would have lost track of the first, so I would close the page.",
      "Ich öffne Lektion 7 und sehe einen Block von etwa 500 Wörtern. Ich wüsste nicht, wo ich anfangen soll, und beim fünften Satz hätte ich den ersten schon aus dem Blick verloren, also würde ich die Seite schließen.",
    ),
    improve: tt(
      "I would split the lesson into short parts with headings (facts 1 and 4), take the banner, chat and extra menu off the lesson page (fact 2), and state the goal of each lesson and group the 28 lessons in order (facts 7 and 8).",
      "Ich würde die Lektion in kurze Teile mit Überschriften teilen (Fakten 1 und 4), Banner, Chat und Zusatzmenü von der Lektionsseite nehmen (Fakt 2) und das Ziel jeder Lektion nennen und die 28 Lektionen in eine Reihenfolge gruppieren (Fakten 7 und 8).",
    ),
    optImpact: { ...MODEL_OPT_IMPACT } as Record<string, Score>,
    optEffort,
    optRisk: { ...MODEL_OPT_RISK } as Record<string, Score>,
    optEffortFlags: [],
    optOrder: [...MODEL_OPT_ORDER],
    optWhy: tt(
      "Splitting the content into small modules has the greatest effect: the learner has less to hold at once and nothing they need is removed. Shortening removes content that beginners came for.",
      "Das Aufteilen des Inhalts in kleine Module hat die größte Wirkung: Die Lernende hat weniger auf einmal im Kopf, und nichts, was sie braucht, wird entfernt. Kürzen entfernt Inhalt, für den Einsteiger gekommen sind.",
    ),
    reflect: {
      a: tt("On the lesson page, where a banner, a chat and a nine-entry menu compete with the text.", "Auf der Lektionsseite, wo ein Banner, ein Chat und ein Menü mit neun Einträgen mit dem Text konkurrieren."),
      b: tt("The key sentence of each lesson and the goal of the lesson: they tell the learner what to hold on to.", "Der Kernsatz jeder Lektion und das Ziel der Lektion: Sie sagen den Lernenden, woran sie sich halten sollen."),
      c: tt("Splitting lessons into short units, because a learner can then explain what a unit said, which is measurable.", "Lektionen in kurze Einheiten zu teilen, denn dann kann eine Lernende erklären, was eine Einheit sagte, und das ist messbar."),
    },
    causes: [...CAUSE_MODEL],
    causeWhy: tt(
      "The case itself names too much information at once, no visual structure and no recognisable learning logic, and facts 1 to 8 show each one; fact 5 shows the unexplained technical terms.",
      "Der Fall selbst nennt zu viel Information auf einmal, keine visuelle Struktur und keine erkennbare Lernlogik, und die Fakten 1 bis 8 zeigen jeweils eine; Fakt 5 zeigt die unerklärten Fachbegriffe.",
    ),
    chosen: [...MODEL_MEASURES],
    impact,
    effort,
    risk,
    reasons: {
      m1: tt("Chunking answers facts 1 and 3, the 500-word lesson and the 12-question quiz: the learner holds less at once and no content is deleted. Impact High; risk Low because the units can be adjusted.", "Chunking beantwortet die Fakten 1 und 3, die Lektion mit 500 Wörtern und das Quiz mit 12 Fragen: Die Lernende hält weniger auf einmal, und kein Inhalt wird gelöscht. Wirkung Hoch; Risiko Niedrig, weil sich die Einheiten anpassen lassen."),
      m3: tt("Headings, short paragraphs and a marked key sentence answer facts 4 and 6 cheaply, at €7,000 and two weeks. Impact Mid, risk Low.", "Überschriften, kurze Absätze und ein markierter Kernsatz beantworten die Fakten 4 und 6 günstig, mit 7.000 € und zwei Wochen. Wirkung Mittel, Risiko Niedrig."),
      m4: tt("Taking the banner, chat and extra menu off the lesson page answers fact 2 in one week for €4,000. The risk is Mid: some learners may miss the chat, so it should stay reachable elsewhere.", "Banner, Chat und Zusatzmenü von der Lektionsseite zu nehmen, beantwortet Fakt 2 in einer Woche für 4.000 €. Das Risiko ist Mittel: Manche Lernende vermissen vielleicht den Chat, er sollte also anderswo erreichbar bleiben."),
      m5: tt("A stated goal and an outline of the 28 lessons answer facts 7 and 8, the missing learning logic, in three weeks and under €10,000. Impact Mid, risk Low.", "Ein genanntes Ziel und eine Gliederung der 28 Lektionen beantworten die Fakten 7 und 8, die fehlende Lernlogik, in drei Wochen und unter 10.000 €. Wirkung Mittel, Risiko Niedrig."),
    },
    effortFlags: [],
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "Chunking goes first because it removes the biggest load, the 500-word block, for every learner without deleting content. Learning capacity matters more than the amount of information.",
      "Chunking kommt zuerst, weil es die größte Belastung, den Block von 500 Wörtern, für jede Lernende entfernt, ohne Inhalt zu löschen. Die Lernkapazität zählt mehr als die Menge der Information.",
    ),
    missingInfo: tt(
      "I do not know whether learners are overloaded by the amount of content or by the wording of the technical terms. I would watch five beginners read Lesson 7 and ask each to explain the key point.",
      "Ich weiß nicht, ob Lernende durch die Menge des Inhalts oder durch die Formulierung der Fachbegriffe überlastet sind. Ich würde fünf Einsteiger Lektion 7 lesen sehen und jede bitten, den Kerngedanken zu erklären.",
    ),
  };
}

export function KEY_D3_R2(): Partial<D3R2> {
  return {
    strategy: tt(
      "I will first reduce what does not help learning, clutter and unstructured text, in the lessons most learners open, and I will protect the professional depth of the content.",
      "Ich senke zuerst, was nicht beim Lernen hilft, Unübersichtlichkeit und unstrukturierten Text, in den Lektionen, die die meisten Lernenden öffnen, und ich schütze die fachliche Tiefe des Inhalts.",
    ),
    definition: tt(
      "A learning-effective UX is one in which a beginner can reach the stated learning goal of a lesson with as little unnecessary effort as possible, shown by being able to explain the key point in their own words afterwards.",
      "Ein lerneffektives UX ist eines, in dem eine Einsteigerin das genannte Lernziel einer Lektion mit möglichst wenig unnötiger Anstrengung erreichen kann, gezeigt dadurch, dass sie danach den Kerngedanken in eigenen Worten erklären kann.",
    ),
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    orderWhy: tt(
      "Rebuilding the ten most-used lessons goes first: it removes extraneous load for the most learners, keeps the content and shows a visible result, so effectiveness and efficiency both rise there.",
      "Das Neuaufbauen der zehn meistgenutzten Lektionen kommt zuerst: Es senkt die extrinsische Belastung für die meisten Lernenden, behält den Inhalt und zeigt ein sichtbares Ergebnis, sodass dort Effektivität und Effizienz beide steigen.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I add a short check at the end of each rebuilt lesson, so that we measure what learners can do next to completion. I would notice the risk if completion rises but the check scores do not.",
      "Ich füge am Ende jeder neu gebauten Lektion eine kurze Prüfung hinzu, damit wir neben der Completion messen, was Lernende können. Ich würde das Risiko bemerken, wenn die Completion steigt, die Prüfungswerte aber nicht.",
    ),
    owner: MODEL_OWNER,
    lessonChecks: [...MODEL_CHECKS],
    uncertain: tt(
      "I decide to rebuild one course in small modules and test it with five beginners. I do not know whether learners are overloaded by the amount or by the wording. I will reverse it if fewer than four of five beginners can explain the key point after a lesson.",
      "Ich entscheide, einen Kurs in kleinen Modulen neu zu bauen und mit fünf Einsteigern zu testen. Ich weiß nicht, ob Lernende durch die Menge oder durch die Formulierung überlastet sind. Ich nehme es zurück, wenn weniger als vier von fünf Einsteigern nach einer Lektion den Kerngedanken erklären können.",
    ),
    giveUp: tt(
      "I give up the full diagram redesign and the AI summary button this year; learners keep the plain text versions of the less-used lessons for now.",
      "Ich verzichte dieses Jahr auf die komplette Diagramm-Neugestaltung und den KI-Zusammenfassungs-Button; die Lernenden behalten vorerst die reinen Textversionen der weniger genutzten Lektionen.",
    ),
  };
}
