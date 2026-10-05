import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type StackedSectionProps = {
  children: ReactNode;
  // Stacking order: later sections must have a higher layer to slide over
  // earlier ones.
  layer: number;
  // The first section sits flush with the page; later ones read as cards
  // sliding up over it.
  isFirst?: boolean;
  // The final section has nothing to slide over it, so it doesn't stick.
  isLast?: boolean;
};

// Each section sticks once its bottom edge reaches the bottom of the viewport
// (or its top reaches the top, if it's shorter than the screen), so tall
// sections are fully readable before they pin. While the next section covers
// it, it recedes (shrinks and darkens).
const StackedSection = ({
  children,
  layer,
  isFirst,
  isLast,
}: StackedSectionProps) => {
  // A static marker just before the section. The section itself is sticky,
  // so its own position moves once pinned; the marker's doesn't.
  const anchorRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || isLast) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize[0].blockSize);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isLast]);

  // 0 until the section pins, 1 once the next section has slid over all of
  // it that's on screen. Measured live on every scroll, so content loading
  // in late (Firestore) can't leave it stale.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (y) => {
    const anchor = anchorRef.current;
    const section = ref.current;
    if (!anchor || !section) {
      return 0;
    }

    const naturalTop = anchor.getBoundingClientRect().top + y;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const pinnedAt = naturalTop + Math.max(0, sectionHeight - viewportHeight);
    const coverDistance = Math.min(sectionHeight, viewportHeight);

    return Math.min(1, Math.max(0, (y - pinnedAt) / coverDistance));
  });
  const transform = useTransform(
    progress,
    [0, 1],
    ["scale(1)", "scale(0.92)"],
  );
  const shade = useTransform(progress, [0, 1], [0, 0.65]);

  const recedes = !isLast && !reduceMotion;

  return (
    <>
      <div ref={anchorRef} aria-hidden="true" />
      <div
        ref={ref}
        className={`relative bg-bg ${
          isFirst
            ? ""
            : "rounded-t-[32px] border-t border-border shadow-[0_-30px_60px_rgba(0,0,0,0.55)]"
        }`}
        style={{
          zIndex: layer,
          ...(isLast
            ? {}
            : {
                position: "sticky",
                top: `min(0px, calc(100svh - ${height}px))`,
              }),
        }}
      >
        <motion.div
          className="overflow-clip rounded-t-[inherit]"
          style={
            recedes
              ? {
                  transform,
                  // Shrink around the middle of the part still on screen,
                  // not the top of a section that may be taller than it.
                  transformOrigin: "50% max(50%, calc(100% - 50svh))",
                }
              : undefined
          }
        >
          {children}
        </motion.div>
        {recedes && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-t-[inherit] bg-black"
            style={{ opacity: shade }}
          />
        )}
      </div>
    </>
  );
};

export default StackedSection;
