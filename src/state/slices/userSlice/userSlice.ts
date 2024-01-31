// import library methods
import { createSlice } from "@reduxjs/toolkit";
// import thunk actions
import {
  fetchAccountData,
  logOut,
  createNewAccount
} from "../../thunkActions.ts";
// import types
import { User } from "./userTypes.ts";
// import extra reducers
import {
  handleLoadingAuth,
  handleSuccessfulAuth,
  handleFailedAuth,
  handleLogOut
} from "./userExtraReducers.ts";

const initialState: User = {
  id: -1,
  username: null,
  email: null,
  fetchError: null,
  fetchStatus: "idle"
};

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.pending, handleLoadingAuth)
      .addCase(createNewAccount.pending, handleLoadingAuth)
      .addCase(fetchAccountData.fulfilled, handleSuccessfulAuth)
      .addCase(createNewAccount.fulfilled, handleSuccessfulAuth)
      .addCase(fetchAccountData.rejected, handleFailedAuth)
      .addCase(createNewAccount.rejected, handleFailedAuth)
      .addCase(logOut.fulfilled, handleLogOut);
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
