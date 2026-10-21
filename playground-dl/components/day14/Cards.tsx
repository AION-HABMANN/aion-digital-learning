"use client";

import type { ReactNode } from "react";
import { ClarityChain, ClarityMatrix, DecisionFrame, LoopFig, PlainFig, TestingFig, UsabilityFig, WeighExample } from "@/components/day14/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D14 } from "@/components/day14/comicScenes";
import { COMICS_D14 } from "@/data/day14/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Kim, Raj, Ava; never ClearLearn, so no task is answered here.
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
      scan={tt("Plain language: short sentences, clear everyday terms, no jargon. Language is access, and access is use.", "Schlichte Sprache: kurze Sätze, klare Alltagsbegriffe, kein Jargon. Sprache ist Zugang, und Zugang ist Nutzung.")}
      sources={["iso24495", "ecClear2011", "nielsen1994"]}
      reasoning={[
        tt("Sort a fact as a language hurdle when the words alone make it hard: a very long sentence, a technical term with no explanation, a cryptic error message.", "Ordnen Sie einen Fakt als Sprachhürde ein, wenn allein die Worte es schwer machen: ein sehr langer Satz, ein Fachbegriff ohne Erklärung, eine kryptische Fehlermeldung."),
        tt("Write short sentences (one idea each), everyday words, and the most important thing first.", "Schreiben Sie kurze Sätze (je eine Idee), Alltagswörter und das Wichtigste zuerst."),
        tt("Replace jargon with an everyday word, or explain the term where it first appears; short sentences alone do not make a text plain.", "Ersetzen Sie Jargon durch ein Alltagswort oder erklären Sie den Begriff dort, wo er zuerst vorkommt; kurze Sätze allein machen einen Text nicht schlicht."),
        tt("A good error message says what went wrong and what to do next, in words a learner uses.", "Eine gute Fehlermeldung sagt, was schiefging und was als Nächstes zu tun ist, in Worten, die eine Lernende benutzt."),
        tt("Name the users who are hurt most: new learners, people who read in a second language, people with dyslexia or low attention.", "Nennen Sie die Nutzer, die am meisten leiden: neue Lernende, Menschen, die in einer Zweitsprache lesen, Menschen mit Legasthenie oder geringer Aufmerksamkeit."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A1} art={ART_D14} />
      <PlainFig />
      <DataTable
        caption={tt("Three principles of plain language", "Drei Prinzipien schlichter Sprache")}
        head={[tt("Principle", "Prinzip"), tt("Instead of …", "Statt …"), tt("Write …", "Schreiben Sie …")]}
        rows={[
          [tt("Short sentences", "Kurze Sätze"), tt("One sentence of 52 words", "Ein Satz mit 52 Wörtern"), tt("Three sentences of about 15 words", "Drei Sätze mit etwa 15 Wörtern")],
          [tt("Clear terms", "Klare Begriffe"), tt("“asynchronous modality”", "„asynchrone Modalität“"), tt("“learn when it suits you”", "„lernen, wann es passt“")],
          [tt("No jargon in messages", "Kein Jargon in Meldungen"), tt("“Error 4012: invalid payload”", "„Fehler 4012: ungültige Payload“"), tt("“Please add a file, then press Send.”", "„Bitte fügen Sie eine Datei hinzu und drücken Sie dann Senden.“")],
        ]}
      />
      {CA("LearnLoop and Kim are made up for this example. The principles follow the international plain-language standard (ISO 24495-1) and the European Commission's guide to writing clearly.", "LearnLoop und Kim sind für dieses Beispiel erfunden. Die Prinzipien folgen dem internationalen Standard für schlichte Sprache (ISO 24495-1) und dem Leitfaden der Europäischen Kommission zum klaren Schreiben.")}
      <Extra id="A1">
        <p>{tt("Plain language is not the same as simple language (Leichte Sprache), which is a stricter German set of rules for people with learning difficulties. Plain language keeps the content and writes it so that the intended readers can find, understand and use it.", "Schlichte Sprache ist nicht dasselbe wie Leichte Sprache, ein strengeres deutsches Regelwerk für Menschen mit Lernschwierigkeiten. Schlichte Sprache behält den Inhalt und schreibt ihn so, dass die gemeinten Leser ihn finden, verstehen und nutzen können.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("An intuitive environment needs no explanation: a clear structure and navigation, less complexity, and three usability principles: efficiency, error prevention and consistency.", "Eine intuitive Umgebung braucht keine Erklärung: eine klare Struktur und Navigation, weniger Komplexität und drei Usability-Prinzipien: Effizienz, Fehlervermeidung und Konsistenz.")}
      sources={["nielsen1994", "krug2014", "shneiderman2016"]}
      reasoning={[
        tt("Sort a fact as a structure hurdle when the learner does not know where to go: a menu with too many entries, vague labels, the same thing in several places.", "Ordnen Sie einen Fakt als Strukturhürde ein, wenn die Lernende nicht weiß, wohin sie gehen soll: ein Menü mit zu vielen Einträgen, vage Beschriftungen, dieselbe Sache an mehreren Orten."),
        tt("Sort a fact as a usability hurdle when it breaks efficiency (too many steps for a common task), error prevention (a mistake the system could have stopped) or consistency (one action under different names).", "Ordnen Sie einen Fakt als Usability-Hürde ein, wenn er Effizienz (zu viele Schritte für eine häufige Aufgabe), Fehlervermeidung (ein Fehler, den das System hätte stoppen können) oder Konsistenz (eine Aktion unter verschiedenen Namen) bricht."),
        tt("Give each thing one place and one name, keep a menu to about six entries, and show learners where they are.", "Geben Sie jeder Sache einen Ort und einen Namen, halten Sie ein Menü bei etwa sechs Einträgen und zeigen Sie Lernenden, wo sie sind."),
        tt("Reduce complexity by showing only what is needed now and putting the rest one click down.", "Verringern Sie Komplexität, indem Sie nur zeigen, was jetzt gebraucht wird, und den Rest einen Klick tiefer legen."),
        tt("Do not answer a confusing platform with a manual or a help centre: intuitive means understandable without explanation.", "Beantworten Sie eine verwirrende Plattform nicht mit einem Handbuch oder Hilfecenter: Intuitiv heißt verständlich ohne Erklärung."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A2} art={ART_D14} />
      <UsabilityFig />
      <DataTable
        caption={tt("Three usability principles, a typical failure and a fix", "Drei Usability-Prinzipien, ein typischer Fehler und eine Korrektur")}
        head={[tt("Principle", "Prinzip"), tt("A typical failure", "Ein typischer Fehler"), tt("A fix", "Eine Korrektur")]}
        rows={[
          [tt("Efficiency", "Effizienz"), tt("Five clicks to mark a lesson done", "Fünf Klicks, um eine Lektion zu erledigen"), tt("One button on the lesson page", "Ein Button auf der Lektionsseite")],
          [tt("Error prevention", "Fehlervermeidung"), tt("Send works with no file; the error comes later", "Senden funktioniert ohne Datei; der Fehler kommt später"), tt("Send stays off until a file is added", "Senden bleibt aus, bis eine Datei hinzugefügt ist")],
          [tt("Consistency", "Konsistenz"), tt("“Save”, “Submit” and “Apply” for one action", "„Speichern“, „Einreichen“ und „Anwenden“ für eine Aktion"), tt("One word, everywhere", "Ein Wort, überall")],
        ]}
      />
      {CA("LearnLoop and Raj are made up for this example. The three principles are among the usability heuristics of Nielsen (1994).", "LearnLoop und Raj sind für dieses Beispiel erfunden. Die drei Prinzipien gehören zu den Usability-Heuristiken von Nielsen (1994).")}
      <Extra id="A2">
        <p>{tt("Krug's “trunk test” asks whether a visitor dropped on any page can say where they are, which sections exist and how to search. A platform that fails it is not intuitive, however good its content.", "Krugs „Trunk-Test“ fragt, ob ein Besucher, der auf irgendeine Seite gesetzt wird, sagen kann, wo er ist, welche Bereiche es gibt und wie man sucht. Eine Plattform, die ihn nicht besteht, ist nicht intuitiv, so gut ihr Inhalt auch ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Test with different user groups: watch real learners do real tasks, listen, and note where they stop. A usability test and a comprehension check show whether people understand, not whether they like it.", "Testen Sie mit verschiedenen Nutzergruppen: Sehen Sie echten Lernenden bei echten Aufgaben zu, hören Sie zu und halten Sie fest, wo sie hängenbleiben. Ein Usability-Test und ein Verständnis-Check zeigen, ob Menschen verstehen, nicht ob es ihnen gefällt.")}
      sources={["nielsen2000", "krug2014", "gibbons2018"]}
      reasoning={[
        tt("Choose a test method that watches behaviour: a usability test (five to eight learners do set tasks while someone watches), a five-second test (what was the screen about?), a comprehension check (explain the text back).", "Wählen Sie eine Testmethode, die Verhalten beobachtet: einen Usability-Test (fünf bis acht Lernende lösen vorgegebene Aufgaben, während jemand zuschaut), einen Fünf-Sekunden-Test (worum ging es auf dem Bildschirm?), einen Verständnis-Check (den Text zurückerklären)."),
        tt("Test with different user groups: new learners, people who read in a second language, people with impairments. Different people stop in different places.", "Testen Sie mit verschiedenen Nutzergruppen: neue Lernende, Menschen, die in einer Zweitsprache lesen, Menschen mit Beeinträchtigungen. Verschiedene Menschen bleiben an verschiedenen Stellen hängen."),
        tt("Do not rely on opinion: asking managers or asking “do you like it?” does not show whether people understand.", "Verlassen Sie sich nicht auf Meinung: Führungskräfte zu fragen oder „Gefällt es Ihnen?“ zeigt nicht, ob Menschen verstehen."),
        tt("Do not rely on page views alone: they show use, not understanding.", "Verlassen Sie sich nicht allein auf Seitenaufrufe: Sie zeigen Nutzung, nicht Verständnis."),
        tt("Note each comprehension barrier with where it happened, then fix the most common one first.", "Halten Sie jede Verständnisbarriere fest, mit dem Ort, an dem sie auftrat, und beheben Sie dann die häufigste zuerst."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A3} art={ART_D14} />
      <TestingFig />
      <DataTable
        caption={tt("Three test methods and what each shows", "Drei Testmethoden und was jede zeigt")}
        head={[tt("Method", "Methode"), tt("How it works", "Wie sie funktioniert"), tt("What it shows", "Was sie zeigt")]}
        rows={[
          [tt("Usability test", "Usability-Test"), tt("Five to eight learners do set tasks while someone watches and notes where they stop.", "Fünf bis acht Lernende lösen vorgegebene Aufgaben, während jemand zuschaut und festhält, wo sie hängenbleiben."), tt("Where real users get stuck.", "Wo echte Nutzer hängenbleiben.")],
          [tt("Five-second test", "Fünf-Sekunden-Test"), tt("A screen is shown for five seconds, then people say what it was about.", "Ein Bildschirm wird fünf Sekunden gezeigt, dann sagen Menschen, worum es ging."), tt("Whether a screen is understood at a glance.", "Ob ein Bildschirm auf einen Blick verstanden wird.")],
          [tt("Comprehension check", "Verständnis-Check"), tt("Readers explain a text back in their own words.", "Leser erklären einen Text mit eigenen Worten zurück."), tt("Whether the text is understood.", "Ob der Text verstanden wird.")],
        ]}
      />
      {CA("LearnLoop and Ava are made up for this example. The rule of thumb of five users for a usability test is Nielsen's; it applies to finding the main hurdles, not to measuring.", "LearnLoop und Ava sind für dieses Beispiel erfunden. Die Faustregel von fünf Nutzern für einen Usability-Test stammt von Nielsen; sie gilt für das Finden der Haupthürden, nicht für das Messen.")}
      <Extra id="A3">
        <p>{tt("Think-aloud testing asks the learner to say what they are thinking while they work. It is a way of watching that shows the reasons behind a stop, not only the stop.", "Beim Lauten Denken wird die Lernende gebeten, zu sagen, was sie denkt, während sie arbeitet. Es ist eine Art des Beobachtens, die die Gründe hinter einem Halt zeigt, nicht nur den Halt.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Optimising inclusive UX is a loop: change, test, measure, adjust, and repeat. Iterative improvement and continuous evaluation mean that it never stops.", "Inklusive UX zu optimieren ist ein Kreislauf: ändern, testen, messen, anpassen und wiederholen. Iterative Verbesserung und kontinuierliche Bewertung heißen, dass er nie endet.")}
      sources={["nielsen2000", "gibbons2018"]}
      reasoning={[
        tt("Improve in small steps with a check after each one.", "Verbessern Sie in kleinen Schritten, mit einer Prüfung nach jedem."),
        tt("Use data to adjust: drop-out, support questions and test results show what to fix next.", "Nutzen Sie Daten zum Anpassen: Abbrüche, Supportfragen und Testergebnisse zeigen, was als Nächstes zu beheben ist."),
        tt("Keep evaluating: a platform changes, and new text and screens bring new hurdles.", "Bewerten Sie fortlaufend: Eine Plattform verändert sich, und neuer Text und neue Bildschirme bringen neue Hürden."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A4} art={ART_D14} />
      <LoopFig />
      {CA("LearnLoop is the example company.", "LearnLoop ist das Beispielunternehmen.")}
      <Extra id="A4">
        <p>{tt("Data tells you that something is wrong, and a test tells you why. Use both: a rise in first-week drop-out on one screen says where to look, and watching learners on that screen says what to change.", "Daten sagen Ihnen, dass etwas nicht stimmt, und ein Test sagt Ihnen, warum. Nutzen Sie beides: Ein Anstieg der Abbrüche in der ersten Woche auf einem Bildschirm sagt, wo Sie hinschauen sollen, und Lernenden auf diesem Bildschirm zuzusehen sagt, was zu ändern ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how much it helps learners understand and keep going, how much work it takes and what could go wrong. Simplify first, add functions later.", "Bewerten Sie eine Maßnahme danach, wie sehr sie Lernenden hilft, zu verstehen und weiterzumachen, wie viel Arbeit sie macht und was schiefgehen kann. Zuerst vereinfachen, Funktionen später ergänzen.")}
      sources={["gibbons2018", "nielsen1994"]}
      reasoning={[
        tt("Rate effort by how much work and how many people it needs. The plan prints no price, so Low, Mid or High is your judgement, with a reason.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und wie viele Personen er braucht. Der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund."),
        tt("Rate impact by how much it helps learners understand and keep going: a measure that goes to the cause (words, structure) outweighs one that adds something new.", "Bewerten Sie die Wirkung danach, wie sehr es Lernenden hilft, zu verstehen und weiterzumachen: Eine Maßnahme, die an die Ursache geht (Worte, Struktur), wiegt schwerer als eine, die etwas Neues hinzufügt."),
        tt("Rate risk by what could go wrong: added complexity, removing information some learners need, a new menu that disturbs regular users at first.", "Bewerten Sie das Risiko danach, was schiefgehen kann: zusätzliche Komplexität, das Entfernen von Information, die manche Lernende brauchen, ein neues Menü, das Stammnutzer zunächst stört."),
        tt("Justify the order with comprehensibility, then usage, then success: say how your first measure helps learners understand.", "Begründen Sie die Reihenfolge mit Verständlichkeit, dann Nutzung, dann Erfolg: Sagen Sie, wie Ihre erste Maßnahme Lernenden beim Verstehen hilft."),
        tt("Say what you do not know, for example on which screen most learners stop, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel auf welchem Bildschirm die meisten Lernenden aufhören, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A5} art={ART_D14} />
      <WeighExample />
      {CA("LearnLoop and its reasons are made up for this example. The task case is in the task.", "LearnLoop und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Complexity is UX's greatest enemy. A comprehensibility strategy finds the hurdle, simplifies it, tests with real users and adjusts, because comprehensibility leads to usage and usage to success.", "Komplexität ist der größte Feind der UX. Eine Verständlichkeitsstrategie findet die Hürde, vereinfacht sie, testet mit echten Nutzern und passt an, weil Verständlichkeit zu Nutzung führt und Nutzung zu Erfolg.")}
      sources={["iso24495", "nielsen2000", "krug2014", "nielsen1994"]}
      reasoning={[
        tt("Choose a strategy that goes in steps: plain language and a clear structure first, then test and adjust; reject “everything at once” (it may remove what some learners need) and “add a help centre” (it explains the complexity instead of reducing it).", "Wählen Sie eine Strategie, die in Schritten geht: zuerst schlichte Sprache und eine klare Struktur, dann testen und anpassen; verwerfen Sie „alles auf einmal“ (es kann entfernen, was manche Lernende brauchen) und „ein Hilfecenter ergänzen“ (es erklärt die Komplexität, statt sie zu verringern)."),
        tt("Optimise the information architecture: one menu of about six entries, each course in one place, a path above every page, a “continue where you stopped” card, one label for one action.", "Optimieren Sie die Informationsarchitektur: ein Menü mit etwa sechs Einträgen, jeder Kurs an einem Ort, ein Pfad über jeder Seite, eine Karte „Dort weitermachen, wo Sie aufgehört haben“, eine Beschriftung für eine Aktion."),
        tt("Test before, during and after a change: a card sort before, a test of the draft during, and drop-out and support questions after.", "Testen Sie vor, während und nach einer Änderung: ein Card Sorting vorher, einen Test des Entwurfs währenddessen und Abbrüche und Supportfragen danach."),
        tt("Keep the complexity the subject needs: separate it from the complexity of the interface, which should go.", "Behalten Sie die Komplexität, die das Thema braucht: Trennen Sie sie von der Komplexität der Oberfläche, die weg sollte."),
        tt("Use data and tests together: data tells you where, a test tells you why.", "Nutzen Sie Daten und Tests zusammen: Daten sagen, wo, ein Test sagt, warum."),
      ]}
    >
      <ComicButton comic={COMICS_D14.B1} art={ART_D14} />
      <ClarityChain />
      <DataTable
        caption={tt("The test for each link of the chain", "Der Test für jedes Glied der Kette")}
        head={[tt("Link", "Glied"), tt("The test", "Der Test"), tt("What goes wrong without it", "Was ohne ihn schiefgeht")]}
        rows={[
          [tt("Find the hurdle", "Die Hürde finden"), tt("Can you say where learners stop, from watching or data?", "Können Sie sagen, wo Lernende aufhören, aus Beobachtung oder Daten?"), tt("You fix what you can see, not what hurts.", "Sie beheben, was Sie sehen, nicht, was wehtut.")],
          [tt("Simplify", "Vereinfachen"), tt("Is each thing in one place with one name, in plain words?", "Ist jede Sache an einem Ort mit einem Namen, in schlichten Worten?"), tt("Complexity stays, or necessary content goes.", "Komplexität bleibt, oder nötiger Inhalt geht.")],
          [tt("Test with users", "Mit Nutzern testen"), tt("Did different learners understand, not just like it?", "Haben verschiedene Lernende verstanden, nicht nur gemocht?"), tt("You are guessing.", "Sie raten.")],
          [tt("Adjust and repeat", "Anpassen und wiederholen"), tt("Is there a date for the next check?", "Gibt es ein Datum für die nächste Prüfung?"), tt("The platform drifts back to complexity.", "Die Plattform driftet zur Komplexität zurück.")],
        ]}
      />
      {CA("The chain follows the plan's coaching: complexity is UX's greatest enemy, simple systems are more successful, usability determines usage. LearnLoop is the example company.", "Die Kette folgt dem Coaching des Plans: Komplexität ist der größte Feind der UX, einfache Systeme sind erfolgreicher, Usability bestimmt die Nutzung. LearnLoop ist das Beispielunternehmen.")}
      <Extra id="B1">
        <p>{tt("A card sort asks people to group labelled cards, which shows how learners expect things to be organised. It is a cheap way to design a menu before it is built.", "Ein Card Sorting bittet Menschen, beschriftete Karten zu gruppieren, was zeigt, wie Lernende erwarten, dass Dinge geordnet sind. Es ist ein günstiger Weg, ein Menü zu entwerfen, bevor es gebaut wird.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Simplicity competes with information content, and a standard with flexibility. Keep the complexity the subject needs and remove the complexity the interface adds.", "Einfachheit konkurriert mit Informationsgehalt und ein Standard mit Flexibilität. Behalten Sie die Komplexität, die das Thema braucht, und entfernen Sie die Komplexität, die die Oberfläche hinzufügt.")}
      sources={["nielsen1994", "krug2014", "klein2007"]}
      reasoning={[
        tt("Name both poles of each conflict: too much simplification (content deleted, experts leave) and too little (learners still lost). A plan that names one pole has not weighed the conflict.", "Nennen Sie beide Pole jedes Konflikts: zu viel Vereinfachung (Inhalt gelöscht, Experten gehen) und zu wenig (Lernende weiter verloren). Ein Plan, der einen Pol nennt, hat den Konflikt nicht abgewogen."),
        tt("Separate the complexity of the subject (keep it) from the complexity of the interface (remove it): a demanding course can sit behind a clear menu.", "Trennen Sie die Komplexität des Themas (behalten) von der Komplexität der Oberfläche (entfernen): Ein anspruchsvoller Kurs kann hinter einem klaren Menü stehen."),
        tt("Use layers: the main points in plain words first, the detail one click down.", "Nutzen Sie Ebenen: die Hauptpunkte zuerst in schlichten Worten, das Detail einen Klick tiefer."),
        tt("Keep a standard (one name for one action, one place for one thing) and allow flexibility where learners differ, such as a choice of text size.", "Behalten Sie einen Standard (ein Name für eine Aktion, ein Ort für eine Sache) und erlauben Sie Flexibilität dort, wo Lernende sich unterscheiden, etwa eine Wahl der Textgröße."),
      ]}
    >
      <ComicButton comic={COMICS_D14.B2} art={ART_D14} />
      <ClarityMatrix />
      <DataTable
        caption={tt("Two conflicts and a rule for deciding each", "Zwei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Simplicity against information content", "Einfachheit gegen Informationsgehalt"), tt("A very simple screen", "Ein sehr einfacher Bildschirm"), tt("All the detail a subject needs", "Alles Detail, das ein Thema braucht"), tt("Plain main points first, detail one click down.", "Schlichte Hauptpunkte zuerst, Detail einen Klick tiefer.")],
          [tt("Standardisation against flexibility", "Standardisierung gegen Flexibilität"), tt("The same pattern everywhere", "Dasselbe Muster überall"), tt("Choices for different learners", "Wahlmöglichkeiten für verschiedene Lernende"), tt("Standardise names and places; allow choice of presentation.", "Namen und Orte standardisieren; Wahl der Darstellung erlauben.")],
        ]}
      />
      {CA("LearnLoop and its six screens are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sechs Bildschirme sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}
      <Extra id="B2">
        <p>{tt("Progressive disclosure shows only what is needed now and reveals the rest on request. It is the standard way to keep an interface simple without throwing information away.", "Progressive Offenlegung zeigt nur, was jetzt gebraucht wird, und enthüllt den Rest auf Wunsch. Es ist der übliche Weg, eine Oberfläche einfach zu halten, ohne Information wegzuwerfen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you do not know where learners stop, fix the most likely hurdle first, test with a few learners, write a figure you can watch into the plan, and say what you give up.", "Wenn Sie nicht wissen, wo Lernende aufhören, beheben Sie zuerst die wahrscheinlichste Hürde, testen Sie mit wenigen Lernenden, schreiben Sie eine beobachtbare Zahl in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "nielsen2000"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “first-week drop-out has not fallen from 40% to below 35% by the end of month 3”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „die Abbrüche in der ersten Woche sind bis Ende von Monat 3 nicht von 40 % auf unter 35 % gefallen“."),
        tt("Start where the hurdle is most likely and cheapest to fix (the words on the first screens), and test with a few learners to find out whether you were right.", "Beginnen Sie dort, wo die Hürde am wahrscheinlichsten und am günstigsten zu beheben ist (die Worte auf den ersten Bildschirmen), und testen Sie mit wenigen Lernenden, ob Sie recht hatten."),
        tt("Guard against both risks: test with experts as well as newcomers, so that you do not simplify away what some need.", "Sichern Sie sich gegen beide Risiken ab: Testen Sie mit Experten ebenso wie mit Neulingen, damit Sie nicht wegvereinfachen, was manche brauchen."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example new functions or a cut in content.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel neue Funktionen oder eine Kürzung des Inhalts."),
      ]}
    >
      <ComicButton comic={COMICS_D14.B3} art={ART_D14} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision without knowing where learners stop safer", "Fünf Wege, eine Entscheidung ohne Wissen, wo Lernende aufhören, sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Test with a few learners", "Mit wenigen Lernenden testen"), tt("Five to eight, mixed, do set tasks while someone watches.", "Fünf bis acht, gemischt, lösen vorgegebene Aufgaben, während jemand zuschaut.")],
          [tt("Start with the likely and cheap", "Mit dem Wahrscheinlichen und Günstigen beginnen"), tt("Plain words on the first screens, before a rebuild.", "Schlichte Worte auf den ersten Bildschirmen, vor einem Umbau.")],
          [tt("Set a figure and a date", "Eine Zahl und ein Datum festlegen"), tt("The drop-out you expect, and the month you will look.", "Die Abbrüche, die Sie erwarten, und der Monat, in dem Sie nachsehen.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}
      <Extra id="B3">
        <p>{tt("Premortem: imagine the strategy failed. Typical answers here: we removed content that experts needed, learners still did not understand, and we tested opinion and not understanding. Each answer becomes a check.", "Premortem: Stellen Sie sich vor, die Strategie sei gescheitert. Typische Antworten hier: Wir entfernten Inhalt, den Experten brauchten, Lernende verstanden weiter nicht, und wir testeten Meinung statt Verständnis. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: a rewritten text can be rewritten back, a two-way door; deleting half of the content is a one-way door.", "Einbahn- und Zweiwegtüren: Ein umgeschriebener Text lässt sich zurückschreiben, eine Zweiwegtür; die Hälfte des Inhalts zu löschen ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
