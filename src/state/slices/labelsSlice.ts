import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRandomId } from "../helperFunctions";

type Label = {
  id: number;
  name: string;
  color: string;
};

type LabelsState = {
  labels: Label[];
};

const initialState: LabelsState = {
  labels: [
    {
      id: 0,
      name: "label1",
      color: "#ffffff"
    },
    {
      id: 1,
      name: "label2",
      color: "#32a852"
    },
    {
      id: 2,
      name: "label3",
      color: "#3d1f6e"
    }
  ]
};

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    removeLabel(state, action: PayloadAction<number>) {
      state.labels = state.labels.filter(
        (label) => label.id !== action.payload
      );
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
  }
});

export default labelsSlice.reducer;
export const labelsActions = labelsSlice.actions;
