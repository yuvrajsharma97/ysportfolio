import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../lib/firebase";
import { useFirestoreDocument } from "../../hooks/useFirestoreDocument";
import type { AboutContent } from "../../data/types";
import AdminField from "../components/AdminField";
import AdminTextarea from "../components/AdminTextarea";
import { adminButtonPrimary } from "../components/adminStyles";

const EMPTY_ABOUT: AboutContent = {
  name: "",
  role: "",
  shortBio: "",
  supportingLine: "",
  heroImage: "",
};

const AdminAboutPage = () => {
  const { data, isLoading } = useFirestoreDocument<AboutContent>(
    "content",
    "about",
  );

  if (isLoading) {
    return <p className="text-sm text-text-secondary">Loading…</p>;
  }

  return <AboutForm initialData={{ ...EMPTY_ABOUT, ...data }} />;
};

const AboutForm = ({ initialData }: { initialData: AboutContent }) => {
  const [form, setForm] = useState<AboutContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof AboutContent) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await setDoc(doc(db, "content", "about"), form);
      toast.success("About content saved.");
    } catch {
      toast.error("Couldn't save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
      <h2 className="font-head text-xl font-medium">About</h2>
      <p className="-mt-3 text-sm text-text-secondary">
        Powers the hero name and image, intro statement and footer.
      </p>

      <AdminField
        label="Name"
        id="name"
        value={form.name}
        onChange={handleFieldChange("name")}
        required
        placeholder="Yuvraj Sharma"
      />
      <AdminField
        label="Role"
        id="role"
        value={form.role}
        onChange={handleFieldChange("role")}
        required
        placeholder="Full-Stack Developer"
      />
      <div className="flex flex-col gap-3">
        <AdminField
          label="Hero image URL"
          id="heroImage"
          type="url"
          value={form.heroImage}
          onChange={handleFieldChange("heroImage")}
          placeholder="https://ik.imagekit.io/…/portrait.png"
        />
        {form.heroImage && (
          <img
            src={form.heroImage}
            alt="Hero image preview"
            className="h-32 w-32 rounded-lg border border-border object-contain"
          />
        )}
      </div>
      <AdminTextarea
        label="Short bio (hero)"
        id="shortBio"
        value={form.shortBio}
        onChange={handleFieldChange("shortBio")}
        required
        rows={3}
      />
      <AdminTextarea
        label="Supporting line (intro statement)"
        id="supportingLine"
        value={form.supportingLine}
        onChange={handleFieldChange("supportingLine")}
        rows={3}
      />

      <button
        type="submit"
        disabled={isSaving}
        className={`self-start ${adminButtonPrimary}`}
      >
        {isSaving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
};

export default AdminAboutPage;
