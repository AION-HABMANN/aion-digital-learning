"use client";

import clsx from "clsx";
import { useState } from "react";
import { Insight } from "@/components/materi/kit";
import { DECISION_AREA, DECISION_BY_ID, DECISION_IDS, R2_BUDGET, R2_MONTHS } from "@/data/day1/route2";
import type { DecisionId } from "@/data/day1/route2";
import { DPANEL, SLOW_PERCENT } from "@/data/day1/route2Panel";
import { scrollToAndFlash } from "@/lib/flash";
import { euro, tt } from "@/lib/lang";
import { planOf, rangeOf } from "@/lib/day1/r2Panel";
import type { DItem, Scn } from "@/lib/day1/r2Panel";
import { useStore } from "@/store/useStore";

/**
 * The decision panel of Day 1 Route 2 (CLAUDE.md #47, adapted): a picture of the nine decisions in four layers with links that can break, three
 * range bars (Budget, Aimed at the problem, Risk) and four tests, all drawn from the learner's own three decisions and their order and redrawn at once.
 * It shows consequences, never a verdict: every state has a text or pattern channel besides colour, and a position outside a limit is a fact, not a
 * missing item (#38). A different plan with a clear reason still exports.
 */

/** The DOM id of a decision's box: the picture is the only place where a decision is chosen, so "go to the card" lands here. */
export const decisionCardId = (id: DecisionId) => `dbox-${id}`;
const BAR_SCALE = 240000;

function Box({ id, v }: { id: DecisionId; v: DItem }) {
  const toggle = useStore((s) => s.toggleDecision);
  const [more, setMore] = useState(false);
  const f = DPANEL[id];
  const d = DECISION_BY_ID[id];
  const cls = v.chosen ? (f.blackBox ? "border-ink bg-mist" : "border-signal bg-signalSoft") : "border-line bg-paper";
  const status = v.chosen
    ? tt(`Chosen${v.pos ? ` · position ${v.pos}` : ""} · in use month ${v.inUse}`, `Gewählt${v.pos ? ` · Platz ${v.pos}` : ""} · im Einsatz ab Monat ${v.inUse}`)
    : tt("Not chosen", "Nicht gewählt");
  return (
    <div id={decisionCardId(id)} role="group" aria-label={`${f.short}: ${status}`} className={clsx("min-h-[3.5rem] w-full rounded-lg border p-2 text-left text-caption leading-snug", cls)}>
      <div className={clsx(!v.chosen && "opacity-70")}>
        <span className="block font-semibold text-ink">
          {f.blackBox && v.chosen ? "? " : ""}
          {f.short} <span className="font-normal text-ash">· {euro(d.cost)}</span>
        </span>
        <span className="block text-ash">{status}</span>
        {v.notes.map((n) => (
          <span key={n} className="block text-accent">
            {n}
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={v.chosen}
          onClick={() => toggle(id)}
          className={clsx("min-h-[32px] rounded border px-2 text-micro normal-case tracking-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent", v.chosen ? "border-accent bg-accentSoft font-semibold text-ink" : "border-line bg-paper text-ash hover:border-ash")}
        >
          {v.chosen ? tt("Remove", "Entfernen") : tt("Choose", "Wählen")}
        </button>
        <button
          type="button"
          aria-expanded={more}
          aria-controls={`dmore-${id}`}
          onClick={() => setMore((m) => !m)}
          className="text-micro normal-case tracking-normal text-ash underline decoration-dotted underline-offset-2 hover:text-accentHi"
        >
          {more ? tt("Hide details ▴", "Details ausblenden ▴") : tt("Details ▾", "Details ▾")}
        </button>
      </div>
      {more && (
        <div id={`dmore-${id}`} className="mt-2 space-y-1 border-t border-line pt-2 text-ash">
          <p className="font-semibold text-ink">{d.name}</p>
          <p className="text-micro normal-case tracking-normal">{DECISION_AREA[d.area]} · {euro(d.cost)} · {d.weeks} {tt("weeks", "Wochen")}</p>
          <p>{d.what}</p>
          <p>
            <span className="smallcaps mr-1">{tt("A learner notices", "Lernende bemerken")}</span>
            {d.notice}
          </p>
        </div>
      )}
    </div>
  );
}

/** A link between two layers: solid teal when it works, dashed amber with its reason in words when it does not; invisible when there is nothing to link. */
function Lk({ state, text }: { state: "ok" | "no" | "off"; text: string }) {
  return (
    <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", state === "no" ? "text-accent" : "text-ash", state === "off" && "invisible")}>
      <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", state === "no" ? "border-dashed border-gold" : "border-solid border-signal")} />
      <span>{text}</span>
    </div>
  );
}

function RangeBar({ label, lo, hi, cur, tone, sentence }: { label: string; lo: number | null; hi: number | null; cur: number | null; tone: "signal" | "gold"; sentence: string }) {
  const l = lo === null || hi === null ? 0 : Math.min(lo, hi);
  const h = lo === null || hi === null ? 0 : Math.max(lo, hi);
  return (
    <div className="space-y-1">
      <p className="text-caption font-semibold text-ink">{label}</p>
      <div className="relative h-3 rounded border border-line bg-mist" role="img" aria-label={`${label}: ${sentence}`}>
        {cur !== null && (
          <>
            <div className={clsx("absolute inset-y-0 rounded", tone === "signal" ? "bg-signal/35" : "bg-gold/50")} style={{ left: `${l}%`, width: `${Math.max(1, h - l)}%` }} />
            <div className={clsx("absolute -inset-y-[3px] w-[3px] rounded", tone === "signal" ? "bg-signal" : "bg-accent")} style={{ left: `calc(${cur}% - 1.5px)` }} />
          </>
        )}
      </div>
      <p className="text-micro normal-case tracking-normal text-ash" aria-live="polite">
        {sentence}
      </p>
    </div>
  );
}

export function DecisionPanel() {
  const r2 = useStore((s) => s.d1.r2);
  const [scn, setScn] = useState<Scn>(0);
  const [open, setOpen] = useState(false);
  const state = { picks: r2.picks, order: r2.order };
  const plan = planOf(state, scn);
  const rng = rangeOf(state);
  const it = plan.items;
  const b = plan.bars;
  const none = r2.picks.length === 0;
  const spent = Math.min(100, (b.spent / BAR_SCALE) * 100);
  const applicable = plan.tests.filter((x) => x.applies);
  const range = (x: [number | null, number | null]) => (x[0] === null || x[1] === null || x[0] === x[1] ? "" : tt(` Range ${Math.min(x[0], x[1])}–${Math.max(x[0], x[1])}%.`, ` Spanne ${Math.min(x[0], x[1])}–${Math.max(x[0], x[1])} %.`));
  const pct = (n: number | null) => (n === null ? "" : `${n}${tt("%", " %")}`);

  const picked = (id: DecisionId) => it[id].chosen;
  const growthIds: DecisionId[] = ["d7", "d12"];
  const growthOn = growthIds.some(picked);
  const growthLink: { state: "ok" | "no" | "off"; text: string } = !growthOn ? { state: "off", text: "." } : growthIds.every((id) => !picked(id) || it[id].missing.length === 0) ? { state: "ok", text: tt("more new learners meet a platform with a path", "mehr neue Lernende treffen eine Plattform mit Pfad") } : { state: "no", text: tt("they arrive at the same platform where about 40 of 100 leave", "sie kommen auf dieselbe Plattform, auf der etwa 40 von 100 gehen") };
  const extras: DecisionId[] = ["d5", "d6", "d9", "d10", "d11"];
  const extraOn = extras.some(picked);
  const extraMissing = extras.filter((id) => picked(id) && it[id].missing.length > 0);
  const extrasLink: { state: "ok" | "no" | "off"; text: string } = !extraOn
    ? { state: "off", text: "." }
    : extraMissing.length === 0
      ? { state: "ok", text: tt("the extras build on the path and the data", "die Extras bauen auf Pfad und Daten auf") }
      : extraMissing.some((id) => it[id].missing.includes("d1"))
        ? { state: "no", text: tt("no path for the extras to build on", "kein Pfad, auf dem die Extras aufbauen") }
        : extraMissing.includes("d11")
          ? { state: "no", text: tt("the rebuild rests on no evidence of what to rebuild", "der Neubau ruht auf keinen Belegen dafür, was neu zu bauen ist") }
          : { state: "no", text: tt("the recommendations have no data to learn from", "die Empfehlungen haben keine Daten, aus denen sie lernen") };
  const fixOn = (["d1", "d2", "d3"] as DecisionId[]).some(picked);
  const evidenceOn = (["d4", "d8"] as DecisionId[]).some(picked);
  const fixLink: { state: "ok" | "no" | "off"; text: string } = !fixOn ? { state: "off", text: "." } : evidenceOn ? { state: "ok", text: tt("the fixes rest on what learners actually do", "die Lösungen ruhen darauf, was Lernende tatsächlich tun") } : { state: "no", text: tt("nothing tells you why learners leave: the 40 of 100 is still a symptom", "nichts sagt, warum Lernende gehen: Die 40 von 100 bleiben ein Symptom") };

  const box = (id: DecisionId) => <Box key={id} id={id} v={it[id]} />;

  const insight = none
    ? tt("Nothing is chosen yet. Choose a decision in the list or in the picture and the links, the bars and the tests draw it.", "Noch nichts ist gewählt. Wählen Sie eine Entscheidung in der Liste oder im Bild, und Verbindungen, Balken und Tests zeichnen es.")
    : tt(
        `${plan.holding} of ${plan.applicable} tests hold${scn === 1 ? ` with every build ${SLOW_PERCENT}% slower` : ""}. ${plan.holding === plan.applicable ? "Nothing is open under the course's four tests; a plan that holds them can still be argued against, so say in your reasons why this plan and why not the others." : "Open “Show the four tests” to see what each open test means and two ways to act. You decide; a different choice with a clear reason still exports."} The bars show where the money sits; the pale part of the last two is the range across both scenarios.`,
        `${plan.holding} von ${plan.applicable} Tests stimmen${scn === 1 ? ` bei um ${SLOW_PERCENT} % längeren Bauzeiten` : ""}. ${plan.holding === plan.applicable ? "Unter den vier Tests des Kurses ist nichts offen; ein Plan, der sie hält, lässt sich trotzdem hinterfragen, sagen Sie also in Ihren Begründungen, warum dieser Plan und warum nicht die anderen." : "Öffnen Sie „Die vier Tests zeigen“, um zu sehen, was jeder offene Test bedeutet und welche zwei Wege es gibt. Sie entscheiden; eine andere Wahl mit klarer Begründung lässt sich trotzdem exportieren."} Die Balken zeigen, wo das Geld liegt; der helle Teil der letzten beiden ist die Spanne über beide Szenarien.`,
      );

  return (
    <section id="decision-panel" aria-label={tt("Your decisions, live", "Ihre Entscheidungen, live")} className="card space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="smallcaps text-accent">{tt(`Your decisions · live · budget ${euro(R2_BUDGET)} · ${R2_MONTHS} months`, `Ihre Entscheidungen · live · Budget ${euro(R2_BUDGET)} · ${R2_MONTHS} Monate`)}</p>
        <div className="ml-auto flex flex-wrap items-center gap-2" role="group" aria-label={tt("How long builds take", "Wie lange Bauzeiten dauern")}>
          <span className="text-caption text-ash">{tt("Build time", "Bauzeit")}:</span>
          {([0, 1] as Scn[]).map((s) => (
            <button key={s} type="button" aria-pressed={scn === s} onClick={() => setScn(s)} className={clsx("btn btn-sm min-h-[40px] border", scn === s ? "border-accent bg-accentSoft font-semibold text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {s === 0 ? tt("As estimated", "Wie geschätzt") : tt(`${SLOW_PERCENT}% longer`, `${SLOW_PERCENT} % länger`)}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label={tt("The twelve decisions in four layers", "Die zwölf Entscheidungen in vier Ebenen")}>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What new learners meet: the LearnFast platform, as it is today or as you change it", "Was neue Lernende erleben: die Plattform LearnFast, wie sie heute ist oder wie Sie sie verändern")}</div>
        <Lk {...growthLink} />
        <div className="grid gap-2 sm:grid-cols-3">{(["d7", "d12"] as DecisionId[]).map(box)}</div>
        <Lk state="off" text="." />
        <div className="grid gap-2 sm:grid-cols-3">{extras.map(box)}</div>
        <Lk {...extrasLink} />
        <div className="grid gap-2 sm:grid-cols-3">{(["d1", "d2", "d3"] as DecisionId[]).map(box)}</div>
        <Lk {...fixLink} />
        <div className="grid gap-2 sm:grid-cols-3">{(["d4", "d8"] as DecisionId[]).map(box)}</div>
        <Lk state="ok" text={tt("what learners do, and why, flows up", "was Lernende tun und warum, fließt nach oben")} />
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What you know today: how many leave, not why", "Was Sie heute wissen: wie viele gehen, nicht warum")}</div>
        <p className="mt-2 text-micro normal-case tracking-normal text-ash">
          {tt("Solid teal box: chosen, with its position in your roadmap. Faded box: not chosen. Choose or remove a decision with the small button in each box; “Details” shows what it is and what a learner notices. A solid teal link works; a dashed amber link says in words why it does not. The top row and the extras lean on the layers below.", "Durchgezogener teal Kasten: gewählt, mit seinem Platz in Ihrer Roadmap. Blasser Kasten: nicht gewählt. Wählen oder entfernen Sie eine Entscheidung mit dem kleinen Knopf in jedem Kasten; „Details“ zeigt, was sie ist und was Lernende bemerken. Eine durchgezogene teal Verbindung funktioniert; eine gestrichelte amberfarbene sagt in Worten, warum nicht. Die oberste Reihe und die Extras stützen sich auf die Ebenen darunter.")}
        </p>
      </div>

      {!none && plan.holding < plan.applicable && (
        <div id="dec-notice" role="status" className="space-y-1.5 rounded-md border border-gold bg-accentSoft p-3 text-caption text-ink">
          <p className="smallcaps text-accent">{tt("What the panel noticed", "Was das Panel bemerkt")}</p>
          <ul className="list-disc space-y-1 pl-5">
            {applicable.flatMap((x) => (x.holds ? [] : x.open.map((o) => o.fact))).slice(0, 4).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <button type="button" onClick={() => { setOpen(true); window.setTimeout(() => scrollToAndFlash("dec-tests", "ref", "start"), 60); }} className="min-h-[36px] rounded-md border border-accent bg-paper px-2.5 text-caption font-semibold text-accentHi hover:bg-accentSoft">
            {tt("Show why, and what you can do", "Zeigen, warum und was Sie tun können")}
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-caption font-semibold text-ink">{tt("Budget", "Budget")}</p>
          <div className="relative h-3 rounded border border-line bg-mist" role="img" aria-label={tt(`Budget: ${euro(b.spent)} of ${euro(R2_BUDGET)}`, `Budget: ${euro(b.spent)} von ${euro(R2_BUDGET)}`)}>
            <div className="absolute inset-y-0 left-0 rounded bg-signal/50" style={{ width: `${spent}%` }} />
            <div className="absolute -inset-y-1 border-l-[1.5px] border-dashed border-ash" style={{ left: `${(R2_BUDGET / BAR_SCALE) * 100}%` }} />
          </div>
          <p className="text-micro normal-case tracking-normal text-ash" aria-live="polite">
            {b.over > 0 ? tt(`${euro(b.over)} over the budget (dashed line). Going over is allowed; say why. It is printed in the memo as a fact.`, `${euro(b.over)} über dem Budget (gestrichelte Linie). Das Überschreiten ist erlaubt; sagen Sie, warum. Es steht als Tatsache im Memo.`) : tt(`${euro(b.spent)} of ${euro(R2_BUDGET)}. ${euro(b.left)} left.`, `${euro(b.spent)} von ${euro(R2_BUDGET)}. ${euro(b.left)} übrig.`)}
          </p>
        </div>
        <RangeBar
          label={tt("Aimed at the problem", "Auf das Problem gerichtet")}
          lo={rng.aimed[0]}
          hi={rng.aimed[1]}
          cur={b.aimed}
          tone="signal"
          sentence={none ? tt("Nothing is chosen, so nothing is aimed at the 40 who leave.", "Nichts ist gewählt, also zielt nichts auf die 40, die gehen.") : tt(`${pct(b.aimed)} of the money sits on decisions that fix a problem of the case or find its cause, have what they lean on and are in use within the ${R2_MONTHS} months.${range(rng.aimed)}`, `${pct(b.aimed)} des Geldes liegen auf Entscheidungen, die ein Problem des Falls beheben oder seine Ursache finden, haben, worauf sie sich stützen, und sind innerhalb der ${R2_MONTHS} Monate im Einsatz.${range(rng.aimed)}`)}
        />
        <RangeBar
          label={tt("Risk", "Risiko")}
          lo={rng.risk[0]}
          hi={rng.risk[1]}
          cur={b.risk}
          tone="gold"
          sentence={none ? tt("Nothing is chosen yet.", "Noch nichts ist gewählt.") : tt(`${pct(b.risk)} of the money rests on a decision with no problem it fixes, without what it leans on, or in use only after the ${R2_MONTHS} months.${range(rng.risk)}`, `${pct(b.risk)} des Geldes beruhen auf einer Entscheidung ohne ein Problem, das sie behebt, ohne das, worauf sie sich stützt, oder auf einer, die erst nach den ${R2_MONTHS} Monaten im Einsatz ist.${range(rng.risk)}`)}
        />
      </div>

      <div id="dec-tests" className="space-y-2">
        <button type="button" aria-expanded={open} aria-controls="dec-tests-body" onClick={() => setOpen((o) => !o)} className="btn-ghost btn-sm">
          {open ? tt("Hide the four tests", "Die vier Tests ausblenden") : tt("Show the four tests", "Die vier Tests zeigen")}
          {applicable.length > 0 ? ` · ${tt(`${plan.holding} of ${plan.applicable} hold`, `${plan.holding} von ${plan.applicable} stimmen`)}` : ""}
        </button>
        {open && (
          <div id="dec-tests-body" className="fade-in space-y-2">
            <p className="smallcaps text-ash">{tt("Four tests the course teaches", "Vier Tests, die der Kurs lehrt")}</p>
            {applicable.length === 0 ? (
              <p className="text-caption text-ash">{tt("No tests yet. Choose at least one decision.", "Noch keine Tests. Wählen Sie mindestens eine Entscheidung.")}</p>
            ) : (
              <ul className="space-y-2">
                {applicable.map((x) => (
                  <li key={x.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-caption font-semibold text-ink">{x.name}</span>
                      <span className={clsx("pill", x.holds ? "border-signal/50 bg-signalSoft text-signal" : "border-gold bg-accentSoft text-accent")}>{x.holds ? tt("Holds", "Stimmt") : tt("Open", "Offen")}</span>
                    </div>
                    {!x.holds &&
                      x.open.map((o, i) => (
                        <div key={i} className="space-y-2 rounded-md border border-gold bg-accentSoft p-3 text-caption text-ink">
                          <div>
                            <p className="smallcaps text-accent">{tt("What is off", "Was nicht passt")}</p>
                            <p className="font-semibold">{o.fact}</p>
                          </div>
                          <p>
                            <span className="smallcaps mr-1 text-ash">{tt("In plain words", "In einfachen Worten")}</span>
                            {o.plain}
                          </p>
                          {o.where.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="smallcaps text-ash">{tt("Where in the picture", "Wo im Bild")}</span>
                              {o.where.map((id) => (
                                <button key={id} type="button" onClick={() => scrollToAndFlash(`dbox-${id}`, "ref", "center")} className="min-h-[32px] rounded border border-line bg-paper px-2 text-caption text-ink underline decoration-dotted underline-offset-2 hover:border-accent">
                                  {DPANEL[id].short} ↑
                                </button>
                              ))}
                            </div>
                          )}
                          <p className="text-ash">
                            <span className="smallcaps mr-1">{tt("Why it matters", "Warum es zählt")}</span>
                            {o.rule}
                          </p>
                          <div>
                            <p className="smallcaps text-accent">{tt("What you can do (you decide)", "Was Sie tun können (Sie entscheiden)")}</p>
                            <ol className="mt-1 list-decimal space-y-1.5 pl-5">
                              {o.ways.map((w) => (
                                <li key={w.text}>
                                  <span>{w.text}</span>
                                  {w.go.length > 0 && (
                                    <span className="mt-1 flex flex-wrap gap-1.5">
                                      {w.go.map((id) => (
                                        <button
                                          key={id}
                                          type="button"
                                          onClick={() => scrollToAndFlash(decisionCardId(id), "ref", "center")}
                                          aria-label={tt(`Go to ${DECISION_BY_ID[id].name} in the picture`, `Zu ${DECISION_BY_ID[id].name} im Bild`)}
                                          className="min-h-[36px] rounded-md border border-accent bg-paper px-2.5 text-caption font-semibold text-accentHi hover:bg-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                                        >
                                          {tt("Go to", "Zu")}: {DPANEL[id].short} · {euro(DECISION_BY_ID[id].cost)} ↑
                                        </button>
                                      ))}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      ))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <Insight>
        {tt("In plain words: ", "In einfachen Worten: ")}
        {insight}
      </Insight>
    </section>
  );
}

export { DECISION_IDS };
