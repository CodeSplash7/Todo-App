import { LabelsState } from "./labelTypes";

export function handleLogout(state: LabelsState) {
  state.labels = [];
  state.userId = -1;
}

export function handleAuth(state: LabelsState, action: any) {
  state.labels = action.payload.labels;
  state.userId = action.payload.id;
}
