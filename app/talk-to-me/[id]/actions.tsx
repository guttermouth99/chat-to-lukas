"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { getMutableAIState, streamUI } from "@ai-sdk/rsc";
import { generateId } from "ai";
import { ReactNode } from "react";
import { z } from "zod";
import { ContactCard } from "@/components/linkedin-connect";
import { ProjectsCard } from "@/components/projects-card";
import profile from "@/lib/data/profile.json";
import jobsToApply from "@/lib/data/jobs-to-apply.json";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

function getSystemPrompt(jobId: string) {
  const job = jobsToApply.find((j) => j.id === jobId);
  if (!job) return "";

  return `Du bist ein hilfreicher Assistent, der Fragen über den Bewerber ${profile.name} beantwortet. Du sprichst im Namen von ${profile.name} und hilfst dem Hiring Manager, mehr über den Kandidaten und seine Eignung für die Stelle zu erfahren.

## Über den Kandidaten

Name: ${profile.name}
Titel: ${profile.title}
Zusammenfassung: ${profile.summary}
LinkedIn: ${profile.linkedin}

### Skills
- Frontend: ${profile.skills.frontend.join(", ")}
- Backend: ${profile.skills.backend.join(", ")}
- Datenbanken: ${profile.skills.databases.join(", ")}
- KI/ML: ${profile.skills.ai_ml.join(", ")}
- DevOps: ${profile.skills.devops.join(", ")}
- Tools: ${profile.skills.tools.join(", ")}

### Sprachen
- Deutsch: ${profile.languages.german}
- Englisch: ${profile.languages.english}

### Berufserfahrung
${profile.experience
  .map(
    (exp) => `
**${exp.title}** bei ${exp.company} (${exp.period})
${exp.location} - ${exp.description}
${exp.highlights.map((h) => `- ${h}`).join("\n")}
`
  )
  .join("\n")}

## Über die Stelle

Unternehmen: ${job.company}
Position: ${job.position}
Stellenbeschreibung:
${job.description}

## Deine Aufgabe

Beantworte Fragen des Hiring Managers über ${profile.name}:
- Sei freundlich, professionell und authentisch
- Hebe relevante Erfahrungen und Skills hervor, die zur Stelle passen
- Sei ehrlich über Fähigkeiten und Erfahrungen
- Beziehe dich konkret auf die Anforderungen der Stelle
- Antworte auf Deutsch, es sei denn, der Hiring Manager schreibt auf Englisch
- Halte die Antworten prägnant aber informativ

### Projekte
${profile.projects
  .map((p) => `- **${p.name}**: ${p.description}`)
  .join("\n")}

## Verfügbare Tools

Du hast Zugriff auf folgende Tools:

**showContactCard**: Zeigt eine Kontaktkarte mit E-Mail, Telefon und LinkedIn. Verwende es wenn:
- Der Nutzer nach Kontaktmöglichkeiten fragt
- Der Nutzer "connecten" oder "verbinden" erwähnt
- Der Nutzer nach dem LinkedIn-Profil, E-Mail oder Telefonnummer fragt

**showProjects**: Zeigt eine Übersicht aller Projekte. Verwende es wenn:
- Der Nutzer nach Projekten, Portfolio oder Arbeitsproben fragt
- Der Nutzer nach baito, talentalert oder gebrauchtebuecher fragt
- Der Nutzer wissen möchte, was der Kandidat gebaut hat`;
}

export async function continueConversation(
  input: string,
  jobId: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: google("gemini-2.0-flash"),
    system: getSystemPrompt(jobId),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return (
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {content}
        </div>
      );
    },
    tools: {
      showContactCard: {
        description:
          "Zeigt eine Kontaktkarte mit E-Mail, Telefon und LinkedIn an, damit der Nutzer Kontakt aufnehmen kann. Verwende dieses Tool wenn der Nutzer nach Kontaktmöglichkeiten, E-Mail, Telefon, Vernetzung oder dem LinkedIn-Profil fragt.",
        inputSchema: z.object({}),
        generate: async () => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Hier sind meine Kontaktdaten:`,
            },
          ]);

          return (
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed">
                Sehr gerne! Hier sind meine Kontaktdaten – Sie können mich jederzeit erreichen:
              </p>
              <ContactCard
                name={profile.name}
                title={profile.title}
                avatar={profile.avatar}
                linkedinUrl={profile.linkedin}
                email={profile.email}
                phone={profile.phone}
              />
            </div>
          );
        },
      },
      showProjects: {
        description:
          "Zeigt eine Übersicht aller Projekte des Kandidaten an. Verwende dieses Tool wenn der Nutzer nach Projekten, Portfolio, Arbeitsproben, baito, talentalert oder gebrauchtebuecher fragt.",
        inputSchema: z.object({}),
        generate: async () => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Hier sind meine Projekte:`,
            },
          ]);

          return (
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed">
                Hier sind einige meiner wichtigsten Projekte, die ich entwickelt habe:
              </p>
              <ProjectsCard projects={profile.projects} />
            </div>
          );
        },
      },
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}

