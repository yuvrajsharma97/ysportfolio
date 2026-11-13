import { useRef, type PointerEvent } from "react";
import { gsap } from "gsap";
import type { Project } from "../data/content";
import { projectAlt } from "../data/alts";
import { projectImage } from "../lib/live-content";

const motionOk = () => !matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => matchMedia("(hover: hover) and (pointer: fine)").matches && motionOk();
const counts = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export default function WorkIndex({ projects }: { projects: Project[] }) {
  const preview = useRef<HTMLDivElement>(null);
  const imgs = useRef<Record<string, HTMLImageElement | null>>({});

  // Desktop only: a small screenshot follows the pointer across the closed rows.
  const onMove = (e: PointerEvent<HTMLElement>, id: string, open: boolean) => {
    const el = preview.current;
    if (!el || !canHover()) return;
    if (open) { hide(); return; }
    Object.entries(imgs.current).forEach(([k, img]) => img?.classList.toggle("is-on", k === id));
    gsap.to(el, { x: e.clientX + 28, y: e.clientY - 96, duration: 0.55, ease: "power3.out", overwrite: "auto" });
    gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
  };
  const hide = () => preview.current && gsap.to(preview.current, { autoAlpha: 0, scale: 0.94, duration: 0.25, ease: "power2.out", overwrite: "auto" });

  if (!projects.length) return null;
  const n = projects.length;

  return (
    <section id="work" className="section index" aria-labelledby="index-q">
      <div className="container">
        <div className="qa">
          <h2 id="index-q" data-head>My work</h2>
          <p className="qa__answer lead" data-rise>
            {counts[n] ?? n} {n === 1 ? "project" : "projects"}, each live with its code on GitHub.
          </p>
        </div>

        <ul className="rows">
          {projects.map((p) => {
            const img = projectImage(p.image);
            return (
              <li key={p.id} data-rise>
                <details
                  className="row"
                  onPointerMove={(e) => onMove(e, p.id, e.currentTarget.open)}
                  onPointerLeave={hide}
                  onToggle={(e) => {
                    const d = e.currentTarget;
                    if (!d.open) return;
                    hide();
                    if (motionOk())
                      gsap.fromTo(d.querySelector(".row__body"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "all" });
                  }}
                >
                  <summary className="row__head">
                    <span className="row__title">{p.title}</span>
                    <span className="row__meta">{p.category}</span>
                    <span className="row__toggle" aria-hidden="true" />
                  </summary>
                  <div className="row__body">
                    <figure className="frame frame--sm">
                      <img src={img.src} srcSet={img.srcSet} sizes="(min-width: 60rem) 55vw, 92vw" width={1600} height={768} loading="lazy" alt={projectAlt(p)} />
                    </figure>
                    <div className="row__text">
                      <p>{p.description}</p>
                      <ul className="tags" aria-label="Built with">
                        {p.technologies.map((t) => <li key={t}>{t}</li>)}
                      </ul>
                      <div className="case__links">
                        {p.href && <a className="link" href={p.href} target="_blank" rel="noopener noreferrer">Visit {p.title}</a>}
                        {p.github && <a className="link" href={p.github} target="_blank" rel="noopener noreferrer">Read the code</a>}
                      </div>
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="peek" ref={preview} aria-hidden="true">
        {projects.map((p) => (
          <img key={p.id} ref={(el) => { imgs.current[p.id] = el; }} src={projectImage(p.image).small} width={800} height={384} alt="" loading="lazy" />
        ))}
      </div>
    </section>
  );
}
