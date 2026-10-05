import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
