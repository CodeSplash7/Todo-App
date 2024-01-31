import { createAsyncThunk } from "@reduxjs/toolkit";
import httpService from "../httpService";

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

export const tickClock = createAsyncThunk<void, void>(
  "clock/tick",
  async (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(tickClock());
    }, 1000);
  }
);
