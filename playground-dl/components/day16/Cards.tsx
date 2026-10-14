"use client";

import type { ReactNode } from "react";
import { DecisionFrame, HypLoopFig, InsightMatrix, KpiFig, ReadFig, SeeFig, SystemChain, WeighExample } from "@/components/day16/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Sam, Mia; never DataLearn, so no task is answered here.
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
      scan={tt("UX testing shows how people really behave. Quantitative tests (counting, A/B) say how many and which is better; qualitative tests (watching a few) say why. You usually need both.", "UX-Testing zeigt, wie sich Menschen wirklich verhalten. Quantitative Tests (Zählen, A/B) sagen, wie viele und was besser ist; qualitative Tests (wenigen zusehen) sagen, warum. Sie brauchen meist beides.")}
      sources={["nielsen2000", "kohavi2020", "rodden2010"]}
      reasoning={[
        tt("Use a usability test to find where and why people get stuck: five to eight learners do set tasks while someone watches.", "Nutzen Sie einen Usability-Test, um zu finden, wo und warum Menschen hängenbleiben: Fünf bis acht Lernende lösen vorgegebene Aufgaben, während jemand zuschaut."),
        tt("Use an A/B test to find which of two versions works better: the same learners are split at random and the figures compared.", "Nutzen Sie einen A/B-Test, um zu finden, welche von zwei Fassungen besser wirkt: Dieselben Lernenden werden zufällig aufgeteilt und die Zahlen verglichen."),
        tt("Use observation to learn about real contexts, for example how people use the platform on their own phones.", "Nutzen Sie Beobachtung, um echte Kontexte kennenzulernen, zum Beispiel wie Menschen die Plattform auf ihren eigenen Handys nutzen."),
        tt("Say which kind it is: qualitative gives reasons from few people; quantitative gives amounts from many. A figure alone never says why.", "Sagen Sie, welcher Art es ist: Qualitativ gibt Gründe von wenigen Menschen; quantitativ gibt Mengen von vielen. Eine Zahl allein sagt nie, warum."),
        tt("Combine the two: use figures to find where, and watching to find why.", "Verbinden Sie beide: Nutzen Sie Zahlen, um zu finden, wo, und Zusehen, um zu finden, warum."),
      ]}
    >
      <SeeFig />
      <DataTable
        caption={tt("Three test methods, and what each shows", "Drei Testmethoden und was jede zeigt")}
        head={[tt("Method", "Methode"), tt("Kind", "Art"), tt("What it shows", "Was sie zeigt")]}
        rows={[
          [tt("Usability test", "Usability-Test"), tt("Qualitative", "Qualitativ"), tt("Where and why a few people get stuck.", "Wo und warum wenige Menschen hängenbleiben.")],
          [tt("A/B test", "A/B-Test"), tt("Quantitative", "Quantitativ"), tt("Which of two versions does better, and by how much.", "Welche von zwei Fassungen besser abschneidet und um wie viel.")],
          [tt("Observation", "Beobachtung"), tt("Qualitative", "Qualitativ"), tt("How people behave in their real setting.", "Wie sich Menschen in ihrer echten Umgebung verhalten.")],
        ]}
      />
      {CA("LearnLoop and Sam are made up for this example. The rule of thumb of five users for a usability test is Nielsen's, and the A/B test is described by Kohavi and colleagues; check the figures before you use them in a document.", "LearnLoop und Sam sind für dieses Beispiel erfunden. Die Faustregel von fünf Nutzern für einen Usability-Test stammt von Nielsen, und der A/B-Test wird von Kohavi und Kollegen beschrieben; prüfen Sie die Zahlen, bevor Sie sie in einem Dokument nutzen.")}
      <Extra id="A1">
        <p>{tt("An A/B test needs enough learners in each group for the difference to mean something. A small difference between 20 and 22 learners is noise, so the size of the groups belongs in the plan.", "Ein A/B-Test braucht genug Lernende in jeder Gruppe, damit der Unterschied etwas bedeutet. Ein kleiner Unterschied zwischen 20 und 22 Lernenden ist Rauschen, die Größe der Gruppen gehört also in den Plan.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Tracking records clicks, time and drop-off; data protection sets limits. A KPI is one key figure with a definition and a target, such as completion rate, engagement or drop-out rate.", "Tracking erfasst Klicks, Zeit und Absprünge; der Datenschutz setzt Grenzen. Eine KPI ist eine Kennzahl mit Definition und Ziel, etwa Abschlussquote, Engagement oder Abbruchquote.")}
      sources={["rodden2010", "gdpr", "croll2013", "few2013"]}
      reasoning={[
        tt("Sort a fact as a measuring problem when the trouble is in what is tracked or how it is defined: too many metrics, a metric with no definition, a metric that does not measure what its name says, tracking beyond need or without notice.", "Ordnen Sie einen Fakt als Messproblem ein, wenn die Not darin liegt, was erfasst oder wie es definiert wird: zu viele Kennzahlen, eine Kennzahl ohne Definition, eine Kennzahl, die nicht misst, was ihr Name sagt, Tracking über den Bedarf hinaus oder ohne Hinweis."),
        tt("Define a KPI with a name, a definition (what exactly is counted) and a target; keep the main ones to about three.", "Definieren Sie eine KPI mit einem Namen, einer Definition (was genau gezählt wird) und einem Ziel; halten Sie die Haupt-KPIs bei etwa drei."),
        tt("Prefer KPIs that show an outcome and tie to behaviour: completion rate, first-week drop-out rate, seven-day return rate. Page views and total registered users show use or only rise.", "Bevorzugen Sie KPIs, die ein Ergebnis zeigen und an Verhalten gebunden sind: Abschlussquote, Abbruchquote der ersten Woche, Sieben-Tage-Rückkehrrate. Seitenaufrufe und registrierte Nutzer insgesamt zeigen Nutzung oder steigen nur."),
        tt("Check that a metric measures what it claims: engagement as a count of clicks, or time spent as the time a tab is open, may not show attention or learning.", "Prüfen Sie, ob eine Kennzahl misst, was sie behauptet: Engagement als Klickzahl oder Verweildauer als Zeit, in der ein Tab offen ist, zeigen vielleicht weder Aufmerksamkeit noch Lernen."),
        tt("Collect only what a question needs, tell users what is tracked and get consent where it is required (GDPR); tracking with names and no notice is a problem.", "Erfassen Sie nur, was eine Frage braucht, sagen Sie Nutzern, was erfasst wird, und holen Sie Einwilligung ein, wo sie verlangt ist (DSGVO); Tracking mit Namen und ohne Hinweis ist ein Problem."),
      ]}
    >
      <KpiFig />
      <DataTable
        caption={tt("Three common KPIs, how to define each, and a trap", "Drei gängige KPIs, wie man jede definiert, und eine Falle")}
        head={[tt("KPI", "KPI"), tt("A definition", "Eine Definition"), tt("A trap", "Eine Falle")]}
        rows={[
          [tt("Completion rate", "Abschlussquote"), tt("Learners who finish a course, out of those who started it.", "Lernende, die einen Kurs beenden, von denen, die ihn begonnen haben."), tt("Counting only those who stayed to the end.", "Nur die zu zählen, die bis zum Ende blieben.")],
          [tt("Engagement", "Engagement"), tt("A stated behaviour, for example learners who return within seven days.", "Ein benanntes Verhalten, zum Beispiel Lernende, die binnen sieben Tagen zurückkehren."), tt("Defining it as clicks, which may mean nothing.", "Es als Klicks zu definieren, was nichts bedeuten kann.")],
          [tt("Drop-out rate", "Abbruchquote"), tt("Learners who leave within a stated time, out of those who started.", "Lernende, die binnen einer genannten Zeit gehen, von denen, die begonnen haben."), tt("Leaving the time frame open, so figures cannot be compared.", "Den Zeitrahmen offen zu lassen, sodass Zahlen nicht vergleichbar sind.")],
        ]}
      />
      {CA("LearnLoop and Mia are made up for this example. The HEART framework (Rodden et al. 2010) is one way to choose UX metrics; the GDPR sets the rules for personal data in the EU, and which apply to a case depends on the data, so check before relying on it.", "LearnLoop und Mia sind für dieses Beispiel erfunden. Das HEART-Rahmenwerk (Rodden et al. 2010) ist ein Weg, UX-Kennzahlen zu wählen; die DSGVO setzt die Regeln für personenbezogene Daten in der EU, und welche für einen Fall gelten, hängt von den Daten ab, prüfen Sie es also, bevor Sie sich darauf verlassen.")}
      <Extra id="A2">
        <p>{tt("A heatmap shows where people click or how far they scroll on a page, as colour. It shows where, not why, so it is a starting point for a question and not an answer. A vanity metric is a number that looks good and does not guide a decision, such as total registered users.", "Eine Heatmap zeigt als Farbe, wo Menschen auf einer Seite klicken oder wie weit sie scrollen. Sie zeigt, wo, nicht warum, sie ist also ein Ausgangspunkt für eine Frage und keine Antwort. Eine Eitelkeitskennzahl ist eine Zahl, die gut aussieht und keine Entscheidung leitet, etwa die Gesamtzahl registrierter Nutzer.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Data shows symptoms, not causes. Look for several possible causes, never jump from a number to an explanation, compare only like with like, and turn a guess into a testable hypothesis.", "Daten zeigen Symptome, nicht Ursachen. Suchen Sie mehrere mögliche Ursachen, springen Sie nie von einer Zahl zu einer Erklärung, vergleichen Sie nur Gleiches mit Gleichem und machen Sie aus einer Vermutung eine prüfbare Hypothese.")}
      sources={["ries2011", "kohavi2020", "nielsen2000"]}
      reasoning={[
        tt("Sort a fact as a reading problem when a conclusion is drawn that the data does not support: a symptom taken for a cause, or two periods compared that are not alike.", "Ordnen Sie einen Fakt als Leseproblem ein, wenn ein Schluss gezogen wird, den die Daten nicht stützen: ein Symptom, als Ursache genommen, oder zwei Zeiträume verglichen, die nicht gleich sind."),
        tt("Tell a symptom from a cause: a symptom is what the data shows (70% leave); a cause is why, and the data alone rarely says it.", "Unterscheiden Sie ein Symptom von einer Ursache: Ein Symptom ist, was die Daten zeigen (70 % gehen); eine Ursache ist, warum, und die Daten allein sagen es selten."),
        tt("Before acting, list several possible causes for a number, such as a long form, a slow page or a mismatch with expectations, and only then choose which to test.", "Listen Sie vor dem Handeln mehrere mögliche Ursachen für eine Zahl auf, etwa ein langes Formular, eine langsame Seite oder ein Missverhältnis zu den Erwartungen, und wählen Sie erst dann, welche getestet wird."),
        tt("Compare like with like: the same weekdays, the same type of learner, no holiday against a normal period.", "Vergleichen Sie Gleiches mit Gleichem: dieselben Wochentage, dieselbe Art von Lernenden, keinen Feiertag gegen einen normalen Zeitraum."),
        tt("Write a hypothesis in the form “we believe …, so we will …, and expect …”, with a figure, and change one thing at a time so that the effect can be seen.", "Schreiben Sie eine Hypothese in der Form „wir glauben …, also werden wir …, und erwarten …“, mit einer Zahl, und ändern Sie eine Sache nach der anderen, damit sich die Wirkung sehen lässt."),
      ]}
    >
      <ReadFig />
      <DataTable
        caption={tt("Three misreadings, and how to avoid each", "Drei Fehldeutungen und wie man jede vermeidet")}
        head={[tt("Misreading", "Fehldeutung"), tt("Example", "Beispiel"), tt("How to avoid it", "Wie man sie vermeidet")]}
        rows={[
          [tt("A symptom taken for a cause", "Ein Symptom, als Ursache genommen"), tt("“70% leave, so the content is too hard.”", "„70 % gehen, also ist der Inhalt zu schwer.“"), tt("List several causes and test one.", "Mehrere Ursachen auflisten und eine testen.")],
          [tt("Unlike periods compared", "Ungleiche Zeiträume verglichen"), tt("A rise called a success; last month had a holiday.", "Ein Anstieg als Erfolg genannt; der letzte Monat hatte einen Feiertag."), tt("Compare like with like.", "Gleiches mit Gleichem vergleichen.")],
          [tt("Many changes at once", "Viele Änderungen auf einmal"), tt("Five launches in a month; which one worked?", "Fünf Starts in einem Monat; welcher hat gewirkt?"), tt("One change per cycle, with a hypothesis.", "Eine Änderung je Zyklus, mit einer Hypothese.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example. The idea of turning a guess into a testable hypothesis follows the lean approach of build, measure, learn (Ries 2011).", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden. Die Idee, eine Vermutung in eine prüfbare Hypothese zu verwandeln, folgt dem Lean-Ansatz aus Bauen, Messen, Lernen (Ries 2011).")}
      <Extra id="A3">
        <p>{tt("Correlation is not causation: two figures that move together may both be driven by a third. A rise in logins and a rise in drop-out in the same month may both come from a marketing campaign that brought many casual visitors.", "Korrelation ist nicht Kausalität: Zwei Zahlen, die sich gemeinsam bewegen, können beide von einer dritten getrieben sein. Ein Anstieg der Anmeldungen und ein Anstieg der Abbrüche im selben Monat können beide von einer Marketingkampagne kommen, die viele beiläufige Besucher brachte.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Data-driven optimisation is a loop: hypothesis, test, evaluate, decide, and back to a new hypothesis. One change at a time, with each result starting the next guess.", "Datengetriebene Optimierung ist ein Kreislauf: Hypothese, Test, Auswerten, Entscheiden und zurück zu einer neuen Hypothese. Eine Änderung nach der anderen, wobei jedes Ergebnis die nächste Vermutung startet.")}
      sources={["ries2011", "kohavi2020"]}
      reasoning={[
        tt("Run the loop in short cycles of about two weeks, one change each.", "Führen Sie den Kreislauf in kurzen Zyklen von etwa zwei Wochen durch, mit je einer Änderung."),
        tt("Decide by a rule agreed in advance: keep, change or drop the change.", "Entscheiden Sie nach einer vorab vereinbarten Regel: die Änderung behalten, ändern oder verwerfen."),
        tt("Keep going: every result starts the next hypothesis.", "Machen Sie weiter: Jedes Ergebnis startet die nächste Hypothese."),
      ]}
    >
      <HypLoopFig />
      {CA("LearnLoop is the example company.", "LearnLoop ist das Beispielunternehmen.")}
      <Extra id="A4">
        <p>{tt("A decision rule agreed before the test, such as “keep the change if first-week drop-out falls by at least three points”, stops the team from arguing about the result afterwards.", "Eine vor dem Test vereinbarte Entscheidungsregel, etwa „die Änderung behalten, wenn die Abbrüche der ersten Woche um mindestens drei Punkte sinken“, hindert das Team daran, hinterher über das Ergebnis zu streiten.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how much it would move the KPI or the team's ability to move it, what it costs and what could go wrong. Define what matters first, then look for causes, and show data last.", "Bewerten Sie eine Maßnahme danach, wie stark sie die KPI oder die Fähigkeit des Teams, sie zu bewegen, beeinflussen würde, was sie kostet und was schiefgehen kann. Legen Sie zuerst fest, was zählt, suchen Sie dann Ursachen, und zeigen Sie Daten zuletzt.")}
      sources={["gibbons2018", "rodden2010"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €7,000 is Low; €7,000 to €14,000 is Mid; above €14,000 is High.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 7.000 € ist Niedrig; 7.000 € bis 14.000 € ist Mittel; über 14.000 € ist Hoch."),
        tt("Rate KPI impact by how far it would move the drop-out or completion rate, or the team's ability to do so: a measure that fixes a cause or sharpens the KPI outweighs one that only shows more numbers.", "Bewerten Sie die KPI-Wirkung danach, wie weit sie die Abbruch- oder Abschlussquote bewegen würde, oder die Fähigkeit des Teams dazu: Eine Maßnahme, die eine Ursache behebt oder die KPI schärft, wiegt schwerer als eine, die nur mehr Zahlen zeigt."),
        tt("Rate risk by what could go wrong: the team reading the data wrongly again, noise from more charts, a test on too few learners, a privacy problem.", "Bewerten Sie das Risiko danach, was schiefgehen kann: dass das Team die Daten wieder falsch liest, Rauschen durch mehr Diagramme, ein Test mit zu wenigen Lernenden, ein Datenschutzproblem."),
        tt("Justify the order with data, then insight, then decision: say how your first measure turns data into an insight.", "Begründen Sie die Reihenfolge mit Daten, dann Erkenntnis, dann Entscheidung: Sagen Sie, wie Ihre erste Maßnahme Daten in eine Erkenntnis verwandelt."),
        tt("Say what you do not know, for example where the drop-out concentrates, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel wo sich die Abbrüche konzentrieren, und wie Sie es herausfinden würden."),
      ]}
    >
      <WeighExample />
      {CA("LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.", "LearnLoop, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("UX can be a measurable and controllable system: a KPI says what matters, a hypothesis says what will change it, a test checks the guess, and a decision follows. Data leads to insight, and insight to a decision.", "UX kann ein messbares und steuerbares System sein: Eine KPI sagt, was zählt, eine Hypothese sagt, was sie verändern wird, ein Test prüft die Vermutung, und eine Entscheidung folgt. Daten führen zu Erkenntnis, und Erkenntnis zu einer Entscheidung.")}
      sources={["ries2011", "rodden2010", "gdpr", "kohavi2020"]}
      reasoning={[
        tt("Decide on a strategy that starts from a question: define three KPIs, write a hypothesis for each change, change one thing at a time, and track only what the hypotheses need. Reject “track everything” (it repeats the misreading and is a privacy risk) and “decide on intuition” (it gives up the measurable system).", "Entscheiden Sie sich für eine Strategie, die von einer Frage ausgeht: Definieren Sie drei KPIs, schreiben Sie für jede Änderung eine Hypothese, ändern Sie eine Sache nach der anderen und erfassen Sie nur, was die Hypothesen brauchen. Verwerfen Sie „alles erfassen“ (es wiederholt die Fehldeutung und ist ein Datenschutzrisiko) und „nach Intuition entscheiden“ (es gibt das messbare System auf)."),
        tt("Plan the analysis and tracking: split drop-out by week, device and course; combine numbers with tests with real learners; tell users what is tracked and get consent; write down each KPI's definition and owner.", "Planen Sie Analyse und Tracking: Teilen Sie Abbrüche nach Woche, Gerät und Kurs auf; verbinden Sie Zahlen mit Tests mit echten Lernenden; sagen Sie Nutzern, was erfasst wird, und holen Sie Einwilligung ein; schreiben Sie Definition und Verantwortliche jeder KPI auf."),
        tt("Sort a statement as a testable hypothesis only if it names a change and an expected effect, ideally with a figure; “we should improve the UX” and “the new menu is better” are not hypotheses.", "Ordnen Sie eine Aussage nur dann als prüfbare Hypothese ein, wenn sie eine Änderung und eine erwartete Wirkung nennt, idealerweise mit einer Zahl; „wir sollten die UX verbessern“ und „das neue Menü ist besser“ sind keine Hypothesen."),
        tt("Build a decision architecture: a role decides, on a named figure or test, by a rule agreed before the result, and says what intuition still decides.", "Bauen Sie eine Entscheidungsarchitektur: Eine Rolle entscheidet, auf einer benannten Zahl oder einem Test, nach einer vor dem Ergebnis vereinbarten Regel, und sagt, was die Intuition weiterhin entscheidet."),
        tt("Say what you do not know and how to find out: which screen causes most of the drop-out.", "Sagen Sie, was Sie nicht wissen und wie Sie es herausfinden: welcher Bildschirm die meisten Abbrüche verursacht."),
      ]}
    >
      <SystemChain />
      <DataTable
        caption={tt("The test for each link of the chain", "Der Test für jedes Glied der Kette")}
        head={[tt("Link", "Glied"), tt("The test", "Der Test"), tt("What goes wrong without it", "Was ohne ihn schiefgeht")]}
        rows={[
          [tt("KPI", "KPI"), tt("Does it have a name, a definition and a target?", "Hat sie einen Namen, eine Definition und ein Ziel?"), tt("Nobody knows what to move.", "Niemand weiß, was zu bewegen ist.")],
          [tt("Hypothesis", "Hypothese"), tt("Does it name a change and an expected effect?", "Nennt sie eine Änderung und eine erwartete Wirkung?"), tt("The test has nothing to answer.", "Der Test hat nichts zu beantworten.")],
          [tt("Test", "Test"), tt("One change at a time, with a comparison?", "Eine Änderung nach der anderen, mit einem Vergleich?"), tt("Effects cannot be told apart.", "Wirkungen lassen sich nicht unterscheiden.")],
          [tt("Decision", "Entscheidung"), tt("Is the rule agreed before the result?", "Ist die Regel vor dem Ergebnis vereinbart?"), tt("The result is argued about afterwards.", "Über das Ergebnis wird hinterher gestritten.")],
        ]}
      />
      {CA("The chain follows the plan's goal: understand UX as a measurable and controllable system. LearnLoop is the example company. Data protection rules apply to tracking; for a real case they must be checked.", "Die Kette folgt dem Ziel des Plans: UX als messbares und steuerbares System zu verstehen. LearnLoop ist das Beispielunternehmen. Datenschutzregeln gelten für Tracking; für einen realen Fall müssen sie geprüft werden.")}
      <Extra id="B1">
        <p>{tt("A decision architecture is the set of agreements about who decides what, on which evidence and by which rule. It makes decisions repeatable, so that they depend less on whoever is in the room.", "Eine Entscheidungsarchitektur ist die Gesamtheit der Vereinbarungen darüber, wer was auf welcher Grundlage und nach welcher Regel entscheidet. Sie macht Entscheidungen wiederholbar, sodass sie weniger davon abhängen, wer gerade im Raum ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("More data is not more insight, and intuition alone is not enough. Look for an approach that uses enough data and gives a real insight into causes; data is a basis for decisions, not a substitute for thinking.", "Mehr Daten sind nicht mehr Erkenntnis, und Intuition allein genügt nicht. Suchen Sie einen Ansatz, der genug Daten nutzt und eine echte Einsicht in Ursachen gibt; Daten sind eine Grundlage für Entscheidungen, kein Ersatz fürs Denken.")}
      sources={["rodden2010", "ries2011", "klein2007"]}
      reasoning={[
        tt("Name both poles: too much data and no question (a wall of charts, tracking everything), and no data at all (gut feeling). A plan that names only one pole has not weighed the conflict.", "Nennen Sie beide Pole: zu viele Daten und keine Frage (eine Wand aus Diagrammen, alles erfassen) und gar keine Daten (Bauchgefühl). Ein Plan, der nur einen Pol nennt, hat den Konflikt nicht abgewogen."),
        tt("Aim for little data aimed at a question: three KPIs, a hypothesis, a test; add learner interviews to learn why.", "Streben Sie wenige, auf eine Frage gerichtete Daten an: drei KPIs, eine Hypothese, einen Test; ergänzen Sie Lernenden-Interviews, um zu erfahren, warum."),
        tt("Beware a single easy number, such as time on page: it can mislead, so pair every KPI with an outcome.", "Hüten Sie sich vor einer einzigen leichten Zahl, etwa der Verweildauer: Sie kann täuschen, koppeln Sie also jede KPI an ein Ergebnis."),
        tt("Keep judgement where data cannot decide: which hypothesis to test first, how a message should sound, what the product stands for.", "Behalten Sie das Urteil dort, wo Daten nicht entscheiden können: welche Hypothese zuerst getestet wird, wie eine Meldung klingen soll, wofür das Produkt steht."),
      ]}
    >
      <InsightMatrix />
      <DataTable
        caption={tt("Two conflicts and a rule for deciding each", "Zwei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Data against intuition", "Daten gegen Intuition"), tt("Decisions by figures alone", "Entscheidungen allein nach Zahlen"), tt("Decisions by judgement alone", "Entscheidungen allein nach Urteil"), tt("Use data as the basis; keep judgement for what data cannot say.", "Nutzen Sie Daten als Grundlage; behalten Sie das Urteil für das, was Daten nicht sagen können.")],
          [tt("More data against more insight", "Mehr Daten gegen mehr Erkenntnis"), tt("Track and show everything", "Alles erfassen und zeigen"), tt("A few figures tied to a question", "Wenige Zahlen, an eine Frage gebunden"), tt("Collect only what a hypothesis needs.", "Erfassen Sie nur, was eine Hypothese braucht.")],
        ]}
      />
      {CA("LearnLoop and its six approaches are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sechs Ansätze sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}
      <Extra id="B2">
        <p>{tt("Optimising a metric can harm the goal behind it: if time on page is rewarded, pages get slower. The remedy is to pair each KPI with an outcome and with a test, so that the number cannot rise alone.", "Eine Kennzahl zu optimieren kann dem Ziel dahinter schaden: Wird die Verweildauer belohnt, werden Seiten langsamer. Das Mittel ist, jede KPI an ein Ergebnis und an einen Test zu koppeln, damit die Zahl nicht allein steigen kann.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When the causes are unclear, test the most likely one cheaply, write a figure you can watch into the plan, agree the decision rule before the result, and say what you give up.", "Wenn die Ursachen unklar sind, testen Sie die wahrscheinlichste günstig, schreiben Sie eine beobachtbare Zahl in den Plan, vereinbaren Sie die Entscheidungsregel vor dem Ergebnis und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "kohavi2020"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “first-week drop-out has not fallen from 60% to below 55% by the end of month 2”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „die Abbrüche der ersten Woche sind bis Ende von Monat 2 nicht von 60 % auf unter 55 % gefallen“."),
        tt("Start with the most likely and cheapest cause to test, such as the sign-up form, and agree what result would count as success before you look.", "Beginnen Sie mit der wahrscheinlichsten und günstigsten Ursache zum Testen, etwa dem Anmeldeformular, und vereinbaren Sie, welches Ergebnis als Erfolg zählt, bevor Sie hinschauen."),
        tt("Do not wait for perfect data: waiting while drop-out grows is also a decision.", "Warten Sie nicht auf perfekte Daten: Zu warten, während die Abbrüche wachsen, ist auch eine Entscheidung."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example a new tool or a live dashboard.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel ein neues Werkzeug oder ein Live-Dashboard."),
      ]}
    >
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision with unclear causes safer", "Fünf Wege, eine Entscheidung bei unklaren Ursachen sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Test the likely cause cheaply", "Die wahrscheinliche Ursache günstig testen"), tt("A shorter sign-up form for half of the learners, compared with the rest.", "Ein kürzeres Anmeldeformular für die Hälfte der Lernenden, verglichen mit dem Rest.")],
          [tt("Agree the rule first", "Zuerst die Regel vereinbaren"), tt("“Keep it if drop-out falls by five points.” Written down before the test.", "„Behalten, wenn die Abbrüche um fünf Punkte sinken.“ Vor dem Test aufgeschrieben.")],
          [tt("Set a figure and a date", "Eine Zahl und ein Datum festlegen"), tt("The drop-out you expect, and the month you will look.", "Die Abbrüche, die Sie erwarten, und der Monat, in dem Sie nachsehen.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}
      <Extra id="B3">
        <p>{tt("Premortem: imagine the strategy failed. Typical answers here: we misread the data again, we collected more than anyone could read, and we optimised a number and not the learner. Each answer becomes a check.", "Premortem: Stellen Sie sich vor, die Strategie sei gescheitert. Typische Antworten hier: Wir lasen die Daten wieder falsch, wir erfassten mehr, als jemand lesen konnte, und wir optimierten eine Zahl und nicht die Lernende. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: a test behind a switch is a two-way door; storing every click for good is a one-way door that is hard to undo.", "Einbahn- und Zweiwegtüren: Ein Test hinter einem Schalter ist eine Zweiwegtür; jeden Klick dauerhaft zu speichern ist eine Einbahntür, die schwer rückgängig zu machen ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}
