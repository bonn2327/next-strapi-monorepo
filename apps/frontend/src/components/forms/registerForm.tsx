"use client";
import { useRegister } from "@/hooks/useRegister";
import { useSetToken } from "@/hooks/useSetToken";
import { UserAccessResponse, UserRegister } from "@/types/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<UserRegister>();
  const registerMutation = useRegister();
  const setToken = useSetToken();
  const router = useRouter();

  const onRegisterSubmit = (userForm: UserRegister) => {
    if (userForm.password !== userForm.passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }
    registerMutation.mutate(userForm, {
      onSuccess: (result: UserAccessResponse) => {
        setToken(result);
        toast.success("Register successful");
        router.push("/");
      },
      onError: (error) => {
        toast.error("Register failed");
        console.log(error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onRegisterSubmit)}
      className="flex flex-col md:flex-row gap-2 p-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
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
      <div className="flex flex-col gap-2">
        <label
          htmlFor="passwordConfirmation"
          className="text-sm font-medium text-gray-700"
        >
          Password Confirmation
        </label>
        <input
          type="password"
          placeholder="Password Confirmation"
          {...register("passwordConfirmation", { required: true })}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        disabled={!formState.isValid}
        type="submit"
        className="bg-blue-500 text-white rounded-md p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Register
      </button>
    </form>
  );
};
