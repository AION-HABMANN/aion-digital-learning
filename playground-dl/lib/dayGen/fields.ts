import type { RealField } from "@/lib/dayGen/model";
import type { GenExtra } from "@/store/dayTypesGen";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";

export const len = (t: string | undefined) => (t ?? "").trim().length;

/** The DOM id of a field (and of the parts of a frame), so the missing list and the page agree. */
export const fid = (id: string) => `gf-${id}`;

/** Is one field filled in? Complete means filled in, never correct. */
export function fieldComplete(f: RealField, x: GenExtra): boolean {
  switch (f.kind) {
    case "text":
      return len(x.text[f.id]) >= f.min;
    case "multi": {
      const n = (x.multi[f.id] ?? []).length;
      return f.exact ? n === f.exact : n >= (f.min ?? 1);
    }
    case "single":
      return !!x.single[f.id];
    case "assign": {
      const a = x.assign[f.id] ?? {};
      if (!f.items.every((i) => !!a[i.id])) return false;
      return !f.everyBin || f.bins.every((b) => f.items.some((i) => a[i.id] === b.id));
    }
    case "frame":
      return f.parts.every((p) => len(x.text[p.id]) >= p.min);
  }
}

/** The concrete missing entries of one field, every label starting “Block X.Y:” in both languages (CLAUDE.md #1, #34). */
export function fieldMissing(f: RealField, x: GenExtra, block: string, out: MissingEntry[]) {
  const e = (id: string, label: string) => out.push({ id, label });
  switch (f.kind) {
    case "text":
      if (len(x.text[f.id]) < f.min) e(fid(f.id), tt(`Block ${block}: ${f.missing} (at least ${f.min} characters).`, `Block ${block}: ${f.missing} (mindestens ${f.min} Zeichen).`));
      break;
    case "multi": {
      const n = (x.multi[f.id] ?? []).length;
      if (f.exact ? n !== f.exact : n < (f.min ?? 1)) {
        const need = f.exact ? tt(`exactly ${f.exact}`, `genau ${f.exact}`) : tt(`at least ${f.min ?? 1}`, `mindestens ${f.min ?? 1}`);
        e(fid(f.id), tt(`Block ${block}: ${f.missing} (${need}; you have ${n}).`, `Block ${block}: ${f.missing} (${need}; Sie haben ${n}).`));
      }
      break;
    }
    case "single":
      if (!x.single[f.id]) e(fid(f.id), `Block ${block}: ${f.missing}.`);
      break;
    case "assign": {
      const a = x.assign[f.id] ?? {};
      const open = f.items.filter((i) => !a[i.id]).length;
      if (open > 0) e(fid(f.id), tt(`Block ${block}: ${f.missing} (${open} of ${f.items.length} still without a section).`, `Block ${block}: ${f.missing} (${open} von ${f.items.length} noch ohne Bereich).`));
      else if (f.everyBin && !f.bins.every((b) => f.items.some((i) => a[i.id] === b.id))) e(fid(f.id), tt(`Block ${block}: ${f.missing} (use every section at least once).`, `Block ${block}: ${f.missing} (nutzen Sie jeden Bereich mindestens einmal).`));
      break;
    }
    case "frame":
      for (const p of f.parts) if (len(x.text[p.id]) < p.min) e(fid(p.id), tt(`Block ${block}: ${p.missing} (at least ${p.min} characters).`, `Block ${block}: ${p.missing} (mindestens ${p.min} Zeichen).`));
      break;
  }
}
