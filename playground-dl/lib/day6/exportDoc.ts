import { BUDGET, MEASURE_AREA, MEASURE_BY_ID, NOTES, PERSONA_FIELDS, PHASES_1, PHASES_L, PHASES_T, PHASE_LABEL_1, PHASE_LABEL_L, PHASE_LABEL_T, REFLECT, TEACHER_NOTES, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day6/case";
import { DECISION_AREA, DECISION_BY_ID, PHASES_R, PHASE_LABEL_R, R2_BUDGET, SEGMENTS, SEGMENT_BY_ID, decisionsCost } from "@/data/day6/route2";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { euro, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { JCell } from "@/store/dayTypesStd";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 6, built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the memo panel render these
 * same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores: a rating is the learner's own, printed
 * as the learner chose it. Optional blocks print "Optional block · not filled in" when they are empty.
 */
const LVL = () => ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const optNote = () => `<p class="muted">${esc(tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt."))}</p>`;
const optTag = () => tt(" · Optional", " · Optional");
const emo = (n: number) => (n > 0 ? `${n} / 5` : "—");

type Row = [string, (c: JCell) => string];
/** A journey grid as a table: one column per phase, one row per field. */
function journeyTable(phases: { id: string; label: string }[], cells: Record<string, JCell>, rows: Row[]): string {
  const head = phases.map((ph) => `<th>${esc(ph.label)}</th>`).join("");
  const body = rows.map(([label, get]) => `<tr><th>${esc(label)}</th>${phases.map((ph) => `<td>${cell(get(cells[ph.id] ?? ({ does: "", thinks: "", emotion: 0, pain: "", acts: "" } as JCell)))}</td>`).join("")}</tr>`).join("");
  return `<table><thead><tr><th></th>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
const ROWS_DTEP = (): Row[] => [[tt("What the person does", "Was die Person tut"), (c) => c.does], [tt("What the person thinks", "Was die Person denkt"), (c) => c.thinks], [tt("Emotion (1 to 5)", "Emotion (1 bis 5)"), (c) => emo(c.emotion)], [tt("Pain point", "Pain Point"), (c) => c.pain]];
const ROWS_DEP = (): Row[] => [[tt("What the person does", "Was die Person tut"), (c) => c.does], [tt("Emotion (1 to 5)", "Emotion (1 bis 5)"), (c) => emo(c.emotion)], [tt("Pain point", "Pain Point"), (c) => c.pain]];
const ROWS_DEPA = (): Row[] => [...ROWS_DEP(), [tt("Where your strategy acts", "Wo Ihre Strategie ansetzt"), (c) => c.acts]];

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d6;
  const L = LVL();
  const sortRows = NOTES.map((n) => `<tr><td class="id">${n.no}</td><td>${esc(n.where)}</td><td>${esc(n.text)}</td><td>${r1.sort[n.id] ? esc(PERSONA_FIELDS[r1.sort[n.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = r1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${r1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${r1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const pe = r1.persona;
  const personaRows: [string, string][] = [
    [tt("Name, age, role", "Name, Alter, Rolle"), pe.nameRole],
    [tt("Goals", "Ziele"), pe.goals],
    [tt("Problems and frustrations", "Probleme und Frustrationen"), pe.problems],
    [tt("Usage situation", "Nutzungssituation"), pe.situation],
    [tt("Expectations of a learning platform", "Erwartungen an eine Lernplattform"), pe.expectations],
  ];
  const has12 = PHASES_1.some((k) => r1.j[k].does.trim() || r1.j[k].pain.trim() || r1.j[k].emotion) || r1.jProblems.trim() !== "" || !!r1.jCritical;
  const has13 = Object.values(r1.reflect).some((v) => v.trim() !== "");
  const te = r1.teacher;
  const has21 = Object.values(te).some((v) => v.trim() !== "") || r1.shared.trim() !== "" || PHASES_L.some((k) => r1.jl[k].does.trim()) || PHASES_T.some((k) => r1.jt[k].does.trim());
  const reflectBlocks = REFLECT.map((q) => `<h3>${esc(q.q)}</h3>${para(r1.reflect[q.k])}`).join("");
  const chosen = r1.chosen;
  const measureRows = chosen
    .map((id) => {
      const m = MEASURE_BY_ID[id];
      return `<tr><td class="id">${esc(m.no)} · ${esc(m.name)}<br><span class="muted">${esc(MEASURE_AREA[m.area])}</span></td><td>${cell(r1.pain[id] ?? "")}</td><td>${esc(L[r1.impact[id] || 0])}</td><td>${esc(L[r1.effort[id] || 0])}</td><td>${esc(L[r1.risk[id] || 0])}</td><td class="num">${esc(euro(m.cost))}</td><td class="num">${m.weeks}</td></tr>`;
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
  const critical = r1.jCritical ? PHASE_LABEL_1[r1.jCritical] : "—";

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 6, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`EduPath is a learning platform with three kinds of users: learners drop out because they lack time, teachers find the platform too complicated, and the organisations that buy the courses complain about low usage. Budget ${euro(BUDGET)}, ${WEEKS_LIMIT} weeks.`, `EduPath ist eine Lernplattform mit drei Arten von Nutzern: Lernende brechen aus Zeitmangel ab, Lehrende finden die Plattform zu kompliziert, und die Organisationen, die die Kurse kaufen, klagen über geringe Nutzung. Budget ${euro(BUDGET)}, ${WEEKS_LIMIT} Wochen.`))}</p>

<h2>${esc(tt("Part 1 · Describe a person and a path", "Teil 1 · Eine Person und einen Weg beschreiben"))}</h2>
<h3>${esc(tt("1.1 · Eight research notes sorted into the persona fields", "1.1 · Acht Recherchenotizen, in die Persona-Felder sortiert"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Source", "Quelle"))}</th><th>${esc(tt("The note", "Die Notiz"))}</th><th>${esc(tt("Persona field", "Persona-Feld"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("The learner persona", "Die Lernenden-Persona"))}</h3>
<table><tbody>${personaRows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${cell(v)}</td></tr>`).join("")}</tbody></table>
<h3>${esc(tt("Frustrations and the decision the persona supports", "Frustrationen und die Entscheidung, die die Persona stützt"))}</h3>${para(r1.frustrations)}

<h3>${esc(tt("1.2 · A journey that ends in drop-out", "1.2 · Eine Journey, die im Abbruch endet"))}${esc(optTag())}</h3>
${has12 ? `${journeyTable(PHASES_1.map((k) => ({ id: k, label: PHASE_LABEL_1[k] })), r1.j, ROWS_DTEP())}
<h3>${esc(tt("Four possible problems", "Vier mögliche Probleme"))}</h3>${para(r1.jProblems)}
<h3>${esc(tt("The critical phase", "Die kritische Phase"))}</h3><p><strong>${esc(critical)}</strong></p>${para(r1.jCriticalWhy)}` : optNote()}
<h3>${esc(tt("1.3 · Coaching reflection", "1.3 · Coaching-Reflexion"))}${esc(optTag())}</h3>
${has13 ? reflectBlocks : optNote()}

<h2>${esc(tt("Part 2 · Two personas, two journeys, four measures", "Teil 2 · Zwei Personas, zwei Journeys, vier Maßnahmen"))}</h2>
<h3>${esc(tt("2.1 · The teacher persona and two journeys", "2.1 · Die Lehrenden-Persona und zwei Journeys"))}${esc(optTag())}</h3>
${has21 ? `<table><tbody>${([[tt("Name, role", "Name, Rolle"), te.nameRole], [tt("Goals", "Ziele"), te.goals], [tt("Problems and frustrations", "Probleme und Frustrationen"), te.problems], [tt("Usage situation", "Nutzungssituation"), te.situation]] as [string, string][]).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${cell(v)}</td></tr>`).join("")}</tbody></table>
<h3>${esc(tt("The learner's journey", "Die Journey der Lernenden"))}</h3>${journeyTable(PHASES_L.map((k) => ({ id: k, label: PHASE_LABEL_L[k] })), r1.jl, ROWS_DEP())}
<h3>${esc(tt("The teacher's journey", "Die Journey der Lehrenden"))}</h3>${journeyTable(PHASES_T.map((k) => ({ id: k, label: PHASE_LABEL_T[k] })), r1.jt, ROWS_DEP())}
<h3>${esc(tt("A pain point that appears for two groups", "Ein Pain Point, der bei zwei Gruppen auftritt"))}</h3>${para(r1.shared)}` : optNote()}
<h3>${esc(tt("2.2 · Four measures, rated, ordered and justified", "2.2 · Vier Maßnahmen, bewertet, geordnet und begründet"))}</h3>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("The pain point it answers", "Der Pain Point, den sie beantwortet"))}</th><th>${esc(tt("User impact", "Nutzerwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="7">—</td></tr>`}</tbody></table>
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
  const { r1, r2 } = p.d6;
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
  const segRows = SEGMENTS.filter((s) => r2.segs.includes(s.id)).map((s) => `<tr><td class="id">${esc(s.no)} · ${esc(s.name)}</td><td>${cell(r2.segPersona[s.id] ?? "")}</td></tr>`).join("");
  const target = r2.target ? `${SEGMENT_BY_ID[r2.target].no} · ${SEGMENT_BY_ID[r2.target].name}` : "—";
  const jseg = r2.jSeg ? `${SEGMENT_BY_ID[r2.jSeg].no} · ${SEGMENT_BY_ID[r2.jSeg].name}` : "—";
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 6, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of EduPath", "Die Geschäftsführung von EduPath"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Head of UX Strategy", "Head of UX Strategy"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("Segmentation and journey strategy for the next twelve months", "Segmentierungs- und Journey-Strategie für die nächsten zwölf Monate"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Strategic personas", "1 · Strategische Personas"))}</h2>
<table><tbody>${segRows || `<tr><td colspan="2">—</td></tr>`}</tbody></table>
<h2>${esc(tt("2 · The most important target group", "2 · Die wichtigste Zielgruppe"))}</h2>
<p><strong>${esc(target)}</strong></p>${para(r2.targetWhy)}
<h2>${esc(tt("3 · The three biggest problems of this group", "3 · Die drei größten Probleme dieser Gruppe"))}</h2>${para(r2.problems)}
<h2>${esc(tt("4 · The most critical journey", "4 · Die kritischste Journey"))}</h2>
<p><strong>${esc(jseg)}</strong></p>${journeyTable(PHASES_R.map((k) => ({ id: k, label: PHASE_LABEL_R[k] })), r2.jr, ROWS_DEPA())}
<h2>${esc(tt("5 · The prioritised UX strategy: three decisions", "5 · Die priorisierte UX-Strategie: drei Entscheidungen"))}</h2>
<table><thead><tr><th>#</th><th>${esc(tt("Decision", "Entscheidung"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Weeks", "Wochen"))}</th></tr></thead><tbody>${rows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${esc(facts)}</p>
${para(r2.orderWhy)}
<h2>${esc(tt("6 · One decision under uncertainty: which persona is prioritised", "6 · Eine Entscheidung unter Unsicherheit: welche Persona priorisiert wird"))}</h2>
<p><strong>${esc(tt("I decide:", "Ich entscheide:"))}</strong> ${esc(r2.decide.trim() || "—")}</p>
<p><strong>${esc(tt("I do not know:", "Ich weiß nicht:"))}</strong> ${esc(r2.dontKnow.trim() || "—")}</p>
<p><strong>${esc(tt("I reverse if:", "Ich nehme zurück, wenn:"))}</strong> ${esc(r2.reverse.trim() || "—")}</p>
<h2>${esc(tt("7 · What I give up or postpone", "7 · Worauf ich verzichte oder was ich verschiebe"))}</h2>${para(r2.giveUp)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

void TEACHER_NOTES;
