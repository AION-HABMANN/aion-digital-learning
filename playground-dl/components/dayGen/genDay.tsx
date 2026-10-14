import { GenTask1 } from "@/components/dayGen/GenTask1";
import { GenTask2 } from "@/components/dayGen/GenTask2";
import type { GenKit } from "@/components/dayGen/GenBits";
import type { DayConfig } from "@/components/day/DayPages";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import type { DayMaterials } from "@/data/materialRegistry";
import type { RailSection } from "@/data/day1/materials";
import type { RouteNo } from "@/data/course";
import { genDossierProgress, genTaskBlocks } from "@/lib/dayGen/progress";
import type { GenSpec } from "@/lib/dayGen/spec";
import { CORE1_MINUTES, CORE2_MINUTES, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/dayStd/common";
import type { TaskBlockId } from "@/lib/dayStd/common";
import { tt } from "@/lib/lang";

/**
 * Turns a generic day's spec, its pictures and its study cards into the `DayConfig` the shared page frames read (components/day/DayPages.tsx). One factory for every
 * generic day, so the rail, the page map, the route cards and the two tasks are built the same way.
 */
export function makeDayConfig(spec: GenSpec, kit: GenKit, mats: DayMaterials): DayConfig {
  const day = spec.day;
  const cards = (block: "A" | "B"): NavItem[] => mats.MATERIALS.filter((m) => m.block === block).map((m) => ({ id: mats.materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d${day}:${m.id}` }, optional: m.optional }));
  const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

  const railSections = (route: RouteNo): RailSection[] =>
    route === 1
      ? [
          { id: "materi-a", label: "Materi A", sub: spec.route1.materiSub, minutes: 60 },
          { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: TASK1_MINUTES },
        ]
      : [
          { id: "materi-b", label: "Materi B", sub: spec.route2.materiSub, minutes: 60 },
          { id: "task-2", label: "Task 2", sub: `UX Strategy Memo · ${spec.role}`, minutes: TASK2_MINUTES },
        ];

  const pageNav = (route: RouteNo): NavGroup[] =>
    route === 1
      ? [
          { label: "Materi A", items: cards("A") },
          {
            label: "Task 1",
            items: [
              { id: "case-brief", short: tt("Case", "Fall"), title: spec.brief1.heading },
              blk("1.1", spec.b11.title.replace(/^Block 1\.1 · |^Block 1\.1: /, ""), "b11"),
              blk("1.2", spec.opts.title.replace(/^Block 1\.2 · /, ""), "b12"),
              blk("1.3", spec.reflect.title.replace(/^Block 1\.3 · /, ""), "b13"),
              blk("2.1", spec.causes.title.replace(/^Block 2\.1 · /, ""), "b21"),
              blk("2.2", spec.b22.title.replace(/^Block 2\.2 · /, ""), "b22"),
              { id: "export-l1l2", short: "Export", title: tt("Export the UX Analysis File", "UX Analysis File exportieren") },
            ],
          },
        ]
      : [
          { label: "Materi B", items: cards("B") },
          {
            label: "Task 2",
            items: [
              { id: "task-2", short: tt("Case", "Fall"), title: spec.brief2.heading },
              blk("3.1", spec.b31.title.replace(/^Block 3\.1 · /, ""), "b31"),
              blk("3.2", spec.b32.title.replace(/^Block 3\.2 · /, ""), "b32"),
              { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
              { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
            ],
          },
        ];

  const routeCard = (route: RouteNo) =>
    route === 1
      ? {
          title: spec.route1.title,
          blurb: spec.route1.blurb,
          plan: [
            { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
            { label: tt("Task 1 · UX Analysis File, Core blocks 1.1 and 2.2", "Task 1 · UX Analysis File, Kernblöcke 1.1 und 2.2"), minutes: CORE1_MINUTES },
          ],
          optional: tt(`Optional blocks add about ${TASK1_MINUTES - CORE1_MINUTES} min`, `Optionale Blöcke ergänzen etwa ${TASK1_MINUTES - CORE1_MINUTES} Min.`),
          export: "UX Analysis File",
        }
      : {
          title: spec.route2.title,
          blurb: spec.route2.blurb,
          plan: [
            { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
            { label: tt("Task 2 · UX Strategy Memo, Core blocks 3.1 and 3.2", "Task 2 · UX Strategy Memo, Kernblöcke 3.1 und 3.2"), minutes: CORE2_MINUTES },
          ],
          optional: "",
          export: "UX Strategy Memo",
        };

  const Task1 = () => <GenTask1 spec={spec} kit={kit} />;
  const Task2 = () => <GenTask2 spec={spec} kit={kit} />;

  return {
    n: day,
    heading: () => spec.heading,
    intro: spec.intro as unknown as DayConfig["intro"],
    routeCard,
    railSections,
    pageNav,
    MateriA: kit.MateriA,
    MateriB: kit.MateriB,
    Task1,
    Task2,
    progress: (p, route) => genDossierProgress(p, spec, mats.MATERIALS, route),
    taskBlocks: (p) => genTaskBlocks(p, spec),
    routeHeading: (route) => {
      const x = route === 1 ? spec.route1 : spec.route2;
      return { kicker: x.kicker, h1: x.h1, order: x.order };
    },
  };
}
