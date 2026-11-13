import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

// Motion vocabulary taken from the reference portfolio: masked line rises with a blur,
// headings that un-blur on arrival, blocks that lift in once, screenshots that unclip
// with the scroll, staggered row slides, and the hero lifting away as you leave it.
// Only transform, opacity, filter and clip-path move. Reduced motion: nothing moves,
// and html.js (which hides the start states) is never set.
export function useSiteMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const nav = document.querySelector<HTMLElement>("[data-nav]");
      const hero = document.querySelector<HTMLElement>("[data-hero]");

      // The nav turns to slate glass as soon as the page scrolls, so its text never sits on the dark foot of the photograph.
      if (nav && hero) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top+=80 top",
          onEnter: () => nav.classList.add("is-solid"),
          onLeaveBack: () => nav.classList.remove("is-solid"),
        });
      }

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "power3.out";

        // Hero entrance.
        const intro = gsap.timeline({ defaults: { ease } });
        intro
          .fromTo("[data-hero-photo]", { scale: 1.12 }, { scale: 1.04, duration: 2.4, ease: "power2.out" }, 0)
          .fromTo("[data-line]", { y: 0, yPercent: 105, filter: "blur(5px)" }, { y: 0, yPercent: 0, filter: "blur(0px)", duration: 1.25, stagger: 0.12, ease: "power4.out", clearProps: "filter" }, 0.15)
          .fromTo("[data-hero-fade]", { autoAlpha: 0, y: 8, filter: "blur(3px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, clearProps: "filter" }, 0.55)
          .fromTo("[data-hero-portrait]", { autoAlpha: 0, yPercent: 6 }, { autoAlpha: 1, yPercent: 0, duration: 1.4 }, 0.3);

        // Hero exit: the copy lifts and dims, the photo and portrait drift at their own depth.
        if (hero) {
          const exit = { trigger: hero, start: "top top", end: "bottom top", scrub: 1 };
          gsap.to("[data-hero-content]", { y: -65, opacity: 0.35, ease: "none", scrollTrigger: { ...exit, start: "25% top" } });
          gsap.to("[data-hero-photo]", { yPercent: 8, ease: "none", scrollTrigger: exit });
          gsap.to("[data-hero-portrait]", { yPercent: 10, ease: "none", scrollTrigger: exit });
        }

        // Questions un-blur as they arrive.
        gsap.utils.toArray<HTMLElement>("[data-head]").forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 14, filter: "blur(7px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease, clearProps: "filter,transform", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        // Blocks lift in once.
        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.9, ease, clearProps: "transform", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });

        // Ledger rows slide in one after another.
        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((list) => {
          gsap.fromTo(list.children, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.75, stagger: 0.08, ease, clearProps: "transform", scrollTrigger: { trigger: list, start: "top 85%", once: true } });
        });
      });

      window.__motionReady = true;
      document.documentElement.classList.add("motion-ready"); // GSAP now holds every start state inline
      return () => mm.revert();
    },
    { scope },
  );
}
