import { KEY_D7_R1, KEY_D7_R2 } from "@/lib/day7/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 7 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode, read from the same
 * key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing example (ExampleAnswer, no passcode): the
 * same method on a different company, LearnLoop (an online-course provider whose users with impairments drop out, with a €45,000 budget), so a learner can see
 * the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D7_R1();
const R2 = () => KEY_D7_R2();

export function groupsGuide(): MentorGuide {
  return {
    title: "1.1 · The groups that struggle, and the facts that block them (Core)",
    answer: R1().groupsWhy ?? "",
    example: tt(
      "At LearnLoop, learners who use only a keyboard are blocked by the quiz, because it can only be answered by dragging; they cannot answer a single question. Learners reading in a second language are blocked by the long sign-up sentences, because they cannot follow what to do next.",
      "Bei LearnLoop werden Lernende, die nur eine Tastatur nutzen, vom Quiz blockiert, weil es sich nur durch Ziehen beantworten lässt; sie können keine einzige Frage beantworten. Lernende, die in einer Zweitsprache lesen, werden von den langen Sätzen bei der Anmeldung blockiert, weil sie nicht nachvollziehen können, was sie als Nächstes tun sollen.",
    ),
    why: "Any two groups defend if each is tied to a printed fact by number and the answer says what the group cannot do (Materi A1, A2).",
    lookFor: ["Names a group and a fact by number.", "Says what the group cannot do (read, hear, operate, understand), not only that it is hard.", "Ideally includes the situational limit (bright light, noisy train) in one answer, to show the gain is wider than one group."],
    pitfalls: ["Listing groups without a fact.", "Describing a group by its impairment alone instead of by the task it cannot do."],
  };
}

export function improveGuide(): MentorGuide {
  return {
    title: "1.1 · Three improvements (Core)",
    answer: R1().improve ?? "",
    example: tt(
      "1. Add captions and a transcript to the ten most-used videos (the videos have none): deaf learners and learners on a noisy train gain. 2. Make the Next button larger and move it away from Back (a tiny button next to another): learners with a tremor gain. 3. Replace “Error 12” with a sentence that says what went wrong and what to do (an error with no explanation): everyone who makes a mistake gains.",
      "1. Den zehn meistgenutzten Videos Untertitel und ein Transkript hinzufügen (die Videos haben keine): gehörlose Lernende und Lernende in einem lauten Zug profitieren. 2. Den Weiter-Button größer machen und von Zurück abrücken (ein winziger Button neben einem anderen): Lernende mit Zittern profitieren. 3. „Fehler 12“ durch einen Satz ersetzen, der sagt, was schiefging und was zu tun ist (ein Fehler ohne Erklärung): alle, die einen Fehler machen, profitieren.",
    ),
    why: "The plan asks for three improvements. Each starts with a verb, names the fact it answers by number and says who gains (Materi A1, A2).",
    lookFor: ["Three improvements.", "Each starts with a verb.", "Names the fact by number.", "Says who gains."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Justify your decision",
    answer: R1().optWhy ?? "",
    example: tt(
      "For LearnLoop I would put accessibility first: the learners who drop out are blocked by a quiz, missing captions and pale text, and only that option removes them. Improving the structure comes second, because it helps everyone but removes none of those barriers. New features come last: they are an expansion on a platform that part of the audience cannot use.",
      "Für LearnLoop würde ich Barrierefreiheit an die erste Stelle setzen: Die Lernenden, die abbrechen, werden von einem Quiz, fehlenden Untertiteln und blassem Text blockiert, und nur diese Option beseitigt das. Die Verbesserung der Struktur kommt als Zweites, weil sie allen hilft, aber keine dieser Barrieren beseitigt. Neue Features kommen zuletzt: Sie sind eine Erweiterung auf einer Plattform, die ein Teil des Publikums nicht nutzen kann.",
    ),
    why: "The plan asks for a prioritisation with a justification. B first also defends if the reason says who gains and what it leaves out.",
    lookFor: ["Says who gains from the first priority.", "Says whether the choice is an integration or an expansion."],
  };
}

export function reflectGuide(): MentorGuide {
  const r = R1().reflect;
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${r?.a ?? ""} ${r?.b ?? ""} ${r?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: accessibility is a core quality, not an add-on; inclusive systems are more successful in the long run; evaluation is a continuous task. Use the learners' notes as the start of the live discussion.",
  };
}

export function causeWhyGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · The printed fact behind the first barrier",
    answer: R1().causeWhy ?? "",
    example: tt(
      "At LearnLoop: “The videos have no captions” rests on one printed fact, that the video lessons have neither captions nor a transcript. It blocks deaf and hard-of-hearing learners, who cannot take in what is said.",
      "Bei LearnLoop: „Die Videos haben keine Untertitel“ beruht auf einem gedruckten Fakt, dass die Videolektionen weder Untertitel noch ein Transkript haben. Er blockiert gehörlose und schwerhörige Lernende, die nicht aufnehmen können, was gesagt wird.",
    ),
    why: "A central barrier is something that stops a group from doing something, and you can point at it in a printed fact. The plan's Musterlösung names the main problem as the exclusion of certain user groups.",
    lookFor: ["Points at a fact by number or quotes the case.", "Names the group it blocks."],
  };
}

export function reasonGuide(id: string): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · Why this measure gets its ratings (${id.toUpperCase()})`,
    answer: r.reasons?.[id] ?? "",
    example: tt(
      "At LearnLoop, captions and keyboard use for ten courses cost €14,000, so effort is Mid. It removes two blocking barriers (no captions, a drag-only quiz), so user impact is High for deaf and keyboard users. Risk is Low, because it fixes the source and can be tested.",
      "Bei LearnLoop kosten Untertitel und Tastaturbedienung für zehn Kurse 14.000 €, der Aufwand ist also Mittel. Sie beseitigen zwei blockierende Barrieren (keine Untertitel, ein Quiz nur zum Ziehen), die Nutzerwirkung ist also Hoch für gehörlose und Tastaturnutzer. Das Risiko ist Niedrig, weil sie an der Quelle behebt und sich testen lässt.",
    ),
    why: "Effort follows the printed cost (a rule). User impact and risk are judgements: they must name the fact the measure answers, the group it opens the platform to, and what could go wrong, for example that a patch hides a problem (Materi A5).",
    lookFor: ["Names the printed fact the measure answers.", "Names the group it opens the platform to.", "Says what could go wrong, or why risk is low.", "Does not contradict the printed cost."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "2.2 · Why the first priority goes first (Core)",
    answer: R1().orderWhy ?? "",
    example: tt(
      "At LearnLoop the plain-language instructions go first: they cost €8,000, reach readers with difficulties and second-language learners at sign-up, and every other fix works better once people can get in.",
      "Bei LearnLoop kommen die Anleitungen in einfacher Sprache zuerst: Sie kosten 8.000 €, erreichen Lesende mit Schwierigkeiten und Zweitsprachler bei der Anmeldung, und jede andere Behebung wirkt besser, wenn die Menschen erst einmal hineinkommen.",
    ),
    why: "The plan's rationale: accessibility = usage = success. A different first priority defends if the reason names the group it reaches, the cost, or what the others depend on.",
    lookFor: ["Gives a reason for position one, not for the whole set.", "Names a group, a cost or a dependency."],
  };
}

export function methodsWhyGuide(): MentorGuide {
  return {
    title: "2.2 · Why these three evaluation methods (Core)",
    answer: R1().methodsWhy ?? "",
    example: tt(
      "At LearnLoop I would use a manual check with the keyboard and a screen reader, because it finds what tools miss; a test with learners with impairments, because it shows why a group fails; and drop-out by group, because it shows how many are blocked.",
      "Bei LearnLoop würde ich eine manuelle Prüfung mit Tastatur und Screenreader nutzen, weil sie findet, was Werkzeuge übersehen; einen Test mit Lernenden mit Einschränkungen, weil er zeigt, warum eine Gruppe scheitert; und den Abbruch pro Gruppe, weil er zeigt, wie viele blockiert sind.",
    ),
    why: "Materi A5: choose methods that give different kinds of evidence: one that gives reasons (a test with users), one that gives counts (analytics by group) and one that gives conformance (an audit or an automated check). Automated checks never stand alone.",
    lookFor: ["Says what each method tells that the others do not.", "Includes one that gives reasons and one that gives counts or conformance."],
    pitfalls: ["Choosing E6 (counting features): it shows how much was built, not who can use it."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know how many LearnLoop learners need captions or keyboard use, because the platform does not record it. I would test with five learners with impairments and ask all learners about access needs, with their consent, before I decide how much to spend on the second fix.",
      "Ich weiß nicht, wie viele LearnLoop-Lernende Untertitel oder Tastaturbedienung brauchen, weil die Plattform es nicht erfasst. Ich würde mit fünf Lernenden mit Einschränkungen testen und alle Lernenden, mit ihrer Einwilligung, nach Zugangsbedarf fragen, bevor ich entscheide, wie viel ich für die zweite Behebung ausgebe.",
    ),
    why: "The plan asks “what information are you missing”. A good answer is specific and says how to find it out without guessing; data protection (DSGVO) applies if groups are measured.",
    lookFor: ["Names something specific that would change the decision.", "Says how to find it out.", "Does not guess a number."],
  };
}

export function strategyGuide(): MentorGuide {
  return {
    title: "3.1 · Your strategy for inclusive UX (Core)",
    answer: R2().strategy ?? "",
    example: tt(
      "At LearnLoop we aim to reach learners who use only a keyboard and deaf learners, who drop out today. We change first the quiz and the videos in the ten most-used courses. Inclusion is a core quality: a learner who cannot answer the quiz is a learner we lose, and captions also help on a train.",
      "Bei LearnLoop wollen wir Lernende erreichen, die nur eine Tastatur nutzen, und gehörlose Lernende, die heute abbrechen. Wir ändern zuerst das Quiz und die Videos in den zehn meistgenutzten Kursen. Inklusion ist eine Kernqualität: Eine Lernende, die das Quiz nicht beantworten kann, ist eine Lernende, die wir verlieren, und Untertitel helfen auch im Zug.",
    ),
    why: "Materi B1: the plan asks for an inclusive UX strategy. State the case in three parts (rules and expectations, reach, long-term quality) in the words management uses.",
    lookFor: ["Names the groups it aims to reach.", "Says what changes first.", "Says why it is a core quality, not an add-on."],
  };
}

export function decisionOrderGuide(): MentorGuide {
  return {
    title: "3.1 · Why the first measure goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "Fixing the most-used courses goes first: it reaches the groups who are blocked today, and each month of waiting costs learners we already have. The release checks follow so that the fix lasts.",
      "Die meistgenutzten Kurse zu beheben kommt zuerst: Es erreicht die Gruppen, die heute blockiert sind, und jeder Monat Warten kostet Lernende, die wir schon haben. Die Release-Prüfungen folgen, damit die Behebung hält.",
    ),
    why: "A different order defends if the reason names the groups it reaches and what waiting costs (Materi B2). D2 first also defends: it removes the dependence on one person.",
    lookFor: ["Names the groups it reaches.", "Says what waiting costs."],
  };
}

export function readersGuide(): MentorGuide {
  return {
    title: "3.2 · Who reads the results, how often, and what happens when a KPI is poor (Core)",
    answer: R2().readers ?? "",
    example: tt(
      "At LearnLoop the head of learning reads task success by group each month, and the management board reads it each quarter. If one group falls behind, its course owner fixes the barrier in the next release.",
      "Bei LearnLoop liest die Leiterin Lernen den Aufgabenerfolg pro Gruppe jeden Monat, und die Geschäftsleitung liest ihn jedes Quartal. Fällt eine Gruppe zurück, behebt die Kursverantwortliche die Barriere im nächsten Release.",
    ),
    why: "A decision architecture names a role, a rhythm and a consequence, so that accessibility does not depend on one person's interest (Materi B3).",
    lookFor: ["Names a role.", "Names a rhythm.", "Says what must be done when a KPI is poor."],
  };
}

export function riskPlanGuide(): MentorGuide {
  return {
    title: "3.2 · What you do about the biggest risk (Core)",
    answer: R2().riskPlan ?? "",
    example: tt(
      "If the risk is that the plan stays a project, I put accessibility into the definition of “done”. It costs about one measure; a platform that drifts back costs the whole programme.",
      "Wenn das Risiko ist, dass der Plan ein Projekt bleibt, nehme ich Barrierefreiheit in die Definition von „fertig“ auf. Das kostet etwa eine Maßnahme; eine Plattform, die zurückfällt, kostet das ganze Programm.",
    ),
    why: "The plan's risk analysis is costs against benefits. Any of the five risks defends with a reason and an action; the action should cost less than the risk, and the answer compares the two (Materi B2).",
    lookFor: ["One action.", "Compares the cost of the action with the cost of the risk."],
  };
}

export function uncertainGuide(): MentorGuide {
  const r = R2();
  return {
    title: "3.2 · The decision under uncertainty (Core)",
    answer: `${r.decide ?? ""} ${r.dontKnow ?? ""} ${r.reverse ?? ""}`,
    example: tt(
      "I decide to add captions to the ten most-used videos first. I do not know how many learners need them. I reverse if, by the end of the second quarter, completion of those courses by the tested deaf learners has not risen from 40% to 60%.",
      "Ich entscheide, zuerst die zehn meistgenutzten Videos mit Untertiteln zu versehen. Ich weiß nicht, wie viele Lernende sie brauchen. Ich nehme zurück, wenn der Abschluss dieser Kurse durch die getesteten gehörlosen Lernenden bis Ende des zweiten Quartals nicht von 40 % auf 60 % gestiegen ist.",
    ),
    why: "The frame of Materi B3: what I decide, what I do not know, what would make me reverse and by when. A checkable reversal condition has a figure and a time. The fourth part, what you give up, has its own field.",
    lookFor: ["States the decision in one sentence.", "Names a specific unknown.", "Gives a reversal condition with a figure and a time."],
    pitfalls: ["A reversal condition no one could check (“if it does not work”)."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "3.2 · What you give up or postpone (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "I give up the new sales features this year and postpone the external audit to year two. Sales will miss the features they asked for.",
      "Ich verzichte in diesem Jahr auf die neuen Vertriebs-Features und verschiebe das externe Audit ins zweite Jahr. Der Vertrieb wird die Features vermissen, die er verlangt hat.",
    ),
    why: "The skill of Level 3: a plan that gives up nothing has not decided. The answer names something real that someone would miss (Materi B2, B3).",
    lookFor: ["Names something real that someone would miss."],
  };
}
