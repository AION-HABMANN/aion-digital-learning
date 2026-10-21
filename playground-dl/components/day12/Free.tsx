"use client";

import { MateriA, MateriB } from "@/components/day12/Materi";
import { MeasureThumb } from "@/components/day12/mocks";
import { AdaptLearnSim, OptionSim, PlatformASim, PlatformBSim, PlatformShotOf } from "@/components/day12/sims";
import { ObserveDay12 } from "@/components/day12/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 12 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the course is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs ist erfunden · hier wird nichts als richtig oder falsch markiert.");

function Shots({ items }: { items: { which: "A" | "B" | "today"; page: string; name: string }[] }) {
  return (
    <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2">
      {items.map((x) => (
        <figure key={`${x.which}-${x.page}`} role="img" aria-label={x.name}>
          <Fit><PlatformShotOf which={x.which} page={x.page} /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{x.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Platforms() {
  return (
    <div className="space-y-3">
      <Shots
        items={[
          { which: "A", page: "course", name: tt("Platform A · the course page", "Plattform A · die Kursseite") },
          { which: "A", page: "lesson0", name: tt("Platform A · a lesson", "Plattform A · eine Lektion") },
          { which: "B", page: "course", name: tt("Platform B · the course page", "Plattform B · die Kursseite") },
          { which: "B", page: "path", name: tt("Platform B · the path that follows the learner", "Plattform B · der Pfad, der der Lernenden folgt") },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton label={tt("Open Platform A and try it", "Plattform A öffnen und ausprobieren")} sub={tt("Use it as a learner: do a task and see what the next lesson is.", "Nutzen Sie sie als Lernende: eine Aufgabe machen und sehen, welche Lektion als Nächstes kommt.")} url="platform-a.example/course" title={tt("Simulation: Platform A", "Simulation: Plattform A")} note={NOTE()}>
          {() => <PlatformASim />}
        </SimButton>
        <SimButton label={tt("Open Platform B and try it", "Plattform B öffnen und ausprobieren")} sub={tt("Use it as a learner: do a task and see your path change.", "Nutzen Sie sie als Lernende: eine Aufgabe machen und sehen, wie sich Ihr Pfad ändert.")} url="platform-b.example/course" title={tt("Simulation: Platform B", "Simulation: Plattform B")} note={NOTE()}>
          {() => <PlatformBSim />}
        </SimButton>
      </div>
    </div>
  );
}

function Options() {
  const note = tt("Simulation · Case assumption: the course is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs ist erfunden · hier wird nichts als richtig oder falsch markiert.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Standardised learning paths", "Standardisierte Lernpfade"), thumb: <MeasureThumb kind="standard" />, info: tt("Every learner follows the same five lessons in the same fixed order. There is a course page and the lessons; nothing adapts.", "Jede Lernende folgt denselben fünf Lektionen in derselben festen Reihenfolge. Es gibt eine Kursseite und die Lektionen; nichts passt sich an."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Do a task and see what comes next.", "Machen Sie eine Aufgabe und sehen Sie, was als Nächstes kommt."), url: "platform.example/course?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Simple personalisation (rule-based)", "Einfache Personalisierung (regelbasiert)"), thumb: <MeasureThumb kind="rules" />, info: tt("Three visible rules change the path, for example adding practice after two mistakes. The platform says which rule it used, a page lists the rules, and the learner can undo a change.", "Drei sichtbare Regeln ändern den Pfad, zum Beispiel eine Übung nach zwei Fehlern. Die Plattform sagt, welche Regel sie angewendet hat, eine Seite listet die Regeln, und die Lernende kann eine Änderung rückgängig machen."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Finish tasks and see which rule fires.", "Beenden Sie Aufgaben und sehen Sie, welche Regel greift."), url: "platform.example/course?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("A complex AI-based system", "Ein komplexes KI-System"), thumb: <MeasureThumb kind="ai" />, info: tt("A model recommends the next lesson from many signals about how the learner learns. The learner sees a recommendation, a match score and a profile with signal values.", "Ein Modell empfiehlt die nächste Lektion aus vielen Signalen darüber, wie die Lernende lernt. Die Lernende sieht eine Empfehlung, einen Übereinstimmungswert und ein Profil mit Signalwerten."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Finish tasks and look at the recommendations.", "Beenden Sie Aufgaben und sehen Sie die Empfehlungen an."), url: "platform.example/course?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("a complex adaptive system", "ein komplexes adaptives System")}</li>
        <li>{tt("users do not understand the adaptations", "Nutzer verstehen die Anpassungen nicht")}</li>
        <li>{tt("acceptance is low", "die Akzeptanz ist gering")}</li>
      </ul>
      <Shots items={[{ which: "today", page: "path", name: tt("AdaptLearn · my path", "AdaptLearn · mein Pfad") }, { which: "today", page: "updates", name: tt("AdaptLearn · the updates", "AdaptLearn · die Aktualisierungen") }]} />
      <SimButton label={tt("Open AdaptLearn and try it", "AdaptLearn öffnen und ausprobieren")} sub={tt("Use the platform as one of its learners does: open the path, the updates and the learner model.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut: den Pfad, die Aktualisierungen und das Lernermodell öffnen.")} url="adaptlearn.example/path" title={tt("Simulation: AdaptLearn", "Simulation: AdaptLearn")} note={NOTE()}>
        {() => <AdaptLearnSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, a data engineer and the product team say, and what the platform records.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, ein Dateningenieur und das Produktteam sagen, und was die Plattform erfasst.")}
      url="mail.adaptlearn.example/inbox"
      title={tt("Simulation: the Chief Product & UX Officer's desk", "Simulation: der Schreibtisch des Chief Product & UX Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Product & UX Officer", "Posteingang · Chief Product & UX Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("A new learning platform", "Eine neue Lernplattform"), body: [tt("A new learning platform is to be developed for very different users, and competitors use adaptive systems. We want a prototype of a gamified and personalised platform, and we expect you to take responsibility for the system design.", "Eine neue Lernplattform soll für sehr unterschiedliche Nutzer entwickelt werden, und Wettbewerber nutzen adaptive Systeme. Wir wollen einen Prototyp einer gamifizierten und personalisierten Plattform und erwarten, dass Sie die Verantwortung für das Systemdesign übernehmen.")] },
            { from: tt("Support", "Support"), subject: tt("What I hear from learners", "Was ich von Lernenden höre"), body: [tt("Learners ask why their lessons change and I cannot tell them. Open the link to see AdaptLearn as a learner meets it today.", "Lernende fragen, warum sich ihre Lektionen ändern, und ich kann es ihnen nicht sagen. Öffnen Sie den Link, um AdaptLearn so zu sehen, wie eine Lernende ihm heute begegnet.")], attachments: [{ name: "adaptlearn.example/path", kind: "link", node: <AdaptLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("Why did my lesson change?", "Warum hat sich meine Lektion geändert?"), body: [tt("Yesterday I had five lessons and today one is hidden. Nothing tells me why. I do not trust it.", "Gestern hatte ich fünf Lektionen, und heute ist eine ausgeblendet. Nichts sagt mir, warum. Ich traue dem nicht.")] },
            { from: tt("A data engineer", "Ein Dateningenieur"), subject: tt("The data we have", "Die Daten, die wir haben"), body: [tt("We have few learners and few recorded actions per learner. The model mostly guesses, and I cannot explain a single recommendation.", "Wir haben wenige Lernende und wenige erfasste Handlungen pro Lernender. Das Modell rät meist, und ich kann keine einzelne Empfehlung erklären.")] },
            { from: tt("Product team", "Produktteam"), subject: tt("Ideas that keep coming up", "Ideen, die immer wieder genannt werden"), body: [tt("Three kinds of ideas came up: one standard path for all, a few simple rules, or a big AI system. We have not looked into any of them.", "Drei Arten von Ideen kamen auf: ein Standardpfad für alle, wenige einfache Regeln oder ein großes KI-System. Wir haben keine davon geprüft.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We can see what learners open and answer, but not whether an adaptation fits. The attached sheet shows what the platform records today.", "Wir sehen, was Lernende öffnen und beantworten, aber nicht, ob eine Anpassung passt. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")], attachments: [{ name: "what-adaptlearn-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                head={[tt("Data", "Daten"), tt("Recorded?", "Erfasst?")]}
                rows={[
                  [tt("What a learner opens", "Was eine Lernende öffnet"), tt("yes", "ja")],
                  [tt("What a learner answers", "Was eine Lernende beantwortet"), tt("yes", "ja")],
                  [tt("How well an adaptation fits", "Wie gut eine Anpassung passt"), tt("no", "nein")],
                  [tt("Whether learners understand a change", "Ob Lernende eine Änderung verstehen"), tt("no", "nein")],
                  [tt("Why learners ignore a suggestion", "Warum Lernende einen Vorschlag ignorieren"), tt("no", "nein")],
                  [tt("A test with a control group", "Ein Test mit einer Kontrollgruppe"), tt("none done", "nicht durchgeführt")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platforms: () => <Platforms />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay12 /> } };
