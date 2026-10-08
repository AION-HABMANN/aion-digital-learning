import type { Metadata } from "next";
import "@/styles/globals.css";
import { TopBar } from "@/components/chrome/TopBar";
import { Footer } from "@/components/chrome/Footer";
import { ParticipantStrip } from "@/components/chrome/ParticipantStrip";
import { StoreHydrator } from "@/components/chrome/StoreHydrator";
import { MentorBar } from "@/components/chrome/MentorBar";
import { GlossaryPanel } from "@/components/chrome/GlossaryPanel";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Learning UX Lab · Digital Training and Learning Systems",
  description: "Self-study companion for Educational UX/UI Design for digital learning platforms: study material, live instruments, two tasks and two working documents per day. English and German.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <StoreHydrator />
        <LangProvider>
          <MentorBar />
          <TopBar />
          <main className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-8 md:px-6">
            <ParticipantStrip />
            {children}
          </main>
          <Footer />
          <GlossaryPanel />
        </LangProvider>
      </body>
    </html>
  );
}
