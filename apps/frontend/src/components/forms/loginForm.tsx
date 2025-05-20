"use client";
import { useLogin } from "@/hooks/useLogin";
import { useSetToken } from "@/hooks/useSetToken";
import { UserAccessResponse, UserLogin } from "@/types/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<UserLogin>();
  const loginMutation = useLogin();
  const setToken = useSetToken();
  const router = useRouter();

  const onLoginSubmit = (userForm: UserLogin) => {
    loginMutation.mutate(userForm, {
      onSuccess: (result: UserAccessResponse) => {
        toast.success("Login successful");
        setToken(result);
        router.push("/");
      },
      onError: (error) => {
        toast.error("Login failed");
        console.log(error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="flex flex-col md:flex-row gap-2 p-4"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="identifier"
          className="text-sm font-medium text-gray-700"
        >
          Email or Username
        </label>
        <input
          type="text"
          placeholder="Email or Username"
          {...register("identifier", { required: true })}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        disabled={!formState.isValid}
        className="bg-blue-500 text-white rounded-md p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
};
