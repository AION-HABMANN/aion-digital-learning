"use client";

import clsx from "clsx";
import { useState } from "react";
import { useStdSlice } from "@/components/dayStd/useStd";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { Field } from "@/components/ui/Field";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { assignKey, multiKey, singleKey } from "@/lib/dayGen/answerKey";
import { fid } from "@/lib/dayGen/fields";
import { frameGuide, textGuide } from "@/lib/dayGen/guides";
import type { RealField } from "@/lib/dayGen/model";
import type { AssignField } from "@/lib/dayGen/spec";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";
import { toggleCapped, toggleList } from "@/lib/lists";
import { showCardPart } from "@/store/useCardMore";
import type { GenExtra } from "@/store/dayTypesGen";
import type { RouteNo } from "@/data/course";

/**
 * One field of a generic day's block (lib/dayGen/spec.ts), drawn the same way for every day: the field with its instruction under the label (CLAUDE.md #8), a clue
 * kit where the spec has one (#42), an example answer for a free-text field that every learner can open (#23), and the mentor's worked answer or answer key after
 * the passcode (#7). A check of a multi-choice is never made here: the choice is free and a reason is asked for where the plan asks for one (#38).
 */
export function GenFieldView({ day, route, f, block }: { day: number; route: RouteNo; f: RealField; block: string }) {
  const { r, patch, mentor } = useStdSlice<GenExtra>(day, route);
  const [note, setNote] = useState("");

  if (f.kind === "text") {
    const g = textGuide(f, block);
    return (
      <>
        <TextBox id={fid(f.id)} label={f.label} help={f.help} value={r.text[f.id] ?? ""} onChange={(v) => patch((s) => ({ text: { ...s.text, [f.id]: v } }))} min={f.min} rows={f.rows ?? 3}>
          {f.clue && (
            <WritingHelp
              id={`kit-${f.id}`}
              refs={[{ label: f.clue.refLabel, value: f.clue.refValue, target: `mat-${f.clue.ref}`, before: () => showCardPart(f.clue!.ref, "rules") }]}
              steps={f.clue.steps}
            />
          )}
        </TextBox>
        <ExampleAnswer id={`ex-${f.id}`} guide={g} />
        {mentor && <MentorGuide guide={g} />}
      </>
    );
  }

  if (f.kind === "multi") {
    const value = r.multi[f.id] ?? [];
    const capped = !!f.exact;
    const full = capped && value.length >= (f.exact ?? 0);
    const need = f.exact ? tt(`exactly ${f.exact}`, `genau ${f.exact}`) : tt(`at least ${f.min ?? 1}`, `mindestens ${f.min ?? 1}`);
    return (
      <>
        <Field id={fid(f.id)} label={f.label} help={`${f.help} ${tt(`Choose ${need}. You have chosen:`, `Wählen Sie ${need}. Sie haben gewählt:`)} ${value.length}${f.exact ? ` / ${f.exact}` : ""}`}>
          <OptionList<string>
            options={f.options.map((o) => ({ id: o.id, label: o.label, sub: o.sub }))}
            value={value}
            onChange={(id) => {
              setNote("");
              patch((s) => ({ multi: { ...s.multi, [f.id]: capped ? toggleCapped(s.multi[f.id] ?? [], id, f.exact ?? 0) : toggleList(s.multi[f.id] ?? [], id) } }));
            }}
            multi
            cols={f.cols ?? 1}
            label={f.optionsLabel}
            disabledIds={full ? f.options.map((o) => o.id) : []}
            onDisabledClick={() => setNote(tt(`You have ${f.exact}. Deselect one first.`, `Sie haben ${f.exact}. Wählen Sie zuerst eine ab.`))}
          />
          {note && (
            <p role="status" className="text-caption text-ash">
              {note}
            </p>
          )}
        </Field>
        <AnswerKey block={multiKey(f)} />
      </>
    );
  }

  if (f.kind === "single") {
    return (
      <>
        <Field id={fid(f.id)} label={f.label} help={f.help}>
          <OptionList<string> options={f.options.map((o) => ({ id: o.id, label: o.label, sub: o.sub }))} value={r.single[f.id] ?? null} onChange={(id) => patch((s) => ({ single: { ...s.single, [f.id]: id } }))} label={f.optionsLabel} />
        </Field>
        <AnswerKey block={singleKey(f)} />
      </>
    );
  }

  if (f.kind === "assign") {
    const a = r.assign[f.id] ?? {};
    const set = (item: string, bin: string) => patch((s) => ({ assign: { ...s.assign, [f.id]: { ...(s.assign[f.id] ?? {}), [item]: (s.assign[f.id] ?? {})[item] === bin ? null : bin } } }));
    return (
      <>
        <Field id={fid(f.id)} label={f.label} help={f.help}>
          <AssignGrid f={f} value={a} onSet={set} />
        </Field>
        <AnswerKey block={assignKey(f)} />
      </>
    );
  }

  const g = frameGuide(f, block);
  return (
    <>
      <p className="text-body font-semibold text-ink">{f.label}</p>
      <RevealHint id={`frame-${f.id}`} label={tt("Show the frame", "Den Rahmen zeigen")} title={f.frameLabel}>
        <ol className="list-decimal space-y-1 pl-5 text-caption text-ink">
          {f.frameSteps.map((s) => (
            <li key={s}>
              <Gloss>{s}</Gloss>
            </li>
          ))}
        </ol>
        {f.frameNote && <p className="mt-1 text-micro text-ash">{f.frameNote}</p>}
      </RevealHint>
      {f.parts.map((p) => (
        <TextBox key={p.id} id={fid(p.id)} label={p.label} help={p.help} value={r.text[p.id] ?? ""} onChange={(v) => patch((s) => ({ text: { ...s.text, [p.id]: v } }))} min={p.min} rows={2} />
      ))}
      <ExampleAnswer id={`ex-${f.id}`} guide={g} />
      {mentor && <MentorGuide guide={g} />}
    </>
  );
}

/** A card sort as a grid: one row per item, one button per section (a letter and its name), so nothing has to be dragged and the choice is never colour alone. */
function AssignGrid({ f, value, onSet }: { f: AssignField; value: Record<string, string | null>; onSet: (item: string, bin: string) => void }) {
  return (
    <div className="space-y-2">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-ink" aria-label={tt("The sections", "Die Bereiche")}>
        {f.bins.map((b, i) => (
          <li key={b.id}>
            <span className="font-bold">{String.fromCharCode(65 + i)}</span> · {b.label}
          </li>
        ))}
      </ul>
      <ul className="divide-y divide-line rounded-lg border border-line bg-paper">
        {f.items.map((it) => (
          <li key={it.id} id={`assign-${f.id}-${it.id}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2">
            <span className="min-w-0 flex-1 text-caption text-ink">
              <span className="tnum mr-1 font-semibold">{it.no}</span> {it.label}
            </span>
            <span role="radiogroup" aria-label={`${it.no} · ${it.label}`} className="flex flex-wrap gap-1">
              {f.bins.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  role="radio"
                  aria-checked={value[it.id] === b.id}
                  title={b.label}
                  onClick={() => onSet(it.id, b.id)}
                  className={clsx("min-h-[40px] min-w-[40px] rounded-md border px-2 text-caption font-bold", value[it.id] === b.id ? "border-accent bg-accentSoft text-ink ring-2 ring-gold" : "border-line bg-paper text-ash hover:border-ash")}
                >
                  {String.fromCharCode(65 + i)}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
