import { configureStore } from "@reduxjs/toolkit";

import TasksReducer from "./slices/taskSlice/tasksSlice";
import TaskFormReducer from "./slices/taskFormSlice/taskFormSlice";
import ClockReducer from "./slices/clockSlice/clockSlice";
import LabelReducer from "./slices/labelsSlice/labelsSlice";
import UserReducer from "./slices/userSlice/userSlice";
import AuthFormSlice from "./slices/authFormSlice/authFormSlice";

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
