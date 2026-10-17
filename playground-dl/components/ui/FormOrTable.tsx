"use client";

import type { CSSProperties, ReactNode } from "react";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { Field } from "@/components/ui/Field";
import { tt } from "@/lib/lang";

export type FTItem = { id: string; label: string };
export type FTCol = { key: string; label: string };

/**
 * One answer per item (an option, a test) in two layouts the learner chooses between (CLAUDE.md #57): a box per item by default, and a table
 * (one row per item, one column per thing to say) through one quiet text link under the field, never a prominent button. Both layouts are kept
 * by the caller; only the chosen one counts. `rowId` gives every item a DOM id so the missing list can jump to it (#2).
 */
export function FormOrTable({
  id,
  label,
  help,
  mode,
  onMode,
  items,
  cols,
  text,
  rows,
  onText,
  onCell,
  rowId,
  firstCol,
  textRows = 3,
  children,
}: {
  id: string;
  label: ReactNode;
  help: ReactNode;
  mode: "text" | "table";
  onMode: (m: "text" | "table") => void;
  items: FTItem[];
  cols: FTCol[];
  text: Record<string, string>;
  rows: Record<string, Record<string, string>>;
  onText: (itemId: string, v: string) => void;
  onCell: (itemId: string, key: string, v: string) => void;
  rowId: (itemId: string) => string;
  firstCol: string;
  textRows?: number;
  children?: ReactNode;
}) {
  const template = { ["--ft-cols" as string]: `1.4fr repeat(${cols.length}, 1fr)` } as CSSProperties;
  return (
    <>
      <Field id={id} label={label} help={help}>
        <div className="space-y-2">
          {mode === "text" ? (
            items.map((it) => (
              <label key={it.id} id={rowId(it.id)} className="block">
                <span className="smallcaps text-ash">{it.label}</span>
                <AutoTextarea
                  className="mt-1"
                  minRows={textRows}
                  value={text[it.id] ?? ""}
                  onChange={(e) => onText(it.id, e.target.value)}
                  aria-label={it.label}
                />
              </label>
            ))
          ) : (
            <>
              <div className="smallcaps hidden gap-2 px-1 text-ash md:grid md:[grid-template-columns:var(--ft-cols)]" style={template} aria-hidden>
                <span>{firstCol}</span>
                {cols.map((c) => (
                  <span key={c.key}>{c.label}</span>
                ))}
              </div>
              {items.map((it) => (
                <div
                  key={it.id}
                  id={rowId(it.id)}
                  style={template}
                  className="grid gap-2 rounded-lg border border-line bg-canvas p-2 md:items-start md:border-0 md:bg-transparent md:p-0 md:[grid-template-columns:var(--ft-cols)]"
                >
                  <p className="text-caption font-semibold text-ink md:pt-2.5">{it.label}</p>
                  {cols.map((c) => (
                    <label key={c.key} className="block">
                      <span className="smallcaps text-ash md:sr-only">{`${it.label} · ${c.label}`}</span>
                      <AutoTextarea
                        className="mt-1 md:mt-0"
                        minRows={1}
                        value={rows[it.id]?.[c.key] ?? ""}
                        onChange={(e) => onCell(it.id, c.key, e.target.value)}
                        aria-label={`${it.label}: ${c.label}`}
                      />
                    </label>
                  ))}
                </div>
              ))}
            </>
          )}
          {children}
        </div>
      </Field>
      <p className="px-1 text-caption text-ash">
        <button type="button" onClick={() => onMode(mode === "text" ? "table" : "text")} className="underline decoration-dotted underline-offset-2 hover:text-ink">
          {mode === "text" ? tt("Prefer a table? Fill in rows instead.", "Lieber eine Tabelle? Dann in Zeilen ausfüllen.") : tt("Back to one box each.", "Zurück zu einem Feld je Eintrag.")}
        </button>{" "}
        {tt("Your answer in the other layout is kept.", "Ihre Antwort im anderen Layout bleibt erhalten.")}
      </p>
    </>
  );
}
