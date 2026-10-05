const technologies = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
];

const TechStrip = () => {
  return (
    <section className="px-6 pb-16 sm:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-8 sm:gap-10">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-sm text-text opacity-40 grayscale transition-[opacity,filter] duration-200 ease-out-strong hover:opacity-100 hover:grayscale-0"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechStrip;
