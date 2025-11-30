import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface Project {
  name: string;
  logo: string;
  url: string;
  description: string;
}

interface ProjectsCardProps {
  projects: Project[];
}

export function ProjectsCard({ projects }: ProjectsCardProps) {
  return (
    <Card className="w-full max-w-full border-stone-200 bg-gradient-to-br from-stone-50 to-white shadow-lg overflow-hidden">
      <CardContent className="pt-0 pb-4 px-3 sm:px-6">
        <h4 className="text-base sm:text-lg font-medium text-stone-500 mb-3">
          Meine Projekte
        </h4>
        <div className="space-y-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-xl bg-white ring-1 ring-stone-100 hover:ring-stone-200 transition-all group"
            >
              <div className="size-10 sm:size-12 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h5 className="font-semibold text-stone-900 text-sm sm:text-base truncate">
                    {project.name}
                  </h5>
                  <ExternalLink className="size-3 text-stone-400 group-hover:text-stone-600 shrink-0 transition-colors" />
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

