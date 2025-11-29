"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface VideoCardProps {
  src: string;
  title?: string;
  description?: string;
}

export function VideoCard({
  src,
  title = "OpenAI Award",
  description = "baito wurde von OpenAI mit einem Award ausgezeichnet, nachdem wir erfolgreich über 10 Milliarden Tokens mittels moderner KI-Systeme und skalierbarer Datenpipelines klassifiziert haben.",
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  return (
    <Card className="w-full border-stone-200 bg-gradient-to-br from-amber-50/50 via-stone-50 to-white shadow-lg overflow-hidden">
      <CardContent className="pt-0 pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="size-5 text-amber-500" />
          <h4 className="text-lg font-medium text-stone-600">{title}</h4>
        </div>
        <div className="relative rounded-xl overflow-hidden bg-black ring-1 ring-stone-200/50">
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          />
        </div>
        {description && (
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

