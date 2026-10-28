"use client";

import { MateriA, MateriB } from "@/components/day16/Materi";
import { MeasureThumb } from "@/components/day16/mocks";
import { ConsoleShot, ConsoleSim, OptionSim } from "@/components/day16/sims";
import { ObserveDay16 } from "@/components/day16/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { REF_21, REF_31 } from "@/data/day16/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 16 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the platform is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Plattform ist erfunden · hier wird nichts als richtig oder falsch markiert.");

function Shots({ items, keyFigures }: { items: { page: string; name: string }[]; keyFigures?: boolean }) {
  return (
    <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2">
      {items.map((x) => (
        <figure key={x.page} role="img" aria-label={x.name}>
          <Fit><ConsoleShot page={x.page} keyFigures={keyFigures} /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{x.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Figures() {
  return (
    <div className="space-y-3">
      <Shots keyFigures items={[{ page: "overview", name: tt("The key figures", "Die Kennzahlen") }, { page: "funnel", name: tt("Where learners leave", "Wo Lernende gehen") }]} />
      <SimButton label={tt("Open the key figures and look around", "Die Kennzahlen öffnen und sich umsehen")} sub={tt("Read the figures as a team member would: the overview, where learners leave, what is tracked.", "Lesen Sie die Zahlen so, wie ein Teammitglied es täte: die Übersicht, wo Lernende gehen, was erfasst wird.")} url="datalearn.example/console" title={tt("Simulation: the key figures", "Simulation: die Kennzahlen")} note={NOTE()}>
        {() => <ConsoleSim keyFigures />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = NOTE();
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Improve UX (navigation, structure)", "UX verbessern (Navigation, Struktur)"), thumb: <MeasureThumb kind="ux" />, info: tt("The menu has three clear entries, the course is five numbered steps and the home page says what to do first. Nothing else changes.", "Das Menü hat drei klare Einträge, der Kurs besteht aus fünf nummerierten Schritten, und die Startseite sagt, was zuerst zu tun ist. Sonst ändert sich nichts."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Use the platform as a new learner and find your way.", "Nutzen Sie die Plattform als neue Lernende und finden Sie sich zurecht."), url: "datalearn.example/home?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Expand content", "Inhalte erweitern"), thumb: <MeasureThumb kind="content" />, info: tt("New courses are added to the list. The menu and the structure stay as they are.", "Neue Kurse kommen in die Liste. Das Menü und die Struktur bleiben, wie sie sind."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Look at the longer course list and see how it feels.", "Sehen Sie sich die längere Kursliste an und sehen Sie, wie es sich anfühlt."), url: "datalearn.example/home?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Increase marketing", "Marketing verstärken"), thumb: <MeasureThumb kind="marketing" />, info: tt("A campaign banner on the home page and a page for new visitors with a sign-up button. Inside, the platform stays as it is.", "Ein Kampagnenbanner auf der Startseite und eine Seite für neue Besucher mit einem Anmeldebutton. Innen bleibt die Plattform, wie sie ist."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Sign up from the campaign page and see what you meet inside.", "Melden Sie sich über die Kampagnenseite an und sehen Sie, was Sie innen antreffen."), url: "datalearn.example/home?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("extensive tracking data is available", "umfangreiche Tracking-Daten sind vorhanden")}</li>
        <li>{tt("the high drop-out rate persists", "die hohe Abbruchquote bleibt bestehen")}</li>
        <li>{tt("the measures show no effect", "die Maßnahmen zeigen keine Wirkung")}</li>
      </ul>
      <Shots items={[{ page: "overview", name: tt("The console · overview", "Die Konsole · Übersicht") }, { page: "tracking", name: tt("The console · what is tracked", "Die Konsole · was erfasst wird") }, { page: "measures", name: tt("The console · measures taken", "Die Konsole · getroffene Maßnahmen") }, { page: "hyp", name: tt("The console · hypotheses", "Die Konsole · Hypothesen") }]} />
      <SimButton label={tt("Open DataLearn's console and look around", "DataLearns Konsole öffnen und sich umsehen")} sub={tt("Use the console as the team does: the overview, the tracking, the reports and the measures taken.", "Nutzen Sie die Konsole so, wie das Team es tut: die Übersicht, das Tracking, die Berichte und die getroffenen Maßnahmen.")} url="datalearn.example/console" title={tt("Simulation: DataLearn's console", "Simulation: DataLearns Konsole")} note={NOTE()}>
        {() => <ConsoleSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, the analytics team and the product team say, and what is known about the data.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, das Analytics-Team und das Produktteam sagen, und was über die Daten bekannt ist.")}
      url="mail.datalearn.example/inbox"
      title={tt("Simulation: the Chief Data & UX Officer's desk", "Simulation: der Schreibtisch des Chief Data & UX Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Data & UX Officer", "Posteingang · Chief Data & UX Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("The platform is declining", "Die Plattform lässt nach"), body: [tt("The performance of the platform is declining, we have a lot of data and nobody can say why. We expect a data-driven strategy and that you take responsibility at management level.", "Die Leistung der Plattform lässt nach, wir haben viele Daten, und niemand kann sagen, warum. Wir erwarten eine datengetriebene Strategie und dass Sie auf Managementebene Verantwortung übernehmen.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What the console shows", "Was die Konsole zeigt"), body: [tt("We track clicks, time spent and drop-off points for every page. Open the link to see the console as we use it.", "Wir erfassen Klicks, Verweildauer und Abspringstellen für jede Seite. Öffnen Sie den Link, um die Konsole so zu sehen, wie wir sie nutzen.")], attachments: [{ name: "datalearn.example/console", kind: "link", node: <ConsoleSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("I left after a few minutes", "Ich bin nach ein paar Minuten gegangen"), body: [tt("I did not know what to do first, so I left after a few minutes. Nothing told me where to start.", "Ich wusste nicht, was ich zuerst tun sollte, also bin ich nach ein paar Minuten gegangen. Nichts sagte mir, wo ich anfangen soll.")] },
            { from: tt("Product team", "Produktteam"), subject: tt("What we tried", "Was wir versucht haben"), body: [tt("We tried a new banner, a longer course introduction and a reminder e-mail. None of them moved the drop-out, and we cannot say why.", "Wir haben ein neues Banner, eine längere Kurseinführung und eine Erinnerungs-E-Mail versucht. Keine hat die Abbrüche bewegt, und wir können nicht sagen, warum.")] },
            { from: tt("Data analyst", "Datenanalystin"), subject: tt("What we know about the data", "Was wir über die Daten wissen"), body: [tt("We have a lot of data, but no written hypotheses and no clear KPIs. The attached sheet shows what is known today.", "Wir haben viele Daten, aber keine geschriebenen Hypothesen und keine klaren KPIs. Die angehängte Tabelle zeigt, was heute bekannt ist.")], attachments: [{ name: "what-we-know-about-the-data.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What is known about the data today (Case assumption)", "Was heute über die Daten bekannt ist (Fallannahme)")}
                head={[tt("Question", "Frage"), tt("What is known", "Was bekannt ist")]}
                rows={[
                  [tt("Is a lot of data tracked?", "Werden viele Daten erfasst?"), tt("yes", "ja")],
                  [tt("Are the KPIs defined, with targets?", "Sind die KPIs definiert, mit Zielen?"), tt("no", "nein")],
                  [tt("Are hypotheses written down?", "Sind Hypothesen aufgeschrieben?"), tt("no", "nein")],
                  [tt("Were learners watched recently?", "Wurde Lernenden zuletzt zugesehen?"), tt("no", "nein")],
                  [tt("Why do learners leave?", "Warum gehen Lernende?"), tt("not known", "nicht bekannt")],
                ]}
              />
            ) }] },
            { from: tt("Data protection officer", "Datenschutzbeauftragte"), subject: tt("A reminder", "Eine Erinnerung"), body: [tt("More tracking is possible only if it is needed and learners are told. Please keep that in mind before adding anything.", "Mehr Tracking ist nur möglich, wenn es nötig ist und Lernende informiert werden. Bitte bedenken Sie das, bevor Sie etwas ergänzen.")] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { figures: () => <Figures />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay16 />, reference: () => <ReferenceButton spec={REF_31()} /> } };
