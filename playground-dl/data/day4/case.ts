import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 4 · the case and the Route 1 instruments. MotivaLearn is a learning platform with low user retention (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): learners start courses but drop out; the content is perceived as "boring"; no visible progress;
 * Platform A has a progress bar, small successes visible and short tasks; Platform B has long content, no feedback and unclear goals; a limited
 * budget; two months. Everything else (the screens, the €40,000, the costs and weeks of the measures) is a Case assumption, labelled so on
 * screen. The plan's Musterlösung: main problem lack of perceived progress and activation; measures progress tracking, interactive elements,
 * clear learning objectives and feedback mechanisms; rationale: perceived progress is the strongest motivator.
 */

export const BUDGET = 40000;
export const WEEKS_LIMIT = 8;
export const PICK_MEASURES = 4;
export const PICK_CAUSES = 3;

/** Effort follows the printed cost (a rule taught in Materi A5): under €10,000 Low, €10,000 to €20,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 9999;
export const EFFORT_MID_MAX = 20000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);
export const EFFORT_RULE = () => ({ en: "under €10,000, up to €20,000, above", de: "unter 10.000 €, bis 20.000 €, darüber" });

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

/* ------------------------------------------------------------------ Block 1.2 (Optional) · three engagement options */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
type OptDef = { id: OptId; name: Tx; cost: number; weeks: number };
const OPTS_DEF: OptDef[] = [
  { id: "A", cost: 18000, weeks: 5, name: t("Gamification: badges and points", "Gamification: Badges und Punkte") },
  { id: "B", cost: 7000, weeks: 3, name: t("Visualise learning progress", "Lernfortschritt sichtbar machen") },
  { id: "C", cost: 24000, weeks: 7, name: t("Make content more interactive", "Inhalte interaktiver machen") },
];
export const OPTS = bi(OPTS_DEF);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
export const MODEL_OPT_IMPACT: Record<string, 1 | 2 | 3> = { A: 1, B: 3, C: 3 };
export const MODEL_OPT_RISK: Record<string, 1 | 2 | 3> = { A: 3, B: 1, C: 2 };
export const MODEL_OPT_ORDER: OptId[] = ["B", "C", "A"];

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("Which measure really changes behaviour?", "Welche Maßnahme verändert wirklich das Verhalten?") },
  { k: "b" as ReflectKey, q: t("What is sustainable motivation?", "Was ist nachhaltige Motivation?") },
  { k: "c" as ReflectKey, q: t("Where is there a risk of manipulation?", "Wo besteht ein Risiko der Manipulation?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · three main causes of the motivation problem */

export type CauseId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
export const CAUSE_IDS: CauseId[] = ["c1", "c2", "c3", "c4", "c5", "c6"];
type CauseDef = { id: CauseId; text: Tx; expected: boolean; why: Tx };
const CAUSES_DEF: CauseDef[] = [
  { id: "c1", expected: true, text: t("Learners cannot see their progress.", "Lernende können ihren Fortschritt nicht sehen."), why: t("The case names it (“no visible progress”), and facts 1 and 8 show the difference between the platforms.", "Der Fall nennt es („kein sichtbarer Fortschritt“), und die Fakten 1 und 8 zeigen den Unterschied zwischen den Plattformen.") },
  { id: "c2", expected: true, text: t("The content is passive: reading without doing.", "Der Inhalt ist passiv: lesen, ohne etwas zu tun."), why: t("The case says the content is perceived as “boring”, and facts 3 and 5 show that one platform has tasks and the other only reading.", "Der Fall sagt, der Inhalt werde als „langweilig“ empfunden, und die Fakten 3 und 5 zeigen, dass die eine Plattform Aufgaben hat und die andere nur Lesetext.") },
  { id: "c3", expected: true, text: t("Goals and results are unclear: no stated goal, no feedback.", "Ziele und Ergebnisse sind unklar: kein genanntes Ziel, kein Feedback."), why: t("Platform B has long content, no feedback and unclear goals (the plan), and facts 2, 4, 6 and 7 show it.", "Plattform B hat langen Inhalt, kein Feedback und unklare Ziele (der Plan), und die Fakten 2, 4, 6 und 7 zeigen es.") },
  { id: "c4", expected: false, text: t("The platform gives too few rewards, such as badges.", "Die Plattform gibt zu wenige Belohnungen, etwa Badges."), why: t("No printed fact says so. Platform A motivates without any reward (Materi A1: motivation is not the same as gamification).", "Kein gedruckter Fakt sagt das. Plattform A motiviert ohne jede Belohnung (Materi A1: Motivation ist nicht dasselbe wie Gamification).") },
  { id: "c5", expected: false, text: t("The subscription price is too high.", "Der Abo-Preis ist zu hoch."), why: t("Nothing in the case mentions the price.", "Nichts im Fall erwähnt den Preis.") },
  { id: "c6", expected: false, text: t("The course catalogue is too small.", "Der Kurskatalog ist zu klein."), why: t("Learners start courses; the problem is that they drop out, not that there is too little to start.", "Lernende beginnen Kurse; das Problem ist, dass sie abbrechen, nicht dass es zu wenig zu beginnen gibt.") },
];
export const CAUSES = bi(CAUSES_DEF);
export const CAUSE_MODEL: CauseId[] = ["c1", "c2", "c3"];

/* ------------------------------------------------------------------ Block 2.2 (Core) · nine measures, choose four */

export type MeasureId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9";
export const MEASURE_IDS: MeasureId[] = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
export type MeasureArea = PrincipleId | "reward" | "comparison" | "pressure" | "look";
type MeasureDef = { id: MeasureId; no: string; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: MeasureArea };
const MEASURES_DEF: MeasureDef[] = [
  { id: "m1", no: "M1", cost: 8000, weeks: 3, area: "progress", name: t("Progress tracking", "Fortschrittsverfolgung"),
    what: t("A progress bar and “x of y done” on every course page.", "Ein Fortschrittsbalken und „x von y geschafft“ auf jeder Kursseite."),
    notice: t("The learner sees how far they have come.", "Die Lernende sieht, wie weit sie gekommen ist.") },
  { id: "m2", no: "M2", cost: 18000, weeks: 6, area: "activation", name: t("Interactive elements", "Interaktive Elemente"),
    what: t("Replace long reading with short tasks of about three minutes.", "Langes Lesen durch kurze Aufgaben von etwa drei Minuten ersetzen."),
    notice: t("The learner does something in every unit.", "Die Lernende tut in jeder Einheit etwas.") },
  { id: "m3", no: "M3", cost: 6000, weeks: 2, area: "goals", name: t("Clear learning objectives", "Klare Lernziele"),
    what: t("Start each unit with “After this unit you can…”.", "Jede Einheit mit „Nach dieser Einheit können Sie …“ beginnen."),
    notice: t("The learner knows what the unit is for.", "Die Lernende weiß, wofür die Einheit da ist.") },
  { id: "m4", no: "M4", cost: 12000, weeks: 4, area: "feedback", name: t("Feedback after every task", "Feedback nach jeder Aufgabe"),
    what: t("A result and a next step after each task and quiz.", "Ein Ergebnis und ein nächster Schritt nach jeder Aufgabe und jedem Quiz."),
    notice: t("The learner knows how they did and what to do next.", "Die Lernende weiß, wie sie es gemacht hat und was als Nächstes zu tun ist.") },
  { id: "m5", no: "M5", cost: 16000, weeks: 4, area: "reward", name: t("Points and badges", "Punkte und Badges"),
    what: t("Points and a badge for every lesson opened.", "Punkte und ein Badge für jede geöffnete Lektion."),
    notice: t("A point total goes up.", "Eine Punktzahl steigt.") },
  { id: "m6", no: "M6", cost: 14000, weeks: 4, area: "comparison", name: t("A public leaderboard", "Eine öffentliche Rangliste"),
    what: t("A ranking of learners by points.", "Eine Rangliste der Lernenden nach Punkten."),
    notice: t("The learner sees where they stand against others.", "Die Lernende sieht, wo sie im Vergleich zu anderen steht.") },
  { id: "m7", no: "M7", cost: 9000, weeks: 3, area: "pressure", name: t("Streaks with loss messages", "Serien mit Verlustmeldungen"),
    what: t("A daily streak and messages such as “You will lose your streak”.", "Eine Tagesserie und Meldungen wie „Sie verlieren Ihre Serie“."),
    notice: t("The learner is warned about breaking the chain.", "Die Lernende wird davor gewarnt, die Kette zu unterbrechen.") },
  { id: "m8", no: "M8", cost: 22000, weeks: 5, area: "reward", name: t("Discount coupons for finishing", "Rabattgutscheine fürs Abschließen"),
    what: t("A coupon for another course when a course is finished.", "Ein Gutschein für einen weiteren Kurs, wenn ein Kurs abgeschlossen ist."),
    notice: t("A discount after completion.", "Ein Rabatt nach dem Abschluss.") },
  { id: "m9", no: "M9", cost: 15000, weeks: 4, area: "look", name: t("New course images and look", "Neue Kursbilder und neues Aussehen"),
    what: t("New pictures and colours for the course catalogue.", "Neue Bilder und Farben für den Kurskatalog."),
    notice: t("The catalogue looks different.", "Der Katalog sieht anders aus.") },
];
export const MEASURES = bi(MEASURES_DEF);
export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, (typeof MEASURES)[number]>;
export const MEASURE_AREA = bi({
  progress: t("Acts on: Progress", "Wirkt auf: Fortschritt"),
  activation: t("Acts on: Activation", "Wirkt auf: Aktivierung"),
  goals: t("Acts on: Goals", "Wirkt auf: Ziele"),
  feedback: t("Acts on: Feedback", "Wirkt auf: Feedback"),
  reward: t("Adds a reward", "Fügt eine Belohnung hinzu"),
  comparison: t("Adds comparison", "Fügt Vergleich hinzu"),
  pressure: t("Adds pressure", "Fügt Druck hinzu"),
  look: t("The look, not the motivation", "Das Aussehen, nicht die Motivation"),
});

export const totalCost = (ids: string[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id as MeasureId].cost, 0);
export const longestWeeks = (ids: string[]) => ids.reduce((m, id) => Math.max(m, MEASURE_BY_ID[id as MeasureId].weeks), 0);

/**
 * The reference set is the plan's own Musterlösung: progress tracking, interactive elements, clear learning objectives, feedback mechanisms. Together they
 * cost €44,000, which is €4,000 over the €40,000 the case assumes, so the reference reasons say where the money goes and what would be phased. A learner
 * who stays inside the budget with another set exports with a reason too (CLAUDE.md #38).
 */
export const MODEL_MEASURES: MeasureId[] = ["m1", "m2", "m3", "m4"];
export const MODEL_IMPACT: Record<string, 1 | 2 | 3> = { m1: 3, m2: 3, m3: 2, m4: 3 };
export const MODEL_RISK: Record<string, 1 | 2 | 3> = { m1: 1, m2: 2, m3: 1, m4: 1 };
