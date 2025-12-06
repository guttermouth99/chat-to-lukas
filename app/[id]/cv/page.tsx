import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import {
  Globe,
  Code,
  Server,
  Brain,
  Users,
  Briefcase,
  GraduationCap,
  Languages,
  Award,
  UserCircle,
  Sparkles,
  MessageCircle,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { CVData, CVWorkExperience, CVEducation, CVAward } from "@/lib/types/cv";
import { CVHeader } from "@/components/cv-header";
import { PageNavigation } from "@/components/page-navigation";
import { t, type Language } from "@/lib/translations";

// Icon map to convert string names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Globe,
  Server,
  Users,
  Briefcase,
  Sparkles,
  Code,
};

// Check if cover letter exists (either in JSON or as markdown file)
async function hasCoverLetterContent(id: string, cvData: CVData): Promise<boolean> {
  // Check if coverLetter exists in JSON
  if (cvData.coverLetter) {
    return true;
  }

  // Check if motivational.md exists
  try {
    const filePath = path.join(process.cwd(), "lib", "data", id, "motivational.md");
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Dynamic data loader
async function getCVData(id: string): Promise<{ data: CVData; hasCoverLetter: boolean; lang: Language } | null> {
  try {
    const data = await import(`@/lib/data/${id}/application-data.json`);
    const cvData = data.default as CVData;
    const hasCoverLetter = await hasCoverLetterContent(id, cvData);
    return { data: cvData, hasCoverLetter, lang: cvData.lang ? cvData.lang as Language : "german" };
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
  const result = await getCVData(id);

  if (!result) {
    return {
      title: "CV Not Found",
    };
  }

  const { data, lang } = result;
  const title = `${data.personal.fullName} × ${data.personal.companyName} - ${t(lang).metaTitles.cv}`;
  const description = `${data.personal.workingTitle} - ${t(lang).metaDescriptions.cv} ${data.personal.companyName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: `/api/meta-images/cv?id=${id}`,
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
      images: [`/api/meta-images/cv?id=${id}`],
    },
  };
}

interface ExperienceItemProps {
  experience: CVWorkExperience;
  accentColor: string;
}

function ExperienceItem({ experience, accentColor }: ExperienceItemProps) {
  return (
    <div className="relative pl-6 pb-8 last:pb-0 group">
      {/* Timeline line */}
      <div
        className="absolute left-0 top-2 bottom-0 w-px group-last:hidden"
        style={{
          background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}33)`,
        }}
      />
      {/* Timeline dot */}
      <div
        className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full ring-2"
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 0 2px ${accentColor}33`,
        }}
      />

      <div className="space-y-2">
        <p
          className="text-[11px] font-medium tracking-wider uppercase"
          style={{ color: accentColor }}
        >
          {experience.period}
        </p>
        <h3 className="text-[15px] font-semibold text-slate-900">
          {experience.title}
        </h3>
        <p className="text-[13px] text-slate-600">
          {experience.company} · {experience.location}
        </p>
        {experience.description && (
          <p className="text-xs text-slate-500 italic">
            {experience.description}
          </p>
        )}
        <ul className="space-y-1 mt-2">
          {experience.achievements.map((achievement, index) => (
            <li
              key={index}
              className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5"
            >
              <span className="mt-0.5" style={{ color: accentColor }}>
                ›
              </span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  icon: React.ReactNode;
  title: string;
  skills: string;
  accentColor: string;
}

function SkillCategory({
  icon,
  title,
  skills,
  accentColor,
}: SkillCategoryProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <span style={{ color: accentColor }}>{icon}</span>
        <h4 className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">
          {title}
        </h4>
      </div>
      <p className="text-[11px] text-slate-600 leading-relaxed">{skills}</p>
    </div>
  );
}

interface AwardBadgeProps {
  award: CVAward;
  accentColor: string;
}

function AwardBadge({ award, accentColor }: AwardBadgeProps) {
  return (
    <div
      className="rounded-md p-2"
      style={{
        backgroundColor: `${accentColor}1a`,
        borderColor: `${accentColor}4d`,
        borderWidth: "1px",
      }}
    >
      <div className="flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5" style={{ color: accentColor }} />
        <p className="text-[11px] font-semibold" style={{ color: accentColor }}>
          {award.title}
        </p>
      </div>
      <p className="text-[10px] mt-0.5" style={{ color: accentColor }}>
        {award.description}
      </p>
    </div>
  );
}

interface EducationItemProps {
  education: CVEducation;
  accentColor: string;
}

function EducationItem({ education, accentColor }: EducationItemProps) {
  return (
    <div className="space-y-1">
      <p
        className="text-[11px] font-medium tracking-wider uppercase"
        style={{ color: accentColor }}
      >
        {education.period}
      </p>
      <h4 className="text-[13px] font-semibold text-slate-900">
        {education.institution}
      </h4>
      <p className="text-[11px] text-slate-600">{education.location}</p>
      <p className="text-[11px] text-slate-700">{education.degree}</p>
      {education.thesis && (
        <p className="text-[11px] text-slate-500 italic mt-1">
          {education.thesis}
        </p>
      )}
    </div>
  );
}

interface LanguageBarProps {
  name: string;
  level: number;
  accentColor: string;
}

function getLevelLabel(level: number): string {
  if (level >= 5) return "Muttersprache";
  if (level >= 4) return "Verhandlungssicher";
  if (level >= 3) return "Fließend";
  if (level >= 2) return "Gute Kenntnisse";
  return "Grundlagen";
}

function LanguageBar({ name, level, accentColor }: LanguageBarProps) {
  const percentage = Math.min(100, Math.max(0, (level / 5) * 100));

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-slate-800">{name}</span>
        <span className="text-slate-500 text-[10px] uppercase tracking-wide opacity-80">{getLevelLabel(level)}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${accentColor}66, ${accentColor})`,
          }}
        />
      </div>
    </div>
  );
}

export default async function CVPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { pdf } = await searchParams;
  const isPdf = pdf === 'true';
  const result = await getCVData(id);

  if (!result) {
    notFound();
  }

  const { data, hasCoverLetter } = result;
  const { theme, personal, labels, profileSummary, workExperience, skills, awards, education, languages } = data;
  const accentColor = theme.accentColor;
  const lang = (data.lang || "german") as Language;
  const translations = t(lang);

  // Group awards by skillIndex for inline rendering
  const awardsBySkillIndex = awards.reduce(
    (acc, award) => {
      if (!acc[award.skillIndex]) {
        acc[award.skillIndex] = [];
      }
      acc[award.skillIndex].push(award);
      return acc;
    },
    {} as Record<number, CVAward[]>
  );

  return (
    <div className={`min-h-screen bg-slate-100 print:py-0 print:bg-white ${isPdf ? 'py-0 bg-white!' : 'py-0 md:py-8 pb-20 md:pb-8'}`}>
      {/* A4 Paper Container */}
      <div className={`mx-auto w-full md:w-[210mm] print:w-[210mm] md:min-h-[297mm] print:min-h-[297mm] bg-white shadow-none md:shadow-2xl print:shadow-none overflow-hidden ${isPdf ? 'shadow-none w-[210mm] min-h-[297mm]' : ''}`}>
        {/* Header */}
        <CVHeader personal={personal} accentColor={accentColor} lang={lang} isPrint={isPdf} />

        {/* Profile Summary Section */}
        <section
          className="px-4 md:px-8 print:px-8 py-4 md:py-6 print:py-6 border-b border-slate-200"
          style={{
            background: `linear-gradient(to right, ${accentColor}1a, rgba(248, 250, 252, 0.3), ${accentColor}1a)`,
          }}
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}1a` }}
              >
                <UserCircle
                  className="w-4 h-4"
                  style={{ color: accentColor }}
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                {labels.profile}
              </h2>
              <p
                className="text-xs text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: profileSummary.replace(
                    /<strong>/g,
                    '<span class="font-semibold text-slate-900">'
                  ).replace(/<\/strong>/g, '</span>'),
                }}
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-[1fr_240px] print:grid-cols-[1fr_240px] gap-0">
          {/* Left Column - Experience */}
          <div className="px-4 md:px-8 print:px-8 py-4 md:py-6 print:py-6 md:border-r print:border-r border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4" style={{ color: accentColor }} />
              <h2 className="text-[15px] font-bold text-slate-900 uppercase tracking-wider">
                {labels.workExperience}
              </h2>
            </div>

            <div className="space-y-0">
              {workExperience.map((exp, index) => (
                <ExperienceItem
                  key={index}
                  experience={exp}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Skills, Education, Languages */}
          <div className="bg-slate-50/50 px-4 md:px-5 print:px-5 py-4 md:py-6 print:py-6 flex flex-col">
            <div className="flex-1">
              {/* Skills Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-4 h-4" style={{ color: accentColor }} />
                  <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                    {labels.skills}
                  </h2>
                </div>

                <div className="space-y-3">
                  {skills.map((skill, index) => {
                    const IconComponent = iconMap[skill.icon] || Code;
                    const skillAwards = awardsBySkillIndex[index] || [];

                    return (
                      <div key={index}>
                        <SkillCategory
                          icon={<IconComponent className="w-3 h-3" />}
                          title={skill.name}
                          skills={skill.skills}
                          accentColor={accentColor}
                        />
                        {skillAwards.map((award, awardIndex) => (
                          <div key={awardIndex} className="mt-2">
                            <AwardBadge award={award} accentColor={accentColor} />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Education Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap
                    className="w-4 h-4"
                    style={{ color: accentColor }}
                  />
                  <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                    {labels.education}
                  </h2>
                </div>

                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <EducationItem
                      key={index}
                      education={edu}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              </div>

              {/* Languages Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="w-4 h-4" style={{ color: accentColor }} />
                  <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                    {labels.languages}
                  </h2>
                </div>

                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <LanguageBar
                      key={index}
                      name={lang.name}
                      level={lang.level}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Talk to me button */}
            {personal.talkToMe && (
              <div className="mt-auto pt-4 flex flex-col items-center print:hidden">
                <Link
                  href={personal.talkToMe}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  <MessageCircle className="w-4 h-4" />
                  {translations.talkToMe}
                </Link>
                <span className="text-[10px] text-slate-400 mt-1.5">
                  {translations.opensMyChat}
                </span>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Navigation to Cover Letter */}
      {!isPdf && hasCoverLetter && (
        <div className="mt-6 flex justify-center print:hidden">
          <Link
            href={`/${id}/cover-letter`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            {translations.learnMoreAboutMotivation}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
          hasCoverLetter={hasCoverLetter}
          currentPage="cv"
          lang={lang}
        />
      )}
    </div>
  );
}
