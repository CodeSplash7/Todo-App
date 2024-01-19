import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tickClock } from "./clockSlice";

export type TaskStatus = "active" | "completed" | "overdue";

export type TaskObject = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  labelId: number;
  creationDate: string;
  dueDate: string;
};

type InitialState = {
  tasks: TaskObject[];
};

const initialState: InitialState = {
  tasks: [
    // {
    //   id: 0,
    //   title: "TaskOfRandom",
    //   description: "This is a random task.",
    //   status: "active",
    //   labelId: 1,
    //   creationDate: new Date().toISOString(),
    //   dueDate: new Date().toISOString()
    // },
    // {
    //   id: 1,
    //   title: "TaskOfRandom2",
    //   description: "This is a random task. #2",
    //   status: "completed",
    //   labelId: 2,
    //   creationDate: new Date().toISOString(),
    //   dueDate: new Date().toISOString()
    // },
    // {
    //   id: 2,
    //   title: "TaskOfRandom3",
    //   description: "This is a random task. #3",
    //   status: "overdue",
    //   labelId: 1,
    //   creationDate: new Date().toISOString(),
    //   dueDate: new Date().toISOString()
    // }
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
    },
    triggerCompletion(state, action: PayloadAction<number>) {
      let targetedTask = state.tasks.find((task) => task.id === action.payload);
      let completionStatus = targetedTask?.status;
      if (
        (completionStatus === "active" || completionStatus === "overdue") &&
        targetedTask
      ) {
        targetedTask.status = "completed";
      }
      if (completionStatus === "completed" && targetedTask) {
        targetedTask.status = "active";
      }
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task = targetedTask as typeof task;
        }
        return task;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tickClock.fulfilled, (state) => {
      state.tasks.forEach((task) => {
        let dueDate = new Date(task.dueDate);
        let currentDate = new Date();

        if (dueDate < currentDate && task.status !== "completed") {
          task.status = "overdue";
        }
        if (dueDate > currentDate && task.status !== "completed") {
          task.status = "active";
        }
      });
    });
  }
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
