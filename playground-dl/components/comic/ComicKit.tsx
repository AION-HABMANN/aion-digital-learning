import type { ReactNode } from "react";

/**
 * Drawing kit for the story comics (CLAUDE.md #54). Pure SVG, no state, no sentences: all speech and captions are HTML in ComicModal. Colours
 * are hardcoded on purpose, a scene is a drawing and does not follow the page theme. Mock screens use their own neutral greys and the
 * blue only where the point needs it (#52, honest drawings). The cast is fictional and said to be so on screen.
 */
export type Kind = "lena" | "mia" | "daniel" | "md" | "trainer";
export type Face = "smile" | "neutral" | "shock" | "worry";
export type Arms = "none" | "up" | "right";

const BODY: Record<Kind, string> = { lena: "#1750A8", mia: "#0B6F69", daniel: "#556274", md: "#2A3849", trainer: "#B7791F" };
const SKIN: Record<Kind, string> = { lena: "#F2C9A5", mia: "#E9BE98", daniel: "#E0B38C", md: "#EBC7A2", trainer: "#D9A57E" };
const HAIR: Record<Kind, string> = { lena: "#4A2F20", mia: "#5A3A22", daniel: "#2C2C2A", md: "#B4B2A9", trainer: "#7A5A3A" };

export const INK = "#17212E";
export const BLUE = "#1750A8";
export const TEAL = "#0B6F69";
export const RUST = "#AD3F26";
export const GREY = "#8B97A8";
export const LINE = "#D5DEE9";
export const PAPER = "#FFFFFF";
export const SOFT = "#E3ECFA";
export const WOOD = "#A67C52";

/** A person drawn around the centre of the head (x, y). Standing full height with `legs`, otherwise a bust to the waist. */
export function Person({ kind, x, y, face = "neutral", s = 1.3, arms = "none", legs = false, flip = false }: { kind: Kind; x: number; y: number; face?: Face; s?: number; arms?: Arms; legs?: boolean; flip?: boolean }) {
  const body = BODY[kind];
  const hair = HAIR[kind];
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      {legs && (
        <>
          <rect x="-11" y="60" width="8" height="30" fill={INK} />
          <rect x="3" y="60" width="8" height="30" fill={INK} />
        </>
      )}
      {arms === "up" && (
        <>
          <line x1="-15" y1="26" x2="-27" y2="8" stroke={body} strokeWidth="7" strokeLinecap="round" />
          <line x1="15" y1="26" x2="27" y2="8" stroke={body} strokeWidth="7" strokeLinecap="round" />
        </>
      )}
      {arms === "right" && <line x1="15" y1="26" x2="40" y2="44" stroke={body} strokeWidth="7" strokeLinecap="round" />}
      {kind === "mia" && <path d="M-17 -4Q-20 24 -14 30L14 30Q20 24 17 -4Z" fill={hair} />}
      <rect x="-17" y="16" width="34" height="46" rx="9" fill={body} />
      {kind === "md" && <rect x="-2.5" y="16" width="5" height="26" fill={RUST} />}
      {kind === "lena" && <circle cx="0" cy="-17" r="6" fill={hair} />}
      <circle r="15" fill={SKIN[kind]} />
      {(kind === "lena" || kind === "mia") && <path d="M-16 2A16 16 0 0 1 16 2Q16 -6 0 -9Q-16 -6 -16 2Z" fill={hair} />}
      {(kind === "daniel" || kind === "trainer") && <path d="M-15 -3A15 15 0 0 1 15 -3Q8 -10 0 -9Q-8 -10 -15 -3Z" fill={hair} />}
      {kind === "md" && <path d="M-16 -1A16 16 0 0 1 16 -1Q10 -10 0 -10Q-10 -10 -16 -1Z" fill={hair} />}
      {face === "shock" ? (
        <>
          <circle cx="-5.5" cy="0" r="2.6" fill="#fff" stroke={INK} strokeWidth="0.8" />
          <circle cx="5.5" cy="0" r="2.6" fill="#fff" stroke={INK} strokeWidth="0.8" />
          <circle cx="-5.5" cy="0" r="1" fill={INK} />
          <circle cx="5.5" cy="0" r="1" fill={INK} />
        </>
      ) : (
        <>
          <circle cx="-5.5" cy="0" r="1.8" fill={INK} />
          <circle cx="5.5" cy="0" r="1.8" fill={INK} />
        </>
      )}
      {face === "smile" && <path d="M-5 6Q0 11 5 6" fill="none" stroke={INK} strokeWidth="1.5" />}
      {face === "neutral" && <path d="M-4 8H4" fill="none" stroke={INK} strokeWidth="1.5" />}
      {face === "worry" && <path d="M-4 9Q0 5 4 9" fill="none" stroke={INK} strokeWidth="1.5" />}
      {face === "shock" && <ellipse cx="0" cy="8" rx="3" ry="4" fill={INK} />}
      {kind === "daniel" && (
        <>
          <circle cx="-6" cy="0" r="4.6" fill="none" stroke={INK} strokeWidth="1" />
          <circle cx="6" cy="0" r="4.6" fill="none" stroke={INK} strokeWidth="1" />
        </>
      )}
    </g>
  );
}

export function Desk({ x, y, w, legs = 32 }: { x: number; y: number; w: number; legs?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height="10" fill={WOOD} />
      <rect x={x + 8} y={y + 10} width="6" height={legs} fill={WOOD} />
      <rect x={x + w - 14} y={y + 10} width="6" height={legs} fill={WOOD} />
    </>
  );
}

export function Floor({ y = 182 }: { y?: number }) {
  return <line x1="10" y1={y} x2="310" y2={y} stroke={LINE} strokeWidth="1" />;
}

export function Scene({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 190" role="img" aria-label={label} className="block h-auto w-full">
      <title>{label}</title>
      {children}
    </svg>
  );
}

/** A glyph row for a rating: three dots, `n` of them filled (1 = Low, 2 = Mid, 3 = High; the word always sits beside it). */
export function Dots({ x, y, n, color = BLUE }: { x: number; y: number; n: number; color?: string }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + i * 11} cy={y} r="4" fill={i < n ? color : "none"} stroke={color} strokeWidth="1.2" />
      ))}
    </>
  );
}

export function Check({ cx, cy, r = 14, color = TEAL }: { cx: number; cy: number; r?: number; color?: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <path d={`M${cx - r * 0.45} ${cy} L${cx - r * 0.1} ${cy + r * 0.38} L${cx + r * 0.5} ${cy - r * 0.35}`} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

export function Cross({ cx, cy, r = 12, color = RUST }: { cx: number; cy: number; r?: number; color?: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <path d={`M${cx - r * 0.4} ${cy - r * 0.4} L${cx + r * 0.4} ${cy + r * 0.4} M${cx + r * 0.4} ${cy - r * 0.4} L${cx - r * 0.4} ${cy + r * 0.4}`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </>
  );
}

export function Bubble({ x, y, w, h, children, think = false }: { x: number; y: number; w: number; h: number; children?: ReactNode; think?: boolean }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={think ? 16 : 8} fill="#fff" stroke={INK} strokeWidth="1" />
      {children}
    </>
  );
}

export function QMark({ x, y, size = 30, color = BLUE }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="700" fill={color}>
      ?
    </text>
  );
}

/* ------------------------------------------------------------------ mock screens (neutral greys, blue only where the point needs it) */

export type ScreenKind = "pretty" | "menu" | "goals" | "wall" | "orient" | "easy" | "progress" | "bank" | "quiz" | "list";

const bar = (x: number, y: number, w: number, fill = LINE, h = 4) => <rect x={x} y={y} width={w} height={h} rx="2" fill={fill} />;

/** A window with a title bar; `kind` picks what is drawn inside. Coordinates are the window's own, 0..w and 0..h under a 14-high title bar. */
export function Screen({ x, y, w, h, kind, hi = false }: { x: number; y: number; w: number; h: number; kind: ScreenKind; hi?: boolean }) {
  const top = 14;
  const ih = h - top;
  const body: ReactNode = (() => {
    switch (kind) {
      case "pretty":
        return (
          <>
            <rect x="6" y={top + 6} width={w - 12} height="12" rx="3" fill={BLUE} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={6 + i * ((w - 12) / 3)} y={top + 24} width={(w - 12) / 3 - 5} height={ih * 0.36} rx="4" fill={SOFT} stroke={BLUE} strokeWidth="0.8" />
            ))}
            <rect x={w - 44} y={h - 20} width="38" height="13" rx="4" fill={BLUE} />
          </>
        );
      case "menu":
        return (
          <>
            <rect x="5" y={top + 5} width={w * 0.3} height={ih - 10} rx="3" fill="#F3F6FA" stroke={LINE} />
            {Array.from({ length: 8 }, (_, i) => bar(10, top + 11 + i * ((ih - 24) / 8), w * 0.3 - 10, i === 0 ? GREY : LINE, 5))}
          </>
        );
      case "goals":
        return (
          <>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={6 + i * ((w - 12) / 3)} y={top + 8} width={(w - 12) / 3 - 5} height={ih - 18} rx="4" fill={i === 0 ? SOFT : "#F3F6FA"} stroke={i === 0 ? BLUE : LINE} strokeWidth={i === 0 ? 1.6 : 1} />
                {bar(11 + i * ((w - 12) / 3), top + 18, (w - 12) / 3 - 16, i === 0 ? BLUE : GREY, 5)}
                {bar(11 + i * ((w - 12) / 3), top + 30, (w - 12) / 3 - 24, LINE)}
              </g>
            ))}
          </>
        );
      case "wall":
        return (
          <>
            {Array.from({ length: Math.floor((ih - 12) / 8) }, (_, i) => bar(8, top + 8 + i * 8, i % 4 === 3 ? w - 40 : w - 16))}
          </>
        );
      case "orient":
        return (
          <>
            <rect x="0" y={top} width={w} height="14" fill="#F3F6FA" />
            {bar(8, top + 5, w * 0.5, GREY)}
            <rect x={w - 46} y={top + 2} width="40" height="10" rx="3" fill={BLUE} />
            {Array.from({ length: Math.floor((ih - 30) / 8) }, (_, i) => bar(8, top + 22 + i * 8, i % 4 === 3 ? w - 40 : w - 16))}
          </>
        );
      case "easy":
        return (
          <>
            {bar(8, top + 8, w * 0.5, INK, 6)}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                {bar(8, top + 22 + i * 16, w - 24)}
                {bar(8, top + 30 + i * 16, w * 0.55)}
              </g>
            ))}
            <rect x={w * 0.5} y={top + 20} width="34" height="9" rx="3" fill={SOFT} stroke={BLUE} strokeWidth="0.8" />
          </>
        );
      case "progress": {
        const wide = w >= 140;
        const step = wide ? (w - 16 - 62) / 8 : (w - 16) / 8;
        return (
          <>
            <rect x="0" y={top} width={w} height="14" fill="#F3F6FA" />
            {bar(8, top + 5, w * 0.5, GREY)}
            {bar(8, top + 22, w * 0.45, INK, 6)}
            {bar(8, top + 34, w - 24)}
            {bar(8, top + 42, w * 0.6)}
            <rect x="0" y={h - 22} width={w} height="22" fill="#F3F6FA" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={8 + i * step} y={h - 16} width={step - 3} height="6" rx="2" fill={i < 3 ? TEAL : LINE} />
            ))}
            {wide && <rect x={w - 58} y={h - 18} width="52" height="12" rx="3" fill={SOFT} stroke={BLUE} strokeWidth="0.8" />}
          </>
        );
      }
      case "bank":
        return (
          <>
            {bar(10, top + 10, w * 0.5, INK, 6)}
            {bar(10, top + 24, w * 0.7)}
            <rect x={10} y={h - 30} width={w - 20} height="18" rx="5" fill={BLUE} />
          </>
        );
      case "quiz":
        return (
          <>
            {bar(10, top + 8, w - 20, INK, 6)}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx="14" cy={top + 28 + i * 14} r="4" fill="none" stroke={GREY} strokeWidth="1.2" />
                {bar(24, top + 26 + i * 14, w * 0.55)}
              </g>
            ))}
          </>
        );
      case "list":
        return (
          <>
            {Array.from({ length: 4 }, (_, i) => (
              <g key={i}>
                <circle cx="14" cy={top + 14 + i * 14} r="4" fill={i === 3 ? RUST : GREY} />
                {bar(24, top + 12 + i * 14, w * 0.5, i === 3 ? RUST : LINE)}
              </g>
            ))}
          </>
        );
    }
  })();
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} rx="5" fill={PAPER} stroke={hi ? BLUE : GREY} strokeWidth={hi ? 2.2 : 1.4} />
      <rect width={w} height={top} rx="5" fill="#E6ECF4" />
      <rect y={top - 4} width={w} height="4" fill="#E6ECF4" />
      <circle cx="8" cy="7" r="2" fill={GREY} />
      <circle cx="15" cy="7" r="2" fill={GREY} />
      {body}
    </g>
  );
}
