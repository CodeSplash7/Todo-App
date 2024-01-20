import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tickClock } from "./clockSlice";

type Filter = "active" | "completed" | "overdue" | "all";

export type TaskObject = {
  id: number;
  title: string;
  description: string;
  labelId: number;
  creationDate: string;
  dueDate: string;
  active: boolean;
  overdue: boolean;
};

type InitialState = {
  tasks: TaskObject[];
  filtered: TaskObject[];
  filter: Filter;
};

const handleFiltering = (state: InitialState) => {
  const { filter } = state;
  let filtered = state.tasks;
  if (filter === "active" || filter === "completed") {
    let filterActive: boolean;
    if (filter === "active") filterActive = true;
    if (filter === "completed") filterActive = false;
    filtered = state.tasks.filter((task) => task.active === filterActive);
  }
  if (filter === "overdue") {
    filtered = state.tasks.filter((task) => task.overdue === true);
  }
  state.filtered = filtered;
  // console.log("filtered bruv, look:", filtered, "__________________");
};

const initialState: InitialState = {
  tasks: [
    {
      id: 0,
      title: "TaskOfRandom",
      description: "This is a random task.",
      active: true,
      overdue: true,
      labelId: 1,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    },
    {
      id: 1,
      title: "TaskOfRandom2",
      description: "This is a random task. #2",
      active: false,
      overdue: false,
      labelId: 2,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
      title: "TaskOfRandom3",
      description: "This is a random task. #3",
      active: true,
      overdue: true,
      labelId: 1,
      creationDate: new Date().toISOString(),
      dueDate: new Date().toISOString()
    }
  ],
  filtered: [],
  filter: "all"
};

let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    filterTasks(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
      handleFiltering(state);
    },
    addTask(state, action: PayloadAction<TaskObject>) {
      const task = action.payload;
      task.id = state.tasks.length;
      state.tasks.push(task);
      handleFiltering(state);
    },
    deleteTask(state, action: PayloadAction<number>) {
      const taskId = action.payload;
      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      state.tasks = newTasks;
      handleFiltering(state);
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
      handleFiltering(state);
    },
    triggerCompletion(state, action: PayloadAction<number>) {
      let targetedTask = state.tasks.find((task) => task.id === action.payload);
      if (!targetedTask) return;
      targetedTask.active = !targetedTask.active;
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task = targetedTask as typeof task;
        }
        return task;
      });
      handleFiltering(state);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(tickClock.fulfilled, (state) => {
      state.tasks.forEach((task) => {
        let dueDate = new Date(task.dueDate);
        let currentDate = new Date();

        if (dueDate < currentDate && !task.overdue && task.active) {
          task.overdue = true;
          handleFiltering(state);
        }
        if (dueDate > currentDate && task.overdue) {
          task.overdue = false;
          task.active = true;
          handleFiltering(state);
        }
      });
    });
  }
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
