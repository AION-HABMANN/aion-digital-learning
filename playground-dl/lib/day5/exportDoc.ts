import { BUDGET, FACTS, FACT_BY_ID, MEASURE_AREA, MEASURE_BY_ID, MISTAKES, OPTS, OPT_BY_ID, PROBLEMS, REFLECT, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day5/case";
import { DECISION_AREA, DECISION_BY_ID, EVIDENCE, OWNERS, R2_BUDGET, RISKS, decisionsCost } from "@/data/day5/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 5, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo panel render these
 * same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores: a rating is the learner's own, printed
 * as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d5;
  const L = LVL();
  const sortRows = FACTS.map((f) => `<tr><td class="id">${f.no}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${r1.sort[f.id] ? esc(MISTAKES[r1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const worst = r1.worst ? FACT_BY_ID[r1.worst] : null;
  const has12 = OPTS.some((o) => r1.optImpact[o.id] || r1.optEffort[o.id] || r1.optRisk[o.id]) || r1.optOrder.length > 0 || r1.optWhy.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.causes.length > 0;
  const optRows = OPTS.map((o) => `<tr><td class="id">${o.id}</td><td>${esc(o.name)}</td><td class="num">${esc(euro(o.cost))}</td><td>${esc(L[r1.optImpact[o.id] || 0])}</td><td>${esc(L[r1.optEffort[o.id] || 0])}</td><td>${esc(L[r1.optRisk[o.id] || 0])}</td></tr>`).join("");
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const problemRows = r1.causes.map((id) => `<tr><td>${esc(PROBLEMS.find((c) => c.id === id)?.text ?? id)}</td><td>${cell(r1.errors[id] ?? "")}</td></tr>`).join("");
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

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 5, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`LearnBase is a learning platform with many functions and low usage. Learners cannot find the content they need and are frustrated; the first analysis points to system logic instead of user logic. Management wants growth, satisfaction is falling, and the budget is limited: ${euro(BUDGET)}, ${WEEKS_LIMIT} weeks.`, `LearnBase ist eine Lernplattform mit vielen Funktionen und geringer Nutzung. Lernende finden den Inhalt nicht, den sie brauchen, und sind frustriert; die erste Analyse weist auf Systemlogik statt Nutzerlogik. Das Management verlangt Wachstum, die Zufriedenheit sinkt, und das Budget ist begrenzt: ${euro(BUDGET)}, ${WEEKS_LIMIT} Wochen.`))}</p>

<h2>${esc(tt("Part 1 · Take the learner's perspective", "Teil 1 · Die Perspektive der Lernenden einnehmen"))}</h2>
<h3>${esc(tt("1.1 · My goal as a learner", "1.1 · Mein Ziel als Lernende"))}</h3>${para(r1.goal)}
<h3>${esc(tt("Eight facts sorted into three mistakes", "Acht Fakten, in drei Fehler sortiert"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Screen", "Bildschirm"))}</th><th>${esc(tt("Fact", "Fakt"))}</th><th>${esc(tt("Mistake", "Fehler"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The fact that would frustrate me most", "Der Fakt, der mich am meisten frustrieren würde"))}</h3>
<p><strong>${esc(worst ? `${worst.no} · ${worst.short}` : "—")}</strong></p>${para(r1.worstWhy)}
<h3>${esc(tt("Three expectations of a good platform", "Drei Erwartungen an eine gute Plattform"))}</h3>${para(r1.expectations)}

<h3>${esc(tt("1.2 · User-centredness against business goals", "1.2 · Nutzerzentrierung gegen Geschäftsziele"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(tt("What it is", "Was es ist"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th>${esc(tt("User value", "Nutzerwert"))}</th><th>${esc(tt("Business value", "Geschäftswert"))}</th><th>${esc(tt("Risk", "Risiko"))}</th></tr></thead><tbody>${optRows}</tbody></table>
<h3>${esc(tt("Priority", "Priorität"))}</h3><ol>${r1.optOrder.map((id) => `<li>${esc(`${id} · ${OPT_BY_ID[id].name}`)}</li>`).join("") || "<li>—</li>"}</ol>
<h3>${esc(tt("My justification", "Meine Begründung"))}</h3>${para(r1.optWhy)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Choose measures within the limits", "Teil 2 · Maßnahmen innerhalb der Grenzen wählen"))}</h2>
<h3>${esc(tt("2.1 · Four central user problems and their causes", "2.1 · Vier zentrale Nutzerprobleme und ihre Ursachen"))}${esc(optTag())}</h3>
${has21 ? `<table><thead><tr><th>${esc(tt("Problem", "Problem"))}</th><th>${esc(tt("The design error behind it", "Der Designfehler dahinter"))}</th></tr></thead><tbody>${problemRows}</tbody></table>` : optNote()}
<h3>${esc(tt("2.2 · Four measures, rated, ordered and justified", "2.2 · Vier Maßnahmen, bewertet, geordnet und begründet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("User value", "Nutzerwert"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="6">—</td></tr>`}</tbody></table>
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
  const { r1, r2 } = p.d5;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = decisionsCost(r2.picks);
  const quoted = r1.worst
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("The fact that frustrated me most:", "Der Fakt, der mich am meisten frustrierte:"))} ${esc(FACT_BY_ID[r1.worst].short)}.${r1.chosen.length ? ` ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(r1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.` : ""}</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const rows = picks
    .map((id, i) => {
      const d = DECISION_BY_ID[id];
      return `<tr><td class="id">${i + 1}</td><td>${esc(d.name)}<br><span class="muted">${esc(DECISION_AREA[d.area])}</span></td><td class="num">${esc(euro(d.cost))}</td><td class="num">${d.weeks}</td></tr>`;
    })
    .join("");
  const conflictRows = picks.map((id) => `<tr><td>${esc(DECISION_BY_ID[id].name)}</td><td>${cell(r2.conflict[id]?.user ?? "")}</td><td>${cell(r2.conflict[id]?.business ?? "")}</td><td>${cell(r2.conflict[id]?.lost ?? "")}</td></tr>`).join("");
  const facts = r2.picks.length
    ? tt(`Total ${euro(cost)} of the ${euro(R2_BUDGET)} limit for the year${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} over)` : ""}.`, `Gesamt ${euro(cost)} vom Limit von ${euro(R2_BUDGET)} für das Jahr${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} darüber)` : ""}.`)
    : "";
  const risk = r2.risk ? RISKS.find((r) => r.id === r2.risk)?.text ?? "—" : "—";
  const owner = r2.owner ? OWNERS.find((o) => o.id === r2.owner)?.text ?? "—" : "—";
  const list = (items: string[]) => (items.length ? `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`);
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 5, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of LearnBase", "Die Geschäftsführung von LearnBase"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief UX Strategist", "Chief UX Strategist"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("User-centred UX strategy for the next twelve months", "Nutzerzentrierte UX-Strategie für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · The central user needs", "1 · Die zentralen Nutzerbedürfnisse"))}</h2>${para(r2.needs)}
<h2>${esc(tt("2 · Three strategic decisions, as a roadmap", "2 · Drei strategische Entscheidungen, als Roadmap"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Decision", "Entscheidung"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
<h2>${esc(tt("3 · Conflict analysis: user against business", "3 · Konfliktanalyse: Nutzer gegen Unternehmen"))}</h2>
<table><thead><tr><th>${esc(tt("Decision", "Entscheidung"))}</th><th>${esc(tt("What the user gets", "Was die Nutzer bekommen"))}</th><th>${esc(tt("What the business gets", "Was das Unternehmen bekommt"))}</th><th>${esc(tt("What is lost or postponed", "Was verloren geht oder verschoben wird"))}</th></tr></thead><tbody>${conflictRows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<h2>${esc(tt("4 · Why this order", "4 · Warum diese Reihenfolge"))}</h2>${para(r2.orderWhy)}
<h2>${esc(tt("5 · The biggest risk and what I do about it", "5 · Das größte Risiko und was ich dagegen tue"))}</h2>
<p><strong>${esc(risk)}</strong></p>${para(r2.riskPlan)}
<h2>${esc(tt("6 · Decision architecture for user-centred development", "6 · Entscheidungsarchitektur für nutzerzentrierte Entwicklung"))}</h2>
<p><strong>${esc(tt("Who decides:", "Wer entscheidet:"))}</strong> ${esc(owner)}</p>
<p><strong>${esc(tt("On what evidence:", "Auf welcher Grundlage:"))}</strong></p>${list(r2.evidence.map((id) => EVIDENCE.find((c) => c.id === id)?.text ?? id))}
<p><strong>${esc(tt("The rule every new feature must pass:", "Die Regel, die jedes neue Feature bestehen muss:"))}</strong></p>${para(r2.rule)}
<h2>${esc(tt("7 · One decision without complete user data", "7 · Eine Entscheidung ohne vollständige Nutzerdaten"))}</h2>${para(r2.uncertain)}
<h2>${esc(tt("8 · What I give up or postpone", "8 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
