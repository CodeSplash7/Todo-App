import { PayloadAction } from "@reduxjs/toolkit";
import { Tasks } from "./tasksTypes";
import { handleOrdering } from "./tasksHelperFunctions";

export function handleLogOut(state: Tasks) {
  state.tasks = [];
  state.userId = -1;
  state.tasksToShow = [];
}

export function handleAuth(state: Tasks, action: any) {
  state.tasks = action.payload.tasks;
  state.userId = action.payload.id;
  state.tasksToShow = handleOrdering(state);
}

export function handleRemoveLabel(state: Tasks, action: PayloadAction<number>) {
  state.tasks = state.tasks.map((task) => {
    if (task.labelId === action.payload) {
      task.labelId = -1;
    }
    return task;
  });
  let isFilteringByTheRemovedLabel =
    state.filter?.slice(0, 5) === "label" &&
    Number(state.filter.slice(5, state.filter.length)) === action.payload;
  if (isFilteringByTheRemovedLabel) {
    state.filter = null;
    state.tasksToShow = handleOrdering(state);
  }
}
