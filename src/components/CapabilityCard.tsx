import { ArrowRight } from "lucide-react";
import { CAPABILITY_ICONS } from "../lib/icons";
import type { Capability } from "../data/types";

type CapabilityCardProps = {
  capability: Capability;
};

const CapabilityCard = ({ capability }: CapabilityCardProps) => {
  const Icon = CAPABILITY_ICONS[capability.icon] ?? CAPABILITY_ICONS.Layers;

  return (
    <div className="group glass-strong rounded-[10px] p-6 transition-[transform,background-color,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-green/40 hover:bg-surface-hover">
      <div className="flex items-start justify-between">
        <Icon size={20} strokeWidth={1.6} className="text-green-bright" />
        <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border border-green/35 bg-green/10 text-green-bright transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
          <ArrowRight size={12} strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="mt-5 font-head text-base font-medium tracking-wide">
        {capability.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
        {capability.description}
      </p>
    </div>
  );
};

export default CapabilityCard;
