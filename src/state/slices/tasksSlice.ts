import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      id: 0,
      title: "TaskOfRandom",
      description: "This is a random task.",
      status: "active",
      labelId: 1,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    },
    {
      id: 1,
      title: "TaskOfRandom2",
      description: "This is a random task. #2",
      status: "completed",
      labelId: 2,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
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
    addTask(state, action: PayloadAction<TaskObject>) {
      const task = action.payload;
      task.id = state.tasks.length;
      state.tasks.push(task);
    },
    deleteTask(state, action: PayloadAction<number>) {
      const taskId = action.payload;
      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      state.tasks = newTasks;
    },
    updateTask(state, action: PayloadAction<{ id: number; info: TaskObject }>) {
      let targetedTask = state.tasks.find(
        (task) => task.id === action.payload.id
      );
      targetedTask = { ...targetedTask, ...action.payload.info };
      state.tasks = state.tasks.map((task) => {
        if (task.id === targetedTask?.id) {
          task = targetedTask;
        }
        return task;
      });
    }
  }
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
