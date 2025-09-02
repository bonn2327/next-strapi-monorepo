"use client";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { UserAccessResponse, UserLogin } from "@/types/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiMail, FiLock } from "react-icons/fi";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { InputField } from "../common/InputField";

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserLogin>({
    mode: "onChange",
    defaultValues: { identifier: "", password: "" }
  });

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const loginMutation = useLogin();
  const { setToken } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signIn('google', { callbackUrl: '/' });
    setIsGoogleLoading(false);
  };

  const onSubmit = (data: UserLogin) => {
    setLoginError('');
    loginMutation.mutate(data, {
      onSuccess: (result: UserAccessResponse) => {
        setToken(result);
        router.push("/");
      },
      onError: () => setLoginError('Invalid username or password')
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className={`w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-sm bg-white text-gray-700 font-medium transition-colors ${
          isGoogleLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'
        }`}
      >
        {isGoogleLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </>
        )}
      </button>
      
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          id="identifier"
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          icon={FiMail}
          error={errors.identifier?.message}
          {...register("identifier", { 
            required: "Email or username is required",
            onChange: () => setLoginError('')
          })}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={FiLock}
          error={errors.password?.message || loginError}
          {...register("password", { 
            required: "Password is required",
            onChange: () => setLoginError('')
          })}
        />

        <button
          type="submit"
          disabled={!isValid || loginMutation.isPending}
          className={`w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-sm text-gray-300 font-medium ${
            !isValid || loginMutation.isPending
              ? "bg-gray-50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          } transition-colors`}
        >
          {loginMutation.isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};