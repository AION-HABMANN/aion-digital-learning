"use client";

import { MateriA, MateriB } from "@/components/day13/Materi";
import { MeasureThumb } from "@/components/day13/mocks";
import { AccessLearnSim, OptionSim, PlatformShotOf } from "@/components/day13/sims";
import { ObserveDay13 } from "@/components/day13/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 13 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the platform is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Plattform ist erfunden · hier wird nichts als richtig oder falsch markiert.");

function Shots() {
  const items = [
    { page: "home", name: tt("AccessLearn · the dashboard", "AccessLearn · das Dashboard") },
    { page: "catA1", name: tt("AccessLearn · four levels into the catalogue", "AccessLearn · vier Ebenen tief im Katalog") },
    { page: "lesson0", name: tt("AccessLearn · a lesson", "AccessLearn · eine Lektion") },
    { page: "chart", name: tt("AccessLearn · a chart", "AccessLearn · ein Diagramm") },
  ];
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

function Platform() {
  return (
    <div className="space-y-3">
      <Shots />
      <SimButton label={tt("Open AccessLearn and try it", "AccessLearn öffnen und ausprobieren")} sub={tt("Use the platform as a learner does: open the menu, the catalogue, a lesson, a chart and a video, and see what you can and cannot read or reach.", "Nutzen Sie die Plattform so, wie eine Lernende es tut: das Menü, den Katalog, eine Lektion, ein Diagramm und ein Video öffnen und sehen, was Sie lesen oder erreichen können und was nicht.")} url="accesslearn.example/home" title={tt("Simulation: AccessLearn", "Simulation: AccessLearn")} note={NOTE()}>
        {() => <AccessLearnSim />}
      </SimButton>
    </div>
  );
}

function Options() {
  const note = NOTE();
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Improve the contrasts", "Kontraste verbessern"), thumb: <MeasureThumb kind="contrast" />, info: tt("Text and background get a strong contrast on every page. The menu, the catalogue and the content stay as they are.", "Text und Hintergrund bekommen auf jeder Seite einen starken Kontrast. Das Menü, der Katalog und die Inhalte bleiben, wie sie sind."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Use the platform with strong contrast and see what is still hard.", "Nutzen Sie die Plattform mit starkem Kontrast und sehen Sie, was noch schwer ist."), url: "accesslearn.example/home?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Simplify the navigation", "Navigation vereinfachen"), thumb: <MeasureThumb kind="nav" />, info: tt("Four menu entries instead of ten, and the courses in one flat list instead of four levels. The text stays pale and small.", "Vier Menüeinträge statt zehn, und die Kurse in einer flachen Liste statt vier Ebenen. Der Text bleibt blass und klein."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Find your course with the simpler menu and see what is still hard.", "Finden Sie Ihren Kurs mit dem einfacheren Menü und sehen Sie, was noch schwer ist."), url: "accesslearn.example/home?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Provide alternative content", "Alternative Inhalte bereitstellen"), thumb: <MeasureThumb kind="alt" />, info: tt("A text version of the chart, captions and a transcript for the video, and an audio version of a lesson. Contrast and menu stay as they are.", "Eine Textfassung des Diagramms, Untertitel und ein Transkript für das Video und eine Audio-Fassung einer Lektion. Kontrast und Menü bleiben, wie sie sind."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Open the chart and the video and see what is now available as text.", "Öffnen Sie das Diagramm und das Video und sehen Sie, was jetzt als Text verfügbar ist."), url: "accesslearn.example/home?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users with impairments cannot use the platform", "Nutzer mit Beeinträchtigungen können die Plattform nicht nutzen")}</li>
        <li>{tt("complaints are increasing", "die Beschwerden nehmen zu")}</li>
        <li>{tt("there are legal risks", "es bestehen rechtliche Risiken")}</li>
      </ul>
      <Shots />
      <SimButton label={tt("Open AccessLearn and try it", "AccessLearn öffnen und ausprobieren")} sub={tt("Use the platform as one of its learners does, then read what the learners write.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut, und lesen Sie dann, was die Lernenden schreiben.")} url="accesslearn.example/home" title={tt("Simulation: AccessLearn", "Simulation: AccessLearn")} note={NOTE()}>
        {() => <AccessLearnSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, legal and the content team say, and what is known about the content.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, die Rechtsabteilung und das Content-Team sagen, und was über die Inhalte bekannt ist.")}
      url="mail.accesslearn.example/inbox"
      title={tt("Simulation: the Chief Accessibility Officer's desk", "Simulation: der Schreibtisch des Chief Accessibility Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Accessibility Officer", "Posteingang · Chief Accessibility Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("The platform must become accessible", "Die Plattform muss barrierefrei werden"), body: [tt("The platform must become accessible. The budget is limited and the requirements keep increasing. We expect you to take responsibility at management level and to bring us a strategy.", "Die Plattform muss barrierefrei werden. Das Budget ist begrenzt, und die Anforderungen steigen weiter. Wir erwarten, dass Sie die Verantwortung auf Managementebene übernehmen und uns eine Strategie bringen.")] },
            { from: tt("Support", "Support"), subject: tt("What I hear from learners", "Was ich von Lernenden höre"), body: [tt("Learners with impairments write that they cannot use the platform, and the complaints are increasing. Open the link to see AccessLearn as they meet it today.", "Lernende mit Beeinträchtigungen schreiben, dass sie die Plattform nicht nutzen können, und die Beschwerden nehmen zu. Öffnen Sie den Link, um AccessLearn so zu sehen, wie sie ihm heute begegnen.")], attachments: [{ name: "accesslearn.example/home", kind: "link", node: <AccessLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("I cannot read the lessons", "Ich kann die Lektionen nicht lesen"), body: [tt("The text is pale and small, and the menu does not open with my keyboard. I have written three times and got no answer.", "Der Text ist blass und klein, und das Menü öffnet sich nicht mit meiner Tastatur. Ich habe dreimal geschrieben und keine Antwort bekommen.")] },
            { from: tt("Legal", "Rechtsabteilung"), subject: tt("The risk if we do nothing", "Das Risiko, wenn wir nichts tun"), body: [tt("The requirements for accessible platforms are rising, and a platform that is not accessible carries legal risks. I cannot say yet how exposed we are, because nobody has checked the platform.", "Die Anforderungen an barrierefreie Plattformen steigen, und eine Plattform, die nicht barrierefrei ist, birgt rechtliche Risiken. Ich kann noch nicht sagen, wie exponiert wir sind, weil niemand die Plattform geprüft hat.")] },
            { from: tt("Content team", "Content-Team"), subject: tt("What we publish", "Was wir veröffentlichen"), body: [tt("We have a lot of content: lessons, videos and charts. The attached sheet shows what we know about it today.", "Wir haben viele Inhalte: Lektionen, Videos und Diagramme. Die angehängte Tabelle zeigt, was wir heute darüber wissen.")], attachments: [{ name: "what-we-know-about-the-content.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What is known about the content today (Case assumption)", "Was heute über die Inhalte bekannt ist (Fallannahme)")}
                head={[tt("Content", "Inhalt"), tt("What is known", "Was bekannt ist")]}
                rows={[
                  [tt("Lessons", "Lektionen"), tt("text only, long blocks, few headings", "nur Text, lange Blöcke, wenige Überschriften")],
                  [tt("Videos", "Videos"), tt("most have no captions", "die meisten haben keine Untertitel")],
                  [tt("Charts", "Diagramme"), tt("none has a text version", "keines hat eine Textfassung")],
                  [tt("Audit against WCAG", "Audit gegen WCAG"), tt("none done", "nicht durchgeführt")],
                  [tt("How many items are affected", "Wie viele Inhalte betroffen sind"), tt("not known", "nicht bekannt")],
                ]}
              />
            ) }] },
            { from: tt("Design lead", "Design-Leitung"), subject: tt("Our design process", "Unser Designprozess"), body: [tt("Accessibility is not part of our design review today. New content is added every week, so whatever we fix can break again.", "Barrierefreiheit gehört heute nicht zu unserem Design-Review. Jede Woche kommt neuer Inhalt dazu, was wir beheben, kann also wieder kaputtgehen.")] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platform: () => <Platform />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay13 /> } };
