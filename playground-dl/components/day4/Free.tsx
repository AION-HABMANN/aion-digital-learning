"use client";

import { MateriA, MateriB } from "@/components/day4/Materi";
import { MeasureThumb } from "@/components/day4/mocks";
import { MotivaScreens } from "@/components/day4/Screens";
import { EngagementOptionSim, GuidedPlatformSim, LongPlatformSim } from "@/components/day4/sims";
import { ObserveDay4 } from "@/components/day4/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import { RevealHint } from "@/components/ui/RevealHint";
import { FACTS } from "@/data/day4/case";
import type { FreeKit } from "@/lib/dayFree/spec";
import { scrollToAndFlash } from "@/lib/flash";
import { tt } from "@/lib/lang";

/** Day 4 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const LONG_NOTE = () => tt("Simulation · Case assumption: the course is made up and shortened; on MotivaLearn the content is long, with no feedback and unclear goals · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs ist erfunden und gekürzt; bei MotivaLearn ist der Inhalt lang, ohne Feedback und mit unklaren Zielen · hier wird nichts als richtig oder falsch markiert.");

function Platforms() {
  return (
    <div className="space-y-3">
      <MotivaScreens />
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton label={tt("Open Platform A and try it", "Plattform A öffnen und ausprobieren")} sub={tt("Use it as a learner: do a task and see what happens.", "Nutzen Sie sie als Lernende: eine Aufgabe machen und sehen, was passiert.")} url="learn-a.example/negotiation" title={tt("Simulation: Platform A", "Simulation: Plattform A")}>
          {() => <GuidedPlatformSim />}
        </SimButton>
        <SimButton label={tt("Open Platform B (MotivaLearn today) and try it", "Plattform B (MotivaLearn heute) öffnen und ausprobieren")} sub={tt("Use it as a learner: read a lesson and go on.", "Nutzen Sie sie als Lernende: eine Lektion lesen und weitergehen.")} url="motivalearn.example/course" title={tt("Simulation: Platform B, MotivaLearn today", "Simulation: Plattform B, MotivaLearn heute")} note={LONG_NOTE()}>
          {() => <LongPlatformSim />}
        </SimButton>
      </div>
      <RevealHint id="platform-facts" label={tt("Show what is at each number", "Zeigen, was an jeder Nummer steht")} title={tt("What is at each number in the pictures", "Was an jeder Nummer in den Bildern steht")}>
        <ul className="space-y-1.5 text-caption text-ink">
          {FACTS.map((f) => (
            <li key={f.id}>
              <span className="tnum font-semibold">{f.no} · </span>
              <span className="text-ash">{f.where}: </span>
              {f.text}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-caption text-ash">{tt("These say what is there, not whether it is good or bad. That is for you to say.", "Sie sagen, was da ist, nicht ob es gut oder schlecht ist. Das sagen Sie.")}</p>
      </RevealHint>
    </div>
  );
}

function Options() {
  const note = tt("Simulation · Case assumption: the lesson is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Lektion ist erfunden · hier wird nichts als richtig oder falsch markiert.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Gamification (badges, points)", "Gamification (Badges, Punkte)"), thumb: <MeasureThumb kind="badges" />, info: tt("Every finished lesson gives points, a level goes up every 20 points, and badges unlock along the way. The platform gets a badge page and a weekly ranking; the lessons themselves stay as they are.", "Jede beendete Lektion gibt Punkte, alle 20 Punkte steigt eine Stufe, und unterwegs werden Badges freigeschaltet. Die Plattform bekommt eine Badge-Seite und eine Wochenrangliste; die Lektionen selbst bleiben, wie sie sind."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Take the course, then look at your badges and the ranking.", "Machen Sie den Kurs und sehen Sie dann Ihre Badges und die Rangliste an."), url: "motivalearn.example/lesson?option=A", sim: () => <EngagementOptionSim option="A" />, note },
        { id: "B", name: tt("Visualise learning progress", "Lernfortschritt sichtbar machen"), thumb: <MeasureThumb kind="progress" />, info: tt("The course page and every lesson show a progress path: the steps done, the current one, what comes next and the time left. A “Continue where you left off” button and a progress page are added; the lessons stay as they are.", "Die Kursseite und jede Lektion zeigen einen Fortschrittspfad: die erledigten Schritte, den aktuellen, was als Nächstes kommt und die verbleibende Zeit. Dazu kommen die Schaltfläche „Dort weitermachen, wo Sie aufgehört haben“ und eine Fortschrittsseite; die Lektionen bleiben, wie sie sind."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Take the course and watch the path and the time left.", "Machen Sie den Kurs und beobachten Sie Pfad und Restzeit."), url: "motivalearn.example/lesson?option=B", sim: () => <EngagementOptionSim option="B" />, note },
        { id: "C", name: tt("Make content more interactive", "Inhalte interaktiver gestalten"), thumb: <MeasureThumb kind="tasks" />, info: tt("Each lesson ends with a task the learner does before going on: a question, putting steps in order, a short scenario. Every answer gets an explanation, and a page lists all answers. The text of the lessons stays as it is.", "Jede Lektion endet mit einer Aufgabe, die die Lernende vor dem Weitergehen löst: eine Frage, Schritte in eine Reihenfolge bringen, ein kurzes Szenario. Jede Antwort bekommt eine Erklärung, und eine Seite listet alle Antworten. Der Text der Lektionen bleibt, wie er ist."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Do the tasks as you go and read the explanations.", "Lösen Sie die Aufgaben unterwegs und lesen Sie die Erklärungen."), url: "motivalearn.example/lesson?option=C", sim: () => <EngagementOptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users start courses but drop out", "Nutzer beginnen Kurse, brechen aber ab")}</li>
        <li>{tt("the content is perceived as “boring”", "der Inhalt wird als „langweilig“ wahrgenommen")}</li>
        <li>{tt("there is no visible progress", "es gibt keinen sichtbaren Fortschritt")}</li>
      </ul>
      <p>
        {tt("MotivaLearn is Platform B of Block 1.1.", "MotivaLearn ist Plattform B aus Block 1.1.")}{" "}
        <button type="button" onClick={() => scrollToAndFlash("slot-platforms", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("See the pictures", "Bilder ansehen")}
        </button>
      </p>
      <SimButton label={tt("Open MotivaLearn and try it", "MotivaLearn öffnen und ausprobieren")} sub={tt("Use the platform as one of its learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut.")} url="motivalearn.example/course" title={tt("Simulation: MotivaLearn today", "Simulation: MotivaLearn heute")} note={LONG_NOTE()}>
        {() => <LongPlatformSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, a message from an HR officer, what support hears, the competitor news and what the platform records.", "Die Nachricht der Geschäftsführung, die Nachricht einer Personalreferentin, was der Support hört, die Meldungen der Wettbewerber und was die Plattform erfasst.")}
      url="mail.motivalearn.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk", "Simulation: der Schreibtisch der Chief Experience Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · MotivaLearn", "Posteingang · Chief Experience Officer · MotivaLearn")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("An engagement strategy", "Eine Engagement-Strategie"), body: [tt("User retention is low. We need an engagement strategy for the learning platform, and we expect you to take responsibility for the user experience.", "Die Nutzerbindung ist gering. Wir brauchen eine Engagement-Strategie für die Lernplattform und erwarten, dass Sie die Verantwortung für das Nutzererlebnis übernehmen."), tt("Please say how you build learners' motivation, which measures come first, how you weigh motivation against manipulation, and how you decide when the data is incomplete.", "Bitte sagen Sie, wie Sie die Motivation der Lernenden aufbauen, welche Maßnahmen zuerst kommen, wie Sie Motivation gegen Manipulation abwägen und wie Sie entscheiden, wenn die Daten unvollständig sind.")] },
            { from: tt("An HR officer", "Eine Personalreferentin"), subject: tt("People start the course and then I hear nothing", "Die Leute beginnen den Kurs und dann höre ich nichts mehr"), body: [tt("I book MotivaLearn for a team. Almost everyone starts the course in the first week, but when I ask a month later, hardly anyone has finished.", "Ich buche MotivaLearn für ein Team. Fast alle beginnen den Kurs in der ersten Woche, aber wenn ich einen Monat später frage, hat ihn kaum jemand beendet."), tt("A colleague uses another platform and says it is much more motivating. I cannot tell you why.", "Ein Kollege nutzt eine andere Plattform und sagt, sie sei viel motivierender. Ich kann Ihnen nicht sagen, warum.")] },
            { from: tt("Support", "Support"), subject: tt("What I hear from learners", "Was ich von Lernenden höre"), body: [tt("People ask how much of a course is left, and I cannot tell them. Some write that they read a lesson and the page just stays there. Open the link to see a lesson as a learner sees it today.", "Leute fragen, wie viel von einem Kurs noch kommt, und ich kann es ihnen nicht sagen. Manche schreiben, dass sie eine Lektion lesen und die Seite einfach stehen bleibt. Öffnen Sie den Link, um eine Lektion so zu sehen, wie eine Lernende sie heute sieht.")], attachments: [{ name: "motivalearn.example/course", kind: "link", node: <LongPlatformSim /> }] },
            { from: tt("Market news", "Marktmeldung"), subject: tt("Competitors", "Wettbewerber"), body: [tt("Competing platforms offer a more motivating experience than ours. The link opens one of them as its public demo shows it.", "Konkurrierende Plattformen bieten ein motivierenderes Erlebnis als unsere. Der Link öffnet eine davon, so wie ihre öffentliche Demo sie zeigt.")], attachments: [{ name: "learn-a.example/negotiation", kind: "link", node: <GuidedPlatformSim /> }] },
            { from: tt("Product team", "Produktteam"), subject: tt("Ideas that keep coming up", "Ideen, die immer wieder genannt werden"), body: [tt("In the last weeks, three kinds of ideas came up in meetings: make learning feel like a game, show learners how far they have come, and give them something to do after each page. We have not looked into any of them. Each has people who like it and people who doubt it.", "In den letzten Wochen kamen in Besprechungen drei Arten von Ideen auf: das Lernen wie ein Spiel gestalten, den Lernenden zeigen, wie weit sie gekommen sind, und ihnen nach jeder Seite etwas zu tun geben. Wir haben keine davon geprüft. Jede hat Leute, die sie mögen, und Leute, die zweifeln.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("Our data situation is incomplete. The attached sheet shows what the platform records today.", "Unsere Datenlage ist unvollständig. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")], attachments: [{ name: "what-motivalearn-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                head={[tt("Data", "Daten"), tt("Recorded?", "Erfasst?")]}
                rows={[
                  [tt("Sign-ups", "Anmeldungen"), tt("yes", "ja")],
                  [tt("Course starts", "Kursstarts"), tt("yes", "ja")],
                  [tt("Lessons finished", "Abgeschlossene Lektionen"), tt("partly", "teilweise")],
                  [tt("Time spent per lesson", "Verweildauer pro Lektion"), tt("no", "nein")],
                  [tt("Reasons for leaving", "Gründe für den Abbruch"), tt("no", "nein")],
                  [tt("User feedback", "Nutzerfeedback"), tt("none collected", "nicht erhoben")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platforms: () => <Platforms />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay4 /> } };
