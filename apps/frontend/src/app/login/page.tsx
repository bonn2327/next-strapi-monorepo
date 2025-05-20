"use client";
import { LoginForm } from "@/components/forms/loginForm";
import { RegisterForm } from "@/components/forms/registerForm";
import { useIsNotConnected } from "@/hooks/useIsNotConnected";

export default function LoginPage() {
  useIsNotConnected(false);
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
