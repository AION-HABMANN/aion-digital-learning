import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 4 · the case and the Route 1 instruments. MotivaLearn is a learning platform with low user retention (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): learners start courses but drop out; the content is perceived as "boring"; no visible progress;
 * Platform A has a progress bar, small successes visible and short tasks; Platform B has long content, no feedback and unclear goals; a limited
 * budget; two months. The plan prints no price, so the site prints none (DL-STANDARD section 6). Everything else (the screens) is a Case assumption, labelled so on
 * screen. The plan's Musterlösung: main problem lack of perceived progress and activation; measures progress tracking, interactive elements,
 * clear learning objectives and feedback mechanisms; rationale: perceived progress is the strongest motivator.
 */

/* ------------------------------------------------------------------ Block 1.1 · eight facts about two platforms */

export type PrincipleId = "progress" | "activation" | "goals" | "feedback";
export const PRINCIPLE_IDS: PrincipleId[] = ["progress", "activation", "goals", "feedback"];

/** The four principles the two platforms differ on, with the test question taught in Materi A2 and A3 for each. */
export const PRINCIPLES = bi({
  progress: { id: "progress" as PrincipleId, label: t("Visible progress", "Sichtbarer Fortschritt"), hint: t("How far have I come?", "Wie weit bin ich gekommen?"), test: t("Does the screen show how far the learner has come, and where the end is?", "Zeigt der Bildschirm, wie weit die Lernende gekommen ist und wo das Ende liegt?") },
  activation: { id: "activation" as PrincipleId, label: t("Activation", "Aktivierung"), hint: t("Do I do something?", "Tue ich etwas?"), test: t("Does the learner do something related to the goal, or only read?", "Tut die Lernende etwas, das zum Ziel gehört, oder liest sie nur?") },
  goals: { id: "goals" as PrincipleId, label: t("Clear goals", "Klare Ziele"), hint: t("What will I be able to do?", "Was werde ich können?"), test: t("Does the screen say what the learner will be able to do afterwards?", "Sagt der Bildschirm, was die Lernende danach können wird?") },
  feedback: { id: "feedback" as PrincipleId, label: t("Feedback", "Feedback"), hint: t("How did I do, and what next?", "Wie habe ich es gemacht, und was kommt als Nächstes?"), test: t("After an action, does the learner see a result and a next step?", "Sieht die Lernende nach einer Handlung ein Ergebnis und einen nächsten Schritt?") },
});
export const PRINCIPLE_LABEL = (id: PrincipleId) => PRINCIPLES[id].label;

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];
export type PlatformId = "A" | "B";
export const PLATFORM_IDS: PlatformId[] = ["A", "B"];

type FactDef = { id: FactId; no: number; platform: PlatformId; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; area: PrincipleId };

const FACTS_DEF: FactDef[] = [
  { id: "f1", no: 1, platform: "A", where: t("A · Course page", "A · Kursseite"), area: "progress",
    text: t("A progress bar shows “40% done”.", "Ein Fortschrittsbalken zeigt „40 % geschafft“."),
    short: t("A: progress bar “40% done”", "A: Fortschrittsbalken „40 % geschafft“"),
    key: t("“40% done”", "„40 % geschafft“"),
    clue: t("If a learner opens this page after a week, what do they know about how far they have come?", "Wenn eine Lernende diese Seite nach einer Woche öffnet: Was weiß sie darüber, wie weit sie gekommen ist?"),
    why: t("The learner can see how far they have come: visible progress.", "Die Lernende sieht, wie weit sie gekommen ist: sichtbarer Fortschritt.") },
  { id: "f2", no: 2, platform: "A", where: t("A · A task", "A · Eine Aufgabe"), area: "feedback",
    text: t("After a task the screen shows “Correct.” and “Next: task 4”.", "Nach einer Aufgabe zeigt der Bildschirm „Richtig.“ und „Weiter: Aufgabe 4“."),
    short: t("A: “Correct.” and “Next: task 4”", "A: „Richtig.“ und „Weiter: Aufgabe 4“"),
    key: t("“Correct.” and “Next: task 4”", "„Richtig.“ und „Weiter: Aufgabe 4“"),
    clue: t("The learner has just finished a task. What does the screen tell them about the result, and about what to do now?", "Die Lernende hat eine Aufgabe beendet. Was sagt ihr der Bildschirm über das Ergebnis und darüber, was sie jetzt tun soll?"),
    why: t("A result and a next step after an action: feedback.", "Ein Ergebnis und ein nächster Schritt nach einer Handlung: Feedback.") },
  { id: "f3", no: 3, platform: "A", where: t("A · A task", "A · Eine Aufgabe"), area: "activation",
    text: t("A task takes about three minutes, and the learner types, clicks or chooses something in it.", "Eine Aufgabe dauert etwa drei Minuten, und die Lernende tippt, klickt oder wählt darin etwas."),
    short: t("A: a three-minute task the learner does", "A: eine Dreiminutenaufgabe, die die Lernende macht"),
    key: t("types, clicks or chooses something", "tippt, klickt oder wählt"),
    clue: t("What does the learner do with their hands or their head on this screen, besides reading?", "Was tut die Lernende auf diesem Bildschirm mit den Händen oder dem Kopf, außer zu lesen?"),
    why: t("The learner does something related to the goal: activation.", "Die Lernende tut etwas, das zum Ziel gehört: Aktivierung.") },
  { id: "f4", no: 4, platform: "A", where: t("A · Course page", "A · Kursseite"), area: "goals",
    text: t("Each unit begins with “After this unit you can: write a counter-offer”.", "Jede Einheit beginnt mit „Nach dieser Einheit können Sie: ein Gegenangebot schreiben“."),
    short: t("A: “After this unit you can…”", "A: „Nach dieser Einheit können Sie …“"),
    key: t("“After this unit you can: write a counter-offer”", "„Nach dieser Einheit können Sie: ein Gegenangebot schreiben“"),
    clue: t("Before a learner starts a unit, what do they know about what it is for?", "Bevor eine Lernende eine Einheit beginnt: Was weiß sie darüber, wofür sie da ist?"),
    why: t("The unit says what the learner will be able to do: a clear goal.", "Die Einheit sagt, was die Lernende danach können wird: ein klares Ziel.") },
  { id: "f5", no: 5, platform: "B", where: t("B · A lesson", "B · Eine Lektion"), area: "activation",
    text: t("A lesson is one long page of reading with no task.", "Eine Lektion ist eine lange Lesetextseite ohne Aufgabe."),
    short: t("B: one long page of reading, no task", "B: eine lange Lesetextseite, keine Aufgabe"),
    key: t("one long page of reading with no task", "eine lange Lesetextseite ohne Aufgabe"),
    clue: t("What is the learner asked to do on this page, other than keep reading?", "Was soll die Lernende auf dieser Seite tun, außer weiterzulesen?"),
    why: t("The learner only reads and never does anything: activation is missing.", "Die Lernende liest nur und tut nie etwas: Aktivierung fehlt.") },
  { id: "f6", no: 6, platform: "B", where: t("B · A lesson", "B · Eine Lektion"), area: "feedback",
    text: t("After the last page the screen only moves on: there is no tick and no message.", "Nach der letzten Seite geht der Bildschirm nur weiter: Es gibt kein Häkchen und keine Meldung."),
    short: t("B: no tick, no message after the last page", "B: kein Häkchen, keine Meldung nach der letzten Seite"),
    key: t("no tick and no message", "kein Häkchen und keine Meldung"),
    clue: t("The learner finishes a lesson. What tells them it counted, or what to do next?", "Die Lernende beendet eine Lektion. Was sagt ihr, dass es zählte oder was als Nächstes zu tun ist?"),
    why: t("Nothing answers the learner's action with a result or a next step: feedback is missing.", "Nichts beantwortet die Handlung der Lernenden mit einem Ergebnis oder einem nächsten Schritt: Feedback fehlt.") },
  { id: "f7", no: 7, platform: "B", where: t("B · Course page", "B · Kursseite"), area: "goals",
    text: t("The course page does not say what the learner will be able to do after the course.", "Die Kursseite sagt nicht, was die Lernende nach dem Kurs können wird."),
    short: t("B: no statement of what you will be able to do", "B: keine Aussage, was Sie können werden"),
    key: t("does not say what the learner will be able to do", "was die Lernende nach dem Kurs können wird"),
    clue: t("Why would a learner start this course, if the page does not say what it leads to?", "Warum sollte eine Lernende diesen Kurs beginnen, wenn die Seite nicht sagt, wohin er führt?"),
    why: t("The learner cannot tell what the course is for: a clear goal is missing.", "Die Lernende kann nicht erkennen, wofür der Kurs da ist: ein klares Ziel fehlt.") },
  { id: "f8", no: 8, platform: "B", where: t("B · Course page", "B · Kursseite"), area: "progress",
    text: t("The course page shows no progress and no end point.", "Die Kursseite zeigt keinen Fortschritt und keinen Endpunkt."),
    short: t("B: no progress, no end point", "B: kein Fortschritt, kein Endpunkt"),
    key: t("shows no progress and no end point", "zeigt keinen Fortschritt und keinen Endpunkt"),
    clue: t("A learner is halfway through. How could they tell, and how far is the end?", "Eine Lernende ist halb durch. Woran könnte sie das erkennen, und wie weit ist das Ende?"),
    why: t("The learner cannot see how far they have come or how far it is to the end: visible progress is missing.", "Die Lernende kann nicht sehen, wie weit sie gekommen ist und wie weit es bis zum Ende ist: sichtbarer Fortschritt fehlt.") },
];
export const FACTS = bi(FACTS_DEF);
export const FACT_BY_ID = Object.fromEntries(FACTS.map((f) => [f.id, f])) as Record<FactId, (typeof FACTS)[number]>;
export const FACT_AREA: Record<FactId, PrincipleId> = Object.fromEntries(FACTS_DEF.map((f) => [f.id, f.area])) as Record<FactId, PrincipleId>;
export const TRUTH_SORT = FACT_AREA;
/** The platform the reference answer prefers: A has all four principles on screen, B none. */
export const MODEL_PLATFORM: PlatformId = "A";
