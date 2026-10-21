"use client";

import { HypLoopMock, KpiMock, MeasureThumb, ReadMock, SeeMock } from "@/components/day16/mocks";
import type { KpiOn } from "@/components/day16/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never DataLearn, so no task is answered here. Interactive ones carry
 * "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · one drop-out figure: numbers, observation, a comparison (interactive) */

export function SeeFig() {
  return (
    <StateFig
      label={tt("One LearnLoop drop-out figure seen as a number, by watching, and by comparing · Exploratory · Case assumption", "Eine LearnLoop-Abbruchzahl als Zahl, durch Zusehen und durch Vergleichen gesehen · Explorativ · Fallannahme")}
      point={tt("UX testing finds out how people really behave. Quantitative methods, such as counting or an A/B test, tell you how many and which version is better. Qualitative methods, such as watching a few people, tell you why. You usually need both.", "UX-Testing findet heraus, wie sich Menschen wirklich verhalten. Quantitative Methoden, etwa Zählen oder ein A/B-Test, sagen Ihnen, wie viele und welche Fassung besser ist. Qualitative Methoden, etwa wenigen Menschen zuzusehen, sagen Ihnen, warum. Sie brauchen meist beides.")}
      states={[
        { id: "numbers", button: tt("The number", "Die Zahl"), picture: <SeeMock kind="numbers" />, insight: tt("In plain words: 70% leave in the first week. That is clear and it matters, and it says nothing about why they leave.", "In einfachen Worten: 70 % gehen in der ersten Woche. Das ist klar und wichtig, und es sagt nichts darüber, warum sie gehen.") },
        { id: "observe", button: tt("Watch a learner", "Einer Lernenden zusehen"), picture: <SeeMock kind="observe" />, insight: tt("In plain words: watching Sam, the team sees him stop at the quiz because he cannot find the Save button. That is a reason, though from only one person.", "In einfachen Worten: Beim Zusehen sieht das Team, wie Sam am Quiz hängenbleibt, weil er den Speichern-Button nicht findet. Das ist ein Grund, wenn auch von nur einer Person.") },
        { id: "ab", button: tt("Compare two versions", "Zwei Fassungen vergleichen"), picture: <SeeMock kind="ab" />, insight: tt("In plain words: the quiz with a visible Save button keeps 70 of 100 learners against 62 of 100. The team now knows the change works, and by how much.", "In einfachen Worten: Das Quiz mit sichtbarem Speichern-Button hält 70 von 100 Lernenden gegenüber 62 von 100. Das Team weiß nun, dass die Änderung wirkt, und um wie viel.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · a dashboard that gains four fixes (interactive) */

export function KpiFig() {
  return (
    <SwitchFig
      label={tt("One LearnLoop dashboard and four fixes · Exploratory · Case assumption", "Ein LearnLoop-Dashboard und vier Korrekturen · Explorativ · Fallannahme")}
      point={tt("A KPI is one key figure chosen to show whether a goal is reached. It works when there are only a few, each has a definition and a target, and the figure can be split to show where the problem is. Many undefined metrics hide the one that matters.", "Eine KPI ist eine Kennzahl, die gewählt wird, um zu zeigen, ob ein Ziel erreicht wird. Sie funktioniert, wenn es nur wenige gibt, jede eine Definition und ein Ziel hat und sich die Zahl aufteilen lässt, um zu zeigen, wo das Problem liegt. Viele undefinierte Kennzahlen verbergen die, die zählt.")}
      switches={[
        { id: "few", label: tt("Only three KPIs", "Nur drei KPIs") },
        { id: "defined", label: tt("A definition under each", "Eine Definition unter jeder") },
        { id: "target", label: tt("A target for each", "Ein Ziel für jede") },
        { id: "split", label: tt("A split by device", "Eine Aufteilung nach Gerät") },
      ]}
      start={{ few: false, defined: false, target: false, split: false }}
      picture={(on) => <KpiMock on={on as unknown as KpiOn} />}
      insight={(on) => {
        const n = [on.few, on.defined, on.target, on.split].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 fixes are on. ${on.few ? "Three numbers stand out, so Mia knows where to look." : "A wall of small metrics, and none stands out."} ${on.defined ? "Each says what it counts." : ""} ${on.target ? "Each has a target, so it can be judged." : ""} ${on.split ? "Splitting by device shows that phone learners leave more." : "Nothing shows where the drop-out concentrates."}`,
          `In einfachen Worten: ${n} von 4 Korrekturen sind an. ${on.few ? "Drei Zahlen stechen hervor, Mia weiß also, wohin sie schauen soll." : "Eine Wand aus kleinen Kennzahlen, und keine sticht hervor."} ${on.defined ? "Jede sagt, was sie zählt." : ""} ${on.target ? "Jede hat ein Ziel, kann also beurteilt werden." : ""} ${on.split ? "Die Aufteilung nach Gerät zeigt, dass Handy-Lernende häufiger gehen." : "Nichts zeigt, wo sich die Abbrüche konzentrieren."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A3 · one figure read as a jump, as causes, as a tested hypothesis (interactive) */

export function ReadFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop figure read as a jump, as a list of causes, and as a tested hypothesis · Exploratory · Case assumption", "Dieselbe LearnLoop-Zahl als Sprung, als Liste von Ursachen und als getestete Hypothese gelesen · Explorativ · Fallannahme")}
      point={tt("Data shows symptoms, not causes. A symptom such as 70% drop-out has many possible causes. Jumping to one of them without a test is the commonest misreading. A hypothesis, a testable guess, turns a guess into something that can be checked.", "Daten zeigen Symptome, nicht Ursachen. Ein Symptom wie 70 % Abbrüche hat viele mögliche Ursachen. Zu einer von ihnen ohne Test zu springen ist die häufigste Fehldeutung. Eine Hypothese, eine prüfbare Vermutung, macht aus einer Vermutung etwas, das sich prüfen lässt.")}
      states={[
        { id: "jump", button: tt("A jump to one cause", "Ein Sprung zu einer Ursache"), picture: <ReadMock kind="jump" />, insight: tt("In plain words: the team reads 70% and says the content is too hard. Nothing was checked, so the team rewrites three lessons and the drop-out does not move.", "In einfachen Worten: Das Team liest 70 % und sagt, der Inhalt sei zu schwer. Nichts wurde geprüft, also schreibt das Team drei Lektionen um, und die Abbrüche bewegen sich nicht.") },
        { id: "causes", button: tt("A list of causes", "Eine Liste von Ursachen"), picture: <ReadMock kind="causes" />, insight: tt("In plain words: the same 70% could come from content that is too hard, a long sign-up form, a slow page or a course that is not what people expected. The list keeps the question open.", "In einfachen Worten: Dieselben 70 % könnten von zu schwerem Inhalt, einem langen Anmeldeformular, einer langsamen Seite oder einem Kurs kommen, der nicht das ist, was Menschen erwarteten. Die Liste hält die Frage offen.") },
        { id: "tested", button: tt("A tested hypothesis", "Eine getestete Hypothese"), picture: <ReadMock kind="tested" />, insight: tt("In plain words: the team picks one cause, writes it as a hypothesis and tests it. A form with three fields keeps 47% against 40%, so the form is a real cause.", "In einfachen Worten: Das Team wählt eine Ursache, formuliert sie als Hypothese und testet sie. Ein Formular mit drei Feldern hält 47 % gegenüber 40 %, das Formular ist also eine echte Ursache.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · a hypothesis loop (static) */

export function HypLoopFig() {
  return <HypLoopMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three data-based measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei datenbasierte Maßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how much it would move the KPI or the team's ability to move it, by the work it takes, and by what could go wrong. Defining three KPIs is light work and prepares everything else. A wall of charts takes a lot of work and moves no KPI. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, wie stark sie die KPI oder die Fähigkeit des Teams, sie zu bewegen, beeinflussen würde, wie viel Arbeit sie macht und was schiefgehen kann. Drei KPIs zu definieren ist wenig Arbeit und bereitet alles andere vor. Eine Wand aus Diagrammen macht viel Arbeit und bewegt keine KPI. Geben Sie für jede Bewertung einen Grund.")}
      company="LearnLoop"
      context={tt("learners leave early, three ideas", "Lernende gehen früh, drei Ideen")}
      impactLabel={tt("KPI impact", "KPI-Wirkung")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("Define three KPIs with a target each", "Drei KPIs mit je einem Ziel definieren"), thumb: <MeasureThumb kind="kpi" />, impact: { level: 3, reason: tt("The team finally knows which number to move and when it has succeeded.", "Das Team weiß endlich, welche Zahl zu bewegen ist und wann es Erfolg hatte.") }, effort: { level: 1, reason: tt("It only agrees definitions and targets in a few meetings: Low.", "Es legt nur Definitionen und Ziele in wenigen Besprechungen fest: Niedrig.") }, risk: { level: 1, reason: tt("It only agrees definitions and targets.", "Es legt nur Definitionen und Ziele fest.") } },
        { id: "w2", name: tt("Five usability tests where learners leave", "Fünf Usability-Tests dort, wo Lernende gehen"), thumb: <MeasureThumb kind="test" />, impact: { level: 2, reason: tt("It finds real causes for the screens tested, though only for those screens.", "Es findet echte Ursachen für die getesteten Bildschirme, aber nur für diese.") }, effort: { level: 2, reason: tt("Five learners have to be found, watched and the results written up: Mid.", "Fünf Lernende müssen gefunden, beobachtet und die Ergebnisse aufgeschrieben werden: Mittel.") }, risk: { level: 2, reason: tt("Five learners show the main hurdles, not every one.", "Fünf Lernende zeigen die Haupthürden, nicht jede.") } },
        { id: "w3", name: tt("A real-time wall dashboard with forty charts", "Ein Echtzeit-Wanddashboard mit vierzig Diagrammen"), thumb: <MeasureThumb kind="dash" />, impact: { level: 1, reason: tt("More charts show more numbers, but no new insight into why learners leave.", "Mehr Diagramme zeigen mehr Zahlen, aber keine neue Einsicht, warum Lernende gehen.") }, effort: { level: 3, reason: tt("Forty charts have to be built, fed with live data and kept running: High.", "Vierzig Diagramme müssen gebaut, mit Live-Daten gespeist und betrieben werden: Hoch.") }, risk: { level: 3, reason: tt("It adds to the noise, and the team may feel it is acting on data when it is only looking.", "Es fügt Rauschen hinzu, und das Team kann meinen, es handle auf Daten, während es nur hinschaut.") } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · KPI, hypothesis, test, decision (static) */

export function SystemChain() {
  return (
    <ChainFig
      label={tt("A data-driven system: KPI, hypothesis, test, decision", "Ein datengetriebenes System: KPI, Hypothese, Test, Entscheidung")}
      steps={[
        { h: tt("KPI", "KPI"), b: tt("One defined figure with a target says what matters.", "Eine definierte Zahl mit einem Ziel sagt, was zählt."), kind: "a", tag: tt("Start here", "Hier beginnen") },
        { h: tt("Hypothesis", "Hypothese"), b: tt("We believe …, so we will …, and expect …", "Wir glauben …, also werden wir …, und erwarten …"), kind: "s", tag: tt("A testable guess", "Eine prüfbare Vermutung") },
        { h: tt("Test", "Test"), b: tt("One change at a time, with real learners and a comparison.", "Eine Änderung nach der anderen, mit echten Lernenden und einem Vergleich."), kind: "m", tag: tt("The evidence", "Der Beleg") },
        { h: tt("Decision", "Entscheidung"), b: tt("Keep, change or drop, by a rule agreed in advance.", "Behalten, ändern oder verwerfen, nach einer vorab vereinbarten Regel."), kind: "a", tag: tt("Data → insight → decision", "Daten → Erkenntnis → Entscheidung") },
      ]}
      caption={tt("Data is a basis for decisions, not a substitute for thinking. Skip the hypothesis and the test has nothing to answer.", "Daten sind eine Grundlage für Entscheidungen, kein Ersatz fürs Denken. Lassen Sie die Hypothese aus, und der Test hat nichts zu beantworten.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · amount of data against insight into causes (interactive) */

export function InsightMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: six LearnLoop approaches by the data they use and the insight into causes they give · Exploratory", "Ein durchgerechnetes Beispiel: sechs LearnLoop-Ansätze nach den Daten, die sie nutzen, und der Einsicht in Ursachen, die sie geben · Explorativ")}
      point={tt("More data is not more insight, and intuition alone is not enough. Look for the approach that uses enough data and gives a real insight into causes. Data shows what happened; judgement still decides what to try.", "Mehr Daten sind nicht mehr Erkenntnis, und Intuition allein genügt nicht. Suchen Sie den Ansatz, der genug Daten nutzt und eine echte Einsicht in Ursachen gibt. Daten zeigen, was geschah; Urteil entscheidet weiterhin, was versucht wird.")}
      title={tt("Six LearnLoop approaches by the amount of data they use (to the right) and the insight into causes they give (upwards)", "Sechs LearnLoop-Ansätze nach der Menge an Daten, die sie nutzen (nach rechts), und der Einsicht in Ursachen, die sie geben (nach oben)")}
      xLabel={tt("Amount of data used", "Menge der genutzten Daten")}
      yLabel={tt("Insight into causes", "Einsicht in Ursachen")}
      quads={[tt("Light and insightful", "Leicht und aufschlussreich"), tt("Rich and insightful: the aim", "Reich und aufschlussreich: das Ziel"), tt("Light and blind", "Leicht und blind"), tt("Heavy and blind", "Schwer und blind")]}
      points={[
        { id: "a", letter: "A", x: 0.9, y: 0.1, name: tt("Track everything and look for patterns", "Alles erfassen und nach Mustern suchen"), reading: tt("A great deal of data and no question, so the patterns found mean little. Heavy and blind.", "Sehr viele Daten und keine Frage, die gefundenen Muster bedeuten also wenig. Schwer und blind.") },
        { id: "b", letter: "B", x: 0.08, y: 0.14, name: tt("Decide by gut feeling alone", "Allein nach Bauchgefühl entscheiden"), reading: tt("No data and no test: the team cannot tell whether a guess was right. Light and blind.", "Keine Daten und kein Test: Das Team kann nicht sagen, ob eine Vermutung stimmte. Leicht und blind.") },
        { id: "c", letter: "C", x: 0.46, y: 0.88, name: tt("Three KPIs, a hypothesis and a test", "Drei KPIs, eine Hypothese und ein Test"), reading: tt("Little data, aimed at one question, and a test that answers it. A real insight into a cause. This is the aim.", "Wenige Daten, auf eine Frage gerichtet, und ein Test, der sie beantwortet. Eine echte Einsicht in eine Ursache. Das ist das Ziel.") },
        { id: "d", letter: "D", x: 0.62, y: 0.8, name: tt("The numbers plus five learner interviews", "Die Zahlen plus fünf Lernenden-Interviews"), reading: tt("The data says where, and the interviews say why. A good combination of numbers and UX understanding.", "Die Daten sagen, wo, und die Interviews sagen, warum. Eine gute Verbindung von Zahlen und UX-Verständnis.") },
        { id: "e", letter: "E", x: 0.84, y: 0.28, name: tt("A real-time wall of forty charts", "Eine Echtzeit-Wand aus vierzig Diagrammen"), reading: tt("A great deal on show and little understood: it looks like insight and gives none.", "Sehr viel zu sehen und wenig verstanden: Es sieht nach Erkenntnis aus und gibt keine.") },
        { id: "f", letter: "F", x: 0.3, y: 0.34, name: tt("“Time on page” as the only KPI", "„Verweildauer“ als einzige KPI"), reading: tt("One number that is easy to collect and misleading: a tab left open overnight counts as success. Light and misleading.", "Eine Zahl, die leicht zu erfassen und irreführend ist: Ein über Nacht offener Tab zählt als Erfolg. Leicht und irreführend.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision with unclear causes, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision with unclear causes, filled in for LearnLoop", "Eine Entscheidung bei unklaren Ursachen, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To define three KPIs and to test the shorter sign-up form first, before I buy any new tool.", "Drei KPIs zu definieren und zuerst das kürzere Anmeldeformular zu testen, bevor ich ein neues Werkzeug kaufe.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether the form is the main reason people leave.", "Ob das Formular der Hauptgrund ist, warum Menschen gehen.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("First-week drop-out has not fallen from 60% to below 55% by the end of month 2.", "die Abbrüche der ersten Woche bis Ende von Monat 2 nicht von 60 % auf unter 55 % gefallen sind.")],
        [tt("I give up", "Ich verzichte auf"), tt("The live wall of charts, for this year.", "die Live-Wand aus Diagrammen, in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the head of learning.", "Die Leiterin Produkt mit der Leiterin Lernen.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("The first-week drop-out and the result of the test.", "Die Abbrüche der ersten Woche und das Ergebnis des Tests.")],
      ]}
    />
  );
}
