"use client";

import { useActions, useUIState } from "@ai-sdk/rsc";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { generateId } from "ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommandMenu } from "@/components/command-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import profile from "@/lib/data/profile.json";
import jobsToApply from "@/lib/data/jobs-to-apply.json";
import type { ClientMessage } from "../actions";
import { t, type Language } from "@/lib/translations";

export const maxDuration = 30;

function TalkToMeContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q");
  const hasStartedRef = useRef(false);
  const jobId = params.id as string;
  const job = jobsToApply.find((j) => j.id === jobId);
  const lang = (job?.lang as Language) || "german";
  const translations = t(lang);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);

  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isLoading]);

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

  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading) return;

    setIsLoading(true);

    // Add user message to conversation
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      {
        id: generateId(),
        role: "user",
        display: suggestion,
      },
    ]);

    // Get AI response
    const message = await continueConversation(suggestion, jobId);

    // Add AI response to conversation
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);

    setIsLoading(false);
  };

  useEffect(() => {
    if (initialQuestion && conversation.length === 0 && !hasStartedRef.current && !isLoading) {
      hasStartedRef.current = true;
      handleSuggestionClick(initialQuestion);
    }
  }, [initialQuestion, conversation.length, isLoading]);

  if (!job) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-stone-900">
            {translations.jobNotFound}
          </h1>
          <p className="mt-2 text-stone-600">
            {translations.jobNotFoundDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-stone-50">
      <AlertDialog open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{translations.disclaimerTitle}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 pt-2 text-base">
              <p>{translations.disclaimerText1}</p>
              <p>{translations.disclaimerText2}</p>
              <p className="rounded-md bg-stone-100 p-3 text-sm text-stone-600">
                {translations.disclaimerPrivacy}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push(`/${jobId}/cv`);
                }
              }}
            >
              {translations.disclaimerCancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsDisclaimerOpen(false)}>
              {translations.disclaimerConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <header className="relative border-b border-stone-200 bg-white px-4 py-3">
        {/* Back button - outer left on desktop */}
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push(`/${jobId}/cv`);
            }
          }}
          className="absolute left-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 sm:flex"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {/* Back button - inline on mobile */}
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push(`/${jobId}/cv`);
              }
            }}
            className="flex size-10 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 sm:hidden"
          >
            <ArrowLeft className="size-5" />
          </button>
          <Link href={`/${jobId}`} className="shrink-0">
            <Avatar className="size-10 transition-transform hover:scale-105">
              <AvatarImage src={job.companyLogo} alt={job.company} />
              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-semibold text-stone-900">
              {translations.chatWith} {profile.name}
            </h1>
            <p className="truncate text-sm text-stone-500">
              {job.position} @ {job.company}
            </p>
          </div>
          <CommandMenu hasCoverLetter={job.hasCoverLetter} currentPage="talk" lang={lang} />
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-6">
          {conversation.length === 0 ? (
            <div className="py-12 text-center">
              <Avatar className="mx-auto size-16 ring-2 ring-stone-200">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-lg font-medium text-stone-900">
                {translations.hello} {profile.name}.
              </h2>
              <p className="mx-auto mt-2 max-w-md text-stone-600">
                {translations.askMeQuestions} {job.position} {lang === "german" ? "bei" : "at"} {job.company}.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {(job.defaultQuestions ?? translations.defaultQuestions).map((suggestion) => (
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
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
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
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${message.role === "user"
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
          <div ref={bottomRef} />
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
            placeholder={translations.askQuestion}
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

export default function TalkToMePage() {
  return (
    <Suspense>
      <TalkToMeContent />
    </Suspense>
  );
}
