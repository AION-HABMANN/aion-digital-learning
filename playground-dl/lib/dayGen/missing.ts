import { fid, fieldMissing } from "@/lib/dayGen/fields";
import { realFields } from "@/lib/dayGen/model";
import type { BlockSpec, GenSpec } from "@/lib/dayGen/spec";
import { MIN_LINE, coreOnly, len, measuresMissing } from "@/lib/dayStd/common";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the page cannot drift. */
export const GIDS = {
  fact: (id: string) => `fact-${id}`,
  causePick: "cause-pick",
  causeWhy: "causewhy-field",
  optOrder: "optorder-field",
  optWhy: "optwhy-field",
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  reason: (id: string) => `reason-${id}`,
  pain: (id: string) => `pain-${id}`,
  order: "order-field",
  orderWhy: "orderwhy-field",
  missingInfo: "missinginfo-field",
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
} as const;

/** Every label starts "Block X.Y:", in both languages. Optional blocks (CLAUDE.md #35) are never required: `coreOnly` drops their entries in one place. */
export function genR1Missing(p: Persisted, spec: GenSpec): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.dg[spec.day];
  const l = spec.limits;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  for (const f of spec.facts)
    if (r1.sort[f.id] === null || r1.sort[f.id] === undefined) e(GIDS.fact(f.id), tt(`Block 1.1: ${spec.sortNoun} ${f.no} is not sorted into a category.`, `Block 1.1: ${spec.sortNoun} ${f.no} ist keiner Kategorie zugeordnet.`));
  for (const f of realFields(spec.b11.fields)) fieldMissing(f, r1, "1.1", out);

  // Block 2.1 (Optional): the entries exist so that its own notice can show them; coreOnly drops them from the export list.
  if (r1.causes.length !== l.pickCauses) e(GIDS.causePick, tt(`Block 2.1: choose exactly ${l.pickCauses} (you have ${r1.causes.length}).`, `Block 2.1: Wählen Sie genau ${l.pickCauses} (Sie haben ${r1.causes.length}).`));
  if (len(r1.causeWhy) < MIN_LINE) e(GIDS.causeWhy, tt(`Block 2.1: point at a printed fact for your first choice (at least ${MIN_LINE} characters).`, `Block 2.1: Zeigen Sie bei Ihrer ersten Wahl auf einen gedruckten Fakt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.2 (Core): the measures, then the day's extra fields, placed before “What information are you missing?” as on the page
  const tmp: MissingEntry[] = [];
  measuresMissing(
    r1,
    {
      pick: l.pickMeasures,
      nameOf: (id) => spec.b22.measures.find((m) => m.id === id)?.name ?? id,
      criteria: tt(spec.b22.impact.label.toLowerCase(), spec.b22.impact.label),
      ids: { pick: GIDS.measurePick, measure: GIDS.measure, reason: GIDS.reason, orderWhy: GIDS.orderWhy, missingInfo: GIDS.missingInfo },
    },
    tmp,
  );
  const extra: MissingEntry[] = [];
  for (const f of realFields(spec.b22.after)) fieldMissing(f, r1, "2.2", extra);
  const at = tmp.findIndex((m) => m.id === GIDS.missingInfo);
  out.push(...(at < 0 ? [...tmp, ...extra] : [...tmp.slice(0, at), ...extra, ...tmp.slice(at)]));
  return coreOnly(out);
}

function blockMissing(spec: GenSpec, blk: BlockSpec, number: string, p: Persisted, out: MissingEntry[]) {
  const { r2 } = p.dg[spec.day];
  const l = spec.limits;
  const e = (id: string, label: string) => out.push({ id, label });
  for (const f of blk.fields) {
    if (f.kind !== "decisions") {
      fieldMissing(f, r2, number, out);
      continue;
    }
    if (r2.picks.length !== l.r2Pick) e(GIDS.decisionPick, tt(`Block ${number}: choose exactly ${l.r2Pick} (you have ${r2.picks.length}).`, `Block ${number}: Wählen Sie genau ${l.r2Pick} (Sie haben ${r2.picks.length}).`));
    if (r2.picks.length === l.r2Pick && len(r2.orderWhy) < MIN_LINE) {
      const first = spec.decisions.items.find((d) => d.id === (r2.order[0] ?? r2.picks[0]));
      const name = short(first?.name ?? "", 36);
      e(GIDS.decisionOrderWhy, tt(`Block ${number}: say why “${name}” goes first (at least ${MIN_LINE} characters).`, `Block ${number}: Begründen Sie, warum „${name}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));
    }
  }
}

export function genR2Missing(p: Persisted, spec: GenSpec): MissingEntry[] {
  const out = participantMissing(p);
  blockMissing(spec, spec.b31, "3.1", p, out);
  blockMissing(spec, spec.b32, "3.2", p, out);
  return coreOnly(out);
}

export { fid };
