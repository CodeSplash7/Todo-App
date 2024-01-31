// import library data
import { createSlice } from "@reduxjs/toolkit";
// import action thunks
import { tickClock } from "../../thunkActions";
// import types
import { ClockState } from "./clockTypes";
// import extra reducers
import { handleClockTick } from "./clockExtraReducers";

const initialState: ClockState = {
  time: new Date().toISOString()
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tickClock.fulfilled, handleClockTick);
  }
});

export default clockSlice.reducer;
export const clockActions = clockSlice.actions;
