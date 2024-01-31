import { User } from "./userTypes";

export function handleLogOut(state: User) {
  state.fetchStatus = "idle";
  state.username = null;
  state.email = null;
  state.id = -1;
  localStorage.setItem("userId", String(state.id));
}

export function handleLoadingAuth(state: User) {
  state.fetchStatus = "loading";
}

export function handleFailedAuth(state: User, action: any) {
  state.fetchStatus = "failed";
  state.fetchError = action.payload as string;
}

export function handleSuccessfulAuth(state: User, action: any) {
  state.fetchStatus = "succeeded";
  state.username = action.payload.username;
  state.email = action.payload.email;
  state.id = action.payload.id;
  localStorage.setItem("userId", String(state.id));
}
