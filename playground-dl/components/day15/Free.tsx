"use client";

import { MateriA, MateriB } from "@/components/day15/Materi";
import { MeasureThumb } from "@/components/day15/mocks";
import { MobileLearnSim, OptionSim, PlatformShotOf } from "@/components/day15/sims";
import { ObserveDay15 } from "@/components/day15/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { REF_21, REF_31 } from "@/data/day15/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 15 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the platform is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Plattform ist erfunden · hier wird nichts als richtig oder falsch markiert.");

function PhoneShots({ items }: { items: { page: string; name: string }[] }) {
  return (
    <div className="mx-auto grid max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((x) => (
        <figure key={x.page} role="img" aria-label={x.name}>
          <Fit width={360}><PlatformShotOf page={x.page} /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{x.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Scenario() {
  return (
    <div className="space-y-3">
      <PhoneShots items={[{ page: "home", name: tt("On the phone · the home page", "Auf dem Handy · die Startseite") }, { page: "lesson0", name: tt("On the phone · a lesson", "Auf dem Handy · eine Lektion") }, { page: "reports", name: tt("On the phone · a table", "Auf dem Handy · eine Tabelle") }]} />
      <SimButton label={tt("Open the platform on a phone and try it", "Die Plattform auf einem Handy öffnen und ausprobieren")} sub={tt("Use it as the learner of the scenario does: on the go, with little time and many distractions. Open a lesson and a report.", "Nutzen Sie sie wie die Lernende des Szenarios: unterwegs, mit wenig Zeit und vielen Ablenkungen. Öffnen Sie eine Lektion und einen Bericht.")} url="mobilelearn.example/home" title={tt("Simulation: the platform on a phone", "Simulation: die Plattform auf einem Handy")} note={NOTE()}>
        {() => <MobileLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = NOTE();
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Significantly shorten content for mobile (microlearning)", "Inhalte für mobile Geräte deutlich kürzen (Microlearning)"), thumb: <MeasureThumb kind="shrink" />, info: tt("Every lesson is cut into units of about three minutes with one goal and a short check. The layout stays as it is.", "Jede Lektion wird in Einheiten von etwa drei Minuten mit einem Ziel und einer kurzen Prüfung geschnitten. Das Layout bleibt, wie es ist."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Open a unit on the phone and see what is still hard.", "Öffnen Sie eine Einheit auf dem Handy und sehen Sie, was noch schwer ist."), url: "mobilelearn.example/home?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Adopt the desktop version", "Die Desktop-Version übernehmen"), thumb: <MeasureThumb kind="desktop" />, info: tt("The phone shows the desktop version as it is: the same pages, the same tables, the same long lessons.", "Das Handy zeigt die Desktop-Version, wie sie ist: dieselben Seiten, dieselben Tabellen, dieselben langen Lektionen."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Use the desktop version on a phone and see what works.", "Nutzen Sie die Desktop-Version auf einem Handy und sehen Sie, was funktioniert."), url: "mobilelearn.example/home?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Develop a separate mobile UX", "Eine eigene mobile UX entwickeln"), thumb: <MeasureThumb kind="separate" />, info: tt("A phone layout of its own: three menu entries, a card that continues where you stopped, large targets and text that fits. The lessons stay long.", "Ein eigenes Handy-Layout: drei Menüeinträge, eine Karte, die dort weitermacht, wo Sie aufgehört haben, große Ziele und passender Text. Die Lektionen bleiben lang."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Use the separate mobile version and see what is still hard.", "Nutzen Sie die eigene mobile Version und sehen Sie, was noch schwer ist."), url: "mobilelearn.example/home?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("the platform is optimised for desktop", "die Plattform ist für den Desktop optimiert")}</li>
        <li>{tt("mobile use is rising sharply", "die mobile Nutzung steigt stark")}</li>
        <li>{tt("the drop-out rate on smartphones is high", "die Abbruchquote auf Smartphones ist hoch")}</li>
      </ul>
      <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2">
        <figure role="img" aria-label={tt("MobileLearn on a desktop", "MobileLearn auf einem Desktop")}>
          <Fit><PlatformShotOf page="home" onDesktop /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{tt("On a desktop", "Auf einem Desktop")}</figcaption>
        </figure>
        <figure role="img" aria-label={tt("MobileLearn on a phone", "MobileLearn auf einem Handy")}>
          <Fit width={360}><PlatformShotOf page="home" /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{tt("On a phone", "Auf einem Handy")}</figcaption>
        </figure>
      </div>
      <SimButton label={tt("Open MobileLearn on a phone and try it", "MobileLearn auf einem Handy öffnen und ausprobieren")} sub={tt("Use the platform as one of its phone learners does: open a course, a lesson and a report.", "Nutzen Sie die Plattform so, wie eine ihrer Handy-Lernenden es tut: einen Kurs, eine Lektion und einen Bericht öffnen.")} url="mobilelearn.example/home" title={tt("Simulation: MobileLearn on a phone", "Simulation: MobileLearn auf einem Handy")} note={NOTE()}>
        {() => <MobileLearnSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, a designer and the product team say, and what is known about the usage.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, eine Designerin und das Produktteam sagen, und was über die Nutzung bekannt ist.")}
      url="mail.mobilelearn.example/inbox"
      title={tt("Simulation: the Chief Mobile Experience Officer's desk", "Simulation: der Schreibtisch des Chief Mobile Experience Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Mobile Experience Officer", "Posteingang · Chief Mobile Experience Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("Mobile use is growing strongly", "Die mobile Nutzung wächst stark"), body: [tt("Mobile use is growing strongly, the platform is not optimised for it, and our competitors are better on mobile. We expect a strategy and that you take responsibility for the experience across devices.", "Die mobile Nutzung wächst stark, die Plattform ist dafür nicht optimiert, und unsere Wettbewerber sind mobil besser. Wir erwarten eine Strategie und dass Sie die Verantwortung für das Erlebnis über Geräte hinweg übernehmen.")] },
            { from: tt("Support", "Support"), subject: tt("What I hear from learners", "Was ich von Lernenden höre"), body: [tt("Learners on phones write that the pages do not fit and that they cannot see their progress. Open the link to see MobileLearn on a phone, as they do.", "Lernende auf Handys schreiben, dass die Seiten nicht passen und sie ihren Fortschritt nicht sehen können. Öffnen Sie den Link, um MobileLearn auf einem Handy zu sehen, wie sie es tun.")], attachments: [{ name: "mobilelearn.example/home?device=phone", kind: "link", node: <MobileLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("I start on my phone and finish on my laptop", "Ich fange auf dem Handy an und mache auf dem Laptop weiter"), body: [tt("I use my phone on the train and my laptop at home. The platform never knows where I stopped, so I search for my place every time.", "Ich nutze mein Handy im Zug und meinen Laptop zu Hause. Die Plattform weiß nie, wo ich aufgehört habe, also suche ich jedes Mal meine Stelle.")] },
            { from: tt("A designer", "Eine Designerin"), subject: tt("What we built for", "Wofür wir gebaut haben"), body: [tt("We built the platform for the desktop. Nobody has tested it on a real phone, and the content is complex, so it is not easy to cut.", "Wir haben die Plattform für den Desktop gebaut. Niemand hat sie auf einem echten Handy getestet, und der Inhalt ist komplex, er lässt sich also nicht leicht kürzen.")] },
            { from: tt("Product team", "Produktteam"), subject: tt("What we know about usage", "Was wir über die Nutzung wissen"), body: [tt("We know that phone use is growing, but not how it splits by device. The attached sheet shows what is known today.", "Wir wissen, dass die Handynutzung wächst, aber nicht, wie sie sich nach Gerät aufteilt. Die angehängte Tabelle zeigt, was heute bekannt ist.")], attachments: [{ name: "what-we-know-about-usage.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What is known about the usage today (Case assumption)", "Was heute über die Nutzung bekannt ist (Fallannahme)")}
                head={[tt("Question", "Frage"), tt("What is known", "Was bekannt ist")]}
                rows={[
                  [tt("Is mobile use growing?", "Wächst die mobile Nutzung?"), tt("yes, strongly", "ja, stark")],
                  [tt("How does use split by device?", "Wie teilt sich die Nutzung nach Gerät auf?"), tt("not recorded", "nicht erfasst")],
                  [tt("Is the drop-out rate known by device?", "Ist die Abbruchquote nach Gerät bekannt?"), tt("no", "nein")],
                  [tt("Was it ever tested on real phones?", "Wurde es je auf echten Handys getestet?"), tt("no", "nein")],
                  [tt("Does progress move between devices?", "Wechselt der Fortschritt zwischen Geräten?"), tt("no", "nein")],
                ]}
              />
            ) }] },
            { from: tt("Head of product", "Leiter Produkt"), subject: tt("The competitors", "Die Wettbewerber"), body: [tt("The competitors are better on mobile, and some already have an app. I cannot say how much that costs us in learners.", "Die Wettbewerber sind mobil besser, und einige haben schon eine App. Ich kann nicht sagen, wie viele Lernende uns das kostet.")] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { scenario: () => <Scenario />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay15 />, reference: () => <ReferenceButton spec={REF_31()} /> } };
