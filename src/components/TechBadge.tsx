import type { ReactNode } from "react";

type TechBadgeProps = {
  children: ReactNode;
};

const TechBadge = ({ children }: TechBadgeProps) => {
  return (
    <span className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-text-secondary">
      {children}
    </span>
  );
};

export default TechBadge;
