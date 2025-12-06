export interface CVTheme {
  accentColor: string;
}

export interface CVPersonal {
  fullName: string;
  workingTitle: string;
  avatar: string;
  companyLogo: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
  linkedin: string;
  talkToMe?: string;
}

export interface CVLabels {
  profile: string;
  workExperience: string;
  skills: string;
  education: string;
  languages: string;
}

export interface CVWorkExperience {
  period: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  achievements: string[];
}

export interface CVSkill {
  name: string;
  icon: string;
  skills: string;
}

export interface CVAward {
  skillIndex: number;
  title: string;
  description: string;
}

export interface CVEducation {
  period: string;
  institution: string;
  location: string;
  degree: string;
  thesis?: string;
}

export interface CVLanguage {
  name: string;
  level: number;
}

export interface FrontPageKeyword {
  text: string;
  icon?: string;
}

export interface CVFrontPage {
  title?: string;
  subtitle?: string;
  keywords?: FrontPageKeyword[];
}

export interface CoverLetterRecipient {
  name?: string;
  title?: string;
  company: string;
  address?: string;
}

export interface CoverLetterData {
  recipient: CoverLetterRecipient;
  date: string;
  subject: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}

export interface CVData {
  lang?: "english" | "german";
  theme: CVTheme;
  personal: CVPersonal;
  labels: CVLabels;
  profileSummary: string;
  workExperience: CVWorkExperience[];
  skills: CVSkill[];
  awards: CVAward[];
  education: CVEducation[];
  languages: CVLanguage[];
  frontpage?: CVFrontPage;
  coverLetter?: CoverLetterData;
}

