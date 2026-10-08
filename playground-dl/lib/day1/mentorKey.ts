import { CAUSE_MODEL, CLAIM_TRUTH, MODEL_IMPACT, MODEL_MEASURES, MODEL_RISK, MEASURE_BY_ID, TRUTH_SORT, effortBand } from "@/data/day1/case";
import { MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_OWNER, MODEL_RISK_PICK } from "@/data/day1/route2";
import { tt } from "@/lib/lang";
import type { D1R1, D1R2, Score } from "@/store/useStore";

/**
 * The model answers of Day 1 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every
 * missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that
 * language. Mentor tools stay English (#32); only the answers they enter are bilingual. The measures follow the plan's Musterlösung
 * (learning paths, modular content, a progress indicator, less cognitive load); a different, well-reasoned choice also exports (#38).
 */
export const MENTOR_PASSCODE = "muchson123";

export function KEY_D1_R1(): Partial<D1R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  const effort: Record<string, Score> = Object.fromEntries(MODEL_MEASURES.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    worst: "f1",
    worstWhy: tt(
      "On my first visit I see 14 identical tiles and nothing that says what to do first. I would not know where to begin, and I would leave before I had even started a lesson.",
      "Bei meinem ersten Besuch sehe ich 14 gleiche Kacheln und nichts, das sagt, was ich zuerst tun soll. Ich wüsste nicht, wo ich anfangen soll, und würde gehen, bevor ich überhaupt eine Lektion begonnen habe.",
    ),
    claims: { ...CLAIM_TRUTH },
    need: tt(
      "I would interview some of the 40 who left and look at the lesson where most of them stop, because the number only says that they left, not why.",
      "Ich würde einige der 40 befragen, die gegangen sind, und mir die Lektion ansehen, bei der die meisten aufhören, denn die Zahl sagt nur, dass sie gegangen sind, nicht warum.",
    ),
    reflect: {
      a: tt("Showing learners where they are and what comes next improves learning more than any new feature, because without it they never reach the content.", "Den Lernenden zu zeigen, wo sie sind und was als Nächstes kommt, verbessert das Lernen mehr als jede neue Funktion, denn ohne das erreichen sie den Inhalt gar nicht."),
      b: tt("Critical: a clear path and visible progress. Nice to have: a new look or extra courses.", "Kritisch: ein klarer Pfad und sichtbarer Fortschritt. Nice to have: ein neues Aussehen oder zusätzliche Kurse."),
      c: tt("Completion: a clear path lets learners finish, and finishing is what the platform earns from.", "Completion: Ein klarer Pfad lässt Lernende abschließen, und das Abschließen ist es, wovon die Plattform lebt."),
    },
    causes: [...CAUSE_MODEL],
    causeWhy: tt(
      "The case itself says there is no clear learning path, and findings 1 to 3 show that learners cannot tell where to start or what comes next.",
      "Der Fall selbst sagt, dass es keinen klaren Lernpfad gibt, und die Befunde 1 bis 3 zeigen, dass die Lernenden nicht erkennen, wo sie anfangen und was als Nächstes kommt.",
    ),
    chosen: [...MODEL_MEASURES],
    impact,
    effort,
    risk,
    reasons: {
      m1: tt("It answers the main finding: learners cannot tell where to start or what comes next. High impact for every learner; Mid risk because the paths must be designed with care.", "Sie beantwortet den Hauptbefund: Lernende erkennen nicht, wo sie anfangen oder was als Nächstes kommt. Hohe Wirkung für jede Lernende; mittleres Risiko, weil die Pfade sorgfältig gestaltet werden müssen."),
      m2: tt("Short units make the 500-word lessons easier to follow, but they need rewriting, so the result comes later.", "Kurze Einheiten machen die Lektionen mit 500 Wörtern leichter verfolgbar, sie müssen aber neu geschrieben werden, das Ergebnis kommt also später."),
      m3: tt("A cheap, fast fix for the missing progress bar; a safe change that shows learners they are getting somewhere.", "Eine billige, schnelle Lösung für die fehlende Fortschrittsleiste; eine sichere Änderung, die zeigt, dass Lernende vorankommen."),
      m4: tt("Headings and explained terms are cheap and low risk, and they cut the effort of reading each lesson.", "Überschriften und erklärte Begriffe sind billig und risikoarm, und sie senken die Mühe beim Lesen jeder Lektion."),
    },
    effortFlags: [],
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "Learning paths come first because every learner meets the orientation problem before anything else, and the other three measures work better once a path exists.",
      "Lernpfade kommen zuerst, weil jede Lernende zuerst auf das Orientierungsproblem trifft, und die anderen drei Maßnahmen wirken besser, sobald ein Pfad existiert.",
    ),
    missingInfo: tt(
      "I do not know why the 40 learners leave: the findings show what is hard, not what makes a learner decide to stop. I would interview ten who left before spending all of the €50,000.",
      "Ich weiß nicht, warum die 40 Lernenden gehen: Die Befunde zeigen, was schwer ist, nicht, was Lernende zum Aufhören bringt. Ich würde zehn Ausgestiegene befragen, bevor ich die ganzen 50.000 € ausgebe.",
    ),
  };
}

export function KEY_D1_R2(): Partial<D1R2> {
  return {
    vision: tt(
      "Learning at SkillUp should feel guided and visible: every learner always knows where they are, what comes next and how far they have come.",
      "Lernen bei SkillUp soll sich geführt und sichtbar anfühlen: Jede Lernende weiß immer, wo sie ist, was als Nächstes kommt und wie weit sie gekommen ist.",
    ),
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    orderWhy: tt(
      "Paths come first because every learner meets orientation before anything else. Progress is cheap and builds on the path. Research runs alongside so later decisions rest on what learners actually do.",
      "Pfade kommen zuerst, weil jede Lernende zuerst auf Orientierung trifft. Fortschritt ist günstig und baut auf dem Pfad auf. Die Forschung läuft parallel, damit spätere Entscheidungen darauf beruhen, was Lernende tatsächlich tun.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I fund the research programme next to the fixes, so that we find out why learners leave and can correct course after the first quarter.",
      "Ich finanziere das Forschungsprogramm neben den Verbesserungen, damit wir herausfinden, warum Lernende gehen, und nach dem ersten Quartal nachsteuern können.",
    ),
    uncertain: tt(
      "I decide to build learning paths for the three most-taken courses now. I do not know whether learners leave from lack of direction or from lack of time. I will refocus if, after the first quarter, the drop-out in those courses has not fallen from 40% to below 35%.",
      "Ich entscheide, jetzt Lernpfade für die drei meistgenutzten Kurse zu bauen. Ich weiß nicht, ob Lernende aus fehlender Orientierung oder aus Zeitmangel gehen. Ich richte neu aus, wenn die Abbruchquote in diesen Kursen nach dem ersten Quartal nicht von 40 % auf unter 35 % gesunken ist.",
    ),
    owner: MODEL_OWNER,
    evidence: [...MODEL_EVIDENCE],
    giveUp: tt(
      "I give up the badge system and the AI recommendations for this year, and I postpone rewriting the ten longest lessons; learners will keep the long lessons for now.",
      "Ich verzichte dieses Jahr auf das Badge-System und die KI-Empfehlungen und verschiebe das Neuschreiben der zehn längsten Lektionen; die langen Lektionen bleiben vorerst.",
    ),
  };
}
