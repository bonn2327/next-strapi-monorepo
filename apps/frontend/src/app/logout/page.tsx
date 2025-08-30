"use client";
import { useSetToken } from "@/hooks/useSetToken";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function LogoutPage() {
  const setToken = useSetToken();
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;
    
    setToken(null);
    toast.success("Disconnected");
    router.push("/");
  }, []);

  return (
    <div>
      <h1>Disconnecting...</h1>
    </div>
  );
}
