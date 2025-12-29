import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyRate, fetchDailyRateUser } from "./operations";

const initialState = {
  dailyRate: null, 
  notAllowedProducts: [],
};

const dailyRateSlice = createSlice({
  name: "dailyRate",
  initialState,
  reducers: {
    clearDailyRate: (state) => {
      state.dailyRate = null;
      state.notAllowedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // public
      .addCase(fetchDailyRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyRate = action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods;
      })
      // private
      .addCase(fetchDailyRateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.dailyRate = action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods;
      });
  },
});

export const { clearDailyRate } = dailyRateSlice.actions;
export default dailyRateSlice.reducer;