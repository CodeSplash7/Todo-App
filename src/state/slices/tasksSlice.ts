import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tickClock } from "./clockSlice";

type Filter = "active" | "completed" | "overdue" | null;
type Sorting = "creation" | "deadline" | "status" | null;

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
  // filtered: TaskObject[];
  filter: Filter;
  sorting: Sorting;
  // sorted: TaskObject[];
  tasksToShow: TaskObject[];
};

const handleFiltering = (state: InitialState) => {
  const { filter } = state;
  let tasksToFilter = JSON.parse(JSON.stringify(state.tasks)) as TaskObject[];
  let filtered: TaskObject[] = [];
  if (filter === "active" || filter === "completed") {
    let filterActive: boolean;
    if (filter === "active") filterActive = true;
    if (filter === "completed") filterActive = false;
    filtered = tasksToFilter.filter((task) => task.active === filterActive);
  }
  if (filter === "overdue") {
    filtered = state.tasks.filter((task) => task.overdue === true);
  }
  if (filter === null) filtered = tasksToFilter;
  return filtered;
};

const handleSorting = (state: InitialState) => {
  const { sorting } = state;
  let tasksToSort = JSON.parse(JSON.stringify(state.tasks)) as TaskObject[];
  let sorted: TaskObject[] = [];
  if (sorting === "creation") {
    sorted = tasksToSort.sort(
      (a, b) =>
        new Date(a.creationDate).getTime() + new Date(b.creationDate).getTime()
    );
  }
  if (sorting === "deadline") {
    let tasksWithNoDeadline = tasksToSort.filter((task) => !task.dueDate);
    let tasksWithDeadline = tasksToSort.filter((task) => task.dueDate);

    sorted = [...tasksWithNoDeadline, ...tasksWithDeadline.sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )]
  }
  if (sorting === "status") {
    let overdueTasks = tasksToSort.filter((task) => task.overdue);
    let activeTasks = tasksToSort.filter((task) => task.active && !task.overdue)
    let completedTasks = tasksToSort.filter((task) => !task.active)
    sorted = [...overdueTasks, ...activeTasks, ...completedTasks]
  }
  if (sorting === null) sorted = tasksToSort;
  return sorted;
};

const handleOrdering = (state: InitialState) => {
  let tasksToShow = state.tasks;
  if (state.filter) tasksToShow = handleFiltering(state);
  if (state.sorting) tasksToShow = handleSorting(state);
  state.tasksToShow = tasksToShow;
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
  // filtered: [],
  filter: null,
  // sorted: [],
  sorting: null,
  tasksToShow: []
};

let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    sortTasks(state, action: PayloadAction<Sorting>) {
      state.filter = null;
      state.sorting = action.payload;
      // handleFiltering(state);
      state.tasksToShow = handleSorting(state);
    },
    filterTasks(state, action: PayloadAction<Filter>) {
      state.sorting = null;
      state.filter = action.payload;
      state.tasksToShow = handleFiltering(state);
      // handleSorting(state);
    },
    addTask(state, action: PayloadAction<TaskObject>) {
      const task = action.payload;
      task.id = state.tasks.length;
      state.tasks.push(task);
      handleOrdering(state);
    },
    deleteTask(state, action: PayloadAction<number>) {
      const taskId = action.payload;
      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      state.tasks = newTasks;
      handleOrdering(state);
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
      handleOrdering(state);
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
      handleOrdering(state);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(tickClock.fulfilled, (state) => {
      state.tasks.forEach((task) => {
        let dueDate = new Date(task.dueDate);
        let currentDate = new Date();

        if (dueDate < currentDate && !task.overdue && task.active) {
          task.overdue = true;
          handleOrdering(state);
        }
        if (dueDate > currentDate && task.overdue) {
          task.overdue = false;
          task.active = true;
          handleOrdering(state);
        }
      });
    });
  }
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
