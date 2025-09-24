import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

type Ctx = { user: User | null; checking: boolean };
const AuthCtx = createContext<Ctx>({ user: null, checking: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => onAuthStateChanged(auth, u => { setUser(u); setChecking(false); }), []);
  return <AuthCtx.Provider value={{ user, checking }}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
