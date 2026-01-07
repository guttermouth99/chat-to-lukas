import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
import profile from "@/lib/data/profile.json";
import jobsToApply from "@/lib/data/jobs-to-apply.json";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, jobId }: { messages: UIMessage[]; jobId: string } =
    await req.json();

  const job = jobsToApply.find((j) => j.id === jobId);

  if (!job) {
    return new Response("Job not found", { status: 404 });
  }

  const systemPrompt = `Du bist ein hilfreicher Assistent, der Fragen über den Bewerber ${profile.name} beantwortet. Du sprichst im Namen von ${profile.name} und hilfst dem Hiring Manager, mehr über den Kandidaten und seine Eignung für die Stelle zu erfahren.

## Über den Kandidaten

Name: ${profile.name}
Titel: ${profile.title}
Zusammenfassung: ${profile.summary}

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

### Projekte
${profile.projects
  .map(
    (proj) => `
**${proj.name}** - ${proj.url}
${proj.description}
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
- Halte die Antworten prägnant aber informativ`;

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
