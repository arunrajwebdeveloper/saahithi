import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Range = "day" | "week" | "month" | "year";

interface DashboardState {
  range: Range;
}

const initialState: DashboardState = {
  range: "month",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
    },
  },
});

export const { setRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;
