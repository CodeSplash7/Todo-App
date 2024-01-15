import { createSlice } from "@reduxjs/toolkit";

type TaskForm = {
  title: string;
  label: string;
  creationDate: string;
  dueDate: string;
  description: string;
};

type TaskFormState = {
  taskFormIsOpen: boolean;
} & TaskForm;

const initialState: TaskFormState = {
  taskFormIsOpen: true,
  title: "",
  label: "",
  creationDate: "",
  dueDate: "",
  description: ""
};

let taskFormSlice = createSlice({
  name: "task-form",
  initialState,
  reducers: {
    setTaskFormIsOpen(state, action) {
      state.taskFormIsOpen = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setLabel(state, action) {
      state.label = action.payload;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload;
    },
    setCreationDate(state, action) {
      state.creationDate = action.payload;
    }
  }
});

export default taskFormSlice.reducer;
export const taskFormActions = taskFormSlice.actions;
