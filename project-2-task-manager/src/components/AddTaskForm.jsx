import { useState } from "react";
import { useCreateTask } from "../hooks/useTasks";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTaskMutation = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTaskMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setDescription("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">Add New Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border px-4 py-2 outline-none focus: border-blue-500"
        />

        <button
          type="submit"
          disabled={createTaskMutation.isPending}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {" "}
          {createTaskMutation.isPending ? "Creating" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
