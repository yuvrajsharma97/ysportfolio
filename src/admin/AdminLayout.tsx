import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { adminButtonSecondary } from "./components/adminStyles";

const navItems = [
  { to: "/admin/about", label: "About" },
  { to: "/admin/socials", label: "Socials" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/capabilities", label: "Capabilities" },
  { to: "/admin/tech-stack", label: "Tech Stack" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs text-text-secondary uppercase tracking-[0.2em]">
            Admin
          </p>
          <a
            href="/"
            className="text-sm text-text-secondary underline-offset-4 hover:underline"
          >
            View live site
          </a>
        </div>
        <button
          type="button"
          onClick={signOut}
          className={`self-start ${adminButtonSecondary}`}
        >
          Sign out
        </button>
      </div>

      <div className="flex flex-col gap-8 px-6 py-8 lg:flex-row">
        <nav className="flex flex-row flex-wrap gap-2 lg:w-48 lg:flex-none lg:flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition-colors duration-200 ease-out-strong ${
                  isActive
                    ? "bg-green/10 text-green-bright"
                    : "text-text-secondary hover:text-text"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
