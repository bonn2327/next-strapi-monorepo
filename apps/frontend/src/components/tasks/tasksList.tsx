"use client";

import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useGetTasks } from "@/hooks/useGetTasks";
import { queryClient } from "@/libs/queryClient";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";

export const TasksList = () => {
  const { data: tasksList } = useGetTasks();
  const deleteTaskMutation = useDeleteTask();

  console.log(tasksList);

  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Task deleted");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting task");
      },
    });
  };

  return (
    <div>
      {tasksList?.data?.map((task) => (
        <div
          key={task.id}
          className="border border-gray-300 rounded-md p-4 m-2 relative"
        >
          {task.text}
          <button
            onClick={() => handleDeleteTask(task.id.toString())}
            className="absolute top-2 right-2 cursor-pointer p-2 bg-red-200 text-red-700 rounded-md"
            title="Delete task"
          >
            <GoTrash />
          </button>
        </div>
      ))}
    </div>
  );
};
