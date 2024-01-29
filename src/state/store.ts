import { configureStore } from "@reduxjs/toolkit";

import TasksReducer from "./slices/tasksSlice";
import TaskFormReducer from "./slices/taskFormSlice";
import ClockReducer from "./slices/clockSlice";
import LabelReducer from "./slices/labelsSlice";
import UserReducer from "./slices/userSlice";
import AuthFormSlice from "./slices/authFormSlice";

const store = configureStore({
  reducer: {
    tasks: TasksReducer,
    taskForm: TaskFormReducer,
    clock: ClockReducer,
    labels: LabelReducer,
    user: UserReducer,
    authForm: AuthFormSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
