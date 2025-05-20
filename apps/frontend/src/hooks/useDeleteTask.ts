import { useMutation } from "@tanstack/react-query";
import { useToken } from "./useToken";

export const useDeleteTask = () => {
  const userToken = useToken();

  const deleteTask = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  };

  return useMutation({
    mutationFn: deleteTask,
  });
};
