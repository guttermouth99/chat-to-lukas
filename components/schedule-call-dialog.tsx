"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ScheduleCallDialogProps {
  accentColor: string;
  buttonLabel: string;
}

export function ScheduleCallDialog({ accentColor, buttonLabel }: ScheduleCallDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        style={{ 
          backgroundColor: accentColor,
          color: "white",
        }}
      >
        <Calendar className="size-4" />
        {buttonLabel}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hello World</DialogTitle>
            <DialogDescription>
              This is a placeholder modal for scheduling a call.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <p className="text-2xl font-bold text-stone-700">Hello World 👋</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

