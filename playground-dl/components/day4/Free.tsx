"use client";

import { MateriA, MateriB } from "@/components/day4/Materi";
import { MeasureThumb } from "@/components/day4/mocks";
import { MotivaScreens } from "@/components/day4/Screens";
import { EngagementOptionSim, GuidedPlatformSim, LongPlatformSim } from "@/components/day4/sims";
import { ObserveDay4 } from "@/components/day4/observe";
import { DeskSim } from "@/components/sim/DeskSim";
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
        { id: "A", name: tt("Gamification (badges, points)", "Gamification (Badges, Punkte)"), thumb: <MeasureThumb kind="badges" />, info: tt("Points are given for every page opened, and a badge is unlocked after a few pages. The lesson itself stays as it is.", "Für jede geöffnete Seite gibt es Punkte, und nach ein paar Seiten wird ein Badge freigeschaltet. Die Lektion selbst bleibt, wie sie ist."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Page through the lesson and watch what changes.", "Blättern Sie durch die Lektion und sehen Sie, was sich ändert."), url: "motivalearn.example/lesson?option=A", sim: () => <EngagementOptionSim option="A" />, note },
        { id: "B", name: tt("Visualise learning progress", "Lernfortschritt sichtbar machen"), thumb: <MeasureThumb kind="progress" />, info: tt("A progress path shows the steps, the current one and how much is done. The lesson itself stays as it is.", "Ein Fortschrittspfad zeigt die Schritte, den aktuellen und wie viel geschafft ist. Die Lektion selbst bleibt, wie sie ist."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Page through the lesson and watch the path.", "Blättern Sie durch die Lektion und sehen Sie den Pfad."), url: "motivalearn.example/lesson?option=B", sim: () => <EngagementOptionSim option="B" />, note },
        { id: "C", name: tt("Make content more interactive", "Inhalte interaktiver gestalten"), thumb: <MeasureThumb kind="tasks" />, info: tt("Each page ends with a short question the learner answers before going on. The text of the lesson stays as it is.", "Jede Seite endet mit einer kurzen Frage, die die Lernende beantwortet, bevor sie weitergeht. Der Text der Lektion bleibt, wie er ist."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Answer the questions as you go.", "Beantworten Sie die Fragen unterwegs."), url: "motivalearn.example/lesson?option=C", sim: () => <EngagementOptionSim option="C" />, note },
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
      sub={tt("The note from management, the competitor news and what the platform records.", "Die Nachricht der Geschäftsführung, die Meldungen der Wettbewerber und was die Plattform erfasst.")}
      url="mail.motivalearn.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk", "Simulation: der Schreibtisch der Chief Experience Officer")}
      note={tt("Simulation · Case assumption: the messages and the table are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Tabelle sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer", "Posteingang · Chief Experience Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("An engagement strategy", "Eine Engagement-Strategie"), body: [tt("User retention is low. We need an engagement strategy for the learning platform, and we expect you to take responsibility for the user experience.", "Die Nutzerbindung ist gering. Wir brauchen eine Engagement-Strategie für die Lernplattform und erwarten, dass Sie die Verantwortung für die User Experience übernehmen."), tt("The budget is limited.", "Das Budget ist begrenzt.")] },
            { from: tt("Market news", "Marktmeldung"), subject: tt("Competitors", "Wettbewerber"), body: [tt("Competing platforms offer a more motivating experience than ours.", "Konkurrierende Plattformen bieten ein motivierenderes Erlebnis als unsere.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("Our data situation is incomplete. The attached table shows what the platform records today.", "Unsere Datenlage ist unvollständig. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")] },
          ]}
          table={{
            title: tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)"),
            head: [tt("Data", "Daten"), tt("Recorded?", "Erfasst?")],
            rows: [
              [tt("Sign-ups", "Anmeldungen"), tt("yes", "ja")],
              [tt("Course starts", "Kursstarts"), tt("yes", "ja")],
              [tt("Lessons finished", "Abgeschlossene Lektionen"), tt("partly", "teilweise")],
              [tt("Time spent per lesson", "Verweildauer pro Lektion"), tt("no", "nein")],
              [tt("Reasons for leaving", "Gründe für den Abbruch"), tt("no", "nein")],
              [tt("User feedback", "Nutzerfeedback"), tt("none collected", "nicht erhoben")],
            ],
          }}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platforms: () => <Platforms />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay4 /> } };
