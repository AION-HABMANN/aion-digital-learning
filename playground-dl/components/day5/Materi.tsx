"use client";

import type { ReactNode } from "react";
import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day5/Cards";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, materialAnchorId } from "@/data/day5/materials";
import type { MaterialId } from "@/data/day5/materials";
import type { RefKey } from "@/data/references";
import { useCardMore } from "@/store/useCardMore";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["norman2013", "kano1984", "christensen2016", "beyer2017", "nielsen2001", "cooper1999", "pruittGrudin2003", "kalbach2020", "gothelf2013", "gibbons2018", "kohavi2020"];
const REFS_B: RefKey[] = ["reichheld2003", "christensen2016", "norman2013", "gibbons2018", "klein2007", "gothelf2013", "kohavi2020"];
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
            reason={tt("Gives an overview of methods; no Core task block needs it.", "Gibt einen Überblick über Methoden; kein Kern-Aufgabenblock braucht sie.")}
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
    <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={tt("User-centred design: designing from the learner's side, understanding learners and their situations, three typical mistakes, and how to weigh a measure", "Nutzerzentriertes Design: von der Seite der Lernenden gestalten, Lernende und ihre Situationen verstehen, drei typische Fehler und wie man eine Maßnahme abwägt")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 gives an overview of methods and is folded. Every diagram uses LearnLoop, Mia or Noor, other examples, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 gibt einen Überblick über Methoden und ist eingeklappt. Jedes Diagramm nutzt LearnLoop, Mia oder Noor, andere Beispiele, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      <Cards block="A" />
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  return (
    <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={tt("User-centredness as a strategy: UX as the bridge between user needs and the business, the conflict between user, business and technology, and deciding without complete user data", "Nutzerzentrierung als Strategie: UX als Brücke zwischen Nutzerbedürfnissen und Unternehmen, der Konflikt zwischen Nutzer, Unternehmen und Technik und Entscheiden ohne vollständige Nutzerdaten")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Three cards for Level 3. You stop weighing single measures and start deciding what a whole platform does for its users and for the company. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie wägen keine einzelnen Maßnahmen mehr ab, sondern entscheiden, was eine ganze Plattform für ihre Nutzer und für das Unternehmen leistet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen.")}
      </p>
      <Cards block="B" />
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
