import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const tickClock = createAsyncThunk<void, void>(
  "clock/tick",
  async (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(tickClock());
    }, 1000);
  }
);

type ClockState = {
  time: string;
};

const initialState: ClockState = {
  time: new Date().toISOString()
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tickClock.fulfilled, (state) => {
      state.time = new Date().toISOString();
    });
  }
});

export default clockSlice.reducer;
export const clockActions = clockSlice.actions;
