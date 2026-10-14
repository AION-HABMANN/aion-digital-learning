import type { GlossEntry } from "@/data/glossary";
import { GLOSSARY_DAY8 } from "@/data/glossaryDay8";
import { GLOSSARY_DAY9 } from "@/data/glossaryDay9";
import { GLOSSARY_DAY10 } from "@/data/glossaryDay10";
import { GLOSSARY_DAY11 } from "@/data/glossaryDay11";

/** The glossary entries of Days 8 to 16 (the generic days), one list per day, concatenated here. Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32). */
export const GLOSSARY_GEN: GlossEntry[] = [...GLOSSARY_DAY8, ...GLOSSARY_DAY9, ...GLOSSARY_DAY10, ...GLOSSARY_DAY11];
