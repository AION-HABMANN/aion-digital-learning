import { defineReference, type P, type RefRow } from "@/data/free/reference";

/**
 * Day 13 · the reference platform of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): edX, a real learning platform that publishes its website accessibility policy.
 * The case is a platform that users with impairments cannot use, with rising complaints and legal risks. Chosen on 28.10.2026 after trying the accessibility pages of Moodle
 * (the documentation asks for a CAPTCHA, which is not completed), Coursera (the page does not exist), openHPI (no accessibility page found) and Khan Academy (a short statement,
 * already the reference of Day 10); edX's page is the most concrete one a learning platform prints. It is the company's own statement of what it does: this course has not tested the
 * site, and the page prints no result of its checks and no list of known problems. It names a standard, not the barriers of the case. The page is dated "Last updated: August 11,
 * 2020". Every row was observed on 28.10.2026 on https://www.edx.org/accessibility. Labels of the real site are quoted in its own language (English).
 */
const VISIT = "28.10.2026";
const POLICY = "https://www.edx.org/accessibility";
const SHOT = { policy: "/real/edx-accessibility-2026-10-28.jpg" };
const W: P = ["Website accessibility policy", "Website accessibility policy"];

const ROWS_21: RefRow[] = [
  {
    topic: ["Materi A2, A3 · WCAG in practice", "Materi A2, A3 · WCAG in der Praxis"],
    problem: ["Users with impairments cannot use the platform", "Nutzer mit Beeinträchtigungen können die Plattform nicht nutzen"],
    did: [
      "The policy names a target: “conform www.edx.org with the Web Content Accessibility Guidelines (‘WCAG’) 2.1 AA” and “provide course authoring tools that permit content providers to post course content that conforms with WCAG 2.1 AA”. It also requires something concrete: “all course videos include timed captions”.",
      "Die Richtlinie nennt ein Ziel: „conform www.edx.org with the Web Content Accessibility Guidelines (‘WCAG’) 2.1 AA“ und „provide course authoring tools that permit content providers to post course content that conforms with WCAG 2.1 AA“. Sie verlangt auch etwas Konkretes: „all course videos include timed captions“.",
    ],
    where: W,
    url: POLICY,
    shot: SHOT.policy,
  },
  {
    topic: ["Materi A5 · prioritising", "Materi A5 · Priorisieren"],
    problem: ["Complaints are increasing", "Die Beschwerden nehmen zu"],
    did: [
      "A channel and a rule for what is reported: “We welcome accessibility-related feedback, including requests for accommodation, through the accessibility@edx.org inbox, which is managed by a knowledgeable edX support team.” And: “We prioritize accessibility bug fixes to ensure they are remedied with the same level of priority as any other equivalent loss of function for individuals without disabilities.”",
      "Ein Kanal und eine Regel dafür, was gemeldet wird: „We welcome accessibility-related feedback, including requests for accommodation, through the accessibility@edx.org inbox, which is managed by a knowledgeable edX support team.“ Und: „We prioritize accessibility bug fixes to ensure they are remedied with the same level of priority as any other equivalent loss of function for individuals without disabilities.“",
    ],
    where: W,
    url: POLICY,
    shot: SHOT.policy,
  },
  {
    topic: ["Materi A1, B1 · who is responsible", "Materi A1, B1 · wer verantwortlich ist"],
    problem: ["There are legal risks", "Es bestehen rechtliche Risiken"],
    did: [
      "The page makes responsibility public: a policy linked from the site, a named role (“a website accessibility specialist … responsible for coordinating edX's responsibilities”), “annual training” on WCAG 2.1 AA for employees and relevant contractors, and the duty of content providers to “comply with their independent obligations under applicable accessibility laws”. The page is dated “Last updated: August 11, 2020”.",
      "Die Seite macht die Verantwortung öffentlich: eine Richtlinie, die von der Website verlinkt ist, eine benannte Rolle („a website accessibility specialist … responsible for coordinating edX's responsibilities“), „annual training“ zu WCAG 2.1 AA für Beschäftigte und relevante Auftragnehmer und die Pflicht der Inhaltsanbieter, „comply with their independent obligations under applicable accessibility laws“. Die Seite trägt das Datum „Last updated: August 11, 2020“.",
    ],
    where: W,
    url: POLICY,
  },
  {
    topic: ["Materi B3 · deciding without knowing how much fails", "Materi B3 · entscheiden, ohne zu wissen, wie viel scheitert"],
    problem: ["Nobody knows how much of the platform fails", "Niemand weiß, wie viel der Plattform scheitert"],
    did: [
      "The policy names how conformance is checked: “a combination of manual code inspection, automated testing using industry-recognized tools, compatibility testing using the most widely used accessibility support tools and, from time to time, review by an independent website accessibility consultant”. The page prints no result of these checks and no list of known problems.",
      "Die Richtlinie nennt, wie die Konformität geprüft wird: „a combination of manual code inspection, automated testing using industry-recognized tools, compatibility testing using the most widely used accessibility support tools and, from time to time, review by an independent website accessibility consultant“. Die Seite druckt kein Ergebnis dieser Prüfungen und keine Liste bekannter Probleme.",
    ],
    where: W,
    url: POLICY,
    shot: SHOT.policy,
  },
];

const ROWS_31: RefRow[] = [
  {
    topic: ["Materi B1 · from requirement to priority", "Materi B1 · von der Anforderung zur Priorität"],
    problem: ["The strategy for implementing WCAG", "Die Strategie zur Umsetzung von WCAG"],
    did: [
      "One standard for two things: the site itself and the tools others use to publish on it (“conform www.edx.org with … WCAG 2.1 AA, … and provide course authoring tools that permit content providers to post course content that conforms”). “We link to this policy from the www.edx.org and distribute it to content providers”, together with “Accessibility Best Practices Guidance for Content Providers”.",
      "Ein Standard für zwei Dinge: die Website selbst und die Werkzeuge, mit denen andere darauf veröffentlichen („conform www.edx.org with … WCAG 2.1 AA, … and provide course authoring tools that permit content providers to post course content that conforms“). „We link to this policy from the www.edx.org and distribute it to content providers“, dazu „Accessibility Best Practices Guidance for Content Providers“.",
    ],
    where: W,
    url: POLICY,
    shot: SHOT.policy,
  },
  {
    topic: ["Materi A5 · impact, effort, risk", "Materi A5 · Wirkung, Aufwand, Risiko"],
    problem: ["The prioritised measures", "Die priorisierten Maßnahmen"],
    did: [
      "Two stated priorities: accessibility bug fixes get “the same level of priority as any other equivalent loss of function for individuals without disabilities”, and “all course videos include timed captions” is a requirement, not a wish.",
      "Zwei genannte Prioritäten: Barrierefreiheitsfehler bekommen „the same level of priority as any other equivalent loss of function for individuals without disabilities“, und „all course videos include timed captions“ ist eine Anforderung, kein Wunsch.",
    ],
    where: W,
    url: POLICY,
  },
  {
    topic: ["Materi A4, B1 · the UX process", "Materi A4, B1 · der UX-Prozess"],
    problem: ["The integration into the UX process", "Die Einbindung in den UX-Prozess"],
    did: [
      "People and routine, not only a standard: a named specialist who coordinates, “annual training to edX employees and relevant contractors on ensuring www.edx.org conforms with WCAG 2.1 AA”, and the policy handed to “relevant edX employees and contractors”.",
      "Menschen und Routine, nicht nur ein Standard: eine benannte Fachperson, die koordiniert, „annual training to edX employees and relevant contractors on ensuring www.edx.org conforms with WCAG 2.1 AA“, und die Richtlinie wird an „relevant edX employees and contractors“ verteilt.",
    ],
    where: W,
    url: POLICY,
  },
  {
    topic: ["Materi B1 · measure it", "Materi B1 · es messen"],
    problem: ["The evaluation approach: how you measure it", "Der Bewertungsansatz: wie Sie es messen"],
    did: [
      "Four kinds of check are named: manual code inspection, automated testing with “industry-recognized tools”, compatibility testing with “the most widely used accessibility support tools”, and, “from time to time”, an independent consultant. Each finds something the others can miss. The page prints no result of any of them.",
      "Vier Arten von Prüfung sind genannt: manuelle Code-Prüfung, automatisierte Tests mit „industry-recognized tools“, Kompatibilitätstests mit „the most widely used accessibility support tools“ und „from time to time“ eine unabhängige Beratung. Jede findet etwas, das die anderen übersehen können. Die Seite druckt kein Ergebnis davon.",
    ],
    where: W,
    url: POLICY,
    shot: SHOT.policy,
  },
  {
    topic: ["Materi B2 · accessibility against cost", "Materi B2 · Barrierefreiheit gegen Kosten"],
    problem: ["A risk analysis: costs against benefits", "Eine Risikoanalyse: Kosten gegen Nutzen"],
    did: [
      "The page prints no cost, no benefit and no list of known gaps. What it says about the risk of not finishing is one sentence: “As with any rapidly advancing technology platform, enhancement of accessibility at edX is an ongoing process.” The commitments are public, which is also what a complaint or a legal claim would be measured against.",
      "Die Seite druckt keine Kosten, keinen Nutzen und keine Liste bekannter Lücken. Was sie über das Risiko sagt, nicht fertig zu werden, ist ein Satz: „As with any rapidly advancing technology platform, enhancement of accessibility at edX is an ongoing process.“ Die Zusagen sind öffentlich, und daran würde auch eine Beschwerde oder ein rechtlicher Anspruch gemessen.",
    ],
    where: W,
    url: POLICY,
  },
  {
    topic: ["Materi B3 · a decision you can check later", "Materi B3 · eine Entscheidung, die Sie später prüfen können"],
    problem: ["One decision under uncertainty, on purpose", "Eine Entscheidung unter Unsicherheit, mit Absicht"],
    did: [
      "The page keeps a way to learn where it fails after the decision: “We welcome accessibility-related feedback … through the accessibility@edx.org inbox”, and calls the work “an ongoing process”. The policy is dated August 11, 2020.",
      "Die Seite hält einen Weg offen, nach der Entscheidung zu erfahren, wo es scheitert: „We welcome accessibility-related feedback … through the accessibility@edx.org inbox“, und nennt die Arbeit „an ongoing process“. Die Richtlinie trägt das Datum 11. August 2020.",
    ],
    where: W,
    url: POLICY,
  },
];

const DISCUSS_21: P[] = [
  ["Which of AccessLearn's three problems (users cannot use it, complaints, legal risks) does the policy answer, and which does it leave open?", "Welche der drei Probleme von AccessLearn (Nutzer kommen nicht zurecht, Beschwerden, rechtliche Risiken) beantwortet die Richtlinie, und welche lässt sie offen?"],
  ["The policy names a standard, not the barriers. Which of AccessLearn's barriers (low contrast, a small font, a complex navigation) would WCAG 2.1 AA make you fix, and which only help?", "Die Richtlinie nennt einen Standard, nicht die Barrieren. Welche Barrieren von AccessLearn (geringer Kontrast, kleine Schrift, komplexe Navigation) würde WCAG 2.1 AA Sie beheben lassen, und welche helfen nur?"],
  ["edX requires timed captions on all course videos. Which content in AccessLearn has no alternative today (the chart without a description, the video without captions)?", "edX verlangt zeitlich abgestimmte Untertitel für alle Kursvideos. Welche Inhalte in AccessLearn haben heute keine Alternative (das Diagramm ohne Beschreibung, das Video ohne Untertitel)?"],
  ["The page prints no result of its checks. How would you find out the real state of AccessLearn, and who would you ask?", "Die Seite druckt kein Ergebnis ihrer Prüfungen. Wie würden Sie den tatsächlichen Stand von AccessLearn herausfinden, und wen würden Sie fragen?"],
];
const DISCUSS_31: P[] = [
  ["Which of edX's commitments (a standard, a priority rule, a named specialist, training, checks, a feedback inbox) would you put into your strategy first, and which later?", "Welche Zusagen von edX (ein Standard, eine Prioritätsregel, eine benannte Fachperson, Schulung, Prüfungen, ein Feedback-Postfach) würden Sie zuerst in Ihre Strategie aufnehmen, und welche später?"],
  ["Who is responsible for accessibility in your process, and at which step of the UX process does a check happen? (Materi B1)", "Wer ist in Ihrem Prozess für Barrierefreiheit verantwortlich, und bei welchem Schritt des UX-Prozesses findet eine Prüfung statt? (Materi B1)"],
  ["edX names four kinds of check. Which would you use for AccessLearn, and what does each find that the others miss?", "edX nennt vier Arten von Prüfung. Welche würden Sie für AccessLearn einsetzen, und was findet jede, das die anderen übersehen?"],
  ["The policy is dated August 11, 2020. How would you keep a commitment current, and how would you tell users when it changed? (Materi B3)", "Die Richtlinie trägt das Datum 11. August 2020. Wie würden Sie eine Zusage aktuell halten, und wie würden Sie Nutzern sagen, wann sie sich geändert hat? (Materi B3)"],
];

export const { REF_21, REF_31, REF_CARD_21, REF_CARD_31 } = defineReference({
  name: "edX",
  visit: VISIT,
  site: {
    url: POLICY,
    page: ["the page “Website accessibility policy”", "die Seite „Website accessibility policy“"],
    shot: SHOT.policy,
    note: ["Open the page in a new tab to read all of it.", "Öffnen Sie die Seite in einem neuen Tab, um sie ganz zu lesen."],
  },
  intro21: [
    "AccessLearn's users with impairments cannot use the platform, complaints are increasing and there are legal risks. edX is a real learning platform that publishes its accessibility policy on its site. It is the company's own statement of what it does; this course has not tested the site, and the page prints no results and no known problems. Read what it commits to and compare it with what AccessLearn does.",
    "Die Nutzer mit Beeinträchtigungen von AccessLearn können die Plattform nicht nutzen, die Beschwerden nehmen zu, und es bestehen rechtliche Risiken. edX ist eine echte Lernplattform, die ihre Richtlinie zur Barrierefreiheit auf ihrer Website veröffentlicht. Es ist die eigene Aussage des Unternehmens darüber, was es tut; dieser Kurs hat die Website nicht getestet, und die Seite druckt weder Ergebnisse noch bekannte Probleme. Lesen Sie, wozu es sich verpflichtet, und vergleichen Sie es mit dem, was AccessLearn tut.",
  ],
  intro31: [
    "Your task is a strategy: implementing WCAG, prioritised measures, the integration into the UX process, how you measure it, a risk analysis of costs against benefits and a decision under uncertainty. edX's published policy is one worked example of such a strategy in the company's own words, as a statement of intent. Use it to compare your plan with, not as the answer.",
    "Ihre Aufgabe ist eine Strategie: die Umsetzung von WCAG, priorisierte Maßnahmen, die Einbindung in den UX-Prozess, wie Sie es messen, eine Risikoanalyse von Kosten gegen Nutzen und eine Entscheidung unter Unsicherheit. Die veröffentlichte Richtlinie von edX ist ein ausgearbeitetes Beispiel für eine solche Strategie in den eigenen Worten des Unternehmens, als Absichtserklärung. Nutzen Sie sie zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
  ],
  rows21: ROWS_21,
  rows31: ROWS_31,
  discuss21: DISCUSS_21,
  discuss31: DISCUSS_31,
});
