"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export type AuthContextType = {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
  isAuthenticated: boolean;
  user: any;
  authType: 'custom' | 'google' | null;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {},
  isAuthenticated: false,
  user: null,
  authType: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { data: session, status } = useSession();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
  }, []);

  useEffect(() => {
    if (!userToken) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'}/users/me`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        if (response.ok) {
          setUser(await response.json());
        }
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, [userToken]);

  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      const syncGoogleUser = async () => {
        try {
          const response = await fetch('http://localhost:1337/api/auth/google-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: session.user?.email,
              name: session.user?.name
            })
          });
          const data = await response.json();
          if (data.jwt) {
            setUserToken(data.jwt);
            localStorage.setItem("token", data.jwt);
          }
        } catch (error) {
          console.error('Google sync failed:', error);
        }
      };
      syncGoogleUser();
    }
  }, [session, status]);

  const isAuthenticated = !!userToken;
  const authType = session ? 'google' : userToken ? 'custom' : null;
  const currentUser = user || session?.user || null;

  return (
    <AuthContext.Provider value={{ 
      userToken, 
      setUserToken, 
      isAuthenticated, 
      user: currentUser, 
      authType
    }}>
      {children}
    </AuthContext.Provider>
  );
};