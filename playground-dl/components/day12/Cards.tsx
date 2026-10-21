"use client";

import type { ReactNode } from "react";
import { AdaptiveFig, ComplexityMatrix, DecisionFrame, DesignChain, OppRiskFig, PatternFig, TechFig, WeighExample } from "@/components/day12/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D12 } from "@/components/day12/comicScenes";
import { COMICS_D12 } from "@/data/day12/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Ravi; never AdaptLearn, so no task is answered here.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)", "Vertiefende Lektüre zeigen (optional)")}>
    <Callout label={tt("Extra · go deeper", "Extra · vertiefen")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const CA = (en: string, de: string) => (
  <Callout label={tt("Case assumption", "Fallannahme")}>
    <p>{tt(en, de)}</p>
  </Callout>
);

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("An adaptive system collects data about behaviour, analyses it and adapts content or difficulty, to give each learner a path that fits. It helps only when the learner can see why.", "Ein adaptives System sammelt Daten über das Verhalten, analysiert sie und passt Inhalt oder Schwierigkeit an, um jeder Lernenden einen passenden Pfad zu geben. Es hilft nur, wenn die Lernende sehen kann, warum.")}
      sources={["brusilovsky2001", "kalyuga2003"]}
      reasoning={[
        tt("Sort an adaptation as opaque when something changes with no notice, no reason or no way to see it: a path that says only “updated”, a lesson that vanishes, a recommendation with no reason.", "Ordnen Sie eine Anpassung als undurchsichtig ein, wenn sich etwas ohne Hinweis, ohne Grund oder ohne Möglichkeit, es zu sehen, ändert: ein Pfad, der nur „aktualisiert“ sagt, eine Lektion, die verschwindet, eine Empfehlung ohne Grund."),
        tt("Sort an adaptation as helpful when the learner sees what changed and why, and can change it back or choose.", "Ordnen Sie eine Anpassung als hilfreich ein, wenn die Lernende sieht, was sich geändert hat und warum, und es zurückstellen oder wählen kann."),
        tt("Use the three steps to find where a system goes wrong: it collects the wrong data, it analyses too little, or it adapts too strongly or silently.", "Nutzen Sie die drei Schritte, um zu finden, wo ein System danebengeht: Es sammelt die falschen Daten, es analysiert zu wenig oder es passt zu stark oder still an."),
        tt("Compare a platform that gives everyone the same content with one that adapts: the first is clear and ignores differences; the second can fit each learner, if it is understandable.", "Vergleichen Sie eine Plattform, die allen denselben Inhalt gibt, mit einer, die sich anpasst: Die erste ist klar und ignoriert Unterschiede; die zweite kann zu jeder Lernenden passen, wenn sie verständlich ist."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A1} art={ART_D12} />
      <AdaptiveFig />
      <DataTable
        caption={tt("The three steps of an adaptive system", "Die drei Schritte eines adaptiven Systems")}
        head={[tt("Step", "Schritt"), tt("What happens", "Was geschieht"), tt("Where it can go wrong", "Wo es danebengehen kann")]}
        rows={[
          [tt("Collect", "Sammeln"), tt("Data about what the learner does.", "Daten darüber, was die Lernende tut."), tt("Too little data, or the wrong data.", "Zu wenige Daten oder die falschen.")],
          [tt("Analyse", "Analysieren"), tt("Progress, mistakes, speed.", "Fortschritt, Fehler, Tempo."), tt("A big conclusion from one data point.", "Ein großer Schluss aus einem Datenpunkt.")],
          [tt("Adapt", "Anpassen"), tt("Content or difficulty changes.", "Inhalt oder Schwierigkeit ändern sich."), tt("It changes silently, or cannot be undone.", "Es ändert sich still oder lässt sich nicht rückgängig machen.")],
        ]}
      />
      {CA("LearnLoop and Ravi are made up for this example. The definition follows Brusilovsky (2001): adapting content to the individual learner.", "LearnLoop und Ravi sind für dieses Beispiel erfunden. Die Definition folgt Brusilovsky (2001): Inhalt an die einzelne Lernende anzupassen.")}
      <Extra id="A1">
        <p>{tt("Adaptive systems often rest on a model of the learner, for example what they know. Studies of expertise reversal (Kalyuga et al. 2003) show why adapting matters: help that suits a beginner can slow an expert down.", "Adaptive Systeme beruhen oft auf einem Modell der Lernenden, etwa dessen, was sie weiß. Studien zur Expertise-Umkehr (Kalyuga et al. 2003) zeigen, warum Anpassung zählt: Hilfe, die einem Anfänger nützt, kann einen Experten bremsen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Rules are written by a person, need little data and can be explained. A model finds patterns in a lot of data but cannot say why. With a small data basis, rules are the safer choice.", "Regeln schreibt ein Mensch, sie brauchen wenig Daten und lassen sich erklären. Ein Modell findet Muster in vielen Daten, kann aber nicht sagen, warum. Bei kleiner Datenbasis sind Regeln die sicherere Wahl.")}
      sources={["ribeiro2016", "amershi2019", "aiAct"]}
      reasoning={[
        tt("Match the technique to the data you have: a small data basis points to simple rules; a model needs a lot of good data.", "Passen Sie die Technik an die Daten an, die Sie haben: Eine kleine Datenbasis spricht für einfache Regeln; ein Modell braucht viele gute Daten."),
        tt("Prefer a technique you can explain: if the learner cannot be told why a lesson was chosen, trust and acceptance suffer.", "Bevorzugen Sie eine Technik, die Sie erklären können: Wenn der Lernenden nicht gesagt werden kann, warum eine Lektion gewählt wurde, leiden Vertrauen und Akzeptanz."),
        tt("Name the three limits of any system: data quality (is it enough and right?), complexity (can the team maintain it?) and transparency (can it be explained?).", "Nennen Sie die drei Grenzen jedes Systems: Datenqualität (reicht sie und stimmt sie?), Komplexität (kann das Team es pflegen?) und Transparenz (lässt es sich erklären?)."),
        tt("Treat a complex AI system as high effort and high risk when the data basis is small, however modern it sounds.", "Behandeln Sie ein komplexes KI-System bei kleiner Datenbasis als hohen Aufwand und hohes Risiko, so modern es klingt."),
        tt("Over-adaptation: a system that reacts strongly to one mistake or a few clicks boxes the learner in; adapt slowly and keep a way back.", "Überanpassung: Ein System, das stark auf einen Fehler oder wenige Klicks reagiert, sperrt die Lernende ein; passen Sie langsam an und lassen Sie einen Weg zurück."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A2} art={ART_D12} />
      <TechFig />
      <DataTable
        caption={tt("Rules and models side by side", "Regeln und Modelle nebeneinander")}
        head={[tt("", ""), tt("Rule-based", "Regelbasiert"), tt("Data-driven (a model)", "Datengetrieben (ein Modell)")]}
        rows={[
          [tt("Needs", "Braucht"), tt("Little data and a person who writes the rules.", "Wenige Daten und einen Menschen, der die Regeln schreibt."), tt("A lot of good data and skills to build and check it.", "Viele gute Daten und Können, es zu bauen und zu prüfen.")],
          [tt("Explaining", "Erklären"), tt("Easy: “because you passed the test”.", "Leicht: „weil Sie den Test bestanden haben“."), tt("Hard: the reason is inside the box.", "Schwer: Der Grund steckt in der Box.")],
          [tt("Typical risk", "Typisches Risiko"), tt("Rules too crude for some learners.", "Regeln, die für manche Lernende zu grob sind."), tt("Wrong guesses from thin or biased data.", "Falsche Vermutungen aus dünnen oder verzerrten Daten.")],
        ]}
      />
      {CA("LearnLoop and its values are made up for this example. The need to explain a model's choice is discussed by Ribeiro et al. (2016) and in the guidelines for human-AI interaction (Amershi et al. 2019); the EU AI Act sets rules for AI systems, and which apply to a learning platform depends on its use, so check before relying on it.", "LearnLoop und seine Werte sind für dieses Beispiel erfunden. Die Notwendigkeit, die Wahl eines Modells zu erklären, wird von Ribeiro et al. (2016) und in den Leitlinien zur Mensch-KI-Interaktion (Amershi et al. 2019) behandelt; der EU AI Act setzt Regeln für KI-Systeme, und welche für eine Lernplattform gelten, hängt vom Einsatz ab, prüfen Sie es also, bevor Sie sich darauf verlassen.")}
      <Extra id="A2">
        <p>{tt("A cold start is the moment a new learner has no history, so a model has nothing to go on. A short start questionnaire is the usual answer, and it works with rules as well as with models.", "Ein Kaltstart ist der Moment, in dem eine neue Lernende noch keine Geschichte hat, ein Modell also nichts hat, woran es sich halten kann. Ein kurzer Startfragebogen ist die übliche Antwort, und er funktioniert mit Regeln ebenso wie mit Modellen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Four UX patterns make a personalised path usable: a recommendation, adaptive difficulty, a dynamic path and behaviour-based feedback. Each works when the learner can see it, understand it and change it.", "Vier UX-Muster machen einen personalisierten Pfad nutzbar: eine Empfehlung, adaptive Schwierigkeit, ein dynamischer Pfad und verhaltensbasiertes Feedback. Jedes wirkt, wenn die Lernende es sehen, verstehen und ändern kann.")}
      sources={["amershi2019", "shneiderman2016", "nielsen1994"]}
      reasoning={[
        tt("Choose patterns the learner can see: a recommendation with its reason, a difficulty level that is shown, a path map with adapted parts marked.", "Wählen Sie Muster, die die Lernende sehen kann: eine Empfehlung mit ihrem Grund, eine Schwierigkeitsstufe, die gezeigt wird, eine Pfadkarte mit gekennzeichneten angepassten Teilen."),
        tt("Give every pattern a way back: an undo for a difficulty change, a switch to choose the path alone.", "Geben Sie jedem Muster einen Weg zurück: ein Rückgängig für eine Schwierigkeitsänderung, einen Schalter, um den Pfad allein zu wählen."),
        tt("Avoid silent re-routing, a recommendation with no reason, and a hidden score: each takes control from the learner.", "Vermeiden Sie stilles Umleiten, eine Empfehlung ohne Grund und einen versteckten Wert: Jedes nimmt der Lernenden die Kontrolle."),
        tt("Start the first adaptation from what the learner says (a short questionnaire they can edit), and let behaviour refine it.", "Starten Sie die erste Anpassung bei dem, was die Lernende sagt (ein kurzer Fragebogen, den sie ändern kann), und lassen Sie das Verhalten sie verfeinern."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A3} art={ART_D12} />
      <PatternFig />
      <DataTable
        caption={tt("Four patterns and what makes each one usable", "Vier Muster und was jedes nutzbar macht")}
        head={[tt("Pattern", "Muster"), tt("What it does", "Was es tut"), tt("What makes it usable", "Was es nutzbar macht")]}
        rows={[
          [tt("Individual recommendation", "Individuelle Empfehlung"), tt("Suggests the next lesson.", "Schlägt die nächste Lektion vor."), tt("A reason, and the full list still reachable.", "Ein Grund, und die ganze Liste bleibt erreichbar.")],
          [tt("Adaptive difficulty", "Adaptive Schwierigkeit"), tt("Raises or lowers the level.", "Hebt oder senkt das Niveau."), tt("The level is shown, with an undo.", "Die Stufe wird gezeigt, mit Rückgängig.")],
          [tt("Dynamic path", "Dynamischer Pfad"), tt("Adds, skips or repeats lessons.", "Ergänzt, überspringt oder wiederholt Lektionen."), tt("Adapted parts are marked on a map.", "Angepasste Teile sind auf einer Karte gekennzeichnet.")],
          [tt("Behaviour-based feedback", "Verhaltensbasiertes Feedback"), tt("Comments on what the learner did.", "Kommentiert, was die Lernende getan hat."), tt("It names the behaviour and the next step.", "Es nennt das Verhalten und den nächsten Schritt.")],
        ]}
      />
      {CA("LearnLoop and Ravi are made up for this example. The usability rules follow Nielsen's heuristics and the guidelines for human-AI interaction (Amershi et al. 2019).", "LearnLoop und Ravi sind für dieses Beispiel erfunden. Die Gebrauchstauglichkeitsregeln folgen Nielsens Heuristiken und den Leitlinien zur Mensch-KI-Interaktion (Amershi et al. 2019).")}
      <Extra id="A3">
        <p>{tt("Amershi et al. (2019) propose guidelines for systems that learn from their users, among them: make clear what the system can do, show why it did what it did, and let the user correct it. They apply to a learning platform as much as to any other.", "Amershi et al. (2019) schlagen Leitlinien für Systeme vor, die von ihren Nutzern lernen, darunter: klarmachen, was das System kann, zeigen, warum es tat, was es tat, und den Nutzer es korrigieren lassen. Sie gelten für eine Lernplattform ebenso wie für jede andere.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Opportunities: efficiency, motivation and learning success. Risks: opacity, over-adaptation and a wrong data basis. Personalisation links to gamification through a personal goal.", "Chancen: Effizienz, Motivation und Lernerfolg. Risiken: Undurchsichtigkeit, Überanpassung und falsche Datenbasis. Personalisierung hängt mit Gamification über ein persönliches Ziel zusammen.")}
      sources={["brusilovsky2001", "deterding2011"]}
      reasoning={[
        tt("Name both sides: an opportunity (time saved, practice where needed) and the risk that comes with it.", "Nennen Sie beide Seiten: eine Chance (gesparte Zeit, Übung, wo sie nötig ist) und das Risiko, das damit kommt."),
        tt("Join gamification to personalisation through a personal goal, not through a point total.", "Verbinden Sie Gamification mit Personalisierung über ein persönliches Ziel, nicht über eine Punktesumme."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A4} art={ART_D12} />
      <OppRiskFig />
      {CA("LearnLoop is the example company.", "LearnLoop ist das Beispielunternehmen.")}
      <Extra id="A4">
        <p>{tt("Day 11 showed that points reward activity. A goal the learner chose at the start gives the same bar a meaning of its own: progress toward something they want.", "Tag 11 zeigte, dass Punkte Aktivität belohnen. Ein Ziel, das die Lernende am Start gewählt hat, gibt demselben Balken eine eigene Bedeutung: Fortschritt hin zu etwas, das sie will.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how much it helps learners, how much work it takes and what could go wrong. Technology against benefit: a small data basis points to simple rules.", "Bewerten Sie eine Maßnahme danach, wie sehr sie Lernenden hilft, wie viel Arbeit sie macht und was schiefgehen kann. Technologie gegen Nutzen: Eine kleine Datenbasis spricht für einfache Regeln.")}
      sources={["gibbons2018", "amershi2019"]}
      reasoning={[
        tt("Rate effort by how much work and how many people it needs. The plan prints no price, so Low, Mid or High is your judgement, with a reason.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und wie viele Personen er braucht. Der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund."),
        tt("Rate benefit by how much it helps different learners understand and use the adaptation, not by how advanced the technology is.", "Bewerten Sie den Nutzen danach, wie sehr es verschiedenen Lernenden hilft, die Anpassung zu verstehen und zu nutzen, nicht danach, wie fortschrittlich die Technik ist."),
        tt("Rate risk by what could go wrong: a small data basis, a system nobody understands, over-adaptation, a big change that touches every screen.", "Bewerten Sie das Risiko danach, was schiefgehen kann: eine kleine Datenbasis, ein System, das niemand versteht, Überanpassung, eine große Änderung, die jeden Bildschirm berührt."),
        tt("Justify the order with the rule comprehensibility before complexity: say how your first measure makes the system understandable.", "Begründen Sie die Reihenfolge mit der Regel Verständlichkeit vor Komplexität: Sagen Sie, wie Ihre erste Maßnahme das System verständlich macht."),
        tt("Say what you do not know, for example whether learners keep the adaptation on, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel ob Lernende die Anpassung eingeschaltet lassen, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A5} art={ART_D12} />
      <WeighExample />
      {CA("LearnLoop and its reasons are made up for this example. The task case is in the task.", "LearnLoop und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("More technology is not better UX. Design personalisation from the learner's need, through the data you have and the simplest technique that fits, to an adaptation the learner can see and change.", "Mehr Technologie ist nicht bessere UX. Entwerfen Sie Personalisierung vom Bedarf der Lernenden über die Daten, die Sie haben, und die einfachste passende Technik zu einer Anpassung, die die Lernende sehen und ändern kann.")}
      sources={["amershi2019", "brusilovsky2001", "hamari2014"]}
      reasoning={[
        tt("Decide how far to personalise from the data and the users you have: heterogeneous users argue for some personalisation; a small data basis argues for simple rules.", "Entscheiden Sie, wie weit personalisiert wird, nach den Daten und Nutzern, die Sie haben: Heterogene Nutzer sprechen für etwas Personalisierung; eine kleine Datenbasis spricht für einfache Regeln."),
        tt("Build in two steps when data is incomplete: explained rules first, a model later once there is enough good data.", "Bauen Sie in zwei Schritten, wenn Daten unvollständig sind: zuerst erklärte Regeln, später ein Modell, sobald genug gute Daten da sind."),
        tt("Choose UX patterns the learner can see, understand and steer, and drop the silent and hidden ones.", "Wählen Sie UX-Muster, die die Lernende sehen, verstehen und steuern kann, und streichen Sie die stillen und versteckten."),
        tt("Join gamification to the personal goal: a goal bar chosen at the start, filled by checked lessons, with no ranking.", "Verbinden Sie Gamification mit dem persönlichen Ziel: ein am Start gewählter Zielbalken, durch geprüfte Lektionen gefüllt, ohne Rangliste."),
        tt("Sketch at low fidelity first: place each element on the screen where it belongs and leave out what a first test does not need.", "Skizzieren Sie zuerst in Low Fidelity: Ordnen Sie jedes Element dem Bildschirm zu, auf den es gehört, und lassen Sie weg, was ein erster Test nicht braucht."),
      ]}
    >
      <ComicButton comic={COMICS_D12.B1} art={ART_D12} />
      <DesignChain />
      <DataTable
        caption={tt("The test for each link of the chain", "Der Test für jedes Glied der Kette")}
        head={[tt("Link", "Glied"), tt("The test", "Der Test"), tt("What goes wrong without it", "Was ohne ihn schiefgeht")]}
        rows={[
          [tt("Learner need", "Bedarf der Lernenden"), tt("Can you say who needs what, and why a standard path fails them?", "Können Sie sagen, wer was braucht und warum ein Standardpfad sie im Stich lässt?"), tt("Technology looks for a problem.", "Technologie sucht ein Problem.")],
          [tt("Data you have", "Daten, die Sie haben"), tt("Is it enough, and is it right?", "Reicht sie, und stimmt sie?"), tt("The system guesses.", "Das System rät.")],
          [tt("Technique", "Technik"), tt("Is it the simplest one that fits the data?", "Ist es die einfachste, die zu den Daten passt?"), tt("Complexity nobody can maintain.", "Komplexität, die niemand pflegen kann.")],
          [tt("A visible adaptation", "Eine sichtbare Anpassung"), tt("Does the learner see what changed, why, and can they change it?", "Sieht die Lernende, was sich geändert hat, warum, und kann sie es ändern?"), tt("Low acceptance.", "Niedrige Akzeptanz.")],
        ]}
      />
      {CA("The chain follows the plan's coaching: more technology is not better UX, and data quality matters. LearnLoop is the example company.", "Die Kette folgt dem Coaching des Plans: Mehr Technologie ist nicht bessere UX, und Datenqualität zählt. LearnLoop ist das Beispielunternehmen.")}
      <Extra id="B1">
        <p>{tt("Over-engineering means building more than the problem needs. In personalisation it often shows as a model where three rules would do, which costs more, is harder to explain and, with little data, works worse.", "Over-Engineering heißt, mehr zu bauen, als das Problem braucht. Bei Personalisierung zeigt es sich oft als ein Modell, wo drei Regeln genügt hätten, was mehr kostet, schwerer zu erklären ist und bei wenigen Daten schlechter funktioniert.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("UX against technology, personalisation against standardisation. Choose the simplest technique the learner understands and that fits the data.", "UX gegen Technologie, Personalisierung gegen Standardisierung. Wählen Sie die einfachste Technik, die die Lernende versteht und die zu den Daten passt.")}
      sources={["amershi2019", "ribeiro2016", "kalyuga2003"]}
      reasoning={[
        tt("Name both sides of each conflict: powerful technique and understood technique; adapted for each and the same for all. A plan that names one side has not weighed the conflict.", "Nennen Sie beide Seiten jedes Konflikts: mächtige Technik und verstandene Technik; für jede angepasst und für alle gleich. Ein Plan, der eine Seite nennt, hat den Konflikt nicht abgewogen."),
        tt("When standardisation is the better choice: short content, a very small data basis, or learners who are alike.", "Wann Standardisierung die bessere Wahl ist: kurzer Inhalt, eine sehr kleine Datenbasis oder ähnliche Lernende."),
        tt("When personalisation pays off: learners differ a lot in what they know, and you can see the difference in data you trust.", "Wann sich Personalisierung lohnt: Lernende unterscheiden sich stark in dem, was sie wissen, und Sie sehen den Unterschied in Daten, denen Sie trauen."),
        tt("Keep the full path visible even when it is adapted, so a learner can look beyond what the system suggests.", "Halten Sie den ganzen Pfad sichtbar, auch wenn er angepasst ist, damit eine Lernende über das hinausschauen kann, was das System vorschlägt."),
      ]}
    >
      <ComicButton comic={COMICS_D12.B2} art={ART_D12} />
      <ComplexityMatrix />
      <DataTable
        caption={tt("Two conflicts and a rule for deciding each", "Zwei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("UX against technology", "UX gegen Technologie"), tt("The most powerful technique", "Die mächtigste Technik"), tt("A technique the learner understands", "Eine Technik, die die Lernende versteht"), tt("Choose the simplest one that fits the data.", "Wählen Sie die einfachste, die zu den Daten passt.")],
          [tt("Personalisation against standardisation", "Personalisierung gegen Standardisierung"), tt("A path for each learner", "Ein Pfad für jede Lernende"), tt("One clear path for all", "Ein klarer Pfad für alle"), tt("Personalise where learners differ and the data shows it; standardise the rest.", "Personalisieren Sie, wo Lernende sich unterscheiden und die Daten es zeigen; standardisieren Sie den Rest.")],
        ]}
      />
      {CA("LearnLoop and its six ideas are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sechs Ideen sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}
      <Extra id="B2">
        <p>{tt("Explainable AI is the effort to make a model's choices understandable to people (Ribeiro et al. 2016). For a learning platform the practical version is a short reason beside each adaptation, in the learner's words.", "Erklärbare KI ist das Bemühen, die Entscheidungen eines Modells für Menschen verständlich zu machen (Ribeiro et al. 2016). Für eine Lernplattform ist die praktische Fassung ein kurzer Grund neben jeder Anpassung, in den Worten der Lernenden.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When the data basis is incomplete, choose a small, reversible step, test the concept in a prototype with a few learners, write a figure you can watch into the plan, and say what you give up.", "Wenn die Datenbasis unvollständig ist, wählen Sie einen kleinen, umkehrbaren Schritt, testen Sie das Konzept in einem Prototyp mit wenigen Lernenden, schreiben Sie eine beobachtbare Zahl in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "gibbons2018"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “more than 30% of the test learners have switched the adaptation off by the end of month 2”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „mehr als 30 % der Testlernenden haben die Anpassung bis Ende von Monat 2 ausgeschaltet“."),
        tt("Learn cheaply: a low-fidelity prototype tested with five to eight learners shows what you do not know before you build.", "Lernen Sie günstig: Ein Low-Fidelity-Prototyp, mit fünf bis acht Lernenden getestet, zeigt, was Sie nicht wissen, bevor Sie bauen."),
        tt("Do not copy competitors because they use adaptive systems: you cannot see their evidence, and their data is not yours.", "Kopieren Sie Wettbewerber nicht, nur weil sie adaptive Systeme nutzen: Sie sehen ihre Belege nicht, und ihre Daten sind nicht Ihre."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example a model or an “AI-powered” label.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel ein Modell oder ein Etikett „KI-gestützt“."),
      ]}
    >
      <ComicButton comic={COMICS_D12.B3} art={ART_D12} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision with incomplete data safer", "Fünf Wege, eine Entscheidung bei unvollständigen Daten sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Test a prototype", "Einen Prototyp testen"), tt("Five to eight learners use paper or clickable screens of the concept.", "Fünf bis acht Lernende nutzen Papier oder klickbare Bildschirme des Konzepts.")],
          [tt("Start with rules", "Mit Regeln beginnen"), tt("A few rules that need little data and that can be explained.", "Wenige Regeln, die wenig Daten brauchen und sich erklären lassen.")],
          [tt("Set a figure and a date", "Eine Zahl und ein Datum festlegen"), tt("The share you expect to keep the adaptation on, and the month you will look.", "Der Anteil, den Sie erwarten, der die Anpassung eingeschaltet lässt, und der Monat, in dem Sie nachsehen.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}
      <Extra id="B3">
        <p>{tt("Premortem: imagine the platform failed. Typical answers here: learners did not understand the adaptations, the system boxed people in after a few clicks, and the data was too thin. Each answer becomes a check.", "Premortem: Stellen Sie sich vor, die Plattform sei gescheitert. Typische Antworten hier: Lernende verstanden die Anpassungen nicht, das System sperrte Menschen nach wenigen Klicks ein, und die Daten waren zu dünn. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: adaptation behind a switch is a two-way door; a platform rebuilt around a model is a one-way door.", "Einbahn- und Zweiwegtüren: Anpassung hinter einem Schalter ist eine Zweiwegtür; eine um ein Modell herum neu gebaute Plattform ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
