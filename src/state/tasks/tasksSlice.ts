import { createSlice } from "@reduxjs/toolkit";

type TaskObject = {
  title: string;
  description: string;
  status: "active" | "completed" | "overdue";
  labelId: number;
  creationDate: Date;
  dueDate: Date;
};

type InitialState = {
  tasks: TaskObject[];
};

const initialState: InitialState = {
  tasks: [
    {
      title: "TaskOfRandom",
      description: "This is a random task.",
      status: "active",
      labelId: 1,
      creationDate: new Date(),
      dueDate: new Date()
    },
    {
      title: "TaskOfRandom2",
      description: "This is a random task. #2",
      status: "completed",
      labelId: 2,
      creationDate: new Date(),
      dueDate: new Date()
    },
    {
      title: "TaskOfRandom3",
      description: "This is a random task. #3",
      status: "overdue",
      labelId: 1,
      creationDate: new Date(),
      dueDate: new Date()
    }
  ]
};

let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {}
});

export default tasksSlice.reducer;
