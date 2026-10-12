import { KEY_D4_R1, KEY_D4_R2 } from "@/lib/day4/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 4 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode, read
 * from the same key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing example
 * (ExampleAnswer, no passcode): the same method on a different company, LearnLoop (an online-course provider whose learners drop out early, with
 * €40,000 and two months), so a learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D4_R1();
const R2 = () => KEY_D4_R2();

export function preferGuide(): MentorGuide {
  return {
    title: "1.1 · Which platform is more motivating, and why (Core)",
    answer: R1().preferWhy ?? "",
    example: tt(
      "At LearnLoop I would prefer the version where I see “3 of 8 done” and finish each unit with a short task and a message. I can tell how far I have come and what to do next; on the other version I only scroll.",
      "Bei LearnLoop würde ich die Version bevorzugen, in der ich „3 von 8 geschafft“ sehe und jede Einheit mit einer kurzen Aufgabe und einer Meldung beende. Ich erkenne, wie weit ich gekommen bin und was als Nächstes kommt; in der anderen Version scrolle ich nur.",
    ),
    why: "The plan asks which platform is more motivating and why. A good answer is written from the learner's side (“I can see…”, “I do…”) and names something the learner can see, do or feel on one platform and not on the other.",
    lookFor: ["Written from the learner's side.", "Names at least one thing that is on one platform and missing on the other.", "Not “it looks better”."],
  };
}

export function principlesGuide(): MentorGuide {
  return {
    title: "1.1 · Three principles of motivation (Core)",
    answer: (R1().principles ?? []).join(" | "),
    example: tt(
      "Show how far the learner has come, because people speed up when they can see the end. | Give a result after every task, because a learner who gets no answer cannot tell whether the effort counted. | Start a unit with what the learner will be able to do, because a goal makes a task worth doing.",
      "Zeigen Sie, wie weit die Lernende gekommen ist, weil Menschen schneller werden, wenn sie das Ende sehen. | Geben Sie nach jeder Aufgabe ein Ergebnis, weil eine Lernende ohne Antwort nicht erkennen kann, ob die Mühe zählte. | Beginnen Sie eine Einheit damit, was die Lernende können wird, weil ein Ziel eine Aufgabe lohnend macht.",
    ),
    why: "Materi A2: a principle of motivation is a sentence with a reason, “Do X, because Y”. Three principles from the differences between the platforms: progress, activation, goals or feedback.",
    lookFor: ["Each is one sentence “Do X, because Y”.", "Each reason says what the learner experiences.", "They are drawn from the differences, not from general advice."],
    pitfalls: ["A slogan with no reason (“Make it fun”).", "A principle about rewards where the facts are about progress and activation."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Which measure has a lasting effect",
    answer: R1().optWhy ?? "",
    example: tt(
      "For LearnLoop I would say a progress and next-step display: after a reward would stop, the learner still sees how far they have come. A weekly leaderboard ends the moment people stop caring about it.",
      "Für LearnLoop würde ich eine Fortschritts- und Nächster-Schritt-Anzeige nennen: Auch wenn eine Belohnung wegfiele, sieht die Lernende noch, wie weit sie gekommen ist. Eine wöchentliche Rangliste endet, sobald sich niemand mehr dafür interessiert.",
    ),
    why: "The plan asks which measure has a lasting effect. A good answer says what remains when a reward would stop.",
    lookFor: ["Says what remains after a reward would stop.", "Refers to competence, progress or activation rather than to “it is exciting”."],
  };
}

export function reflectGuide(): MentorGuide {
  const r = R1().reflect;
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${r?.a ?? ""} ${r?.b ?? ""} ${r?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: motivation is not gamification; engagement arises from structure, not only from rewards; UX can also demotivate. Use the learners' notes as the start of the live discussion.",
  };
}

export function causeGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · Which printed fact supports your first cause",
    answer: R1().causeWhy ?? "",
    example: tt(
      "At LearnLoop the brief says learners start a course and then stop, and one printed fact shows a course page with no end point. Those are the causes I can point at; “the logo is old” has nothing printed behind it.",
      "Bei LearnLoop sagt der Auftrag, dass Lernende einen Kurs beginnen und dann aufhören, und ein gedruckter Fakt zeigt eine Kursseite ohne Endpunkt. Das sind die Ursachen, auf die ich zeigen kann; für „das Logo ist alt“ steht nichts Gedrucktes dahinter.",
    ),
    why: "A cause is defended by a printed fact. The plan's model solution names the main problem as the lack of perceived progress and activation.",
    lookFor: ["Points at a printed fact (by its number) or quotes a case line.", "Does not offer a cause the case never mentions."],
  };
}

export function reasonGuide(id: string): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · Why this measure gets its ratings (${id.toUpperCase()})`,
    answer: r.reasons?.[id] ?? "",
    example: tt(
      "At LearnLoop, a progress and next-step display costs €8,000, so its effort is Low. It answers the finding that learners cannot tell how far they have come, and it is low risk because it only adds information.",
      "Bei LearnLoop kostet eine Fortschritts- und Nächster-Schritt-Anzeige 8.000 €, ihr Aufwand ist also Niedrig. Sie beantwortet den Befund, dass Lernende nicht erkennen, wie weit sie gekommen sind, und sie ist risikoarm, weil sie nur Information hinzufügt.",
    ),
    why: "Effort follows the printed cost (a rule). Motivation impact and risk are judgements: they must point at a printed fact and at how the measure could backfire (overjustification, pressure, manipulation).",
    lookFor: ["Names the printed fact the measure answers.", "Says how it could backfire or why risk is low.", "Does not contradict the printed cost."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "2.2 · Why the first priority goes first (Core)",
    answer: R1().orderWhy ?? "",
    example: tt(
      "At LearnLoop the progress display goes first: it helps every learner, costs €8,000, and the other measures show up in it as steps done.",
      "Bei LearnLoop kommt die Fortschrittsanzeige zuerst: Sie hilft jeder Lernenden, kostet 8.000 €, und die anderen Maßnahmen erscheinen darin als erledigte Schritte.",
    ),
    why: "The plan's rationale: perceived progress is the strongest motivator. A different first priority defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one, not for the whole set.", "Refers to the learner's problem, the cost or what the others depend on."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know whether learners leave because they see no progress or because they have no time. I would interview six who stopped before choosing.",
      "Ich weiß nicht, ob Lernende gehen, weil sie keinen Fortschritt sehen oder weil sie keine Zeit haben. Ich würde sechs, die aufgehört haben, interviewen, bevor ich wähle.",
    ),
    why: "The plan asks it outright. A good answer names a specific unknown that would change the decision, and a way to find it out.",
    lookFor: ["Names a specific unknown, not “more data”.", "Says how it could be found out.", "Connects to the decision."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function strategyWhyGuide(): MentorGuide {
  return {
    title: "3.1 · Why this motivation strategy (Core)",
    answer: R2().strategyWhy ?? "",
    example: tt(
      "For LearnLoop I would lean on a mix with intrinsic as the base: learners who stop do not see a next step, which is an ability problem, so I would fix that first and add a small, honest reward later.",
      "Für LearnLoop würde ich auf eine Mischung mit intrinsischer Basis setzen: Lernende, die aufhören, sehen keinen nächsten Schritt, das ist ein Problem des Könnens, also würde ich das zuerst beheben und später eine kleine, ehrliche Belohnung ergänzen.",
    ),
    why: "Materi B1: behaviour needs motivation, ability and a prompt together. A strategy that works only on motivation is incomplete, and a reward where the barrier is ability is the place where motivation is overestimated.",
    lookFor: ["Names which condition (motivation, ability, prompt) the strategy works on.", "Names for which learners.", "Does not claim that a reward fixes an ability problem."],
  };
}

export function decisionOrderGuide(): MentorGuide {
  return {
    title: "3.1 · Why the first decision goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "A progress display and a next step go first because they work on ability and prompt for every learner, cost less than a rebuild, and show a first figure within three months.",
      "Eine Fortschrittsanzeige und ein nächster Schritt kommen zuerst, weil sie für jede Lernende auf Können und Impuls wirken, weniger kosten als ein Neuaufbau und innerhalb von drei Monaten eine erste Zahl zeigen.",
    ),
    why: "The order is a roadmap with a reason. The model order is visible progress, goals and feedback standard, research routine; a different order defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one.", "Says which condition it works on and what it does for retention."],
  };
}

export function successGuide(): MentorGuide {
  return {
    title: "3.1 · Your success sentence (Core)",
    answer: R2().success ?? "",
    example: tt(
      "At LearnLoop I would compare the share of new learners who return within seven days against last quarter's figure, with half of them seeing the old page, and read it after eight weeks together with five interviews.",
      "Bei LearnLoop würde ich den Anteil neuer Lernender, die innerhalb von sieben Tagen zurückkehren, mit der Zahl des letzten Quartals vergleichen, wobei die Hälfte die alte Seite sieht, und ihn nach acht Wochen zusammen mit fünf Interviews lesen.",
    ),
    why: "Materi B3: success has a baseline, a target, a method and a date, written before the change. A behaviour metric and a reason-giving method together.",
    lookFor: ["Names the metric and a baseline.", "Names a method (control group, interviews).", "Names a time."],
    pitfalls: ["“We will see whether it improves.”", "Time spent or badges earned as the only evidence."],
  };
}

export function riskPlanGuide(): MentorGuide {
  return {
    title: "3.2 · What you do about the biggest risk (Core)",
    answer: R2().riskPlan ?? "",
    example: tt(
      "I give each reward a check on the cheapest way to earn it, and I look at whether learners finish units, not only open them. I would notice the risk if opened lessons rise while finished ones do not.",
      "Ich prüfe bei jeder Belohnung den günstigsten Weg, sie zu verdienen, und schaue, ob Lernende Einheiten beenden, nicht nur öffnen. Ich würde das Risiko bemerken, wenn geöffnete Lektionen steigen, beendete aber nicht.",
    ),
    why: "A risk with no action is only a worry. The action is concrete: what is done, and when it is noticed.",
    lookFor: ["Names an action.", "Says when or how the risk would be noticed."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.2 · The decision under uncertainty (Core)",
    answer: R2().uncertain ?? "",
    example: tt(
      "I decide to show a next-step button in two courses first. I do not know whether learners leave for lack of direction or lack of time. I will reverse it if the seven-day return rate is not four points above the control group after eight weeks.",
      "Ich entscheide, in zwei Kursen zuerst einen Nächster-Schritt-Button zu zeigen. Ich weiß nicht, ob Lernende wegen fehlender Richtung oder fehlender Zeit gehen. Ich nehme es zurück, wenn die Rückkehrrate nach sieben Tagen nach acht Wochen nicht vier Punkte über der Kontrollgruppe liegt.",
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
      "I give up the points programme this year and postpone the loss messages; learners keep the plain course pages with a progress display.",
      "Ich verzichte dieses Jahr auf das Punkteprogramm und verschiebe die Verlustmeldungen; die Lernenden behalten die schlichten Kursseiten mit einer Fortschrittsanzeige.",
    ),
    why: "The skill of Level 3: a decision that gives up nothing has not decided. The answer names something real that a stakeholder would miss.",
    lookFor: ["Names a concrete thing given up or postponed.", "It is something someone would miss, not a throwaway."],
  };
}
