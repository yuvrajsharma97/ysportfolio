import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  size?: "default" | "large";
  icon?: LucideIcon;
};

const CtaButton = ({
  href,
  children,
  size = "default",
  icon: Icon = ArrowRight,
}: CtaButtonProps) => {
  const sizeClasses =
    size === "large" ? "px-7 py-4 text-[15px]" : "px-5 py-3.5 text-sm";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-full border border-green/40 bg-green/[0.08] text-text transition-[background-color,border-color,box-shadow] duration-200 ease-out-strong touch-manipulation select-none hover:border-green-bright hover:bg-green/[0.14] hover:shadow-[0_0_30px_rgba(0,217,104,0.12)] active:scale-[0.97] ${sizeClasses}`}
    >
      {children}
      <Icon
        size={size === "large" ? 16 : 14}
        className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1"
      />
    </a>
  );
};

export default CtaButton;
