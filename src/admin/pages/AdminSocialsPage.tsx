import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../lib/firebase";
import { useFirestoreDocument } from "../../hooks/useFirestoreDocument";
import type { SocialsContent } from "../../data/types";
import AdminField from "../components/AdminField";
import { adminButtonPrimary } from "../components/adminStyles";

const EMPTY_SOCIALS: SocialsContent = {
  github: "",
  linkedin: "",
  resumeUrl: "",
};

const AdminSocialsPage = () => {
  const { data, isLoading } = useFirestoreDocument<SocialsContent>(
    "content",
    "socials",
  );

  if (isLoading) {
    return <p className="text-sm text-text-secondary">Loading…</p>;
  }

  return <SocialsForm initialData={data ?? EMPTY_SOCIALS} />;
};

const SocialsForm = ({ initialData }: { initialData: SocialsContent }) => {
  const [form, setForm] = useState<SocialsContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof SocialsContent) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.resumeUrl) {
      toast.error("Please add a resume URL first.");
      return;
    }

    setIsSaving(true);

    try {
      await setDoc(doc(db, "content", "socials"), form);
      toast.success("Socials saved.");
    } catch {
      toast.error("Couldn't save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
      <h2 className="font-head text-xl font-medium">Socials</h2>

      <AdminField
        label="GitHub URL"
        id="github"
        value={form.github}
        onChange={handleFieldChange("github")}
        required
        placeholder="https://github.com/username"
      />
      <AdminField
        label="LinkedIn URL"
        id="linkedin"
        value={form.linkedin}
        onChange={handleFieldChange("linkedin")}
        required
        placeholder="https://linkedin.com/in/username"
      />
      <AdminField
        label="Resume URL (PDF)"
        id="resumeUrl"
        value={form.resumeUrl}
        onChange={handleFieldChange("resumeUrl")}
        required
        placeholder="https://example.com/resume.pdf"
      />
      {form.resumeUrl && (
        <a
          href={form.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="-mt-3 text-sm text-green-bright underline-offset-4 hover:underline"
        >
          Preview current resume
        </a>
      )}

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

export default AdminSocialsPage;
