import { tt } from "@/lib/lang";

/** The made-up texts of Day 7 (InclusiveLearn): the legal-sounding paragraph, one lesson, its three parts and the plain-language version. */
export const LONG = () => tt(
  "Notwithstanding the foregoing provisions of the present agreement, the participant hereby acknowledges that the aforementioned terms shall apply mutatis mutandis to all successive enrolments, insofar as permitted by applicable regulations, unless expressly waived in writing.",
  "Ungeachtet der vorstehenden Bestimmungen der vorliegenden Vereinbarung erkennt die Teilnehmerin hiermit an, dass die vorgenannten Bedingungen sinngemäß für alle nachfolgenden Anmeldungen gelten, soweit nach den anwendbaren Vorschriften zulässig, sofern nicht ausdrücklich schriftlich darauf verzichtet wird.",
);
export const LESSON = () => tt(
  "Negotiation begins long before the first offer. The parties establish their interests, their alternatives and the range within which an agreement is conceivable. A well-prepared party enters the conversation with a clear target, a limit it will not cross and an understanding of what the other side may need.",
  "Verhandlungen beginnen lange vor dem ersten Angebot. Die Parteien klären ihre Interessen, ihre Alternativen und den Bereich, in dem eine Einigung denkbar ist. Eine gut vorbereitete Partei geht mit einem klaren Ziel, einer Grenze, die sie nicht überschreitet, und einem Verständnis dafür ins Gespräch, was die andere Seite brauchen könnte.",
);

export const PARTS = () => [
  LESSON(),
  tt("Second, name your goal and your limit. The goal is what you hope for, the limit is the point beyond which you would rather walk away. Write both down before the talk starts.", "Zweitens: Nennen Sie Ihr Ziel und Ihre Grenze. Das Ziel ist, was Sie hoffen, die Grenze ist der Punkt, ab dem Sie lieber gehen. Schreiben Sie beides auf, bevor das Gespräch beginnt."),
  tt("Third, think about the other side. What might they need, and what could you give that costs you little? A good offer often starts there.", "Drittens: Denken Sie an die andere Seite. Was könnte sie brauchen, und was könnten Sie geben, das Sie wenig kostet? Ein gutes Angebot beginnt oft dort."),
];

export const PLAIN = () => tt(
  "A negotiation starts before the first offer. First, each side thinks about what it wants, what it can do instead, and where an agreement is possible. Then it chooses a goal and a limit. It also asks: what might the other side need?",
  "Eine Verhandlung beginnt vor dem ersten Angebot. Zuerst überlegt jede Seite, was sie will, was sie stattdessen tun kann und wo eine Einigung möglich ist. Dann wählt sie ein Ziel und eine Grenze. Sie fragt auch: Was könnte die andere Seite brauchen?",
);

export const PLAIN_PARTS = () => [
  PLAIN(),
  tt("Next, choose a goal and a limit. The goal is what you hope for. The limit is the point where you would rather walk away. Write both down before the talk.", "Als Nächstes wählen Sie ein Ziel und eine Grenze. Das Ziel ist, was Sie hoffen. Die Grenze ist der Punkt, an dem Sie lieber gehen. Schreiben Sie beides vor dem Gespräch auf."),
  tt("Last, think about the other side. What might they need? What can you give that costs you little? A good offer often starts there.", "Zuletzt denken Sie an die andere Seite. Was könnte sie brauchen? Was können Sie geben, das Sie wenig kostet? Ein gutes Angebot beginnt oft dort."),
];
