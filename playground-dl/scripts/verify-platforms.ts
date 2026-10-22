/**
 * Verification of the mini-platforms (DL-STANDARD v1.7, section 4): for every day, every platform (today and each option) in both languages, every link leads to a page that
 * exists, every page is reachable from the start or the menu, no page is empty, and no text prints a price. Run with `npm run verify:platforms`. It needs no browser.
 */
import { platformIssues } from "../components/sim/PlatformSim";
import type { PlatformCfg } from "../components/sim/PlatformSim";
import * as d7 from "../data/day7/platforms";
import * as d8 from "../data/day8/platforms";
import * as d9 from "../data/day9/platforms";
import * as d10 from "../data/day10/platforms";
import * as d11 from "../data/day11/platforms";
import * as d12 from "../data/day12/platforms";
import * as d13 from "../data/day13/platforms";
import * as d14 from "../data/day14/platforms";
import * as d15 from "../data/day15/platforms";
import * as d16 from "../data/day16/platforms";
import { competitor as c11 } from "../data/day11/competitor";
import { competitor as c12 } from "../data/day12/competitor";
import { competitor as c15 } from "../data/day15/competitor";
import { setCurrentLang } from "../lib/lang";

const DAYS: Record<string, Record<string, () => PlatformCfg>> = {
  "Day 7": { today: d7.today, A: d7.optionA, B: d7.optionB, C: d7.optionC },
  "Day 8": { today: d8.today, A: d8.optionA, B: d8.optionB, C: d8.optionC },
  "Day 9": { today: d9.today, A: d9.optionA, B: d9.optionB, C: d9.optionC },
  "Day 16": { figures: d16.figures, today: d16.today, A: d16.optionA, B: d16.optionB, C: d16.optionC },
  "Day 15": { competitor: c15, today: d15.today, desktop: d15.desktop, A: d15.optionA, B: d15.optionB, C: d15.optionC },
  "Day 14": { today: d14.today, A: d14.optionA, B: d14.optionB, C: d14.optionC },
  "Day 13": { today: d13.today, A: d13.optionA, B: d13.optionB, C: d13.optionC },
  "Day 12": { competitor: c12, today: d12.today, platformA: d12.platformA, platformB: d12.platformB, A: d12.optionA, B: d12.optionB, C: d12.optionC },
  "Day 11": { competitor: c11, today: d11.today, platformA: d11.platformA, platformB: d11.platformB, A: d11.optionA, B: d11.optionB, C: d11.optionC },
  "Day 10": { today: () => d10.today(), phone: () => d10.today(true), A: d10.optionA, B: d10.optionB, C: d10.optionC },
};

let bad = 0;
const ok = (m: string) => console.log("ok    " + m);
const fail = (m: string) => { bad++; console.log("FAIL  " + m); };

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  for (const [day, cfgs] of Object.entries(DAYS)) {
    for (const [name, make] of Object.entries(cfgs)) {
      const cfg = make();
      const issues = platformIssues(cfg);
      const text = JSON.stringify(cfg);
      if (/€|undefined|\[object/.test(text)) issues.push(`${day} ${name}: prints a price or an undefined value`);
      if (issues.length) issues.forEach((i) => fail(`${lang} ${day} ${name}: ${i}`));
      else ok(`${lang} ${day} · ${name}: ${Object.keys(cfg.pages).length} pages, every link leads to a page, every page is reachable`);
    }
  }
}
console.log(bad ? `\n${bad} check(s) failed` : "\nAll checks passed");
process.exit(bad ? 1 : 0);
