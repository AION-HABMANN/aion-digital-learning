"use client";

import type { ReactNode } from "react";
import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day3/Cards";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, materialAnchorId } from "@/data/day3/materials";
import type { MaterialId } from "@/data/day3/materials";
import type { RefKey } from "@/data/references";
import { useCardMore } from "@/store/useCardMore";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["atkinson1968", "anderson2001", "roediger2006", "cepeda2006", "sweller1988", "sweller1998", "mayerMoreno2003", "miller1956", "cowan2001", "mayer2009", "harp1998", "nielsen1997", "kalyuga2003", "gibbons2018"];
const REFS_B: RefKey[] = ["sweller1998", "mayer2009", "roediger2006", "kalyuga2003", "bjork2011", "klein2007", "bezos2016", "nielsen2000"];
const NOTE = () => tt("Check every source before you teach from it: figures from research were checked in abstracts and summaries, not in the full papers, and page numbers differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Zahlen aus der Forschung wurden in Zusammenfassungen geprüft, nicht in den vollständigen Arbeiten, und Seitenzahlen unterscheiden sich zwischen Auflagen.");

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
            reason={tt("Adds context to the cards above; no Core task block needs it.", "Ergänzt Kontext zu den Karten oben; kein Kern-Aufgabenblock braucht sie.")}
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
    <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={tt("Learning psychology and cognitive load: how people take in and process information, the three kinds of load, and how to weigh measures that reduce it", "Lernpsychologie und kognitive Belastung: wie Menschen Information aufnehmen und verarbeiten, die drei Arten von Belastung und wie man Maßnahmen abwägt, die sie senken")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 goes deeper and is folded. Every diagram uses LearnLoop, another company, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 vertieft und ist eingeklappt. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      <Cards block="A" />
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  return (
    <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={tt("Learning effectiveness as a strategy: two lenses on a UX decision, efficiency against deep learning, and deciding without user data", "Lerneffektivität als Strategie: zwei Linsen auf eine UX-Entscheidung, Effizienz gegen tiefes Lernen und Entscheiden ohne Nutzerdaten")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Three cards for Level 3. You stop weighing single measures and start deciding what learning-effective UX means for a whole platform. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie wägen keine einzelnen Maßnahmen mehr ab, sondern entscheiden, was lerneffektives UX für eine ganze Plattform bedeutet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen.")}
      </p>
      <Cards block="B" />
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
