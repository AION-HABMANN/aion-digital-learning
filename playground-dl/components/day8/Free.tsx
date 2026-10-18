"use client";

import { MateriA, MateriB } from "@/components/day8/Materi";
import { MeasureThumb } from "@/components/day8/mocks";
import { OptionSim, StructLearnSim } from "@/components/day8/sims";
import { Diagram } from "@/components/materi/kit";
import { DeskSim } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 8 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the pages are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Seiten sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.");

/** The description of the plan as a card, and the interface as a simulation: only what the plan gives, nothing marked. */
function Interface() {
  const clues = [tt("Many colours", "Viele Farben"), tt("No clear structure", "Keine klare Struktur"), tt("Several buttons without priority", "Mehrere Buttons ohne Priorität")];
  return (
    <div className="space-y-3">
      <Diagram label={tt("The description of the plan: a learning interface", "Die Beschreibung des Plans: eine Lernoberfläche")}>
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
        label={tt("Open StructLearn and try it", "StructLearn öffnen und ausprobieren")}
        sub={tt("Use it as a learner does: look for a course and press a button.", "Nutzen Sie sie wie eine Lernende: einen Kurs suchen und einen Button drücken.")}
        url="structlearn.example/start"
        title={tt("Simulation: StructLearn", "Simulation: StructLearn")}
        note={NOTE()}
      >
        {() => <StructLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = tt("Simulation · Case assumption: the start page is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Startseite ist erfunden · hier wird nichts als richtig oder falsch markiert.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Simplify the design visually", "Das Design visuell vereinfachen"), thumb: <MeasureThumb kind="calm" />, info: tt("Colours and banners are reduced and the buttons are made quieter. Where things are, and what they are called, stays as it is.", "Farben und Banner werden reduziert, und die Buttons werden ruhiger. Wo die Dinge liegen und wie sie heißen, bleibt, wie es ist."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Look at the start page, calmer.", "Sehen Sie sich die Startseite an, ruhiger."), url: "structlearn.example/start?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Restructure the navigation", "Die Navigation umbauen"), thumb: <MeasureThumb kind="nav" />, info: tt("The sections are reorganised and named after what the learner does, and the menu always marks where the learner is.", "Die Bereiche werden neu geordnet und nach dem benannt, was die Lernende tut, und das Menü markiert immer, wo die Lernende ist."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Look at the start page with sections.", "Sehen Sie sich die Startseite mit Bereichen an."), url: "structlearn.example/start?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Add more visual elements", "Mehr visuelle Elemente ergänzen"), thumb: <MeasureThumb kind="deco" />, info: tt("Icons, animated pictures and badges are added to make the pages livelier. The structure stays as it is.", "Symbole, animierte Bilder und Badges werden ergänzt, um die Seiten lebendiger zu machen. Die Struktur bleibt, wie sie ist."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Look at the start page with more to look at.", "Sehen Sie sich die Startseite mit mehr zum Anschauen an."), url: "structlearn.example/start?option=C", sim: () => <OptionSim option="C" />, note },
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
        <li>{tt("many visual elements have no structure", "viele visuelle Elemente haben keine Struktur")}</li>
        <li>{tt("the drop-out rate is high", "die Abbruchrate ist hoch")}</li>
      </ul>
      <SimButton
        label={tt("Open StructLearn and try it", "StructLearn öffnen und ausprobieren")}
        sub={tt("Use the platform as one of its learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut.")}
        url="structlearn.example/start"
        title={tt("Simulation: StructLearn", "Simulation: StructLearn")}
        note={NOTE()}
      >
        {() => <StructLearnSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management and what the platform shows today.", "Die Nachricht der Geschäftsführung und was die Plattform heute zeigt.")}
      url="mail.structlearn.example/inbox"
      title={tt("Simulation: the Chief UX Architect's desk", "Simulation: der Schreibtisch des Chief UX Architect")}
      note={tt("Simulation · Case assumption: the messages are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief UX Architect", "Posteingang · Chief UX Architect")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("A redesign of StructLearn", "Ein Redesign von StructLearn"), body: [tt("The platform has grown and become cluttered, and users lose orientation. A redesign is necessary. We need a basic UX/UI structure for the platform, and we expect you to take responsibility for the design decisions.", "Die Plattform ist gewachsen und unübersichtlich geworden, und Nutzer verlieren die Orientierung. Ein Redesign ist nötig. Wir brauchen eine UX/UI-Grundstruktur für die Plattform und erwarten, dass Sie die Verantwortung für die Designentscheidungen übernehmen."), tt("The budget is limited.", "Das Budget ist begrenzt.")] },
            { from: tt("Support", "Support"), subject: tt("What reaches us", "Was bei uns ankommt"), body: [tt("Learners write that they cannot find their course or do not know what to press. Many do not say which page they were on.", "Lernende schreiben, dass sie ihren Kurs nicht finden oder nicht wissen, was sie drücken sollen. Viele sagen nicht, auf welcher Seite sie waren.")] },
            { from: tt("Design team", "Designteam"), subject: tt("How the pages grew", "Wie die Seiten gewachsen sind"), body: [tt("Over time every team added a banner, a button or a colour for its own feature. Nobody has checked yet how the pages fit together. We have no user tests yet.", "Mit der Zeit hat jedes Team für sein Feature ein Banner, einen Button oder eine Farbe ergänzt. Niemand hat bisher geprüft, wie die Seiten zusammenpassen. Wir haben noch keine Nutzertests.")] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { interface: () => <Interface />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk /> } };
