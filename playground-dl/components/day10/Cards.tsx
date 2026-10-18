"use client";

import type { ReactNode } from "react";
import { A11yPhoneFig, DecisionFrame, DensityMatrix, DevicesFig, FeedbackFig, ProgressFig, SteerChain, WeighExample } from "@/components/day10/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D10 } from "@/components/day10/comicScenes";
import { COMICS_D10 } from "@/data/day10/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Kim, Raj, Nia, Jo; never TrackLearn, so no task is answered here.
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
      scan={tt("Feedback tells a learner that an action counted and what it means. Direct feedback answers at once; indirect feedback shows progress. Both steer motivation.", "Feedback sagt einer Lernenden, dass eine Aktion zählte und was sie bedeutet. Direktes Feedback antwortet sofort; indirektes Feedback zeigt Fortschritt. Beides steuert die Motivation.")}
      sources={["hattie2007", "nielsen1993rt", "shneiderman2016"]}
      reasoning={[
        tt("Sort a fact as missing feedback when the learner does something and the platform does not answer, or answers with a bare mark that says nothing.", "Ordnen Sie einen Fakt als fehlendes Feedback ein, wenn die Lernende etwas tut und die Plattform nicht antwortet oder mit einem nackten Zeichen antwortet, das nichts sagt."),
        tt("Good feedback does three things: it says the action counted, says why a result is what it is, and says what to do next.", "Gutes Feedback tut drei Dinge: Es sagt, dass die Aktion zählte, warum ein Ergebnis so ist, und was als Nächstes zu tun ist."),
        tt("Use direct feedback (a result, a tick) for single actions, and indirect feedback (visible progress, a milestone note) for the course as a whole.", "Nutzen Sie direktes Feedback (ein Ergebnis, ein Haken) für einzelne Aktionen und indirektes Feedback (sichtbaren Fortschritt, einen Meilensteinhinweis) für den Kurs als Ganzes."),
        tt("Explain how a fact affects motivation by saying what the learner feels and what they stop doing.", "Erklären Sie, wie ein Fakt die Motivation beeinflusst, indem Sie sagen, was die Lernende fühlt und was sie nicht mehr tut."),
        tt("Give feedback where it counts (a finished task, a mistake, a milestone), and keep the rest quiet; too much is overload.", "Geben Sie Feedback dort, wo es zählt (eine beendete Aufgabe, ein Fehler, ein Meilenstein), und halten Sie den Rest ruhig; zu viel ist Überlastung."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A1} art={ART_D10} />
      <FeedbackFig />
      <DataTable
        caption={tt("Two kinds of feedback and what each does", "Zwei Arten von Feedback und was jede bewirkt")}
        head={[tt("Kind", "Art"), tt("Example", "Beispiel"), tt("What it does for the learner", "Was es für die Lernende bewirkt")]}
        rows={[
          [tt("Direct", "Direkt"), tt("Correct or incorrect, a tick when a task is saved, an explained result.", "Richtig oder falsch, ein Haken beim Speichern einer Aufgabe, ein erklärtes Ergebnis."), tt("Says at once whether the action counted and why.", "Sagt sofort, ob die Aktion zählte und warum.")],
          [tt("Indirect", "Indirekt"), tt("A progress bar, a status per lesson, a note at a milestone.", "Ein Fortschrittsbalken, ein Status je Lektion, ein Hinweis an einem Meilenstein."), tt("Shows how the work adds up over time.", "Zeigt, wie sich die Arbeit über die Zeit summiert.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Kim are made up for this example. The response-time limits behind “at once” are Nielsen's (1993); the three questions of good feedback follow Hattie and Timperley (2007).", "LearnLoop und Kim sind für dieses Beispiel erfunden. Die Antwortzeitgrenzen hinter „sofort“ stammen von Nielsen (1993); die drei Fragen guten Feedbacks folgen Hattie und Timperley (2007).")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Feedback is one of the strongest influences on learning when it tells the learner where they are going, how they are doing and what to do next (Hattie and Timperley 2007). Shneiderman's golden rules ask for informative feedback on every action and a clear closure at the end of a task (Shneiderman et al. 2016).", "Feedback gehört zu den stärksten Einflüssen auf das Lernen, wenn es der Lernenden sagt, wohin sie geht, wie sie vorankommt und was sie als Nächstes tun soll (Hattie und Timperley 2007). Shneidermans goldene Regeln verlangen informatives Feedback auf jede Aktion und einen klaren Abschluss am Ende einer Aufgabe (Shneiderman et al. 2016).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A progress display answers “how far along am I?”. It raises motivation and completion, if it is honest, clear and sized so that a learner can take it in.", "Eine Fortschrittsanzeige beantwortet „Wie weit bin ich?“. Sie steigert Motivation und Abschluss, wenn sie ehrlich und klar ist und so groß, dass eine Lernende sie aufnehmen kann.")}
      sources={["amabile2011", "kivetz2006", "nunes2006", "nielsen1994"]}
      reasoning={[
        tt("Sort a fact as unclear progress when the learner cannot tell how far along they are, which lessons are done, or what a number measures.", "Ordnen Sie einen Fakt als unklaren Fortschritt ein, wenn die Lernende nicht sagen kann, wie weit sie ist, welche Lektionen erledigt sind oder was eine Zahl misst."),
        tt("Base a progress display on something real (lessons finished out of lessons in the course), label it (“3 of 8”) and show the status of each lesson.", "Stützen Sie eine Fortschrittsanzeige auf etwas Reales (erledigte Lektionen von den Lektionen im Kurs), beschriften Sie sie („3 von 8“) und zeigen Sie den Status jeder Lektion."),
        tt("A display that does not say what it measures (a bare level), jumps ahead and then crawls, or ranks learners against each other can mislead or demotivate: name the risk when you propose one.", "Eine Anzeige, die nicht sagt, was sie misst (ein nacktes Level), vorspringt und dann kriecht oder Lernende gegeneinander reiht, kann täuschen oder demotivieren: Nennen Sie das Risiko, wenn Sie eine vorschlagen."),
        tt("For a long course show a small goal first (the first module) as well as the whole, so that it does not overwhelm.", "Zeigen Sie bei einem langen Kurs zuerst ein kleines Ziel (das erste Modul) und auch das Ganze, damit es nicht überfordert."),
        tt("Transparency raises motivation, and motivation raises completion: that is the chain to argue in a priority order.", "Transparenz steigert die Motivation, und Motivation steigert den Abschluss: Das ist die Kette, die Sie in einer Prioritätsreihenfolge anführen."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A2} art={ART_D10} />
      <ProgressFig />
      <DataTable
        caption={tt("Four progress elements, and the risk of each", "Vier Fortschrittselemente und das Risiko jedes einzelnen")}
        head={[tt("Element", "Element"), tt("It answers", "Es beantwortet"), tt("Risk", "Risiko")]}
        rows={[
          [tt("A progress bar", "Ein Fortschrittsbalken"), tt("How far along am I in this course?", "Wie weit bin ich in diesem Kurs?"), tt("Misleading if it counts clicks and not lessons.", "Irreführend, wenn er Klicks statt Lektionen zählt.")],
          [tt("A status per lesson", "Ein Status je Lektion"), tt("What is done, what is open?", "Was ist erledigt, was ist offen?"), tt("Few; keep to three states.", "Wenige; bei drei Zuständen bleiben.")],
          [tt("A level", "Ein Level"), tt("How much have I achieved overall?", "Wie viel habe ich insgesamt erreicht?"), tt("Meaningless if it does not say what it measures.", "Bedeutungslos, wenn es nicht sagt, was es misst.")],
          [tt("A time estimate", "Eine Zeitschätzung"), tt("How much is left?", "Wie viel bleibt?"), tt("Discouraging if the course looks very long; show a first small goal too.", "Entmutigend, wenn der Kurs sehr lang aussieht; zeigen Sie auch ein erstes kleines Ziel.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Raj are made up for this example. Research on the effect of visible progress is mixed in detail, so the card states a direction, not a figure.", "LearnLoop und Raj sind für dieses Beispiel erfunden. Die Forschung zur Wirkung sichtbaren Fortschritts ist im Detail uneinheitlich, die Karte nennt also eine Richtung, keine Zahl.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("The progress principle: Amabile and Kramer (2011) report that a sense of making progress in meaningful work is a strong driver of motivation. Studies of goal gradient and endowed progress (Kivetz, Urminsky and Zheng 2006; Nunes and Drèze 2006) suggest that people try harder as a goal gets closer, and that a head start helps, though a head start that is not real is the cheat shown in the picture. Day 11 treats gamification in depth.", "Das Fortschrittsprinzip: Amabile und Kramer (2011) berichten, dass das Gefühl, bei sinnvoller Arbeit voranzukommen, ein starker Motivationstreiber ist. Studien zu Zielgradient und geschenktem Fortschritt (Kivetz, Urminsky und Zheng 2006; Nunes und Drèze 2006) legen nahe, dass Menschen sich mehr anstrengen, je näher ein Ziel kommt, und dass ein Vorsprung hilft, wobei ein Vorsprung, der nicht echt ist, der Betrug aus dem Bild ist. Tag 11 behandelt Gamification ausführlich.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Responsive design adapts a platform to the device and context, and prioritises content by device. For a platform used mostly on phones it is a prerequisite.", "Responsive Design passt eine Plattform an Gerät und Kontext an und priorisiert Inhalt nach Gerät. Für eine Plattform, die überwiegend auf Handys genutzt wird, ist es eine Voraussetzung.")}
      sources={["wroblewski2011", "fitts1954", "wcag22"]}
      reasoning={[
        tt("Sort a fact as poor use on a phone when the layout was not adapted: text runs off the edge, the learner must scroll sideways, or a button is tiny or out of thumb reach.", "Ordnen Sie einen Fakt als schlechte Nutzung auf dem Handy ein, wenn das Layout nicht angepasst wurde: Text läuft über den Rand, die Lernende muss seitlich scrollen oder ein Button ist winzig oder außer Daumenreichweite."),
        tt("Prioritise content by device: what is the same everywhere (progress, the lesson), what comes first on a phone (continue, a short question), what only fits a large screen (notes, a full catalogue).", "Priorisieren Sie Inhalt nach Gerät: was überall gleich ist (Fortschritt, die Lektion), was auf dem Handy zuerst kommt (Weitermachen, eine kurze Frage), was nur auf einen großen Bildschirm passt (Notizen, ein ganzer Katalog)."),
        tt("Make touch targets large (at least 44 px is a good aim; WCAG 2.2 requires 24 px at Level AA) and put the main action where the thumb is.", "Machen Sie Touch-Ziele groß (mindestens 44 px sind ein gutes Ziel; WCAG 2.2 verlangt 24 px auf Stufe AA) und legen Sie die Hauptaktion dorthin, wo der Daumen ist."),
        tt("Let text reflow to the screen width so that nobody scrolls sideways (WCAG 1.4.10).", "Lassen Sie Text auf die Bildschirmbreite umbrechen, damit niemand seitlich scrollt (WCAG 1.4.10)."),
        tt("For a platform with high mobile use, rate a mobile measure as a prerequisite: a progress display or feedback that does not work on a phone reaches nobody.", "Bewerten Sie bei einer Plattform mit hoher Mobilnutzung eine Mobilmaßnahme als Voraussetzung: Eine Fortschrittsanzeige oder ein Feedback, das auf dem Handy nicht funktioniert, erreicht niemanden."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A3} art={ART_D10} />
      <DevicesFig />
      <DataTable
        caption={tt("What changes by device, and what does not", "Was sich je Gerät ändert und was nicht")}
        head={[tt("Device and context", "Gerät und Kontext"), tt("Typical use", "Typische Nutzung"), tt("What to put first", "Was zuerst steht")]}
        rows={[
          [tt("Phone", "Handy"), tt("A few minutes, on the move, one thumb.", "Wenige Minuten, unterwegs, ein Daumen."), tt("Continue, progress, a short question; large targets.", "Weitermachen, Fortschritt, eine kurze Frage; große Ziele.")],
          [tt("Tablet", "Tablet"), tt("Sitting down, medium time.", "Sitzend, mittlere Zeit."), tt("The lesson with the lesson list beside it.", "Die Lektion mit der Lektionsliste daneben.")],
          [tt("Desktop", "Desktop"), tt("A longer session at a desk.", "Eine längere Sitzung am Schreibtisch."), tt("The lesson, notes beside it, the full catalogue.", "Die Lektion, Notizen daneben, der ganze Katalog.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Nia are made up for this example. The target-size figures are those of WCAG 2.2; the 44 px aim is a common guideline, not a legal limit.", "LearnLoop und Nia sind für dieses Beispiel erfunden. Die Zielgrößen sind die von WCAG 2.2; das Ziel von 44 px ist eine verbreitete Richtlinie, kein gesetzlicher Grenzwert.")}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Mobile first is the practice of designing for the small screen first and adding to it for larger ones, which forces the team to decide what matters most (Wroblewski 2011). Fitts's law explains why large targets near the thumb are quicker to hit (Fitts 1954).", "Mobile First ist die Praxis, zuerst für den kleinen Bildschirm zu gestalten und für größere zu ergänzen, was das Team zwingt zu entscheiden, was am wichtigsten ist (Wroblewski 2011). Das Fittssche Gesetz erklärt, warum große Ziele nahe am Daumen schneller zu treffen sind (Fitts 1954).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("In the responsive context accessibility means targets large enough to hit, contrast and text that can be read, and words as well as colour. It means reach: the same design works for more learners.", "Im responsiven Kontext bedeutet Barrierefreiheit Ziele, die groß genug zum Treffen sind, Kontrast und lesbaren Text und Worte zusätzlich zu Farbe. Sie bedeutet Reichweite: Dasselbe Design funktioniert für mehr Lernende.")}
      sources={["wcag22", "castUdl"]}
      reasoning={[
        tt("Operability: targets large enough to hit with a thumb or a shaky hand.", "Bedienbarkeit: Ziele, die groß genug sind, um sie mit einem Daumen oder einer zittrigen Hand zu treffen."),
        tt("Legibility: contrast of at least 4.5 : 1 and text that reflows to the screen.", "Lesbarkeit: Kontrast von mindestens 4,5 : 1 und Text, der auf den Bildschirm umbricht."),
        tt("Do not show status by colour alone: add a word.", "Zeigen Sie Status nicht allein durch Farbe: Ergänzen Sie ein Wort."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A4} art={ART_D10} />
      <A11yPhoneFig />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Jo are made up for this example. The criteria come from WCAG 2.2 (Day 7).", "LearnLoop und Jo sind für dieses Beispiel erfunden. Die Kriterien stammen aus WCAG 2.2 (Tag 7).")}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("This is the link to inclusive design from Day 7: a measure built for a learner with a limit usually helps every learner in a hurry or in bad light. Day 13 treats the WCAG standards in practice.", "Das ist die Verbindung zum inklusiven Design von Tag 7: Eine Maßnahme, die für eine Lernende mit einer Einschränkung gebaut wurde, hilft meist jeder Lernenden in Eile oder bei schlechtem Licht. Tag 13 behandelt die WCAG-Standards in der Praxis.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by what it does for motivation and finishing, what could go wrong and how much work it takes. Transparency and explained feedback before decoration.", "Bewerten Sie eine Maßnahme danach, was sie für Motivation und Abschluss bewirkt, was schiefgehen kann und wie viel Arbeit sie macht. Transparenz und erklärtes Feedback vor Dekoration.")}
      sources={["gibbons2018", "hattie2007"]}
      reasoning={[
        tt("Rate effort by how much work and time the measure takes before the release: a few pages or settings changed is Low, a part of the platform rebuilt is Mid or High. Do not judge it by how hard it feels.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und Zeit die Maßnahme bis zum Release braucht: ein paar geänderte Seiten oder Einstellungen sind Niedrig, ein umgebauter Teil der Plattform ist Mittel oder Hoch. Beurteilen Sie ihn nicht danach, wie schwer er sich anfühlt."),
        tt("Rate impact by what a measure does for motivation and for finishing a course: transparency, feedback that counts and a working phone layout first; decoration last.", "Bewerten Sie die Wirkung danach, was eine Maßnahme für Motivation und das Beenden eines Kurses bewirkt: zuerst Transparenz, Feedback, das zählt, und ein funktionierendes Handylayout; Dekoration zuletzt."),
        tt("Rate risk by what could go wrong: a display that misleads, feedback that overloads, a big change that touches every screen.", "Bewerten Sie das Risiko danach, was schiefgehen kann: eine Anzeige, die täuscht, Feedback, das überlastet, eine große Änderung, die jeden Bildschirm berührt."),
        tt("Justify the order with the chain transparency, motivation, usage: say how your first measure leads to the next.", "Begründen Sie die Reihenfolge mit der Kette Transparenz, Motivation, Nutzung: Sagen Sie, wie Ihre erste Maßnahme zur nächsten führt."),
        tt("Say what you do not know, for example where phone learners drop out, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel wo Handy-Lernende abbrechen, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A5} art={ART_D10} />
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
      scan={tt("UX is a steering and feedback system: feedback leads to visible progress, progress to motivation, motivation to use. Responsive design and accessibility let the chain work for everyone.", "UX ist ein Steuerungs- und Feedbacksystem: Feedback führt zu sichtbarem Fortschritt, Fortschritt zu Motivation, Motivation zu Nutzung. Responsive Design und Barrierefreiheit lassen die Kette für alle funktionieren.")}
      sources={["hattie2007", "amabile2011", "wroblewski2011", "wcag22"]}
      reasoning={[
        tt("Design the parts as one system: feedback that counts and explains, an honest progress display, and a layout that works on the device the learner uses.", "Entwerfen Sie die Teile als ein System: Feedback, das zählt und erklärt, eine ehrliche Fortschrittsanzeige und ein Layout, das auf dem Gerät der Lernenden funktioniert."),
        tt("Name a risk of the progress display (misleading, or overwhelming) and say how the design prevents it.", "Nennen Sie ein Risiko der Fortschrittsanzeige (irreführend oder überfordernd) und sagen Sie, wie das Design es verhindert."),
        tt("Build accessibility into the responsive concept, not into a separate version: targets of at least 44 px, contrast of at least 4.5 : 1, reflow without sideways scrolling, status in words, and a name and value for the progress bar for screen readers.", "Bauen Sie Barrierefreiheit in das responsive Konzept ein, nicht in eine separate Fassung: Ziele von mindestens 44 px, Kontrast von mindestens 4,5 : 1, Reflow ohne seitliches Scrollen, Status in Worten und einen Namen und Wert für den Fortschrittsbalken für Screenreader."),
        tt("Argue the order of measures by the chain: transparency first, then feedback, then usage on every device; where most users are on a phone, responsive design can also go first as a prerequisite.", "Begründen Sie die Reihenfolge der Maßnahmen mit der Kette: zuerst Transparenz, dann Feedback, dann Nutzung auf jedem Gerät; wo die meisten Nutzer auf dem Handy sind, kann Responsive Design auch als Voraussetzung zuerst kommen."),
      ]}
    >
      <ComicButton comic={COMICS_D10.B1} art={ART_D10} />
      <SteerChain />
      <DataTable
        caption={tt("Accessibility measures that make the system work on every device", "Barrierefreiheitsmaßnahmen, die das System auf jedem Gerät funktionieren lassen")}
        head={[tt("Measure", "Maßnahme"), tt("Who gains", "Wer profitiert"), tt("Why it also helps everyone", "Warum es auch allen hilft")]}
        rows={[
          [tt("Targets of at least 44 px", "Ziele von mindestens 44 px"), tt("People with a tremor or limited hand use", "Menschen mit Zittern oder eingeschränkter Handfunktion"), tt("Anyone on a moving train", "Alle in einem fahrenden Zug")],
          [tt("Contrast of at least 4.5 : 1", "Kontrast von mindestens 4,5 : 1"), tt("People with low vision", "Menschen mit eingeschränktem Sehvermögen"), tt("Anyone in sunlight", "Alle im Sonnenlicht")],
          [tt("Text that reflows", "Text, der umbricht"), tt("People who enlarge text", "Menschen, die Text vergrößern"), tt("Everyone on a small screen", "Alle auf einem kleinen Bildschirm")],
          [tt("Status in words", "Status in Worten"), tt("People who cannot tell colours apart", "Menschen, die Farben nicht unterscheiden können"), tt("Anyone who prints in black and white", "Alle, die schwarzweiß drucken")],
          [tt("A name and value for the bar", "Ein Name und Wert für den Balken"), tt("People who use a screen reader", "Menschen, die einen Screenreader nutzen"), tt("Search and automation tools", "Such- und Automatisierungswerkzeuge")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The chain follows the plan's coaching and Musterlösung: transparency, motivation, usage. LearnLoop is the example company.", "Die Kette folgt dem Coaching und der Musterlösung des Plans: Transparenz, Motivation, Nutzung. LearnLoop ist das Beispielunternehmen.")}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Accessibility is scalability and reach: a design that works with a thumb, in sunlight and without colour works for more learners on more devices, and costs less to build in from the start than to retrofit (Day 7). Where feedback is underestimated: teams often invest in new content and neglect to tell learners that their work counted.", "Barrierefreiheit ist Skalierbarkeit und Reichweite: Ein Design, das mit einem Daumen, im Sonnenlicht und ohne Farbe funktioniert, funktioniert für mehr Lernende auf mehr Geräten und kostet weniger, wenn man es von Anfang an einbaut, als wenn man es nachrüstet (Tag 7). Wo Feedback unterschätzt wird: Teams investieren oft in neuen Inhalt und versäumen es, Lernenden zu sagen, dass ihre Arbeit zählte.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Information density, feedback and flexibility each pull against clarity, calm and consistency. Show what a learner needs to decide the next step; give feedback where it counts.", "Informationsdichte, Feedback und Flexibilität ziehen jeweils gegen Klarheit, Ruhe und Konsistenz. Zeigen Sie, was eine Lernende braucht, um den nächsten Schritt zu entscheiden; geben Sie Feedback dort, wo es zählt.")}
      sources={["nielsen1994", "wroblewski2011", "shneiderman2016"]}
      reasoning={[
        tt("Name both poles of each conflict: too much (a dashboard of fourteen charts, a pop-up after every click) and too little (only a Continue button, silence). A plan that names one pole has not weighed the conflict.", "Nennen Sie beide Pole jedes Konflikts: zu viel (ein Dashboard mit vierzehn Diagrammen, ein Pop-up nach jedem Klick) und zu wenig (nur ein Weiter-Button, Stille). Ein Plan, der einen Pol nennt, hat den Konflikt nicht abgewogen."),
        tt("Show the few things a learner needs to decide the next step (lessons done, time left, the next lesson) and put the rest one click down.", "Zeigen Sie die wenigen Dinge, die eine Lernende braucht, um den nächsten Schritt zu entscheiden (erledigte Lektionen, verbleibende Zeit, die nächste Lektion), und legen Sie den Rest einen Klick tiefer."),
        tt("Cap feedback per task: one message that counts, and the detail behind a “Why?” link.", "Begrenzen Sie Feedback pro Aufgabe: eine Meldung, die zählt, und das Detail hinter einem Link „Warum?“."),
        tt("Keep the same components across devices so that a learner who switches device is not lost; adapt the layout, not the meaning.", "Halten Sie dieselben Komponenten über Geräte hinweg gleich, damit eine Lernende, die das Gerät wechselt, nicht verloren ist; passen Sie das Layout an, nicht die Bedeutung."),
      ]}
    >
      <ComicButton comic={COMICS_D10.B2} art={ART_D10} />
      <DensityMatrix />
      <DataTable
        caption={tt("Three conflicts and a rule for deciding each", "Drei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Information density against clarity", "Informationsdichte gegen Klarheit"), tt("Everything the learner might want", "Alles, was die Lernende wollen könnte"), tt("A screen that can be read at a glance", "Ein Bildschirm, der auf einen Blick lesbar ist"), tt("Show what decides the next step; the rest one level down.", "Zeigen, was den nächsten Schritt entscheidet; den Rest eine Ebene tiefer.")],
          [tt("Feedback against overload", "Feedback gegen Überlastung"), tt("An answer to every action", "Eine Antwort auf jede Aktion"), tt("An uninterrupted lesson", "Eine ungestörte Lektion"), tt("Feedback where it counts (a finished task, a mistake, a milestone); quiet elsewhere.", "Feedback dort, wo es zählt (eine beendete Aufgabe, ein Fehler, ein Meilenstein); sonst ruhig.")],
          [tt("Flexibility against consistency", "Flexibilität gegen Konsistenz"), tt("A layout tuned to each device", "Ein auf jedes Gerät abgestimmtes Layout"), tt("The same patterns on every device", "Dieselben Muster auf jedem Gerät"), tt("Adapt the layout, keep the components and the meaning.", "Das Layout anpassen, die Komponenten und die Bedeutung behalten.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its five progress screens are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine fünf Fortschrittsbildschirme sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Mobile UX as a standard: the plan's discussion line. Treating the phone as the main case, not an afterthought, is what “mobile first” means (Wroblewski 2011): the team has to decide what matters most before it adds anything for larger screens.", "Mobile UX als Standard: die Diskussionszeile des Plans. Das Handy als Hauptfall zu behandeln, nicht als Nachgedanken, ist, was „Mobile First“ bedeutet (Wroblewski 2011): Das Team muss entscheiden, was am wichtigsten ist, bevor es für größere Bildschirme etwas ergänzt.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you cannot yet measure retention by device, choose changes that can be reversed, write a figure you can watch into the plan, and say what you give up.", "Wenn Sie die Bindung pro Gerät noch nicht messen können, wählen Sie Änderungen, die sich zurücknehmen lassen, schreiben Sie eine beobachtbare Zahl in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "nielsen2000", "gibbons2018"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “the seven-day return rate of phone learners has not risen from 20% to 26% by the end of month 3”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „die Sieben-Tage-Wiederkehrrate der Handy-Lernenden ist bis Ende von Monat 3 nicht von 20 % auf 26 % gestiegen“."),
        tt("Start with the cheapest measures that answer a printed fact (an honest progress display, one explained message per task) and test on real phones before the large redesign.", "Beginnen Sie mit den günstigsten Maßnahmen, die einen gedruckten Fakt beantworten (eine ehrliche Fortschrittsanzeige, eine erklärte Meldung pro Aufgabe), und testen Sie auf echten Handys vor dem großen Redesign."),
        tt("Name who decides on a change and what evidence they need: the return rate by device, completion, a test.", "Nennen Sie, wer über eine Änderung entscheidet und welche Belege sie braucht: die Wiederkehrrate pro Gerät, den Abschluss, einen Test."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example the levels and points or a separate app.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel die Level und Punkte oder eine separate App."),
      ]}
    >
      <ComicButton comic={COMICS_D10.B3} art={ART_D10} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision without retention data by device safer", "Fünf Wege, eine Entscheidung ohne Bindungsdaten pro Gerät sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Split the data by device", "Die Daten nach Gerät aufteilen"), tt("Start recording the return rate and completion separately for phone, tablet and desktop.", "Beginnen Sie, Wiederkehrrate und Abschluss getrennt für Handy, Tablet und Desktop zu erfassen.")],
          [tt("Test on real phones", "Auf echten Handys testen"), tt("Watch five to eight learners use progress and feedback on their own phones.", "Fünf bis acht Lernenden dabei zusehen, wie sie Fortschritt und Feedback auf ihren eigenen Handys nutzen.")],
          [tt("Start small and reversible", "Klein und umkehrbar beginnen"), tt("An honest progress display and one message per task first, behind a switch.", "Zuerst eine ehrliche Fortschrittsanzeige und eine Meldung pro Aufgabe, hinter einem Schalter.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Premortem: Klein's premortem asks the team to imagine that the plan failed. Typical answers here: the feedback overloaded learners, the progress display misled them, and the phone layout removed what desktop users needed. Each answer becomes a check.", "Premortem: Kleins Premortem bittet das Team, sich vorzustellen, der Plan sei gescheitert. Typische Antworten hier: Das Feedback überlastete Lernende, die Fortschrittsanzeige täuschte sie, und das Handylayout entfernte, was Desktop-Nutzer brauchten. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. A progress display behind a switch is a two-way door; building a separate native app is a one-way door.", "Einbahn- und Zweiwegtüren: Bezos trennt schwer umkehrbare Entscheidungen von leicht umkehrbaren. Eine Fortschrittsanzeige hinter einem Schalter ist eine Zweiwegtür; eine separate native App zu bauen ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
