// import library data
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import helper functions
import { generateRandomId } from "../../helperFunctions";
import httpsService from "../../../httpService";
// import thunk action
import { fetchAccountData, createNewAccount, logOut } from "../../thunkActions";
// import types
import { LabelsState } from "./labelTypes";
// import extra reducers
import { handleLogout, handleAuth } from "./labelsExtraReducers";

const initialState: LabelsState = {
  userId: -1,
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

const handleApiDataUpdate = (state: LabelsState) => {
  if (state.userId > -1)
    httpsService.patch(`accounts/${state.userId}`, { labels: state.labels });
};

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    removeLabel(state, action: PayloadAction<number>) {
      let targetLabelId = action.payload;
      state.labels = state.labels.filter((label) => label.id !== targetLabelId);
      handleApiDataUpdate(state);
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
      handleApiDataUpdate(state);
    },
    addLabel(state) {
      state.labels.push({ id: generateRandomId(), name: "", color: "" });
      handleApiDataUpdate(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.fulfilled, handleAuth)
      .addCase(createNewAccount.fulfilled, handleAuth)
      .addCase(logOut.fulfilled, handleLogout);
  }
});

export default labelsSlice.reducer;
export const labelsActions = labelsSlice.actions;
