"use client";

import { useEffect, useState } from "react";
import { MeasureThumb } from "@/components/day5/mocks";
import type { MeasureKind } from "@/components/day5/mocks";
import { DecisionsPicker } from "@/components/dayStd/DecisionsPicker";
import type { DecisionsCfg } from "@/components/dayStd/DecisionsPicker";
import { useStdSlice } from "@/components/dayStd/useStd";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { FACT_BY_ID } from "@/data/day5/case";
import { DECISIONS, DECISION_AREA, DECISION_BY_ID, EVIDENCE, EVIDENCE_MIN, OWNERS, R2_BUDGET, R2_MONTHS, R2_PICK, RISKS } from "@/data/day5/route2";
import type { EvidenceId, OwnerId, RiskId } from "@/data/day5/route2";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { decisionKey, logicKey, riskKey } from "@/lib/day5/answerKey";
import { memoBody } from "@/lib/day5/exportDoc";
import { conflictGuide, decisionOrderGuide, giveUpGuide, needsGuide, riskPlanGuide, ruleGuide, uncertainGuide } from "@/lib/day5/guides";
import { IDS, r2Missing } from "@/lib/day5/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_ROW } from "@/lib/day5/progress";
import { toggleList } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D5R2 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 5 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

const DAY = 5;
const useR2 = () => useStdSlice<D5R2>(DAY, 2);

function CaseBrief() {
  const worst = useStore((s) => s.d5.r1.worst);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: LearnBase's Chief UX Strategist", "Die Lage: Chief UX Strategist von LearnBase")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `You are the Chief UX Strategist of LearnBase. The platform is growing, but user satisfaction is declining. It has many features and low usage, and the internal stakeholders (sales, product, engineering) pursue different goals. Resources are limited. Management wants a user-centred strategy for the next ${R2_MONTHS} months and expects you to say who decides what is built.`,
          `Sie sind Chief UX Strategist von LearnBase. Die Plattform wächst, aber die Nutzerzufriedenheit sinkt. Sie hat viele Features und eine geringe Nutzung, und die internen Stakeholder (Vertrieb, Produkt, Entwicklung) verfolgen unterschiedliche Ziele. Die Ressourcen sind begrenzt. Das Management will eine nutzerzentrierte Strategie für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie sagen, wer entscheidet, was gebaut wird.`,
        )}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget for the year: ", "Budget für das Jahr: ")}
              <strong>{euro(R2_BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("Stakeholders want different things: growth, features, a stable system.", "Stakeholder wollen Unterschiedliches: Wachstum, Features, ein stabiles System.")}</li>
            <li>{tt("Your user data is incomplete. You must decide anyway.", "Ihre Nutzerdaten sind unvollständig. Sie müssen trotzdem entscheiden.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: the central user needs, three strategic decisions in a roadmap order, and the conflict of user against business (B1, B2).", "Block 3.1: die zentralen Nutzerbedürfnisse, drei strategische Entscheidungen in einer Roadmap-Reihenfolge und der Konflikt zwischen Nutzer und Unternehmen (B1, B2).")}</li>
            <li>{tt("Block 3.2: the biggest risk, who decides, on what evidence, the rule for new features, one decision under uncertainty, and what you give up (B2, B3).", "Block 3.2: das größte Risiko, wer entscheidet, auf welcher Grundlage, die Regel für neue Features, eine Entscheidung unter Unsicherheit und worauf Sie verzichten (B2, B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {worst ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: the fact that frustrated you most was ", "Ihre Antwort aus Route 1, als weicher Hinweis: Der Fakt, der Sie am meisten frustrierte, war ")}
            <strong className="text-ink">{FACT_BY_ID[worst].short}</strong>.{" "}
            <button type="button" onClick={() => jump("block-1-1", routeHref(DAY, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: a growing platform with declining satisfaction, many features and low usage, stakeholders with different goals, limited resources. Everything else is made up: the €200,000, the seven decisions with their costs and weeks.", "Der Auftrag sagt: eine wachsende Plattform mit sinkender Zufriedenheit, viele Features und geringe Nutzung, Stakeholder mit unterschiedlichen Zielen, begrenzte Ressourcen. Alles andere ist erfunden: die 200.000 €, die sieben Entscheidungen mit ihren Kosten und Wochen.")}</p>
      </Callout>
    </section>
  );
}

/* ------------------------------------------------------------------ Block 3.1 */

const DECISION_THUMB: Record<string, MeasureKind> = { d1: "nav", d2: "audit", d3: "structure", d4: "research", d5: "approval", d6: "features", d7: "campaign" };

const decisionsCfg = (afterOrder: React.ReactNode): DecisionsCfg => ({
  day: DAY,
  items: DECISIONS.map((d) => ({ id: d.id, no: d.no, name: d.name, what: d.what, cost: d.cost, weeks: d.weeks, area: d.area })),
  areaLabel: (a) => DECISION_AREA[a as keyof typeof DECISION_AREA],
  thumb: (id) => <MeasureThumb kind={DECISION_THUMB[id]} />,
  budget: R2_BUDGET,
  pick: R2_PICK,
  pickLabel: tt("strategic decisions", "strategische Entscheidungen"),
  listLabel: tt("Decisions for the strategy", "Entscheidungen für die Strategie"),
  orderLabel: tt("Put the three decisions in roadmap order", "Bringen Sie die drei Entscheidungen in eine Roadmap-Reihenfolge"),
  whyLabel: tt("Why does the first decision go first?", "Warum kommt die erste Entscheidung zuerst?"),
  whyHelp: tt(`Say what it does for the user and for the business, or what the others depend on. At least ${MIN_LINE} characters.`, `Sagen Sie, was sie für den Nutzer und für das Unternehmen tut oder wovon die anderen abhängen. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.decisionPick, order: IDS.decisionOrder, orderWhy: IDS.decisionOrderWhy },
  guide: decisionOrderGuide,
  afterOrder,
});

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  const rows = (
    <div className="space-y-3">
      {r.picks.length === R2_PICK && <p className="text-body font-semibold text-ink">{tt("The conflict of user against business, for each decision", "Der Konflikt zwischen Nutzer und Unternehmen, für jede Entscheidung")}</p>}
      {r.picks.length === R2_PICK && (
        <p className="text-caption text-ash">{tt(`Three short entries each: what the user gets, what the business gets, and what is lost or postponed. At least ${MIN_ROW} characters each.`, `Je drei kurze Einträge: was der Nutzer bekommt, was das Unternehmen bekommt und was verloren geht oder verschoben wird. Mindestens ${MIN_ROW} Zeichen je Eintrag.`)}</p>
      )}
      {r.picks.length === R2_PICK &&
        r.picks.map((id) => {
          const d = DECISION_BY_ID[id as keyof typeof DECISION_BY_ID];
          const c = r.conflict[id] ?? { user: "", business: "", lost: "" };
          const set = (k: "user" | "business" | "lost", v: string) => patch((s) => ({ conflict: { ...s.conflict, [id]: { ...(s.conflict[id] ?? { user: "", business: "", lost: "" }), [k]: v } } }));
          return (
            <div key={id} id={IDS.conflict(id)} className="space-y-2 rounded-lg border border-line bg-canvas p-3">
              <p className="text-body font-semibold text-ink">{d.no} · {d.name}</p>
              <TextBox id={`${IDS.conflict(id)}-user`} label={tt("What the user gets", "Was der Nutzer bekommt")} help={tt("One short line.", "Eine kurze Zeile.")} value={c.user} onChange={(v) => set("user", v)} min={MIN_ROW} rows={2} />
              <TextBox id={`${IDS.conflict(id)}-business`} label={tt("What the business gets", "Was das Unternehmen bekommt")} help={tt("One short line, in a figure the business watches.", "Eine kurze Zeile, in einer Zahl, die das Unternehmen beobachtet.")} value={c.business} onChange={(v) => set("business", v)} min={MIN_ROW} rows={2} />
              <TextBox id={`${IDS.conflict(id)}-lost`} label={tt("What is lost or postponed", "Was verloren geht oder verschoben wird")} help={tt("Something a stakeholder would miss.", "Etwas, das ein Stakeholder vermissen würde.")} value={c.lost} onChange={(v) => set("lost", v)} min={MIN_ROW} rows={2} />
            </div>
          );
        })}
      {r.picks.length === R2_PICK && (
        <>
          <ExampleAnswer id="conflict-example" guide={conflictGuide()} />
          {mentor && <MentorGuide guide={conflictGuide()} />}
        </>
      )}
    </div>
  );
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · User needs, three strategic decisions and the conflict of user against business", "Block 3.1 · Nutzerbedürfnisse, drei strategische Entscheidungen und der Konflikt zwischen Nutzer und Unternehmen")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the needs field, then the seven decisions in the list below, each with its printed cost and weeks, then the order and the conflict table for the three you chose. Answer in the field, the lists and the table.", "Route 2 → Task 2 → das Bedürfnis-Feld, dann die sieben Entscheidungen in der Liste darunter, jeweils mit gedruckten Kosten und Wochen, dann die Reihenfolge und die Konflikttabelle für die drei, die Sie gewählt haben. Antworten Sie im Feld, in den Listen und in der Tabelle.")}
    >
      <MaterialRefs refs={["B1", "B2"]} />
      <TextBox
        id={IDS.needs}
        label={tt("The central user needs: two or three, each in business terms", "Die zentralen Nutzerbedürfnisse: zwei oder drei, jedes in Geschäftsbegriffen")}
        help={tt(`Each as one sentence: who the user is, what they want to do, and what the business gets. At least ${MIN_FRAME} characters.`, `Jedes als ein Satz: wer der Nutzer ist, was er tun will und was das Unternehmen bekommt. Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.needs}
        onChange={(v) => patch({ needs: v })}
        min={MIN_FRAME}
        rows={5}
      >
        <WritingHelp
          id="needs-kit"
          refs={[
            { label: tt("From a need to a figure (Materi B1)", "Von einem Bedürfnis zu einer Zahl (Materi B1)"), value: tt("who · what · what the business gets", "wer · was · was das Unternehmen bekommt"), target: "mat-B1", before: () => showCardPart("B1", "rules") },
          ]}
          steps={[
            tt("Start with a user and a task: “A learner who returns after three days wants to…”.", "Beginnen Sie mit einem Nutzer und einer Aufgabe: „Eine Lernende, die nach drei Tagen zurückkehrt, will …“."),
            tt("Finish with the business: “so that completion / return rate / support requests …”.", "Schließen Sie mit dem Unternehmen: „damit Completion / Rückkehrrate / Supportanfragen …“."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="needs-example" guide={needsGuide()} />
      {mentor && <MentorGuide guide={needsGuide()} />}

      <DecisionsPicker cfg={decisionsCfg(rows)} />
      <AnswerKey block={decisionKey()} />
      <BlockMissing block="3.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.2 */

export function Block32({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  return (
    <AnswerBlock
      id="block-3-2"
      title={tt("Block 3.2 · Risk, decision architecture, a decision under uncertainty, and what you give up", "Block 3.2 · Risiko, Entscheidungsarchitektur, eine Entscheidung unter Unsicherheit und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the three decisions you chose in Block 3.1, then the fields below. Answer in the lists and the text boxes.", "Route 2 → Task 2 → die drei Entscheidungen, die Sie in Block 3.1 gewählt haben, dann die Felder darunter. Antworten Sie in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.risk} label={tt("The biggest risk of your plan", "Das größte Risiko Ihres Plans")} help={tt("Imagine the plan has failed in a year. Which reason is the most likely? Choose one.", "Stellen Sie sich vor, der Plan ist in einem Jahr gescheitert. Welcher Grund ist am wahrscheinlichsten? Wählen Sie einen.")}>
        <OptionList<RiskId> options={RISKS.map((x) => ({ id: x.id, label: x.text }))} value={r.risk} onChange={(id) => patch({ risk: id })} label={tt("Risks", "Risiken")} />
      </Field>
      <TextBox id={IDS.riskPlan} label={tt("What do you do about that risk?", "Was tun Sie gegen dieses Risiko?")} help={tt(`One action, and when you would notice the risk. At least ${MIN_REASON} characters.`, `Eine Maßnahme, und wann Sie das Risiko bemerken würden. Mindestens ${MIN_REASON} Zeichen.`)} value={r.riskPlan} onChange={(v) => patch({ riskPlan: v })} min={MIN_REASON} rows={2} />
      <ExampleAnswer id="riskplan-example" guide={riskPlanGuide()} />
      {mentor && <MentorGuide guide={riskPlanGuide()} />}
      <AnswerKey block={riskKey()} />

      <Field id={IDS.owner} label={tt("A decision architecture: who decides what goes on the roadmap?", "Eine Entscheidungsarchitektur: Wer entscheidet, was auf die Roadmap kommt?")} help={tt("Choose one.", "Wählen Sie eine Antwort.")}>
        <OptionList<OwnerId> options={OWNERS.map((o) => ({ id: o.id, label: o.text }))} value={r.owner} onChange={(id) => patch({ owner: id })} label={tt("Who decides", "Wer entscheidet")} />
      </Field>
      <Field id={IDS.evidence} label={tt("On what evidence?", "Auf welcher Grundlage?")} help={tt(`Choose at least ${EVIDENCE_MIN}. You have chosen: ${r.evidence.length}`, `Wählen Sie mindestens ${EVIDENCE_MIN}. Sie haben gewählt: ${r.evidence.length}`)}>
        <OptionList<EvidenceId> options={EVIDENCE.map((c) => ({ id: c.id, label: c.text }))} value={r.evidence} onChange={(id) => patch((s) => ({ evidence: toggleList(s.evidence, id) }))} multi cols={2} label={tt("Evidence for a decision", "Belege für eine Entscheidung")} />
      </Field>
      <TextBox
        id={IDS.rule}
        label={tt("The rule every new feature must pass before it is built", "Die Regel, die jedes neue Feature bestehen muss, bevor es gebaut wird")}
        help={tt(`One or two sentences, the same for every request. At least ${MIN_LINE} characters.`, `Ein oder zwei Sätze, für jeden Antrag gleich. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.rule}
        onChange={(v) => patch({ rule: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="rule-kit"
          refs={[{ label: tt("The gate for a feature request (Materi B3)", "Das Tor für einen Feature-Antrag (Materi B3)"), value: tt("problem · metric · owner", "Problem · Kennzahl · Verantwortlicher"), target: "mat-B3", before: () => showCardPart("B3", "rules") }]}
          steps={[
            tt("Say what the requester must name before the request is read: a user problem, a metric and an owner.", "Sagen Sie, was die Antragstellerin nennen muss, bevor der Antrag gelesen wird: ein Nutzerproblem, eine Kennzahl und einen Verantwortlichen."),
            tt("Say what happens if one is missing (it waits), and that the rule is the same for everybody.", "Sagen Sie, was passiert, wenn eines fehlt (er wartet), und dass die Regel für alle gleich ist."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="rule-example" guide={ruleGuide()} />
      {mentor && <MentorGuide guide={ruleGuide()} />}
      <AnswerKey block={logicKey()} />

      <TextBox
        id={IDS.uncertain}
        label={tt("One decision you make under uncertainty", "Eine Entscheidung, die Sie unter Unsicherheit treffen")}
        help={tt(`Say what you decide, what you do not know, and when you would reverse it, with a figure and a time. At least ${MIN_FRAME} characters.`, `Sagen Sie, was Sie entscheiden, was Sie nicht wissen und wann Sie es zurücknähmen, mit einer Zahl und einer Zeit. Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.uncertain}
        onChange={(v) => patch({ uncertain: v })}
        min={MIN_FRAME}
        rows={4}
      >
        <RevealHint id="uncertain-frame" label={tt("Show the frame", "Den Rahmen zeigen")} title={tt("The parts · taught in Materi B3", "Die Teile · aus Materi B3")}>
          <ol className="list-decimal space-y-1 pl-5 text-caption text-ink">
            <li>{tt("I decide …", "Ich entscheide …")}</li>
            <li>{tt("I do not know …", "Ich weiß nicht …")}</li>
            <li>{tt("I reverse if … (a figure) … by … (a time)", "Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)")}</li>
          </ol>
          <p className="mt-1 text-micro text-ash">{tt("The fourth part, what you give up, has its own field below.", "Der vierte Teil, worauf Sie verzichten, hat unten ein eigenes Feld.")}</p>
        </RevealHint>
      </TextBox>
      <ExampleAnswer id="uncertain-example" guide={uncertainGuide()} />
      {mentor && <MentorGuide guide={uncertainGuide()} />}

      <TextBox
        id={IDS.giveUp}
        label={tt("What do you give up or postpone?", "Worauf verzichten Sie oder was verschieben Sie?")}
        help={tt(`Name something real that someone would miss. A plan that gives up nothing has not decided. At least ${MIN_LINE} characters.`, `Nennen Sie etwas Reales, das jemand vermissen würde. Ein Plan, der auf nichts verzichtet, hat nicht entschieden. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.giveUp}
        onChange={(v) => patch({ giveUp: v })}
        min={MIN_LINE}
        rows={2}
      />
      <ExampleAnswer id="giveup-example" guide={giveUpGuide()} />
      {mentor && <MentorGuide guide={giveUpGuide()} />}
      <BlockMissing block="3.2" missing={missing} />
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
  const filename = exportName(p.participant.name, DAY, 2);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · two core blocks", "Task 2 · zwei Kernblöcke")}</p>
        <h2>{tt("UX Strategy Memo: decide as Chief UX Strategist", "UX Strategy Memo: als Chief UX Strategist entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
