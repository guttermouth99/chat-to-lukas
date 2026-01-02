import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Calendar,
  Heart,
  MessageCircle,
} from "lucide-react";
import { CVPersonal } from "@/lib/types/cv";
import { t, type Language } from "@/lib/translations";
import Link from 'next/link';

interface CVHeaderProps {
  personal: CVPersonal;
  accentColor: string;
  showTalkToMe?: boolean;
  lang?: Language;
  isPrint?: boolean;
}

export function CVHeader({ personal, accentColor, showTalkToMe = true, lang = "german", isPrint = false }: CVHeaderProps) {
  const translations = t(lang);

  if (isPrint) {
    return (
      <header className="relative bg-slate-900 text-white px-8 py-6 border-b border-slate-800">
        <div className="flex flex-row items-start justify-between gap-6">
          {/* Left side - Name & Contact */}
          <div className="flex-1 text-left">
            <h1 className="text-3xl font-bold tracking-tight mb-0.5">
              {personal.fullName}
            </h1>
            <p
              className="text-lg font-medium tracking-wide mb-3"
              style={{ color: accentColor }}
            >
              {personal.workingTitle}
            </p>

            {/* Contact Grid - Compact & Horizontal */}
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-xs">{personal.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-xs">{personal.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-xs">{personal.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-xs">{personal.birthday}</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <Linkedin className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-xs">{personal.linkedin}</span>
              </div>
            </div>
          </div>

          {/* Right side - Simple Avatar */}
          <div className="shrink-0">
            <div className="relative w-20 h-20">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-1 ring-slate-700">
                <img
                  src={personal.avatar}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Company Logo Badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full overflow-hidden ring-2 ring-slate-900 bg-white shadow-sm">
                <img
                  src={personal.companyLogo}
                  alt={personal.companyName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Heart badge */}
              <div
                className="absolute -bottom-0.5 right-6 w-4 h-4 rounded-full flex items-center justify-center shadow-md ring-2 ring-slate-900"
                style={{ backgroundColor: accentColor }}
              >
                <Heart className="w-2 h-2 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-6 md:px-8 md:py-8 print:px-8 print:py-8 overflow-hidden">
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

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center md:items-start md:justify-between gap-4 md:gap-6 print:flex-row print:items-start print:justify-between print:gap-6">
        {/* Left side - Name & Contact */}
        <div className="flex-1 text-center md:text-left print:text-left">
          <h1 className="text-2xl md:text-4xl print:text-4xl font-bold tracking-tight mb-1">
            {personal.fullName}
          </h1>
          <p
            className="text-base md:text-lg print:text-lg font-medium tracking-wide"
            style={{ color: accentColor }}
          >
            {personal.workingTitle}
          </p>

          {/* Contact Grid */}
          <div className="mt-4 md:mt-6 print:mt-6 grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center justify-center md:justify-start print:justify-start gap-2 text-slate-300">
              <Phone
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span className="text-xs">{personal.phone}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start print:justify-start gap-2 text-slate-300">
              <Mail
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span className="text-xs">{personal.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start print:justify-start gap-2 text-slate-300 md:col-span-2 print:col-span-2">
              <Linkedin
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span className="text-xs">{personal.linkedin}</span>
            </div>
          </div>
        </div>

        {/* Right side - Profile Photo & Collaboration */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative">
            {/* Main Profile Photo */}
            <div
              className="w-20 h-20 md:w-28 md:h-28 print:w-28 print:h-28 rounded-full overflow-hidden ring-4 ring-offset-2 ring-offset-slate-900"
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
            <div className="absolute -bottom-1 -right-1 w-10 h-10 md:w-12 md:h-12 print:w-12 print:h-12 rounded-full overflow-hidden ring-2 ring-slate-900 bg-white shadow-lg">
              <img
                src={personal.companyLogo}
                alt={personal.companyName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Heart badge */}
            <div
              className="absolute -bottom-0.5 right-6 md:right-8 print:right-8 w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-slate-900"
              style={{ backgroundColor: accentColor }}
            >
              <Heart className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          </div>

          {/* Talk to me button */}
          {showTalkToMe && personal.talkToMe && (
            <div className="mt-3 md:mt-4 print:mt-4 flex flex-col items-center print:hidden">
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
      </div>
    </header>
  );
}
