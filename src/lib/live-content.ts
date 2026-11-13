import {
  experience as fallbackExperience,
  projects as fallbackProjects,
  stack as fallbackStack,
  type ExperienceEntry,
  type Project,
  type StackGroup,
} from "../data/content";

// Projects, experience and the tech stack live in Firestore so they can be edited without a deploy.
// Read over the public REST API (the rules allow reads), so no Firebase SDK ships on the main page.
// Used twice: by the prerender at build time, and by the page on load.

export type Content = { projects: Project[]; experience: ExperienceEntry[]; stack: StackGroup[] };
export const fallbackContent: Content = { projects: fallbackProjects, experience: fallbackExperience, stack: fallbackStack };

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-1e442";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Screenshots already optimised in public/projects; anything else loads from its own URL.
const LOCAL_IMAGES = new Set(["spelloutcode", "loyaltylabs", "csr-roadmaps", "pomodoro-timer"]);

type FsValue = { stringValue?: string; integerValue?: string; doubleValue?: number; arrayValue?: { values?: FsValue[] } };
type FsDoc = { name: string; fields?: Record<string, FsValue> };

const str = (v?: FsValue) => v?.stringValue ?? (v?.integerValue ?? (v?.doubleValue != null ? String(v.doubleValue) : ""));
const list = (v?: FsValue) => (v?.arrayValue?.values ?? []).map(str).filter(Boolean);
const order = (v?: FsValue) => { const n = Number(str(v)); return Number.isFinite(n) ? n : 999; };
const idOf = (d: FsDoc) => d.name.split("/").pop() ?? "";

function localImage(url: string): string {
  const name = url.split("?")[0].split("/").pop()?.replace(/\.(jpe?g|png|webp)$/i, "") ?? "";
  return LOCAL_IMAGES.has(name) ? `/projects/${name}` : url;
}

async function collection(name: string, signal?: AbortSignal): Promise<FsDoc[] | null> {
  try {
    const res = await fetch(`${BASE}/${name}?pageSize=100`, { signal });
    if (!res.ok) return null;
    const json = (await res.json()) as { documents?: FsDoc[] };
    return json.documents ?? [];
  } catch {
    return null;
  }
}

const byOrder = <T extends { o: number; t: string }>(a: T, b: T) => a.o - b.o || a.t.localeCompare(b.t);

export async function fetchLiveContent(signal?: AbortSignal): Promise<Content> {
  const [p, e, s] = await Promise.all([collection("projects", signal), collection("experience", signal), collection("techStack", signal)]);

  const projects = p?.length
    ? p.map((d) => {
        const f = d.fields ?? {};
        return {
          o: order(f.order), t: str(f.title),
          v: { id: idOf(d), title: str(f.title), category: str(f.category), description: str(f.description), image: localImage(str(f.image)), technologies: list(f.technologies), href: str(f.href), github: str(f.github) } satisfies Project,
        };
      }).sort(byOrder).map((x) => x.v)
    : fallbackProjects;

  const experience = e?.length
    ? e.map((d) => {
        const f = d.fields ?? {};
        return {
          o: order(f.order), t: str(f.role),
          v: { id: idOf(d), period: str(f.period).replace(/\s+[–—-]\s+/g, " to "), role: str(f.role), organization: str(f.organization), description: str(f.description) } satisfies ExperienceEntry,
        };
      }).sort(byOrder).map((x) => x.v)
    : fallbackExperience;

  const stack = s?.length
    ? s.map((d) => {
        const f = d.fields ?? {};
        return { o: order(f.order), t: str(f.category), v: { id: idOf(d), category: str(f.category), technologies: list(f.technologies) } satisfies StackGroup };
      }).sort(byOrder).map((x) => x.v)
    : fallbackStack;

  return { projects, experience, stack };
}

// Responsive sources for a project image, local WebP pair or remote (ImageKit resizes with ?tr=w-N).
export function projectImage(image: string) {
  if (image.startsWith("/projects/")) return { src: `${image}-1600.webp`, srcSet: `${image}-800.webp 800w, ${image}-1600.webp 1600w`, small: `${image}-800.webp` };
  if (/ik\.imagekit\.io/.test(image)) return { src: `${image}?tr=w-1600`, srcSet: `${image}?tr=w-800 800w, ${image}?tr=w-1600 1600w`, small: `${image}?tr=w-800` };
  return { src: image, srcSet: undefined, small: image };
}
