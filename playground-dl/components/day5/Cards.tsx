"use client";

import type { ReactNode } from "react";
import { Bul } from "@/components/materi/kit";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D5 } from "@/components/day5/comicScenes";
import { COMICS_D5 } from "@/data/day5/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { ContextScenes, FeatureVsUser, KanoPicture, MethodsMatrix, MistakeBuilder, WeighExample } from "@/components/day5/diagrams";
import { DecisionFrame, FeatureGate, GoalsCircles, NeedChain } from "@/components/day5/diagramsB";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the diagram is the instrument) →
 * the rules it gives the task (folded) → sources → Mark as read. Example companies and people: LearnLoop, Mia and Noor; never LearnBase, so no task is answered here.
 * Deeper reading sits behind a quiet "Show" row, because no task block needs it.
 */

const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)", "Vertiefende Lektüre zeigen (optional)")}>
    <Callout label={tt("Extra · go deeper", "Extra · vertiefen")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Design from what the learner needs to do, not from what the software can do. A feature that serves no learner task is something the platform has, not something the learner gets.", "Gestalten Sie von dem aus, was die Lernende tun muss, nicht von dem, was die Software kann. Ein Feature, das keiner Aufgabe der Lernenden dient, ist etwas, das die Plattform hat, nicht etwas, das die Lernende bekommt.")}
      sources={["norman2013", "kano1984", "christensen2016"]}
      reasoning={[
        tt("Ask of any feature or screen: which task of which learner does it serve? If you cannot name one, it was decided from the software's side.", "Fragen Sie bei jedem Feature und jedem Bildschirm: Welcher Aufgabe welcher Lernenden dient es? Wenn Sie keine nennen können, wurde es von der Seite der Software aus entschieden."),
        tt("A feature-driven platform decides from what the software could do or what a department asked for; a user-centred one decides from what learners need to do.", "Eine funktionsgetriebene Plattform entscheidet danach, was die Software konnte oder was eine Abteilung verlangt hat; eine nutzerzentrierte danach, was Lernende tun müssen."),
        tt("More features do not rescue a weak basic: a learner who cannot find their course is not helped by a new feature that sits beside it.", "Mehr Features retten eine schwache Grundlage nicht: Einer Lernenden, die ihren Kurs nicht findet, hilft kein neues Feature, das daneben steht."),
        tt("UX is the bridge between what learners need and what the business earns from: a platform that serves learners well also serves the company, only less obviously.", "UX ist die Brücke zwischen dem, was Lernende brauchen, und dem, womit das Unternehmen verdient: Eine Plattform, die Lernende gut bedient, bedient auch das Unternehmen, nur weniger offensichtlich."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A1} art={ART_D5} />
      <FeatureVsUser />
      <KanoPicture />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Mia and the screens are made up for this example. The Kano model is real; the curves are drawn to show the idea, not measured.", "LearnLoop, Mia und die Bildschirme sind für dieses Beispiel erfunden. Das Kano-Modell ist echt; die Kurven sind gezeichnet, um die Idee zu zeigen, nicht gemessen.")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Creeping featurism: Norman (2013) warns that products grow more complicated each time someone adds a feature, until the basic task is hard to find. The remedy is not a rule against features but the question above: which task does it serve?", "Creeping Featurism: Norman (2013) warnt, dass Produkte jedes Mal komplizierter werden, wenn jemand ein Feature ergänzt, bis die Grundaufgabe schwer zu finden ist. Das Mittel ist keine Regel gegen Features, sondern die Frage oben: Welcher Aufgabe dient es?")}</p>
        <p>{tt("Jobs to be done: Christensen and colleagues (2016) describe people “hiring” a product to make progress in a situation. A learner hires a platform to get a skill by Friday, not to use its modules.", "Jobs to be done: Christensen und Kollegen (2016) beschreiben, dass Menschen ein Produkt „engagieren“, um in einer Situation voranzukommen. Eine Lernende engagiert eine Plattform, um bis Freitag eine Fähigkeit zu erwerben, nicht um ihre Module zu nutzen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Know three things about learners: who they are, what they want and expect, and in what situation they use the platform. The situation is the context of use.", "Wissen Sie drei Dinge über Lernende: wer sie sind, was sie wollen und erwarten und in welcher Situation sie die Plattform nutzen. Die Situation ist der Nutzungskontext.")}
      sources={["beyer2017", "christensen2016", "norman2013"]}
      reasoning={[
        tt("Write a learner's goal as a task in everyday words, with the situation: “I want to carry on with my negotiation course in the ten minutes before my next meeting.”", "Schreiben Sie das Ziel einer Lernenden als Aufgabe in Alltagsworten, mit der Situation: „Ich will meinen Verhandlungskurs in den zehn Minuten vor meinem nächsten Termin fortsetzen.“"),
        tt("Three groups use a learning platform: learners, teachers, and the organisations that buy it. Each has a goal, an expectation and a typical problem.", "Drei Gruppen nutzen eine Lernplattform: Lernende, Lehrende und die Organisationen, die sie kaufen. Jede hat ein Ziel, eine Erwartung und ein typisches Problem."),
        tt("Describe an expectation as “I expect…”: what the learner assumes will happen before they act. A frustration is the gap between that and what they see.", "Beschreiben Sie eine Erwartung als „Ich erwarte …“: was die Lernende annimmt, bevor sie handelt. Eine Frustration ist die Lücke zwischen dem und dem, was sie sieht."),
        tt("The context changes the design: on a phone, between meetings, in an intensive weekend or under a deadline, the same goal asks for different things.", "Der Kontext verändert das Design: auf dem Handy, zwischen Terminen, in einem Intensivwochenende oder unter einer Frist verlangt dasselbe Ziel Verschiedenes."),
        tt("Say what people do as well as what they say: observation in their own setting finds things that interviews miss.", "Sagen Sie, was Menschen tun, nicht nur, was sie sagen: Beobachtung in der eigenen Umgebung findet Dinge, die Interviews verpassen."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A2} art={ART_D5} />
      <ContextScenes />
      <DataTable
        caption={tt("The three user groups of a learning platform", "Die drei Nutzergruppen einer Lernplattform")}
        head={[tt("Group", "Gruppe"), tt("A typical goal", "Ein typisches Ziel"), tt("A typical expectation", "Eine typische Erwartung"), tt("A typical problem", "Ein typisches Problem")]}
        rows={[
          [tt("Learners", "Lernende"), tt("Learn a skill for their job by a date", "Eine berufliche Fähigkeit bis zu einem Termin lernen"), tt("“I expect to see my course the moment I log in.”", "„Ich erwarte, meinen Kurs zu sehen, sobald ich mich anmelde.“"), tt("They cannot find the content they need", "Sie finden den Inhalt nicht, den sie brauchen")],
          [tt("Teachers and trainers", "Lehrende und Trainer"), tt("Run a course and see how people are doing", "Einen Kurs durchführen und sehen, wie es den Leuten geht"), tt("“I expect to see who is behind without a report.”", "„Ich erwarte zu sehen, wer zurückliegt, ohne einen Bericht.“"), tt("The tools show data but not what to do", "Die Werkzeuge zeigen Daten, aber nicht, was zu tun ist")],
          [tt("Organisations", "Organisationen"), tt("Train staff at a cost they can defend", "Mitarbeitende zu Kosten schulen, die sich vertreten lassen"), tt("“I expect to see who finished and what it cost.”", "„Ich erwarte zu sehen, wer fertig ist und was es gekostet hat.“"), tt("They cannot tell whether training changed anything", "Sie erkennen nicht, ob die Schulung etwas verändert hat")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The scenes and the table are made up to show the idea. Contextual inquiry (Beyer and Holtzblatt 2017) is a real method: you watch and question users in their own setting.", "Die Szenen und die Tabelle sind erfunden, um die Idee zu zeigen. Contextual Inquiry (Beyer und Holtzblatt 2017) ist eine echte Methode: Sie beobachten und befragen Nutzer in ihrer eigenen Umgebung.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Say and do: what people say they do and what they do differ. A learner may say they study in the evening and in fact log in on the train. Watching shows the second, asking only the first.", "Sagen und tun: Was Menschen sagen, dass sie tun, und was sie tun, unterscheidet sich. Eine Lernende sagt vielleicht, sie lerne abends, und meldet sich in Wahrheit im Zug an. Beobachten zeigt Letzteres, Fragen nur Ersteres.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Three mistakes recur on platforms built without the user in mind: names after the software, too many choices at once, and no sign of where you are.", "Drei Fehler kehren auf Plattformen wieder, die ohne Blick auf die Nutzer gebaut wurden: Namen nach der Software, zu viele Auswahlmöglichkeiten auf einmal und kein Zeichen, wo man ist.")}
      sources={["norman2013", "nielsen2001"]}
      reasoning={[
        tt("Functions instead of benefits: does the screen name things after the software (“Content Repository”), or show what the learner can do (“Continue”)?", "Funktionen statt Nutzen: Benennt der Bildschirm Dinge nach der Software („Content Repository“) oder zeigt er, was die Lernende tun kann („Weitermachen“)?"),
        tt("Overly complex: must the learner choose from many things, such as a long menu, many widgets or many filters, before they can act?", "Übermäßig komplex: Muss die Lernende aus vielen Dingen wählen, etwa einem langen Menü, vielen Widgets oder vielen Filtern, bevor sie handeln kann?"),
        tt("Missing orientation: can the learner tell where they are, where something is, and what to do next? One place for one thing, a clear path, and a next step show it.", "Fehlende Orientierung: Kann die Lernende erkennen, wo sie ist, wo etwas liegt und was als Nächstes zu tun ist? Ein Ort für eine Sache, ein klarer Pfad und ein nächster Schritt zeigen es."),
        tt("Sort a fact by the mistake it shows. A fact can look like two; choose the one whose test question it answers most directly.", "Ordnen Sie einen Fakt dem Fehler zu, den er zeigt. Ein Fakt kann wie zwei aussehen; wählen Sie den, dessen Testfrage er am direktesten beantwortet."),
        tt("A repair removes one mistake without adding another: renaming a menu does not fix a menu of twenty entries.", "Eine Reparatur beseitigt einen Fehler, ohne einen anderen hinzuzufügen: Ein Menü umzubenennen behebt kein Menü mit zwanzig Einträgen."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A3} art={ART_D5} />
      <MistakeBuilder />
      <DataTable
        caption={tt("The three mistakes, the question that tests each, and what the learner meets", "Die drei Fehler, die Frage, die jeden prüft, und was die Lernende trifft")}
        head={[tt("Mistake", "Fehler"), tt("The test question", "Die Testfrage"), tt("What the learner meets", "Was die Lernende trifft")]}
        rows={[
          [tt("Functions instead of benefits", "Funktionen statt Nutzen"), tt("Does the screen name things after the software, or show what the learner can do?", "Benennt der Bildschirm Dinge nach der Software, oder zeigt er, was die Lernende tun kann?"), tt("Words she has to translate before she can act", "Wörter, die sie übersetzen muss, bevor sie handeln kann")],
          [tt("Overly complex", "Übermäßig komplex"), tt("Must the learner choose from many things before they can act?", "Muss die Lernende aus vielen Dingen wählen, bevor sie handeln kann?"), tt("A wall of choices and no clear first step", "Eine Wand aus Auswahl und kein klarer erster Schritt")],
          [tt("Missing orientation", "Fehlende Orientierung"), tt("Can the learner tell where they are, where something is, and what next?", "Kann die Lernende erkennen, wo sie ist, wo etwas liegt und was als Nächstes kommt?"), tt("The feeling of being lost on a platform she has used before", "Das Gefühl, auf einer schon bekannten Plattform verloren zu sein")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("Mia and LearnLoop are made up for this example, and the screens are drawn to show the mistakes. The three mistakes are the plan's own list for typical errors without user-centredness.", "Mia und LearnLoop sind für dieses Beispiel erfunden, und die Bildschirme sind gezeichnet, um die Fehler zu zeigen. Die drei Fehler sind die eigene Liste des Plans für typische Fehler ohne Nutzerzentrierung.")}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Nielsen's heuristics (2001) name related ideas: “match between system and the real world” is the first mistake turned round, and “visibility of system status” is much of the third. You do not need the list for the task; the three questions above are enough.", "Nielsens Heuristiken (2001) benennen verwandte Ideen: „Übereinstimmung zwischen System und realer Welt“ ist der erste Fehler umgekehrt, und „Sichtbarkeit des Systemstatus“ ist ein großer Teil des dritten. Für die Aufgabe brauchen Sie die Liste nicht; die drei Fragen oben genügen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Methods of user-centred design differ in what they tell you: what people say or what they do, and from a few people or from many. Choose by the gap you have to close.", "Methoden des nutzerzentrierten Designs unterscheiden sich darin, was sie Ihnen sagen: was Menschen sagen oder was sie tun, und von wenigen oder von vielen. Wählen Sie nach der Lücke, die Sie schließen müssen.")}
      sources={["beyer2017", "cooper1999", "pruittGrudin2003", "kalbach2020", "gothelf2013"]}
      reasoning={[
        tt("Use a method that shows behaviour (a usability test, observation, analytics) when you want to know what people do; use one that shows words (an interview, a survey) when you want to know why.", "Nutzen Sie eine Methode, die Verhalten zeigt (Usability-Test, Beobachtung, Analytics), wenn Sie wissen wollen, was Menschen tun; nutzen Sie eine, die Worte zeigt (Interview, Umfrage), wenn Sie wissen wollen, warum."),
        tt("Small studies give reasons and large ones give counts; most real questions need one of each.", "Kleine Studien liefern Gründe und große Zählungen; die meisten echten Fragen brauchen von jedem eines."),
        tt("A persona is a made-up person built from data to stand for a group; it works when it rests on data and is used in decisions, and fails as decoration.", "Eine Persona ist eine erfundene Person, aus Daten gebaut, die für eine Gruppe steht; sie wirkt, wenn sie auf Daten beruht und in Entscheidungen genutzt wird, und scheitert als Dekoration."),
        tt("A user journey follows one learner through the steps of reaching a goal, with what they do, think and feel at each step.", "Eine User Journey folgt einer Lernenden durch die Schritte zu einem Ziel, mit dem, was sie bei jedem Schritt tut, denkt und fühlt."),
        tt("Iterative design repeats test, learn, change; each round starts from what the last one found.", "Iteratives Design wiederholt Testen, Lernen, Ändern; jede Runde beginnt bei dem, was die letzte fand."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A4} art={ART_D5} />
      <MethodsMatrix />
      <Bul
        items={[
          tt("Observation and user feedback: watch and ask people in their own setting (Beyer and Holtzblatt 2017).", "Beobachtung und Nutzer-Feedback: Menschen in ihrer eigenen Umgebung beobachten und fragen (Beyer und Holtzblatt 2017)."),
          tt("Personas: made-up people that stand for groups of real users (Cooper 1999); they need data behind them (Pruitt and Grudin 2003). Day 6 works with them.", "Personas: erfundene Menschen, die für Gruppen echter Nutzer stehen (Cooper 1999); sie brauchen Daten dahinter (Pruitt und Grudin 2003). Tag 6 arbeitet damit."),
          tt("User journeys: a map of the steps a user takes to reach a goal (Kalbach 2020). Day 6 works with them too.", "User Journeys: eine Karte der Schritte, die ein Nutzer zu einem Ziel geht (Kalbach 2020). Auch Tag 6 arbeitet damit."),
          tt("Iterative design: improve in short rounds, each based on what the last one showed (Gothelf and Seiden 2013).", "Iteratives Design: in kurzen Runden verbessern, jede auf Grundlage dessen, was die letzte zeigte (Gothelf und Seiden 2013)."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its interviews are made up. The positions in the matrix are a reading of these methods in general, not a ranking.", "LearnLoop und seine Interviews sind erfunden. Die Positionen in der Matrix sind eine Lesart dieser Methoden im Allgemeinen, keine Rangfolge.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate each measure on user value, effort and risk, and add one sentence on what the business gets. Effort follows a rule from the printed cost; the other two are your judgement.", "Bewerten Sie jede Maßnahme nach Nutzerwert, Aufwand und Risiko und ergänzen Sie einen Satz dazu, was das Unternehmen bekommt. Der Aufwand folgt einer Regel aus den gedruckten Kosten; die anderen beiden sind Ihr Urteil.")}
      sources={["gibbons2018", "norman2013", "kohavi2020"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €10,000 is Low; €10,000 to €20,000 is Mid; above €20,000 is High.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 10.000 € ist Niedrig; 10.000 € bis 20.000 € ist Mittel; über 20.000 € ist Hoch."),
        tt("Rate user value by how much the measure helps learners reach their goal, shown by a printed fact, not by how modern it sounds.", "Bewerten Sie den Nutzerwert danach, wie sehr die Maßnahme Lernenden hilft, ihr Ziel zu erreichen, gezeigt durch einen gedruckten Fakt, nicht danach, wie modern sie klingt."),
        tt("Rate risk by what could go wrong or be lost: a change that adds a thing to a crowded screen, or that spends most of the budget on one bet, carries more risk.", "Bewerten Sie das Risiko danach, was schiefgehen oder verloren gehen könnte: Eine Änderung, die einem vollen Bildschirm etwas hinzufügt oder den größten Teil des Budgets auf eine Wette setzt, trägt mehr Risiko."),
        tt("Add one sentence on what the business gets: management weighs a fourth question, what do we gain?", "Ergänzen Sie einen Satz dazu, was das Unternehmen bekommt: Das Management wägt eine vierte Frage ab, was gewinnen wir?"),
        tt("A measure that adds a feature beside an unfixed basic treats the symptom. Prefer the measure that answers the trouble the printed facts show.", "Eine Maßnahme, die neben einer unreparierten Grundlage ein Feature ergänzt, behandelt das Symptom. Bevorzugen Sie die Maßnahme, die die Schwierigkeit beantwortet, die die gedruckten Fakten zeigen."),
        tt("Name what you do not know: which information is missing to be sure?", "Nennen Sie, was Sie nicht wissen: Welche Information fehlt, um sicher zu sein?"),
      ]}
    >
      <ComicButton comic={COMICS_D5.A5} art={ART_D5} />
      <WeighExample />
      <Bul
        items={[
          tt("Effort is the one rating a rule decides, from the printed cost. User value and risk are your judgement; give a reason for each.", "Der Aufwand ist die eine Bewertung, die eine Regel aus den gedruckten Kosten entscheidet. Nutzerwert und Risiko sind Ihr Urteil; begründen Sie beides."),
          tt("A prioritisation matrix plots options on two criteria, for example value to the user against effort (Gibbons 2018). Here you rate each on three and show them side by side.", "Eine Priorisierungsmatrix ordnet Optionen nach zwei Kriterien, zum Beispiel Nutzerwert gegen Aufwand (Gibbons 2018). Hier bewerten Sie jede nach dreien und zeigen sie nebeneinander."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.", "LearnLoop, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("User-centred UX is a strategic success factor: it moves engagement, learning success and drop-out. A user need gets funded when it is said in the company's own terms.", "Nutzerzentriertes UX ist ein strategischer Erfolgsfaktor: Es bewegt Engagement, Lernerfolg und Abbruchquote. Ein Nutzerbedürfnis wird finanziert, wenn es in den Begriffen des Unternehmens gesagt wird.")}
      sources={["reichheld2003", "christensen2016", "norman2013"]}
      reasoning={[
        tt("Say every user need in three parts: who the user is, what they want to do, and what the company gets, and name the figure it moves.", "Sagen Sie jedes Nutzerbedürfnis in drei Teilen: wer der Nutzer ist, was er tun will und was das Unternehmen bekommt, und nennen Sie die Zahl, die es bewegt."),
        tt("The figures a company watches are engagement (how often learners come back), learning success (how many finish) and the drop-out rate; a need that moves none of them is hard to fund.", "Die Zahlen, die ein Unternehmen beobachtet, sind Engagement (wie oft Lernende zurückkommen), Lernerfolg (wie viele abschließen) und die Abbruchquote; ein Bedürfnis, das keine davon bewegt, ist schwer zu finanzieren."),
        tt("Choose two or three central needs, not ten; a list of ten needs is a list of wishes.", "Wählen Sie zwei oder drei zentrale Bedürfnisse, nicht zehn; eine Liste von zehn Bedürfnissen ist eine Wunschliste."),
        tt("Companies often fail to act user-centred because the user is not in the room, because the business figures are short-term, and because features are easier to count than problems solved.", "Unternehmen handeln oft nicht nutzerzentriert, weil der Nutzer nicht im Raum ist, weil die Geschäftszahlen kurzfristig sind und weil Features leichter zu zählen sind als gelöste Probleme."),
        tt("One score is not a strategy: a satisfaction number such as NPS shows how people feel, not why, so pair it with a reason.", "Eine Zahl ist keine Strategie: Eine Zufriedenheitszahl wie der NPS zeigt, wie Menschen sich fühlen, nicht warum; koppeln Sie sie also mit einem Grund."),
      ]}
    >
      <ComicButton comic={COMICS_D5.B1} art={ART_D5} />
      <NeedChain />
      <Bul
        items={[
          tt("Why companies often fail to act user-centred: the user is not in the room when the decision is made.", "Warum Unternehmen oft nicht nutzerzentriert handeln: Der Nutzer ist nicht im Raum, wenn entschieden wird."),
          tt("The figures that count are short-term (sign-ups this quarter), while the figures UX moves are slower (finished courses, renewals).", "Die Zahlen, die zählen, sind kurzfristig (Anmeldungen in diesem Quartal), während die Zahlen, die UX bewegt, langsamer sind (abgeschlossene Kurse, Verlängerungen)."),
          tt("A feature is easy to point at and count; a problem solved is harder to show.", "Ein Feature lässt sich leicht zeigen und zählen; ein gelöstes Problem ist schwerer zu zeigen."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its figures are made up. The Net Promoter Score (Reichheld 2003) is a real measure; it is widely used and criticised for hiding the reasons behind one number.", "LearnLoop und seine Zahlen sind erfunden. Der Net Promoter Score (Reichheld 2003) ist eine echte Kennzahl; er wird weit genutzt und kritisiert, weil er die Gründe hinter einer Zahl verbirgt.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("The user, the business and the technology want different things. Aim for where they overlap, and when there is no overlap, say which goal wins and what the others lose.", "Der Nutzer, das Unternehmen und die Technik wollen Verschiedenes. Zielen Sie auf ihre Überschneidung, und wenn es keine gibt, sagen Sie, welches Ziel gewinnt und was die anderen verlieren.")}
      sources={["norman2013", "gibbons2018", "klein2007"]}
      reasoning={[
        tt("For every decision, write one line each: what the user gets, what the business gets, and what is lost or postponed. A decision with an empty third line has not been thought through.", "Schreiben Sie für jede Entscheidung je eine Zeile: was der Nutzer bekommt, was das Unternehmen bekommt und was verloren geht oder verschoben wird. Eine Entscheidung mit leerer dritter Zeile ist nicht zu Ende gedacht."),
        tt("Look for the overlap first: a decision where the user and the business both gain, at low technical cost, is the aim.", "Suchen Sie zuerst die Überschneidung: Eine Entscheidung, bei der Nutzer und Unternehmen gewinnen, bei geringen technischen Kosten, ist das Ziel."),
        tt("When one goal wins, say so and say what you do to limit the others' loss; a decision that hides who pays will meet resistance later.", "Wenn ein Ziel gewinnt, sagen Sie es und sagen Sie, was Sie tun, um den Verlust der anderen zu begrenzen; eine Entscheidung, die verbirgt, wer zahlt, trifft später auf Widerstand."),
        tt("Order decisions by what the others depend on: a roadmap puts first the decision that makes the next ones possible or cheaper.", "Ordnen Sie Entscheidungen danach, wovon die anderen abhängen: Eine Roadmap stellt die Entscheidung zuerst, die die nächsten möglich oder günstiger macht."),
        tt("Imagine the plan has failed in a year and ask why; the most likely reason is the biggest risk (Klein 2007).", "Stellen Sie sich vor, der Plan sei in einem Jahr gescheitert, und fragen Sie, warum; der wahrscheinlichste Grund ist das größte Risiko (Klein 2007)."),
      ]}
    >
      <ComicButton comic={COMICS_D5.B2} art={ART_D5} />
      <GoalsCircles />
      <DataTable
        caption={tt("The three goals, what each wants, and what it fears", "Die drei Ziele, was jedes will und was es fürchtet")}
        head={[tt("Goal", "Ziel"), tt("It wants", "Es will"), tt("It fears", "Es fürchtet")]}
        rows={[
          [tt("User", "Nutzer"), tt("To find and finish", "Finden und abschließen"), tt("Being lost; wasted time", "Sich zu verirren; verschwendete Zeit")],
          [tt("Business", "Unternehmen"), tt("Growth, retention, low cost", "Wachstum, Retention, niedrige Kosten"), tt("Falling numbers; money spent with no result", "Fallende Zahlen; Geld ohne Ergebnis")],
          [tt("Technology", "Technik"), tt("Something it can build and keep running", "Etwas, das sich bauen und am Laufen halten lässt"), tt("Years of upkeep for a feature nobody uses", "Jahre an Pflege für ein Feature, das niemand nutzt")],
        ]}
      />
      <Extra id="B2">
        <p>{tt("Stakeholders: sales, finance, engineering and learners are all stakeholders, people or groups with a stake in the outcome. The conflict analysis is how you show each of them that you saw their stake.", "Stakeholder: Vertrieb, Finanzen, Entwicklung und Lernende sind alle Stakeholder, Personen oder Gruppen mit einem Interesse am Ergebnis. Die Konfliktanalyse zeigt jedem von ihnen, dass Sie sein Interesse gesehen haben.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Decide even when the user data is incomplete: say what you decide, what you do not know, when you would reverse it, and what you give up. Then make it a rule for every future decision.", "Entscheiden Sie auch bei unvollständigen Nutzerdaten: Sagen Sie, was Sie entscheiden, was Sie nicht wissen, wann Sie zurücknähmen und worauf Sie verzichten. Machen Sie es dann zur Regel für jede künftige Entscheidung.")}
      sources={["klein2007", "gothelf2013", "kohavi2020"]}
      reasoning={[
        tt("A decision under uncertainty has four parts: I decide…, I do not know…, I reverse if… (a figure) by… (a time), and I give up….", "Eine Entscheidung unter Unsicherheit hat vier Teile: Ich entscheide …, Ich weiß nicht …, Ich nehme zurück, wenn … (eine Zahl) bis … (eine Zeit), und Ich verzichte auf …."),
        tt("The reversal condition names a figure you can watch and a time by which it should move; “if it does not work” is not a condition.", "Die Rückgängig-Bedingung nennt eine Zahl, die Sie beobachten können, und eine Zeit, bis zu der sie sich bewegt haben sollte; „wenn es nicht funktioniert“ ist keine Bedingung."),
        tt("Say what you give up: a plan that gives up nothing has not decided.", "Sagen Sie, worauf Sie verzichten: Ein Plan, der auf nichts verzichtet, hat nicht entschieden."),
        tt("A decision architecture says who decides and on what evidence. A good rule for new features: a named user problem, a metric and an owner before it enters the roadmap.", "Eine Entscheidungsarchitektur sagt, wer entscheidet und auf welcher Grundlage. Eine gute Regel für neue Features: ein genanntes Nutzerproblem, eine Kennzahl und ein Verantwortlicher, bevor es auf die Roadmap kommt."),
        tt("Choose the kinds of evidence a decision needs: what users do (a test, usage data) and what they say (interviews) count more than a request from a loud voice or the opinion of the most senior person.", "Wählen Sie die Arten von Belegen, die eine Entscheidung braucht: Was Nutzer tun (ein Test, Nutzungsdaten) und was sie sagen (Interviews) zählt mehr als die Anfrage einer lauten Stimme oder die Meinung der ranghöchsten Person."),
      ]}
    >
      <ComicButton comic={COMICS_D5.B3} art={ART_D5} />
      <FeatureGate />
      <DecisionFrame />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its request and its figures are made up for this example. The task case is in the task.", "LearnLoop, sein Antrag und seine Zahlen sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Experiments: Kohavi, Tang and Xu (2020) warn that many ideas do not move the metric they were built for. A small test with a control group is how you find out cheaply, before the whole budget is committed.", "Experimente: Kohavi, Tang und Xu (2020) warnen, dass viele Ideen die Kennzahl nicht bewegen, für die sie gebaut wurden. Mit einem kleinen Test mit Kontrollgruppe finden Sie das günstig heraus, bevor das ganze Budget gebunden ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}
