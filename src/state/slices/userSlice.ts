import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpService from "./../../httpsService.ts";
import { TaskObject } from "./tasksSlice.ts";
import { LabelObject } from "./labelsSlice.ts";

type User = {
  username: string | null;
  email: string | null;
  id: number;
  fetchError: string | null;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
};

type Account = User & { tasks: TaskObject[]; labels: LabelObject[] };

export type NewAccount = {
  username: string;
  email: string;
  password: string;
};

const initialState: User = {
  id: -1,
  username: null,
  email: null,
  fetchError: null,
  fetchStatus: "idle"
};

export const fetchAccountData = createAsyncThunk(
  "user/fetchUserData",
  async (
    requestData: { email: string; pwd: string } | number,
    { rejectWithValue }
  ) => {
    if (typeof requestData === "number")
      return (await httpService.get(`accounts/${requestData}`)).data;

    let { email, pwd } = requestData;
    try {
      let res = await httpService.get(
        `accounts?email=${email}&password=${pwd}`
      );
      if (res.data.length === 0) {
        // Empty response means no account found
        return rejectWithValue("Account not found");
      }

      return res.data[0];
    } catch (err) {
      console.error(err);
      return rejectWithValue("Error fetching account data");
    }
  }
);

export const createNewAccount = createAsyncThunk(
  "user/createNewAccount",
  async (
    requestData: { email: string; pwd: string; username: string },
    { rejectWithValue }
  ) => {
    const { email, pwd, username } = requestData;
    try {
      let res = await httpService.post("accounts", {
        email,
        password: pwd,
        username,
        tasks: [],
        labels: []
      });
      return res.data;
    } catch {
      return rejectWithValue("Something went wrong :(");
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async () => {});

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.pending, handleLoadingAuth)
      .addCase(createNewAccount.pending, handleLoadingAuth)
      .addCase(fetchAccountData.fulfilled, handleAuth)
      .addCase(createNewAccount.fulfilled, handleAuth)
      .addCase(fetchAccountData.rejected, handleFailedAuth)
      .addCase(createNewAccount.rejected, handleFailedAuth)
      .addCase(logOut.fulfilled, handleLogOut);
  }
});

function handleLogOut(state: User) {
  state.fetchStatus = "idle";
  state.username = null;
  state.email = null;
  state.id = -1;
  localStorage.setItem("userId", String(state.id));
}

function handleLoadingAuth(state: User) {
  state.fetchStatus = "loading";
}

function handleFailedAuth(state: User, action: any) {
  state.fetchStatus = "failed";
  state.fetchError = action.payload as string;
}

function handleAuth(state: User, action: any) {
  state.fetchStatus = "succeeded";
  state.username = action.payload.username;
  state.email = action.payload.email;
  state.id = action.payload.id;
  localStorage.setItem("userId", String(state.id));
}

export default userSlice.reducer;
export const userActions = userSlice.actions;
