import { APPROACH_BY_ID, BUDGET, FACTS, MONTHS, OPTS, PLATFORMS, PRACTICES, REFLECT, RISK_TICKS, TEST_BY_ID, TEST_KIND, VERDICTS, WEAKS, WEEKS_LIMIT, planCost, planWeeks } from "@/data/day2/case";
import { DATA, EVIDENCE, INVS, INV_AREA, INV_BY_ID, OWNERS, R2_BUDGET, RISKS, invsCost } from "@/data/day2/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 2, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo
 * panel render these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores:
 * a rating is the learner's own, printed as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");
const verdict = (v: string | null) => (v ? VERDICTS.find((x) => x.id === v)?.label ?? "—" : "—");

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d2;
  const L = LVL();
  const sortRows = FACTS.map((f) => `<tr><td class="id">${f.no}</td><td>${esc(f.where)}</td><td>${esc(f.text)}</td><td>${r1.sort[f.id] ? esc(PRACTICES[r1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const preferred = r1.prefer ? PLATFORMS.find((x) => x.id === r1.prefer)?.label ?? "—" : "—";

  const has12 = OPTS.some((o) => r1.optBenefit[o.id] || r1.optEffort[o.id] || r1.optRisk[o.id]) || !!r1.optChoice || r1.optWhy.trim() !== "";
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const has21 = r1.weak.length > 0 || r1.weakWhy.trim() !== "";
  const optRows = OPTS.map((o) => `<tr><td class="id">${o.id}</td><td>${esc(o.name)}</td><td class="num">${esc(euro(o.cost))}</td><td class="num">${o.weeks}</td><td>${esc(L[r1.optBenefit[o.id] || 0])}</td><td>${esc(L[r1.optEffort[o.id] || 0])}</td><td>${esc(L[r1.optRisk[o.id] || 0])}</td></tr>`).join("");
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const weakList = r1.weak.length ? `<ul>${r1.weak.map((id) => `<li>${esc(WEAKS.find((w) => w.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;

  const ap = r1.approach ? APPROACH_BY_ID[r1.approach] : null;
  const testRows = r1.tests
    .map((id) => {
      const x = TEST_BY_ID[id];
      return `<tr><td class="id">${esc(x.no)}</td><td>${esc(x.name)}<br><span class="muted">${esc(TEST_KIND[x.kind])}</span></td><td>${cell(r1.testQ[id] ?? "")}</td><td class="num">${esc(euro(x.cost))}</td><td class="num">${x.weeks}</td></tr>`;
    })
    .join("");
  const cost = planCost(r1.approach, r1.tests);
  const weeks = planWeeks(r1.approach, r1.tests);
  const facts = r1.approach || r1.tests.length
    ? tt(
        `Approach plus tests cost ${euro(cost)} of the ${euro(BUDGET)} budget${cost > BUDGET ? ` (${euro(cost - BUDGET)} over)` : ""}. The longest item takes ${weeks} weeks of the ${WEEKS_LIMIT} weeks (${MONTHS} months) available${weeks > WEEKS_LIMIT ? " (over)" : ""}.`,
        `Ansatz und Tests kosten ${euro(cost)} vom Budget von ${euro(BUDGET)}${cost > BUDGET ? ` (${euro(cost - BUDGET)} darüber)` : ""}. Das längste Element dauert ${weeks} Wochen von den ${WEEKS_LIMIT} verfügbaren Wochen (${MONTHS} Monate)${weeks > WEEKS_LIMIT ? " (darüber)" : ""}.`,
      )
    : "";

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 2, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`LearnPro is a learning platform that has stopped growing: learners drop out early, there is no personalisation and the content is rated boring. The goal is to improve the platform within ${MONTHS} months, a budget of ${euro(BUDGET)} and with unclear user needs. Evidence in the file: eight facts about two platforms, and the options for prototypes and UX tests.`, `LearnPro ist eine Lernplattform, die nicht mehr wächst: Lernende brechen früh ab, es gibt keine Personalisierung, und der Inhalt wird als langweilig bewertet. Das Ziel ist, die Plattform innerhalb von ${MONTHS} Monaten, mit einem Budget von ${euro(BUDGET)} und bei unklaren Nutzerbedürfnissen zu verbessern. Evidenz in der Datei: acht Fakten zu zwei Plattformen sowie die Optionen für Prototypen und UX-Tests.`))}</p>

<h2>${esc(tt("Part 1 · Compare platforms and options", "Teil 1 · Plattformen und Optionen vergleichen"))}</h2>
<h3>${esc(tt("1.1 · Eight facts sorted into Learning path, Short units and Feedback", "1.1 · Acht Fakten, sortiert in Lernpfad, Kurze Einheiten und Feedback"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Platform", "Plattform"))}</th><th>${esc(tt("Fact", "Fakt"))}</th><th>${esc(tt("Practice", "Praxis"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The platform I would prefer as a learner", "Die Plattform, die ich als Lernende bevorzugen würde"))}</h3>
<p><strong>${esc(preferred)}</strong></p>${para(r1.preferWhy)}
<h3>${esc(tt("Three principles of success", "Drei Erfolgsprinzipien"))}</h3>
<ol>${r1.principles.map((x) => `<li>${cell(x)}</li>`).join("")}</ol>

<h3>${esc(tt("1.2 · Prototyping and testing under time pressure", "1.2 · Prototyping und Testen unter Zeitdruck"))}${esc(optTag())}</h3>
${has12 ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(tt("What it is", "Was es ist"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th><th>${esc(tt("Benefit", "Nutzen"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th></tr></thead><tbody>${optRows}</tbody></table>
<h3>${esc(tt("My decision", "Meine Entscheidung"))}</h3><p><strong>${esc(r1.optChoice ? `${r1.optChoice} · ${OPTS.find((o) => o.id === r1.optChoice)?.name ?? ""}` : "—")}</strong></p>${para(r1.optWhy)}
<h3>${esc(tt("Risks without testing", "Risiken ohne Testen"))}</h3>${r1.optRisks.length ? `<ul>${r1.optRisks.map((id) => `<li>${esc(RISK_TICKS.find((k) => k.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`}${r1.optRiskOther.trim() ? para(r1.optRiskOther) : ""}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Plan prototypes and tests", "Teil 2 · Prototypen und Tests planen"))}</h2>
<h3>${esc(tt("2.1 · Three main weaknesses", "2.1 · Drei Hauptschwächen"))}${esc(optTag())}</h3>
${has21 ? `${weakList}${para(r1.weakWhy)}` : optNote()}
<h3>${esc(tt("2.2 · Prototype approach, three UX tests and the adaptive decision", "2.2 · Prototyping-Ansatz, drei UX-Tests und die Entscheidung zu adaptivem Lernen"))}</h3>
<h3>${esc(tt("Prototype approach", "Prototyping-Ansatz"))}</h3>
${ap ? `<p><strong>${esc(ap.no)} · ${esc(ap.what)}</strong><br><span class="muted">${esc(euro(ap.cost))} · ${ap.weeks} ${esc(tt("weeks", "Wochen"))}</span></p>` : "<p>—</p>"}${para(r1.approachWhy)}
<h3>${esc(tt("Three UX tests and the question each answers", "Drei UX-Tests und die Frage, die jeder beantwortet"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Test", "Test"))}</th><th>${esc(tt("The question it answers for LearnPro", "Die Frage, die er für LearnPro beantwortet"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${testRows || `<tr><td colspan="5">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
<h3>${esc(tt("Is adaptive learning worthwhile?", "Lohnt adaptives Lernen?"))}</h3>
<p><strong>${esc(verdict(r1.adaptive))}</strong></p>${para(r1.adaptiveWhy)}
<h3>${esc(tt("What information I am missing", "Welche Information mir fehlt"))}</h3>${para(r1.missingInfo)}

<div class="foot">${esc(tt(`Checks requested: ${r1.checks + r1.sortChecks}`, `Angeforderte Prüfungen: ${r1.checks + r1.sortChecks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { r1, r2 } = p.d2;
  const picks = r2.order.filter((id) => r2.picks.includes(id));
  const cost = invsCost(r2.picks);
  const quoted = r1.adaptive
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("My decision on adaptive learning there:", "Meine Entscheidung zu adaptivem Lernen dort:"))} ${esc(verdict(r1.adaptive))}.${r1.approach ? ` ${esc(tt("Prototype approach chosen:", "Gewählter Prototyping-Ansatz:"))} ${esc(APPROACH_BY_ID[r1.approach].what)}.` : ""}</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const rows = picks
    .map((id, i) => {
      const d = INV_BY_ID[id];
      return `<tr><td class="id">${i + 1}</td><td>${esc(d.name)}<br><span class="muted">${esc(INV_AREA[d.area])}</span></td><td class="num">${esc(euro(d.cost))}</td><td class="num">${d.weeks}</td></tr>`;
    })
    .join("");
  const facts = r2.picks.length
    ? tt(`Total ${euro(cost)} of the ${euro(R2_BUDGET)} limit for the year${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} over)` : ""}.`, `Gesamt ${euro(cost)} vom Limit von ${euro(R2_BUDGET)} für das Jahr${cost > R2_BUDGET ? ` (${euro(cost - R2_BUDGET)} darüber)` : ""}.`)
    : "";
  const risk = r2.risk ? RISKS.find((r) => r.id === r2.risk)?.text ?? "—" : "—";
  const owner = r2.owner ? OWNERS.find((o) => o.id === r2.owner)?.text ?? "—" : "—";
  const list = (ids: string[], src: { id: string; text: string }[]) => (ids.length ? `<ul>${ids.map((id) => `<li>${esc(src.find((e) => e.id === id)?.text ?? id)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`);
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 2, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of LearnPro", "Die Geschäftsführung von LearnPro"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief Product Officer", "Chief Product Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("Innovation strategy for the next twelve months", "Innovationsstrategie für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Do we invest in adaptive learning?", "1 · Investieren wir in adaptives Lernen?"))}</h2>
<p><strong>${esc(verdict(r2.adaptive))}</strong></p>${para(r2.adaptiveWhy)}
<h2>${esc(tt("2 · Prototyping strategy", "2 · Prototyping-Strategie"))}</h2>${para(r2.prototyping)}
<h2>${esc(tt("3 · UX testing strategy: the data we need", "3 · UX-Teststrategie: die Daten, die wir brauchen"))}</h2>${list(r2.data, DATA)}
<h2>${esc(tt("4 · Three investments, in order", "4 · Drei Investitionen, in Reihenfolge"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Investment", "Investition"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
<h2>${esc(tt("5 · Why this order", "5 · Warum diese Reihenfolge"))}</h2>${para(r2.orderWhy)}
<h2>${esc(tt("6 · The biggest risk and what I do about it", "6 · Das größte Risiko und was ich dagegen tue"))}</h2>
<p><strong>${esc(risk)}</strong></p>${para(r2.riskPlan)}
<h2>${esc(tt("7 · One decision under uncertainty", "7 · Eine Entscheidung unter Unsicherheit"))}</h2>${para(r2.uncertain)}
<h2>${esc(tt("8 · How we decide on innovations in future", "8 · Wie wir künftig über Innovationen entscheiden"))}</h2>
<p><strong>${esc(tt("Who decides:", "Wer entscheidet:"))}</strong> ${esc(owner)}</p>
<p><strong>${esc(tt("On what evidence:", "Auf welcher Grundlage:"))}</strong></p>${list(r2.evidence, EVIDENCE)}
<h2>${esc(tt("9 · What I give up or postpone", "9 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
