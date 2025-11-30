import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ScrollText, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import jobsToApply from "@/lib/data/jobs-to-apply.json";
import profile from "@/lib/data/profile.json";
import { t, type Language } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { ScheduleCallDialog } from "@/components/schedule-call-dialog";
import { CommandMenu } from '@/components/command-menu';

interface JobPageProps {
  params: Promise<{ id: string }>;
}

// Dynamic data loader
async function getApplicationData(id: string) {
  try {
    const data = await import(`@/lib/data/${id}/application-data.json`);
    return data.default;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = jobsToApply.find((j) => j.id === id);
  const data = await getApplicationData(id);

  if (!job || !data) {
    return {
      title: "Application Not Found",
    };
  }

  const lang = (job.lang as Language) || "german";
  const translations = t(lang);
  const title = `${profile.name} × ${job.company} - ${translations.metaTitles.index}`;
  const description = `${translations.metaDescriptions.index} ${job.position} ${lang === "german" ? "bei" : "at"} ${job.company}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `/api/meta-images/index?id=${id}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/meta-images/index?id=${id}`],
    },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const job = jobsToApply.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  const lang = (job.lang as Language) || "german";
  const translations = t(lang);
  const accentColor = job.chatBubble.background;

  return (
    <div className="min-h-svh flex items-center justify-center bg-stone-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[1fr_auto]">
          {/* Hero Card - Large left side */}
          <div
            className="relative col-span-1 row-span-1 overflow-hidden rounded-3xl p-6 md:col-span-2 md:row-span-2 md:p-10"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 50%, transparent 100%)`,
            }}
          >
            {/* Schedule Call Button - Top Right */}
            <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
              <ScheduleCallDialog 
                accentColor={accentColor} 
                buttonLabel={lang === "german" ? "Termin vereinbaren" : "Schedule Call"}
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
            <div className="absolute inset-0 opacity-[0.02]">
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
                  <div
                    className="relative size-28 overflow-hidden rounded-full ring-4 ring-white shadow-2xl md:size-36"
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="size-full object-cover"
                    />
                  </div>
                  {/* Company logo badge */}
                  <div className="absolute -bottom-2 -right-2 size-14 overflow-hidden rounded-full bg-white shadow-lg ring-4 ring-white md:size-16">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
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
                    {job.position}
                  </p>
                  <p className="mt-1 text-stone-500">
                    @ {job.company}
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Quick info badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-sm">
                  <Sparkles className="size-3" style={{ color: accentColor }} />
                  8+ {lang === "german" ? "Jahre Erfahrung" : "Years Experience"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-sm">
                  Full-Stack Developer
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-sm">
                  {lang === "german" ? "KI-Spezialist" : "AI Specialist"}
                </span>
              </div>
            </div>
          </div>

          {/* CV Card */}
          <Link
            href={`/${id}/cv`}
            className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
              }}
            />
            <div className="relative z-10">
              <div
                className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <FileText className="size-6" style={{ color: accentColor }} />
              </div>
              <h2 className="text-lg font-semibold text-stone-900">
                {translations.resume}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                {translations.resumeDescription}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: accentColor }}>
                <span>{lang === "german" ? "Ansehen" : "View"}</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Cover Letter Card - conditional */}
          {job.hasCoverLetter ? (
            <Link
              href={`/${id}/cover-letter`}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
                }}
              />
              <div className="relative z-10">
                <div
                  className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <ScrollText className="size-6" style={{ color: accentColor }} />
                </div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {translations.coverLetter}
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  {translations.coverLetterDescription}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: accentColor }}>
                  <span>{lang === "german" ? "Ansehen" : "View"}</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="relative overflow-hidden rounded-3xl bg-stone-50 p-6">
              <div className="relative z-10 opacity-40">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-stone-200">
                  <ScrollText className="size-6 text-stone-400" />
                </div>
                <h2 className="text-lg font-semibold text-stone-400">
                  {translations.coverLetter}
                </h2>
                <p className="mt-1 text-sm text-stone-400">
                  {lang === "german" ? "Nicht verfügbar" : "Not available"}
                </p>
              </div>
            </div>
          )}

          {/* Chat Card - Full width */}
          <Link
            href={`/${id}/talk`}
            className="group relative col-span-1 overflow-hidden rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:col-span-3"
            style={{ backgroundColor: accentColor }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="size-14 overflow-hidden rounded-full ring-4 ring-white/30">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="size-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-white bg-emerald-400" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-white">
                    {translations.talkToMe}
                  </h2>
                  <p className="text-sm text-white/80">
                    {translations.chatToLearnMore}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden flex-wrap justify-end gap-2 md:flex">
                  {(job.defaultQuestions ?? translations.defaultQuestions).slice(0, 2).map((q) => (
                    <span
                      key={q}
                      className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                    >
                      {q}
                    </span>
                  ))}
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                  <MessageCircle className="size-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="flex mt-4 opacity-100 justify-center">
          <CommandMenu className="shadow-none" hasCoverLetter={job.hasCoverLetter} currentPage="overview" lang={lang} />
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">
          {lang === "german" 
            ? "Diese interaktive Bewerbung wurde mit meinem Brain Next.js, Tailwind CSS, und ShadCN erstellt."
            : "This interactive application was built with my Brain, Next.js, Tailwind CSS, and ShadCN."}
        </p>
      </div>
    </div>
  );
}
