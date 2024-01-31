// import libraries data
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
// import thunk actions
import {
  tickClock,
  createNewAccount,
  fetchAccountData,
  logOut
} from "../../thunkActions";
// import additional actions
import { labelsActions } from "../labelsSlice/labelsSlice";
// import helper functions
import { generateRandomId } from "../../helperFunctions";
import { handleOrdering, handleApiDataUpdate } from "./tasksHelperFunctions";
// import types
import { Tasks, TaskObject, Sorting, Filter } from "./tasksTypes";
// import extra reducers
import {
  handleAuth,
  handleLogOut,
  handleRemoveLabel
} from "./tasksExtraReducers";

const initialState: Tasks = {
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
      state.sorting = action.payload;
      state.tasksToShow = handleOrdering(state);
    },
    filterTasks(state, action: PayloadAction<Filter>) {
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
      .addCase(labelsActions.removeLabel, handleRemoveLabel)
      .addCase(fetchAccountData.fulfilled, handleAuth)
      .addCase(createNewAccount.fulfilled, handleAuth)
      .addCase(logOut.fulfilled, handleLogOut);
  }
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
