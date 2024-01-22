import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addLabel(state, action: PayloadAction<{ name: string; color: string }>) {
      let { name, color } = action.payload;
      let newLabelId = state.labels.length + 1;
      state.labels.push({ name, color, id: newLabelId });
    },
    removeLabel(state, action: PayloadAction<number>) {
      state.labels = state.labels.filter(
        (label) => label.id !== action.payload
      );
    }
  }
});

export default labelsSlice.reducer;
export const labelsActions = labelsSlice.actions;

