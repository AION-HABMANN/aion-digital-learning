"use client";

import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { TextBox } from "@/components/ui/Inputs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { useStdSlice } from "@/components/dayStd/useStd";
import { BLOCK_MINUTES } from "@/lib/dayStd/common";
import { tt } from "@/lib/lang";
import type { MentorGuide as Guide } from "@/lib/mentorGuide";
import type { MissingEntry } from "@/lib/missing";
import type { ReflectPart } from "@/store/dayTypesStd";

export type ReflectCfg = {
  day: number;
  title: string;
  /** The coaching point of the plan, in one or two sentences. */
  point: string;
  questions: { k: "a" | "b" | "c"; q: string }[];
  guide: () => Guide;
};

/** Block 1.3 (Optional, reflection) of the standard days: the plan's three reflection questions. Never scored, never missing, and the notes appear in the file. */
export function ReflectBlock({ cfg, missing }: { cfg: ReflectCfg; missing: MissingEntry[] }) {
  const { r, patch, mentor } = useStdSlice<ReflectPart>(cfg.day, 1);
  return (
    <AnswerBlock
      id="block-1-3"
      title={cfg.title}
      kind="REFLECTION"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the three questions below. Think back on Block 1.1 and write what comes to mind.", "Route 1 → Task 1 → die drei Fragen darunter. Denken Sie an Block 1.1 zurück und schreiben Sie, was Ihnen einfällt.")}
      analyse={false}
    >
      <p className="max-w-prose text-body text-ink">
        {cfg.point} {tt("These notes are yours: they are never scored and never missing, and they appear in your file.", "Diese Notizen gehören Ihnen: Sie werden nie bewertet, zählen nie als fehlend und erscheinen in Ihrer Datei.")}
      </p>
      {cfg.questions.map((q) => (
        <TextBox key={q.k} id={`reflect-${q.k}`} label={q.q} help={tt("Optional. A sentence or two in your own words.", "Optional. Ein oder zwei Sätze in Ihren eigenen Worten.")} value={r.reflect[q.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [q.k]: v } }))} rows={2} />
      ))}
      {mentor && <MentorGuide guide={cfg.guide()} />}
      <BlockMissing block="1.3" missing={missing} />
    </AnswerBlock>
  );
}
