import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { socials } from "../data/content";

const lines = [["I", "build", "fast,"], ["accessible"], ["web", "apps."]];

export default function Hero({ resumeUrl }: { resumeUrl: string | null }) {
  const hero = useRef<HTMLElement>(null);

  // Hover: a soft light follows the pointer, and the photo, glow and portrait shift at different
  // depths. Buttons lean toward the pointer. Fine pointers only, never under reduced motion.
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = (sel: string, prop: "x" | "y", duration: number) => {
      const t = el.querySelector(sel);
      return t ? gsap.quickTo(t, prop, { duration, ease: "power3.out" }) : () => undefined;
    };
    const glowX = q("[data-hero-glow]", "x", 0.9), glowY = q("[data-hero-glow]", "y", 0.9);
    const photoX = q("[data-hero-photo]", "x", 1.4), photoY = q("[data-hero-photo]", "y", 1.4);
    const figX = q("[data-hero-figure]", "x", 1.1), figY = q("[data-hero-figure]", "y", 1.1);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height * 0.42;
      const nx = dx / (r.width / 2), ny = dy / (r.height / 2); // -1..1 from the centre
      el.classList.add("is-pointer");
      glowX(dx); glowY(dy);
      photoX(nx * -22); photoY(ny * -14);
      figX(nx * 14); figY(ny * 6);
    };
    const onLeave = () => {
      el.classList.remove("is-pointer");
      glowX(0); glowY(0); photoX(0); photoY(0); figX(0); figY(0);
    };

    const buttons = [...el.querySelectorAll<HTMLElement>(".hero__actions .btn")];
    const magnets = buttons.map((b) => {
      const mx = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3.out" }), my = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => { const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * 0.25); my((e.clientY - r.top - r.height / 2) * 0.35); };
      const leave = () => { mx(0); my(0); };
      b.addEventListener("pointermove", move); b.addEventListener("pointerleave", leave);
      return () => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); };
    });

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      magnets.forEach((off) => off());
    };
  }, [resumeUrl]); // re-bind so a CV button that arrives after load gets the hover too

  return (
    <section className="hero" aria-labelledby="hero-title" data-hero ref={hero}>
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__photo"
          data-hero-photo
          src="/photos/glow-1920.webp"
          srcSet="/photos/glow-960.webp 960w, /photos/glow-1440.webp 1440w, /photos/glow-1920.webp 1920w"
          sizes="100vw"
          width={1920}
          height={1440}
          alt=""
          fetchPriority="high"
        />
        <div className="hero__scrim" />
      </div>
      <div className="hero__glow" data-hero-glow aria-hidden="true" />

      <div className="hero__figure" data-hero-figure>
        <img
          className="hero__portrait"
          data-hero-portrait
          src="/portrait.webp"
          width={900}
          height={1350}
          alt="Yuvraj Sharma in a dark suit and glasses"
        />
      </div>

      <div className="container hero__grid">
        <div className="hero__left" data-hero-content>
          <h1 id="hero-title" className="hero__title">
            {lines.map((words, i) => (
              <span className="line" key={i}>
                <span data-line>
                  {words.map((w, j) => (
                    <span key={j}>
                      <span className="word">{w}</span>
                      {j < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>
        <div className="hero__right" data-hero-content>
          <p className="lead hero__lead" data-hero-fade>
            Yuvraj Sharma, full stack software developer working in React, Next.js and Node.
          </p>
          <div className="hero__actions" data-hero-fade>
            {resumeUrl && <a className="btn" href={resumeUrl} target="_blank" rel="noopener noreferrer">View CV</a>}
            <a className={resumeUrl ? "btn btn--ghost" : "btn"} href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn btn--ghost" href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
