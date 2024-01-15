import { createSlice } from "@reduxjs/toolkit";

export type TaskObject = {
  id: number;
  title: string;
  description: string;
  status: "active" | "completed" | "overdue";
  labelId: number;
  creationDate: string;
  dueDate: string;
};

type InitialState = {
  tasks: TaskObject[];
};

const initialState: InitialState = {
  tasks: [
    {
      id: 1,
      title: "TaskOfRandom",
      description: "This is a random task.",
      status: "active",
      labelId: 1,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
      title: "TaskOfRandom2",
      description: "This is a random task. #2",
      status: "completed",
      labelId: 2,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    },
    {
      id: 3,
      title: "TaskOfRandom3",
      description: "This is a random task. #3",
      status: "overdue",
      labelId: 1,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    }
  ]
};

let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: { payload: TaskObject }) {
      const task = action.payload;
      task.id = state.tasks.length;
      state.tasks.push(task);
    },
    deleteTask(state, action: { payload: number }) {
      const taskId = action.payload;
      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      state.tasks = newTasks;
    }
  }
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
