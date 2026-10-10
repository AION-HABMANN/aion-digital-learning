"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import type { Persisted } from "@/store/useStore";

/** The persisted slice as one stable object — for the pure helpers (missing lists, export bodies) that take it whole. */
export function usePersisted(): Persisted {
  const participant = useStore((s) => s.participant);
  const ui = useStore((s) => s.ui);
  const d1 = useStore((s) => s.d1);
  const d2 = useStore((s) => s.d2);
  const d3 = useStore((s) => s.d3);
  return useMemo(() => ({ participant, ui, d1, d2, d3 }), [participant, ui, d1, d2, d3]);
}
