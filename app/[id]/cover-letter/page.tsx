import { Metadata } from "next";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { CVData, CoverLetterData } from "@/lib/types/cv";
import { CVHeader } from "@/components/cv-header";
import { PageNavigation } from "@/components/page-navigation";
import { t, type Language } from "@/lib/translations";
import jobsToApply from "@/lib/data/jobs-to-apply.json";

// Load cover letter from markdown file
async function getCoverLetterFromMarkdown(id: string): Promise<CoverLetterData | null> {
  try {
    const filePath = path.join(process.cwd(), "lib", "data", id, "motivational.md");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Split content into paragraphs (separated by double newlines)
    const paragraphs = content
      .trim()
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0);

    return {
      recipient: data.recipient,
      date: data.date,
      subject: data.subject,
      greeting: data.greeting,
      paragraphs,
      closing: data.closing,
      signature: data.signature,
    };
  } catch {
    return null;
  }
}

// Dynamic data loader
async function getCVData(id: string): Promise<CVData | null> {
  try {
    const data = await import(`@/lib/data/${id}/application-data.json`);
    const cvData = data.default as CVData;

    // Try to load cover letter from markdown file
    const markdownCoverLetter = await getCoverLetterFromMarkdown(id);
    if (markdownCoverLetter) {
      cvData.coverLetter = markdownCoverLetter;
    }

    return cvData;
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
  const data = await getCVData(id);

  if (!data) {
    return {
      title: "Cover Letter Not Found",
    };
  }

  const title = `${data.personal.fullName} × ${data.personal.companyName} - Anschreiben`;
  const description = `Motivationsschreiben für die Bewerbung bei ${data.personal.companyName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: `/api/meta-images/cover-letter?id=${id}`,
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
      images: [`/api/meta-images/cover-letter?id=${id}`],
    },
  };
}

export default async function CoverLetterPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const job = jobsToApply.find((j) => j.id === id);

  if (!job || !job.enabled) {
    notFound();
  }

  const { pdf } = await searchParams;
  const isPdf = pdf === 'true';
  const data = await getCVData(id);

  if (!data || !data.coverLetter) {
    notFound();
  }

  const { theme, personal, coverLetter } = data;
  const accentColor = theme.accentColor;
  const lang = (data.lang || "german") as Language;
  const translations = t(lang);

  return (
    <div className={`min-h-screen bg-slate-100 print:py-0 print:bg-white ${isPdf ? 'py-0 bg-white!' : 'py-0 md:py-8 pb-20 md:pb-8'}`}>
      {/* A4 Paper Container */}
      <div className={`mx-auto w-full md:w-[210mm] print:w-[210mm] md:min-h-[297mm] print:min-h-[297mm] bg-white shadow-none md:shadow-2xl print:shadow-none overflow-hidden flex flex-col ${isPdf ? 'shadow-none w-[210mm] min-h-[297mm]' : ''}`}>
        {/* Reusable Header */}
        <CVHeader
          personal={personal}
          accentColor={accentColor}
          showTalkToMe={true}
          lang={lang}
          isPrint={isPdf}
        />

        {/* Letter Content */}
        <main className="flex-1 px-4 md:px-12 print:px-12 py-6 md:py-10 print:py-10">
          {/* Subject Line & Date */}
          <div className="flex justify-between items-start gap-4 mb-6 md:mb-8 print:mb-8">
            <div className="flex-1">
              <h2 className="text-base md:text-lg print:text-lg font-bold text-slate-900">
                {coverLetter.subject}
              </h2>
              <div
                className="w-16 h-1 mt-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            {/* Date - Only visible in print */}
            <p
              className="text-sm font-medium hidden print:block shrink-0"
              style={{ color: accentColor }}
            >
              {coverLetter.date}
            </p>
          </div>

          {/* Greeting */}
          <p className="text-sm text-slate-700 mb-4 md:mb-6 print:mb-6">{coverLetter.greeting}</p>

          {/* Letter Body */}
          <div className="space-y-3 md:space-y-4 print:space-y-4">
            {coverLetter.paragraphs.map((paragraph, index) => {
              const isPromoParagraph = paragraph.includes('hirelukas.dev');
              // Hide promo paragraph on screen, show only in print/PDF
              // If isPdf is true (PDF generation mode), we want it visible (so no hidden class)
              // If isPdf is false (browser mode), we want it hidden on screen but visible in native print
              const visibilityClass = isPromoParagraph && !isPdf ? 'hidden print:block' : '';

              return (
                <div key={index} className={visibilityClass}>
                  {paragraph.startsWith('###') ? (
                    <h3 className="mt-6 mb-2 text-base font-semibold text-slate-900" style={{ color: accentColor }}>
                      {paragraph.replace(/^###\s+/, '')}
                    </h3>
                  ) : (
                    <p
                      className="text-sm text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" class="underline hover:opacity-80 text-[${accentColor}]" style="color: ${accentColor}">$1</a>`)
                          .replace(
                            /<strong>/g,
                            `<span class="font-semibold" style="color: ${accentColor}">`
                          )
                          .replace(/<\/strong>/g, '</span>'),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Closing & Signature */}
          <div className="mt-8 md:mt-10 print:mt-10 space-y-4 md:space-y-6 print:space-y-6">
            <p className="text-sm text-slate-700">{coverLetter.closing}</p>
            <div className="flex items-center gap-3 md:gap-4 print:gap-4">
              {/* Signature with avatar */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 print:w-12 print:h-12 rounded-full overflow-hidden ring-2"
                style={{ boxShadow: `0 0 0 2px ${accentColor}4d` }}
              >
                <img
                  src={personal.avatar}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="text-base md:text-lg print:text-lg font-semibold"
                style={{ color: accentColor }}
              >
                {coverLetter.signature}
              </p>
            </div>
          </div>
        </main>

        {/* Footer accent line */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, ${accentColor}, ${accentColor}66, transparent)`,
          }}
        />
      </div>

      {/* Navigation to CV */}
      {!isPdf && (
        <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
          <Link
            href={`/${id}/cv`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {translations.learnMoreAboutCV}
          </Link>
          <Link
            href={`/${id}/talk`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            {translations.chatToLearnMore}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      )}

      {/* Navigation - Command Menu + Sticky Talk Button */}
      {!isPdf && (
        <PageNavigation
          id={id}
          avatar={personal.avatar}
          fullName={personal.fullName}
          accentColor={accentColor}
          hasCoverLetter={true}
          currentPage="cover-letter"
          lang={lang}
        />
      )}
    </div>
  );
}

