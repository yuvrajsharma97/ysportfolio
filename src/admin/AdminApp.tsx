import { useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ADMIN_EMAIL, auth, db, googleProvider, isConfigured } from "./firebase";
import { isUsableUrl } from "../lib/resume";

type Save = { state: "idle" | "saving" | "saved" | "error"; text: string };

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(isConfigured);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => { setUser(u); setChecking(false); });
  }, []);

  const isAdmin = !!user?.email && user.email.toLowerCase() === ADMIN_EMAIL;

  return (
    <main className="admin">
      <header className="admin__head">
        <h1>CV link</h1>
        <a className="admin__back" href="/">Back to the site</a>
      </header>

      {!isConfigured ? (
        <p className="admin__note">
          Firebase is not configured. Add <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_AUTH_DOMAIN</code>, <code>VITE_FIREBASE_APP_ID</code> and <code>VITE_ADMIN_EMAIL</code> to <code>.env.local</code>, then restart.
        </p>
      ) : checking ? (
        <p className="admin__note" role="status">Checking your sign-in.</p>
      ) : !user ? (
        <section className="admin__card">
          <p>Sign in with the Google account that owns this site.</p>
          <button
            className="admin__btn"
            type="button"
            onClick={async () => {
              setAuthError("");
              try { await signInWithPopup(auth!, googleProvider); }
              catch { setAuthError("Sign-in was cancelled or blocked. Allow pop-ups for this site and try again."); }
            }}
          >
            Sign in with Google
          </button>
          {authError && <p className="admin__error" role="alert">{authError}</p>}
        </section>
      ) : !isAdmin ? (
        <section className="admin__card">
          <p>{user.email} cannot edit this site.</p>
          <button className="admin__btn admin__btn--quiet" type="button" onClick={() => signOut(auth!)}>Sign out</button>
        </section>
      ) : (
        <ResumeForm email={user.email!} />
      )}
    </main>
  );
}

function ResumeForm({ email }: { email: string }) {
  const [url, setUrl] = useState("");
  const [current, setCurrent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [save, setSave] = useState<Save>({ state: "idle", text: "" });

  useEffect(() => {
    getDoc(doc(db!, "content", "socials"))
      .then((snap) => {
        const value = snap.get("resumeUrl");
        if (typeof value === "string") { setCurrent(value); setUrl(isUsableUrl(value) ? value : ""); }
      })
      .catch(() => setSave({ state: "error", text: "Could not load the current link." }))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = url.trim();
    if (!isUsableUrl(next)) { setError("Paste a link that starts with https:// (or a path on this site, such as /resume.pdf)"); return; }
    setError("");
    setSave({ state: "saving", text: "Saving." });
    try {
      await setDoc(doc(db!, "content", "socials"), { resumeUrl: next, resumeUpdatedAt: serverTimestamp() }, { merge: true });
      setCurrent(next);
      setSave({ state: "saved", text: "Saved. The site picks it up on the next page load." });
    } catch {
      setSave({ state: "error", text: "Saving failed. Check that your account is the admin in firestore.rules." });
    }
  };

  return (
    <section className="admin__card">
      <p className="admin__muted">Signed in as {email}. <button className="admin__linkbtn" type="button" onClick={() => signOut(auth!)}>Sign out</button></p>

      <form className="admin__form" onSubmit={onSubmit} noValidate>
        <label htmlFor="resume-url">CV link (your CDN URL)</label>
        <input
          id="resume-url"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={url}
          disabled={loading}
          onChange={(e) => { setUrl(e.target.value); setError(""); }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "resume-error" : undefined}
        />
        {error && <p id="resume-error" className="admin__error">{error}</p>}
        <div className="admin__row">
          <button className="admin__btn" type="submit" disabled={loading || save.state === "saving"} aria-busy={save.state === "saving" || undefined}>
            {save.state === "saving" ? "Saving" : "Save link"}
          </button>
          {isUsableUrl(url.trim()) && <a className="admin__back" href={url.trim()} target="_blank" rel="noopener noreferrer">Open to check</a>}
        </div>
        <p className={`admin__status admin__status--${save.state}`} role="status" aria-live="polite">{save.text}</p>
      </form>

      <p className="admin__muted">Live now: {current ? current : "no link set"}</p>
    </section>
  );
}
