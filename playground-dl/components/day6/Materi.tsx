"use client";

import type { ReactNode } from "react";
import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day6/Cards";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, materialAnchorId } from "@/data/day6/materials";
import type { MaterialId } from "@/data/day6/materials";
import type { RefKey } from "@/data/references";
import { useCardMore } from "@/store/useCardMore";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["cooper1999", "pruittGrudin2003", "gothelf2013", "kalbach2020", "gibbons2018b", "christensen2016", "kahneman1993", "nielsen2001", "gibbons2018"];
const REFS_B: RefKey[] = ["pruittGrudin2003", "cooper1999", "kalbach2020", "gibbons2018b", "klein2007", "bezos2016", "gothelf2013"];
const NOTE = () => tt("Check every source before you teach from it: figures and models were checked in abstracts and summaries, not in the full works, and page numbers differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Zahlen und Modelle wurden in Zusammenfassungen geprüft, nicht in den vollständigen Werken, und Seitenzahlen unterscheiden sich zwischen Auflagen.");

const CARD: Record<MaterialId, () => ReactNode> = {
  A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />,
  B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 />,
};

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: ReactNode }) {
  const all = useCardMore((s) => s.all);
  const setAll = useCardMore((s) => s.setAll);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
        <button type="button" aria-pressed={all} onClick={() => setAll(!all)} className="btn-ghost btn-sm">
          {all ? tt("Hide the extra explanations", "Zusatzerklärungen ausblenden") : tt("Show every extra explanation and rule", "Alle Zusatzerklärungen und Regeln zeigen")}
        </button>
      </header>
      {children}
    </section>
  );
}

function Cards({ block }: { block: "A" | "B" }) {
  return (
    <>
      {MATERIALS.filter((m) => m.block === block).map((m) =>
        m.optional ? (
          <OptionalSection
            key={m.id}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Shows how far learner and teacher perspectives are apart; no Core task block needs it.", "Zeigt, wie weit die Perspektiven von Lernenden und Lehrenden auseinanderliegen; kein Kern-Aufgabenblock braucht sie.")}
          >
            {CARD[m.id]()}
          </OptionalSection>
        ) : (
          <div key={m.id}>{CARD[m.id]()}</div>
        ),
      )}
    </>
  );
}

export function MateriA() {
  return (
    <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={tt("Personas and user journeys: what a persona is, good and weak personas, how a journey shows where an experience breaks, and how to weigh a measure along it", "Personas und User Journeys: was eine Persona ist, gute und schwache Personas, wie eine Journey zeigt, wo ein Erlebnis bricht, und wie man eine Maßnahme entlang davon abwägt")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on learners and teachers is folded. Every diagram uses LearnLoop, Mia or Sven, other examples, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zu Lernenden und Lehrenden ist eingeklappt. Jedes Diagramm nutzt LearnLoop, Mia oder Sven, andere Beispiele, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      <Cards block="A" />
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  return (
    <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={tt("Segmentation as a strategy: which persona is business-critical, segments with conflicting needs, and deciding which persona to prioritise under uncertainty", "Segmentierung als Strategie: welche Persona geschäftskritisch ist, Segmente mit widersprüchlichen Bedürfnissen und die Entscheidung, welche Persona unter Unsicherheit priorisiert wird")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Three cards for Level 3. You stop writing single personas and start deciding which user segment a whole platform serves first, and what the others give up. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie schreiben keine einzelnen Personas mehr, sondern entscheiden, welches Nutzersegment eine ganze Plattform zuerst bedient und worauf die anderen verzichten. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen.")}
      </p>
      <Cards block="B" />
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
