import { MEASURE_BY_ID, NOTE_BY_ID, NOTE_IDS, PHASES_1, PHASES_L, PHASES_T, PHASE_LABEL_1, PHASE_LABEL_L, PHASE_LABEL_T, PICK_MEASURES } from "@/data/day6/case";
import { DECISION_BY_ID, PHASES_R, PHASE_LABEL_R, R2_PICK, SEGMENT_BY_ID, SEG_MAX, SEG_MIN } from "@/data/day6/route2";
import { MIN_FRAME, MIN_LINE, coreOnly, len, measuresMissing } from "@/lib/dayStd/common";
import { MIN_REASON } from "@/lib/dayStd/common";
import { MIN_CELL, MIN_ROW, cellOk } from "@/lib/day6/progress";
import type { JField } from "@/lib/day6/progress";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  note: (id: string) => `note-${id}`,
  persona: (k: string) => `persona-${k}`,
  frustrations: "frustrations-field",
  jCell: (k: string) => `jcell-${k}`,
  jProblems: "jproblems-field",
  jCritical: "jcritical-field",
  jCriticalWhy: "jcriticalwhy-field",
  teacher: (k: string) => `teacher-${k}`,
  jl: (k: string) => `jl-${k}`,
  jt: (k: string) => `jt-${k}`,
  shared: "shared-field",
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  reason: (id: string) => `reason-${id}`,
  pain: (id: string) => `pain-${id}`,
  order: "order-field",
  orderWhy: "orderwhy-field",
  missingInfo: "missinginfo-field",
  segPick: "seg-pick",
  segPersona: (id: string) => `segpersona-${id}`,
  target: "target-field",
  targetWhy: "targetwhy-field",
  problems: "problems-field",
  jSeg: "jseg-field",
  jr: (k: string) => `jr-${k}`,
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
  decide: "decide-field",
  dontKnow: "dontknow-field",
  reverse: "reverse-field",
  giveUp: "giveup-field",
} as const;

const PERSONA5: [string, string, string, number][] = [
  ["nameRole", "name, age and role", "Name, Alter und Rolle", MIN_ROW],
  ["goals", "goals", "Ziele", MIN_REASON],
  ["problems", "problems and frustrations", "Probleme und Frustrationen", MIN_REASON],
  ["situation", "usage situation", "Nutzungssituation", MIN_REASON],
  ["expectations", "expectations of a learning platform", "Erwartungen an eine Lernplattform", MIN_REASON],
];

/** Every label starts "Block X.Y:", in both languages. Optional blocks (CLAUDE.md #35) are never required: `coreOnly` drops their entries in one place. */
export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d6;
  const e = (id: string, label: string) => out.push({ id, label });
  const cell = (block: string, id: string, phase: string, c: Persisted["d6"]["r1"]["j"]["entry"] | undefined, fields: JField[]) => {
    if (!cellOk(c, fields)) e(id, tt(`Block ${block}: fill in the journey for “${phase}”: ${fields.map((f) => (f === "does" ? "what the person does" : f === "thinks" ? "what they think" : f === "pain" ? "the pain point" : "where the strategy acts")).join(", ")}, and rate the emotion (a few words each, at least ${MIN_CELL} characters).`, `Block ${block}: Füllen Sie die Journey für „${phase}“ aus: ${fields.map((f) => (f === "does" ? "was die Person tut" : f === "thinks" ? "was sie denkt" : f === "pain" ? "der Pain Point" : "wo die Strategie ansetzt")).join(", ")}, und bewerten Sie die Emotion (je ein paar Worte, mindestens ${MIN_CELL} Zeichen).`));
  };

  // Block 1.1 (Core)
  for (const id of NOTE_IDS)
    if (r1.sort[id] === null) e(IDS.note(id), tt(`Block 1.1: note ${NOTE_BY_ID[id].no} is not sorted into a persona field.`, `Block 1.1: Notiz ${NOTE_BY_ID[id].no} ist keinem Persona-Feld zugeordnet.`));
  for (const [k, en, de, min] of PERSONA5) {
    const v = (r1.persona as Record<string, string>)[k];
    if (len(v) < min) e(IDS.persona(k), tt(`Block 1.1: write the persona's ${en}, with the note numbers it rests on (at least ${min} characters).`, `Block 1.1: Schreiben Sie ${de} der Persona, mit den Notiznummern, auf denen sie beruht (mindestens ${min} Zeichen).`));
  }
  if (len(r1.frustrations) < MIN_LINE) e(IDS.frustrations, tt(`Block 1.1: name the situation in which this person could be frustrated on a platform like EduPath, and one decision a team could take because of the persona (at least ${MIN_LINE} characters).`, `Block 1.1: Nennen Sie die Situation, in der diese Person auf einer Plattform wie EduPath frustriert sein könnte, und eine Entscheidung, die ein Team wegen der Persona treffen könnte (mindestens ${MIN_LINE} Zeichen).`));

  // Block 1.2 (Optional): entries exist so that its own notice can show them; they are dropped by coreOnly.
  for (const k of PHASES_1) cell("1.2", IDS.jCell(k), PHASE_LABEL_1[k], r1.j[k], ["does", "thinks", "pain"]);
  if (len(r1.jProblems) < MIN_FRAME) e(IDS.jProblems, tt(`Block 1.2: name four possible problems that could lead to the drop-out, one short line each (at least ${MIN_FRAME} characters in all).`, `Block 1.2: Nennen Sie vier mögliche Probleme, die zum Abbruch führen könnten, je eine kurze Zeile (mindestens ${MIN_FRAME} Zeichen insgesamt).`));
  if (!r1.jCritical) e(IDS.jCritical, tt("Block 1.2: choose the critical phase.", "Block 1.2: Wählen Sie die kritische Phase."));
  if (len(r1.jCriticalWhy) < MIN_LINE) e(IDS.jCriticalWhy, tt(`Block 1.2: say why that phase is critical: what happens to the emotion and what the person does next (at least ${MIN_LINE} characters).`, `Block 1.2: Sagen Sie, warum diese Phase kritisch ist: was mit der Emotion passiert und was die Person als Nächstes tut (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.1 (Optional)
  for (const [k, en, de] of [["nameRole", "name and role", "Name und Rolle"], ["goals", "goals", "Ziele"], ["problems", "problems and frustrations", "Probleme und Frustrationen"], ["situation", "usage situation", "Nutzungssituation"]] as const) {
    const min = k === "nameRole" ? MIN_ROW : MIN_REASON;
    if (len(r1.teacher[k]) < min) e(IDS.teacher(k), tt(`Block 2.1: write the teacher persona's ${en}, with the note numbers (at least ${min} characters).`, `Block 2.1: Schreiben Sie ${de} der Lehrenden-Persona, mit den Notiznummern (mindestens ${min} Zeichen).`));
  }
  for (const k of PHASES_L) cell("2.1", IDS.jl(k), `${PHASE_LABEL_L[k]} (${tt("learner", "Lernende")})`, r1.jl[k], ["does", "pain"]);
  for (const k of PHASES_T) cell("2.1", IDS.jt(k), `${PHASE_LABEL_T[k]} (${tt("teacher", "Lehrende")})`, r1.jt[k], ["does", "pain"]);
  if (len(r1.shared) < MIN_LINE) e(IDS.shared, tt(`Block 2.1: name a pain point that appears for two groups and what it suggests about the cause (at least ${MIN_LINE} characters).`, `Block 2.1: Nennen Sie einen Pain Point, der bei zwei Gruppen auftritt, und was er über die Ursache nahelegt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.2 (Core)
  measuresMissing(
    r1,
    {
      pick: PICK_MEASURES,
      nameOf: (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].name,
      criteria: tt("user impact", "Nutzerwirkung"),
      ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, pain: IDS.pain, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
    },
    out,
  );
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d6;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (r2.segs.length < SEG_MIN || r2.segs.length > SEG_MAX) e(IDS.segPick, tt(`Block 3.1: choose two or three segments as your strategic personas (you have ${r2.segs.length}).`, `Block 3.1: Wählen Sie zwei oder drei Segmente als Ihre strategischen Personas (Sie haben ${r2.segs.length}).`));
  for (const id of r2.segs)
    if (len(r2.segPersona[id]) < MIN_LINE) e(IDS.segPersona(id), tt(`Block 3.1: write the persona for “${short(SEGMENT_BY_ID[id].name, 36)}”: goal, problem and situation, and the evidence (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie die Persona für „${short(SEGMENT_BY_ID[id].name, 36)}“: Ziel, Problem und Situation und die Belege (mindestens ${MIN_LINE} Zeichen).`));
  if (!r2.target) e(IDS.target, tt("Block 3.1: select the most important target group.", "Block 3.1: Wählen Sie die wichtigste Zielgruppe."));
  if (len(r2.targetWhy) < MIN_LINE) e(IDS.targetWhy, tt(`Block 3.1: say why this group goes first: which test decided (size, business value or where its journey breaks) and what the other groups get (at least ${MIN_LINE} characters).`, `Block 3.1: Sagen Sie, warum diese Gruppe zuerst kommt: welcher Test entschieden hat (Größe, Geschäftswert oder wo ihre Journey bricht) und was die anderen Gruppen bekommen (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r2.problems) < MIN_FRAME) e(IDS.problems, tt(`Block 3.1: name the three biggest problems of this group, one line each, with the situation and the phase (at least ${MIN_FRAME} characters in all).`, `Block 3.1: Nennen Sie die drei größten Probleme dieser Gruppe, je eine Zeile, mit Situation und Phase (mindestens ${MIN_FRAME} Zeichen insgesamt).`));

  // Block 3.2 (Core)
  if (!r2.jSeg) e(IDS.jSeg, tt("Block 3.2: name the persona (S1 to S5) whose journey you map.", "Block 3.2: Nennen Sie die Persona (S1 bis S5), deren Journey Sie abbilden."));
  for (const k of PHASES_R)
    if (!cellOk(r2.jr[k], ["does", "pain", "acts"])) e(IDS.jr(k), tt(`Block 3.2: fill in the journey for “${PHASE_LABEL_R[k]}”: what the person does, the pain point, where your strategy acts, and the emotion (at least ${MIN_CELL} characters each).`, `Block 3.2: Füllen Sie die Journey für „${PHASE_LABEL_R[k]}“ aus: was die Person tut, der Pain Point, wo Ihre Strategie ansetzt, und die Emotion (mindestens ${MIN_CELL} Zeichen je Feld).`));
  if (r2.picks.length !== R2_PICK) e(IDS.decisionPick, tt(`Block 3.2: choose exactly ${R2_PICK} decisions for your strategy (you have ${r2.picks.length}).`, `Block 3.2: Wählen Sie genau ${R2_PICK} Entscheidungen für Ihre Strategie (Sie haben ${r2.picks.length}).`));
  if (r2.picks.length === R2_PICK && len(r2.orderWhy) < MIN_LINE) {
    const first = DECISION_BY_ID[(r2.order[0] ?? r2.picks[0]) as keyof typeof DECISION_BY_ID];
    e(IDS.decisionOrderWhy, tt(`Block 3.2: say why “${short(first.name, 36)}” goes first (at least ${MIN_LINE} characters).`, `Block 3.2: Begründen Sie, warum „${short(first.name, 36)}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));
  }
  if (len(r2.decide) < MIN_ROW) e(IDS.decide, tt(`Block 3.2: write “I decide …”: which persona is prioritised (at least ${MIN_ROW} characters).`, `Block 3.2: Schreiben Sie „Ich entscheide …“: welche Persona priorisiert wird (mindestens ${MIN_ROW} Zeichen).`));
  if (len(r2.dontKnow) < MIN_ROW) e(IDS.dontKnow, tt(`Block 3.2: write “I do not know …” (at least ${MIN_ROW} characters).`, `Block 3.2: Schreiben Sie „Ich weiß nicht …“ (mindestens ${MIN_ROW} Zeichen).`));
  if (len(r2.reverse) < MIN_LINE) e(IDS.reverse, tt(`Block 3.2: write “I reverse if … (a figure) … by … (a time)” (at least ${MIN_LINE} characters).`, `Block 3.2: Schreiben Sie „Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)“ (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r2.giveUp) < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone, and when that segment gets its turn (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben und wann dieses Segment an die Reihe kommt (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
