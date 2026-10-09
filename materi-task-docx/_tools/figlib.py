"""
Small SVG drawing kit for the AION Digital Learning Word documents.
Draws diagrams as SVG (Ocean palette, CLAUDE.md #15) and renders them to PNG with cairosvg.
Colour is never the only channel: every state also has a label, a dash or a glyph.
"""
import html
import os

import cairosvg

INK = "#17212E"
ASH = "#556274"
PAPER = "#FFFFFF"
CANVAS = "#F3F6FA"
MIST = "#E6ECF4"
LINE = "#D5DEE9"
ACC = "#1750A8"
ACCSOFT = "#E3ECFA"
GOLD = "#4C8BE0"
SIG = "#0B6F69"
SIGSOFT = "#DCF0EE"
RUST = "#AD3F26"
RUSTSOFT = "#F8E4DE"
GREY = "#8793A3"
FONT = "Calibri, Arial, sans-serif"

FIG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_figures")


def est_w(text, size, bold=False):
    return len(text) * size * (0.53 if bold else 0.49)


def wrap(text, width, size, bold=False):
    out = []
    for para in str(text).split("\n"):
        cur = ""
        for w in para.split(" "):
            t = (cur + " " + w).strip()
            if cur and est_w(t, size, bold) > width:
                out.append(cur)
                cur = w
            else:
                cur = t
        out.append(cur)
    return out


class Canvas:
    def __init__(self, w, h, bg=None):
        self.w, self.h = w, h
        self.bg = bg
        self.parts = []

    def raw(self, s):
        self.parts.append(s)

    def rect(self, x, y, w, h, fill="none", stroke=None, sw=1.5, rx=6, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        self.raw(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}"{st}{d}/>')

    def circle(self, x, y, r, fill="none", stroke=None, sw=1.5, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        self.raw(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}"{st}{d}/>')

    def line(self, x1, y1, x2, y2, stroke=ASH, sw=1.5, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.raw(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke}" stroke-width="{sw}"{d}/>')

    def arrow(self, x1, y1, x2, y2, stroke=ASH, sw=2, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.raw(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke}" stroke-width="{sw}"{d} marker-end="url(#ar)"/>')

    def path(self, d, stroke=ASH, sw=2, fill="none", dash=None):
        dd = f' stroke-dasharray="{dash}"' if dash else ""
        self.raw(f'<path d="{d}" stroke="{stroke}" stroke-width="{sw}" fill="{fill}"{dd}/>')

    def text(self, x, y, t, size=15, weight="normal", anchor="start", fill=INK, italic=False):
        it = ' font-style="italic"' if italic else ""
        self.raw(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{FONT}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="{fill}"{it}>{html.escape(str(t))}</text>')

    def tb(self, x, y, w, t, size=15, weight="normal", fill=INK, anchor="start", lh=1.28, italic=False):
        """Wrapped text. y is the top of the block. Returns the bottom y."""
        lines = wrap(t, w, size, weight == "bold")
        cx = x if anchor == "start" else (x + w / 2 if anchor == "middle" else x + w)
        yy = y
        for ln in lines:
            yy += size * lh
            self.text(cx, yy - size * 0.28, ln, size, weight, anchor, fill, italic)
        return yy

    def tb_h(self, w, t, size=15, weight="normal", lh=1.28):
        return len(wrap(t, w, size, weight == "bold")) * size * lh

    def box(self, x, y, w, h, head=None, body=None, fill=ACCSOFT, stroke=ACC, dash=None, hs=15, bs=13.5, align="middle", pad=8, rx=8, hfill=INK, bfill=INK, sw=1.5):
        self.rect(x, y, w, h, fill, stroke, sw, rx, dash)
        iw = w - 2 * pad
        hh = self.tb_h(iw, head, hs, "bold") if head else 0
        bh = self.tb_h(iw, body, bs) if body else 0
        gap = 4 if head and body else 0
        top = y + max(pad - 2, (h - (hh + gap + bh)) / 2)
        yy = top
        if head:
            yy = self.tb(x + pad, yy, iw, head, hs, "bold", hfill, align)
        if body:
            self.tb(x + pad, yy + gap, iw, body, bs, "normal", bfill, align)

    def need_h(self, w, head=None, body=None, hs=15, bs=13.5, pad=8):
        iw = w - 2 * pad
        hh = self.tb_h(iw, head, hs, "bold") if head else 0
        bh = self.tb_h(iw, body, bs) if body else 0
        return hh + bh + (4 if head and body else 0) + 2 * pad + 2

    def marker(self, x, y, n, fill=ACC):
        self.circle(x, y, 11, fill, PAPER, 1.5)
        self.text(x, y + 5, str(n), 13, "bold", "middle", PAPER)

    def svg(self):
        bg = f'<rect width="{self.w}" height="{self.h}" fill="{self.bg}"/>' if self.bg else ""
        defs = f'<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{ASH}"/></marker></defs>'
        return f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">{defs}{bg}{"".join(self.parts)}</svg>'

    def save(self, name, scale=2):
        os.makedirs(FIG_DIR, exist_ok=True)
        path = os.path.join(FIG_DIR, name)
        cairosvg.svg2png(bytestring=self.svg().encode("utf-8"), write_to=path, scale=scale, background_color="white")
        return path


W = 760


# ------------------------------------------------------------------ generic generators

def chain(name, steps, title=None, note=None, hs=15, bs=13.5, fills=None):
    """Horizontal chain of boxes with arrows. steps = [(head, body)] or [(head, body, kind)] kind in {'a','s','r','g'}."""
    n = len(steps)
    gap = 26
    bw = (W - 20 - gap * (n - 1)) / n
    c0 = Canvas(W, 10)
    hmax = max(c0.need_h(bw, s[0], s[1] if len(s) > 1 else None, hs, bs) for s in steps)
    top = 12 + (28 if title else 0)
    h = top + hmax + 14 + (c0.tb_h(W - 20, note, 13) + 8 if note else 0)
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    pal = {"a": (ACCSOFT, ACC, None), "s": (SIGSOFT, SIG, None), "r": (RUSTSOFT, RUST, None), "g": (MIST, GREY, "5 3"), "m": (MIST, ASH, None)}
    for i, s in enumerate(steps):
        kind = s[2] if len(s) > 2 else (fills[i] if fills else "a")
        f, st, d = pal[kind]
        x = 10 + i * (bw + gap)
        c.box(x, top, bw, hmax, s[0], s[1] if len(s) > 1 else None, f, st, d, hs, bs)
        if i < n - 1:
            c.arrow(x + bw + 3, top + hmax / 2, x + bw + gap - 3, top + hmax / 2)
    if note:
        c.tb(10, top + hmax + 12, W - 20, note, 13, fill=ASH)
    return c.save(name)


def rows_chain(name, rows, heads=None, kinds=("a", "m", "s"), hs=15, bs=13.5, caption=None):
    """Rows of linked boxes: rows = [[a, b, c], ...] read left to right (e.g. experience -> behaviour -> number)."""
    ncol = len(rows[0])
    gap = 28
    bw = (W - 20 - gap * (ncol - 1)) / ncol
    c0 = Canvas(W, 10)
    rh = [max(c0.need_h(bw, None, cell, bs + 1.5, bs + 1.5) for cell in r) + 4 for r in rows]
    top = 14 + (26 if heads else 0)
    total = top + sum(rh) + 14 * (len(rows) - 1) + 14
    c = Canvas(W, total)
    pal = {"a": (ACCSOFT, ACC, None), "s": (SIGSOFT, SIG, None), "m": (MIST, ASH, "5 3"), "r": (RUSTSOFT, RUST, None)}
    if heads:
        for j, h in enumerate(heads):
            c.text(10 + j * (bw + gap), 24, h, 14, "bold", fill=ASH)
    y = top
    for i, r in enumerate(rows):
        for j, cell in enumerate(r):
            f, st, d = pal[kinds[j]]
            x = 10 + j * (bw + gap)
            c.box(x, y, bw, rh[i], None, cell, f, st, d, bs + 1.5, bs + 1.5, bfill=INK)
            if j < ncol - 1:
                c.arrow(x + bw + 3, y + rh[i] / 2, x + bw + gap - 3, y + rh[i] / 2)
        y += rh[i] + 14
    return c.save(name)


def layers(name, rows, title=None, bracket=None):
    """Stacked bands. rows = [(label, text, kind)]"""
    pal = {"a": (ACCSOFT, ACC, None), "s": (SIGSOFT, SIG, None), "r": (RUSTSOFT, RUST, None), "m": (MIST, ASH, None), "g": (PAPER, GREY, "5 3")}
    lw = 190
    c0 = Canvas(W, 10)
    hs = [max(c0.need_h(W - 30 - lw, None, r[1], 14, 14), c0.need_h(lw, r[0], None, 15, 14)) for r in rows]
    top = 14 + (26 if title else 0)
    h = top + sum(hs) + 10 * (len(rows) - 1) + 14
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    y = top
    for r, hh in zip(rows, hs):
        f, st, d = pal[r[2] if len(r) > 2 else "a"]
        c.rect(10, y, W - 20, hh, f, st, 1.5, 8, d)
        c.tb(20, y + (hh - c.tb_h(lw - 10, r[0], 15, "bold")) / 2, lw - 10, r[0], 15, "bold")
        c.line(10 + lw, y + 8, 10 + lw, y + hh - 8, st, 1)
        c.tb(10 + lw + 12, y + (hh - c.tb_h(W - 30 - lw - 14, r[1], 14)) / 2, W - 30 - lw - 14, r[1], 14)
        y += hh + 10
    return c.save(name)


def compare(name, left, right, rows, arrow=True, lkind="r", rkind="s", title=None, hs=15, bs=13.5):
    """Two columns side by side (before/after). rows = [(left_text, right_text)]. left/right are the column headings."""
    gap = 40
    cw = (W - 20 - gap) / 2
    c0 = Canvas(W, 10)
    rh = [max(c0.need_h(cw, None, a, bs, bs), c0.need_h(cw, None, b, bs, bs)) for a, b in rows]
    top = 14 + (26 if title else 0) + 34
    h = top + sum(rh) + 10 * len(rows) + 8
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    pal = {"a": (ACCSOFT, ACC, None), "s": (SIGSOFT, SIG, None), "r": (RUSTSOFT, RUST, None), "m": (MIST, ASH, None), "g": (PAPER, GREY, "5 3")}
    ty = 14 + (26 if title else 0)
    for x, hd, k in ((10, left, lkind), (10 + cw + gap, right, rkind)):
        f, st, d = pal[k]
        c.rect(x, ty, cw, 28, st, st, 1, 6)
        c.text(x + cw / 2, ty + 20, hd, 15, "bold", "middle", PAPER)
    y = top
    for (a, b), hh in zip(rows, rh):
        for x, t, k in ((10, a, lkind), (10 + cw + gap, b, rkind)):
            f, st, d = pal[k]
            c.box(x, y, cw, hh, None, t, f, st, d, bs, bs, align="start")
        if arrow:
            c.arrow(10 + cw + 6, y + hh / 2, 10 + cw + gap - 6, y + hh / 2)
        y += hh + 10
    return c.save(name)


def matrix(name, xl, yl, quads, points=(), xlow="Low", xhigh="High", ylow="Low", yhigh="High", title=None):
    """2x2 matrix. quads = (top-left, top-right, bottom-left, bottom-right) names. points = [(label, x 0-1, y 0-1)]"""
    pw, ph = 520, 330
    ox, oy = 150, 18 + (26 if title else 0)
    h = oy + ph + 70
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    fills = [MIST, PAPER, PAPER, MIST]
    names = quads
    for i in range(4):
        qx = ox + (i % 2) * pw / 2
        qy = oy + (i // 2) * ph / 2
        c.rect(qx, qy, pw / 2, ph / 2, fills[i], LINE, 1.5, 0)
        c.tb(qx + 8, qy + 6, pw / 2 - 16, names[i], 13.5, "bold", ASH)
    c.rect(ox, oy, pw, ph, "none", ASH, 2, 0)
    c.text(ox + pw / 2, oy + ph + 28, xl, 15, "bold", "middle")
    c.text(ox, oy + ph + 28, xlow, 13, anchor="start", fill=ASH)
    c.text(ox + pw, oy + ph + 28, xhigh, 13, anchor="end", fill=ASH)
    c.raw(f'<g transform="translate(36,{oy + ph / 2}) rotate(-90)"><text font-family="{FONT}" font-size="15" font-weight="bold" text-anchor="middle" fill="{INK}">{html.escape(yl)}</text></g>')
    c.text(ox - 10, oy + ph, ylow, 13, anchor="end", fill=ASH)
    c.text(ox - 10, oy + 14, yhigh, 13, anchor="end", fill=ASH)
    for k, (lab, px, py) in enumerate(points):
        x = ox + px * pw
        y = oy + (1 - py) * ph
        c.circle(x, y, 9, ACC, PAPER, 1.5)
        c.text(x, y + 4.5, lab[0], 12, "bold", "middle", PAPER)
        if px > 0.55:
            c.text(x - 14, y + 5, lab[1:].strip(), 13, anchor="end")
        else:
            c.text(x + 14, y + 5, lab[1:].strip(), 13)
    return c.save(name)


def cycle(name, nodes, center=None, title=None, kinds=None):
    """Circular loop of 3-6 nodes with arrows."""
    import math

    n = len(nodes)
    cx, cy, R = W / 2, 190 + (14 if title else 0), 140
    c = Canvas(W, 400 + (14 if title else 0))
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    bw, bh = 190, 60
    pos = []
    for i in range(n):
        a = -math.pi / 2 + i * 2 * math.pi / n
        pos.append((cx + R * 1.45 * math.cos(a), cy + R * 0.95 * math.sin(a)))
    pal = {"a": (ACCSOFT, ACC), "s": (SIGSOFT, SIG), "r": (RUSTSOFT, RUST), "m": (MIST, ASH)}
    for i in range(n):
        x1, y1 = pos[i]
        x2, y2 = pos[(i + 1) % n]
        # shorten the arrow so it ends at the box edges
        dx, dy = x2 - x1, y2 - y1
        L = math.hypot(dx, dy)
        ux, uy = dx / L, dy / L
        def edge(ux, uy):
            tx = (bw / 2 + 4) / abs(ux) if abs(ux) > 1e-6 else 1e9
            ty = (bh / 2 + 4) / abs(uy) if abs(uy) > 1e-6 else 1e9
            return min(tx, ty)
        s = edge(ux, uy)
        c.arrow(x1 + ux * s, y1 + uy * s, x2 - ux * s, y2 - uy * s, ASH, 2)
    for i, (head, body) in enumerate(nodes):
        x, y = pos[i]
        k = kinds[i] if kinds else "a"
        f, st = pal[k]
        c.box(x - bw / 2, y - bh / 2, bw, bh, head, body, f, st, None, 15, 12.5)
    if center:
        c.tb(cx - 90, cy - 14, 180, center, 15, "bold", ASH, "middle")
    return c.save(name)


def bars(name, items, unit="", title=None, maxv=None, note=None, kinds=None):
    """Horizontal bars. items = [(label, value, caption)]"""
    maxv = maxv or max(v for _, v, *_ in items) * 1.15
    lw, bw = 250, 330
    rh = 40
    h = 14 + (26 if title else 0) + rh * len(items) + (36 if note else 12)
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    y = 14 + (26 if title else 0)
    pal = {"a": ACC, "s": SIG, "r": RUST, "m": GREY}
    for i, it in enumerate(items):
        lab, v = it[0], it[1]
        cap = it[2] if len(it) > 2 else f"{v}{unit}"
        k = kinds[i] if kinds else "a"
        c.tb(10, y + 4, lw - 12, lab, 14, anchor="end")
        c.rect(10 + lw, y + 6, bw, 24, MIST, None, 0, 4)
        c.rect(10 + lw, y + 6, max(2, bw * v / maxv), 24, pal[k], None, 0, 4)
        c.text(10 + lw + bw + 10, y + 24, cap, 14, "bold")
        y += rh
    if note:
        c.tb(10, y + 4, W - 20, note, 13, fill=ASH)
    return c.save(name)


def tree(name, root, kids, title=None, notes=None):
    """Information-architecture tree: root text, kids = [(label, [children...])]"""
    n = len(kids)
    gap = 12
    cw = (W - 20 - gap * (n - 1)) / n
    c0 = Canvas(W, 10)
    top = 14 + (26 if title else 0)
    rh = 46
    ch = max(sum(c0.need_h(cw - 10, None, k, 13, 13) + 6 for k in kk) for _, kk in kids)
    h = top + rh + 40 + 46 + ch + 20
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    c.box(W / 2 - 110, top, 220, rh, root, None, INK, INK, None, 16, 13, hfill=PAPER)
    ty = top + rh + 20
    c.line(W / 2, top + rh, W / 2, ty, ASH, 1.5)
    xs = [10 + i * (cw + gap) + cw / 2 for i in range(n)]
    c.line(xs[0], ty, xs[-1], ty, ASH, 1.5)
    for i, (lab, kk) in enumerate(kids):
        x = 10 + i * (cw + gap)
        c.line(xs[i], ty, xs[i], ty + 20, ASH, 1.5)
        c.box(x, ty + 20, cw, 46, lab, None, ACCSOFT, ACC, None, 14, 13)
        y = ty + 76
        for k in kk:
            hh = c.need_h(cw - 10, None, k, 13, 13)
            c.box(x + 5, y, cw - 10, hh, None, k, PAPER, GREY, None, 13, 13)
            y += hh + 6
    return c.save(name)


def journey(name, phases, emotion, notes, title=None, low_label="frustrated", high_label="motivated"):
    """User-journey map: phases across, an emotion curve (1-5), notes (pain points / actions) under each phase."""
    n = len(phases)
    cw = (W - 20) / n
    c0 = Canvas(W, 10)
    nh = max(c0.need_h(cw - 8, None, t, 12.5, 12.5) for t in notes)
    top = 14 + (26 if title else 0)
    curve_h = 150
    h = top + 40 + curve_h + 14 + nh + 14
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    for i, p in enumerate(phases):
        x = 10 + i * cw
        c.rect(x + 2, top, cw - 4, 32, ACC, None, 0, 6)
        c.text(x + cw / 2, top + 21, p, 14, "bold", "middle", PAPER)
    cy0 = top + 40
    c.rect(10, cy0, W - 20, curve_h, CANVAS, LINE, 1, 4)
    c.text(16, cy0 + 16, high_label, 12, fill=ASH)
    c.text(16, cy0 + curve_h - 6, low_label, 12, fill=ASH)
    c.line(10, cy0 + curve_h / 2, W - 10, cy0 + curve_h / 2, LINE, 1, "4 4")
    pts = []
    for i, e in enumerate(emotion):
        x = 10 + i * cw + cw / 2
        y = cy0 + curve_h - 18 - (e - 1) / 4 * (curve_h - 40)
        pts.append((x, y))
    c.path("M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts), ACC, 2.5)
    for (x, y), e in zip(pts, emotion):
        c.circle(x, y, 7, PAPER, ACC, 2.5)
    ny = cy0 + curve_h + 14
    for i, t in enumerate(notes):
        x = 10 + i * cw
        c.box(x + 2, ny, cw - 4, nh, None, t, PAPER, GREY, None, 12.5, 12.5, align="start", pad=6)
    return c.save(name)


def venn3(name, labels, bodies, center=None, title=None):
    c = Canvas(W, 400 + (14 if title else 0))
    oy = 14 + (26 if title else 0)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    r = 118
    cx, cy = W / 2, oy + 175
    pts = [(cx, cy - 62), (cx - 78, cy + 52), (cx + 78, cy + 52)]
    fills = [ACCSOFT, SIGSOFT, MIST]
    strokes = [ACC, SIG, ASH]
    for (x, y), f, s in zip(pts, fills, strokes):
        c.raw(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{f}" fill-opacity="0.6" stroke="{s}" stroke-width="2"/>')
    c.tb(cx - 70, oy + 12, 140, labels[0], 15, "bold", anchor="middle")
    c.tb(cx - 70, oy + 22 + 20, 140, bodies[0], 12.5, anchor="middle", fill=INK)
    c.tb(cx - 195, cy + 70, 130, labels[1], 15, "bold", anchor="middle")
    c.tb(cx - 195, cy + 70 + 22, 130, bodies[1], 12.5, anchor="middle")
    c.tb(cx + 65, cy + 70, 130, labels[2], 15, "bold", anchor="middle")
    c.tb(cx + 65, cy + 70 + 22, 130, bodies[2], 12.5, anchor="middle")
    if center:
        c.tb(cx - 50, cy - 8, 100, center, 13.5, "bold", anchor="middle")
    return c.save(name)


def stackbar(name, segments, total_label, title=None, note=None, cap=None):
    """One horizontal bar split into segments; segments=[(label, share 0-1, kind, body)]; optional capacity marker line."""
    pal = {"a": (ACC, PAPER), "s": (SIG, PAPER), "r": (RUST, PAPER), "m": (GREY, PAPER)}
    bw = W - 20
    top = 14 + (26 if title else 0)
    c0 = Canvas(W, 10)
    legh = max(c0.need_h(bw / len(segments) - 10, s[0], s[3], 14, 12.5) for s in segments)
    h = top + 70 + 24 + legh + 16 + (c0.tb_h(W - 20, note, 13) + 10 if note else 0)
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    x = 10
    for lab, sh, k, body in segments:
        w = bw * sh
        c.rect(x, top + 20, w, 44, pal[k][0], PAPER, 2, 0)
        c.text(x + w / 2, top + 48, f"{int(round(sh * 100))}%", 15, "bold", "middle", PAPER)
        x += w
    c.text(10, top + 14, total_label, 13, fill=ASH)
    if cap:
        cx = 10 + bw * cap[0]
        c.line(cx, top + 8, cx, top + 74, INK, 2.5, "6 4")
        c.text(cx, top + 88, cap[1], 13, "bold", "middle")
    ly = top + 100
    lw = bw / len(segments)
    for i, (lab, sh, k, body) in enumerate(segments):
        c.box(10 + i * lw + 3, ly, lw - 6, legh, lab, body, PAPER, pal[k][0], None, 14, 12.5)
    if note:
        c.tb(10, ly + legh + 10, W - 20, note, 13, fill=ASH)
    return c.save(name)


# ------------------------------------------------------------------ mock platform screens

def device(c, x, y, w, h, title="", mobile=False):
    c.rect(x, y, w, h, PAPER, GREY, 2, 10 if mobile else 6)
    if not mobile:
        c.rect(x, y, w, 18, MIST, GREY, 2, 6)
        c.circle(x + 10, y + 9, 3, GREY)
        c.circle(x + 20, y + 9, 3, GREY)
        c.circle(x + 30, y + 9, 3, GREY)
        if title:
            c.text(x + 44, y + 13, title, 11, fill=ASH)
    else:
        c.rect(x + w / 2 - 22, y + 5, 44, 5, GREY, None, 0, 3)


def label(c, x, y, w, text, size=13.5, bold=True):
    c.tb(x, y, w, text, size, "bold" if bold else "normal", INK, "middle")


def ui_lines(c, x, y, w, n, widths=(1.0, 0.96, 1.0, 0.9, 1.0, 0.98, 1.0, 0.93, 1.0, 0.97, 0.6), fill=GREY, h=4, gap=4.5):
    for i in range(n):
        ww = w * widths[i % len(widths)]
        c.rect(x, y + i * (h + gap), ww, h, fill, None, 0, 2)
    return y + n * (h + gap)


def ui_tiles(c, x, y, w, rows, cols, h=24, gap=5, fill=MIST, stroke=GREY):
    tw = (w - gap * (cols - 1)) / cols
    for r in range(rows):
        for k in range(cols):
            c.rect(x + k * (tw + gap), y + r * (h + gap), tw, h, fill, stroke, 1, 3)
    return y + rows * (h + gap)


def ui_button(c, x, y, w, h, text, primary=False, size=11):
    c.rect(x, y, w, h, ACC if primary else MIST, ACC if primary else GREY, 1, 4)
    c.text(x + w / 2, y + h / 2 + size * 0.35, text, size, "bold" if primary else "normal", "middle", PAPER if primary else INK)


def ui_bar(c, x, y, w, frac, h=8, fill=SIG):
    c.rect(x, y, w, h, LINE, None, 0, 4)
    c.rect(x, y, w * frac, h, fill, None, 0, 4)


def screens(name, specs, title=None, cap_h=22, sw=None, sh=190):
    """Row (or two rows) of device frames. specs=[(caption, draw(c, x, y, w, h))]. Hotspots are drawn by the draw functions."""
    n = len(specs)
    per_row = n if n <= 4 else (n + 1) // 2
    rows = (n + per_row - 1) // per_row
    gap = 14
    w = (W - 20 - gap * (per_row - 1)) / per_row
    top = 12 + (26 if title else 0)
    h = top + rows * (sh + cap_h + 14) + 4
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    for i, (cap, draw) in enumerate(specs):
        r, k = divmod(i, per_row)
        x = 10 + k * (w + gap)
        y = top + r * (sh + cap_h + 14)
        device(c, x, y, w, sh, "", False)
        draw(c, x, y + 18, w, sh - 18)
        c.text(x + w / 2, y + sh + 17, cap, 14, "bold", "middle")
    return c.save(name)


def budget_bands(name, items, limit, bands, unit="€", title=None, note=None, maxv=None):
    """Bars of costs against a budget line; background bands show the effort rule. items=[(label, value)];
    bands=[(upper_bound_or_None, label)] e.g. [(10000,'Low'),(15000,'Mid'),(None,'High')]"""
    maxv = maxv or max(limit, max(v for _, v in items)) * 1.12
    lw, bw = 230, 440
    x0 = 10 + lw
    rh = 42
    top = 14 + (26 if title else 0) + 30
    h = top + rh * len(items) + 30 + (28 if note else 0)
    c = Canvas(W, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    lo = 0
    fills = [SIGSOFT, ACCSOFT, RUSTSOFT]
    for k, (ub, lab) in enumerate(bands):
        hi = ub if ub is not None else maxv
        xa, xb = x0 + bw * lo / maxv, x0 + bw * min(hi, maxv) / maxv
        c.rect(xa, top - 6, xb - xa, rh * len(items) + 6, fills[k % 3], None, 0, 0)
        c.text((xa + xb) / 2, top - 12, f"Effort {lab}", 12.5, "bold", "middle", ASH)
        lo = hi
    y = top
    for lab, v in items:
        c.tb(10, y + 6, lw - 12, lab, 14, anchor="end")
        c.rect(x0, y + 8, bw * v / maxv, 24, ACC, None, 0, 4)
        lab_txt = f"{unit}{v:,.0f}"
        bar_end = x0 + bw * v / maxv
        if bw * v / maxv > 90:
            c.text(bar_end - 8, y + 26, lab_txt, 14, "bold", "end", PAPER)
        else:
            c.text(bar_end + 8, y + 26, lab_txt, 14, "bold")
        y += rh
    lx = x0 + bw * limit / maxv
    c.line(lx, top - 6, lx, y + 6, INK, 2.5, "6 4")
    c.text(lx, y + 24, f"Budget {unit}{limit:,.0f}", 13.5, "bold", "middle")
    if note:
        c.tb(10, y + 32, W - 20, note, 13, fill=ASH)
    return c.save(name)


def frame4(name, decide, unknown, reverse, giveup, who, evidence, h1=168):
    """The four parts of a decision under uncertainty plus the rule for future decisions (Materi B3 of every day)."""
    c = Canvas(W, h1 + 180)
    boxes = [("I decide", decide, ACCSOFT, ACC), ("I do not know", unknown, ACCSOFT, ACC), ("I reverse if", reverse, ACCSOFT, ACC), ("I give up", giveup, RUSTSOFT, RUST)]
    bw = (W - 20 - 3 * 12) / 4
    for i, (a, b, f, s) in enumerate(boxes):
        c.box(10 + i * (bw + 12), 12, bw, h1, a, b, f, s, None, 16, 13.5)
    c.text(10, h1 + 36, "The rule for future UX decisions", 14, "bold", fill=ASH)
    bw2 = (W - 20 - 12) / 2
    for i, (a, b) in enumerate((("Who decides", who), ("On what evidence", evidence))):
        c.box(10 + i * (bw2 + 12), h1 + 48, bw2, 100, a, b, SIGSOFT, SIG, None, 16, 14)
    return c.save(name)


def numbered_list(name, items, title=None, w=W):
    """Simple labelled list figure (e.g. a menu) with numbered markers: items=[(n, text)]"""
    rh = 34
    h = 14 + (26 if title else 0) + rh * len(items) + 8
    c = Canvas(w, h)
    if title:
        c.text(10, 26, title, 15, "bold", fill=ASH)
    y = 14 + (26 if title else 0)
    for n, t in items:
        c.marker(26, y + 14, n)
        c.tb(48, y + 3, w - 60, t, 14)
        y += rh
    return c.save(name)
