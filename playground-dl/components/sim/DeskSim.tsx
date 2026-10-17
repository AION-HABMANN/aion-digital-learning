"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * The desk of the Level 3 role (CLAUDE.md #60): an inbox of the messages the plan's framework implies, and one table of what the platform records. It prints no
 * figure the plan does not print and adds no hint, no verdict and no recommendation. Own colours, never the site's blue, teal and rust.
 */
export type DeskMessage = { from: string; subject: string; body: string[] };
export type DeskTable = { title: string; head: [string, string]; rows: [string, string][] };

export function DeskSim({ mailbox, messages, table }: { mailbox: string; messages: DeskMessage[]; table?: DeskTable }) {
  const [open, setOpen] = useState(0);
  const m = messages[open];
  return (
    <div className="text-[#26323F]">
      <div className="bg-[#4A4458] px-4 py-2 text-[14px] font-semibold text-white">{mailbox}</div>
      <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
        <ul className="border-b border-[#D9D5E2] md:border-b-0 md:border-r" aria-label={tt("Messages", "Nachrichten")}>
          {messages.map((x, i) => (
            <li key={i}>
              <button type="button" onClick={() => setOpen(i)} aria-current={open === i} className={clsx("block min-h-[48px] w-full px-3 py-2 text-left", open === i ? "bg-[#E9E6F0]" : "hover:bg-[#F4F2F7]")}>
                <span className="block text-[12px] text-[#5F5E5A]">{x.from}</span>
                <span className="block text-[14px] font-semibold">{x.subject}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-2 px-4 py-4" aria-live="polite">
          <p className="text-[12px] text-[#5F5E5A]">{m.from}</p>
          <h3 className="text-[16px] font-semibold">{m.subject}</h3>
          {m.body.map((p, i) => (
            <p key={i} className="max-w-prose text-[14px] leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
      {table && (
        <div className="border-t border-[#D9D5E2] px-4 py-3">
          <h3 className="mb-1 text-[14px] font-semibold">{table.title}</h3>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F4F2F7] text-left">
                <th className="px-2 py-1">{table.head[0]}</th>
                <th className="px-2 py-1">{table.head[1]}</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map(([a, b]) => (
                <tr key={a} className="border-t border-[#E4E0EC]">
                  <td className="px-2 py-1">{a}</td>
                  <td className="px-2 py-1">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
