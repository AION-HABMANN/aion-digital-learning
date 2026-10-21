"use client";

import { MateriA, MateriB } from "@/components/day10/Materi";
import { MeasureThumb } from "@/components/day10/mocks";
import { OptionSim, TrackLearnSim, TrackLearnShot } from "@/components/day10/sims";
import { Diagram } from "@/components/materi/kit";
import { ObserveDay10 } from "@/components/day10/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 10 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the course and its pages are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs und seine Seiten sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.");

/** The description of the plan as a card, and the platform as a simulation: only what the plan gives, nothing marked. */
function Platform() {
  const clues = [tt("No progress bar", "Kein Fortschrittsbalken"), tt("No response to completed tasks", "Keine Reaktion auf erledigte Aufgaben"), tt("An unclear learning status", "Ein unklarer Lernstatus")];
  return (
    <div className="space-y-3">
      <Diagram label={tt("The description of the plan: a learning platform", "Die Beschreibung des Plans: eine Lernplattform")}>
        <div className="mx-auto max-w-[360px] rounded-lg border border-line bg-paper p-3">
          <p className="smallcaps text-ash">{tt("Given", "Gegeben")}</p>
          <ul className="mt-1 space-y-1">
            {clues.map((c) => (
              <li key={c} className="rounded bg-[#F1F3F6] px-3 py-2 text-caption font-semibold text-ink">{c}</li>
            ))}
          </ul>
        </div>
      </Diagram>
      <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2">
        {([["course", tt("The course page", "Die Kursseite")], ["lesson0", tt("A lesson with its task", "Eine Lektion mit ihrer Aufgabe")]] as const).map(([k, name]) => (
          <figure key={k} role="img" aria-label={`TrackLearn: ${name}`}>
            <Fit><TrackLearnShot page={k} /></Fit>
            <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{name}</figcaption>
          </figure>
        ))}
      </div>
      <SimButton
        label={tt("Open TrackLearn and try it", "TrackLearn öffnen und ausprobieren")}
        sub={tt("Use it as a learner does: open a lesson and finish a task.", "Nutzen Sie sie wie eine Lernende: eine Lektion öffnen und eine Aufgabe beenden.")}
        url="tracklearn.example/course"
        title={tt("Simulation: TrackLearn", "Simulation: TrackLearn")}
        note={NOTE()}
      >
        {() => <TrackLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = tt("Simulation · Case assumption: the course is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs ist erfunden · hier wird nichts als richtig oder falsch markiert.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Introduce a progress indicator", "Eine Fortschrittsanzeige einführen"), thumb: <MeasureThumb kind="bar" />, info: tt("The course shows how many lessons are done, a status on each lesson and a bar. The pages and the layout stay as they are.", "Der Kurs zeigt, wie viele Lektionen erledigt sind, einen Status an jeder Lektion und einen Balken. Die Seiten und das Layout bleiben, wie sie sind."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Look at the course with progress.", "Sehen Sie sich den Kurs mit Fortschritt an."), url: "tracklearn.example/course?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Optimise the platform for mobile", "Die Plattform für Mobil optimieren"), thumb: <MeasureThumb kind="phone" />, info: tt("The pages are rebuilt for a phone: one large main button, text that fits the width and the main action first.", "Die Seiten werden für ein Handy umgebaut: ein großer Hauptbutton, Text, der in die Breite passt, und die Hauptaktion zuerst."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Look at the same lesson on a phone.", "Sehen Sie sich dieselbe Lektion auf einem Handy an."), url: "tracklearn.example/course?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Develop a detailed feedback system", "Ein detailliertes Feedbacksystem entwickeln"), thumb: <MeasureThumb kind="feedback" />, info: tt("After each task the platform answers with a saved note, an assessment, a tip, a badge and a count of the day. The layout stays as it is.", "Nach jeder Aufgabe antwortet die Plattform mit einer Speichermeldung, einer Einschätzung, einem Tipp, einem Abzeichen und einer Tageszählung. Das Layout bleibt, wie es ist."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Finish a task and read the answer.", "Beenden Sie eine Aufgabe und lesen Sie die Antwort."), url: "tracklearn.example/course?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users do not know how far along they are", "Nutzer wissen nicht, wie weit sie sind")}</li>
        <li>{tt("high mobile use, but poor UX", "hohe mobile Nutzung, aber schlechte UX")}</li>
        <li>{tt("low motivation", "geringe Motivation")}</li>
      </ul>
      <SimButton
        label={tt("Open TrackLearn on a phone and try it", "TrackLearn auf einem Handy öffnen und ausprobieren")}
        sub={tt("Use the platform as one of its phone learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Handy-Lernenden es tut.")}
        url="tracklearn.example/course"
        title={tt("Simulation: TrackLearn on a phone", "Simulation: TrackLearn auf einem Handy")}
        note={NOTE()}
      >
        {() => <TrackLearnSim phone />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, the mobile team and the product team say, and what the platform records.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, das Mobile-Team und das Produktteam sagen, und was die Plattform erfasst.")}
      url="mail.tracklearn.example/inbox"
      title={tt("Simulation: the Chief UX Systems Officer's desk", "Simulation: der Schreibtisch des Chief UX Systems Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief UX Systems Officer", "Posteingang · Chief UX Systems Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("A UX strategy for TrackLearn", "Eine UX-Strategie für TrackLearn"), body: [tt("The platform is growing, but user retention is declining. Mobile use is high, and feedback systems are missing. We need a feedback and UX systems strategy, and we expect you to take responsibility for how users are guided.", "Die Plattform wächst, aber die Nutzerbindung sinkt. Die mobile Nutzung ist hoch, und Feedbacksysteme fehlen. Wir brauchen eine Strategie für Feedback- und UX-Systeme und erwarten, dass Sie die Verantwortung dafür übernehmen, wie Nutzer geführt werden.")] },
            { from: tt("Support", "Support"), subject: tt("What reaches us", "Was bei uns ankommt"), body: [tt("Learners write that they do not know how far along they are, that they cannot tell whether a task counted, and that the pages are hard to use on a phone. Many do not say which device they use. The link opens the course as a learner meets it today.", "Lernende schreiben, dass sie nicht wissen, wie weit sie sind, dass sie nicht sagen können, ob eine Aufgabe zählte, und dass die Seiten auf dem Handy schwer zu nutzen sind. Viele sagen nicht, welches Gerät sie nutzen. Der Link öffnet den Kurs, so wie eine Lernende ihm heute begegnet.")], attachments: [{ name: "tracklearn.example/course", kind: "link", node: <TrackLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("Did my task count?", "Hat meine Aufgabe gezählt?"), body: [tt("I finish a task and press the button, and nothing happens. I do not know whether it counted or how far I am in the course.", "Ich beende eine Aufgabe und drücke den Button, und es passiert nichts. Ich weiß nicht, ob sie gezählt hat oder wie weit ich im Kurs bin.")] },
            { from: tt("Mobile team", "Mobile-Team"), subject: tt("Most visits come from phones", "Die meisten Besuche kommen vom Handy"), body: [tt("Most people open the platform on a phone, but the pages were built for a desktop. The text runs off the edge and the buttons are small. The link opens the course on a phone.", "Die meisten Leute öffnen die Plattform auf dem Handy, aber die Seiten wurden für den Desktop gebaut. Der Text läuft über den Rand, und die Buttons sind klein. Der Link öffnet den Kurs auf einem Handy.")], attachments: [{ name: "tracklearn.example/course?device=phone", kind: "link", node: <TrackLearnSim phone /> }] },
            { from: tt("Product team", "Produktteam"), subject: tt("Ideas that keep coming up", "Ideen, die immer wieder genannt werden"), body: [tt("Three kinds of ideas came up: a progress indicator, a version built for mobile, and a detailed feedback system after each task. We have not looked into any of them.", "Drei Arten von Ideen kamen auf: eine Fortschrittsanzeige, eine für Mobilgeräte gebaute Version und ein detailliertes Feedbacksystem nach jeder Aufgabe. Wir haben keine davon geprüft.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We record visits and finished lessons, but we do not split return visits by device. The attached sheet shows what the platform records today.", "Wir erfassen Besuche und beendete Lektionen, teilen Wiederkehr aber nicht nach Gerät auf. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")], attachments: [{ name: "what-tracklearn-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                head={[tt("Data", "Daten"), tt("Recorded?", "Erfasst?")]}
                rows={[
                  [tt("Visits", "Besuche"), tt("yes", "ja")],
                  [tt("Finished lessons", "Beendete Lektionen"), tt("yes", "ja")],
                  [tt("Questions in the support inbox", "Fragen im Support-Postfach"), tt("yes", "ja")],
                  [tt("Return visits by device", "Wiederkehr pro Gerät"), tt("no", "nein")],
                  [tt("Where learners stop on a phone", "Wo Lernende auf dem Handy aufhören"), tt("no", "nein")],
                  [tt("Tests of a progress display with users", "Tests einer Fortschrittsanzeige mit Nutzern"), tt("none done", "nicht durchgeführt")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platform: () => <Platform />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay10 /> } };
