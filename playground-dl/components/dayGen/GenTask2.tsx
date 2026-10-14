"use client";

import { useEffect, useState } from "react";
import { CaseBriefView } from "@/components/dayGen/GenBits";
import type { GenKit } from "@/components/dayGen/GenBits";
import { GenFieldView } from "@/components/dayGen/GenFieldView";
import { DecisionsPicker } from "@/components/dayStd/DecisionsPicker";
import type { DecisionsCfg } from "@/components/dayStd/DecisionsPicker";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExportBar } from "@/components/ui/ExportBar";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { routeHref } from "@/data/course";
import { decisionKey } from "@/lib/dayGen/answerKey";
import { genMemoBody } from "@/lib/dayGen/exportDoc";
import { decisionOrderGuide } from "@/lib/dayGen/guides";
import { GIDS, genR2Missing } from "@/lib/dayGen/missing";
import type { BlockSpec, GenSpec } from "@/lib/dayGen/spec";
import { BLOCK_MINUTES, MIN_LINE } from "@/lib/dayStd/common";
import { DOC_CSS } from "@/lib/exportDoc";
import { tt } from "@/lib/lang";
import type { MissingEntry } from "@/lib/missing";
import { exportName } from "@/lib/slug";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Route 2 of a generic day · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

function Block({ spec, kit, blk, id, number, missing }: { spec: GenSpec; kit: GenKit; blk: BlockSpec; id: string; number: string; missing: MissingEntry[] }) {
  const d = spec.decisions;
  const cfg: DecisionsCfg = {
    day: spec.day,
    items: d.items.map((x) => ({ id: x.id, no: x.no, name: x.name, what: x.what, cost: x.cost, weeks: x.weeks, area: x.area })),
    areaLabel: (a) => d.areas[a],
    thumb: kit.decisionThumb,
    budget: spec.limits.r2Budget,
    pick: spec.limits.r2Pick,
    pickLabel: d.pickLabel,
    listLabel: d.listLabel,
    orderLabel: d.orderLabel,
    whyLabel: d.whyLabel,
    whyHelp: d.whyHelp,
    ids: { pick: GIDS.decisionPick, order: GIDS.decisionOrder, orderWhy: GIDS.decisionOrderWhy },
    guide: () => decisionOrderGuide(spec),
  };
  return (
    <AnswerBlock id={id} title={blk.title} kind="JUDGED" core minutes={BLOCK_MINUTES[number]} findIt={blk.findIt}>
      <MaterialRefs refs={blk.refs} />
      {blk.plan && <p className="text-caption text-ash">{blk.plan}</p>}
      {blk.fields.map((f, i) =>
        f.kind === "decisions" ? (
          <div key={`decisions-${i}`} className="space-y-4">
            <DecisionsPicker cfg={cfg} />
            <AnswerKey block={decisionKey(spec)} />
          </div>
        ) : (
          <GenFieldView key={f.id} day={spec.day} route={2} f={f} block={number} />
        ),
      )}
      <BlockMissing block={number} missing={missing} />
    </AnswerBlock>
  );
}

function MemoPanel({ spec }: { spec: GenSpec }) {
  const p = usePersisted();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(true);
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (hydrated) setHtml(genMemoBody(p, spec));
  }, [hydrated, p, spec]);
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

export function GenTask2({ spec, kit }: { spec: GenSpec; kit: GenKit }) {
  const p = usePersisted();
  const missing = genR2Missing(p, spec);
  const filename = exportName(p.participant.name, spec.day, 2);
  const first = useStore((s) => s.dg[spec.day]?.r1.order[0]);
  const jump = useJumpTo();
  const firstName = first ? spec.b22.measures.find((m) => m.id === first)?.name : undefined;
  const pointer = (
    <p className="text-caption text-ash">
      {firstName ? (
        <>
          {tt("Your Route 1 answer, as a soft pointer: your first priority there was ", "Ihre Antwort aus Route 1, als weicher Hinweis: Ihre erste Priorität dort war ")}
          <strong className="text-ink">{firstName}</strong>.{" "}
          <button type="button" onClick={() => jump("block-2-2", routeHref(spec.day, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
            {tt("Open it in Route 1", "In Route 1 öffnen")}
          </button>
        </>
      ) : (
        tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
      )}
    </p>
  );
  void MIN_LINE;
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · two core blocks", "Task 2 · zwei Kernblöcke")}</p>
        <h2>{spec.route2.taskSub}</h2>
      </header>
      <CaseBriefView id="task-2" b={spec.brief2} headingId="case2-h" extra={pointer} />
      <Block spec={spec} kit={kit} blk={spec.b31} id="block-3-1" number="3.1" missing={missing} />
      <Block spec={spec} kit={kit} blk={spec.b32} id="block-3-2" number="3.2" missing={missing} />
      <MemoPanel spec={spec} />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => genMemoBody(p, spec)} />
    </div>
  );
}
