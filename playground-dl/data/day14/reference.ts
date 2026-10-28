import { defineReference, type P, type RefRow } from "@/data/free/reference";

/**
 * Day 14 · the reference of Block 2.1 and Block 3.1 (DL-STANDARD v1.9, section 16): the writing guidelines of the UK government's GOV.UK content and publishing guidance. The case
 * is a platform whose texts users do not understand, whose navigation is unclear and whose usage is low. GOV.UK is not a learning platform; it is chosen because it publishes one of
 * the most detailed public rulebooks for plain language and clear titles, written down and mandatory for its authors, and because no learning platform checked on 28.10.2026 prints
 * such rules on its public pages. The figures on these pages (literacy rates, "80% of people preferred") are the site's own, with its own sources; this course has not reviewed the
 * research. The pages read do not show a result of the rules on GOV.UK's own users, and no row is written for prioritised measures (they show none). Every row was observed on
 * 28.10.2026: "Use clear language", "Write clear titles" and "Write effective links" under https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/.
 * Labels of the real site are quoted in its own language (English).
 */
const VISIT = "28.10.2026";
const BASE = "https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines";
const LANG = `${BASE}/clear-language/`;
const TITLES = `${BASE}/clear-titles/`;
const LINKS = `${BASE}/add-links/`;
const SHOT = { lang: "/real/govuk-clear-language-2026-10-28.jpg", titles: "/real/govuk-clear-titles-2026-10-28.jpg" };
const W_LANG: P = ["Guideline “Use clear language”", "Richtlinie „Use clear language“"];
const W_TITLES: P = ["Guideline “Write clear titles”", "Richtlinie „Write clear titles“"];
const W_LINKS: P = ["Guideline “Write effective links”", "Richtlinie „Write effective links“"];

const ROWS_21: RefRow[] = [
  {
    topic: ["Materi A1 · plain language", "Materi A1 · einfache Sprache"],
    problem: ["Users do not understand the content", "Nutzer verstehen die Inhalte nicht"],
    did: [
      "Plain language is a written rule, not a taste: “Plain English is mandatory for all of GOV.UK.” The rules are specific: short words (“‘buy’ instead of ‘purchase’”), the active voice (“You need an electronic travel authorisation” rather than “An electronic travel authorisation is needed”), paragraphs of “no more than 5 sentences” and “split up sentences that are over 25 words long”.",
      "Einfache Sprache ist eine geschriebene Regel, kein Geschmack: „Plain English is mandatory for all of GOV.UK.“ Die Regeln sind konkret: kurze Wörter („‘buy’ instead of ‘purchase’“), Aktiv („You need an electronic travel authorisation“ statt „An electronic travel authorisation is needed“), Absätze mit „no more than 5 sentences“ und „split up sentences that are over 25 words long“.",
    ],
    where: W_LANG,
    url: LANG,
    shot: SHOT.lang,
  },
  {
    topic: ["Materi A1 · jargon and terms", "Materi A1 · Fachsprache und Begriffe"],
    problem: ["The texts are full of technical terms", "Die Texte sind voller Fachbegriffe"],
    did: [
      "Terms are allowed when they are explained: “Where you need to use specialist terms, you can. They're not always jargon. You just need to explain what they mean the first time you use them.” And the words come from the users: words that users “will be familiar with” and “use themselves”, checked against “common search terms” (the page's example: ‘heavy goods vehicle’ or ‘lorry’).",
      "Begriffe sind erlaubt, wenn sie erklärt werden: „Where you need to use specialist terms, you can. They're not always jargon. You just need to explain what they mean the first time you use them.“ Und die Wörter kommen von den Nutzern: Wörter, die Nutzer „will be familiar with“ und „use themselves“, geprüft an „common search terms“ (das Beispiel der Seite: ‘heavy goods vehicle’ oder ‘lorry’).",
    ],
    where: W_LANG,
    url: LANG,
    shot: SHOT.lang,
  },
  {
    topic: ["Materi A2 · structure and navigation", "Materi A2 · Struktur und Navigation"],
    problem: ["The navigation is unclear", "Die Navigation ist unklar"],
    did: [
      "Titles and links are written to be understood alone. “Titles must be unique and informative so that users know which page they are on.” A title “should make sense: by itself – for example ‘Regulations’ does not say much, but ‘Regulations for environmental waste’ does”. Links go “at the point in the content at which they're useful”, and the page says not to “put all the links together at the bottom of the page”.",
      "Titel und Links sind so geschrieben, dass man sie allein versteht. „Titles must be unique and informative so that users know which page they are on.“ Ein Titel „should make sense: by itself – for example ‘Regulations’ does not say much, but ‘Regulations for environmental waste’ does“. Links stehen „at the point in the content at which they're useful“, und die Seite sagt, man solle nicht „put all the links together at the bottom of the page“.",
    ],
    where: [`${W_TITLES[0]} and ${W_LINKS[0]}`, `${W_TITLES[1]} und ${W_LINKS[1]}`],
    url: TITLES,
    shot: SHOT.titles,
  },
  {
    topic: ["Materi A3 · testing with users", "Materi A3 · Testen mit Nutzern"],
    problem: ["Usage is low", "Die Nutzung ist gering"],
    did: [
      "The guideline starts from how people arrive: “Most people who use GOV.UK start with a search engine. Use the same language as your audience so they can find your content.” And: “If people cannot find your page, they will not be able to act on it or know it's for them.” Its method is to look at real data: “Find out what the public calls your content by looking at common search terms.”",
      "Die Richtlinie geht davon aus, wie Menschen ankommen: „Most people who use GOV.UK start with a search engine. Use the same language as your audience so they can find your content.“ Und: „If people cannot find your page, they will not be able to act on it or know it's for them.“ Ihre Methode ist, auf echte Daten zu schauen: „Find out what the public calls your content by looking at common search terms.“",
    ],
    where: W_TITLES,
    url: TITLES,
    shot: SHOT.titles,
  },
];

const ROWS_31: RefRow[] = [
  {
    topic: ["Materi B1 · from the hurdle to the rule", "Materi B1 · vom Hindernis zur Regel"],
    problem: ["The strategy for simplifying content", "Die Strategie zur Vereinfachung von Inhalten"],
    did: [
      "A rule with a reason and data behind it: “Plain English is mandatory … because we want content to be accessible and understandable to everyone who needs it.” The page prints adult literacy data by nation (for example “1 in 6 adults in England have very poor literacy skills”) and concludes that “many people who will need to read GOV.UK will struggle unless language is kept simple”. These are the site's own figures, with its own sources.",
      "Eine Regel mit Grund und Daten dahinter: „Plain English is mandatory … because we want content to be accessible and understandable to everyone who needs it.“ Die Seite druckt Daten zur Lesekompetenz Erwachsener je Land (zum Beispiel „1 in 6 adults in England have very poor literacy skills“) und folgert, dass „many people who will need to read GOV.UK will struggle unless language is kept simple“. Das sind die eigenen Zahlen der Website, mit ihren eigenen Quellen.",
    ],
    where: W_LANG,
    url: LANG,
    shot: SHOT.lang,
  },
  {
    topic: ["Materi A2 · structure, labels, links", "Materi A2 · Struktur, Beschriftungen, Links"],
    problem: ["The optimisation of the information architecture", "Die Optimierung der Informationsarchitektur"],
    did: [
      "Rules for the parts a learner navigates by: a title of “65 characters or less (including spaces)” that is unique and clear alone; the section menu of the guide itself names its pages by what they do (“Write clear titles”, “Write effective links”); external links go to “a specific page, not the website's homepage”, and “users must be able to access the content without having to pay or register”.",
      "Regeln für die Teile, nach denen sich eine Lernende orientiert: ein Titel von „65 characters or less (including spaces)“, der eindeutig und allein verständlich ist; das Abschnittsmenü der Anleitung selbst benennt ihre Seiten nach dem, was sie tun („Write clear titles“, „Write effective links“); externe Links führen auf „a specific page, not the website's homepage“, und „users must be able to access the content without having to pay or register“.",
    ],
    where: [`${W_TITLES[0]} and ${W_LINKS[0]}`, `${W_TITLES[1]} und ${W_LINKS[1]}`],
    url: TITLES,
    shot: SHOT.titles,
  },
  {
    topic: ["Materi A3, A4 · test, iterate", "Materi A3, A4 · testen, iterieren"],
    problem: ["The testing and optimisation concept", "Das Test- und Optimierungskonzept"],
    did: [
      "Checks the guideline names: a title is checked in three places (“by itself”, “in search results”, “in document collections”), wording is checked against “common search terms”, and a tool is named for the active voice (“You can use tools such as the Hemingway app to check if your writing needs to be more active”). The pages read print no test of GOV.UK's own users.",
      "Prüfungen, die die Richtlinie nennt: Ein Titel wird an drei Stellen geprüft („by itself“, „in search results“, „in document collections“), Formulierungen werden an „common search terms“ geprüft, und für das Aktiv ist ein Werkzeug genannt („You can use tools such as the Hemingway app to check if your writing needs to be more active“). Die gelesenen Seiten drucken keinen Test mit den eigenen Nutzern von GOV.UK.",
    ],
    where: [`${W_TITLES[0]} and ${W_LANG[0]}`, `${W_TITLES[1]} und ${W_LANG[1]}`],
    url: TITLES,
    shot: SHOT.titles,
  },
  {
    topic: ["Materi B2 · simplicity against information", "Materi B2 · Einfachheit gegen Information"],
    problem: ["A risk analysis: too much against too little simplification", "Eine Risikoanalyse: zu viel gegen zu wenig Vereinfachung"],
    did: [
      "The guideline names both sides. Experts too: “people with higher levels of literacy prefer plain English because it allows them to understand the information as quickly as possible” (“80% of people preferred sentences written in clear English – and the more complex the issue, the greater that preference”; the site's own cited research). But simple is not always shorter: negative contractions such as ‘can't’ are to be avoided because “many users find negative contractions hard to read”, and terms may stay if they are explained.",
      "Die Richtlinie nennt beide Seiten. Auch Fachleute: „people with higher levels of literacy prefer plain English because it allows them to understand the information as quickly as possible“ („80% of people preferred sentences written in clear English – and the more complex the issue, the greater that preference“; die von der Website selbst zitierte Forschung). Aber einfach heißt nicht immer kürzer: Negative Kurzformen wie ‘can't’ sollen vermieden werden, weil „many users find negative contractions hard to read“, und Fachbegriffe dürfen bleiben, wenn sie erklärt werden.",
    ],
    where: W_LANG,
    url: LANG,
    shot: SHOT.lang,
  },
  {
    topic: ["Materi B3 · deciding without knowing where learners stop", "Materi B3 · entscheiden, ohne zu wissen, wo Lernende aufhören"],
    problem: ["One decision under uncertainty, on purpose", "Eine Entscheidung unter Unsicherheit, mit Absicht"],
    did: [
      "The rule rests on population data and on cited research, not on a test of every page, and it leaves room for judgement: “There's no maximum or minimum overall page length. It's most important that you write well.” Checking words against search terms is offered as a way to improve (“You might want to look at common search terms”), not as a precondition.",
      "Die Regel stützt sich auf Bevölkerungsdaten und zitierte Forschung, nicht auf einen Test jeder Seite, und sie lässt Raum für Urteilskraft: „There's no maximum or minimum overall page length. It's most important that you write well.“ Das Prüfen der Wörter an Suchbegriffen wird als Weg zur Verbesserung angeboten („You might want to look at common search terms“), nicht als Voraussetzung.",
    ],
    where: W_LANG,
    url: LANG,
  },
];

const DISCUSS_21: P[] = [
  ["Take one of ClearLearn's interface texts (the welcome text or the error message) and rewrite it with three of the rules: the active voice, sentences under 25 words and short words. What did you keep, and what did you have to explain?", "Nehmen Sie einen der Oberflächentexte von ClearLearn (den Begrüßungstext oder die Fehlermeldung) und schreiben Sie ihn mit drei der Regeln um: Aktiv, Sätze unter 25 Wörtern und kurze Wörter. Was haben Sie behalten, und was mussten Sie erklären?"],
  ["ClearLearn's menu reads Hub, Workspace, Repository, Directory, Console, Support. Which of these make sense by themselves, and what would a learner call them?", "Das Menü von ClearLearn lautet Hub, Workspace, Repository, Directory, Console, Support. Welche davon sind für sich allein verständlich, und wie würde eine Lernende sie nennen?"],
  ["GOV.UK names its pages after what people search for. What data does ClearLearn have about the words its learners use, and how would you get it?", "GOV.UK benennt seine Seiten nach dem, was Menschen suchen. Welche Daten hat ClearLearn über die Wörter seiner Lernenden, und wie würden Sie sie bekommen?"],
  ["The guidelines are rules for writers, not a test. Which two test methods would you use to find out whether ClearLearn's texts are now understood?", "Die Richtlinien sind Regeln für Schreibende, kein Test. Welche zwei Testmethoden würden Sie nutzen, um herauszufinden, ob die Texte von ClearLearn jetzt verstanden werden?"],
];
const DISCUSS_31: P[] = [
  ["GOV.UK makes plain English mandatory. Which of your rules for ClearLearn would you make mandatory, and which only a recommendation? Who checks them?", "GOV.UK macht einfaches Englisch verbindlich. Welche Ihrer Regeln für ClearLearn würden Sie verbindlich machen, welche nur zur Empfehlung? Wer prüft sie?"],
  ["Where does simplifying stop helping (specialist terms, the contractions rule)? What would you explain instead of cut? (Materi B2)", "Wo hilft Vereinfachen nicht mehr (Fachbegriffe, die Regel zu Kurzformen)? Was würden Sie erklären statt streichen? (Materi B2)"],
  ["GOV.UK sets numbers: 25 words, 5 sentences, 65 characters. What numbers would you set for ClearLearn, and how would you check that they work?", "GOV.UK setzt Zahlen: 25 Wörter, 5 Sätze, 65 Zeichen. Welche Zahlen würden Sie für ClearLearn setzen, und wie würden Sie prüfen, dass sie wirken?"],
  ["You decide without knowing where ClearLearn's learners stop. What would you watch after the first change to see whether it helped? (Materi B3)", "Sie entscheiden, ohne zu wissen, wo die Lernenden von ClearLearn aufhören. Was würden Sie nach der ersten Änderung beobachten, um zu sehen, ob sie geholfen hat? (Materi B3)"],
];

export const { REF_21, REF_31, REF_CARD_21, REF_CARD_31 } = defineReference({
  name: "GOV.UK",
  visit: VISIT,
  site: {
    url: LANG,
    page: ["the guideline “Use clear language”", "die Richtlinie „Use clear language“"],
    shot: SHOT.lang,
    note: ["Open the page in a new tab to read all of it.", "Öffnen Sie die Seite in einem neuen Tab, um sie ganz zu lesen."],
  },
  intro21: [
    "ClearLearn's users do not understand the content, the navigation is unclear and usage is low. GOV.UK is not a learning platform: it is the UK government's website, and its published writing guidelines are one of the most detailed public rulebooks for plain language, clear titles and links, mandatory for its authors. Read the rules, compare them with ClearLearn's texts and menu, and ask what a team would have to write down.",
    "Die Nutzer von ClearLearn verstehen die Inhalte nicht, die Navigation ist unklar, und die Nutzung ist gering. GOV.UK ist keine Lernplattform: Es ist die Website der britischen Regierung, und ihre veröffentlichten Schreibrichtlinien sind eines der detailliertesten öffentlichen Regelwerke für einfache Sprache, klare Titel und Links, verbindlich für ihre Autorinnen und Autoren. Lesen Sie die Regeln, vergleichen Sie sie mit den Texten und dem Menü von ClearLearn, und fragen Sie, was ein Team aufschreiben müsste.",
  ],
  intro31: [
    "Your task is a strategy: simplifying content, optimising the information architecture, a testing and optimisation concept, prioritised measures, a risk analysis of too much against too little simplification and a decision under uncertainty. GOV.UK's guidelines are one worked example of such rules in the organisation's own words. Use them to compare your plan with, not as the answer.",
    "Ihre Aufgabe ist eine Strategie: Inhalte vereinfachen, die Informationsarchitektur optimieren, ein Test- und Optimierungskonzept, priorisierte Maßnahmen, eine Risikoanalyse von zu viel gegen zu wenig Vereinfachung und eine Entscheidung unter Unsicherheit. Die Richtlinien von GOV.UK sind ein ausgearbeitetes Beispiel für solche Regeln in den eigenen Worten der Organisation. Nutzen Sie sie zum Vergleich mit Ihrem Plan, nicht als die Antwort.",
  ],
  rows21: ROWS_21,
  rows31: ROWS_31,
  discuss21: DISCUSS_21,
  discuss31: DISCUSS_31,
});
