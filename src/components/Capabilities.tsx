import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { Capability } from "../data/types";
import CapabilityCard from "./CapabilityCard";
import SectionLabel from "./SectionLabel";

const Capabilities = () => {
  const { items: capabilities, isLoading } =
    useFirestoreCollection<Capability>("capabilities");

  if (isLoading || capabilities.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <SectionLabel>What I Build</SectionLabel>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.id} capability={capability} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
