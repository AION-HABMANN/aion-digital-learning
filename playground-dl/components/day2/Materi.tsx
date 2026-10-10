"use client";

import type { ReactNode } from "react";
import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day2/Cards";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, materialAnchorId } from "@/data/day2/materials";
import type { MaterialId } from "@/data/day2/materials";
import type { RefKey } from "@/data/references";
import { useCardMore } from "@/store/useCardMore";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["jordan2015", "nielsen1994", "rettig1994", "ries2011", "iso9241210", "nielsen2000", "nielsenLandauer1993", "kohavi2020", "brooke1996", "kulik2016", "gdpr", "aiAct", "gibbons2018"];
const REFS_B: RefKey[] = ["ries2011", "kohavi2020", "gibbons2018", "gdpr", "aiAct", "kulik2016", "klein2007", "bezos2016"];
const NOTE = () => tt("Check every source before you teach from it: editions of standards change, laws such as the DSGVO tracking rules and the EU AI Act are in flux, and page numbers differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Ausgaben von Normen ändern sich, Gesetze wie die Tracking-Regeln der DSGVO und der EU AI Act sind im Fluss, und Seitenzahlen unterscheiden sich zwischen Auflagen.");

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
            reason={tt("Adds context to the cards above; no Core task block needs it, and the rule Block 2.2 needs for the adaptive decision is repeated in A5.", "Ergänzt Kontext zu den Karten oben; kein Kern-Aufgabenblock braucht sie, und die Regel, die Block 2.2 für die adaptive Entscheidung braucht, steht auch in A5.")}
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
    <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={tt("Successful platforms, prototyping, testing and adaptive learning: what makes a platform work, how to test an idea cheaply, and how to weigh a decision", "Erfolgreiche Plattformen, Prototyping, Testen und adaptives Lernen: was eine Plattform funktionieren lässt, wie man eine Idee günstig testet und wie man eine Entscheidung abwägt")}>
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
    <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={tt("UX investments as a strategic decision: staged bets, conflicting goals around technology, and deciding when the data is incomplete", "UX-Investitionen als strategische Entscheidung: gestufte Wetten, Zielkonflikte rund um Technologie und Entscheiden bei unvollständigen Daten")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Three cards for Level 3. You stop weighing single tests and start deciding how money and risk are spread over a year. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie wägen keine einzelnen Tests mehr ab, sondern entscheiden, wie Geld und Risiko über ein Jahr verteilt werden. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen.")}
      </p>
      <Cards block="B" />
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
