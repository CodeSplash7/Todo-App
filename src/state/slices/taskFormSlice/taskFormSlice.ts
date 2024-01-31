// import libraries data
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import types
import { TaskFormState } from "./taskFormTypes";

const initialState: TaskFormState = {
  id: -1,
  errorMessage: undefined,
  isTaskFormOpen: false,
  title: "",
  labelId: -1,
  creationDate: "",
  dueDate: "",
  description: ""
};

function formatInputDate(date: Date) {
  // const currentDate = new Date();
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

let taskFormSlice = createSlice({
  name: "task-form",
  initialState,
  reducers: {
    toggleTaskForm(state, action: PayloadAction<boolean>) {
      state.isTaskFormOpen = action.payload;
      state.creationDate = formatInputDate(new Date());
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setLabelId(state, action: PayloadAction<number>) {
      state.labelId = action.payload;
    },
    setDueDate(state, action: PayloadAction<string>) {
      state.dueDate = formatInputDate(new Date(action.payload));
    },
    setCreationDate(state, action: PayloadAction<string>) {
      state.creationDate = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    resetForm(state) {
      state.isTaskFormOpen = false;
      state.errorMessage = undefined;
      state.title = "";
      state.labelId = -1;
      state.creationDate = "";
      state.dueDate = "";
      state.description = "";
      state.id = -1;
    },
    setErrorMessage(state, action: PayloadAction<string | undefined>) {
      state.errorMessage = action.payload;
    }
  }
});

export default taskFormSlice.reducer;
export const taskFormActions = taskFormSlice.actions;
