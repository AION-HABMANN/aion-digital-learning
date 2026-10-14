/**
 * Verification of the generic days (Day 8 onward; CLAUDE.md #10, #34, #38, #40): run with `npm run verify:gen` (all days) or `npm run verify:day8`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers empty every missing list and
 * complete every block, the Core fields alone are enough, a different over-budget choice with reasons still exports, no learner-visible text is missing its German,
 * the card minutes add up, and the old blobs migrate. It needs no browser.
 */
import { GEN_SPECS } from "../data/gen/registry";
import { GEN_MATS } from "../data/gen/mats";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { REFERENCES } from "../data/references";
import { causeHolds, effortWrong, sortHolds } from "../lib/dayGen/checks";
import { genAnalysisBody, genMemoBody } from "../lib/dayGen/exportDoc";
import { genR1Missing, genR2Missing } from "../lib/dayGen/missing";
import { genKeyR1, genKeyR2 } from "../lib/dayGen/mentorKey";
import { decisionsCost, effortBandOf, longestWeeks, modelExtra, r1Fields, r2Fields, totalCost } from "../lib/dayGen/model";
import { CORE_UNITS, genDossierProgress, genTaskBlocks } from "../lib/dayGen/progress";
import type { GenSpec } from "../lib/dayGen/spec";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { emptyD2, emptyD3 } from "../store/dayTypes";
import { emptyD4, emptyD5, emptyD6, emptyD7 } from "../store/dayTypesStd";
import { emptyGen, emptyGenR1 } from "../store/dayTypesGen";
import { emptyDg, migratePersisted } from "../store/useStore";
import type { Persisted, Score } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const only = process.argv[2] ? Number(process.argv[2]) : null;
const days = Object.keys(GEN_SPECS).map(Number).filter((d) => only === null || d === only);

/** Keys whose text is for the mentor only (English by design, CLAUDE.md #32) or is not a sentence. */
const MENTOR_KEYS = new Set(["why", "keyWhy", "keyTitle", "keyTeaching", "teaching", "mentorNote", "sortKeyTitle", "sortTeaching", "guideWhy", "lookFor", "pitfalls", "id", "kind", "no", "caseName", "role", "area", "letter"]);

function leaves(v: unknown, path: string[], out: [string, string][]) {
  if (typeof v === "string") out.push([path.join("."), v]);
  else if (Array.isArray(v)) v.forEach((x, i) => leaves(x, [...path, String(i)], out));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) leaves(x, [...path, k], out);
}

for (const day of days) {
  const spec: GenSpec = GEN_SPECS[day];
  const mats = GEN_MATS[day];
  const empty = (): Persisted => ({ participant: { name: "" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: undefined, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5(), d6: emptyD6(), d7: emptyD7(), dg: emptyDg() }) as unknown as Persisted;
  const withKey = (p: Persisted, r1 = genKeyR1(spec), r2 = genKeyR2(spec)): Persisted => ({ ...p, participant: { name: "Test Person" }, dg: { ...p.dg, [day]: { r1: { ...p.dg[day].r1, ...r1 }, r2: { ...p.dg[day].r2, ...r2 } } } }) as Persisted;
  const l = spec.limits;
  const band = effortBandOf(spec);

  for (const lang of ["en", "de"] as const) {
    setCurrentLang(lang);
    console.log(`\n=== Day ${day} · ${lang.toUpperCase()} ===`);

    // 1 · the facts: every key phrase is a piece of its own text; every category is used; clues are questions
    const badKeys = spec.facts.filter((f) => !f.text.includes(f.key)).map((f) => f.no);
    ok(spec.facts.length === 8 && badKeys.length === 0, `each fact's key phrase is inside its text${badKeys.length ? ": facts " + badKeys.join(",") : ""}`);
    ok(spec.cats.length === 3 && spec.cats.every((c) => spec.facts.some((f) => f.area === c.id) && c.test.length > 10 && c.hint.length > 5), "three categories, each used and each with a hint and a test question");
    ok(spec.facts.every((f) => f.clue.endsWith("?") && spec.cats.some((c) => c.id === f.area)), "every clue is a question and every fact has a valid category");
    ok(sortHolds(spec, Object.fromEntries(spec.facts.map((f) => [f.id, f.area]))).holds === 8, "the model sort holds 8 of 8");
    ok(causeHolds(spec, spec.causes.model).holds === spec.causes.model.length && spec.causes.model.length === l.pickCauses, `the model causes hold ${l.pickCauses} of ${l.pickCauses}`);

    // 2 · the printed figures against the limits
    ok(spec.opts.options.length === 3 && spec.b22.measures.length === 9 && spec.decisions.items.length === 7, "three options, nine measures, seven decisions");
    ok(spec.b22.model.chosen.length === l.pickMeasures && spec.decisions.model.picks.length === l.r2Pick, "the model picks have the counts the plan names");
    const cost = totalCost(spec, spec.b22.model.chosen);
    const dcost = decisionsCost(spec, spec.decisions.model.picks);
    ok(longestWeeks(spec, spec.b22.model.chosen) <= l.weeks, `the longest reference measure (${longestWeeks(spec, spec.b22.model.chosen)} weeks) fits the ${l.weeks} weeks`);
    ok(dcost <= l.r2Budget, `the model decisions cost ${dcost} ≤ ${l.r2Budget}`);
    console.log(`info  reference measures cost ${cost} of ${l.budget}${cost > l.budget ? ` (over by ${cost - l.budget}, by plan fidelity)` : ""}`);
    const dearest = [...spec.decisions.items].sort((x, y) => y.cost - x.cost).slice(0, l.r2Pick).reduce((s, d) => s + d.cost, 0);
    ok(dearest <= l.r2Budget * 1.6, `the dearest ${l.r2Pick} decisions cost ${dearest}, so a set that goes over the budget is possible and still allowed`);
    ok([band(l.effortLowMax), band(l.effortLowMax + 1), band(l.effortMidMax), band(l.effortMidMax + 1)].join() === "1,2,2,3", "the effort bands switch at the printed limits");

    // 3 · from empty a named, finite missing list; after the model fill nothing is missing and every block is complete
    const p0 = empty();
    const m1 = genR1Missing(p0, spec);
    const m2 = genR2Missing(p0, spec);
    ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
    ok(m2.length > 0 && m2.every((m) => m.label.length > 12), `Route 2 from empty names ${m2.length} concrete items`);
    ok(!m1.some((m) => /^Block (1\.2|1\.3|2\.1):/.test(m.label)), "an Optional block is never in the missing list");
    ok(m1.every((m) => /^Block \d\.\d:|^(Your full name|Ihr vollständiger)/.test(m.label)) && m2.every((m) => /^Block \d\.\d:|^(Your full name|Ihr vollständiger)/.test(m.label)), "every missing label starts with its block");
    const p1 = withKey(p0);
    ok(genR1Missing(p1, spec).length === 0, "Route 1: the model answers leave nothing missing");
    ok(genR2Missing(p1, spec).length === 0, "Route 2: the model answers leave nothing missing");
    ok(effortWrong(spec, p1.dg[day].r1).length === 0, "the model effort ratings follow the printed cost");
    ok(Object.values(genTaskBlocks(p1, spec)).every(Boolean), "every task block is complete after the model fill");
    const pr1 = genDossierProgress(p1, spec, mats.MATERIALS, 1);
    const pr2 = genDossierProgress(p1, spec, mats.MATERIALS, 2);
    ok(pr1.total === 4 + CORE_UNITS[1].length && pr2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

    // 4 · Core only (CLAUDE.md #35, #40): the Core fields alone complete both routes; the Optional blocks do not
    const k1 = genKeyR1(spec);
    const coreR1 = { ...emptyGenR1(spec.facts.map((f) => f.id)), sort: k1.sort, chosen: k1.chosen, impact: k1.impact, effort: k1.effort, risk: k1.risk, reasons: k1.reasons, order: k1.order, orderWhy: k1.orderWhy, missingInfo: k1.missingInfo, ...modelExtra(r1Fields(spec)) } as Partial<ReturnType<typeof genKeyR1>>;
    const core = withKey(p0, coreR1 as never);
    ok(genR1Missing(core, spec).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");
    const tb = genTaskBlocks(core, spec);
    ok(tb.b11 && tb.b22 && !tb.b12 && !tb.b21, "with the Core fields only, 1.1 and 2.2 are complete and the Optional blocks are not");

    // 5 · a different, well-reasoned choice still exports (CLAUDE.md #38): the dearest set of measures, a different set of decisions
    const reason = "A different choice with a clear reason of my own here.";
    const dearM = [...spec.b22.measures].sort((a, b) => b.cost - a.cost).slice(0, l.pickMeasures).map((m) => m.id);
    const other = {
      ...genKeyR1(spec),
      chosen: dearM,
      order: dearM,
      impact: Object.fromEntries(dearM.map((id) => [id, 2])) as Record<string, Score>,
      effort: Object.fromEntries(dearM.map((id) => [id, band(spec.b22.measures.find((m) => m.id === id)!.cost)])) as Record<string, Score>,
      risk: Object.fromEntries(dearM.map((id) => [id, 2])) as Record<string, Score>,
      reasons: Object.fromEntries(dearM.map((id) => [id, reason])),
    };
    const pOther = withKey(p0, other);
    ok(totalCost(spec, dearM) > l.budget, `the dearest ${l.pickMeasures} measures cost ${totalCost(spec, dearM)}, over the budget`);
    ok(genR1Missing(pOther, spec).length === 0, "a different set that goes over the budget, with reasons, still has nothing missing");
    ok(/over|darüber/.test(genAnalysisBody(pOther, spec)), "the export prints the over-budget amount as a fact");
    const dearD = [...spec.decisions.items].sort((a, b) => b.cost - a.cost).slice(0, l.r2Pick).map((d) => d.id);
    const pDec = withKey(p0, genKeyR1(spec), { ...genKeyR2(spec), picks: dearD, order: dearD });
    ok(genR2Missing(pDec, spec).length === 0 && genMemoBody(pDec, spec).includes(spec.decisions.items.find((d) => d.id === dearD[0])!.name), "the dearest decisions, in another order, still export and the memo names them");

    // 6 · the export bodies are built, in this language, and never print a key or a verdict
    const a = genAnalysisBody(p1, spec);
    const m = genMemoBody(p1, spec);
    ok(a.includes("Test Person") && m.includes("Test Person"), "both documents carry the participant's name");
    ok(!/answer key|Musterlösung|expected/i.test(a + m), "no answer key text in an export");
    ok(!/[✓✗]/.test(a.replace(/Saved ✓|Gespeichert ✓/g, "") + m), "no tick or cross in an export");
    ok(genAnalysisBody(p0, spec).includes("—") && genMemoBody(p0, spec).includes("—"), "empty documents still build");
    ok(r2Fields(spec).every((f) => f.kind === "decisions" || m.includes(f.kind === "frame" ? f.parts[0].label : f.label)), "every Route 2 field appears in the memo");

    // 7 · learner-visible text has both languages (a plain string where a t(en, de) belongs is caught here)
    setCurrentLang("en");
    const en: [string, string][] = [];
    leaves(spec, [], en);
    setCurrentLang("de");
    const de: [string, string][] = [];
    leaves(spec, [], de);
    setCurrentLang(lang);
    const same = en.filter(([path, text], i) => {
      const last = path.split(".").filter((x) => !/^\d+$/.test(x)).pop() ?? "";
      return text.length >= 28 && text === de[i][1] && !MENTOR_KEYS.has(last) && !path.split(".").some((x) => MENTOR_KEYS.has(x));
    });
    ok(same.length === 0, `no learner-visible text is missing its German${same.length ? ": " + same.slice(0, 3).map(([p]) => p).join(", ") : ""}`);

    // 8 · every glossary term links in this language; every reference exists
    ok(GLOSSARY.every((g) => g.match.length > 0 && !!g.plain), "every glossary entry has forms and an explanation");
    ok(GLOSSARY.every((g) => !!g.de && !!g.de.plain && g.de.match.length > 0), "every glossary entry has a German text");
    const look = lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE;
    ok(look.size > 100, "the glossary lookup is built in this language");
    const missingRefs = Object.values(REFERENCES).filter((r) => !r.full || r.full.length < 20);
    ok(missingRefs.length === 0, "every reference has its full text");
  }

  setCurrentLang("en");
  console.log(`\n=== Day ${day} · language-independent ===`);
  ok(mats.MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
  ok(mats.MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
  ok(mats.MATERIALS.every((x) => !!mats.MATERIAL_PLAIN[x.id].idea && !!mats.MATERIAL_PLAIN[x.id].why && !!mats.MATERIAL_PLAIN[x.id].picture), "every card has an In plain words box with all three parts");
  ok(mats.MATERIALS.filter((x) => x.optional).map((x) => x.id).join() === "A4", "only A4 is Optional");
  ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");
  const migrated = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {} }, 1);
  ok(!!migrated.dg && !!migrated.dg[day] && migrated.participant.name === "Old", "an old blob migrates with an empty slice for this day");
  const migrated2 = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {}, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5(), d6: emptyD6(), d7: emptyD7() }, 4);
  ok(!!migrated2.dg[day] && Object.keys(emptyGen(spec.facts.map((f) => f.id)).r1.sort).length === 8 && !!migrated2.d7, "a version-4 blob (Days 1 to 7) gets the generic slices and keeps its answers");
}

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
