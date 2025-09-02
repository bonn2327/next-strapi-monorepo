"use client";
import { useRegister } from "@/hooks/useRegister";
import { useAuth } from "@/hooks/useAuth";
import { UserAccessResponse, UserRegister } from "@/types/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import { InputField } from "../common/InputField";

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<UserRegister>({
    mode: "onChange",
    defaultValues: { email: "", username: "", password: "", passwordConfirmation: "" }
  });

  const password = watch("password");
  const registerMutation = useRegister();
  const { setToken } = useAuth();
  const router = useRouter();

  const onSubmit = (data: UserRegister) => {
    registerMutation.mutate(data, {
      onSuccess: (result: UserAccessResponse) => {
        setToken(result);
        router.push("/");
      },
      onError: (error) => console.error(error)
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={FiMail}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />

        <InputField
          id="username"
          label="Username"
          type="text"
          placeholder="Choose a username"
          icon={FiUser}
          error={errors.username?.message}
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Username must be at least 3 characters" }
          })}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          icon={FiLock}
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
        />

        <InputField
          id="passwordConfirmation"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={FiLock}
          error={errors.passwordConfirmation?.message}
          {...register("passwordConfirmation", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match"
          })}
        />

        <button
          type="submit"
          disabled={!isValid || registerMutation.isPending}
          className={`w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-sm text-gray-300 font-medium ${
            !isValid || registerMutation.isPending
              ? "bg-gray-50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          } transition-colors`}
        >
          {registerMutation.isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          By registering, you agree to our{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</a>
        </p>
      </form>
    </div>
  );
};