import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAccountData, createNewAccount } from "./userSlice";

type AuthForm = {
  email: string;
  password: string;
  username: string;
};

type AuthFormState = {
  isAuthFormOpen: boolean;
  errorMessage: string | undefined;
  purpose: AuthPurpose | null;
} & AuthForm;

type AuthPurpose = "log" | "register";

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
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    resetForm: (state) => {
      handleResetForm(state);
    },
    setPurpose: (state, action: PayloadAction<AuthPurpose>) => {
      state.purpose = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
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

function setFetchingErrorMessage(state: AuthFormState, action: any) {
  state.errorMessage = action.payload as string;
}

function handleResetForm(state: AuthFormState) {
  state.isAuthFormOpen = false;
  state.email = "";
  state.password = "";
  state.errorMessage = "";
  state.username = "";
}

export default authFormSlice.reducer;
export const authFormActions = authFormSlice.actions;
