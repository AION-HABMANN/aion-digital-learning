import { effortBandOf } from "@/lib/dayGen/model";
import type { AssignField, GenSpec, MultiField, SingleField } from "@/lib/dayGen/spec";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options (CLAUDE.md #7): the expected pick and a reason per option, including why each
 * rejected option is rejected, with a teaching note where more than one answer defends. Never exported and never shown to a learner. Mentor tools stay
 * English (#32); the option labels they quote follow the site's language. All of it is read from the day's spec.
 */
const LEVEL = ["", "Low", "Mid", "High"];

export function sortKey(spec: GenSpec): AnswerKeyBlock {
  return {
    title: `Block 1.1 · ${spec.sortKeyTitle}`,
    expected: spec.cats.map((c) => `${c.label}: ${spec.facts.filter((f) => f.area === c.id).map((f) => `${spec.sortNoun} ${f.no}`).join(", ")}`).join("  |  "),
    options: spec.facts.map((f) => ({ label: `${spec.sortNoun} ${f.no} · ${f.short}`, expected: true, why: `${spec.cats.find((c) => c.id === f.area)?.label}. ${f.why}` })),
    teachingNote: spec.sortTeaching,
  };
}

export function optKey(spec: GenSpec): AnswerKeyBlock {
  const o = spec.opts;
  const band = effortBandOf(spec);
  return {
    title: o.keyTitle,
    expected: `Reference order: ${o.model.order.join(", then ")}. Impact ${o.model.order.map((id) => `${id} ${LEVEL[o.model.impact[id]]}`).join(", ")}; risk ${o.model.order.map((id) => `${id} ${LEVEL[o.model.risk[id]]}`).join(", ")}.`,
    options: o.options.map((x) => ({ label: `${x.id} · ${x.name} (${euro(x.cost)}, ${x.weeks} weeks)`, expected: x.id === o.model.order[0] || x.id === o.model.order[1], why: `Reference ratings: impact ${LEVEL[o.model.impact[x.id]]}, effort ${LEVEL[band(x.cost)]} by the printed cost, risk ${LEVEL[o.model.risk[x.id]]}. ${x.keyWhy}` })),
    teachingNote: o.keyTeaching,
  };
}

export function causeKey(spec: GenSpec): AnswerKeyBlock {
  const c = spec.causes;
  return { title: c.keyTitle, expected: c.model.map((id) => c.items.find((x) => x.id === id)?.text).join(" · "), options: c.items.map((x) => ({ label: x.text, expected: c.model.includes(x.id), why: x.why })), teachingNote: c.teaching };
}

export function measureKey(spec: GenSpec): AnswerKeyBlock {
  const b = spec.b22;
  const band = effortBandOf(spec);
  const total = b.model.chosen.reduce((s, id) => s + (b.measures.find((m) => m.id === id)?.cost ?? 0), 0);
  return {
    title: b.keyTitle,
    expected: `${b.model.chosen.map((id) => b.measures.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(total)} of ${euro(spec.limits.budget)}.`,
    options: b.measures.map((m) => {
      const model = b.model.chosen.includes(m.id);
      const ratings = model ? ` Reference ratings: impact ${LEVEL[b.model.impact[m.id]]}, effort ${LEVEL[band(m.cost)]} by the printed cost ${euro(m.cost)}, risk ${LEVEL[b.model.risk[m.id]]}.` : "";
      return { label: `${m.no} · ${m.name}`, expected: model, why: `${m.keyWhy}${ratings}` };
    }),
    teachingNote: `${spec.mentorNote} ${b.keyTeaching} Effort is rule-based (${b.effortRuleText}), so the check can flag it; impact and risk are judgements and are never marked. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38).`,
  };
}

export function decisionKey(spec: GenSpec): AnswerKeyBlock {
  const d = spec.decisions;
  const total = d.model.picks.reduce((s, id) => s + (d.items.find((x) => x.id === id)?.cost ?? 0), 0);
  return {
    title: d.keyTitle,
    expected: `${d.model.picks.map((id) => d.items.find((x) => x.id === id)?.name).join("; ")}. ${euro(total)} of the yearly budget (${euro(spec.limits.r2Budget)}).`,
    options: d.items.map((x) => ({ label: `${x.no} · ${x.name} (${euro(x.cost)}, ${x.weeks} weeks)`, expected: d.model.picks.includes(x.id), why: x.keyWhy })),
    teachingNote: d.keyTeaching,
  };
}

export function multiKey(f: MultiField): AnswerKeyBlock {
  return { title: f.keyTitle, expected: f.model.map((id) => f.options.find((o) => o.id === id)?.label).join("; "), options: f.options.map((o) => ({ label: o.label, expected: o.expected, why: o.why })), teachingNote: f.teaching };
}

export function singleKey(f: SingleField): AnswerKeyBlock {
  return { title: f.keyTitle, expected: f.options.find((o) => o.id === f.model)?.label ?? "", options: f.options.map((o) => ({ label: o.label, expected: o.expected, why: o.why })), teachingNote: f.teaching };
}

export function assignKey(f: AssignField): AnswerKeyBlock {
  return {
    title: f.keyTitle,
    expected: f.items.map((i) => `${i.no} → ${f.bins.find((b) => b.id === i.model)?.label}`).join("; "),
    options: f.items.map((i) => ({ label: `${i.no} · ${i.label}`, expected: true, why: `${f.bins.find((b) => b.id === i.model)?.label}. ${i.why}` })),
    teachingNote: f.teaching,
  };
}
