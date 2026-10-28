import { defineReference, type P, type RefRow } from "@/data/free/reference";

/**
 * Day 15 · the reference platform of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): Khan Academy on a phone. The case is a platform optimised for desktop, with sharply rising
 * mobile use and a high drop-out rate on smartphones. Chosen on 28.10.2026 because it is the one platform checked whose public pages show a practice page at phone width without an
 * account (Duolingo's start page is already the real tab of the Route 2 window; its product needs an account). The help center says honestly that a PC or laptop is its "top choice",
 * and that it recommends tablets and phones too. The pages read print no usage or drop-out figures by device. Every row was observed on 28.10.2026: the practice page "Evaluating
 * expressions with one variable" at 375 px, and the help articles "What devices and browsers work best for Khan Academy?" and "How can I use Khan Academy without an internet
 * connection?" (with its example phone screen). Labels of the real site are quoted in its own language (English).
 */
const VISIT = "28.10.2026";
const PRACTICE = "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:intro-variables/e/evaluating_expressions_1";
const DEVICES = "https://support.khanacademy.org/hc/en-us/articles/204795430-What-devices-and-browsers-work-best-for-Khan-Academy";
const OFFLINE = "https://support.khanacademy.org/hc/en-us/articles/202487370-How-can-I-use-Khan-Academy-without-an-internet-connection";
const SHOT = { phone: "/real/khan-mobile-exercise-2026-10-28.jpg", offline: "/real/khan-offline-2026-10-28.jpg" };
const W_PRACTICE: P = ["Practice “Evaluating expressions with one variable”, at phone width", "Übung „Evaluating expressions with one variable“, in Handybreite"];
const W_DEVICES: P = ["Help article “What devices and browsers work best for Khan Academy?”", "Hilfeartikel „What devices and browsers work best for Khan Academy?“"];
const W_OFFLINE: P = ["Help article “How can I use Khan Academy without an internet connection?”", "Hilfeartikel „How can I use Khan Academy without an internet connection?“"];

const ROWS_21: RefRow[] = [
  {
    topic: ["Materi A3 · responsive and cross-device design", "Materi A3 · Responsive und geräteübergreifendes Design"],
    problem: ["The platform is optimised for desktop", "Die Plattform ist für den Desktop optimiert"],
    did: [
      "The same practice page at phone width (375 px) is rearranged, not shrunk: the lesson list is hidden, the strip at the top keeps only the streak and the level, the problem and its answer field take the width, and a bottom bar keeps the progress circles, “Skip” and a wide “Check” button within reach of the thumb.",
      "Dieselbe Übungsseite in Handybreite (375 px) ist umgebaut, nicht verkleinert: Die Lektionsliste ist ausgeblendet, der Streifen oben behält nur Streak und Level, die Aufgabe und ihr Antwortfeld nutzen die Breite, und eine untere Leiste hält die Fortschrittskreise, „Skip“ und einen breiten „Check“-Button in Daumenreichweite.",
    ],
    where: W_PRACTICE,
    url: PRACTICE,
    shot: SHOT.phone,
  },
  {
    topic: ["Materi A1 · the mobile context of use", "Materi A1 · der mobile Nutzungskontext"],
    problem: ["The drop-out rate on smartphones is high", "Die Abbruchquote auf Smartphones ist hoch"],
    did: [
      "A learner on the go can prepare for losing the connection: “downloading the videos on the Khan Academy app so that you can watch them while you're offline”. The steps are short (bookmark the video, tap download) and there is a setting for quality (“Download settings”, for example HD). For places that are always offline, the page points to another tool, Kolibri.",
      "Eine Lernende unterwegs kann sich auf den Verlust der Verbindung vorbereiten: „downloading the videos on the Khan Academy app so that you can watch them while you're offline“. Die Schritte sind kurz (Video merken, auf Download tippen), und es gibt eine Einstellung für die Qualität („Download settings“, zum Beispiel HD). Für Orte, die dauerhaft offline sind, verweist die Seite auf ein anderes Werkzeug, Kolibri.",
    ],
    where: W_OFFLINE,
    url: OFFLINE,
    shot: SHOT.offline,
  },
  {
    topic: ["Materi A2 · microlearning", "Materi A2 · Microlearning"],
    problem: ["Mobile use is rising: learners have little time", "Die mobile Nutzung steigt: Lernende haben wenig Zeit"],
    did: [
      "Units are short and each has one purpose. The practice asks for a small set (“Do 4 problems”, four circles that fill one by one), a related video is listed with its length (“2:00”), and the example phone screen in the offline article shows a video “Counting with small numbers” of 00:56.",
      "Die Einheiten sind kurz und haben je ein Ziel. Die Übung verlangt einen kleinen Satz („Do 4 problems“, vier Kreise, die sich nacheinander füllen), ein verwandtes Video ist mit seiner Länge aufgeführt („2:00“), und der Beispiel-Handybildschirm im Offline-Artikel zeigt ein Video „Counting with small numbers“ von 00:56.",
    ],
    where: [`${W_PRACTICE[0]} and ${W_OFFLINE[0]}`, `${W_PRACTICE[1]} und ${W_OFFLINE[1]}`],
    url: OFFLINE,
    shot: SHOT.offline,
  },
];

const ROWS_31: RefRow[] = [
  {
    topic: ["Materi B1 · mobile UX as a strategy of its own", "Materi B1 · mobile UX als eigene Strategie"],
    problem: ["The mobile learning strategy", "Die Mobile-Learning-Strategie"],
    did: [
      "Two ways onto a phone, both named: “download the iOS/Android app or use Khan Academy through the mobile browser”. The help center is also honest about the ranking: “Our top choice would be PCs and laptops”, and “We also recommend tablets and mobile devices”.",
      "Zwei Wege aufs Handy, beide genannt: „download the iOS/Android app or use Khan Academy through the mobile browser“. Das Help Center ist auch ehrlich bei der Rangfolge: „Our top choice would be PCs and laptops“ und „We also recommend tablets and mobile devices“.",
    ],
    where: W_DEVICES,
    url: DEVICES,
  },
  {
    topic: ["Materi A2 · short units with one objective", "Materi A2 · kurze Einheiten mit einem Ziel"],
    problem: ["The microlearning concept", "Das Microlearning-Konzept"],
    did: [
      "A lesson is a list of small items, each a video or an exercise with one purpose (for example “What is a variable?” and “Evaluating expressions with one variable”), and the practice at the end is a set of four problems. The page does not say how long a unit should be; it shows lengths on the items (“2:00”, “00:56”).",
      "Eine Lektion ist eine Liste kleiner Einträge, jeweils ein Video oder eine Übung mit einem Ziel (zum Beispiel „What is a variable?“ und „Evaluating expressions with one variable“), und die Übung am Ende ist ein Satz aus vier Aufgaben. Die Seite sagt nicht, wie lang eine Einheit sein soll; sie zeigt Längen an den Einträgen („2:00“, „00:56“).",
    ],
    where: [`${W_PRACTICE[0]} and ${W_OFFLINE[0]}`, `${W_PRACTICE[1]} und ${W_OFFLINE[1]}`],
    url: PRACTICE,
    shot: SHOT.offline,
  },
  {
    topic: ["Materi A3 · prioritise, reduce, synchronise", "Materi A3 · priorisieren, reduzieren, synchronisieren"],
    problem: ["The cross-device UX approach", "Der geräteübergreifende UX-Ansatz"],
    did: [
      "One practice, two layouts. At desktop width the lesson list, the exercise and the footer bar are side by side; at 375 px the list is hidden and the main action moves to a fixed bottom bar. What is only on the phone is stated: downloads for offline use are described for “the Khan Academy app”.",
      "Eine Übung, zwei Layouts. In Desktopbreite stehen Lektionsliste, Aufgabe und Fußleiste nebeneinander; bei 375 px ist die Liste ausgeblendet, und die Hauptaktion wandert in eine feste untere Leiste. Was nur auf dem Handy geht, steht da: Downloads für die Offline-Nutzung sind für „the Khan Academy app“ beschrieben.",
    ],
    where: [`${W_PRACTICE[0]} and ${W_OFFLINE[0]}`, `${W_PRACTICE[1]} und ${W_OFFLINE[1]}`],
    url: PRACTICE,
    shot: SHOT.phone,
  },
  {
    topic: ["Materi A4 · real phones, real settings", "Materi A4 · echte Handys, echte Situationen"],
    problem: ["The testing and optimisation strategy", "Die Test- und Optimierungsstrategie"],
    did: [
      "What it commits to support is listed and versioned: the latest versions of “Google Chrome, Firefox, Microsoft Edge, Safari”, and for the app “Version 8.3.1 or later on Android 9 or higher” and “Version 8.3.2 or later on iOS 15 or higher”. It adds what users get outside the list: “If you use an unsupported browser, you may encounter more bugs.” The page prints no test result.",
      "Was es zu unterstützen zusagt, ist aufgelistet und mit Versionen versehen: die neuesten Versionen von „Google Chrome, Firefox, Microsoft Edge, Safari“ und für die App „Version 8.3.1 or later on Android 9 or higher“ und „Version 8.3.2 or later on iOS 15 or higher“. Es ergänzt, was Nutzer außerhalb der Liste bekommen: „If you use an unsupported browser, you may encounter more bugs.“ Die Seite druckt kein Testergebnis.",
    ],
    where: W_DEVICES,
    url: DEVICES,
  },
  {
    topic: ["Materi A5, B2 · mobile against desktop", "Materi A5, B2 · mobil gegen Desktop"],
    problem: ["The prioritised measures and a risk analysis", "Die priorisierten Maßnahmen und eine Risikoanalyse"],
    did: [
      "Visible trade-offs, each to weigh and not a verdict: desktop is named the “top choice” while phones are “also recommended”; offline use is limited to downloaded videos (“If you will be without an Internet connection only temporarily”) and a permanently offline place needs another tool; an app means version requirements the learner must meet.",
      "Sichtbare Abwägungen, jeweils zu wiegen und kein Urteil: Der Desktop wird die „top choice“ genannt, Handys werden „also recommended“; Offline-Nutzung ist auf heruntergeladene Videos begrenzt („If you will be without an Internet connection only temporarily“), und ein dauerhaft offline gelegener Ort braucht ein anderes Werkzeug; eine App bedeutet Versionsanforderungen, die die Lernende erfüllen muss.",
    ],
    where: [`${W_DEVICES[0]} and ${W_OFFLINE[0]}`, `${W_DEVICES[1]} und ${W_OFFLINE[1]}`],
    url: DEVICES,
  },
  {
    topic: ["Materi B3 · deciding without data by device", "Materi B3 · entscheiden ohne Daten pro Gerät"],
    problem: ["One decision under uncertainty, on purpose", "Eine Entscheidung unter Unsicherheit, mit Absicht"],
    did: [
      "The pages read for this analysis print no usage, retention or drop-out figures by device. What they show is a decision that does not depend on them: the same practice works in a browser at desktop and phone width, and the app is offered as an addition.",
      "Die für diese Analyse gelesenen Seiten drucken keine Nutzungs-, Bindungs- oder Abbruchzahlen pro Gerät. Sie zeigen eine Entscheidung, die nicht davon abhängt: Dieselbe Übung funktioniert im Browser in Desktop- und in Handybreite, und die App wird als Ergänzung angeboten.",
    ],
    where: [`${W_PRACTICE[0]} and ${W_DEVICES[0]}`, `${W_PRACTICE[1]} und ${W_DEVICES[1]}`],
    url: DEVICES,
  },
];

const DISCUSS_21: P[] = [
  ["Which of MobileLearn's three problems does Khan Academy's phone view answer? What does it hide at phone width, what does it keep, and what would MobileLearn have to decide the same way?", "Welche der drei Probleme von MobileLearn beantwortet die Handyansicht von Khan Academy? Was blendet sie in Handybreite aus, was behält sie, und was müsste MobileLearn genauso entscheiden?"],
  ["Khan Academy lets a learner download a video before going offline. What does a MobileLearn learner on a train need, and what would you give them?", "Khan Academy lässt eine Lernende ein Video herunterladen, bevor sie offline geht. Was braucht eine Lernende von MobileLearn im Zug, und was würden Sie ihr geben?"],
  ["The help center calls PCs and laptops its “top choice” and recommends phones too. What does that say about designing mobile first, and what would you say to the team?", "Das Help Center nennt PCs und Laptops seine „top choice“ und empfiehlt auch Handys. Was sagt das über Mobile-first-Design, und was würden Sie dem Team sagen?"],
];
const DISCUSS_31: P[] = [
  ["The practice is a set of four problems and a video is 56 seconds to 2 minutes. How long should a MobileLearn unit be, who decides, and what is the risk of too short? (Materi A2)", "Die Übung ist ein Satz aus vier Aufgaben, und ein Video dauert 56 Sekunden bis 2 Minuten. Wie lang sollte eine Einheit bei MobileLearn sein, wer entscheidet, und was ist das Risiko, wenn sie zu kurz ist? (Materi A2)"],
  ["Which parts of your plan belong in the browser, which in an app, and what does an app ask of the learner and the team (versions, updates)? (Materi A3)", "Welche Teile Ihres Plans gehören in den Browser, welche in eine App, und was verlangt eine App von der Lernenden und vom Team (Versionen, Updates)? (Materi A3)"],
  ["Khan Academy lists what it supports. What would you commit to support for MobileLearn, and which real phones and situations would you test on? (Materi A4)", "Khan Academy listet auf, was es unterstützt. Was würden Sie für MobileLearn zu unterstützen zusagen, und auf welchen echten Handys und in welchen Situationen würden Sie testen? (Materi A4)"],
  ["You decide without data by device. What could you watch after the first step to see whether it works, and when would you reverse it? (Materi B3)", "Sie entscheiden ohne Daten pro Gerät. Was könnten Sie nach dem ersten Schritt beobachten, um zu sehen, ob es wirkt, und wann würden Sie es zurücknehmen? (Materi B3)"],
];

export const { REF_21, REF_31, REF_CARD_21, REF_CARD_31 } = defineReference({
  name: "Khan Academy",
  visit: VISIT,
  site: {
    url: PRACTICE,
    page: ["a practice page at phone width (375 px)", "eine Übungsseite in Handybreite (375 px)"],
    shot: SHOT.phone,
    phone: true,
    note: ["Khan Academy loads empty inside another page, so open it in a new tab (and narrow the window) to use it.", "Khan Academy lädt in einer anderen Seite leer; öffnen Sie es in einem neuen Tab (und machen Sie das Fenster schmal), um es zu nutzen."],
  },
  intro21: [
    "MobileLearn is optimised for desktop, mobile use is rising sharply and the drop-out rate on smartphones is high. Khan Academy's public practice page works at phone width without an account, and its help center describes how a learner on the go keeps learning offline. Open the practice page at a narrow width, read the help pages and compare.",
    "MobileLearn ist für den Desktop optimiert, die mobile Nutzung steigt stark, und die Abbruchquote auf Smartphones ist hoch. Die öffentliche Übungsseite von Khan Academy funktioniert in Handybreite ohne Konto, und ihr Help Center beschreibt, wie eine Lernende unterwegs offline weiterlernt. Öffnen Sie die Übungsseite in schmaler Breite, lesen Sie die Hilfeseiten und vergleichen Sie.",
  ],
  intro31: [
    "Your task is a mobile strategy: a mobile learning strategy, a microlearning concept, a cross-device UX approach, a testing and optimisation strategy, prioritised measures with a risk analysis and a decision under uncertainty. Khan Academy shows a working version of several of these parts, and says openly that a PC is its top choice. Use it to compare your plan with, not as the answer.",
    "Ihre Aufgabe ist eine Mobile-Strategie: eine Mobile-Learning-Strategie, ein Microlearning-Konzept, ein geräteübergreifender UX-Ansatz, eine Test- und Optimierungsstrategie, priorisierte Maßnahmen mit Risikoanalyse und eine Entscheidung unter Unsicherheit. Khan Academy zeigt für mehrere dieser Teile eine funktionierende Version und sagt offen, dass ein PC die erste Wahl ist. Nutzen Sie es zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
  ],
  rows21: ROWS_21,
  rows31: ROWS_31,
  discuss21: DISCUSS_21,
  discuss31: DISCUSS_31,
});
