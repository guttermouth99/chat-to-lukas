"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CommandMenu } from "./command-menu";
import { t, type Language } from "@/lib/translations";

interface PageNavigationProps {
  id: string;
  avatar: string;
  fullName: string;
  accentColor: string;
  hasCoverLetter: boolean;
  currentPage: "overview" | "cv" | "cover-letter" | "talk";
  lang?: Language;
}

export function PageNavigation({
  id,
  avatar,
  fullName,
  accentColor,
  hasCoverLetter,
  currentPage,
  lang = "german",
}: PageNavigationProps) {
  const translations = t(lang);
  
  return (
    <>
      {/* Command Menu - sticky on bottom left for CV and cover-letter pages */}
      {currentPage !== "talk" && (
        <div className="fixed bottom-6 left-6 z-50 print:hidden">
          <CommandMenu hasCoverLetter={hasCoverLetter} currentPage={currentPage} lang={lang} />
        </div>
      )}

      {/* Sticky Talk to Chatbot Button - only show on CV and cover-letter pages */}
      {currentPage !== "talk" && (
        <Link
          href={`/${id}/talk`}
          className="fixed bottom-6 right-6 z-50 group print:hidden"
        >
          <div
            className="flex items-center gap-2 pl-1 pr-4 py-1 rounded-full shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 2px 12px ${accentColor}30`,
            }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
              <img
                src={avatar}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">{translations.talkToMe}</span>
              <span className="text-[10px] text-white/70">{translations.aiChat}</span>
            </div>
            <MessageCircle className="w-4 h-4 text-white/80 ml-1" />
          </div>
        </Link>
      )}
    </>
  );
}

