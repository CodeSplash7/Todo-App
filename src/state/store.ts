import { configureStore } from "@reduxjs/toolkit";

import TasksReducer from "./slices/tasksSlice";
import TaskFormReducer from "./slices/taskFormSlice";
import ClockReducer from "./slices/clockSlice";

const store = configureStore({
  reducer: {
    tasks: TasksReducer,
    taskForm: TaskFormReducer,
    clock: ClockReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export default store;
