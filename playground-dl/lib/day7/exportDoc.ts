import { BARRIER_BY_ID, BUDGET, FACTS, GROUP_BY_ID, MEASURE_AREA, MEASURE_BY_ID, METHOD_BY_ID, OPT_BY_ID, OPT_IDS, PRINCIPLES, REFLECT, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day7/case";
import { DECISION_AREA, DECISION_BY_ID, EVAL_IDS, EVALS, KPI_IDS, KPIS, PLACES, R2_BUDGET, RISKS, decisionsCost } from "@/data/day7/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 7, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo panel render these
 * same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores: a rating is the learner's own, printed
 * as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");
const list = (items: string[]) => (items.length ? `<ul>${items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : `<p>—</p>`);

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d7;
  const L = LVL();
  const sortRows = FACTS.map((f) => `<tr><td class="id">${f.no}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${r1.sort[f.id] ? esc(PRINCIPLES[r1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const has12 = OPT_IDS.some((id) => r1.optImpact[id] || r1.optEffort[id] || r1.optRisk[id]) || r1.optOrder.length > 0 || r1.optWhy.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.causes.length > 0 || r1.causeWhy.trim() !== "";
  const optRows = OPT_IDS.map((id) => {
    const o = OPT_BY_ID[id];
    return `<tr><td class="id">${esc(id)} · ${esc(o.name)}</td><td>${esc(L[r1.optImpact[id] || 0])}</td><td>${esc(L[r1.optEffort[id] || 0])}</td><td>${esc(L[r1.optRisk[id] || 0])}</td><td class="num">${esc(euro(o.cost))}</td><td class="num">${o.weeks}</td></tr>`;
  }).join("");
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
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

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 7, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`InclusiveLearn is a learning platform whose content is good and whose usage is low: users with impairments drop out, and the content is hard to understand. Complaints are rising, the budget is limited (${euro(BUDGET)}) and time is short (${WEEKS_LIMIT} weeks).`, `InclusiveLearn ist eine Lernplattform, deren Inhalt gut und deren Nutzung gering ist: Nutzer mit Einschränkungen brechen ab, und der Inhalt ist schwer verständlich. Beschwerden nehmen zu, das Budget ist begrenzt (${euro(BUDGET)}) und die Zeit knapp (${WEEKS_LIMIT} Wochen).`))}</p>

<h2>${esc(tt("Part 1 · Find the barriers", "Teil 1 · Die Barrieren finden"))}</h2>
<h3>${esc(tt("1.1 · Eight facts sorted into the principles", "1.1 · Acht Fakten, in die Prinzipien sortiert"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Screen", "Bildschirm"))}</th><th>${esc(tt("The fact", "Der Fakt"))}</th><th>${esc(tt("Principle", "Prinzip"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The user groups that run into problems", "Die Nutzergruppen, die auf Probleme stoßen"))}</h3>
${list(r1.groups.map((g) => GROUP_BY_ID[g].text))}
${para(r1.groupsWhy)}
<h3>${esc(tt("Three improvements", "Drei Verbesserungen"))}</h3>${para(r1.improve)}

<h3>${esc(tt("1.2 · Integrate or expand: three options", "1.2 · Integrieren oder erweitern: drei Optionen"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(tt("User impact", "Nutzerwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${optRows}</tbody></table>
<ol>${r1.optOrder.map((id) => `<li>${esc(`${id} · ${OPT_BY_ID[id].name}`)}</li>`).join("") || "<li>—</li>"}</ol>${para(r1.optWhy)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Choose inclusive measures", "Teil 2 · Inklusive Maßnahmen wählen"))}</h2>
<h3>${esc(tt("2.1 · Four central barriers", "2.1 · Vier zentrale Barrieren"))}${esc(optTag())}</h3>
${has21 ? `${list(r1.causes.map((c) => BARRIER_BY_ID[c].text))}${para(r1.causeWhy)}` : optNote()}
<h3>${esc(tt("2.2 · Four measures, rated, ordered and justified", "2.2 · Vier Maßnahmen, bewertet, geordnet und begründet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("User impact", "Nutzerwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="6">—</td></tr>`}</tbody></table>
${chosen.length ? `<h3>${esc(tt("Why these ratings", "Warum diese Bewertungen"))}</h3><ul>${chosen.map((id) => `<li><strong>${esc(MEASURE_BY_ID[id].name)}</strong>: ${cell(r1.reasons[id] ?? "")}</li>`).join("")}</ul>` : ""}
<p class="legend">${esc(facts)}</p>
<h3>${esc(tt("Priority order and the justification", "Reihenfolge der Priorität und die Begründung"))}</h3>
<ol>${order.map((id) => `<li>${esc(MEASURE_BY_ID[id].name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(r1.orderWhy)}
<h3>${esc(tt("Three evaluation methods", "Drei Evaluationsmethoden"))}</h3>
${list(r1.methods.map((m) => `${METHOD_BY_ID[m].no} · ${METHOD_BY_ID[m].name}: ${METHOD_BY_ID[m].tells}`))}
${para(r1.methodsWhy)}
<h3>${esc(tt("What information I am missing", "Welche Information mir fehlt"))}</h3>${para(r1.missingInfo)}

<div class="foot">${esc(tt(`Checks requested: ${r1.checks + r1.sortChecks}`, `Angeforderte Prüfungen: ${r1.checks + r1.sortChecks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { r1, r2 } = p.d7;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = decisionsCost(r2.picks);
  const quoted = r1.chosen.length
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(r1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.</blockquote>`
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
  const places = PLACES.filter((x) => r2.places.includes(x.id)).map((x) => x.text);
  const kpis = KPI_IDS.filter((k) => r2.kpis.includes(k)).map((k) => KPIS.find((x) => x.id === k)!.text);
  const evals = EVAL_IDS.filter((v) => r2.evals.includes(v)).map((v) => EVALS.find((x) => x.id === v)!.text);
  const risk = r2.risk ? RISKS.find((x) => x.id === r2.risk)!.text : "—";
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 7, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of InclusiveLearn", "Die Geschäftsführung von InclusiveLearn"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief UX and Accessibility Officer", "Chief UX and Accessibility Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("Inclusive UX strategy and evaluation system for the next twelve months", "Strategie für inklusive UX und Evaluationssystem für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Strategy for inclusive UX", "1 · Strategie für inklusive UX"))}</h2>${para(r2.strategy)}
<h2>${esc(tt("2 · Integration into existing processes", "2 · Integration in bestehende Prozesse"))}</h2>${list(places)}
<h2>${esc(tt("3 · Three prioritised measures", "3 · Drei priorisierte Maßnahmen"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Measure", "Maßnahme"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
${para(r2.orderWhy)}
<h2>${esc(tt("4 · Evaluation system", "4 · Evaluationssystem"))}</h2>
<h3>${esc(tt("KPIs", "KPIs"))}</h3>${list(kpis)}
<h3>${esc(tt("Methods", "Methoden"))}</h3>${list(evals)}
<h3>${esc(tt("Who reads the results, how often, and what happens when a KPI is poor", "Wer die Ergebnisse liest, wie oft und was passiert, wenn ein KPI schlecht ist"))}</h3>${para(r2.readers)}
<h2>${esc(tt("5 · Risk analysis: costs against benefits", "5 · Risikoanalyse: Kosten gegen Nutzen"))}</h2>
<p><strong>${esc(tt("The most likely reason the plan fails:", "Der wahrscheinlichste Grund, warum der Plan scheitert:"))}</strong> ${esc(risk)}</p>${para(r2.riskPlan)}
<h2>${esc(tt("6 · One decision under uncertainty", "6 · Eine Entscheidung unter Unsicherheit"))}</h2>
<p><strong>${esc(tt("I decide:", "Ich entscheide:"))}</strong> ${esc(r2.decide.trim() || "—")}</p>
<p><strong>${esc(tt("I do not know:", "Ich weiß nicht:"))}</strong> ${esc(r2.dontKnow.trim() || "—")}</p>
<p><strong>${esc(tt("I reverse if:", "Ich nehme zurück, wenn:"))}</strong> ${esc(r2.reverse.trim() || "—")}</p>
<h2>${esc(tt("7 · What I give up or postpone", "7 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
