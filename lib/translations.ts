export type Language = "english" | "german";

interface Translations {
  // Command menu
  navigation: string;
  navigateToPages: string;
  noPages: string;
  pages: string;
  overview: string;
  overviewDescription: string;
  resume: string;
  resumeDescription: string;
  coverLetter: string;
  coverLetterDescription: string;
  chat: string;
  chatDescription: string;
  navigate: string;
  open: string;
  close: string;

  // Page navigation
  talkToMe: string;
  aiChat: string;
  opensMyChat: string;

  // Talk page
  jobNotFound: string;
  jobNotFoundDescription: string;
  chatWith: string;
  askQuestion: string;
  hello: string;
  askMeQuestions: string;
  learnMoreAboutCV: string;
  learnMoreAboutMotivation: string;
  chatToLearnMore: string;

  // Disclaimer Dialog
  disclaimerTitle: string;
  disclaimerText1: string;
  disclaimerText2: string;
  disclaimerPrivacy: string;
  disclaimerConfirm: string;
  disclaimerCancel: string;

  // Default questions
  defaultQuestions: string[];

  // AI responses
  hereAreMyContacts: string;
  hereAreMyProjects: string;
  openAIAwardResponse: string;

  // Meta titles and descriptions
  metaTitles: {
    index: string;
    cv: string;
    coverLetter: string;
    talk: string;
  };
  metaDescriptions: {
    index: string;
    cv: string;
    coverLetter: string;
    talk: string;
  };
}

const german: Translations = {
  // Command menu
  navigation: "Navigation",
  navigateToPages: "Navigieren Sie zu den verschiedenen Seiten",
  noPages: "Keine Seiten gefunden.",
  pages: "Seiten",
  overview: "Übersicht",
  overviewDescription: "Zurück zur Übersicht",
  resume: "Lebenslauf",
  resumeDescription: "CV & Erfahrung ansehen",
  coverLetter: "Anschreiben",
  coverLetterDescription: "Motivationsschreiben ansehen",
  chat: "Chat",
  chatDescription: "Mit mir chatten",
  navigate: "navigieren",
  open: "öffnen",
  close: "schließen",

  // Page navigation
  talkToMe: "Sprich mit mir",
  aiChat: "KI Chat",
  opensMyChat: "öffnet meinen Chat",

  // Talk page
  jobNotFound: "Job nicht gefunden",
  jobNotFoundDescription: "Diese Bewerbung existiert nicht.",
  chatWith: "Chat mit",
  askQuestion: "Stellen Sie mir eine Frage...",
  hello: "Hallo! Ich bin",
  askMeQuestions: "Stellen Sie mir Fragen über meine Erfahrung, Skills und meine Eignung für die Position als",
  learnMoreAboutCV: "Erfahre mehr über meinen Lebenslauf",
  learnMoreAboutMotivation: "Erfahre mehr über meine Motivation",
  chatToLearnMore: "Chatte mit mir um mehr zu erfahren",

  // Disclaimer Dialog
  disclaimerTitle: "KI-Assistent für diese Bewerbung",
  disclaimerText1: "Dieser Prototyp verwendet meine Bewerbungsunterlagen und ein Large Language Model (Gemini), um Fragen zu meinem Werdegang und meinen Fähigkeiten zu beantworten.",
  disclaimerText2: "Bitte beachten Sie, dass die generierten Antworten zwar auf meinen Daten basieren, KI-Modelle jedoch gelegentlich Informationen ungenau wiedergeben können. Die Antworten sind informativ und rechtlich nicht bindend.",
  disclaimerPrivacy: "Datenschutz-Hinweis: Es werden keine Chat-Daten in einer Datenbank gespeichert. Der Gesprächsverlauf wird lediglich im temporären Anwendungszustand gehalten und zur Verarbeitung an die Google Gemini API gesendet.",
  disclaimerConfirm: "Chat starten",
  disclaimerCancel: "Zurück zur Bewerbung",

  // Default questions
  defaultQuestions: [
    "Was sind deine Stärken?",
    "Erzähl mir von deiner Erfahrung",
    "Zeig mir deine Projekte",
    "Lass uns connecten!",
  ],

  // AI responses
  hereAreMyContacts: "Sehr gerne! Hier sind meine Kontaktdaten – Sie können mich jederzeit erreichen:",
  hereAreMyProjects: "Hier sind einige meiner wichtigsten Projekte, die ich entwickelt habe:",
  openAIAwardResponse: "Ja, ich habe von OpenAI einen Award für meine Arbeit mit baito bekommen.",
  metaTitles: {
    index: "Bewerbung",
    cv: "Lebenslauf",
    coverLetter: "Anschreiben",
    talk: "Chat",
  },
  metaDescriptions: {
    index: "Interaktive Bewerbung für die Position als",
    cv: "Lebenslauf für die Bewerbung bei",
    coverLetter: "Anschreiben für die Bewerbung bei",
    talk: "Chat mit",
  },
};

const english: Translations = {
  // Command menu
  navigation: "Navigation",
  navigateToPages: "Navigate to different pages",
  noPages: "No pages found.",
  pages: "Pages",
  overview: "Overview",
  overviewDescription: "Back to overview",
  resume: "Resume",
  resumeDescription: "View CV & experience",
  coverLetter: "Cover Letter",
  coverLetterDescription: "View motivation letter",
  chat: "Chat",
  chatDescription: "Chat with me",
  navigate: "navigate",
  open: "open",
  close: "close",

  // Page navigation
  talkToMe: "Talk to me",
  aiChat: "AI Chat",
  opensMyChat: "opens my chat",

  // Talk page
  jobNotFound: "Job not found",
  jobNotFoundDescription: "This application does not exist.",
  chatWith: "Chat with",
  askQuestion: "Ask me a question...",
  hello: "Hello! I'm",
  askMeQuestions: "Ask me questions about my experience, skills and my fit for the position as",
  learnMoreAboutCV: "Learn more about my resume",
  learnMoreAboutMotivation: "Learn more about my motivation",
  chatToLearnMore: "Chat to me to learn more",

  // Disclaimer Dialog
  disclaimerTitle: "AI Assistant for this Application",
  disclaimerText1: "This prototype uses my application documents and a Large Language Model (Gemini) to answer questions about my background and skills.",
  disclaimerText2: "Please note that while answers are based on my data, AI models can occasionally provide inaccurate information. The responses are informative and not legally binding.",
  disclaimerPrivacy: "Privacy Note: No chat data is saved in a database. The conversation history is only kept in the temporary application state and sent to the Google Gemini API for processing.",
  disclaimerConfirm: "Start Chat",
  disclaimerCancel: "Back to Application",

  // Default questions
  defaultQuestions: [
    "What are your strengths?",
    "Tell me about your experience",
    "Show me your projects",
    "Let's connect!",
  ],
  metaTitles: {
    index: "Application",
    cv: "Resume",
    coverLetter: "Cover Letter",
    talk: "💬 Frag mich alles!",
  },
  metaDescriptions: {
    index: "Interactive application for the position as",
    cv: "Resume for the application at",
    coverLetter: "Cover Letter for the application at",
    talk: "Ask me anything",
  },

  // AI responses
  hereAreMyContacts: "Of course! Here are my contact details – feel free to reach out anytime:",
  hereAreMyProjects: "Here are some of my key projects that I've developed:",
  openAIAwardResponse: "Yes, I received an award from OpenAI for my work with baito.",
};

const translations: Record<Language, Translations> = {
  german,
  english,
};

export function getTranslations(lang: Language = "german"): Translations {
  return translations[lang];
}

export function t(lang: Language = "german") {
  return getTranslations(lang);
}

