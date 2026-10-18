"use client";

import { MateriA, MateriB } from "@/components/day9/Materi";
import { MeasureThumb } from "@/components/day9/mocks";
import { OptionSim, NavLearnSim } from "@/components/day9/sims";
import { Diagram } from "@/components/materi/kit";
import { ObserveDay9 } from "@/components/day9/observe";
import { DeskSim } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 9 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the menu and the pages are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: das Menü und die Seiten sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.");

/** The description of the plan as a card, and the interface as a simulation: only what the plan gives, nothing marked. */
function Platform() {
  const clues = [tt("Many menu items", "Viele Menüpunkte"), tt("No clear order", "Keine klare Reihenfolge"), tt("Content that is hard to find", "Schwer auffindbarer Inhalt")];
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
      <SimButton
        label={tt("Open NavLearn and try it", "NavLearn öffnen und ausprobieren")}
        sub={tt("Use it as a learner does: look for a course or a lesson.", "Nutzen Sie sie wie eine Lernende: einen Kurs oder eine Lektion suchen.")}
        url="navlearn.example/start"
        title={tt("Simulation: NavLearn", "Simulation: NavLearn")}
        note={NOTE()}
      >
        {() => <NavLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = tt("Simulation · Case assumption: the lesson is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Lektion ist erfunden · hier wird nichts als richtig oder falsch markiert.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("More interactions (quizzes, clicks)", "Mehr Interaktionen (Quizze, Klicks)"), thumb: <MeasureThumb kind="quiz" />, info: tt("Short quizzes and things to tap are added to the lessons. The menu and the structure stay as they are.", "Den Lektionen werden kurze Quizze und Dinge zum Antippen hinzugefügt. Das Menü und die Struktur bleiben, wie sie sind."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Look at the lesson with quizzes and taps.", "Sehen Sie sich die Lektion mit Quizzen und Tipp-Elementen an."), url: "navlearn.example/lesson?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Build a clear learning structure", "Eine klare Lernstruktur aufbauen"), thumb: <MeasureThumb kind="ia" />, info: tt("The content is grouped into a few named sections, and each lesson shows where it sits, how far the learner is and what comes next.", "Der Inhalt wird in wenige benannte Bereiche gruppiert, und jede Lektion zeigt, wo sie liegt, wie weit die Lernende ist und was als Nächstes kommt."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Look at the same lesson with a structure.", "Sehen Sie sich dieselbe Lektion mit einer Struktur an."), url: "navlearn.example/lesson?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Leave the content, only improve it visually", "Den Inhalt lassen, nur optisch verbessern"), thumb: <MeasureThumb kind="look" />, info: tt("The content and the menu stay unchanged. Only the look is improved: colours, type and spacing.", "Der Inhalt und das Menü bleiben unverändert. Nur das Aussehen wird verbessert: Farben, Schrift und Abstände."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Look at the same lesson, restyled.", "Sehen Sie sich dieselbe Lektion neu gestaltet an."), url: "navlearn.example/lesson?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users cannot find content", "Nutzer finden Inhalte nicht")}</li>
        <li>{tt("low interaction", "geringe Interaktion")}</li>
        <li>{tt("motivation is declining", "die Motivation sinkt")}</li>
      </ul>
      <SimButton
        label={tt("Open NavLearn and try it", "NavLearn öffnen und ausprobieren")}
        sub={tt("Use the platform as one of its learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut.")}
        url="navlearn.example/start"
        title={tt("Simulation: NavLearn", "Simulation: NavLearn")}
        note={NOTE()}
      >
        {() => <NavLearnSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management and what the platform records today.", "Die Nachricht der Geschäftsführung und was die Plattform heute erfasst.")}
      url="mail.navlearn.example/inbox"
      title={tt("Simulation: the Head of UX Architecture's desk", "Simulation: der Schreibtisch des Head of UX Architecture")}
      note={tt("Simulation · Case assumption: the messages and the table are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Tabelle sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Head of UX Architecture", "Posteingang · Head of UX Architecture")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("An architecture for NavLearn", "Eine Architektur für NavLearn"), body: [tt("The platform keeps growing without structure, users lose orientation, and engagement is declining. We need an information architecture and an interaction strategy, and we expect you to take responsibility for how users are guided.", "Die Plattform wächst weiter ohne Struktur, Nutzer verlieren die Orientierung, und das Engagement sinkt. Wir brauchen eine Informationsarchitektur und eine Interaktionsstrategie und erwarten, dass Sie die Verantwortung dafür übernehmen, wie Nutzer geführt werden.")] },
            { from: tt("Support", "Support"), subject: tt("What reaches us", "Was bei uns ankommt"), body: [tt("Learners write that they cannot find a course or a certificate, and that the lessons feel the same. Many do not say which page they were on.", "Lernende schreiben, dass sie einen Kurs oder ein Zertifikat nicht finden und dass sich die Lektionen gleich anfühlen. Viele sagen nicht, auf welcher Seite sie waren.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We record page views and quiz answers, but not the path a learner takes. The attached table shows what the platform records today.", "Wir erfassen Seitenaufrufe und Quizantworten, aber nicht den Weg, den eine Lernende nimmt. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")] },
          ]}
          table={{
            title: tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)"),
            head: [tt("Data", "Daten"), tt("Recorded?", "Erfasst?")],
            rows: [
              [tt("Pages opened", "Geöffnete Seiten"), tt("yes", "ja")],
              [tt("Quizzes answered", "Beantwortete Quizze"), tt("yes", "ja")],
              [tt("Questions in the support inbox", "Fragen im Support-Postfach"), tt("yes", "ja")],
              [tt("The path through the platform", "Der Weg durch die Plattform"), tt("no", "nein")],
              [tt("Where learners stop", "Wo Lernende aufhören"), tt("no", "nein")],
              [tt("Tests of the menu names with users", "Tests der Menünamen mit Nutzern"), tt("none done", "nicht durchgeführt")],
            ],
          }}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platform: () => <Platform />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay9 /> } };
