import { decisionsCost, longestWeeks, realFields, totalCost } from "@/lib/dayGen/model";
import type { GenField, GenSpec } from "@/lib/dayGen/spec";
import { cell, dateLabel, docHeader, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { GenExtra } from "@/store/dayTypesGen";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of a generic day, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo panel render these
 * same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores: a rating is the learner's own, printed as the
 * learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");
const list = (items: string[]) => (items.length ? `<ul>${items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : `<p>—</p>`);

/** One field of the learner's answer, as HTML. */
export function fieldHtml(f: Exclude<GenField, { kind: "decisions" }>, x: GenExtra): string {
  switch (f.kind) {
    case "text":
      return `<h3>${esc(f.label)}</h3>${para(x.text[f.id] ?? "")}`;
    case "multi":
      return `<h3>${esc(f.label)}</h3>${list(f.options.filter((o) => (x.multi[f.id] ?? []).includes(o.id)).map((o) => o.label))}`;
    case "single":
      return `<h3>${esc(f.label)}</h3><p>${esc(f.options.find((o) => o.id === x.single[f.id])?.label ?? "—")}</p>`;
    case "assign": {
      const a = x.assign[f.id] ?? {};
      const rows = f.items.map((i) => `<tr><td class="id">${esc(i.no)}</td><td>${esc(i.label)}</td><td>${esc(f.bins.find((b) => b.id === a[i.id])?.label ?? "—")}</td></tr>`).join("");
      return `<h3>${esc(f.label)}</h3><table><thead><tr><th>#</th><th>${esc(tt("Item", "Element"))}</th><th>${esc(tt("Section", "Bereich"))}</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
    case "frame":
      return `<h3>${esc(f.label)}</h3>${f.parts.map((p) => `<p><strong>${esc(p.label)}</strong> ${esc((x.text[p.id] ?? "").trim() || "—")}</p>`).join("")}`;
  }
}

const fieldsHtml = (fields: GenField[], x: GenExtra) => realFields(fields).map((f) => fieldHtml(f, x)).join("\n");

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function genAnalysisBody(p: Persisted, spec: GenSpec): string {
  const { r1 } = p.dg[spec.day];
  const L = LVL();
  const l = spec.limits;
  const catLabel = (id: string | null | undefined) => spec.cats.find((c) => c.id === id)?.label ?? "—";
  const sortRows = spec.facts.map((f) => `<tr><td class="id">${f.no}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${esc(catLabel(r1.sort[f.id]))}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const has12 = spec.opts.options.some((o) => r1.optImpact[o.id] || r1.optEffort[o.id] || r1.optRisk[o.id]) || r1.optOrder.length > 0 || r1.optWhy.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.causes.length > 0 || r1.causeWhy.trim() !== "";
  const optRows = spec.opts.options.map((o) => `<tr><td class="id">${esc(o.id)} · ${esc(o.name)}</td><td>${esc(L[r1.optImpact[o.id] || 0])}</td><td>${esc(L[r1.optEffort[o.id] || 0])}</td><td>${esc(L[r1.optRisk[o.id] || 0])}</td><td class="num">${esc(euro(o.cost))}</td><td class="num">${o.weeks}</td></tr>`).join("");
  const reflectBlocks = spec.reflect.questions.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const chosen = r1.chosen;
  const byId = (id: string) => spec.b22.measures.find((m) => m.id === id)!;
  const measureRows = chosen
    .map((id) => {
      const m = byId(id);
      return `<tr><td class="id">${esc(m.no)} · ${esc(m.name)}<br><span class="muted">${esc(spec.b22.areas[m.area])}</span></td><td>${esc(L[r1.impact[id] || 0])}</td><td>${esc(L[r1.effort[id] || 0])}</td><td>${esc(L[r1.risk[id] || 0])}</td><td class="num">${esc(euro(m.cost))}</td><td class="num">${m.weeks}</td></tr>`;
    })
    .join("");
  const cost = totalCost(spec, chosen);
  const weeks = longestWeeks(spec, chosen);
  const facts = chosen.length
    ? tt(
        `Total cost ${euro(cost)} of the ${euro(l.budget)} budget${cost > l.budget ? ` (${euro(cost - l.budget)} over)` : ""}. Longest measure ${weeks} weeks of the ${l.weeks} weeks available${weeks > l.weeks ? " (over)" : ""}.`,
        `Gesamtkosten ${euro(cost)} vom Budget von ${euro(l.budget)}${cost > l.budget ? ` (${euro(cost - l.budget)} darüber)` : ""}. Längste Maßnahme ${weeks} Wochen von den ${l.weeks} verfügbaren Wochen${weeks > l.weeks ? " (darüber)" : ""}.`,
      )
    : "";
  const order = r1.order.filter((id) => chosen.includes(id));

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: spec.day, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(spec.caseExport)}</p>

<h2>${esc(spec.partHeadings.p1.title)}</h2>
<h3>${esc(tt("1.1 · The facts, sorted", "1.1 · Die Fakten, sortiert"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Screen", "Bildschirm"))}</th><th>${esc(tt("The fact", "Der Fakt"))}</th><th>${esc(tt("Category", "Kategorie"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
${fieldsHtml(spec.b11.fields, r1)}

<h3>${esc(tt("1.2 · Three options", "1.2 · Drei Optionen"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(spec.opts.criteria[0].label)}</th><th>${esc(spec.opts.criteria[1].label)}</th><th>${esc(spec.opts.criteria[2].label)}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${optRows}</tbody></table>
<ol>${r1.optOrder.map((id) => `<li>${esc(`${id} · ${spec.opts.options.find((o) => o.id === id)?.name ?? ""}`)}</li>`).join("") || "<li>—</li>"}</ol>${para(r1.optWhy)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(spec.partHeadings.p2.title)}</h2>
<h3>${esc(tt("2.1 · Central problems", "2.1 · Zentrale Probleme"))}${esc(optTag())}</h3>
${has21 ? `${list(r1.causes.map((c) => spec.causes.items.find((x) => x.id === c)?.text ?? c))}${para(r1.causeWhy)}` : optNote()}
<h3>${esc(tt("2.2 · Measures, rated, ordered and justified", "2.2 · Maßnahmen, bewertet, geordnet und begründet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(spec.b22.impact.label)}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="6">—</td></tr>`}</tbody></table>
${chosen.length ? `<h3>${esc(tt("Why these ratings", "Warum diese Bewertungen"))}</h3><ul>${chosen.map((id) => `<li><strong>${esc(byId(id).name)}</strong>: ${cell(r1.reasons[id] ?? "")}</li>`).join("")}</ul>` : ""}
<p class="legend">${esc(facts)}</p>
<h3>${esc(tt("Priority order and the justification", "Reihenfolge der Priorität und die Begründung"))}</h3>
<ol>${order.map((id) => `<li>${esc(byId(id).name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(r1.orderWhy)}
${fieldsHtml(spec.b22.after, r1)}
<h3>${esc(tt("What information I am missing", "Welche Information mir fehlt"))}</h3>${para(r1.missingInfo)}

<div class="foot">${esc(tt(`Checks requested: ${r1.checks + r1.sortChecks}`, `Angeforderte Prüfungen: ${r1.checks + r1.sortChecks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function genMemoBody(p: Persisted, spec: GenSpec): string {
  const { r1, r2 } = p.dg[spec.day];
  const l = spec.limits;
  const items = spec.decisions.items;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = decisionsCost(spec, r2.picks);
  const quoted = r1.chosen.length
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(r1.chosen.map((id) => spec.b22.measures.find((m) => m.id === id)?.name ?? id).join(", "))}.</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const rows = picks
    .map((id, i) => {
      const d = items.find((x) => x.id === id)!;
      return `<tr><td class="id">${i + 1}</td><td>${esc(d.name)}<br><span class="muted">${esc(spec.decisions.areas[d.area])}</span></td><td class="num">${esc(euro(d.cost))}</td><td class="num">${d.weeks}</td></tr>`;
    })
    .join("");
  const facts = r2.picks.length
    ? tt(`Total ${euro(cost)} of the ${euro(l.r2Budget)} limit for the year${cost > l.r2Budget ? ` (${euro(cost - l.r2Budget)} over)` : ""}.`, `Gesamt ${euro(cost)} vom Limit von ${euro(l.r2Budget)} für das Jahr${cost > l.r2Budget ? ` (${euro(cost - l.r2Budget)} darüber)` : ""}.`)
    : "";
  const decisionsHtml = `<table><thead><tr><th>#</th><th>${esc(tt("Measure", "Maßnahme"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>${para(r2.orderWhy)}`;
  const allFields = realFields([...spec.b31.fields, ...spec.b32.fields]);
  const sections = spec.memoSections
    .map((s, i) => {
      const body = s.fieldIds
        .map((id) => {
          if (id === "decisions") return decisionsHtml;
          const f = allFields.find((x) => x.id === id);
          return f ? fieldHtml(f, r2) : "";
        })
        .join("\n");
      return `<h2>${i + 1} · ${esc(s.title)}</h2>\n${body}`;
    })
    .join("\n");
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: spec.day, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(spec.memo.to)}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(spec.role)}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(spec.memo.subject)}</dd>
</dl>
${quoted}
${sections}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
