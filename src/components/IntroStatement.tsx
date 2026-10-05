import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import type { AboutContent } from "../data/types";

const IntroStatement = () => {
  const { data: about, isLoading } = useFirestoreDocument<AboutContent>(
    "content",
    "about",
  );

  if (isLoading || !about) {
    return null;
  }

  return (
    <section className="px-6 py-20 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 h-px w-[130px] bg-gradient-to-r from-green to-transparent" />
        <p className="max-w-[820px] font-head text-[clamp(34px,3.6vw,48px)] leading-[1.05] font-normal tracking-[-0.04em]">
          Building thoughtful software that solves real problems, scales
          cleanly, and feels great to use.
        </p>
        <p className="mt-7 max-w-[440px] text-sm leading-relaxed text-text-secondary">
          {about.supportingLine}
        </p>
      </div>
    </section>
  );
};

export default IntroStatement;
