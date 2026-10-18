"use client";

import { MateriA, MateriB } from "@/components/day5/Materi";
import { MeasureThumb } from "@/components/day5/mocks";
import { LearnBaseScreens } from "@/components/day5/Screens";
import { LearnBaseOptionSim, LearnBaseSim } from "@/components/day5/sims";
import { ObserveDay5 } from "@/components/day5/observe";
import { DeskSim } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import { RevealHint } from "@/components/ui/RevealHint";
import { FACTS } from "@/data/day5/case";
import type { FreeKit } from "@/lib/dayFree/spec";
import { scrollToAndFlash } from "@/lib/flash";
import { tt } from "@/lib/lang";

/** Day 5 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

const NOTE = () => tt("Simulation · Case assumption: the screens, the lessons and the numbers of entries are made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Bildschirme, die Lektionen und die Zahlen der Einträge sind erfunden · hier wird nichts als richtig oder falsch markiert.");

function Platform() {
  return (
    <div className="space-y-3">
      <LearnBaseScreens />
      <SimButton label={tt("Open LearnBase and use it", "LearnBase öffnen und nutzen")} sub={tt("Use it as a learner: find a course and start it.", "Nutzen Sie es als Lernende: einen Kurs finden und ihn starten.")} url="learnbase.example/home" title={tt("Simulation: LearnBase", "Simulation: LearnBase")} note={NOTE()}>
        {() => <LearnBaseSim />}
      </SimButton>
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
        <p className="mt-2 text-caption text-ash">{tt("These say what is there, not whether it is good or bad. That is for you to say. The numbers are Case assumptions.", "Sie sagen, was da ist, nicht ob es gut oder schlecht ist. Das sagen Sie. Die Zahlen sind Fallannahmen.")}</p>
      </RevealHint>
    </div>
  );
}

function Options() {
  const url = (o: string) => `learnbase.example/home?option=${o}`;
  const sub = tt("Use the home screen as it would be after this measure.", "Nutzen Sie den Startbildschirm, wie er nach dieser Maßnahme wäre.");
  return (
    <OptionCards
      options={[
        { id: "A", name: tt("Add more content (business goal)", "Mehr Inhalt hinzufügen (Geschäftsziel)"), thumb: <MeasureThumb kind="courses" />, info: tt("Many more courses are added to the catalogue and shown on the home screen. The menu stays as it is.", "Viele weitere Kurse werden dem Katalog hinzugefügt und auf dem Startbildschirm gezeigt. Das Menü bleibt, wie es ist."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: sub, url: url("A"), sim: () => <LearnBaseOptionSim option="A" />, note: NOTE() },
        { id: "B", name: tt("Simplify navigation (UX goal)", "Navigation vereinfachen (UX-Ziel)"), thumb: <MeasureThumb kind="nav" />, info: tt("The menu is reduced to a few entries in plain words. The courses stay as they are.", "Das Menü wird auf wenige Einträge in einfachen Worten reduziert. Die Kurse bleiben, wie sie sind."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: sub, url: url("B"), sim: () => <LearnBaseOptionSim option="B" />, note: NOTE() },
        { id: "C", name: tt("Develop new features (marketing goal)", "Neue Features entwickeln (Marketingziel)"), thumb: <MeasureThumb kind="features" />, info: tt("New features are added to the home screen: a learning feed, a leaderboard and an AI coach. The menu and the courses stay as they are.", "Neue Features kommen auf den Startbildschirm: ein Lern-Feed, eine Rangliste und ein KI-Coach. Das Menü und die Kurse bleiben, wie sie sind."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: sub, url: url("C"), sim: () => <LearnBaseOptionSim option="C" />, note: NOTE() },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("many functions, but low usage", "viele Funktionen, aber geringe Nutzung")}</li>
        <li>{tt("users cannot find content", "Nutzer finden Inhalte nicht")}</li>
        <li>{tt("high frustration", "hohe Frustration")}</li>
      </ul>
      <p className="smallcaps pt-1 text-ash">{tt("The analysis so far", "Die bisherige Analyse")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("system logic instead of user logic", "Systemlogik statt Nutzerlogik")}</li>
        <li>{tt("no clear user guidance", "keine klare Nutzerführung")}</li>
      </ul>
      <p>
        {tt("LearnBase is the platform of Block 1.1.", "LearnBase ist die Plattform aus Block 1.1.")}{" "}
        <button type="button" onClick={() => scrollToAndFlash("slot-platform", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("See the pictures", "Bilder ansehen")}
        </button>
      </p>
      <SimButton label={tt("Open LearnBase and use it", "LearnBase öffnen und nutzen")} sub={tt("Use the platform as one of its learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut.")} url="learnbase.example/home" title={tt("Simulation: LearnBase", "Simulation: LearnBase")} note={NOTE()}>
        {() => <LearnBaseSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management and the views of the stakeholders.", "Die Nachricht der Geschäftsführung und die Sichtweisen der Stakeholder.")}
      url="mail.learnbase.example/inbox"
      title={tt("Simulation: the Chief UX Strategist's desk", "Simulation: der Schreibtisch der Chief UX Strategist")}
      note={tt("Simulation · Case assumption: the messages are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief UX Strategist", "Posteingang · Chief UX Strategist")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("A user-centred UX strategy", "Eine nutzerzentrierte UX-Strategie"), body: [tt("The platform is growing, but user satisfaction is declining. We need a user-centred UX strategy, and we expect you to take responsibility for the decisions.", "Die Plattform wächst, aber die Nutzerzufriedenheit sinkt. Wir brauchen eine nutzerzentrierte UX-Strategie und erwarten, dass Sie die Verantwortung für die Entscheidungen übernehmen.")] },
            { from: tt("Product", "Produkt"), subject: tt("Many features, little usage", "Viele Features, wenig Nutzung"), body: [tt("We have many features, but few of them are used.", "Wir haben viele Features, aber nur wenige werden genutzt.")] },
            { from: tt("Stakeholders", "Stakeholder"), subject: tt("Different goals", "Unterschiedliche Ziele"), body: [tt("Internal stakeholders pursue different goals. Not everyone wants the same thing from the platform, and there is no complete data on what users need.", "Interne Stakeholder verfolgen unterschiedliche Ziele. Nicht alle wollen dasselbe von der Plattform, und es gibt keine vollständigen Daten darüber, was Nutzer brauchen.")] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { platform: () => <Platform />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay5 /> } };
