import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpService from "./../../httpsService.ts";

type User =
  | (
      | { id: null; name: null; email: null; loggedIn: false }
      | { id: number; name: string; email: string; loggedIn: true }
    ) & {
      fetchError: string | null;
      fetchStatus: "idle" | "loading" | "succeeded" | "failed";
    };

const initialState: User = {
  id: null,
  name: null,
  email: null,
  loggedIn: false,
  fetchError: null,
  fetchStatus: "idle"
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (requestData: { email: string; pwd: string }) => {
    let { email, pwd } = requestData;
    let res = await httpService.get(`users?email=${email}&password=${pwd}`);
    let userData: User = res.data[0];
    console.log(userData);
    return userData;
  }
);

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUserData.pending, (state) => {
  //       state.fetchStatus = "loading";
  //     })
  //     .addCase(fetchUserData.fulfilled, (state, action) => {
  //       state.fetchStatus = "succeeded";
  //       state.id = action.payload.id;

  //       // state.name = action.
  //       // state.email = action.
  //     })
  //     .addCase(fetchUserData.rejected, (state, action) => {
  //       state.fetchStatus = "failed";
  //       state.fetchError = action.error.message as string | null;
  //     });
  // }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
