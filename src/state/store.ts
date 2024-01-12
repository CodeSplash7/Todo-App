import { configureStore } from "@reduxjs/toolkit";

import TasksReducer from "./tasks/tasksSlice";

const store = configureStore({
  reducer: { tasks: TasksReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export default store;
