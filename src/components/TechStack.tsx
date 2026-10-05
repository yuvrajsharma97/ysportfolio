import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { TechnologyGroup } from "../data/types";
import SectionLabel from "./SectionLabel";
import TechBadge from "./TechBadge";

const TechStack = () => {
  const { items: techStack, isLoading } =
    useFirestoreCollection<TechnologyGroup>("techStack");

  if (isLoading || techStack.length === 0) {
    return null;
  }

  return (
    <section id="stack" className="px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <SectionLabel>Tech Stack</SectionLabel>
        <div className="border-t border-border">
          {techStack.map((group) => (
            <div
              key={group.id}
              className="flex flex-col gap-3.5 border-b border-border py-6 md:flex-row md:items-baseline md:gap-8"
            >
              <p className="text-xs text-text-secondary uppercase tracking-[0.1em] md:w-40 md:flex-none">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
