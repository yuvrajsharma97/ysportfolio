import { ArrowUpRight } from "lucide-react";
import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import type { SocialsContent } from "../data/types";
import CtaButton from "./CtaButton";

const OpenSource = () => {
  const { data: socials, isLoading } = useFirestoreDocument<SocialsContent>(
    "content",
    "socials",
  );

  if (isLoading || !socials) {
    return null;
  }

  return (
    <section className="px-6 py-14 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="glass flex flex-col items-start gap-6 rounded-[10px] p-8 sm:p-9 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2.5 font-mono text-[13px] text-text-secondary uppercase tracking-[0.28em]">
              Open Source
            </p>
            <p className="max-w-[440px] text-sm leading-relaxed text-text-secondary">
              Building in public, contributing to tools, and experimenting
              with new technologies.
            </p>
          </div>
          <CtaButton href={socials.github} icon={ArrowUpRight}>
            GitHub
          </CtaButton>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
