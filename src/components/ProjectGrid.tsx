import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { Project } from "../data/types";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";

const SCROLL_AMOUNT = 360;

const ProjectGrid = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { items: projects, isLoading } =
    useFirestoreCollection<Project>("projects");

  const handleScroll = (direction: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  if (isLoading || projects.length === 0) {
    return null;
  }

  return (
    <section id="work" className="px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex items-center justify-between gap-6">
          <SectionLabel className="">Projects</SectionLabel>
          <div className="flex flex-none gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll projects left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-green/40 bg-green/10 text-green-bright transition-colors duration-200 ease-out-strong touch-manipulation hover:border-green-bright hover:bg-green/[0.16] active:scale-[0.97]"
            >
              <ArrowLeft size={15} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll projects right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-green/40 bg-green/10 text-green-bright transition-colors duration-200 ease-out-strong touch-manipulation hover:border-green-bright hover:bg-green/[0.16] active:scale-[0.97]"
            >
              <ArrowRight size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label="Projects carousel"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 pb-2"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[85%] flex-none snap-start sm:w-[60%] lg:w-[400px]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
