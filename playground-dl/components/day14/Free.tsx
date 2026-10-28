"use client";

import { MateriA, MateriB } from "@/components/day14/Materi";
import { MeasureThumb } from "@/components/day14/mocks";
import { ClearLearnSim, OptionSim, PlatformShotOf } from "@/components/day14/sims";
import { ObserveDay14 } from "@/components/day14/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { REF_21, REF_31 } from "@/data/day14/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 14 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the platform is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Plattform ist erfunden · hier wird nichts als richtig oder falsch markiert.");

function Shots({ items }: { items: { page: string; name: string }[] }) {
  return (
    <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2">
      {items.map((x) => (
        <figure key={x.page} role="img" aria-label={x.name}>
          <Fit><PlatformShotOf page={x.page} /></Fit>
          <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{x.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Text() {
  return (
    <div className="space-y-3">
      <Shots items={[{ page: "home", name: tt("ClearLearn · the welcome text", "ClearLearn · der Willkommenstext") }, { page: "enrol", name: tt("ClearLearn · the form and its message", "ClearLearn · das Formular und seine Meldung") }, { page: "support", name: tt("ClearLearn · the help text", "ClearLearn · der Hilfetext") }, { page: "repo", name: tt("ClearLearn · a page of resources", "ClearLearn · eine Seite mit Ressourcen") }]} />
      <SimButton label={tt("Open ClearLearn and try it", "ClearLearn öffnen und ausprobieren")} sub={tt("Read the interface texts as a new learner does: the welcome text, the form, the help page and the menu.", "Lesen Sie die Oberflächentexte so, wie eine neue Lernende es tut: den Willkommenstext, das Formular, die Hilfeseite und das Menü.")} url="clearlearn.example/home" title={tt("Simulation: ClearLearn", "Simulation: ClearLearn")} note={NOTE()}>
        {() => <ClearLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = NOTE();
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Simplify the content", "Inhalte vereinfachen"), thumb: <MeasureThumb kind="plain" />, info: tt("The interface texts are rewritten in short sentences and everyday words: the welcome text, the form, the messages and the help. The menu stays as it is.", "Die Oberflächentexte werden in kurzen Sätzen und Alltagswörtern neu geschrieben: der Willkommenstext, das Formular, die Meldungen und die Hilfe. Das Menü bleibt, wie es ist."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Read the texts and see what is still hard to find.", "Lesen Sie die Texte und sehen Sie, was noch schwer zu finden ist."), url: "clearlearn.example/home?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Improve the navigation", "Navigation verbessern"), thumb: <MeasureThumb kind="nav" />, info: tt("The six menu entries get clear names: Start, My courses, Library, All courses, Settings, Help. The texts stay as they are.", "Die sechs Menüeinträge bekommen klare Namen: Start, Meine Kurse, Bibliothek, Alle Kurse, Einstellungen, Hilfe. Die Texte bleiben, wie sie sind."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Find your course with the clearer menu and read what is still hard.", "Finden Sie Ihren Kurs mit dem klareren Menü und lesen Sie, was noch schwer ist."), url: "clearlearn.example/home?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Add additional functions", "Zusätzliche Funktionen ergänzen"), thumb: <MeasureThumb kind="functions" />, info: tt("A chat, badges, a forum and a planner are added to the menu. The texts and the menu names stay as they are.", "Ein Chat, Abzeichen, ein Forum und ein Planer kommen ins Menü. Die Texte und die Menünamen bleiben, wie sie sind."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Open the new functions and see how the platform feels now.", "Öffnen Sie die neuen Funktionen und sehen Sie, wie sich die Plattform jetzt anfühlt."), url: "clearlearn.example/home?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users do not understand the content", "Nutzer verstehen die Inhalte nicht")}</li>
        <li>{tt("the navigation is unclear", "die Navigation ist unklar")}</li>
        <li>{tt("usage is low", "die Nutzung ist gering")}</li>
      </ul>
      <Shots items={[{ page: "work", name: tt("ClearLearn · my courses", "ClearLearn · meine Kurse") }, { page: "dir", name: tt("ClearLearn · the directory", "ClearLearn · das Verzeichnis") }, { page: "console", name: tt("ClearLearn · the console", "ClearLearn · die Konsole") }, { page: "support", name: tt("ClearLearn · support", "ClearLearn · Support") }]} />
      <SimButton label={tt("Open ClearLearn and try it", "ClearLearn öffnen und ausprobieren")} sub={tt("Use the platform as one of its learners does: find a course, open a lesson and look for help.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut: einen Kurs finden, eine Lektion öffnen und nach Hilfe suchen.")} url="clearlearn.example/home" title={tt("Simulation: ClearLearn", "Simulation: ClearLearn")} note={NOTE()}>
        {() => <ClearLearnSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, the head of learning and analytics say, and what is known about the platform.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, die Leiterin Lernen und Analytics sagen, und was über die Plattform bekannt ist.")}
      url="mail.clearlearn.example/inbox"
      title={tt("Simulation: the Chief Usability & Experience Officer's desk", "Simulation: der Schreibtisch des Chief Usability & Experience Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Usability & Experience Officer", "Posteingang · Chief Usability & Experience Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("The platform is too complex", "Die Plattform ist zu komplex"), body: [tt("The platform is too complex, users do not understand the content and the drop-out rate is rising. We expect a strategy that makes the platform understandable, and we expect you to take responsibility for user success.", "Die Plattform ist zu komplex, Nutzer verstehen die Inhalte nicht, und die Abbruchquote steigt. Wir erwarten eine Strategie, die die Plattform verständlich macht, und dass Sie die Verantwortung für den Nutzererfolg übernehmen.")] },
            { from: tt("Support", "Support"), subject: tt("What I hear from learners", "Was ich von Lernenden höre"), body: [tt("Most questions start with “where do I find …” or “what does this mean”. Open the link to see ClearLearn as a new learner meets it today.", "Die meisten Fragen beginnen mit „Wo finde ich …“ oder „Was bedeutet das“. Öffnen Sie den Link, um ClearLearn so zu sehen, wie eine neue Lernende ihm heute begegnet.")], attachments: [{ name: "clearlearn.example/home", kind: "link", node: <ClearLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("I gave up on the first page", "Ich habe auf der ersten Seite aufgegeben"), body: [tt("The first page is one long sentence full of words I do not know, and I could not find my course in the menu. I stopped after two days.", "Die erste Seite ist ein langer Satz voller Wörter, die ich nicht kenne, und ich fand meinen Kurs im Menü nicht. Nach zwei Tagen habe ich aufgehört.")] },
            { from: tt("Head of learning", "Leiterin Lernen"), subject: tt("The content is correct", "Der Inhalt ist korrekt"), body: [tt("The content is correct and complete, and the subject is not simple. I worry that if we simplify, we lose what advanced learners need.", "Der Inhalt ist korrekt und vollständig, und das Thema ist nicht einfach. Ich fürchte, wenn wir vereinfachen, verlieren wir, was fortgeschrittene Lernende brauchen.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We can see that the drop-out rate is rising, but not where in a lesson learners stop. The attached sheet shows what is known today.", "Wir sehen, dass die Abbruchquote steigt, aber nicht, wo in einer Lektion Lernende aufhören. Die angehängte Tabelle zeigt, was heute bekannt ist.")], attachments: [{ name: "what-we-know-about-clearlearn.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What is known about ClearLearn today (Case assumption)", "Was heute über ClearLearn bekannt ist (Fallannahme)")}
                head={[tt("Question", "Frage"), tt("What is known", "Was bekannt ist")]}
                rows={[
                  [tt("Is the drop-out rate rising?", "Steigt die Abbruchquote?"), tt("yes", "ja")],
                  [tt("Where in a lesson do learners stop?", "Wo in einer Lektion hören Lernende auf?"), tt("not recorded", "nicht erfasst")],
                  [tt("Was a text ever tested with learners?", "Wurde je ein Text mit Lernenden getestet?"), tt("no", "nein")],
                  [tt("Was the menu ever tested?", "Wurde das Menü je getestet?"), tt("no", "nein")],
                  [tt("Why do learners stop?", "Warum hören Lernende auf?"), tt("not known", "nicht bekannt")],
                ]}
              />
            ) }] },
            { from: tt("Design lead", "Design-Leitung"), subject: tt("Our process", "Unser Prozess"), body: [tt("We have not tested any text with real learners so far, and nobody owns the structure of the platform.", "Wir haben bisher keinen Text mit echten Lernenden getestet, und niemand verantwortet die Struktur der Plattform.")] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { text: () => <Text />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay14 />, reference: () => <ReferenceButton spec={REF_31()} /> } };
