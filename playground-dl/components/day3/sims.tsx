"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import type { OptId } from "@/data/day3/case";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the working simulations of CLAUDE.md #60 and DL-STANDARD section 4. Built one to one from the plan's clues and the task's numbered facts, and adding
 * nothing that would change an answer. EduCore is a platform that works like one (v1.6, 2026-10-19): every menu entry, the news banner, the recommendations, the chat,
 * the search, the catalogue, the calendar, the messages, the forum, the certificates, the help and the settings open a real page; the quiz answers with a plain
 * confirmation and no score. What the plan describes stays as it is: Lesson 7 is one continuous text of about 500 words, the module overview is one flat list of
 * 28 lessons, the lesson page shows a menu of nine entries, a news banner, a recommendation box and a chat window at once, and the quiz has 12 questions on one page.
 * Block 1.2: the same lesson as the three options make it. Own colours only; everything is made up and nothing here is marked right or wrong.
 */

/* ------------------------------------------------------------------ the lesson text (about 500 words, seven parts) */

const PARTS = (): { title: string; text: string }[] => [
  {
    title: tt("What learning analytics is", "Was Learning Analytics ist"),
    text: tt(
      "Learning analytics means collecting and analysing data about how people learn so that a platform can support them better. Every click, every quiz answer and every minute spent on a page is a data point. Taken together, these data points show where learners succeed, where they stall and where they leave, and an organisation that processes them has to decide on which legal basis it does so and how it protects the people behind the numbers.",
      "Learning Analytics bedeutet, Daten darüber zu erheben und auszuwerten, wie Menschen lernen, damit eine Plattform sie besser unterstützen kann. Jeder Klick, jede Quizantwort und jede Minute auf einer Seite ist ein Datenpunkt. Zusammen zeigen diese Datenpunkte, wo Lernende vorankommen, wo sie stocken und wo sie gehen, und eine Organisation, die sie verarbeitet, muss entscheiden, auf welcher Rechtsgrundlage sie das tut und wie sie die Menschen hinter den Zahlen schützt.",
    ),
  },
  {
    title: tt("A lawful basis", "Eine Rechtsgrundlage"),
    text: tt(
      "Under the General Data Protection Regulation, personal data may be processed only if there is a lawful basis. The most common bases are consent, the performance of a contract and legitimate interest. Legitimate interest allows processing when the organisation has a real interest, for example improving its courses, as long as that interest is not outweighed by the rights and freedoms of the individual. Whether it applies has to be weighed case by case in a documented balancing test.",
      "Nach der Datenschutz-Grundverordnung dürfen personenbezogene Daten nur verarbeitet werden, wenn es eine Rechtsgrundlage gibt. Die häufigsten Grundlagen sind die Einwilligung, die Erfüllung eines Vertrags und das berechtigte Interesse. Das berechtigte Interesse erlaubt die Verarbeitung, wenn die Organisation ein echtes Interesse hat, zum Beispiel ihre Kurse zu verbessern, solange dieses Interesse nicht von den Rechten und Freiheiten der Person überwogen wird. Ob es zutrifft, muss im Einzelfall in einer dokumentierten Abwägung geprüft werden.",
    ),
  },
  {
    title: tt("Pseudonymisation", "Pseudonymisierung"),
    text: tt(
      "Pseudonymisation is a technical measure that replaces identifying data, such as a name or an email address, with a code, while the key that links the code to the person is stored separately and protected. Pseudonymised data is still personal data, because the person can be re-identified with the key, but the risk is lower, and the regulation names the technique as an appropriate safeguard. Anonymisation, by contrast, removes the link permanently.",
      "Pseudonymisierung ist eine technische Maßnahme, die identifizierende Daten, etwa einen Namen oder eine E-Mail-Adresse, durch einen Code ersetzt, während der Schlüssel, der den Code mit der Person verbindet, getrennt und geschützt aufbewahrt wird. Pseudonymisierte Daten bleiben personenbezogene Daten, weil die Person mit dem Schlüssel wieder erkannt werden kann, aber das Risiko ist geringer, und die Verordnung nennt die Technik als geeignete Schutzmaßnahme. Anonymisierung dagegen entfernt den Bezug dauerhaft.",
    ),
  },
  {
    title: tt("What a platform records", "Was eine Plattform erfasst"),
    text: tt(
      "A typical learning platform records several kinds of data: the account data of the learner, the progress through each course, the results of every quiz and the time stamps of each session. Some of these are needed to run the course at all, others only to evaluate it. The purpose of each category must be stated before collection begins, and data that is no longer needed for that purpose has to be deleted within a defined retention period.",
      "Eine typische Lernplattform erfasst mehrere Arten von Daten: die Kontodaten der Lernenden, den Fortschritt in jedem Kurs, die Ergebnisse jedes Quiz und die Zeitstempel jeder Sitzung. Manche davon werden gebraucht, um den Kurs überhaupt zu betreiben, andere nur, um ihn auszuwerten. Der Zweck jeder Kategorie muss vor der Erhebung genannt werden, und Daten, die für diesen Zweck nicht mehr gebraucht werden, müssen innerhalb einer festgelegten Aufbewahrungsfrist gelöscht werden.",
    ),
  },
  {
    title: tt("The rights of learners", "Die Rechte der Lernenden"),
    text: tt(
      "Learners have rights that the organisation must be able to honour: the right to information about what is stored, the right to correct wrong data, the right to erasure and the right to object to processing based on legitimate interest. A request must normally be answered within one month, which means that processes and responsible persons need to exist before the first request arrives.",
      "Lernende haben Rechte, die die Organisation erfüllen können muss: das Recht auf Auskunft darüber, was gespeichert ist, das Recht auf Berichtigung falscher Daten, das Recht auf Löschung und das Recht auf Widerspruch gegen eine Verarbeitung aufgrund des berechtigten Interesses. Eine Anfrage muss in der Regel innerhalb eines Monats beantwortet werden, was bedeutet, dass Abläufe und Verantwortliche vorhanden sein müssen, bevor die erste Anfrage eintrifft.",
    ),
  },
  {
    title: tt("What a team should do", "Was ein Team tun sollte"),
    text: tt(
      "In practice, a team that wants to analyse learning data should document its purpose, choose the lawful basis, apply pseudonymisation wherever the analysis does not need names, limit access to those who need it and define how long each category is kept. Doing so does not slow the analysis down; it makes the results usable, because decisions based on lawfully collected data can be defended.",
      "In der Praxis sollte ein Team, das Lerndaten auswerten will, seinen Zweck dokumentieren, die Rechtsgrundlage wählen, Pseudonymisierung anwenden, wo die Auswertung keine Namen braucht, den Zugriff auf die beschränken, die ihn brauchen, und festlegen, wie lange jede Kategorie aufbewahrt wird. Das bremst die Auswertung nicht; es macht die Ergebnisse nutzbar, weil Entscheidungen auf rechtmäßig erhobenen Daten verteidigt werden können.",
    ),
  },
  {
    title: tt("Data outside the EEA", "Daten außerhalb des EWR"),
    text: tt(
      "Finally, transfers of data outside the European Economic Area require additional safeguards, such as standard contractual clauses, and a platform that uses a cloud provider or an analytics tool from another country has to check this before it signs the contract.",
      "Schließlich erfordert die Übermittlung von Daten außerhalb des Europäischen Wirtschaftsraums zusätzliche Garantien, etwa Standardvertragsklauseln, und eine Plattform, die einen Cloud-Anbieter oder ein Analysewerkzeug aus einem anderen Land nutzt, muss das prüfen, bevor sie den Vertrag unterschreibt.",
    ),
  },
];

const LESSON_TITLE = () => tt("Learning analytics and data protection", "Learning Analytics und Datenschutz");

/** Own colours, never the site's blue, teal and rust (CLAUDE.md #15, #49). */
const INK = "text-[#2B2B2B]";
const HEAD = "bg-[#4A4458]";
const btn = "min-h-[40px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-4 text-[14px] text-[#2B2B2B] hover:bg-[#E9E6F0]";

/* ------------------------------------------------------------------ Block 2.1 · the EduCore platform */

const TOPICS = (): string[] => [
  tt("Welcome", "Willkommen"), tt("Why data protection matters", "Warum Datenschutz wichtig ist"), tt("Personal data", "Personenbezogene Daten"), tt("Special categories", "Besondere Kategorien"), tt("Roles in data protection", "Rollen im Datenschutz"), tt("Lawful bases", "Rechtsgrundlagen"),
  LESSON_TITLE(),
  tt("Consent", "Einwilligung"), tt("Contracts", "Verträge"), tt("Legitimate interest", "Berechtigtes Interesse"), tt("Purpose limitation", "Zweckbindung"), tt("Data minimisation", "Datenminimierung"), tt("Storage limitation", "Speicherbegrenzung"), tt("Accuracy", "Richtigkeit"),
  tt("Security of processing", "Sicherheit der Verarbeitung"), tt("Pseudonymisation", "Pseudonymisierung"), tt("Anonymisation", "Anonymisierung"), tt("Access rights", "Auskunftsrechte"), tt("Erasure", "Löschung"), tt("Objection", "Widerspruch"), tt("Data portability", "Datenübertragbarkeit"),
  tt("Records of processing", "Verzeichnis der Verarbeitungen"), tt("Impact assessments", "Folgenabschätzungen"), tt("Processors", "Auftragsverarbeiter"), tt("International transfers", "Internationale Übermittlungen"), tt("Breach notification", "Meldung von Verletzungen"), tt("Supervisory authorities", "Aufsichtsbehörden"), tt("Review and next steps", "Rückblick und nächste Schritte"),
];

/** One short text for each of the other lessons of the module, in the same dense register as lesson 7, so that every entry of the overview opens a real page. Order as in TOPICS; the entry of lesson 7 is not used. */
const TOPIC_TEXT = (): string[] => [
  tt("This module explains how personal data is handled when people learn on a platform. It covers the legal bases, the rights of learners and the duties of the organisation, one lesson after the other, and ends with a review. Work through the lessons in the order of the list.", "Dieses Modul erklärt, wie personenbezogene Daten behandelt werden, wenn Menschen auf einer Plattform lernen. Es behandelt die Rechtsgrundlagen, die Rechte der Lernenden und die Pflichten der Organisation, eine Lektion nach der anderen, und endet mit einem Rückblick. Arbeiten Sie die Lektionen in der Reihenfolge der Liste durch."),
  tt("Data protection matters because every platform collects data about the people who use it, and a breach of that data can harm them. Regulation exists to limit what may be collected, to say what it may be used for and to give people control over it. Organisations that ignore it risk fines and the loss of trust.", "Datenschutz ist wichtig, weil jede Plattform Daten über die Menschen sammelt, die sie nutzen, und eine Verletzung dieser Daten ihnen schaden kann. Regeln gibt es, um zu begrenzen, was erhoben werden darf, um zu sagen, wofür es genutzt werden darf, und um Menschen Kontrolle darüber zu geben. Organisationen, die sie ignorieren, riskieren Bußgelder und den Verlust von Vertrauen."),
  tt("Personal data is any information that relates to an identified or identifiable person: a name, an email address, a user number, an IP address or a quiz result linked to an account. Data that cannot be linked to a person by any reasonable means is not personal data, but the test is strict.", "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen: ein Name, eine E-Mail-Adresse, eine Nutzernummer, eine IP-Adresse oder ein Quizergebnis, das mit einem Konto verknüpft ist. Daten, die sich mit keinem vertretbaren Mittel einer Person zuordnen lassen, sind keine personenbezogenen Daten, aber der Test ist streng."),
  tt("Some categories of personal data receive stronger protection, among them data about health, religion, political opinion and trade-union membership. Processing them is prohibited in principle and allowed only under narrow exceptions, so a platform should avoid collecting them unless the course truly requires it.", "Manche Kategorien personenbezogener Daten genießen stärkeren Schutz, darunter Daten zu Gesundheit, Religion, politischer Meinung und Gewerkschaftszugehörigkeit. Ihre Verarbeitung ist grundsätzlich verboten und nur unter engen Ausnahmen erlaubt, eine Plattform sollte sie also nur erheben, wenn der Kurs es wirklich verlangt."),
  tt("The regulation distinguishes the controller, who decides why and how data is processed, from the processor, who processes it on the controller's behalf. A learning platform can be either, depending on the contract, and the roles decide who must answer a learner's request.", "Die Verordnung unterscheidet den Verantwortlichen, der entscheidet, warum und wie Daten verarbeitet werden, vom Auftragsverarbeiter, der sie im Auftrag des Verantwortlichen verarbeitet. Eine Lernplattform kann je nach Vertrag das eine oder das andere sein, und die Rollen entscheiden, wer die Anfrage einer Lernenden beantworten muss."),
  tt("Consent is a freely given, specific, informed and unambiguous indication of a person's wishes. It must be as easy to withdraw as to give, and it is not valid if the learner has no real choice, for example when a course cannot be taken without it.", "Eine Einwilligung ist eine freiwillig, für den bestimmten Fall, informiert und unmissverständlich abgegebene Willensbekundung einer Person. Sie muss so leicht zu widerrufen wie zu erteilen sein, und sie ist nicht gültig, wenn die Lernende keine echte Wahl hat, etwa wenn ein Kurs ohne sie nicht belegt werden kann."),
  tt("Processing is lawful when it is necessary to perform a contract with the person. For a learning platform this covers the data needed to give access to a booked course, to record progress and to issue a certificate, but not data collected only for later marketing.", "Die Verarbeitung ist rechtmäßig, wenn sie zur Erfüllung eines Vertrags mit der Person erforderlich ist. Für eine Lernplattform umfasst das die Daten, die nötig sind, um Zugang zu einem gebuchten Kurs zu geben, den Fortschritt zu erfassen und ein Zertifikat auszustellen, nicht aber Daten, die nur für späteres Marketing erhoben werden."),
  tt("Legitimate interest allows processing when the organisation has a real interest and the rights of the person do not outweigh it. The organisation must write down the interest, show that the processing is necessary and weigh it against the person's expectations.", "Das berechtigte Interesse erlaubt die Verarbeitung, wenn die Organisation ein echtes Interesse hat und die Rechte der Person es nicht überwiegen. Die Organisation muss das Interesse aufschreiben, zeigen, dass die Verarbeitung erforderlich ist, und es gegen die Erwartungen der Person abwägen."),
  tt("Purpose limitation means that data collected for one purpose may not be used for an incompatible one. Data collected to run a course may be used to improve it only if that use is compatible and has been stated, and it may not be sold on.", "Zweckbindung heißt, dass Daten, die für einen Zweck erhoben wurden, nicht für einen unvereinbaren genutzt werden dürfen. Daten, die erhoben wurden, um einen Kurs zu betreiben, dürfen nur dann zu seiner Verbesserung genutzt werden, wenn diese Nutzung vereinbar und genannt ist, und sie dürfen nicht weitergegeben werden."),
  tt("Data minimisation requires that only the data that is adequate, relevant and necessary for the purpose is collected. A quiz result is needed to record progress; the learner's date of birth usually is not.", "Datenminimierung verlangt, dass nur die Daten erhoben werden, die für den Zweck angemessen, erheblich und erforderlich sind. Ein Quizergebnis wird gebraucht, um den Fortschritt zu erfassen; das Geburtsdatum der Lernenden meist nicht."),
  tt("Storage limitation means that personal data is kept only as long as the purpose requires. The organisation sets a retention period for each category and deletes or anonymises the data when it ends.", "Speicherbegrenzung heißt, dass personenbezogene Daten nur so lange aufbewahrt werden, wie der Zweck es verlangt. Die Organisation legt für jede Kategorie eine Aufbewahrungsfrist fest und löscht oder anonymisiert die Daten, wenn sie endet."),
  tt("Accuracy requires that personal data is correct and, where necessary, kept up to date. Learners must be able to correct wrong data, such as a misspelled name on a certificate, and the organisation must act on a correction without delay.", "Richtigkeit verlangt, dass personenbezogene Daten sachlich richtig und, wo nötig, auf dem neuesten Stand sind. Lernende müssen falsche Daten berichtigen können, etwa einen falsch geschriebenen Namen auf einem Zertifikat, und die Organisation muss eine Berichtigung unverzüglich umsetzen."),
  tt("The security of processing requires technical and organisational measures that fit the risk: access control, encryption, backups and training for staff. The more sensitive the data, the stronger the measures must be.", "Die Sicherheit der Verarbeitung verlangt technische und organisatorische Maßnahmen, die zum Risiko passen: Zugriffskontrolle, Verschlüsselung, Sicherungen und Schulung der Mitarbeitenden. Je sensibler die Daten, desto stärker müssen die Maßnahmen sein."),
  tt("Pseudonymisation replaces identifying data with a code and keeps the key apart. It lowers the risk of an analysis, because analysts see codes and not names, while the data stays personal data as long as the key exists.", "Pseudonymisierung ersetzt identifizierende Daten durch einen Code und bewahrt den Schlüssel getrennt auf. Sie senkt das Risiko einer Auswertung, weil Analysierende Codes sehen und keine Namen, während die Daten personenbezogene Daten bleiben, solange der Schlüssel existiert."),
  tt("Anonymisation removes the link to the person permanently, so that nobody can identify them any more, even with additional information. Truly anonymous data falls outside the regulation, but achieving it is harder than it looks.", "Anonymisierung entfernt den Bezug zur Person dauerhaft, sodass niemand sie mehr identifizieren kann, auch nicht mit zusätzlichen Informationen. Wirklich anonyme Daten fallen nicht unter die Verordnung, aber sie zu erreichen ist schwerer, als es aussieht."),
  tt("The right of access lets a learner ask what data the organisation holds about them, why, and with whom it is shared. The organisation must provide a copy and normally answers within one month.", "Das Auskunftsrecht lässt eine Lernende fragen, welche Daten die Organisation über sie hält, warum und mit wem sie geteilt werden. Die Organisation muss eine Kopie bereitstellen und antwortet in der Regel innerhalb eines Monats."),
  tt("The right to erasure lets a learner ask for their data to be deleted when it is no longer needed, when consent is withdrawn or when the processing was unlawful. Duties to keep records, such as for a certificate, can limit it.", "Das Recht auf Löschung lässt eine Lernende verlangen, dass ihre Daten gelöscht werden, wenn sie nicht mehr gebraucht werden, wenn die Einwilligung widerrufen wird oder wenn die Verarbeitung unrechtmäßig war. Aufbewahrungspflichten, etwa für ein Zertifikat, können es begrenzen."),
  tt("The right to object lets a learner object to processing that rests on legitimate interest. The organisation must then stop, unless it can show compelling reasons that outweigh the learner's interests.", "Das Widerspruchsrecht lässt eine Lernende einer Verarbeitung widersprechen, die auf dem berechtigten Interesse beruht. Die Organisation muss dann aufhören, außer sie kann zwingende Gründe zeigen, die die Interessen der Lernenden überwiegen."),
  tt("The right to data portability lets a learner receive their data in a structured, commonly used format and pass it to another provider. It applies to data the learner provided, where processing rests on consent or a contract.", "Das Recht auf Datenübertragbarkeit lässt eine Lernende ihre Daten in einem strukturierten, gängigen Format erhalten und an einen anderen Anbieter weitergeben. Es gilt für Daten, die die Lernende bereitgestellt hat, wenn die Verarbeitung auf Einwilligung oder Vertrag beruht."),
  tt("A record of processing lists, for each processing activity, its purpose, the categories of data, who receives it and how long it is kept. It is the basis for answering requests and for showing a supervisory authority that the organisation knows what it does.", "Ein Verzeichnis der Verarbeitungen listet für jede Verarbeitungstätigkeit ihren Zweck, die Datenkategorien, wer sie erhält und wie lange sie aufbewahrt wird. Es ist die Grundlage, um Anfragen zu beantworten und einer Aufsichtsbehörde zu zeigen, dass die Organisation weiß, was sie tut."),
  tt("An impact assessment is required when processing is likely to result in a high risk for people, for example systematic monitoring of learners at scale. It describes the processing, weighs the risks and sets out measures to reduce them.", "Eine Folgenabschätzung ist erforderlich, wenn die Verarbeitung voraussichtlich ein hohes Risiko für Menschen mit sich bringt, etwa die systematische Überwachung von Lernenden in großem Umfang. Sie beschreibt die Verarbeitung, wägt die Risiken ab und legt Maßnahmen zu ihrer Verringerung fest."),
  tt("A processor handles data on behalf of the organisation, for example a hosting company or an analytics tool. A written contract must bind it to process the data only on instruction and to protect it, and the organisation stays responsible for its choice.", "Ein Auftragsverarbeiter verarbeitet Daten im Auftrag der Organisation, zum Beispiel ein Hosting-Unternehmen oder ein Analysewerkzeug. Ein schriftlicher Vertrag muss ihn verpflichten, die Daten nur auf Weisung zu verarbeiten und zu schützen, und die Organisation bleibt für ihre Wahl verantwortlich."),
  tt("Transfers to countries outside the European Economic Area need a legal mechanism, such as an adequacy decision or standard contractual clauses. A platform must check where its providers store and access data before it signs.", "Übermittlungen in Länder außerhalb des Europäischen Wirtschaftsraums brauchen einen Rechtsmechanismus, etwa einen Angemessenheitsbeschluss oder Standardvertragsklauseln. Eine Plattform muss prüfen, wo ihre Anbieter Daten speichern und darauf zugreifen, bevor sie unterschreibt."),
  tt("A personal data breach must be reported to the supervisory authority within seventy-two hours of becoming aware of it, unless it is unlikely to harm people. Where the risk is high, the people affected must be told as well.", "Eine Verletzung des Schutzes personenbezogener Daten muss der Aufsichtsbehörde innerhalb von zweiundsiebzig Stunden nach Bekanntwerden gemeldet werden, es sei denn, sie führt voraussichtlich nicht zu Schaden für Menschen. Ist das Risiko hoch, müssen auch die Betroffenen informiert werden."),
  tt("Supervisory authorities monitor and enforce the regulation. They handle complaints, carry out audits and can impose fines. Knowing which authority is responsible, and how to reach it, belongs in the organisation's processes.", "Aufsichtsbehörden überwachen und setzen die Verordnung durch. Sie bearbeiten Beschwerden, führen Prüfungen durch und können Bußgelder verhängen. Zu wissen, welche Behörde zuständig ist und wie man sie erreicht, gehört in die Abläufe der Organisation."),
  tt("This lesson reviews the module and lists the next steps: document your purposes, choose the lawful basis for each, limit access, set retention periods and prepare to answer requests. Then take the quiz.", "Diese Lektion blickt auf das Modul zurück und nennt die nächsten Schritte: Dokumentieren Sie Ihre Zwecke, wählen Sie für jeden die Rechtsgrundlage, beschränken Sie den Zugriff, legen Sie Aufbewahrungsfristen fest und bereiten Sie sich darauf vor, Anfragen zu beantworten. Machen Sie dann das Quiz."),
];

const MENU = () => [tt("Home", "Start"), tt("My courses", "Meine Kurse"), tt("Catalogue", "Katalog"), tt("Calendar", "Kalender"), tt("Messages", "Nachrichten"), tt("Forum", "Forum"), tt("Certificates", "Zertifikate"), tt("Help", "Hilfe"), tt("Settings", "Einstellungen")];

const QUIZ = (): string[] => [
  tt("Learning analytics collects data about how people learn.", "Learning Analytics erhebt Daten darüber, wie Menschen lernen."),
  tt("Personal data may be processed without any lawful basis.", "Personenbezogene Daten dürfen ohne Rechtsgrundlage verarbeitet werden."),
  tt("Consent is one possible lawful basis.", "Die Einwilligung ist eine mögliche Rechtsgrundlage."),
  tt("Legitimate interest never needs to be weighed.", "Das berechtigte Interesse muss nie abgewogen werden."),
  tt("Pseudonymised data is still personal data.", "Pseudonymisierte Daten bleiben personenbezogene Daten."),
  tt("Anonymisation removes the link to the person permanently.", "Anonymisierung entfernt den Bezug zur Person dauerhaft."),
  tt("The purpose of a data category is stated before collection.", "Der Zweck einer Datenkategorie wird vor der Erhebung genannt."),
  tt("Data may be kept forever, whatever the purpose.", "Daten dürfen für immer aufbewahrt werden, egal zu welchem Zweck."),
  tt("Learners have a right to information about stored data.", "Lernende haben ein Recht auf Auskunft über gespeicherte Daten."),
  tt("A request must normally be answered within one month.", "Eine Anfrage muss in der Regel innerhalb eines Monats beantwortet werden."),
  tt("Access to learning data should be limited to those who need it.", "Der Zugriff auf Lerndaten sollte auf die beschränkt sein, die ihn brauchen."),
  tt("Data may leave the EEA without any safeguard.", "Daten dürfen den EWR ohne jede Garantie verlassen."),
];

/** The text of one lesson of the module: lesson 7 is the long one of the brief, every other lesson is a short page in the same dense register. */
const LAWFUL = () =>
  tt(
    "Processing personal data needs a lawful basis. The regulation names six: consent, a contract, a legal duty, protecting vital interests, a task in the public interest and legitimate interest. The following lessons take them one after the other.",
    "Die Verarbeitung personenbezogener Daten braucht eine Rechtsgrundlage. Die Verordnung nennt sechs: Einwilligung, Vertrag, rechtliche Pflicht, Schutz lebenswichtiger Interessen, Aufgabe im öffentlichen Interesse und berechtigtes Interesse. Die folgenden Lektionen behandeln sie nacheinander.",
  );
const lessonText = (i: number): string => (i === 6 ? PARTS().map((p) => p.text).join(" ") : i === 5 ? LAWFUL() : TOPIC_TEXT()[i < 5 ? i : i - 2]);

/* ------------------------------------------------------------------ the catalogue (made up) */

type Course = { id: string; title: string; blurb: string; fresh: boolean };
const COURSES = (): Course[] => [
  { id: "dp", fresh: false, title: tt("Data protection in practice", "Datenschutz in der Praxis"), blurb: tt("What a team has to know about personal data when it works with learners.", "Was ein Team über personenbezogene Daten wissen muss, wenn es mit Lernenden arbeitet.") },
  { id: "cl", fresh: false, title: tt("Contract law, part 1", "Vertragsrecht, Teil 1"), blurb: tt("How a contract comes about, what it must contain and when it ends.", "Wie ein Vertrag zustande kommt, was er enthalten muss und wann er endet.") },
  { id: "hy", fresh: false, title: tt("Hygiene rules", "Hygieneregeln"), blurb: tt("The rules for clean work in care, kitchens and workshops.", "Die Regeln für sauberes Arbeiten in Pflege, Küche und Werkstatt.") },
  { id: "n1", fresh: true, title: tt("Occupational safety basics", "Arbeitsschutz-Grundlagen"), blurb: tt("Risks at work and the duties of employers and staff.", "Gefährdungen am Arbeitsplatz und die Pflichten von Arbeitgebern und Beschäftigten.") },
  { id: "n2", fresh: true, title: tt("Fire protection", "Brandschutz"), blurb: tt("Preventing fires, and what to do when one starts.", "Brände verhindern und richtig handeln, wenn einer ausbricht.") },
  { id: "n3", fresh: true, title: tt("First aid at work", "Erste Hilfe im Betrieb"), blurb: tt("The first minutes after an accident, step by step.", "Die ersten Minuten nach einem Unfall, Schritt für Schritt.") },
  { id: "n4", fresh: true, title: tt("Working with hazardous substances", "Umgang mit Gefahrstoffen"), blurb: tt("Labels, storage and protective equipment.", "Kennzeichnung, Lagerung und Schutzausrüstung.") },
  { id: "n5", fresh: true, title: tt("Anti-corruption", "Korruptionsprävention"), blurb: tt("Gifts, invitations and how to report a concern.", "Geschenke, Einladungen und wie man ein Anliegen meldet.") },
  { id: "n6", fresh: true, title: tt("Information security", "Informationssicherheit"), blurb: tt("Passwords, e-mail traps and safe handling of files.", "Passwörter, E-Mail-Fallen und der sichere Umgang mit Dateien.") },
  { id: "n7", fresh: true, title: tt("Equal treatment at work", "Gleichbehandlung im Beruf"), blurb: tt("What the law says about fair treatment and how to act.", "Was das Gesetz zur fairen Behandlung sagt und wie man handelt.") },
  { id: "n8", fresh: true, title: tt("Working hours law", "Arbeitszeitrecht"), blurb: tt("Breaks, rest periods and recording working time.", "Pausen, Ruhezeiten und die Erfassung der Arbeitszeit.") },
  { id: "n9", fresh: true, title: tt("Waste and recycling", "Abfall und Recycling"), blurb: tt("Sorting waste correctly and handling special waste.", "Abfall richtig trennen und Sonderabfall behandeln.") },
  { id: "n10", fresh: true, title: tt("Customer communication", "Kundenkommunikation"), blurb: tt("Clear answers by phone and e-mail, also when a customer is angry.", "Klare Antworten am Telefon und per E-Mail, auch wenn ein Kunde verärgert ist.") },
  { id: "n11", fresh: true, title: tt("Introduction for new colleagues", "Einführung für neue Kolleginnen und Kollegen"), blurb: tt("Who is who, how things are done and where to find help.", "Wer wer ist, wie Dinge laufen und wo man Hilfe findet.") },
  { id: "n12", fresh: true, title: tt("Data protection for managers", "Datenschutz für Führungskräfte"), blurb: tt("The duties of a person who decides what happens with data.", "Die Pflichten einer Person, die entscheidet, was mit Daten geschieht.") },
];

/* ------------------------------------------------------------------ the pages of the platform */

type Page =
  | { k: "overview" } | { k: "lesson"; i: number } | { k: "quiz" } | { k: "submitted" }
  | { k: "home" } | { k: "courses" } | { k: "catalogue" } | { k: "course"; id: string } | { k: "welcome"; id: string }
  | { k: "calendar" } | { k: "event"; id: number } | { k: "messages" } | { k: "forum" } | { k: "thread"; id: number }
  | { k: "certs" } | { k: "cert" } | { k: "help" } | { k: "settings" } | { k: "news" } | { k: "search"; q: string } | { k: "loggedout" };

export type SimStart = "overview" | "lesson" | "quiz";

const link = "min-h-[36px] rounded px-2 text-left text-[13px] underline decoration-dotted underline-offset-2 hover:bg-[#F4F2F7]";
const rowBtn = "block min-h-[36px] w-full rounded border border-[#D9D5E2] bg-white px-3 py-1.5 text-left text-[14px] hover:bg-[#F4F2F7]";
const none = () => undefined;

function Mk({ n, on, top }: { n: number; on?: boolean; top: string }) {
  return on ? (
    <span aria-hidden className="absolute -right-3 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#17212E] text-[11px] font-bold text-white" style={{ top }}>{n}</span>
  ) : null;
}

/** The top bar of the platform: the logo, a search field, the account menu. */
function TopBar({ go, onLogout }: { go: (p: Page) => void; onLogout: () => void }) {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  return (
    <div className={clsx("relative flex flex-wrap items-center gap-2 px-3 py-2 text-white", HEAD)}>
      <button type="button" onClick={() => go({ k: "home" })} className="mr-2 min-h-[36px] font-serif text-[15px] font-bold">EduCore</button>
      <form role="search" className="flex min-w-[140px] flex-1 gap-1" onSubmit={(e) => { e.preventDefault(); go({ k: "search", q: q.trim() }); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} aria-label={tt("Search the platform", "Die Plattform durchsuchen")} placeholder={tt("Search lessons and courses", "Lektionen und Kurse suchen")} className="min-h-[36px] w-full rounded bg-white px-2 text-[13px] text-[#2B2B2B] placeholder:text-[#777]" />
        <button type="submit" className="min-h-[36px] rounded bg-white/15 px-3 text-[13px] hover:bg-white/25">{tt("Search", "Suchen")}</button>
      </form>
      <button type="button" aria-expanded={menu} onClick={() => setMenu((m) => !m)} className="min-h-[36px] rounded bg-white/15 px-3 text-[13px] hover:bg-white/25">{tt("Mia Berg ▾", "Mia Berg ▾")}</button>
      {menu && (
        <ul className="absolute right-3 top-[46px] z-20 w-44 rounded border border-[#D9D5E2] bg-white py-1 text-[13px] text-[#2B2B2B] shadow-md">
          <li><button type="button" onClick={() => { setMenu(false); go({ k: "settings" }); }} className="block min-h-[36px] w-full px-3 text-left hover:bg-[#F4F2F7]">{tt("Settings", "Einstellungen")}</button></li>
          <li><button type="button" onClick={() => { setMenu(false); go({ k: "help" }); }} className="block min-h-[36px] w-full px-3 text-left hover:bg-[#F4F2F7]">{tt("Help", "Hilfe")}</button></li>
          <li><button type="button" onClick={() => { setMenu(false); onLogout(); }} className="block min-h-[36px] w-full px-3 text-left hover:bg-[#F4F2F7]">{tt("Log out", "Abmelden")}</button></li>
        </ul>
      )}
    </div>
  );
}

const MENU_PAGES: Page[] = [{ k: "home" }, { k: "courses" }, { k: "catalogue" }, { k: "calendar" }, { k: "messages" }, { k: "forum" }, { k: "certs" }, { k: "help" }, { k: "settings" }];
const MENU_K = ["home", "courses", "catalogue", "calendar", "messages", "forum", "certs", "help", "settings"];

/** The menu of nine entries: every entry is a link to its page. */
function SideMenu({ cur, go, className }: { cur?: string; go: (p: Page) => void; className?: string }) {
  return (
    <ul className={clsx("space-y-1", className)} aria-label={tt("Menu", "Menü")}>
      {MENU().map((m, i) => (
        <li key={m}>
          <button type="button" aria-current={cur === MENU_K[i] ? "page" : undefined} onClick={() => go(MENU_PAGES[i])} className={clsx("block min-h-[36px] w-full rounded px-2 py-1.5 text-left text-[13px] hover:bg-[#E9E6F0]", cur === MENU_K[i] ? "bg-[#E9E6F0] font-semibold" : "bg-[#F4F2F7]")}>{m}</button>
        </li>
      ))}
    </ul>
  );
}

/** The lesson text as it sits on the page (heading and one block), with the places of the numbered facts when `marks` is on. */
export function LessonBody({ i = 6, marks = false }: { i?: number; marks?: boolean }) {
  const topics = TOPICS();
  return (
    <div>
      <h3 className="mb-2 text-[17px] font-semibold">{topics[i]}</h3>
      <div className="relative">
        <p className="text-[14px] leading-[1.55]">{lessonText(i)}</p>
        {i === 6 && (<><Mk n={1} on={marks} top="0%" /><Mk n={4} on={marks} top="30%" /><Mk n={5} on={marks} top="58%" /><Mk n={6} on={marks} top="88%" /></>)}
      </div>
    </div>
  );
}

/** The module overview: 28 lessons in one flat list. */
export function OverviewList({ onOpen, done = [], marks = false }: { onOpen: (i: number) => void; done?: number[]; marks?: boolean }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[17px] font-semibold">{tt("Data protection in practice", "Datenschutz in der Praxis")}</h3>
      <div className="relative">
        <ul className="space-y-1">
          {TOPICS().map((x, i) => (
            <li key={i}>
              <button type="button" onClick={() => onOpen(i)} className={clsx(rowBtn, "flex items-center justify-between gap-2")}>
                <span>{x}</span>
                {done.includes(i) && <span className="shrink-0 text-[12px] text-[#5F5E5A]">{tt("Completed ✓", "Abgeschlossen ✓")}</span>}
              </button>
            </li>
          ))}
        </ul>
        <Mk n={7} on={marks} top="60px" /><Mk n={8} on={marks} top="150px" />
      </div>
    </div>
  );
}

/** The banner, the recommendation box and the chat of the lesson page. The chat keeps what is written. */
function Extras({ banner, go, chat, onChat, parts }: { banner: boolean; go: (p: Page) => void; chat: string[]; onChat: (t: string) => void; parts: "banner" | "side" }) {
  const [draft, setDraft] = useState("");
  const topics = TOPICS();
  if (parts === "banner" && banner) {
    return <button type="button" onClick={() => go({ k: "news" })} className="block min-h-[40px] w-full bg-[#E8DFC8] px-4 py-2 text-left text-[13px] font-semibold hover:bg-[#E0D5B8]">{tt("NEWS · 12 new courses added this month. See what is new.", "NEWS · 12 neue Kurse in diesem Monat. Sehen Sie, was neu ist.")}</button>;
  }
  if (parts === "banner") return null;
  return (
    <div className="space-y-3">
      <div className="rounded border border-[#D9D5E2] bg-[#FAF9FC] p-2">
        <p className="text-[13px] font-semibold">{tt("Recommended for you", "Für Sie empfohlen")}</p>
        <ul className="mt-1 space-y-1 text-[13px]">
          {[21, 22, 25].map((i) => (
            <li key={i}><button type="button" onClick={() => go({ k: "lesson", i })} className="block min-h-[34px] w-full rounded bg-[#E9E6F0] px-2 py-1 text-left hover:bg-[#DDD8EA]">{topics[i]}</button></li>
          ))}
        </ul>
      </div>
      <div className="rounded border border-[#D9D5E2] bg-white">
        <p className={clsx("px-2 py-1 text-[13px] font-semibold text-white", HEAD)}>{tt("Chat · 3 online", "Chat · 3 online")}</p>
        <div className="space-y-1 p-2 text-[13px]">
          <p className="rounded-xl bg-[#F4F2F7] px-2 py-1">{tt("Has anyone finished lesson 7?", "Hat jemand Lektion 7 beendet?")}</p>
          <p className="ml-6 rounded-xl bg-[#E9E6F0] px-2 py-1">{tt("Not yet.", "Noch nicht.")}</p>
          {chat.map((m, i) => (<p key={i} className="ml-6 rounded-xl bg-[#E9E6F0] px-2 py-1">{m}</p>))}
          <form className="flex gap-1" onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { onChat(draft.trim()); setDraft(""); } }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label={tt("Write a message", "Nachricht schreiben")} placeholder={tt("Write a message…", "Nachricht schreiben …")} className="min-h-[34px] w-full rounded border border-[#D9D5E2] px-2 text-[13px]" />
            <button type="submit" className="min-h-[34px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-2 text-[13px]">{tt("Send", "Senden")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/** The quiz: all 12 questions on one page. */
export function QuizForm({ picked, onPick, onSubmit, marks = false }: { picked: Record<number, string>; onPick: (i: number, v: string) => void; onSubmit: () => void; marks?: boolean }) {
  return (
    <div className="relative space-y-3">
      <h3 className="text-[17px] font-semibold">{tt("Quiz · data protection", "Quiz · Datenschutz")}</h3>
      {QUIZ().map((q, i) => (
        <fieldset key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <legend className="mb-1 text-[14px]">{`${i + 1}. ${q}`}</legend>
          {(["true", "false"] as const).map((v) => (
            <label key={v} className="flex min-h-[32px] cursor-pointer items-center gap-2 text-[14px]">
              <input type="radio" name={`q${i}`} checked={picked[i] === v} onChange={() => onPick(i, v)} />
              {v === "true" ? tt("True", "Wahr") : tt("False", "Falsch")}
            </label>
          ))}
        </fieldset>
      ))}
      <button type="button" onClick={onSubmit} className={btn}>{tt("Submit", "Absenden")}</button>
      <Mk n={3} on={marks} top="300px" />
    </div>
  );
}

/** Four screens of the platform, exactly as the simulation shows them, for the pictures of Route 1: not clickable, the numbers mark the places the facts describe. */
export function EduCoreShot({ screen, marks }: { screen: "l7" | "ov" | "ex" | "qz"; marks: boolean }) {
  const fold = (h: number, kids: ReactNode) => (
    <div className="relative overflow-hidden" style={{ maxHeight: h }}>
      {kids}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
  return (
    <div className={clsx("w-[560px] bg-white", INK)} aria-hidden>
      <TopBar go={none} onLogout={none} />
      {screen === "l7" && <div className="px-6 py-4"><LessonBody marks={marks} /></div>}
      {screen === "ov" && fold(520, <div className="px-6 py-4"><OverviewList onOpen={none} marks={marks} /></div>)}
      {screen === "qz" && fold(520, <div className="px-6 py-4"><QuizForm picked={{}} onPick={none} onSubmit={none} marks={marks} /></div>)}
      {screen === "ex" && (
        <div>
          <div className="relative"><Extras banner go={none} chat={[]} onChat={none} parts="banner" /><Mk n={2} on={marks} top="25%" /></div>
          {fold(380, (
            <div className="grid grid-cols-[110px_minmax(0,1fr)_160px] gap-3 px-3 py-3">
              <SideMenu go={none} />
              <LessonBody />
              <Extras banner go={none} chat={[]} onChat={none} parts="side" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const MESSAGES = () => [
  { from: tt("Your trainer", "Ihre Trainerin"), subject: tt("Welcome to the module", "Willkommen im Modul"), body: tt("Welcome to Data protection in practice. Work through the lessons at your own pace and write to me here if something is unclear.", "Willkommen in Datenschutz in der Praxis. Arbeiten Sie die Lektionen in Ihrem eigenen Tempo durch und schreiben Sie mir hier, wenn etwas unklar ist.") },
  { from: tt("EduCore", "EduCore"), subject: tt("Your certificate for Hygiene rules", "Ihr Zertifikat für Hygieneregeln"), body: tt("Your certificate for Hygiene rules is ready. You find it under Certificates.", "Ihr Zertifikat für Hygieneregeln ist fertig. Sie finden es unter Zertifikate.") },
  { from: tt("EduCore", "EduCore"), subject: tt("12 new courses", "12 neue Kurse"), body: tt("Twelve new courses were added this month. Open the catalogue to see them.", "In diesem Monat wurden zwölf neue Kurse hinzugefügt. Öffnen Sie den Katalog, um sie zu sehen.") },
];
const THREADS = () => [
  { title: tt("Where do I find the quiz?", "Wo finde ich das Quiz?"), posts: [[tt("Jonas", "Jonas"), tt("I finished the lessons. Where is the quiz?", "Ich habe die Lektionen beendet. Wo ist das Quiz?")], [tt("Your trainer", "Ihre Trainerin"), tt("Open the module overview and choose “Go to the quiz” under the list.", "Öffnen Sie die Modulübersicht und wählen Sie unter der Liste „Zum Quiz“.")]] },
  { title: tt("Can I save my progress?", "Kann ich meinen Fortschritt speichern?"), posts: [[tt("Ayse", "Ayse"), tt("If I close the window, will the platform remember where I was?", "Wenn ich das Fenster schließe, merkt sich die Plattform, wo ich war?")], [tt("Your trainer", "Ihre Trainerin"), tt("Yes. Lessons you mark as complete are kept in your account.", "Ja. Lektionen, die Sie als abgeschlossen markieren, bleiben in Ihrem Konto erhalten.")]] },
  { title: tt("Certificate for my employer", "Zertifikat für meinen Arbeitgeber"), posts: [[tt("Tomasz", "Tomasz"), tt("My employer wants a PDF of the certificate. Is that possible?", "Mein Arbeitgeber möchte ein PDF des Zertifikats. Ist das möglich?")], [tt("Your trainer", "Ihre Trainerin"), tt("Open the certificate under Certificates and use Print or save as PDF.", "Öffnen Sie das Zertifikat unter Zertifikate und nutzen Sie Drucken oder als PDF speichern.")]] },
  { title: tt("Study group on Thursday", "Lerngruppe am Donnerstag"), posts: [[tt("Mia", "Mia"), tt("Does anyone want to go through the lessons together on Thursday?", "Hat jemand Lust, die Lektionen am Donnerstag gemeinsam durchzugehen?")]] },
];
const EVENTS = () => [
  { day: 4, title: tt("Live Q&A: Data protection in practice", "Live-Fragestunde: Datenschutz in der Praxis"), when: tt("Thursday 10:00 to 11:00", "Donnerstag 10:00 bis 11:00"), text: tt("Your trainer answers questions about the module. You can join with the link in your account.", "Ihre Trainerin beantwortet Fragen zum Modul. Sie können mit dem Link in Ihrem Konto teilnehmen.") },
  { day: 11, title: tt("Webinar: Hygiene rules, refresher", "Webinar: Hygieneregeln, Auffrischung"), when: tt("Thursday 14:00 to 15:00", "Donnerstag 14:00 bis 15:00"), text: tt("A short refresher for everyone who finished Hygiene rules.", "Eine kurze Auffrischung für alle, die Hygieneregeln beendet haben.") },
  { day: 19, title: tt("Course start: Information security", "Kursstart: Informationssicherheit"), when: tt("Friday, all day", "Freitag, ganztägig"), text: tt("The new course Information security opens for enrolment.", "Der neue Kurs Informationssicherheit öffnet für die Anmeldung.") },
];
const FAQ = () => [
  [tt("How do I reset my password?", "Wie setze ich mein Passwort zurück?"), tt("Open the account menu at the top right, choose Settings and then Change password.", "Öffnen Sie das Kontomenü oben rechts, wählen Sie Einstellungen und dann Passwort ändern.")],
  [tt("Where do I see my progress?", "Wo sehe ich meinen Fortschritt?"), tt("Open the module overview. Lessons you marked as complete carry the note “Completed”.", "Öffnen Sie die Modulübersicht. Lektionen, die Sie abgeschlossen haben, tragen den Hinweis „Abgeschlossen“.")],
  [tt("How do I get my certificate?", "Wie bekomme ich mein Zertifikat?"), tt("When you have finished a course, the certificate appears under Certificates.", "Wenn Sie einen Kurs beendet haben, erscheint das Zertifikat unter Zertifikate.")],
  [tt("Can I use EduCore on my phone?", "Kann ich EduCore auf dem Handy nutzen?"), tt("Yes. The platform opens in the browser of your phone.", "Ja. Die Plattform öffnet sich im Browser Ihres Handys.")],
  [tt("Who do I ask when something is unclear?", "Wen frage ich, wenn etwas unklar ist?"), tt("Write to your trainer under Messages, or start a thread in the Forum.", "Schreiben Sie Ihrer Trainerin unter Nachrichten oder eröffnen Sie im Forum einen Beitrag.")],
];

/** The EduCore platform as one of its learners meets it (Blocks 2.1 and the desk): every part is a working page. Nothing is marked and no verdict is given; all texts and the catalogue are made up. */
export function EduCoreSim({ start = "overview" }: { start?: SimStart } = {}) {
  const [page, setPage] = useState<Page>(start === "lesson" ? { k: "lesson", i: 6 } : start === "quiz" ? { k: "quiz" } : { k: "overview" });
  const [done, setDone] = useState<number[]>([]);
  const [enrolled, setEnrolled] = useState<string[]>(["dp"]);
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [posts, setPosts] = useState<Record<string, string[]>>({});
  const [added, setAdded] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [msg, setMsg] = useState(0);
  const [reply, setReply] = useState("");
  const [empty, setEmpty] = useState(false);
  const [sent, setSent] = useState<number[]>([]);
  const topics = TOPICS();
  const courses = COURSES();
  const go = (p: Page) => { setPage(p); setSaved(false); setReply(""); setEmpty(false); };
  const addPost = (key: string, text: string) => setPosts((s) => ({ ...s, [key]: [...(s[key] ?? []), text] }));
  const h = (t: string) => <h3 className="text-[17px] font-semibold">{t}</h3>;
  const back = (label: string, to: Page) => <button type="button" onClick={() => go(to)} className={link}>‹ {label}</button>;
  const courseTitle = (id: string) => courses.find((c) => c.id === id)?.title ?? "";
  const openCourse = (id: string) => go(id === "dp" ? { k: "overview" } : enrolled.includes(id) ? { k: "welcome", id } : { k: "course", id });
  const crumbs = (last?: string) => (
    <p className="flex flex-wrap items-center gap-x-1 text-[12px] text-[#5F5E5A]">
      <button type="button" onClick={() => go({ k: "courses" })} className={link}>{tt("My courses", "Meine Kurse")}</button>›
      {last ? <button type="button" onClick={() => go({ k: "overview" })} className={link}>{tt("Data protection in practice", "Datenschutz in der Praxis")}</button> : <span className="px-2 font-semibold">{tt("Data protection in practice", "Datenschutz in der Praxis")}</span>}
      {last && <>›<span className="px-1">{last}</span></>}
    </p>
  );

  let body: ReactNode = null;
  let wide = false;
  switch (page.k) {
    case "overview":
      body = (
        <div className="space-y-3">
          {crumbs()}
          <OverviewList onOpen={(i) => go({ k: "lesson", i })} done={done} />
          <button type="button" onClick={() => go({ k: "quiz" })} className={btn}>{tt("Go to the quiz", "Zum Quiz")}</button>
        </div>
      );
      break;
    case "lesson": {
      const i = page.i;
      wide = true;
      body = (
        <div>
          <Extras banner go={go} chat={[]} onChat={none} parts="banner" />
          <div className="space-y-3 px-1 pt-2">
            {crumbs(topics[i])}
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px]">
              <div className="space-y-3">
                <LessonBody i={i} />
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => go({ k: "lesson", i: Math.max(0, i - 1) })} className={btn}>‹ {tt("Previous", "Zurück")}</button>
                  <button type="button" onClick={() => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))} aria-pressed={done.includes(i)} className={btn}>{done.includes(i) ? tt("Completed ✓", "Abgeschlossen ✓") : tt("Mark as complete", "Als abgeschlossen markieren")}</button>
                  <button type="button" onClick={() => go(i === topics.length - 1 ? { k: "quiz" } : { k: "lesson", i: i + 1 })} className={btn}>{i === topics.length - 1 ? tt("Go to the quiz", "Zum Quiz") : tt("Next", "Weiter")} ›</button>
                </div>
              </div>
              <Extras banner={false} go={go} chat={posts.chat ?? []} onChat={(t) => addPost("chat", t)} parts="side" />
            </div>
          </div>
        </div>
      );
      break;
    }
    case "quiz":
      body = (
        <div className="space-y-2">
          {crumbs(tt("Quiz", "Quiz"))}
          <QuizForm picked={picked} onPick={(i, v) => setPicked((s) => ({ ...s, [i]: v }))} onSubmit={() => go({ k: "submitted" })} />
        </div>
      );
      break;
    case "submitted":
      body = (
        <div className="space-y-3">
          {h(tt("Your answers were submitted", "Ihre Antworten wurden abgesendet"))}
          <p className="text-[14px]">{tt("Thank you. Your trainer receives the quiz.", "Danke. Ihre Trainerin erhält das Quiz.")}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => go({ k: "overview" })} className={btn}>{tt("Back to the module overview", "Zurück zur Modulübersicht")}</button>
            <button type="button" onClick={() => { setPicked({}); go({ k: "quiz" }); }} className={btn}>{tt("Take the quiz again", "Quiz erneut machen")}</button>
          </div>
        </div>
      );
      break;
    case "home":
      body = (
        <div className="space-y-3">
          {h(tt("Welcome back, Mia", "Willkommen zurück, Mia"))}
          <div className="rounded border border-[#D9D5E2] bg-[#FAF9FC] p-3">
            <p className="text-[13px] text-[#5F5E5A]">{tt("Continue where you stopped", "Dort weitermachen, wo Sie aufgehört haben")}</p>
            <button type="button" onClick={() => go({ k: "lesson", i: 6 })} className={clsx(rowBtn, "mt-1")}>{topics[6]} · {tt("Data protection in practice", "Datenschutz in der Praxis")}</button>
          </div>
          <p className="text-[13px] font-semibold">{tt("Your courses", "Ihre Kurse")}</p>
          <ul className="space-y-1">{enrolled.map((id) => (<li key={id}><button type="button" onClick={() => openCourse(id)} className={rowBtn}>{courseTitle(id)}</button></li>))}</ul>
          <button type="button" onClick={() => go({ k: "news" })} className={link}>{tt("12 new courses this month", "12 neue Kurse in diesem Monat")}</button>
        </div>
      );
      break;
    case "courses":
      body = (
        <div className="space-y-2">
          {h(tt("My courses", "Meine Kurse"))}
          <ul className="space-y-1">{enrolled.map((id) => (<li key={id}><button type="button" onClick={() => openCourse(id)} className={rowBtn}><span className="font-semibold">{courseTitle(id)}</span><span className="block text-[12px] text-[#5F5E5A]">{courses.find((c) => c.id === id)?.blurb}</span></button></li>))}</ul>
          <button type="button" onClick={() => go({ k: "catalogue" })} className={btn}>{tt("Find more courses", "Weitere Kurse finden")}</button>
        </div>
      );
      break;
    case "catalogue":
    case "news": {
      const list = page.k === "news" ? courses.filter((c) => c.fresh) : courses;
      body = (
        <div className="space-y-2">
          {h(page.k === "news" ? tt("New this month · 12 courses", "Neu in diesem Monat · 12 Kurse") : tt("Course catalogue", "Kurskatalog"))}
          <ul className="space-y-1">{list.map((c) => (<li key={c.id}><button type="button" onClick={() => openCourse(c.id)} className={rowBtn}><span className="font-semibold">{c.title}</span><span className="block text-[12px] text-[#5F5E5A]">{c.blurb}</span></button></li>))}</ul>
        </div>
      );
      break;
    }
    case "course": {
      const c = courses.find((x) => x.id === page.id)!;
      body = (
        <div className="space-y-3">
          {back(tt("Catalogue", "Katalog"), { k: "catalogue" })}
          {h(c.title)}
          <p className="text-[14px] leading-[1.55]">{c.blurb} {tt("The course has several lessons and ends with a quiz. Each lesson is a page of text.", "Der Kurs hat mehrere Lektionen und endet mit einem Quiz. Jede Lektion ist eine Textseite.")}</p>
          <button type="button" onClick={() => { setEnrolled((e) => [...e, c.id]); go({ k: "welcome", id: c.id }); }} className={btn}>{tt("Enrol", "Anmelden")}</button>
        </div>
      );
      break;
    }
    case "welcome": {
      const c = courses.find((x) => x.id === page.id)!;
      body = (
        <div className="space-y-3">
          {back(tt("My courses", "Meine Kurse"), { k: "courses" })}
          {h(`${c.title} · ${tt("Welcome", "Willkommen")}`)}
          <p className="text-[14px] leading-[1.55]">{tt(`You are enrolled in ${c.title}. ${c.blurb} Work through the lessons in the list, one after the other, and finish with the quiz.`, `Sie sind für ${c.title} angemeldet. ${c.blurb} Arbeiten Sie die Lektionen der Liste nacheinander durch und beenden Sie den Kurs mit dem Quiz.`)}</p>
          <button type="button" onClick={() => go({ k: "courses" })} className={btn}>{tt("Back to my courses", "Zurück zu meinen Kursen")}</button>
        </div>
      );
      break;
    }
    case "calendar":
      body = (
        <div className="space-y-2">
          {h(tt("Calendar · March", "Kalender · März"))}
          <ol className="grid grid-cols-7 gap-1 text-center text-[12px]" aria-label={tt("March", "März")}>
            {[tt("Mon","Mo"), tt("Tue","Di"), tt("Wed","Mi"), tt("Thu","Do"), tt("Fri","Fr"), tt("Sat","Sa"), tt("Sun","So")].map((d, k) => (<li key={k} className="py-1 font-semibold text-[#5F5E5A]">{d}</li>))}
            {Array.from({ length: 31 }, (_, k) => {
              const ev = EVENTS().findIndex((e) => e.day === k + 1);
              return ev >= 0 ? (
                <li key={k}><button type="button" onClick={() => go({ k: "event", id: ev })} className="min-h-[40px] w-full rounded border border-[#4A4458] bg-[#E9E6F0] font-semibold hover:bg-[#DDD8EA]">{k + 1}</button></li>
              ) : (
                <li key={k} className="min-h-[40px] rounded border border-[#ECE9F1] py-2 text-[#777]">{k + 1}</li>
              );
            })}
          </ol>
        </div>
      );
      break;
    case "event": {
      const e = EVENTS()[page.id];
      body = (
        <div className="space-y-3">
          {back(tt("Calendar", "Kalender"), { k: "calendar" })}
          {h(e.title)}
          <p className="text-[13px] text-[#5F5E5A]">{e.when}</p>
          <p className="text-[14px] leading-[1.55]">{e.text}</p>
          <button type="button" onClick={() => setAdded((a) => (a.includes(page.id) ? a : [...a, page.id]))} className={btn}>{added.includes(page.id) ? tt("Added to your calendar ✓", "Zu Ihrem Kalender hinzugefügt ✓") : tt("Add to my calendar", "Zu meinem Kalender hinzufügen")}</button>
        </div>
      );
      break;
    }
    case "messages": {
      const m = MESSAGES()[msg];
      body = (
        <div className="grid gap-3 md:grid-cols-[200px_minmax(0,1fr)]">
          <ul className="space-y-1" aria-label={tt("Messages", "Nachrichten")}>{MESSAGES().map((x, i) => (<li key={i}><button type="button" aria-current={msg === i} onClick={() => { setMsg(i); setReply(""); }} className={clsx(rowBtn, msg === i && "bg-[#E9E6F0]")}><span className="block text-[12px] text-[#5F5E5A]">{x.from}</span>{x.subject}</button></li>))}</ul>
          <div className="space-y-2">
            {h(m.subject)}
            <p className="text-[12px] text-[#5F5E5A]">{m.from}</p>
            <p className="text-[14px] leading-[1.55]">{m.body}</p>
            {(posts[`m${msg}`] ?? []).map((r, i) => (<p key={i} className="ml-6 rounded-xl bg-[#E9E6F0] px-2 py-1 text-[13px]">{r}</p>))}
            <form className="space-y-1" onSubmit={(e) => { e.preventDefault(); if (reply.trim()) { addPost(`m${msg}`, reply.trim()); setReply(""); setSent((s) => [...s, msg]); } else { setSent((s) => s.filter((x) => x !== msg)); setEmpty(true); } }}>
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} aria-label={tt("Your reply", "Ihre Antwort")} rows={3} className="w-full rounded border border-[#D9D5E2] p-2 text-[14px]" />
              <button type="submit" className={btn}>{tt("Send reply", "Antwort senden")}</button>
              {sent.includes(msg) ? <span role="status" className="ml-2 text-[13px]">{tt("Sent.", "Gesendet.")}</span> : empty && <span role="status" className="ml-2 text-[13px]">{tt("Write your reply first.", "Schreiben Sie zuerst Ihre Antwort.")}</span>}
            </form>
          </div>
        </div>
      );
      break;
    }
    case "forum":
      body = (
        <div className="space-y-2">
          {h(tt("Forum", "Forum"))}
          <ul className="space-y-1">{THREADS().map((t, i) => (<li key={i}><button type="button" onClick={() => go({ k: "thread", id: i })} className={rowBtn}>{t.title}<span className="block text-[12px] text-[#5F5E5A]">{t.posts.length + (posts[`t${i}`]?.length ?? 0)} {tt("posts", "Beiträge")}</span></button></li>))}</ul>
        </div>
      );
      break;
    case "thread": {
      const t = THREADS()[page.id];
      body = (
        <div className="space-y-2">
          {back(tt("Forum", "Forum"), { k: "forum" })}
          {h(t.title)}
          {t.posts.map(([who, text], i) => (<p key={i} className="rounded border border-[#D9D5E2] bg-[#FAF9FC] p-2 text-[14px]"><span className="block text-[12px] font-semibold text-[#5F5E5A]">{who}</span>{text}</p>))}
          {(posts[`t${page.id}`] ?? []).map((r, i) => (<p key={i} className="rounded border border-[#D9D5E2] bg-white p-2 text-[14px]"><span className="block text-[12px] font-semibold text-[#5F5E5A]">Mia Berg</span>{r}</p>))}
          <form className="space-y-1" onSubmit={(e) => { e.preventDefault(); if (reply.trim()) { addPost(`t${page.id}`, reply.trim()); setReply(""); } }}>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} aria-label={tt("Your post", "Ihr Beitrag")} rows={3} className="w-full rounded border border-[#D9D5E2] p-2 text-[14px]" />
            <button type="submit" className={btn}>{tt("Post", "Beitrag senden")}</button>
          </form>
        </div>
      );
      break;
    }
    case "certs":
      body = (
        <div className="space-y-2">
          {h(tt("Certificates", "Zertifikate"))}
          <button type="button" onClick={() => go({ k: "cert" })} className={rowBtn}><span className="font-semibold">{tt("Hygiene rules", "Hygieneregeln")}</span><span className="block text-[12px] text-[#5F5E5A]">{tt("Issued · open the certificate", "Ausgestellt · Zertifikat öffnen")}</span></button>
          <p className="rounded border border-dashed border-[#B9B4C4] px-3 py-2 text-[14px]"><span className="font-semibold">{tt("Data protection in practice", "Datenschutz in der Praxis")}</span><span className="block text-[12px] text-[#5F5E5A]">{tt("Available when you have finished all lessons and the quiz.", "Verfügbar, wenn Sie alle Lektionen und das Quiz beendet haben.")}</span></p>
        </div>
      );
      break;
    case "cert":
      body = (
        <div className="space-y-3">
          {back(tt("Certificates", "Zertifikate"), { k: "certs" })}
          <div className="rounded border-4 border-double border-[#4A4458] p-6 text-center">
            <p className="font-serif text-[20px] font-bold">EduCore</p>
            <p className="mt-2 text-[13px]">{tt("This certifies that", "Hiermit wird bestätigt, dass")}</p>
            <p className="font-serif text-[22px]">Mia Berg</p>
            <p className="text-[13px]">{tt("has successfully completed the course", "den Kurs erfolgreich abgeschlossen hat:")}</p>
            <p className="mt-1 text-[16px] font-semibold">{tt("Hygiene rules", "Hygieneregeln")}</p>
          </div>
          <button type="button" onClick={() => window.print()} className={btn}>{tt("Print or save as PDF", "Drucken oder als PDF speichern")}</button>
        </div>
      );
      break;
    case "help":
      body = (
        <div className="space-y-2">
          {h(tt("Help", "Hilfe"))}
          <ul className="space-y-1">{FAQ().map(([q, a], i) => (<li key={i}><button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className={rowBtn}>{q}</button>{open === i && <p className="px-3 py-2 text-[14px]">{a}</p>}</li>))}</ul>
        </div>
      );
      break;
    case "settings":
      body = (
        <form className="max-w-sm space-y-3" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          {h(tt("Settings", "Einstellungen"))}
          <label className="block text-[13px]">{tt("Name", "Name")}<input defaultValue="Mia Berg" className="mt-1 block min-h-[36px] w-full rounded border border-[#D9D5E2] px-2 text-[14px]" /></label>
          <label className="block text-[13px]">{tt("E-mail", "E-Mail")}<input defaultValue="mia.berg@example.com" className="mt-1 block min-h-[36px] w-full rounded border border-[#D9D5E2] px-2 text-[14px]" /></label>
          <label className="block text-[13px]">{tt("Language", "Sprache")}<select defaultValue="en" className="mt-1 block min-h-[36px] w-full rounded border border-[#D9D5E2] px-2 text-[14px]"><option value="en">English</option><option value="de">Deutsch</option></select></label>
          <label className="flex min-h-[36px] items-center gap-2 text-[13px]"><input type="checkbox" defaultChecked />{tt("E-mail me about new courses", "Mich per E-Mail über neue Kurse informieren")}</label>
          <button type="submit" className={btn}>{tt("Save", "Speichern")}</button>
          {saved && <p role="status" className="text-[13px]">{tt("Your settings were saved.", "Ihre Einstellungen wurden gespeichert.")}</p>}
        </form>
      );
      break;
    case "search": {
      const q = page.q.toLowerCase();
      const hitsL = q ? topics.map((x, i) => ({ x, i })).filter(({ x }) => x.toLowerCase().includes(q)) : [];
      const hitsC = q ? courses.filter((c) => c.title.toLowerCase().includes(q)) : [];
      body = (
        <div className="space-y-2">
          {h(tt("Search results", "Suchergebnisse"))}
          {!q && <p className="text-[14px]">{tt("Type a word in the search field above.", "Geben Sie oben im Suchfeld ein Wort ein.")}</p>}
          {q && hitsL.length + hitsC.length === 0 && <p className="text-[14px]">{tt(`Nothing found for “${page.q}”.`, `Nichts gefunden für „${page.q}“.`)}</p>}
          <ul className="space-y-1">
            {hitsL.map(({ x, i }) => (<li key={`l${i}`}><button type="button" onClick={() => go({ k: "lesson", i })} className={rowBtn}>{x}<span className="block text-[12px] text-[#5F5E5A]">{tt("Lesson · Data protection in practice", "Lektion · Datenschutz in der Praxis")}</span></button></li>))}
            {hitsC.map((c) => (<li key={c.id}><button type="button" onClick={() => openCourse(c.id)} className={rowBtn}>{c.title}<span className="block text-[12px] text-[#5F5E5A]">{tt("Course", "Kurs")}</span></button></li>))}
          </ul>
        </div>
      );
      break;
    }
    case "loggedout":
      body = (
        <div className="space-y-3 py-6 text-center">
          {h(tt("You have been logged out", "Sie wurden abgemeldet"))}
          <button type="button" onClick={() => go({ k: "home" })} className={btn}>{tt("Log in again", "Erneut anmelden")}</button>
        </div>
      );
      break;
  }

  const cur = ["home", "courses", "catalogue", "calendar", "messages", "forum", "certs", "help", "settings"].includes(page.k) ? page.k : undefined;
  if (page.k === "loggedout") return <div className={INK}><div className={clsx("px-3 py-2 font-serif text-[15px] font-bold text-white", HEAD)}>EduCore</div><div className="px-4 py-4">{body}</div></div>;
  return (
    <div className={INK}>
      <TopBar go={go} onLogout={() => go({ k: "loggedout" })} />
      <div className="grid md:grid-cols-[130px_minmax(0,1fr)]">
        <SideMenu cur={cur} go={go} className="border-b border-[#ECE9F1] p-2 md:border-b-0 md:border-r" />
        <main className={clsx("min-w-0", wide ? "pb-3" : "px-4 py-4")}>{body}</main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.1 and 1.2 · one lesson, read as a learner reads it */

/** A lesson of the course in a bare page frame: the top bar of the platform and a bottom bar with "Mark as complete" that answers. */
function LessonFrame({ children, onFinish, finishLabel }: { children: ReactNode; onFinish?: () => void; finishLabel?: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className={INK}>
      <div className={clsx("px-3 py-2 font-serif text-[15px] font-bold text-white", HEAD)}>EduCore</div>
      {done ? (
        <div className="space-y-3 px-4 py-6">
          <h3 className="text-[17px] font-semibold">{tt("Lesson completed", "Lektion abgeschlossen")}</h3>
          <p className="text-[14px]">{tt("Your progress was saved.", "Ihr Fortschritt wurde gespeichert.")}</p>
          <button type="button" onClick={() => setDone(false)} className={btn}>{tt("Back to the lesson", "Zurück zur Lektion")}</button>
        </div>
      ) : (
        <>
          <div className="px-4 py-4">{children}</div>
          <div className="px-4 pb-4"><button type="button" onClick={() => (onFinish ? onFinish() : setDone(true))} className={btn}>{finishLabel ?? tt("Mark as complete", "Als abgeschlossen markieren")}</button></div>
        </>
      )}
    </div>
  );
}

/** Block 1.1 · Lesson 7 as the plan describes it: one continuous text of about 500 words, no paragraphs, no headings, no lists, no picture, no explanation of terms, every sentence alike. */
export function LessonReadingSim() {
  return (
    <LessonFrame>
      <LessonBody />
    </LessonFrame>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the three options, as the same lesson */

function Diagram({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="my-3 rounded-lg border border-[#D9D5E2] bg-[#FAF9FC] p-3" aria-label={label}>
      {children}
      <figcaption className="mt-2 text-[12px] text-[#5F5E5A]">{label}</figcaption>
    </figure>
  );
}

const Box = ({ children, strong }: { children: React.ReactNode; strong?: boolean }) => (
  <span className={clsx("rounded border px-2 py-1 text-[13px]", strong ? "border-[#4A4458] bg-[#E9E6F0] font-semibold" : "border-[#B9B4C4] bg-white")}>{children}</span>
);

/** The module of Block 1.2 as each option leaves it: A shortened significantly, B with diagrams and graphics, C split into small modules. */
export function OptionSim({ option }: { option: OptId }) {
  const parts = PARTS();
  const [unit, setUnit] = useState(0);
  if (option === "A") {
    return (
      <LessonFrame>
        <h3 className="mb-2 text-[17px] font-semibold">{LESSON_TITLE()}</h3>
        <p className="text-[14px] leading-[1.55]">{`${parts[0].text} ${parts[5].text}`}</p>
      </LessonFrame>
    );
  }
  if (option === "B") {
    return (
      <LessonFrame>
        <div className="space-y-3">
          <h3 className="text-[17px] font-semibold">{LESSON_TITLE()}</h3>
          <p className="text-[14px] leading-[1.55]">{parts[0].text}</p>
          <Diagram label={tt("Figure 1 · the three most common lawful bases", "Abbildung 1 · die drei häufigsten Rechtsgrundlagen")}>
            <div className="flex flex-wrap items-center gap-2">
              <Box strong>{tt("Personal data", "Personenbezogene Daten")}</Box>
              <span aria-hidden>→</span>
              <Box>{tt("Consent", "Einwilligung")}</Box>
              <Box>{tt("Contract", "Vertrag")}</Box>
              <Box>{tt("Legitimate interest", "Berechtigtes Interesse")}</Box>
            </div>
          </Diagram>
          <Diagram label={tt("Figure 2 · pseudonymisation: the key is kept apart", "Abbildung 2 · Pseudonymisierung: der Schlüssel wird getrennt aufbewahrt")}>
            <div className="flex flex-wrap items-center gap-2">
              <Box>{tt("Name: Mia Berg", "Name: Mia Berg")}</Box>
              <span aria-hidden>→</span>
              <Box strong>{tt("Code: L-4821", "Code: L-4821")}</Box>
              <span aria-hidden>→</span>
              <Box>{tt("Analysis", "Auswertung")}</Box>
            </div>
            <p className="mt-2 text-[13px]">{tt("Key table (name ↔ code): stored separately and protected.", "Schlüsseltabelle (Name ↔ Code): getrennt und geschützt gespeichert.")}</p>
          </Diagram>
          <p className="text-[14px] leading-[1.55]">{`${parts[3].text} ${parts[4].text}`}</p>
          <p className="text-[14px] leading-[1.55]">{`${parts[5].text} ${parts[6].text}`}</p>
        </div>
      </LessonFrame>
    );
  }
  const last = parts.length - 1;
  return (
    <LessonFrame key={unit === last ? "last" : "unit"} finishLabel={unit === last ? tt("Finish the module", "Modul beenden") : tt("Next", "Weiter") + " ›"} onFinish={unit === last ? undefined : () => setUnit((u) => Math.min(last, u + 1))}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-[#E4E0EC]" role="progressbar" aria-valuemin={0} aria-valuemax={parts.length} aria-valuenow={unit + 1} aria-label={tt("Progress", "Fortschritt")}>
            <div className="h-2 rounded-full bg-[#4A4458]" style={{ width: `${Math.round(((unit + 1) / parts.length) * 100)}%` }} />
          </div>
          <span className="text-[13px] text-[#555]">{tt(`Unit ${unit + 1} of ${parts.length}`, `Einheit ${unit + 1} von ${parts.length}`)}</span>
        </div>
        <p className="text-[12px] font-semibold text-[#4A4458]">{LESSON_TITLE()} · {tt("about 2 min", "ca. 2 Min.")}</p>
        <h3 className="text-[17px] font-semibold">{parts[unit].title}</h3>
        <p className="max-w-prose text-[15px] leading-relaxed">{parts[unit].text}</p>
        {unit > 0 && <button type="button" onClick={() => setUnit((u) => Math.max(0, u - 1))} className={btn}>‹ {tt("Back", "Zurück")}</button>}
      </div>
    </LessonFrame>
  );
}
