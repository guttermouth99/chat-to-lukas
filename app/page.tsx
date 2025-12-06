import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import profile from "@/lib/data/profile.json";
import { ScheduleCallDialog } from "@/components/schedule-call-dialog";

export const metadata: Metadata = {
  title: "Lukas Stockburger - Full-Stack Developer",
  description: profile.summary,
  openGraph: {
    title: "Lukas Stockburger - Full-Stack Developer",
    description: profile.summary,
    images: [
      {
        url: "/api/meta-images/index", // Generic meta image
        width: 1200,
        height: 630,
        alt: "Lukas Stockburger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukas Stockburger",
    description: profile.summary,
    images: ["/api/meta-images/index"],
  },
};

export default function Home() {
  // Using a nice blue accent color for the generic profile
  const accentColor = "#3b82f6";

  return (
    <div className="min-h-svh flex items-center justify-center bg-stone-100 p-4 md:p-8">
      <div className="mx-auto max-w-2xl w-full">
        <div
          className="relative overflow-hidden rounded-3xl p-6 md:p-10 shadow-xl bg-white"
          style={{
            background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 50%, white 100%)`,
          }}
        >
          {/* Schedule Call Button - Top Right */}
          <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
            <ScheduleCallDialog
              accentColor={accentColor}
              buttonLabel="Schedule Call"
            />
          </div>

          {/* Decorative elements */}
          <div
            className="absolute -right-20 -top-20 size-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="absolute -bottom-10 -left-10 size-48 rounded-full blur-2xl opacity-10"
            style={{ backgroundColor: accentColor }}
          />

          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 flex h-full flex-col">
            {/* Avatar section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-6">
                {/* Animated ring */}
                <div
                  className="absolute inset-0 animate-pulse rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}10)`,
                    transform: "scale(1.15)",
                  }}
                />
                {/* Avatar */}
                <div className="relative size-28 overflow-hidden rounded-full ring-4 ring-white shadow-2xl md:size-36">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="size-full object-cover"
                  />
                </div>
              </div>

              {/* Name and title */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                  {profile.name}
                </h1>
                <p
                  className="mt-1 text-lg font-medium md:text-xl"
                  style={{ color: accentColor }}
                >
                  {profile.title}
                </p>
                <p className="mt-4 text-stone-500 text-base leading-relaxed">
                  {profile.summary}
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1 min-h-8" />

            {/* Quick info badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {[
                {
                  text: `8+ Years Experience`,
                  icon: "Sparkles",
                },
                { text: "Full-Stack Developer" },
                { text: "AI Specialist" },
              ].map((keyword, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-sm"
                >
                  {keyword.icon === "Sparkles" && (
                    <Sparkles
                      className="size-3"
                      style={{ color: accentColor }}
                    />
                  )}
                  {keyword.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
