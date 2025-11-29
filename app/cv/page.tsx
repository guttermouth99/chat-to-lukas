import { Metadata } from "next";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lukas Stockburger - CV",
  description: "Full-Stack Entwickler & Co-Founder",
};

interface ExperienceItemProps {
  period: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  achievements: string[];
}

function ExperienceItem({
  period,
  title,
  company,
  location,
  description,
  achievements,
}: ExperienceItemProps) {
  return (
    <div className="relative pl-6 pb-8 last:pb-0 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-linear-to-b from-[#F64C72] to-[#F64C72]/20 group-last:hidden" />
      {/* Timeline dot */}
      <div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-[#F64C72] ring-2 ring-[#F64C72]/20" />

      <div className="space-y-2">
        <p className="text-[10px] font-medium text-[#F64C72] tracking-wider uppercase">
          {period}
        </p>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-600">
          {company} · {location}
        </p>
        {description && (
          <p className="text-[10px] text-slate-500 italic">{description}</p>
        )}
        <ul className="space-y-1 mt-2">
          {achievements.map((achievement, index) => (
            <li
              key={index}
              className="text-[10px] text-slate-600 leading-relaxed flex items-start gap-1.5"
            >
              <span className="text-[#F64C72] mt-0.5">›</span>
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
}

function SkillCategory({ icon, title, skills }: SkillCategoryProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[#F64C72]">{icon}</span>
        <h4 className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide">
          {title}
        </h4>
      </div>
      <p className="text-[10px] text-slate-600 leading-relaxed">{skills}</p>
    </div>
  );
}

interface EducationItemProps {
  period: string;
  institution: string;
  location: string;
  degree: string;
  thesis?: string;
}

function EducationItem({
  period,
  institution,
  location,
  degree,
  thesis,
}: EducationItemProps) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-medium text-[#F64C72] tracking-wider uppercase">
        {period}
      </p>
      <h4 className="text-xs font-semibold text-slate-900">{institution}</h4>
      <p className="text-[10px] text-slate-600">{location}</p>
      <p className="text-[10px] text-slate-700">{degree}</p>
      {thesis && (
        <p className="text-[10px] text-slate-500 italic mt-1">{thesis}</p>
      )}
    </div>
  );
}

export default function CVPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 print:py-0 print:bg-white">
      {/* A4 Paper Container */}
      <div className="mx-auto w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none overflow-hidden">
        {/* Header */}
        <header className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-8 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F64C72]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#F64C72]/5 rounded-full blur-2xl" />

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
                Lukas Stockburger
              </h1>
              <p className="text-[#F64C72] text-lg font-medium tracking-wide">
                Full-Stack Entwickler & KI-Spezialist
              </p>

              {/* Contact Grid */}
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#F64C72]" />
                  <span className="text-xs">
                    Silbersteinstraße 124, 12051 Berlin
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-[#F64C72]" />
                  <span className="text-xs">+49 163 160 3074</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-[#F64C72]" />
                  <span className="text-xs">
                    lukas.stockburger@googlemail.com
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-[#F64C72]" />
                  <span className="text-xs">07.02.1990</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 col-span-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#F64C72]" />
                  <span className="text-xs">
                    linkedin.com/in/lukas-s-186583a2
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Profile Photo & Collaboration */}
            <div className="relative shrink-0">
              {/* Main Profile Photo */}
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#F64C72]/30 ring-offset-2 ring-offset-slate-900">
                <img
                  src="/lukas_avatar.jpeg"
                  alt="Lukas Stockburger"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full ring-2 ring-[#F64C72]/20 ring-offset-4 ring-offset-transparent" />

              {/* Citylab Logo - Overlapping */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-900 bg-white shadow-lg">
                <img
                  src="/citylab_logo.jpg"
                  alt="CityLAB Berlin"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Heart badge */}
              <div className="absolute -bottom-0.5 right-8 w-5 h-5 rounded-full bg-[#F64C72] flex items-center justify-center shadow-md ring-2 ring-slate-900">
                <Heart className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Profile Summary Section */}
        <section className="px-8 py-6 bg-linear-to-r from-[#F64C72]/10 via-slate-50/30 to-[#F64C72]/10 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-[#F64C72]/10 flex items-center justify-center">
                <UserCircle className="w-4 h-4 text-[#F64C72]" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Profil
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Erfahrener <span className="font-semibold text-slate-900">Full-Stack Entwickler & KI-Spezialist</span> mit über 8 Jahren Expertise in der Entwicklung KI-gestützter Web-Anwendungen und digitaler Prototypen. Spezialisiert auf TypeScript, React, Node.js und Docker sowie LLM-basierte Datenverarbeitung, Vektor-Datenbanken und intelligente Automatisierungssysteme. Nachweisliche Erfahrung im Aufbau skalierbarer Datenpipelines und API-Architekturen. Leidenschaftlicher Verfechter von Open Source und gemeinwohlorientierten Technologien. Kombiniert technische Exzellenz mit Kommunikationsstärke und agilen Arbeitsmethoden.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="grid grid-cols-[1fr_240px] gap-0">
          {/* Left Column - Experience */}
          <div className="px-8 py-6 border-r border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-[#F64C72]" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Arbeitserfahrung
              </h2>
            </div>

            <div className="space-y-0">
              <ExperienceItem
                period="01/2022 – Heute"
                title="Co-Founder & Full-Stack Entwickler"
                company="baito UG"
                location="Berlin"
                description="Impact-Jobboard & Job-Newsletter Automatisierungsplattform – getbaito.com & talentalert.io"
                achievements={[
                  "Entwicklung KI-gestützter Klassifizierungssysteme mit LLMs für automatisierte Datenverarbeitung",
                  "Aufbau skalierbarer Datenpipelines: ~10.000 Karriereseiten/Monat crawlen & verarbeiten",
                  "Integration von Vektor-Datenbanken (Weaviate, Typesense) für semantische Suche & NLP",
                  "API-Architektur & Server-Infrastruktur mit TypeScript, Node.js, tRPC & Docker",
                  "Produktentwicklung mit React/Next.js, PostgreSQL (Prisma) & MongoDB",
                  "Prompt Engineering & KI-Agents für intelligente Workflows und Automatisierung",
                ]}
              />

              <ExperienceItem
                period="01/2016 – 2022"
                title="Product-Builder & Full-Stack Entwickler"
                company="Einzelunternehmer"
                location="Berlin"
                achievements={[
                  "Eigenständige Konzeption & Entwicklung von ~25 digitalen Prototypen und Web-Tools",
                  "Full-Stack: React, Next.js, Node.js, REST-APIs, MongoDB, PostgreSQL",
                  "Agile Projektarbeit mit iterativer Entwicklung und schnellem Prototyping",
                ]}
              />

              <ExperienceItem
                period="02/2018 – 09/2020"
                title="Frontend Entwickler"
                company="Bærnholdt"
                location="Kopenhagen, Dänemark"
                description="Webagentur"
                achievements={[
                  "Moderne Webapps mit React Native, Vue.js, HTML5, CSS-in-JS, Webpack",
                  "SCRUM & Agile Development in Jira",
                ]}
              />

              <ExperienceItem
                period="07/2017 – 02/2018"
                title="Frontend Entwickler"
                company="Airy GmbH"
                location="Berlin"
                description="B2C Messenger"
                achievements={[
                  "Real-time Messaging mit Websockets",
                  "Test-fokussierte Entwicklung mit Mocha.js",
                ]}
              />

              <ExperienceItem
                period="11/2015 – 01/2017"
                title="Co-Founder"
                company="Sweeker UG"
                location="Berlin"
                description="Sneaker Mobile Shopping App"
                achievements={[
                  "Konzept & Business Model Entwicklung",
                  "Partnership Management mit Partnershops",
                ]}
              />

              <ExperienceItem
                period="04/2015 – 09/2015"
                title="Business Development Manager"
                company="GoButler GmbH"
                location="Berlin"
                achievements={[
                  "Leitung von 15 Mitarbeiter:innen & Durchführung von Workshops",
                  "Strategische Planung, Prozessoptimierung & Stakeholder-Kommunikation",
                ]}
              />
            </div>
          </div>

          {/* Right Column - Skills, Education, Languages */}
          <div className="bg-slate-50/50 px-5 py-6">
            {/* Skills Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-4 h-4 text-[#F64C72]" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Fähigkeiten
                </h2>
              </div>

              <div className="space-y-3">
                <SkillCategory
                  icon={<Brain className="w-3 h-3" />}
                  title="KI & Machine Learning"
                  skills="LLMs, NLP, Prompt Engineering, KI-Agents, Vektor-Datenbanken, Embeddings, AI-SDK, Datenklassifizierung"
                />

                <div className="bg-[#F64C72]/10 border border-[#F64C72]/30 rounded-md p-2">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#F64C72]" />
                    <p className="text-[9px] font-semibold text-[#F64C72]">
                      OpenAI Award 2025
                    </p>
                  </div>
                  <p className="text-[9px] text-[#F64C72] mt-0.5">
                    10 Mrd. verarbeitete Tokens via API
                  </p>
                </div>

                <SkillCategory
                  icon={<Sparkles className="w-3 h-3" />}
                  title="AI Tooling & Prototyping"
                  skills="Cursor, V0, Claude, ChatGPT, Gemini, Figma, Stagehand, MCP"
                />

                <SkillCategory
                  icon={<Globe className="w-3 h-3" />}
                  title="Web Entwicklung"
                  skills="TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, Prisma, tRPC, REST-APIs, BullMQ"
                />

                <SkillCategory
                  icon={<Server className="w-3 h-3" />}
                  title="Infrastructure & DevOps"
                  skills="Docker, Vercel, AWS, Hetzner, Datenpipelines, Scraping, git"
                />

                <SkillCategory
                  icon={<Users className="w-3 h-3" />}
                  title="Agile & Kommunikation"
                  skills="SCRUM, Agile Development, Jira, Workshop-Moderation, Stakeholder-Kommunikation"
                />

                <SkillCategory
                  icon={<Briefcase className="w-3 h-3" />}
                  title="Weitere Kompetenzen"
                  skills="Open Source, Design Thinking, Prototyping, Team Leadership"
                />
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-[#F64C72]" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Ausbildung
                </h2>
              </div>

              <div className="space-y-4">
                <EducationItem
                  period="02/2018 – 04/2020"
                  institution="Copenhagen Business School"
                  location="Kopenhagen, Dänemark"
                  degree="Master in E-Business"
                  thesis="Masterarbeit: Blockchain-based Identity Management for Public Transportation (Publiziert)"
                />

                <EducationItem
                  period="01/2014 – 06/2014"
                  institution="Universidad de los Andes"
                  location="Bogotá, Kolumbien"
                  degree="Auslandssemester Business Administration"
                />

                <EducationItem
                  period="09/2011 – 09/2014"
                  institution="Maastricht University"
                  location="Maastricht, Niederlande"
                  degree="B.Sc. International Business"
                />

                <EducationItem
                  period="09/2007 – 07/2010"
                  institution="Friedrich Fischer Schule"
                  location="Schweinfurt"
                  degree="Fachhochschulreife"
                />
              </div>
            </div>

            {/* Languages Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-4 h-4 text-[#F64C72]" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Sprachen
                </h2>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-700">Deutsch</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-[#F64C72]"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-700">Englisch</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${i < 4 ? "bg-[#F64C72]" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-700">Spanisch</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${i < 2 ? "bg-[#F64C72]" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}

