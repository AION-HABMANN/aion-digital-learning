"use client";

import type { ReactNode } from "react";
import { ActiveFig, ChoicesFig, DecisionFrame, EngageFig, FlexMatrix, IaFig, NavTypesFig, OrientChain, WeighExample } from "@/components/day9/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D9 } from "@/components/day9/comicScenes";
import { COMICS_D9 } from "@/data/day9/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Ana, Sam, Lea, Ben; never NavLearn, so no task is answered here.
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
      scan={tt("Information architecture organises and names content so that it can be found and understood: clear hierarchies, logical grouping, less complexity.", "Informationsarchitektur ordnet und benennt Inhalt, damit er gefunden und verstanden wird: klare Hierarchien, logische Gruppierung, weniger Komplexität.")}
      sources={["rosenfeld2015", "spencer2009", "krug2014"]}
      reasoning={[
        tt("Judge a structure by two goals: can a learner find the content, and can they understand where it belongs?", "Beurteilen Sie eine Struktur an zwei Zielen: Kann eine Lernende den Inhalt finden, und kann sie verstehen, wohin er gehört?"),
        tt("Give every item one home. The same content under two names or in two places is a structural problem.", "Geben Sie jedem Eintrag einen Ort. Derselbe Inhalt unter zwei Namen oder an zwei Orten ist ein Strukturproblem."),
        tt("Group by what the learner does (Learn, Find, Progress, Help), keep the top level to a few groups, and put detail below.", "Gruppieren Sie nach dem, was die Lernende tut (Lernen, Finden, Fortschritt, Hilfe), halten Sie die oberste Ebene bei wenigen Gruppen und legen Sie Details darunter."),
        tt("Check a structure with learners before you build it: a card sort for the groups, a tree test for findability.", "Prüfen Sie eine Struktur mit Lernenden, bevor Sie sie bauen: einen Card Sort für die Gruppen, einen Tree Test für die Auffindbarkeit."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A1} art={ART_D9} />
      <IaFig />
      <DataTable
        caption={tt("Three principles of an information architecture", "Drei Prinzipien einer Informationsarchitektur")}
        head={[tt("Principle", "Prinzip"), tt("What it means", "Was es bedeutet"), tt("A sign it is missing", "Ein Zeichen, dass es fehlt")]}
        rows={[
          [tt("Clear hierarchies", "Klare Hierarchien"), tt("Main sections, groups within them, items below.", "Hauptbereiche, Gruppen darin, Einträge darunter."), tt("A flat row of many equal entries.", "Eine flache Reihe vieler gleichrangiger Einträge.")],
          [tt("Logical grouping", "Logische Gruppierung"), tt("Things that belong together sit together, named after what the learner does.", "Was zusammengehört, steht zusammen, benannt nach dem, was die Lernende tut."), tt("One course under two or three names.", "Ein Kurs unter zwei oder drei Namen.")],
          [tt("Reduction of complexity", "Reduktion der Komplexität"), tt("Few choices at one point; the rest one level down.", "Wenige Auswahlmöglichkeiten an einer Stelle; der Rest eine Ebene tiefer."), tt("Two menus side by side.", "Zwei Menüs nebeneinander.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Ana and the items shown are made up for this example. The four parts of an architecture follow Rosenfeld, Morville and Arango (2015).", "LearnLoop, Ana und die gezeigten Einträge sind für dieses Beispiel erfunden. Die vier Teile einer Architektur folgen Rosenfeld, Morville und Arango (2015).")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("In a card sort, people group labelled cards into the categories that make sense to them; in a tree test, they try to find items in a text-only version of the menu (Spencer 2009). Both are cheap and need few participants. Krug's trunk test asks whether a visitor dropped on any page can say where they are (Krug 2014).", "In einem Card Sort gruppieren Menschen beschriftete Karten in die Kategorien, die für sie Sinn ergeben; in einem Tree Test versuchen sie, Einträge in einer reinen Textfassung des Menüs zu finden (Spencer 2009). Beides ist günstig und braucht wenige Teilnehmende. Krugs Trunk-Test fragt, ob ein Besucher, der auf einer beliebigen Seite landet, sagen kann, wo er ist (Krug 2014).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Navigation answers “where am I, and what comes next?”. Keep the choices few, name them after what the learner does, and always show the position.", "Navigation beantwortet „Wo bin ich, und was kommt als Nächstes?“. Halten Sie die Auswahl klein, benennen Sie sie nach dem, was die Lernende tut, und zeigen Sie immer die Position.")}
      sources={["krug2014", "hick1952", "nielsen1994"]}
      reasoning={[
        tt("Sort a navigation fact by what the learner cannot do: choose among too many options, tell from the name what is behind it, or tell where they are and what comes next.", "Ordnen Sie einen Navigationsfakt danach, was die Lernende nicht kann: unter zu vielen Optionen wählen, am Namen erkennen, was dahintersteckt, oder sagen, wo sie ist und was als Nächstes kommt."),
        tt("Count the choices at one decision point. Many entries with no grouping or order are too many options.", "Zählen Sie die Auswahlmöglichkeiten an einem Entscheidungspunkt. Viele Einträge ohne Gruppierung oder Ordnung sind zu viele Optionen."),
        tt("Read every label as a stranger would. If two names look alike or say nothing about the result, the label is unclear.", "Lesen Sie jede Bezeichnung, wie sie ein Fremder läse. Sehen zwei Namen gleich aus oder sagen nichts über das Ergebnis, ist die Bezeichnung unklar."),
        tt("Orientation needs the position (a path, a lesson number, a marked entry) and the next step (a Next button, an explained result). A page that lacks either leaves the learner lost.", "Orientierung braucht die Position (einen Pfad, eine Lektionsnummer, einen markierten Eintrag) und den nächsten Schritt (einen Weiter-Button, ein erklärtes Ergebnis). Eine Seite, der eines fehlt, lässt die Lernende verloren."),
        tt("Improve navigation by cutting and grouping the entries, renaming them, and adding the position and the next step.", "Verbessern Sie die Navigation, indem Sie die Einträge kürzen und gruppieren, sie umbenennen und die Position und den nächsten Schritt ergänzen."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A2} art={ART_D9} />
      <ChoicesFig />
      <NavTypesFig />
      <DataTable
        caption={tt("Three typical navigation problems, how to recognise them and the remedy", "Drei typische Navigationsprobleme, woran man sie erkennt und das Gegenmittel")}
        head={[tt("Problem", "Problem"), tt("How to recognise it", "Woran man es erkennt"), tt("Remedy", "Gegenmittel")]}
        rows={[
          [tt("Too many options", "Zu viele Optionen"), tt("Many entries or results with no grouping, no order and no filters.", "Viele Einträge oder Ergebnisse ohne Gruppierung, Ordnung und Filter."), tt("Group, cut to a few, rank results, add filters.", "Gruppieren, auf wenige kürzen, Ergebnisse ordnen, Filter ergänzen.")],
          [tt("Unclear labels", "Unklare Bezeichnungen"), tt("Names that are the system's words, or look alike, or say nothing about the result.", "Namen, die Wörter des Systems sind, sich ähneln oder nichts über das Ergebnis sagen."), tt("Name after what the learner does: “Start the quiz”.", "Nach dem benennen, was die Lernende tut: „Quiz starten“.")],
          [tt("No orientation", "Keine Orientierung"), tt("No position on the page, no next step after a result, the same title everywhere.", "Keine Position auf der Seite, kein nächster Schritt nach einem Ergebnis, überall derselbe Titel."), tt("A path, “Lesson 3 of 8”, a Next button, a page title.", "Ein Pfad, „Lektion 3 von 8“, ein Weiter-Button, ein Seitentitel.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Sam are made up for this example. Hick's law is Hick (1952); the orientation questions follow Krug (2014).", "LearnLoop und Sam sind für dieses Beispiel erfunden. Das Hick'sche Gesetz ist Hick (1952); die Orientierungsfragen folgen Krug (2014).")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Hick's law says that choice time grows with the number of options (Hick 1952); it is a reason to keep the main menu short, not a rule of four entries. Nielsen's usability heuristics ask for visibility of system status (a position, a progress indicator) and a match between the system and the real world (names the learner uses) (Nielsen 1994).", "Das Hick'sche Gesetz sagt, dass die Wahlzeit mit der Zahl der Optionen wächst (Hick 1952); es ist ein Grund, das Hauptmenü kurz zu halten, keine Regel von vier Einträgen. Nielsens Usability-Heuristiken verlangen Sichtbarkeit des Systemstatus (eine Position, einen Fortschrittsanzeiger) und Übereinstimmung zwischen System und realer Welt (Namen, die die Lernende nutzt) (Nielsen 1994).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Interaction helps when it is tied to a goal, makes the learner think and answers back. Reading is passive use; a question with feedback is active use.", "Interaktion hilft, wenn sie mit einem Ziel verbunden ist, die Lernende zum Denken bringt und antwortet. Lesen ist passive Nutzung; eine Frage mit Rückmeldung ist aktive Nutzung.")}
      sources={["chiWylie2014", "roediger2006", "hattie2007", "nielsen1994"]}
      reasoning={[
        tt("Ask of every interaction: what does the learner think or decide here, and what do they get back? If nothing, it is an end in itself.", "Fragen Sie bei jeder Interaktion: Was denkt oder entscheidet die Lernende hier, und was bekommt sie zurück? Wenn nichts, ist sie Selbstzweck."),
        tt("Tie each interaction to the goal of the lesson section it follows; put a short question inside the lesson, not a quiz that blocks the next page.", "Verbinden Sie jede Interaktion mit dem Ziel des Lektionsabschnitts, dem sie folgt; legen Sie eine kurze Frage in die Lektion, nicht ein Quiz, das die nächste Seite blockiert."),
        tt("Close every interaction with feedback: an explained result and a next step. A bare score leaves the learner without a direction.", "Schließen Sie jede Interaktion mit Rückmeldung: einem erklärten Ergebnis und einem nächsten Schritt. Ein nacktes Ergebnis lässt die Lernende ohne Richtung."),
        tt("A reward for opening a page or pressing a button teaches nothing. Reward progress, not clicks.", "Eine Belohnung fürs Öffnen einer Seite oder Drücken eines Buttons lehrt nichts. Belohnen Sie Fortschritt, nicht Klicks."),
        tt("Avoid monotony: vary the kind of task, and keep the number of interactions per lesson small enough that most can be skipped.", "Vermeiden Sie Monotonie: Wechseln Sie die Art der Aufgabe und halten Sie die Zahl der Interaktionen pro Lektion so klein, dass sich die meisten überspringen lassen."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A3} art={ART_D9} />
      <ActiveFig />
      <DataTable
        caption={tt("Active and passive use of a lesson, and what interaction adds", "Aktive und passive Nutzung einer Lektion, und was Interaktion hinzufügt")}
        head={[tt("Use", "Nutzung"), tt("What the learner does", "Was die Lernende tut"), tt("What it gives", "Was es bringt")]}
        rows={[
          [tt("Passive: reading, watching", "Passiv: lesen, ansehen"), tt("Takes in; may only look.", "Nimmt auf; schaut vielleicht nur."), tt("Needed, but nothing shows if it worked.", "Nötig, aber nichts zeigt, ob es gewirkt hat.")],
          [tt("Active: answering, applying, deciding", "Aktiv: antworten, anwenden, entscheiden"), tt("Recalls and uses the idea.", "Ruft die Idee ab und nutzt sie."), tt("Reinforces learning and shows what is understood.", "Festigt das Lernen und zeigt, was verstanden ist.")],
          [tt("Clicks without a goal", "Klicks ohne Ziel"), tt("Opens, presses, collects.", "Öffnet, drückt, sammelt."), tt("Activity, not learning; adds noise.", "Aktivität, kein Lernen; fügt Rauschen hinzu.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Lea are made up for this example. The difference between active and passive use follows the ICAP framework (Chi and Wylie 2014).", "LearnLoop und Lea sind für dieses Beispiel erfunden. Der Unterschied zwischen aktiver und passiver Nutzung folgt dem ICAP-Rahmen (Chi und Wylie 2014).")}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Retrieval practice: trying to recall something strengthens memory more than rereading it (Roediger and Karpicke 2006), which is why a short question after a section helps. Feedback is one of the strongest influences on learning when it tells the learner where they are going, how they are doing and what to do next (Hattie and Timperley 2007).", "Abrufübung: Der Versuch, sich an etwas zu erinnern, stärkt das Gedächtnis mehr als erneutes Lesen (Roediger und Karpicke 2006), weshalb eine kurze Frage nach einem Abschnitt hilft. Rückmeldung gehört zu den stärksten Einflüssen auf das Lernen, wenn sie der Lernenden sagt, wohin sie geht, wie sie vorankommt und was sie als Nächstes tun soll (Hattie und Timperley 2007).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Engagement through interaction comes from feedback that explains, a next step, and variety. A score alone is none of them.", "Engagement durch Interaktion kommt aus Rückmeldung, die erklärt, einem nächsten Schritt und Abwechslung. Ein Ergebnis allein ist keines davon.")}
      sources={["hattie2007", "hamari2014", "chiWylie2014"]}
      reasoning={[
        tt("Activate the learner with a task tied to the lesson, not with a click to open the next page.", "Aktivieren Sie die Lernende mit einer Aufgabe, die an die Lektion gebunden ist, nicht mit einem Klick, der die nächste Seite öffnet."),
        tt("Give feedback that explains why, and a reward that is tied to progress, not to activity.", "Geben Sie Rückmeldung, die erklärt, warum, und eine Belohnung, die an Fortschritt gebunden ist, nicht an Aktivität."),
        tt("Avoid monotony: change the kind of task now and then so that the tenth is not the first again.", "Vermeiden Sie Monotonie: Wechseln Sie ab und zu die Art der Aufgabe, damit die zehnte nicht wieder die erste ist."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A4} art={ART_D9} />
      <EngageFig />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Ben are made up for this example.", "LearnLoop und Ben sind für dieses Beispiel erfunden.")}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Gamification can raise engagement in some settings, but results are mixed and depend on context (Hamari, Koivisto and Sarsa 2014); Day 11 treats it in depth. Here the rule is the narrow one: reward progress, never clicks.", "Gamification kann in manchen Umgebungen das Engagement erhöhen, aber die Ergebnisse sind gemischt und kontextabhängig (Hamari, Koivisto und Sarsa 2014); Tag 11 behandelt sie ausführlich. Hier gilt die enge Regel: Fortschritt belohnen, nie Klicks.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how much it helps the learner find and then learn, what could go wrong and how much work it takes. Structure before interaction.", "Bewerten Sie eine Maßnahme danach, wie sehr sie der Lernenden hilft zu finden und dann zu lernen, was schiefgehen kann und wie viel Arbeit sie macht. Struktur vor Interaktion.")}
      sources={["gibbons2018", "chiWylie2014"]}
      reasoning={[
        tt("Rate effort by how much work and time the measure takes before the release: a few pages or settings changed is Low, a part of the platform rebuilt is Mid or High. Do not judge it by how hard it feels.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und Zeit die Maßnahme bis zum Release braucht: ein paar geänderte Seiten oder Einstellungen sind Niedrig, ein umgebauter Teil der Plattform ist Mittel oder Hoch. Beurteilen Sie ihn nicht danach, wie schwer er sich anfühlt."),
        tt("Rate learning impact by what a measure does for finding the content and then learning from it: structure and feedback first, extra interaction second.", "Bewerten Sie die Lernwirkung danach, was eine Maßnahme dafür tut, den Inhalt zu finden und dann daraus zu lernen: zuerst Struktur und Rückmeldung, dann zusätzliche Interaktion."),
        tt("Rate risk by what could go wrong: an interaction can become a burden, a reward can reward the wrong thing, a big change touches every page.", "Bewerten Sie das Risiko danach, was schiefgehen kann: Eine Interaktion kann zur Last werden, eine Belohnung das Falsche belohnen, eine große Änderung berührt jede Seite."),
        tt("Justify the order with the chain orientation, activation, engagement: say how your first measure leads to the next.", "Begründen Sie die Reihenfolge mit der Kette Orientierung, Aktivierung, Engagement: Sagen Sie, wie Ihre erste Maßnahme zur nächsten führt."),
        tt("Say what you do not know, for example whether learners drop out before or after they find a lesson, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel ob Lernende abbrechen, bevor oder nachdem sie eine Lektion finden, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A5} art={ART_D9} />
      <WeighExample />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its three measures and its reasons are made up for this example. The task has its own options and its own answer.", "LearnLoop, seine drei Maßnahmen und seine Gründe sind für dieses Beispiel erfunden. Die Aufgabe hat ihre eigenen Optionen und ihre eigene Antwort.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Structure guides, interaction activates. Without structure, interaction has no effect; interaction must serve a goal, and engagement comes from meaningful activation.", "Struktur führt, Interaktion aktiviert. Ohne Struktur hat Interaktion keine Wirkung; Interaktion muss einem Ziel dienen, und Engagement kommt aus sinnvoller Aktivierung.")}
      sources={["norman2013", "rosenfeld2015", "chiWylie2014"]}
      reasoning={[
        tt("Order the work as the chain runs: orientation first, then activation, then engagement. An interaction on a platform the learner cannot navigate adds clicks to a lost learner.", "Ordnen Sie die Arbeit, wie die Kette läuft: zuerst Orientierung, dann Aktivierung, dann Engagement. Eine Interaktion auf einer Plattform, auf der die Lernende nicht navigieren kann, fügt einer verlorenen Lernenden Klicks hinzu."),
        tt("Treat navigation as decision guidance: every entry, path and button steers what the learner does next.", "Behandeln Sie Navigation als Entscheidungsführung: Jeder Eintrag, Pfad und Button lenkt, was die Lernende als Nächstes tut."),
        tt("Say where interaction is overestimated: a quiz on every page, rewards for clicks, an assistant on top of an unclear menu.", "Sagen Sie, wo Interaktion überschätzt wird: ein Quiz auf jeder Seite, Belohnungen für Klicks, ein Assistent auf einem unklaren Menü."),
        tt("Place each interaction deliberately (start, inside, end of a lesson, or not at all) and tie it to a goal.", "Platzieren Sie jede Interaktion bewusst (Anfang, Mitte, Ende einer Lektion oder gar nicht) und verbinden Sie sie mit einem Ziel."),
      ]}
    >
      <ComicButton comic={COMICS_D9.B1} art={ART_D9} />
      <OrientChain />
      <DataTable
        caption={tt("Where interaction belongs in a lesson, and where it does not", "Wo Interaktion in eine Lektion gehört und wo nicht")}
        head={[tt("Place", "Ort"), tt("What fits", "Was passt"), tt("What does not", "Was nicht passt")]}
        rows={[
          [tt("Start of a lesson", "Anfang einer Lektion"), tt("A one-question warm-up that recalls the last lesson; a poll on confidence.", "Eine Aufwärmfrage, die an die letzte Lektion erinnert; eine Umfrage zur Sicherheit."), tt("A long quiz that delays the content.", "Ein langes Quiz, das den Inhalt verzögert.")],
          [tt("Inside a lesson", "In einer Lektion"), tt("A short question after a section; a click-through scenario.", "Eine kurze Frage nach einem Abschnitt; ein Klick-Szenario."), tt("A pop-up that blocks the next page.", "Ein Pop-up, das die nächste Seite blockiert.")],
          [tt("End of a lesson", "Ende einer Lektion"), tt("A task that applies the idea; a reflection note.", "Eine Aufgabe, die die Idee anwendet; eine Reflexionsnotiz."), tt("A score with no explanation or next step.", "Ein Ergebnis ohne Erklärung oder nächsten Schritt.")],
          [tt("Anywhere", "Überall"), tt("Feedback and a next step after each interaction.", "Rückmeldung und ein nächster Schritt nach jeder Interaktion."), tt("A reward for opening a page or pressing a button.", "Eine Belohnung fürs Öffnen einer Seite oder Drücken eines Buttons.")],
        ]}
      />
      <Callout label={tt("Where interaction is overestimated", "Wo Interaktion überschätzt wird")}>
        <p>{tt("The plan's feedback question asks where interaction is overestimated. Typical places: a quiz is added to every page when the problem is that content cannot be found; points are added when the problem is unclear goals; an assistant is added on top of a menu with 24 entries. The test is the same: what does the learner think or decide here, and what do they get back?", "Die Feedbackfrage des Plans fragt, wo Interaktion überschätzt wird. Typische Stellen: Ein Quiz wird auf jede Seite gesetzt, obwohl das Problem ist, dass Inhalt nicht gefunden wird; Punkte kommen hinzu, obwohl das Problem unklare Ziele sind; ein Assistent wird auf ein Menü mit 24 Einträgen gesetzt. Der Test ist derselbe: Was denkt oder entscheidet die Lernende hier, und was bekommt sie zurück?")}</p>
      </Callout>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The chain follows the plan's coaching and Musterlösung: orientation, activation, engagement.", "Die Kette folgt dem Coaching und der Musterlösung des Plans: Orientierung, Aktivierung, Engagement.")}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("ICAP: Chi and Wylie (2014) sort learning activity into passive, active, constructive and interactive, and report that learning tends to improve in that order. A question that makes the learner produce something is better than one that only asks them to click.", "ICAP: Chi und Wylie (2014) ordnen Lernaktivität in passiv, aktiv, konstruktiv und interaktiv und berichten, dass sich das Lernen tendenziell in dieser Reihenfolge verbessert. Eine Frage, die die Lernende etwas hervorbringen lässt, ist besser als eine, die sie nur zum Klicken bringt.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Too much guidance traps experts, too little loses beginners; too little interaction leaves learners passive, too much overloads them. Aim for guidance with freedom.", "Zu viel Führung fesselt Experten, zu wenig verliert Einsteiger; zu wenig Interaktion lässt Lernende passiv, zu viel überlastet sie. Zielen Sie auf Führung mit Freiheit.")}
      sources={["nielsen2006pd", "nielsen1994", "chiWylie2014"]}
      reasoning={[
        tt("Name both poles of each conflict: over-structuring (learners lose freedom) and under-structuring (learners are lost); over-interaction (a burden) and under-interaction (passive use). A plan that names one pole has not weighed the conflict.", "Nennen Sie beide Pole jedes Konflikts: Überstrukturierung (Lernende verlieren Freiheit) und Unterstrukturierung (Lernende sind verloren); Überinteraktion (eine Last) und Unterinteraktion (passive Nutzung). Ein Plan, der einen Pol nennt, hat den Konflikt nicht abgewogen."),
        tt("Offer a recommended path with free access and a skip option, so that beginners are guided and experienced learners keep their freedom.", "Bieten Sie einen empfohlenen Pfad mit freiem Zugang und einer Überspring-Möglichkeit, damit Einsteiger geführt werden und erfahrene Lernende ihre Freiheit behalten."),
        tt("Cap interactions per lesson and make most of them skippable; watch the skip rate.", "Begrenzen Sie die Interaktionen pro Lektion und machen Sie die meisten überspringbar; beobachten Sie die Überspringrate."),
        tt("Where there is no data, choose changes that can be reversed and write the check into the plan.", "Wo es keine Daten gibt, wählen Sie Änderungen, die sich zurücknehmen lassen, und schreiben Sie die Prüfung in den Plan."),
      ]}
    >
      <ComicButton comic={COMICS_D9.B2} art={ART_D9} />
      <FlexMatrix />
      <DataTable
        caption={tt("Four conflicts and a rule for deciding each", "Vier Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Structure against flexibility", "Struktur gegen Flexibilität"), tt("A clear path for beginners", "Ein klarer Pfad für Einsteiger"), tt("Free access for experienced learners", "Freier Zugang für erfahrene Lernende"), tt("Recommend a path, never lock it; add a skip option.", "Einen Pfad empfehlen, nie sperren; eine Überspring-Möglichkeit ergänzen.")],
          [tt("Interaction against overload", "Interaktion gegen Überlastung"), tt("An active learner", "Eine aktive Lernende"), tt("A page that is not crowded", "Eine Seite, die nicht überfüllt ist"), tt("One targeted interaction per section; cap the rest.", "Eine gezielte Interaktion pro Abschnitt; den Rest begrenzen.")],
          [tt("Guidance against speed", "Führung gegen Tempo"), tt("A tour or a hint at every step", "Eine Tour oder ein Hinweis bei jedem Schritt"), tt("A quick route for those who know", "Ein schneller Weg für die, die Bescheid wissen"), tt("Guide the first visit, let it be closed, and do not repeat it.", "Den ersten Besuch führen, schließbar machen und nicht wiederholen.")],
          [tt("Reward against meaning", "Belohnung gegen Sinn"), tt("A visible reward for activity", "Eine sichtbare Belohnung für Aktivität"), tt("A result that means something", "Ein Ergebnis, das etwas bedeutet"), tt("Reward progress and results, not clicks.", "Fortschritt und Ergebnisse belohnen, nicht Klicks.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its five designs are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine fünf Entwürfe sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Progressive disclosure helps both sides of the conflict: it shows beginners little and lets experts reach more (Nielsen 2006). For interaction, the same idea applies: show the one question that fits, and keep the rest one click away.", "Progressive Disclosure hilft beiden Seiten des Konflikts: Sie zeigt Einsteigern wenig und lässt Experten mehr erreichen (Nielsen 2006). Für Interaktion gilt derselbe Gedanke: Zeigen Sie die eine Frage, die passt, und halten Sie den Rest einen Klick entfernt.")}</p>
        <p>{tt("UX as steering of behaviour: the plan's discussion line. Every menu, path and prompt nudges; state openly what you want learners to do and check that it is also what they want.", "UX als Steuerung von Verhalten: die Diskussionszeile des Plans. Jedes Menü, jeder Pfad und jeder Impuls schubst; sagen Sie offen, was Lernende tun sollen, und prüfen Sie, dass es auch das ist, was sie wollen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you have no behaviour data, choose changes that can be reversed, write the check into the plan, and say what you give up.", "Wenn Sie keine Verhaltensdaten haben, wählen Sie Änderungen, die sich zurücknehmen lassen, schreiben Sie die Prüfung in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["spencer2009", "nielsen2000", "klein2007", "bezos2016"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “more than 30% of learners skip the question by the end of week 6”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „bis Ende von Woche 6 überspringen mehr als 30 % der Lernenden die Frage“."),
        tt("Start with the structure, which can be checked cheaply with a card sort and a tree test, and add interaction in small steps that can be switched off.", "Beginnen Sie mit der Struktur, die sich günstig mit einem Card Sort und einem Tree Test prüfen lässt, und ergänzen Sie Interaktion in kleinen Schritten, die sich abschalten lassen."),
        tt("Name who decides on a change and what evidence they need: a test, task success, the skip rate.", "Nennen Sie, wer über eine Änderung entscheidet und welche Belege sie braucht: einen Test, Aufgabenerfolg, die Überspringrate."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example the point system or the assistant.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel das Punktesystem oder den Assistenten."),
      ]}
    >
      <ComicButton comic={COMICS_D9.B3} art={ART_D9} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision without behaviour data safer", "Fünf Wege, eine Entscheidung ohne Verhaltensdaten sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Test the structure cheaply", "Die Struktur günstig testen"), tt("A closed card sort and a tree test with ten to twenty learners take days and need no build.", "Ein geschlossener Card Sort und ein Tree Test mit zehn bis zwanzig Lernenden dauern Tage und brauchen keinen Bau.")],
          [tt("Add interaction in small steps", "Interaktion in kleinen Schritten ergänzen"), tt("One question per lesson first, behind a switch, before any other interaction.", "Zuerst eine Frage pro Lektion, hinter einem Schalter, vor jeder anderen Interaktion.")],
          [tt("Pick a figure you can watch", "Eine Zahl wählen, die Sie beobachten können"), tt("The skip rate, task success or the share who find a course in a minute.", "Die Überspringrate, den Aufgabenerfolg oder den Anteil, der einen Kurs in einer Minute findet.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Premortem: Klein's premortem asks the team to imagine that the redesign failed. Typical answers here: learners lost the freedom to jump ahead, every screen asked for a click, and the new names meant nothing to beginners. Each answer becomes a check.", "Premortem: Kleins Premortem bittet das Team, sich vorzustellen, das Redesign sei gescheitert. Typische Antworten hier: Lernende verloren die Freiheit, vorzuspringen, jeder Bildschirm verlangte einen Klick, und die neuen Namen bedeuteten Einsteigern nichts. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. A question behind a switch is a two-way door; rebuilding the platform is a one-way door.", "Einbahn- und Zweiwegtüren: Bezos trennt schwer umkehrbare Entscheidungen von leicht umkehrbaren. Eine Frage hinter einem Schalter ist eine Zweiwegtür; die Plattform neu zu bauen ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
