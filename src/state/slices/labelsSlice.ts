import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRandomId } from "../helperFunctions";
// import { fetchUserData } from "./userSlice";
import httpsService from "../../httpsService";

type Label = {
  id: number;
  name: string;
  color: string;
};

type LabelsState = {
  userId: number | null;
  labels: Label[];
};

const initialState: LabelsState = {
  userId: null,
  labels: [
    // {
    //   id: 0,
    //   name: "label1",
    //   color: "#ffffff"
    // },
    // {
    //   id: 1,
    //   name: "label2",
    //   color: "#32a852"
    // },
    // {
    //   id: 2,
    //   name: "label3",
    //   color: "#3d1f6e"
    // }
  ]
};

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    removeLabel(state, action: PayloadAction<number>) {
      let targetLabelId = action.payload;
      state.labels = state.labels.filter((label) => label.id !== targetLabelId);
      httpsService.delete(`labels/${action.payload}`);
      // httpsService.delete(`labels/${action.payload}`);
    },
    updateLabel(
      state,
      action: PayloadAction<{
        id: number;
        info: { name?: string; color?: string };
      }>
    ) {
      let newLabels = state.labels.map((label) => {
        if (label.id === action.payload.id) {
          label = { ...label, ...action.payload.info };
        }
        return label;
      });
      state.labels = newLabels;
    },
    addLabel(state) {
      state.labels.push({ id: generateRandomId(), name: "", color: "" });
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUserData.fulfilled, (state, action) => {
  //     state.labels = action.payload.labels;
  //     state.userId = action.payload.id;
  //   });
  // }
});

export default labelsSlice.reducer;
export const labelsActions = labelsSlice.actions;
