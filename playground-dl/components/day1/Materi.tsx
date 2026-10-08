"use client";

import type { ReactNode } from "react";
import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day1/Cards";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, materialAnchorId } from "@/data/day1/materials";
import type { MaterialId, RefKey } from "@/data/day1/materials";
import { useCardMore } from "@/store/useCardMore";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["normanNielsen", "iso924111", "iso9241210", "sweller1988", "nielsen1994", "knowles1975", "gibbons2018"];
const REFS_B: RefKey[] = ["normanNielsen", "iso924111", "gibbons2018", "iso9241210", "klein2007"];
const NOTE = () => tt("Check every source before you teach from it: editions of standards change, and page numbers differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Ausgaben von Normen ändern sich, und Seitenzahlen unterscheiden sich zwischen Auflagen.");

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
    <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={tt("UX and UI for learning platforms: the learner's side, three principles of a good interface, and how to weigh measures", "UX und UI für Lernplattformen: die Sicht der Lernenden, drei Prinzipien einer guten Oberfläche und wie man Maßnahmen abwägt")}>
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
    <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={tt("UX as a business decision: why it matters to the numbers, how to weigh conflicting goals, and how to decide when you do not know enough", "UX als Geschäftsentscheidung: warum sie für die Zahlen zählt, wie man Zielkonflikte abwägt und wie man entscheidet, wenn man nicht genug weiß")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Three cards for Level 3. You stop weighing single measures and start deciding how the whole platform is steered. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie wägen keine einzelnen Maßnahmen mehr ab, sondern entscheiden, wie die ganze Plattform gesteuert wird. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen.")}
      </p>
      <Cards block="B" />
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
