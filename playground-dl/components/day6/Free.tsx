"use client";

import { MateriA, MateriB } from "@/components/day6/Materi";
import { EduPathShot, EduPathSim } from "@/components/day6/sims";
import { Diagram } from "@/components/materi/kit";
import { ObserveDay6 } from "@/components/day6/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 6 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

/** The scenario of Block 1.1 as a card, next to the empty frame of a persona: only what the plan gives, nothing filled in. */
function Scenario() {
  const clues = [tt("A working professional", "Eine Berufstätige"), tt("Little time", "Wenig Zeit"), tt("Wants to continue their education", "Will sich weiterbilden")];
  const parts = [tt("Goals", "Ziele"), tt("Problems", "Probleme"), tt("Usage situation", "Nutzungssituation")];
  return (
    <Diagram label={tt("The scenario of the plan, and the empty frame of a persona to fill in below", "Das Szenario des Plans und der leere Rahmen einer Persona, den Sie unten ausfüllen")}>
      <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-paper p-3">
          <p className="smallcaps text-ash">{tt("Given", "Gegeben")}</p>
          <ul className="mt-1 space-y-1">
            {clues.map((c) => (
              <li key={c} className="rounded bg-[#F4F2F7] px-3 py-2 text-caption font-semibold text-ink">{c}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-dashed border-ash bg-paper p-3">
          <p className="smallcaps text-ash">{tt("A persona", "Eine Persona")}</p>
          <ul className="mt-1 space-y-1">
            {parts.map((c) => (
              <li key={c} className="rounded border border-dashed border-line px-3 py-2 text-caption text-ash">{c} …</li>
            ))}
          </ul>
        </div>
      </div>
    </Diagram>
  );
}

/** The skeleton of the journey of Block 1.2 as the plan gives it: three phases in order, nothing filled in. */
function JourneyStrip() {
  const phases = [tt("Entry", "Einstieg"), tt("Usage", "Nutzung"), tt("Drop-out point", "Abbruchpunkt")];
  return (
    <Diagram label={tt("The skeleton of the user journey: entry, usage, drop-out point", "Das Gerüst der User Journey: Einstieg, Nutzung, Abbruchpunkt")}>
      <ol className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-2" aria-label={tt("Phases of the journey", "Phasen der Journey")}>
        {phases.map((p, i) => (
          <li key={p} className="flex items-center gap-2">
            <span className="rounded-lg border border-dashed border-ash bg-paper px-4 py-3 text-caption font-semibold text-ink">{`${i + 1} · ${p}`}</span>
            {i < phases.length - 1 && <span aria-hidden className="text-ash">→</span>}
          </li>
        ))}
      </ol>
    </Diagram>
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("learners drop out due to lack of time", "Lernende brechen aus Zeitmangel ab")}</li>
        <li>{tt("teachers find the platform too complicated", "Lehrende finden die Plattform zu kompliziert")}</li>
        <li>{tt("the organisation complains about low usage", "die Organisation beklagt die geringe Nutzung")}</li>
      </ul>
      <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2">
        <figure role="img" aria-label={tt("EduPath as a learner sees it: the course page with its units", "EduPath, wie eine Lernende es sieht: die Kursseite mit ihren Einheiten")}>
          <Fit><EduPathShot kind="learner" /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{tt("The learner's view", "Die Sicht der Lernenden")}</figcaption>
        </figure>
        <figure role="img" aria-label={tt("EduPath as a teacher sees it: the course editor with its tabs", "EduPath, wie eine Lehrende es sieht: der Kurseditor mit seinen Reitern")}>
          <Fit><EduPathShot kind="teacher" /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{tt("The teacher's view", "Die Sicht der Lehrenden")}</figcaption>
        </figure>
      </div>
      <SimButton
        label={tt("Open EduPath as a learner and as a teacher", "EduPath als Lernende und als Lehrende öffnen")}
        sub={tt("Use the platform as each group meets it.", "Nutzen Sie die Plattform so, wie jede Gruppe ihr begegnet.")}
        url="edupath.example/courses"
        title={tt("Simulation: EduPath", "Simulation: EduPath")}
        note={tt("Simulation · Case assumption: the course, its units and the editor are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs, seine Einheiten und der Editor sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
      >
        {() => <EduPathSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what each user group says, the product team's ideas and what the platform records.", "Die Nachricht der Geschäftsführung, was jede Nutzergruppe sagt, die Ideen des Produktteams und was die Plattform erfasst.")}
      url="mail.edupath.example/inbox"
      title={tt("Simulation: the Head of UX Strategy's desk", "Simulation: der Schreibtisch der Head of UX Strategy")}
      note={tt("Simulation · Case assumption: the messages are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Head of UX Strategy", "Posteingang · Head of UX Strategy")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("A segmentation and journey strategy", "Eine Segmentierungs- und Journey-Strategie"), body: [tt("The platform is growing quickly and our resources are limited. We need a user segmentation and journey strategy, and we expect you to justify your decisions.", "Die Plattform wächst schnell, und unsere Ressourcen sind begrenzt. Wir brauchen eine Nutzersegmentierungs- und Journey-Strategie und erwarten, dass Sie Ihre Entscheidungen begründen.")] },
            { from: tt("Learners", "Lernende"), subject: tt("What learners say", "Was Lernende sagen"), body: [tt("We have different user groups with conflicting needs. Learners say they have little time and drop out. The link opens the course as a learner meets it.", "Wir haben verschiedene Nutzergruppen mit widersprüchlichen Bedürfnissen. Lernende sagen, sie hätten wenig Zeit und brechen ab. Der Link öffnet den Kurs, so wie eine Lernende ihm begegnet.")], attachments: [{ name: "edupath.example/course", kind: "link", node: <EduPathSim /> }] },
            { from: tt("Teachers and the organisation", "Lehrende und die Organisation"), subject: tt("What others say", "Was andere sagen"), body: [tt("Teachers say the platform is too complicated. The organisation says usage is low. Nobody can say yet which group matters most.", "Lehrende sagen, die Plattform sei zu kompliziert. Die Organisation sagt, die Nutzung sei gering. Niemand kann bisher sagen, welche Gruppe am wichtigsten ist.")] },
            { from: tt("A teacher", "Eine Lehrende"), subject: tt("Setting up a course takes too long", "Einen Kurs einzurichten dauert zu lange"), body: [tt("Every time I build a course, I go through tab after tab of settings, and I am never sure I set everything. I would like to just build the course.", "Jedes Mal, wenn ich einen Kurs baue, gehe ich Reiter für Reiter durch die Einstellungen und bin nie sicher, ob ich alles gesetzt habe. Ich würde gern einfach den Kurs bauen.")] },
            { from: tt("The training manager", "Die Weiterbildungsleiterin"), subject: tt("Seats nobody uses", "Plätze, die niemand nutzt"), body: [tt("We pay for the seats, and I cannot show my management that people use them. I need to be able to say who is learning and who is not.", "Wir zahlen für die Plätze, und ich kann meiner Geschäftsführung nicht zeigen, dass sie genutzt werden. Ich muss sagen können, wer lernt und wer nicht.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We do not know yet which group matters most, because we cannot see who does what. The attached sheet shows what the platform records today.", "Wir wissen noch nicht, welche Gruppe am wichtigsten ist, weil wir nicht sehen können, wer was tut. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")], attachments: [{ name: "what-edupath-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                head={[tt("Data", "Daten"), tt("Recorded?", "Erfasst?")]}
                rows={[
                  [tt("Accounts by role", "Konten nach Rolle"), tt("yes", "ja")],
                  [tt("Logins", "Anmeldungen"), tt("yes", "ja")],
                  [tt("Units opened", "Geöffnete Einheiten"), tt("partly", "teilweise")],
                  [tt("Where learners stop", "Wo Lernende aufhören"), tt("no", "nein")],
                  [tt("What each group wants to achieve", "Was jede Gruppe erreichen will"), tt("no", "nein")],
                  [tt("Which group matters most", "Welche Gruppe am wichtigsten ist"), tt("not recorded", "nicht erfasst")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { scenario: () => <Scenario />, journey: () => <JourneyStrip />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay6 /> } };
