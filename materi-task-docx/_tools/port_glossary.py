"""One-off: port the English fields of playground-dl/data/glossary.ts to glossary_day1.json."""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(HERE, "..", "..", "playground-dl", "data", "glossary.ts")
t = open(src, encoding="utf-8").read()
ents = re.split(r"\n  \{\n    id: ", t)[1:]


def g(field, s):
    m = re.search(r'\n    ' + field + r': "(.*?)",?\n', s, re.S)
    return m.group(1).replace('\\"', '"') if m else None


out = {}
for e in ents:
    id_ = re.match(r'"([^"]+)"', e).group(1)
    out[id_] = {"term": g("title", e), "plain": g("plain", e), "example": g("example", e), "from": g("from", e)}
print(len(out), list(out.keys()))
json.dump(out, open(os.path.join(HERE, "glossary_day1.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
