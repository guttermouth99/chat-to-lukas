"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface StickyChatButtonProps {
  id: string;
  avatar: string;
  fullName: string;
  accentColor: string;
}

export function StickyChatButton({
  id,
  avatar,
  fullName,
  accentColor,
}: StickyChatButtonProps) {
  return (
    <Link
      href={`/${id}/talk`}
      className="fixed bottom-6 right-6 z-50 group print:hidden"
    >
      {/* Button container */}
      <div
        className="flex items-center gap-2 pl-1 pr-4 py-1 rounded-full shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]"
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 2px 12px ${accentColor}30`,
        }}
      >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
            <img
              src={avatar}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Talk to me</span>
            <span className="text-[10px] text-white/70">AI Chat</span>
          </div>
          {/* Message icon indicator */}
          <MessageCircle className="w-4 h-4 text-white/80 ml-1" />
      </div>
    </Link>
  );
}

