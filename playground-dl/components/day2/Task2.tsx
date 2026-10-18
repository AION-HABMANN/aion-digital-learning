"use client";

import { useEffect, useState } from "react";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { CellField, GridTable, LayoutLink } from "@/components/ui/FormOrTable";
import { RowsTable } from "@/components/ui/RowsTable";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { CaseKnown } from "@/components/ui/CaseKnown";
import { FacilitatorCard } from "@/components/ui/FacilitatorCard";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { ObserveDay2 } from "@/components/day2/observe";
import { CpoDeskSim } from "@/components/day2/sims";
import { SimButton } from "@/components/sim/SimFrame";
import { VERDICTS } from "@/data/day2/case";
import type { Verdict } from "@/data/day2/case";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { adaptiveKey } from "@/lib/day2/answerKey";
import { memoBody } from "@/lib/day2/exportDoc";
import { prototypingGuide, r2AdaptiveGuide, riskTextGuide, roadmapGuide, testingGuide, uncertainGuide } from "@/lib/day2/guides";
import { IDS, r2Missing } from "@/lib/day2/missing";
import { DATA_GUIDE, RISK_GUIDE, ROAD_GUIDE, UNC_GUIDE } from "@/data/day2/tableGuides";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_ROWS } from "@/lib/day2/progress";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/**
 * Day 2 · Route 2 · the UX Strategy Memo (Level 3, CLAUDE.md #57): the plan's transfer project as six free answers in one Core block: a decision
 * on adaptive learning, a prototyping strategy, a UX testing strategy, a prioritised innovation roadmap, a risk analysis, and one decision made
 * under uncertainty. The plan prints no budget or cost figure, so the site prints none.
 */

function CaseBrief() {
  const r1 = useStore((s) => s.d2.r1);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: LearnPro's Chief Product Officer", "Die Lage: Chief Product Officer von LearnPro")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          "You are the Chief Product Officer of an EdTech company, LearnPro. Competitors use AI and adaptive systems, your own platform is outdated, the budget is limited and your data situation is incomplete. You are asked to develop a future strategy for the learning platform and to take responsibility for the investment decisions.",
          "Sie sind Chief Product Officer eines EdTech-Unternehmens, LearnPro. Wettbewerber nutzen KI und adaptive Systeme, Ihre eigene Plattform ist veraltet, das Budget ist begrenzt und Ihre Datenlage ist unvollständig. Sie sollen eine Zukunftsstrategie für die Lernplattform entwickeln und die Verantwortung für die Investitionsentscheidungen übernehmen.",
        )}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The framework", "Die Rahmenbedingungen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Competitors use AI and adaptive systems", "Wettbewerber nutzen KI und adaptive Systeme")}</li>
            <li>{tt("Your own platform is outdated", "Ihre eigene Plattform ist veraltet")}</li>
            <li>{tt("The budget is limited", "Das Budget ist begrenzt")}</li>
            <li>{tt("The data situation is incomplete", "Die Datenlage ist unvollständig")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · one block, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · ein Block, ca. ${CORE2_MINUTES} Min.`)}</p>
          <p className="mt-1 text-ink">{tt("Block 3.1 asks six questions: your decision on adaptive learning, your prototyping strategy, your UX testing strategy, a prioritised innovation roadmap, a risk analysis, and one decision you make on purpose under uncertainty.", "Block 3.1 stellt sechs Fragen: Ihre Entscheidung zu adaptivem Lernen, Ihre Prototyping-Strategie, Ihre UX-Teststrategie, eine priorisierte Innovations-Roadmap, eine Risikoanalyse und eine Entscheidung, die Sie bewusst unter Unsicherheit treffen.")}</p>
        </div>
      </div>
      <p className="text-caption text-ash">
        {r1.adaptive ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: you decided on adaptive learning: ", "Ihre Antwort aus Route 1, als weicher Hinweis: Sie haben zu adaptivem Lernen entschieden: ")}
            <strong className="text-ink">{VERDICTS.find((v) => v.id === r1.adaptive)?.label}</strong>.{" "}
            <button type="button" onClick={() => jump("block-2-1", routeHref(2, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <SimButton
        label={tt("Open your desk and read what is waiting", "Ihren Schreibtisch öffnen und lesen, was wartet")}
        sub={tt("The note from management, the competitor news, what the platform records, and LearnPro today.", "Die Nachricht der Geschäftsführung, die Meldungen der Wettbewerber, was die Plattform erfasst, und LearnPro heute.")}
        url="mail.learnpro.example/inbox"
        title={tt("Simulation: the Chief Product Officer's desk", "Simulation: der Schreibtisch der Chief Product Officer")}
        note={tt("Simulation · Case assumption: the messages and the data table are made up from the brief · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Nachrichten und die Datentabelle sind aus dem Auftrag erfunden · hier wird nichts als richtig oder falsch markiert.")}
      >
        {() => <CpoDeskSim />}
      </SimButton>
      <ObserveDay2 />
      <CaseKnown
        id="case-known-2"
        title={tt("What is known and what is open", "Was bekannt ist und was offen ist")}
        columns={[
          {
            title: tt("In the brief", "Im Auftrag"),
            items: [
              tt("Competitors use AI and adaptive systems.", "Wettbewerber nutzen KI und adaptive Systeme."),
              tt("Your own platform is outdated.", "Ihre eigene Plattform ist veraltet."),
              tt("The budget is limited.", "Das Budget ist begrenzt."),
              tt("The data situation is incomplete.", "Die Datenlage ist unvollständig."),
            ],
          },
          {
            title: tt("Clear · Case assumption", "Klar · Fallannahme"),
            items: [
              tt("You lead the product of LearnPro, the platform of Route 1.", "Sie verantworten das Produkt von LearnPro, der Plattform aus Route 1."),
              tt("What competitors offer is known from their public pages and news, not from their numbers.", "Was Wettbewerber bieten, ist aus ihren öffentlichen Seiten und Meldungen bekannt, nicht aus ihren Zahlen."),
              tt("What LearnPro records today is listed in the table on the desk (open the simulation).", "Was LearnPro heute erfasst, steht in der Tabelle auf dem Schreibtisch (Simulation öffnen)."),
            ],
          },
          {
            title: tt("Open · on purpose", "Offen · mit Absicht"),
            items: [
              tt("How much the competitors' adaptive systems really achieve.", "Wie viel die adaptiven Systeme der Wettbewerber wirklich erreichen."),
              tt("What exactly is missing in the data, and what it would show.", "Was in den Daten genau fehlt und was es zeigen würde."),
              tt("How large the budget is: it is not set.", "Wie groß das Budget ist: Es ist nicht festgelegt."),
            ],
          },
        ]}
        note={tt("As in most projects, not everything is known. Decide anyway, and say what you assume.", "Wie in den meisten Projekten ist nicht alles bekannt. Entscheiden Sie trotzdem, und sagen Sie, was Sie annehmen.")}
      />
      <FacilitatorCard
        id="case-qa-card-2"
        ariaLabel={tt("Case questions for the facilitator", "Fall-Fragen für die Moderation")}
        openLabel={tt("Case questions · if a participant asks", "Fall-Fragen · wenn Teilnehmende fragen")}
        hideLabel={tt("Hide the case questions", "Die Fall-Fragen ausblenden")}
        sections={[
          {
            kicker: tt("If a participant asks …", "Wenn Teilnehmende fragen …"),
            qa: [
              {
                q: tt("What exactly is the budget?", "Wie hoch ist das Budget genau?"),
                a: tt("It is not set, on purpose. Ask the participant to write down what they assume, and whether the decision would change if the budget were twice as large or half as large.", "Es ist mit Absicht nicht festgelegt. Bitten Sie die Teilnehmenden aufzuschreiben, was sie annehmen, und ob sich die Entscheidung ändern würde, wenn das Budget doppelt so groß oder halb so groß wäre."),
              },
              {
                q: tt("Do the competitors' adaptive systems work?", "Funktionieren die adaptiven Systeme der Wettbewerber?"),
                a: tt("It is known only from their public pages; there are no numbers. Do not invent their results; say what you would find out.", "Es ist nur aus ihren öffentlichen Seiten bekannt; es gibt keine Zahlen. Erfinden Sie keine Ergebnisse; sagen Sie, was Sie herausfinden würden."),
              },
              {
                q: tt("What data is missing?", "Welche Daten fehlen?"),
                a: tt("See the table on the desk: where learners stop is recorded; why they leave, how long a lesson takes and what a learner already knows are not.", "Siehe die Tabelle auf dem Schreibtisch: Wo Lernende aufhören, wird erfasst; warum sie gehen, wie lange eine Lektion dauert und was eine Lernende schon weiß, nicht."),
              },
            ],
          },
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: competitors use AI and adaptive systems, an outdated platform, a limited budget, incomplete data. It prints no figure, so none is used here. The facts marked “Clear” are made up for this exercise.", "Der Auftrag sagt: Wettbewerber nutzen KI und adaptive Systeme, eine veraltete Plattform, ein begrenztes Budget, unvollständige Daten. Er nennt keine Zahl, daher wird hier keine verwendet. Die als „Klar“ markierten Fakten sind für diese Übung erfunden.")}</p>
      </Callout>
    </section>
  );
}

function useR2() {
  return { r: useStore((s) => s.d2.r2), patch: useStore((s) => s.patchD2R2), mentor: useStore((s) => s.mentorUnlocked) };
}

/* ------------------------------------------------------------------ Block 3.1 */

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  const b = (id: string, part: "rules" | "calc" | "table" = "rules") => () => showCardPart(id as "B1", part);
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Develop a future strategy for the learning platform", "Block 3.1 · Eine Zukunftsstrategie für die Lernplattform entwickeln")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the situation above, then the six questions below.", "Route 2 → Task 2 → die Lage oben, dann die sechs Fragen darunter.")}
    >
      <MaterialRefs refs={["B1", "B2", "B3"]} />

      <p className="smallcaps text-ash">{tt("Question 1 of 6", "Frage 1 von 6")}</p>
      <Field id={IDS.r2Adaptive} label={tt("Decision: do we invest in adaptive learning?", "Entscheidung: investieren wir in adaptives Lernen?")} help={tt("Choose one. “Partly” is a real answer.", "Wählen Sie eine. „Teilweise“ ist eine echte Antwort.")}>
        <OptionList<Verdict> options={VERDICTS.map((v) => ({ id: v.id, label: v.label }))} value={r.adaptive} onChange={(id) => patch({ adaptive: id })} label={tt("Adaptive learning", "Adaptives Lernen")} cols={2} />
      </Field>
      <TextBox
        id={IDS.r2AdaptiveWhy}
        label={tt("Why?", "Warum?")}
        help={tt(`Say why. If you say Partly, say what you fund now and what waits. At least ${MIN_LINE} characters.`, `Sagen Sie, warum. Wenn Sie „Teilweise“ sagen, nennen Sie, was Sie jetzt finanzieren und was wartet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.adaptiveWhy}
        onChange={(v) => patch({ adaptiveWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="r2adaptive-kit"
          refs={[{ label: tt("The situation", "Die Lage"), value: tt("competitors · outdated · limited budget · incomplete data", "Wettbewerber · veraltet · begrenztes Budget · unvollständige Daten"), target: "task-2" }]}
          steps={[
            tt("Weigh the competitors' AI against the learner problem it would solve, the data you have and the budget.", "Wägen Sie die KI der Wettbewerber gegen das Lernendenproblem ab, das sie lösen würde, gegen die Daten, die Sie haben, und das Budget."),
            tt("Name the simplest first step, and what you leave for later.", "Nennen Sie den einfachsten ersten Schritt und was Sie auf später verschieben."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="r2adaptive-example" guide={r2AdaptiveGuide()} />
      {mentor && <MentorGuide guide={r2AdaptiveGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 6", "Frage 2 von 6")}</p>
      <TextBox
        id={IDS.prototyping}
        label={tt("Prototyping strategy: how do we test new features?", "Prototyping-Strategie: wie testen wir neue Funktionen?")}
        help={tt(`Say which fidelity you start with, what you test first, and what has to be true before something is built. At least ${MIN_LINE} characters.`, `Sagen Sie, mit welcher Fidelity Sie beginnen, was Sie zuerst testen und was gelten muss, bevor etwas gebaut wird. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.prototyping}
        onChange={(v) => patch({ prototyping: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="prototyping-kit"
          steps={[
            tt("Choose how you start (low or high fidelity) and why it fits a limited budget and incomplete data.", "Wählen Sie, wie Sie beginnen (Low oder High Fidelity), und warum es zu einem begrenzten Budget und unvollständigen Daten passt."),
            tt("Say what a new feature has to show in a test before it is built.", "Sagen Sie, was eine neue Funktion in einem Test zeigen muss, bevor sie gebaut wird."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="prototyping-example" guide={prototypingGuide()} />
      {mentor && <MentorGuide guide={prototypingGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 6", "Frage 3 von 6")}</p>
      {r.dataMode === "text" ? (
        <TextBox
          id={IDS.testing}
          label={tt("UX testing strategy: which data do we need?", "UX-Teststrategie: welche Daten brauchen wir?")}
          help={tt(`Name the data, say which you already have and how you get the rest. At least ${MIN_LINE} characters.`, `Nennen Sie die Daten, sagen Sie, welche Sie schon haben und wie Sie den Rest bekommen. Mindestens ${MIN_LINE} Zeichen.`)}
          value={r.testing}
          onChange={(v) => patch({ testing: v })}
          min={MIN_LINE}
          rows={4}
        >
          <WritingHelp
            id="testing-kit"
            steps={[
              tt("List the data you need: what says how many (drop-out, time, completion) and what says why (tests, interviews).", "Listen Sie die Daten auf, die Sie brauchen: was sagt, wie viele (Abbruch, Zeit, Abschluss), und was sagt, warum (Tests, Interviews)."),
              tt("Mark what you have today and how you collect what is missing.", "Markieren Sie, was Sie heute haben und wie Sie das Fehlende erheben."),
            ]}
          />
        </TextBox>
      ) : (
        <RowsTable
          id={IDS.testing}
          label={tt("UX testing strategy: which data do we need?", "UX-Teststrategie: welche Daten brauchen wir?")}
          help={tt(`One row per piece of data: the data, whether you have it today, how you get it. Add rows as you need. At least ${MIN_ROWS} complete rows.`, `Eine Zeile pro Information: die Daten, ob Sie sie heute haben, wie Sie sie bekommen. Fügen Sie Zeilen hinzu, wie Sie sie brauchen. Mindestens ${MIN_ROWS} vollständige Zeilen.`)}
          cols={[{ key: "data", label: tt("Data", "Daten") }, { key: "have", label: tt("Have it already?", "Schon vorhanden?") }, { key: "how", label: tt("How you get it", "Wie Sie sie bekommen") }]}
          rows={r.dataRows}
          onCell={(i, k, v) => patch((st) => ({ dataRows: st.dataRows.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }))}
          onAdd={() => patch((st) => ({ dataRows: [...st.dataRows, { data: "", have: "", how: "" }] }))}
          onRemoveLast={() => patch((st) => ({ dataRows: st.dataRows.slice(0, -1) }))}
          rowId={IDS.dataRow}
          guide={DATA_GUIDE}
        />
      )}
      <LayoutLink mode={r.dataMode} onMode={(m) => patch({ dataMode: m })} backText={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />
      <ExampleAnswer id="testing-example" guide={testingGuide()} />
      {mentor && <MentorGuide guide={testingGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 4 of 6", "Frage 4 von 6")}</p>
      {r.roadMode === "text" ? (
        <TextBox
          id={IDS.roadmap}
          label={tt("A prioritised innovation roadmap", "Eine priorisierte Innovations-Roadmap")}
          help={tt(`One item per line, the first priority first. Say what waits for later. At least ${MIN_LINE} characters.`, `Ein Punkt pro Zeile, die erste Priorität zuerst. Sagen Sie, was auf später wartet. Mindestens ${MIN_LINE} Zeichen.`)}
          value={r.roadmap}
          onChange={(v) => patch({ roadmap: v })}
          min={MIN_LINE}
          rows={6}
          placeholder={tt("1. …\n2. …\n3. …\nLater: …", "1. …\n2. …\n3. …\nSpäter: …")}
        >
          <WritingHelp
            id="roadmap-kit"
            refs={[{ label: tt("How to prioritise a roadmap (Materi B2)", "Wie man eine Roadmap priorisiert (Materi B2)"), value: tt("rules of the card", "Regeln der Karte"), target: "mat-B2", before: b("B2") }]}
            steps={[
              tt("Put first what helps every learner and what the others depend on.", "Setzen Sie an die erste Stelle, was jeder Lernenden hilft und wovon die anderen Punkte abhängen."),
              tt("Order the rest, and say what you postpone and why.", "Ordnen Sie den Rest und sagen Sie, was Sie verschieben und warum."),
            ]}
          />
        </TextBox>
      ) : (
        <RowsTable
          id={IDS.roadmap}
          label={tt("A prioritised innovation roadmap", "Eine priorisierte Innovations-Roadmap")}
          help={tt(`One row per step, the first priority first: what, and why it has this place. Put what waits for later in the last rows. At least ${MIN_ROWS} complete rows.`, `Eine Zeile pro Schritt, die erste Priorität zuerst: was, und warum er diesen Platz hat. Setzen Sie, was auf später wartet, in die letzten Zeilen. Mindestens ${MIN_ROWS} vollständige Zeilen.`)}
          cols={[{ key: "item", label: tt("What", "Was") }, { key: "why", label: tt("Why in this place", "Warum an dieser Stelle") }]}
          rows={r.roadRows}
          onCell={(i, k, v) => patch((st) => ({ roadRows: st.roadRows.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }))}
          onAdd={() => patch((st) => ({ roadRows: [...st.roadRows, { item: "", why: "" }] }))}
          onRemoveLast={() => patch((st) => ({ roadRows: st.roadRows.slice(0, -1) }))}
          rowId={IDS.roadRow}
          guide={ROAD_GUIDE} numbered orderHead={tt("Order", "Reihenfolge")}
        />
      )}
      <LayoutLink mode={r.roadMode} onMode={(m) => patch({ roadMode: m })} backText={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />
      <ExampleAnswer id="roadmap-example" guide={roadmapGuide()} />
      {mentor && <MentorGuide guide={roadmapGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 5 of 6", "Frage 5 von 6")}</p>
      {r.riskMode === "text" ? (
        <TextBox
          id={IDS.riskText}
          label={tt("Risk analysis: technology against user value", "Risikoanalyse: Technologie gegen Nutzerwert")}
          help={tt(`Name the risks of the technology and of the user side, and what you do about the biggest. At least ${MIN_LINE} characters.`, `Nennen Sie die Risiken der Technologie und der Nutzerseite und was Sie gegen das größte tun. Mindestens ${MIN_LINE} Zeichen.`)}
          value={r.riskText}
          onChange={(v) => patch({ riskText: v })}
          min={MIN_LINE}
          rows={4}
        >
          <WritingHelp
            id="risktext-kit"
            steps={[
              tt("Ask what could go wrong if you buy the technology, and what could go wrong for the learners if you do not.", "Fragen Sie, was schiefgehen kann, wenn Sie die Technologie kaufen, und was für die Lernenden, wenn Sie es nicht tun."),
              tt("Pick the biggest risk and say what your plan does about it.", "Wählen Sie das größte Risiko und sagen Sie, was Ihr Plan dagegen tut."),
            ]}
          />
        </TextBox>
      ) : (
        <RowsTable
          id={IDS.riskText}
          label={tt("Risk analysis: technology against user value", "Risikoanalyse: Technologie gegen Nutzerwert")}
          help={tt(`One row per risk: the risk, whose it is (the technology or the users), what you do about it. At least ${MIN_ROWS} complete rows.`, `Eine Zeile pro Risiko: das Risiko, wessen es ist (die Technologie oder die Nutzer), was Sie dagegen tun. Mindestens ${MIN_ROWS} vollständige Zeilen.`)}
          cols={[{ key: "risk", label: tt("Risk", "Risiko") }, { key: "side", label: tt("Side", "Seite") }, { key: "action", label: tt("What you do about it", "Was Sie dagegen tun") }]}
          rows={r.riskRows}
          onCell={(i, k, v) => patch((st) => ({ riskRows: st.riskRows.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }))}
          onAdd={() => patch((st) => ({ riskRows: [...st.riskRows, { risk: "", side: "", action: "" }] }))}
          onRemoveLast={() => patch((st) => ({ riskRows: st.riskRows.slice(0, -1) }))}
          rowId={IDS.riskRow}
          guide={RISK_GUIDE}
        />
      )}
      <LayoutLink mode={r.riskMode} onMode={(m) => patch({ riskMode: m })} backText={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />
      <ExampleAnswer id="risktext-example" guide={riskTextGuide()} />
      {mentor && <MentorGuide guide={riskTextGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 6 of 6", "Frage 6 von 6")}</p>
      {r.uncMode === "text" ? (
        <TextBox
          id={IDS.uncertain}
          label={tt("Make one decision under uncertainty, on purpose", "Treffen Sie bewusst eine Entscheidung unter Unsicherheit")}
          help={tt(`Say what you decide, what you do not know, and when you would reverse it. At least ${MIN_FRAME} characters.`, `Sagen Sie, was Sie entscheiden, was Sie nicht wissen und wann Sie die Entscheidung zurücknähmen. Mindestens ${MIN_FRAME} Zeichen.`)}
          value={r.uncertain}
          onChange={(v) => patch({ uncertain: v })}
          min={MIN_FRAME}
          rows={4}
        >
          <WritingHelp
            id="uncertain-kit"
            refs={[{ label: tt("Deciding when data is missing (Materi B3)", "Entscheiden bei fehlenden Daten (Materi B3)"), value: tt("rules of the card", "Regeln der Karte"), target: "mat-B3", before: b("B3") }]}
            steps={[
              tt("Write the decision in one sentence: what you will do now.", "Schreiben Sie die Entscheidung in einem Satz: was Sie jetzt tun."),
              tt("Name what you do not know, and the sign and the time at which you would reverse it.", "Nennen Sie, was Sie nicht wissen, und das Zeichen und den Zeitpunkt, zu dem Sie sie zurücknähmen."),
            ]}
          />
        </TextBox>
      ) : (
        <Field
          id={IDS.uncertain}
          label={tt("Make one decision under uncertainty, on purpose", "Treffen Sie bewusst eine Entscheidung unter Unsicherheit")}
          help={tt("Three parts, one row each: what you decide, what you do not know, when you would reverse it.", "Drei Teile, je eine Zeile: was Sie entscheiden, was Sie nicht wissen, wann Sie die Entscheidung zurücknähmen.")}
        >
          <GridTable
            head={[tt("Part", "Teil"), tt("Your answer", "Ihre Antwort")]}
            hints={[UNC_GUIDE.hints.first, UNC_GUIDE.hints.text]}
            example={[UNC_GUIDE.example.first, UNC_GUIDE.example.cells.text]}
            exampleLabel={UNC_GUIDE.exampleLabel}
            rows={(
              [
                ["decide", tt("What I decide", "Was ich entscheide")],
                ["unknown", tt("What I do not know", "Was ich nicht weiß")],
                ["reverse", tt("When I would reverse it", "Wann ich sie zurücknähme")],
              ] as const
            ).map(([k, name]) => ({
              id: IDS.uncRow(k),
              label: name,
              cells: [<CellField key={k} value={r.uncRows[k]} onChange={(v) => patch((st) => ({ uncRows: { ...st.uncRows, [k]: v } }))} label={name} />],
            }))}
          />
        </Field>
      )}
      <LayoutLink mode={r.uncMode} onMode={(m) => patch({ uncMode: m })} backText={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />
      <ExampleAnswer id="uncertain-example" guide={uncertainGuide()} />
      {mentor && <MentorGuide guide={uncertainGuide()} />}
      <AnswerKey block={adaptiveKey()} />
      <BlockMissing block="3.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the memo, as it builds (CLAUDE.md #39) */

function MemoPanel() {
  const p = usePersisted();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(true);
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (hydrated) setHtml(memoBody(p));
  }, [hydrated, p]);
  return (
    <section id="memo-panel" aria-labelledby="memo-h" className="card p-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id="memo-h">{tt("The memo as it builds", "Das Memo, wie es entsteht")}</h3>
        <button type="button" aria-expanded={open} aria-controls="memo-body" onClick={() => setOpen((o) => !o)} className="btn-ghost btn-sm">
          {open ? tt("Hide the memo", "Das Memo ausblenden") : tt("Show the memo", "Das Memo einblenden")}
        </button>
      </div>
      {open && (
        <div id="memo-body" className="mx-auto mt-3 max-w-[48rem] overflow-x-auto rounded-lg border border-line bg-paper p-4 md:p-6">
          <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
          <div className="doc" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ the task */

export function Task2() {
  const p = usePersisted();
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, 2, 2);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · one block", "Task 2 · ein Block")}</p>
        <h2>{tt("UX Strategy Memo: decide as Chief Product Officer", "UX Strategy Memo: als Chief Product Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
