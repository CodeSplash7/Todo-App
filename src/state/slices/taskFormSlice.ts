import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskForm = {
  id?: number;
  title: string;
  labelId: number;
  creationDate: string;
  dueDate: string;
  description: string;
};

type TaskFormState = {
  taskFormIsOpen: boolean;
} & TaskForm;

const initialState: TaskFormState = {
  taskFormIsOpen: false,
  title: "",
  labelId: -1,
  creationDate: "",
  dueDate: "",
  description: ""
};

let taskFormSlice = createSlice({
  name: "task-form",
  initialState,
  reducers: {
    setTaskFormIsOpen(state, action: PayloadAction<boolean>) {
      state.taskFormIsOpen = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setLabelId(state, action: PayloadAction<number>) {
      state.labelId = action.payload;
    },
    setDueDate(state, action: PayloadAction<string>) {
      state.dueDate = action.payload;
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
      state.taskFormIsOpen = false;
      state.title = "";
      state.labelId = -1;
      state.creationDate = "";
      state.dueDate = "";
      state.description = "";
      state.id = undefined;
    }
    // createNewTask(state){}
  }
});

export default taskFormSlice.reducer;
export const taskFormActions = taskFormSlice.actions;
