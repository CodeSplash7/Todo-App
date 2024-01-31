// import library data
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import thunk actions
import { fetchAccountData, createNewAccount } from "../../thunkActions";
// import types
import { AuthFormState, AuthPurpose } from "./authFormTypes";
// import extra reducers
import {
  handleResetForm,
  setFetchingErrorMessage
} from "./authFormExtraReducers";

const initialState: AuthFormState = {
  username: "",
  isAuthFormOpen: false,
  errorMessage: undefined,
  email: "",
  password: "",
  purpose: null
};

const authFormSlice = createSlice({
  name: "auth-form",
  initialState,
  reducers: {
    toggleAuthForm: (state) => {
      state.isAuthFormOpen = !state.isAuthFormOpen;
    },
    setFormEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFormPwd: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setFormErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    resetForm: (state) => {
      handleResetForm(state);
    },
    setFormPurpose: (state, action: PayloadAction<AuthPurpose>) => {
      state.purpose = action.payload;
    },
    setFormUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.fulfilled, handleResetForm)
      .addCase(createNewAccount.fulfilled, handleResetForm)
      .addCase(fetchAccountData.rejected, setFetchingErrorMessage)
      .addCase(createNewAccount.rejected, setFetchingErrorMessage);
  }
});

export default authFormSlice.reducer;
export const authFormActions = authFormSlice.actions;
