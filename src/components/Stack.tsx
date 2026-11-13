import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import type { StackGroup } from "../data/content";

export default function Stack({ stack }: { stack: StackGroup[] }) {
  const [active, setActive] = useState(0);
  // Before hydration (and with scripting off) every group shows; tabs take over once React runs.
  const [ready, setReady] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const pane = useRef<HTMLDivElement>(null);
  useEffect(() => setReady(true), []);

  const choose = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabs.current[i]?.focus();
    if (pane.current && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      gsap.fromTo(pane.current.querySelectorAll(".pane__list li"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.035, ease: "power3.out", clearProps: "all" });
  };

  const onKey = (e: KeyboardEvent) => {
    const n = stack.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (active + 1) % n
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (active - 1 + n) % n
      : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    choose(next, true);
  };

  return (
    <section className="section stack" aria-labelledby="stack-q">
      <div className="container stack__grid">
        <div className="stack__side">
          <h2 id="stack-q" data-head>What I build with</h2>
          {ready ? (
            <div className="tour" role="tablist" aria-label="Technology groups" aria-orientation="vertical" onKeyDown={onKey} data-rise>
              {stack.map((g, i) => (
                <button
                  key={g.id}
                  ref={(el) => { tabs.current[i] = el; }}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={i === active}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={i === active ? 0 : -1}
                  className="tour__tab"
                  onClick={() => choose(i)}
                >
                  <span className="tour__name">{g.category}</span>
                  <span className="tour__count num">{g.technologies.length} tools</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="pane" ref={pane} data-rise>
          {stack.map((g, i) => (
            <div
              key={g.id}
              id={`panel-${g.id}`}
              role={ready ? "tabpanel" : undefined}
              aria-labelledby={ready ? `tab-${g.id}` : undefined}
              hidden={ready && i !== active}
              className="pane__group"
            >
              <h3 className="pane__title">{g.category}</h3>
              <ul className="pane__list">
                {g.technologies.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
