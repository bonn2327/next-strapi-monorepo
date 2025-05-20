"use client";
import { usePostTask } from "@/hooks/usePostTask";
import { useToken } from "@/hooks/useToken";
import { queryClient } from "@/libs/queryClient";
import { TaskInput } from "@/types/task";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const TaskForm = () => {
  const userToken = useToken();
  const postTaskMutation = usePostTask();
  const { register, handleSubmit, formState, reset } = useForm<TaskInput>();

  const onSubmit = (data: TaskInput) => {
    postTaskMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task added");
        reset();
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error adding task");
      },
    });
  };

  if (!userToken) {
    return <div>You are not logged in</div>;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          {...register("text", { required: true })}
        />
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white p-2 rounded-md"
          title="Add task"
          disabled={!formState.isValid && postTaskMutation.isPending}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
