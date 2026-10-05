import { ArrowRight, LayoutGrid, Check } from "lucide-react";

const navItems = [
  { href: "#work", label: "View Work", icon: ArrowRight },
  { href: "#stack", label: "Stack", icon: LayoutGrid },
  { href: "#contact", label: "Contact", icon: Check },
];

const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="glass-strong fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full p-1.5"
      style={{ top: "calc(24px + env(safe-area-inset-top, 0px))" }}
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          className="group flex h-11 items-center gap-2.5 rounded-full border border-transparent px-[18px] text-[13px] text-text-secondary transition-colors duration-200 ease-out-strong touch-manipulation select-none hover:border-border-strong hover:bg-surface-hover hover:text-text active:scale-[0.97]"
        >
          <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-green/40 bg-green/[0.12] text-green-bright transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5">
            <Icon size={12} strokeWidth={1.8} />
          </span>
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
