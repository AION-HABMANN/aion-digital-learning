import { BUDGET, CAUSES, FACTS, MEASURE_AREA, MEASURE_BY_ID, OPTS, OPT_BY_ID, PRINCIPLES, REFLECT, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day4/case";
import { DECISION_AREA, DECISION_BY_ID, EVIDENCE, METRICS, OWNERS, R2_BUDGET, RISKS, STRATEGIES, decisionsCost } from "@/data/day4/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 4, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo panel render
 * these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores: a rating is the learner's own,
 * printed as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d4;
  const L = LVL();
  const sortRows = FACTS.map((f) => `<tr><td class="id">${f.no}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${r1.sort[f.id] ? esc(PRINCIPLES[r1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const has12 = OPTS.some((o) => r1.optImpact[o.id] || r1.optEffort[o.id] || r1.optRisk[o.id]) || r1.optOrder.length > 0 || r1.optWhy.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.causes.length > 0 || r1.causeWhy.trim() !== "";
  const optRows = OPTS.map((o) => `<tr><td class="id">${o.id}</td><td>${esc(o.name)}</td><td class="num">${esc(euro(o.cost))}</td><td class="num">${o.weeks}</td><td>${esc(L[r1.optImpact[o.id] || 0])}</td><td>${esc(L[r1.optEffort[o.id] || 0])}</td><td>${esc(L[r1.optRisk[o.id] || 0])}</td></tr>`).join("");
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const causeList = r1.causes.length ? `<ul>${r1.causes.map((id) => `<li>${esc(CAUSES.find((c) => c.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;
  const principles = r1.principles.map((x) => x.trim()).filter(Boolean);

  const chosen = r1.chosen;
  const measureRows = chosen
    .map((id) => {
      const m = MEASURE_BY_ID[id];
      return `<tr><td class="id">${esc(m.no)} · ${esc(m.name)}<br><span class="muted">${esc(MEASURE_AREA[m.area])}</span></td><td>${esc(L[r1.impact[id] || 0])}</td><td>${esc(L[r1.effort[id] || 0])}</td><td>${esc(L[r1.risk[id] || 0])}</td><td class="num">${esc(euro(m.cost))}</td><td class="num">${m.weeks}</td></tr>`;
    })
    .join("");
  const cost = totalCost(chosen);
  const weeks = longestWeeks(chosen);
  const facts = chosen.length
    ? tt(
        `Total cost ${euro(cost)} of the ${euro(BUDGET)} budget${cost > BUDGET ? ` (${euro(cost - BUDGET)} over)` : ""}. Longest measure ${weeks} weeks of the ${WEEKS_LIMIT} weeks available${weeks > WEEKS_LIMIT ? " (over)" : ""}.`,
        `Gesamtkosten ${euro(cost)} vom Budget von ${euro(BUDGET)}${cost > BUDGET ? ` (${euro(cost - BUDGET)} darüber)` : ""}. Längste Maßnahme ${weeks} Wochen von den ${WEEKS_LIMIT} verfügbaren Wochen${weeks > WEEKS_LIMIT ? " (darüber)" : ""}.`,
      )
    : "";
  const order = r1.order.filter((id) => chosen.includes(id));

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 4, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`MotivaLearn is a learning platform whose learners start courses and then drop out. They call the content “boring”, and nothing shows them that they are making progress. Budget ${euro(BUDGET)}, time ${WEEKS_LIMIT} weeks (two months). Evidence in the file: eight facts about two platforms and nine measures MotivaLearn could fund.`, `MotivaLearn ist eine Lernplattform, deren Lernende Kurse beginnen und dann abbrechen. Sie nennen den Inhalt „langweilig“, und nichts zeigt ihnen, dass sie vorankommen. Budget ${euro(BUDGET)}, Zeit ${WEEKS_LIMIT} Wochen (zwei Monate). Evidenz in der Datei: acht Fakten zu zwei Plattformen und neun Maßnahmen, die MotivaLearn finanzieren könnte.`))}</p>

<h2>${esc(tt("Part 1 · Recognise motivation", "Teil 1 · Motivation erkennen"))}</h2>
<h3>${esc(tt("1.1 · Eight facts sorted into four principles", "1.1 · Acht Fakten, in vier Prinzipien sortiert"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Platform and screen", "Plattform und Bildschirm"))}</th><th>${esc(tt("Fact", "Fakt"))}</th><th>${esc(tt("Principle", "Prinzip"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The platform I find more motivating, and why", "Die Plattform, die ich motivierender finde, und warum"))}</h3>
<p><strong>${esc(r1.prefer ? tt(`Platform ${r1.prefer}`, `Plattform ${r1.prefer}`) : "—")}</strong></p>${para(r1.preferWhy)}
<h3>${esc(tt("Three principles of motivation", "Drei Prinzipien der Motivation"))}</h3>
${principles.length ? `<ol>${principles.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>` : `<p class="muted">—</p>`}

<h3>${esc(tt("1.2 · Choose an engagement strategy: three options", "1.2 · Eine Engagement-Strategie wählen: drei Optionen"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(tt("What it is", "Was es ist"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th><th>${esc(tt("Motivation impact", "Motivationswirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th></tr></thead><tbody>${optRows}</tbody></table>
<h3>${esc(tt("Priority", "Priorität"))}</h3><ol>${r1.optOrder.map((id) => `<li>${esc(`${id} · ${OPT_BY_ID[id].name}`)}</li>`).join("") || "<li>—</li>"}</ol>
<h3>${esc(tt("The measure with a lasting effect", "Die Maßnahme mit nachhaltiger Wirkung"))}</h3>${para(r1.optWhy)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Choose measures within the limits", "Teil 2 · Maßnahmen innerhalb der Grenzen wählen"))}</h2>
<h3>${esc(tt("2.1 · Three main causes of the motivation problem", "2.1 · Drei Hauptursachen des Motivationsproblems"))}${esc(optTag())}</h3>
${has21 ? `${causeList}${para(r1.causeWhy)}` : optNote()}
<h3>${esc(tt("2.2 · Four measures, rated, ordered and justified", "2.2 · Vier Maßnahmen, bewertet, geordnet und begründet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("Motivation impact", "Motivationswirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="6">—</td></tr>`}</tbody></table>
${chosen.length ? `<h3>${esc(tt("Why these ratings", "Warum diese Bewertungen"))}</h3><ul>${chosen.map((id) => `<li><strong>${esc(MEASURE_BY_ID[id].name)}</strong>: ${cell(r1.reasons[id] ?? "")}</li>`).join("")}</ul>` : ""}
<p class="legend">${esc(facts)}</p>
<h3>${esc(tt("Priority order and the justification", "Reihenfolge der Priorität und die Begründung"))}</h3>
<ol>${order.map((id) => `<li>${esc(MEASURE_BY_ID[id].name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(r1.orderWhy)}
<h3>${esc(tt("What information I am missing", "Welche Information mir fehlt"))}</h3>${para(r1.missingInfo)}

<div class="foot">${esc(tt(`Checks requested: ${r1.checks + r1.sortChecks}`, `Angeforderte Prüfungen: ${r1.checks + r1.sortChecks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { r1, r2 } = p.d4;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = decisionsCost(r2.picks);
  const quoted = r1.prefer
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("The platform I found more motivating:", "Die Plattform, die ich motivierender fand:"))} ${esc(tt(`Platform ${r1.prefer}`, `Plattform ${r1.prefer}`))}.${r1.chosen.length ? ` ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(r1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.` : ""}</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const rows = picks
    .map((id, i) => {
      const d = DECISION_BY_ID[id];
      return `<tr><td class="id">${i + 1}</td><td>${esc(d.name)}<br><span class="muted">${esc(DECISION_AREA[d.area])}</span></td><td class="num">${esc(euro(d.cost))}</td><td class="num">${d.weeks}</td></tr>`;
    })
    .join("");
  const facts = r2.picks.length
    ? tt(`Total ${euro(cost)} of the ${euro(R2_BUDGET)} limit for the year${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} over)` : ""}.`, `Gesamt ${euro(cost)} vom Limit von ${euro(R2_BUDGET)} für das Jahr${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} darüber)` : ""}.`)
    : "";
  const strategy = r2.strategy ? STRATEGIES.find((s) => s.id === r2.strategy)?.text ?? "—" : "—";
  const risk = r2.risk ? RISKS.find((r) => r.id === r2.risk)?.text ?? "—" : "—";
  const owner = r2.owner ? OWNERS.find((o) => o.id === r2.owner)?.text ?? "—" : "—";
  const list = (items: string[]) => (items.length ? `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`);
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 4, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of MotivaLearn", "Die Geschäftsführung von MotivaLearn"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief Experience Officer", "Chief Experience Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("Engagement strategy for the next twelve months", "Engagement-Strategie für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Motivation strategy", "1 · Motivationsstrategie"))}</h2>
<p><strong>${esc(strategy)}</strong></p>${para(r2.strategyWhy)}
<h2>${esc(tt("2 · Three measures, in order", "2 · Drei Maßnahmen, in Reihenfolge"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Decision", "Entscheidung"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
<h2>${esc(tt("3 · Why this order", "3 · Warum diese Reihenfolge"))}</h2>${para(r2.orderWhy)}
<h2>${esc(tt("4 · How we measure success", "4 · Wie wir den Erfolg messen"))}</h2>
${list(r2.metrics.map((id) => METRICS.find((m) => m.id === id)?.text ?? id))}${para(r2.success)}
<h2>${esc(tt("5 · The biggest risk and what I do about it", "5 · Das größte Risiko und was ich dagegen tue"))}</h2>
<p><strong>${esc(risk)}</strong></p>${para(r2.riskPlan)}
<h2>${esc(tt("6 · Decision architecture for UX optimisation", "6 · Entscheidungsarchitektur für die UX-Optimierung"))}</h2>
<p><strong>${esc(tt("Who decides:", "Wer entscheidet:"))}</strong> ${esc(owner)}</p>
<p><strong>${esc(tt("On what evidence:", "Auf welcher Grundlage:"))}</strong></p>${list(r2.evidence.map((id) => EVIDENCE.find((c) => c.id === id)?.text ?? id))}
<h2>${esc(tt("7 · One decision under uncertainty", "7 · Eine Entscheidung unter Unsicherheit"))}</h2>${para(r2.uncertain)}
<h2>${esc(tt("8 · What I give up or postpone", "8 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
