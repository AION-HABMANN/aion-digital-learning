"use client";

import type { ReactNode } from "react";
import { Bul } from "@/components/materi/kit";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D6 } from "@/components/day6/comicScenes";
import { COMICS_D6 } from "@/data/day6/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { GoodVsWeak, JourneyExplorer, PersonaToggle, TwoPerspectives, WeighExample } from "@/components/day6/diagrams";
import { ConflictScreens, DecisionFrame, EvidenceStrip, SegmentMatrix } from "@/components/day6/diagramsB";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the diagram is the instrument) →
 * the rules it gives the task (folded) → sources → Mark as read. Example companies and people: LearnLoop, Mia and Sven; never EduPath, so no task is answered here.
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
      scan={tt("A persona is a representative profile that makes a group's needs tangible. It holds goals, problems and the context of use, and it is used in decisions.", "Eine Persona ist ein repräsentatives Profil, das die Bedürfnisse einer Gruppe greifbar macht. Sie enthält Ziele, Probleme und den Nutzungskontext und wird in Entscheidungen genutzt.")}
      sources={["cooper1999", "pruittGrudin2003", "gothelf2013"]}
      reasoning={[
        tt("Write a persona with three parts: goals, problems and frustrations, context of use. Add the expectation the person has of a learning platform.", "Schreiben Sie eine Persona mit drei Teilen: Ziele, Probleme und Frustrationen, Nutzungskontext. Ergänzen Sie die Erwartung, die die Person an eine Lernplattform hat."),
        tt("State each goal as a reason in the person's life, and each problem as a situation, not as a feature wish or a verdict.", "Formulieren Sie jedes Ziel als Grund im Leben der Person und jedes Problem als Situation, nicht als Feature-Wunsch oder Urteil."),
        tt("Name the source of each statement (interview, ticket, log). A statement without a source is a hypothesis.", "Nennen Sie die Quelle jeder Aussage (Interview, Ticket, Log). Eine Aussage ohne Quelle ist eine Hypothese."),
        tt("Make one persona per perspective that really differs: do not mix the learner and the teacher in one profile.", "Machen Sie eine Persona pro Perspektive, die sich wirklich unterscheidet: Mischen Sie Lernende und Lehrende nicht in einem Profil."),
        tt("Sort a research note by what it says: a reason in a life is a goal; a situation where something goes wrong is a problem; when, where, on which device or why (voluntary or required) is the context of use.", "Ordnen Sie eine Recherchenotiz danach, was sie sagt: Ein Grund im Leben ist ein Ziel; eine Situation, in der etwas schiefgeht, ist ein Problem; wann, wo, auf welchem Gerät oder warum (freiwillig oder verpflichtend) ist der Nutzungskontext."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A1} art={ART_D6} />
      <PersonaToggle />
      <DataTable
        caption={tt("The three fields of a persona, and what each is not", "Die drei Felder einer Persona, und was jedes nicht ist")}
        head={[tt("Field", "Feld"), tt("It says", "Es sagt"), tt("It is not", "Es ist nicht")]}
        rows={[
          [tt("Goal", "Ziel"), tt("Why the person learns: a reason in their life (“qualify for a team-lead role”)", "Warum die Person lernt: ein Grund in ihrem Leben („für eine Teamleitung qualifizieren“)"), tt("A feature wish (“a dashboard”)", "Ein Feature-Wunsch („ein Dashboard“)")],
          [tt("Problem or frustration", "Problem oder Frustration"), tt("What gets in the way: a situation (“loses the thread after a few days away”)", "Was im Weg steht: eine Situation („verliert nach ein paar Tagen Pause den Faden“)"), tt("A verdict (“the platform is bad”)", "Ein Urteil („die Plattform ist schlecht“)")],
          [tt("Context of use", "Nutzungskontext"), tt("When, where, on which device, and why: voluntary or required", "Wann, wo, auf welchem Gerät und warum: freiwillig oder verpflichtend"), tt("The person's age or job title alone", "Nur Alter oder Berufsbezeichnung der Person")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Mia and Sandra are made up for this example. Cooper (1999) introduced personas as design tools; the persona's fields here follow the plan's list.", "LearnLoop, Mia und Sandra sind für dieses Beispiel erfunden. Cooper (1999) führte Personas als Gestaltungswerkzeuge ein; die Felder der Persona folgen hier der Liste des Plans.")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Where personas come from: Cooper (1999) introduced them to replace the vague “user” with specific people whose goals drive the design. Pruitt and Grudin (2003) describe what makes them work in practice: they must rest on data and be used in decisions, otherwise they become decoration.", "Woher Personas kommen: Cooper (1999) führte sie ein, um den vagen „Nutzer“ durch konkrete Menschen zu ersetzen, deren Ziele die Gestaltung bestimmen. Pruitt und Grudin (2003) beschreiben, was sie in der Praxis wirksam macht: Sie müssen auf Daten beruhen und in Entscheidungen genutzt werden, sonst werden sie zur Dekoration.")}</p>
        <p>{tt("Proto-personas: when there is no research yet, a team can write a proto-persona from its assumptions and treat it as a hypothesis to test with interviews (Gothelf and Seiden 2013). The danger is forgetting that it is a guess.", "Proto-Personas: Gibt es noch keine Forschung, kann ein Team aus seinen Annahmen eine Proto-Persona schreiben und sie als Hypothese behandeln, die mit Interviews getestet wird (Gothelf und Seiden 2013). Die Gefahr ist zu vergessen, dass sie eine Vermutung ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A useful persona rests on data, differs from the other personas, and is used in decisions. Clichés and personas for everyone are the typical failures.", "Eine brauchbare Persona beruht auf Daten, unterscheidet sich von den anderen Personas und wird in Entscheidungen genutzt. Klischees und Personas für alle sind die typischen Fehler.")}
      sources={["pruittGrudin2003", "gothelf2013"]}
      reasoning={[
        tt("A persona differs from the others in goals, problems or context. If two personas want the same thing in the same situation, merge them.", "Eine Persona unterscheidet sich von den anderen in Zielen, Problemen oder Kontext. Wollen zwei Personas dasselbe in derselben Situation, führen Sie sie zusammen."),
        tt("A cliché (“tech-savvy, loves apps”) tells the design nothing. Replace it with a goal, a problem or a situation that you can point to in the evidence.", "Ein Klischee („technikaffin, liebt Apps“) sagt dem Design nichts. Ersetzen Sie es durch ein Ziel, ein Problem oder eine Situation, auf die Sie in den Belegen zeigen können."),
        tt("Test a persona with a question: which decision would change because of it? If none would, it is decoration.", "Prüfen Sie eine Persona mit einer Frage: Welche Entscheidung würde sich wegen ihr ändern? Wenn keine, ist sie Dekoration."),
        tt("Two or three personas are usually enough. More than that, and no one remembers them.", "Zwei oder drei Personas genügen meist. Mehr, und niemand merkt sie sich."),
        tt("Prefer behaviour to demographics: “studies twenty minutes on a phone in the evening” tells the platform what to allow; “women aged 30 to 45” does not.", "Bevorzugen Sie Verhalten vor Demografie: „lernt abends zwanzig Minuten auf dem Handy“ sagt der Plattform, was sie erlauben muss; „Frauen zwischen 30 und 45“ nicht."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A2} art={ART_D6} />
      <GoodVsWeak />
      <DataTable
        caption={tt("Where the data comes from, and why behaviour beats demographics", "Woher die Daten kommen, und warum Verhalten Demografie schlägt")}
        head={[tt("Source", "Quelle"), tt("What it gives you", "Was sie Ihnen gibt")]}
        rows={[
          [tt("Interviews with learners and teachers", "Interviews mit Lernenden und Lehrenden"), tt("Goals and frustrations, in their own words", "Ziele und Frustrationen, in ihren eigenen Worten")],
          [tt("Support tickets", "Support-Tickets"), tt("What people ask for help with", "Wobei Menschen Hilfe suchen")],
          [tt("Usage logs", "Nutzungslogs"), tt("When and on what devices they use the platform, and where they stop", "Wann und auf welchen Geräten sie die Plattform nutzen und wo sie aufhören")],
          [tt("Surveys", "Umfragen"), tt("The size of a group", "Die Größe einer Gruppe")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The three cards on the wall and the rewrite are made up for this example. A persona built from five good interviews and a log analysis is far more useful than one built from a workshop alone.", "Die drei Karten an der Wand und die Neufassung sind für dieses Beispiel erfunden. Eine Persona aus fünf guten Interviews und einer Log-Analyse ist weit nützlicher als eine allein aus einem Workshop.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Jobs to be done: instead of describing who the user is, describe the progress they want in their situation (Christensen and colleagues 2016). “Carry on where I stopped in the time I have” is a job; it can unite people of different ages and roles.", "Jobs to be done: Statt zu beschreiben, wer der Nutzer ist, beschreiben Sie den Fortschritt, den er in seiner Situation will (Christensen und Kollegen 2016). „Dort weitermachen, wo ich aufgehört habe, in der Zeit, die ich habe“ ist ein Job; er kann Menschen verschiedenen Alters und verschiedener Rollen verbinden.")}</p>
        <p>{tt("Ethical note: personas simplify. Check that yours does not turn a group into a stereotype and that you have not left out the learners who are hardest to reach (Day 7 covers inclusive design).", "Ethischer Hinweis: Personas vereinfachen. Prüfen Sie, dass Ihre keine Gruppe zum Stereotyp macht und dass Sie die Lernenden, die am schwersten zu erreichen sind, nicht ausgelassen haben (Tag 7 behandelt inklusives Design).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("A journey map follows one persona through phases and shows what they do, think and feel, so that the points where it breaks become visible.", "Eine Journey Map folgt einer Persona durch Phasen und zeigt, was sie tut, denkt und fühlt, damit die Stellen, an denen es bricht, sichtbar werden.")}
      sources={["gibbons2018b", "kalbach2020", "kahneman1993"]}
      reasoning={[
        tt("Map one persona at a time, with at least the three phases: entry, learning, progress and completion. Write what they do, think and feel in each.", "Bilden Sie eine Persona nach der anderen ab, mit mindestens den drei Phasen: Einstieg, Lernen, Fortschritt und Abschluss. Schreiben Sie in jeder, was sie tun, denken und fühlen."),
        tt("Mark a phase as critical where the emotion is lowest or where the person stops. Say why in a sentence: what happens to the emotion and what the person does next.", "Markieren Sie eine Phase als kritisch, wo die Emotion am tiefsten ist oder wo die Person aufhört. Sagen Sie in einem Satz, warum: was mit der Emotion passiert und was die Person als Nächstes tut."),
        tt("A pain point is a place where something goes wrong in the person's path, described as a situation (“cannot find where she stopped”), not as a verdict.", "Ein Pain Point ist eine Stelle, an der auf dem Weg der Person etwas schiefgeht, beschrieben als Situation („findet nicht, wo sie aufgehört hat“), nicht als Urteil."),
        tt("Look for a pain point that recurs across personas: it points to a systemic cause that one fix can remove.", "Suchen Sie einen Pain Point, der bei mehreren Personas wiederkehrt: Er weist auf eine systemische Ursache, die eine Lösung beseitigen kann."),
        tt("A journey includes touchpoints outside the screen: emails, reminders, reports.", "Eine Journey umfasst Touchpoints außerhalb des Bildschirms: E-Mails, Erinnerungen, Berichte."),
        tt("Rate the emotion on a scale from 1 (very frustrated) to 5 (very motivated), one number per phase.", "Bewerten Sie die Emotion auf einer Skala von 1 (sehr frustriert) bis 5 (sehr motiviert), eine Zahl pro Phase."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A3} art={ART_D6} />
      <JourneyExplorer />
      <DataTable
        caption={tt("The elements of a journey map", "Die Elemente einer Journey Map")}
        head={[tt("Element", "Element"), tt("What it says", "Was es sagt"), tt("Example", "Beispiel")]}
        rows={[
          [tt("Actor", "Akteur"), tt("One persona, not “users”", "Eine Persona, nicht „Nutzer“"), tt("Mia, the time-poor learner", "Mia, die Lernende mit wenig Zeit")],
          [tt("Scenario", "Szenario"), tt("The goal and the situation", "Das Ziel und die Situation"), tt("“Finish the negotiation course in three weeks”", "„Den Verhandlungskurs in drei Wochen abschließen“")],
          [tt("Phases", "Phasen"), tt("The stages of the path", "Die Stufen des Weges"), tt("Entry, learning, progress and completion", "Einstieg, Lernen, Fortschritt und Abschluss")],
          [tt("Actions and thoughts", "Handlungen und Gedanken"), tt("What the person does and thinks", "Was die Person tut und denkt"), tt("“Opens lesson 2 on the phone; thinks: I cannot stop now”", "„Öffnet Lektion 2 auf dem Handy; denkt: Jetzt kann ich nicht aufhören“")],
          [tt("Emotions", "Emotionen"), tt("How the person feels at each step", "Wie die Person sich bei jedem Schritt fühlt"), tt("A curve from motivated to frustrated", "Eine Kurve von motiviert zu frustriert")],
          [tt("Pain points", "Pain Points"), tt("Where it breaks", "Wo es bricht"), tt("“No resume after three days”", "„Kein Fortsetzen nach drei Tagen“")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Mia are made up for this example. People tend to judge an experience by its most intense moment and by how it ended (the peak-end rule, Kahneman and colleagues 1993), so in a course the progress and completion phase carries more weight in memory than its length suggests.", "LearnLoop und Mia sind für dieses Beispiel erfunden. Menschen beurteilen ein Erlebnis tendenziell nach seinem intensivsten Moment und danach, wie es endete (die Peak-End-Regel, Kahneman und Kollegen 1993), daher wiegt in einem Kurs die Phase Fortschritt und Abschluss im Gedächtnis schwerer, als ihre Länge vermuten lässt.")}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Systemic problems, not single errors: a journey reveals a pattern. If the same phase is low for several personas, the cause is in the process, not in a single screen. The plan's coaching puts it as “think in processes instead of screens”.", "Systemische Probleme, keine Einzelfehler: Eine Journey zeigt ein Muster. Ist dieselbe Phase für mehrere Personas tief, liegt die Ursache im Prozess, nicht in einem einzelnen Bildschirm. Das Coaching des Plans sagt es so: „in Prozessen statt in Bildschirmen denken“.")}</p>
        <p>{tt("What goes into a journey map: Gibbons (2018, Nielsen Norman Group) lists an actor, a scenario with expectations, journey phases, actions, thoughts and emotions, and opportunities. Kalbach (2020) distinguishes a journey map (one actor, one goal, one path) from an experience map (a general human activity). Mark which parts come from observation and which are assumptions.", "Was in eine Journey Map gehört: Gibbons (2018, Nielsen Norman Group) nennt einen Akteur, ein Szenario mit Erwartungen, Journey-Phasen, Handlungen, Gedanken und Emotionen sowie Chancen. Kalbach (2020) unterscheidet eine Journey Map (ein Akteur, ein Ziel, ein Weg) von einer Experience Map (eine allgemeine menschliche Tätigkeit). Markieren Sie, welche Teile aus Beobachtung stammen und welche Annahmen sind.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("The same platform looks different to a learner and to a teacher. Each needs its own persona and its own journey.", "Dieselbe Plattform sieht für eine Lernende und für eine Lehrende anders aus. Jede braucht ihre eigene Persona und ihre eigene Journey.")}
      sources={["pruittGrudin2003", "kalbach2020"]}
      reasoning={[
        tt("Write the teacher's journey with its own phases (for example set up, run, review), not the learner's phases.", "Schreiben Sie die Journey der Lehrenden mit eigenen Phasen (zum Beispiel einrichten, durchführen, auswerten), nicht mit den Phasen der Lernenden."),
        tt("A measure that helps learners can burden teachers: name who each measure helps and who it burdens.", "Eine Maßnahme, die Lernenden hilft, kann Lehrende belasten: Nennen Sie, wem jede Maßnahme hilft und wen sie belastet."),
        tt("Look for a measure that helps both, such as a clear course structure that both can see.", "Suchen Sie eine Maßnahme, die beiden hilft, etwa eine klare Kursstruktur, die beide sehen."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A4} art={ART_D6} />
      <TwoPerspectives />
      <Extra id="A4">
        <p>{tt("The third user: the organisation that buys the courses (a training manager, an HR department) has goals of its own: visible completion, cost control, simple reporting. In Materi B the training manager appears as a segment that is small and business-critical.", "Der dritte Nutzer: Die Organisation, die die Kurse kauft (eine Weiterbildungsleiterin, eine Personalabteilung), hat eigene Ziele: sichtbarer Abschluss, Kostenkontrolle, einfaches Reporting. In Materi B erscheint die Weiterbildungsleiterin als ein Segment, das klein und geschäftskritisch ist.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how much it helps the persona at their critical point, how much work it takes and what could go wrong. All three are your judgement.", "Bewerten Sie eine Maßnahme danach, wie sehr sie der Persona an ihrem kritischen Punkt hilft, wie viel Arbeit sie macht und was schiefgehen könnte. Alle drei sind Ihr Urteil.")}
      sources={["gibbons2018", "gibbons2018b"]}
      reasoning={[
        tt("Rate effort by how much work and how many people it needs. The plan prints no price, so Low, Mid or High is your judgement, with a reason.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und wie viele Personen er braucht. Der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund."),
        tt("Rate user impact for a named persona at a named pain point. A measure that does not touch any pain point of a persona has a low impact.", "Bewerten Sie die Nutzerwirkung für eine benannte Persona an einem benannten Pain Point. Eine Maßnahme, die keinen Pain Point einer Persona berührt, hat eine geringe Wirkung."),
        tt("Say how many people the persona stands for: a measure for a large segment weighs more than one for a small one, unless the small one is business-critical.", "Sagen Sie, für wie viele Menschen die Persona steht: Eine Maßnahme für ein großes Segment wiegt mehr als eine für ein kleines, es sei denn, das kleine ist geschäftskritisch."),
        tt("Rate risk by what could be lost or wasted, and by whether the measure can be undone.", "Bewerten Sie das Risiko danach, was verloren gehen oder verschwendet werden könnte, und danach, ob sich die Maßnahme zurücknehmen lässt."),
        tt("Name the central pain point each of your chosen measures answers and the phase it sits in.", "Nennen Sie den zentralen Pain Point, den jede Ihrer gewählten Maßnahmen beantwortet, und die Phase, in der er liegt."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A5} art={ART_D6} />
      <WeighExample />
      <Bul
        items={[
          tt("All three ratings are your judgement; give a reason for each. For effort, say how much work and how many people the measure needs.", "Alle drei Bewertungen sind Ihr Urteil; begründen Sie jede. Sagen Sie beim Aufwand, wie viel Arbeit und wie viele Personen die Maßnahme braucht."),
          tt("A measure can be right for one persona and wrong for another, so say whom it is for.", "Eine Maßnahme kann für eine Persona richtig und für eine andere falsch sein, sagen Sie also, für wen sie ist."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its reasons are made up for this example. The task case is in the task.", "LearnLoop und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Prioritise a persona by the size of its segment, its business value and how critical its journey is. A small segment can be the most critical.", "Priorisieren Sie eine Persona nach der Größe ihres Segments, ihrem Geschäftswert und danach, wie kritisch ihre Journey ist. Ein kleines Segment kann das kritischste sein.")}
      sources={["pruittGrudin2003", "cooper1999", "kalbach2020"]}
      reasoning={[
        tt("Choose strategic personas by three tests: size, business value and journey breakage. Say which test decided.", "Wählen Sie strategische Personas nach drei Tests: Größe, Geschäftswert und Bruchstelle der Journey. Sagen Sie, welcher Test entschieden hat."),
        tt("Do not assume the largest segment is the most important. Check who decides renewals, who supplies content, who pays.", "Nehmen Sie nicht an, das größte Segment sei das wichtigste. Prüfen Sie, wer über Verlängerungen entscheidet, wer Inhalt liefert, wer zahlt."),
        tt("A persona is strategic if a decision would change because of it. A persona that changes no decision should not be on the list.", "Eine Persona ist strategisch, wenn sich eine Entscheidung wegen ihr ändern würde. Eine Persona, die keine Entscheidung ändert, gehört nicht auf die Liste."),
        tt("Optimisation pays off most where a segment is large or critical and its journey breaks at a point you can fix.", "Optimierung lohnt sich am meisten, wo ein Segment groß oder kritisch ist und seine Journey an einer Stelle bricht, die Sie beheben können."),
        tt("Name the three biggest problems of the target group, each as a situation in a phase of its journey.", "Nennen Sie die drei größten Probleme der Zielgruppe, jedes als Situation in einer Phase ihrer Journey."),
      ]}
    >
      <ComicButton comic={COMICS_D6.B1} art={ART_D6} />
      <SegmentMatrix />
      <DataTable
        caption={tt("Three questions, what each tells you, and typical evidence", "Drei Fragen, was jede Ihnen sagt, und typische Belege")}
        head={[tt("Question", "Frage"), tt("What it tells you", "Was sie Ihnen sagt"), tt("Typical evidence", "Typische Belege")]}
        rows={[
          [tt("How large is the segment?", "Wie groß ist das Segment?"), tt("How many people a change reaches", "Wie viele Menschen eine Änderung erreicht"), tt("Usage data, accounts, sign-ups", "Nutzungsdaten, Konten, Anmeldungen")],
          [tt("What is it worth?", "Was ist es wert?"), tt("What the business loses if the segment is unhappy", "Was das Unternehmen verliert, wenn das Segment unzufrieden ist"), tt("Revenue, renewal decisions, content supply", "Umsatz, Verlängerungsentscheidungen, Inhaltsversorgung")],
          [tt("Where does its journey break?", "Wo bricht seine Journey?"), tt("Where optimisation pays off most", "Wo sich Optimierung am meisten lohnt"), tt("Journey maps, drop-out per phase, interviews", "Journey Maps, Abbruch pro Phase, Interviews")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its segments are made up for this example. A group of 60 training managers who renew licences for 5,000 learners decides more of the business than 5,000 learners.", "LearnLoop und seine Segmente sind für dieses Beispiel erfunden. Eine Gruppe von 60 Weiterbildungsleitern, die Lizenzen für 5.000 Lernende verlängern, entscheidet mehr vom Geschäft als 5.000 Lernende.")}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Behaviour over demographics: segments defined by what people do and want (time-poor on a phone, exam preparation, course building) lead to design decisions; segments defined by age rarely do (Pruitt and Grudin 2003).", "Verhalten vor Demografie: Segmente, die nach dem definiert sind, was Menschen tun und wollen (wenig Zeit auf dem Handy, Prüfungsvorbereitung, Kurse bauen), führen zu Gestaltungsentscheidungen; nach Alter definierte Segmente tun das selten (Pruitt und Grudin 2003).")}</p>
        <p>{tt("Primary and secondary personas: the idea of designing for a specific person (Cooper 1999) leads to naming one primary persona whose needs must be satisfied, and secondary personas who are served as long as it does not harm the first.", "Primäre und sekundäre Personas: Die Idee, für eine bestimmte Person zu gestalten (Cooper 1999), führt dazu, eine primäre Persona zu benennen, deren Bedürfnisse erfüllt sein müssen, und sekundäre Personas, die bedient werden, solange es der ersten nicht schadet.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("“Design for everyone” serves no one. When segments conflict, say who comes first, what the others get, and when you will revisit.", "„Für alle gestalten“ bedient niemanden. Wenn Segmente kollidieren, sagen Sie, wer zuerst kommt, was die anderen bekommen und wann Sie wieder hinsehen.")}
      sources={["pruittGrudin2003", "gibbons2018b", "kalbach2020"]}
      reasoning={[
        tt("Name the primary segment and say what the others will get and when.", "Nennen Sie das primäre Segment und sagen Sie, was die anderen bekommen und wann."),
        tt("Share the parts of the platform that are common (structure, language, navigation) and separate only what truly differs.", "Teilen Sie die Teile der Plattform, die gemeinsam sind (Struktur, Sprache, Navigation), und trennen Sie nur, was sich wirklich unterscheidet."),
        tt("Where segments conflict, say which need is given up for which and what you do to limit the damage (a later release, a smaller version, a mode).", "Wo Segmente kollidieren, sagen Sie, welches Bedürfnis für welches aufgegeben wird und was Sie tun, um den Schaden zu begrenzen (ein späteres Release, eine kleinere Version, ein Modus)."),
        tt("Avoid “design for everyone”. If a measure claims to help all segments equally, ask where it is vague.", "Vermeiden Sie „für alle gestalten“. Behauptet eine Maßnahme, allen Segmenten gleich zu helfen, fragen Sie, wo sie vage ist."),
        tt("Order the decisions by what the primary segment needs first, and by what the others depend on.", "Ordnen Sie die Entscheidungen danach, was das primäre Segment zuerst braucht und wovon die anderen abhängen."),
      ]}
    >
      <ComicButton comic={COMICS_D6.B2} art={ART_D6} />
      <ConflictScreens />
      <DataTable
        caption={tt("Four conflicts between segments, what each side gets, and a rule for deciding", "Vier Konflikte zwischen Segmenten, was jede Seite bekommt, und eine Regel zum Entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Primary against secondary segment", "Primäres gegen sekundäres Segment"), tt("Its journey fixed first", "Seine Journey zuerst behoben"), tt("A later fix, or a smaller one", "Eine spätere oder kleinere Lösung"), tt("Name the primary; say when the secondary is revisited", "Nennen Sie das primäre; sagen Sie, wann das sekundäre wieder drankommt")],
          [tt("Large against critical segment", "Großes gegen kritisches Segment"), tt("Reach: many people helped", "Reichweite: viele Menschen geholfen"), tt("Leverage: the group that decides renewals or content", "Hebel: die Gruppe, die über Verlängerungen oder Inhalt entscheidet"), tt("Weigh the cost of losing the critical group against the gain for the large one", "Wägen Sie die Kosten des Verlusts der kritischen Gruppe gegen den Gewinn für die große ab")],
          [tt("One interface against two", "Eine Oberfläche gegen zwei"), tt("Simplicity and consistency", "Einfachheit und Konsistenz"), tt("A fit for each segment", "Eine Passung für jedes Segment"), tt("Share what is common (structure, language); separate what differs (home screen, tools)", "Teilen Sie das Gemeinsame (Struktur, Sprache); trennen Sie das Verschiedene (Startbildschirm, Werkzeuge)")],
          [tt("Persona detail against speed", "Persona-Detail gegen Tempo"), tt("Time to decide", "Zeit zum Entscheiden"), tt("A persona that rests on enough data", "Eine Persona, die auf genug Daten beruht"), tt("Start with a proto-persona, label it a hypothesis, and test it", "Beginnen Sie mit einer Proto-Persona, beschriften Sie sie als Hypothese und testen Sie sie")],
        ]}
      />
      <Extra id="B2">
        <p>{tt("Do not hide the loser: a strategy that names no segment that waits has not prioritised. Telling a segment honestly when it will be served keeps trust, especially with a business-critical customer such as a training manager.", "Verstecken Sie den Verlierer nicht: Eine Strategie, die kein wartendes Segment nennt, hat nicht priorisiert. Einem Segment ehrlich zu sagen, wann es bedient wird, erhält das Vertrauen, besonders bei einem geschäftskritischen Kunden wie einer Weiterbildungsleiterin.")}</p>
        <p>{tt("Journeys as a steering tool: a journey map lets you see where one fix helps several segments at once, such as a clear course structure that learners and teachers share.", "Journeys als Steuerungswerkzeug: Mit einer Journey Map sehen Sie, wo eine Lösung mehreren Segmenten zugleich hilft, etwa eine klare Kursstruktur, die Lernende und Lehrende teilen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you are not sure which persona is right, decide a step you can test, write down what would change your mind, and keep personas as hypotheses.", "Wenn Sie nicht sicher sind, welche Persona die richtige ist, entscheiden Sie einen Schritt, den Sie testen können, schreiben Sie auf, was Sie umstimmen würde, und behandeln Sie Personas als Hypothesen.")}
      sources={["klein2007", "bezos2016", "gothelf2013", "pruittGrudin2003"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure and a time: “the return rate of the primary segment is not up eight points after ten weeks, or the churn of a waiting segment doubles”.", "Eine Rückgängig-Bedingung hat eine Zahl und eine Zeit: „die Rückkehrrate des primären Segments ist nach zehn Wochen nicht um acht Punkte gestiegen, oder die Abwanderung eines wartenden Segments verdoppelt sich“."),
        tt("State how much evidence each persona rests on, and what you will do to test it.", "Sagen Sie, auf wie viel Belegen jede Persona beruht, und was Sie tun, um sie zu testen."),
        tt("Name who decides on persona priority and which evidence they need.", "Nennen Sie, wer über die Persona-Priorität entscheidet und welche Belege er braucht."),
        tt("Giving up nothing means you have not decided: name which segment waits and until when.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, welches Segment wartet und bis wann."),
      ]}
    >
      <ComicButton comic={COMICS_D6.B3} art={ART_D6} />
      <EvidenceStrip />
      <DecisionFrame />
      <Bul
        items={[
          tt("Treat personas as hypotheses: label each with how much data it rests on (for example 12 interviews, one log analysis) and say what would change it.", "Behandeln Sie Personas als Hypothesen: Beschriften Sie jede damit, auf wie viel Daten sie beruht (zum Beispiel 12 Interviews, eine Log-Analyse), und sagen Sie, was sie ändern würde."),
          tt("Choose a reversible priority: one segment for two quarters can be reviewed; a platform rebuilt for it cannot.", "Wählen Sie eine umkehrbare Priorität: Ein Segment für zwei Quartale lässt sich prüfen; eine dafür umgebaute Plattform nicht."),
          tt("Give the other segments a date, and say what you watch in the meantime (their churn, their complaints).", "Geben Sie den anderen Segmenten ein Datum und sagen Sie, was Sie in der Zwischenzeit beobachten (ihre Abwanderung, ihre Beschwerden)."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its figures are made up for this example. The task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Premortem: Klein's premortem (2007) asks the team to imagine that the persona strategy failed. Typical answers: the persona was a cliché, the segment we skipped left, the critical customer was not asked. Each answer becomes a check.", "Premortem: Kleins Premortem (2007) bittet das Team, sich vorzustellen, die Persona-Strategie sei gescheitert. Typische Antworten: Die Persona war ein Klischee, das übergangene Segment ist gegangen, der kritische Kunde wurde nicht gefragt. Jede Antwort wird zu einer Prüfung.")}</p>
        <p>{tt("One-way and two-way doors: Bezos (2016) distinguishes decisions that are hard to reverse from those that are cheap to reverse. A two-quarter priority is a two-way door; a platform rebuilt around a single persona is closer to a one-way door.", "Einbahn- und Zweiwegtüren: Bezos (2016) unterscheidet Entscheidungen, die sich schwer rückgängig machen lassen, von solchen, die günstig umkehrbar sind. Eine Zwei-Quartals-Priorität ist eine Zweiwegtür; eine um eine einzelne Persona umgebaute Plattform ist näher an einer Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
