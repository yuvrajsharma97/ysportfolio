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
import type { TechnologyGroup } from "../../data/types";
import AdminField from "../components/AdminField";
import {
  adminButtonDanger,
  adminButtonPrimary,
  adminButtonSecondary,
} from "../components/adminStyles";

type TechStackForm = Omit<TechnologyGroup, "id" | "technologies" | "order"> & {
  technologies: string;
  order: string;
};

const EMPTY_FORM: TechStackForm = {
  category: "",
  technologies: "",
  order: "0",
};

const toForm = (group: TechnologyGroup): TechStackForm => ({
  category: group.category,
  technologies: group.technologies.join(", "),
  order: String(group.order),
});

const AdminTechStackPage = () => {
  const { items: groups, isLoading } =
    useFirestoreCollection<TechnologyGroup>("techStack");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TechStackForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof TechStackForm) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleEdit = (group: TechnologyGroup) => {
    setEditingId(group.id);
    setForm(toForm(group));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = async (group: TechnologyGroup) => {
    if (!window.confirm(`Delete "${group.category}"? This can't be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "techStack", group.id));
      toast.success("Group deleted.");
      if (editingId === group.id) {
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
      category: form.category,
      technologies: form.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "techStack", editingId), data);
        toast.success("Group updated.");
      } else {
        await addDoc(collection(db, "techStack"), data);
        toast.success("Group added.");
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
        <h2 className="font-head text-xl font-medium">Tech Stack</h2>

        {isLoading ? (
          <p className="mt-4 text-sm text-text-secondary">Loading…</p>
        ) : groups.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">
            No groups yet — add your first one below.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {group.category}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {group.technologies.join(", ")} · order {group.order}
                  </p>
                </div>
                <div className="flex flex-none gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(group)}
                    aria-label={`Edit ${group.category}`}
                    className={adminButtonSecondary}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(group)}
                    aria-label={`Delete ${group.category}`}
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
          {editingId ? "Edit group" : "Add group"}
        </h3>

        <AdminField
          label="Category"
          id="category"
          value={form.category}
          onChange={handleFieldChange("category")}
          required
          placeholder="Frontend"
        />
        <AdminField
          label="Technologies (comma-separated)"
          id="technologies"
          value={form.technologies}
          onChange={handleFieldChange("technologies")}
          required
          placeholder="React, Next.js, Tailwind CSS"
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
            {isSaving ? "Saving…" : editingId ? "Save changes" : "Add group"}
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

export default AdminTechStackPage;
