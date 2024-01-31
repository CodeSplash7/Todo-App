import { AuthFormState } from "./authFormTypes";
export function setFetchingErrorMessage(state: AuthFormState, action: any) {
  state.errorMessage = action.payload as string;
}

export function handleResetForm(state: AuthFormState) {
  state.isAuthFormOpen = false;
  state.email = "";
  state.password = "";
  state.errorMessage = "";
  state.username = "";
}
