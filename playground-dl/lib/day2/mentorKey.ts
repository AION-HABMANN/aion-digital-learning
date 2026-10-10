import { MODEL_ADAPTIVE, MODEL_APPROACH, MODEL_OPT, MODEL_OPT_BENEFIT, MODEL_OPT_RISK, MODEL_PLATFORM, MODEL_RISK_TICKS, MODEL_TESTS, OPT_BY_ID, OPT_IDS, TRUTH_SORT, WEAK_MODEL, effortBand } from "@/data/day2/case";
import { MODEL_DATA, MODEL_EVIDENCE, MODEL_INVS, MODEL_OWNER, MODEL_RISK_PICK } from "@/data/day2/route2";
import { tt } from "@/lib/lang";
import type { D2R1, D2R2 } from "@/store/dayTypes";
import type { Score } from "@/store/useStore";

/**
 * The model answers of Day 2 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every
 * missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that
 * language. Mentor tools stay English (#32); only the answers they enter are bilingual. The choices follow the plan's Musterlösung (main
 * problem: lack of feedback and individualisation; low-fidelity tests first, learning paths and interaction, adaptive elements step by step;
 * rationale: minimise risk before maximising technology). A different, well-reasoned choice also exports (#38).
 */
export function KEY_D2_R1(): Partial<D2R1> {
  const optEffort: Record<string, Score> = Object.fromEntries(OPT_IDS.map((id) => [id, effortBand(OPT_BY_ID[id].cost)])) as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    prefer: MODEL_PLATFORM,
    preferWhy: tt(
      "On Platform A I always see the next step and how far I have come, so I can fit a unit into ten minutes and know when I am done. On Platform B I would scroll for forty minutes with no sign of progress, and I would stop.",
      "Auf Plattform A sehe ich immer den nächsten Schritt und wie weit ich gekommen bin, kann also eine Einheit in zehn Minuten unterbringen und weiß, wann ich fertig bin. Auf Plattform B würde ich vierzig Minuten scrollen, ohne ein Zeichen für den Fortschritt, und aufhören.",
    ),
    principles: [
      tt("Show the learner the next step, because a learner who has to search for it may stop before they find it.", "Zeigen Sie den Lernenden den nächsten Schritt, weil eine Lernende, die ihn suchen muss, aufhören kann, bevor sie ihn findet."),
      tt("Cut the content into units of a few minutes with one goal each, because a learner with ten free minutes can only start what they can finish.", "Schneiden Sie den Inhalt in Einheiten von wenigen Minuten mit je einem Ziel, weil eine Lernende mit zehn freien Minuten nur beginnt, was sie beenden kann."),
      tt("Show progress and give a result after every task, because without a sign of success the effort feels wasted.", "Zeigen Sie Fortschritt und geben Sie nach jeder Aufgabe ein Ergebnis, weil die Mühe ohne ein Zeichen von Erfolg vergeudet wirkt."),
    ],
    optBenefit: { ...MODEL_OPT_BENEFIT } as Record<string, Score>,
    optEffort,
    optRisk: { ...MODEL_OPT_RISK } as Record<string, Score>,
    optEffortFlags: [],
    optChoice: MODEL_OPT,
    optWhy: tt(
      "Option B costs €6,500 and takes two weeks, and afterwards we know what works. A is polished but built on an untested idea, and C finds problems only when learners leave.",
      "Option B kostet 6.500 € und dauert zwei Wochen, danach wissen wir, was funktioniert. A ist ausgearbeitet, aber auf eine ungetestete Idee gebaut, und C findet Probleme erst, wenn Lernende gehen.",
    ),
    optRisks: [...MODEL_RISK_TICKS],
    optRiskOther: tt("The one that worries me most is that we find out late: a change after the build costs far more than a change on paper.", "Am meisten sorgt mich, dass wir es spät erfahren: Eine Änderung nach dem Bau kostet weit mehr als eine Änderung auf Papier."),
    reflect: {
      a: tt("We build the wrong thing and find out when learners leave, when change is expensive.", "Wir bauen das Falsche und erfahren es, wenn Lernende gehen, also wenn Änderungen teuer sind."),
      b: tt("The decision to build before testing: everything after it is rework.", "Die Entscheidung, vor dem Testen zu bauen: Alles danach ist Nacharbeit."),
      c: tt("Technology makes sense when a learner problem needs it and simpler measures fall short; otherwise it is over-engineering.", "Technologie ist sinnvoll, wenn ein Problem der Lernenden sie braucht und einfachere Maßnahmen nicht reichen; sonst ist es Over-Engineering."),
    },
    weak: [...WEAK_MODEL],
    weakWhy: tt(
      "Facts 7 and 8 show the feedback weakness: no sign of progress and no message after the last page. The case itself says there is no personalisation and that the content is rated boring.",
      "Die Fakten 7 und 8 zeigen die Schwäche beim Feedback: kein Zeichen für den Fortschritt und keine Meldung nach der letzten Seite. Der Fall selbst sagt, es gebe keine Personalisierung und der Inhalt werde als langweilig bewertet.",
    ),
    approach: MODEL_APPROACH,
    approachWhy: tt(
      "It answers the first question, whether learners can complete a whole course flow, with a clickable low-fidelity version, so a mistake in structure is cheap to fix. It leaves the final look and the speed of the real platform for later.",
      "Er beantwortet die erste Frage, ob Lernende einen ganzen Kursablauf abschließen können, mit einer klickbaren Low-Fidelity-Version, ein Fehler in der Struktur ist also günstig zu beheben. Das endgültige Aussehen und die Geschwindigkeit der echten Plattform lässt er für später.",
    ),
    tests: [...MODEL_TESTS],
    testQ: {
      t2: tt("Do learners complete the whole flow of the clickable prototype, and where do they hesitate?", "Schließen Lernende den ganzen Ablauf des klickbaren Prototyps ab, und wo zögern sie?"),
      t5: tt("At which lesson do learners leave today? It shows where, so we know where to look.", "Bei welcher Lektion gehen Lernende heute? Es zeigt, wo, wir wissen also, wo wir hinschauen müssen."),
      t6: tt("Why did learners who left stop? It is the only test here that can show the reason.", "Warum haben Lernende, die gegangen sind, aufgehört? Es ist der einzige Test hier, der den Grund zeigen kann."),
    },
    adaptive: MODEL_ADAPTIVE,
    adaptiveWhy: tt(
      "Partly: first fix path and feedback with low-fidelity tests, then try one rule-based step, a pre-test that lets learners skip what they know, in one course. The algorithmic part waits for data and the legal check.",
      "Teilweise: zuerst Pfad und Feedback mit Low-Fidelity-Tests verbessern, dann einen regelbasierten Schritt versuchen, einen Vortest, mit dem Lernende überspringen, was sie schon wissen, in einem Kurs. Der algorithmische Teil wartet auf Daten und die rechtliche Prüfung.",
    ),
    missingInfo: tt(
      "I do not know why learners leave: the drop-out data would show where, not why. I would interview eight learners who left before choosing what to build.",
      "Ich weiß nicht, warum Lernende gehen: Die Abbruchdaten würden zeigen, wo, nicht warum. Ich würde acht Lernende, die gegangen sind, befragen, bevor ich entscheide, was gebaut wird.",
    ),
  };
}

export function KEY_D2_R2(): Partial<D2R2> {
  return {
    adaptive: MODEL_ADAPTIVE,
    adaptiveWhy: tt(
      "Partly: I fund one small, tested step now, a guided path with feedback and a rule-based pilot in one course, and the recommendation engine waits until the pilot shows a result and our data and legal checks are in place.",
      "Teilweise: Ich finanziere jetzt einen kleinen, getesteten Schritt, einen geführten Pfad mit Feedback und einen regelbasierten Pilot in einem Kurs, und die Empfehlungs-Engine wartet, bis der Pilot ein Ergebnis zeigt und unsere Daten und rechtlichen Prüfungen stehen.",
    ),
    prototyping: tt(
      "We start with low-fidelity: paper and clickable prototypes with five learners per round. The first question is whether learners can find the next step and finish a unit, before anything is built.",
      "Wir beginnen mit Low-Fidelity: Papier- und klickbare Prototypen mit fünf Lernenden pro Runde. Die erste Frage ist, ob Lernende den nächsten Schritt finden und eine Einheit abschließen können, bevor etwas gebaut wird.",
    ),
    data: [...MODEL_DATA],
    picks: [...MODEL_INVS],
    order: [...MODEL_INVS],
    orderWhy: tt(
      "The guided path and feedback redesign goes first: it reaches every learner, costs little and is tested with prototypes before it is built. The dashboard follows, because the pilot needs data to be read, and the pilot comes last since it depends on both.",
      "Die Neugestaltung von geführtem Pfad und Feedback kommt zuerst: Sie erreicht jede Lernende, kostet wenig und wird mit Prototypen getestet, bevor sie gebaut wird. Das Dashboard folgt, weil der Pilot Daten braucht, um gelesen zu werden, und der Pilot kommt zuletzt, da er von beiden abhängt.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I put the dashboard and the consent basis before the pilot, so that nothing is built that the data cannot support. I would notice the risk if the pilot cannot be measured in the first month.",
      "Ich setze Dashboard und Einwilligungsgrundlage vor den Pilot, damit nichts gebaut wird, was die Daten nicht tragen können. Ich würde das Risiko bemerken, wenn der Pilot im ersten Monat nicht messbar ist.",
    ),
    uncertain: tt(
      "I decide to run a rule-based personalisation pilot in one course. I do not know whether learners want recommended steps or whether our data is good enough. I will reverse it if pilot completion is not at least five points above the control group after eight weeks.",
      "Ich entscheide, einen regelbasierten Personalisierungs-Pilot in einem Kurs zu fahren. Ich weiß nicht, ob Lernende empfohlene Schritte wollen oder ob unsere Daten gut genug sind. Ich nehme ihn zurück, wenn die Completion im Pilot nach acht Wochen nicht mindestens fünf Punkte über der Kontrollgruppe liegt.",
    ),
    owner: MODEL_OWNER,
    evidence: [...MODEL_EVIDENCE],
    giveUp: tt(
      "I give up the AI recommendation engine this year, and I postpone the new visual design; learners keep the current look for now.",
      "Ich verzichte dieses Jahr auf die KI-Empfehlungs-Engine und verschiebe das neue visuelle Design; die Lernenden behalten vorerst das jetzige Aussehen.",
    ),
  };
}
