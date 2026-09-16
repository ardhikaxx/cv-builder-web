export type TemplateId = 'classic' | 'modern' | 'minimal' | 'executive';

export type FontFamily = 'inter' | 'arial' | 'calibri' | 'times';

export type AccentColor = 
  | '#111827' // Charcoal / Slate-900 (Default)
  | '#1e3a8a' // Navy Blue
  | '#0f766e' // Deep Teal
  | '#1e293b' // Slate Dark
  | '#14532d' // Forest Green
  | '#831843'; // Deep Burgundy

export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  additionalInfo?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa?: string;
  maxGpa?: string;
  description?: string; // relevant coursework or honors
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  employmentType: string; // Internship, Full-time, Freelance, Part-time, Apprenticeship
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface OrganizationItem {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  link?: string;
  githubLink?: string;
  bullets: string[];
}

export interface SkillCategory {
  id: string;
  name: string; // e.g., "Programming Languages", "Frameworks & Libraries", "Tools", "Soft Skills"
  skills: string[]; // clean text list
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  doesNotExpire: boolean;
  credentialId?: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  year: string;
  description?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional Working Proficiency' | 'Intermediate' | 'Elementary';
}

export interface AdditionalItem {
  id: string;
  title: string;
  content: string;
}

export type SectionKey =
  | 'personal'
  | 'summary'
  | 'education'
  | 'experience'
  | 'organization'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'additional';

export interface SectionMeta {
  key: SectionKey;
  label: string;
  visible: boolean;
}

export interface CVData {
  version: number;
  personal: PersonalInfo;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  organization: OrganizationItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  additional: AdditionalItem[];
  sectionOrder: SectionMeta[];
  settings: {
    template: TemplateId;
    fontFamily: FontFamily;
    accentColor: AccentColor;
    fontSize: 'compact' | 'normal' | 'spacious';
    lineSpacing: 'compact' | 'normal' | 'spacious';
  };
}

export interface ATSCheckResult {
  completenessPercentage: number;
  scoreLabel: 'Needs Work' | 'Fair' | 'Good' | 'Strong' | 'Excellent';
  passedChecks: ATSCheckItem[];
  recommendedChecks: ATSCheckItem[];
  missingChecks: ATSCheckItem[];
}

export interface ATSCheckItem {
  id: string;
  title: string;
  description: string;
  type: 'essential' | 'recommended' | 'optional';
  status: 'complete' | 'warning' | 'missing';
  sectionTarget?: SectionKey;
}
