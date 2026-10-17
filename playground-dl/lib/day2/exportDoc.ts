import { MONTHS, OPTS, PLATFORMS, TEST_SLOTS, VERDICTS } from "@/data/day2/case";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { ASSESS_KEYS, TEST_KEYS, diffLines } from "@/lib/day2/progress";
import { tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 2 (CLAUDE.md #57), built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and
 * the memo panel render these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or
 * scores: every answer is the learner's own, printed as written, in the layout (text or table) the learner chose.
 */
const verdict = (v: string | null) => (v ? VERDICTS.find((x) => x.id === v)?.label ?? "—" : "—");
const empty = `<p class="muted">—</p>`;

/** One answer per item, as paragraphs under the item's name, or as a table when the learner chose rows. */
function grid(rowNames: { id: string; name: string }[], mode: "text" | "table", text: Record<string, string>, rows: Record<string, Record<string, string>>, cols: readonly string[], heads: string[], first: string): string {
  if (mode === "table") {
    return `<table><thead><tr><th>${esc(first)}</th>${heads.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rowNames.map((r) => `<tr><td>${r.name}</td>${cols.map((k) => `<td>${cell(rows[r.id]?.[k] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  return rowNames.map((r) => `<p><strong>${r.name}</strong></p>${para(text[r.id] ?? "")}`).join("");
}

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d2;
  const preferred = r1.prefer ? PLATFORMS.find((x) => x.id === r1.prefer)?.label ?? "—" : "—";
  const diffs = diffLines(r1.diffs);
  const tableRows = r1.diffRows.filter((r) => r.aspect.trim() || r.a.trim() || r.b.trim());
  const diffsHtml =
    r1.diffMode === "table"
      ? tableRows.length
        ? `<table><thead><tr><th>#</th><th>${esc(tt("What is compared", "Was verglichen wird"))}</th><th>${esc(tt("Platform A", "Plattform A"))}</th><th>${esc(tt("Platform B", "Plattform B"))}</th></tr></thead><tbody>${tableRows.map((r, i) => `<tr><td class="id">${i + 1}</td><td>${cell(r.aspect)}</td><td>${cell(r.a)}</td><td>${cell(r.b)}</td></tr>`).join("")}</tbody></table>`
        : empty
      : diffs.length
        ? `<ol>${diffs.map((x) => `<li>${cell(x)}</li>`).join("")}</ol>`
        : empty;
  const optNames = OPTS.map((o) => ({ id: o.id, name: `${esc(tt("Option", "Option"))} ${o.id} · ${esc(o.name)}` }));
  const assess = grid(optNames, r1.assessMode, r1.assessText, r1.assessRows, ASSESS_KEYS, [tt("Risk", "Risiko"), tt("Benefit", "Nutzen"), tt("Effort", "Aufwand")], tt("Option", "Option"));
  const slotNames = TEST_SLOTS.map((id) => ({ id, name: `${esc(tt("UX test", "UX-Test"))} ${id}` }));
  const tests = grid(slotNames, r1.testMode, r1.testText, r1.testRows, TEST_KEYS, [tt("What you test", "Was Sie testen"), tt("How", "Wie"), tt("What you measure", "Was Sie messen")], tt("Test", "Test"));
  const decision = r1.optChoice ? `${r1.optChoice} · ${OPTS.find((o) => o.id === r1.optChoice)?.name ?? ""}` : "—";

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 2, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`LearnPro is a learning platform that has stopped growing: learners drop out early, there is no personalisation and the content is rated boring. The goal is to improve the platform within ${MONTHS} months, with a limited budget and unclear user needs.`, `LearnPro ist eine Lernplattform, die nicht mehr wächst: Lernende brechen früh ab, es gibt keine Personalisierung, und der Inhalt wird als langweilig bewertet. Das Ziel ist, die Plattform innerhalb von ${MONTHS} Monaten, mit begrenztem Budget und bei unklaren Nutzerbedürfnissen zu verbessern.`))}</p>

<h2>${esc(tt("Part 1 · Level 1 · Knowledge", "Teil 1 · Level 1 · Wissen"))}</h2>
<h3>${esc(tt("1.1 · Two platforms", "1.1 · Zwei Plattformen"))}</h3>
<h3>${esc(tt("The platform I would prefer as a learner, and why", "Die Plattform, die ich als Lernende bevorzugen würde, und warum"))}</h3>
<p><strong>${esc(preferred)}</strong></p>${para(r1.preferWhy)}
<h3>${esc(tt("Five differences between Platform A and Platform B", "Fünf Unterschiede zwischen Plattform A und Plattform B"))}</h3>
${diffsHtml}
<h3>${esc(tt("Three principles of success", "Drei Erfolgsprinzipien"))}</h3>
<ol>${r1.principles.map((x) => `<li>${cell(x)}</li>`).join("")}</ol>

<h3>${esc(tt("1.2 · Prototyping and testing strategy", "1.2 · Prototyping- und Teststrategie"))}</h3>
<h3>${esc(tt("Assessment of the three options", "Bewertung der drei Optionen"))}</h3>
${assess}
<h3>${esc(tt("My decision", "Meine Entscheidung"))}</h3><p><strong>${esc(decision)}</strong></p>${para(r1.optWhy)}
<h3>${esc(tt("Risks without testing", "Risiken ohne Testen"))}</h3>${para(r1.noTest)}

<h2>${esc(tt("Part 2 · Level 2 · Application", "Teil 2 · Level 2 · Anwendung"))}</h2>
<h3>${esc(tt("2.1 · The case study: LearnPro", "2.1 · Die Fallstudie: LearnPro"))}</h3>
<h3>${esc(tt("The weaknesses of LearnPro", "Die Schwächen von LearnPro"))}</h3>${para(r1.weakText)}
<h3>${esc(tt("Prototype approach", "Prototyping-Ansatz"))}</h3>${para(r1.approachText)}
<h3>${esc(tt("Three UX tests", "Drei UX-Tests"))}</h3>
${tests}
<h3>${esc(tt("Is adaptive learning worthwhile?", "Lohnt adaptives Lernen?"))}</h3>
<p><strong>${esc(verdict(r1.adaptive))}</strong></p>${para(r1.adaptiveWhy)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { r1, r2 } = p.d2;
  const quoted = r1.adaptive
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("My decision on adaptive learning there:", "Meine Entscheidung zu adaptivem Lernen dort:"))} ${esc(verdict(r1.adaptive))}.</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 2, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of LearnPro", "Die Geschäftsführung von LearnPro"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief Product Officer", "Chief Product Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("Future strategy for the learning platform", "Zukunftsstrategie für die Lernplattform"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Do we invest in adaptive learning?", "1 · Investieren wir in adaptives Lernen?"))}</h2>
<p><strong>${esc(verdict(r2.adaptive))}</strong></p>${para(r2.adaptiveWhy)}
<h2>${esc(tt("2 · Prototyping strategy: how we test new features", "2 · Prototyping-Strategie: wie wir neue Funktionen testen"))}</h2>${para(r2.prototyping)}
<h2>${esc(tt("3 · UX testing strategy: the data we need", "3 · UX-Teststrategie: die Daten, die wir brauchen"))}</h2>${para(r2.testing)}
<h2>${esc(tt("4 · Prioritised innovation roadmap", "4 · Priorisierte Innovations-Roadmap"))}</h2>${para(r2.roadmap)}
<h2>${esc(tt("5 · Risk analysis: technology against user value", "5 · Risikoanalyse: Technologie gegen Nutzerwert"))}</h2>${para(r2.riskText)}
<h2>${esc(tt("6 · One decision under uncertainty", "6 · Eine Entscheidung unter Unsicherheit"))}</h2>${para(r2.uncertain)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
