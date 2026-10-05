import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AdminLogin from "./AdminLogin";
import AdminAccessDenied from "./AdminAccessDenied";
import AdminLayout from "./AdminLayout";
import AdminAboutPage from "./pages/AdminAboutPage";
import AdminSocialsPage from "./pages/AdminSocialsPage";
import AdminProjectsPage from "./pages/AdminProjectsPage";
import AdminExperiencePage from "./pages/AdminExperiencePage";
import AdminCapabilitiesPage from "./pages/AdminCapabilitiesPage";
import AdminTechStackPage from "./pages/AdminTechStackPage";

const AdminApp = () => {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-text-secondary">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return <AdminAccessDenied />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/about" replace />} />
        <Route path="about" element={<AdminAboutPage />} />
        <Route path="socials" element={<AdminSocialsPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="experience" element={<AdminExperiencePage />} />
        <Route path="capabilities" element={<AdminCapabilitiesPage />} />
        <Route path="tech-stack" element={<AdminTechStackPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;
