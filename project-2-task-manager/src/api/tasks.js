const API_URL = "http://localhost:3001/tasks";

// Get all tasks
export const fetchTasks = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

// Get single task
export const fetchTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
};

// Create task
export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

// Update task
export const updateTask = async ({ id, updates }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

// Delete task
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return id;
};
