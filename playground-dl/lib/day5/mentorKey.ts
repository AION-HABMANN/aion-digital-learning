import { MEASURE_BY_ID, MODEL_IMPACT, MODEL_MEASURES, MODEL_OPT_BUSINESS, MODEL_OPT_IMPACT, MODEL_OPT_ORDER, MODEL_OPT_RISK, MODEL_RISK, PROBLEM_BY_ID, PROBLEM_MODEL, TRUTH_SORT, effortBand } from "@/data/day5/case";
import { MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_OWNER, MODEL_RISK_PICK } from "@/data/day5/route2";
import { tt } from "@/lib/lang";
import type { D5R1, D5R2 } from "@/store/dayTypesStd";
import type { Score } from "@/store/useStore";

/**
 * The model answers of Day 5 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every missing
 * list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that language. Mentor tools
 * stay English (#32); only the answers they enter are bilingual. The measures are the plan's own Musterlösung (clear navigation, reduction of complexity,
 * focus on core tasks, better structuring; rationale: understanding users beats the number of features). Together they cost €45,000, €5,000 over the
 * case's €40,000, which the reasons say; a different, well-reasoned choice also exports (#38).
 */
export const MENTOR_NOTE = "The plan's four measures cost €45,000 against the case's €40,000 (a Case assumption): the reference set is €5,000 over and says where the money goes.";

export function KEY_D5_R1(): Partial<D5R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  const effort: Record<string, Score> = Object.fromEntries(MODEL_MEASURES.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>;
  return {
    goal: tt(
      "I want to carry on with the course I started, on my phone, between two meetings, with about ten minutes. It is voluntary, but my manager expects me to finish it this quarter.",
      "Ich will den Kurs, den ich begonnen habe, fortsetzen, auf dem Handy, zwischen zwei Terminen, mit etwa zehn Minuten. Es ist freiwillig, aber meine Chefin erwartet, dass ich ihn in diesem Quartal abschließe.",
    ),
    sort: { ...TRUTH_SORT },
    worst: "f6",
    worstWhy: tt(
      "I come back after three days and expect to see my course and a button that says carry on. Instead the home screen shows menus and banners, and I have to open the course list again and find my place myself.",
      "Ich komme nach drei Tagen zurück und erwarte, meinen Kurs und einen Button „Weitermachen“ zu sehen. Stattdessen zeigt der Startbildschirm Menüs und Banner, und ich muss die Kursliste wieder öffnen und meine Stelle selbst finden.",
    ),
    expectations: tt(
      "I expect to see my course first when I open the platform, because I come with one goal. I expect labels in words I use, because I do not know what a module instance is. I expect to see how far I have come, because I study next to my job and need to know what is left.",
      "Ich erwarte, beim Öffnen der Plattform zuerst meinen Kurs zu sehen, weil ich mit einem Ziel komme. Ich erwarte Beschriftungen in Worten, die ich benutze, weil ich nicht weiß, was eine Modulinstanz ist. Ich erwarte zu sehen, wie weit ich gekommen bin, weil ich neben meinem Beruf lerne und wissen muss, was noch bleibt.",
    ),
    optImpact: { ...MODEL_OPT_IMPACT } as Record<string, Score>,
    optEffort: { ...MODEL_OPT_BUSINESS } as Record<string, Score>,
    optRisk: { ...MODEL_OPT_RISK } as Record<string, Score>,
    optEffortFlags: [],
    optOrder: [...MODEL_OPT_ORDER],
    optWhy: tt(
      "Simplifying the navigation goes first: learners find their course and see what to do next, and the business gets more completion and fewer complaints, which are the figures management watches. More content and new features depend on learners finding them first.",
      "Die Navigation zu vereinfachen kommt zuerst: Lernende finden ihren Kurs und sehen, was als Nächstes zu tun ist, und das Unternehmen bekommt mehr Completion und weniger Beschwerden, also die Zahlen, die das Management beobachtet. Mehr Inhalt und neue Features hängen davon ab, dass Lernende sie zuerst finden.",
    ),
    reflect: {
      a: tt("Adding the social feed because sales asked: nobody asked a learner, and 2% open it.", "Das Hinzufügen des Social Feeds, weil der Vertrieb es verlangte: Keiner hat eine Lernende gefragt, und 2 % öffnen es."),
      b: tt("When growth is counted in sign-ups, not in finished courses: the platform then favours banners and promotions over a clear path.", "Wenn Wachstum in Anmeldungen gezählt wird, nicht in abgeschlossenen Kursen: Die Plattform bevorzugt dann Banner und Aktionen vor einem klaren Weg."),
      c: tt("By using their numbers: completion, support requests and renewals depend on learners finding and finishing a course, so the user-centred measure is the business measure.", "Indem ich ihre Zahlen nutze: Completion, Supportanfragen und Verlängerungen hängen davon ab, dass Lernende einen Kurs finden und abschließen, die nutzerzentrierte Maßnahme ist also die Geschäftsmaßnahme."),
    },
    causes: [...PROBLEM_MODEL],
    errors: Object.fromEntries(PROBLEM_MODEL.map((id) => [id, PROBLEM_BY_ID[id].error ?? ""])),
    chosen: [...MODEL_MEASURES],
    impact,
    effort,
    risk,
    reasons: {
      m1: tt("Clear navigation answers facts 1, 5 and 6: entries in the learner's words, one way to the course. €14,000, so effort is Mid. User value High; risk Mid, because learners who know the old menu need a hint. The business gets more completion and fewer support requests.", "Klare Navigation beantwortet die Fakten 1, 5 und 6: Einträge in den Worten der Lernenden, ein Weg zum Kurs. 14.000 €, der Aufwand ist also Mittel. Nutzerwert Hoch; Risiko Mittel, weil Lernende, die das alte Menü kennen, einen Hinweis brauchen. Das Unternehmen bekommt mehr Completion und weniger Supportanfragen."),
      m2: tt("Reducing complexity answers facts 3 and 7: hide the unused feature and the widgets. €6,000, so effort is Low. User value Mid, because it calms the screen but does not yet tell the learner what to do; risk Low. The business gets less to maintain and a calmer first impression.", "Komplexität zu verringern beantwortet die Fakten 3 und 7: das ungenutzte Feature und die Widgets ausblenden. 6.000 €, der Aufwand ist also Niedrig. Nutzerwert Mittel, weil es den Bildschirm beruhigt, der Lernenden aber noch nicht sagt, was zu tun ist; Risiko Niedrig. Das Unternehmen bekommt weniger zu pflegen und einen ruhigeren ersten Eindruck."),
      m3: tt("Focus on core tasks answers fact 6: one main action, “Continue where you stopped”. €9,000, so effort is Low. User value High; risk Low. The business gets learners who return and finish, which is what renewals depend on.", "Fokus auf Kernaufgaben beantwortet Fakt 6: eine Hauptaktion, „Dort weitermachen, wo Sie aufgehört haben“. 9.000 €, der Aufwand ist also Niedrig. Nutzerwert Hoch; Risiko Niedrig. Das Unternehmen bekommt Lernende, die zurückkehren und abschließen, wovon Verlängerungen abhängen."),
      m4: tt("Better structuring answers fact 5: one list, one place per lesson. At €16,000 it is the biggest cost and the reason the plan goes €5,000 over the budget, so effort is Mid; I would start with the ten most-opened courses. User value High, risk Mid because content moves. The business gets fewer lost learners.", "Bessere Strukturierung beantwortet Fakt 5: eine Liste, ein Ort pro Lektion. Mit 16.000 € ist sie der größte Posten und der Grund, warum der Plan 5.000 € über dem Budget liegt, der Aufwand ist also Mittel; ich würde mit den zehn meistgeöffneten Kursen beginnen. Nutzerwert Hoch, Risiko Mittel, weil Inhalt umzieht. Das Unternehmen bekommt weniger verlorene Lernende."),
    },
    effortFlags: [],
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "Clear navigation goes first: it fixes what every learner meets on the first screen, answers three facts, and the other three measures work on top of a menu that makes sense. Understanding users matters more than the number of features.",
      "Klare Navigation kommt zuerst: Sie behebt, was jede Lernende auf dem ersten Bildschirm trifft, beantwortet drei Fakten, und die anderen drei Maßnahmen wirken auf einem Menü auf, das Sinn ergibt. Die Nutzer zu verstehen zählt mehr als die Zahl der Features.",
    ),
    missingInfo: tt(
      "I do not know whether learners fail to find content because of the menu or because of the search. I would run a usability test with five learners on the home screen before the rebuild.",
      "Ich weiß nicht, ob Lernende Inhalte wegen des Menüs oder wegen der Suche nicht finden. Ich würde vor dem Umbau einen Usability-Test mit fünf Lernenden am Startbildschirm durchführen.",
    ),
  };
}

export function KEY_D5_R2(): Partial<D5R2> {
  return {
    needs: tt(
      "A learner on the move wants to carry on where they stopped, so the business gets completion. A learner who is new wants to find the right course at once, so the business gets usage of paid content. A training manager wants to see that staff finish, so the business gets renewals.",
      "Eine Lernende unterwegs will dort weitermachen, wo sie aufgehört hat, das Unternehmen bekommt also Completion. Eine neue Lernende will sofort den richtigen Kurs finden, das Unternehmen bekommt also Nutzung bezahlter Inhalte. Eine Weiterbildungsleiterin will sehen, dass Mitarbeitende abschließen, das Unternehmen bekommt also Verlängerungen.",
    ),
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    conflict: {
      d1: {
        user: tt("A home screen with one main action and a continue entry.", "Ein Startbildschirm mit einer Hauptaktion und einem Weiter-Eintrag."),
        business: tt("More completion and fewer support requests.", "Mehr Completion und weniger Supportanfragen."),
        lost: tt("Fewer places for promotions on the home screen.", "Weniger Platz für Aktionen auf dem Startbildschirm."),
      },
      d4: {
        user: tt("Changes that rest on what learners say and do.", "Änderungen, die auf dem beruhen, was Lernende sagen und tun."),
        business: tt("Fewer wrong bets and a figure for every decision.", "Weniger falsche Wetten und eine Zahl für jede Entscheidung."),
        lost: tt("Money and time that could have gone into visible features this year.", "Geld und Zeit, die in diesem Jahr in sichtbare Features hätten fließen können."),
      },
      d5: {
        user: tt("Fewer features nobody asked for.", "Weniger Features, die niemand verlangt hat."),
        business: tt("A roadmap that managers can defend with a metric.", "Eine Roadmap, die Führungskräfte mit einer Kennzahl verteidigen können."),
        lost: tt("Sales loses the right to add a feature without a named user problem.", "Der Vertrieb verliert das Recht, ein Feature ohne genanntes Nutzerproblem hinzuzufügen."),
      },
    },
    orderWhy: tt(
      "Rebuilding the navigation and home screen goes first: it fixes what every learner meets, costs €60,000, and gives the first figures (completion) within eighteen weeks, while the research programme and the approval rule start at once beside it.",
      "Der Umbau von Navigation und Startbildschirm kommt zuerst: Er behebt, was jede Lernende trifft, kostet 60.000 € und liefert in achtzehn Wochen die ersten Zahlen (Completion), während das Forschungsprogramm und die Freigaberegel gleich daneben starten.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I start the research programme in month one, so the first usability test and the interviews with leavers run before the rebuild is signed off. I would notice the risk if the interviews name a problem the plan does not address.",
      "Ich starte das Forschungsprogramm in Monat eins, damit der erste Usability-Test und die Interviews mit Abgängern laufen, bevor der Umbau abgenommen wird. Ich würde das Risiko bemerken, wenn die Interviews ein Problem nennen, das der Plan nicht anspricht.",
    ),
    owner: MODEL_OWNER,
    evidence: [...MODEL_EVIDENCE],
    rule: tt(
      "Every new feature needs a named user problem, a metric and an owner before it enters the roadmap.",
      "Jedes neue Feature braucht ein genanntes Nutzerproblem, eine Kennzahl und einen Verantwortlichen, bevor es in die Roadmap kommt.",
    ),
    uncertain: tt(
      "I decide to rebuild the home screen around one main action and to pause new features for six months. I do not know whether learners leave because of the menu or the search. I will reverse it if completion has not risen by three points after four months.",
      "Ich entscheide, den Startbildschirm um eine Hauptaktion herum neu zu bauen und neue Features sechs Monate zu pausieren. Ich weiß nicht, ob Lernende wegen des Menüs oder der Suche gehen. Ich nehme es zurück, wenn die Completion nach vier Monaten nicht um drei Punkte gestiegen ist.",
    ),
    giveUp: tt(
      "I give up the social feed, groups and badges that sales asked for this year, and I postpone the growth marketing push; sales gets a date to come back with a named user problem.",
      "Ich verzichte dieses Jahr auf den Social Feed, die Gruppen und Badges, die der Vertrieb verlangt hat, und verschiebe den Wachstums-Marketingschub; der Vertrieb bekommt einen Termin, um mit einem genannten Nutzerproblem wiederzukommen.",
    ),
  };
}
