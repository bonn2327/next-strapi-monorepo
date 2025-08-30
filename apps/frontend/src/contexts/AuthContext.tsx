"use client";
import { createContext, useState, useEffect } from "react";

export type AuthContextType = {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingToken = window.localStorage.getItem("token") ?? "";
      setUserToken(existingToken || null);
    }

  }, []);


  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
