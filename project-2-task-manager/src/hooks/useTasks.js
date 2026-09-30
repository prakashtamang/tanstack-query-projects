import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/tasks";

// Get task
export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};

// Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return [newTask];
        return [...oldTasks, newTask];
      });
    },
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks"],
      });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return [];

        return oldTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task,
        );
      });

      return {
        previousTasks,
      };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: (deleteId) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return [];

        return oldTasks.filter((task) => task.id !== deleteId);
      });
    },
  });
};
