"use client";

import { Bul } from "@/components/materi/kit";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { DecisionFrame, ExperienceToNumber, LessonScreen, SystemVsLearner, TensionExample, UxUiLayers, WeighExample } from "@/components/day1/diagrams";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the eight study cards (CLAUDE.md #11, #22, #37). Each card: title → scan line → "In plain words" → body (the diagram is the
 * instrument) → the rules it gives the task (folded) → sources → Mark as read. Example companies: LearnLoop; never SkillUp, so no task
 * is answered here.
 */

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("UX is everything a learner goes through; UI is only what they see and touch. A learning platform succeeds or fails on the first.", "UX ist alles, was Lernende durchlaufen; UI ist nur, was sie sehen und anfassen. Eine Lernplattform gelingt oder scheitert am Ersten.")}
      sources={["normanNielsen", "iso924111"]}
      reasoning={[
        tt("Describe a problem as what the learner cannot do, understand or feel (an experience), not as what looks wrong (a surface).", "Beschreiben Sie ein Problem als das, was die Lernenden nicht können, verstehen oder fühlen (ein Erlebnis), nicht als das, was schlecht aussieht (eine Oberfläche)."),
        tt("If a fix changes only colours, icons or fonts, it is a UI fix. It helps the experience only if the experience problem was the surface itself.", "Wenn eine Lösung nur Farben, Icons oder Schriften ändert, ist sie eine UI-Lösung. Sie hilft dem Erlebnis nur, wenn das Erlebnisproblem die Oberfläche selbst war."),
        tt("On a learning platform a UX problem shows up as a learning problem: someone who cannot find, follow or finish a course does not learn.", "Auf einer Lernplattform zeigt sich ein UX-Problem als Lernproblem: Wer einen Kurs nicht findet, nicht verfolgen oder nicht abschließen kann, lernt nicht."),
      ]}
    >
      <UxUiLayers />
      <Bul
        items={[
          tt("UX, in the words of Norman and Nielsen: all aspects of the end user's interaction with the company, its services and its products.", "UX in den Worten von Norman und Nielsen: alle Aspekte der Interaktion der Endnutzer mit dem Unternehmen, seinen Dienstleistungen und Produkten."),
          tt("Learning success is UX success: a learner who cannot find, follow or finish a course has not learned, however good the content is.", "Lernerfolg ist UX-Erfolg: Wer einen Kurs nicht finden, nicht verfolgen oder nicht abschließen kann, hat nicht gelernt, so gut der Inhalt auch ist."),
          tt("A UI can change without the experience changing (new colours), and an experience can be poor behind a polished surface.", "Eine UI kann sich ändern, ohne dass sich das Erlebnis ändert (neue Farben), und ein Erlebnis kann hinter einer polierten Oberfläche schlecht sein."),
        ]}
      />
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A platform organised around its own features confuses learners. One organised around what they want to do guides them.", "Eine Plattform, die um ihre eigenen Funktionen herum organisiert ist, verwirrt Lernende. Eine, die um ihr Tun herum organisiert ist, führt sie.")}
      sources={["iso9241210", "normanNielsen"]}
      reasoning={[
        tt("Ask of each screen or measure: which goal of which user does it serve? One that serves only the system's structure (an admin menu shown to a learner) is a user-centred failure.", "Fragen Sie bei jedem Bildschirm oder jeder Maßnahme: Welches Ziel welcher Nutzer dient sie? Eine, die nur der Struktur des Systems dient (ein Admin-Menü für Lernende), ist ein nutzerzentriertes Versagen."),
        tt("Start from what the learner wants to do, in their words; name the feature afterwards.", "Gehen Sie von dem aus, was die Lernenden tun wollen, in ihren Worten; nennen Sie die Funktion danach."),
        tt("Learners, teachers and organisations want different things. A measure that helps one can burden another, so name who it helps.", "Lernende, Lehrende und Organisationen wollen Verschiedenes. Eine Maßnahme, die einem hilft, kann einen anderen belasten, also benennen Sie, wem sie hilft."),
      ]}
    >
      <SystemVsLearner />
      <DataTable
        caption={tt("Three kinds of users and what each needs", "Drei Arten von Nutzern und was jede braucht")}
        head={[tt("User", "Nutzer"), tt("Their goal", "Ihr Ziel"), tt("What they need from the platform", "Was sie von der Plattform brauchen")]}
        rows={[
          [tt("Learners", "Lernende"), tt("Reach a skill or a qualification in the time they have", "In der verfügbaren Zeit eine Fähigkeit oder Qualifikation erreichen"), tt("A clear path, readable lessons, a sign of progress", "Einen klaren Pfad, lesbare Lektionen, ein Zeichen für Fortschritt")],
          [tt("Teachers", "Lehrende"), tt("Set up and run courses with little effort", "Kurse mit wenig Aufwand einrichten und betreiben"), tt("Simple tools to build, update and see how learners are doing", "Einfache Werkzeuge zum Aufbauen, Aktualisieren und zum Sehen, wie es den Lernenden geht")],
          [tt("Organisations", "Organisationen"), tt("Staff trained, visible completion, costs under control", "Mitarbeitende geschult, sichtbarer Abschluss, Kosten im Griff"), tt("Reports on who finished, certificates, a reliable platform", "Berichte, wer abgeschlossen hat, Zertifikate, eine verlässliche Plattform")],
        ]}
      />
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Three things a learning screen must do: show where you are, ask for no needless effort, and show that you are getting somewhere.", "Drei Dinge muss ein Lernbildschirm leisten: zeigen, wo man ist, keine unnötige Mühe verlangen und zeigen, dass man vorankommt.")}
      sources={["sweller1988", "nielsen1994"]}
      reasoning={[
        tt("Sort a finding by the question it breaks: can the learner tell where they are or what to do next (Orientation), follow what they read (Understanding), or see they are getting somewhere (Motivation)?", "Sortieren Sie einen Befund nach der Frage, die er verletzt: Können die Lernenden erkennen, wo sie sind oder was zu tun ist (Orientierung), folgen, was sie lesen (Verständnis), oder sehen, dass sie vorankommen (Motivation)?"),
        tt("A finding about text length, structure, pictures or unexplained words is about Understanding, even if it also looks like a design choice.", "Ein Befund zu Textlänge, Struktur, Bildern oder unerklärten Wörtern betrifft das Verständnis, auch wenn er wie eine Gestaltungsentscheidung aussieht."),
        tt("A finding about a missing progress bar or no message after a quiz is about Motivation: feedback and progress, not how the screen looks.", "Ein Befund zu einer fehlenden Fortschrittsleiste oder fehlender Meldung nach einem Quiz betrifft die Motivation: Feedback und Fortschritt, nicht das Aussehen des Bildschirms."),
        tt("The drop-out figure is the consequence, not a cause and not an area: it is where the principles failing end up.", "Die Abbruchquote ist die Folge, keine Ursache und kein Bereich: Dort landet es, wenn die Prinzipien verletzt sind."),
      ]}
    >
      <LessonScreen />
      <DataTable
        caption={tt("The three principles, the question each asks and how it typically fails", "Die drei Prinzipien, die Frage jedes einzelnen und wie es typischerweise scheitert")}
        head={[tt("Principle", "Prinzip"), tt("The question", "Die Frage"), tt("A typical failure", "Ein typisches Scheitern")]}
        rows={[
          [tt("Clarity and orientation", "Klarheit und Orientierung"), tt("Can the learner tell where they are, where to start and what comes next?", "Können die Lernenden erkennen, wo sie sind, wo sie anfangen und was als Nächstes kommt?"), tt("Many equal tiles, no “next” button, yesterday's course hidden", "Viele gleiche Kacheln, kein „Weiter“-Button, der Kurs von gestern versteckt")],
          [tt("Low cognitive load", "Geringe kognitive Belastung"), tt("Can the learner follow what they read without extra effort?", "Können die Lernenden dem Gelesenen ohne zusätzliche Mühe folgen?"), tt("A wall of text, unexplained terms, very long sentences", "Eine Textwand, unerklärte Begriffe, sehr lange Sätze")],
          [tt("Feedback and progress", "Feedback und Fortschritt"), tt("Can the learner see they are getting somewhere, and get a sign when they succeed?", "Können die Lernenden sehen, dass sie vorankommen, und bekommen sie ein Zeichen, wenn sie etwas schaffen?"), tt("No progress bar, no message after a quiz", "Keine Fortschrittsleiste, keine Meldung nach einem Quiz")],
        ]}
      />
      <Callout label={tt("Where the ideas come from", "Woher die Ideen kommen")} tone="signal">
        <p>{tt("Sweller's cognitive load theory: working memory is limited, so effort spent decoding a bad screen is missing for learning. Nielsen's heuristic “visibility of system status” asks the system to keep users informed with prompt feedback.", "Swellers Cognitive-Load-Theorie: Das Arbeitsgedächtnis ist begrenzt, also fehlt Mühe, die in das Entziffern eines schlechten Bildschirms fließt, zum Lernen. Nielsens Heuristik „Sichtbarkeit des Systemstatus“ verlangt, dass das System Nutzer mit prompter Rückmeldung informiert.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("A learning platform is not a shopping or banking app: the goal is to change what you know, and learners differ in how much they steer themselves.", "Eine Lernplattform ist keine Shopping- oder Banking-App: Das Ziel ist, zu verändern, was man weiß, und Lernende steuern sich unterschiedlich stark selbst.")}
      sources={["knowles1975"]}
      reasoning={[
        tt("A measure that makes a screen quicker is not automatically better for learning. Remove effort that does not help learning; keep effort that does.", "Eine Maßnahme, die einen Bildschirm schneller macht, ist nicht automatisch besser fürs Lernen. Entfernen Sie Mühe, die nicht beim Lernen hilft; behalten Sie Mühe, die hilft."),
        tt("Ask whether the learner studies alone or with a trainer before you choose: alone, the platform must supply the structure and feedback a trainer would.", "Fragen Sie, ob die Lernenden allein oder mit Trainer lernen, bevor Sie wählen: Allein muss die Plattform die Struktur und das Feedback liefern, die ein Trainer gäbe."),
      ]}
    >
      <DataTable
        caption={tt("A classic app next to a learning platform", "Eine klassische App neben einer Lernplattform")}
        head={[tt("", ""), tt("Classic app (pay, book, buy)", "Klassische App (bezahlen, buchen, kaufen)"), tt("Learning platform", "Lernplattform")]}
        rows={[
          [tt("The goal", "Das Ziel"), tt("A quick task done", "Eine schnelle Aufgabe erledigt"), tt("What someone knows or can do has changed", "Das, was jemand weiß oder kann, hat sich verändert")],
          [tt("The time", "Die Zeit"), tt("Minutes, one visit", "Minuten, ein Besuch"), tt("Weeks, many visits", "Wochen, viele Besuche")],
          [tt("Success looks like", "Erfolg sieht aus wie"), tt("The task is finished", "Die Aufgabe ist erledigt"), tt("The learner finishes and can use it", "Die Lernenden schließen ab und können es anwenden")],
          [tt("Effort", "Mühe"), tt("The less, the better", "Je weniger, desto besser"), tt("Some effort is the point of learning", "Etwas Mühe ist der Sinn des Lernens")],
        ]}
      />
      <DataTable
        caption={tt("Self-directed learners next to guided learners", "Selbstgesteuert Lernende neben geführt Lernenden")}
        head={[tt("", ""), tt("Self-directed (alone, own pace)", "Selbstgesteuert (allein, eigenes Tempo)"), tt("Guided (trainer, schedule)", "Geführt (Trainer, Zeitplan)")]}
        rows={[
          [tt("Who sets the next step", "Wer den nächsten Schritt setzt"), tt("The learner", "Die Lernenden"), tt("The trainer", "Der Trainer")],
          [tt("What the platform must supply", "Was die Plattform liefern muss"), tt("A clear path and feedback on its own", "Einen klaren Pfad und Feedback von sich aus"), tt("Visibility for the trainer, a shared schedule", "Sichtbarkeit für den Trainer, einen gemeinsamen Zeitplan")],
          [tt("Typical failure", "Typisches Scheitern"), tt("Gets lost and stops unnoticed", "Verirrt sich und hört unbemerkt auf"), tt("Waits for instruction that does not come", "Wartet auf Anweisungen, die nicht kommen")],
        ]}
      />
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("To choose under a budget, rate each measure on user impact, effort and risk, put them in order, and say what you do not know.", "Um unter einem Budget zu wählen, bewerten Sie jede Maßnahme nach Nutzerwirkung, Aufwand und Risiko, ordnen Sie sie und sagen Sie, was Sie nicht wissen.")}
      sources={["gibbons2018"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €10,000 is Low; €10,000 to €15,000 is Mid; above €15,000 is High. Do not judge it by how hard it feels.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 10.000 € ist Niedrig; 10.000 € bis 15.000 € ist Mittel; über 15.000 € ist Hoch. Beurteilen Sie ihn nicht danach, wie schwer er sich anfühlt."),
        tt("Rate user impact by the learner's problem the measure meets: a measure that answers a printed finding scores higher than one that answers none.", "Bewerten Sie die Nutzerwirkung danach, welches Problem der Lernenden die Maßnahme trifft: Eine, die einen gedruckten Befund beantwortet, bekommt mehr als eine, die keinen beantwortet."),
        tt("Rate risk by what could go wrong: it backfires (a ranking that discourages), rests on one person, or uses most of the budget for a late result.", "Bewerten Sie das Risiko danach, was schiefgehen kann: Es geht nach hinten los (eine Rangliste, die entmutigt), hängt an einer Person oder verbraucht das meiste Budget für ein spätes Ergebnis."),
        tt("A measure that answers none of the printed findings (a new feature, a new look, more courses) is a weak choice however attractive it sounds.", "Eine Maßnahme, die keinen der gedruckten Befunde beantwortet (eine neue Funktion, ein neues Aussehen, mehr Kurse), ist eine schwache Wahl, so verlockend sie klingt."),
        tt("Put the chosen measures in order and say why the first goes first. Going over budget is allowed with a stated reason; saying nothing about what you do not know is not.", "Bringen Sie die gewählten Maßnahmen in eine Reihenfolge und sagen Sie, warum die erste zuerst kommt. Das Budget zu überschreiten ist mit genanntem Grund erlaubt; nichts darüber zu sagen, was Sie nicht wissen, ist es nicht."),
      ]}
    >
      <WeighExample />
      <Bul
        items={[
          tt("Effort is the one rating a rule decides, from the printed cost. User impact and risk are your judgement; give a reason for each.", "Der Aufwand ist die eine Bewertung, die eine Regel aus den gedruckten Kosten entscheidet. Nutzerwirkung und Risiko sind Ihr Urteil; begründen Sie beides."),
          tt("A prioritisation matrix plots options on two criteria, for example value to the user against effort (Gibbons 2018). Here you rate three, and show them side by side.", "Eine Priorisierungsmatrix ordnet Optionen nach zwei Kriterien, zum Beispiel Nutzerwert gegen Aufwand (Gibbons 2018). Hier bewerten Sie drei und zeigen sie nebeneinander."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its 30%, its costs and its reasons are made up for this example. SkillUp's numbers are in the task.", "LearnLoop, seine 30 %, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Die Zahlen von SkillUp stehen in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("For an EdTech company, UX decides whether learners finish and come back, and that is what the business earns from.", "Für ein EdTech-Unternehmen entscheidet UX, ob Lernende abschließen und wiederkommen, und davon lebt das Geschäft.")}
      sources={["normanNielsen", "iso924111"]}
      reasoning={[
        tt("Argue a UX decision in the business's numbers: which of completion rate, retention or engagement does it move, and how do you expect to see it?", "Begründen Sie eine UX-Entscheidung in den Zahlen des Geschäfts: Welche von Completion Rate, Retention oder Engagement bewegt sie, und woran erwarten Sie, es zu sehen?"),
        tt("A competitor with an easier platform is a business risk, not a design detail: learners and the companies that pay for them can switch.", "Ein Wettbewerber mit einer leichteren Plattform ist ein Geschäftsrisiko, kein Gestaltungsdetail: Lernende und die Firmen, die für sie zahlen, können wechseln."),
        tt("A number such as a drop-out rate counts who left, not why. Treat it as a symptom until you know the cause.", "Eine Zahl wie die Abbruchquote zählt, wer gegangen ist, nicht warum. Behandeln Sie sie als Symptom, bis Sie die Ursache kennen."),
      ]}
    >
      <ExperienceToNumber />
      <DataTable
        caption={tt("Three numbers a learning business watches", "Drei Zahlen, die ein Lerngeschäft beobachtet")}
        head={[tt("Number", "Zahl"), tt("It counts", "Sie zählt"), tt("UX moves it by", "UX bewegt sie durch")]}
        rows={[
          [tt("Completion rate", "Completion Rate"), tt("Of those who start a course, how many finish", "Von denen, die einen Kurs beginnen, wie viele abschließen"), tt("A clear path, lessons you can follow", "Einen klaren Pfad, Lektionen, denen man folgen kann")],
          [tt("Retention", "Retention"), tt("How many come back for the next lesson, course or year", "Wie viele für die nächste Lektion, den nächsten Kurs oder das nächste Jahr wiederkommen"), tt("Visible progress, a good last experience", "Sichtbaren Fortschritt, ein gutes letztes Erlebnis")],
          [tt("Engagement", "Engagement"), tt("How much learners do while they are there", "Wie viel Lernende tun, solange sie da sind"), tt("Tasks and feedback that invite the next step", "Aufgaben und Feedback, die zum nächsten Schritt einladen")],
        ]}
      />
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("In every UX decision goals pull against each other. Name the conflict, say what each side gets and loses, then decide.", "Bei jeder UX-Entscheidung ziehen Ziele gegeneinander. Benennen Sie den Konflikt, sagen Sie, was jede Seite bekommt und verliert, und entscheiden Sie dann.")}
      sources={["gibbons2018", "iso9241210"]}
      reasoning={[
        tt("Name the conflict in one sentence with two legitimate sides (for example depth of content against time to finish) before you decide.", "Benennen Sie den Konflikt in einem Satz mit zwei berechtigten Seiten (zum Beispiel Inhaltstiefe gegen Zeit zum Abschließen), bevor Sie entscheiden."),
        tt("A decision that gives each side something is not the same as one that serves nobody. Say what each side gets and what it loses.", "Eine Entscheidung, die jeder Seite etwas gibt, ist nicht dasselbe wie eine, die niemandem dient. Sagen Sie, was jede Seite bekommt und was sie verliert."),
        tt("A growth goal reached by features learners cannot find does not reach growth: check whether the business goal depends on the user goal.", "Ein Wachstumsziel, das über Funktionen verfolgt wird, die Lernende nicht finden, erreicht kein Wachstum: Prüfen Sie, ob das Geschäftsziel vom Nutzerziel abhängt."),
        tt("Order decisions by what unlocks the others, usually a fix every learner meets (orientation) before an extra.", "Ordnen Sie Entscheidungen danach, was die anderen freischaltet, meist eine Lösung, auf die jede Lernende trifft (Orientierung), vor einem Extra."),
      ]}
    >
      <TensionExample />
      <Bul
        items={[
          tt("The plan's own example of a conflict: usability against depth of content against time pressure. A simple screen is easy to use but may carry less depth; depth takes time the learner may not have.", "Das Beispiel des Plans selbst für einen Zielkonflikt: Usability gegen Inhaltstiefe gegen Zeitdruck. Ein einfacher Bildschirm ist leicht zu bedienen, trägt aber vielleicht weniger Tiefe; Tiefe braucht Zeit, die die Lernenden vielleicht nicht haben."),
          tt("At management level a second conflict appears: what is best for the user, what is cheap to build, and what the business asks for.", "Auf Managementebene kommt ein zweiter Konflikt dazu: was für die Nutzer am besten ist, was billig zu bauen ist und was das Geschäft verlangt."),
        ]}
      />
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you must decide without the data you want, state what you decide, what you do not know, when you would reverse it, and what you give up.", "Wenn Sie ohne die gewünschten Daten entscheiden müssen, nennen Sie, was Sie entscheiden, was Sie nicht wissen, wann Sie es zurücknähmen und worauf Sie verzichten.")}
      sources={["klein2007", "gibbons2018"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition is checkable when it has a figure and a time (“below 25% after six weeks”), not when it is a feeling (“if it does not work”).", "Eine Rückgängig-Bedingung ist prüfbar, wenn sie eine Zahl und eine Zeit hat („unter 25 % nach sechs Wochen“), nicht, wenn sie ein Gefühl ist („wenn es nicht klappt“)."),
        tt("Prefer the decision you can undo cheaply while you learn; let the rest wait.", "Bevorzugen Sie die Entscheidung, die Sie günstig zurücknehmen können, während Sie lernen; lassen Sie den Rest warten."),
        tt("A rule for future UX decisions names who decides and what evidence they need, so that a decision does not rest on one person's taste.", "Eine Regel für künftige UX-Entscheidungen nennt, wer entscheidet und welche Belege er braucht, damit eine Entscheidung nicht am Geschmack einer Person hängt."),
        tt("Giving up nothing means you have not decided: name the thing you postpone.", "Nichts aufzugeben heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben."),
      ]}
    >
      <DecisionFrame />
      <Bul
        items={[
          tt("A premortem (Klein 2007) helps with the risk: imagine the plan has failed and ask why. It brings risks to the surface before the money is spent.", "Ein Premortem (Klein 2007) hilft beim Risiko: Stellen Sie sich vor, der Plan sei gescheitert, und fragen Sie, warum. So kommen Risiken ans Licht, bevor das Geld ausgegeben ist."),
          tt("The plan's coaching says it plainly: UX is not a design problem but a decision problem.", "Das Coaching des Plans sagt es klar: UX ist kein Designproblem, sondern ein Entscheidungsproblem."),
        ]}
      />
    </MaterialCard>
  );
}
