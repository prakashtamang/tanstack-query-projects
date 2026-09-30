# Task Manager — TanStack Query

A learning project built with React, TanStack Query, Tailwind CSS, and JSON Server to practice server-state management and CRUD mutations.

The project focuses on understanding how TanStack Query handles:

- useQuery
- useMutation
- Create tasks
- Update tasks
- Delete tasks
- invalidateQueries
- setQueryData
- Optimistic updates
- Rollback after failed optimistic updates
- Query cache management
- Loading and error states

## Features

1. Fetch Tasks

   Tasks are fetched from a JSON Server API using useQuery.

3. Create Task

   Users can create a new task with:

   - Title
   - Description
   - Completed status
   - Created date

   The request is handled with useMutation.

3. Update Task

   Tasks can be marked as:

   - Completed
   - Pending

   The update uses an HTTP PATCH request.

4. Delete Task

   Tasks can be deleted using useMutation.
