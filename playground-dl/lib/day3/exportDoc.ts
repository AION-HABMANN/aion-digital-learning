import { OPTS, WEEKS_LIMIT } from "@/data/day3/case";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { ASSESS_KEYS, listLines } from "@/lib/day3/progress";
import { tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of Day 3 (CLAUDE.md #57), built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and
 * the memo panel render these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or
 * scores: every answer is the learner's own, printed as written, in the layout (text or table) the learner chose.
 */
const empty = `<p class="muted">—</p>`;

/** A list of items, one per line in the text layout. */
const list = (text: string) => {
  const items = listLines(text);
  return items.length ? `<ol>${items.map((x) => `<li>${cell(x)}</li>`).join("")}</ol>` : empty;
};

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function analysisBody(p: Persisted): string {
  const { r1 } = p.d3;
  const filled = r1.problemRows.filter((r) => r.problem.trim() || r.side.trim());
  const problems =
    r1.problemMode === "table"
      ? filled.length
        ? `<table><thead><tr><th>#</th><th>${esc(tt("The problem", "Das Problem"))}</th><th>${esc(tt("How it is for the learner", "Wie es für die Lernende ist"))}</th></tr></thead><tbody>${filled.map((r, i) => `<tr><td class="id">${i + 1}</td><td>${cell(r.problem)}</td><td>${cell(r.side)}</td></tr>`).join("")}</tbody></table>`
        : empty
      : list(r1.problems);

  const optNames = OPTS.map((o) => ({ id: o.id, name: `${esc(tt("Option", "Option"))} ${o.id} · ${esc(o.name)}` }));
  const assess =
    r1.assessMode === "table"
      ? `<table><thead><tr><th>${esc(tt("Option", "Option"))}</th><th>${esc(tt("Learning impact", "Lernwirkung"))}</th><th>${esc(tt("Effort", "Aufwand"))}</th><th>${esc(tt("Risk", "Risiko"))}</th></tr></thead><tbody>${optNames.map((o) => `<tr><td>${o.name}</td>${ASSESS_KEYS.map((k) => `<td>${cell(r1.assessRows[o.id]?.[k] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      : optNames.map((o) => `<p><strong>${o.name}</strong></p>${para(r1.assessText[o.id] ?? "")}`).join("");
  const decision = r1.optChoice ? `${r1.optChoice} · ${OPTS.find((o) => o.id === r1.optChoice)?.name ?? ""}` : "—";

  const crows = r1.causeRows.filter((r) => r.cause.trim() || r.improvement.trim());
  const causes =
    r1.causeMode === "table"
      ? crows.length
        ? `<table><thead><tr><th>#</th><th>${esc(tt("Cause of the overload", "Ursache der Überlastung"))}</th><th>${esc(tt("UX improvement", "UX-Verbesserung"))}</th></tr></thead><tbody>${crows.map((r, i) => `<tr><td class="id">${i + 1}</td><td>${cell(r.cause)}</td><td>${cell(r.improvement)}</td></tr>`).join("")}</tbody></table>`
        : empty
      : `<h3>${esc(tt("Four causes of cognitive overload", "Vier Ursachen kognitiver Überlastung"))}</h3>${list(r1.causesText)}<h3>${esc(tt("Four UX improvements", "Vier UX-Verbesserungen"))}</h3>${list(r1.improvementsText)}`;

  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: 3, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt("EduCore is a learning platform for professionals with an overwhelm effect: learners do not understand the content, many drop out and the platform is called “too complicated”. The goal is to reduce the overload without making the content useless.", "EduCore ist eine Lernplattform für Fachkräfte mit Überforderungseffekt: Lernende verstehen den Inhalt nicht, viele brechen ab, und die Plattform wird „zu kompliziert“ genannt. Das Ziel ist, die Überlastung zu senken, ohne den Inhalt nutzlos zu machen."))}</p>

<h2>${esc(tt("Part 1 · Level 1 · Knowledge", "Teil 1 · Level 1 · Wissen"))}</h2>
<h3>${esc(tt("1.1 · Recognising cognitive overload", "1.1 · Kognitive Überlastung erkennen"))}</h3>
<h3>${esc(tt("Five problems from the learner's perspective", "Fünf Probleme aus Sicht der Lernenden"))}</h3>
${problems}
<h3>${esc(tt("How the learning process feels", "Wie sich der Lernprozess anfühlt"))}</h3>${para(r1.feel)}
<h3>${esc(tt("What I would improve intuitively", "Was ich intuitiv verbessern würde"))}</h3>${para(r1.improve)}

<h3>${esc(tt("1.2 · Deciding on reducing cognitive load", "1.2 · Über die Senkung der kognitiven Belastung entscheiden"))}</h3>
<p class="muted">${esc(tt(`Conditions: ${WEEKS_LIMIT} weeks, complex (specialist) content, beginners.`, `Rahmenbedingungen: ${WEEKS_LIMIT} Wochen, komplexer (fachlicher) Inhalt, Einsteiger.`))}</p>
<h3>${esc(tt("Assessment of the three options", "Bewertung der drei Optionen"))}</h3>
${assess}
<h3>${esc(tt("Priority order", "Prioritätsreihenfolge"))}</h3>${para(r1.optOrder)}
<h3>${esc(tt("The option with the greatest effect", "Die Option mit der größten Wirkung"))}</h3><p><strong>${esc(decision)}</strong></p>${para(r1.optWhy)}

<h2>${esc(tt("Part 2 · Level 2 · Application", "Teil 2 · Level 2 · Anwendung"))}</h2>
<h3>${esc(tt("2.1 · The case study: EduCore", "2.1 · Die Fallstudie: EduCore"))}</h3>
${causes}
<h3>${esc(tt("Priority of the improvements", "Priorität der Verbesserungen"))}</h3>${para(r1.priority)}
<h3>${esc(tt("My justification", "Meine Begründung"))}</h3>${para(r1.justify)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { r1, r2 } = p.d3;
  const quotedFrom = r1.optChoice ? OPTS.find((o) => o.id === r1.optChoice)?.name : "";
  const quoted = r1.optChoice
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("The option I judged to have the greatest effect on learning there:", "Die Option, die ich dort für die mit der größten Wirkung aufs Lernen hielt:"))} ${esc(r1.optChoice)} · ${esc(quotedFrom ?? "")}.</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  return `${docHeader({ kicker: "Learning UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: 3, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(tt("The management of EduCore", "Die Geschäftsführung von EduCore"))}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(tt("Chief Learning Experience Officer", "Chief Learning Experience Officer"))}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(tt("A learning-psychology-based UX strategy", "Eine lernpsychologisch fundierte UX-Strategie"))}</dd>
</dl>
${quoted}
<h2>${esc(tt("1 · Strategy for reducing cognitive load", "1 · Strategie zur Senkung der kognitiven Belastung"))}</h2>${para(r2.strategy)}
<h2>${esc(tt("2 · Three prioritised UX measures", "2 · Drei priorisierte UX-Maßnahmen"))}</h2>${list(r2.measures)}
<h2>${esc(tt("3 · Definition of “learning-effective UX”", "3 · Definition von „lerneffektivem UX“"))}</h2>${para(r2.definition)}
<h2>${esc(tt("4 · Risk analysis: content that is too simple against content that is too complex", "4 · Risikoanalyse: zu einfacher gegen zu komplexen Inhalt"))}</h2>${para(r2.riskText)}
<h2>${esc(tt("5 · Decision logic for future content", "5 · Entscheidungslogik für künftige Inhalte"))}</h2>${para(r2.logic)}
<h2>${esc(tt("6 · One decision under uncertainty", "6 · Eine Entscheidung unter Unsicherheit"))}</h2>${para(r2.uncertain)}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
