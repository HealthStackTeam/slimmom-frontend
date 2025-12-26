import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyRate, fetchDailyRateUser } from "./operations";

const initialState = {
  dailyRate: null, 
  notAllowedProducts: [], 
  isLoading: false,
  error: null,
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
      .addCase(fetchDailyRate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDailyRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyRate = action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods;
      })
      .addCase(fetchDailyRate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // private
      .addCase(fetchDailyRateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyRate = action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods;
      });
  },
});

export const { clearDailyRate } = dailyRateSlice.actions;
export default dailyRateSlice.reducer;