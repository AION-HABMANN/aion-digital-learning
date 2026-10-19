"use client";

import { EduCoreSim } from "@/components/day3/sims";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 3 · Route 2 · "Observe the platform for real" (2026-10-18). EduCore as it is today, what professional learners say in their own words, and what EduCore records. The brief's
 * facts only: the platform is rated "too complicated", the content is professionally necessary but hard to understand, there is no user data. No total, no verdict.
 */
function VoicesDay3() {
  return (
    <VoicesView
      intro={tt("Messages and ratings from learners, as the feedback form of EduCore shows them.", "Nachrichten und Bewertungen von Lernenden, so wie das Feedbackformular von EduCore sie zeigt.")}
      voices={[
        { who: tt("A nurse manager", "Eine Pflegedienstleiterin"), meta: tt("needs the module for her certificate", "braucht das Modul für ihr Zertifikat"), device: tt("Laptop", "Laptop"), page: "/module/contract-law-1/lesson-4", channel: tt("Feedback form · “too complicated”", "Feedbackformular · „zu kompliziert“"), text: tt("I need this for my certificate, so I will get through it. But I read each paragraph three times and I still do not know what to remember.", "Ich brauche das für mein Zertifikat, ich komme also durch. Aber ich lese jeden Absatz dreimal und weiß trotzdem nicht, was ich mir merken soll.") },
        { who: tt("A site engineer", "Ein Bauleiter"), meta: tt("site engineer", "Bauleiter"), device: tt("Tablet", "Tablet"), page: "/module/hygiene-rules/lesson-2", channel: tt("Feedback form · “too complicated”", "Feedbackformular · „zu kompliziert“"), text: tt("There is a diagram, a table, two boxes and a video on one screen. I do not know where to start.", "Auf einem Bildschirm sind ein Diagramm, eine Tabelle, zwei Kästen und ein Video. Ich weiß nicht, wo ich anfangen soll.") },
        { who: tt("A tax adviser", "Ein Steuerberater"), meta: tt("tax adviser", "Steuerberater"), device: tt("Laptop", "Laptop"), channel: tt("E-mail", "E-Mail"), text: tt("The content is right and I need all of it. I just wish it came in smaller pieces.", "Der Inhalt stimmt, und ich brauche alles davon. Ich wünschte nur, er käme in kleineren Stücken.") },
        { who: tt("A training manager", "Eine Weiterbildungsleiterin"), meta: tt("books EduCore for her firm", "bucht EduCore für ihre Firma"), text: tt("My people call the platform “too complicated”. When I ask what they mean, they say the content, not the buttons.", "Meine Leute nennen die Plattform „zu kompliziert“. Wenn ich frage, was sie meinen, sagen sie: den Inhalt, nicht die Buttons.") },
        { who: tt("A support agent", "Ein Support-Mitarbeiter"), meta: tt("our own team", "unser eigenes Team"), text: tt("“Too complicated” is the phrase I hear most. Nobody has told me which lesson it is about.", "„Zu kompliziert“ ist der Satz, den ich am häufigsten höre. Niemand hat mir gesagt, um welche Lektion es geht.") },
      ]}
    />
  );
}

function RecordsDay3() {
  return (
    <RecordsView
      intro={tt("What EduCore's admin console can show today.", "Was die Admin-Konsole von EduCore heute zeigen kann.")}
      reports={[
        {
          name: tt("Learner ratings", "Bewertungen der Lernenden"),
          unit: tt("ratings", "Bewertungen"), bars: [{ label: tt("too complicated", "zu kompliziert"), value: 41 }, { label: tt("too long", "zu lang"), value: 12 }, { label: tt("good content", "guter Inhalt"), value: 18 }, { label: tt("other", "Sonstiges"), value: 9 }], head: [tt("Date", "Datum"), tt("Module", "Modul"), tt("Rating", "Bewertung")],
          rows: [
            ["02 Mar", tt("Data protection basics", "Datenschutz-Grundlagen"), tt("too complicated", "zu kompliziert")],
            ["02 Mar", tt("Contract law, part 1", "Vertragsrecht, Teil 1"), tt("too complicated", "zu kompliziert")],
            ["03 Mar", tt("Data protection basics", "Datenschutz-Grundlagen"), tt("good content", "guter Inhalt")],
            ["04 Mar", tt("Hygiene rules", "Hygieneregeln"), tt("too complicated", "zu kompliziert")],
            ["05 Mar", tt("Contract law, part 1", "Vertragsrecht, Teil 1"), tt("too complicated", "zu kompliziert")],
            ["05 Mar", tt("Hygiene rules", "Hygieneregeln"), tt("too long", "zu lang")],
          ],
          note: tt("Free-form ratings, newest last. A sample; nothing is added up.", "Freie Bewertungen, die neueste zuletzt. Ein Ausschnitt; nichts wird zusammengezählt."),
        },
        { name: tt("Lessons opened", "Geöffnete Lektionen"), unit: tt("opens", "Aufrufe"), bars: [{ label: tt("Welcome", "Willkommen"), value: 1320 }, { label: tt("Personal data", "Personenbezogene Daten"), value: 980 }, { label: tt("Learning analytics and data protection", "Learning Analytics und Datenschutz"), value: 840 }, { label: tt("Consent", "Einwilligung"), value: 760 }, { label: tt("Review and next steps", "Rückblick und nächste Schritte"), value: 410 }], note: tt("A selection of the 28 lessons. The report shows the lesson, not what the learner did on it.", "Eine Auswahl der 28 Lektionen. Der Bericht zeigt die Lektion, nicht was die Lernende darauf getan hat.") },
        { name: tt("Quizzes finished", "Beendete Quizze"), unit: tt("finished", "beendet"), bars: [{ label: tt("Quiz · data protection", "Quiz · Datenschutz"), value: 620 }, { label: tt("Quiz · contract law", "Quiz · Vertragsrecht"), value: 450 }, { label: tt("Quiz · hygiene rules", "Quiz · Hygieneregeln"), value: 380 }] },
        { name: tt("Time on each screen", "Zeit auf jedem Bildschirm") },
        { name: tt("Where learners reread or leave", "Wo Lernende nachlesen oder gehen") },
        { name: tt("Tests with users", "Tests mit Nutzern") },
      ]}
    />
  );
}

/** Day 3 · Route 2 · the desk of the Chief Learning Experience Officer, as a mail client (DL-STANDARD section 4, Route 2 windows): management's note, a customer's message with the ratings export, support's view of what "too complicated" means, and the learning team's note on what is recorded. */
export function DeskDay3() {
  return (
    <DeskSim
      mailbox={tt("Inbox · Chief Learning Experience Officer · EduCore", "Posteingang · Chief Learning Experience Officer · EduCore")}
      messages={[
        {
          from: tt("Management", "Geschäftsführung"),
          subject: tt("We need a learning-psychology-based UX strategy", "Wir brauchen eine lernpsychologisch fundierte UX-Strategie"),
          body: [
            tt("EduCore is rated “too complicated”. The content is professionally necessary, but hard to understand, and the budget is limited. We do not have user data on where it goes wrong.", "EduCore wird als „zu kompliziert“ bewertet. Der Inhalt ist fachlich nötig, aber schwer verständlich, und das Budget ist begrenzt. Wir haben keine Nutzerdaten dazu, wo es schiefgeht."),
            tt("Please develop a strategy that is based on how people learn: how we reduce cognitive load, which measures come first, what learning-effective UX means for us, the risks, how we decide about future content, and one decision you take on purpose before we know more. We expect you to take responsibility for learning success.", "Bitte entwickeln Sie eine Strategie, die darauf beruht, wie Menschen lernen: wie wir die kognitive Belastung senken, welche Maßnahmen zuerst kommen, was lernwirksame UX für uns heißt, die Risiken, wie wir über künftige Inhalte entscheiden, und eine Entscheidung, die Sie bewusst treffen, bevor wir mehr wissen. Wir erwarten, dass Sie die Verantwortung für den Lernerfolg übernehmen."),
          ],
        },
        {
          from: tt("A training manager", "Eine Weiterbildungsleiterin"),
          subject: tt("Why my people call EduCore “too complicated”", "Warum meine Leute EduCore „zu kompliziert“ nennen"),
          body: [
            tt("I book EduCore for sixty colleagues. They need the modules for their work and for their certificates, so they work through them. But many say it is too complicated, and when I ask what they mean, they say the content, not the buttons.", "Ich buche EduCore für sechzig Kolleginnen und Kollegen. Sie brauchen die Module für ihre Arbeit und für ihre Zertifikate, also arbeiten sie sie durch. Aber viele sagen, es sei zu kompliziert, und wenn ich frage, was sie meinen, sagen sie: den Inhalt, nicht die Buttons."),
            tt("I attach the ratings from your feedback form for the last week.", "Ich hänge die Bewertungen aus Ihrem Feedbackformular der letzten Woche an."),
          ],
          attachments: [
            {
              name: "ratings-last-week.xlsx",
              kind: "sheet",
              node: (
                <Sheet
                  title={tt("Learner ratings, last week (Case assumption)", "Bewertungen der Lernenden, letzte Woche (Fallannahme)")}
                  head={[tt("Date", "Datum"), tt("Module", "Modul"), tt("Rating", "Bewertung")]}
                  rows={[
                    ["02 Mar", tt("Data protection basics", "Datenschutz-Grundlagen"), tt("too complicated", "zu kompliziert")],
                    ["02 Mar", tt("Contract law, part 1", "Vertragsrecht, Teil 1"), tt("too complicated", "zu kompliziert")],
                    ["03 Mar", tt("Data protection basics", "Datenschutz-Grundlagen"), tt("good content", "guter Inhalt")],
                    ["04 Mar", tt("Hygiene rules", "Hygieneregeln"), tt("too complicated", "zu kompliziert")],
                    ["05 Mar", tt("Contract law, part 1", "Vertragsrecht, Teil 1"), tt("too complicated", "zu kompliziert")],
                    ["05 Mar", tt("Hygiene rules", "Hygieneregeln"), tt("too long", "zu lang")],
                  ]}
                />
              ),
            },
          ],
        },
        {
          from: tt("Support", "Support"),
          subject: tt("What “too complicated” looks like in the tickets", "Wie „zu kompliziert“ in den Tickets aussieht"),
          body: [
            tt("“Too complicated” is the phrase we hear most. In the tickets it comes with three kinds of remark: too much on one screen, paragraphs that have to be read several times, and not knowing what to remember. Nobody has told us which lesson it is about.", "„Zu kompliziert“ ist der Satz, den wir am häufigsten hören. In den Tickets kommt er mit drei Arten von Bemerkungen: zu viel auf einem Bildschirm, Absätze, die mehrfach gelesen werden müssen, und nicht zu wissen, was man sich merken soll. Niemand hat uns gesagt, um welche Lektion es geht."),
            tt("The link opens a lesson as a learner sees it today.", "Der Link öffnet eine Lektion so, wie eine Lernende sie heute sieht."),
          ],
          attachments: [{ name: "educore.example/module/data-protection", kind: "link", node: <EduCoreSim /> }],
        },
        {
          from: tt("Content team", "Content-Team"),
          subject: tt("What is coming next, and who needs it", "Was als Nächstes kommt, und wer es braucht"),
          body: [
            tt("These are the modules we are asked to publish next. All of them are professionally necessary: the learners need them for their work or for a certificate, so we cannot leave one out. Today every module is written as running text with a quiz at the end.", "Diese Module sollen wir als Nächstes veröffentlichen. Alle sind fachlich nötig: Die Lernenden brauchen sie für ihre Arbeit oder für ein Zertifikat, wir können also keines weglassen. Heute ist jedes Modul als Fließtext mit einem Quiz am Ende geschrieben."),
            tt("Some are simple, some are not. We have not tested any of them with beginners.", "Manche sind einfach, manche nicht. Wir haben keines davon mit Einsteigern getestet."),
          ],
          attachments: [
            {
              name: "next-modules.xlsx",
              kind: "sheet",
              node: (
                <Sheet
                  title={tt("Modules asked for next (Case assumption)", "Als Nächstes gewünschte Module (Fallannahme)")}
                  head={[tt("Module", "Modul"), tt("Needed for", "Gebraucht für"), tt("How hard the topic is", "Wie schwer das Thema ist"), tt("Format today", "Format heute")]}
                  rows={[
                    [tt("Works council law", "Betriebsverfassungsrecht"), tt("a certificate", "ein Zertifikat"), tt("hard, many exceptions", "schwer, viele Ausnahmen"), tt("running text and quiz", "Fließtext und Quiz")],
                    [tt("Information security", "Informationssicherheit"), tt("daily work", "die tägliche Arbeit"), tt("medium", "mittel"), tt("running text and quiz", "Fließtext und Quiz")],
                    [tt("Tax law basics", "Steuerrecht-Grundlagen"), tt("a certificate", "ein Zertifikat"), tt("hard, many terms", "schwer, viele Begriffe"), tt("running text and quiz", "Fließtext und Quiz")],
                    [tt("Occupational safety refresher", "Arbeitsschutz-Auffrischung"), tt("a yearly duty", "eine jährliche Pflicht"), tt("easy, known to most", "leicht, den meisten bekannt"), tt("running text and quiz", "Fließtext und Quiz")],
                    [tt("Anti-corruption", "Korruptionsprävention"), tt("daily work", "die tägliche Arbeit"), tt("medium", "mittel"), tt("running text and quiz", "Fließtext und Quiz")],
                    [tt("Data protection for managers", "Datenschutz für Führungskräfte"), tt("a certificate", "ein Zertifikat"), tt("hard, new for many", "schwer, für viele neu"), tt("running text and quiz", "Fließtext und Quiz")],
                  ]}
                />
              ),
            },
          ],
        },
        {
          from: tt("Product team", "Produktteam"),
          subject: tt("Ideas people keep bringing up", "Ideen, die immer wieder genannt werden"),
          body: [
            tt("In the last weeks, three ideas came up in meetings. We have not looked into any of them.", "In den letzten Wochen kamen in Besprechungen drei Ideen auf. Wir haben keine davon geprüft."),
            tt("Give the pages a calmer look. Add a chat assistant that answers questions about the content. Cut each module down to the main points. Each of them has people who like it and people who doubt it.", "Den Seiten ein ruhigeres Aussehen geben. Einen Chat-Assistenten ergänzen, der Fragen zum Inhalt beantwortet. Jedes Modul auf die Kernpunkte kürzen. Für jede Idee gibt es Leute, die sie mögen, und Leute, die zweifeln."),
          ],
        },
        {
          from: tt("Learning team", "Lernteam"),
          subject: tt("What we can and cannot tell you", "Was wir Ihnen sagen können und was nicht"),
          body: [
            tt("We have the ratings, the support tickets, and which lessons are opened and which quizzes are finished. Nothing else. We do not know how long learners stay on a screen or where they reread, because none of it is recorded, and we have not tested with users. The sheet is attached.", "Wir haben die Bewertungen, die Support-Tickets und wir wissen, welche Lektionen geöffnet und welche Quizze beendet werden. Sonst nichts. Wir wissen nicht, wie lange Lernende auf einem Bildschirm bleiben oder wo sie nachlesen, denn nichts davon wird erfasst, und wir haben nicht mit Nutzern getestet. Die Tabelle ist angehängt."),
          ],
          attachments: [
            {
              name: "what-educore-records.xlsx",
              kind: "sheet",
              node: (
                <Sheet
                  title={tt("What EduCore records today (Case assumption)", "Was EduCore heute erfasst (Fallannahme)")}
                  head={[tt("Data", "Daten"), tt("Today", "Heute")]}
                  rows={[
                    [tt("Lessons opened", "Geöffnete Lektionen"), tt("recorded", "erfasst")],
                    [tt("Quizzes finished", "Beendete Quizze"), tt("recorded", "erfasst")],
                    [tt("Learner ratings", "Bewertungen der Lernenden"), tt("recorded", "erfasst")],
                    [tt("Questions in the support inbox", "Fragen im Support-Postfach"), tt("recorded", "erfasst")],
                    [tt("Time on each screen", "Zeit auf jedem Bildschirm"), tt("not recorded", "nicht erfasst")],
                    [tt("Where learners reread or leave", "Wo Lernende nachlesen oder gehen"), tt("not recorded", "nicht erfasst")],
                    [tt("Tests with users", "Tests mit Nutzern"), tt("none done", "nicht durchgeführt")],
                  ]}
                />
              ),
            },
          ],
        },
      ]}
    />
  );
}

export function ObserveDay3() {
  const views: ObserveView[] = [
    { id: "today", name: tt("EduCore today", "EduCore heute"), node: <EduCoreSim /> },
    { id: "voices", name: tt("What users say", "Was Nutzer sagen"), node: <VoicesDay3 /> },
    { id: "records", name: tt("What EduCore records", "Was EduCore erfasst"), node: <RecordsDay3 /> },
  ];
  return <ObserveButton company="EduCore" views={views} />;
}
