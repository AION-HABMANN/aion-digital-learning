import { AREAS, BUDGET, CAUSES, FACTS, MEASURE_AREA, MEASURE_BY_ID, OPTS, OPT_BY_ID, REFLECT, WEEKS_LIMIT, FACT_BY_ID, longestWeeks, totalCost } from "@/data/day3/case";
import { CHECKS, DECISION_AREA, DECISION_BY_ID, OWNERS, R2_BUDGET, RISKS, decisionsCost } from "@/data/day3/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 3, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo
 * panel render these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores:
 * a rating is the learner's own, printed as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d3;
  const L = LVL();
  const sortRows = FACTS.map((f) => `<tr><td class="id">${f.no}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${r1.sort[f.id] ? esc(AREAS[r1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const worst = r1.worst ? FACT_BY_ID[r1.worst] : null;

  const has12 = OPTS.some((o) => r1.optImpact[o.id] || r1.optEffort[o.id] || r1.optRisk[o.id]) || r1.optOrder.length > 0 || r1.optWhy.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.causes.length > 0 || r1.causeWhy.trim() !== "";
  const optRows = OPTS.map((o) => `<tr><td class="id">${o.id}</td><td>${esc(o.name)}</td><td class="num">${esc(euro(o.cost))}</td><td class="num">${o.weeks}</td><td>${esc(L[r1.optImpact[o.id] || 0])}</td><td>${esc(L[r1.optEffort[o.id] || 0])}</td><td>${esc(L[r1.optRisk[o.id] || 0])}</td></tr>`).join("");
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const causeList = r1.causes.length ? `<ul>${r1.causes.map((id) => `<li>${esc(CAUSES.find((c) => c.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;

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

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 3, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`EduCore is a learning platform for professionals. Learners say they do not understand the content, many drop out, and the platform is called “too complicated”: too much information at once, no visual structure, no recognisable learning logic. Budget ${euro(BUDGET)}, time ${WEEKS_LIMIT} weeks, complex content, beginners. Evidence in the file: eight facts on the EduCore screens and nine measures EduCore could fund.`, `EduCore ist eine Lernplattform für Fachkräfte. Lernende sagen, sie verstünden den Inhalt nicht, viele brechen ab, und die Plattform wird „zu kompliziert“ genannt: zu viel Information auf einmal, keine visuelle Struktur, keine erkennbare Lernlogik. Budget ${euro(BUDGET)}, Zeit ${WEEKS_LIMIT} Wochen, komplexer Inhalt, Einsteiger. Evidenz in der Datei: acht Fakten auf den EduCore-Bildschirmen und neun Maßnahmen, die EduCore finanzieren könnte.`))}</p>

<h2>${esc(tt("Part 1 · Recognise the overload", "Teil 1 · Die Überlastung erkennen"))}</h2>
<h3>${esc(tt("1.1 · Eight facts sorted into Amount, Form and Order and purpose", "1.1 · Acht Fakten, sortiert in Menge, Form und Ordnung und Zweck"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Screen", "Bildschirm"))}</th><th>${esc(tt("Fact", "Fakt"))}</th><th>${esc(tt("Area", "Bereich"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The fact that would make me stop first, and how the learning process feels", "Der Fakt, bei dem ich zuerst aufhören würde, und wie sich der Lernprozess anfühlt"))}</h3>
<p><strong>${esc(worst ? `${worst.no} · ${worst.short}` : "—")}</strong></p>${para(r1.worstWhy)}
<h3>${esc(tt("What I would improve intuitively", "Was ich intuitiv verbessern würde"))}</h3>${para(r1.improve)}

<h3>${esc(tt("1.2 · Reduce the load of a module: three options", "1.2 · Die Belastung eines Moduls senken: drei Optionen"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(tt("What it is", "Was es ist"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th><th>${esc(tt("Learning impact", "Lernwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th></tr></thead><tbody>${optRows}</tbody></table>
<h3>${esc(tt("Priority", "Priorität"))}</h3><ol>${r1.optOrder.map((id) => `<li>${esc(`${id} · ${OPT_BY_ID[id].name}`)}</li>`).join("") || "<li>—</li>"}</ol>
<h3>${esc(tt("The option with the greatest effect on learning", "Die Option mit der größten Wirkung auf das Lernen"))}</h3>${para(r1.optWhy)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Choose measures within the limits", "Teil 2 · Maßnahmen innerhalb der Grenzen wählen"))}</h2>
<h3>${esc(tt("2.1 · Four causes of cognitive overload", "2.1 · Vier Ursachen kognitiver Überlastung"))}${esc(optTag())}</h3>
${has21 ? `${causeList}${para(r1.causeWhy)}` : optNote()}
<h3>${esc(tt("2.2 · Four improvements, rated, ordered and justified", "2.2 · Vier Verbesserungen, bewertet, geordnet und begründet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("Learning impact", "Lernwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="6">—</td></tr>`}</tbody></table>
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
  const { r1, r2 } = p.d3;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = decisionsCost(r2.picks);
  const quoted = r1.worst
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("The fact I judged most stopping:", "Der Fakt, bei dem ich am ehesten aufgehört hätte:"))} ${esc(FACT_BY_ID[r1.worst].short)}.${r1.chosen.length ? ` ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(r1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.` : ""}</blockquote>`
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
  const risk = r2.risk ? RISKS.find((r) => r.id === r2.risk)?.text ?? "—" : "—";
  const owner = r2.owner ? OWNERS.find((o) => o.id === r2.owner)?.text ?? "—" : "—";
  const checks = r2.lessonChecks.length ? `<ul>${r2.lessonChecks.map((id) => `<li>${esc(CHECKS.find((c) => c.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 3, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of EduCore", "Die Geschäftsführung von EduCore"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief Learning Experience Officer", "Chief Learning Experience Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("Learning-psychology-based UX strategy for the next twelve months", "Lernpsychologisch fundierte UX-Strategie für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Strategy to reduce cognitive load", "1 · Strategie zur Senkung der kognitiven Belastung"))}</h2>${para(r2.strategy)}
<h2>${esc(tt("2 · What learning-effective UX means for us", "2 · Was lerneffektives UX für uns bedeutet"))}</h2>${para(r2.definition)}
<h2>${esc(tt("3 · Three measures, in order", "3 · Drei Maßnahmen, in Reihenfolge"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Measure", "Maßnahme"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
<h2>${esc(tt("4 · Why this order", "4 · Warum diese Reihenfolge"))}</h2>${para(r2.orderWhy)}
<h2>${esc(tt("5 · The biggest risk and what I do about it", "5 · Das größte Risiko und was ich dagegen tue"))}</h2>
<p><strong>${esc(risk)}</strong></p>${para(r2.riskPlan)}
<h2>${esc(tt("6 · Decision logic for future content", "6 · Entscheidungslogik für künftige Inhalte"))}</h2>
<p><strong>${esc(tt("Who decides:", "Wer entscheidet:"))}</strong> ${esc(owner)}</p>
<p><strong>${esc(tt("Checks every new lesson must pass:", "Prüfungen, die jede neue Lektion bestehen muss:"))}</strong></p>${checks}
<h2>${esc(tt("7 · One decision without user data", "7 · Eine Entscheidung ohne Nutzerdaten"))}</h2>${para(r2.uncertain)}
<h2>${esc(tt("8 · What I give up or postpone", "8 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
