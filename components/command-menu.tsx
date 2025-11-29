"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { FileText, ScrollText, MessageCircle, Command } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { t, type Language } from "@/lib/translations";

interface CommandMenuProps {
  hasCoverLetter?: boolean;
  currentPage?: "cv" | "cover-letter" | "talk";
  lang?: Language;
}

export function CommandMenu({
  hasCoverLetter = false,
  currentPage,
  lang = "german",
}: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(true);
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const translations = t(lang);

  React.useEffect(() => {
    // Detect platform
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const navigationItems = [
    {
      id: "cv",
      label: translations.resume,
      description: translations.resumeDescription,
      icon: FileText,
      href: `/${jobId}/cv`,
      shortcut: "1",
      show: true,
    },
    {
      id: "cover-letter",
      label: translations.coverLetter,
      description: translations.coverLetterDescription,
      icon: ScrollText,
      href: `/${jobId}/cover-letter`,
      shortcut: "2",
      show: hasCoverLetter,
    },
    {
      id: "talk",
      label: translations.chat,
      description: translations.chatDescription,
      icon: MessageCircle,
      href: `/${jobId}/talk`,
      shortcut: "3",
      show: true,
    },
  ].filter((item) => item.show);

  // Handle number shortcuts when dialog is open
  React.useEffect(() => {
    if (!open) return;

    const handleShortcut = (e: KeyboardEvent) => {
      const item = navigationItems.find((item) => item.shortcut === e.key);
      if (item) {
        e.preventDefault();
        navigate(item.href);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [open, navigationItems]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/90 px-3 py-2 text-sm text-stone-600 shadow-lg backdrop-blur-sm transition-all hover:border-stone-300 hover:bg-white hover:text-stone-800 hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
        )}
      >
        <span className="hidden text-stone-500 sm:inline">Navigation</span>
        <span className="flex items-center gap-0.5">
          <Kbd className="bg-stone-100 shadow-sm">
            {isMac ? (
              <Command className="size-3" />
            ) : (
              <span className="text-[10px]">Ctrl</span>
            )}
          </Kbd>
          <Kbd className="bg-stone-100 shadow-sm">K</Kbd>
        </span>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={translations.navigation}
        description={translations.navigateToPages}
        showCloseButton={false}
        className="max-w-md overflow-hidden rounded-xl border-stone-200 bg-white/95 shadow-2xl backdrop-blur-xl sm:rounded-2xl"
      >
        <CommandInput
          placeholder={translations.navigateToPages}
          className="border-none text-base"
        />
        <CommandList className="max-h-[320px] py-2">
          <CommandEmpty className="py-8 text-stone-500">
            {translations.noPages}
          </CommandEmpty>
          <CommandGroup heading={translations.pages} className="px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => navigate(item.href)}
                  className={cn(
                    "group/item cursor-pointer gap-3 rounded-lg px-3 py-3 transition-colors",
                    "aria-selected:bg-stone-100",
                    isActive && "bg-stone-50"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg border border-stone-200 bg-white shadow-sm transition-colors",
                      "group-aria-selected/item:border-stone-300 group-aria-selected/item:bg-stone-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 text-stone-500 transition-colors",
                        "group-aria-selected/item:text-stone-700"
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span
                      className={cn(
                        "font-medium text-stone-700 transition-colors",
                        "group-aria-selected/item:text-stone-900"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs text-stone-400">
                      {item.description}
                    </span>
                  </div>
                  <CommandShortcut className="ml-auto">
                    <Kbd className="bg-stone-100 text-stone-500 shadow-none group-aria-selected/item:bg-stone-200">
                      {item.shortcut}
                    </Kbd>
                  </CommandShortcut>
                  {isActive && (
                    <span className="ml-1 size-1.5 rounded-full bg-emerald-500" />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
        <div className="border-t border-stone-100 bg-stone-50/50 px-3 py-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Kbd className="bg-white shadow-sm">↑</Kbd>
                <Kbd className="bg-white shadow-sm">↓</Kbd>
                <span className="ml-1">{translations.navigate}</span>
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="bg-white shadow-sm">↵</Kbd>
                <span className="ml-1">{translations.open}</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Kbd className="bg-white shadow-sm">esc</Kbd>
              <span className="ml-1">{translations.close}</span>
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

