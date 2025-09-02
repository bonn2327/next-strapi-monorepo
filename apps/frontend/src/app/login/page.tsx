"use client";
import { useState } from "react";
import { LoginForm } from "@/components/forms/loginForm";
import { RegisterForm } from "@/components/forms/registerForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { SimpleNavbar } from "@/features/navigation";

export default function LoginPage() {
  useAuthRedirect(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");



  return (
    <>
      <SimpleNavbar logoSrc="/logo.png"
        logoAlt="Grok Logo"
        avatarSrc="https://picsum.photos/200"
        avatarAlt="User Avatar"
        goBack={() => { }} />
      <div className="min-h-screen bg-gray-50 flex flex-col mt-8">
        <main className="flex-grow flex items-center justify-center p-4 md:p-8 min-w-xl mx-auto">
          <div className="w-full max-w-3xl bg-white rounded-xs shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="grid grid-cols-2">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`py-4 cursor-pointer text-center font-medium transition-colors ${activeTab === "login"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <div className="flex items-center justify-center">
                    Login
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`py-4 cursor-pointer text-center font-medium transition-colors ${activeTab === "register"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <div className="flex items-center justify-center">
                    Register
                  </div>
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </main>
      </div>
    </>

  );
}
