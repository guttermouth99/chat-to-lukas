import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Phone } from "lucide-react";

interface ContactCardProps {
  name: string;
  title: string;
  avatar: string;
  linkedinUrl: string;
  email: string;
  phone: string;
}

export function ContactCard({
  name,
  title,
  avatar,
  linkedinUrl,
  email,
  phone,
}: ContactCardProps) {
  return (
    <Card className="w-full border-stone-200 bg-gradient-to-br from-stone-50 to-white shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <h4 className="text-sm font-medium text-stone-500 mb-4">Let&apos;s connect</h4>
        <div className="flex items-start gap-5">
          <Avatar className="size-16 ring-2 ring-[#0A66C2]/20 shrink-0">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-[#0A66C2] text-white text-xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-stone-900">{name}</h3>
            <p className="text-sm text-stone-500 mb-4">{title}</p>

            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Mail className="size-4 text-stone-400" />
                <span className="truncate">{email}</span>
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Phone className="size-4 text-stone-400" />
                <span>{phone}</span>
              </a>
            </div>
          </div>

          <Button
            asChild
            size="sm"
            className="bg-[#0A66C2] hover:bg-[#004182] text-white shrink-0"
          >
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="size-4" />
              Verbinden
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Keep the old export name for backwards compatibility
export const LinkedInConnect = ContactCard;
