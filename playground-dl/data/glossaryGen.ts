import type { GlossEntry } from "@/data/glossary";
import { GLOSSARY_DAY8 } from "@/data/glossaryDay8";
import { GLOSSARY_DAY9 } from "@/data/glossaryDay9";
import { GLOSSARY_DAY10 } from "@/data/glossaryDay10";
import { GLOSSARY_DAY11 } from "@/data/glossaryDay11";
import { GLOSSARY_DAY12 } from "@/data/glossaryDay12";
import { GLOSSARY_DAY13 } from "@/data/glossaryDay13";
import { GLOSSARY_DAY14 } from "@/data/glossaryDay14";
import { GLOSSARY_DAY15 } from "@/data/glossaryDay15";
import { GLOSSARY_DAY16 } from "@/data/glossaryDay16";

/** The glossary entries of Days 8 to 16 (the generic days), one list per day, concatenated here. Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32). */
export const GLOSSARY_GEN: GlossEntry[] = [...GLOSSARY_DAY8, ...GLOSSARY_DAY9, ...GLOSSARY_DAY10, ...GLOSSARY_DAY11, ...GLOSSARY_DAY12, ...GLOSSARY_DAY13, ...GLOSSARY_DAY14, ...GLOSSARY_DAY15, ...GLOSSARY_DAY16];
