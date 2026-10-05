export type AboutContent = {
  name: string;
  role: string;
  shortBio: string;
  supportingLine: string;
  heroImage: string;
};

export type SocialsContent = {
  github: string;
  linkedin: string;
  resumeUrl: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  href: string;
  github: string;
  order: number;
};

export type Capability = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  order: number;
};

export type TechnologyGroup = {
  id: string;
  category: string;
  technologies: string[];
  order: number;
};
