"use client";

import { DARK, LINE, LITE, MID, Svg, Txt } from "@/components/day/mockKit";
import { ActiveMock, EndMock, IaMock, MeasureThumb, MenuMock } from "@/components/day9/mocks";
import type { EndOn } from "@/components/day9/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never NavLearn, so no task is answered here. Interactive ones
 * carry "The point" and an always-visible "What this shows"; the story of each card is its pixel comic (data/day9/comics.ts) (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · a platform that grew, and the same platform grouped (interactive) */

export function IaFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop items: grown without a plan, and grouped · Exploratory · Case assumption", "Dieselben LearnLoop-Einträge: ohne Plan gewachsen und gruppiert · Explorativ · Fallannahme")}
      point={tt("An information architecture organises and names content so that people can find it. The same items can be a flat row with two homes for one course, or four groups where every item has one home.", "Eine Informationsarchitektur ordnet und benennt Inhalt, damit Menschen ihn finden. Dieselben Einträge können eine flache Reihe mit zwei Orten für einen Kurs sein oder vier Gruppen, in denen jeder Eintrag einen Ort hat.")}
      states={[
        { id: "grown", button: tt("Grown without a plan", "Ohne Plan gewachsen"), picture: <IaMock grouped={false} />, insight: tt("In plain words: twelve entries sit in one row, and the same course appears twice, as “My courses” and as “Courses (old)”. Ana cannot tell which is the real one, and has to guess where a certificate or a note might be.", "In einfachen Worten: Zwölf Einträge stehen in einer Reihe, und derselbe Kurs erscheint zweimal, als „Meine Kurse“ und als „Kurse (alt)“. Ana kann nicht sagen, welcher der richtige ist, und muss raten, wo ein Zertifikat oder eine Notiz sein könnte.") },
        { id: "grouped", button: tt("Grouped under four sections", "In vier Bereiche gruppiert"), picture: <IaMock grouped />, insight: tt("In plain words: the same items sit under Learn, Find, Progress and Help, named after what Ana does, and every item has one home. She looks for her certificate under Progress and finds it. Nothing was added; things were put in order.", "In einfachen Worten: Dieselben Einträge stehen unter Lernen, Finden, Fortschritt und Hilfe, benannt nach dem, was Ana tut, und jeder Eintrag hat einen Ort. Sie sucht ihr Zertifikat unter Fortschritt und findet es. Nichts wurde hinzugefügt; Dinge wurden geordnet.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · four, nine or twenty-four entries in a menu (interactive) */

export function ChoicesFig() {
  return (
    <StateFig
      label={tt("One LearnLoop menu with 4, 9 or 24 entries: how long does it take to find “Contracts”? · Exploratory · Case assumption", "Ein LearnLoop-Menü mit 4, 9 oder 24 Einträgen: Wie lange dauert es, „Verträge“ zu finden? · Explorativ · Fallannahme")}
      point={tt("The more options at one decision point, the longer a learner needs to choose, and the more likely they are to stop. Keep the main menu short and move the rest under groups.", "Je mehr Optionen an einem Entscheidungspunkt, desto länger braucht eine Lernende zur Wahl und desto eher hört sie auf. Halten Sie das Hauptmenü kurz und legen Sie den Rest unter Gruppen.")}
      states={[
        { id: "4", button: tt("4 entries", "4 Einträge"), picture: <MenuMock n={4} />, insight: tt("In plain words: with four entries Sam reads them all in a moment and picks one. There is little to weigh, so the choice is quick.", "In einfachen Worten: Bei vier Einträgen liest Sam alle in einem Augenblick und wählt einen. Es gibt wenig abzuwägen, die Wahl ist also schnell.") },
        { id: "9", button: tt("9 entries", "9 Einträge"), picture: <MenuMock n={9} />, insight: tt("In plain words: with nine entries Sam must scan, and the names start to compete. It still works, but it takes longer than with four.", "In einfachen Worten: Bei neun Einträgen muss Sam überfliegen, und die Namen beginnen zu konkurrieren. Es funktioniert noch, dauert aber länger als bei vier.") },
        { id: "24", button: tt("24 entries", "24 Einträge"), picture: <MenuMock n={24} />, insight: tt("In plain words: with 24 small entries Sam has to read nearly every one, and “Contracts” hides among words like “Hub” and “Atlas”. Many learners give up here, or pick the wrong entry.", "In einfachen Worten: Bei 24 kleinen Einträgen muss Sam fast jeden lesen, und „Verträge“ versteckt sich unter Wörtern wie „Hub“ und „Atlas“. Viele Lernende geben hier auf oder wählen den falschen Eintrag.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · three kinds of navigation on one lesson screen (static) */

export function NavTypesFig() {
  return (
    <Diagram
      label={tt("Three kinds of navigation on one LearnLoop lesson screen: the menu, the path and the progress indicator", "Drei Arten von Navigation auf einem LearnLoop-Lektionsbildschirm: das Menü, der Pfad und der Fortschrittsanzeiger")}
      caption={tt("Each kind answers one question: the menu says where I can go, the path says where I am, the progress indicator says how far I am and what is left.", "Jede Art beantwortet eine Frage: Das Menü sagt, wohin ich kann, der Pfad sagt, wo ich bin, der Fortschrittsanzeiger sagt, wie weit ich bin und was bleibt.")}
    >
      <Svg viewBox="0 0 640 250" label={tt("A lesson screen with a menu on the left, a path above the lesson and a progress bar under the title, each with a label", "Ein Lektionsbildschirm mit einem Menü links, einem Pfad über der Lektion und einem Fortschrittsbalken unter dem Titel, jeweils mit einer Beschriftung")} className="mx-auto h-auto w-full max-w-[640px]">
        <rect x="150" y="8" width="340" height="234" rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
        <rect x="150" y="8" width="340" height="18" rx="8" fill={LITE} stroke={LINE} strokeWidth="2" />
        <rect x="158" y="34" width="86" height="198" fill={LITE} />
        {[tt("Learn", "Lernen"), tt("Find", "Finden"), tt("Progress", "Fortschritt"), tt("Help", "Hilfe")].map((n, i) => (
          <g key={n}>
            {i === 0 && <rect x="162" y="40" width="78" height="22" rx="3" fill={DARK} />}
            <Txt x={170} y={55 + i * 28} size={11} bold fill={i === 0 ? "#FFFFFF" : "#333333"}>{n}</Txt>
          </g>
        ))}
        <Txt x={256} y={50} size={10} fill="#555555">{tt("Learn › Negotiation › Lesson 3 of 8", "Lernen › Verhandeln › Lektion 3 von 8")}</Txt>
        <Txt x={256} y={76} size={14} bold>{tt("The first offer", "Das erste Angebot")}</Txt>
        <rect x="256" y="88" width="224" height="10" rx="5" fill={LITE} />
        <rect x="256" y="88" width="84" height="10" rx="5" fill={DARK} />
        <rect x="256" y="112" width="224" height="5" rx="2.5" fill={MID} />
        <rect x="256" y="124" width="224" height="5" rx="2.5" fill={MID} />
        <rect x="256" y="136" width="150" height="5" rx="2.5" fill={MID} />
        <rect x="390" y="196" width="90" height="28" rx="5" fill={DARK} />
        <Txt x={435} y={214} size={11} anchor="middle" bold fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        <line x1="150" y1="150" x2="60" y2="150" stroke={DARK} strokeWidth="2" />
        <Txt x={8} y={142} size={12} bold>{tt("Menu", "Menü")}</Txt>
        <Txt x={8} y={168} size={11}>{tt("where can I go?", "wohin kann ich?")}</Txt>
        <line x1="256" y1="46" x2="256" y2="22" stroke={DARK} strokeWidth="2" />
        <Txt x={500} y={30} size={12} bold>{tt("Path", "Pfad")}</Txt>
        <Txt x={500} y={46} size={11}>{tt("where am I?", "wo bin ich?")}</Txt>
        <line x1="494" y1="42" x2="470" y2="48" stroke={DARK} strokeWidth="2" />
        <line x1="484" y1="93" x2="498" y2="93" stroke={DARK} strokeWidth="2" />
        <Txt x={502} y={90} size={12} bold>{tt("Progress", "Fortschritt")}</Txt>
        <Txt x={502} y={106} size={11}>{tt("how far, what is left?", "wie weit, was bleibt?")}</Txt>
        <line x1="484" y1="210" x2="498" y2="210" stroke={DARK} strokeWidth="2" />
        <Txt x={502} y={207} size={12} bold>{tt("Next step", "Nächster Schritt")}</Txt>
        <Txt x={502} y={223} size={11}>{tt("what comes next?", "was kommt als Nächstes?")}</Txt>
      </Svg>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · a lesson that is read, asks, or rewards clicks (interactive) */

export function ActiveFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop lesson, read, asked or clicked · Exploratory · Case assumption", "Dieselbe LearnLoop-Lektion, gelesen, gefragt oder geklickt · Explorativ · Fallannahme")}
      point={tt("Interaction helps learning when it makes the learner think and answers back. A question with an explained answer and a next step reinforces; a badge for opening a page is activity without learning.", "Interaktion hilft dem Lernen, wenn sie die Lernende zum Denken bringt und antwortet. Eine Frage mit erklärter Antwort und nächstem Schritt festigt; ein Abzeichen fürs Öffnen einer Seite ist Aktivität ohne Lernen.")}
      states={[
        { id: "read", button: tt("Only read", "Nur lesen"), picture: <ActiveMock kind="read" />, insight: tt("In plain words: Lea reads the text and presses Next. This is passive use: she may take it in, or her eyes may only pass over it, and nothing shows which.", "In einfachen Worten: Lea liest den Text und drückt Weiter. Das ist passive Nutzung: Vielleicht nimmt sie ihn auf, vielleicht gleiten ihre Augen nur darüber, und nichts zeigt, was von beidem.") },
        { id: "ask", button: tt("A question, with feedback", "Eine Frage, mit Rückmeldung"), picture: <ActiveMock kind="ask" />, insight: tt("In plain words: Lea answers one question tied to what she just read, sees why A is right and what the first number does, and gets a next step. She had to think, and she learned from the answer.", "In einfachen Worten: Lea beantwortet eine Frage zu dem, was sie gerade gelesen hat, sieht, warum A stimmt und was die erste Zahl bewirkt, und bekommt einen nächsten Schritt. Sie musste nachdenken, und sie hat aus der Antwort gelernt.") },
        { id: "clicks", button: tt("Rewards for clicks", "Belohnungen für Klicks"), picture: <ActiveMock kind="clicks" />, insight: tt("In plain words: Lea collects points for opening a page and pressing a button. She is busy, but nothing says what she learned. The interaction is an end in itself.", "In einfachen Worten: Lea sammelt Punkte fürs Öffnen einer Seite und Drücken eines Buttons. Sie ist beschäftigt, aber nichts sagt, was sie gelernt hat. Die Interaktion ist Selbstzweck.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · the end of a lesson: an explained result, a next step, some variety (interactive) */

export function EngageFig() {
  return (
    <SwitchFig
      label={tt("The end of a LearnLoop lesson: result, next step and variety · Exploratory · Case assumption", "Das Ende einer LearnLoop-Lektion: Ergebnis, nächster Schritt und Abwechslung · Explorativ · Fallannahme")}
      point={tt("Engagement through interaction comes from three things: feedback that explains, a next step, and variety so that the tenth task is not the first one again. A score alone is none of them.", "Engagement durch Interaktion kommt aus drei Dingen: Rückmeldung, die erklärt, einem nächsten Schritt und Abwechslung, damit die zehnte Aufgabe nicht wieder die erste ist. Ein Ergebnis allein ist keines davon.")}
      switches={[
        { id: "result", label: tt("An explained result", "Ein erklärtes Ergebnis") },
        { id: "next", label: tt("A next step", "Ein nächster Schritt") },
        { id: "variety", label: tt("A different kind of task", "Eine andere Art von Aufgabe") },
      ]}
      start={{ result: false, next: false, variety: false }}
      picture={(on) => <EndMock on={on as unknown as EndOn} />}
      insight={(on) => {
        const n = [on.result, on.next, on.variety].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 3 engagement parts are on. ${on.result ? "Ben sees why he missed a question." : "Ben sees only 6 of 10 and has to guess what went wrong."} ${on.next ? "He knows what to do next." : "Nothing tells him what to do next."} ${on.variety ? "The next task is a scenario, so the lesson does not repeat itself." : "The next task is the same kind of question again."}`,
          `In einfachen Worten: ${n} von 3 Engagement-Teilen sind eingeschaltet. ${on.result ? "Ben sieht, warum er eine Frage verpasst hat." : "Ben sieht nur 6 von 10 und muss raten, was schiefging."} ${on.next ? "Er weiß, was er als Nächstes tun soll." : "Nichts sagt ihm, was er als Nächstes tun soll."} ${on.variety ? "Die nächste Aufgabe ist ein Szenario, die Lektion wiederholt sich also nicht." : "Die nächste Aufgabe ist wieder dieselbe Art Frage."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three structure and interaction measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen für Struktur und Interaktion ab · Explorativ")}
      point={tt("Rate a measure by how much it helps the learner find and then learn, by the work it takes and by what could go wrong. Interaction without structure, and rewards for clicks, carry the highest risk of becoming a burden. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, wie sehr sie der Lernenden hilft zu finden und dann zu lernen, nach der Arbeit, die sie macht, und danach, was schiefgehen kann. Interaktion ohne Struktur und Belohnungen für Klicks tragen das höchste Risiko, zur Last zu werden. Begründen Sie jede Bewertung.")}
      company="LearnLoop"
      context={tt("learners get lost in the menu and rarely interact", "Lernende verirren sich im Menü und interagieren selten")}
      impactLabel={tt("Learning impact", "Lernwirkung")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("Rename entries after what the learner does", "Einträge nach dem benennen, was die Lernende tut"), thumb: <MeasureThumb kind="label" />, impact: { level: 2, reason: tt("The names say what is behind them, so fewer learners open the wrong entry; the grouping stays as it is.", "Die Namen sagen, was dahintersteckt, weniger Lernende öffnen also den falschen Eintrag; die Gruppierung bleibt, wie sie ist.") }, effort: { level: 1, reason: tt("Only labels change, in a few places: little work and little time.", "Nur Bezeichnungen ändern sich, an wenigen Stellen: wenig Arbeit und wenig Zeit.") }, risk: { level: 1, reason: tt("Only words change; little can go wrong.", "Nur Worte ändern sich; wenig kann schiefgehen.") } },
        { id: "w2", name: tt("Group the menu into four sections", "Das Menü in vier Bereiche gruppieren"), thumb: <MeasureThumb kind="ia" />, impact: { level: 3, reason: tt("Learners find their course and know where they are: it answers the cause of the lost orientation.", "Lernende finden ihren Kurs und wissen, wo sie sind: Es beantwortet die Ursache der verlorenen Orientierung.") }, effort: { level: 3, reason: tt("A new structure, new names and every page moved: the most work of the three.", "Eine neue Struktur, neue Namen und jede Seite verschoben: die meiste Arbeit der drei.") }, risk: { level: 2, reason: tt("The change touches every page, and learners who know the old menu have to learn the new one.", "Die Änderung betrifft jede Seite, und Lernende, die das alte Menü kennen, müssen das neue lernen.") } },
        { id: "w3", name: tt("Badges for every click", "Abzeichen für jeden Klick"), thumb: <MeasureThumb kind="reward" />, impact: { level: 1, reason: tt("Nothing is learned from a click, and learners who cannot find content get a badge for being lost.", "Aus einem Klick wird nichts gelernt, und Lernende, die Inhalt nicht finden, bekommen ein Abzeichen fürs Verirren.") }, effort: { level: 2, reason: tt("Badges have to be designed and the clicks counted: a medium amount of work.", "Abzeichen müssen gestaltet und die Klicks gezählt werden: ein mittlerer Arbeitsaufwand.") }, risk: { level: 3, reason: tt("It rewards activity and adds noise, so interaction becomes an end in itself.", "Es belohnt Aktivität und fügt Lärm hinzu, Interaktion wird also zum Selbstzweck.") } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · orientation, activation, engagement (static) */

export function OrientChain() {
  return (
    <ChainFig
      label={tt("Structure guides, interaction activates: orientation, then activation, then engagement", "Struktur führt, Interaktion aktiviert: Orientierung, dann Aktivierung, dann Engagement")}
      steps={[
        { h: tt("Orientation", "Orientierung"), b: tt("Structure and navigation: the learner knows where they are and what comes next.", "Struktur und Navigation: Die Lernende weiß, wo sie ist und was als Nächstes kommt."), kind: "a", tag: tt("Structure guides", "Struktur führt") },
        { h: tt("Activation", "Aktivierung"), b: tt("Targeted interaction: the learner answers, applies, decides.", "Gezielte Interaktion: Die Lernende antwortet, wendet an, entscheidet."), kind: "s", tag: tt("Interaction activates", "Interaktion aktiviert") },
        { h: tt("Engagement", "Engagement"), b: tt("Feedback and a next step: the learner carries on and returns.", "Rückmeldung und ein nächster Schritt: Die Lernende macht weiter und kehrt zurück."), kind: "m", tag: tt("Feedback sustains", "Rückmeldung trägt") },
      ]}
      caption={tt("The order matters: interaction on a platform the learner cannot find their way in adds clicks to a lost learner.", "Die Reihenfolge zählt: Interaktion auf einer Plattform, auf der sich die Lernende nicht zurechtfindet, fügt einer verlorenen Lernenden Klicks hinzu.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · guidance against freedom (interactive) */

export function FlexMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: five LearnLoop designs by guidance and freedom · Exploratory", "Ein durchgerechnetes Beispiel: fünf LearnLoop-Entwürfe nach Führung und Freiheit · Explorativ")}
      point={tt("Structure and flexibility pull against each other: too much guidance traps experienced learners, too little loses beginners. A recommended path with free access gives both, and interaction should be capped so that it does not become a burden.", "Struktur und Flexibilität ziehen gegeneinander: Zu viel Führung fesselt erfahrene Lernende, zu wenig verliert Einsteiger. Ein empfohlener Pfad mit freiem Zugang gibt beides, und Interaktion sollte begrenzt sein, damit sie nicht zur Last wird.")}
      title={tt("Five designs of LearnLoop by the guidance the learner gets (to the right) and the freedom they keep (upwards)", "Fünf Entwürfe von LearnLoop nach der Führung, die die Lernende bekommt (nach rechts), und der Freiheit, die sie behält (nach oben)")}
      xLabel={tt("Guidance the learner gets", "Führung, die die Lernende bekommt")}
      yLabel={tt("Freedom the learner keeps", "Freiheit, die die Lernende behält")}
      quads={[tt("Free, but unguided", "Frei, aber ungeführt"), tt("Guided and free: the aim", "Geführt und frei: das Ziel"), tt("Neither", "Keines von beidem"), tt("Guided, but locked in", "Geführt, aber eingesperrt")]}
      points={[
        { id: "a", letter: "A", x: 0.9, y: 0.12, name: tt("A fixed path that cannot be skipped, with a quiz after every page", "Ein fester Pfad, der sich nicht überspringen lässt, mit einem Quiz nach jeder Seite"), reading: tt("Maximum guidance, no freedom. Beginners are safe, but experienced learners are forced through what they know, and the compulsory quizzes become a burden.", "Maximale Führung, keine Freiheit. Einsteiger sind sicher, aber erfahrene Lernende werden durch das gezwungen, was sie kennen, und die Pflichtquizze werden zur Last.") },
        { id: "b", letter: "B", x: 0.1, y: 0.9, name: tt("Everything open, no path, no recommendation", "Alles offen, kein Pfad, keine Empfehlung"), reading: tt("Maximum freedom, no guidance. Experts are happy; beginners cannot tell where to start and many leave.", "Maximale Freiheit, keine Führung. Experten sind zufrieden; Einsteiger können nicht sagen, wo sie anfangen sollen, und viele gehen.") },
        { id: "c", letter: "C", x: 0.82, y: 0.84, name: tt("A recommended path with free access and a skip button", "Ein empfohlener Pfad mit freiem Zugang und einem Überspringen-Button"), reading: tt("Beginners follow the path; experienced learners jump straight to what they need. This is the aim: guided and free.", "Einsteiger folgen dem Pfad; erfahrene Lernende springen direkt zu dem, was sie brauchen. Das ist das Ziel: geführt und frei.") },
        { id: "d", letter: "D", x: 0.62, y: 0.3, name: tt("A guided tour at the first visit that cannot be closed", "Eine geführte Tour beim ersten Besuch, die sich nicht schließen lässt"), reading: tt("It guides, but it cannot be skipped, so it takes freedom away at the moment a learner is most curious.", "Sie führt, lässt sich aber nicht überspringen, nimmt also Freiheit in dem Moment, in dem eine Lernende am neugierigsten ist.") },
        { id: "e", letter: "E", x: 0.15, y: 0.34, name: tt("Three menus with 40 entries and no path", "Drei Menüs mit 40 Einträgen und ohne Pfad"), reading: tt("It looks free, but the learner is lost in choices: no guidance and no real freedom either, because freedom needs an overview.", "Es sieht frei aus, aber die Lernende ist in der Auswahl verloren: keine Führung und auch keine wirkliche Freiheit, denn Freiheit braucht Überblick.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision without behaviour data, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without behaviour data, filled in for LearnLoop", "Eine Entscheidung ohne Verhaltensdaten, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To group the menu into four sections first, and add one question per lesson after that.", "Das Menü zuerst in vier Bereiche zu gruppieren und danach eine Frage pro Lektion zu ergänzen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners find a question after every lesson helpful or intrusive.", "Ob Lernende eine Frage nach jeder Lektion hilfreich oder aufdringlich finden.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("More than 30% of learners skip the question by the end of week 6.", "bis Ende von Woche 6 mehr als 30 % der Lernenden die Frage überspringen.")],
        [tt("I give up", "Ich verzichte auf"), tt("The point system for this half year.", "das Punktesystem in diesem Halbjahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of UX with the head of product.", "Die Leiterin UX mit der Leiterin Produkt.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("A tree test, the skip rate and task success.", "Ein Tree Test, die Überspringrate und der Aufgabenerfolg.")],
      ]}
    />
  );
}
