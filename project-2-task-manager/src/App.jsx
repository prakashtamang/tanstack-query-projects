import React from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p className="mt-2 text-gray-400">
            TanStack Query CRUD & Cache Management
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <AddTaskForm />
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        </div>
        <TaskList />
      </main>
    </div>
  );
};

export default App;
