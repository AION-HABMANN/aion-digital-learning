import { KEY_D6_R1, KEY_D6_R2 } from "@/lib/day6/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 6 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode, read from the same
 * key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing example (ExampleAnswer, no passcode): the
 * same method on a different company, LearnLoop (an online-course provider), with its own persona, so a learner can see the shape of a good answer but not copy
 * a value across.
 */
const R1 = () => KEY_D6_R1();
const R2 = () => KEY_D6_R2();

export function personaGuide(): MentorGuide {
  const p = R1().persona;
  return {
    title: "1.1 · The learner persona (Core)",
    answer: p ? `${p.nameRole}. ${p.goals} ${p.problems} ${p.situation} ${p.expectations}` : "",
    example: tt(
      "Mia, 29, a sales assistant. Goal: qualify for a team-lead role (a reason in her life). Problem: after a few days away she loses the thread. Situation: twenty minutes on her phone in the evening, paid by her employer. She expects to land where she stopped. Sources: two interviews and one log analysis.",
      "Mia, 29, Vertriebsassistentin. Ziel: sich für eine Teamleitung qualifizieren (ein Grund in ihrem Leben). Problem: Nach ein paar Tagen Pause verliert sie den Faden. Situation: zwanzig Minuten auf dem Handy am Abend, vom Arbeitgeber bezahlt. Sie erwartet, dort zu landen, wo sie aufgehört hat. Quellen: zwei Interviews und eine Log-Analyse.",
    ),
    why: "Materi A1: a persona has goals, problems and the context of use, each stated as a situation, not a verdict, and each with a source. A statement without a source is a hypothesis.",
    lookFor: ["Goals as reasons in a life, not feature wishes.", "Problems as situations, not “the platform is bad”.", "A context with time, device and motivation.", "Cites note numbers.", "A persona, not a list of notes."],
    pitfalls: ["A cliché (“tech-savvy, loves apps”).", "Mixing the teacher into the learner persona."],
  };
}

export function frustrationsGuide(): MentorGuide {
  return {
    title: "1.1 · Frustrations and the decision the persona supports (Core)",
    answer: R1().frustrations ?? "",
    example: tt(
      "At LearnLoop Mia could be frustrated when she opens a lesson on her phone at night and finds a long page with no way to save her place. A team could decide, because of her, to add a save-my-place button.",
      "Bei LearnLoop könnte Mia frustriert sein, wenn sie nachts auf dem Handy eine Lektion öffnet und eine lange Seite findet, ohne Möglichkeit, ihre Stelle zu speichern. Ein Team könnte wegen ihr entscheiden, einen Button zum Merken der Stelle zu ergänzen.",
    ),
    why: "The plan asks for possible frustrations, and the coaching point says a persona is a decision tool. A good answer names a situation and one decision that would change because of the persona (Materi A1, A2).",
    lookFor: ["Names a situation, not a verdict.", "Names one decision a team could take because of the persona.", "Fits the persona's goals and context."],
  };
}

export function journeyProblemsGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Four possible problems that lead to the drop-out",
    answer: R1().jProblems ?? "",
    example: tt(
      "At LearnLoop: 1. The first lesson is long. 2. Nothing says what comes next. 3. The reminder comes at a bad time. 4. There is no sign of progress.",
      "Bei LearnLoop: 1. Die erste Lektion ist lang. 2. Nichts sagt, was als Nächstes kommt. 3. Die Erinnerung kommt zu einem ungünstigen Zeitpunkt. 4. Es gibt kein Zeichen von Fortschritt.",
    ),
    why: "The plan asks for four possible problems, not the right four. A good list names situations along the path, one per line.",
    lookFor: ["Four lines.", "Situations, not verdicts.", "Spread over the phases."],
  };
}

export function criticalGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Why that phase is critical",
    answer: R1().jCriticalWhy ?? "",
    example: tt(
      "At LearnLoop the learning phase is critical: Mia's emotion drops there because the unit is long, and after it she stops.",
      "Bei LearnLoop ist die Lernphase kritisch: Mias Emotion fällt dort, weil die Einheit lang ist, und danach hört sie auf.",
    ),
    why: "Materi A3: mark a phase as critical where the emotion is lowest or where the person stops, and say what happens to the emotion and what the person does next. Another phase defends if the sentence says so.",
    lookFor: ["Names the phase.", "Says what happens to the emotion.", "Says what the person does next."],
  };
}

export function reflectGuide(): MentorGuide {
  const r = R1().reflect;
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${r?.a ?? ""} ${r?.b ?? ""} ${r?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: a persona is a decision tool, not a profile; many personas stay ineffective; a journey reveals systemic problems, not single errors. Use the learners' notes as the start of the live discussion.",
  };
}

export function teacherGuide(): MentorGuide {
  const p = R1().teacher;
  return {
    title: "2.1 (Optional) · The teacher persona",
    answer: p ? `${p.nameRole}. ${p.goals} ${p.problems} ${p.situation}` : "",
    example: tt(
      "At LearnLoop: Sven, 41, a trainer. Goal: build a course quickly. Problem: the editor hides the upload behind four menus. Situation: builds on Sunday at his desk, unpaid time.",
      "Bei LearnLoop: Sven, 41, Trainer. Ziel: schnell einen Kurs bauen. Problem: Der Editor versteckt den Upload hinter vier Menüs. Situation: baut am Sonntag am Schreibtisch, unbezahlte Zeit.",
    ),
    why: "Materi A4: the teacher wants to build and run a course with little effort and to see how learners are doing; a different persona from the learner.",
    lookFor: ["A teacher's goal, not a learner's.", "Cites T-notes.", "A context of use."],
  };
}

export function sharedGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · A pain point that appears for two groups",
    answer: R1().shared ?? "",
    example: tt(
      "At LearnLoop both the learner and the teacher cannot see where a course stands, one where she stopped and the other which learners are stuck. That suggests a missing course overview as the cause.",
      "Bei LearnLoop können sowohl die Lernende als auch der Lehrende nicht sehen, wo ein Kurs steht, die eine, wo sie aufgehört hat, der andere, welche Lernenden feststecken. Das legt nahe, dass eine fehlende Kursübersicht die Ursache ist.",
    ),
    why: "Materi A3: look for a pain point that recurs across personas; it points to a systemic cause that one fix can remove.",
    lookFor: ["Names a pain point for two groups.", "Names a cause in the process, not a single screen."],
  };
}

export function reasonGuide(id: string): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · Why this measure gets its ratings (${id.toUpperCase()})`,
    answer: r.reasons?.[id] ?? "",
    example: tt(
      "At LearnLoop a resume button costs €5,000, so its effort is Low. It answers Mia's lowest point, many learners return after a break, and it is a small addition that can be undone, so risk is Low.",
      "Bei LearnLoop kostet ein Fortsetzen-Button 5.000 €, sein Aufwand ist also Niedrig. Er beantwortet Mias tiefsten Punkt, viele Lernende kehren nach einer Pause zurück, und er ist eine kleine Ergänzung, die sich zurücknehmen lässt, das Risiko ist also Niedrig.",
    ),
    why: "Effort follows the printed cost (a rule). User impact is rated for a named persona at a named pain point and weighed by how many people the persona stands for; risk is what could be lost or wasted.",
    lookFor: ["Names the note or touchpoint it answers.", "Says what could go wrong or why risk is low.", "Does not contradict the printed cost."],
  };
}

export function painGuide(id: string): MentorGuide {
  const r = R1();
  return {
    title: `2.2 · The pain point it answers (${id.toUpperCase()})`,
    answer: r.pain?.[id] ?? "",
    example: tt(
      "At LearnLoop: the learner persona, in the learning phase: she loses the thread after a few days away.",
      "Bei LearnLoop: die Lernenden-Persona, in der Lernphase: Sie verliert nach ein paar Tagen Pause den Faden.",
    ),
    why: "The plan asks the learner to place each measure on the journey: the persona and the phase where it acts. A measure that touches no pain point has a low impact (Materi A5).",
    lookFor: ["Names a persona.", "Names a phase.", "Points at a printed note."],
  };
}

export function orderGuide(): MentorGuide {
  return {
    title: "2.2 · Why the first priority goes first (Core)",
    answer: R1().orderWhy ?? "",
    example: tt(
      "At LearnLoop the resume button goes first: it answers the persona's lowest point, costs the least and is done before the larger measures start.",
      "Bei LearnLoop kommt der Fortsetzen-Button zuerst: Er beantwortet den tiefsten Punkt der Persona, kostet am wenigsten und ist fertig, bevor die größeren Maßnahmen beginnen.",
    ),
    why: "A reason for position one: the persona and the pain point it answers, the cost, or what the others depend on. Segmentation helps: name the group you give most weight.",
    lookFor: ["Gives a reason for position one, not for the whole set.", "Names the group it weighs most."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know whether learners leave because the lesson is too long or because they cannot find the course. I would interview five who stopped.",
      "Ich weiß nicht, ob Lernende gehen, weil die Lektion zu lang ist oder weil sie den Kurs nicht finden. Ich würde fünf interviewen, die aufgehört haben.",
    ),
    why: "The plan asks it outright. A good answer names a specific unknown that would change the decision, and a way to find it out.",
    lookFor: ["Names a specific unknown, not “more data”.", "Says how it could be found out."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function segPersonaGuide(): MentorGuide {
  return {
    title: "3.1 · A strategic persona, in one or two sentences",
    answer: Object.values(R2().segPersona ?? {}).join(" | "),
    example: tt(
      "At LearnLoop: Sven, a trainer, wants to build a course in an evening but finds the editor too long (the 90 teachers who supply the content, 3 of 5 interviewed agree).",
      "Bei LearnLoop: Sven, ein Trainer, will an einem Abend einen Kurs bauen, findet den Editor aber zu lang (die 90 Lehrenden, die den Inhalt liefern, 3 von 5 Befragten stimmen zu).",
    ),
    why: "Materi B1: a persona is strategic if a decision would change because of it. One or two sentences with the goal, the problem and situation, and the evidence in the segment's facts.",
    lookFor: ["A goal and a problem.", "Cites the segment's printed facts.", "A decision would change because of it."],
  };
}

export function targetWhyGuide(): MentorGuide {
  return {
    title: "3.1 · Why this group first (Core)",
    answer: R2().targetWhy ?? "",
    example: tt(
      "At LearnLoop the teachers go first: they supply all the content, so if they leave the learners have nothing to learn; the learners wait one quarter and get a smaller fix.",
      "Bei LearnLoop kommen die Lehrenden zuerst: Sie liefern den gesamten Inhalt, wenn sie gehen, haben die Lernenden nichts zu lernen; die Lernenden warten ein Quartal und bekommen eine kleinere Lösung.",
    ),
    why: "Materi B1: say which test decided (size, business value, where the journey breaks) and what the other groups get. The largest group is not always the most important.",
    lookFor: ["Names the test.", "Says what the other groups get.", "Uses the printed figures."],
  };
}

export function problemsGuide(): MentorGuide {
  return {
    title: "3.1 · The three biggest problems of the target group",
    answer: R2().problems ?? "",
    example: tt(
      "At LearnLoop, for the teachers: 1. In the set-up phase the upload takes three hours. 2. In the run phase they cannot see who is stuck. 3. In the review phase they must copy a unit by hand.",
      "Bei LearnLoop, für die Lehrenden: 1. In der Einrichtungsphase dauert der Upload drei Stunden. 2. In der Durchführungsphase sehen sie nicht, wer feststeckt. 3. In der Auswertungsphase müssen sie eine Einheit von Hand kopieren.",
    ),
    why: "The plan asks for the three biggest problems of the target group. Each names the situation and the phase of the journey.",
    lookFor: ["Three lines.", "Each names a phase.", "Situations, not verdicts."],
  };
}

export function journeyR2Guide(): MentorGuide {
  const jr = R2().jr;
  return {
    title: "3.2 · The critical journey of the target group",
    answer: jr ? Object.entries(jr).map(([k, c]) => `${k}: ${c.does} / ${c.pain} / ${c.acts}`).join(" | ") : "",
    example: tt(
      "At LearnLoop, for a teacher: set up: builds a course on Sunday, emotion 2, pain: nine tabs, the strategy acts with a shorter editor. Run: waits for messages, emotion 2, pain: cannot see who is stuck, a list of stuck learners.",
      "Bei LearnLoop, für einen Lehrenden: Einrichten: baut am Sonntag einen Kurs, Emotion 2, Pain Point: neun Reiter, die Strategie setzt mit einem kürzeren Editor an. Durchführen: wartet auf Nachrichten, Emotion 2, Pain Point: sieht nicht, wer feststeckt, eine Liste der Festgefahrenen.",
    ),
    why: "Materi A3 and B2: map the persona through the three phases; where the emotion is lowest the strategy must act, and the last row names where.",
    lookFor: ["A persona named.", "Emotion rated for each phase.", "A pain point and a point of action in each phase."],
  };
}

export function decisionOrderGuide(): MentorGuide {
  return {
    title: "3.2 · Why the first decision goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "A resume-anywhere format goes first because it fixes the critical phase of the largest group and moves the first figure within twenty weeks; the research programme runs beside it.",
      "Ein Format zum Fortsetzen überall kommt zuerst, weil es die kritische Phase der größten Gruppe behebt und die erste Zahl innerhalb von zwanzig Wochen bewegt; das Forschungsprogramm läuft daneben.",
    ),
    why: "The strategy is an order with a reason. A different order defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one.", "Says what it does for the target group."],
  };
}

export function uncertainGuide(): MentorGuide {
  const r = R2();
  return {
    title: "3.2 · The decision under uncertainty: which persona is prioritised (Core)",
    answer: `${r.decide ?? ""} ${r.dontKnow ?? ""} ${r.reverse ?? ""}`,
    example: tt(
      "I decide that teachers are prioritised for two quarters. I do not know whether their complaints come from the editor or from slow uploads. I reverse if learner sign-ups fall by 5% by month four.",
      "Ich entscheide, dass Lehrende zwei Quartale lang priorisiert werden. Ich weiß nicht, ob ihre Beschwerden vom Editor oder von langsamen Uploads kommen. Ich nehme zurück, wenn die Anmeldungen der Lernenden bis Monat vier um 5 % fallen.",
    ),
    why: "The frame of Materi B3: what I decide, what I do not know, what would make me reverse and by when. A checkable reversal condition has a figure and a time.",
    lookFor: ["States the decision.", "States what is not known.", "A reversal condition with a figure and a time."],
    pitfalls: ["A reversal condition no one could check (“if it does not work”)."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "3.2 · What you give up and when that segment gets its turn (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "I give up the exam-preparation mode this year; its users get their turn in the third quarter, and I will tell them the date.",
      "Ich verzichte dieses Jahr auf den Prüfungsvorbereitungsmodus; seine Nutzer kommen im dritten Quartal an die Reihe, und ich nenne ihnen den Termin.",
    ),
    why: "The skill of Level 3: a decision that gives up nothing has not decided. The answer names a segment that waits and when it is revisited (Materi B2, B3).",
    lookFor: ["Names a real segment or decision that waits.", "Names when it gets its turn."],
  };
}
