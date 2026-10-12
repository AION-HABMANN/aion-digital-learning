/**
 * Day 6 verification (CLAUDE.md #10, #34, #38, #40): run with `npm run verify:day6`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers
 * empty every missing list and complete every block, a different over-budget choice with reasons still exports, the card minutes add up, and the
 * old blobs migrate. It needs no browser.
 */
import { BUDGET, MEASURES, MEASURE_BY_ID, MODEL_MEASURES, NOTES, NOTE_IDS, PERSONA_FIELDS, PERSONA_FIELD_IDS, TEACHER_NOTES, TRUTH_SORT, WEEKS_LIMIT, effortBand, longestWeeks, totalCost } from "../data/day6/case";
import { DECISIONS, MODEL_DECISIONS, MODEL_SEGMENTS, MODEL_TARGET, R2_BUDGET, SEGMENTS, decisionsCost } from "../data/day6/route2";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day6/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { REFERENCES } from "../data/references";
import { effortWrong, sortHolds } from "../lib/day6/checks";
import { r1Missing, r2Missing } from "../lib/day6/missing";
import { KEY_D6_R1, KEY_D6_R2 } from "../lib/day6/mentorKey";
import { CORE_UNITS, dossierProgress, taskBlocks } from "../lib/day6/progress";
import { analysisBody, memoBody } from "../lib/day6/exportDoc";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { emptyD2, emptyD3 } from "../store/dayTypes";
import { emptyD4, emptyD5, emptyD6, emptyD6R1 } from "../store/dayTypesStd";
import { migratePersisted } from "../store/useStore";
import type { Persisted, Score } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const empty = (): Persisted => ({ participant: { name: "" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: undefined, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5(), d6: emptyD6() }) as unknown as Persisted;
const withKey = (p: Persisted, r1 = KEY_D6_R1(), r2 = KEY_D6_R2()): Persisted => ({ ...p, participant: { name: "Test Person" }, d6: { r1: { ...p.d6.r1, ...r1 }, r2: { ...p.d6.r2, ...r2 } } }) as Persisted;

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the eight notes: every key phrase is a piece of its own text; the three fields are used 2, 3 and 3 times
  ok(NOTES.length === 8 && NOTES.every((n) => n.text.includes(n.key)), "each note's key phrase is inside its text");
  ok(NOTES.filter((n) => n.area === "goal").length === 2 && NOTES.filter((n) => n.area === "problem").length === 3 && NOTES.filter((n) => n.area === "context").length === 3, "the persona fields are used by 2, 3 and 3 notes");
  ok(PERSONA_FIELD_IDS.every((a) => PERSONA_FIELDS[a].test.length > 10 && PERSONA_FIELDS[a].hint.length > 5), "every persona field has a hint and a test question");
  ok(NOTES.every((n) => n.clue.endsWith("?")), "every clue is a question");
  ok(TEACHER_NOTES.length === 6, "six notes about teachers and the organisation");

  // 2 · the model sort holds on the set-level check
  ok(sortHolds(TRUTH_SORT).holds === 8, "the model sort holds 8 of 8");

  // 3 · the effort rule and the reference measures against the printed limits
  ok([effortBand(7999), effortBand(8000), effortBand(15000), effortBand(15001)].join() === "1,2,2,3", "effort bands: <€8,000 Low, ≤€15,000 Mid, above High");
  ok(MODEL_MEASURES.map((id) => effortBand(MEASURE_BY_ID[id].cost)).join() === "1,3,2,2", "the reference measures are Low, High, Mid, Mid by the printed cost");
  const cost = totalCost(MODEL_MEASURES);
  ok(cost === 45000 && cost <= BUDGET, `the reference four measures cost ${cost}, exactly the €${BUDGET} the case assumes`);
  ok(longestWeeks(MODEL_MEASURES) === 6 && longestWeeks(MODEL_MEASURES) <= WEEKS_LIMIT, "the longest reference measure is 6 weeks of 13");
  ok(MEASURES.length === 9 && DECISIONS.length === 7 && SEGMENTS.length === 5, "nine measures, seven decisions, five segments");
  ok(decisionsCost(MODEL_DECISIONS) === 125000 && decisionsCost(MODEL_DECISIONS) <= R2_BUDGET, `the model decisions cost ${decisionsCost(MODEL_DECISIONS)} ≤ ${R2_BUDGET}`);
  ok(MODEL_SEGMENTS.includes(MODEL_TARGET) && MODEL_SEGMENTS.length >= 2 && MODEL_SEGMENTS.length <= 3, "the model target group is one of the two or three strategic personas");

  // 4 · the case's own figures
  ok(WEEKS_LIMIT === 13 && BUDGET === 45000 && R2_BUDGET === 220000, "13 weeks, €45,000 and €220,000 are the case's assumptions (the plan says only “limited”)");

  // 5 · from empty: a named, finite missing list; after the model fill: nothing missing, every block complete
  const p0 = empty();
  const m1 = r1Missing(p0);
  const m2 = r2Missing(p0);
  ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
  ok(m2.length > 0 && m2.every((m) => m.label.length > 12), `Route 2 from empty names ${m2.length} concrete items`);
  ok(!m1.some((m) => /^Block (1\.2|1\.3|2\.1):/.test(m.label)), "an Optional block is never in the missing list");

  const p1 = withKey(p0);
  ok(r1Missing(p1).length === 0, "Route 1: the model answers leave nothing missing");
  ok(r2Missing(p1).length === 0, "Route 2: the model answers leave nothing missing");
  ok(effortWrong(p1.d6.r1).length === 0, "the model effort ratings follow the printed cost");
  const tb = taskBlocks(p1);
  ok(Object.values(tb).every(Boolean), "every task block is complete after the model fill");
  const prog1 = dossierProgress(p1, 1);
  const prog2 = dossierProgress(p1, 2);
  ok(prog1.total === 4 + CORE_UNITS[1].length && prog2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

  // 6 · Core only (CLAUDE.md #35, #40): filling only the Core fields completes both routes
  const core = withKey(p0, { ...KEY_D6_R1(), ...emptyD6R1(), sort: KEY_D6_R1().sort, persona: KEY_D6_R1().persona, frustrations: KEY_D6_R1().frustrations, chosen: KEY_D6_R1().chosen, impact: KEY_D6_R1().impact, effort: KEY_D6_R1().effort, risk: KEY_D6_R1().risk, pain: KEY_D6_R1().pain, reasons: KEY_D6_R1().reasons, order: KEY_D6_R1().order, orderWhy: KEY_D6_R1().orderWhy, missingInfo: KEY_D6_R1().missingInfo });
  ok(r1Missing(core).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");

  // 7 · a different, well-reasoned choice still exports (CLAUDE.md #38): a set well over the budget, with reasons; a different set of decisions
  const reason = "A different choice with a clear reason of my own here.";
  const over = ["m1", "m3", "m8", "m9"] as const;
  const other = {
    ...KEY_D6_R1(),
    chosen: [...over],
    order: [...over],
    impact: Object.fromEntries(over.map((id) => [id, 2])) as Record<string, Score>,
    effort: Object.fromEntries(over.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>,
    risk: Object.fromEntries(over.map((id) => [id, 2])) as Record<string, Score>,
    reasons: Object.fromEntries(over.map((id) => [id, reason])),
    pain: Object.fromEntries(over.map((id) => [id, "The learner, in the usage phase, note 6."])),
  };
  const pOther = withKey(p0, other);
  ok(totalCost([...over]) > BUDGET, `the alternative set costs ${totalCost([...over])}, over the budget`);
  ok(r1Missing(pOther).length === 0, "a different set that goes over the budget, with reasons, still has nothing missing");
  ok(/over|darüber/.test(analysisBody(pOther)), "the export prints the over-budget amount as a fact");
  const otherDec = { ...KEY_D6_R2(), picks: ["d1", "d2", "d5"] as ("d1" | "d2" | "d5")[], order: ["d1", "d2", "d5"] as ("d1" | "d2" | "d5")[] };
  ok(r2Missing(withKey(p0, KEY_D6_R1(), otherDec)).length === 0, "a different set of three decisions still has nothing missing");
  const twoSegs = { ...KEY_D6_R2(), segs: ["s2", "s5"] as ("s2" | "s5")[], segPersona: { s2: "A persona line for exam preparers here.", s5: "A persona line for casual browsers here." }, target: "s4" as const };
  ok(r2Missing(withKey(p0, KEY_D6_R1(), twoSegs)).length === 0, "two personas and a target group outside them still export (a different choice with reasons)");

  // 8 · the export bodies are built, in this language, and never print a key or a verdict
  const a = analysisBody(p1);
  const m = memoBody(p1);
  ok(a.includes("Test Person") && m.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(a + m), "no answer key text in an export");
  ok(!/[✓✗]/.test(a + m), "no tick or cross in an export");
  ok(analysisBody(p0).includes("—") && memoBody(p0).includes("—"), "empty documents still build");

  // 9 · every glossary term links in this language; every reference exists
  ok(GLOSSARY.every((g) => g.match.length > 0 && !!g.plain), "every glossary entry has forms and an explanation");
  ok(GLOSSARY.every((g) => !!g.de && !!g.de.plain && g.de.match.length > 0), "every glossary entry has a German text");
  const look = lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE;
  ok((lang === "en" ? ["pain point", "touchpoint", "persona", "peak-end rule", "business-critical"] : ["pain point", "touchpoint", "persona", "peak-end-regel", "geschäftskritisch"]).every((k) => look.has(k)), "the Day 6 terms are glossary links in this language");
  ok(["cooper1999", "pruittGrudin2003", "gibbons2018b", "kalbach2020", "kahneman1993", "bezos2016"].every((k) => !!(REFERENCES as Record<string, { full: string }>)[k]?.full), "the Day 6 references exist");
  ok(NOTE_IDS.length === 8, "eight note ids");
}

setCurrentLang("en");
console.log("\n=== language-independent ===");
ok(MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
ok(MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
ok(MATERIALS.every((x) => !!MATERIAL_PLAIN[x.id].idea && !!MATERIAL_PLAIN[x.id].why && !!MATERIAL_PLAIN[x.id].picture), "every card has an In plain words box with all three parts");
ok(MATERIALS.filter((x) => x.optional).map((x) => x.id).join() === "A4", "only A4 is Optional");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

const migrated = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {} }, 1);
ok(!!migrated.d6 && migrated.d6.r1.sort.n1 === null && migrated.participant.name === "Old", "an old blob migrates with an empty Day 6 slice");
const migrated2 = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {}, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5() }, 3);
ok(!!migrated2.d6 && Object.keys(emptyD6R1().sort).length === 8 && !!migrated2.d5, "a version-3 blob (Days 1 to 5) gets an empty Day 6 slice and keeps its answers");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
