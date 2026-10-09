"""Make contact sheets (several page images side by side) from a preview folder: python contact.py <dir> [per_sheet=4]"""
import glob
import os
import sys

from PIL import Image

d = sys.argv[1]
per = int(sys.argv[2]) if len(sys.argv) > 2 else 4
pages = sorted(glob.glob(os.path.join(d, "pg-*.jpg")))
for f in glob.glob(os.path.join(d, "sheet-*.jpg")):
    os.remove(f)
for k in range(0, len(pages), per):
    ims = [Image.open(p) for p in pages[k:k + per]]
    w = sum(i.width for i in ims) + 10 * (len(ims) - 1)
    h = max(i.height for i in ims)
    sheet = Image.new("RGB", (w, h), "#888888")
    x = 0
    for i in ims:
        sheet.paste(i, (x, 0))
        x += i.width + 10
    sheet.save(os.path.join(d, f"sheet-{k // per + 1:02d}.jpg"), quality=85)
print(len(pages), "pages ->", (len(pages) + per - 1) // per, "sheets")
