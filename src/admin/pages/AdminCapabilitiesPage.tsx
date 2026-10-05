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
import { CAPABILITY_ICON_NAMES, CAPABILITY_ICONS } from "../../lib/icons";
import type { Capability } from "../../data/types";
import AdminField from "../components/AdminField";
import AdminTextarea from "../components/AdminTextarea";
import {
  adminButtonDanger,
  adminButtonPrimary,
  adminButtonSecondary,
  adminInputClasses,
} from "../components/adminStyles";

type CapabilityForm = Omit<Capability, "id" | "order"> & { order: string };

const EMPTY_FORM: CapabilityForm = {
  title: "",
  description: "",
  icon: CAPABILITY_ICON_NAMES[0],
  order: "0",
};

const toForm = (capability: Capability): CapabilityForm => ({
  title: capability.title,
  description: capability.description,
  icon: capability.icon,
  order: String(capability.order),
});

const AdminCapabilitiesPage = () => {
  const { items: capabilities, isLoading } =
    useFirestoreCollection<Capability>("capabilities");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CapabilityForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof CapabilityForm) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleEdit = (capability: Capability) => {
    setEditingId(capability.id);
    setForm(toForm(capability));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = async (capability: Capability) => {
    if (!window.confirm(`Delete "${capability.title}"? This can't be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "capabilities", capability.id));
      toast.success("Capability deleted.");
      if (editingId === capability.id) {
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
      title: form.title,
      description: form.description,
      icon: form.icon,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "capabilities", editingId), data);
        toast.success("Capability updated.");
      } else {
        await addDoc(collection(db, "capabilities"), data);
        toast.success("Capability added.");
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
        <h2 className="font-head text-xl font-medium">Capabilities</h2>

        {isLoading ? (
          <p className="mt-4 text-sm text-text-secondary">Loading…</p>
        ) : capabilities.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">
            No capabilities yet — add your first one below.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {capabilities.map((capability) => {
              const Icon = CAPABILITY_ICONS[capability.icon];
              return (
                <div
                  key={capability.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {Icon && (
                      <Icon size={16} className="flex-none text-green-bright" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {capability.title}
                      </p>
                      <p className="truncate text-xs text-text-secondary">
                        {capability.icon} · order {capability.order}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-none gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(capability)}
                      aria-label={`Edit ${capability.title}`}
                      className={adminButtonSecondary}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(capability)}
                      aria-label={`Delete ${capability.title}`}
                      className={adminButtonDanger}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
        <h3 className="font-head text-lg font-medium">
          {editingId ? "Edit capability" : "Add capability"}
        </h3>

        <AdminField
          label="Title"
          id="title"
          value={form.title}
          onChange={handleFieldChange("title")}
          required
          placeholder="Full-Stack Applications"
        />
        <AdminTextarea
          label="Description"
          id="description"
          value={form.description}
          onChange={handleFieldChange("description")}
          required
          rows={2}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="icon"
            className="text-xs text-text-secondary uppercase tracking-[0.08em]"
          >
            Icon
          </label>
          <select
            id="icon"
            value={form.icon}
            onChange={handleFieldChange("icon")}
            className={adminInputClasses}
          >
            {CAPABILITY_ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

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
            {isSaving
              ? "Saving…"
              : editingId
                ? "Save changes"
                : "Add capability"}
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

export default AdminCapabilitiesPage;
