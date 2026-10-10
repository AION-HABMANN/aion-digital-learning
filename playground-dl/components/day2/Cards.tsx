"use client";

import { Bul } from "@/components/materi/kit";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { AdaptiveLevels, AdaptiveLoop, BuildMeasureLearn, DecisionFrame, FeatureMatrix, FidelityLadder, FiveUsers, PilotControl, QualVsQuant, StagedInvestment, SuccessVsFailing, WeighExample } from "@/components/day2/diagrams";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the eight study cards (CLAUDE.md #11, #22, #37, #51). Each card: title → scan line → "In plain words" → body (the diagram is the
 * instrument) → the rules it gives the task (folded) → sources → Mark as read. Example company: LearnLoop; never LearnPro, so no task is answered
 * here. Deeper reading sits behind a quiet "Show" row, because no task block needs it.
 */

const Extra = ({ id, children }: { id: string; children: React.ReactNode }) => (
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
      scan={tt("Learners finish platforms that show the way, break content into short units and answer every effort with feedback. Platforms that lack these lose learners early.", "Lernende schließen Plattformen ab, die den Weg zeigen, Inhalte in kurze Einheiten gliedern und jede Mühe mit Feedback beantworten. Plattformen, denen das fehlt, verlieren Lernende früh.")}
      sources={["jordan2015", "nielsen1994"]}
      reasoning={[
        tt("Sort a platform feature by the question it answers: what comes next (learning path), how long will this take (short units), how am I doing (feedback). A feature that answers none of the three is probably not a success factor.", "Sortieren Sie eine Funktion einer Plattform nach der Frage, die sie beantwortet: was als Nächstes kommt (Lernpfad), wie lange es dauert (kurze Einheiten), wie es mir geht (Feedback). Eine Funktion, die keine der drei beantwortet, ist wahrscheinlich kein Erfolgsfaktor."),
        tt("A difference between two platforms is a difference of practice only if you can name which of the three practices it belongs to. “It looks nicer” is a UI difference, not a practice.", "Ein Unterschied zwischen zwei Plattformen ist nur dann ein Unterschied der Praxis, wenn Sie nennen können, zu welcher der drei Praktiken er gehört. „Es sieht schöner aus“ ist ein UI-Unterschied, keine Praxis."),
        tt("Write a principle of success as a sentence with a reason: “Show the learner the next step, because a learner who has to search for it may stop.”", "Schreiben Sie ein Erfolgsprinzip als Satz mit einem Grund: „Zeigen Sie den Lernenden den nächsten Schritt, weil eine Lernende, die ihn suchen muss, aufhören kann.“"),
        tt("Engagement, completion and guidance are results and conditions, not features. Do not list “completion” as a difference between platforms; it is what the differences lead to.", "Engagement, Completion und Führung sind Ergebnisse und Bedingungen, keine Funktionen. Nennen Sie „Completion“ nicht als Unterschied zwischen Plattformen; sie ist das, wozu die Unterschiede führen."),
      ]}
    >
      <SuccessVsFailing />
      <p>
        {tt(
          "Let us look at the three practices one at a time, because each answers a question that every learner asks without saying it. A clear learning path answers “what do I do next?”. Short units answer “can I do this in the time I have?”. Feedback answers “am I getting somewhere, and did I get it right?”. When one of the three is missing, the learner has to supply the answer alone, and many do not.",
          "Sehen wir uns die drei Praktiken nacheinander an, denn jede beantwortet eine Frage, die jede Lernende stellt, ohne sie auszusprechen. Ein klarer Lernpfad beantwortet „Was tue ich als Nächstes?“. Kurze Einheiten beantworten „Schaffe ich das in der Zeit, die ich habe?“. Feedback beantwortet „Komme ich voran, und lag ich richtig?“. Fehlt eine der drei, muss die Lernende die Antwort allein liefern, und viele tun es nicht.",
        )}
      </p>
      <DataTable
        caption={tt("The three practices, what each does for the learner and what the learner meets when it is missing", "Die drei Praktiken, was jede für die Lernende tut und was sie antrifft, wenn sie fehlt")}
        head={[tt("Practice", "Praxis"), tt("What it does for the learner", "Was sie für die Lernende tut"), tt("What the learner meets when it is missing", "Was die Lernende antrifft, wenn sie fehlt")]}
        rows={[
          [tt("A clear learning path", "Ein klarer Lernpfad"), tt("Shows the steps in order and which one is next", "Zeigt die Schritte in der Reihenfolge und welcher als Nächstes kommt"), tt("A list of lessons with no order, or a single long page with no navigation", "Eine Liste von Lektionen ohne Reihenfolge oder eine einzige lange Seite ohne Navigation")],
          [tt("Microlearning (short units)", "Microlearning (kurze Einheiten)"), tt("Lets the learner finish one unit in a few minutes, each with one goal", "Lässt die Lernende eine Einheit in wenigen Minuten abschließen, jede mit einem Ziel"), tt("One long lesson that needs 40 minutes in one sitting", "Eine lange Lektion, die 40 Minuten am Stück braucht")],
          [tt("Feedback systems", "Feedback-Systeme"), tt("Shows progress and gives a result after each task", "Zeigt den Fortschritt und gibt nach jeder Aufgabe ein Ergebnis"), tt("No sign of progress; the screen reloads silently after a quiz", "Kein Zeichen für den Fortschritt; der Bildschirm lädt nach einem Quiz still neu")],
        ]}
      />
      <Bul
        items={[
          tt("What the research can and cannot tell us: Jordan (2015) collected published completion figures for 221 open online courses with data from before 2015. The median completion rate was 12.6 percent; longer courses had lower completion, and the first two weeks were the most critical for engagement.", "Was die Forschung sagen kann und was nicht: Jordan (2015) sammelte veröffentlichte Completion-Zahlen von 221 offenen Online-Kursen mit Daten aus der Zeit vor 2015. Die mittlere Completion Rate lag bei 12,6 Prozent; längere Kurse hatten eine niedrigere Completion, und die ersten zwei Wochen waren für das Engagement am kritischsten."),
          tt("This supports the three practices (short, structured, with quick feedback), but it describes open courses and older data, so it is evidence for a direction, not a benchmark for your platform.", "Das stützt die drei Praktiken (kurz, strukturiert, mit schnellem Feedback), beschreibt aber offene Kurse und ältere Daten, ist also ein Beleg für eine Richtung, kein Richtwert für Ihre Plattform."),
        ]}
      />
      <Extra id="A1">
        <p>{tt("Practices seen in well-known platforms (an observation, not a study): language-learning apps such as Duolingo use very short lessons and an immediate result after each exercise, plus a streak counter. Khan Academy shows skill progress as levels and gives instant feedback. Course platforms such as Coursera and edX arrange material in weekly steps with graded quizzes. These are design choices that are easy to see; whether each one causes better learning is a separate question that needs an evaluation, which is why Day 2 goes on to testing.", "Praktiken bekannter Plattformen (eine Beobachtung, keine Studie): Sprachlern-Apps wie Duolingo nutzen sehr kurze Lektionen und nach jeder Übung ein sofortiges Ergebnis, dazu einen Serienzähler. Khan Academy zeigt den Fähigkeitsfortschritt als Stufen und gibt sofortiges Feedback. Kursplattformen wie Coursera und edX ordnen Material in Wochenschritte mit bewerteten Quizzen. Das sind Gestaltungsentscheidungen, die leicht zu sehen sind; ob jede zu besserem Lernen führt, ist eine eigene Frage, die eine Evaluation braucht, und deshalb geht Tag 2 zum Testen weiter.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A prototype is a cheap, early version made to learn something. Test it as soon as it can answer a question, and no more finished than that.", "Ein Prototyp ist eine günstige, frühe Version, gemacht, um etwas zu lernen. Testen Sie ihn, sobald er eine Frage beantworten kann, und nicht fertiger als das.")}
      sources={["rettig1994", "ries2011", "iso9241210"]}
      reasoning={[
        tt("Choose the fidelity by the question: structure, order and wording can be tested with paper or grey boxes; detail and look need a polished version, and only later.", "Wählen Sie die Fidelity nach der Frage: Struktur, Reihenfolge und Wortlaut lassen sich mit Papier oder grauen Kästen testen; Detail und Aussehen brauchen eine ausgearbeitete Version, und erst später."),
        tt("When user needs are unclear, test low-fidelity first. A polished prototype of an untested idea only makes the mistake more expensive.", "Wenn die Nutzerbedürfnisse unklar sind, testen Sie zuerst Low-Fidelity. Ein ausgearbeiteter Prototyp einer ungetesteten Idee macht den Fehler nur teurer."),
        tt("A prototype is a question in physical form. Write the question first (“can learners find the next step?”), then build the smallest version that can answer it.", "Ein Prototyp ist eine Frage in physischer Form. Schreiben Sie zuerst die Frage („Finden Lernende den nächsten Schritt?“), dann bauen Sie die kleinste Version, die sie beantworten kann."),
        tt("Say what a low-fidelity test cannot tell you: how the final look and speed feel. That is the next round, not a reason to skip the first.", "Sagen Sie, was ein Low-Fidelity-Test nicht sagen kann: wie sich das endgültige Aussehen und die Geschwindigkeit anfühlen. Das ist die nächste Runde, kein Grund, die erste zu überspringen."),
      ]}
    >
      <BuildMeasureLearn />
      <FidelityLadder />
      <DataTable
        caption={tt("Low-fidelity next to high-fidelity: what the pictures above cannot show", "Low-Fidelity neben High-Fidelity: was die Bilder oben nicht zeigen können")}
        head={["", tt("Low-fidelity", "Low-Fidelity"), tt("High-fidelity", "High-Fidelity")]}
        rows={[
          [tt("What testers talk about", "Worüber Testpersonen sprechen"), tt("Structure, order, wording", "Struktur, Reihenfolge, Wortlaut"), tt("Colours, spacing, small details", "Farben, Abstände, kleine Details")],
          [tt("Good for", "Gut für"), tt("Early questions: is the flow right?", "Frühe Fragen: Stimmt der Ablauf?"), tt("Late questions: does the detail work?", "Späte Fragen: Funktioniert das Detail?")],
          [tt("Typical mistake", "Typischer Fehler"), tt("Dismissing it as “not a real test”", "Es als „keinen echten Test“ abtun"), tt("Polishing an idea nobody has tested", "Eine Idee polieren, die niemand getestet hat")],
        ]}
      />
      <Bul
        items={[
          tt("The plan names two typical mistakes. Testing too late: the first contact with a user happens after the build, when changes are costly.", "Der Plan nennt zwei typische Fehler. Zu spät testen: Der erste Kontakt mit einem Nutzer geschieht nach dem Bau, wenn Änderungen teuer sind."),
          tt("Thinking too complex: the first prototype tries to hold the whole platform, when one question and one flow would have been enough.", "Zu komplex denken: Der erste Prototyp versucht, die ganze Plattform zu fassen, obwohl eine Frage und ein Ablauf genügt hätten."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Sofia and the numbers of learners are made up for this example.", "LearnLoop, Sofia und die Zahlen der Lernenden sind für dieses Beispiel erfunden.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Paper prototypes: Rettig (1994) argued that paper prototypes let a team test ideas “at the speed of thought” and that people are more willing to criticise a sketch than a polished design, because a sketch looks changeable. That is one reason to show learners something rough.", "Papier-Prototypen: Rettig (1994) argumentierte, dass Papier-Prototypen ein Team Ideen „mit der Geschwindigkeit des Denkens“ testen lassen und dass Menschen eine Skizze lieber kritisieren als ein ausgearbeitetes Design, weil eine Skizze veränderbar wirkt. Das ist ein Grund, Lernenden etwas Grobes zu zeigen.")}</p>
        <p>{tt("Iterative design is a standard, not a style: ISO 9241-210 lists “the process is iterative” among its principles of human-centred design, and Ries's Build–Measure–Learn loop gives it a rhythm for product teams. The common thread: shorten the time from an idea to evidence about it.", "Iteratives Design ist ein Standard, kein Stil: ISO 9241-210 nennt „der Prozess ist iterativ“ unter ihren Prinzipien menschzentrierter Gestaltung, und Ries' Build–Measure–Learn-Schleife gibt ihm einen Rhythmus für Produktteams. Der gemeinsame Faden: die Zeit von einer Idee bis zum Beleg darüber verkürzen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Watch a few learners do a real task to learn why they struggle; count many learners to learn how often. Use both, in that order.", "Beobachten Sie wenige Lernende bei einer echten Aufgabe, um zu erfahren, warum sie sich schwertun; zählen Sie viele Lernende, um zu erfahren, wie oft. Nutzen Sie beides, in dieser Reihenfolge.")}
      sources={["nielsen2000", "nielsenLandauer1993", "kohavi2020", "brooke1996", "gdpr"]}
      reasoning={[
        tt("Ask first which question the test must answer. Why do learners leave: watch or interview a few of them. How many leave and where: count in the data.", "Fragen Sie zuerst, welche Frage der Test beantworten muss. Warum gehen Lernende: einige beobachten oder befragen. Wie viele gehen und wo: in den Daten zählen."),
        tt("A number such as a drop-out rate tells you where to look, not what to fix. Pair it with a test that shows the cause.", "Eine Zahl wie die Abbruchquote sagt Ihnen, wo Sie hinschauen sollen, nicht, was zu beheben ist. Paaren Sie sie mit einem Test, der die Ursache zeigt."),
        tt("Plan small, repeated tests with about five users per user group, not one large test; fix what you find, then test again.", "Planen Sie kleine, wiederholte Tests mit etwa fünf Nutzern pro Nutzergruppe, nicht einen großen Test; beheben Sie, was Sie finden, dann testen Sie erneut."),
        tt("A KPI needs a baseline (today's value) and a target, written down before the test starts, so that you can say whether the change worked.", "Ein KPI braucht eine Baseline (den heutigen Wert) und ein Ziel, vor Testbeginn aufgeschrieben, damit Sie sagen können, ob die Änderung gewirkt hat."),
        tt("Tracking learners is personal-data processing. Say what you collect, why, and on what legal basis (DSGVO / GDPR).", "Das Tracking von Lernenden ist Verarbeitung personenbezogener Daten. Sagen Sie, was Sie erheben, warum und auf welcher Rechtsgrundlage (DSGVO / GDPR)."),
      ]}
    >
      <FiveUsers />
      <QualVsQuant />
      <DataTable
        caption={tt("Four KPIs and how to read each carefully", "Vier KPIs und wie man jeden sorgfältig liest")}
        head={[tt("KPI", "KPI"), tt("It counts", "Er zählt"), tt("Read it carefully, because", "Lesen Sie ihn sorgfältig, denn")]}
        rows={[
          [tt("Drop-out rate per lesson", "Abbruchquote pro Lektion"), tt("Where learners stop", "Wo Lernende aufhören"), tt("It shows where, not why. It is a symptom.", "Sie zeigt, wo, nicht warum. Sie ist ein Symptom.")],
          [tt("Time on task", "Zeit pro Aufgabe"), tt("How long a task takes", "Wie lange eine Aufgabe dauert"), tt("A long time can mean confusion or deep reading; look at the task.", "Eine lange Zeit kann Verwirrung oder tiefes Lesen bedeuten; schauen Sie auf die Aufgabe.")],
          [tt("Comprehension score", "Verständniswert"), tt("Quiz or check result", "Quiz- oder Prüfungsergebnis"), tt("A low score can mean unclear teaching or a badly written question.", "Ein niedriger Wert kann unklares Lehren oder eine schlecht formulierte Frage bedeuten.")],
          [tt("Task success", "Aufgabenerfolg"), tt("Whether the learner completed the task", "Ob die Lernende die Aufgabe geschafft hat"), tt("A success with a long detour is not the same as a quick success.", "Ein Erfolg mit langem Umweg ist nicht dasselbe wie ein schneller Erfolg.")],
        ]}
      />
      <Extra id="A3">
        <p>{tt("Experiments: when a platform has enough learners, an A/B test shows two versions to similar groups at the same time and compares a metric. Kohavi, Tang and Xu (2020) stress that many ideas do not move the metric they were built to move, which is why a control group matters. For a platform with few learners, an A/B test may not be possible; then small qualitative tests carry the decision.", "Experimente: Hat eine Plattform genug Lernende, zeigt ein A/B-Test zwei Versionen ähnlichen Gruppen gleichzeitig und vergleicht eine Kennzahl. Kohavi, Tang und Xu (2020) betonen, dass viele Ideen die Kennzahl nicht bewegen, für die sie gebaut wurden, weshalb eine Kontrollgruppe zählt. Bei einer Plattform mit wenigen Lernenden ist ein A/B-Test vielleicht nicht möglich; dann tragen kleine qualitative Tests die Entscheidung.")}</p>
        <p>{tt("Questionnaires: a short standard questionnaire such as the System Usability Scale (Brooke 1996) gives a score from 0 to 100 and is useful to compare versions. Day 16 returns to analytics, KPIs and data-driven optimisation in detail.", "Fragebögen: Ein kurzer Standardfragebogen wie die System Usability Scale (Brooke 1996) ergibt einen Wert von 0 bis 100 und hilft, Versionen zu vergleichen. Tag 16 kehrt ausführlich zu Analytics, KPIs und datengetriebener Optimierung zurück.")}</p>
        <p>{tt("Data protection in testing: observation in a lab with consent is simple. Tracking on a live platform needs a purpose, a legal basis and, for access to a user's device, often consent. The rules for tracking are in flux and differ by technology; check the current guidance of the data-protection authorities before you plan it.", "Datenschutz beim Testen: Beobachtung im Labor mit Einwilligung ist einfach. Tracking auf einer Live-Plattform braucht einen Zweck, eine Rechtsgrundlage und für den Zugriff auf das Gerät eines Nutzers oft eine Einwilligung. Die Regeln für Tracking sind im Fluss und unterscheiden sich je nach Technik; prüfen Sie die aktuellen Hinweise der Datenschutzbehörden, bevor Sie es planen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("An adaptive system changes what a learner sees depending on what that learner does. It can help, but it depends on data and it is harder to explain.", "Ein adaptives System ändert, was eine Lernende sieht, je nachdem, was sie tut. Es kann helfen, hängt aber von Daten ab und ist schwerer zu erklären.")}
      sources={["kulik2016", "gdpr", "aiAct"]}
      reasoning={[
        tt("Adaptive technology is worth considering when you have the data, the content variants and a clear problem that individual paths solve. Without them it is over-engineering.", "Adaptive Technologie ist erwägenswert, wenn Sie die Daten, die Inhaltsvarianten und ein klares Problem haben, das individuelle Pfade lösen. Ohne sie ist es Over-Engineering."),
        tt("Start with the simplest level that answers the problem (rules before algorithms) and add complexity step by step, each step tested.", "Beginnen Sie mit der einfachsten Stufe, die das Problem beantwortet (Regeln vor Algorithmen), und fügen Sie Komplexität Schritt für Schritt hinzu, jeden Schritt getestet."),
        tt("Personalisation and transparency pull against each other. Whenever a system chooses for the learner, decide how the learner can see and change the choice.", "Personalisierung und Transparenz ziehen gegeneinander. Wann immer ein System für die Lernende wählt, entscheiden Sie, wie die Lernende die Wahl sehen und ändern kann."),
        tt("If the system evaluates learners or steers their learning, check the legal duties (DSGVO and the AI Act) before building.", "Wenn das System Lernende bewertet oder ihr Lernen steuert, prüfen Sie die rechtlichen Pflichten (DSGVO und AI Act), bevor Sie bauen."),
      ]}
    >
      <AdaptiveLevels />
      <AdaptiveLoop />
      <DataTable
        caption={tt("Three levels of adaptive learning", "Drei Stufen adaptiven Lernens")}
        head={[tt("Level", "Stufe"), tt("Needs", "Braucht"), tt("Typical risk", "Typisches Risiko")]}
        rows={[
          [tt("1 · Learner choice", "1 · Wahl der Lernenden"), tt("Content in clear options", "Inhalte in klaren Optionen"), tt("Learners choose badly, or do not choose at all", "Lernende wählen schlecht oder gar nicht")],
          [tt("2 · Rules", "2 · Regeln"), tt("A pre-test and a few rules", "Einen Vortest und einige Regeln"), tt("Rules that are too rough for some learners", "Regeln, die für manche Lernende zu grob sind")],
          [tt("3 · Algorithms", "3 · Algorithmen"), tt("Many learners, good data, content variants", "Viele Lernende, gute Daten, Inhaltsvarianten"), tt("Cold start, black box, bias, legal obligations", "Cold Start, Black Box, Verzerrung, rechtliche Pflichten")],
        ]}
      />
      <Bul
        items={[
          tt("Opportunities: Kulik and Fletcher (2016) reviewed 50 controlled evaluations of intelligent tutoring systems and found a median gain of 0.66 standard deviations over conventional teaching, which corresponds to moving the average learner from the 50th to the 75th percentile. The gain depended strongly on how the test was designed, so read it as “often helpful when well implemented”, not as a promise for every platform.", "Chancen: Kulik und Fletcher (2016) werteten 50 kontrollierte Evaluationen intelligenter Tutorensysteme aus und fanden einen mittleren Gewinn von 0,66 Standardabweichungen gegenüber herkömmlichem Unterricht, was bedeutet, die durchschnittliche Lernende vom 50. zum 75. Perzentil zu heben. Der Gewinn hing stark davon ab, wie der Test gestaltet war, lesen Sie ihn also als „oft hilfreich, wenn gut umgesetzt“, nicht als Versprechen für jede Plattform."),
          tt("Risks: complexity (more parts that can fail), data dependency (no data, no adaptation; the cold start problem) and transparency (a learner who cannot see why a step was chosen cannot judge it or correct it).", "Risiken: Komplexität (mehr Teile, die ausfallen können), Datenabhängigkeit (keine Daten, keine Anpassung; das Cold-Start-Problem) und Transparenz (eine Lernende, die nicht sehen kann, warum ein Schritt gewählt wurde, kann ihn weder beurteilen noch korrigieren)."),
          tt("In the European context, personal data is covered by the DSGVO, including limits on decisions taken only by automated means (Article 22). The EU AI Act treats AI systems in education that evaluate learning outcomes or steer the learning process as high-risk. The law applies in stages and is in flux, so check the dates before you plan.", "Im europäischen Kontext fallen personenbezogene Daten unter die DSGVO, einschließlich Grenzen für ausschließlich automatisierte Entscheidungen (Artikel 22). Der EU AI Act stuft KI-Systeme in der Bildung, die Lernergebnisse bewerten oder den Lernprozess steuern, als Hochrisiko ein. Das Gesetz gilt in Stufen und ist im Fluss, prüfen Sie also die Termine, bevor Sie planen."),
        ]}
      />
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("When user needs are unclear and time is short, the cheapest test that gives real evidence usually beats both building at once and testing nothing.", "Wenn die Nutzerbedürfnisse unklar sind und die Zeit knapp ist, schlägt der günstigste Test, der echte Belege liefert, meist sowohl das sofortige Bauen als auch das Nicht-Testen.")}
      sources={["gibbons2018", "rettig1994", "ries2011"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €10,000 is Low; €10,000 to €25,000 is Mid; above €25,000 is High. Do not judge it by how hard it feels.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 10.000 € ist Niedrig; 10.000 € bis 25.000 € ist Mittel; über 25.000 € ist Hoch. Beurteilen Sie ihn nicht danach, wie schwer er sich anfühlt."),
        tt("Rate benefit by what you will know afterwards that you do not know now. An option that teaches nothing before the money is spent has a low benefit, however finished it looks.", "Bewerten Sie den Nutzen danach, was Sie hinterher wissen, das Sie jetzt nicht wissen. Eine Option, die vor dem Geldausgeben nichts lehrt, hat einen niedrigen Nutzen, so fertig sie auch aussieht."),
        tt("Rate risk by what happens if the assumption is wrong: how much is spent, how much can be undone, and who finds out first, you or the learner.", "Bewerten Sie das Risiko danach, was passiert, wenn die Annahme falsch ist: wie viel ausgegeben ist, wie viel sich zurücknehmen lässt und wer es zuerst merkt, Sie oder die Lernende."),
        tt("Without testing, the risks are: building the wrong thing, finding out late, spending the budget on rework, and learners leaving before you know why. Name at least the ones that apply to your case.", "Ohne Testen sind die Risiken: das Falsche zu bauen, es spät zu erfahren, das Budget für Nacharbeit auszugeben und Lernende, die gehen, bevor Sie wissen, warum. Nennen Sie mindestens die, die auf Ihren Fall zutreffen."),
        tt("Decide, and say what you do not know. A decision with a stated gap is stronger than one that pretends there is none.", "Entscheiden Sie, und sagen Sie, was Sie nicht wissen. Eine Entscheidung mit einer genannten Lücke ist stärker als eine, die so tut, als gäbe es keine."),
        tt("To decide whether adaptive learning is worthwhile, ask three things: is there a learner problem that individual paths solve, is there enough data of good quality, and are there content variants to adapt to? Without them it is over-engineering. Start with the simplest level (a rule) and add complexity step by step. Say “yes”, “partly” or “no”, and name the first step.", "Um zu entscheiden, ob adaptives Lernen lohnt, fragen Sie drei Dinge: Gibt es ein Problem der Lernenden, das individuelle Pfade lösen, gibt es genug Daten guter Qualität, und gibt es Inhaltsvarianten, an die man anpassen kann? Ohne sie ist es Over-Engineering. Beginnen Sie mit der einfachsten Stufe (einer Regel) und fügen Sie Komplexität Schritt für Schritt hinzu. Sagen Sie „ja“, „teilweise“ oder „nein“ und nennen Sie den ersten Schritt."),
      ]}
    >
      <WeighExample />
      <Bul
        items={[
          tt("Effort is the one rating a rule decides, from the printed cost. Benefit and risk are your judgement; give a reason for each.", "Der Aufwand ist die eine Bewertung, die eine Regel aus den gedruckten Kosten entscheidet. Nutzen und Risiko sind Ihr Urteil; begründen Sie beides."),
          tt("Without testing, four risks recur: building the wrong thing, finding out late when change is expensive, spending the budget on rework, and learners leaving before you know why.", "Ohne Testen kehren vier Risiken wieder: das Falsche zu bauen, es spät zu erfahren, wenn Änderungen teuer sind, das Budget für Nacharbeit auszugeben und Lernende, die gehen, bevor Sie wissen, warum."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its costs and its reasons are made up for this example. LearnPro's numbers are in the task.", "LearnLoop, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Die Zahlen von LearnPro stehen in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Spend a little to learn, and let the evidence decide the next amount. A big commitment before the evidence is a gamble.", "Geben Sie wenig aus, um zu lernen, und lassen Sie die Belege über den nächsten Betrag entscheiden. Eine große Festlegung vor den Belegen ist ein Glücksspiel.")}
      sources={["ries2011", "kohavi2020", "gibbons2018"]}
      reasoning={[
        tt("Treat every investment as a bet and write down, before the money is spent, what figure would make you continue and what would make you stop.", "Behandeln Sie jede Investition als Wette und schreiben Sie, bevor das Geld ausgegeben wird, auf, welche Zahl Sie weitermachen und welche Sie aufhören ließe."),
        tt("Fund the cheapest stage that gives evidence first. The answer to “do we invest in adaptive learning?” is often “partly”: one small, tested step, with the rest waiting for its gate.", "Finanzieren Sie zuerst die günstigste Stufe, die Belege liefert. Die Antwort auf „Investieren wir in adaptives Lernen?“ lautet oft „teilweise“: ein kleiner, getesteter Schritt, der Rest wartet auf sein Gate."),
        tt("Do not buy technology because competitors have it. Name the learner problem it solves and show that a simpler measure does not.", "Kaufen Sie keine Technologie, nur weil Wettbewerber sie haben. Nennen Sie das Problem der Lernenden, das sie löst, und zeigen Sie, dass eine einfachere Maßnahme es nicht tut."),
        tt("Check the data foundation before the technology: if the platform cannot record what an algorithm needs, the first investment is the foundation.", "Prüfen Sie die Datengrundlage vor der Technologie: Kann die Plattform nicht erfassen, was ein Algorithmus braucht, ist die erste Investition die Grundlage."),
      ]}
    >
      <StagedInvestment />
      <p>
        {tt(
          "Let us look at where money tends to go wrong, because the plan asks “where is money being invested wrongly?”. There are four common patterns. Building before validating: a full build comes first and the first test comes after launch. Following the hype: a competitor announces AI, so the company announces AI, without a problem it solves. Investing in the surface: a new look is paid for when the problem is structure. Investing without data foundations: an adaptive engine is bought for a platform that records almost nothing about its learners.",
          "Sehen wir uns an, wo Geld typischerweise falsch fließt, denn der Plan fragt „Wo wird Geld falsch investiert?“. Es gibt vier häufige Muster. Bauen vor dem Validieren: Zuerst kommt ein kompletter Bau, und der erste Test nach dem Start. Dem Hype folgen: Ein Wettbewerber kündigt KI an, also kündigt das Unternehmen KI an, ohne ein Problem, das sie löst. In die Oberfläche investieren: Ein neues Aussehen wird bezahlt, obwohl das Problem die Struktur ist. Ohne Datengrundlage investieren: Eine adaptive Engine wird für eine Plattform gekauft, die fast nichts über ihre Lernenden erfasst.",
        )}
      </p>
      <DataTable
        caption={tt("What the evidence must show before the next stage", "Was die Belege vor der nächsten Stufe zeigen müssen")}
        head={[tt("Type of investment", "Art der Investition"), tt("What the evidence must show before the next stage", "Was die Belege vor der nächsten Stufe zeigen müssen")]}
        rows={[
          [tt("Prototyping and testing routine", "Prototyping- und Testroutine"), tt("Tests find problems that the team did not expect; fixes raise task success", "Tests finden Probleme, die das Team nicht erwartet hat; Korrekturen erhöhen den Aufgabenerfolg")],
          [tt("Analytics and learning dashboards", "Analytics und Lern-Dashboards"), tt("The team can name decisions the data will change, and has a legal basis for collecting it", "Das Team kann Entscheidungen nennen, die die Daten ändern werden, und hat eine Rechtsgrundlage für das Erheben")],
          [tt("Rule-based personalisation (pilot)", "Regelbasierte Personalisierung (Pilot)"), tt("A pilot with a control group raises completion by an agreed amount", "Ein Pilot mit Kontrollgruppe erhöht die Completion um einen vereinbarten Betrag")],
          [tt("Algorithmic recommendations or AI", "Algorithmische Empfehlungen oder KI"), tt("Enough learners and data of good quality; a clear explanation for learners; legal check done", "Genug Lernende und Daten guter Qualität; eine klare Erklärung für Lernende; rechtliche Prüfung erfolgt")],
          [tt("A new visual style", "Ein neuer visueller Stil"), tt("Tests show that the look, not the structure, is what learners complain about", "Tests zeigen, dass das Aussehen, nicht die Struktur, das ist, worüber sich Lernende beschweren")],
        ]}
      />
      <Extra id="B1">
        <p>{tt("Validated learning: Ries calls the evidence that a stage produces “validated learning”: knowledge about what customers actually do, not what the team believes. A gate turns that learning into a decision.", "Validiertes Lernen: Ries nennt die Belege, die eine Stufe liefert, „validated learning“: Wissen darüber, was Kunden tatsächlich tun, nicht, was das Team glaubt. Ein Gate macht aus diesem Lernen eine Entscheidung.")}</p>
        <p>{tt("The cost of the late test: many teams find that a problem found in a paper test is fixed in minutes, and the same problem found after launch is fixed in a release cycle. The cost does not grow by a fixed factor, but the direction is reliable: the later you find it, the more it costs to change.", "Die Kosten des späten Tests: Viele Teams stellen fest, dass ein im Papiertest gefundenes Problem in Minuten behoben ist und dasselbe Problem nach dem Start in einem Release-Zyklus. Die Kosten wachsen nicht um einen festen Faktor, aber die Richtung ist verlässlich: Je später Sie es finden, desto mehr kostet die Änderung.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Technology decisions pull goals apart. Name the conflict in one sentence, say what each side gets and loses, then decide.", "Technologieentscheidungen ziehen Ziele auseinander. Benennen Sie den Konflikt in einem Satz, sagen Sie, was jede Seite bekommt und verliert, und entscheiden Sie dann.")}
      sources={["gdpr", "aiAct", "kulik2016"]}
      reasoning={[
        tt("Name each conflict in one sentence and say what each side gets and what it loses. A plan that names no loser has not weighed anything.", "Benennen Sie jeden Konflikt in einem Satz und sagen Sie, was jede Seite bekommt und was sie verliert. Ein Plan, der keinen Verlierer nennt, hat nichts abgewogen."),
        tt("Place a feature by two questions: how much does it help the learner, and how much data and complexity does it need? Start with what gives most for least.", "Ordnen Sie eine Funktion mit zwei Fragen ein: Wie sehr hilft sie der Lernenden, und wie viele Daten und wie viel Komplexität braucht sie? Beginnen Sie mit dem, was am meisten für am wenigsten gibt."),
        tt("Technology is justified by a learner problem and by evidence that simpler measures fall short, not by what competitors announce.", "Technologie wird durch ein Problem der Lernenden und durch den Beleg gerechtfertigt, dass einfachere Maßnahmen nicht reichen, nicht dadurch, was Wettbewerber ankündigen."),
        tt("For every personalised feature, write down how a learner sees why it was chosen and how they can change it. If you cannot, delay the feature.", "Schreiben Sie für jede personalisierte Funktion auf, wie eine Lernende sieht, warum sie gewählt wurde, und wie sie sie ändern kann. Wenn Sie das nicht können, verschieben Sie die Funktion."),
      ]}
    >
      <FeatureMatrix />
      <DataTable
        caption={tt("Three conflicts of Day 2 and a rule for deciding each", "Drei Konflikte von Tag 2 und eine Regel zum Entscheiden jedes einzelnen")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Personalisation against transparency", "Personalisierung gegen Transparenz"), tt("Steps that fit each learner", "Schritte, die zu jeder Lernenden passen"), tt("A learner who can see and challenge why a step was chosen", "Eine Lernende, die sehen und hinterfragen kann, warum ein Schritt gewählt wurde"), tt("Personalise only as far as you can explain it. Show the reason next to the suggestion and let the learner change it.", "Personalisieren Sie nur so weit, wie Sie es erklären können. Zeigen Sie den Grund neben dem Vorschlag und lassen Sie die Lernende ihn ändern.")],
          [tt("UX against technology hype", "UX gegen Technologie-Hype"), tt("The newest technology, a market story", "Die neueste Technologie, eine Marktgeschichte"), tt("A fix that solves the learner's problem now", "Eine Lösung, die das Problem der Lernenden jetzt löst"), tt("Start from the problem. If a simple measure answers it, the technology has to prove it adds more.", "Gehen Sie vom Problem aus. Beantwortet es eine einfache Maßnahme, muss die Technologie beweisen, dass sie mehr bringt.")],
          [tt("Scalability against simplicity", "Skalierbarkeit gegen Einfachheit"), tt("A solution that grows with the platform", "Eine Lösung, die mit der Plattform wächst"), tt("A solution the team can build, test and maintain today", "Eine Lösung, die das Team heute bauen, testen und pflegen kann"), tt("Build what you need for the next stage. Plan the growth path, but do not pay for it before the gate.", "Bauen Sie, was Sie für die nächste Stufe brauchen. Planen Sie den Wachstumspfad, zahlen Sie aber nicht vor dem Gate dafür.")],
        ]}
      />
      <Extra id="B2">
        <p>{tt("Transparency is also a legal theme: under the DSGVO, a person has a right to meaningful information about the logic involved in automated decisions with significant effects, and the EU AI Act adds transparency duties for some AI systems. Whether a given adaptive feature falls under these rules depends on what it decides; ask the data-protection officer early.", "Transparenz ist auch ein rechtliches Thema: Nach der DSGVO hat eine Person ein Recht auf aussagekräftige Informationen über die Logik automatisierter Entscheidungen mit erheblicher Wirkung, und der EU AI Act fügt für manche KI-Systeme Transparenzpflichten hinzu. Ob eine bestimmte adaptive Funktion unter diese Regeln fällt, hängt davon ab, was sie entscheidet; fragen Sie früh die Datenschutzbeauftragte.")}</p>
        <p>{tt("“Partly” is a real answer: the plan asks “yes, no or partly?”. Partly means that you commit to the part that the evidence supports (for example rule-based personalisation in one course) and say which parts wait and why.", "„Teilweise“ ist eine echte Antwort: Der Plan fragt „ja, nein oder teilweise?“. Teilweise heißt, dass Sie sich auf den Teil festlegen, den die Belege stützen (zum Beispiel regelbasierte Personalisierung in einem Kurs), und sagen, welche Teile warten und warum.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you must decide without the data you want, choose a decision you can test and undo, write down when you would stop, and name what you give up.", "Wenn Sie ohne die gewünschten Daten entscheiden müssen, wählen Sie eine Entscheidung, die Sie testen und zurücknehmen können, schreiben Sie auf, wann Sie aufhören würden, und nennen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "kohavi2020", "ries2011"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition is checkable only with a figure and a time. Set it before the pilot starts.", "Eine Rückgängig-Bedingung ist nur mit einer Zahl und einer Zeit prüfbar. Legen Sie sie fest, bevor der Pilot beginnt."),
        tt("Prefer the decision you can undo cheaply while you learn; let the expensive, hard-to-undo decisions wait for their gate.", "Bevorzugen Sie die Entscheidung, die Sie günstig zurücknehmen können, während Sie lernen; lassen Sie die teuren, schwer rückgängig zu machenden Entscheidungen auf ihr Gate warten."),
        tt("A rule for future UX decisions names who decides and what evidence they need. An opinion, even a senior one, is not evidence.", "Eine Regel für künftige UX-Entscheidungen nennt, wer entscheidet und welche Belege er braucht. Eine Meinung, auch eine hochrangige, ist kein Beleg."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example the recommendation engine.", "Nichts aufzugeben heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel die Empfehlungs-Engine."),
      ]}
    >
      <PilotControl />
      <DecisionFrame />
      <Bul
        items={[
          tt("Prefer the reversible step: a pilot of one rule-based step in one course can be switched off, while an algorithmic engine for the whole platform is much harder to undo. When the evidence is thin, choose the first kind.", "Bevorzugen Sie den umkehrbaren Schritt: Ein Pilot eines regelbasierten Schritts in einem Kurs lässt sich abschalten, eine algorithmische Engine für die ganze Plattform ist viel schwerer zurückzunehmen. Wenn die Belege dünn sind, wählen Sie die erste Art."),
          tt("Write the reversal condition with a figure and a time: “pilot completion is not at least five points above the control group after eight weeks”. A feeling (“if it does not work”) cannot be checked.", "Schreiben Sie die Rückgängig-Bedingung mit Zahl und Zeit: „Die Completion im Pilot liegt nach acht Wochen nicht mindestens fünf Punkte über der Kontrollgruppe.“ Ein Gefühl („wenn es nicht klappt“) lässt sich nicht prüfen."),
          tt("Name the data you do not have: if the data situation is incomplete, the first decision may be about data: what to record, with what legal basis, for how long.", "Nennen Sie die Daten, die Sie nicht haben: Ist die Datenlage unvollständig, kann die erste Entscheidung die Daten betreffen: was erfasst wird, mit welcher Rechtsgrundlage, wie lange."),
          tt("Fix the decision rule: name who decides (a role, not a person) and the evidence they need (a test, a pilot, drop-out data), so that the next decision does not rest on the loudest opinion.", "Legen Sie die Entscheidungsregel fest: Nennen Sie, wer entscheidet (eine Rolle, keine Person), und die Belege, die er braucht (ein Test, ein Pilot, Abbruchdaten), damit die nächste Entscheidung nicht auf der lautesten Meinung beruht."),
        ]}
      />
      <Extra id="B3">
        <p>{tt("One-way and two-way doors: Bezos separated decisions that are hard to reverse from those that can be reversed cheaply. A pilot is a two-way door; an irreversible platform replacement is a one-way door. Use the care you save on the first kind for the second.", "Einbahn- und Zweiwegetüren: Bezos trennte Entscheidungen, die schwer rückgängig zu machen sind, von solchen, die sich günstig zurücknehmen lassen. Ein Pilot ist eine Zweiwegetür; ein unumkehrbarer Plattformwechsel ist eine Einbahntür. Nutzen Sie die Sorgfalt, die Sie bei der ersten Art sparen, für die zweite.")}</p>
        <p>{tt("A premortem for technology bets: Klein's premortem asks the team to imagine the investment has failed a year from now and to list why. For adaptive learning the usual answers are: the data was too thin, learners did not understand why steps were chosen, and the legal check came too late. Each answer becomes a gate or a condition in the plan.", "Ein Premortem für Technologiewetten: Kleins Premortem bittet das Team, sich vorzustellen, die Investition sei in einem Jahr gescheitert, und aufzulisten, warum. Bei adaptivem Lernen lauten die üblichen Antworten: Die Daten waren zu dünn, Lernende verstanden nicht, warum Schritte gewählt wurden, und die rechtliche Prüfung kam zu spät. Jede Antwort wird zu einem Gate oder einer Bedingung im Plan.")}</p>
      </Extra>
    </MaterialCard>
  );
}
