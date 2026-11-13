// The CV link lives in Firestore (content/socials.resumeUrl) so /admin can change it
// without a redeploy. The public page reads it over REST: no Firebase SDK in the main bundle.
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-1e442";
export const SOCIALS_DOC_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/content/socials`;

export const isUsableUrl = (value: unknown): value is string =>
  typeof value === "string" && /^(https:\/\/\S+|\/(?!\/)\S+)$/i.test(value.trim()); // https link, or a file on this site such as /resume.pdf

export async function fetchResumeUrl(signal?: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(SOCIALS_DOC_URL, { signal });
    if (!res.ok) return null;
    const doc = (await res.json()) as { fields?: { resumeUrl?: { stringValue?: string } } };
    const value = doc.fields?.resumeUrl?.stringValue;
    return isUsableUrl(value) ? value.trim() : null;
  } catch {
    return null;
  }
}
