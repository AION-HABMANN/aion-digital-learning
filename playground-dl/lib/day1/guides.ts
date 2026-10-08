import type { MeasureId } from "@/data/day1/case";
import { KEY_D1_R1, KEY_D1_R2 } from "@/lib/day1/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 1 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode,
 * read from the same key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing
 * example (ExampleAnswer, no passcode): the same method on a different company, LearnLoop (an online-course provider with 30% of new
 * learners leaving in week one, €30,000 and six weeks), so a learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D1_R1();
const R2 = () => KEY_D1_R2();

export function worstGuide(): MentorGuide {
  return {
    title: "1.1 · The finding that would make a learner give up first (Core)",
    answer: R1().worstWhy ?? "",
    example: tt(
      "At LearnLoop a new learner sees a list of 20 courses and no suggestion. I would pick none and close the tab: I came to learn something specific, and nothing tells me which course is mine.",
      "Bei LearnLoop sieht eine neue Lernende eine Liste von 20 Kursen und keinen Vorschlag. Ich würde keinen wählen und den Tab schließen: Ich bin gekommen, um etwas Bestimmtes zu lernen, und nichts sagt mir, welcher Kurs meiner ist.",
    ),
    why: "Any of the eight findings defends. What the plan asks for is the user's perspective (“Versetzen Sie sich in einen Lernenden”): the reason must say what the learner cannot do or feel, not that something looks wrong.",
    lookFor: ["Written from the learner's side (“I would not know…”), not about the design.", "Names a concrete consequence (leaving, getting lost, giving up).", "Refers to the finding chosen, not to the platform in general."],
  };
}

export function needGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · What you would need to find out why learners leave",
    answer: R1().need ?? "",
    example: tt(
      "I would not guess from the 30% alone. I would ask ten learners who left in week one what they were trying to do when they stopped.",
      "Ich würde nicht allein aus den 30 % raten. Ich würde zehn Lernende, die in Woche eins gegangen sind, fragen, was sie zu tun versuchten, als sie aufhörten.",
    ),
    why: "The trap the app reveals: the number counts who left, not why. A good answer names a source that could show why (interviews, a usability test, data per lesson), not a measure.",
    lookFor: ["Names at least one source of evidence about the learners themselves.", "Does not turn the number into a cause."],
  };
}

export function reflectGuide(): MentorGuide {
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${R1().reflect?.a ?? ""} ${R1().reflect?.b ?? ""} ${R1().reflect?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: UX is not a design problem but a decision problem; designing beautifully against designing effectively; thinking in user flows instead of single screens. Use the learners' notes as the start of the live discussion.",
  };
}

export function causeGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · Why these three causes",
    answer: R1().causeWhy ?? "",
    example: tt(
      "At LearnLoop the brief says new learners get no first-week guide, and two printed findings show long unexplained lists. Those are the causes I can point at; “the logo is old” has nothing printed behind it.",
      "Bei LearnLoop sagt der Auftrag, dass neue Lernende keine Anleitung für die erste Woche bekommen, und zwei gedruckte Befunde zeigen lange unerklärte Listen. Das sind die Ursachen, auf die ich zeigen kann; für „das Logo ist alt“ steht nichts Gedrucktes dahinter.",
    ),
    why: "A cause is defended by a printed fact. The plan's model solution names the main problem as a lack of structure and orientation.",
    lookFor: ["Points at a printed finding or a case line.", "Does not offer a cause the case never mentions."],
  };
}

export function reasonGuide(id: MeasureId): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · Why this measure gets its ratings (${id})`,
    answer: r.reasons?.[id] ?? "",
    example: tt(
      "A weekly study planner at LearnLoop costs €6,000, so its effort is Low. It answers the finding that learners do not know when to study, and it is low risk because it can be switched off.",
      "Ein wöchentlicher Lernplaner bei LearnLoop kostet 6.000 €, sein Aufwand ist also Niedrig. Er beantwortet den Befund, dass Lernende nicht wissen, wann sie lernen sollen, und er ist risikoarm, weil man ihn abschalten kann.",
    ),
    why: "Effort follows the printed cost (a rule). User impact and risk are judgements: they must point at a printed finding and at what could go wrong.",
    lookFor: ["Names the finding or problem the measure answers.", "Says what could go wrong or why risk is low.", "Does not contradict the printed cost."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "2.2 · Why the first priority goes first (Core)",
    answer: R1().orderWhy ?? "",
    example: tt(
      "At LearnLoop the guided first week goes first: week one is where learners leave, and at €7,000 it is cheap enough to start before anything else.",
      "Bei LearnLoop kommt die geführte erste Woche zuerst: In Woche eins gehen Lernende, und mit 7.000 € ist sie günstig genug, um vor allem anderen zu starten.",
    ),
    why: "The plan's model solution puts learning paths first (“greatest impact”). A different first priority defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one, not for the whole set.", "Refers to the learner's problem, the cost or what the others depend on."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know whether week-one leavers lack direction or lack time. I would run five short interviews before committing the whole €30,000.",
      "Ich weiß nicht, ob Abbrecher der ersten Woche Orientierung oder Zeit vermissen. Ich würde fünf kurze Interviews führen, bevor ich die ganzen 30.000 € binde.",
    ),
    why: "The plan asks it outright (“Welche Information fehlt Ihnen?”). The good answer names an unknown that would change the decision, and a way to find it out.",
    lookFor: ["Names a specific unknown, not “more data”.", "Says how it could be found out.", "Connects to the decision (what would change)."],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "3.1 · The UX vision (Core)",
    answer: R2().vision ?? "",
    example: tt(
      "Learning at LearnLoop should feel like a clear first week and a visible next step, so a busy professional never wonders what to do now.",
      "Lernen bei LearnLoop soll sich wie eine klare erste Woche und ein sichtbarer nächster Schritt anfühlen, damit sich eine vielbeschäftigte Fachkraft nie fragt, was sie jetzt tun soll.",
    ),
    why: "The plan's question: “Wie soll Lernen erlebt werden?”. A good vision describes the learner's experience, not a feature list.",
    lookFor: ["Describes how learning feels or what the learner can do.", "One or two sentences.", "Is not a list of features or a business target alone."],
  };
}

export function decisionOrderGuide(): MentorGuide {
  return {
    title: "3.1 · Why the first decision goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "The guided start comes first because it meets every new learner, and it gives the later decisions a baseline to be measured against.",
      "Der geführte Start kommt zuerst, weil er jede neue Lernende erreicht und den späteren Entscheidungen eine Basis zum Messen gibt.",
    ),
    why: "The roadmap is an order with a reason. The model order is paths, progress, research; a different order defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one.", "Refers to reach, cost, dependency or evidence."],
  };
}

export function riskPlanGuide(): MentorGuide {
  return {
    title: "3.2 · What you do about the biggest risk (Core)",
    answer: R2().riskPlan ?? "",
    example: tt(
      "I reserve part of the budget for interviews in the first month, so that if the guided start misses the real cause, we find out before the second decision.",
      "Ich reserviere einen Teil des Budgets für Interviews im ersten Monat, damit wir, falls der geführte Start die eigentliche Ursache verfehlt, es vor der zweiten Entscheidung erfahren.",
    ),
    why: "A risk with no action is only a worry. The action should be concrete: what is done, and when it is checked.",
    lookFor: ["Names an action.", "Says when or how the risk would be noticed."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.2 · The decision without complete data (Core)",
    answer: R2().uncertain ?? "",
    example: tt(
      "I decide to launch a guided first week now. I do not know whether leavers lack direction or time. I will reverse and test a shorter format if week-one drop-out has not fallen from 30% to below 25% after six weeks.",
      "Ich entscheide, jetzt eine geführte erste Woche zu starten. Ich weiß nicht, ob Abbrecher Orientierung oder Zeit vermissen. Ich nehme die Entscheidung zurück und teste ein kürzeres Format, wenn die Abbruchquote der ersten Woche nach sechs Wochen nicht von 30 % auf unter 25 % gesunken ist.",
    ),
    why: "The frame of Materi B3: what I decide, what I do not know, what would make me reverse and by when. A checkable reversal condition has a figure and a date.",
    lookFor: ["States the decision.", "States what is not known.", "Gives a checkable reversal condition with a figure and a time."],
    pitfalls: ["A decision with no stated unknown (“we will improve UX”).", "A reversal condition no one could check (“if it does not work”)."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "3.2 · What you give up or postpone (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "I give up the leaderboard this year, and I postpone the full catalogue rewrite; learners keep the old lesson texts for now.",
      "Ich verzichte dieses Jahr auf die Rangliste und verschiebe das komplette Neuschreiben des Katalogs; die Lernenden behalten vorerst die alten Lektionstexte.",
    ),
    why: "The skill of Level 3: a decision that gives up nothing has not decided. The answer names something real that a stakeholder would miss.",
    lookFor: ["Names a concrete thing given up or postponed.", "It is something someone would miss, not a throwaway."],
  };
}
