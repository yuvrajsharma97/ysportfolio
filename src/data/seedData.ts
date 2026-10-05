import type {
  AboutContent,
  ExperienceEntry,
  Project,
  SocialsContent,
  TechnologyGroup,
} from "./types";

// Content carried over from the previous portfolio
// (github.com/yuvrajsharma97/portfolio, src/data/portfolioData.js).
// Kept free of Firebase imports so both the admin panel and
// scripts/push-content.ts can share it. Fixed document IDs make imports
// idempotent: re-running one overwrites these entries instead of duplicating them.

export const about: AboutContent = {
  name: "Yuvraj Sharma",
  role: "Web Developer",
  shortBio:
    "I build fast, accessible, and beautiful apps using React, Next.js, and Tailwind CSS.",
  supportingLine:
    "Experienced Web Developer with over 3 years of experience building fast, scalable, and user-centric web applications.",
  heroImage:
    "https://ik.imagekit.io/rrvyxngr1/portfolio/Professional%20Corporate%20Portrait%20Cutout.png?updatedAt=1790888041391",
};

export const socials: SocialsContent = {
  github: "https://github.com/yuvrajsharma97",
  linkedin: "https://www.linkedin.com/in/yuvrajsharma97",
  resumeUrl: "/resume_yuvraj_sharma.pdf",
};

export const projects: Project[] = [
  {
    id: "spelloutcode",
    title: "SpellOutCode",
    category: "Developer progress archive",
    description:
      "A web app that allows developers to track their progress and showcase their coding journey, structured progress logs for builders. Chronicle what you're making, how it evolves, and what you're learning in your own permanent archive.",
    image: "/projects/spelloutcode.jpg",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
    ],
    href: "https://spell-out-code.vercel.app/",
    github: "https://github.com/yuvrajsharma97/SpellOutCode",
    order: 1,
  },
  {
    id: "loyaltyos",
    title: "LoyaltyOS",
    category: "Digital Loyalty Program SaaS",
    description:
      "B2B SaaS platform enabling businesses to run QR code-based digital loyalty programs with flexible reward systems, role-based dashboards, real-time visit approvals, and advanced analytics. Built with Next.js 15, MongoDB, and NextAuth featuring multi-tenancy architecture.",
    image: "/projects/loyaltyos.jpg",
    technologies: [
      "Next.js 15",
      "React 19",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "Tailwind CSS",
      "DaisyUI",
      "Zod",
      "Resend",
      "QRCode",
      "Lucide React",
      "bcryptjs",
      "Vercel",
    ],
    href: "https://loyalty-saas-two.vercel.app",
    github: "https://github.com/yuvrajsharma97/loyalty-saas",
    order: 2,
  },
  {
    id: "csr-roadmaps",
    title: "C.S.R. Website",
    category: "Career path finder",
    description:
      "Interactive career path finder for computer science with personalized quizzes and domain-specific roadmaps (Frontend, Backend, Full Stack). Features curated learning resources, confetti animations, and EmailJS contact form.",
    image: "/projects/csr-roadmaps.jpg",
    technologies: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "DaisyUI",
      "EmailJS",
      "React Context API",
      "React Icons",
      "React Toastify",
      "React Confetti",
      "Animate.css",
      "TW Elements",
      "Vercel",
    ],
    href: "https://computer-science-roadmaps.vercel.app/",
    github: "https://github.com/yuvrajsharma97/Computer-Science-Roadmaps",
    order: 3,
  },
  {
    id: "pomodoro-timer",
    title: "Pomodoro Timer",
    category: "Productivity tool",
    description:
      "Productivity tool using the Pomodoro Technique for effective time management with customizable work/break intervals. Built with React and Tailwind CSS.",
    image: "/projects/pomodoro-timer.jpg",
    technologies: ["React", "Tailwind CSS"],
    href: "https://pomodoro-next-js-chi.vercel.app",
    github: "https://github.com/yuvrajsharma97/pomodoro-NextJS",
    order: 4,
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "msc-sussex",
    period: "Sep 2023 – Oct 2024",
    role: "MSc Computer Science",
    organization: "University of Sussex, UK",
    description:
      "Modules: Algorithmic Data Science, Python Programming, Systems for Information Management, MSc Individual Project. Built a ticket booking app using Next.js (frontend) and Python (backend), and developed Computer Science Roadmaps entirely with Next.js.",
    order: 1,
  },
  {
    id: "getepay",
    period: "Sep 2022 – Aug 2023",
    role: "Front-End Web Developer",
    organization: "Getepay.in, India",
    description:
      "Built a high-performance banking web app using React.js and React Hook Form. Removed 300+ redundant lines of code and integrated REST APIs and payment gateways, reducing load times by 30%.",
    order: 2,
  },
  {
    id: "ayushi-dmcc",
    period: "Jan 2021 – Aug 2022",
    role: "Front-End Web Developer",
    organization: "Ayushi DMCC Software, UAE (Remote)",
    description:
      "Developed and deployed 20+ fully responsive websites using React, WordPress, and Bootstrap. Integrated 5+ payment gateways including Razorpay and CCAvenue to enable smooth transactions for 1,000+ users/month.",
    order: 3,
  },
  {
    id: "pixelomedia",
    period: "Sep 2020 – Dec 2020",
    role: "Web Developer Intern",
    organization: "PixelOMedia, India",
    description:
      "Delivered 15+ custom WordPress sites and 10+ HTML/CSS/JS templates. Managed full project lifecycle with 98% code quality and 100% on-time delivery, aligning projects to client goals.",
    order: 4,
  },
];

export const techStack: TechnologyGroup[] = [
  {
    id: "languages",
    category: "Languages",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "SQL",
      "PHP",
      "TypeScript",
      "SCSS",
    ],
    order: 1,
  },
  {
    id: "frontend",
    category: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
    ],
    order: 2,
  },
  {
    id: "backend",
    category: "Backend",
    technologies: ["Firebase", "Node.js", "Express.js", "MongoDB"],
    order: 3,
  },
];
