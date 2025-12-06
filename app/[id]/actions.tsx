"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { getMutableAIState, streamUI } from "@ai-sdk/rsc";
import { generateId } from "ai";
import { readFileSync } from "fs";
import { join } from "path";
import { ReactNode } from "react";
import { z } from "zod";
import { ContactCard } from "@/components/linkedin-connect";
import { ProjectsCard } from "@/components/projects-card";
import { VideoCard } from "@/components/video-card";
import profile from "@/lib/data/profile.json";
import jobsToApply from "@/lib/data/jobs-to-apply.json";
import { t, type Language } from "@/lib/translations";

const bio = readFileSync(join(process.cwd(), "lib/data/bio.md"), "utf-8");
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

function getSystemPrompt(jobId: string, lang: Language) {
  const job = jobsToApply.find((j) => j.id === jobId);
  if (!job) return "";

  if (lang === "english") {
    return `You are a helpful assistant answering questions about the applicant ${profile.name}. You speak on behalf of ${profile.name} and help the Hiring Manager learn more about the candidate and their fit for the position.

## About the Candidate

Name: ${profile.name}
Title: ${profile.title}
Summary: ${profile.summary}
LinkedIn: ${profile.linkedin}

### Personal Background & Journey
${bio}

### Skills
- Frontend: ${profile.skills.frontend.join(", ")}
- Backend: ${profile.skills.backend.join(", ")}
- Databases: ${profile.skills.databases.join(", ")}
- AI/ML: ${profile.skills.ai_ml.join(", ")}
- DevOps: ${profile.skills.devops.join(", ")}
- Tools: ${profile.skills.tools.join(", ")}

### Languages
- German: ${profile.languages.german}
- English: ${profile.languages.english}

### Awards
${profile.awards
        .map((a) => `- **${a.name}** (${a.year}): ${a.description}`)
        .join("\n")}

### Work Experience
${profile.experience
        .map(
          (exp) => `
**${exp.title}** at ${exp.company} (${exp.period})
${exp.location} - ${exp.description}
${exp.highlights.map((h) => `- ${h}`).join("\n")}
`
        )
        .join("\n")}

## About the Position

Company: ${job.company}
Position: ${job.position}
Job Description:
${job.description}

## Your Task

Answer questions from the Hiring Manager about ${profile.name}:
- Be friendly, professional and authentic
- Highlight relevant experiences and skills that match the position
- Be honest about abilities and experiences
- Refer specifically to the requirements of the position
- Always respond in English
- Keep answers concise but informative

### Projects
${profile.projects
        .map((p) => `- **${p.name}**: ${p.description}`)
        .join("\n")}

## Available Tools

You have access to the following tools:

**showContactCard**: Shows a contact card with email, phone and LinkedIn. Use it when:
- The user asks about contact options
- The user mentions "connect" or "networking"
- The user asks for the LinkedIn profile, email or phone number

**showProjects**: Shows an overview of all projects. Use it when:
- The user asks about projects, portfolio or work samples
- The user asks about baito, talentalert or gebrauchtebuecher
- The user wants to know what the candidate has built

**showOpenAIAward**: Shows a video of the OpenAI Award. Use it when:
- The user asks about the OpenAI Award or recognition
- The user asks about awards, prizes or achievements
- The user wants to know if the candidate has received any awards
- The user asks about successes or achievements`;
  }

  return `Du bist ein hilfreicher Assistent, der Fragen über den Bewerber ${profile.name} beantwortet. Du sprichst im Namen von ${profile.name} und hilfst dem Hiring Manager, mehr über den Kandidaten und seine Eignung für die Stelle zu erfahren.

## Über den Kandidaten

Name: ${profile.name}
Titel: ${profile.title}
Zusammenfassung: ${profile.summary}
LinkedIn: ${profile.linkedin}

### Persönlicher Hintergrund & Werdegang
${bio}

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

### Auszeichnungen
${profile.awards
      .map((a) => `- **${a.name}** (${a.year}): ${a.description}`)
      .join("\n")}

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
- Antworte immer auf Deutsch
- Sprich den Nutzer immer mit "Du" an
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
- Der Nutzer wissen möchte, was der Kandidat gebaut hat

**showOpenAIAward**: Zeigt ein Video des OpenAI Awards. Verwende es wenn:
- Der Nutzer nach dem OpenAI Award oder der Auszeichnung fragt
- Der Nutzer nach Awards, Preisen oder Auszeichnungen fragt
- Der Nutzer wissen möchte, ob der Kandidat Auszeichnungen erhalten hat
- Der Nutzer nach Erfolgen oder Achievements fragt`;
}

export async function continueConversation(
  input: string,
  jobId: string
): Promise<ClientMessage> {
  "use server";

  const job = jobsToApply.find((j) => j.id === jobId);
  const lang = (job?.lang as Language) || "german";
  const translations = t(lang);

  const history = getMutableAIState();

  const result = await streamUI({
    model: google("gemini-2.0-flash"),
    system: getSystemPrompt(jobId, lang),
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
        description: lang === "english"
          ? "Shows a contact card with email, phone and LinkedIn so the user can get in touch. Use this tool when the user asks about contact options, email, phone, networking or the LinkedIn profile."
          : "Zeigt eine Kontaktkarte mit E-Mail, Telefon und LinkedIn an, damit der Nutzer Kontakt aufnehmen kann. Verwende dieses Tool wenn der Nutzer nach Kontaktmöglichkeiten, E-Mail, Telefon, Vernetzung oder dem LinkedIn-Profil fragt.",
        inputSchema: z.object({}),
        generate: async () => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: lang === "english" ? "Here are my contact details:" : "Hier sind meine Kontaktdaten:",
            },
          ]);

          return (
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed">
                {translations.hereAreMyContacts}
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
        description: lang === "english"
          ? "Shows an overview of all the candidate's projects. Use this tool when the user asks about projects, portfolio, work samples, baito, talentalert or gebrauchtebuecher."
          : "Zeigt eine Übersicht aller Projekte des Kandidaten an. Verwende dieses Tool wenn der Nutzer nach Projekten, Portfolio, Arbeitsproben, baito, talentalert oder gebrauchtebuecher fragt.",
        inputSchema: z.object({}),
        generate: async () => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: lang === "english" ? "Here are my projects:" : "Hier sind meine Projekte:",
            },
          ]);

          return (
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed">
                {translations.hereAreMyProjects}
              </p>
              <ProjectsCard projects={profile.projects} />
            </div>
          );
        },
      },
      showOpenAIAward: {
        description: lang === "english"
          ? "Shows a video of the OpenAI Award. Use this tool when the user asks about the OpenAI Award, awards, prizes, achievements or successes."
          : "Zeigt ein Video des OpenAI Awards an. Verwende dieses Tool wenn der Nutzer nach dem OpenAI Award, Auszeichnungen, Preisen, Awards, Erfolgen oder Achievements fragt.",
        inputSchema: z.object({}),
        generate: async () => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: lang === "english" ? "Here is my OpenAI Award:" : "Hier ist mein OpenAI Award:",
            },
          ]);

          return (
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed">
                {translations.openAIAwardResponse}
              </p>
              <VideoCard
                src="/openai-award.mov"
                title="OpenAI Award"
                description={lang === "english"
                  ? "baito was awarded by OpenAI after successfully classifying over 10 billion tokens using modern AI systems and scalable data pipelines."
                  : "baito wurde von OpenAI mit einem Award ausgezeichnet, nachdem wir erfolgreich über 10 Milliarden Tokens mittels moderner KI-Systeme und skalierbarer Datenpipelines klassifiziert haben."}
              />
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

