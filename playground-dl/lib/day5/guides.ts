import { KEY_D5_R1, KEY_D5_R2 } from "@/lib/day5/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 5 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode, read from the same
 * key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing example (ExampleAnswer, no passcode): the
 * same method on a different company, LearnLoop (an online-course provider with falling satisfaction, a €50,000 budget and a management that wants growth), so a
 * learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D5_R1();
const R2 = () => KEY_D5_R2();

export function goalGuide(): MentorGuide {
  return {
    title: "1.1 · Your goal as a learner (Core)",
    answer: R1().goal ?? "",
    example: tt(
      "At LearnLoop I want to finish the data-protection course before Friday, on my laptop at my desk, in the half hour after lunch. It is mandatory, so I just want to get it done.",
      "Bei LearnLoop will ich den Datenschutzkurs vor Freitag abschließen, auf dem Laptop an meinem Schreibtisch, in der halben Stunde nach dem Mittagessen. Er ist verpflichtend, ich will ihn also einfach erledigen.",
    ),
    why: "The plan asks what the learner's goals are. A good answer is a task in everyday words (“carry on where I stopped”) and names the situation: device, time, mandatory or voluntary (Materi A2).",
    lookFor: ["A task, not a feature wish.", "Names a situation: device, time, mandatory or voluntary.", "Written from the learner's side."],
  };
}

export function worstGuide(): MentorGuide {
  return {
    title: "1.1 · Why this fact frustrates you most (Core)",
    answer: R1().worstWhy ?? "",
    example: tt(
      "At LearnLoop I open the app expecting my course on top and see five banners. I have to scroll to find it, and by then I have forgotten what I came for.",
      "Bei LearnLoop öffne ich die App und erwarte meinen Kurs ganz oben und sehe fünf Banner. Ich muss scrollen, um ihn zu finden, und dann habe ich vergessen, wofür ich kam.",
    ),
    why: "Any of the eight facts defends. What the plan asks for is the user's perspective: say what you expected to see and what you saw instead, as a learner, not as a design opinion.",
    lookFor: ["“I expected… I saw…”.", "Written as a feeling and a consequence, not “it looks bad”.", "Refers to the fact chosen."],
  };
}

export function expectationsGuide(): MentorGuide {
  return {
    title: "1.1 · Three expectations of a good platform (Core)",
    answer: R1().expectations ?? "",
    example: tt(
      "I expect my current course to be the first thing I see, because I arrive with one goal. I expect buttons in words I use, because I do not want to learn the platform's vocabulary. I expect to know where I am, because I jump between devices.",
      "Ich erwarte, dass mein aktueller Kurs das Erste ist, was ich sehe, weil ich mit einem Ziel komme. Ich erwarte Buttons in Worten, die ich benutze, weil ich nicht das Vokabular der Plattform lernen will. Ich erwarte zu wissen, wo ich bin, weil ich zwischen Geräten wechsle.",
    ),
    why: "The plan asks for three expectations. Each starts “I expect…” and ties to a goal or a situation (Materi A2): the expectation behind a frustration.",
    lookFor: ["Three, each starting “I expect…”.", "Each tied to a goal or situation, with a “because”.", "Not a feature list."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Justify your decision",
    answer: R1().optWhy ?? "",
    example: tt(
      "For LearnLoop I would simplify the menu first: learners find their course, so completion rises and support requests fall, which management watches. New features would not be found by the learners who are lost.",
      "Für LearnLoop würde ich zuerst das Menü vereinfachen: Lernende finden ihren Kurs, die Completion steigt und die Supportanfragen sinken, was das Management beobachtet. Neue Features würden von den Lernenden, die sich verloren fühlen, nicht gefunden.",
    ),
    why: "The plan asks to justify the decision. A good answer says what the business gets from the first priority, so that it could be argued to management (Materi A5, B1).",
    lookFor: ["Says what the business gets (completion, retention, complaints).", "Says what the user gets.", "Names why the others come later."],
  };
}

export function reflectGuide(): MentorGuide {
  const r = R1().reflect;
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${r?.a ?? ""} ${r?.b ?? ""} ${r?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: user-centredness is not a nice-to-have; organisations often do not act in a user-centred way; UX is a translation effort between user and business. Use the learners' notes as the start of the live discussion.",
  };
}

export function errorGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · The design error behind each problem",
    answer: Object.values(R1().errors ?? {}).join(" | "),
    example: tt(
      "At LearnLoop: “Learners cannot find their course” rests on one printed fact, a home screen with nine menu entries and no continue entry. The design error is that the menu follows the company's departments, not the learner's task.",
      "Bei LearnLoop: „Lernende finden ihren Kurs nicht“ beruht auf einem gedruckten Fakt, einem Startbildschirm mit neun Menüeinträgen und ohne Weiter-Eintrag. Der Designfehler ist, dass das Menü den Abteilungen des Unternehmens folgt, nicht der Aufgabe der Lernenden.",
    ),
    why: "A user problem is something a learner cannot do or feel, and you can point at it. The design error names what in the design causes it and the fact number that shows it.",
    lookFor: ["Names a design error (system logic, many choices, missing orientation).", "Points at a fact number."],
  };
}

export function reasonGuide(id: string): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · Why this measure gets its ratings (${id.toUpperCase()})`,
    answer: r.reasons?.[id] ?? "",
    example: tt(
      "At LearnLoop, rebuilding the menu around tasks costs €12,000, so its effort is Mid. It answers the finding that learners cannot find their course, it is low risk because content stays, and the business gets fewer support requests.",
      "Bei LearnLoop kostet der Umbau des Menüs um Aufgaben herum 12.000 €, sein Aufwand ist also Mittel. Er beantwortet den Befund, dass Lernende ihren Kurs nicht finden, er ist risikoarm, weil der Inhalt bleibt, und das Unternehmen bekommt weniger Supportanfragen.",
    ),
    why: "Effort follows the printed cost (a rule). User value and risk are judgements: they must point at a printed fact and at what could be lost or wasted. The plan's coaching adds one sentence on what the business gets.",
    lookFor: ["Names the printed fact the measure answers.", "Says what could go wrong or why risk is low.", "Says what the business gets.", "Does not contradict the printed cost."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "2.2 · Why the first priority goes first (Core)",
    answer: R1().orderWhy ?? "",
    example: tt(
      "At LearnLoop the task-based menu goes first: it fixes what every learner meets on the first screen, and the other measures work better on top of a menu that makes sense.",
      "Bei LearnLoop kommt das aufgabenbasierte Menü zuerst: Es behebt, was jede Lernende auf dem ersten Bildschirm trifft, und die anderen Maßnahmen wirken auf einem Menü, das Sinn ergibt, besser.",
    ),
    why: "The plan's rationale: understanding users beats the number of features. A different first priority defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one, not for the whole set.", "Refers to the learner's problem, the cost or what the others depend on."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know whether learners leave because they cannot find the course or because the course is too long. I would watch five learners try to find their course on a Monday morning.",
      "Ich weiß nicht, ob Lernende gehen, weil sie den Kurs nicht finden oder weil der Kurs zu lang ist. Ich würde fünf Lernenden an einem Montagmorgen dabei zusehen, wie sie ihren Kurs suchen.",
    ),
    why: "The plan asks it outright. A good answer names a specific unknown that would change the decision, and a way to find it out.",
    lookFor: ["Names a specific unknown, not “more data”.", "Says how it could be found out.", "Connects to the decision."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function needsGuide(): MentorGuide {
  return {
    title: "3.1 · The central user needs (Core)",
    answer: R2().needs ?? "",
    example: tt(
      "At LearnLoop: a team lead wants to assign a course in two clicks, so the business gets more courses finished. A new hire wants to see what to do on day one, so the business gets faster onboarding.",
      "Bei LearnLoop: Eine Teamleiterin will einen Kurs mit zwei Klicks zuweisen, das Unternehmen bekommt also mehr abgeschlossene Kurse. Ein neuer Mitarbeiter will am ersten Tag sehen, was zu tun ist, das Unternehmen bekommt also schnelleres Onboarding.",
    ),
    why: "Materi B1: state each need as a sentence with three parts: who, what they want to do, and what the business gets if they can. A need without a business link will not get funded.",
    lookFor: ["Two or three needs.", "Each names who and a task.", "Each names a business figure that depends on it."],
  };
}

export function conflictGuide(): MentorGuide {
  return {
    title: "3.1 · The conflict analysis (Core)",
    answer: Object.entries(R2().conflict ?? {}).map(([k, v]) => `${k.toUpperCase()}: ${v.user} / ${v.business} / ${v.lost}`).join(" | "),
    example: tt(
      "At LearnLoop, a simpler menu: the user gets the course in one click; the business gets fewer support requests; what is lost is a promotion slot on the home screen, which moves to the course page.",
      "Bei LearnLoop ein einfacheres Menü: Die Nutzer bekommen den Kurs mit einem Klick; das Unternehmen bekommt weniger Supportanfragen; verloren geht ein Aktionsplatz auf dem Startbildschirm, der auf die Kursseite wandert.",
    ),
    why: "Materi B2: name what the user, the business and the other side get or lose. A decision that serves only one goal is a trade-off: say what the others lose and how you limit the loss.",
    lookFor: ["Three short entries per decision.", "What is lost or postponed is something someone would miss.", "Counts the business gain in completion or support, not in banners."],
  };
}

export function decisionOrderGuide(): MentorGuide {
  return {
    title: "3.1 · Why the first decision goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "A task-based home screen goes first because it helps every learner and the business sees completion rise within a few months; the approval rule follows so that new features do not undo it.",
      "Ein aufgabenbasierter Startbildschirm kommt zuerst, weil er jeder Lernenden hilft und das Unternehmen die Completion innerhalb weniger Monate steigen sieht; die Freigaberegel folgt, damit neue Features ihn nicht zunichtemachen.",
    ),
    why: "The roadmap is an order with a reason. The model order is rebuild, research programme, approval rule; a different order defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one.", "Says what it does for the user and for the business."],
  };
}

export function riskPlanGuide(): MentorGuide {
  return {
    title: "3.2 · What you do about the biggest risk (Core)",
    answer: R2().riskPlan ?? "",
    example: tt(
      "I run three learner interviews and a usability test before we sign off the new menu, so that we fix what learners meet, not what we assume. I would notice the risk if the interviews name a problem we did not plan for.",
      "Ich führe drei Lernenden-Interviews und einen Usability-Test durch, bevor wir das neue Menü abnehmen, damit wir beheben, was Lernende treffen, nicht was wir annehmen. Ich würde das Risiko bemerken, wenn die Interviews ein Problem nennen, das wir nicht eingeplant haben.",
    ),
    why: "A risk with no action is only a worry. The action is concrete: what is done, and when it is noticed.",
    lookFor: ["Names an action.", "Says when or how the risk would be noticed."],
  };
}

export function ruleGuide(): MentorGuide {
  return {
    title: "3.2 · The rule every new feature must pass (Core)",
    answer: R2().rule ?? "",
    example: tt(
      "Before a feature enters the roadmap, the requester names the learner problem it solves, the figure that will show it worked, and who owns it; otherwise it waits.",
      "Bevor ein Feature in die Roadmap kommt, nennt der Antragsteller das Problem der Lernenden, das es löst, die Zahl, die zeigt, dass es gewirkt hat, und wer es verantwortet; sonst wartet es.",
    ),
    why: "Materi B3: a feature approval rule is the most direct decision architecture against feature creep: a named user problem, a metric and an owner.",
    lookFor: ["Names a user problem.", "Names a metric.", "Names an owner.", "One or two sentences."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.2 · The decision without complete user data (Core)",
    answer: R2().uncertain ?? "",
    example: tt(
      "I decide to put a “Continue” button on the home screen of two courses first. I do not know whether learners leave because of the menu or the search. I will reverse it if completion in those courses has not risen by two points after three months.",
      "Ich entscheide, zuerst auf dem Startbildschirm von zwei Kursen einen „Weiter“-Button zu zeigen. Ich weiß nicht, ob Lernende wegen des Menüs oder der Suche gehen. Ich nehme es zurück, wenn die Completion in diesen Kursen nach drei Monaten nicht um zwei Punkte gestiegen ist.",
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
      "I give up the new chat feature this year and postpone the extra courses; sales gets a date to return with a named learner problem.",
      "Ich verzichte dieses Jahr auf das neue Chat-Feature und verschiebe die zusätzlichen Kurse; der Vertrieb bekommt einen Termin, um mit einem genannten Problem der Lernenden wiederzukommen.",
    ),
    why: "The skill of Level 3: a decision that gives up nothing has not decided. The answer names something real that a stakeholder would miss.",
    lookFor: ["Names a concrete thing given up or postponed.", "It is something someone would miss, not a throwaway."],
  };
}
