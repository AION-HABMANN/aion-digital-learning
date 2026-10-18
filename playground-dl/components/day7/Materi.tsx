"use client";

import type { ReactNode } from "react";
import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day7/Cards";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, materialAnchorId } from "@/data/day7/materials";
import type { MaterialId } from "@/data/day7/materials";
import type { RefKey } from "@/data/references";
import { useCardMore } from "@/store/useCardMore";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["iso924111", "who2022", "msInclusive", "castUdl", "wcag22", "wcagUnderstanding", "w3cAria", "bfsg", "en301549", "bitv", "sweller1998", "brooke1996", "rodden2010", "nielsen2000", "gibbons2018"];
const REFS_B: RefKey[] = ["who2022", "bfsg", "en301549", "bitv", "wcag22", "gibbons2018", "brooke1996", "rodden2010", "gdpr", "klein2007", "bezos2016"];
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
            reason={tt("Shows how to build and measure UX quality into a team; the rules that Block 2.2 needs about evaluation methods are repeated in A5, so no Core task block needs it.", "Zeigt, wie man UX-Qualität in ein Team einbaut und misst; die Regeln, die Block 2.2 zu Evaluationsmethoden braucht, stehen auch in A5, kein Kern-Aufgabenblock braucht sie also.")}
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
    <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={tt("Accessibility and inclusive design: what they are, barriers and the four principles, plain language and a lower load, how to build and measure quality into a team, and how to weigh an inclusion measure", "Barrierefreiheit und inklusives Design: was sie sind, Barrieren und die vier Prinzipien, einfache Sprache und geringere Belastung, wie man Qualität in ein Team einbaut und misst, und wie man eine Inklusionsmaßnahme abwägt")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      <Cards block="A" />
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  return (
    <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={tt("Inclusion as a strategy: why it is a core quality, the conflicts of inclusion against cost and integration against add-on, and an evaluation system with a decision under uncertainty", "Inklusion als Strategie: warum sie eine Kernqualität ist, die Konflikte Inklusion gegen Kosten und Integration gegen Add-on und ein Evaluationssystem mit einer Entscheidung unter Unsicherheit")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Three cards for Level 3. You stop sorting single barriers and start deciding where a whole organisation puts its money and its checks, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Barrieren mehr ein, sondern entscheiden, wohin eine ganze Organisation ihr Geld und ihre Prüfungen legt und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen.")}
      </p>
      <Cards block="B" />
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
