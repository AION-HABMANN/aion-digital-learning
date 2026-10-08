import { AREAS, BUDGET, CAUSES, CLAIMS, CLAIM_BINS, DROPOUT, FINDINGS, FINDING_BY_ID, MEASURE_AREA, MEASURE_BY_ID, MONTHS, REFLECT, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day1/case";
import { DECISION_AREA, DECISION_BY_ID, EVIDENCE, OWNERS, R2_BUDGET, RISKS, decisionsCost } from "@/data/day1/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 1, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo
 * panel render these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores:
 * a rating is the learner's own, printed as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */

const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d1;
  const L = LVL();
  const sortRows = FINDINGS.map((f, i) => `<tr><td class="id">${i + 1}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${r1.sort[f.id] ? esc(AREAS[r1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const worst = r1.worst ? FINDING_BY_ID[r1.worst] : null;

  const has12 = Object.values(r1.claims).some((c) => c !== null) || r1.need.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.causes.length > 0 || r1.causeWhy.trim() !== "";

  const claimRows = CLAIMS.map((c) => `<tr><td>${esc(c.text)}</td><td>${r1.claims[c.id] ? esc(CLAIM_BINS.find((b) => b.id === r1.claims[c.id])?.label ?? "—") : "—"}</td></tr>`).join("");
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const causeList = r1.causes.length ? `<ul>${r1.causes.map((id) => `<li>${esc(CAUSES.find((c) => c.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;

  const chosen = r1.chosen;
  const measureRows = chosen
    .map((id) => {
      const m = MEASURE_BY_ID[id];
      return `<tr><td class="id">${esc(m.name)}<br><span class="muted">${esc(MEASURE_AREA[m.area])}</span></td><td>${esc(L[r1.impact[id] || 0])}</td><td>${esc(L[r1.effort[id] || 0])}</td><td>${esc(L[r1.risk[id] || 0])}</td><td class="num">${esc(euro(m.cost))}</td><td class="num">${m.weeks}</td></tr>`;
    })
    .join("");
  const cost = totalCost(chosen);
  const weeks = longestWeeks(chosen);
  const facts = chosen.length
    ? tt(
        `Total cost ${euro(cost)} of the ${euro(BUDGET)} budget${cost > BUDGET ? ` (${euro(cost - BUDGET)} over)` : ""}. Longest measure ${weeks} weeks of the ${WEEKS_LIMIT} weeks (${MONTHS} months) available${weeks > WEEKS_LIMIT ? " (over)" : ""}.`,
        `Gesamtkosten ${euro(cost)} vom Budget von ${euro(BUDGET)}${cost > BUDGET ? ` (${euro(cost - BUDGET)} darüber)` : ""}. Längste Maßnahme ${weeks} Wochen von ${WEEKS_LIMIT} Wochen (${MONTHS} Monate)${weeks > WEEKS_LIMIT ? " (darüber)" : ""}.`,
      )
    : "";
  const order = r1.order.filter((id) => chosen.includes(id));

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 1, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`SkillUp GmbH runs the learning platform LearnFast. ${DROPOUT} of every 100 learners who start a course do not finish it, the content is hard to understand and there is no clear learning path. Budget ${euro(BUDGET)}, time ${MONTHS} months. Evidence in the file: eight findings on the LearnFast screens and nine measures SkillUp could fund.`, `Die SkillUp GmbH betreibt die Lernplattform LearnFast. ${DROPOUT} von je 100 Lernenden, die einen Kurs beginnen, schließen ihn nicht ab, die Inhalte sind schwer verständlich, und es gibt keinen klaren Lernpfad. Budget ${euro(BUDGET)}, Zeit ${MONTHS} Monate. Evidenz in der Datei: acht Befunde auf den LearnFast-Bildschirmen und neun Maßnahmen, die SkillUp finanzieren könnte.`))}</p>

<h2>${esc(tt("Part 1 · Read the platform from the learner's side", "Teil 1 · Die Plattform aus Sicht der Lernenden lesen"))}</h2>
<h3>${esc(tt("1.1 · Eight findings sorted into Orientation, Understanding and Motivation", "1.1 · Acht Befunde, sortiert in Orientierung, Verständnis und Motivation"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Screen", "Bildschirm"))}</th><th>${esc(tt("Finding", "Befund"))}</th><th>${esc(tt("Area", "Bereich"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The finding that would make me give up first", "Der Befund, der mich zuerst aufgeben ließe"))}</h3>
<p><strong>${esc(worst ? worst.short : "—")}</strong></p>${para(r1.worstWhy)}

<h3>${esc(tt("1.2 · What the 40% shows and does not show", "1.2 · Was die 40 % zeigen und was nicht"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Statement", "Aussage"))}</th><th>${esc(tt("My reading", "Meine Lesart"))}</th></tr></thead><tbody>${claimRows}</tbody></table><h3>${esc(tt("What I would need to find out why learners leave", "Was ich herausfinden müsste, warum Lernende gehen"))}</h3>${para(r1.need)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Choose measures within the limits", "Teil 2 · Maßnahmen innerhalb der Grenzen wählen"))}</h2>
<h3>${esc(tt("2.1 · Three main causes", "2.1 · Drei Hauptursachen"))}${esc(optTag())}</h3>
${has21 ? `${causeList}${para(r1.causeWhy)}` : optNote()}
<h3>${esc(tt("2.2 · Four measures, rated and ordered", "2.2 · Vier Maßnahmen, bewertet und geordnet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("User impact", "Nutzerwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="6">—</td></tr>`}</tbody></table>
${chosen.length ? `<h3>${esc(tt("Why these ratings", "Warum diese Bewertungen"))}</h3><ul>${chosen.map((id) => `<li><strong>${esc(MEASURE_BY_ID[id].name)}</strong>: ${cell(r1.reasons[id] ?? "")}</li>`).join("")}</ul>` : ""}
<p class="legend">${esc(facts)}</p>
<h3>${esc(tt("Priority order", "Reihenfolge der Priorität"))}</h3>
<ol>${order.map((id) => `<li>${esc(MEASURE_BY_ID[id].name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(r1.orderWhy)}
<h3>${esc(tt("What information I am missing", "Welche Information mir fehlt"))}</h3>${para(r1.missingInfo)}

<div class="foot">${esc(tt(`Checks requested: ${r1.checks + r1.sortChecks + r1.claimChecks}`, `Angeforderte Prüfungen: ${r1.checks + r1.sortChecks + r1.claimChecks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { r1, r2 } = p.d1;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = decisionsCost(r2.picks);
  const quoted = r1.worst
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("The finding I judged most serious:", "Der Befund, den ich für am schwersten hielt:"))} ${esc(FINDING_BY_ID[r1.worst].short)}.${r1.chosen.length ? ` ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(r1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.` : ""}</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const rows = picks
    .map((id, i) => {
      const d = DECISION_BY_ID[id];
      return `<tr><td class="id">${i + 1}</td><td>${esc(d.name)}<br><span class="muted">${esc(DECISION_AREA[d.area])}</span></td><td class="num">${esc(euro(d.cost))}</td><td class="num">${d.weeks}</td></tr>`;
    })
    .join("");
  const facts = r2.picks.length
    ? tt(
        `Total ${euro(cost)} of the ${euro(R2_BUDGET)} limit for the year${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} over)` : ""}.`,
        `Gesamt ${euro(cost)} vom Limit von ${euro(R2_BUDGET)} für das Jahr${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} darüber)` : ""}.`,
      )
    : "";
  const risk = r2.risk ? RISKS.find((r) => r.id === r2.risk)?.text ?? "—" : "—";
  const owner = r2.owner ? OWNERS.find((o) => o.id === r2.owner)?.text ?? "—" : "—";
  const evidence = r2.evidence.length ? `<ul>${r2.evidence.map((id) => `<li>${esc(EVIDENCE.find((e) => e.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 1, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of SkillUp GmbH", "Die Geschäftsführung der SkillUp GmbH"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief UX Officer", "Chief UX Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("UX strategy for the next twelve months", "UX-Strategie für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · UX vision", "1 · UX-Vision"))}</h2>${para(r2.vision)}
<h2>${esc(tt("2 · Three strategic UX decisions, in order", "2 · Drei strategische UX-Entscheidungen, in Reihenfolge"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Decision", "Entscheidung"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
<h2>${esc(tt("3 · Why this order", "3 · Warum diese Reihenfolge"))}</h2>${para(r2.orderWhy)}
<h2>${esc(tt("4 · The biggest risk and what I do about it", "4 · Das größte Risiko und was ich dagegen tue"))}</h2>
<p><strong>${esc(risk)}</strong></p>${para(r2.riskPlan)}
<h2>${esc(tt("5 · How we decide on UX in future", "5 · Wie wir künftig über UX entscheiden"))}</h2>
<p><strong>${esc(tt("Who decides:", "Wer entscheidet:"))}</strong> ${esc(owner)}</p>
<p><strong>${esc(tt("On what evidence:", "Auf welcher Grundlage:"))}</strong></p>${evidence}
<h2>${esc(tt("6 · One decision without complete data", "6 · Eine Entscheidung ohne vollständige Daten"))}</h2>${para(r2.uncertain)}
<h2>${esc(tt("7 · What I give up or postpone", "7 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
