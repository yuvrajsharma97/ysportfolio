import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import type { AboutContent } from "../data/types";

const Footer = () => {
  const { data: about, isLoading } = useFirestoreDocument<AboutContent>(
    "content",
    "about",
  );

  if (isLoading || !about) {
    return null;
  }

  return (
    <footer className="border-t border-border px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 text-xs text-text-secondary md:flex-row md:justify-between">
        <span>© 2026 {about.name}</span>
        <span>Software Engineer · {about.role}</span>
        <span>Built with React &amp; Vite</span>
      </div>
    </footer>
  );
};

export default Footer;
