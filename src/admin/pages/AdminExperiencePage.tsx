import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import { db } from "../../lib/firebase";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import type { ExperienceEntry } from "../../data/types";
import AdminField from "../components/AdminField";
import AdminTextarea from "../components/AdminTextarea";
import {
  adminButtonDanger,
  adminButtonPrimary,
  adminButtonSecondary,
} from "../components/adminStyles";

type ExperienceForm = Omit<ExperienceEntry, "id" | "order"> & {
  order: string;
};

const EMPTY_FORM: ExperienceForm = {
  period: "",
  role: "",
  organization: "",
  description: "",
  order: "0",
};

const toForm = (entry: ExperienceEntry): ExperienceForm => ({
  period: entry.period,
  role: entry.role,
  organization: entry.organization,
  description: entry.description,
  order: String(entry.order),
});

const AdminExperiencePage = () => {
  const { items: experience, isLoading } =
    useFirestoreCollection<ExperienceEntry>("experience");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ExperienceForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof ExperienceForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleEdit = (entry: ExperienceEntry) => {
    setEditingId(entry.id);
    setForm(toForm(entry));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = async (entry: ExperienceEntry) => {
    if (!window.confirm(`Delete "${entry.role}"? This can't be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "experience", entry.id));
      toast.success("Experience entry deleted.");
      if (editingId === entry.id) {
        handleCancelEdit();
      }
    } catch {
      toast.error("Couldn't delete. Please try again.");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    const data = {
      period: form.period,
      role: form.role,
      organization: form.organization,
      description: form.description,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "experience", editingId), data);
        toast.success("Experience entry updated.");
      } else {
        await addDoc(collection(db, "experience"), data);
        toast.success("Experience entry added.");
      }
      handleCancelEdit();
    } catch {
      toast.error("Couldn't save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-head text-xl font-medium">Experience</h2>

        {isLoading ? (
          <p className="mt-4 text-sm text-text-secondary">Loading…</p>
        ) : experience.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">
            No entries yet — add your first one below.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {experience.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{entry.role}</p>
                  <p className="truncate text-xs text-text-secondary">
                    {entry.organization} · {entry.period} · order{" "}
                    {entry.order}
                  </p>
                </div>
                <div className="flex flex-none gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(entry)}
                    aria-label={`Edit ${entry.role}`}
                    className={adminButtonSecondary}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry)}
                    aria-label={`Delete ${entry.role}`}
                    className={adminButtonDanger}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
        <h3 className="font-head text-lg font-medium">
          {editingId ? "Edit entry" : "Add entry"}
        </h3>

        <AdminField
          label="Period"
          id="period"
          value={form.period}
          onChange={handleFieldChange("period")}
          required
          placeholder="Sep 2022 – Aug 2023"
        />
        <AdminField
          label="Role"
          id="role"
          value={form.role}
          onChange={handleFieldChange("role")}
          required
          placeholder="Front-End Web Developer"
        />
        <AdminField
          label="Organization"
          id="organization"
          value={form.organization}
          onChange={handleFieldChange("organization")}
          required
          placeholder="Getepay.in, India"
        />
        <AdminTextarea
          label="Description"
          id="description"
          value={form.description}
          onChange={handleFieldChange("description")}
          required
          rows={3}
        />
        <AdminField
          label="Order"
          id="order"
          type="number"
          value={form.order}
          onChange={handleFieldChange("order")}
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className={adminButtonPrimary}
          >
            {isSaving ? "Saving…" : editingId ? "Save changes" : "Add entry"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className={adminButtonSecondary}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminExperiencePage;
