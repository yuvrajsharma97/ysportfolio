import { renderToString } from "react-dom/server";
import App from "./App";
import type { Content } from "./lib/live-content";

export { fetchLiveContent } from "./lib/live-content";
export { fetchResumeUrl } from "./lib/resume";

export function render(resumeUrl: string | null, content: Content) {
  return renderToString(<App initialResumeUrl={resumeUrl} initialContent={content} />);
}
