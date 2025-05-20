"use client";
import { AuthProvider } from "@/contexts/AuthContext";

export const PageWrapperClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
