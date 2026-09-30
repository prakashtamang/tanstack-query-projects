import { useTasks } from "../hooks/useTasks";
import Loading from "./Loading";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { data: tasks, isPending, isError, error, refetch } = useTasks();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow">
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={refetch}
          className="mt-4 rounded-lg bg-blue-600 px-4 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">No task found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
