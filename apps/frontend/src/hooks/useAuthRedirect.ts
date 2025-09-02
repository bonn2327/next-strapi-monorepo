"use client";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useAuthRedirect = (requireAuth: boolean = true) => {
  const { redirectIfNotAuth, redirectIfAuth } = useAuth();
  
  useEffect(() => {
    if (requireAuth) {
      redirectIfNotAuth();
    } else {
      redirectIfAuth();
    }
  }, [requireAuth]);
};