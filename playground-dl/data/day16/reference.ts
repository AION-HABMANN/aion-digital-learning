import { defineReference, type P, type RefRow } from "@/data/free/reference";

/**
 * Day 16 · the reference platform of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): Khan Academy's "Impact" page. The case is a platform with extensive tracking data, a drop-out
 * rate that persists and measures that show no effect. Chosen on 28.10.2026 because it is the one public page of a learning platform checked that says what it counts, separates a
 * usage correlation from a cause, and names how strong each kind of evidence is. The page is the company's own, and part of its pitch to districts (it carries "Request demo" buttons):
 * the figures on it ("6X", "60+ skills a year", "200,000+ students") and its description of the studies are the company's own; this course has not reviewed the studies. Every row
 * was observed on 28.10.2026 on https://www.khanacademy.org/about/impact. No row is written for prioritised measures (the page shows none). Labels of the real site are quoted
 * in its own language (English).
 */
const VISIT = "28.10.2026";
const IMPACT = "https://www.khanacademy.org/about/impact";
const SHOT = { top: "/real/khan-impact-top-2026-10-28.jpg", tiers: "/real/khan-impact-tiers-2026-10-28.jpg" };
const W: P = ["Page “Impact”", "Seite „Impact“"];

const ROWS_21: RefRow[] = [
  {
    topic: ["Materi A2 · tracking and KPIs", "Materi A2 · Tracking und KPIs"],
    problem: ["Extensive tracking data, but no clear central measure", "Umfangreiche Tracking-Daten, aber keine klare zentrale Messgröße"],
    did: [
      "The page picks one unit to count and says why: “Practice on Khan Academy builds skills. Skills build measurable academic growth.” Its headline figure is that unit: “Each additional skill mastered is associated with measurable gains.” Time on the site and clicks are not the headline.",
      "Die Seite wählt eine Einheit zum Zählen und sagt warum: „Practice on Khan Academy builds skills. Skills build measurable academic growth.“ Ihre Kernzahl ist diese Einheit: „Each additional skill mastered is associated with measurable gains.“ Zeit auf der Website und Klicks sind nicht die Kernzahl.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.top,
  },
  {
    topic: ["Materi A3 · symptoms, causes, misreadings", "Materi A3 · Symptome, Ursachen, Fehldeutungen"],
    problem: ["The measures show no effect", "Die Maßnahmen zeigen keine Wirkung"],
    did: [
      "The page keeps usage and cause apart. Its standard for “high-stakes decisions” is that evidence is “Causal — not just usage correlations”, and it labels three kinds: Tier 1 “RCTs across multiple countries”, Tier 2 “Large-scale real-world studies” (“increased Khan Academy usage is linked to stronger test score growth”), Tier 3 “Correlational studies with controls”.",
      "Die Seite hält Nutzung und Ursache auseinander. Ihr Maßstab für „high-stakes decisions“ ist, dass Belege „Causal — not just usage correlations“ sind, und sie benennt drei Arten: Stufe 1 „RCTs across multiple countries“, Stufe 2 „Large-scale real-world studies“ („increased Khan Academy usage is linked to stronger test score growth“), Stufe 3 „Correlational studies with controls“.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.tiers,
  },
  {
    topic: ["Materi A2 · defining a KPI", "Materi A2 · eine KPI definieren"],
    problem: ["The drop-out stays high: which figure counts as success?", "Die Abbruchquote bleibt hoch: Welche Zahl zählt als Erfolg?"],
    did: [
      "A KPI is defined as a count over a period: “Khan Academy District students are 6X more likely to get 60+ skills a year”, and “recommended practice levels”. This is the company's own figure from a page that also offers a demo to districts, so it is to be read as a claim, with the evidence tiers beside it.",
      "Eine KPI ist als Zählung über einen Zeitraum definiert: „Khan Academy District students are 6X more likely to get 60+ skills a year“ und „recommended practice levels“. Das ist die eigene Zahl des Unternehmens von einer Seite, die Bezirken auch eine Demo anbietet; sie ist also als Behauptung zu lesen, mit den Belegstufen daneben.",
    ],
    where: W,
    url: IMPACT,
  },
  {
    topic: ["Materi A1 · A/B tests, observation", "Materi A1 · A/B-Tests, Beobachtung"],
    problem: ["How a measure is tested", "Wie eine Maßnahme getestet wird"],
    did: [
      "The page names the most rigorous test: “Implementation amplifies impact as seen in a randomized controlled trial”, and Tier 1: “RCTs across multiple countries show significant math score gains when students regularly use Khan Academy”. A randomised trial is a controlled comparison of two groups, not a before-and-after.",
      "Die Seite nennt den strengsten Test: „Implementation amplifies impact as seen in a randomized controlled trial“ und Stufe 1: „RCTs across multiple countries show significant math score gains when students regularly use Khan Academy“. Ein randomisierter Versuch ist ein kontrollierter Vergleich zweier Gruppen, kein Vorher-Nachher.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.tiers,
  },
];

const ROWS_31: RefRow[] = [
  {
    topic: ["Materi B1 · KPI, hypothesis, test, decision", "Materi B1 · KPI, Hypothese, Test, Entscheidung"],
    problem: ["The definition of the central KPIs", "Die Definition der zentralen KPIs"],
    did: [
      "One central unit, stated twice: the count of skills mastered (“+1 Skill”) and a yearly level of it (“60+ skills a year”, with “recommended practice levels”). Each KPI says what is counted and over what period, so two people would count the same thing.",
      "Eine zentrale Einheit, zweimal genannt: die Zahl der gemeisterten Skills („+1 Skill“) und ein Jahreswert davon („60+ skills a year“, mit „recommended practice levels“). Jede KPI sagt, was gezählt wird und über welchen Zeitraum, sodass zwei Personen dasselbe zählen würden.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.top,
  },
  {
    topic: ["Materi A2 · tracking, data protection", "Materi A2 · Tracking, Datenschutz"],
    problem: ["The analysis and tracking strategy", "Die Analyse- und Tracking-Strategie"],
    did: [
      "The chain is written out, from practice to an outcome measured outside the platform: practice builds skills, skills build growth, and the outcome is a state test. The company describes a study of “200,000+ students” that “found that mastering more skills on Khan Academy corresponded with higher state math scores”. That is the company's description; this course has not reviewed the study.",
      "Die Kette ist ausgeschrieben, von der Übung bis zu einem Ergebnis, das außerhalb der Plattform gemessen wird: Übung baut Skills auf, Skills bauen Wachstum auf, und das Ergebnis ist ein Staatstest. Das Unternehmen beschreibt eine Studie mit „200,000+ students“, die „found that mastering more skills on Khan Academy corresponded with higher state math scores“. Das ist die Beschreibung des Unternehmens; dieser Kurs hat die Studie nicht geprüft.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.top,
  },
  {
    topic: ["Materi A4 · hypothesis, test, evaluate, repeat", "Materi A4 · Hypothese, Test, Auswertung, Wiederholung"],
    problem: ["The hypotheses for improvement", "Die Hypothesen für Verbesserungen"],
    did: [
      "A testable claim, with the test named: support around the platform raises the effect of using it (“+Support: Implementation amplifies impact as seen in a randomized controlled trial”). The claim names what changes (support) and what is compared, so it can be wrong.",
      "Eine prüfbare Behauptung, mit genanntem Test: Begleitung rund um die Plattform erhöht die Wirkung ihrer Nutzung („+Support: Implementation amplifies impact as seen in a randomized controlled trial“). Die Behauptung nennt, was sich ändert (Begleitung) und was verglichen wird, sodass sie falsch sein kann.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.top,
  },
  {
    topic: ["Materi B1, B2 · data against intuition", "Materi B1, B2 · Daten gegen Intuition"],
    problem: ["The decision architecture for data-driven UX", "Die Entscheidungsarchitektur für datengestützte UX"],
    did: [
      "The page publishes its rule for how strong evidence must be, by the stakes: “In high-stakes decisions, research should be: Independent — reviewed by academic peers; Large-scale — not a small pilot or selective sample; Causal — not just usage correlations; Transparent — publicly available and replicable.” Then three tiers that say how far each kind of evidence carries.",
      "Die Seite veröffentlicht ihre Regel dafür, wie stark Belege je nach Tragweite sein müssen: „In high-stakes decisions, research should be: Independent — reviewed by academic peers; Large-scale — not a small pilot or selective sample; Causal — not just usage correlations; Transparent — publicly available and replicable.“ Dann drei Stufen, die sagen, wie weit jede Art von Beleg trägt.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.tiers,
  },
  {
    topic: ["Materi B3 · deciding when the causes are unclear", "Materi B3 · entscheiden, wenn die Ursachen unklar sind"],
    problem: ["One decision under uncertainty, on purpose", "Eine Entscheidung unter Unsicherheit, mit Absicht"],
    did: [
      "Weaker evidence is labelled as weaker: Tier 3 is called “Promising evidence” (“students who practice more on Khan Academy tend to achieve higher math outcomes”), not strong, and the page adds “One study can show promise. Many studies show a pattern” A decision can be made on it, with the label attached.",
      "Schwächere Belege sind als schwächer gekennzeichnet: Stufe 3 heißt „Promising evidence“ („students who practice more on Khan Academy tend to achieve higher math outcomes“), nicht stark, und die Seite ergänzt „One study can show promise. Many studies show a pattern“ Auf dieser Grundlage kann entschieden werden, mit dem Etikett daran.",
    ],
    where: W,
    url: IMPACT,
    shot: SHOT.tiers,
  },
];

const DISCUSS_21: P[] = [
  ["DataLearn tracks a lot and its measures show no effect. What does Khan Academy count instead, and why might one clear unit be a better key figure than many?", "DataLearn erfasst viel, und seine Maßnahmen zeigen keine Wirkung. Was zählt Khan Academy stattdessen, und warum könnte eine klare Einheit eine bessere Kennzahl sein als viele?"],
  ["The page separates “usage correlations” from cause. Which of the measures DataLearn tried tested a cause, and which only compared before and after?", "Die Seite trennt „usage correlations“ von Ursache. Welche der Maßnahmen, die DataLearn ausprobiert hat, haben eine Ursache getestet, und welche nur vorher und nachher verglichen?"],
  ["“6X more likely to get 60+ skills a year” is the company's own figure, on a page that also offers a demo. How would you read a figure like that, and what would you ask before you used it?", "„6X more likely to get 60+ skills a year“ ist die eigene Zahl des Unternehmens, auf einer Seite, die auch eine Demo anbietet. Wie würden Sie eine solche Zahl lesen, und was würden Sie fragen, bevor Sie sie nutzen?"],
  ["Which three figures would you define as DataLearn's KPIs, saying what is counted and over what period?", "Welche drei Zahlen würden Sie als KPIs von DataLearn definieren, und was wird gezählt und über welchen Zeitraum?"],
];
const DISCUSS_31: P[] = [
  ["Which unit would you count for DataLearn instead of clicks and time, and what would you need to track to count it? What does data protection ask of that tracking? (Materi A2)", "Welche Einheit würden Sie bei DataLearn statt Klicks und Zeit zählen, und was müssten Sie erfassen, um sie zu zählen? Was verlangt der Datenschutz von diesem Tracking? (Materi A2)"],
  ["Which of Khan Academy's four standards for strong evidence (independent, large-scale, causal, transparent) can DataLearn meet with its own data, and which not?", "Welche der vier Maßstäbe von Khan Academy für starke Belege (unabhängig, groß angelegt, kausal, transparent) kann DataLearn mit seinen eigenen Daten erfüllen, und welche nicht?"],
  ["Write one hypothesis for DataLearn in the form “if we change X, Y changes, and we test it by Z”. What would show that it is wrong? (Materi A4)", "Schreiben Sie eine Hypothese für DataLearn in der Form „wenn wir X ändern, ändert sich Y, und wir testen es durch Z“. Was würde zeigen, dass sie falsch ist? (Materi A4)"],
  ["Khan Academy labels Tier 3 “promising”, not “strong”. How would you label the evidence behind your own decision, and what would make you change it? (Materi B3)", "Khan Academy nennt Stufe 3 „promising“, nicht „strong“. Wie würden Sie die Belege hinter Ihrer eigenen Entscheidung kennzeichnen, und was würde Sie zum Ändern bringen? (Materi B3)"],
];

export const { REF_21, REF_31, REF_CARD_21, REF_CARD_31 } = defineReference({
  name: "Khan Academy",
  visit: VISIT,
  site: {
    url: IMPACT,
    page: ["the page “Impact”", "die Seite „Impact“"],
    shot: SHOT.top,
    note: ["Khan Academy loads empty inside another page, so open it in a new tab to read all of it.", "Khan Academy lädt in einer anderen Seite leer; öffnen Sie es in einem neuen Tab, um die ganze Seite zu lesen."],
  },
  intro21: [
    "DataLearn has extensive tracking data, a drop-out rate that persists and measures that show no effect. Khan Academy's Impact page says what it counts (skills mastered), separates a usage correlation from a cause and labels how strong each kind of evidence is. It is the company's own page and part of its pitch to districts, so read the figures as claims. Compare how it handles data with how DataLearn does.",
    "DataLearn hat umfangreiche Tracking-Daten, eine Abbruchquote, die bestehen bleibt, und Maßnahmen, die keine Wirkung zeigen. Die Impact-Seite von Khan Academy sagt, was sie zählt (gemeisterte Skills), trennt eine Nutzungskorrelation von einer Ursache und kennzeichnet, wie stark jede Art von Beleg ist. Es ist die eigene Seite des Unternehmens und Teil seiner Ansprache an Bezirke; lesen Sie die Zahlen also als Behauptungen. Vergleichen Sie, wie sie mit Daten umgeht, mit dem, wie DataLearn es tut.",
  ],
  intro31: [
    "Your task is a data-driven strategy: the central KPIs, an analysis and tracking strategy, hypotheses for improvement, prioritised measures, a decision architecture for data-driven UX and one decision under uncertainty. Khan Academy's Impact page shows one worked example in the company's own words: one unit counted, a chain from practice to outcome, a tested claim and a rule for how strong evidence must be. Use it to compare your plan with, not as the answer.",
    "Ihre Aufgabe ist eine datengestützte Strategie: die zentralen KPIs, eine Analyse- und Tracking-Strategie, Hypothesen für Verbesserungen, priorisierte Maßnahmen, eine Entscheidungsarchitektur für datengestützte UX und eine Entscheidung unter Unsicherheit. Die Impact-Seite von Khan Academy zeigt ein ausgearbeitetes Beispiel in den eigenen Worten des Unternehmens: eine gezählte Einheit, eine Kette von der Übung zum Ergebnis, eine geprüfte Behauptung und eine Regel dafür, wie stark Belege sein müssen. Nutzen Sie es zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
  ],
  rows21: ROWS_21,
  rows31: ROWS_31,
  discuss21: DISCUSS_21,
  discuss31: DISCUSS_31,
});
