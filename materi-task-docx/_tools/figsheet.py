"""Montage the figures of one day into sheets for a quick look: python figsheet.py d2_ [per_sheet=4]"""
import glob
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
fd = os.path.join(HERE, "..", "_figures")
out = os.path.join(HERE, "..", "_work", "figsheet")
os.makedirs(out, exist_ok=True)
for f in glob.glob(os.path.join(out, "*.jpg")):
    os.remove(f)
pre = sys.argv[1]
per = int(sys.argv[2]) if len(sys.argv) > 2 else 4
files = sorted(glob.glob(os.path.join(fd, pre + "*.png")))
for k in range(0, len(files), per):
    ims = []
    for f in files[k:k + per]:
        im = Image.open(f).convert("RGB")
        r = 760 / im.width
        ims.append(im.resize((760, int(im.height * r))))
    cols = 2
    rows = (len(ims) + cols - 1) // cols
    rh = [max(i.height for i in ims[r * cols:(r + 1) * cols]) for r in range(rows)]
    sheet = Image.new("RGB", (cols * 770, sum(rh) + 10 * rows), "#888888")
    y = 0
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            if idx < len(ims):
                sheet.paste(ims[idx], (c * 770, y))
        y += rh[r] + 10
    sheet.save(os.path.join(out, f"{pre}{k // per + 1:02d}.jpg"), quality=85)
print(len(files), "figures")
