import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tickClock } from "./clockSlice";
import { createNewAccount, fetchAccountData, logOut } from "./userSlice";

import { labelsActions } from "./labelsSlice";
import { generateRandomId } from "../helperFunctions";
import httpsService from "../../httpsService";

import _ from "lodash";

export type Filter =
  | "active"
  | "completed"
  | "overdue"
  | null
  | `label${number}`;

type SortingTerm = "creation" | "deadline" | "status";
type SortingOrder = "asc" | "desc";
export type Sorting = {
  term: SortingTerm;
  order: SortingOrder;
} | null;

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
  filter: Filter;
  sorting: Sorting;
  tasksToShow: TaskObject[];
  userId: number;
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
  if (filter?.slice(0, 5) === "label") {
    const labelId = Number(filter.slice(5, filter.length));
    filtered = state.tasks.filter((task) => task.labelId === labelId);
  }
  if (filter === null) filtered = tasksToFilter;

  return filtered;
};

const handleSorting = (sorting: Sorting, tasks: TaskObject[]) => {
  let tasksToSort = JSON.parse(JSON.stringify(tasks)) as TaskObject[];
  let sorted: TaskObject[] = [];

  if (sorting === null) {
    sorted = tasksToSort;
    return sorted;
  }

  if (sorting.term === "creation") {
    sorted = tasksToSort.sort(
      (a, b) =>
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
    );
  }
  if (sorting.term === "deadline") {
    let tasksWithNoDeadline = tasksToSort.filter((task) => !task.dueDate);
    let tasksWithDeadline = tasksToSort.filter((task) => task.dueDate);

    sorted = [
      ...tasksWithNoDeadline,
      ...tasksWithDeadline.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    ];
  }
  if (sorting.term === "status") {
    let overdueTasks = tasksToSort.filter(
      (task) => task.overdue && task.active
    );
    let activeTasks = tasksToSort.filter(
      (task) => task.active && !task.overdue
    );
    let completedTasks = tasksToSort.filter(
      (task) => !task.active && !task.overdue
    );
    sorted = [...overdueTasks, ...activeTasks, ...completedTasks];
  }
  if (sorting.order === "desc") return sorted.reverse();
  return sorted;
};

const handleOrdering = (state: InitialState) => {
  let filtered = handleFiltering(state);
  let sorted = handleSorting(state.sorting, filtered);
  return sorted;
  // return _.intersectionBy(filtered, sorted, "id");
};

const handleApiDataUpdate = (state: InitialState) => {
  if (state.userId > -1)
    httpsService.patch(`accounts/${state.userId}`, { tasks: state.tasks });
};

const initialState: InitialState = {
  tasks: [
    // {
    //   id: 0,
    //   title: "TaskOfRandom",
    //   description: "This is a random task.",
    //   active: true,
    //   overdue: true,
    //   labelId: 1,
    //   creationDate: new Date().toISOString(),
    //   dueDate: new Date().toISOString()
    // },
    // {
    //   id: 1,
    //   title: "TaskOfRandom2",
    //   description: "This is a random task. #2",
    //   active: false,
    //   overdue: false,
    //   labelId: 2,
    //   creationDate: new Date().toISOString(),
    //   dueDate: new Date().toISOString()
    // },
    // {
    //   id: 2,
    //   title: "TaskOfRandom3",
    //   description: "This is a random task. #3",
    //   active: true,
    //   overdue: true,
    //   labelId: 0,
    //   creationDate: new Date().toISOString(),
    //   dueDate: new Date().toISOString()
    // }
  ],
  filter: null,
  sorting: null,
  tasksToShow: [],
  userId: -1
};

let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    sortTasks(state, action: PayloadAction<Sorting>) {
      // state.filter = null;
      state.sorting = action.payload;
      state.tasksToShow = handleOrdering(state);
    },
    filterTasks(state, action: PayloadAction<Filter>) {
      // state.sorting = null;
      state.filter = action.payload;
      state.tasksToShow = handleOrdering(state);
    },
    addTask(state, action: PayloadAction<TaskObject>) {
      const task = action.payload;
      task.id = generateRandomId();
      state.tasks.push(task);
      state.tasksToShow = handleOrdering(state);
      handleApiDataUpdate(state);
    },
    deleteTask(state, action: PayloadAction<number>) {
      const taskId = action.payload;
      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      state.tasks = newTasks;
      state.tasksToShow = handleOrdering(state);
      handleApiDataUpdate(state);
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
      state.tasksToShow = handleOrdering(state);
      handleApiDataUpdate(state);
    },
    triggerCompletion(state, action: PayloadAction<number>) {
      let targetedTask = state.tasks.find((task) => task.id === action.payload);
      if (!targetedTask) return;
      targetedTask.active = !targetedTask.active;
      if (targetedTask.overdue && !targetedTask.active)
        targetedTask.overdue = false;
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task = targetedTask as typeof task;
        }
        return task;
      });
      state.tasksToShow = handleOrdering(state);
      handleApiDataUpdate(state);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(tickClock.fulfilled, (state) => {
      state.tasks.forEach((task) => {
        let dueDate = new Date(task.dueDate);
        let currentDate = new Date();

        if (dueDate < currentDate && !task.overdue && task.active) {
          task.overdue = true;
          state.tasksToShow = handleOrdering(state);
        }
        if (dueDate > currentDate && task.overdue) {
          task.overdue = false;
          task.active = true;
          state.tasksToShow = handleOrdering(state);
        }
      });
    });
    builder
      .addCase(
        labelsActions.removeLabel,
        (state, action: PayloadAction<number>) => {
          state.tasks = state.tasks.map((task) => {
            if (task.labelId === action.payload) {
              task.labelId = -1;
            }
            return task;
          });
          let isFilteringByTheRemovedLabel =
            state.filter?.slice(0, 5) === "label" &&
            Number(state.filter.slice(5, state.filter.length)) ===
              action.payload;
          if (isFilteringByTheRemovedLabel) {
            state.filter = null;
            state.tasksToShow = handleOrdering(state);
          }
        }
      )
      .addCase(fetchAccountData.fulfilled, handleAuth)
      .addCase(createNewAccount.fulfilled, handleAuth)
      .addCase(logOut.fulfilled, handleLogOut);
  }
});

function handleLogOut(state: InitialState) {
  state.tasks = [];
  state.userId = -1;
  state.tasksToShow = [];
}

function handleAuth(state: InitialState, action: any) {
  state.tasks = action.payload.tasks;
  state.userId = action.payload.id;
  state.tasksToShow = handleOrdering(state);
}

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
