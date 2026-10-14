"use client";

import type { ReactNode } from "react";
import { MeasureThumb as D5Thumb } from "@/components/day5/mocks";
import type { MeasureKind as D5Kind } from "@/components/day5/mocks";
import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, MiniPage, Person, Svg, Thumb, Txt, Marker } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 7 (CLAUDE.md #52): the four InclusiveLearn screens of the task with their numbered markers, the people and screens of the cards
 * (the persona spectrum, the four principles, a drag-only and a keyboard-ready quiz, a hard and a plain sign-up screen) and a thumbnail for every measure of the
 * cards and the two tasks. Mock screens use their own neutral greys, plus colour only where the problem needs it (a pale grey text, a red and green dot); the
 * site's blue, teal and rust never colour the evidence (#15, #49).
 */

const RED = "#B3382A";
const GREEN = "#2F7D4F";
const PALE = "#B4B4B4";

/* ------------------------------------------------------------------ the Task 1 evidence: four InclusiveLearn screens, eight facts */

export type IlScreen = "course" | "video" | "quiz" | "signup";

export function InclusiveScreen({ kind }: { kind: IlScreen }) {
  const label =
    kind === "course"
      ? tt("InclusiveLearn course page: pale small body text, lessons with only a red or green dot, and a tiny Next button next to Back", "InclusiveLearn-Kursseite: blasser kleiner Fließtext, Lektionen nur mit rotem oder grünem Punkt und ein winziger Weiter-Button neben Zurück")
      : kind === "video"
        ? tt("InclusiveLearn video lesson: a video player with a sound icon and no captions and no transcript", "InclusiveLearn-Videolektion: ein Videoplayer mit Tonsymbol, ohne Untertitel und ohne Transkript")
        : kind === "quiz"
          ? tt("InclusiveLearn quiz: three items to drag onto three boxes, and no other way to answer", "InclusiveLearn-Quiz: drei Elemente, die in drei Kästen gezogen werden, und kein anderer Antwortweg")
          : tt("InclusiveLearn sign-up: step 3 of 14, long legal sentences, and an error that reads only Error 4011", "InclusiveLearn-Anmeldung: Schritt 3 von 14, lange juristische Sätze und ein Fehler, der nur „Fehler 4011“ lautet");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "course" && (
          <>
            <Txt x={14} y={30} size={9.5} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x="14" y={37 + i * 5.2} width={i === 5 ? 120 : 200} height="2.4" rx="1.2" fill={PALE} />
            ))}
            {[
              [tt("Lesson 1", "Lektion 1"), GREEN],
              [tt("Lesson 2", "Lektion 2"), RED],
              [tt("Lesson 3", "Lektion 3"), GREEN],
            ].map(([s, c], i) => (
              <g key={i}>
                <circle cx="22" cy={84 + i * 14} r="4.2" fill={c} />
                <Txt x={32} y={87 + i * 14} size={7.5}>{s}</Txt>
              </g>
            ))}
            <rect x="150" y="136" width="30" height="14" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.2" />
            <Txt x={165} y={146} size={7} anchor="middle">{tt("Back", "Zurück")}</Txt>
            <rect x="183" y="139" width="9" height="9" rx="1.5" fill={DARK} />
            <Marker x={216} y={44} n={1} />
            <Marker x={116} y={98} n={3} />
            <Marker x={208} y={124} n={4} />
          </>
        )}
        {kind === "video" && (
          <>
            <rect x="14" y="26" width="212" height="102" rx="4" fill="#4A4A4A" />
            <polygon points="108,62 108,92 134,77" fill="#FFFFFF" />
            <rect x="22" y="112" width="196" height="4" rx="2" fill="#7A7A7A" />
            <rect x="22" y="112" width="70" height="4" rx="2" fill="#FFFFFF" />
            <polygon points="26,134 32,134 38,129 38,147 32,142 26,142" fill={DARK} />
            <path d="M42 133 q5 6 0 12 M46 130 q8 9 0 18" fill="none" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
            <Txt x={56} y={144} size={7.5}>{tt("Lesson 4 · Video · 12:30", "Lektion 4 · Video · 12:30")}</Txt>
            <Marker x={216} y={40} n={2} />
          </>
        )}
        {kind === "quiz" && (
          <>
            <Txt x={14} y={30} size={9.5} bold>{tt("Quiz: put the steps in order", "Quiz: bringen Sie die Schritte in Ordnung")}</Txt>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="14" y={42 + i * 22} width="74" height="16" rx="3" fill="#E2E2E2" stroke={LINE} />
                <circle cx="22" cy={47 + i * 22} r="1.1" fill={DARK} />
                <circle cx="22" cy={53 + i * 22} r="1.1" fill={DARK} />
                <Txt x={30} y={53 + i * 22} size={7.5}>{[tt("Prepare", "Vorbereiten"), tt("Offer", "Anbieten"), tt("Agree", "Einigen")][i]}</Txt>
                <rect x="138" y={42 + i * 22} width="88" height="16" rx="3" fill="#FFFFFF" stroke={LINE} strokeDasharray="4 3" />
                <Txt x={182} y={53 + i * 22} size={7} anchor="middle" fill="#888888">{tt("drop here", "hier ablegen")}</Txt>
              </g>
            ))}
            <Arrow x1={92} y1={50} x2={134} y2={72} dash="4 3" />
            <rect x="80" y="124" width="80" height="18" rx="4" fill={DARK} />
            <Txt x={120} y={136} size={8} anchor="middle" fill="#FFFFFF">{tt("Submit", "Absenden")}</Txt>
            <Marker x={116} y={100} n={5} />
          </>
        )}
        {kind === "signup" && (
          <>
            <Txt x={14} y={30} size={9} bold>{tt("Sign up · step 3 of 14", "Anmeldung · Schritt 3 von 14")}</Txt>
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={i} x={14 + i * 15.2} y="36" width="13" height="4" rx="2" fill={i < 3 ? DARK : LITE} />
            ))}
            <Txt x={14} y={54} size={6.6}>{tt("Notwithstanding the foregoing, the user hereby irrevocably", "Ungeachtet des Vorstehenden erklärt sich der Nutzer hiermit unwiderruflich")}</Txt>
            <Txt x={14} y={63} size={6.6}>{tt("consents, to the extent permitted by applicable law, that", "im Rahmen des gesetzlich Zulässigen damit einverstanden, dass")}</Txt>
            <Lines x={14} y={70} n={4} w={212} gap={7} fill={MID} />
            <rect x="14" y="108" width="212" height="22" rx="3" fill="#FFFFFF" stroke={RED} strokeWidth="1.4" />
            <Txt x={22} y={123} size={9} bold fill={RED}>{tt("Error 4011", "Fehler 4011")}</Txt>
            <rect x="170" y="138" width="56" height="16" rx="4" fill={DARK} />
            <Txt x={198} y={149} size={8} anchor="middle" fill="#FFFFFF">{tt("Next", "Weiter")}</Txt>
            <Marker x={216} y={30} n={6} />
            <Marker x={216} y={78} n={7} />
            <Marker x={198} y={114} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · the persona spectrum: one feature, three people */

export type SpectrumFeature = "captions" | "keyboard" | "contrast";
export type SpectrumKind = "permanent" | "temporary" | "situational";

/** A small screen that shows the feature, drawn at the top of the spectrum picture. */
export function FeatureScreen({ feature }: { feature: SpectrumFeature }) {
  const label =
    feature === "captions"
      ? tt("A video with a caption bar under it", "Ein Video mit einer Untertitelleiste darunter")
      : feature === "keyboard"
        ? tt("A quiz with a focus frame on one answer and a Tab key hint", "Ein Quiz mit Fokusrahmen auf einer Antwort und einem Tab-Tastenhinweis")
        : tt("Text with a strong contrast against its background", "Text mit starkem Kontrast zum Hintergrund");
  return (
    <Svg viewBox="0 0 200 110" label={label}>
      <rect x="1" y="1" width="198" height="108" rx="5" fill="#F6F6F6" stroke={MID} />
      {feature === "captions" && (
        <>
          <rect x="16" y="12" width="168" height="70" rx="4" fill="#4A4A4A" />
          <polygon points="92,34 92,56 110,45" fill="#FFFFFF" />
          <rect x="30" y="64" width="140" height="14" rx="2" fill="#000000" opacity="0.8" />
          <Txt x={100} y={74} size={7.5} anchor="middle" fill="#FFFFFF">{tt("So, let us start with the offer.", "Beginnen wir also mit dem Angebot.")}</Txt>
          <Lines x={16} y={92} n={2} w={168} gap={7} fill={MID} />
        </>
      )}
      {feature === "keyboard" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="22" y={14 + i * 24} width="120" height="18" rx="3" fill="#FFFFFF" stroke={LINE} />
              <Txt x={30} y={26 + i * 24} size={8}>{[tt("Option A", "Option A"), tt("Option B", "Option B"), tt("Option C", "Option C")][i]}</Txt>
            </g>
          ))}
          <rect x="19" y="35" width="126" height="24" rx="5" fill="none" stroke="#17212E" strokeWidth="2.4" />
          <rect x="156" y="42" width="30" height="20" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
          <Txt x={171} y={56} size={8} anchor="middle" bold>Tab</Txt>
        </>
      )}
      {feature === "contrast" && (
        <>
          <rect x="14" y="12" width="84" height="86" rx="4" fill="#FFFFFF" stroke={LINE} />
          <Txt x={22} y={30} size={9} bold fill="#B4B4B4">{tt("Pale text", "Blasser Text")}</Txt>
          <Lines x={22} y={38} n={4} w={68} gap={9} fill="#CFCFCF" />
          <rect x="102" y="12" width="84" height="86" rx="4" fill="#FFFFFF" stroke={LINE} />
          <Txt x={110} y={30} size={9} bold fill="#17212E">{tt("Clear text", "Klarer Text")}</Txt>
          <Lines x={110} y={38} n={4} w={68} gap={9} fill="#3A3A3A" />
        </>
      )}
    </Svg>
  );
}

/** A person with a symbol of the limit: permanent (solid), temporary (a dashed outline and a plaster), situational (a place around them). */
export function SpectrumPerson({ feature, kind }: { feature: SpectrumFeature; kind: SpectrumKind }) {
  const names: Record<SpectrumFeature, Record<SpectrumKind, string>> = {
    captions: {
      permanent: tt("A person who is deaf", "Eine gehörlose Person"),
      temporary: tt("A person with an ear infection this week", "Eine Person mit einer Ohrenentzündung in dieser Woche"),
      situational: tt("A person on a noisy train without headphones", "Eine Person in einem lauten Zug ohne Kopfhörer"),
    },
    keyboard: {
      permanent: tt("A person who has only one arm", "Eine Person mit nur einem Arm"),
      temporary: tt("A person with an arm in a cast", "Eine Person mit einem Arm im Gips"),
      situational: tt("A person holding a baby", "Eine Person, die ein Baby hält"),
    },
    contrast: {
      permanent: tt("A person with low vision", "Eine Person mit eingeschränktem Sehvermögen"),
      temporary: tt("A person whose eyes were dilated at the doctor's", "Eine Person, deren Pupillen beim Arzt geweitet wurden"),
      situational: tt("A person reading on a phone in bright sunlight", "Eine Person, die in grellem Sonnenlicht auf dem Handy liest"),
    },
  };
  const dashed = kind === "temporary";
  return (
    <Svg viewBox="0 0 120 100" label={names[feature][kind]}>
      <rect x="1" y="1" width="118" height="98" rx="5" fill="#F6F6F6" stroke={MID} strokeDasharray={dashed ? "5 4" : undefined} />
      {kind === "situational" && feature === "captions" && (
        <>
          <rect x="8" y="10" width="104" height="52" rx="3" fill="#E2E2E2" stroke={LINE} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={14 + i * 25} y="16" width="18" height="16" rx="2" fill="#FFFFFF" stroke={LINE} />
          ))}
          <path d="M22 80 q8 -8 16 0 q8 8 16 0" fill="none" stroke={DARK} strokeWidth="1.4" />
        </>
      )}
      {kind === "situational" && feature === "contrast" && (
        <>
          <circle cx="100" cy="20" r="9" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={i} x1={100 + 12 * Math.cos((i * Math.PI) / 4)} y1={20 + 12 * Math.sin((i * Math.PI) / 4)} x2={100 + 17 * Math.cos((i * Math.PI) / 4)} y2={20 + 17 * Math.sin((i * Math.PI) / 4)} stroke={DARK} strokeWidth="1.4" />
          ))}
        </>
      )}
      <Person x={46} y={34} s={1.05} />
      {feature === "captions" && (
        <>
          <path d="M70 26 q6 6 0 14" fill="none" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
          {kind === "permanent" && <line x1="66" y1="22" x2="80" y2="44" stroke={DARK} strokeWidth="2" />}
          {kind === "temporary" && <rect x="64" y="30" width="9" height="9" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />}
        </>
      )}
      {feature === "keyboard" && (
        <>
          {kind === "permanent" && <line x1="55" y1="48" x2="55" y2="56" stroke={DARK} strokeWidth="1.4" strokeDasharray="2 2" />}
          {kind === "temporary" && <rect x="26" y="46" width="14" height="10" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />}
          {kind === "situational" && <circle cx="66" cy="60" r="7" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />}
        </>
      )}
      {feature === "contrast" && (
        <>
          <circle cx="42" cy="32" r="2" fill={DARK} />
          <circle cx="50" cy="32" r="2" fill={DARK} />
          {kind === "permanent" && <path d="M36 32 h22" stroke={DARK} strokeWidth="1" strokeDasharray="2 2" />}
          {kind === "temporary" && <path d="M36 28 q10 -6 22 0" fill="none" stroke={DARK} strokeWidth="1.4" />}
        </>
      )}
      <rect x="6" y="80" width="108" height="14" rx="3" fill="#FFFFFF" stroke={LINE} />
      <Txt x={60} y={90} size={7} anchor="middle" bold>{{ permanent: tt("permanent", "dauerhaft"), temporary: tt("temporary", "vorübergehend"), situational: tt("situational", "situativ") }[kind]}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · the four principles, each with a screen that breaks it */

export type Pour = "perceivable" | "operable" | "understandable" | "robust";

export function PourScreen({ p }: { p: Pour }) {
  const label: Record<Pour, string> = {
    perceivable: tt("A screen whose text is pale grey on white and whose status is only a coloured dot", "Ein Bildschirm, dessen Text hellgrau auf Weiß ist und dessen Status nur ein farbiger Punkt ist"),
    operable: tt("A screen with two tiny buttons side by side and a quiz box that needs dragging", "Ein Bildschirm mit zwei winzigen Buttons nebeneinander und einem Quiz-Kasten, der Ziehen verlangt"),
    understandable: tt("A screen with a wall of long sentences and an error that says only a number", "Ein Bildschirm mit einer Wand aus langen Sätzen und einem Fehler, der nur eine Zahl nennt"),
    robust: tt("A custom control that looks like a button but has no name for a screen reader", "Ein selbstgebautes Bedienelement, das wie ein Button aussieht, aber für einen Screenreader keinen Namen hat"),
  };
  return (
    <Svg viewBox="0 0 200 110" label={label[p]}>
      <rect x="1" y="1" width="198" height="108" rx="5" fill="#F6F6F6" stroke={MID} />
      {p === "perceivable" && (
        <>
          <Lines x={14} y={16} n={5} w={172} gap={8} h={2.6} fill={PALE} />
          <circle cx="22" cy="74" r="5" fill={RED} />
          <circle cx="22" cy="90" r="5" fill={GREEN} />
          <Lines x={34} y={72} n={1} w={60} h={3} fill={MID} />
          <Lines x={34} y={88} n={1} w={60} h={3} fill={MID} />
        </>
      )}
      {p === "operable" && (
        <>
          <rect x="14" y="14" width="20" height="20" rx="3" fill="#E2E2E2" stroke={LINE} />
          <Txt x={24} y={28} size={9} anchor="middle">←</Txt>
          <rect x="36" y="18" width="9" height="9" rx="2" fill={DARK} />
          <rect x="14" y="52" width="60" height="14" rx="3" fill="#E2E2E2" stroke={LINE} />
          <rect x="112" y="52" width="74" height="14" rx="3" fill="#FFFFFF" stroke={LINE} strokeDasharray="4 3" />
          <Arrow x1={78} y1={59} x2={108} y2={59} dash="4 3" />
          <Txt x={100} y={90} size={7.5} anchor="middle" fill="#666666">{tt("mouse only", "nur Maus")}</Txt>
        </>
      )}
      {p === "understandable" && (
        <>
          <Lines x={14} y={14} n={6} w={172} gap={7} h={3} fill={LINE} />
          <rect x="14" y="68" width="172" height="26" rx="3" fill="#FFFFFF" stroke={RED} strokeWidth="1.4" />
          <Txt x={22} y={86} size={10} bold fill={RED}>4011</Txt>
        </>
      )}
      {p === "robust" && (
        <>
          <rect x="40" y="28" width="120" height="30" rx="6" fill="#E2E2E2" stroke={DARK} strokeWidth="1.6" />
          <Txt x={100} y={47} size={10} anchor="middle" bold>OK</Txt>
          <rect x="40" y="70" width="120" height="22" rx="4" fill="#FFFFFF" stroke={LINE} strokeDasharray="4 3" />
          <Txt x={100} y={85} size={8} anchor="middle" fill="#666666">{tt("announced as: “unlabelled”", "angesagt als: „unbeschriftet“")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · the three barrier types */

export type BarrierKind = "visual" | "cognitive" | "motor";

export function BarrierType({ kind }: { kind: BarrierKind }) {
  const label: Record<BarrierKind, string> = {
    visual: tt("A visual barrier: pale small text, and the same text made clear and large", "Eine visuelle Barriere: blasser kleiner Text, und derselbe Text klar und groß gemacht"),
    cognitive: tt("A cognitive barrier: a long sentence, and the same idea in three short steps", "Eine kognitive Barriere: ein langer Satz, und dieselbe Idee in drei kurzen Schritten"),
    motor: tt("A motor barrier: two tiny buttons close together, and one large button with space around it", "Eine motorische Barriere: zwei winzige Buttons dicht beieinander, und ein großer Button mit Abstand"),
  };
  return (
    <Svg viewBox="0 0 200 90" label={label[kind]}>
      <rect x="1" y="1" width="198" height="88" rx="5" fill="#F6F6F6" stroke={MID} />
      <line x1="100" y1="8" x2="100" y2="82" stroke={LINE} strokeDasharray="3 3" />
      {kind === "visual" && (
        <>
          <Lines x={10} y={22} n={4} w={80} gap={9} h={2.4} fill={PALE} />
          <Lines x={110} y={18} n={4} w={80} gap={13} h={5} fill="#17212E" />
        </>
      )}
      {kind === "cognitive" && (
        <>
          <Lines x={10} y={20} n={6} w={82} gap={8} h={3} fill={LINE} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="116" cy={26 + i * 22} r="7" fill={DARK} />
              <Txt x={116} y={29.5 + i * 22} size={9} anchor="middle" fill="#FFFFFF" bold>{String(i + 1)}</Txt>
              <Lines x={130} y={24 + i * 22} n={1} w={58} h={4} fill={MID} />
            </g>
          ))}
        </>
      )}
      {kind === "motor" && (
        <>
          <rect x="22" y="34" width="14" height="14" rx="2" fill="#E2E2E2" stroke={LINE} />
          <rect x="39" y="34" width="14" height="14" rx="2" fill={DARK} />
          <rect x="116" y="26" width="70" height="30" rx="5" fill={DARK} />
          <Txt x={151} y={45} size={10} anchor="middle" fill="#FFFFFF" bold>{tt("Next", "Weiter")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · Lena's quiz: drag only, or also by keyboard */

export function QuizMock({ keyboard }: { keyboard: boolean }) {
  const label = keyboard
    ? tt("A quiz where each item can also be chosen from a list and placed with the keyboard", "Ein Quiz, in dem jedes Element auch aus einer Liste gewählt und mit der Tastatur platziert werden kann")
    : tt("A quiz where the five items can only be dragged onto five boxes", "Ein Quiz, in dem die fünf Elemente nur in fünf Kästen gezogen werden können");
  return (
    <Svg viewBox="0 0 300 150" label={label}>
      <Frame w={292} h={142}>
        <Txt x={12} y={32} size={9} bold>{tt("Put the five steps in order", "Bringen Sie die fünf Schritte in Ordnung")}</Txt>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="12" y={40 + i * 19} width="96" height="15" rx="3" fill="#E2E2E2" stroke={LINE} />
            <Txt x={18} y={51 + i * 19} size={7.5}>{[tt("Prepare", "Vorbereiten"), tt("Open", "Eröffnen"), tt("Offer", "Anbieten"), tt("Bargain", "Verhandeln"), tt("Close", "Abschließen")][i]}</Txt>
            <rect x="170" y={40 + i * 19} width="118" height="15" rx="3" fill="#FFFFFF" stroke={LINE} strokeDasharray="4 3" />
            <Txt x={178} y={51 + i * 19} size={7} fill="#888888">{String(i + 1)}</Txt>
            {keyboard && (
              <g>
                <rect x="114" y={40 + i * 19} width="50" height="15" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
                <Txt x={139} y={51 + i * 19} size={7} anchor="middle">{tt("Place at ▾", "Platzieren ▾")}</Txt>
              </g>
            )}
          </g>
        ))}
        {!keyboard && <Arrow x1={112} y1={92} x2={166} y2={72} dash="4 3" />}
        {keyboard && <rect x="111" y="38" width="56" height="19" rx="4" fill="none" stroke="#17212E" strokeWidth="2.2" />}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · a sign-up screen with three tools switched on and off */

export type PlainTools = { plain: boolean; structure: boolean; flex: boolean };

export function SignupMock({ on }: { on: PlainTools }) {
  const label = tt(
    `A sign-up screen of LearnLoop: ${on.plain ? "short everyday wording" : "a long legal sentence"}, ${on.structure ? "three numbered steps under a heading" : "one block of text without a heading"}, ${on.flex ? "with a choice to read, watch with captions or listen" : "in one format only"}`,
    `Ein Anmeldebildschirm von LearnLoop: ${on.plain ? "kurze Alltagsformulierung" : "ein langer juristischer Satz"}, ${on.structure ? "drei nummerierte Schritte unter einer Überschrift" : "ein Textblock ohne Überschrift"}, ${on.flex ? "mit der Wahl zwischen Lesen, Video mit Untertiteln oder Hören" : "nur in einem Format"}`,
  );
  return (
    <Svg viewBox="0 0 300 190" label={label}>
      <Frame w={292} h={182}>
        {on.structure ? <Txt x={12} y={34} size={11} bold>{tt("Create your account", "Erstellen Sie Ihr Konto")}</Txt> : null}
        {on.flex && (
          <g>
            {[tt("Read", "Lesen"), tt("Watch", "Ansehen"), tt("Listen", "Hören")].map((s, i) => (
              <g key={s}>
                <rect x={12 + i * 62} y={on.structure ? 42 : 28} width="58" height="15" rx="3" fill={i === 0 ? DARK : "#FFFFFF"} stroke={DARK} />
                <Txt x={41 + i * 62} y={(on.structure ? 42 : 28) + 10.5} size={7.5} anchor="middle" fill={i === 0 ? "#FFFFFF" : "#333333"}>{s}</Txt>
              </g>
            ))}
          </g>
        )}
        {(() => {
          const y0 = (on.structure ? 42 : 28) + (on.flex ? 24 : 0) + (on.structure && !on.flex ? 6 : 0);
          if (!on.plain && !on.structure) {
            return (
              <>
                <Txt x={12} y={y0 + 8} size={6.6}>{tt("Notwithstanding the foregoing, the user hereby irrevocably consents,", "Ungeachtet des Vorstehenden erklärt sich der Nutzer hiermit unwiderruflich")}</Txt>
                <Lines x={12} y={y0 + 16} n={9} w={276} gap={8} h={3} fill={LINE} />
              </>
            );
          }
          if (!on.plain && on.structure) {
            return [0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx="20" cy={y0 + 12 + i * 30} r="7" fill={DARK} />
                <Txt x={20} y={y0 + 15.5 + i * 30} size={9} anchor="middle" fill="#FFFFFF" bold>{String(i + 1)}</Txt>
                <Lines x={34} y={y0 + 6 + i * 30} n={3} w={250} gap={7} h={3} fill={LINE} />
              </g>
            ));
          }
          if (on.plain && !on.structure) {
            return (
              <>
                <Txt x={12} y={y0 + 10} size={9}>{tt("Enter your email. Choose a password. Press Next.", "Geben Sie Ihre E-Mail ein. Wählen Sie ein Passwort. Drücken Sie Weiter.")}</Txt>
                <Txt x={12} y={y0 + 26} size={9}>{tt("Then we send you a code. Type the code here.", "Dann senden wir Ihnen einen Code. Tippen Sie den Code hier ein.")}</Txt>
              </>
            );
          }
          return [tt("Enter your email", "Geben Sie Ihre E-Mail ein"), tt("Choose a password", "Wählen Sie ein Passwort"), tt("Type the code we send you", "Tippen Sie den Code ein, den wir senden")].map((s, i) => (
            <g key={s}>
              <circle cx="20" cy={y0 + 12 + i * 26} r="7" fill={DARK} />
              <Txt x={20} y={y0 + 15.5 + i * 26} size={9} anchor="middle" fill="#FFFFFF" bold>{String(i + 1)}</Txt>
              <Txt x={34} y={y0 + 15.5 + i * 26} size={10}>{s}</Txt>
            </g>
          ));
        })()}
        <rect x="222" y="160" width="66" height="18" rx="4" fill={DARK} />
        <Txt x={255} y={172} size={9} anchor="middle" fill="#FFFFFF">{tt("Next", "Weiter")}</Txt>
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ B1 · one in six */

export function OneInSix() {
  return (
    <Svg viewBox="0 0 360 80" label={tt("Six people in a row, one of them marked: about one in six people lives with a significant disability", "Sechs Menschen in einer Reihe, einer davon markiert: etwa jeder sechste Mensch lebt mit einer erheblichen Behinderung")}>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <Person x={30 + i * 60} y={22} s={0.9} fill={i === 2 ? "#17212E" : "#FFFFFF"} />
          {i === 2 && <circle cx={30 + i * 60} cy={40} r="30" fill="none" stroke="#4C8BE0" strokeWidth="2" strokeDasharray="5 4" />}
        </g>
      ))}
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for the measures of the cards and the two tasks */

export type MeasureKind7 = "keyboard" | "contrast" | "captions" | "testing" | "toolbar" | "look" | "translate" | "a11y" | "courses20" | "pipeline" | "quarters" | "quizBattle" | "keyboardCaptions";
export type ThumbKind = MeasureKind7 | D5Kind;
const D7_KINDS: MeasureKind7[] = ["keyboard", "contrast", "captions", "testing", "toolbar", "look", "translate", "a11y", "courses20", "pipeline", "quarters", "quizBattle", "keyboardCaptions"];

export function MeasureThumb({ kind }: { kind: ThumbKind }): ReactNode {
  if (!(D7_KINDS as string[]).includes(kind)) return <D5Thumb kind={kind as D5Kind} />;
  const k = kind as MeasureKind7;
  const labels: Record<MeasureKind7, string> = {
    keyboard: tt("A keyboard with a focus frame on a key and a larger Next button", "Eine Tastatur mit Fokusrahmen auf einer Taste und einem größeren Weiter-Button"),
    contrast: tt("Text made darker and larger, next to the same text pale and small", "Text dunkler und größer gemacht, neben demselben Text blass und klein"),
    captions: tt("A video with a caption bar and a transcript beside it", "Ein Video mit einer Untertitelleiste und einem Transkript daneben"),
    testing: tt("A person with a checklist and a magnifier, repeated each quarter", "Eine Person mit Checkliste und Lupe, jedes Quartal wiederholt"),
    toolbar: tt("A page with a small round accessibility icon floating in the corner", "Eine Seite mit einem kleinen runden Barrierefreiheits-Symbol in der Ecke"),
    look: tt("Four colour swatches and a new type sample", "Vier Farbfelder und ein neues Schriftmuster"),
    translate: tt("Three speech bubbles for three languages", "Drei Sprechblasen für drei Sprachen"),
    a11y: tt("A figure with arms spread wide, open to everyone", "Eine Figur mit weit ausgebreiteten Armen, offen für alle"),
    courses20: tt("A grid of twenty course tiles, each with a small check mark", "Ein Raster aus zwanzig Kurskacheln, jede mit einem kleinen Haken"),
    pipeline: tt("A row of components leading to a release, with a check before it", "Eine Reihe von Komponenten, die zu einem Release führt, mit einer Prüfung davor"),
    quarters: tt("Four quarters in a row, each with a small user test", "Vier Quartale in einer Reihe, jedes mit einem kleinen Nutzertest"),
    quizBattle: tt("A quiz battle screen with two players and a drag area", "Ein Quiz-Battle-Bildschirm mit zwei Spielern und einer Ziehfläche"),
    keyboardCaptions: tt("A video with captions and a quiz with a keyboard frame", "Ein Video mit Untertiteln und ein Quiz mit Tastaturrahmen"),
  };
  return (
    <Thumb label={labels[k]}>
      {k === "keyboard" && (
        <>
          {Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 8 }, (_, c) => <rect key={`${r}-${c}`} x={14 + c * 20 + r * 4} y={18 + r * 20} width="17" height="16" rx="3" fill="#FFFFFF" stroke={LINE} />),
          )}
          <rect x="52" y="34" width="22" height="20" rx="4" fill="none" stroke="#17212E" strokeWidth="2.4" />
          <rect x="130" y="76" width="56" height="20" rx="5" fill={DARK} />
          <Txt x={158} y={90} size={9} anchor="middle" fill="#FFFFFF" bold>{tt("Next", "Weiter")}</Txt>
        </>
      )}
      {k === "contrast" && (
        <>
          <rect x="12" y="12" width="84" height="86" rx="4" fill="#FFFFFF" stroke={LINE} />
          <Lines x={20} y={24} n={5} w={68} gap={10} h={2.4} fill={PALE} />
          <rect x="104" y="12" width="84" height="86" rx="4" fill="#FFFFFF" stroke={LINE} />
          <Lines x={112} y={22} n={5} w={68} gap={14} h={5} fill="#17212E" />
        </>
      )}
      {k === "captions" && (
        <>
          <rect x="12" y="12" width="120" height="70" rx="4" fill="#4A4A4A" />
          <polygon points="64,34 64,56 82,45" fill="#FFFFFF" />
          <rect x="20" y="66" width="104" height="11" rx="2" fill="#000000" opacity="0.8" />
          <rect x="140" y="12" width="48" height="86" rx="3" fill="#FFFFFF" stroke={LINE} />
          <Lines x={146} y={20} n={8} w={36} gap={9} h={2.6} fill={MID} />
        </>
      )}
      {k === "testing" && (
        <>
          <Person x={44} y={36} s={1.1} />
          <circle cx="74" cy="60" r="9" fill="none" stroke={DARK} strokeWidth="2" />
          <line x1="80" y1="67" x2="88" y2="76" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />
          <rect x="110" y="14" width="76" height="80" rx="3" fill="#FFFFFF" stroke={LINE} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="116" y={22 + i * 19} width="9" height="9" rx="2" fill="#FFFFFF" stroke={DARK} />
              <Lines x={130} y={25 + i * 19} n={1} w={48} h={3} fill={MID} />
            </g>
          ))}
        </>
      )}
      {k === "toolbar" && (
        <>
          <MiniPage x={14} y={12} w={140} h={86} n={8} />
          <circle cx="168" cy="82" r="16" fill={DARK} />
          <circle cx="168" cy="76" r="3.4" fill="#FFFFFF" />
          <path d="M160 84 h16 M168 79 v12 M162 94 l6 -3 l6 3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {k === "look" && (
        <>
          {["#D9D9D9", "#9E9E9E", "#5C5C5C", "#2B2B2B"].map((c, i) => (
            <rect key={c} x={16 + i * 44} y="14" width="38" height="38" rx="5" fill={c} />
          ))}
          <Txt x={18} y={84} size={22} bold>Aa</Txt>
          <Txt x={72} y={84} size={22}>Aa</Txt>
          <Txt x={126} y={84} size={22} fill="#666666">Aa</Txt>
        </>
      )}
      {k === "translate" && (
        <>
          {[["EN", 18, 14], ["DE", 74, 32], ["FR", 130, 50]].map(([s, x, y]) => (
            <g key={s as string}>
              <rect x={x as number} y={y as number} width="52" height="32" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <Txt x={(x as number) + 26} y={(y as number) + 21} size={13} anchor="middle" bold>{s as string}</Txt>
            </g>
          ))}
        </>
      )}
      {k === "a11y" && (
        <>
          <circle cx="100" cy="22" r="9" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <path d="M54 44 h92 M100 36 v32 M100 68 l-18 28 M100 68 l18 28" fill="none" stroke={DARK} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="52" r="46" fill="none" stroke={MID} strokeDasharray="4 4" />
        </>
      )}
      {k === "courses20" && (
        <>
          {Array.from({ length: 20 }, (_, i) => (
            <g key={i}>
              <rect x={14 + (i % 10) * 18} y={22 + Math.floor(i / 10) * 34} width="15" height="26" rx="2" fill="#FFFFFF" stroke={LINE} />
              <path d={`M${17 + (i % 10) * 18} ${34 + Math.floor(i / 10) * 34} l3 3 l6 -7`} fill="none" stroke={DARK} strokeWidth="1.4" strokeLinecap="round" />
            </g>
          ))}
        </>
      )}
      {k === "pipeline" && (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={12 + i * 34} y="20" width="28" height="22" rx="3" fill="#E2E2E2" stroke={LINE} />
          ))}
          <Arrow x1={110} y1={31} x2={126} y2={31} />
          <rect x="130" y="16" width="26" height="30" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <path d="M136 31 l5 5 l9 -11" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
          <Arrow x1={158} y1={31} x2={176} y2={31} />
          <rect x="178" y="22" width="14" height="18" rx="2" fill={DARK} />
          <Lines x={14} y={64} n={3} w={172} gap={9} h={3} fill={MID} />
        </>
      )}
      {k === "quarters" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={12 + i * 46} y="18" width="42" height="70" rx="4" fill="#FFFFFF" stroke={LINE} />
              <Txt x={33 + i * 46} y={32} size={9} anchor="middle" bold>{`Q${i + 1}`}</Txt>
              <Person x={33 + i * 46} y={50} s={0.55} />
            </g>
          ))}
        </>
      )}
      {k === "quizBattle" && (
        <>
          <Person x={36} y={34} s={0.9} />
          <Person x={164} y={34} s={0.9} />
          <Txt x={100} y={28} size={12} anchor="middle" bold>VS</Txt>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={62 + i * 26} y="62" width="22" height="16" rx="3" fill="#E2E2E2" stroke={LINE} />
          ))}
          <Arrow x1={100} y1={92} x2={100} y2={82} dash="3 3" />
        </>
      )}
      {k === "keyboardCaptions" && (
        <>
          <rect x="12" y="14" width="86" height="56" rx="4" fill="#4A4A4A" />
          <polygon points="48,32 48,50 62,41" fill="#FFFFFF" />
          <rect x="18" y="58" width="74" height="9" rx="2" fill="#000000" opacity="0.8" />
          {[0, 1].map((i) => (
            <rect key={i} x="108" y={16 + i * 26} width="80" height="20" rx="3" fill="#FFFFFF" stroke={LINE} />
          ))}
          <rect x="105" y="13" width="86" height="26" rx="5" fill="none" stroke="#17212E" strokeWidth="2.2" />
        </>
      )}
    </Thumb>
  );
}
