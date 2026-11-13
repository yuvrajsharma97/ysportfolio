import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { fallbackContent, type Content } from "./lib/live-content";
import "./styles/site.css";

declare global {
  interface Window {
    __RESUME_URL__?: string | null;
    __CONTENT__?: Content;
    __motionReady?: boolean;
  }
}

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App initialResumeUrl={window.__RESUME_URL__ ?? null} initialContent={window.__CONTENT__ ?? fallbackContent} />
  </StrictMode>
);

// Production HTML is prerendered with Firestore's content (scripts/prerender.mjs); dev renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
