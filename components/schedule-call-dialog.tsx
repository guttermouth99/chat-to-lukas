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
import Cal from "@calcom/embed-react";

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
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Kennenlernen vereinbaren</DialogTitle>
            <DialogDescription>
Du magst mich besser kennen lernen? Dann vereinbare einen Termin mit mir.            </DialogDescription>
          </DialogHeader>
             <Cal calLink="lukas-stockburger" config={{ theme: "light" }}></Cal>

        </DialogContent>
      </Dialog>
    </>
  );
}

