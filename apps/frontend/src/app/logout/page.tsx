"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { signOut } from "next-auth/react";

export default function LogoutPage() {
  const { setToken } = useAuth();
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;
    
    const logout = async () => {
      setToken(null);
      await signOut({ redirect: false });

      router.push("/");
    };
    
    logout();
  }, []);

  return (
    <div>
      <h1>Disconnecting...</h1>
    </div>
  );
}
