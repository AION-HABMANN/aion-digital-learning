"use client";

import { MateriA, MateriB } from "@/components/day11/Materi";
import { MeasureThumb } from "@/components/day11/mocks";
import { GameLearnSim, OptionSim, PlatformASim, PlatformBSim, PlatformShotOf } from "@/components/day11/sims";
import { ObserveDay11 } from "@/components/day11/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/** Day 11 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). */

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
          { which: "A", page: "lesson0", name: tt("Platform A · a lesson with its task", "Plattform A · eine Lektion mit ihrer Aufgabe") },
          { which: "B", page: "course", name: tt("Platform B · the course page", "Plattform B · die Kursseite") },
          { which: "B", page: "lesson0", name: tt("Platform B · a lesson", "Plattform B · eine Lektion") },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton label={tt("Open Platform A and try it", "Plattform A öffnen und ausprobieren")} sub={tt("Use it as a learner: do a task and see what happens.", "Nutzen Sie sie als Lernende: eine Aufgabe machen und sehen, was passiert.")} url="platform-a.example/course" title={tt("Simulation: Platform A", "Simulation: Plattform A")} note={NOTE()}>
          {() => <PlatformASim />}
        </SimButton>
        <SimButton label={tt("Open Platform B and try it", "Plattform B öffnen und ausprobieren")} sub={tt("Use it as a learner: read a lesson and go on.", "Nutzen Sie sie als Lernende: eine Lektion lesen und weitergehen.")} url="platform-b.example/course" title={tt("Simulation: Platform B", "Simulation: Plattform B")} note={NOTE()}>
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
        { id: "A", name: tt("A points and reward system", "Ein Punkte- und Belohnungssystem"), thumb: <MeasureThumb kind="points" />, info: tt("Every finished task gives points, the header shows them, and a rewards page lists what the points can buy. The lessons themselves stay as they are.", "Jede beendete Aufgabe gibt Punkte, die Kopfzeile zeigt sie, und eine Belohnungsseite listet, was die Punkte kaufen können. Die Lektionen selbst bleiben, wie sie sind."), simLabel: tt("Open option A and try it", "Option A öffnen und ausprobieren"), simSub: tt("Finish tasks, then look at the rewards.", "Beenden Sie Aufgaben und sehen Sie dann die Belohnungen an."), url: "platform.example/course?option=A", sim: () => <OptionSim option="A" />, note },
        { id: "B", name: tt("Visualise learning progress", "Lernfortschritt sichtbar machen"), thumb: <MeasureThumb kind="progress" />, info: tt("The course page and every lesson show the objectives mastered and a bar; finishing a task says which objective is mastered and what to practise next, and a progress page lists them.", "Die Kursseite und jede Lektion zeigen die gemeisterten Ziele und einen Balken; eine beendete Aufgabe sagt, welches Ziel gemeistert ist und was als Nächstes zu üben ist, und eine Fortschrittsseite listet sie."), simLabel: tt("Open option B and try it", "Option B öffnen und ausprobieren"), simSub: tt("Finish tasks and watch the objectives.", "Beenden Sie Aufgaben und beobachten Sie die Ziele."), url: "platform.example/course?option=B", sim: () => <OptionSim option="B" />, note },
        { id: "C", name: tt("Make content more interesting (without gamification)", "Inhalte interessanter gestalten (ohne Gamification)"), thumb: <MeasureThumb kind="story" />, info: tt("The lessons follow one story case, Kim renegotiating a contract, and each lesson ends with a decision she has to make. There are no points, no bar and no badges.", "Die Lektionen folgen einem Fallfaden, Kim verhandelt einen Vertrag nach, und jede Lektion endet mit einer Entscheidung, die sie treffen muss. Es gibt keine Punkte, keinen Balken und keine Abzeichen."), simLabel: tt("Open option C and try it", "Option C öffnen und ausprobieren"), simSub: tt("Follow the case and make the decisions.", "Folgen Sie dem Fall und treffen Sie die Entscheidungen."), url: "platform.example/course?option=C", sim: () => <OptionSim option="C" />, note },
      ]}
    />
  );
}

function Situation() {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("users collect points but learn little", "Nutzer sammeln Punkte, lernen aber wenig")}</li>
        <li>{tt("the focus is on the reward instead of the content", "der Fokus liegt auf der Belohnung statt auf dem Inhalt")}</li>
        <li>{tt("the gamification strategy is wrong and extrinsic motivation dominates", "die Gamification-Strategie ist falsch, und extrinsische Motivation dominiert")}</li>
      </ul>
      <Shots items={[{ which: "today", page: "dash", name: tt("GameLearn · the dashboard", "GameLearn · das Dashboard") }, { which: "today", page: "board", name: tt("GameLearn · the leaderboard", "GameLearn · die Rangliste") }]} />
      <SimButton label={tt("Open GameLearn and try it", "GameLearn öffnen und ausprobieren")} sub={tt("Use the platform as one of its learners does: click through the screens and watch the points.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut: durch die Seiten klicken und auf die Punkte sehen.")} url="gamelearn.example/dashboard" title={tt("Simulation: GameLearn", "Simulation: GameLearn")} note={NOTE()}>
        {() => <GameLearnSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
      sub={tt("The note from management, what support, a learner, the product team and a trainer say, and what the platform records.", "Die Nachricht der Geschäftsführung, was Support, eine Lernende, das Produktteam und ein Trainer sagen, und was die Plattform erfasst.")}
      url="mail.gamelearn.example/inbox"
      title={tt("Simulation: the Chief Engagement Officer's desk", "Simulation: der Schreibtisch des Chief Engagement Officer")}
      note={tt("Simulation · Case assumption: the messages and the attachments are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Anhänge sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Engagement Officer", "Posteingang · Chief Engagement Officer")}
          messages={[
            { from: tt("Management", "Geschäftsführung"), subject: tt("A gamification strategy", "Eine Gamification-Strategie"), body: [tt("User retention is low and competitors make heavy use of gamification. The budget is limited. We need a gamification strategy for the learning platform, and we expect you to take responsibility for its effect on behaviour.", "Die Nutzerbindung ist gering, und Wettbewerber setzen stark auf Gamification. Das Budget ist begrenzt. Wir brauchen eine Gamification-Strategie für die Lernplattform und erwarten, dass Sie die Verantwortung für ihre Wirkung auf das Verhalten übernehmen.")] },
            { from: tt("Support", "Support"), subject: tt("What I hear from learners", "Was ich von Lernenden höre"), body: [tt("Learners say they click through to get the points. Open the link to see the platform as a learner meets it today.", "Lernende sagen, sie klicken sich durch, um die Punkte zu bekommen. Öffnen Sie den Link, um die Plattform so zu sehen, wie eine Lernende ihr heute begegnet.")], attachments: [{ name: "gamelearn.example/dashboard", kind: "link", node: <GameLearnSim /> }] },
            { from: tt("A learner", "Eine Lernende"), subject: tt("I only click for the points", "Ich klicke nur für die Punkte"), body: [tt("I finish every screen because each gives points. I could not tell you what the lesson was about.", "Ich beende jede Seite, weil jede Punkte gibt. Ich könnte Ihnen nicht sagen, worum es in der Lektion ging.")] },
            { from: tt("Market news", "Marktmeldung"), subject: tt("Competitors", "Wettbewerber"), body: [tt("Competing platforms show points, badges and a leaderboard on every screen. Nobody publishes whether it works.", "Konkurrierende Plattformen zeigen auf jeder Seite Punkte, Abzeichen und eine Rangliste. Niemand veröffentlicht, ob es wirkt.")] },
            { from: tt("Product team", "Produktteam"), subject: tt("Ideas that keep coming up", "Ideen, die immer wieder genannt werden"), body: [tt("Three kinds of ideas came up: a points and reward system, making progress visible, and making the content itself more interesting. We have not looked into any of them.", "Drei Arten von Ideen kamen auf: ein Punkte- und Belohnungssystem, den Fortschritt sichtbar machen und den Inhalt selbst interessanter gestalten. Wir haben keine davon geprüft.")] },
            { from: tt("Analytics", "Analytics"), subject: tt("What we can see", "Was wir sehen können"), body: [tt("We can see logins and points, but not what the points change in learning. The attached sheet shows what the platform records today.", "Wir sehen Anmeldungen und Punkte, aber nicht, was die Punkte am Lernen ändern. Die angehängte Tabelle zeigt, was die Plattform heute erfasst.")], attachments: [{ name: "what-gamelearn-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                head={[tt("Data", "Daten"), tt("Recorded?", "Erfasst?")]}
                rows={[
                  [tt("Logins", "Anmeldungen"), tt("yes", "ja")],
                  [tt("Points awarded", "Vergebene Punkte"), tt("yes", "ja")],
                  [tt("Objectives mastered", "Gemeisterte Ziele"), tt("partly", "teilweise")],
                  [tt("What the points change in learning", "Was die Punkte am Lernen ändern"), tt("no", "nein")],
                  [tt("Why learners leave", "Warum Lernende gehen"), tt("no", "nein")],
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

export const KIT: FreeKit = { MateriA, MateriB, slots: { platforms: () => <Platforms />, options: () => <Options />, situation: () => <Situation />, desk: () => <Desk />, observe: () => <ObserveDay11 /> } };
