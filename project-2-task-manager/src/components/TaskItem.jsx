import { useDeleteTask, useUpdateTask } from "../hooks/useTasks";

const TaskItem = ({ task }) => {
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleToggle = () => {
    updateTaskMutation.mutate({
      id: task.id,
      updates: {
        completed: !task.completed,
      },
    });
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this task?")) return;

    deleteTaskMutation.mutate(task.id);
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3
            className={`text-xl font-semibold ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}
          >
            {task.title}
          </h3>
          <p className="mt-2 text-gray-600">{task.description}</p>
          <p className="mt-3 text-xs text-gray-400">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={handleToggle}
          disabled={updateTaskMutation.isPending}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:ppacity-50"
        >
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteTaskMutation.isPending}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>

      {updateTaskMutation.isError && (
        <p className="mt-3 text-sm text-red-600">
          {updateTaskMutation.error.message}
        </p>
      )}

      {deleteTaskMutation.isError && (
        <p className="mt-3 text-sm text-red-600">
          {deleteTaskMutation.error.message}
        </p>
      )}
    </div>
  );
};

export default TaskItem;
