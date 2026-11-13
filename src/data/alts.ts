import type { Project } from "./content";

// Written descriptions of each known screenshot; a project added later in Firestore gets a plain one.
const alts: Record<string, string> = {
  spelloutcode: "Spell Out Code's home page: the heading Document your development journey, with Create your archive and Explore example profile buttons",
  loyaltyos: "Loyalty Labs home page: Get rewarded for shopping local, with a rewards card showing 2,480 points",
  "csr-roadmaps": "C.S.R. Website: the computer science roadmaps home page",
  "pomodoro-timer": "Pomodoro Timer: the focus timer with work and break intervals",
};

export const projectAlt = (p: Project) => alts[p.id] ?? `${p.title}: the home page`;
