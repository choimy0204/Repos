export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

export type ProjectEntry = {
  id: string;
  name: string;
  period: string;
  link: string;
  description: string;
};

export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  period: string;
};

export type CertificationEntry = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type ActivityEntry = {
  id: string;
  title: string;
  org: string;
  period: string;
  description: string;
};

export type ResumeData = {
  name: string;
  title: string;
  birthDate: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  activities: ActivityEntry[];
  skills: string[];
};

export type TemplateId = "minimal" | "modern" | "classic" | "compact" | "bold";

export type TemplateMeta = {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
};
