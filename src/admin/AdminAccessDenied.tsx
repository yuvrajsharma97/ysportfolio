import { useAuth } from "../context/useAuth";
import { adminButtonSecondary } from "./components/adminStyles";

const AdminAccessDenied = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-text">
      <h1 className="font-head text-2xl font-medium">Access denied</h1>
      <p className="max-w-sm text-sm text-text-secondary">
        {user?.email} isn't authorized to manage this content.
      </p>
      <button type="button" onClick={signOut} className={adminButtonSecondary}>
        Sign out
      </button>
    </div>
  );
};

export default AdminAccessDenied;
