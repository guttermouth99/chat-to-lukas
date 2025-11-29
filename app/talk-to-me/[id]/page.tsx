"use client";

import { useActions, useUIState } from "@ai-sdk/rsc";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { generateId } from "ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import profile from "@/lib/data/profile.json";
import jobsToApply from "@/lib/data/jobs-to-apply.json";
import type { ClientMessage } from "./actions";

export const maxDuration = 30;

export default function TalkToMePage() {
  const params = useParams();
  const jobId = params.id as string;
  const job = jobsToApply.find((j) => j.id === jobId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to conversation
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      {
        id: generateId(),
        role: "user",
        display: userMessage,
      },
    ]);

    // Get AI response
    const message = await continueConversation(userMessage, jobId);

    // Add AI response to conversation
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);

    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!job) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-stone-900">
            Job nicht gefunden
          </h1>
          <p className="mt-2 text-stone-600">
            Diese Bewerbung existiert nicht.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={job.companyLogo} alt={job.company} />
            <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-semibold text-stone-900">
              Chat mit {profile.name}
            </h1>
            <p className="truncate text-sm text-stone-500">
              {job.position} @ {job.company}
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="mx-auto max-w-2xl px-4 py-6">
          {conversation.length === 0 ? (
            <div className="py-12 text-center">
              <Avatar className="mx-auto size-16 ring-2 ring-stone-200">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-lg font-medium text-stone-900">
                Hallo! Ich bin {profile.name}.
              </h2>
              <p className="mx-auto mt-2 max-w-md text-stone-600">
                Stellen Sie mir Fragen über meine Erfahrung, Skills und meine
                Eignung für die Position als {job.position} bei {job.company}.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Was sind deine Stärken?",
                  "Erzähl mir von deiner Erfahrung",
                  "Warum passt du zu uns?",
                  "Lass uns connecten!",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {conversation.map((message: ClientMessage) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="size-8 shrink-0">
                    {message.role === "user" ? (
                      <>
                        <AvatarImage src={job.companyLogo} alt={job.company} />
                        <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === "user"
                        ? ""
                        : "bg-white text-stone-900 shadow-sm ring-1 ring-stone-200"
                    }`}
                    style={
                      message.role === "user"
                        ? {
                            backgroundColor: job.chatBubble.background,
                            color: job.chatBubble.foreground,
                          }
                        : undefined
                    }
                  >
                    {typeof message.display === "string" ? (
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                        {message.display}
                      </p>
                    ) : (
                      message.display
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-200">
                    <div className="flex gap-1">
                      <span className="size-2 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.3s]" />
                      <span className="size-2 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.15s]" />
                      <span className="size-2 animate-bounce rounded-full bg-stone-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-stone-200 bg-white px-4 py-3">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stellen Sie mir eine Frage..."
            className="flex-1 rounded-full border-stone-300 bg-stone-50 px-4"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="shrink-0 rounded-full"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
