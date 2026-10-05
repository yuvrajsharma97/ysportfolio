import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import type { AboutContent, SocialsContent } from "../data/types";

const Hero = () => {
  const { data: about, isLoading } = useFirestoreDocument<AboutContent>(
    "content",
    "about",
  );
  const { data: socials } = useFirestoreDocument<SocialsContent>(
    "content",
    "socials",
  );

  if (isLoading || !about) {
    return null;
  }

  const nameLines = about.name.toUpperCase().split(" ");
  const links = socials
    ? [
        {
          label: "GitHub",
          href: socials.github,
          icon: ArrowUpRight,
          nudge: "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        },
        {
          label: "LinkedIn",
          href: socials.linkedin,
          icon: ArrowUpRight,
          nudge: "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        },
        {
          label: "Resume",
          href: socials.resumeUrl,
          icon: Download,
          nudge: "group-hover:translate-y-0.5",
          download: true,
        },
      ].filter((link) => link.href)
    : [];

  return (
    <section
      className="relative flex items-center overflow-hidden px-6 pt-16 pb-16 sm:px-10 lg:min-h-svh lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(0,217,104,0.05), transparent 45%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-[auto_minmax(0,360px)] lg:justify-center lg:gap-20">
        <div className="text-center lg:w-fit lg:text-left">
          {about.heroImage && (
            <HeroPortrait
              key={about.heroImage}
              src={about.heroImage}
              alt={about.name}
            />
          )}
          <h1
            className={`relative bg-gradient-to-b from-white to-[#c9d2cd] bg-clip-text font-head px-[0.06em] text-[clamp(48px,7vw,108px)] leading-[0.86] font-normal tracking-[-0.06em] text-transparent ${
              about.heroImage ? "-mt-[0.45em]" : ""
            }`}
          >
            {nameLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="mx-auto w-full max-w-[380px] text-center lg:mx-0 lg:pb-3 lg:text-left">
          <div className="mx-auto mb-5 h-px w-[110px] bg-gradient-to-r from-green to-transparent lg:mx-0" />
          <p className="font-mono text-[13px] leading-relaxed text-text-secondary uppercase tracking-[0.28em]">
            {about.role}
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-text">
            {about.shortBio}
          </p>

          {links.length > 0 && (
            <ul className="mt-8 border-t border-border text-left">
              {links.map(({ label, href, icon: Icon, nudge, download }) => (
                <li key={label} className="border-b border-border">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    download={download}
                    className="group flex items-center justify-between py-3.5 text-sm text-text-secondary transition-colors duration-200 ease-out-strong hover:text-text"
                  >
                    {label}
                    <Icon
                      size={15}
                      className={`text-green transition-transform duration-200 ease-out-strong ${nudge}`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

// Stays invisible until the image has actually loaded, so the entrance plays
// on the portrait itself rather than on an empty box.
const HeroPortrait = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative mx-auto aspect-[4/5] w-[240px] sm:w-[280px] lg:w-[300px]">
      <HeroBlob isVisible={isLoaded} />
      {/* The cutout is cropped at the shoulders; fade its bottom and
          side edges so it dissolves into the page instead of ending
          on a hard line. */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`relative h-full w-full object-cover object-top ${
          isLoaded ? "animate-portrait-in" : "opacity-0"
        }`}
        style={{
          maskImage:
            "linear-gradient(to bottom, black 55%, transparent 92%), linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
          maskComposite: "intersect",
        }}
        fetchPriority="high"
      />
    </div>
  );
};

// Three soft-edged shapes drifting around each other read as one living blob.
// Their edges come from the gradients themselves (no blur filter), so the
// motion is transform-only and stays cheap.
const blobShapes = [
  {
    className: "left-[8%] top-[6%] h-[62%] w-[70%] animate-blob-a",
    color: "rgba(0,217,104,0.22)",
  },
  {
    className: "right-[2%] top-[18%] h-[58%] w-[62%] animate-blob-b",
    color: "rgba(24,240,120,0.14)",
  },
  {
    className: "left-[18%] top-[30%] h-[50%] w-[64%] animate-blob-c",
    color: "rgba(29,118,80,0.3)",
  },
];

const HeroBlob = ({ isVisible }: { isVisible: boolean }) => (
  <div
    aria-hidden="true"
    className={`absolute inset-x-[-25%] top-[-5%] bottom-[10%] ${
      isVisible ? "animate-glow-in" : "opacity-0"
    }`}
  >
    {blobShapes.map(({ className, color }) => (
      <div
        key={className}
        className={`absolute rounded-full ${className}`}
        style={{
          background: `radial-gradient(closest-side, ${color}, transparent)`,
        }}
      />
    ))}
  </div>
);

export default Hero;
