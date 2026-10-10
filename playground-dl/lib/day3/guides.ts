import type { MeasureId } from "@/data/day3/case";
import { KEY_D3_R1, KEY_D3_R2 } from "@/lib/day3/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 3 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode,
 * read from the same key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing
 * example (ExampleAnswer, no passcode): the same method on a different company, LearnLoop (an online-course provider with a hard course for
 * beginners that is rated “too complicated”, four weeks and €30,000), so a learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D3_R1();
const R2 = () => KEY_D3_R2();

export function worstGuide(): MentorGuide {
  return {
    title: "1.1 · The fact that would make a learner stop first, and how the process feels (Core)",
    answer: R1().worstWhy ?? "",
    example: tt(
      "At LearnLoop a new learner opens a lesson with a menu, a banner and three boxes next to the text. I would not know what to look at first, and after a minute I would stop reading and scroll to the end.",
      "Bei LearnLoop öffnet eine neue Lernende eine Lektion mit einem Menü, einem Banner und drei Kästen neben dem Text. Ich wüsste nicht, worauf ich zuerst schauen soll, und nach einer Minute würde ich aufhören zu lesen und ans Ende scrollen.",
    ),
    why: "Any of the eight facts defends. What the plan asks for is the user's side (“Beschreiben Sie, wie sich der Lernprozess anfühlt”): the answer must say what the learner cannot do or hold in mind (intake, processing, storage), not that something looks wrong.",
    lookFor: ["Written from the learner's side (“I would not know…”, “I would lose track…”).", "Names a consequence: a step of learning that fails (what to look at, what to hold, what to keep).", "Refers to the fact chosen."],
  };
}

export function improveGuide(): MentorGuide {
  return {
    title: "1.1 · What you would improve intuitively (Core)",
    answer: R1().improve ?? "",
    example: tt(
      "At LearnLoop I would put the lesson in three parts with headings, because the page is one block, and I would hide the news banner while someone is reading, because it competes with the text.",
      "Bei LearnLoop würde ich die Lektion in drei Teile mit Überschriften gliedern, weil die Seite ein einziger Block ist, und das News-Banner ausblenden, solange jemand liest, weil es mit dem Text konkurriert.",
    ),
    why: "The plan asks what the learner would improve intuitively. A good answer names a change and the fact it answers, so the change is traceable to the evidence.",
    lookFor: ["Names at least two changes, each tied to a fact by its number.", "The changes act on the load (amount, form, order), not on the look."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Which option has the greatest effect on learning",
    answer: R1().optWhy ?? "",
    example: tt(
      "For a hard beginner course I would say splitting into small modules: the learner holds less at once and nothing is removed. Shortening would take away what the learner came for.",
      "Für einen schweren Einsteigerkurs würde ich das Aufteilen in kleine Module nennen: Die Lernende hält weniger auf einmal, und nichts wird entfernt. Kürzen würde das wegnehmen, wofür die Lernende gekommen ist.",
    ),
    why: "The plan's rationale: learning capacity before the amount of information. A good answer refers to what the learner has to hold, find or understand.",
    lookFor: ["Refers to what the learner holds, finds or understands.", "Notes whether needed content is kept."],
  };
}

export function reflectGuide(): MentorGuide {
  const r = R1().reflect;
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${r?.a ?? ""} ${r?.b ?? ""} ${r?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: UX steers attention and thinking; good UX does not reduce thinking but guides it; “simple” is not the same as “effective for learning”. Use the learners' notes as the start of the live discussion.",
  };
}

export function causeGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · Which printed fact supports your first cause",
    answer: R1().causeWhy ?? "",
    example: tt(
      "At LearnLoop the brief says the lesson shows several boxes next to the text, and one printed fact shows a 700-word page. Those are the causes I can point at; “the logo is old” has nothing printed behind it.",
      "Bei LearnLoop sagt der Auftrag, dass die Lektion mehrere Kästen neben dem Text zeigt, und ein gedruckter Fakt zeigt eine Seite mit 700 Wörtern. Das sind die Ursachen, auf die ich zeigen kann; für „das Logo ist alt“ steht nichts Gedrucktes dahinter.",
    ),
    why: "A cause is defended by a printed fact. The plan's model solution names the main problem as extraneous cognitive load.",
    lookFor: ["Points at a printed fact (by its number) or quotes a case line.", "Does not offer a cause the case never mentions."],
  };
}

export function reasonGuide(id: MeasureId): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · Why this measure gets its ratings (${id.toUpperCase()})`,
    answer: r.reasons?.[id] ?? "",
    example: tt(
      "At LearnLoop, splitting the course into small modules costs €12,000, so its effort is Mid. It answers the finding that learners hold too much at once, and it is low risk because the content stays the same.",
      "Bei LearnLoop kostet das Aufteilen des Kurses in kleine Module 12.000 €, sein Aufwand ist also Mittel. Es beantwortet den Befund, dass Lernende zu viel auf einmal halten, und es ist risikoarm, weil der Inhalt gleich bleibt.",
    ),
    why: "Effort follows the printed cost (a rule). Learning impact and risk are judgements: they must point at a printed fact and at what could go wrong or be lost.",
    lookFor: ["Names the printed fact the measure answers.", "Says what could go wrong or why risk is low.", "Does not contradict the printed cost."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "2.2 · Why the first priority goes first (Core)",
    answer: R1().orderWhy ?? "",
    example: tt(
      "At LearnLoop the module split goes first: it removes the biggest load for every learner and costs €12,000, and the other measures work better on short units.",
      "Bei LearnLoop kommt die Modulaufteilung zuerst: Sie senkt die größte Belastung für jede Lernende und kostet 12.000 €, und die anderen Maßnahmen wirken besser auf kurzen Einheiten.",
    ),
    why: "The plan's rationale: learning capacity > amount of information. A different first priority defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one, not for the whole set.", "Refers to the learner's problem, the cost or what the others depend on."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know whether learners are overloaded by how much there is or by how it is worded. I would ask six beginners to explain the key point of one lesson before choosing.",
      "Ich weiß nicht, ob Lernende durch die Menge oder durch die Formulierung überlastet sind. Ich würde sechs Einsteiger bitten, den Kerngedanken einer Lektion zu erklären, bevor ich wähle.",
    ),
    why: "The plan asks it outright (“Welche Information fehlt Ihnen?”). A good answer names a specific unknown that would change the decision, and a way to find it out.",
    lookFor: ["Names a specific unknown, not “more data”.", "Says how it could be found out.", "Connects to the decision."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function strategyGuide(): MentorGuide {
  return {
    title: "3.1 · Your strategy to reduce cognitive load (Core)",
    answer: R2().strategy ?? "",
    example: tt(
      "At LearnLoop I would first cut the clutter and the wall of text in the most-opened lessons, and protect the worked examples that the learners need to practise.",
      "Bei LearnLoop würde ich zuerst die Unübersichtlichkeit und die Textwand in den meistgeöffneten Lektionen abbauen und die durchgearbeiteten Beispiele schützen, die die Lernenden zum Üben brauchen.",
    ),
    why: "Materi A2 and B1: cut extraneous load first, keep the intrinsic difficulty the course exists to teach. A strategy that only reduces has not weighed the conflict.",
    lookFor: ["Names what is reduced first.", "Names what is protected.", "One to three sentences."],
  };
}

export function definitionGuide(): MentorGuide {
  return {
    title: "3.1 · Your definition of learning-effective UX (Core)",
    answer: R2().definition ?? "",
    example: tt(
      "For LearnLoop: a design is learning-effective when an intermediate learner can reach the unit's goal in the planned time, shown by solving one new task afterwards without help.",
      "Für LearnLoop: Ein Design ist lerneffektiv, wenn eine fortgeschrittene Lernende das Ziel der Einheit in der geplanten Zeit erreichen kann, gezeigt dadurch, dass sie danach eine neue Aufgabe ohne Hilfe löst.",
    ),
    why: "Materi B1: the definition names the learner, the goal, the cost to be kept low and the proof. A definition without a proof cannot be tested.",
    lookFor: ["Names the learner (intended level).", "Names the goal.", "Names the cost kept low (effort that does not help learning).", "Names the proof (explain or do)."],
    pitfalls: ["“Easy to use” with no proof of learning.", "A satisfaction rating as the only proof."],
  };
}

export function decisionOrderGuide(): MentorGuide {
  return {
    title: "3.1 · Why the first measure goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "Rebuilding the most-opened lessons goes first because it meets the most learners and shows a visible result; the content standard follows so that new lessons do not repeat the problem.",
      "Das Neuaufbauen der meistgeöffneten Lektionen kommt zuerst, weil es die meisten Lernenden erreicht und ein sichtbares Ergebnis zeigt; der Inhaltsstandard folgt, damit neue Lektionen das Problem nicht wiederholen.",
    ),
    why: "The roadmap is an order with a reason. The model order is rebuild, standard, testing routine; a different order defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one.", "Says what it does for learning effectiveness and cognitive efficiency."],
  };
}

export function riskPlanGuide(): MentorGuide {
  return {
    title: "3.2 · What you do about the biggest risk (Core)",
    answer: R2().riskPlan ?? "",
    example: tt(
      "I add a three-question check to every rebuilt lesson, so that we see whether learners can explain the point, not only whether they finish.",
      "Ich füge jeder neu gebauten Lektion eine Prüfung mit drei Fragen hinzu, damit wir sehen, ob Lernende den Kerngedanken erklären können, nicht nur, ob sie abschließen.",
    ),
    why: "A risk with no action is only a worry. The action should be concrete: what is done, and when it is noticed. To tell too simple from too complex apart you need a completion measure and a measure of what learners can do.",
    lookFor: ["Names an action.", "Says when or how the risk would be noticed."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.2 · The decision without user data (Core)",
    answer: R2().uncertain ?? "",
    example: tt(
      "I decide to rebuild one course in short units and test it with six beginners. I do not know whether the load comes from length or from wording. I will reverse it if fewer than five of six can explain the key point after a lesson.",
      "Ich entscheide, einen Kurs in kurzen Einheiten neu zu bauen und mit sechs Einsteigern zu testen. Ich weiß nicht, ob die Belastung von der Länge oder von der Formulierung kommt. Ich nehme es zurück, wenn nach einer Lektion weniger als fünf von sechs den Kerngedanken erklären können.",
    ),
    why: "The frame of Materi B3: what I decide, what I do not know, what would make me reverse and by when. A checkable reversal condition has a figure and a time.",
    lookFor: ["States the decision.", "States what is not known.", "Gives a checkable reversal condition with a figure and a time."],
    pitfalls: ["A reversal condition no one could check (“if it does not work”).", "A decision that waits for data instead of choosing a step that can be undone."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "3.2 · What you give up or postpone (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "I give up the new visual brand this year, and I postpone the AI summary tool; learners keep the current look and the plain summaries.",
      "Ich verzichte dieses Jahr auf die neue visuelle Marke und verschiebe das KI-Zusammenfassungs-Tool; die Lernenden behalten das jetzige Aussehen und die schlichten Zusammenfassungen.",
    ),
    why: "The skill of Level 3: a decision that gives up nothing has not decided. The answer names something real that a stakeholder would miss.",
    lookFor: ["Names a concrete thing given up or postponed.", "It is something someone would miss, not a throwaway."],
  };
}
