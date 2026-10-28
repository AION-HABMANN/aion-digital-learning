import type { ReferenceSpec } from "@/components/sim/ReferencePlatform";
import { t, tt } from "@/lib/lang";

/**
 * Day 11 · the reference platform of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): Khan Academy's streaks and levels, chosen on 28.10.2026 after comparing Khan Academy,
 * Duolingo, Kahoot!, Habitica, freeCodeCamp, Udemy and Coursera on their real pages. The case is about gamification that rewards activity (points for finished screens, a ranking)
 * while learners learn little. Khan Academy is the one platform whose public pages show a reward tied to a learning result and say why: a streak and a level count only when a
 * skill reaches "proficient or higher". Duolingo's public blog is already the real competitor of the Route 2 window; its product needs an account, Kahoot! and Habitica show
 * marketing only, and Udemy and Coursera show only landing pages. Every row was observed on 28.10.2026: the help articles "What are Streaks and Course Levels?", "Introducing
 * Streaks and Levels!" and "Will my course level reset to zero if my streak ends?", and the course page "Algebra 1" (its text searched for "leaderboard", "ranking", "league" and
 * "rank": no match). Labels of the real site are quoted in its own language (English). One source of text for the window and the facilitator cards.
 */
type P = [string, string];
type Row = { topic: P; problem: P; did: P; where: P; url: string; shot?: string };

const VISIT = "28.10.2026";
const COURSE = "https://www.khanacademy.org/math/algebra";
const HELP = "https://support.khanacademy.org/hc/en-us/articles/360054115071-What-are-Streaks-and-Course-Levels";
const INTRO = "https://support.khanacademy.org/hc/en-us/articles/28946883989261-Introducing-Streaks-and-Levels";
const RESET = "https://support.khanacademy.org/hc/en-us/articles/28809807421325-Will-my-course-level-reset-to-zero-if-my-streak-ends";
const SHOT = {
  course: "/real/khan-course-progress-2026-10-28.jpg",
  help: "/real/khan-streaks-help-2026-10-28.jpg",
  why: "/real/khan-why-streaks-2026-10-28.jpg",
};
const WHERE_HELP: P = ["Help article “What are Streaks and Course Levels?”", "Hilfeartikel „What are Streaks and Course Levels?“"];
const WHERE_INTRO: P = ["Help article “Introducing Streaks and Levels!”", "Hilfeartikel „Introducing Streaks and Levels!“"];
const WHERE_COURSE: P = ["Course page “Algebra 1”", "Kursseite „Algebra 1“"];
const WHERE_RESET: P = ["Help article “Will my course level reset to zero if my streak ends?”", "Hilfeartikel „Will my course level reset to zero if my streak ends?“"];

const INTRO_21: P = [
  "GameLearn's learners collect points but learn little, the focus is on the reward instead of the content, and extrinsic motivation dominates. Khan Academy also uses game mechanics (streaks and levels), but its public help pages say that a streak or a level counts only when a skill reaches “proficient or higher”, and they say why. Read the rule, compare it with GameLearn's points, and ask what it changes.",
  "Die Lernenden von GameLearn sammeln Punkte, lernen aber wenig, der Fokus liegt auf der Belohnung statt auf dem Inhalt, und extrinsische Motivation dominiert. Khan Academy nutzt ebenfalls Spielmechaniken (Streaks und Levels), aber seine öffentlichen Hilfeseiten sagen, dass ein Streak oder ein Level nur zählt, wenn ein Skill „proficient or higher“ erreicht, und sie sagen warum. Lesen Sie die Regel, vergleichen Sie sie mit den Punkten von GameLearn, und fragen Sie, was sie verändert.",
];
const INTRO_31: P = [
  "Your task is a strategy: whether to use gamification at all, what makes a mechanic meaningful, how it links to learning objectives, the risks (perverse incentives and over-motivation), prioritised measures and a decision under uncertainty. Khan Academy shows one worked example in its own words: two mechanics, the rule for each, and the reason. Use it to compare your plan with, not as the answer.",
  "Ihre Aufgabe ist eine Strategie: ob Gamification überhaupt eingesetzt wird, was eine Mechanik sinnvoll macht, wie sie mit Lernzielen verknüpft ist, die Risiken (falsche Anreize und Übermotivation), priorisierte Maßnahmen und eine Entscheidung unter Unsicherheit. Khan Academy zeigt ein ausgearbeitetes Beispiel mit eigenen Worten: zwei Mechaniken, die Regel für jede und den Grund. Nutzen Sie es zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
];

const ROWS_21: Row[] = [
  {
    topic: ["Materi A3 · activity is not learning", "Materi A3 · Aktivität ist nicht Lernen"],
    problem: ["Users collect points but learn little", "Nutzer sammeln Punkte, lernen aber wenig"],
    did: [
      "A streak and a level count only learning results: “Leveling up a skill to proficient or better will contribute to your streaks and course levels.” To keep a streak, a learner must “achieve proficient in at least one new skill every week”. The company says it could have renewed a streak by watching a video or attempting an exercise, and chose a proficient skill instead.",
      "Ein Streak und ein Level zählen nur Lernergebnisse: „Leveling up a skill to proficient or better will contribute to your streaks and course levels.“ Um einen Streak zu halten, muss eine Lernende „achieve proficient in at least one new skill every week“. Das Unternehmen sagt, es hätte einen Streak auch durch ein angeschautes Video oder einen versuchten Übungsdurchgang verlängern können, und hat stattdessen einen Skill auf „proficient“ gewählt.",
    ],
    where: WHERE_HELP,
    url: HELP,
    shot: SHOT.help,
  },
  {
    topic: ["Materi A1, A3 · reward and content", "Materi A1, A3 · Belohnung und Inhalt"],
    problem: ["The focus is on the reward instead of the content", "Der Fokus liegt auf der Belohnung statt auf dem Inhalt"],
    did: [
      "The reward is counted in skills of the course, not in points of activity: the strip shows “Level 16 · 6 /16 skills” and a button “Up next →” that leads to the next suggested skill. The strip sits above the course content, which is the list of skills; “Your current level and the number of skills needed to reach the next level are displayed.”",
      "Die Belohnung wird in Skills des Kurses gezählt, nicht in Aktivitätspunkten: Der Streifen zeigt „Level 16 · 6 /16 skills“ und einen Button „Up next →“, der zum nächsten vorgeschlagenen Skill führt. Der Streifen liegt über dem Kursinhalt, der Liste der Skills; „Your current level and the number of skills needed to reach the next level are displayed.“",
    ],
    where: WHERE_COURSE,
    url: COURSE,
    shot: SHOT.course,
  },
  {
    topic: ["Materi A2 · extrinsic and intrinsic motivation", "Materi A2 · extrinsische und intrinsische Motivation"],
    problem: ["Extrinsic motivation dominates", "Extrinsische Motivation dominiert"],
    did: [
      "On the course page no ranking of learners against each other was found (its text was searched for “leaderboard”, “ranking”, “league” and “rank”: no match). Progress is measured against the course's own skills, and the company names the aim in its own words: “healthy learning habits” and levels that “break apart the daunting task of completing an entire course into smaller, more manageable milestones”.",
      "Auf der Kursseite wurde keine Rangliste von Lernenden gegeneinander gefunden (ihr Text wurde nach „leaderboard“, „ranking“, „league“ und „rank“ durchsucht: kein Treffer). Der Fortschritt wird an den Skills des Kurses selbst gemessen, und das Unternehmen nennt das Ziel mit eigenen Worten: „healthy learning habits“ und Level, die „break apart the daunting task of completing an entire course into smaller, more manageable milestones“.",
    ],
    where: [`${WHERE_COURSE[0]} and ${WHERE_INTRO[0]}`, `${WHERE_COURSE[1]} und ${WHERE_INTRO[1]}`],
    url: INTRO,
    shot: SHOT.why,
  },
  {
    topic: ["Materi A4 · link, fairness, challenge", "Materi A4 · Verknüpfung, Fairness, Herausforderung"],
    problem: ["The strategy is wrong: the reward is not linked to a learning objective", "Die Strategie ist falsch: Die Belohnung ist nicht mit einem Lernziel verknüpft"],
    did: [
      "Each step of a level is one skill, and a skill is a learning objective with a visible state: the legend names “Mastered”, “Proficient”, “Familiar”, “Attempted” and “Not started”, and the header says “Algebra 1 · 182 skills”. The rule for earning a skill point is printed in the help center for everyone to read: “Every time you earn proficient or better on a skill, you earn a skill point.”",
      "Jeder Schritt eines Levels ist ein Skill, und ein Skill ist ein Lernziel mit sichtbarem Stand: Die Legende nennt „Mastered“, „Proficient“, „Familiar“, „Attempted“ und „Not started“, und der Kopf sagt „Algebra 1 · 182 skills“. Die Regel, wie man einen Skill-Punkt bekommt, steht für alle lesbar im Help Center: „Every time you earn proficient or better on a skill, you earn a skill point.“",
    ],
    where: [`${WHERE_COURSE[0]} and ${WHERE_HELP[0]}`, `${WHERE_COURSE[1]} und ${WHERE_HELP[1]}`],
    url: COURSE,
    shot: SHOT.course,
  },
];

const ROWS_31: Row[] = [
  {
    topic: ["Materi B1 · from objective to mechanic", "Materi B1 · vom Ziel zur Mechanik"],
    problem: ["The decision: use gamification or not?", "Die Entscheidung: Gamification einsetzen oder nicht?"],
    did: [
      "The company asks the question itself: “why make changes to the user experience to ‘gamify’ learning?” It decides yes, for the many learners who “would love a way to view and celebrate their progress”, and adds only two mechanics, streaks and levels. Its reason: “Motivation isn't a fixed trait … it can grow or shrink depending on one's environment and strategies.”",
      "Das Unternehmen stellt die Frage selbst: „why make changes to the user experience to ‘gamify’ learning?“ Es entscheidet sich dafür, für die vielen Lernenden, die „would love a way to view and celebrate their progress“, und ergänzt nur zwei Mechaniken, Streaks und Levels. Sein Grund: „Motivation isn't a fixed trait … it can grow or shrink depending on one's environment and strategies.“",
    ],
    where: WHERE_INTRO,
    url: INTRO,
    shot: SHOT.why,
  },
  {
    topic: ["Materi A4 · meaningful mechanics", "Materi A4 · sinnvolle Mechaniken"],
    problem: ["The definition of meaningful mechanics", "Die Definition sinnvoller Mechaniken"],
    did: [
      "Each mechanic has one rule, written so a learner can check it. Streak: at least one new proficient skill in each week (Monday 12:00am to Sunday 11:59pm, Pacific Time). Level: every skill that reaches proficient or better earns a skill point, and more skill points mean a higher level.",
      "Jede Mechanik hat eine Regel, so geschrieben, dass eine Lernende sie prüfen kann. Streak: mindestens ein neuer Skill auf „proficient“ in jeder Woche (Montag 0:00 bis Sonntag 23:59, Pacific Time). Level: Jeder Skill, der „proficient or better“ erreicht, bringt einen Skill-Punkt, und mehr Skill-Punkte bedeuten ein höheres Level.",
    ],
    where: WHERE_HELP,
    url: HELP,
    shot: SHOT.help,
  },
  {
    topic: ["Materi B1 · the link to learning objectives", "Materi B1 · die Verknüpfung mit Lernzielen"],
    problem: ["The link to learning objectives", "Die Verknüpfung mit Lernzielen"],
    did: [
      "The company says what it wants each streak week to show: “meaningful learning”. “We could have had users renew a streak by watching a video or attempting an exercise, but … we believe getting one skill to proficient or higher is the ideal indicator that users are on the right track.” It adds “we have efficacy research studies to back that up”; that is the company's own claim, and this course has not reviewed those studies.",
      "Das Unternehmen sagt, was jede Streak-Woche zeigen soll: „meaningful learning“. „We could have had users renew a streak by watching a video or attempting an exercise, but … we believe getting one skill to proficient or higher is the ideal indicator that users are on the right track.“ Es ergänzt „we have efficacy research studies to back that up“; das ist die eigene Behauptung des Unternehmens, und dieser Kurs hat diese Studien nicht geprüft.",
    ],
    where: WHERE_INTRO,
    url: INTRO,
    shot: SHOT.why,
  },
  {
    topic: ["Materi B2 · perverse incentives, over-motivation", "Materi B2 · falsche Anreize, Übermotivation"],
    problem: ["A risk analysis: perverse incentives and over-motivation", "Eine Risikoanalyse: falsche Anreize und Übermotivation"],
    did: [
      "Visible on the pages, each a trade-off to weigh and not a verdict: a streak ends after a week without a new proficient skill (“the streak ends and you'll need to start over”); the level does not reset when a streak ends (“Nope! … A streak ending has no impact on your total skill points”); and a skill point can still be lost: “you can lose a skill point if you level down a previously Proficient skill”.",
      "Auf den Seiten sichtbar, jeweils ein Abwägen und kein Urteil: Ein Streak endet nach einer Woche ohne neuen „proficient“-Skill („the streak ends and you'll need to start over“); das Level wird nicht zurückgesetzt, wenn ein Streak endet („Nope! … A streak ending has no impact on your total skill points“); und ein Skill-Punkt kann trotzdem verloren gehen: „you can lose a skill point if you level down a previously Proficient skill“.",
    ],
    where: [`${WHERE_HELP[0]} and ${WHERE_RESET[0]}`, `${WHERE_HELP[1]} und ${WHERE_RESET[1]}`],
    url: RESET,
  },
  {
    topic: ["Materi A5, B1 · prioritised measures", "Materi A5, B1 · priorisierte Maßnahmen"],
    problem: ["Prioritised measures", "Priorisierte Maßnahmen"],
    did: [
      "The company says what each of its two measures is for. Streaks “promote and celebrate consistency”, with at least one skill at proficient or higher each week. Levels “break apart the daunting task of completing an entire course into smaller, more manageable milestones”. Each measure is tied to one behaviour it wants to see.",
      "Das Unternehmen sagt, wofür jede seiner beiden Maßnahmen da ist. Streaks „promote and celebrate consistency“, mit mindestens einem Skill auf „proficient or higher“ pro Woche. Level „break apart the daunting task of completing an entire course into smaller, more manageable milestones“. Jede Maßnahme ist an ein Verhalten gebunden, das das Unternehmen sehen will.",
    ],
    where: WHERE_INTRO,
    url: INTRO,
    shot: SHOT.why,
  },
  {
    topic: ["Materi B3 · deciding without proof", "Materi B3 · Entscheiden ohne Beleg"],
    problem: ["One decision under uncertainty, on purpose", "Eine Entscheidung unter Unsicherheit, mit Absicht"],
    did: [
      "The company states its theory (“regular, consistent practice fosters learning and retention, and ‘chunking’ divides larger, potentially overwhelming goals into smaller, more achievable tasks”) and says it will “continue to refine and improve” the mechanics. On the three help pages read for this analysis, no result is printed that shows what levels and streaks do to learning.",
      "Das Unternehmen nennt seine Theorie („regular, consistent practice fosters learning and retention, and ‘chunking’ divides larger, potentially overwhelming goals into smaller, more achievable tasks“) und sagt, es werde die Mechaniken weiter „refine and improve“. Auf den drei für diese Analyse gelesenen Hilfeseiten steht kein Ergebnis, das zeigt, was Level und Streaks mit dem Lernen machen.",
    ],
    where: WHERE_INTRO,
    url: INTRO,
  },
];

const DISCUSS_21: P[] = [
  ["Which of GameLearn's problems does Khan Academy's rule (a streak and a level count only for a proficient skill) answer, and which does it leave open?", "Welche Probleme von GameLearn beantwortet die Regel von Khan Academy (ein Streak und ein Level zählen nur für einen „proficient“-Skill), und welche lässt sie offen?"],
  ["Khan Academy could have rewarded a video watched or an exercise tried, and chose a proficient skill. What would GameLearn have to measure before it could reward learning instead of finished screens?", "Khan Academy hätte ein angeschautes Video oder einen versuchten Übungsdurchgang belohnen können und hat einen „proficient“-Skill gewählt. Was müsste GameLearn messen, bevor es Lernen statt beendeter Seiten belohnen könnte?"],
  ["No ranking of learners was found on the course page. In GameLearn one learner likes the ranking and another stopped because she can never reach the top ten. Who would gain and who would lose if the ranking went away?", "Auf der Kursseite wurde keine Rangliste gefunden. Bei GameLearn mag ein Lernender die Rangliste, und eine andere hat aufgehört, weil sie die ersten zehn nie erreicht. Wer würde gewinnen und wer verlieren, wenn die Rangliste wegfiele?"],
  ["What does Khan Academy not solve that GameLearn also needs? (For example: what a learner who is not yet proficient on anything sees in the first week.)", "Was löst Khan Academy nicht, was GameLearn auch braucht? (Zum Beispiel: was eine Lernende sieht, die in der ersten Woche noch in nichts „proficient“ ist.)"],
];
const DISCUSS_31: P[] = [
  ["Which of the two mechanics (the weekly streak, the level counted in skills) would you take over for GameLearn, and what would you leave out? (Materi A4: link, fairness, challenge)", "Welche der beiden Mechaniken (der wöchentliche Streak, das in Skills gezählte Level) würden Sie für GameLearn übernehmen, und was würden Sie weglassen? (Materi A4: Verknüpfung, Fairness, Herausforderung)"],
  ["Where does the rule create pressure (a streak ends, a skill point can be lost) and where does it take pressure away (the level never resets)? Which would matter more for your learners? (Materi B2)", "Wo erzeugt die Regel Druck (ein Streak endet, ein Skill-Punkt kann verloren gehen) und wo nimmt sie Druck weg (das Level wird nie zurückgesetzt)? Was wäre für Ihre Lernenden wichtiger? (Materi B2)"],
  ["Compare with the Duolingo page in “Observe the platform for real”: which behaviour does each platform reward, learning or activity?", "Vergleichen Sie mit der Duolingo-Seite in „Die Plattform wirklich beobachten“: Welches Verhalten belohnt jede Plattform, Lernen oder Aktivität?"],
  ["Khan Academy states its reason and cites research. What would you write as your reason when you have no proof that gamification works for your learners, and how would you check it later? (Materi B3)", "Khan Academy nennt seinen Grund und verweist auf Forschung. Was würden Sie als Ihren Grund schreiben, wenn Sie keinen Beleg haben, dass Gamification bei Ihren Lernenden wirkt, und wie würden Sie es später prüfen? (Materi B3)"],
];

const pick = (p: P) => tt(p[0], p[1]);
const NOTE: P = ["The help center and Khan Academy load empty inside another page, so open the page in a new tab to use it.", "Das Help Center und Khan Academy laden in einer anderen Seite leer; öffnen Sie die Seite in einem neuen Tab, um sie zu nutzen."];

function spec(intro: P, rows: Row[], discuss: P[]): ReferenceSpec {
  return {
    name: "Khan Academy",
    visit: VISIT,
    intro: pick(intro),
    site: { url: HELP, page: tt("the help article “What are Streaks and Course Levels?”", "der Hilfeartikel „What are Streaks and Course Levels?“"), shot: SHOT.help, note: pick(NOTE) },
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
      kicker: t(`Khan Academy · observed on ${VISIT}: open the live pages before the session, they may have changed`, `Khan Academy · beobachtet am ${VISIT}: Öffnen Sie die Live-Seiten vor der Sitzung, sie können sich geändert haben`),
      items: rows.map((r) => t(`${r.problem[0]} → ${r.did[0]} (${r.where[0]})`, `${r.problem[1]} → ${r.did[1]} (${r.where[1]})`)),
    },
    { kicker: t("Discussion prompts", "Diskussionsfragen"), items: discuss.map((d) => t(d[0], d[1])) },
  ],
});
export const REF_CARD_21 = card("ref-card-21", "2.1", ROWS_21, DISCUSS_21);
export const REF_CARD_31 = card("ref-card-31", "3.1", ROWS_31, DISCUSS_31);
