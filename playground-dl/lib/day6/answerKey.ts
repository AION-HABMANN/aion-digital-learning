import { BUDGET, MEASURES, MODEL_IMPACT, MODEL_MEASURES, MODEL_RISK, NOTES, NOTE_AREA, PERSONA_FIELDS, PERSONA_FIELD_IDS, WEEKS_LIMIT, effortBand, totalCost } from "@/data/day6/case";
import { DECISIONS, MODEL_DECISIONS, MODEL_SEGMENTS, MODEL_TARGET, R2_BUDGET, SEGMENTS } from "@/data/day6/route2";
import { MENTOR_NOTE } from "@/lib/day6/mentorKey";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options (CLAUDE.md #7): the expected pick and a reason per option,
 * including why each rejected option is rejected, with a teaching note where more than one answer defends. Never exported and never shown to a learner.
 * Mentor tools stay English (#32); the option labels they quote follow the site's language.
 */
const LEVEL = ["", "Low", "Mid", "High"];

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Eight research notes into three persona fields",
    expected: PERSONA_FIELD_IDS.map((a) => `${PERSONA_FIELDS[a].label}: ${NOTES.filter((n) => NOTE_AREA[n.id] === a).map((n) => `note ${n.no}`).join(", ")}`).join("  |  "),
    options: NOTES.map((n) => ({ label: `Note ${n.no} · ${n.short}`, expected: true, why: `${PERSONA_FIELDS[NOTE_AREA[n.id]].label}. ${n.why}` })),
    teachingNote:
      "The sort is objective: a note goes where its sentence points. Two edges: note 7 (the reminder arrives at 08:00) names a time, but the time is the trouble, so it is a Problem and not Context of use; note 8 (the employer pays, the manager wants progress) could be read as a goal, but it says why she is on the platform and who is watching, so it is Context of use (motivation). The persona and the frustrations are judged: any persona defends if it names a goal as a reason in a life, problems as situations, a context with time and device, and cites the note numbers. Plan: Arbeitsauftrag 1, describe a persona (goals, problems, usage situation), the expectations and possible frustrations.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 2.2 · Choose four measures, rate them, name the pain point, order them",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(totalCost(MODEL_MEASURES))} of ${euro(BUDGET)}, longest 6 weeks of ${WEEKS_LIMIT}.`,
    options: MEASURES.map((m) => {
      const model = MODEL_MEASURES.includes(m.id);
      const why = model
        ? `Reference measure (${m.area}). Effort ${band(m.cost)} by the printed cost ${euro(m.cost)}. Reference ratings: user impact ${LEVEL[MODEL_IMPACT[m.id]]}, risk ${LEVEL[MODEL_RISK[m.id]]}.`
        : m.id === "m3"
          ? "Defendable: it answers T2 for the teachers. A learner who takes it instead of the stuck-learners view stays on the teacher side and should say which teacher pain point it answers."
          : m.id === "m5"
            ? "Defendable and cheap (€9,000): it answers T6. Strong if the learner says how many teachers it reaches."
            : m.id === "m7"
              ? "Defendable: €7,000 for the training managers, who decide renewals (T5). It is the cheapest way to reach the third group; as one of four it leaves a learner measure out."
              : m.id === "m8"
                ? "Rejected: €18,000 for badges that answer no pain point in the notes; it is the typical decoration (Materi A5)."
                : "Rejected: €25,000 for a new look that touches no pain point of any persona; impact on every persona is Low.";
      return { label: `${m.no} · ${m.name}`, expected: model, why };
    }),
    teachingNote: `${MENTOR_NOTE} Effort is rule-based (under €8,000 Low, up to €15,000 Mid, above High), so the check can flag it; user impact and risk are judgements and are never marked. The pain point each measure answers must name a persona and a phase. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38): within the budget, over it, another set of four, a different order, all with a stated reason.`,
  };
}

export function segmentKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Strategic personas and the target group",
    expected: `Personas: ${MODEL_SEGMENTS.map((id) => SEGMENTS.find((s) => s.id === id)?.name).join("; ")}. Target group: ${SEGMENTS.find((s) => s.id === MODEL_TARGET)?.name}.`,
    options: SEGMENTS.map((s) => ({
      label: `${s.no} · ${s.name}`,
      expected: MODEL_SEGMENTS.includes(s.id),
      why:
        s.id === "s1"
          ? "Reference persona and target group: the largest segment (45%), its return rate is falling, and its usage is what S4 measures, so one fix serves two segments (Materi B1)."
          : s.id === "s3"
            ? "Reference persona: 120 teachers supply all content, and 4 of 6 say the editor is too complicated; small but critical (Materi B1)."
            : s.id === "s4"
              ? "Reference persona: 60 accounts decide renewals; small and business-critical (Materi B1). A defendable target group: it decides the money."
              : s.id === "s2"
                ? "Defendable as a persona (15%, high satisfaction), but nothing in the notes says its journey breaks; a weak candidate for first."
                : "Rejected as a strategic persona: rarely finish, no payment link; no decision changes because of this group (Materi A2).",
    })),
    teachingNote: "S4 is a good alternative target group: the training managers decide renewals, and an answer that picks S4 and says which test decided (business value) and what the learners get instead defends. A target group that is not among the chosen personas is a gap worth a question. Any of the five defends as target group if the reason names the test (size, value, where the journey breaks) and what the others get.",
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Three decisions for the strategy",
    expected: MODEL_DECISIONS.map((id) => DECISIONS.find((d) => d.id === id)?.name).join("; "),
    options: DECISIONS.map((d) => {
      const model = MODEL_DECISIONS.includes(d.id);
      return {
        label: `${d.no} · ${d.name} (${euro(d.cost)}, ${d.weeks} weeks)`,
        expected: model,
        why: model
          ? d.id === "d1"
            ? "Reference pick: it fixes the critical phase of the largest segment (Materi B1)."
            : d.id === "d4"
              ? "Reference pick: it serves the small but critical training managers cheaply (Materi B1, B2)."
              : "Reference pick: the data is thin (12 and 6 interviews), so the research programme tests the personas as hypotheses (Materi B3)."
          : d.id === "d2"
            ? "Defendable: it serves the teachers who supply all content, but at €60,000 and 22 weeks it is a large project for the second segment."
            : d.id === "d3"
              ? "Defendable and cheap for what it covers, but it changes the first steps only; the learners' critical phase is in the learning phase."
              : d.id === "d5"
                ? "Defendable for exam preparers, but nothing in the evidence says they are the problem (high satisfaction)."
                : "Rejected: €40,000 for a look that serves none of the pain points.",
      };
    }),
    teachingNote: "A different set of three defends if the reason is written and it follows from the target group. The budget is a live hint, not a lock (CLAUDE.md #38); a set over the €220,000 limit exports with the amount printed as a fact.",
  };
}

void R2_BUDGET;
