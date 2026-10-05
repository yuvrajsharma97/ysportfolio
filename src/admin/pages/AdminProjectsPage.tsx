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
import type { Project } from "../../data/types";
import AdminField from "../components/AdminField";
import AdminTextarea from "../components/AdminTextarea";
import {
  adminButtonDanger,
  adminButtonPrimary,
  adminButtonSecondary,
} from "../components/adminStyles";

type ProjectForm = Omit<Project, "id" | "technologies" | "order"> & {
  technologies: string;
  order: string;
};

const EMPTY_FORM: ProjectForm = {
  title: "",
  category: "",
  description: "",
  image: "",
  technologies: "",
  href: "",
  github: "",
  order: "0",
};

const toForm = (project: Project): ProjectForm => ({
  title: project.title,
  category: project.category,
  description: project.description,
  image: project.image,
  technologies: project.technologies.join(", "),
  href: project.href,
  github: project.github,
  order: String(project.order),
});

const AdminProjectsPage = () => {
  const { items: projects, isLoading } =
    useFirestoreCollection<Project>("projects");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof ProjectForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm(toForm(project));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This can't be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "projects", project.id));
      toast.success("Project deleted.");
      if (editingId === project.id) {
        handleCancelEdit();
      }
    } catch {
      toast.error("Couldn't delete. Please try again.");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.image) {
      toast.error("Please add a screenshot URL first.");
      return;
    }

    setIsSaving(true);

    const data = {
      title: form.title,
      category: form.category,
      description: form.description,
      image: form.image,
      technologies: form.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      href: form.href,
      github: form.github,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), data);
        toast.success("Project updated.");
      } else {
        await addDoc(collection(db, "projects"), data);
        toast.success("Project added.");
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
        <h2 className="font-head text-xl font-medium">Projects</h2>

        {isLoading ? (
          <p className="mt-4 text-sm text-text-secondary">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">
            No projects yet — add your first one below.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {project.title}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {project.category} · order {project.order}
                  </p>
                </div>
                <div className="flex flex-none gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(project)}
                    aria-label={`Edit ${project.title}`}
                    className={adminButtonSecondary}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    aria-label={`Delete ${project.title}`}
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
          {editingId ? "Edit project" : "Add project"}
        </h3>

        <AdminField
          label="Title"
          id="title"
          value={form.title}
          onChange={handleFieldChange("title")}
          required
          placeholder="LoyaltyOS"
        />
        <AdminField
          label="Category"
          id="category"
          value={form.category}
          onChange={handleFieldChange("category")}
          required
          placeholder="SaaS · Full-Stack"
        />
        <AdminTextarea
          label="Description"
          id="description"
          value={form.description}
          onChange={handleFieldChange("description")}
          required
          rows={3}
        />

        <div className="flex flex-col gap-1.5">
          <AdminField
            label="Screenshot URL"
            id="image"
            value={form.image}
            onChange={handleFieldChange("image")}
            required
            placeholder="https://example.com/screenshot.jpg"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Screenshot preview"
              className="h-32 w-full rounded-lg border border-border object-cover"
            />
          )}
        </div>

        <AdminField
          label="Technologies (comma-separated)"
          id="technologies"
          value={form.technologies}
          onChange={handleFieldChange("technologies")}
          required
          placeholder="Next.js, MongoDB, Tailwind CSS"
        />
        <AdminField
          label="Live URL"
          id="href"
          value={form.href}
          onChange={handleFieldChange("href")}
          required
          placeholder="https://example.com"
        />
        <AdminField
          label="GitHub URL"
          id="github"
          value={form.github}
          onChange={handleFieldChange("github")}
          required
          placeholder="https://github.com/username/repo"
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
            {isSaving ? "Saving…" : editingId ? "Save changes" : "Add project"}
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

export default AdminProjectsPage;
