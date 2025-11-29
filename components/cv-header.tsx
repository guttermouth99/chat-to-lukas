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

interface CVHeaderProps {
  personal: CVPersonal;
  accentColor: string;
  showTalkToMe?: boolean;
}

export function CVHeader({ personal, accentColor, showTalkToMe = true }: CVHeaderProps) {
  return (
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
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative">
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

          {/* Talk to me button */}
          {showTalkToMe && personal.talkToMe && (
            <div className="mt-4 flex flex-col items-center print:hidden">
              <a
                href={personal.talkToMe}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <MessageCircle className="w-4 h-4" />
                Talk to me
              </a>
              <span className="text-[10px] text-slate-400 mt-1.5">
                opens my own chat
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

