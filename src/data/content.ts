// Fallback content. The live source is Firestore (project portfolio-1e442): projects, experience
// and techStack are read at build time and again on every page load (src/lib/live-content.ts).
// These copies show only if Firestore cannot be reached.

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string; // "/projects/<name>" for a local WebP pair, or a full image URL
  technologies: string[];
  href: string;
  github: string;
};

export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
};

export type StackGroup = { id: string; category: string; technologies: string[] };

export const about = {
  name: "Yuvraj Sharma",
  role: "Full Stack Software Developer",
  shortBio: "I build fast, accessible, and beautiful apps using React, Next.js, and Tailwind CSS.",
  supportingLine:
    "Experienced Web Developer with over 3 years of experience building fast, scalable, and user-centric web applications.",
};

export const socials = {
  github: "https://github.com/yuvrajsharma97",
  linkedin: "https://www.linkedin.com/in/yuvrajsharma97",
};

export const projects: Project[] = [
  {
    id: "spelloutcode",
    title: "SpellOutCode",
    category: "Developer progress archive",
    description:
      "A web app that allows developers to track their progress and showcase their coding journey, structured progress logs for builders. Chronicle what you're making, how it evolves, and what you're learning in your own permanent archive.",
    image: "/projects/spelloutcode",
    technologies: ["React.js", "NodeJS", "MongoDB", "JWT Authentication"],
    href: "https://spell-out-code.vercel.app/",
    github: "https://github.com/yuvrajsharma97/SpellOutCode",
  },
  {
    id: "loyaltyos",
    title: "LoyaltyOS",
    category: "Digital Loyalty Program SaaS",
    description:
      "SaaS platform enabling businesses to run QR code-based digital loyalty programmes with flexible reward systems, role-based access, and advanced analytics. Built with Vite, MongoDB, and JWT authentication featuring multi-tenancy architecture.",
    image: "/projects/loyaltylabs",
    technologies: ["React.js", "NodeJS", "MongoDB", "JWT Authentication"],
    href: "https://loyaltylabs.vercel.app/",
    github: "https://github.com/yuvrajsharma97/loyaltylabs",
  },
  {
    id: "csr-roadmaps",
    title: "C.S.R. Website",
    category: "Career path finder",
    description:
      "Interactive career path finder for computer science with personalized quizzes and domain-specific roadmaps (Frontend, Backend, Full Stack). Features curated learning resources, confetti animations, and EmailJS contact form.",
    image: "/projects/csr-roadmaps",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "Email JS", "Context API"],
    href: "https://computer-science-roadmaps.vercel.app/",
    github: "https://github.com/yuvrajsharma97/Computer-Science-Roadmaps",
  },
  {
    id: "pomodoro-timer",
    title: "Pomodoro Timer",
    category: "Productivity tool",
    description:
      "Dynamic Pomodoro timer app designed for optimal productivity. Custom work and break intervals to suit user preferences. Built with React for a responsive user interface and Tailwind CSS for sleek styling. Track your focus sessions and breaks.",
    image: "/projects/pomodoro-timer",
    technologies: ["React.js", "Tailwind CSS", "Context API", "Custom Style"],
    href: "https://pomodoro-next-js-chi.vercel.app",
    github: "https://github.com/yuvrajsharma97/pomodoro-NextJS",
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "msc-sussex",
    period: "Sep 2023 to Oct 2024",
    role: "MSc Computer Science",
    organization: "University of Sussex, UK",
    description:
      "Modules: Algorithmic Data Science, Python Programming, Systems for Information Management, MSc Individual Project. Built a ticket booking app using Next.js (frontend) and Python (backend), and developed Computer Science Roadmaps entirely with Next.js.",
  },
  {
    id: "getepay",
    period: "Sep 2022 to Aug 2023",
    role: "Front-End Web Developer",
    organization: "Getepay.in, India",
    description:
      "Built a high-performance banking web app using React.js and React Hook Form. Removed 300+ redundant lines of code and integrated REST APIs and payment gateways, reducing load times by 30%.",
  },
  {
    id: "ayushi-dmcc",
    period: "Jan 2021 to Aug 2022",
    role: "Front-End Web Developer",
    organization: "Ayushi DMCC Software, UAE (Remote)",
    description:
      "Developed and deployed 20+ fully responsive websites using React, WordPress, and Bootstrap. Integrated 5+ payment gateways including Razorpay and CCAvenue to enable smooth transactions for 1,000+ users/month.",
  },
  {
    id: "pixelomedia",
    period: "Sep 2020 to Dec 2020",
    role: "Web Developer Intern",
    organization: "PixelOMedia, India",
    description:
      "Delivered 15+ custom WordPress sites and 10+ HTML/CSS/JS templates. Managed full project lifecycle with 98% code quality and 100% on-time delivery, aligning projects to client goals.",
  },
];

export const stack: StackGroup[] = [
  { id: "languages", category: "Languages", technologies: ["HTML", "CSS", "JavaScript", "Python", "SQL", "PHP", "TypeScript", "SCSS"] },
  { id: "frontend", category: "Frontend", technologies: ["React", "Next.js", "Tailwind CSS", "Material UI", "Bootstrap"] },
  { id: "backend", category: "Backend", technologies: ["Firebase", "Node.js", "Express.js", "MongoDB"] },
];

export const photoCredit = {
  author: "Dietmar Rabich",
  license: "CC BY-SA 4.0",
  page: "https://commons.wikimedia.org/wiki/File:Papierkanten_--_2020_--_9535.jpg",
  note: "recoloured",
};
