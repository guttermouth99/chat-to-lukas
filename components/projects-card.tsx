import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card className="w-full border-stone-200 bg-gradient-to-br from-stone-50 to-white shadow-lg overflow-hidden">
      <CardContent className="pt-0 pb-6">
        <h4 className="text-lg font-medium text-stone-500 mb-4">
          Meine Projekte
        </h4>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex items-start gap-4 p-4 rounded-xl bg-white ring-1 ring-stone-100 hover:ring-stone-200 transition-all"
            >
              <div className="size-12 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h5 className="font-semibold text-stone-900">
                    {project.name}
                  </h5>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-stone-500 hover:text-stone-900 shrink-0 h-8 px-2"
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <ExternalLink className="size-3.5" />
                      <span className="text-xs">Besuchen</span>
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

