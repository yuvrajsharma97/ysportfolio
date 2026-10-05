import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { ExperienceEntry } from "../data/types";
import SectionLabel from "./SectionLabel";

const Experience = () => {
  const { items: experience, isLoading } =
    useFirestoreCollection<ExperienceEntry>("experience");

  if (isLoading || experience.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <SectionLabel>Experience</SectionLabel>
        <div className="flex flex-col">
          {experience.map((entry, index) => (
            <div
              key={entry.id}
              className={`grid grid-cols-1 gap-2 py-8 sm:grid-cols-[200px_1fr] sm:gap-8 ${
                index === 0 ? "" : "border-t border-border"
              }`}
            >
              <p className="font-mono text-xs text-text-secondary uppercase tracking-[0.1em]">
                {entry.period}
              </p>
              <div>
                <h3 className="font-head text-lg font-medium">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {entry.organization}
                </p>
                <p className="mt-3 max-w-[560px] text-[13.5px] leading-relaxed text-text-secondary">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
