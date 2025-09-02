"use client";

import { Navigation } from "@/features/navigation";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navigation logoSrc="/logo.png"
        logoAlt="Grok Logo"
        avatarSrc="https://picsum.photos/200"
        avatarAlt="User Avatar"
        goBack={() => router.push('/')} />
      <div className="min-h-screen  items-center justify-center">
        
      </div>
    </>

  );
}
