"use client";

import type { ReactNode } from "react";
import { Bul } from "@/components/materi/kit";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D4 } from "@/components/day4/comicScenes";
import { COMICS_D4 } from "@/data/day4/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { FeedbackPicture, LoyaltyPicture, MetricsPicture, RewardsPicture, SdtVenn, ScreenBuilder, TomQuizzes, WeighExample } from "@/components/day4/diagrams";
import { ControlGroupChart, DecisionFrame, FoggChart, MotivationMatrix } from "@/components/day4/diagramsB";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the diagram is the instrument) →
 * the rules it gives the task (folded) → sources → Mark as read. Example companies: LearnLoop, Tom and Anna; never MotivaLearn, so no task is answered here.
 * Deeper reading sits behind a quiet "Show" row, because no task block needs it.
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
      scan={tt("Learners are motivated by the activity itself or by rewards from outside. Lasting motivation needs three things: autonomy, competence and relatedness.", "Lernende sind durch die Tätigkeit selbst oder durch Belohnungen von außen motiviert. Dauerhafte Motivation braucht drei Dinge: Autonomie, Kompetenz und Zugehörigkeit.")}
      sources={["ryanDeci2000", "deci1999", "lepper1973", "keller1987"]}
      reasoning={[
        tt("Ask of each platform feature or measure: does it support autonomy, competence or relatedness? A feature that supports none of the three probably only decorates.", "Fragen Sie bei jedem Feature und jeder Maßnahme einer Plattform: Stützt es Autonomie, Kompetenz oder Zugehörigkeit? Ein Feature, das keines der drei stützt, schmückt wahrscheinlich nur."),
        tt("Extrinsic rewards can start behaviour but may not sustain it, and expected rewards for something the learner already enjoys can reduce interest.", "Extrinsische Belohnungen können ein Verhalten anstoßen, es aber vielleicht nicht halten, und erwartete Belohnungen für etwas, das die Lernende schon gern tut, können das Interesse senken."),
        tt("Informational feedback (“you can now do X”) supports competence. Pure points for presence do not.", "Informierendes Feedback („Sie können jetzt X“) stützt die Kompetenz. Reine Punkte fürs Dabeisein tun das nicht."),
        tt("Motivation is not the same as gamification: a platform can motivate without any game elements, and a game layer can leave motivation unchanged.", "Motivation ist nicht dasselbe wie Gamification: Eine Plattform kann ohne jedes Spielelement motivieren, und eine Spielschicht kann die Motivation unverändert lassen."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A1} art={ART_D4} />
      <TomQuizzes />
      <SdtVenn />
      <p>
        {tt(
          "The researchers behind this example are real. Lepper, Greene and Nisbett (1973) showed the overjustification effect, and a meta-analysis of 128 experiments by Deci, Koestner and Ryan (1999) found that expected tangible rewards tended to undermine intrinsic motivation, while unexpected rewards and informative praise did not. Tom and the quiz example are made up to show it.",
          "Die Forschenden hinter diesem Beispiel sind echt. Lepper, Greene und Nisbett (1973) zeigten den Overjustification-Effekt, und eine Meta-Analyse von 128 Experimenten von Deci, Koestner und Ryan (1999) fand, dass erwartete materielle Belohnungen die intrinsische Motivation eher untergruben, unerwartete Belohnungen und informatives Lob dagegen nicht. Tom und das Quizbeispiel sind erfunden, um es zu zeigen.",
        )}
      </p>
      <DataTable
        caption={tt("The three needs, the question the learner asks, and what a platform can offer", "Die drei Bedürfnisse, die Frage der Lernenden und was eine Plattform bieten kann")}
        head={[tt("SDT need", "SDT-Bedürfnis"), tt("The question the learner asks", "Die Frage der Lernenden"), tt("What a platform can offer", "Was eine Plattform bieten kann")]}
        rows={[
          [tt("Autonomy", "Autonomie"), tt("Do I choose how and when I learn?", "Wähle ich, wie und wann ich lerne?"), tt("A choice of path or order, a pace of their own, a reason for each step", "Eine Wahl von Pfad oder Reihenfolge, ein eigenes Tempo, ein Grund für jeden Schritt")],
          [tt("Competence", "Kompetenz"), tt("Can I see that I am getting better?", "Sehe ich, dass ich besser werde?"), tt("Clear goals, results with a next step, a record of skills gained", "Klare Ziele, Ergebnisse mit einem nächsten Schritt, eine Übersicht erworbener Fähigkeiten")],
          [tt("Relatedness", "Zugehörigkeit"), tt("Do I belong?", "Gehöre ich dazu?"), tt("Learning with colleagues, a trainer's comment, a visible group", "Lernen mit Kolleginnen, ein Kommentar der Trainerin, eine sichtbare Gruppe")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("Tom and the quiz figures are made up to illustrate the research. The research findings are real; check the sources before you quote them.", "Tom und die Quizzahlen sind erfunden, um die Forschung zu veranschaulichen. Die Forschungsergebnisse sind echt; prüfen Sie die Quellen, bevor Sie sie zitieren.")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Other models you will meet: Keller's ARCS model (1987) lists four conditions for motivation in instruction: attention, relevance, confidence and satisfaction. Fogg's Behavior Model (2009) says a behaviour happens when motivation, ability and a prompt come together; it returns in Materi B1. SDT explains what sustains motivation, Fogg explains why a motivated learner still does not act.", "Andere Modelle, denen Sie begegnen werden: Kellers ARCS-Modell (1987) nennt vier Bedingungen für Motivation im Unterricht: Aufmerksamkeit, Relevanz, Zuversicht und Zufriedenheit. Foggs Verhaltensmodell (2009) sagt, dass ein Verhalten geschieht, wenn Motivation, Können und ein Impuls zusammenkommen; es kehrt in Materi B1 wieder. SDT erklärt, was Motivation trägt, Fogg erklärt, warum eine motivierte Lernende trotzdem nicht handelt.")}</p>
        <p>{tt("Why “intrinsic” is not a feature: you cannot ship intrinsic motivation as a button. You can only remove what blocks it (confusion, boredom, no sign of progress) and offer what feeds it (choice, competence, belonging).", "Warum „intrinsisch“ kein Feature ist: Intrinsische Motivation lässt sich nicht als Button ausliefern. Sie können nur beseitigen, was sie blockiert (Verwirrung, Langeweile, kein Zeichen von Fortschritt), und anbieten, was sie nährt (Wahl, Kompetenz, Zugehörigkeit).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Clarity, activation, feedback, progression and relevance are the five things a motivating learning screen delivers.", "Klarheit, Aktivierung, Feedback, Progression und Relevanz sind die fünf Dinge, die ein motivierender Lernbildschirm liefert.")}
      sources={["keller1987", "csik1990", "locke2002"]}
      reasoning={[
        tt("Sort a difference between two platforms by the principle it delivers or lacks: goal (clarity), doing (activation), result (feedback), progress (progression), reason (relevance).", "Sortieren Sie einen Unterschied zwischen zwei Plattformen nach dem Prinzip, das er liefert oder vermissen lässt: Ziel (Klarheit), Tun (Aktivierung), Ergebnis (Feedback), Fortschritt (Progression), Grund (Relevanz)."),
        tt("A principle of motivation is a sentence with a reason: “Show the learner their progress, because people continue when they can see they are getting somewhere.”", "Ein Motivationsprinzip ist ein Satz mit einem Grund: „Zeigen Sie der Lernenden ihren Fortschritt, weil Menschen weitermachen, wenn sie sehen, dass sie vorankommen.“"),
        tt("Prefer measures that deliver a principle for every learner (a progress bar, a goal sentence) before an extra for some (a badge).", "Bevorzugen Sie Maßnahmen, die ein Prinzip für jede Lernende liefern (einen Fortschrittsbalken, einen Zielsatz), vor einem Extra für einige (einem Badge)."),
        tt("Activation is not the same as more clicking: the learner must do something that relates to the goal.", "Aktivierung ist nicht dasselbe wie mehr Klicken: Die Lernende muss etwas tun, das zum Ziel gehört."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A2} art={ART_D4} />
      <ScreenBuilder />
      <DataTable
        caption={tt("What the learner meets if a principle is missing", "Was die Lernende trifft, wenn ein Prinzip fehlt")}
        head={[tt("Principle", "Prinzip"), tt("If it is missing, the learner meets…", "Fehlt es, trifft die Lernende auf …")]}
        rows={[
          [tt("Clarity and structure", "Klarheit und Struktur"), tt("A page with no stated goal", "Eine Seite ohne genanntes Ziel")],
          [tt("Activation", "Aktivierung"), tt("Pages of reading with nothing to do", "Lesetextseiten, bei denen nichts zu tun ist")],
          [tt("Feedback and reinforcement", "Feedback und Verstärkung"), tt("A silent screen after an answer", "Einen stummen Bildschirm nach einer Antwort")],
          [tt("Progression", "Progression"), tt("No sign of how far they have come", "Kein Zeichen, wie weit sie gekommen sind")],
          [tt("Relevance and context", "Relevanz und Kontext"), tt("Content without a reason", "Inhalt ohne einen Grund")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("Anna and the negotiation course are made up for this example.", "Anna und der Verhandlungskurs sind für dieses Beispiel erfunden.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Challenge and skill: Csikszentmihalyi (1990) described a state of deep engagement, “flow”, that arises when the challenge fits the learner's skill: too easy is boring, too hard is frustrating. Tasks that grow slightly harder as the learner succeeds follow this idea.", "Herausforderung und Können: Csikszentmihalyi (1990) beschrieb einen Zustand tiefen Engagements, „Flow“, der entsteht, wenn die Herausforderung zum Können der Lernenden passt: zu leicht ist langweilig, zu schwer frustrierend. Aufgaben, die mit dem Erfolg der Lernenden etwas schwerer werden, folgen dieser Idee.")}</p>
        <p>{tt("Goals: Locke and Latham (2002) summarise 35 years of research showing that specific, challenging goals lead to better performance than vague ones. A stated unit goal is the learning version of this finding.", "Ziele: Locke und Latham (2002) fassen 35 Jahre Forschung zusammen, die zeigt, dass spezifische, anspruchsvolle Ziele zu besserer Leistung führen als vage. Ein genanntes Einheitsziel ist die Lernversion dieses Befunds.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Feedback that tells the learner what to do next and progress that is honest support competence. Rewards help only when they stay informative.", "Feedback, das der Lernenden sagt, was als Nächstes zu tun ist, und ehrlicher Fortschritt stützen die Kompetenz. Belohnungen helfen nur, wenn sie informativ bleiben.")}
      sources={["hattie2007", "kivetz2006", "nunes2006", "amabile2011", "hamari2014"]}
      reasoning={[
        tt("Give feedback that answers three questions: the goal, the result so far, and the next step. “Well done” alone is not feedback in this sense.", "Geben Sie Feedback, das drei Fragen beantwortet: das Ziel, das Ergebnis bisher und den nächsten Schritt. „Gut gemacht“ allein ist in diesem Sinn kein Feedback."),
        tt("A progress display must show real progress against a clear end. Show the learner what is done and what is left.", "Eine Fortschrittsanzeige muss echten Fortschritt gegen ein klares Ende zeigen. Zeigen Sie der Lernenden, was erledigt ist und was bleibt."),
        tt("Rate a reward by what it says: does it tell the learner something true about their skill, or does it pay them for presence? The second kind carries a risk of overjustification.", "Bewerten Sie eine Belohnung danach, was sie sagt: Sagt sie der Lernenden etwas Wahres über ihr Können, oder bezahlt sie sie fürs Dabeisein? Die zweite Art trägt das Risiko der Overjustification."),
        tt("A measure that adds rewards but leaves a platform without goals, activation and feedback treats the symptom and not the cause.", "Eine Maßnahme, die Belohnungen hinzufügt, aber eine Plattform ohne Ziele, Aktivierung und Feedback lässt, behandelt das Symptom und nicht die Ursache."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A3} art={ART_D4} />
      <FeedbackPicture />
      <RewardsPicture />
      <LoyaltyPicture />
      <Bul
        items={[
          tt("Progress: the goal-gradient effect (Kivetz, Urminsky and Zheng 2006) says people speed up as they approach a goal. A progress bar uses it, but it must be honest.", "Fortschritt: Der Goal-Gradient-Effekt (Kivetz, Urminsky und Zheng 2006) besagt, dass Menschen schneller werden, je näher sie einem Ziel kommen. Ein Fortschrittsbalken nutzt ihn, muss aber ehrlich sein."),
          tt("Small wins: Amabile and Kramer (2011) analysed almost 12,000 diary entries of 238 knowledge workers and found that making progress in meaningful work was the strongest everyday boost to motivation. It concerns workplaces, so it supports the idea without proving it for learning platforms.", "Kleine Erfolge: Amabile und Kramer (2011) werteten fast 12.000 Tagebucheinträge von 238 Wissensarbeitern aus und fanden, dass Fortschritt in sinnvoller Arbeit der stärkste alltägliche Motivationsschub war. Es betrifft Arbeitsplätze, stützt die Idee also, ohne sie für Lernplattformen zu beweisen."),
          tt("Gamification is the use of game elements outside games (Deterding et al. 2011). A review of empirical studies (Hamari, Koivisto and Sarsa 2014) found mostly positive effects that depend on the context and on the user. Day 11 treats it in depth; here, rate it by what it does to the three needs of SDT.", "Gamification ist der Einsatz von Spielelementen außerhalb von Spielen (Deterding et al. 2011). Eine Übersicht empirischer Studien (Hamari, Koivisto und Sarsa 2014) fand meist positive Wirkungen, die vom Kontext und vom Nutzer abhängen. Tag 11 behandelt es ausführlich; bewerten Sie es hier danach, was es mit den drei Bedürfnissen der SDT macht."),
        ]}
      />
      <Extra id="A3">
        <p>{tt("Rewards in a work setting: learners who are paid or required to learn (as many Habmann learners are) already have an extrinsic reason. The design question is then how to add competence and autonomy so that the reason does not stay only external.", "Belohnungen am Arbeitsplatz: Lernende, die fürs Lernen bezahlt oder dazu verpflichtet werden (wie viele Habmann-Lernende), haben schon einen extrinsischen Grund. Die Gestaltungsfrage ist dann, wie man Kompetenz und Autonomie ergänzt, damit der Grund nicht nur äußerlich bleibt.")}</p>
        <p>{tt("Do not mix up engagement and learning: a platform can raise clicks and time spent while learning stays flat. Card A4 returns to this when it asks what to measure.", "Verwechseln Sie Engagement nicht mit Lernen: Eine Plattform kann Klicks und verbrachte Zeit steigern, während das Lernen gleich bleibt. Karte A4 kommt darauf zurück, wenn sie fragt, was man messen soll.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Engagement metrics show what learners do; interviews show why. Use both, and write down what you expect before you change anything.", "Engagement-Kennzahlen zeigen, was Lernende tun; Interviews zeigen, warum. Nutzen Sie beides und schreiben Sie auf, was Sie erwarten, bevor Sie etwas ändern.")}
      sources={["rodden2010", "gothelf2013", "kohavi2020"]}
      reasoning={[
        tt("Pair a metric about behaviour (return rate, tasks done) with a method about reasons (interviews, observation).", "Koppeln Sie eine Kennzahl zum Verhalten (Rückkehrrate, erledigte Aufgaben) mit einer Methode zu den Gründen (Interviews, Beobachtung)."),
        tt("Time spent is ambiguous: a long time can mean interest or confusion. Do not use it alone.", "Verbrachte Zeit ist mehrdeutig: Eine lange Zeit kann Interesse oder Verwirrung bedeuten. Nutzen Sie sie nicht allein."),
        tt("Write the expected effect and the figure before you change anything, so that you can tell whether it worked.", "Schreiben Sie die erwartete Wirkung und die Zahl auf, bevor Sie etwas ändern, damit Sie erkennen können, ob es gewirkt hat."),
        tt("With enough learners, use a control group (an A/B test) so that you know the change, not the season, caused the result.", "Nutzen Sie bei genug Lernenden eine Kontrollgruppe (einen A/B-Test), damit Sie wissen, dass die Änderung und nicht die Jahreszeit das Ergebnis verursacht hat."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A4} art={ART_D4} />
      <MetricsPicture />
      <p>
        {tt(
          "Iterate in three steps: test, analyse, adjust. Before the test, write the hypothesis in a sentence: “We believe that a next-step button will raise the seven-day return rate by five points; we will know when the rate moves against a control group.” Gothelf and Seiden (2013) describe this form. After the test, compare with the baseline and decide: keep, change or stop.",
          "Iterieren Sie in drei Schritten: testen, analysieren, anpassen. Schreiben Sie vor dem Test die Hypothese in einen Satz: „Wir glauben, dass ein Nächster-Schritt-Button die Rückkehrrate nach sieben Tagen um fünf Punkte steigert; wir wissen es, wenn sich die Rate gegen eine Kontrollgruppe bewegt.“ Gothelf und Seiden (2013) beschreiben diese Form. Vergleichen Sie nach dem Test mit der Ausgangslage und entscheiden Sie: behalten, ändern oder stoppen.",
        )}
      </p>
      <Extra id="A4">
        <p>{tt("HEART: Google's HEART framework (Rodden, Hutchinson and Fu 2010) lists happiness, engagement, adoption, retention and task success as categories of user-centred metrics, each with a goal, a signal and a metric. It is a way to avoid choosing a metric only because it is easy to count. Day 16 returns to it.", "HEART: Googles HEART-Framework (Rodden, Hutchinson und Fu 2010) nennt Happiness, Engagement, Adoption, Retention und Task Success als Kategorien nutzerzentrierter Kennzahlen, jeweils mit einem Ziel, einem Signal und einer Kennzahl. Es hilft, eine Kennzahl nicht nur zu wählen, weil sie leicht zu zählen ist. Tag 16 kommt darauf zurück.")}</p>
        <p>{tt("Experiments: Kohavi, Tang and Xu (2020) warn that many ideas do not move the metric they were built for. A control group is how you find out cheaply.", "Experimente: Kohavi, Tang und Xu (2020) warnen, dass viele Ideen die Kennzahl nicht bewegen, für die sie gebaut wurden. Mit einer Kontrollgruppe finden Sie das günstig heraus.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate each measure on how much it supports lasting motivation, what it costs and how it can backfire. Pressure and rewards carry the highest risk.", "Bewerten Sie jede Maßnahme danach, wie sehr sie dauerhafte Motivation stützt, was sie kostet und wie sie nach hinten losgehen kann. Druck und Belohnungen tragen das höchste Risiko.")}
      sources={["ryanDeci2000", "deci1999", "gibbons2018"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €10,000 is Low; €10,000 to €20,000 is Mid; above €20,000 is High.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 10.000 € ist Niedrig; 10.000 € bis 20.000 € ist Mittel; über 20.000 € ist Hoch."),
        tt("Rate motivation impact by the principles it delivers (goal, activation, feedback, progress) for the learners who are leaving, not by how exciting it sounds.", "Bewerten Sie die Motivationswirkung danach, welche Prinzipien sie liefert (Ziel, Aktivierung, Feedback, Fortschritt), für die Lernenden, die gehen, nicht danach, wie aufregend sie klingt."),
        tt("Rate risk by how the measure can backfire: expected rewards that crowd out interest, ranking pressure, loss messages and other manipulation.", "Bewerten Sie das Risiko danach, wie die Maßnahme nach hinten losgehen kann: erwartete Belohnungen, die Interesse verdrängen, Rangdruck, Verlustmeldungen und andere Manipulation."),
        tt("Ask which measure has a lasting effect. A measure that depends on a continuing reward has a weaker lasting effect than one that builds competence.", "Fragen Sie, welche Maßnahme nachhaltig wirkt. Eine Maßnahme, die von einer fortlaufenden Belohnung abhängt, wirkt weniger nachhaltig als eine, die Kompetenz aufbaut."),
        tt("Name what you do not know, for example whether learners leave for lack of progress or lack of time.", "Nennen Sie, was Sie nicht wissen, zum Beispiel ob Lernende wegen fehlenden Fortschritts oder fehlender Zeit gehen."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A5} art={ART_D4} />
      <WeighExample />
      <Bul
        items={[
          tt("Effort is the one rating a rule decides, from the printed cost. Motivation impact and risk are your judgement; give a reason for each.", "Der Aufwand ist die eine Bewertung, die eine Regel aus den gedruckten Kosten entscheidet. Motivationswirkung und Risiko sind Ihr Urteil; begründen Sie beides."),
          tt("A prioritisation matrix plots options on two criteria, for example value to the user against effort (Gibbons 2018). Here you rate three and show them side by side.", "Eine Priorisierungsmatrix ordnet Optionen nach zwei Kriterien, zum Beispiel Nutzerwert gegen Aufwand (Gibbons 2018). Hier bewerten Sie drei und zeigen sie nebeneinander."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.", "LearnLoop, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Motivation is one of three conditions for behaviour. Raising it helps only when the learner is able to act and has a prompt at the right moment.", "Motivation ist eine von drei Bedingungen für Verhalten. Sie zu steigern hilft nur, wenn die Lernende handeln kann und im richtigen Moment einen Impuls hat.")}
      sources={["fogg2009", "hamari2014", "ryanDeci2000"]}
      reasoning={[
        tt("Before adding motivation, check ability and prompt: can the learner find and do the next step in a few minutes, and does something invite them at the right moment?", "Prüfen Sie vor dem Ergänzen von Motivation Können und Impuls: Kann die Lernende den nächsten Schritt in wenigen Minuten finden und tun, und lädt sie im richtigen Moment etwas dazu ein?"),
        tt("Say which of the three conditions each measure of your strategy works on. A strategy that works only on motivation is incomplete.", "Sagen Sie, auf welche der drei Bedingungen jede Maßnahme Ihrer Strategie wirkt. Eine Strategie, die nur auf Motivation wirkt, ist unvollständig."),
        tt("Prefer measures with a lasting effect (goals, competence, clear next steps) over measures that need a continuing reward.", "Bevorzugen Sie Maßnahmen mit nachhaltiger Wirkung (Ziele, Kompetenz, klare nächste Schritte) vor Maßnahmen, die eine fortlaufende Belohnung brauchen."),
        tt("Link every measure to a business figure: retention (return rate), completion, and what it costs.", "Verknüpfen Sie jede Maßnahme mit einer Geschäftszahl: Retention (Rückkehrrate), Completion und was sie kostet."),
      ]}
    >
      <ComicButton comic={COMICS_D4.B1} art={ART_D4} />
      <FoggChart />
      <DataTable
        caption={tt("The three conditions, a typical barrier on a learning platform, and a measure that works on it", "Die drei Bedingungen, eine typische Hürde auf einer Lernplattform und eine Maßnahme, die darauf wirkt")}
        head={[tt("Condition", "Bedingung"), tt("A typical barrier", "Eine typische Hürde"), tt("A measure that works on it", "Eine Maßnahme, die darauf wirkt")]}
        rows={[
          [tt("Motivation", "Motivation"), tt("The learner sees no reason to continue", "Die Lernende sieht keinen Grund weiterzumachen"), tt("A goal sentence, a work example, a sign of progress", "Ein Zielsatz, ein Praxisbeispiel, ein Zeichen von Fortschritt")],
          [tt("Ability", "Können"), tt("The next step is hard to find or too big", "Der nächste Schritt ist schwer zu finden oder zu groß"), tt("A visible “next” button, units of a few minutes", "Ein sichtbarer „Weiter“-Button, Einheiten von wenigen Minuten")],
          [tt("Prompt", "Impuls"), tt("Nothing reminds the learner at a useful moment", "Nichts erinnert die Lernende in einem nützlichen Moment"), tt("A timely, honest reminder with the next step in it", "Eine rechtzeitige, ehrliche Erinnerung mit dem nächsten Schritt darin")],
        ]}
      />
      <p>
        {tt(
          "Where is motivation overestimated? In three places. First, where the barrier is ability or a missing prompt, not motivation. Second, where a reward gives a short rise that fades (a novelty effect): reviews of gamification find results that depend on context and the user (Hamari et al. 2014). Third, where learners are already extrinsically required to learn, as in company training, so that the question is how to add competence and autonomy.",
          "Wo wird Motivation überschätzt? An drei Stellen. Erstens dort, wo die Hürde das Können oder ein fehlender Impuls ist, nicht die Motivation. Zweitens dort, wo eine Belohnung einen kurzen Anstieg gibt, der verfliegt (ein Neuheitseffekt): Übersichten zur Gamification finden Ergebnisse, die vom Kontext und von den Nutzern abhängen (Hamari et al. 2014). Drittens dort, wo Lernende ohnehin extrinsisch zum Lernen verpflichtet sind, wie in der betrieblichen Weiterbildung, sodass die Frage ist, wie man Kompetenz und Autonomie ergänzt.",
        )}
      </p>
      <Extra id="B1">
        <p>{tt("Competitors' motivation features are not evidence. The case says competitors offer more motivating platforms. That is a market fact, not proof that rewards cause retention. Ask which of the competitor's design choices (a clear path, instant feedback) could explain it, and test the one you would copy.", "Motivationsfeatures von Wettbewerbern sind kein Beleg. Der Fall sagt, Wettbewerber böten motivierendere Plattformen. Das ist eine Marktbeobachtung, kein Beweis, dass Belohnungen Retention verursachen. Fragen Sie, welche Gestaltungsentscheidungen des Wettbewerbers (ein klarer Pfad, sofortiges Feedback) es erklären könnten, und testen Sie die, die Sie übernehmen würden.")}</p>
        <p>{tt("Prompts and ethics: a prompt is a reminder, and a reminder that respects the learner's goals (“Your next unit takes four minutes”) is different from one that scolds. Materi B2 draws the line.", "Impulse und Ethik: Ein Impuls ist eine Erinnerung, und eine Erinnerung, die die Ziele der Lernenden respektiert („Ihre nächste Einheit dauert vier Minuten“), ist etwas anderes als eine, die schimpft. Materi B2 zieht die Grenze.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Every motivating element costs attention and can be used against the learner. Weigh motivation against load and against manipulation.", "Jedes motivierende Element kostet Aufmerksamkeit und kann gegen die Lernende eingesetzt werden. Wägen Sie Motivation gegen Belastung und gegen Manipulation ab.")}
      sources={["gray2018", "deci1999", "hamari2014"]}
      reasoning={[
        tt("Name which conflict each measure faces and what each side gets and loses.", "Nennen Sie, welchen Konflikt jede Maßnahme eingeht und was jede Seite bekommt und verliert."),
        tt("A measure that works by pressure (loss messages, rankings of the weakest) is a manipulation risk. Prefer measures the learner would endorse if they saw how they work.", "Eine Maßnahme, die durch Druck wirkt (Verlustmeldungen, Ranglisten der Schwächsten), ist ein Manipulationsrisiko. Bevorzugen Sie Maßnahmen, die die Lernende gutheißen würde, wenn sie sähe, wie sie wirken."),
        tt("A perverse incentive produces the opposite of what you intended: points for opening lessons produce opened but unread lessons. Ask of every reward: what is the cheapest way to earn it, and is that what we want?", "Ein Fehlanreiz erzeugt das Gegenteil dessen, was Sie wollten: Punkte fürs Öffnen von Lektionen erzeugen geöffnete, aber ungelesene Lektionen. Fragen Sie bei jeder Belohnung: Was ist der günstigste Weg, sie zu verdienen, und ist das, was wir wollen?"),
        tt("Judge short-term and long-term effect separately, and say which one your strategy aims at.", "Beurteilen Sie kurzfristige und langfristige Wirkung getrennt und sagen Sie, auf welche Ihre Strategie zielt."),
      ]}
    >
      <ComicButton comic={COMICS_D4.B2} art={ART_D4} />
      <MotivationMatrix />
      <DataTable
        caption={tt("Four conflicts, what each side gets, and a rule for deciding", "Vier Konflikte, was jede Seite bekommt, und eine Regel zum Entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Motivation against overload", "Motivation gegen Überlastung"), tt("An engaging element on every screen", "Ein anregendes Element auf jedem Bildschirm"), tt("A learner whose attention is not split (Day 3)", "Eine Lernende, deren Aufmerksamkeit nicht geteilt ist (Tag 3)"), tt("Add an engaging element only if it supports the screen's goal; remove one for each you add", "Ergänzen Sie ein anregendes Element nur, wenn es das Ziel des Bildschirms stützt; entfernen Sie eines für jedes, das Sie ergänzen")],
          [tt("Motivation against manipulation", "Motivation gegen Manipulation"), tt("A short rise in activity", "Ein kurzer Anstieg der Aktivität"), tt("A learner who trusts the platform and decides for themselves", "Eine Lernende, die der Plattform vertraut und selbst entscheidet"), tt("Test: would you be comfortable explaining the mechanism to the learner? If not, do not ship it", "Test: Wäre es Ihnen angenehm, der Lernenden den Mechanismus zu erklären? Wenn nicht, liefern Sie es nicht aus")],
          [tt("Short-term against long-term", "Kurzfristig gegen langfristig"), tt("A visible lift this month", "Ein sichtbarer Anstieg in diesem Monat"), tt("An effect that lasts after the novelty is gone", "Eine Wirkung, die bleibt, wenn das Neue vorbei ist"), tt("Judge a measure on a later check as well as the first week", "Beurteilen Sie eine Maßnahme auch bei einer späteren Prüfung, nicht nur in der ersten Woche")],
          [tt("Motivation against usability", "Motivation gegen Usability"), tt("A reward or game layer", "Eine Belohnungs- oder Spielschicht"), tt("A fast, plain way to do the task", "Ein schneller, einfacher Weg, die Aufgabe zu erledigen"), tt("Never put a reward between the learner and the task", "Stellen Sie nie eine Belohnung zwischen die Lernende und die Aufgabe")],
        ]}
      />
      <Extra id="B2">
        <p>{tt("Dark patterns: Gray and colleagues (2018) catalogued manipulative strategies in interfaces, such as nagging, forced action and obstruction. Laws on such design are under discussion in Europe and in flux, so check current rules; the design principle is stable: do not make the learner act against their own interest.", "Dark Patterns: Gray und Kollegen (2018) katalogisierten manipulative Strategien in Oberflächen, etwa Dauerdrängeln, erzwungene Handlungen und Behinderung. Gesetze zu solcher Gestaltung werden in Europa diskutiert und sind im Fluss, prüfen Sie also die aktuellen Regeln; das Gestaltungsprinzip ist stabil: Bringen Sie die Lernende nicht dazu, gegen ihr eigenes Interesse zu handeln.")}</p>
        <p>{tt("Motivation against cognitive load: each badge, pop-up and ranking asks for attention. If the learner's working memory is already full (Day 3), an extra motivating element can lower learning. Remove load before adding motivation.", "Motivation gegen kognitive Belastung: Jedes Badge, jedes Pop-up und jede Rangliste verlangt Aufmerksamkeit. Ist das Arbeitsgedächtnis der Lernenden schon voll (Tag 3), kann ein zusätzliches motivierendes Element das Lernen senken. Entfernen Sie Belastung, bevor Sie Motivation ergänzen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("With incomplete data, write down a hypothesis, a metric and a stop condition before you start. Set a rule for how future UX optimisation is decided.", "Schreiben Sie bei unvollständigen Daten vor dem Start eine Hypothese, eine Kennzahl und eine Stopp-Bedingung auf. Legen Sie eine Regel fest, wie künftige UX-Optimierung entschieden wird.")}
      sources={["gothelf2013", "kohavi2020", "klein2007", "rodden2010"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("Measure success with a baseline, a target, a method and a date, written before the change. A metric without a baseline cannot show improvement.", "Messen Sie Erfolg mit einer Ausgangslage, einem Ziel, einer Methode und einem Termin, vor der Änderung aufgeschrieben. Eine Kennzahl ohne Ausgangslage kann keine Verbesserung zeigen."),
        tt("Use a behaviour metric and a reason-giving method together. Time spent and badges earned are not evidence of learning.", "Nutzen Sie eine Verhaltenskennzahl und eine Methode, die Gründe liefert, zusammen. Verbrachte Zeit und verdiente Badges sind kein Beleg für Lernen."),
        tt("Check every reward for perverse incentives before you ship it.", "Prüfen Sie jede Belohnung auf Fehlanreize, bevor Sie sie ausliefern."),
        tt("A decision architecture names who decides and what evidence they need; a senior opinion alone is not evidence.", "Eine Entscheidungsarchitektur nennt, wer entscheidet und welche Belege er braucht; eine hochrangige Meinung allein ist kein Beleg."),
        tt("Giving up nothing means you have not decided: name what you postpone.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben."),
      ]}
    >
      <ComicButton comic={COMICS_D4.B3} art={ART_D4} />
      <ControlGroupChart />
      <DecisionFrame />
      <Bul
        items={[
          tt("A hypothesis with a figure: “We believe that showing progress and a next step will raise the seven-day return rate by five points. We will know when the rate in the test group is five points above the control group after six weeks.”", "Eine Hypothese mit einer Zahl: „Wir glauben, dass das Zeigen von Fortschritt und einem nächsten Schritt die Rückkehrrate nach sieben Tagen um fünf Punkte steigert. Wir wissen es, wenn die Rate in der Testgruppe nach sechs Wochen fünf Punkte über der Kontrollgruppe liegt.“"),
          tt("Two kinds of evidence: a behaviour metric (return rate, tasks per week) and a reason (interviews). Together they show whether the change worked and why.", "Zwei Arten von Belegen: eine Verhaltenskennzahl (Rückkehrrate, Aufgaben pro Woche) und ein Grund (Interviews). Zusammen zeigen sie, ob die Änderung gewirkt hat und warum."),
          tt("A perverse-incentive check: for every reward, write the cheapest way to earn it. If that is not the behaviour you want, change the reward.", "Eine Fehlanreiz-Prüfung: Schreiben Sie für jede Belohnung den günstigsten Weg auf, sie zu verdienen. Ist das nicht das Verhalten, das Sie wollen, ändern Sie die Belohnung."),
          tt("A decision architecture: name a role that decides and the evidence that decision needs, so that optimisation does not follow the loudest opinion.", "Eine Entscheidungsarchitektur: Nennen Sie eine Rolle, die entscheidet, und die Belege, die diese Entscheidung braucht, damit die Optimierung nicht der lautesten Meinung folgt."),
        ]}
      />
      <Extra id="B3">
        <p>{tt("Premortem: Klein's premortem asks the team to imagine that the strategy failed a year from now and to list why. For motivation strategies the typical answers are: learners collected rewards without learning, the metric moved for a reason other than our change, and learners felt pushed. Each answer becomes a check.", "Premortem: Kleins Premortem bittet das Team, sich vorzustellen, die Strategie sei in einem Jahr gescheitert, und aufzulisten, warum. Bei Motivationsstrategien lauten die typischen Antworten: Lernende sammelten Belohnungen, ohne zu lernen, die Kennzahl bewegte sich aus einem anderen Grund als unserer Änderung, und Lernende fühlten sich gedrängt. Jede Antwort wird zu einer Prüfung.")}</p>
        <p>{tt("Small experiments: if the platform has enough learners, an A/B test with a control group is the cleanest way to show an effect; if it has few, use sequential small tests with interviews (see Day 2).", "Kleine Experimente: Hat die Plattform genug Lernende, ist ein A/B-Test mit Kontrollgruppe der sauberste Weg, eine Wirkung zu zeigen; hat sie wenige, nutzen Sie nacheinander kleine Tests mit Interviews (siehe Tag 2).")}</p>
      </Extra>
    </MaterialCard>
  );
}
