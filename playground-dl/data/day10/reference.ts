import type { ReferenceSpec } from "@/components/sim/ReferencePlatform";
import { t, tt } from "@/lib/lang";

/**
 * Day 10 · the reference platform of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): Khan Academy, chosen after comparing Khan Academy, freeCodeCamp, Duolingo, Udemy,
 * Coursera and openHPI on 28.10.2026 (only Khan Academy shows progress, feedback and the phone view without an account). Every row was observed on khanacademy.org on
 * 28.10.2026: the course page "Algebra 1", its first-visit tour, the practice "Evaluating expressions with one variable" answered wrong and then right, the same page at
 * 375 px, and the accessibility statement. Labels of the real site are quoted in its own language (English). One source of text for the window and the facilitator cards.
 */
type P = [string, string];
type Row = { topic: P; problem: P; did: P; where: P; url: string; shot?: string };

const VISIT = "28.10.2026";
const COURSE = "https://www.khanacademy.org/math/algebra";
const PRACTICE = "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:intro-variables/e/evaluating_expressions_1";
const A11Y = "https://www.khanacademy.org/about/accessibility-statement";
const SHOT = {
  course: "/real/khan-course-progress-2026-10-28.jpg",
  wrong: "/real/khan-feedback-wrong-2026-10-28.jpg",
  right: "/real/khan-feedback-right-2026-10-28.jpg",
  mobile: "/real/khan-mobile-exercise-2026-10-28.jpg",
};
const WHERE_COURSE: P = ["Course page “Algebra 1”", "Kursseite „Algebra 1“"];
const WHERE_PRACTICE: P = ["Practice “Evaluating expressions with one variable”", "Übung „Evaluating expressions with one variable“"];

const INTRO_21: P = [
  "TrackLearn's learners do not know how far along they are, a finished task gets no response, mobile use is high but the UX is poor, and motivation is low. Khan Academy is a free learning platform whose public course and practice pages show one way to handle each of these. Open it, try a practice problem, and compare.",
  "Die Lernenden von TrackLearn wissen nicht, wie weit sie sind, eine erledigte Aufgabe bekommt keine Reaktion, die mobile Nutzung ist hoch, die UX aber schlecht, und die Motivation ist niedrig. Khan Academy ist eine kostenlose Lernplattform, deren öffentliche Kurs- und Übungsseiten für jeden dieser Punkte einen Weg zeigen. Öffnen Sie sie, probieren Sie eine Übungsaufgabe und vergleichen Sie.",
];
const INTRO_31: P = [
  "Your task is a strategy: a feedback concept, a progress tracking strategy, a responsive design concept, how accessibility is integrated, prioritised measures, a risk analysis and a decision. Khan Academy shows a working version of several of these parts that you can open and test, as one example to compare your plan with, not as the answer.",
  "Ihre Aufgabe ist eine Strategie: ein Feedbackkonzept, eine Strategie für die Fortschrittsanzeige, ein Responsive-Design-Konzept, wie Barrierefreiheit eingebunden wird, priorisierte Maßnahmen, eine Risikoanalyse und eine Entscheidung. Khan Academy zeigt für mehrere dieser Teile eine funktionierende Version, die Sie öffnen und testen können, als ein Beispiel zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
];

const ROWS_21: Row[] = [
  {
    topic: ["Materi A2 · progress tracking", "Materi A2 · Fortschrittsanzeige"],
    problem: ["Learners do not know how far along they are", "Lernende wissen nicht, wie weit sie sind"],
    did: [
      "On the course page every skill is a small square that shows its level. A legend above names the levels: “Mastered”, “Proficient”, “Familiar”, “Attempted”, “Not started”, plus “Quiz” and “Unit test”. The header says “Algebra 1 · 17 units · 182 skills”.",
      "Auf der Kursseite ist jeder Skill ein kleines Quadrat, das seine Stufe zeigt. Eine Legende darüber nennt die Stufen: „Mastered“, „Proficient“, „Familiar“, „Attempted“, „Not started“, dazu „Quiz“ und „Unit test“. Der Kopf sagt „Algebra 1 · 17 units · 182 skills“.",
    ],
    where: WHERE_COURSE,
    url: COURSE,
    shot: SHOT.course,
  },
  {
    topic: ["Materi A1 · visual feedback", "Materi A1 · visuelles Feedback"],
    problem: ["A finished task gets no response", "Eine erledigte Aufgabe bekommt keine Reaktion"],
    did: [
      "After “Check”, a wrong answer gets “Not quite! Give it another try!” with “Show a step” and “Hints”; a right one gets “You got it! You got it; keep up the great persistence.” and a link “See a step-by-step solution.” The first of four circles under “Do 4 problems” fills.",
      "Nach „Check“ bekommt eine falsche Antwort „Not quite! Give it another try!“ mit „Show a step“ und „Hints“; eine richtige bekommt „You got it! You got it; keep up the great persistence.“ und einen Link „See a step-by-step solution.“ Der erste von vier Kreisen unter „Do 4 problems“ füllt sich.",
    ],
    where: WHERE_PRACTICE,
    url: PRACTICE,
    shot: SHOT.wrong,
  },
  {
    topic: ["Materi A2 · status", "Materi A2 · Status"],
    problem: ["The learning status is unclear", "Der Lernstatus ist unklar"],
    did: [
      "The course grid marks one square with “Up next for you!”. In the lesson list of a practice page each item carries its state (“Not started”), and the top of the list says where you are: “Course: Algebra 1 › Unit 1 · Lesson 2: Introduction to variables”.",
      "Das Kursraster markiert ein Quadrat mit „Up next for you!“. In der Lektionsliste einer Übungsseite trägt jeder Eintrag seinen Stand („Not started“), und oben in der Liste steht, wo Sie sind: „Course: Algebra 1 › Unit 1 · Lesson 2: Introduction to variables“.",
    ],
    where: [`${WHERE_COURSE[0]} and the practice page`, `${WHERE_COURSE[1]} und die Übungsseite`],
    url: PRACTICE,
    shot: SHOT.right,
  },
  {
    topic: ["Materi A3 · responsive design", "Materi A3 · Responsive Design"],
    problem: ["Mobile use is high, but the UX is poor", "Die mobile Nutzung ist hoch, die UX aber schlecht"],
    did: [
      "At phone width (375 px) the lesson list is hidden, the progress strip shrinks to the streak and the level, and a bottom bar keeps a wide “Check” button and the problem circles within reach of the thumb.",
      "In Handybreite (375 px) ist die Lektionsliste ausgeblendet, der Fortschrittsstreifen schrumpft auf den Streak und die Stufe, und eine untere Leiste hält einen breiten „Check“-Button und die Aufgabenkreise in Reichweite des Daumens.",
    ],
    where: ["The same practice page on a phone", "Dieselbe Übungsseite auf einem Handy"],
    url: PRACTICE,
    shot: SHOT.mobile,
  },
  {
    topic: ["Materi A1, A2 · motivation", "Materi A1, A2 · Motivation"],
    problem: ["Motivation is low", "Die Motivation ist niedrig"],
    did: [
      "A strip says “Start leveling up and building your weekly streak!”. The first-visit tour explains it: “Maintain your streak by achieving Proficient or higher in at least one skill each week”. Without an account, a notice says to log in “to save your future progress”.",
      "Ein Streifen sagt „Start leveling up and building your weekly streak!“. Die Tour beim ersten Besuch erklärt es: „Maintain your streak by achieving Proficient or higher in at least one skill each week“. Ohne Konto sagt ein Hinweis, man solle sich anmelden, „to save your future progress“.",
    ],
    where: [`${WHERE_COURSE[0]}, first-visit tour`, `${WHERE_COURSE[1]}, Tour beim ersten Besuch`],
    url: COURSE,
    shot: SHOT.course,
  },
];

const ROWS_31: Row[] = [
  {
    topic: ["Materi B1, A1", "Materi B1, A1"],
    problem: ["A concept for feedback systems", "Ein Konzept für Feedbacksysteme"],
    did: [
      "Direct feedback at the moment of “Check” (“Not quite!” or “You got it!”), help only when asked for (“Show a step”, “Hints”, a step-by-step solution), and indirect feedback through the four problem circles. Between two checks the page stays quiet.",
      "Direktes Feedback im Moment von „Check“ („Not quite!“ oder „You got it!“), Hilfe nur auf Wunsch („Show a step“, „Hints“, eine Lösung Schritt für Schritt) und indirektes Feedback über die vier Aufgabenkreise. Zwischen zwei Prüfungen bleibt die Seite ruhig.",
    ],
    where: WHERE_PRACTICE,
    url: PRACTICE,
    shot: SHOT.right,
  },
  {
    topic: ["Materi B1, A2", "Materi B1, A2"],
    problem: ["A strategy for progress tracking", "Eine Strategie für die Fortschrittsanzeige"],
    did: [
      "Progress on three levels: in one practice (“Do 4 problems”, four circles), in the course (a level for every skill and “Up next for you!”), and across the site (a level bar “Level 1 · 0 / 1 skill” and a “week streak”).",
      "Fortschritt auf drei Ebenen: in einer Übung („Do 4 problems“, vier Kreise), im Kurs (eine Stufe für jeden Skill und „Up next for you!“) und auf der ganzen Website (ein Stufenbalken „Level 1 · 0 / 1 skill“ und ein „week streak“).",
    ],
    where: [`${WHERE_COURSE[0]} and the practice page`, `${WHERE_COURSE[1]} und die Übungsseite`],
    url: COURSE,
    shot: SHOT.course,
  },
  {
    topic: ["Materi A3", "Materi A3"],
    problem: ["A responsive design concept", "Ein Responsive-Design-Konzept"],
    did: [
      "The same practice works at desktop and at phone width; on the phone the side list is hidden and the main action moves to a fixed bottom bar.",
      "Dieselbe Übung funktioniert in Desktop- und in Handybreite; auf dem Handy ist die Seitenliste ausgeblendet, und die Hauptaktion wandert in eine feste untere Leiste.",
    ],
    where: ["The practice page at 375 px", "Die Übungsseite bei 375 px"],
    url: PRACTICE,
    shot: SHOT.mobile,
  },
  {
    topic: ["Materi A4", "Materi A4"],
    problem: ["How accessibility is integrated", "Wie Barrierefreiheit eingebunden wird"],
    did: [
      "The footer links an “Accessibility Statement” (“Last Updated: August 26, 2026”): WCAG 2.1 Level AA as the baseline, work with an external partner, and a feedback channel for barriers (a form and an e-mail address).",
      "Der Footer verlinkt ein „Accessibility Statement“ („Last Updated: August 26, 2026“): WCAG 2.1 Level AA als Grundlage, Arbeit mit einem externen Partner und ein Feedbackkanal für Barrieren (ein Formular und eine E-Mail-Adresse).",
    ],
    where: ["Accessibility statement", "Accessibility Statement"],
    url: A11Y,
  },
  {
    topic: ["Materi B2 · conflicting goals", "Materi B2 · Zielkonflikte"],
    problem: ["A risk analysis", "Eine Risikoanalyse"],
    did: [
      "Visible on the pages, each a trade-off to weigh, not a verdict: a right answer plays a short confetti animation on the button; the course page shows a square for every one of 182 skills; without an account the progress is kept only for the visit (“Log in or Sign up to save your future progress”).",
      "Auf den Seiten sichtbar, jeweils ein Abwägen, kein Urteil: Eine richtige Antwort spielt eine kurze Konfetti-Animation auf dem Button ab; die Kursseite zeigt ein Quadrat für jeden der 182 Skills; ohne Konto bleibt der Fortschritt nur für den Besuch erhalten („Log in or Sign up to save your future progress“).",
    ],
    where: [`${WHERE_PRACTICE[0]}, course page`, `${WHERE_PRACTICE[1]}, Kursseite`],
    url: PRACTICE,
    shot: SHOT.right,
  },
];

const DISCUSS_21: P[] = [
  ["Which of TrackLearn's problems does Khan Academy answer, and with what exactly?", "Welche Probleme von TrackLearn beantwortet Khan Academy, und womit genau?"],
  ["Khan Academy shows a level for 182 skills at once. For TrackLearn's learners, is that clarity or too much? (Materi A2: the risks of progress displays)", "Khan Academy zeigt eine Stufe für 182 Skills auf einmal. Ist das für die Lernenden von TrackLearn Klarheit oder zu viel? (Materi A2: die Risiken von Fortschrittsanzeigen)"],
  ["Which of these would TrackLearn have to change first, and what would it cost the learner if it waited?", "Was davon müsste TrackLearn zuerst ändern, und was kostet es die Lernende, wenn es wartet?"],
  ["What does Khan Academy not solve that TrackLearn also needs? (For example: a learner on a phone without an account keeps the progress only for the visit.)", "Was löst Khan Academy nicht, was TrackLearn auch braucht? (Zum Beispiel: Eine Lernende auf dem Handy ohne Konto behält den Fortschritt nur für den Besuch.)"],
];
const DISCUSS_31: P[] = [
  ["Which of Khan Academy's three levels of progress would you take over for TrackLearn, and which would you leave out?", "Welche der drei Fortschrittsebenen von Khan Academy würden Sie für TrackLearn übernehmen, und welche würden Sie weglassen?"],
  ["Where does Khan Academy keep the platform quiet, and where would TrackLearn need more or less feedback? (Materi B2: feedback against overload)", "Wo hält Khan Academy die Plattform ruhig, und wo bräuchte TrackLearn mehr oder weniger Feedback? (Materi B2: Feedback gegen Überflutung)"],
  ["Khan Academy names a standard (WCAG 2.1 AA) and a feedback channel. What would TrackLearn write into its strategy, and who checks it?", "Khan Academy nennt einen Standard (WCAG 2.1 AA) und einen Feedbackkanal. Was würde TrackLearn in seine Strategie schreiben, und wer prüft es?"],
  ["You decide without retention data by device. What could you watch on TrackLearn after the first step to see whether it works? (Materi B3)", "Sie entscheiden ohne Bindungsdaten pro Gerät. Was könnten Sie bei TrackLearn nach dem ersten Schritt beobachten, um zu sehen, ob es wirkt? (Materi B3)"],
];

const pick = (p: P) => tt(p[0], p[1]);
const NOTE: P = ["Khan Academy loads empty inside another page, so open it in a new tab to use it.", "Khan Academy lädt in einer anderen Seite leer; öffnen Sie sie in einem neuen Tab, um sie zu nutzen."];

function spec(intro: P, rows: Row[], discuss: P[]): ReferenceSpec {
  return {
    name: "Khan Academy",
    visit: VISIT,
    intro: pick(intro),
    site: { url: COURSE, page: tt("the course page “Algebra 1”", "die Kursseite „Algebra 1“"), shot: SHOT.course, note: pick(NOTE) },
    rows: rows.map((r) => ({ topic: pick(r.topic), problem: pick(r.problem), did: pick(r.did), where: pick(r.where), url: r.url, shot: r.shot })),
    discuss: discuss.map(pick),
  };
}

/** The window of Block 2.1 (the case study). */
export const REF_21 = (): ReferenceSpec => spec(INTRO_21, ROWS_21, DISCUSS_21);
/** The window of Block 3.1 (the strategy). */
export const REF_31 = (): ReferenceSpec => spec(INTRO_31, ROWS_31, DISCUSS_31);

/** The same analysis in the passcode-gated facilitator card under each block (section 16, "Mentor tools"), written with `t` for the spec. */
const card = (id: string, after: string, rows: Row[], discuss: P[]) => ({
  id,
  after,
  ariaLabel: t("Reference platform for the facilitator", "Referenzplattform für die Moderation"),
  openLabel: t("Reference platform · the analysis for the discussion", "Referenzplattform · die Analyse für die Diskussion"),
  hideLabel: t("Hide the reference analysis", "Die Referenzanalyse ausblenden"),
  sections: [
    {
      kicker: t(`Khan Academy · observed on ${VISIT}: open the live site before the session, it may have changed`, `Khan Academy · beobachtet am ${VISIT}: Öffnen Sie die Live-Seite vor der Sitzung, sie kann sich geändert haben`),
      items: rows.map((r) => t(`${r.problem[0]} → ${r.did[0]} (${r.where[0]})`, `${r.problem[1]} → ${r.did[1]} (${r.where[1]})`)),
    },
    { kicker: t("Discussion prompts", "Diskussionsfragen"), items: discuss.map((d) => t(d[0], d[1])) },
  ],
});
export const REF_CARD_21 = card("ref-card-21", "2.1", ROWS_21, DISCUSS_21);
export const REF_CARD_31 = card("ref-card-31", "3.1", ROWS_31, DISCUSS_31);
