"use client";

import { useState } from "react";
import { AREAS, AREA_IDS, MEASURES, MEASURE_AREA, MEASURE_BY_ID, PICK_MEASURES, PROBLEMS } from "@/data/day1/case";
import type { AreaId } from "@/data/day1/case";
import { IDS } from "@/lib/day1/missing";
import { MIN_LINE, MIN_REASON } from "@/lib/day1/progress";
import { SENTENCE_PER_MEASURE, fixList } from "@/lib/day1/reason";
import { scrollToAndFlash } from "@/lib/flash";
import { tt } from "@/lib/lang";
import { useStore } from "@/store/useStore";

/**
 * Block 2.2 overview (CLAUDE.md #16, #38, #45, #46): where the learner stands in the block, and, per area, the problem the case brief
 * itself names, the measures on the list that act on that area, and whether a chosen measure reaches it. Facts only: the problem
 * sentences are quoted from the case brief, the area of a measure is the label printed on its card; no score, no tick or cross, never red.
 */
const caseProblems = (a: AreaId): string[] => PROBLEMS.filter((p) => p.area === a).map((p) => `“${p.quote}”`);

export function Block22Overview() {
  const r = useStore((s) => s.d1.r1);
  const chosen = r.chosen;
  const [open, setOpen] = useState<AreaId[]>([]);
  const isOpen = (a: AreaId) => open.includes(a);
  const toggle = (a: AreaId) => setOpen((o) => (o.includes(a) ? o.filter((x) => x !== a) : [...o, a]));
  const allOpen = open.length === AREA_IDS.length;

  const picked = chosen.length === PICK_MEASURES;
  const rated = chosen.length > 0 && chosen.every((id) => fixList(r.fixes[id]).length > 0 && r.impact[id] && r.risk[id]);
  const reasoned = chosen.length > 0 && chosen.every((id) => (r.reasons[id] ?? "").trim().length >= MIN_REASON);
  const orderWhyDone = r.orderWhy.trim().length >= MIN_LINE;
  const missingDone = r.missingInfo.trim().length >= MIN_LINE;
  const firstUnrated = chosen.find((id) => fixList(r.fixes[id]).length === 0 || !r.impact[id] || !r.risk[id]);
  const firstUnreasoned = chosen.find((id) => (r.reasons[id] ?? "").trim().length < MIN_REASON);

  const steps: { key: string; label: string; done: boolean; target: string }[] = [
    { key: "pick", label: tt(`Choose ${PICK_MEASURES}`, `${PICK_MEASURES} wählen`), done: picked, target: IDS.measurePick },
    { key: "rate", label: tt("Rate each", "Je bewerten"), done: rated, target: firstUnrated ? IDS.measure(firstUnrated) : IDS.measurePick },
    ...(SENTENCE_PER_MEASURE ? [{ key: "reasons", label: tt("Reasons", "Begründungen"), done: reasoned, target: firstUnreasoned ? IDS.reason(firstUnreasoned) : IDS.measurePick }] : []),
    { key: "order", label: tt("Why first", "Warum zuerst"), done: orderWhyDone, target: IDS.orderWhy },
    { key: "missing", label: tt("What is missing", "Was fehlt"), done: missingDone, target: IDS.missingInfo },
  ];

  const reached = (a: AreaId) => chosen.some((id) => MEASURE_BY_ID[id].area === a);
  const reachedAreas = AREA_IDS.filter(reached);
  const openAreas = AREA_IDS.filter((a) => !reached(a));
  const elsewhere = chosen.filter((id) => !AREA_IDS.includes(MEASURE_BY_ID[id].area as AreaId));

  const reading =
    chosen.length === 0
      ? tt("Choose measures to see which of the three areas they act on.", "Wählen Sie Maßnahmen, um zu sehen, auf welche der drei Bereiche sie wirken.")
      : tt(
          `So far your ${chosen.length} chosen measure${chosen.length === 1 ? "" : "s"} act${chosen.length === 1 ? "s" : ""} on ${reachedAreas.length ? reachedAreas.map((a) => AREAS[a].label).join(", ") : "none of the three areas"}.${openAreas.length && reachedAreas.length ? ` Nothing you chose acts on ${openAreas.map((a) => AREAS[a].label).join(", ")} yet. That is allowed; say why in the reasons below.` : ""}`,
          `Bisher wirken Ihre ${chosen.length} gewählten Maßnahmen auf ${reachedAreas.length ? reachedAreas.map((a) => AREAS[a].label).join(", ") : "keinen der drei Bereiche"}.${openAreas.length && reachedAreas.length ? ` Nichts, was Sie gewählt haben, wirkt auf ${openAreas.map((a) => AREAS[a].label).join(", ")}. Das ist erlaubt; sagen Sie unten in den Begründungen, warum.` : ""}`,
        );

  return (
    <div className="space-y-3">
      <nav aria-label={tt("Where you are in this block", "Wo Sie in diesem Block stehen")} className="flex flex-wrap items-center gap-1.5">
        <span className="smallcaps text-ash">{tt("This block", "Dieser Block")}</span>
        {steps.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => scrollToAndFlash(s.target, "ref")}
            aria-label={`${s.label}: ${s.done ? tt("done", "erledigt") : tt("open", "offen")}`}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3 text-caption text-ink ${s.done ? "border-signal bg-signalSoft" : "border-dashed border-ash bg-paper hover:border-accent"}`}
          >
            <span className="tnum font-bold text-ash">{i + 1}</span>
            <span>{s.label}</span>
            <span className="smallcaps text-ash">{s.done ? tt("done", "erledigt") : tt("open", "offen")}</span>
          </button>
        ))}
      </nav>

      <section aria-labelledby="cov-h" className="rounded-lg border border-line bg-paper p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p id="cov-h" className="smallcaps text-ash">{tt("The case's problems, and the measures that act on them", "Die Probleme des Falls und die Maßnahmen, die auf sie wirken")}</p>
          <span className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(allOpen ? [] : [...AREA_IDS])} className="text-micro font-semibold text-ash underline decoration-dotted underline-offset-2 hover:text-accentHi">
              {allOpen ? tt("Hide all details", "Alle Details ausblenden") : tt("Show all details", "Alle Details zeigen")}
            </button>
            <button type="button" onClick={() => scrollToAndFlash("case-brief", "ref", "start")} className="text-micro font-semibold text-ash underline decoration-dotted underline-offset-2 hover:text-accentHi">
              {tt("Read the case brief ↑", "Fallbeschreibung lesen ↑")}
            </button>
          </span>
        </div>
        <p className="mt-0.5 text-micro normal-case tracking-normal text-ash">
          {tt(
            "Each box takes the problems the case brief names and puts them under the area they hurt. Below them are the measures on the list that act on that area. A box is “reached” when a measure you chose acts on it.",
            "Jeder Kasten nimmt die Probleme, die die Fallbeschreibung nennt, und ordnet sie dem Bereich zu, den sie treffen. Darunter stehen die Maßnahmen der Liste, die auf diesen Bereich wirken. Ein Kasten ist „erreicht“, wenn eine gewählte Maßnahme darauf wirkt.",
          )}
        </p>
        <ul className="mt-2 grid gap-2 md:grid-cols-3">
          {AREA_IDS.map((a) => {
            const on = chosen.length > 0 && reached(a);
            const list = MEASURES.filter((m) => m.area === a);
            return (
              <li key={a} className={`self-start rounded-lg border p-2 ${on ? "border-signal bg-signalSoft" : "border-dashed border-ash bg-canvas"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen(a)}
                  aria-controls={`cov-${a}`}
                  onClick={() => toggle(a)}
                  className="flex min-h-[40px] w-full items-center justify-between gap-2 text-left"
                >
                  <span className="font-semibold text-ink">{AREAS[a].label}</span>
                  <span className="flex items-center gap-2">
                    <span className="smallcaps text-ash">{chosen.length === 0 ? tt("not chosen yet", "noch nicht gewählt") : on ? tt("reached", "erreicht") : tt("not reached yet", "noch nicht erreicht")}</span>
                    <span aria-hidden="true" className={`text-ash transition-transform ${isOpen(a) ? "rotate-180" : ""}`}>▾</span>
                  </span>
                </button>
                {!isOpen(a) && <p className="text-micro normal-case tracking-normal text-ash">{tt("Tap to see the problems and the measures", "Antippen, um Probleme und Maßnahmen zu sehen")}</p>}
                <div id={`cov-${a}`} hidden={!isOpen(a)} className="mt-2 space-y-2">
                <p className="text-micro normal-case tracking-normal text-ash">{AREAS[a].hint}</p>
                <div>
                  <p className="smallcaps text-ash">{tt("The case says", "Der Fall sagt")}</p>
                  <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-caption text-ink">
                    {caseProblems(a).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="smallcaps text-ash">{tt("Measures for this area", "Maßnahmen für diesen Bereich")}</p>
                  <ul className="mt-0.5 space-y-0.5 text-caption text-ink">
                    {list.map((m) => (
                      <li key={m.id} className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <span>{m.name}</span>
                        <span className="smallcaps text-ash">{chosen.includes(m.id) ? tt("chosen", "gewählt") : ""}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </li>
            );
          })}
        </ul>
        {elsewhere.length > 0 && (
          <p className="mt-2 text-micro normal-case tracking-normal text-ash">
            {tt("Also chosen, acting on another area:", "Außerdem gewählt, mit Wirkung auf einen anderen Bereich:")} {elsewhere.map((id) => `${MEASURE_BY_ID[id].name} (${MEASURE_AREA[MEASURE_BY_ID[id].area]})`).join("; ")}.
          </p>
        )}
        <p className="insight mt-2" aria-live="polite">
          <span className="smallcaps mr-1.5">{tt("What this shows", "Was das zeigt")}</span>
          {reading}
        </p>
      </section>
    </div>
  );
}
