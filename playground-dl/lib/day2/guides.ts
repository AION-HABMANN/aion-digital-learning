import { KEY_D2_R1, KEY_D2_R2 } from "@/lib/day2/mentorKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import { tt } from "@/lib/lang";

/**
 * Worked answers for every free-text question of Day 2 (CLAUDE.md #23, #57). `answer` is the real model text the mentor sees after the passcode,
 * read from the same key the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing
 * example (ExampleAnswer, no passcode): the same method on a different company, LearnLoop (an online-course provider that wants to improve how
 * learners start a course), so a learner can see the shape of a good answer but not copy a value across.
 */
const R1 = () => KEY_D2_R1();
const R2 = () => KEY_D2_R2();
const join = (o: Record<string, string> | undefined, keys: string[]) => keys.map((k) => `${k}: ${o?.[k] ?? ""}`).join(" ");

/* ------------------------------------------------------------------ Block 1.1 */

export function preferGuide(): MentorGuide {
  return {
    title: "1.1 · Which platform you would prefer, and why",
    answer: R1().preferWhy ?? "",
    example: tt(
      "On the platform I would prefer, a unit is marked “8 min” and the next one waits at the bottom, so I can use a coffee break. On the other I could not tell how long anything would take, and I would put it off.",
      "Auf der Plattform, die ich bevorzugen würde, ist eine Einheit mit „8 Min.“ markiert, und die nächste wartet unten, ich kann also eine Kaffeepause nutzen. Auf der anderen könnte ich nicht erkennen, wie lange etwas dauert, und würde es aufschieben.",
    ),
    why: "Either platform defends, but the plan asks for the preference with a reason (“welche Plattform würden Sie bevorzugen und warum?”). The reason must say what the learner can do or feel, not that one looks nicer.",
    lookFor: ["Written from the learner's side (“I can…”, “I would…”).", "Names something the learner can do or see on one platform and not on the other.", "Is not only “it looks nicer”."],
  };
}

export function diffsGuide(): MentorGuide {
  return {
    title: "1.1 · Five differences between Platform A and B",
    answer: R1().diffs ?? "",
    example: tt(
      "Menu: the learning app has a list of lessons on the left; the course site has only a long page.\nTime: each lesson of the app says “8 min”; the site gives no time at all.\nStart: the app opens on the next unfinished lesson; the site always opens at the top.\nResult: the app shows a score after every exercise; the site shows nothing.\nLook: the site has more colour and pictures; the app is plain but easy to scan.",
      "Menü: Die Lern-App hat links eine Liste der Lektionen; die Kurs-Website hat nur eine lange Seite.\nZeit: Jede Lektion der App nennt „8 Min.“; die Website nennt gar keine Zeit.\nStart: Die App öffnet bei der nächsten offenen Lektion; die Website öffnet immer oben.\nErgebnis: Die App zeigt nach jeder Übung ein Ergebnis; die Website zeigt nichts.\nAussehen: Die Website hat mehr Farbe und Bilder; die App ist schlicht, aber leicht zu überblicken.",
    ),
    why: "The plan asks to identify five differences (“Identifizieren Sie 5 Unterschiede”). Any five real differences that can be pointed at in the two pictures are acceptable; they need not be the five in the model. The model uses path, progress, length, result and ending.",
    lookFor: ["Five different lines, one difference each.", "Each line says what Platform A has and what Platform B has.", "Each can be found in the pictures or the eight numbered places."],
    pitfalls: ["Five lines that are one idea said five ways (“B is worse”).", "Only a judgement with no thing to point at (“A feels better”)."],
  };
}

export function principleGuide(): MentorGuide {
  const p = R1().principles ?? [];
  return {
    title: "1.1 · Three principles of success, “Do X, because Y”",
    answer: p.join(" "),
    example: tt(
      "Name the goal of every unit at the top, because a learner who knows what a unit is for can tell whether it is worth ten minutes.",
      "Nennen Sie oben das Ziel jeder Einheit, weil eine Lernende, die weiß, wofür eine Einheit da ist, beurteilen kann, ob sie zehn Minuten wert ist.",
    ),
    why: "The plan asks to derive three principles of success from the differences. A good principle is a sentence with a reason that follows from one of the learner's own differences, not a feature name.",
    lookFor: ["Each principle has “Do X” and “because Y”.", "The three are different (not the same idea three times).", "Each can be traced to one of the learner's own five differences."],
    pitfalls: ["A feature name with no reason (“a progress bar”).", "A result listed as a principle (“completion rises”)."],
  };
}

/* ------------------------------------------------------------------ Block 1.2 */

export function assessGuide(): MentorGuide {
  return {
    title: "1.2 · Assess each option: risk, benefit, effort",
    answer: join(R1().assessText, ["A", "B", "C"]),
    example: tt(
      "Option X (polish the screens first): risk medium, because we may polish what nobody needs; benefit medium, a good-looking demo; effort high. Option Y (sketch and ask five learners): risk low, benefit high, we learn quickly; effort low. Option Z (build it all): risk high, benefit low until launch, effort very high.",
      "Option X (zuerst die Bildschirme ausarbeiten): Risiko mittel, weil wir ausarbeiten könnten, was niemand braucht; Nutzen mittel, eine schöne Demo; Aufwand hoch. Option Y (skizzieren und fünf Lernende fragen): Risiko gering, Nutzen hoch, wir lernen schnell; Aufwand gering. Option Z (alles bauen): Risiko hoch, Nutzen gering bis zum Start, Aufwand sehr hoch.",
    ),
    why: "The plan asks to assess each option on risk, benefit and effort (“Bewerten Sie jede Option”). Risk, benefit and effort are the learner's own judgement and are never marked. The plan's Musterlösung rationale is to minimise risk before maximising technology, so the model rates B low risk, high benefit, low effort.",
    lookFor: ["All three options are assessed, not only the favourite.", "Each option is judged on risk, benefit and effort in the same terms.", "A judgement is tied to a condition (three months, limited budget, unclear needs)."],
    pitfalls: ["Only the chosen option is assessed in detail.", "A rating with no reason (“B is better”)."],
  };
}

export function optWhyGuide(): MentorGuide {
  return {
    title: "1.2 · Your decision under time pressure",
    answer: R1().optWhy ?? "",
    example: tt(
      "I would test low-fidelity first: with the short time and the small budget it leaves most of both free, and after two weeks we know what learners do, which the other two options cannot tell us before the money is spent.",
      "Ich würde zuerst Low-Fidelity testen: Bei der kurzen Zeit und dem kleinen Budget bleibt davon das Meiste frei, und nach zwei Wochen wissen wir, was Lernende tun, was die anderen beiden Optionen uns vor dem Geldausgeben nicht sagen können.",
    ),
    why: "The plan asks to make a decision. Either option defends if the reason ties it to the three conditions (time, budget, unclear needs), including A when the learner argues a polished prototype is needed; C needs a stated answer to what is risked.",
    lookFor: ["Names the option and a condition that weighs for it.", "Says what is given up by not choosing the others.", "Does not rest on “it looks finished”."],
  };
}

export function noTestGuide(): MentorGuide {
  return {
    title: "1.2 · The risks without testing",
    answer: R1().noTest ?? "",
    example: tt(
      "If we build before asking anyone, we may spend most of the money on a feature learners never use, and we would see only that fewer people finish, never why. The one that worries me most is that we notice it too late to change course.",
      "Wenn wir bauen, bevor wir jemanden fragen, geben wir vielleicht den größten Teil des Geldes für eine Funktion aus, die Lernende nie nutzen, und wir sähen nur, dass weniger Menschen abschließen, nie warum. Am meisten sorgt mich, dass wir es zu spät merken, um den Kurs zu ändern.",
    ),
    why: "The plan asks what risks arise without testing. Not scored. Typical risks: building the wrong thing, finding out late when change is expensive, rework eating the budget, learners leaving before the reason is known, a competitor moving first.",
    lookFor: ["Names at least one concrete risk of the case.", "Says which one worries the learner most and why."],
  };
}

/* ------------------------------------------------------------------ Block 2.1 */

export function weakGuide(): MentorGuide {
  return {
    title: "2.1 · Analyse the weaknesses of LearnPro",
    answer: R1().weakText ?? "",
    example: tt(
      "1. Learners reach the first quiz and then leave: the course never says how much is left.\n2. After a task nothing tells them whether they got it right.\n3. A beginner and an expert get the same twenty lessons.\n4. The lessons are long blocks of text, so they feel like homework.\nThe main problem is that learners get no sign of progress and no result.",
      "1. Lernende erreichen das erste Quiz und gehen dann: Der Kurs sagt nie, wie viel noch kommt.\n2. Nach einer Aufgabe sagt nichts, ob sie es richtig gemacht haben.\n3. Ein Anfänger und ein Experte bekommen dieselben zwanzig Lektionen.\n4. Die Lektionen sind lange Textblöcke und wirken wie Hausaufgaben.\nDas Hauptproblem ist, dass Lernende kein Zeichen für Fortschritt und kein Ergebnis bekommen.",
    ),
    why: "The plan asks to analyse the weaknesses. The Musterlösung names the main problem as the lack of feedback and of individualisation. A learner who finds other weaknesses and points at something in the case (the drop-out, the missing personalisation, the boring content, the pictures of Platform B) defends the answer.",
    lookFor: ["At least three weaknesses, each tied to something in the case or the pictures.", "A main problem is named, not only a list.", "Symptoms (learners leave) are separated from causes (no feedback)."],
    pitfalls: ["Only restating the three facts of the brief.", "A solution given instead of a weakness (“add a progress bar”)."],
  };
}

export function approachGuide(): MentorGuide {
  return {
    title: "2.1 · The prototype approach, low or high fidelity",
    answer: R1().approachText ?? "",
    example: tt(
      "I would sketch the first three screens on paper and let five learners try to start a course, because the question is whether they can find the way in. Only the screens that work would be drawn in detail afterwards.",
      "Ich würde die ersten drei Bildschirme auf Papier skizzieren und fünf Lernende versuchen lassen, einen Kurs zu starten, weil die Frage ist, ob sie den Einstieg finden. Nur die Bildschirme, die funktionieren, würden danach im Detail gezeichnet.",
    ),
    why: "The plan asks to develop a prototype approach, low or high fidelity. The Musterlösung: low-fidelity tests first, focus on learning paths and interaction, adaptive elements only step by step, because minimising risk comes before maximising technology. A high-fidelity start defends if the learner says why it is needed here.",
    lookFor: ["Names the fidelity and why it fits the situation.", "Says what is tested first (path, interaction).", "Says what comes later, so the approach is a sequence."],
  };
}

export function testsGuide(): MentorGuide {
  return {
    title: "2.1 · Three UX tests",
    answer: join(R1().testText, ["1", "2", "3"]),
    example: tt(
      "1. A task test of the paper start screens: five learners start a course while I watch; I count who gets in and where they stop.\n2. A look at the data: at which lesson do most learners leave; I count the drop-out per lesson.\n3. Short calls with learners who left: what made them stop; I group the reasons.",
      "1. Ein Aufgabentest der Papier-Startbildschirme: Fünf Lernende starten einen Kurs, während ich zusehe; ich zähle, wer hineinkommt und wo sie aufhören.\n2. Ein Blick in die Daten: bei welcher Lektion gehen die meisten; ich zähle den Abbruch pro Lektion.\n3. Kurze Gespräche mit Lernenden, die gegangen sind: was sie zum Aufhören gebracht hat; ich gruppiere die Gründe.",
    ),
    why: "The plan asks to define three UX tests. The Musterlösung gives no fixed set. A good set mixes a test that says why (observation, interview) with one that says how many (data, task completion), and each test says what is measured.",
    lookFor: ["Three different tests, each with what, how and what is measured.", "At least one that shows why and one that shows how many.", "Each fits the approach chosen above."],
    pitfalls: ["Three versions of the same test.", "A test with no measure (“we ask users”)."],
  };
}

export function adaptiveGuide(): MentorGuide {
  return {
    title: "2.1 · Is adaptive learning worthwhile?",
    answer: R1().adaptiveWhy ?? "",
    example: tt(
      "Partly: LearnLoop first fixes its start screen and feedback, then tries one rule, skip a lesson if the pre-test is passed, in one course. A system that learns from clicks waits until there is enough data.",
      "Teilweise: LearnLoop verbessert zuerst Startbildschirm und Feedback und probiert dann eine Regel, eine Lektion überspringen, wenn der Vortest bestanden ist, in einem Kurs. Ein System, das aus Klicks lernt, wartet, bis genug Daten da sind.",
    ),
    why: "The plan asks to decide whether adaptive learning is worthwhile. The Musterlösung introduces adaptive elements only step by step (“partly”). Yes or no defends if the reason names the learner problem, the data and the simplest first step.",
    lookFor: ["A clear yes, partly or no.", "A reason that names the learner problem, the data and a first step.", "If partly: what is done now and what waits."],
  };
}

/* ------------------------------------------------------------------ Block 3.1 */

export function r2AdaptiveGuide(): MentorGuide {
  return {
    title: "3.1 · Do we invest in adaptive learning? (decision and why)",
    answer: R2().adaptiveWhy ?? "",
    example: tt(
      "Partly: LearnLoop funds the guided start and a rule-based pilot in one course now. The recommendation engine waits until the pilot shows a result and the data and legal checks are in place.",
      "Teilweise: LearnLoop finanziert jetzt den geführten Start und einen regelbasierten Pilot in einem Kurs. Die Empfehlungs-Engine wartet, bis der Pilot ein Ergebnis zeigt und die Daten- und Rechtsprüfungen stehen.",
    ),
    why: "The plan's decision: yes, no or partly. The model says partly, step by step. A yes or a no defends if the reason names competitors, the outdated platform, the limited budget and the incomplete data, and says what is given up.",
    lookFor: ["A clear yes, partly or no.", "A reason that weighs technology against user value.", "If partly: what is funded now and what waits."],
  };
}

export function prototypingGuide(): MentorGuide {
  return {
    title: "3.1 · Prototyping strategy: how do we test new features?",
    answer: R2().prototyping ?? "",
    example: tt(
      "At LearnLoop every new feature starts as a sketch that five learners try. Only a feature that passes is built, and the next round tests the real version with a small group.",
      "Bei LearnLoop beginnt jede neue Funktion als Skizze, die fünf Lernende ausprobieren. Nur eine Funktion, die besteht, wird gebaut, und die nächste Runde testet die echte Version mit einer kleinen Gruppe.",
    ),
    why: "The plan asks how new features are tested. The model works from low-fidelity to higher fidelity, with a first question and a gate before building. Any strategy defends if it says what is tested first and when something is built.",
    lookFor: ["Names the fidelity it starts with and the first question.", "Says what has to be true before something is built."],
  };
}

export function testingGuide(): MentorGuide {
  return {
    title: "3.1 · UX testing strategy: which data do we need?",
    answer: R2().testing ?? "",
    example: tt(
      "LearnLoop needs to know at which lesson learners leave, how long a lesson takes, and why they stop. It has the first from its data, and gets the second and third from small tests and short interviews.",
      "LearnLoop muss wissen, bei welcher Lektion Lernende gehen, wie lange eine Lektion dauert und warum sie aufhören. Das Erste hat es aus seinen Daten, das Zweite und Dritte holt es sich aus kleinen Tests und kurzen Interviews.",
    ),
    why: "The plan asks which data is needed. The model separates data that says how many (drop-out, time, completion) from data that says why (tests, interviews) and says what is missing today.",
    lookFor: ["Names the data, not only “user data”.", "Separates what exists from what must be collected.", "Says how the missing data is collected."],
  };
}

export function roadmapGuide(): MentorGuide {
  return {
    title: "3.1 · Prioritised innovation roadmap",
    answer: R2().roadmap ?? "",
    example: tt(
      "1. A clearer start and feedback for every learner.\n2. A simple view of where learners leave.\n3. A small rule-based pilot in one course.\nLater: anything that needs a lot of data, once the pilot shows a result.",
      "1. Ein klarerer Start und Feedback für jede Lernende.\n2. Eine einfache Sicht darauf, wo Lernende gehen.\n3. Ein kleiner regelbasierter Pilot in einem Kurs.\nSpäter: alles, was viele Daten braucht, sobald der Pilot ein Ergebnis zeigt.",
    ),
    why: "The plan asks for a prioritised innovation roadmap. The model puts what helps every learner and costs little first, the measurement next, the pilot last, and leaves the heavy technology for later. A different order defends if the learner says why that item comes first.",
    lookFor: ["Items in a clear order, one per line, the first priority first.", "A reason for the first item (in the roadmap or in the other fields).", "What is postponed is named."],
  };
}

export function riskTextGuide(): MentorGuide {
  return {
    title: "3.1 · Risk analysis: technology against user value",
    answer: R2().riskText ?? "",
    example: tt(
      "LearnLoop's risk is paying for a clever system that learners do not ask for. It starts with what learners already complain about and puts a stop sign on the clever part: no result after eight weeks, no more money.",
      "LearnLoops Risiko ist, für ein cleveres System zu zahlen, nach dem Lernende nicht fragen. Es beginnt mit dem, worüber Lernende sich schon beschweren, und stellt ein Stoppschild vor den cleveren Teil: kein Ergebnis nach acht Wochen, kein weiteres Geld.",
    ),
    why: "The plan asks for a risk analysis that weighs technology against user value. The model names the risk of technology without user value and what the plan does about it.",
    lookFor: ["Names a risk of technology and a risk to the user.", "Says what the plan does about the biggest one."],
  };
}

export function uncertainGuide(): MentorGuide {
  return {
    title: "3.1 · One decision under uncertainty",
    answer: R2().uncertain ?? "",
    example: tt(
      "LearnLoop decides to test a pre-test that lets learners skip lessons in one course. It does not know whether learners will accept skipping. If completion is not clearly higher after eight weeks, it drops the idea.",
      "LearnLoop entscheidet, in einem Kurs einen Vortest zu erproben, mit dem Lernende Lektionen überspringen. Es weiß nicht, ob Lernende das Überspringen annehmen. Wenn die Completion nach acht Wochen nicht deutlich höher ist, lässt es die Idee fallen.",
    ),
    why: "The plan asks to take one decision deliberately under uncertainty. A good answer says what is decided, what is not known, and what would make the decision be reversed.",
    lookFor: ["One concrete decision.", "What is unknown is named.", "A sign and a time at which it would be reversed."],
  };
}
