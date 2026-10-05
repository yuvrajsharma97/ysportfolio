import { useAuth } from "../context/useAuth";
import { adminButtonPrimary } from "./components/adminStyles";

const AdminLogin = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-text">
      <p className="font-mono text-xs text-text-secondary uppercase tracking-[0.24em]">
        Admin
      </p>
      <h1 className="font-head text-3xl font-medium">Sign in to continue</h1>
      <button
        type="button"
        onClick={signInWithGoogle}
        className={adminButtonPrimary}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default AdminLogin;
