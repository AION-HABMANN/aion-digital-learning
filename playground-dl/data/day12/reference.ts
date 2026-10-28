import { defineReference, type P, type RefRow } from "@/data/free/reference";

/**
 * Day 12 · the reference platform of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): Khan Academy's Mastery Challenges, an adaptive step whose rule is printed for the
 * learner. The case is an adaptive system that users do not understand, with low acceptance. Chosen on 28.10.2026 because its public help page states in plain words when the
 * adaptive step opens, what it contains, how it chooses and what each result does to the learner's level; Duolingo's Birdbrain post, the other adaptive platform checked, is already
 * the real competitor of the Route 2 window. Every row was observed on 28.10.2026: the help article "What are Mastery Challenges?", its example result screen, the first-visit tour
 * and the course page "Algebra 1". The pages read do not say how "Up next" chooses the next skill. Labels of the real site are quoted in its own language (English).
 */
const VISIT = "28.10.2026";
const COURSE = "https://www.khanacademy.org/math/algebra";
const MC = "https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges";
const SHOT = { mc: "/real/khan-mastery-challenge-2026-10-28.jpg", course: "/real/khan-course-progress-2026-10-28.jpg" };
const W_MC: P = ["Help article “What are Mastery Challenges?”", "Hilfeartikel „What are Mastery Challenges?“"];
const W_COURSE: P = ["Course page “Algebra 1”", "Kursseite „Algebra 1“"];

const ROWS_21: RefRow[] = [
  {
    topic: ["Materi A3 · UX patterns for personalised learning paths", "Materi A3 · UX-Muster für personalisierte Lernpfade"],
    problem: ["Users do not understand the adaptations", "Nutzer verstehen die Anpassungen nicht"],
    did: [
      "The rule is printed in everyday words, for the learner. “Mastery Challenges always consist of 6 questions that review 3 skills. Mastery Challenges are personalized to you, reviewing skills that you've worked on across the entire course and devoting 2 questions to each skill.” Both answers right: “you'll level up in that skill”. Both wrong: “you'll level down”. One of each: the level “remains the same”.",
      "Die Regel steht in Alltagsworten für die Lernende da. „Mastery Challenges always consist of 6 questions that review 3 skills. Mastery Challenges are personalized to you, reviewing skills that you've worked on across the entire course and devoting 2 questions to each skill.“ Beide Antworten richtig: „you'll level up in that skill“. Beide falsch: „you'll level down“. Je eine: Das Level „remains the same“.",
    ],
    where: W_MC,
    url: MC,
    shot: SHOT.mc,
  },
  {
    topic: ["Materi A2 · rules, models and their limits", "Materi A2 · Regeln, Modelle und ihre Grenzen"],
    problem: ["A complex adaptive system", "Ein komplexes adaptives System"],
    did: [
      "The adaptive part is small and bounded: one kind of activity, a fixed size (6 questions, 3 skills), three possible results (up, down, same) and unlock conditions the learner can read: “at least 3 skills” at Familiar, “at least 1 skill” at Proficient, and “more than 12 hours since you last started” one.",
      "Der adaptive Teil ist klein und begrenzt: eine Art von Aktivität, eine feste Größe (6 Fragen, 3 Skills), drei mögliche Ergebnisse (hoch, runter, gleich) und Freischaltbedingungen, die die Lernende lesen kann: „at least 3 skills“ auf Familiar, „at least 1 skill“ auf Proficient und „more than 12 hours since you last started“ eine.",
    ],
    where: W_MC,
    url: MC,
    shot: SHOT.mc,
  },
  {
    topic: ["Materi A4 · opportunities and risks", "Materi A4 · Chancen und Risiken"],
    problem: ["Acceptance is low", "Die Akzeptanz ist gering"],
    did: [
      "The learner keeps control and can see the choice. A challenge is “a way for you to review and practice”, it “aren't always available”, and “you don't have to finish a Mastery Challenge in one sitting” (12 hours). On the course page the suggestion “Up next for you!” sits beside the full list of units and skills; the first-visit tour calls the button a way “to go directly to your next suggested skill”.",
      "Die Lernende behält die Kontrolle und sieht die Auswahl. Eine Challenge ist „a way for you to review and practice“, sie ist „aren't always available“, und „you don't have to finish a Mastery Challenge in one sitting“ (12 Stunden). Auf der Kursseite steht der Vorschlag „Up next for you!“ neben der vollständigen Liste von Units und Skills; die Tour beim ersten Besuch nennt den Button einen Weg, „to go directly to your next suggested skill“.",
    ],
    where: [`${W_MC[0]} and ${W_COURSE[0]}`, `${W_MC[1]} und ${W_COURSE[1]}`],
    url: COURSE,
    shot: SHOT.course,
  },
  {
    topic: ["Materi A1 · collect, analyse, adapt", "Materi A1 · erfassen, analysieren, anpassen"],
    problem: ["The learner cannot see why something changed", "Die Lernende sieht nicht, warum sich etwas ändert"],
    did: [
      "The state the adaptation works on is visible: the course page names a level for every skill (“Mastered”, “Proficient”, “Familiar”, “Attempted”, “Not started”). The example result screen in the article lists what changed: “Leveled up”, “Leveled down” and “No change” with a count, and a list “Skill level changes” with the skills concerned.",
      "Der Stand, auf dem die Anpassung arbeitet, ist sichtbar: Die Kursseite nennt für jeden Skill eine Stufe („Mastered“, „Proficient“, „Familiar“, „Attempted“, „Not started“). Der Beispiel-Ergebnisbildschirm im Artikel listet, was sich geändert hat: „Leveled up“, „Leveled down“ und „No change“ mit einer Zahl, und eine Liste „Skill level changes“ mit den betroffenen Skills.",
    ],
    where: [`${W_MC[0]} and ${W_COURSE[0]}`, `${W_MC[1]} und ${W_COURSE[1]}`],
    url: MC,
    shot: SHOT.mc,
  },
];

const ROWS_31: RefRow[] = [
  {
    topic: ["Materi B1 · need, data, technique, explanation", "Materi B1 · Bedarf, Daten, Technik, Erklärung"],
    problem: ["The concept for adaptive learning paths", "Das Konzept für adaptive Lernpfade"],
    did: [
      "Two adaptive parts, each explained: a suggestion of the next skill (“Up next”: “Click to go to the next suggested skill”) and a review across the course (“personalized to you, reviewing skills that you've worked on across the entire course”). The learner can still open any skill from the course page.",
      "Zwei adaptive Teile, jeweils erklärt: ein Vorschlag für den nächsten Skill („Up next“: „Click to go to the next suggested skill“) und eine Wiederholung über den ganzen Kurs („personalized to you, reviewing skills that you've worked on across the entire course“). Die Lernende kann von der Kursseite aus weiterhin jeden Skill öffnen.",
    ],
    where: [`${W_COURSE[0]} and ${W_MC[0]}`, `${W_COURSE[1]} und ${W_MC[1]}`],
    url: COURSE,
    shot: SHOT.course,
  },
  {
    topic: ["Materi A4 · the link to gamification", "Materi A4 · die Verbindung zur Gamification"],
    problem: ["The integration of gamification", "Die Einbindung von Gamification"],
    did: [
      "A challenge is “another way for you to earn mastery levels”, and levels and streaks count the same result: a skill leveled up to proficient or better. The example result screen in the article also shows a points line (“6/6 correct · 280 energy pts”) next to the level changes.",
      "Eine Challenge ist „another way for you to earn mastery levels“, und Level und Streaks zählen dasselbe Ergebnis: einen Skill, der auf „proficient or better“ steigt. Der Beispiel-Ergebnisbildschirm im Artikel zeigt neben den Level-Änderungen auch eine Punktezeile („6/6 correct · 280 energy pts“).",
    ],
    where: W_MC,
    url: MC,
    shot: SHOT.mc,
  },
  {
    topic: ["Materi A3 · UX patterns", "Materi A3 · UX-Muster"],
    problem: ["The UX design patterns", "Die UX-Designmuster"],
    did: [
      "Four patterns can be seen: a suggestion button (“Up next”), a state for every skill in a legend, an unlock rule in plain words, and a result summary that says what changed (“Leveled up”, “Leveled down”, “No change”).",
      "Vier Muster sind zu sehen: ein Vorschlags-Button („Up next“), ein Stand für jeden Skill in einer Legende, eine Freischaltregel in einfachen Worten und eine Ergebniszusammenfassung, die sagt, was sich geändert hat („Leveled up“, „Leveled down“, „No change“).",
    ],
    where: [`${W_COURSE[0]} and ${W_MC[0]}`, `${W_COURSE[1]} und ${W_MC[1]}`],
    url: COURSE,
    shot: SHOT.course,
  },
  {
    topic: ["Materi A3 · the screen as a sketch", "Materi A3 · der Bildschirm als Skizze"],
    problem: ["A low-fidelity prototype: the concept sketch", "Ein Low-Fidelity-Prototyp: die Konzeptskizze"],
    did: [
      "The example screen in the article is a ready layout to compare a sketch with: the course and the activity in a column on the left, a result panel in the middle with the counts “Leveled up”, “Leveled down” and “No change”, and on the right the list “Skill level changes” with the skills concerned.",
      "Der Beispielbildschirm im Artikel ist ein fertiges Layout, mit dem sich eine Skizze vergleichen lässt: links in einer Spalte der Kurs und die Aktivität, in der Mitte ein Ergebnisfeld mit den Zahlen „Leveled up“, „Leveled down“ und „No change“, und rechts die Liste „Skill level changes“ mit den betroffenen Skills.",
    ],
    where: W_MC,
    url: MC,
    shot: SHOT.mc,
  },
  {
    topic: ["Materi A5 · weighing a measure", "Materi A5 · eine Maßnahme abwägen"],
    problem: ["Prioritised features", "Priorisierte Funktionen"],
    did: [
      "The page shows a staged rollout: “Over time, we plan to introduce Mastery Challenges for all mastery-enabled courses. For now, however, Mastery Challenges are only available in Math courses.”",
      "Die Seite zeigt eine gestufte Einführung: „Over time, we plan to introduce Mastery Challenges for all mastery-enabled courses. For now, however, Mastery Challenges are only available in Math courses.“",
    ],
    where: W_MC,
    url: MC,
  },
  {
    topic: ["Materi A4, B2 · risks, conflicting goals", "Materi A4, B2 · Risiken, Zielkonflikte"],
    problem: ["A risk analysis", "Eine Risikoanalyse"],
    did: [
      "Visible in the rule, each a trade-off to weigh and not a verdict: the step can lower a level (“If you answer both questions incorrectly, you'll level down in that skill”); it is limited (“You can also only complete one Mastery Challenge per 12-hour period”); and a started challenge expires (“you have 12 hours to complete a Mastery Challenge or it will reset”).",
      "In der Regel sichtbar, jeweils ein Abwägen und kein Urteil: Der Schritt kann ein Level senken („If you answer both questions incorrectly, you'll level down in that skill“); er ist begrenzt („You can also only complete one Mastery Challenge per 12-hour period“); und eine begonnene Challenge verfällt („you have 12 hours to complete a Mastery Challenge or it will reset“).",
    ],
    where: W_MC,
    url: MC,
  },
  {
    topic: ["Materi B3 · deciding with an incomplete data basis", "Materi B3 · mit unvollständiger Datenbasis entscheiden"],
    problem: ["One decision under uncertainty, on purpose", "Eine Entscheidung unter Unsicherheit, mit Absicht"],
    did: [
      "On the pages read for this analysis, no result is printed that shows whether Mastery Challenges improve learning, and none says how “Up next” chooses the next skill. What the pages do show is a decision taken in steps: one subject first, with the rule printed.",
      "Auf den für diese Analyse gelesenen Seiten steht kein Ergebnis, das zeigt, ob Mastery Challenges das Lernen verbessern, und keine sagt, wie „Up next“ den nächsten Skill wählt. Was die Seiten zeigen, ist eine Entscheidung in Schritten: zuerst ein Fach, mit gedruckter Regel.",
    ],
    where: W_MC,
    url: MC,
  },
];

const DISCUSS_21: P[] = [
  ["Which of AdaptLearn's three problems (complex, not understood, low acceptance) does the printed rule address, and what would AdaptLearn have to print to do the same?", "Welche der drei Probleme von AdaptLearn (komplex, nicht verstanden, geringe Akzeptanz) beantwortet die gedruckte Regel, und was müsste AdaptLearn drucken, um dasselbe zu tun?"],
  ["Khan Academy tells the learner what changed (level up, level down, no change). AdaptLearn's “Updates” say “Lesson 2 was moved” and “Lesson 5 was hidden”. What would a learner understand if they said as much as Khan Academy's result screen?", "Khan Academy sagt der Lernenden, was sich geändert hat (Level hoch, Level runter, keine Änderung). Die „Aktualisierungen“ von AdaptLearn sagen „Lektion 2 wurde verschoben“ und „Lektion 5 wurde ausgeblendet“. Was würde eine Lernende verstehen, wenn sie so viel sagten wie der Ergebnisbildschirm von Khan Academy?"],
  ["Khan Academy's adaptive step is optional and bounded (unlock rules, one per 12 hours). What would you keep optional in AdaptLearn, and what could stay automatic?", "Der adaptive Schritt von Khan Academy ist optional und begrenzt (Freischaltregeln, einer pro 12 Stunden). Was würden Sie bei AdaptLearn optional lassen, und was könnte automatisch bleiben?"],
  ["The pages read do not say how “Up next” chooses the next skill. What does a learner lose when the choice is not explained, and what would you say about it?", "Die gelesenen Seiten sagen nicht, wie „Up next“ den nächsten Skill wählt. Was verliert eine Lernende, wenn die Auswahl nicht erklärt wird, und was würden Sie dazu sagen?"],
];
const DISCUSS_31: P[] = [
  ["Which of the four patterns (a suggestion button, a state for every skill, an unlock rule in plain words, a result summary) belong in your concept for adaptive learning paths? Draw them into your sketch.", "Welche der vier Muster (ein Vorschlags-Button, ein Stand für jeden Skill, eine Freischaltregel in einfachen Worten, eine Ergebniszusammenfassung) gehören in Ihr Konzept für adaptive Lernpfade? Zeichnen Sie sie in Ihre Skizze."],
  ["Levels and streaks count the same result as the adaptive step. What would you connect in your plan between adaptation and gamification, and what would you keep apart? (Materi A4)", "Level und Streaks zählen dasselbe Ergebnis wie der adaptive Schritt. Was würden Sie in Ihrem Plan zwischen Anpassung und Gamification verbinden, und was getrennt halten? (Materi A4)"],
  ["The challenge can lower a level. Where in your plan could the system lower a learner's standing, and how would you tell them why?", "Die Challenge kann ein Level senken. Wo in Ihrem Plan könnte das System den Stand einer Lernenden senken, und wie würden Sie ihr sagen, warum?"],
  ["Khan Academy started with one subject. What would you build first in your platform, what would you wait with, and how would you check later whether it works? (Materi B3)", "Khan Academy hat mit einem Fach begonnen. Was würden Sie in Ihrer Plattform zuerst bauen, womit würden Sie warten, und wie würden Sie später prüfen, ob es wirkt? (Materi B3)"],
];

export const { REF_21, REF_31, REF_CARD_21, REF_CARD_31 } = defineReference({
  name: "Khan Academy",
  visit: VISIT,
  site: {
    url: MC,
    page: ["the help article “What are Mastery Challenges?”", "der Hilfeartikel „What are Mastery Challenges?“"],
    shot: SHOT.mc,
    note: ["The help center and Khan Academy load empty inside another page, so open the page in a new tab to use it.", "Das Help Center und Khan Academy laden in einer anderen Seite leer; öffnen Sie die Seite in einem neuen Tab, um sie zu nutzen."],
  },
  intro21: [
    "AdaptLearn adapts a lot, users do not understand the adaptations, and acceptance is low. Khan Academy also adapts what a learner reviews (“personalized to you”), but its public help page prints the rule of the adaptive step in plain words: when it opens, what it contains, and what each result does to the learner's level. Read the rule and compare it with what AdaptLearn tells its learners.",
    "AdaptLearn passt viel an, die Nutzer verstehen die Anpassungen nicht, und die Akzeptanz ist gering. Auch Khan Academy passt an, was eine Lernende wiederholt („personalized to you“), aber seine öffentliche Hilfeseite druckt die Regel des adaptiven Schritts in einfachen Worten: wann er sich öffnet, was er enthält und was jedes Ergebnis mit dem Level der Lernenden macht. Lesen Sie die Regel und vergleichen Sie sie damit, was AdaptLearn seinen Lernenden sagt.",
  ],
  intro31: [
    "Your task is a prototype of a gamified and personalised platform: a concept for adaptive learning paths, gamification, UX patterns, a concept sketch, prioritised features, a risk analysis and a decision under uncertainty. Khan Academy shows a working version of several of these parts that you can open and test, as one example to compare your plan with, not as the answer.",
    "Ihre Aufgabe ist ein Prototyp einer gamifizierten und personalisierten Plattform: ein Konzept für adaptive Lernpfade, Gamification, UX-Muster, eine Konzeptskizze, priorisierte Funktionen, eine Risikoanalyse und eine Entscheidung unter Unsicherheit. Khan Academy zeigt für mehrere dieser Teile eine funktionierende Version, die Sie öffnen und testen können, als ein Beispiel zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
  ],
  rows21: ROWS_21,
  rows31: ROWS_31,
  discuss21: DISCUSS_21,
  discuss31: DISCUSS_31,
});
