import { KEY_D2_R1, KEY_D2_R2 } from "@/lib/day2/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 2 (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode,
 * read from the same key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing
 * example (ExampleAnswer, no passcode): the same method on a different company, LearnLoop (an online-course provider that wants to improve how
 * learners start a course, with €60,000, three months and unclear needs), so a learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D2_R1();
const R2 = () => KEY_D2_R2();

export function preferGuide(): MentorGuide {
  return {
    title: "1.1 · Which platform you would prefer, and why (Core)",
    answer: R1().preferWhy ?? "",
    example: tt(
      "On the platform I would prefer, a unit is marked “8 min” and the next one waits at the bottom, so I can use a coffee break. On the other I could not tell how long anything would take, and I would put it off.",
      "Auf der Plattform, die ich bevorzugen würde, ist eine Einheit mit „8 Min.“ markiert, und die nächste wartet unten, ich kann also eine Kaffeepause nutzen. Auf der anderen könnte ich nicht erkennen, wie lange etwas dauert, und würde es aufschieben.",
    ),
    why: "Either platform defends, but the plan asks for the preference with a reason (“welche Plattform würden Sie bevorzugen und warum?”). The reason must say what the learner can do or feel, not that one looks nicer.",
    lookFor: ["Written from the learner's side (“I can…”, “I would…”).", "Names something the learner can do or see on one platform and not on the other.", "Is not only “it looks nicer”."],
  };
}

export function principleGuide(): MentorGuide {
  const p = R1().principles ?? [];
  return {
    title: "1.1 · Three principles of success, “Do X, because Y” (Core)",
    answer: p.join(" "),
    example: tt(
      "Name the goal of every unit at the top, because a learner who knows what a unit is for can tell whether it is worth ten minutes.",
      "Nennen Sie oben das Ziel jeder Einheit, weil eine Lernende, die weiß, wofür eine Einheit da ist, beurteilen kann, ob sie zehn Minuten wert ist.",
    ),
    why: "The plan asks to derive three principles of success from the differences. A good principle is a sentence with a reason, tied to one of the three practices (path, short units, feedback), not a feature name.",
    lookFor: ["Each principle has “Do X” and “because Y”.", "The three are different (not the same idea three times).", "Each can be traced to a difference between the two platforms."],
    pitfalls: ["A feature name with no reason (“a progress bar”).", "A result listed as a principle (“completion rises”)."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · Your decision under time pressure",
    answer: R1().optWhy ?? "",
    example: tt(
      "I would test low-fidelity first: it costs a fraction of the budget, and after two weeks we know what learners do, which the other two options cannot tell us before the money is spent.",
      "Ich würde zuerst Low-Fidelity testen: Es kostet einen Bruchteil des Budgets, und nach zwei Wochen wissen wir, was Lernende tun, was die anderen beiden Optionen uns vor dem Geldausgeben nicht sagen können.",
    ),
    why: "The plan's rationale: minimise risk before maximising technology. A good answer refers to the cost, to what will be known afterwards, or to what could go wrong.",
    lookFor: ["Gives a reason in terms of cost, evidence gained or risk.", "Does not rest on “it looks finished”."],
  };
}

export function optRiskGuide(): MentorGuide {
  return {
    title: "1.2 (Optional) · The risk that worries you most without testing",
    answer: R1().optRiskOther ?? "",
    example: tt(
      "What worries me most is that learners leave before we know why: we would only see the number fall, never the reason.",
      "Am meisten sorgt mich, dass Lernende gehen, bevor wir wissen, warum: Wir sähen nur die Zahl sinken, nie den Grund.",
    ),
    why: "Not scored. The point is to name a risk of the case in the learner's own words.",
    lookFor: ["Names a risk that applies to the case.", "Says why it matters to this team."],
  };
}

export function reflectGuide(): MentorGuide {
  const r = R1().reflect;
  return {
    title: "1.3 (Optional) · Coaching reflection",
    answer: `${r?.a ?? ""} ${r?.b ?? ""} ${r?.c ?? ""}`,
    why: "Reflection is never scored. The plan's coaching points: successful platforms are not “good by chance”; prototyping reduces risk; testing is the basis for decisions. Use the learners' notes as the start of the live discussion.",
  };
}

export function weakGuide(): MentorGuide {
  return {
    title: "2.1 (Optional) · Which printed fact supports your first weakness",
    answer: R1().weakWhy ?? "",
    example: tt(
      "At LearnLoop the brief says new learners get no first-week guide, and two printed facts show long unexplained lists. Those are the weaknesses I can point at; “the logo is old” has nothing printed behind it.",
      "Bei LearnLoop sagt der Auftrag, dass neue Lernende keine Anleitung für die erste Woche bekommen, und zwei gedruckte Fakten zeigen lange unerklärte Listen. Das sind die Schwächen, auf die ich zeigen kann; für „das Logo ist alt“ steht nichts Gedrucktes dahinter.",
    ),
    why: "A weakness is defended by a printed fact. The plan's model solution names the main problem as a lack of feedback and individualisation.",
    lookFor: ["Points at a printed fact (by its number) or quotes a case line.", "Does not offer a weakness the case never mentions."],
  };
}

export function approachGuide(): MentorGuide {
  return {
    title: "2.2 · Why this prototype approach (Core)",
    answer: R1().approachWhy ?? "",
    example: tt(
      "For LearnLoop I would pick the clickable grey-box version of the course start: it answers “can learners find the next step?” first, and it leaves the colours and the final speed for a later round.",
      "Für LearnLoop würde ich die klickbare Grau-Kasten-Version des Kursstarts wählen: Sie beantwortet zuerst „Finden Lernende den nächsten Schritt?“ und lässt Farben und endgültige Geschwindigkeit für eine spätere Runde.",
    ),
    why: "The plan's model solution: low-fidelity tests first, focus on learning paths and interaction. A good answer names the question the approach answers first and what it leaves for later.",
    lookFor: ["Names the first question the approach answers.", "Says what it leaves for later.", "Does not choose polish or a full build while needs are unclear."],
  };
}

export function testQGuide(): MentorGuide {
  const q = R1().testQ ?? {};
  return {
    title: "2.2 · The question each chosen test answers (Core)",
    answer: Object.values(q).join(" "),
    example: tt(
      "A drop-out count per lesson shows where learners leave. It does not show why, so it is paired with a test where I can watch five learners try the first lesson.",
      "Eine Abbruchzahl pro Lektion zeigt, wo Lernende gehen. Sie zeigt nicht, warum, deshalb wird sie mit einem Test gepaart, bei dem ich fünf Lernende beim Versuch der ersten Lektion beobachten kann.",
    ),
    why: "A test is chosen for the question it answers. A set that only counts (all quantitative) or only watches (all qualitative) leaves half of the question open: where, and why.",
    lookFor: ["States a question, not the name of the test again.", "Matches the kind of data the test gives (why or how many).", "Does not claim a test shows what it cannot (a count does not show a cause)."],
    pitfalls: ["Three tests of the same kind.", "Choosing the usability test of the full high-fidelity redesign before the design exists."],
  };
}

export function adaptiveGuide(): MentorGuide {
  return {
    title: "2.2 · The decision on adaptive learning (Core)",
    answer: R1().adaptiveWhy ?? "",
    example: tt(
      "For a platform with little data and one clear problem, I would say “partly”: start with one rule, a pre-test that lets learners skip the basics, and wait with an algorithm until there are enough learners and the legal check is done.",
      "Für eine Plattform mit wenig Daten und einem klaren Problem würde ich „teilweise“ sagen: mit einer Regel beginnen, einem Vortest, der Lernende die Grundlagen überspringen lässt, und mit einem Algorithmus warten, bis es genug Lernende gibt und die rechtliche Prüfung erfolgt ist.",
    ),
    why: "The plan's model solution introduces adaptive elements only step by step. The three questions of Materi A5: is there a learner problem that individual paths solve, is there enough data, are there content variants? “Partly” is a real answer.",
    lookFor: ["Says yes, partly or no and gives a reason.", "Names the first step.", "If partly, says which part waits."],
  };
}

export function missingGuide(): MentorGuide {
  return {
    title: "2.2 · What information you are missing (Core)",
    answer: R1().missingInfo ?? "",
    example: tt(
      "I do not know whether learners leave because the start is confusing or because the course is too long. I would interview six who left before choosing what to build.",
      "Ich weiß nicht, ob Lernende gehen, weil der Start verwirrend oder der Kurs zu lang ist. Ich würde sechs Ausgestiegene befragen, bevor ich entscheide, was gebaut wird.",
    ),
    why: "The plan's brief says user needs are unclear. A good answer names a specific unknown that would change the decision, and a way to find it out.",
    lookFor: ["Names a specific unknown, not “more data”.", "Says how it could be found out.", "Connects to the decision (what would change)."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function r2AdaptiveGuide(): MentorGuide {
  return {
    title: "3.1 · Do we invest in adaptive learning? (Core)",
    answer: R2().adaptiveWhy ?? "",
    example: tt(
      "I would say “partly”: fund a rule-based pilot in one course now, with a control group, and let the AI engine wait for the gate that checks the pilot's result.",
      "Ich würde „teilweise“ sagen: jetzt einen regelbasierten Pilot in einem Kurs mit Kontrollgruppe finanzieren und die KI-Engine auf das Gate warten lassen, das das Ergebnis des Pilots prüft.",
    ),
    why: "The plan asks yes, no or partly. Materi B1: treat the investment as a staged bet; “partly” means the part the evidence supports now, and the rest waits for its gate.",
    lookFor: ["States yes, partly or no.", "If partly, says what is funded now and what waits.", "Does not follow competitors as the only reason."],
  };
}

export function prototypingGuide(): MentorGuide {
  return {
    title: "3.1 · Prototyping strategy (Core)",
    answer: R2().prototyping ?? "",
    example: tt(
      "We test every new feature on paper first with five learners, and move to a clickable version only when the first question, whether learners find the next step, is answered.",
      "Wir testen jede neue Funktion zuerst auf Papier mit fünf Lernenden und gehen erst zu einer klickbaren Version über, wenn die erste Frage, ob Lernende den nächsten Schritt finden, beantwortet ist.",
    ),
    why: "Materi A2: choose the fidelity by the question; test low-fidelity first when needs are unclear.",
    lookFor: ["Names the fidelity to start with.", "Names the first question it answers.", "Says how many users or rounds (about five per group)."],
  };
}

export function invOrderGuide(): MentorGuide {
  return {
    title: "3.1 · Why the first investment goes first (Core)",
    answer: R2().orderWhy ?? "",
    example: tt(
      "The guided start comes first because it reaches every new learner and is tested on paper before it is built; the analytics come second because the pilot needs them.",
      "Der geführte Start kommt zuerst, weil er jede neue Lernende erreicht und vor dem Bau auf Papier getestet wird; die Analytics kommen als Zweites, weil der Pilot sie braucht.",
    ),
    why: "The roadmap is an order with a reason. The model order is path and feedback, then data, then the pilot; a different order defends if the reason is concrete.",
    lookFor: ["Gives a reason for position one.", "Refers to reach, cost, dependency or evidence."],
  };
}

export function riskPlanGuide(): MentorGuide {
  return {
    title: "3.2 · What you do about the biggest risk (Core)",
    answer: R2().riskPlan ?? "",
    example: tt(
      "I reserve the first month for a consent and data check, so that if the data cannot support the pilot, we know before we spend on it.",
      "Ich reserviere den ersten Monat für eine Einwilligungs- und Datenprüfung, damit wir, falls die Daten den Pilot nicht tragen, es wissen, bevor wir Geld dafür ausgeben.",
    ),
    why: "A risk with no action is only a worry. The action should be concrete: what is done, and when it is noticed.",
    lookFor: ["Names an action.", "Says when or how the risk would be noticed."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.2 · The decision under uncertainty (Core)",
    answer: R2().uncertain ?? "",
    example: tt(
      "I decide to run a pre-test pilot in one course. I do not know whether our learners will skip basics they think they know. I will reverse it if fewer than 60% of those who skip pass the later quiz after six weeks.",
      "Ich entscheide, einen Vortest-Pilot in einem Kurs zu fahren. Ich weiß nicht, ob unsere Lernenden Grundlagen überspringen, von denen sie glauben, sie zu kennen. Ich nehme ihn zurück, wenn nach sechs Wochen weniger als 60 % derer, die überspringen, das spätere Quiz bestehen.",
    ),
    why: "The frame of Materi B3: what I decide, what I do not know, what would make me reverse and by when. A checkable reversal condition has a figure and a time.",
    lookFor: ["States the decision.", "States what is not known.", "Gives a checkable reversal condition with a figure and a time."],
    pitfalls: ["A reversal condition no one could check (“if it does not work”).", "A decision that gives up an irreversible commitment instead of a pilot."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "3.2 · What you give up or postpone (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "I give up the personal-recommendation engine this year, and I postpone the new visual style; learners keep the current look for now.",
      "Ich verzichte dieses Jahr auf die persönliche Empfehlungs-Engine und verschiebe den neuen visuellen Stil; die Lernenden behalten vorerst das jetzige Aussehen.",
    ),
    why: "The skill of Level 3: a decision that gives up nothing has not decided. The answer names something real that a stakeholder would miss.",
    lookFor: ["Names a concrete thing given up or postponed.", "It is something someone would miss, not a throwaway."],
  };
}
