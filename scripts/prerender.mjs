// Bakes the page into dist/index.html so it reads with scripting off and indexes well.
// The content (projects, experience, stack) and the CV link come from Firestore at build time,
// through the same code the page uses; the page re-reads them on load.
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { render, fetchLiveContent, fetchResumeUrl } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);

const [content, resumeUrl] = await Promise.all([fetchLiveContent(), fetchResumeUrl()]);
const json = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

const htmlPath = resolve("dist/index.html");
const template = await readFile(htmlPath, "utf8");
const html = template
  .replace("<!--app-->", render(resumeUrl, content))
  .replace("<!--state-->", `<script>window.__RESUME_URL__=${json(resumeUrl)};window.__CONTENT__=${json(content)}</script>`);
await writeFile(htmlPath, html);
await rm(resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerendered dist/index.html: projects ${content.projects.map((p) => p.title).join(", ")} (CV link: ${resumeUrl ?? "none yet"})`);
