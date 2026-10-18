"use client";

import { DARK, LINE, LITE, MID, Svg, Txt } from "@/components/day/mockKit";
import { MeasureThumb, CoursePageMock, FeedbackMock, LessonMock, MistakeMock } from "@/components/day8/mocks";
import type { LessonOn } from "@/components/day8/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never StructLearn, so no task is answered here. Interactive
 * ones carry "The point" and an always-visible "What this shows"; the story of each card is its pixel comic (data/day8/comics.ts) (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · a lesson screen with three switches (interactive) */

export function OrientationFig() {
  const answered = (on: Record<string, boolean>) => ({ where: !!(on.marked || on.path), next: !!on.next });
  return (
    <SwitchFig
      label={tt("A LearnLoop lesson: does the screen answer the three orientation questions? · Exploratory · Case assumption", "Eine LearnLoop-Lektion: Beantwortet der Bildschirm die drei Orientierungsfragen? · Explorativ · Fallannahme")}
      point={tt(
        "A learner on any page needs three answers: where am I, where can I go, what comes next. A path, a menu that marks the real place and a Next button give them. Without them, the learner has to build the map alone.",
        "Eine Lernende braucht auf jeder Seite drei Antworten: Wo bin ich, wohin kann ich, was kommt als Nächstes. Ein Pfad, ein Menü, das die richtige Stelle markiert, und ein Weiter-Button geben sie. Ohne sie muss die Lernende die Karte allein bauen.",
      )}
      switches={[
        { id: "path", label: tt("A path above the lesson", "Ein Pfad über der Lektion") },
        { id: "marked", label: tt("The menu marks the real place", "Das Menü markiert die richtige Stelle") },
        { id: "next", label: tt("A “Next” button", "Ein Button „Weiter“") },
      ]}
      start={{ path: false, marked: false, next: false }}
      picture={(on) => <LessonMock on={on as unknown as LessonOn} />}
      insight={(on) => {
        const a = answered(on);
        const n = 1 + (a.where ? 1 : 0) + (a.next ? 1 : 0);
        return tt(
          `In plain words: the menu always shows where Tom can go. ${a.where ? "The screen also tells him where he is." : "But it marks Home while he is inside a lesson, so it tells him the wrong place."} ${a.next ? "A Next button tells him what comes next." : "Nothing tells him what comes next."} That is ${n} of the 3 questions answered.`,
          `In einfachen Worten: Das Menü zeigt immer, wohin Tom gehen kann. ${a.where ? "Der Bildschirm sagt ihm auch, wo er ist." : "Aber es markiert „Start“, während er in einer Lektion ist, und nennt ihm so die falsche Stelle."} ${a.next ? "Ein Weiter-Button sagt ihm, was als Nächstes kommt." : "Nichts sagt ihm, was als Nächstes kommt."} Das sind ${n} von 3 beantworteten Fragen.`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A1 · a simple information architecture (static) */

export function IaTree() {
  const sections: [string, string[]][] = [
    [tt("Learn", "Lernen"), [tt("Continue", "Weitermachen"), tt("My courses", "Meine Kurse"), tt("Notes", "Notizen")]],
    [tt("Find", "Finden"), [tt("Catalogue", "Katalog"), tt("Search", "Suche"), tt("By topic", "Nach Thema")]],
    [tt("Progress", "Fortschritt"), [tt("Per course", "Pro Kurs"), tt("Certificates", "Zertifikate"), tt("Goals", "Ziele")]],
    [tt("Help", "Hilfe"), [tt("Help centre", "Hilfecenter"), tt("Contact", "Kontakt"), tt("Account", "Konto")]],
  ];
  return (
    <Diagram
      label={tt("A simple information architecture: four sections named after what the learner does (LearnLoop example, Case assumption)", "Eine einfache Informationsarchitektur: vier Bereiche, benannt nach dem, was die Lernende tut (LearnLoop-Beispiel, Fallannahme)")}
      caption={tt("A root, a few sections and the items under them. Each item has one home. The sections are named after what the learner does, not after the software's modules.", "Eine Wurzel, einige Bereiche und die Einträge darunter. Jeder Eintrag hat einen Ort. Die Bereiche sind nach dem benannt, was die Lernende tut, nicht nach den Modulen der Software.")}
    >
      <Svg viewBox="0 0 640 230" label={tt("Information architecture of LearnLoop: the root LearnLoop with the sections Learn, Find, Progress and Help, three items under each", "Informationsarchitektur von LearnLoop: die Wurzel LearnLoop mit den Bereichen Lernen, Finden, Fortschritt und Hilfe, darunter je drei Einträge")} className="mx-auto h-auto w-full max-w-[640px]">
        <rect x="270" y="8" width="100" height="30" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
        <Txt x={320} y={28} size={13} anchor="middle" bold>LearnLoop</Txt>
        {sections.map(([name, items], i) => {
          const cx = 80 + i * 160;
          return (
            <g key={name}>
              <line x1="320" y1="38" x2={cx} y2="72" stroke={LINE} strokeWidth="1.6" />
              <rect x={cx - 52} y="72" width="104" height="28" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <Txt x={cx} y={91} size={12} anchor="middle" bold>{name}</Txt>
              {items.map((it, j) => (
                <g key={it}>
                  <line x1={cx} y1="100" x2={cx} y2={118 + j * 34 + 12} stroke={MID} />
                  <rect x={cx - 46} y={118 + j * 34} width="92" height="24" rx="5" fill={LITE} stroke={MID} />
                  <Txt x={cx} y={134 + j * 34} size={11} anchor="middle">{it}</Txt>
                </g>
              ))}
            </g>
          );
        })}
      </Svg>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · the same course page: everything competes, or one main thing (interactive) */

export function HierarchyFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop course page: everything competes, or one main thing · Exploratory · Case assumption", "Dieselbe LearnLoop-Kursseite: alles konkurriert, oder eine Hauptsache · Explorativ · Fallannahme")}
      point={tt("A visual hierarchy tells the learner what to look at first. When five buttons, seven colours and three banners have the same weight, nothing leads; with one strong button and quiet links, the eye knows where to go.", "Eine visuelle Hierarchie sagt der Lernenden, wohin sie zuerst schauen soll. Haben fünf Buttons, sieben Farben und drei Banner dasselbe Gewicht, führt nichts; mit einem starken Button und ruhigen Links weiß das Auge, wohin es gehen soll.")}
      states={[
        { id: "busy", button: tt("Everything competes", "Alles konkurriert"), picture: <CoursePageMock calm={false} />, insight: tt("In plain words: Mia opens the course page and sees seven colours, three banners and five buttons of the same size. Her eye jumps from one to the next and finds no starting point, so she does not know which button continues her lesson.", "In einfachen Worten: Mia öffnet die Kursseite und sieht sieben Farben, drei Banner und fünf Buttons gleicher Größe. Ihr Auge springt von einem zum nächsten und findet keinen Anfang, sie weiß also nicht, welcher Button ihre Lektion fortsetzt.") },
        { id: "calm", button: tt("One main thing", "Eine Hauptsache"), picture: <CoursePageMock calm />, insight: tt("In plain words: the same page with one filled button, “Continue: lesson 3”, two quiet links and a progress bar. Mia sees what to do in a second. Nothing was added; things were made quieter and one thing was made stronger.", "In einfachen Worten: dieselbe Seite mit einem gefüllten Button „Weiter: Lektion 3“, zwei ruhigen Links und einem Fortschrittsbalken. Mia sieht in einer Sekunde, was zu tun ist. Nichts wurde hinzugefügt; Dinge wurden ruhiger und eine Sache stärker gemacht.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · feedback on an action (interactive) */

export function FeedbackFig() {
  return (
    <StateFig
      label={tt("A LearnLoop Save button: feedback at once, after a second, or not at all · Exploratory · Case assumption", "Ein LearnLoop-Speichern-Button: Rückmeldung sofort, nach einer Sekunde oder gar nicht · Explorativ · Fallannahme")}
      point={tt("Every action needs an answer. About a tenth of a second feels instant, about a second keeps the train of thought, and after ten seconds without a sign the learner presses again or leaves.", "Jede Aktion braucht eine Antwort. Etwa eine zehntel Sekunde fühlt sich sofort an, etwa eine Sekunde hält den Gedankengang, und nach zehn Sekunden ohne Zeichen drückt die Lernende nochmals oder geht.")}
      states={[
        { id: "now", button: tt("At once · 0.1 s", "Sofort · 0,1 s"), picture: <FeedbackMock kind="now" />, insight: tt("In plain words: Noor presses Save and the button turns into “Saved ✓” before she lifts her finger. She knows it worked and moves on.", "In einfachen Worten: Noor drückt Speichern, und der Button wird zu „Gespeichert ✓“, bevor sie den Finger hebt. Sie weiß, dass es geklappt hat, und macht weiter.") },
        { id: "wait", button: tt("After a second", "Nach einer Sekunde"), picture: <FeedbackMock kind="wait" />, insight: tt("In plain words: the save takes about a second, and the button shows “Saving…” with a spinner. Noor sees that something is happening, so she waits and does not lose her train of thought.", "In einfachen Worten: Das Speichern dauert etwa eine Sekunde, und der Button zeigt „Speichern …“ mit einem Kreisel. Noor sieht, dass etwas passiert, wartet also und verliert ihren Gedankengang nicht.") },
        { id: "none", button: tt("Nothing for 10 s", "Nichts für 10 s"), picture: <FeedbackMock kind="none" />, insight: tt("In plain words: the button does not change and nothing says whether the note was saved. After a few seconds Noor presses again, and again, and may leave unsure whether her work is safe.", "In einfachen Worten: Der Button verändert sich nicht, und nichts sagt, ob die Notiz gespeichert wurde. Nach einigen Sekunden drückt Noor nochmals und nochmals und geht vielleicht unsicher, ob ihre Arbeit sicher ist.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · three typical mistakes (static) */

export function MistakesFig() {
  const items: [Parameters<typeof MistakeMock>[0]["kind"], string, string, string][] = [
    ["nav", tt("Unclear navigation", "Unklare Navigation"), tt("The learner cannot say where they are or where something is. Cost: effort goes into finding.", "Die Lernende kann nicht sagen, wo sie ist oder wo etwas liegt. Kosten: Aufwand geht ins Suchen."), tt("Remedy: one home per item, a path, a Next step.", "Gegenmittel: ein Ort pro Eintrag, ein Pfad, ein nächster Schritt.")],
    ["overload", tt("Visual overload", "Visuelle Überladung"), tt("Many elements of the same weight compete. Cost: the key point is lost.", "Viele Elemente gleichen Gewichts konkurrieren. Kosten: Der Kernpunkt geht verloren."), tt("Remedy: one main thing, fewer colours.", "Gegenmittel: eine Hauptsache, weniger Farben.")],
    ["consistency", tt("Inconsistent design", "Inkonsistentes Design"), tt("The same function looks or works differently on different screens. Cost: each screen is learned again.", "Dieselbe Funktion sieht auf verschiedenen Bildschirmen anders aus oder funktioniert anders. Kosten: Jeder Bildschirm wird neu gelernt."), tt("Remedy: one style for one function.", "Gegenmittel: ein Stil für eine Funktion.")],
  ];
  return (
    <Diagram
      label={tt("Three typical UX/UI mistakes, each as a small screen, with what it costs the learner and a remedy", "Drei typische UX/UI-Fehler, jeder als kleiner Bildschirm, mit dem, was er die Lernende kostet, und einem Gegenmittel")}
      caption={tt("Each mistake takes attention, and attention is the learner's scarcest resource (Day 3).", "Jeder Fehler nimmt Aufmerksamkeit, und Aufmerksamkeit ist die knappste Ressource der Lernenden (Tag 3).")}
    >
      <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-3">
        {items.map(([k, name, cost, remedy]) => (
          <div key={k} className="space-y-1">
            <MistakeMock kind={k} />
            <p className="text-caption font-bold text-ink">{name}</p>
            <p className="text-micro normal-case tracking-normal text-ink"><Gloss>{cost}</Gloss></p>
            <p className="text-micro normal-case tracking-normal text-ash">{remedy}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three design measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Designmaßnahmen ab · Explorativ")}
      point={tt("Rate a measure by what it does for orientation and action, by the work it takes and by what could go wrong. Structure usually beats surface, and a measure that adds elements to a cluttered screen carries the risk of more clutter. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, was sie für Orientierung und Handeln bewirkt, nach der Arbeit, die sie macht, und danach, was schiefgehen kann. Struktur schlägt meist Oberfläche, und eine Maßnahme, die einem überladenen Bildschirm Elemente hinzufügt, trägt das Risiko von noch mehr Unruhe. Begründen Sie jede Bewertung.")}
      company="LearnLoop"
      context={tt("three weeks, beginners, a high drop-out rate", "drei Wochen, Einsteiger, eine hohe Abbruchrate")}
      impactLabel={tt("User impact", "Nutzerwirkung")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("Fewer colours and banners", "Weniger Farben und Banner"), thumb: <MeasureThumb kind="calm" />, impact: { level: 2, reason: tt("The main button becomes visible, but the structure stays as it is: the same course still sits in three places.", "Der Hauptbutton wird sichtbar, aber die Struktur bleibt, wie sie ist: Derselbe Kurs steht weiterhin an drei Stellen.") }, risk: { level: 1, reason: tt("It removes things; little can go wrong.", "Es entfernt Dinge; wenig kann schiefgehen.") }, effort: { level: 1, reason: tt("A few banners and colours to remove: little work, easy to fit into three weeks.", "Ein paar Banner und Farben zu entfernen: wenig Arbeit, leicht in drei Wochen unterzubringen.") } },
        { id: "w2", name: tt("Rebuild the navigation", "Die Navigation umbauen"), thumb: <MeasureThumb kind="nav" />, impact: { level: 3, reason: tt("Learners find their course and see what comes next: it answers orientation, the cause of the drop-out.", "Lernende finden ihren Kurs und sehen, was als Nächstes kommt: Es beantwortet die Orientierung, die Ursache des Abbruchs.") }, risk: { level: 2, reason: tt("It needs most of the three weeks, so a delay is possible.", "Es braucht den Großteil der drei Wochen, eine Verzögerung ist also möglich.") }, effort: { level: 3, reason: tt("A new structure, new labels and every page moved: the most work of the three.", "Eine neue Struktur, neue Beschriftungen und jede Seite verschoben: die meiste Arbeit der drei.") } },
        { id: "w3", name: tt("Animated illustrations", "Animierte Illustrationen"), thumb: <MeasureThumb kind="anim" />, impact: { level: 1, reason: tt("They help nobody find or choose; they only add to look at.", "Sie helfen niemandem zu finden oder zu wählen; sie fügen nur etwas zum Anschauen hinzu.") }, risk: { level: 3, reason: tt("More elements compete for attention on an already busy page.", "Mehr Elemente konkurrieren auf einer ohnehin unruhigen Seite um Aufmerksamkeit.") }, effort: { level: 2, reason: tt("Illustrations and animations have to be drawn and tested: a medium amount of work.", "Illustrationen und Animationen müssen gezeichnet und getestet werden: ein mittlerer Arbeitsaufwand.") } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · from structure to learning success (static) */

export function DesignChain() {
  return (
    <ChainFig
      label={tt("From structure to learning success: design as decision architecture", "Von der Struktur zum Lernerfolg: Design als Entscheidungsarchitektur")}
      steps={[
        { h: tt("Structure and hierarchy", "Struktur und Hierarchie"), b: tt("One home per item, a clear main thing on each screen.", "Ein Ort pro Eintrag, eine klare Hauptsache auf jedem Bildschirm."), kind: "a" },
        { h: tt("Orientation and guidance", "Orientierung und Führung"), b: tt("The learner knows where they are and what comes next.", "Die Lernende weiß, wo sie ist und was als Nächstes kommt."), kind: "s" },
        { h: tt("Behaviour", "Verhalten"), b: tt("The learner starts, carries on and returns.", "Die Lernende beginnt, macht weiter und kehrt zurück."), kind: "m" },
        { h: tt("Learning result", "Lernergebnis"), b: tt("Completion and a result that lasts.", "Abschluss und ein Ergebnis, das bleibt."), kind: "a" },
      ]}
      caption={tt("Fix the left end of the chain first: a change at the right end, such as a new look, cannot repair what is wrong at the left.", "Beheben Sie zuerst das linke Ende der Kette: Eine Änderung am rechten Ende, etwa ein neues Aussehen, kann nicht reparieren, was links falsch ist.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · five options by clutter removed and guidance kept (interactive) */

export function ReductionMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: five LearnLoop options by clutter removed and guidance kept · Exploratory", "Ein durchgerechnetes Beispiel: fünf LearnLoop-Optionen nach entfernter Unruhe und behaltener Führung · Explorativ")}
      point={tt("A cluttered platform and an over-reduced one both fail. Remove clutter first, keep the guidance and the functions learners need, and hide advanced options behind “More” instead of deleting them.", "Eine überladene Plattform und eine übertrieben reduzierte scheitern beide. Entfernen Sie zuerst Unruhe, behalten Sie die Führung und die Funktionen, die Lernende brauchen, und legen Sie erweiterte Optionen hinter „Mehr“, statt sie zu löschen.")}
      title={tt("Five options of LearnLoop by clutter removed (to the right) and guidance and function kept (upwards)", "Fünf Optionen von LearnLoop nach entfernter Unruhe (nach rechts) und behaltener Führung und Funktion (nach oben)")}
      xLabel={tt("Clutter removed", "Entfernte Unruhe")}
      yLabel={tt("Guidance and function kept", "Behaltene Führung und Funktion")}
      quads={[tt("Cluttered, but guided", "Unruhig, aber geführt"), tt("Calm and guided: the aim", "Ruhig und geführt: das Ziel"), tt("Cluttered and unguided", "Unruhig und ungeführt"), tt("Calm, but stripped", "Ruhig, aber leer geräumt")]}
      points={[
        { id: "a", letter: "A", x: 0.7, y: 0.74, name: tt("Remove banners and extra colours, keep every function", "Banner und Zusatzfarben entfernen, jede Funktion behalten"), reading: tt("It removes the clutter and keeps what learners need, so it lands close to the aim. What it does not do is fix the structure.", "Es entfernt die Unruhe und behält, was Lernende brauchen, und landet so nahe am Ziel. Was es nicht tut, ist die Struktur zu beheben.") },
        { id: "b", letter: "B", x: 0.94, y: 0.18, name: tt("Strip the platform down to the course list", "Die Plattform auf die Kursliste zurückbauen"), reading: tt("It is the calmest screen, but learners lose help, progress and the trainers' functions. It is too reduced: calm bought with guidance.", "Es ist der ruhigste Bildschirm, aber Lernende verlieren Hilfe, Fortschritt und die Funktionen der Trainer. Es ist zu reduziert: Ruhe, mit Führung bezahlt.") },
        { id: "c", letter: "C", x: 0.1, y: 0.28, name: tt("Add more banners for current offers", "Mehr Banner für aktuelle Angebote ergänzen"), reading: tt("It adds more clutter and no guidance. It competes with the main action.", "Es ergänzt mehr Unruhe und keine Führung. Es konkurriert mit der Hauptaktion.") },
        { id: "d", letter: "D", x: 0.18, y: 0.62, name: tt("Keep everything and add a pop-up tour", "Alles behalten und eine Pop-up-Tour ergänzen"), reading: tt("It keeps every function and adds guidance, but the clutter stays and the tour interrupts. It treats the symptom of a structure that should explain itself.", "Es behält jede Funktion und ergänzt Führung, aber die Unruhe bleibt, und die Tour unterbricht. Es behandelt das Symptom einer Struktur, die sich selbst erklären sollte.") },
        { id: "e", letter: "E", x: 0.82, y: 0.9, name: tt("Hide advanced options behind “More”, keep the path and help", "Erweiterte Optionen hinter „Mehr“ legen, Pfad und Hilfe behalten"), reading: tt("It removes clutter for beginners, and experts can still reach everything: progressive disclosure. The top right is where it lands.", "Es entfernt Unruhe für Einsteiger, und Experten erreichen weiterhin alles: Progressive Disclosure. Oben rechts liegt es.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision without user tests, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without user tests, filled in for LearnLoop", "Eine Entscheidung ohne Nutzertests, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future design decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Designentscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To move the course list into one section, named after what learners do, before any visual change.", "Die Kursliste in einen Bereich zu legen, der nach dem benannt ist, was Lernende tun, vor jeder visuellen Änderung.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners understand the new section names.", "Ob Lernende die neuen Bereichsnamen verstehen.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Fewer than 7 of 10 tested learners find their course in under a minute by the end of week 6.", "bis Ende von Woche 6 weniger als 7 von 10 getesteten Lernenden ihren Kurs in unter einer Minute finden.")],
        [tt("I give up", "Ich verzichte auf"), tt("The new logo for this half year.", "das neue Logo in diesem Halbjahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of UX with the head of product.", "Die Leiterin UX mit der Leiterin Produkt.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("A tree test, task success and drop-out.", "Ein Tree Test, Aufgabenerfolg und Abbruch.")],
      ]}
    />
  );
}

