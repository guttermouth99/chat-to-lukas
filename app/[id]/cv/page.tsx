import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Calendar,
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
  Heart,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { CVData, CVWorkExperience, CVEducation, CVAward } from "@/lib/types/cv";

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

// Dynamic data loader
async function getCVData(id: string): Promise<CVData | null> {
  try {
    const data = await import(`@/lib/data/cv/${id}.json`);
    return data.default as CVData;
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
      title: "CV Not Found",
    };
  }

  return {
    title: `${data.personal.fullName} - CV`,
    description: data.personal.workingTitle,
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
          className="text-[10px] font-medium tracking-wider uppercase"
          style={{ color: accentColor }}
        >
          {experience.period}
        </p>
        <h3 className="text-sm font-semibold text-slate-900">
          {experience.title}
        </h3>
        <p className="text-xs text-slate-600">
          {experience.company} · {experience.location}
        </p>
        {experience.description && (
          <p className="text-[10px] text-slate-500 italic">
            {experience.description}
          </p>
        )}
        <ul className="space-y-1 mt-2">
          {experience.achievements.map((achievement, index) => (
            <li
              key={index}
              className="text-[10px] text-slate-600 leading-relaxed flex items-start gap-1.5"
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
        <h4 className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide">
          {title}
        </h4>
      </div>
      <p className="text-[10px] text-slate-600 leading-relaxed">{skills}</p>
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
        <Award className="w-3 h-3" style={{ color: accentColor }} />
        <p className="text-[9px] font-semibold" style={{ color: accentColor }}>
          {award.title}
        </p>
      </div>
      <p className="text-[9px] mt-0.5" style={{ color: accentColor }}>
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
        className="text-[10px] font-medium tracking-wider uppercase"
        style={{ color: accentColor }}
      >
        {education.period}
      </p>
      <h4 className="text-xs font-semibold text-slate-900">
        {education.institution}
      </h4>
      <p className="text-[10px] text-slate-600">{education.location}</p>
      <p className="text-[10px] text-slate-700">{education.degree}</p>
      {education.thesis && (
        <p className="text-[10px] text-slate-500 italic mt-1">
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

function LanguageBar({ name, level, accentColor }: LanguageBarProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-700">{name}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: i < level ? accentColor : "#e2e8f0",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default async function CVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getCVData(id);

  if (!data) {
    notFound();
  }

  const { theme, personal, labels, profileSummary, workExperience, skills, awards, education, languages } = data;
  const accentColor = theme.accentColor;

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
    <div className="min-h-screen bg-slate-100 py-8 print:py-0 print:bg-white">
      {/* A4 Paper Container */}
      <div className="mx-auto w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none overflow-hidden">
        {/* Header */}
        <header className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-8 overflow-hidden">
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${accentColor}1a` }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full blur-2xl"
            style={{ backgroundColor: `${accentColor}0d` }}
          />

          {/* Geometric pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-6">
            {/* Left side - Name & Contact */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight mb-1">
                {personal.fullName}
              </h1>
              <p
                className="text-lg font-medium tracking-wide"
                style={{ color: accentColor }}
              >
                {personal.workingTitle}
              </p>

              {/* Contact Grid */}
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                  <span className="text-xs">{personal.address}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                  <span className="text-xs">{personal.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                  <span className="text-xs">{personal.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                  <span className="text-xs">{personal.birthday}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 col-span-2">
                  <Linkedin
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                  <span className="text-xs">{personal.linkedin}</span>
                </div>
              </div>
            </div>

            {/* Right side - Profile Photo & Collaboration */}
            <div className="relative shrink-0">
              {/* Main Profile Photo */}
              <div
                className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-offset-2 ring-offset-slate-900"
                style={{ boxShadow: `0 0 0 4px ${accentColor}4d` }}
              >
                <img
                  src={personal.avatar}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div
                className="absolute inset-0 rounded-full ring-2 ring-offset-4 ring-offset-transparent"
                style={{ boxShadow: `0 0 0 2px ${accentColor}33` }}
              />

              {/* Company Logo - Overlapping */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-900 bg-white shadow-lg">
                <img
                  src={personal.companyLogo}
                  alt={personal.companyName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Heart badge */}
              <div
                className="absolute -bottom-0.5 right-8 w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-slate-900"
                style={{ backgroundColor: accentColor }}
              >
                <Heart className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Profile Summary Section */}
        <section
          className="px-8 py-6 border-b border-slate-200"
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
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {labels.profile}
              </h2>
              <p
                className="text-[11px] text-slate-700 leading-relaxed"
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
        <main className="grid grid-cols-[1fr_240px] gap-0">
          {/* Left Column - Experience */}
          <div className="px-8 py-6 border-r border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4" style={{ color: accentColor }} />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
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
          <div className="bg-slate-50/50 px-5 py-6">
            {/* Skills Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
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
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
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
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
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
        </main>
      </div>
    </div>
  );
}
