import { ArrowUpRight, Code2 } from "lucide-react";
import TechBadge from "./TechBadge";
import type { Project } from "../data/types";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="glass group overflow-hidden rounded-[10px] transition-[transform,background-color,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-green/40 hover:bg-surface-hover">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[16/10] overflow-hidden border-b border-border"
      >
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top grayscale-[0.3] brightness-90 transition-[filter] duration-200 ease-out-strong group-hover:grayscale-0 group-hover:brightness-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
        />
      </a>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-head text-[19px] font-medium">
            {project.title}
          </h3>
          <div className="flex flex-none items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-200 ease-out-strong hover:border-border-strong hover:text-text"
            >
              <Code2 size={12} strokeWidth={1.8} />
            </a>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} live`}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-green/35 bg-green/10 text-green-bright transition-transform duration-200 ease-out-strong group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              <ArrowUpRight size={13} strokeWidth={1.8} />
            </a>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-text-secondary uppercase tracking-[0.08em]">
          {project.category}
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-text-secondary">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
