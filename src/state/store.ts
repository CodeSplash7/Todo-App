import { configureStore } from "@reduxjs/toolkit";

import TasksReducer from "./slices/tasksSlice";
import TaskFormReducer from "./slices/taskFormSlice";
import ClockReducer from "./slices/clockSlice";
import LabelReducer from "./slices/labelsSlice";
import UserReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    tasks: TasksReducer,
    taskForm: TaskFormReducer,
    clock: ClockReducer,
    labels: LabelReducer,
    user: UserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export default store;
