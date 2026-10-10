"use client";

import { useEffect, useState } from "react";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OrderList } from "@/components/ui/OrderList";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { VERDICTS } from "@/data/day2/case";
import type { Verdict } from "@/data/day2/case";
import { DATA, DATA_MIN, EVIDENCE, EVIDENCE_MIN, INVS, INV_AREA, INV_BY_ID, OWNERS, R2_BUDGET, R2_MONTHS, R2_PICK, RISKS, invsCost } from "@/data/day2/route2";
import type { DataId, EvidenceId, InvId, OwnerId, RiskId } from "@/data/day2/route2";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { adaptiveKey, architectureKey, dataKey, invKey, riskKey } from "@/lib/day2/answerKey";
import { memoBody } from "@/lib/day2/exportDoc";
import { giveUpGuide, invOrderGuide, prototypingGuide, r2AdaptiveGuide, riskPlanGuide, uncertainGuide } from "@/lib/day2/guides";
import { IDS, r2Missing } from "@/lib/day2/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_REASON } from "@/lib/day2/progress";
import { swap, syncOrder, toggleCapped, toggleList } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 2 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

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
          `You are the Chief Product Officer of LearnPro. Competitors use AI and adaptive systems, your own platform is outdated, the budget is limited and your data situation is incomplete. Management wants a future strategy for the next ${R2_MONTHS} months and expects you to take responsibility for the investment decisions.`,
          `Sie sind Chief Product Officer von LearnPro. Wettbewerber nutzen KI und adaptive Systeme, Ihre eigene Plattform ist veraltet, das Budget ist begrenzt, und Ihre Datenlage ist unvollständig. Die Geschäftsführung will eine Zukunftsstrategie für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie die Verantwortung für die Investitionsentscheidungen übernehmen.`,
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
            <li>{tt("Data: incomplete. You know where learners leave, not why.", "Daten: unvollständig. Sie wissen, wo Lernende gehen, nicht warum.")}</li>
            <li>{tt("You must decide even though the data is incomplete.", "Sie müssen entscheiden, obwohl die Daten unvollständig sind.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: your decision on adaptive learning, your prototyping and testing strategy, the data you need and your roadmap (B1, B2).", "Block 3.1: Ihre Entscheidung zu adaptivem Lernen, Ihre Prototyping- und Teststrategie, die Daten, die Sie brauchen, und Ihre Roadmap (B1, B2).")}</li>
            <li>{tt("Block 3.2: the biggest risk, one decision under uncertainty, how you will decide in future, and what you give up (B3).", "Block 3.2: das größte Risiko, eine Entscheidung unter Unsicherheit, wie Sie künftig entscheiden und worauf Sie verzichten (B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {r1.adaptive ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: you decided on adaptive learning: ", "Ihre Antwort aus Route 1, als weicher Hinweis: Sie haben zu adaptivem Lernen entschieden: ")}
            <strong className="text-ink">{VERDICTS.find((v) => v.id === r1.adaptive)?.label}</strong>.{" "}
            <button type="button" onClick={() => jump("block-2-2", routeHref(2, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: competitors use AI and adaptive systems, an outdated platform, a limited budget, incomplete data. Everything else is made up: the €200,000, the seven investments with their costs and weeks.", "Der Auftrag sagt: Wettbewerber nutzen KI und adaptive Systeme, eine veraltete Plattform, ein begrenztes Budget, unvollständige Daten. Alles andere ist erfunden: die 200.000 €, die sieben Investitionen mit ihren Kosten und Wochen.")}</p>
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
  const [note, setNote] = useState("");
  const full = r.picks.length >= R2_PICK;
  const cost = invsCost(r.picks);
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Decision, prototyping and testing strategy, data and roadmap", "Block 3.1 · Entscheidung, Prototyping- und Teststrategie, Daten und Roadmap")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the decision on adaptive learning, the two strategy fields, the data list and the seven investments below, each with its printed cost and weeks.", "Route 2 → Task 2 → die Entscheidung zu adaptivem Lernen, die zwei Strategiefelder, die Datenliste und die sieben Investitionen darunter, jeweils mit gedruckten Kosten und Wochen.")}
    >
      <MaterialRefs refs={["B1", "B2"]} />
      <Field id={IDS.r2Adaptive} label={tt("Do we invest in adaptive learning?", "Investieren wir in adaptives Lernen?")} help={tt("Choose one. “Partly” is a real answer.", "Wählen Sie eine. „Teilweise“ ist eine echte Antwort.")}>
        <OptionList<Verdict> options={VERDICTS.map((v) => ({ id: v.id, label: v.label }))} value={r.adaptive} onChange={(id) => patch({ adaptive: id })} label={tt("Adaptive learning", "Adaptives Lernen")} cols={2} />
      </Field>
      <TextBox
        id={IDS.r2AdaptiveWhy}
        label={tt("Why?", "Warum?")}
        help={tt(`If you say Partly, say which part you fund now and which part waits for evidence. At least ${MIN_LINE} characters.`, `Wenn Sie „Teilweise“ sagen, nennen Sie, welchen Teil Sie jetzt finanzieren und welcher Teil auf Belege wartet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.adaptiveWhy}
        onChange={(v) => patch({ adaptiveWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="r2adaptive-kit"
          refs={[{ label: tt("Staged bets: fund the cheapest stage that gives evidence (Materi B1)", "Gestufte Wetten: die günstigste Stufe finanzieren, die Belege liefert (Materi B1)"), value: tt("a gate with a figure", "ein Gate mit einer Zahl"), target: "mat-B1", before: () => showCardPart("B1", "rules") }]}
          steps={[
            tt("Say yes, partly or no in your first words.", "Sagen Sie in Ihren ersten Worten ja, teilweise oder nein."),
            tt("If partly: name the small, tested step you fund now, and the part that waits for its gate.", "Bei „teilweise“: nennen Sie den kleinen, getesteten Schritt, den Sie jetzt finanzieren, und den Teil, der auf sein Gate wartet."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="r2adaptive-example" guide={r2AdaptiveGuide()} />
      {mentor && <MentorGuide guide={r2AdaptiveGuide()} />}

      <TextBox
        id={IDS.prototyping}
        label={tt("Prototyping strategy: how will we test new features?", "Prototyping-Strategie: Wie testen wir neue Funktionen?")}
        help={tt(`Name the fidelity you start with and the first question it answers. At least ${MIN_LINE} characters.`, `Nennen Sie die Fidelity, mit der Sie beginnen, und die erste Frage, die sie beantwortet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.prototyping}
        onChange={(v) => patch({ prototyping: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="prototyping-example" guide={prototypingGuide()} />
      {mentor && <MentorGuide guide={prototypingGuide()} />}

      <Field id={IDS.dataPick} label={tt("UX testing strategy: which data do we need?", "UX-Teststrategie: Welche Daten brauchen wir?")} help={tt(`Choose at least ${DATA_MIN}, and be ready to say which question each answers. You have chosen: ${r.data.length}`, `Wählen Sie mindestens ${DATA_MIN} und seien Sie bereit zu sagen, welche Frage jede beantwortet. Sie haben gewählt: ${r.data.length}`)}>
        <OptionList<DataId> options={DATA.map((d) => ({ id: d.id, label: d.text }))} value={r.data} onChange={(id) => patch((s) => ({ data: toggleList(s.data, id) }))} multi cols={2} label={tt("Data a testing strategy needs", "Daten, die eine Teststrategie braucht")} />
      </Field>
      <AnswerKey block={dataKey()} />

      <Field id={IDS.invPick} label={tt(`Your roadmap: choose exactly ${R2_PICK} investments`, `Ihre Roadmap: Wählen Sie genau ${R2_PICK} Investitionen`)} help={tt("Each shows what it is, its cost and its weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie ist, ihre Kosten und Wochen und worauf sie wirkt. Sie haben gewählt:") + ` ${r.picks.length} / ${R2_PICK}`}>
        <OptionList<InvId>
          options={INVS.map((d) => ({ id: d.id, label: `${d.no} · ${d.name} · ${euro(d.cost)} · ${d.weeks} ${tt("weeks", "Wochen")}`, tag: INV_AREA[d.area], sub: d.what }))}
          value={r.picks}
          onChange={(id) => {
            setNote("");
            patch((s) => {
              const picks = toggleCapped(s.picks, id, R2_PICK);
              return { picks, order: syncOrder(s.order, picks) };
            });
          }}
          multi
          cols={2}
          label={tt("Investments", "Investitionen")}
          disabledIds={full ? INVS.map((d) => d.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${R2_PICK}. Deselect one first.`, `Sie haben ${R2_PICK}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      {r.picks.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={r.picks.map((id) => ({ id, short: INV_BY_ID[id].no, cost: INV_BY_ID[id].cost }))} budget={R2_BUDGET} title={tt("Cost of the chosen investments against the yearly budget", "Kosten der gewählten Investitionen gegen das Jahresbudget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(R2_BUDGET)}${cost > R2_BUDGET ? `, ${euro(cost - R2_BUDGET)} over` : ""}.`, `Gesamt ${euro(cost)} von ${euro(R2_BUDGET)}${cost > R2_BUDGET ? `, ${euro(cost - R2_BUDGET)} darüber` : ""}.`)}{" "}
            {cost > R2_BUDGET && <span className="text-ash">{tt("Going over is allowed; say why. It is printed in the memo as a fact.", "Das Überschreiten ist erlaubt; sagen Sie, warum. Es steht als Tatsache im Memo.")}</span>}
          </p>
        </div>
      )}
      {r.picks.length === R2_PICK && (
        <Field id={IDS.invOrder} label={tt("Put the three investments in order", "Bringen Sie die drei Investitionen in eine Reihenfolge")} help={tt("The first happens first. Move one up or down with the arrows.", "Die erste geschieht zuerst. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <OrderList<InvId> order={r.order} name={(id) => INV_BY_ID[id].name} onMove={(id, dir) => patch((s) => ({ order: swap(s.order, id, dir) }))} />
        </Field>
      )}
      <TextBox
        id={IDS.invOrderWhy}
        label={tt("Why does the first investment go first?", "Warum kommt die erste Investition zuerst?")}
        help={tt(`Reach, cost, what the others depend on, or the evidence it brings. At least ${MIN_LINE} characters.`, `Reichweite, Kosten, wovon die anderen abhängen oder die Belege, die sie bringt. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.orderWhy}
        onChange={(v) => patch({ orderWhy: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="invorder-example" guide={invOrderGuide()} />
      {mentor && <MentorGuide guide={invOrderGuide()} />}
      <AnswerKey block={adaptiveKey()} />
      <AnswerKey block={invKey()} />
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
      title={tt("Block 3.2 · Risk, a decision under uncertainty, how you decide, and what you give up", "Block 3.2 · Risiko, eine Entscheidung unter Unsicherheit, wie Sie entscheiden und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the three investments you chose in Block 3.1, then the fields below. Answer in the lists and the text boxes.", "Route 2 → Task 2 → die drei Investitionen, die Sie in Block 3.1 gewählt haben, dann die Felder darunter. Antworten Sie in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.risk} label={tt("The biggest risk of your plan", "Das größte Risiko Ihres Plans")} help={tt("Technology against user value. Imagine the plan has failed in a year. Which reason is the most likely? Choose one.", "Technologie gegen Nutzerwert. Stellen Sie sich vor, der Plan ist in einem Jahr gescheitert. Welcher Grund ist am wahrscheinlichsten? Wählen Sie einen.")}>
        <OptionList<RiskId> options={RISKS.map((x) => ({ id: x.id, label: x.text }))} value={r.risk} onChange={(id) => patch({ risk: id })} label={tt("Risks", "Risiken")} />
      </Field>
      <TextBox
        id={IDS.riskPlan}
        label={tt("What do you do about that risk?", "Was tun Sie gegen dieses Risiko?")}
        help={tt(`One action, and when you would notice the risk. At least ${MIN_REASON} characters.`, `Eine Maßnahme, und wann Sie das Risiko bemerken würden. Mindestens ${MIN_REASON} Zeichen.`)}
        value={r.riskPlan}
        onChange={(v) => patch({ riskPlan: v })}
        min={MIN_REASON}
        rows={2}
      />
      <ExampleAnswer id="riskplan-example" guide={riskPlanGuide()} />
      {mentor && <MentorGuide guide={riskPlanGuide()} />}

      <TextBox
        id={IDS.uncertain}
        label={tt("One decision you deliberately make under uncertainty", "Eine Entscheidung, die Sie bewusst unter Unsicherheit treffen")}
        help={tt(`Say what you decide, what you do not know, and when you would reverse it, with a figure and a time. At least ${MIN_FRAME} characters.`, `Sagen Sie, was Sie entscheiden, was Sie nicht wissen und wann Sie es zurücknähmen, mit einer Zahl und einer Zeit. Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.uncertain}
        onChange={(v) => patch({ uncertain: v })}
        min={MIN_FRAME}
        rows={4}
      >
        <RevealHint id="uncertain-frame" label={tt("Show the frame", "Den Rahmen zeigen")} title={tt("The four parts · taught in Materi B3", "Die vier Teile · aus Materi B3")}>
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

      <Field id={IDS.owner} label={tt("How will LearnPro decide on innovations in future? Who decides?", "Wie wird LearnPro künftig über Innovationen entscheiden? Wer entscheidet?")} help={tt("Choose one.", "Wählen Sie eine Antwort.")}>
        <OptionList<OwnerId> options={OWNERS.map((o) => ({ id: o.id, label: o.text }))} value={r.owner} onChange={(id) => patch({ owner: id })} label={tt("Who decides", "Wer entscheidet")} />
      </Field>
      <Field id={IDS.evidence} label={tt("On what evidence?", "Auf welcher Grundlage?")} help={tt(`Choose at least ${EVIDENCE_MIN}. You have chosen: ${r.evidence.length}`, `Wählen Sie mindestens ${EVIDENCE_MIN}. Sie haben gewählt: ${r.evidence.length}`)}>
        <OptionList<EvidenceId> options={EVIDENCE.map((e) => ({ id: e.id, label: e.text }))} value={r.evidence} onChange={(id) => patch((s) => ({ evidence: toggleList(s.evidence, id) }))} multi cols={2} label={tt("Evidence an innovation decision needs", "Belege, die eine Innovationsentscheidung braucht")} />
      </Field>

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
      <AnswerKey block={riskKey()} />
      <AnswerKey block={architectureKey()} />
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
  const filename = exportName(p.participant.name, 2, 2);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · two core blocks", "Task 2 · zwei Kernblöcke")}</p>
        <h2>{tt("UX Strategy Memo: decide as Chief Product Officer", "UX Strategy Memo: als Chief Product Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
