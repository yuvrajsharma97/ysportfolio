import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import AdminApp from "./AdminApp";

const AdminRoot = () => (
  <AuthProvider>
    <AdminApp />
    <ToastContainer position="bottom-right" theme="dark" />
  </AuthProvider>
);

export default AdminRoot;
