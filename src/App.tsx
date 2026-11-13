import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WorkIndex from "./components/WorkIndex";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import Contact from "./components/Contact";

import { useSiteMotion } from "./lib/motion";
import { fetchResumeUrl } from "./lib/resume";
import { fetchLiveContent, type Content } from "./lib/live-content";

type Props = { initialResumeUrl: string | null; initialContent: Content };

export default function App({ initialResumeUrl, initialContent }: Props) {
  const [resumeUrl, setResumeUrl] = useState(initialResumeUrl);
  const [content, setContent] = useState(initialContent);
  const scope = useRef<HTMLDivElement>(null);
  useSiteMotion(scope);

  // The build bakes Firestore's content in; re-read it so an edit shows without a redeploy.
  useEffect(() => {
    const ctrl = new AbortController();
    fetchResumeUrl(ctrl.signal).then((url) => url && setResumeUrl(url));
    fetchLiveContent(ctrl.signal).then((next) => {
      if (!ctrl.signal.aborted) setContent((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    });
    return () => ctrl.abort();
  }, []);

  return (
    <div ref={scope}>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero resumeUrl={resumeUrl} />
        <WorkIndex projects={content.projects} />
        <Experience experience={content.experience} />
        <Stack stack={content.stack} />
        <Contact resumeUrl={resumeUrl} />
      </main>
      
    </div>
  );
}
