import { ClockState } from "./clockTypes";

export const handleClockTick = (state: ClockState) => {
  state.time = new Date().toISOString();
};
