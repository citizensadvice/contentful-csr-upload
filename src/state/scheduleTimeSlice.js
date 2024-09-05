import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const scheduleTimeSlice = createSlice({
  name: "scheduleTime",
  initialState,
  reducers: {
    setScheduleTime: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScheduleTime } = scheduleTimeSlice.actions;

export default scheduleTimeSlice.reducer;
