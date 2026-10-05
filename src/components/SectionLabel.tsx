type SectionLabelProps = {
  children: string;
  className?: string;
};

const SectionLabel = ({ children, className = "mb-12" }: SectionLabelProps) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="h-px w-[110px] bg-gradient-to-r from-green to-transparent" />
      <span className="font-mono text-[13px] uppercase tracking-[0.24em] text-text-secondary">
        {children}
      </span>
    </div>
  );
};

export default SectionLabel;
