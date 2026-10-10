"use client";

import { tt } from "@/lib/lang";

/**
 * A priority order: the first is the most important. Each row moves up or down with two buttons (40 px tall, keyboard-operable), so no
 * drag is needed. The names come from the caller, already in the active language.
 */
export function OrderList<T extends string>({ order, name, onMove }: { order: T[]; name: (id: T) => string; onMove: (id: T, dir: -1 | 1) => void }) {
  return (
    <ol className="space-y-1.5">
      {order.map((id, i) => (
        <li key={id} className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-1.5">
          <span className="tnum w-5 font-bold text-ash">{i + 1}</span>
          <span className="min-w-0 flex-1 text-ink">{name(id)}</span>
          <button type="button" aria-label={tt(`Move ${name(id)} up`, `${name(id)} nach oben`)} onClick={() => onMove(id, -1)} className="btn-ghost btn-sm" aria-disabled={i === 0}>
            ↑
          </button>
          <button type="button" aria-label={tt(`Move ${name(id)} down`, `${name(id)} nach unten`)} onClick={() => onMove(id, 1)} className="btn-ghost btn-sm" aria-disabled={i === order.length - 1}>
            ↓
          </button>
        </li>
      ))}
    </ol>
  );
}
