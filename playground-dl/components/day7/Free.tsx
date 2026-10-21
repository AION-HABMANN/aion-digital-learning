"use client";

import { MateriA, MateriB } from "@/components/day7/Materi";
import { MeasureThumb } from "@/components/day7/mocks";
import { InclusiveLearnShot, InclusiveLearnSim, OptionSim } from "@/components/day7/sims";
import { Diagram } from "@/components/materi/kit";
import { ObserveDay7 } from "@/components/day7/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 7 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the course and the sign-up are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs und die Anmeldung sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.");

/** The description of the plan as a card, and the platform as a simulation: only what the plan gives, nothing marked. */
function Platform() {
  const clues = [tt("A small font", "Eine kleine Schrift"), tt("Complicated language", "Komplizierte Sprache"), tt("Many steps to operate", "Viele Schritte zur Bedienung")];
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
        {([["course", tt("A course page", "Eine Kursseite")], ["signup", tt("The sign-up", "Die Anmeldung")]] as const).map(([k, name]) => (
          <figure key={k} role="img" aria-label={`InclusiveLearn: ${name}`}>
            <Fit><InclusiveLearnShot page={k} /></Fit>
            <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{name}</figcaption>
          </figure>
        ))}
      </div>
      <SimButton
        label={tt("Open InclusiveLearn and try it", "InclusiveLearn öffnen und ausprobieren")}
        sub={tt("Use it as a learner does: read a page and sign up.", "Nutzen Sie sie wie eine Lernende: eine Seite lesen und sich anmelden.")}
        url="inclusivelearn.example/course"
        title={tt("Simulation: InclusiveLearn", "Simulation: InclusiveLearn")}
        note={NOTE()}
      >
        {() => <InclusiveLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = tt("Simulation · Case assumption: the lesson is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Lektion ist erfunden · hier wird nichts als richtig oder falsch markiert.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Develop new features", "Neue Features entwickeln"), thumb: <MeasureThumb kind="quizBattle" />, info: tt("A new feature is added to the platform, for example a quiz battle between colleagues. The lessons themselves stay as they are.", "Der Plattform wird ein neues Feature hinzugefügt, zum Beispiel ein Quiz-Battle unter Kolleginnen. Die Lektionen selbst bleiben, wie sie sind."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Look at the lesson and the new feature.", "Sehen Sie sich die Lektion und das neue Feature an."), url: "inclusivelearn.example/lesson?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Improve the existing UX", "Die bestehende UX verbessern"), thumb: <MeasureThumb kind="look" />, info: tt("The existing pages are tidied: a clearer layout, a simple menu and consistent buttons. The content stays as it is.", "Die bestehenden Seiten werden aufgeräumt: ein klareres Layout, ein einfaches Menü und einheitliche Buttons. Der Inhalt bleibt, wie er ist."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Look at the same lesson, tidied.", "Sehen Sie sich dieselbe Lektion aufgeräumt an."), url: "inclusivelearn.example/lesson?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Increase accessibility", "Barrierefreiheit erhöhen"), thumb: <MeasureThumb kind="a11y" />, info: tt("The platform is made usable for more people: larger text, plain language, captions and use by keyboard. No new features are added.", "Die Plattform wird für mehr Menschen nutzbar gemacht: größerer Text, einfache Sprache, Untertitel und Bedienung per Tastatur. Es werden keine neuen Features ergänzt."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Look at the same lesson with the changes.", "Sehen Sie sich dieselbe Lektion mit den Änderungen an."), url: "inclusivelearn.example/lesson?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users with impairments drop out", "Nutzer mit Einschränkungen brechen ab")}</li>
        <li>{tt("the content is hard to understand", "der Inhalt ist schwer verständlich")}</li>
        <li>{tt("usage is low despite good content", "die Nutzung ist trotz guten Inhalts gering")}</li>
      </ul>
      <SimButton
        label={tt("Open InclusiveLearn and try it", "InclusiveLearn öffnen und ausprobieren")}
        sub={tt("Use the platform as one of its learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut.")}
        url="inclusivelearn.example/course"
        title={tt("Simulation: InclusiveLearn", "Simulation: InclusiveLearn")}
        note={NOTE()}
      >
        {() => <InclusiveLearnSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner and the content team say, and what the platform records.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende und das Content-Team sagen, und was die Plattform erfasst.")}
      url="mail.inclusivelearn.example/inbox"
      title={tt("Simulation: the Chief UX & Accessibility Officer's desk", "Simulation: der Schreibtisch des Chief UX & Accessibility Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief UX & Accessibility Officer", "Posteingang · Chief UX & Accessibility Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("An inclusive UX strategy", "Eine inklusive UX-Strategie"), body: [tt("The platform is growing, but it does not reach all user groups, and the requirements for accessibility are increasing. We need an inclusive UX strategy and a way to measure UX quality, and we expect you to take responsibility.", "Die Plattform wächst, erreicht aber nicht alle Nutzergruppen, und die Anforderungen an Barrierefreiheit steigen. Wir brauchen eine inklusive UX-Strategie und einen Weg, UX-Qualität zu messen, und erwarten, dass Sie die Verantwortung übernehmen."), tt("Resources are limited.", "Die Ressourcen sind begrenzt.")] },
            { from: tt("Support", "Support"), subject: tt("What reaches us", "Was bei uns ankommt"), body: [tt("Complaints about reading and operating the platform keep coming in. Most do not say who is writing. The link opens the platform as a learner meets it today.", "Beschwerden über das Lesen und Bedienen der Plattform kommen immer wieder. Die meisten sagen nicht, wer schreibt. Der Link öffnet die Plattform, so wie eine Lernende ihr heute begegnet.")], attachments: [{ name: "inclusivelearn.example/course", kind: "link", node: <InclusiveLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("I gave up at the sign-up", "Ich habe bei der Anmeldung aufgegeben"), body: [tt("I wanted to join the course, but the text is so small that I could hardly read it, and the sign-up went on and on. I did not finish.", "Ich wollte mich für den Kurs anmelden, aber die Schrift ist so klein, dass ich sie kaum lesen konnte, und die Anmeldung wollte nicht enden. Ich habe sie nicht beendet.")] },
            { from: tt("Content team", "Content-Team"), subject: tt("Good content, few readers", "Guter Inhalt, wenige Leser"), body: [tt("We think the content is good, but people tell us it is hard to understand. We do not know whether the problem is the wording or the way the page looks.", "Wir halten den Inhalt für gut, aber Leute sagen uns, er sei schwer verständlich. Wir wissen nicht, ob das Problem die Formulierung oder das Aussehen der Seite ist.")] },
            { from: tt("Product team", "Produktteam"), subject: tt("Ideas that keep coming up", "Ideen, die immer wieder genannt werden"), body: [tt("Three kinds of ideas came up: add a new feature such as a quiz battle, tidy the pages we have, or make the platform usable for more people. We have not looked into any of them.", "Drei Arten von Ideen kamen auf: ein neues Feature wie ein Quiz-Battle ergänzen, die vorhandenen Seiten aufräumen oder die Plattform für mehr Menschen nutzbar machen. Wir haben keine davon geprüft.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We have no complete user data. The attached sheet shows what the platform records today.", "Wir haben keine vollständigen Nutzerdaten. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")], attachments: [{ name: "what-inclusivelearn-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                head={[tt("Data", "Daten"), tt("Recorded?", "Erfasst?")]}
                rows={[
                  [tt("Lessons opened", "Geöffnete Lektionen"), tt("yes", "ja")],
                  [tt("Quizzes finished", "Beendete Quizze"), tt("yes", "ja")],
                  [tt("Complaints in the support inbox", "Beschwerden im Support-Postfach"), tt("yes", "ja")],
                  [tt("Success or drop-out by user group", "Erfolg oder Abbruch pro Nutzergruppe"), tt("no", "nein")],
                  [tt("Reasons for leaving", "Gründe für den Abbruch"), tt("no", "nein")],
                  [tt("Feedback from users with impairments", "Feedback von Nutzern mit Einschränkungen"), tt("none collected", "nicht erhoben")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platform: () => <Platform />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay7 /> } };
