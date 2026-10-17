import { KEY_D3_R1, KEY_D3_R2 } from "@/lib/day3/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 3 (CLAUDE.md #23, #57). `answer` is the real model text the mentor sees after the passcode,
 * read from the same key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing
 * example (ExampleAnswer, no passcode): the same method on a different company, LearnLoop (an online-course provider with a hard course for
 * beginners that is rated “too complicated”), so a learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D3_R1();
const R2 = () => KEY_D3_R2();
const join = (o: Record<string, string> | undefined, keys: string[]) => keys.map((k) => `${k}: ${o?.[k] ?? ""}`).join(" ");

/* ------------------------------------------------------------------ Block 1.1 */

export function problemsGuide(): MentorGuide {
  return {
    title: "1.1 · Five problems from the user's perspective",
    answer: R1().problems ?? "",
    example: tt(
      "1. The lesson page opens with a long block, so I do not know where to start.\n2. The word “churn” is never explained, so I stop and search for it.\n3. Every sentence looks the same, so I cannot tell what matters.\n4. There is no picture, so I must imagine how the parts fit.\n5. I cannot see how much is left, so I do not know whether to continue.",
      "1. Die Lektionsseite beginnt mit einem langen Block, ich weiß also nicht, wo ich anfangen soll.\n2. Das Wort „Churn“ wird nie erklärt, ich höre also auf und suche es.\n3. Jeder Satz sieht gleich aus, ich erkenne also nicht, was wichtig ist.\n4. Es gibt kein Bild, ich muss mir also vorstellen, wie die Teile zusammenpassen.\n5. Ich sehe nicht, wie viel noch kommt, ich weiß also nicht, ob ich weitermachen soll.",
    ),
    why: "The plan asks for five problems described spontaneously “aus Sicht des Nutzers” and needs no prior knowledge. Any five real problems that can be pointed at in the picture are acceptable; the model uses the wall of text, no key sentence, unexplained terms, no picture and no sign of length.",
    lookFor: ["Five different lines, one problem each.", "Written from the learner's side (“I do not know…”, “I stop…”).", "Each can be found in the picture or the simulation of the lesson."],
    pitfalls: ["Five lines that are one idea said five ways (“too much text”).", "Only a verdict with nothing to point at (“it looks bad”)."],
  };
}

export function feelGuide(): MentorGuide {
  return {
    title: "1.1 · How the learning process feels",
    answer: R1().feel ?? "",
    example: tt(
      "It feels like homework I did not ask for. After a few lines I lose the thread, so I start to skim, and at the end I could not say what the lesson wanted from me. I would stop and promise to come back.",
      "Es fühlt sich an wie Hausaufgaben, um die ich nicht gebeten habe. Nach ein paar Zeilen verliere ich den Faden, überfliege also, und am Ende könnte ich nicht sagen, was die Lektion von mir wollte. Ich würde aufhören und versprechen, wiederzukommen.",
    ),
    why: "The plan asks how the learning process feels (“Wie fühlt sich der Lernprozess an?”). A good answer says what the learner cannot do or hold in mind (intake, processing, storage), not only that it feels bad.",
    lookFor: ["Written as the learner would feel it.", "Names a consequence: losing the thread, skimming, stopping.", "Says what the learner cannot do or hold in mind."],
  };
}

export function improveGuide(): MentorGuide {
  return {
    title: "1.1 · What you would improve intuitively",
    answer: R1().improve ?? "",
    example: tt(
      "At LearnLoop I would put the lesson in three parts with a heading each, because the page is one block, and I would hide the news banner while someone is reading, because it competes with the text.",
      "Bei LearnLoop würde ich die Lektion in drei Teile mit je einer Überschrift gliedern, weil die Seite ein einziger Block ist, und das News-Banner ausblenden, solange jemand liest, weil es mit dem Text konkurriert.",
    ),
    why: "The plan asks what the learner would improve intuitively (“Was würden Sie intuitiv verbessern?”). A good answer names a change and the problem it answers, so the change is traceable to the evidence.",
    lookFor: ["Names at least two changes.", "Each change answers one of the problems the learner named.", "The changes act on the load (amount, form, order), not on the look."],
    pitfalls: ["A change of the look only (new colours, new fonts)."],
  };
}

/* ------------------------------------------------------------------ Block 1.2 */

export function assessGuide(): MentorGuide {
  return {
    title: "1.2 · Assess each option: learning impact, effort, risk",
    answer: join(R1().assessText, ["A", "B", "C"]),
    example: tt(
      "Option X (cut the lesson in half): learning impact medium, because the learner holds less but loses content; effort low; risk high, because the cut may be what beginners need. Option Y (draw the key idea): impact medium to high; effort high; risk medium. Option Z (split into short units): impact high; effort medium; risk low.",
      "Option X (die Lektion halbieren): Lernwirkung mittel, weil die Lernende weniger hält, aber Inhalt verliert; Aufwand gering; Risiko hoch, weil das Gestrichene das sein kann, was Einsteiger brauchen. Option Y (die Kernidee zeichnen): Wirkung mittel bis hoch; Aufwand hoch; Risiko mittel. Option Z (in kurze Einheiten teilen): Wirkung hoch; Aufwand mittel; Risiko gering.",
    ),
    why: "The plan asks to assess each measure on learning impact, effort and risk (“Bewerten Sie jede Maßnahme”). The plan prints no figure, so all three are the learner's own judgement and are never marked. The conditions to weigh against: four weeks, complex content, beginners.",
    lookFor: ["All three options are assessed, not only the favourite.", "Each is judged on learning impact, effort and risk in the same terms.", "A judgement is tied to a condition (four weeks, complex content, beginners)."],
    pitfalls: ["Only the chosen option is assessed in detail.", "A rating with no reason (“C is better”)."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "1.2 · The priority order of the three options",
    answer: R1().optOrder ?? "",
    example: tt("1. Z, split into short units\n2. Y, draw the key idea\n3. X, cut the lesson in half", "1. Z, in kurze Einheiten teilen\n2. Y, die Kernidee zeichnen\n3. X, die Lektion halbieren"),
    why: "The plan asks for a prioritisation (“Nehmen Sie eine Priorisierung vor”). Any order defends if the assessment above supports it; the order is the learner's decision.",
    lookFor: ["All three options appear, first priority first.", "The order follows from the assessment."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 · Which option has the greatest effect on learning",
    answer: R1().optWhy ?? "",
    example: tt(
      "For a hard beginner course I would say splitting into short units: the learner holds less at once and nothing is removed. Shortening would take away what the learner came for.",
      "Für einen schweren Einsteigerkurs würde ich das Aufteilen in kurze Einheiten nennen: Die Lernende hält weniger auf einmal, und nichts wird entfernt. Kürzen würde das wegnehmen, wofür die Lernende gekommen ist.",
    ),
    why: "The plan's rationale: learning capacity before the amount of information. A good answer refers to what the learner has to hold, find or understand.",
    lookFor: ["Refers to what the learner holds, finds or understands.", "Notes whether needed content is kept.", "Says why the other options have less effect."],
  };
}

/* ------------------------------------------------------------------ Block 2.1 */

export function causesGuide(): MentorGuide {
  return {
    title: "2.1 · Four causes of cognitive overload",
    answer: R1().causesText ?? "",
    example: tt(
      "1. Too much is shown at once (a page with a long text, a menu and a banner).\n2. The text has no structure the eye can use.\n3. The learner cannot see how the lessons belong together.\n4. Technical terms come without explanation.",
      "1. Es wird zu viel auf einmal gezeigt (eine Seite mit langem Text, einem Menü und einem Banner).\n2. Der Text hat keine Struktur, die das Auge nutzen kann.\n3. Die Lernende sieht nicht, wie die Lektionen zusammengehören.\n4. Fachbegriffe kommen ohne Erklärung.",
    ),
    why: "The plan asks for four causes (“Identifizieren Sie 4 Ursachen kognitiver Überlastung”). The case names three observations (too much information at once, no visual structure, no recognisable learning logic); the model adds unexplained terms. Any four causes that can be pointed at in the case or the pictures are acceptable. The plan's main problem is extraneous load.",
    lookFor: ["Four different causes, one per line.", "Each can be found in the case or in the pictures.", "A cause is something design can change, not the subject itself."],
    pitfalls: ["“The subject is complex” as a cause: that is intrinsic load, which design can only order.", "A symptom (“learners drop out”) instead of a cause."],
  };
}

export function improvementsGuide(): MentorGuide {
  return {
    title: "2.1 · Four UX improvements",
    answer: R1().improvementsText ?? "",
    example: tt(
      "1. Split each lesson into short units with one goal.\n2. Add headings and mark the key sentence.\n3. State the goal at the start and group lessons into modules.\n4. Take the banner and chat off the lesson page.",
      "1. Jede Lektion in kurze Einheiten mit einem Ziel teilen.\n2. Überschriften ergänzen und den Kernsatz markieren.\n3. Das Ziel am Anfang nennen und Lektionen zu Modulen gruppieren.\n4. Banner und Chat von der Lektionsseite nehmen.",
    ),
    why: "The plan asks for four UX improvements (“Entwickeln Sie 4 UX-Verbesserungen”). The Musterlösung names chunking, visualisation, clear structure and reduction of irrelevant content. A good improvement acts on one cause and says what the learner then notices.",
    lookFor: ["Four different improvements.", "Each acts on one of the learner's causes.", "Each is a change to the screens, not a general wish."],
    pitfalls: ["A change of the look only.", "More content or a reward mechanic instead of reducing the load."],
  };
}

export function priorityGuide(): MentorGuide {
  return {
    title: "2.1 · Prioritise the improvements",
    answer: R1().priority ?? "",
    example: tt("1. Short units, 2. Headings and a marked key sentence, 3. A goal and modules, 4. Off with the banner and chat.", "1. Kurze Einheiten, 2. Überschriften und ein markierter Kernsatz, 3. Ein Ziel und Module, 4. Weg mit Banner und Chat."),
    why: "The plan asks to prioritise (“Priorisieren Sie diese”). The order is the learner's decision; the justification below says why. The model puts chunking first because it removes the biggest load.",
    lookFor: ["All four improvements appear, first priority first.", "The order is consistent with the justification."],
  };
}

export function justifyGuide(): MentorGuide {
  return {
    title: "2.1 · Justify your decision",
    answer: R1().justify ?? "",
    example: tt(
      "At LearnLoop the main problem is extraneous load: the page asks the learner for work that does not help learning. I put short units first, because they remove the biggest block for everyone, and headings second, because they make each unit easy to scan. Learning capacity matters more than the amount of information.",
      "Bei LearnLoop ist das Hauptproblem die extrinsische Belastung: Die Seite verlangt von der Lernenden Arbeit, die nicht beim Lernen hilft. Ich setze kurze Einheiten an die erste Stelle, weil sie den größten Block für alle entfernen, und Überschriften an die zweite, weil sie jede Einheit leicht überblickbar machen. Die Lernkapazität zählt mehr als die Menge der Information.",
    ),
    why: "The plan asks to justify the decision (“Begründen Sie Ihre Entscheidung”). The Musterlösung: main problem extraneous cognitive load; rationale learning capacity before the amount of information.",
    lookFor: ["Names the main problem (the load that does not help learning).", "Says why the first priority goes first.", "Refers to what the learner can hold."],
  };
}

/* ------------------------------------------------------------------ Block 3.1 */

export function strategyGuide(): MentorGuide {
  return {
    title: "3.1 · Strategy for reducing cognitive load",
    answer: R2().strategy ?? "",
    example: tt(
      "At LearnLoop I would first reduce what does not help learning, clutter and long unstructured text, in the lessons most learners open, and I would protect the professional depth of the course. I change how the subject is shown, not how much of it there is.",
      "Bei LearnLoop würde ich zuerst senken, was nicht beim Lernen hilft, Unübersichtlichkeit und langen unstrukturierten Text, in den Lektionen, die die meisten Lernenden öffnen, und ich würde die fachliche Tiefe des Kurses schützen. Ich ändere, wie das Thema gezeigt wird, nicht wie viel davon es gibt.",
    ),
    why: "Item 1 of the plan: a strategy for reducing cognitive load. A good strategy says what is reduced first (extraneous load), what is protected (the subject) and for whom.",
    lookFor: ["Says what is reduced first.", "Says what is protected.", "Is a direction, not a list of tasks."],
  };
}

export function measuresGuide(): MentorGuide {
  return {
    title: "3.1 · Three prioritised UX measures",
    answer: R2().measures ?? "",
    example: tt(
      "1. Split the five most-used lessons into short units.\n2. Write a one-page content standard for new lessons.\n3. Test every new unit with five beginners.",
      "1. Die fünf meistgenutzten Lektionen in kurze Einheiten teilen.\n2. Einen Inhaltsstandard auf einer Seite für neue Lektionen schreiben.\n3. Jede neue Einheit mit fünf Einsteigern testen.",
    ),
    why: "Item 2 of the plan: three prioritised UX measures. The plan prints no budget figure, so the measures are chosen for learning effectiveness and cognitive efficiency, first priority first. Any three defensible measures are acceptable.",
    lookFor: ["Exactly three measures, first priority first.", "Each is concrete enough to start on.", "The first one acts on the biggest load."],
    pitfalls: ["A measure that only changes the look.", "A technology measure with no learner problem behind it."],
  };
}

export function definitionGuide(): MentorGuide {
  return {
    title: "3.1 · Definition of “learning-effective UX”",
    answer: R2().definition ?? "",
    example: tt(
      "A learning-effective UX is one in which a new employee can reach the stated goal of a lesson with little unnecessary effort, shown by being able to do the task from the lesson on their own afterwards.",
      "Ein lerneffektives UX ist eines, in dem ein neuer Mitarbeiter das genannte Ziel einer Lektion mit wenig unnötiger Anstrengung erreichen kann, gezeigt dadurch, dass er die Aufgabe aus der Lektion danach allein erledigen kann.",
    ),
    why: "Item 3 of the plan: a definition of learning-effective UX. A good definition names the learner, the goal, the cost kept low and how you will know.",
    lookFor: ["Names the learner and the learning goal.", "Names the cost to keep low (effort that does not help learning).", "Says how you know (what the learner can do afterwards)."],
    pitfalls: ["“Simple and nice to use”: simple is not the same as effective for learning."],
  };
}

export function riskTextGuide(): MentorGuide {
  return {
    title: "3.1 · Risk analysis: too simple against too complex",
    answer: R2().riskText ?? "",
    example: tt(
      "Too simple: if we cut too much, learners finish but cannot apply it. Too complex: if we only restructure, a hard topic still makes some leave. I keep the content, change its form and add a short check, so we measure what learners can do.",
      "Zu einfach: Wenn wir zu viel kürzen, schließen Lernende ab, können es aber nicht anwenden. Zu komplex: Wenn wir nur umstrukturieren, lässt ein schweres Thema manche trotzdem gehen. Ich behalte den Inhalt, ändere die Form und füge eine kurze Prüfung hinzu, damit wir messen, was Lernende können.",
    ),
    why: "Item 4 of the plan: a risk analysis of content that is too simple against content that is too complex. The Feedbackrunde asks the same: where is the risk of too much simplification?",
    lookFor: ["Names the risk on both sides.", "Says what would be noticed.", "Says what the plan does about the biggest."],
  };
}

export function logicGuide(): MentorGuide {
  return {
    title: "3.1 · Decision logic for future content",
    answer: R2().logic ?? "",
    example: tt(
      "Every new lesson passes four questions before it goes live: is the goal stated, does it fit the learner's time, is the key sentence marked, are terms explained. The content lead decides; a lesson that fails goes back to the author.",
      "Jede neue Lektion besteht vor der Freigabe vier Fragen: Ist das Ziel genannt, passt sie zur Zeit der Lernenden, ist der Kernsatz markiert, sind Begriffe erklärt. Der Content Lead entscheidet; eine Lektion, die durchfällt, geht an den Autor zurück.",
    ),
    why: "Item 5 of the plan: a decision logic for future content. A good logic is a rule that can be applied to any new lesson, with who decides.",
    lookFor: ["States checks or questions every new lesson passes.", "Says who decides.", "Says what happens when a lesson fails."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.1 · A decision under uncertainty (without user data)",
    answer: R2().uncertain ?? "",
    example: tt(
      "I decide to split one course into short units and test it with five beginners. I do not know whether the load comes from the amount or from the wording. I will reverse it if fewer than four of five can explain the key point afterwards.",
      "Ich entscheide, einen Kurs in kurze Einheiten zu teilen und mit fünf Einsteigern zu testen. Ich weiß nicht, ob die Belastung von der Menge oder von der Formulierung kommt. Ich nehme es zurück, wenn weniger als vier von fünf den Kerngedanken danach erklären können.",
    ),
    why: "The plan's additional task: make a decision under uncertainty, for example without user data. A good answer says what is decided, what is not known, and the sign and the time at which it would be reversed.",
    lookFor: ["States the decision in one sentence.", "Names what is not known.", "Names the sign and the time at which it would be reversed."],
  };
}
