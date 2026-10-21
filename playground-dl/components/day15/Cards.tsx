"use client";

import type { ReactNode } from "react";
import { ContextFig, DecisionFrame, FitMatrix, MicroFig, MobileChain, MobileTestFig, PhoneFixFig, WeighExample } from "@/components/day15/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D15 } from "@/components/day15/comicScenes";
import { COMICS_D15 } from "@/data/day15/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Ben; never MobileLearn, so no task is answered here.
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
      scan={tt("The context of use decides the design. On a phone it is usually on the go, with little time and low attention. Mobile is not a smaller desktop; it needs speed, simplicity and clarity.", "Der Nutzungskontext bestimmt das Design. Auf dem Handy ist er meist unterwegs, mit wenig Zeit und wenig Aufmerksamkeit. Mobil ist kein kleinerer Desktop; es braucht Tempo, Einfachheit und Klarheit.")}
      sources={["budiu2015", "sharples2007", "wroblewski2011"]}
      reasoning={[
        tt("Start from the context: where, when and with how much attention does the learner use the platform? On the go means minutes, one hand and distractions.", "Gehen Sie vom Kontext aus: Wo, wann und mit wie viel Aufmerksamkeit nutzt die Lernende die Plattform? Unterwegs heißt Minuten, eine Hand und Ablenkungen."),
        tt("Sort a fact as a length problem when a session on the move cannot finish it: a long video, a very long text, a quiz that must be finished in one go.", "Ordnen Sie einen Fakt als Längenproblem ein, wenn eine Sitzung unterwegs ihn nicht beenden kann: ein langes Video, ein sehr langer Text, ein Quiz, das in einem Zug beendet werden muss."),
        tt("Sort a fact as an adaptation problem when the layout or media are not fitted to a phone or its setting: a shrunk desktop menu, a wide table, a video that needs sound.", "Ordnen Sie einen Fakt als Anpassungsproblem ein, wenn Layout oder Medien nicht an ein Handy oder seine Umgebung angepasst sind: ein verkleinertes Desktop-Menü, eine breite Tabelle, ein Video, das Ton braucht."),
        tt("Say what a mobile learner expects: speed (it starts at once), simplicity (one main thing), clarity (it is obvious what to do).", "Sagen Sie, was eine mobile Lernende erwartet: Tempo (es startet sofort), Einfachheit (eine Hauptsache), Klarheit (es ist offensichtlich, was zu tun ist)."),
        tt("Decide which content belongs on a phone: short, quick to check, easy to stop. Long reading, wide tables and projects with files fit a laptop better.", "Entscheiden Sie, welcher Inhalt aufs Handy gehört: kurz, schnell zu prüfen, leicht zu beenden. Langes Lesen, breite Tabellen und Projekte mit Dateien passen besser auf einen Laptop."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A1} art={ART_D15} />
      <ContextFig />
      <DataTable
        caption={tt("Two contexts of use, side by side", "Zwei Nutzungskontexte nebeneinander")}
        head={[tt("", ""), tt("At a desk", "Am Schreibtisch"), tt("On the go with a phone", "Unterwegs mit dem Handy")]}
        rows={[
          [tt("Time", "Zeit"), tt("An hour or more", "Eine Stunde oder mehr"), tt("A few minutes", "Wenige Minuten")],
          [tt("Attention", "Aufmerksamkeit"), tt("High, few interruptions", "Hoch, wenige Unterbrechungen"), tt("Low, many interruptions", "Niedrig, viele Unterbrechungen")],
          [tt("Hands and screen", "Hände und Bildschirm"), tt("Two hands, large screen, keyboard", "Zwei Hände, großer Bildschirm, Tastatur"), tt("One hand, small screen, thumb", "Eine Hand, kleiner Bildschirm, Daumen")],
          [tt("What fits", "Was passt"), tt("Long reading, tables, projects", "Langes Lesen, Tabellen, Projekte"), tt("Short units, quick checks, reminders", "Kurze Einheiten, schnelle Prüfungen, Erinnerungen")],
        ]}
      />
      {CA("LearnLoop and Ben are made up for this example. The differences between mobile and desktop use are described in the usability literature on mobile (Budiu 2015) and in the theory of mobile learning (Sharples et al. 2007).", "LearnLoop und Ben sind für dieses Beispiel erfunden. Die Unterschiede zwischen mobiler und Desktop-Nutzung sind in der Usability-Literatur zu Mobilgeräten (Budiu 2015) und in der Theorie des mobilen Lernens (Sharples et al. 2007) beschrieben.")}
      <Extra id="A1">
        <p>{tt("Wroblewski's “mobile first” asks teams to design for the small screen first, because the constraints force them to decide what matters most. It is a way of working, and not a claim that everybody studies on a phone.", "Wroblewskis „Mobile First“ bittet Teams, zuerst für den kleinen Bildschirm zu gestalten, weil die Beschränkungen sie zwingen zu entscheiden, was am wichtigsten ist. Es ist eine Arbeitsweise und keine Behauptung, dass alle auf dem Handy lernen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Microlearning: short, self-contained units with one objective each. It fits everyday life. The risk is fragmentation of knowledge, so each unit needs a goal, a check and its place in the course.", "Microlearning: kurze, in sich geschlossene Einheiten mit je einem Ziel. Es passt zum Alltag. Das Risiko ist die Zersplitterung des Wissens, jede Einheit braucht also ein Ziel, eine Prüfung und ihren Platz im Kurs.")}
      sources={["hug2005", "sharples2007", "klein2007"]}
      reasoning={[
        tt("Build a unit around one learning objective, about three to seven minutes, that can be finished in a short break.", "Bauen Sie eine Einheit um ein Lernziel, etwa drei bis sieben Minuten, das sich in einer kurzen Pause beenden lässt."),
        tt("Make each unit stand alone, but show its place in the course, so that the pieces add up.", "Machen Sie jede Einheit eigenständig, zeigen Sie aber ihren Platz im Kurs, damit sich die Stücke zusammenfügen."),
        tt("End each unit with a short check, and let a “continue” card remember where the learner stopped.", "Beenden Sie jede Einheit mit einer kurzen Prüfung und lassen Sie eine „Weitermachen“-Karte sich merken, wo die Lernende aufgehört hat."),
        tt("Do not cut a long lesson at arbitrary points: a piece with no objective does not teach.", "Schneiden Sie eine lange Lektion nicht an beliebigen Stellen: Ein Stück ohne Ziel lehrt nicht."),
        tt("Name the risk when you propose microlearning: fragmentation, and say how you would guard against it.", "Nennen Sie das Risiko, wenn Sie Microlearning vorschlagen: Zersplitterung, und sagen Sie, wie Sie sich davor schützen würden."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A2} art={ART_D15} />
      <MicroFig />
      <DataTable
        caption={tt("Advantages and risks of microlearning", "Vorteile und Risiken von Microlearning")}
        head={[tt("", ""), tt("Advantage", "Vorteil"), tt("Risk and a safeguard", "Risiko und ein Schutz")]}
        rows={[
          [tt("Time", "Zeit"), tt("Fits a short break; high flexibility.", "Passt in eine kurze Pause; hohe Flexibilität."), tt("Many tiny sessions; a “continue” card helps.", "Viele winzige Sitzungen; eine „Weitermachen“-Karte hilft.")],
          [tt("Focus", "Fokus"), tt("One objective per unit.", "Ein Ziel je Einheit."), tt("Fragmentation: show each unit's place in the course.", "Zersplitterung: den Platz jeder Einheit im Kurs zeigen.")],
          [tt("Everyday life", "Alltag"), tt("Better integration into a busy day.", "Bessere Einbindung in einen vollen Tag."), tt("Shallow learning: end with a check, and a course-level check.", "Oberflächliches Lernen: mit einer Prüfung enden und einer Kursprüfung.")],
        ]}
      />
      {CA("LearnLoop and Ben are made up for this example. Microlearning as a term is discussed in the literature (Hug 2005), where its limits as well as its uses are noted.", "LearnLoop und Ben sind für dieses Beispiel erfunden. Microlearning als Begriff wird in der Literatur diskutiert (Hug 2005), wo auch seine Grenzen und seine Nutzen genannt werden.")}
      <Extra id="A2">
        <p>{tt("Whether short units teach as well as long ones depends on how the content is designed, so the claim to check is not “short is better” but “each unit has one objective and a check”.", "Ob kurze Einheiten ebenso gut lehren wie lange, hängt davon ab, wie der Inhalt gestaltet ist, die Behauptung, die zu prüfen ist, lautet also nicht „kurz ist besser“, sondern „jede Einheit hat ein Ziel und eine Prüfung“.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Responsive design prioritises and reduces: the essentials first, large targets, text that fits. Cross-device design keeps one experience: synchronised progress, the same names, the same logic.", "Responsive Design priorisiert und reduziert: das Wesentliche zuerst, große Ziele, passender Text. Cross-Device-Design hält ein Erlebnis: synchronisierter Fortschritt, dieselben Namen, dieselbe Logik.")}
      sources={["wroblewski2011", "budiu2015", "wcag22"]}
      reasoning={[
        tt("Prioritise content by device: what is the same everywhere, what comes first on a phone, what only fits a large screen.", "Priorisieren Sie Inhalt nach Gerät: was überall gleich ist, was auf dem Handy zuerst kommt, was nur auf einen großen Bildschirm passt."),
        tt("Reduce to the essentials: one main action per screen, tables turned into cards, long text broken up.", "Reduzieren Sie auf das Wesentliche: eine Hauptaktion je Bildschirm, Tabellen zu Karten gemacht, langer Text aufgebrochen."),
        tt("Make touch targets large and give them room: about 44 px is a good aim (WCAG 2.2 requires 24 px at Level AA).", "Machen Sie Touch-Ziele groß und geben Sie ihnen Platz: etwa 44 px sind ein gutes Ziel (WCAG 2.2 verlangt 24 px auf Stufe AA)."),
        tt("Synchronise progress, bookmarks and the place where the learner stopped, so that any device can pick up.", "Synchronisieren Sie Fortschritt, Lesezeichen und die Stelle, an der die Lernende aufgehört hat, damit jedes Gerät übernehmen kann."),
        tt("Keep the same names and the same logic on every device, and adapt only the layout.", "Halten Sie auf jedem Gerät dieselben Namen und dieselbe Logik und passen Sie nur das Layout an."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A3} art={ART_D15} />
      <PhoneFixFig />
      <DataTable
        caption={tt("Four fixes, and the failure each one answers", "Vier Korrekturen und der Fehler, den jede beantwortet")}
        head={[tt("Fix", "Korrektur"), tt("It answers", "Es beantwortet"), tt("A simple test", "Ein einfacher Test")]}
        rows={[
          [tt("Prioritised content", "Priorisierter Inhalt"), tt("Everything shown at once in small type", "Alles auf einmal in kleiner Schrift"), tt("Does the screen open with what matters today?", "Öffnet der Bildschirm mit dem, was heute zählt?")],
          [tt("Large targets", "Große Ziele"), tt("A menu shrunk onto a phone", "Ein aufs Handy verkleinertes Menü"), tt("Can a thumb hit it on a moving train?", "Kann ein Daumen es in einem fahrenden Zug treffen?")],
          [tt("Text that fits", "Passender Text"), tt("Tables that scroll sideways", "Tabellen, die seitlich scrollen"), tt("Can a whole row be read at once?", "Lässt sich eine ganze Zeile auf einmal lesen?")],
          [tt("Synchronised place", "Synchronisierte Stelle"), tt("Progress that does not follow the learner", "Fortschritt, der der Lernenden nicht folgt"), tt("Does the laptop show what the phone did?", "Zeigt der Laptop, was das Handy getan hat?")],
        ]}
      />
      {CA("LearnLoop and Ben are made up for this example. The target-size figures are those of WCAG 2.2; the 44 px aim is a common guideline, not a legal limit.", "LearnLoop und Ben sind für dieses Beispiel erfunden. Die Zielgrößen sind die von WCAG 2.2; das Ziel von 44 px ist eine verbreitete Richtlinie, kein gesetzlicher Grenzwert.")}
      <Extra id="A3">
        <p>{tt("Day 10 treated responsive design and accessibility on a phone in detail. This card adds the cross-device side: what happens to one learner's experience when they change device.", "Tag 10 behandelte Responsive Design und Barrierefreiheit auf dem Handy im Detail. Diese Karte ergänzt die Cross-Device-Seite: was mit dem Erlebnis einer Lernenden geschieht, wenn sie das Gerät wechselt.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Test mobile learning on real phones in real settings, analyse when and where learners study, and adjust continuously.", "Testen Sie mobiles Lernen auf echten Handys in echten Umgebungen, analysieren Sie, wann und wo Lernende lernen, und passen Sie fortlaufend an.")}
      sources={["nielsen2000", "budiu2015"]}
      reasoning={[
        tt("Test on learners' own phones, some of them on the move: a lab desk hides the context.", "Testen Sie auf den eigenen Handys der Lernenden, manche unterwegs: Ein Labortisch verbirgt den Kontext."),
        tt("Analyse the contexts of use: when, where and on which device learners study.", "Analysieren Sie die Nutzungskontexte: wann, wo und auf welchem Gerät Lernende lernen."),
        tt("Adjust continuously: repeat the loop as use changes.", "Passen Sie fortlaufend an: Wiederholen Sie den Kreislauf, wenn sich die Nutzung ändert."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A4} art={ART_D15} />
      <MobileTestFig />
      {CA("LearnLoop is the example company.", "LearnLoop ist das Beispielunternehmen.")}
      <Extra id="A4">
        <p>{tt("A diary study asks learners to note where, when and on which device they study for a few weeks. It shows contexts that no analytics tool can see.", "Eine Tagebuchstudie bittet Lernende, einige Wochen lang festzuhalten, wo, wann und auf welchem Gerät sie lernen. Sie zeigt Kontexte, die kein Analysewerkzeug sehen kann.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how much it helps a learner on the move, how much work it takes and what could go wrong. Fit the content to the context before building another product.", "Bewerten Sie eine Maßnahme danach, wie sehr sie einer Lernenden unterwegs hilft, wie viel Arbeit sie macht und was schiefgehen kann. Passen Sie den Inhalt an den Kontext an, bevor Sie ein weiteres Produkt bauen.")}
      sources={["gibbons2018", "hug2005"]}
      reasoning={[
        tt("Rate effort by how much work and how many people it needs. The plan prints no price, so Low, Mid or High is your judgement, with a reason.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und wie viele Personen er braucht. Der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund."),
        tt("Rate user value by how much it helps a learner on the move: a measure that fits the context outweighs one that only copies the desktop.", "Bewerten Sie den Nutzerwert danach, wie sehr er einer Lernenden unterwegs hilft: Eine Maßnahme, die zum Kontext passt, wiegt schwerer als eine, die nur den Desktop kopiert."),
        tt("Rate risk by what could go wrong: fragmentation of knowledge, two products to keep up, a sync error, a change that touches every screen.", "Bewerten Sie das Risiko danach, was schiefgehen kann: Zersplitterung des Wissens, zwei Produkte zu pflegen, ein Synchronisationsfehler, eine Änderung, die jeden Bildschirm berührt."),
        tt("Justify the order with context, design, usage: say how your first measure fits the context of use.", "Begründen Sie die Reihenfolge mit Kontext, Design, Nutzung: Sagen Sie, wie Ihre erste Maßnahme zum Nutzungskontext passt."),
        tt("Say what you do not know, for example how many learners use a phone and when, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel wie viele Lernende ein Handy nutzen und wann, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A5} art={ART_D15} />
      <WeighExample />
      {CA("LearnLoop and its reasons are made up for this example. The task case is in the task.", "LearnLoop und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Mobile UX is a strategy of its own: start from the context of use, design for it, check the usage it produces, and scale one experience across devices.", "Mobile UX ist eine eigene Strategie: Gehen Sie vom Nutzungskontext aus, gestalten Sie dafür, prüfen Sie die Nutzung, die sie erzeugt, und skalieren Sie ein Erlebnis über Geräte hinweg.")}
      sources={["wroblewski2011", "sharples2007", "budiu2015", "nielsen2000"]}
      reasoning={[
        tt("Decide the mobile strategy from the context of use: one platform designed from the phone context first, with short units on the phone, depth on the desktop and one account. Reject a separate mobile site (two products) and native apps without a named need (cost and a one-way door).", "Entscheiden Sie die mobile Strategie aus dem Nutzungskontext: eine Plattform, zuerst aus dem Handy-Kontext gestaltet, mit kurzen Einheiten auf dem Handy, Tiefe auf dem Desktop und einem Konto. Verwerfen Sie eine getrennte mobile Website (zwei Produkte) und native Apps ohne benannten Bedarf (Kosten und eine Einbahntür)."),
        tt("Design the microlearning concept: one objective per unit, three to seven minutes, a place in the course, a short check, a “continue” card.", "Gestalten Sie das Microlearning-Konzept: ein Ziel je Einheit, drei bis sieben Minuten, ein Platz im Kurs, eine kurze Prüfung, eine „Weitermachen“-Karte."),
        tt("Plan the cross-device approach: decide what is phone first, desktop first and identical everywhere (progress, bookmarks, names).", "Planen Sie den Cross-Device-Ansatz: Entscheiden Sie, was zuerst aufs Handy, zuerst auf den Desktop gehört und was überall identisch ist (Fortschritt, Lesezeichen, Namen)."),
        tt("Test and optimise in a loop: tests on real phones each quarter, drop-out and task data split by device each month, and a change after each round.", "Testen und optimieren Sie in einem Kreislauf: Tests auf echten Handys jedes Quartal, Abbruch- und Aufgabendaten jeden Monat nach Gerät getrennt und eine Änderung nach jeder Runde."),
        tt("Say what you do not know and how to find out: the share of phone learners, and where they stop.", "Sagen Sie, was Sie nicht wissen und wie Sie es herausfinden: den Anteil der Handy-Lernenden und wo sie aufhören."),
      ]}
    >
      <ComicButton comic={COMICS_D15.B1} art={ART_D15} />
      <MobileChain />
      <DataTable
        caption={tt("The test for each link of the chain", "Der Test für jedes Glied der Kette")}
        head={[tt("Link", "Glied"), tt("The test", "Der Test"), tt("What goes wrong without it", "Was ohne ihn schiefgeht")]}
        rows={[
          [tt("Context of use", "Nutzungskontext"), tt("Can you say where, when and with what attention learners use it?", "Können Sie sagen, wo, wann und mit welcher Aufmerksamkeit Lernende es nutzen?"), tt("You design for a learner who is not there.", "Sie gestalten für eine Lernende, die nicht da ist.")],
          [tt("Design for it", "Dafür gestalten"), tt("Does the unit fit a short break, and does the layout fit a thumb?", "Passt die Einheit in eine kurze Pause, und passt das Layout zu einem Daumen?"), tt("The desktop is squeezed onto a phone.", "Der Desktop wird auf ein Handy gequetscht.")],
          [tt("Usage", "Nutzung"), tt("Is drop-out on phones measured separately?", "Werden die Abbrüche auf Handys getrennt gemessen?"), tt("You cannot tell whether it worked.", "Sie können nicht sagen, ob es gewirkt hat.")],
          [tt("Scale across devices", "Über Geräte skalieren"), tt("Does the experience stay whole when the device changes?", "Bleibt das Erlebnis ganz, wenn das Gerät wechselt?"), tt("Two experiences drift apart.", "Zwei Erlebnisse driften auseinander.")],
        ]}
      />
      {CA("The chain follows the plan's coaching: context determines design, and cross-device is a strategic advantage. LearnLoop is the example company.", "Die Kette folgt dem Coaching des Plans: Der Kontext bestimmt das Design, und Cross-Device ist ein strategischer Vorteil. LearnLoop ist das Beispielunternehmen.")}
      <Extra id="B1">
        <p>{tt("A native app is a program built for one operating system and installed from a store. It can use the phone's functions (notifications, offline storage), which a website cannot always do, so it is justified by a named need, not by fashion.", "Eine native App ist ein Programm, das für ein Betriebssystem gebaut und aus einem Store installiert wird. Sie kann Funktionen des Handys nutzen (Benachrichtigungen, Offline-Speicher), die eine Website nicht immer kann, sie wird also durch einen benannten Bedarf begründet, nicht durch Mode.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Mobile competes with desktop, and content with fit to the situation. Show on each device what suits it, keep one experience across both, and do not copy one onto the other.", "Mobil konkurriert mit Desktop und Inhalt mit Passung zur Situation. Zeigen Sie auf jedem Gerät, was zu ihm passt, halten Sie ein Erlebnis über beide und kopieren Sie nicht eines auf das andere.")}
      sources={["budiu2015", "wroblewski2011", "klein2007"]}
      reasoning={[
        tt("Name both sides of each conflict: what the desktop can show (everything) and what a phone situation allows (the essentials). A plan that names one side has not weighed the conflict.", "Nennen Sie beide Seiten jedes Konflikts: was der Desktop zeigen kann (alles) und was eine Handysituation erlaubt (das Wesentliche). Ein Plan, der eine Seite nennt, hat den Konflikt nicht abgewogen."),
        tt("Do not shrink the desktop onto the phone, and do not build a second product to avoid the choice: show the essentials first and keep the rest one tap away.", "Verkleinern Sie den Desktop nicht aufs Handy, und bauen Sie kein zweites Produkt, um die Wahl zu vermeiden: Zeigen Sie das Wesentliche zuerst und halten Sie den Rest einen Tipp entfernt."),
        tt("Keep depth where it fits: long reading and wide tables on the large screen, short units and quick checks on the phone.", "Halten Sie Tiefe dort, wo sie passt: langes Lesen und breite Tabellen auf dem großen Bildschirm, kurze Einheiten und schnelle Prüfungen auf dem Handy."),
        tt("Reject interruptions as a cure: a daily push message adds to the distractions of the context and does not fix the content.", "Verwerfen Sie Unterbrechungen als Mittel: Eine tägliche Push-Nachricht verstärkt die Ablenkungen des Kontexts und behebt den Inhalt nicht."),
      ]}
    >
      <ComicButton comic={COMICS_D15.B2} art={ART_D15} />
      <FitMatrix />
      <DataTable
        caption={tt("Two conflicts and a rule for deciding each", "Zwei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Mobile against desktop", "Mobil gegen Desktop"), tt("A phone-only design", "Ein reines Handy-Design"), tt("The desktop as it is", "Der Desktop, wie er ist"), tt("One platform, one account, layout adapted by device.", "Eine Plattform, ein Konto, Layout nach Gerät angepasst.")],
          [tt("Content against fit to the situation", "Inhalt gegen Passung zur Situation"), tt("All the content at once", "Aller Inhalt auf einmal"), tt("Only what suits the moment", "Nur, was zum Moment passt"), tt("Essentials first, the rest one tap away.", "Das Wesentliche zuerst, der Rest einen Tipp entfernt.")],
        ]}
      />
      {CA("LearnLoop and its six ideas are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sechs Ideen sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}
      <Extra id="B2">
        <p>{tt("Competitors that are “better on mobile” can mean many things: shorter units, a better layout, or an app. Before copying, ask which of these the learners of your own platform need, because their context may differ.", "Wettbewerber, die „mobil besser“ sind, kann vieles heißen: kürzere Einheiten, ein besseres Layout oder eine App. Fragen Sie vor dem Kopieren, was davon die Lernenden Ihrer eigenen Plattform brauchen, denn ihr Kontext kann anders sein.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you do not have the data by device, split it first, test on a few real phones, start with the likely and cheap step, write a figure you can watch into the plan, and say what you give up.", "Wenn Sie die Daten nach Gerät nicht haben, teilen Sie sie zuerst auf, testen Sie auf einigen echten Handys, beginnen Sie mit dem wahrscheinlichen und günstigen Schritt, schreiben Sie eine beobachtbare Zahl in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "gibbons2018"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “drop-out on phones has not fallen from 45% to below 40% by the end of month 3”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „die Abbrüche auf Handys sind bis Ende von Monat 3 nicht von 45 % auf unter 40 % gefallen“."),
        tt("Close the data gap first and cheaply: split drop-out by device, and run a test with a few learners on their own phones.", "Schließen Sie die Datenlücke zuerst und günstig: Teilen Sie die Abbrüche nach Gerät auf und führen Sie einen Test mit einigen Lernenden auf ihren eigenen Handys durch."),
        tt("Start with the step that is likely and cheap to reverse: short units for the most-used lessons, not a native app.", "Beginnen Sie mit dem Schritt, der wahrscheinlich und günstig umkehrbar ist: kurze Einheiten für die meistgenutzten Lektionen, nicht eine native App."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example the native app or the push reminders.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel die native App oder die Push-Erinnerungen."),
      ]}
    >
      <ComicButton comic={COMICS_D15.B3} art={ART_D15} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision without the data by device safer", "Fünf Wege, eine Entscheidung ohne die Daten nach Gerät sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Split the data by device", "Die Daten nach Gerät aufteilen"), tt("Drop-out and completion are recorded separately for phone, tablet and laptop.", "Abbrüche und Abschluss werden getrennt für Handy, Tablet und Laptop erfasst.")],
          [tt("Test on real phones", "Auf echten Handys testen"), tt("Five to eight learners do tasks on their own phones, some on the move.", "Fünf bis acht Lernende lösen Aufgaben auf ihren eigenen Handys, manche unterwegs.")],
          [tt("Start likely and reversible", "Wahrscheinlich und umkehrbar beginnen"), tt("Short units for the most-used lessons first, behind a switch.", "Zuerst kurze Einheiten für die meistgenutzten Lektionen, hinter einem Schalter.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}
      <Extra id="B3">
        <p>{tt("Premortem: imagine the strategy failed. Typical answers here: the short units did not add up, phone and desktop drifted apart, and we designed for an imagined context. Each answer becomes a check.", "Premortem: Stellen Sie sich vor, die Strategie sei gescheitert. Typische Antworten hier: Die kurzen Einheiten fügten sich nicht zusammen, Handy und Desktop drifteten auseinander, und wir gestalteten für einen vorgestellten Kontext. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: short units behind a switch are a two-way door; two native apps are a one-way door.", "Einbahn- und Zweiwegtüren: Kurze Einheiten hinter einem Schalter sind eine Zweiwegtür; zwei native Apps sind eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
