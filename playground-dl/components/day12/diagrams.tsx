"use client";

import { MeasureThumb, OppRiskMock, PathMock, PatternMock, TechMock } from "@/components/day12/mocks";
import type { PatternOn } from "@/components/day12/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never AdaptLearn, so no task is answered here. Interactive ones carry
 * "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · identical, adapted with a reason, adapted with none (interactive) */

export function AdaptiveFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop course: identical for all, adapted with a reason, adapted with none · Exploratory · Case assumption", "Derselbe LearnLoop-Kurs: für alle gleich, angepasst mit Grund, angepasst ohne Grund · Explorativ · Fallannahme")}
      point={tt("An adaptive system collects data about what the learner does, analyses it, and adapts the content or the difficulty. Done well, it spares a learner what they know and gives practice where they struggle. Done without a reason, the same adaptation feels like a system that changes things behind the learner's back.", "Ein adaptives System sammelt Daten darüber, was die Lernende tut, analysiert sie und passt Inhalt oder Schwierigkeit an. Gut gemacht erspart es einer Lernenden, was sie kann, und gibt Übung, wo sie sich schwertut. Ohne Grund fühlt sich dieselbe Anpassung an wie ein System, das hinter dem Rücken der Lernenden Dinge ändert.")}
      states={[
        { id: "same", button: tt("The same for everyone", "Für alle gleich"), picture: <PathMock kind="same" />, insight: tt("In plain words: Ravi gets the same four lessons as everyone, including one on basics he already knows. It is clear and cheap, and it ignores how different learners are.", "In einfachen Worten: Ravi bekommt dieselben vier Lektionen wie alle, darunter eine über Grundlagen, die er schon kennt. Es ist klar und günstig und ignoriert, wie verschieden Lernende sind.") },
        { id: "adapted", button: tt("Adapted, with a reason", "Angepasst, mit Grund"), picture: <PathMock kind="adapted" />, insight: tt("In plain words: the basics are skipped and a practice lesson on anchoring is added, and a line says why. Ravi saves time and understands what happened, so he trusts the path.", "In einfachen Worten: Die Grundlagen werden übersprungen und eine Übungslektion zu Ankern ergänzt, und eine Zeile sagt, warum. Ravi spart Zeit und versteht, was geschehen ist, er vertraut dem Pfad also.") },
        { id: "silent", button: tt("Adapted, with no reason", "Angepasst, ohne Grund"), picture: <PathMock kind="silent" />, insight: tt("In plain words: the path is exactly as different, but nothing says why. Ravi wonders where a lesson went and whether the platform is working, and may stop trusting it.", "In einfachen Worten: Der Pfad ist genauso anders, aber nichts sagt, warum. Ravi fragt sich, wohin eine Lektion verschwunden ist und ob die Plattform funktioniert, und vertraut ihr vielleicht nicht mehr.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · rules, a model, too little data (interactive) */

export function TechFig() {
  return (
    <StateFig
      label={tt("The same decision by rules, by a model, and by a model with too little data · Exploratory · Case assumption", "Dieselbe Entscheidung durch Regeln, durch ein Modell und durch ein Modell mit zu wenig Daten · Explorativ · Fallannahme")}
      point={tt("Rules are written by a person, need little data and can be explained to the learner. A model finds patterns in a lot of data, but needs good data and cannot say why. With a small data basis, rules are the safer choice.", "Regeln schreibt ein Mensch, sie brauchen wenig Daten und lassen sich der Lernenden erklären. Ein Modell findet Muster in vielen Daten, braucht aber gute Daten und kann nicht sagen, warum. Bei kleiner Datenbasis sind Regeln die sicherere Wahl.")}
      states={[
        { id: "rules", button: tt("Rules", "Regeln"), picture: <TechMock kind="rules" />, insight: tt("In plain words: two if-then rules decide. Little data is needed, a person can read and change them, and the learner can be told exactly which rule applied.", "In einfachen Worten: Zwei Wenn-dann-Regeln entscheiden. Es braucht wenige Daten, ein Mensch kann sie lesen und ändern, und der Lernenden lässt sich genau sagen, welche Regel galt.") },
        { id: "model", button: tt("A model, lots of data", "Ein Modell, viele Daten"), picture: <TechMock kind="model" />, insight: tt("In plain words: a model learns from thousands of learners and may find patterns no person would. It needs a lot of good data, and nobody can say why it picked a lesson.", "In einfachen Worten: Ein Modell lernt von Tausenden Lernenden und findet vielleicht Muster, die kein Mensch fände. Es braucht viele gute Daten, und niemand kann sagen, warum es eine Lektion gewählt hat.") },
        { id: "thin", button: tt("A model, too little data", "Ein Modell, zu wenig Daten"), picture: <TechMock kind="thin" />, insight: tt("In plain words: with only a dozen examples the model has nothing to learn from, so it guesses, and nobody can tell. This is the case for a small platform.", "In einfachen Worten: Mit nur einem Dutzend Beispielen hat das Modell nichts zum Lernen, es rät also, und niemand kann es erkennen. Das ist der Fall einer kleinen Plattform.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · a path screen that gains four patterns (interactive) */

export function PatternFig() {
  return (
    <SwitchFig
      label={tt("One LearnLoop path screen and four personalisation patterns · Exploratory · Case assumption", "Ein LearnLoop-Pfadbildschirm und vier Personalisierungsmuster · Explorativ · Fallannahme")}
      point={tt("Four UX patterns make a personalised path usable: an individual recommendation, adaptive difficulty, a dynamic path and behaviour-based feedback. Each works when the learner can see it, understand why it appears and change it.", "Vier UX-Muster machen einen personalisierten Pfad nutzbar: eine individuelle Empfehlung, adaptive Schwierigkeit, ein dynamischer Pfad und verhaltensbasiertes Feedback. Jedes wirkt, wenn die Lernende es sehen, verstehen kann, warum es erscheint, und es ändern kann.")}
      switches={[
        { id: "reco", label: tt("Recommendation", "Empfehlung") },
        { id: "difficulty", label: tt("Adaptive difficulty", "Adaptive Schwierigkeit") },
        { id: "path", label: tt("Dynamic path", "Dynamischer Pfad") },
        { id: "feedback", label: tt("Behaviour-based feedback", "Verhaltensbasiertes Feedback") },
      ]}
      start={{ reco: false, difficulty: false, path: false, feedback: false }}
      picture={(on) => <PatternMock on={on as unknown as PatternOn} />}
      insight={(on) => {
        const n = [on.reco, on.difficulty, on.path, on.feedback].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 patterns are on. ${on.reco ? "A recommendation says what to do next and why." : "No recommendation: Ravi must choose alone."} ${on.difficulty ? "The level shows and can be raised." : ""} ${on.path ? "The path shows what was added for him." : "The path is a plain list."} ${on.feedback ? "After a unit he is told what comes next." : ""}`,
          `In einfachen Worten: ${n} von 4 Mustern sind an. ${on.reco ? "Eine Empfehlung sagt, was als Nächstes zu tun ist und warum." : "Keine Empfehlung: Ravi muss allein wählen."} ${on.difficulty ? "Die Stufe wird gezeigt und lässt sich anheben." : ""} ${on.path ? "Der Pfad zeigt, was für ihn ergänzt wurde." : "Der Pfad ist eine schlichte Liste."} ${on.feedback ? "Nach einer Einheit wird ihm gesagt, was kommt." : ""}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A4 · opportunities and risks (static) */

export function OppRiskFig() {
  return <OppRiskMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three personalisation measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Personalisierungsmaßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how much it helps learners, by the work it takes, and by what could go wrong. A reason on every recommendation is light work and safe. A model needs data a small platform does not have, so it carries the highest risk. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, wie sehr sie Lernenden hilft, wie viel Arbeit sie macht und was schiefgehen kann. Ein Grund bei jeder Empfehlung ist wenig Arbeit und sicher. Ein Modell braucht Daten, die eine kleine Plattform nicht hat, es trägt also das höchste Risiko. Geben Sie für jede Bewertung einen Grund.")}
      company="LearnLoop"
      context={tt("a small data basis, three ideas", "eine kleine Datenbasis, drei Ideen")}
      impactLabel={tt("Benefit", "Nutzen")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("A reason on every recommendation", "Ein Grund bei jeder Empfehlung"), thumb: <MeasureThumb kind="explain" />, impact: { level: 3, reason: tt("Learners see why a lesson was chosen, so they trust and use the recommendations.", "Lernende sehen, warum eine Lektion gewählt wurde, vertrauen den Empfehlungen also und nutzen sie.") }, effort: { level: 1, reason: tt("It adds one sentence to what the rules already know: Low.", "Es ergänzt einen Satz zu dem, was die Regeln schon wissen: Niedrig.") }, risk: { level: 1, reason: tt("It only adds words and removes nothing.", "Es ergänzt nur Worte und entfernt nichts.") } },
        { id: "w2", name: tt("A start questionnaire for the level", "Ein Startfragebogen für das Niveau"), thumb: <MeasureThumb kind="questions" />, impact: { level: 2, reason: tt("It starts each learner at the right level, but only as well as the learner answers.", "Es startet jede Lernende auf dem richtigen Niveau, aber nur so gut, wie sie antwortet.") }, effort: { level: 2, reason: tt("The questions have to be written and checked, and the levels defined: Mid.", "Die Fragen müssen geschrieben und geprüft und die Niveaus festgelegt werden: Mittel.") }, risk: { level: 2, reason: tt("Learners may rate themselves wrongly, so the level can be off at the start.", "Lernende können sich falsch einschätzen, das Niveau kann am Anfang also danebenliegen.") } },
        { id: "w3", name: tt("A machine-learning model for the next lesson", "Ein Modell des maschinellen Lernens für die nächste Lektion"), thumb: <MeasureThumb kind="ai" />, impact: { level: 2, reason: tt("It could fit well in theory, but with little data it mostly guesses.", "Es könnte in der Theorie gut passen, rät aber bei wenigen Daten meist.") }, effort: { level: 3, reason: tt("Data has to be collected and cleaned, and a model built, trained and kept running: High.", "Daten müssen gesammelt und bereinigt und ein Modell gebaut, trainiert und betrieben werden: Hoch.") }, risk: { level: 3, reason: tt("A small data basis makes wrong adaptations likely, and nobody could explain them.", "Eine kleine Datenbasis macht falsche Anpassungen wahrscheinlich, und niemand könnte sie erklären.") } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · need, data, technique, adaptation (static) */

export function DesignChain() {
  return (
    <ChainFig
      label={tt("Designing personalisation: need, data, technique, an adaptation the learner can see", "Personalisierung entwerfen: Bedarf, Daten, Technik, eine Anpassung, die die Lernende sehen kann")}
      steps={[
        { h: tt("Learner need", "Bedarf der Lernenden"), b: tt("What does this learner need that others do not?", "Was braucht diese Lernende, was andere nicht brauchen?"), kind: "a", tag: tt("Start here", "Hier beginnen") },
        { h: tt("Data you have", "Daten, die Sie haben"), b: tt("What can you really observe, and is it enough?", "Was können Sie wirklich beobachten, und reicht es?"), kind: "s", tag: tt("Be honest", "Ehrlich sein") },
        { h: tt("Technique", "Technik"), b: tt("The simplest rule or model that fits that data.", "Die einfachste Regel oder das einfachste Modell, das zu diesen Daten passt."), kind: "m", tag: tt("Keep it simple", "Einfach halten") },
        { h: tt("A visible adaptation", "Eine sichtbare Anpassung"), b: tt("The learner sees what changed, why, and can change it.", "Die Lernende sieht, was sich geändert hat, warum, und kann es ändern."), kind: "a", tag: tt("Never skip", "Nie auslassen") },
      ]}
      caption={tt("A clever technique with no visible adaptation is not accepted. Start from the need, not from the technology.", "Eine kluge Technik ohne sichtbare Anpassung wird nicht akzeptiert. Beginnen Sie beim Bedarf, nicht bei der Technologie.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · complexity against understanding (interactive) */

export function ComplexityMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: six LearnLoop ideas by technical complexity and how well the learner understands them · Exploratory", "Ein durchgerechnetes Beispiel: sechs LearnLoop-Ideen nach technischer Komplexität und danach, wie gut die Lernende sie versteht · Explorativ")}
      point={tt("UX and technology pull against each other, and so do personalisation and standardisation. A powerful technique that the learner cannot understand is not better UX. Aim for the simplest technique that the learner understands and that fits the data.", "UX und Technologie ziehen gegeneinander, ebenso Personalisierung und Standardisierung. Eine mächtige Technik, die die Lernende nicht verstehen kann, ist nicht bessere UX. Streben Sie die einfachste Technik an, die die Lernende versteht und die zu den Daten passt.")}
      title={tt("Six LearnLoop ideas by their technical complexity (to the right) and how well the learner understands them (upwards)", "Sechs LearnLoop-Ideen nach ihrer technischen Komplexität (nach rechts) und danach, wie gut die Lernende sie versteht (nach oben)")}
      xLabel={tt("Technical complexity", "Technische Komplexität")}
      yLabel={tt("Learner understands it", "Lernende versteht es")}
      quads={[tt("Simple and clear", "Einfach und klar"), tt("Complex but explained", "Komplex, aber erklärt"), tt("Simple but unclear", "Einfach, aber unklar"), tt("Complex and opaque", "Komplex und undurchsichtig")]}
      points={[
        { id: "a", letter: "A", x: 0.9, y: 0.1, name: tt("A hidden AI that re-orders the path", "Eine versteckte KI, die den Pfad umordnet"), reading: tt("Very complex, and the learner sees only that the path changed. It is powerful and opaque.", "Sehr komplex, und die Lernende sieht nur, dass sich der Pfad geändert hat. Mächtig und undurchsichtig.") },
        { id: "b", letter: "B", x: 0.08, y: 0.78, name: tt("The same path for everyone", "Derselbe Pfad für alle"), reading: tt("As simple as it gets and perfectly clear, but it does not adapt to anyone. Standardisation: cheap and clear, and it ignores differences.", "So einfach wie möglich und völlig klar, passt sich aber niemandem an. Standardisierung: günstig und klar, und sie ignoriert Unterschiede.") },
        { id: "c", letter: "C", x: 0.28, y: 0.88, name: tt("Three rules with a stated reason", "Drei Regeln mit genanntem Grund"), reading: tt("Simple enough to state, and the learner is told which rule applied. It adapts and stays clear. This is the aim for a small data basis.", "Einfach genug, um sie zu nennen, und die Lernende erfährt, welche Regel galt. Es passt an und bleibt klar. Das ist das Ziel bei kleiner Datenbasis.") },
        { id: "d", letter: "D", x: 0.82, y: 0.58, name: tt("A model with a “Why this?” explanation", "Ein Modell mit einer Erklärung „Warum das?“"), reading: tt("Complex, but the learner gets a short reason for each choice. It can work once there is enough good data, and it needs the explanation.", "Komplex, aber die Lernende bekommt zu jeder Wahl einen kurzen Grund. Es kann funktionieren, sobald genug gute Daten da sind, und braucht die Erklärung.") },
        { id: "e", letter: "E", x: 0.4, y: 0.34, name: tt("A start level set silently from three clicks", "Ein Startniveau, still aus drei Klicks gesetzt"), reading: tt("Not complex, but the learner cannot see where the level came from or change it. Simple but unclear.", "Nicht komplex, aber die Lernende kann nicht sehen, woher das Niveau kommt, oder es ändern. Einfach, aber unklar.") },
        { id: "f", letter: "F", x: 0.5, y: 0.7, name: tt("A start level the learner can edit", "Ein Startniveau, das die Lernende ändern kann"), reading: tt("Only a little more complex, and the learner sees and controls it. A good first adaptation.", "Nur wenig komplexer, und die Lernende sieht und steuert es. Eine gute erste Anpassung.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision with an incomplete data basis, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision with an incomplete data basis, filled in for LearnLoop", "Eine Entscheidung bei unvollständiger Datenbasis, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To build two explained rules first and to test them in a prototype with eight learners, and to buy no model yet.", "Zuerst zwei erklärte Regeln zu bauen und sie in einem Prototyp mit acht Lernenden zu testen, und noch kein Modell zu kaufen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners will follow an adapted path or switch it off.", "Ob Lernende einem angepassten Pfad folgen oder ihn ausschalten.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("More than 30% of the test learners switch the adaptation off by the end of month 2.", "mehr als 30 % der Testlernenden die Anpassung bis Ende von Monat 2 ausschalten.")],
        [tt("I give up", "Ich verzichte auf"), tt("The “AI-powered” label that competitors use, for this year.", "das Etikett „KI-gestützt“, das Wettbewerber nutzen, in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the head of learning.", "Die Leiterin Produkt mit der Leiterin Lernen.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("The share who switch off and completion, from the prototype test.", "Der Anteil, der ausschaltet, und der Abschluss, aus dem Prototyptest.")],
      ]}
    />
  );
}
