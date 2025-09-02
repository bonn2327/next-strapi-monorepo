"use client";
import { signOut } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { authType, setUserToken } = useAuth();
  const router = useRouter();

  const logout = async () => {
    try {
      // Clear token first
      setUserToken(null);
      localStorage.clear();
      
      if (authType === 'google') {
        await signOut({ redirect: false });
      }
      
      // Force redirect
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout anyway
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return logout;
};