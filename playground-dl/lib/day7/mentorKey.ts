import { BARRIER_MODEL, MEASURE_BY_ID, MODEL_GROUPS, MODEL_IMPACT, MODEL_MEASURES, MODEL_METHODS, MODEL_OPT_IMPACT, MODEL_OPT_ORDER, MODEL_OPT_RISK, MODEL_RISK, OPT_BY_ID, TRUTH_SORT, effortBand } from "@/data/day7/case";
import { MODEL_DECISIONS, MODEL_EVALS, MODEL_KPIS, MODEL_PLACES, MODEL_RISK_PICK } from "@/data/day7/route2";
import { tt } from "@/lib/lang";
import type { D7R1, D7R2 } from "@/store/dayTypesStd";
import type { Score } from "@/store/useStore";

/**
 * The model answers of Day 7 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every missing list is empty
 * and both documents export at once. The texts follow the site's language, because the fill enters them in that language. Mentor tools stay English (#32); only
 * the answers they enter are bilingual. The reference measures follow the plan's Musterlösung (clear structure and plain language, better operability, visual
 * optimisation, continuous testing) and cost €47,000 of the €50,000; a different, well-reasoned choice also exports (#38).
 */
export const MENTOR_NOTE = "The reference four measures are the plan's own (M1 clear structure and plain language, M2 better operability, M3 visual optimisation, M5 continuous testing) and cost €47,000 of the case's €50,000 (a Case assumption), longest 6 weeks of 10. The plan's rationale: accessibility = usage = success.";

export function KEY_D7_R1(): Partial<D7R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  const effort: Record<string, Score> = Object.fromEntries(MODEL_MEASURES.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>;
  const optEffort: Record<string, Score> = Object.fromEntries(Object.keys(MODEL_OPT_IMPACT).map((id) => [id, effortBand(OPT_BY_ID[id as keyof typeof OPT_BY_ID].cost)])) as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    groups: [...MODEL_GROUPS],
    groupsWhy: tt(
      "Low vision: fact 1 blocks this group, because the text is too small and too pale to read. Deaf and hard-of-hearing learners: fact 2, because the videos can only be heard, so they cannot take in the lesson. Keyboard users: fact 5, because the quiz cannot be answered without dragging.",
      "Eingeschränktes Sehvermögen: Fakt 1 blockiert diese Gruppe, weil der Text zu klein und zu blass zum Lesen ist. Gehörlose und schwerhörige Lernende: Fakt 2, weil sich die Videos nur hören lassen und sie die Lektion so nicht aufnehmen können. Tastaturnutzer: Fakt 5, weil sich das Quiz nicht ohne Ziehen beantworten lässt.",
    ),
    improve: tt(
      "1. Raise the text contrast to at least 4.5 : 1 and let the text be enlarged to 200% (facts 1 and 3): learners with low vision and everyone in bright light gain. 2. Add captions and a transcript to the videos (fact 2): deaf learners and learners on a noisy train gain. 3. Give the quiz a keyboard way to answer (fact 5): keyboard and switch users gain.",
      "1. Den Textkontrast auf mindestens 4,5 : 1 erhöhen und den Text auf 200 % vergrößerbar machen (Fakten 1 und 3): Lernende mit eingeschränktem Sehvermögen und alle bei grellem Licht profitieren. 2. Den Videos Untertitel und ein Transkript hinzufügen (Fakt 2): gehörlose Lernende und Lernende in einem lauten Zug profitieren. 3. Dem Quiz einen Tastaturweg zum Antworten geben (Fakt 5): Nutzer von Tastatur und Schalter profitieren.",
    ),
    optImpact: { ...MODEL_OPT_IMPACT } as Record<string, Score>,
    optEffort,
    optRisk: { ...MODEL_OPT_RISK } as Record<string, Score>,
    optOrder: [...MODEL_OPT_ORDER],
    optWhy: tt(
      "I put C first: the groups who drop out are blocked by contrast, keyboard use and missing captions, and only C changes that. B comes second because clearer structure helps everyone, but it does not remove those barriers. A comes last: it adds a feature, an expansion, on top of a platform that part of the audience cannot use.",
      "Ich setze C an die erste Stelle: Die Gruppen, die abbrechen, werden durch Kontrast, Tastaturbedienung und fehlende Untertitel blockiert, und nur C ändert das. B kommt als Zweites, weil eine klarere Struktur allen hilft, aber diese Barrieren nicht beseitigt. A kommt zuletzt: Es ergänzt ein Feature, eine Erweiterung, auf einer Plattform, die ein Teil des Publikums nicht nutzen kann.",
    ),
    reflect: {
      a: tt("Learners who cannot read small, pale text, hear the videos or use a mouse.", "Lernende, die kleinen, blassen Text nicht lesen, die Videos nicht hören oder keine Maus benutzen können."),
      b: tt("Fixing contrast, keyboard use and captions, because it opens every course at once.", "Kontrast, Tastaturbedienung und Untertitel zu beheben, weil es jeden Kurs auf einmal öffnet."),
      c: tt("By task success and drop-out for each group, not by the number of features.", "An Aufgabenerfolg und Abbruch pro Gruppe, nicht an der Zahl der Features."),
    },
    causes: [...BARRIER_MODEL],
    causeWhy: tt(
      "Fact 5: the quiz can only be answered by dragging items, so keyboard and switch users cannot finish it.",
      "Fakt 5: Das Quiz lässt sich nur durch Ziehen beantworten, Nutzer von Tastatur und Schalter können es also nicht abschließen.",
    ),
    chosen: [...MODEL_MEASURES],
    impact,
    effort,
    risk,
    reasons: {
      m1: tt(
        "It answers facts 7 and 8, the legal wording and “Error 4011”. At €15,000 it is between €10,000 and €25,000, so effort is Mid. User impact High: readers with difficulties, second-language learners and everyone at sign-up gain. Risk Low, it changes wording, not structure.",
        "Sie beantwortet die Fakten 7 und 8, den juristischen Wortlaut und „Fehler 4011“. Mit 15.000 € liegt sie zwischen 10.000 € und 25.000 €, der Aufwand ist also Mittel. Nutzerwirkung Hoch: Lesende mit Schwierigkeiten, Zweitsprachler und alle bei der Anmeldung profitieren. Risiko Niedrig, sie ändert Wortlaut, nicht Struktur.",
      ),
      m2: tt(
        "It answers facts 4, 5 and 6: keyboard, switch and tremor users can finish. €13,000, so effort is Mid. User impact High, because without it these groups cannot finish at all. Risk Mid, because it touches the quiz and the sign-up.",
        "Sie beantwortet die Fakten 4, 5 und 6: Nutzer von Tastatur, Schalter und mit Zittern können abschließen. 13.000 €, der Aufwand ist also Mittel. Nutzerwirkung Hoch, weil diese Gruppen ohne sie gar nicht abschließen können. Risiko Mittel, weil sie das Quiz und die Anmeldung berührt.",
      ),
      m3: tt(
        "It answers facts 1 and 3 on every page: contrast, enlargeable text and status with a word. €11,000, so effort is Mid. User impact High: one change reaches every learner with low vision or colour blindness, and everyone in bright light. Risk Low.",
        "Sie beantwortet die Fakten 1 und 3 auf jeder Seite: Kontrast, vergrößerbarer Text und Status mit einem Wort. 11.000 €, der Aufwand ist also Mittel. Nutzerwirkung Hoch: Eine Änderung erreicht jede Lernende mit eingeschränktem Sehvermögen oder Farbfehlsichtigkeit und alle bei grellem Licht. Risiko Niedrig.",
      ),
      m5: tt(
        "It keeps the fixes from decaying: an automated check in every release and a test with five learners each quarter. At €8,000 it is under €10,000, so effort is Low. It finds barriers and fixes none, so user impact is Mid. Risk Low.",
        "Sie verhindert, dass die Behebungen verfallen: eine automatische Prüfung in jedem Release und ein Test mit fünf Lernenden pro Quartal. Mit 8.000 € liegt sie unter 10.000 €, der Aufwand ist also Niedrig. Sie findet Barrieren und behebt keine, die Nutzerwirkung ist also Mittel. Risiko Niedrig.",
      ),
    },
    effortFlags: [],
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "M3 goes first: low contrast and status by colour alone are on every page, so one change reaches every learner with low vision or colour blindness, and it costs €11,000 and four weeks. Without it, the other fixes would sit on pages some learners still cannot read.",
      "M3 kommt zuerst: Geringer Kontrast und Status nur durch Farbe sind auf jeder Seite, eine Änderung erreicht also jede Lernende mit eingeschränktem Sehvermögen oder Farbfehlsichtigkeit, und sie kostet 11.000 € und vier Wochen. Ohne sie lägen die anderen Behebungen auf Seiten, die manche Lernende immer noch nicht lesen können.",
    ),
    methods: [...MODEL_METHODS],
    methodsWhy: tt(
      "The usability test with learners with impairments (E3) gives the reasons why a group cannot finish. Task success and drop-out by group (E4) give the counts. The automated check in each release (E1) gives quick, partial conformance, so the fixes do not decay.",
      "Der Usability-Test mit Lernenden mit Einschränkungen (E3) liefert die Gründe, warum eine Gruppe nicht abschließen kann. Aufgabenerfolg und Abbruch pro Gruppe (E4) liefern die Zahlen. Die automatische Prüfung in jedem Release (E1) liefert schnelle, teilweise Konformität, damit die Behebungen nicht verfallen.",
    ),
    missingInfo: tt(
      "I do not know how many of our learners need these features, or which groups they are, because the platform does not record it. I would test with five learners with impairments and, with consent, ask all learners about access needs, before I spend the last €3,000.",
      "Ich weiß nicht, wie viele unserer Lernenden diese Funktionen brauchen oder welche Gruppen das sind, weil die Plattform es nicht erfasst. Ich würde mit fünf Lernenden mit Einschränkungen testen und, mit Einwilligung, alle Lernenden nach Zugangsbedarf fragen, bevor ich die letzten 3.000 € ausgebe.",
    ),
  };
}

export function KEY_D7_R2(): Partial<D7R2> {
  return {
    strategy: tt(
      "We aim to reach learners with low vision, hearing, motor and reading difficulties, who drop out today. We change first what blocks them: contrast, keyboard use, captions and plain language in the 20 most-used courses. Inclusion is a core quality, not an add-on: a learner who cannot use a lesson is a learner we lose, and each fix helps everyone (captions on a train, contrast in sunlight).",
      "Wir wollen Lernende mit Seh-, Hör-, Motorik- und Leseschwierigkeiten erreichen, die heute abbrechen. Wir ändern zuerst, was sie blockiert: Kontrast, Tastaturbedienung, Untertitel und einfache Sprache in den 20 meistgenutzten Kursen. Inklusion ist eine Kernqualität, kein Add-on: Eine Lernende, die eine Lektion nicht nutzen kann, ist eine Lernende, die wir verlieren, und jede Behebung hilft allen (Untertitel im Zug, Kontrast im Sonnenlicht).",
    ),
    places: [...MODEL_PLACES],
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    orderWhy: tt(
      "D1 goes first: it reaches the groups who are blocked today, in the courses most learners open. Each month of waiting costs learners we already have. D2 follows so that the fix lasts, and D3 shows the effect by group.",
      "D1 kommt zuerst: Sie erreicht die Gruppen, die heute blockiert sind, in den Kursen, die die meisten Lernenden öffnen. Jeder Monat Warten kostet Lernende, die wir schon haben. D2 folgt, damit die Behebung hält, und D3 zeigt die Wirkung pro Gruppe.",
    ),
    kpis: [...MODEL_KPIS],
    evals: [...MODEL_EVALS],
    readers: tt(
      "The accessibility lead reads the group dashboard monthly and the product board reads it each quarter. If task success for any group falls below the rest, the owner of that course fixes the barrier in the next release.",
      "Die Leiterin Barrierefreiheit liest das Gruppen-Dashboard monatlich, und das Produktgremium liest es jedes Quartal. Fällt der Aufgabenerfolg einer Gruppe unter den der übrigen, behebt die Verantwortliche dieses Kurses die Barriere im nächsten Release.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I put accessibility into the definition of “done” and the release checks (D2), so it does not depend on a project. The action costs about the price of one measure; a platform that drifts back costs the whole programme.",
      "Ich nehme Barrierefreiheit in die Definition von „fertig“ und die Release-Prüfungen auf (D2), damit sie nicht von einem Projekt abhängt. Die Maßnahme kostet etwa den Preis einer Maßnahme; eine Plattform, die zurückfällt, kostet das ganze Programm.",
    ),
    decide: tt("I decide to fix contrast, keyboard use and captions in the 20 most-used courses first.", "Ich entscheide, zuerst Kontrast, Tastaturbedienung und Untertitel in den 20 meistgenutzten Kursen zu beheben."),
    dontKnow: tt("I do not know how many of our learners are affected or which groups they are.", "Ich weiß nicht, wie viele unserer Lernenden betroffen sind oder welche Gruppen das sind."),
    reverse: tt(
      "I reverse if, by the end of the second quarter, task success of the tested learners in those courses has not risen from 60% to 75%.",
      "Ich nehme zurück, wenn der Aufgabenerfolg der getesteten Lernenden in diesen Kursen bis Ende des zweiten Quartals nicht von 60 % auf 75 % gestiegen ist.",
    ),
    giveUp: tt(
      "I give up the new sales features (D7) for this year and postpone the external audit (D5) to year two. Sales will miss the features they asked for.",
      "Ich verzichte in diesem Jahr auf die neuen Vertriebs-Features (D7) und verschiebe das externe Audit (D5) ins zweite Jahr. Der Vertrieb wird die Features vermissen, die er verlangt hat.",
    ),
  };
}
