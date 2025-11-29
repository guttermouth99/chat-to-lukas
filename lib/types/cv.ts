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

export interface CVData {
  theme: CVTheme;
  personal: CVPersonal;
  labels: CVLabels;
  profileSummary: string;
  workExperience: CVWorkExperience[];
  skills: CVSkill[];
  awards: CVAward[];
  education: CVEducation[];
  languages: CVLanguage[];
}

